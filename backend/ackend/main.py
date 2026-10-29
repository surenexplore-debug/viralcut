
import os
import json
import re
import shutil
import subprocess
import time
import uuid
from pathlib import Path

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from google import genai

# ---------- Configuration ----------

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
CLIP_DIR = BASE_DIR / "clips"

UPLOAD_DIR.mkdir(exist_ok=True)
CLIP_DIR.mkdir(exist_ok=True)

MAX_UPLOAD_BYTES = 200 * 1024 * 1024
ALLOWED_EXTENSIONS = {".mp4", ".mov", ".webm", ".m4v"}

MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
API_KEY = os.getenv("GEMINI_API_KEY")

app = FastAPI(title="ViralCut API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to your website before production.
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.mount("/clips", StaticFiles(directory=str(CLIP_DIR)), name="clips")


# ---------- Helpers ----------

def require_tools():
    if not API_KEY:
        raise HTTPException(
            status_code=500,
            detail="Server API key is not configured."
        )

    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        raise HTTPException(
            status_code=500,
            detail="FFmpeg and FFprobe must be installed on the server."
        )


def get_video_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        capture_output=True,
        text=True,
        timeout=30,
        check=True,
    )
    return float(result.stdout.strip())


def extract_json(text: str):
    # Handle responses wrapped in Markdown code fences.
    text = re.sub(r"```(?:json)?", "", text).replace("```", "").strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("The AI did not return valid JSON.")

    return json.loads(match.group(0))


def cut_clip(source: Path, output: Path, start: float, end: float):
    duration = end - start

    command = [
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-ss", str(start),
        "-i", str(source),
        "-t", str(duration),
        "-map", "0:v:0",
        "-map", "0:a:0?",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-movflags", "+faststart",
        str(output),
    ]

    try:
        subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=180,
            check=True,
        )
    except subprocess.TimeoutExpired:
        raise HTTPException(
            status_code=504,
            detail="Video processing took too long."
        )
    except subprocess.CalledProcessError:
        raise HTTPException(
            status_code=500,
            detail="FFmpeg could not create this clip."
        )


# ---------- Routes ----------

@app.get("/")
def home():
    return {
        "name": "ViralCut API",
        "status": "running",
        "version": "0.1.0",
    }


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/clip")
async def create_clips(
    request: Request,
    video: UploadFile = File(...),
    clip_duration: int = Form(30),
):
    require_tools()

    if clip_duration not in (30, 45, 60):
        raise HTTPException(
            status_code=400,
            detail="Clip duration must be 30, 45, or 60 seconds."
        )

    extension = Path(video.filename or "").suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Supported formats: MP4, MOV, WebM, and M4V."
        )

    job_id = uuid.uuid4().hex
    source_path = UPLOAD_DIR / f"{job_id}{extension}"
    uploaded_video = None

    try:
        # Save the upload in chunks to limit memory usage.
        total_bytes = 0

        with source_path.open("wb") as destination:
            while True:
                chunk = await video.read(1024 * 1024)

                if not chunk:
                    break

                total_bytes += len(chunk)

                if total_bytes > MAX_UPLOAD_BYTES:
                    raise HTTPException(
                        status_code=413,
                        detail="Video exceeds the 200 MB upload limit."
                    )

                destination.write(chunk)

        if total_bytes == 0:
            raise HTTPException(
                status_code=400,
                detail="The uploaded video is empty."
            )

        try:
            video_seconds = get_video_duration(source_path)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Could not read this video. Please try another file."
            )

        if video_seconds < 5:
            raise HTTPException(
                status_code=400,
                detail="Please upload a video at least 5 seconds long."
            )

        # Upload the video to Gemini for analysis.
        client = genai.Client(api_key=API_KEY)
        uploaded_video = client.files.upload(file=str(source_path))

        # Wait for Gemini to finish processing the uploaded video.
        deadline = time.time() + 120

        while "PROCESSING" in str(
            getattr(uploaded_video, "state", "")
        ).upper():
            if time.time() > deadline:
                raise HTTPException(
                    status_code=504,
                    detail="AI video analysis timed out. Try a shorter video."
                )

            time.sleep(2)
            uploaded_video = client.files.get(
                name=uploaded_video.name
            )

        state = str(getattr(uploaded_video, "state", "")).upper()

        if "FAILED" in state:
            raise HTTPException(
                status_code=422,
                detail="Gemini could not process this video."
            )

        prompt = f"""
Analyze this video and identify up to 3 compelling short-video moments.

Look for:
- Strong opening hooks
- Surprising or useful insights
- Funny or emotional moments
- Complete, understandable segments

Return ONLY valid JSON in this format:
{{
  "clips": [
    {{
      "title": "Short descriptive title",
      "start": 12.0,
      "end": 42.0,
      "reason": "Why this moment may interest viewers"
    }}
  ]
}}

Rules:
- Timestamps must be in seconds from the start of the video.
- The video is {video_seconds:.2f} seconds long.
- Each clip must be between 5 and {clip_duration} seconds.
- Do not invent moments or timestamps.
- Prefer complete thoughts with a clear beginning and ending.
- Return no more than 3 clips.
- If no suitable moment exists, return an empty clips array.
- Do not guarantee virality or invent engagement statistics.
"""

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=[uploaded_video, prompt],
        )

        result = extract_json(response.text or "")
        suggestions = result.get("clips", [])

        if not isinstance(suggestions, list):
            raise ValueError("Invalid clips list returned by the AI.")

        generated_clips = []

        for suggestion in suggestions[:3]:
            try:
                start = float(suggestion["start"])
                end = float(suggestion["end"])
                title = str(suggestion["title"])[:120]
                reason = str(suggestion["reason"])[:400]
            except (KeyError, TypeError, ValueError):
                continue

            if (
                start < 0
                or end <= start
                or end > video_seconds
                or end - start > clip_duration
                or end - start < 5
            ):
                continue

            clip_name = f"{job_id}_{len(generated_clips) + 1}.mp4"
            output_path = CLIP_DIR / clip_name

            cut_clip(source_path, output_path, start, end)

            generated_clips.append({
                "title": title,
                "start": round(start, 2),
                "end": round(end, 2),
                "duration": round(end - start, 2),
                "reason": reason,
                "download_url": str(request.base_url).rstrip("/")
                    + "/clips/" + clip_name,
            })

        if not generated_clips:
            raise HTTPException(
                status_code=422,
                detail="No valid clips were generated. Try another video."
            )

        return {
            "success": True,
            "message": "Clips generated successfully.",
            "video_duration": round(video_seconds, 2),
            "clips": generated_clips,
        }

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail=(
                "Processing failed. Check the backend logs, "
                "Gemini API access, and available quota."
            )
        )
    finally:
        await video.close()

        # Remove the original uploaded file after processing.
        if source_path.exists():
            source_path.unlink()

        # Best-effort cleanup of the temporary Gemini upload.
        if uploaded_video is not None:
            try:
                client.files.delete(name=uploaded_video.name)
            except Exception:
                pass
