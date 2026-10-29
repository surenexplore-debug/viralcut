
:root {
  --bg: #080914;
  --panel: #101120;
  --panel2: #151529;
  --purple: #8b5cf6;
  --purple-light: #b18aff;
  --text: #f7f6ff;
  --muted: #999bb5;
  --border: rgba(164, 137, 255, 0.17);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(ellipse at 75% 12%, #5b2cbe24, transparent 38%),
    var(--bg);
  color: var(--text);
  line-height: 1.6;
}

button, input {
  font: inherit;
}

button, a {
  -webkit-tap-highlight-color: transparent;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
}

.container {
  width: min(1160px, 90%);
  margin: 0 auto;
}

/* Navigation */

.navbar {
  height: 76px;
  position: sticky;
  top: 0;
  z-index: 20;
  background: #080914eF;
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.8px;
  white-space: nowrap;
}

.logo > span:last-child {
  color: var(--purple-light);
  margin-left: -10px;
}

.logo-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: linear-gradient(135deg, #a78bfa, #6d28d9);
  box-shadow: 0 0 25px #8b5cf633;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: var(--muted);
  font-size: 13px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: white;
}

/* Buttons */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 18px;
  border: 1px solid transparent;
  border-radius: 11px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  color: white;
  background: linear-gradient(110deg, #8b5cf6, #7139df);
  box-shadow: 0 7px 26px #7c3aed35;
}

.btn-primary:hover {
  box-shadow: 0 9px 32px #8b5cf655;
}

.btn-secondary {
  color: white;
  background: #ffffff06;
  border-color: var(--border);
}

/* Hero */

.hero {
  padding: 76px 0 70px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 48px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 12px;
  border: 1px solid #8b5cf638;
  border-radius: 30px;
  background: #8b5cf615;
  color: #c8b5ff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #a78bfa;
  box-shadow: 0 0 12px #a78bfa;
}

h1 {
  margin: 23px 0 20px;
  font-size: clamp(38px, 5vw, 61px);
  line-height: 1.1;
  letter-spacing: -2.8px;
  font-weight: 800;
}

.gradient-text {
  color: var(--purple-light);
  background: linear-gradient(90deg, #d0baff, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  max-width: 510px;
  margin-bottom: 25px;
  color: #a9aac0;
  font-size: 14px;
}

.mini-features {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 27px;
  color: #d6d3e8;
  font-size: 11px;
}

.mini-features span {
  display: flex;
  align-items: center;
  gap: 7px;
}

.mini-features b {
  color: var(--purple-light);
  font-size: 17px;
}

/* Upload panel */

.upload-card {
  padding: 20px;
  background: linear-gradient(145deg, #141426, #0e1020);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 25px 80px #00000020;
}

.card-heading {
  margin-bottom: 18px;
  font-size: 16px;
}

.input-label {
  display: block;
  margin-bottom: 9px;
  color: #dedbf0;
  font-size: 12px;
  font-weight: 600;
}

.drop-zone {
  min-height: 140px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  text-align: center;
  border: 1px dashed #7661bb;
  border-radius: 13px;
  background: #8b5cf608;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.drop-zone:hover,
.drop-zone.dragover {
  background: #8b5cf617;
  border-color: var(--purple-light);
}

.upload-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: #8b5cf620;
  color: var(--purple-light);
  font-size: 25px;
}

.drop-zone strong {
  max-width: 100%;
  overflow-wrap: anywhere;
  font-size: 13px;
}

.drop-zone small {
  color: var(--muted);
  font-size: 10px;
}

#preview {
  display: block;
  width: 100%;
  max-height: 300px;
  margin-top: 14px;
  border-radius: 10px;
  background: black;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 0;
  color: #777991;
  font-size: 10px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

.url-input {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: white;
  background: #090b17;
  outline: none;
  font-size: 12px;
  transition: border-color 0.2s;
}

.url-input:focus {
  border-color: var(--purple);
  box-shadow: 0 0 0 3px #8b5cf619;
}

.url-input::placeholder {
  color: #74758d;
}

.hint {
  margin-top: 7px;
  color: #85869f;
  font-size: 10px;
  line-height: 1.6;
}

.controls {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 21px;
}

.duration-options {
  display: flex;
  gap: 6px;
}

.duration {
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: #c1bfd6;
  background: #ffffff04;
  font-size: 11px;
  transition: 0.2s;
}

.duration:hover {
  border-color: #9b75ff;
}

.duration.active {
  color: white;
  border-color: #9b75ff;
  background: #8b5cf626;
}

#findBtn {
  flex: 1;
  min-width: 160px;
}

/* Hero illustration */

.visual {
  min-height: 420px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-glow {
  position: absolute;
  width: 290px;
  height: 290px;
  border-radius: 50%;
  background: #762cf6;
  filter: blur(120px);
  opacity: 0.28;
}

.visual-main {
  width: 245px;
  padding: 9px;
  position: relative;
  z-index: 1;
  border: 1px solid #a78bfa;
  border-radius: 24px;
  background: #121225;
  box-shadow: 0 0 60px #7139df45;
  transform: rotate(-2deg);
}

.visual-screen {
  height: 330px;
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 20px 15px;
  border-radius: 17px;
  background:
    linear-gradient(180deg, transparent 35%, #080914 100%),
    radial-gradient(circle at 50% 25%, #8055a9, transparent 38%),
    linear-gradient(145deg, #24213d, #141426 60%, #36204b);
}

.visual-screen::before {
  content: "";
  position: absolute;
  width: 120px;
  height: 190px;
  top: 40px;
  left: 52px;
  border-radius: 60px 60px 25px 25px;
  background: linear-gradient(135deg, #d3a98d, #71516a 65%, #242238);
  opacity: 0.85;
}

.visual-screen::after {
  content: "";
  position: absolute;
  width: 150px;
  height: 90px;
  bottom: 55px;
  left: 37px;
  border-radius: 60px 60px 10px 10px;
  background: linear-gradient(130deg, #1b1c32, #63428c);
}

.play-badge {
  position: absolute;
  z-index: 3;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  padding-left: 3px;
  border-radius: 50%;
  color: white;
  background: #8b5cf6d9;
  box-shadow: 0 0 25px #8b5cf655;
}

.video-caption {
  position: relative;
  z-index: 2;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 800;
  text-shadow: 0 2px 10px black;
}

.video-caption span {
  color: #c4a7ff;
}

.video-timeline {
  position: absolute;
  bottom: 10px;
  left: 15px;
  right: 15px;
  height: 3px;
  z-index: 3;
  background: #ffffff30;
}

.video-timeline span {
  display: block;
  width: 55%;
  height: 100%;
  background: var(--purple-light);
}

.float-card {
  position: absolute;
  z-index: 4;
  width: 140px;
  padding: 13px;
  border: 1px solid #9b75ff70;
  border-radius: 13px;
  background: #17162bf2;
  box-shadow: 0 10px 40px #0008;
}

.float-card small,
.float-card strong,
.float-card span {
  display: block;
}

.float-card small {
  color: #a6a2bc;
  font-size: 9px;
}

.float-card strong {
  margin: 5px 0;
  font-size: 11px;
}

.float-card span {
  color: #c4a7ff;
  font-size: 9px;
}

.float-left {
  top: 90px;
  left: 0;
  transform: rotate(-7deg);
}

.float-right {
  right: 0;
  bottom: 65px;
  transform: rotate(6deg);
}

/* Sections */

.section {
  padding: 72px 0;
  border-top: 1px solid #ffffff0b;
}

.section-heading {
  margin-bottom: 35px;
  text-align: center;
}

.section-label {
  color: #b18aff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.section-heading h2 {
  margin-top: 10px;
  font-size: clamp(25px, 3vw, 36px);
  letter-spacing: -1.2px;
  line-height: 1.25;
}

.section-heading p {
  margin-top: 12px;
  color: var(--muted);
  font-size: 13px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.feature-card {
  padding: 24px 20px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: linear-gradient(145deg, #121326, #0c0d19);
  transition: transform 0.2s, border-color 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: #8b5cf660;
}

.feature-icon {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  margin-bottom: 17px;
  border-radius: 12px;
  background: #8b5cf61c;
  color: var(--purple-light);
  font-size: 21px;
}

.feature-card h3,
.step-card h3 {
  margin-bottom: 9px;
  font-size: 14px;
}

.feature-card p,
.step-card p {
  color: var(--muted);
  font-size: 12px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.step-card {
  padding: 25px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: #ffffff04;
}

.step-number {
  color: var(--purple-light);
  font-size: 12px;
  font-weight: 800;
}

.step-card h3 {
  margin-top: 13px;
}

/* Bottom call to action */

.bottom-cta {
  padding: 65px 0;
  border-top: 1px solid var(--border);
  background: radial-gradient(ellipse at center, #6d28d925, transparent 70%);
}

.cta-content {
  text-align: center;
}

.cta-content h2 {
  font-size: clamp(25px, 4vw, 38px);
  letter-spacing: -1px;
}

.cta-content p {
  margin: 12px 0 22px;
  color: var(--muted);
  font-size: 13px;
}

/* Status messages */

#status:not([hidden]) {
  display: block;
  margin-top: 15px;
  padding: 13px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #8b5cf610;
  color: #d7caff;
  font-size: 12px;
  overflow-wrap: anywhere;
}

#status.error {
  color: #ffb4bc;
  border-color: #ff657744;
  background: #ff65770d;
}

/* Footer */

.footer {
  padding: 26px 0;
  border-top: 1px solid var(--border);
  color: #82839a;
  font-size: 11px;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* Responsive layouts */

@media (max-width: 1000px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .hero-content {
    max-width: 720px;
    margin: auto;
    width: 100%;
  }

  .visual {
    max-width: 560px;
    width: 100%;
    margin: auto;
  }

  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .navbar {
    height: 66px;
  }

  .nav-links {
    display: none;
  }

  .logo {
    font-size: 19px;
  }

  .nav-inner > .btn {
    padding: 10px 12px;
    font-size: 11px;
  }

  .hero {
    padding: 42px 0;
  }

  h1 {
    font-size: clamp(36px, 10vw, 48px);
    letter-spacing: -1.8px;
  }

  .hero-description {
    font-size: 13px;
  }

  .mini-features {
    gap: 10px 14px;
  }

  .upload-card {
    padding: 15px;
  }

  .controls {
    align-items: stretch;
  }

  #findBtn {
    width: 100%;
    flex: auto;
  }

  .visual {
    min-height: 350px;
  }

  .visual-main {
    width: 210px;
  }

  .visual-screen {
    height: 300px;
  }

  .float-card {
    width: 115px;
    padding: 10px;
  }

  .float-left {
    left: -3px;
  }

  .float-right {
    right: -3px;
  }

  .section {
    padding: 55px 0;
  }

  .feature-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }

  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition: none !important;
  }
}
