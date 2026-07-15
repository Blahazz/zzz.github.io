/* ============================================================
   RIC ICT SEMINAR 2026 — app.js
   ============================================================ */

// ============================================================
// CONFIGURABLE WEBINAR LINKS
// ============================================================
const LINKS = {
  registration: 'https://forms.gle/QxfHNHkUkzP2Eec1A',
  googleMeet:   'https://meet.google.com/oij-ueed-xcs',
  evaluation:   'https://forms.gle/bVEUWzwk1G74oByp8',
  facebook:     'https://www.facebook.com/ICTRangsitU',
  youtube:      'https://www.youtube.com/@RangsitUniversity',
  email:        'ki.r67@rsu.ac.th',
  linkedin:     'https://www.linkedin.com/in/yolanda-lim/'
};

// ——————————————————————————————————————————
// INITIALIZE LINKS FROM CONFIG
// ——————————————————————————————————————————
function setupLinks() {
  document.querySelectorAll('.link-registration').forEach(el => el.href = LINKS.registration);
  document.querySelectorAll('.link-meet').forEach(el => el.href = LINKS.googleMeet);
  document.querySelectorAll('.link-evaluation').forEach(el => el.href = LINKS.evaluation);
  document.querySelectorAll('.link-facebook').forEach(el => el.href = LINKS.facebook);
  document.querySelectorAll('.link-youtube').forEach(el => el.href = LINKS.youtube);
  document.querySelectorAll('.link-linkedin').forEach(el => el.href = LINKS.linkedin);
  document.querySelectorAll('.link-email').forEach(el => {
    el.href = `mailto:${LINKS.email}`;
    el.textContent = LINKS.email;
  });
}

// ——————————————————————————————————————————
// DARK MODE
// ——————————————————————————————————————————
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  document.getElementById('moonIcon').style.display = isDark ? 'block' : 'none';
  document.getElementById('sunIcon').style.display = isDark ? 'none' : 'block';
}

// ——————————————————————————————————————————
// MOBILE MENU
// ——————————————————————————————————————————
function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  const btn = document.querySelector('.hamburger');
  const isOpen = m.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.querySelector('.hamburger').setAttribute('aria-expanded', 'false');
}

// ——————————————————————————————————————————
// GOOGLE MEET LINK LOCK LOGIC
// ——————————————————————————————————————————
function checkMeetLinksLock() {
  const startTime = new Date('2026-07-30T15:00:00+07:00');
  const now = new Date();
  const meetBtns = document.querySelectorAll('.meet-link');

  meetBtns.forEach(btn => {
    if (now < startTime) {
      btn.classList.add('btn-disabled');
      if (!btn.dataset.originalHtml) {
        btn.dataset.originalHtml = btn.innerHTML;
      }
      btn.innerHTML = `Join Google Meet on July 30 2026`;
      btn.style.pointerEvents = 'none';
      btn.href = 'javascript:void(0)';
      btn.onclick = function (e) { e.preventDefault(); return false; };
    } else {
      btn.classList.remove('btn-disabled');
      if (btn.dataset.originalHtml) {
        btn.innerHTML = btn.dataset.originalHtml;
      }
      btn.style.pointerEvents = 'auto';
      btn.href = LINKS.googleMeet;
      btn.onclick = null;
    }
  });
}

// ——————————————————————————————————————————
// COUNTDOWN TIMER — Target: Thursday, July 30, 2026 3:00 PM GMT+7
// ——————————————————————————————————————————
function updateCountdown() {
  const target = new Date('2026-07-30T15:00:00+07:00');
  const now = new Date();
  const diff = target - now;

  checkMeetLinksLock();

  if (diff <= 0) {
    const wrap = document.querySelector('.ep-countdown');
    if (wrap) {
      wrap.innerHTML = `<div style="text-align:center; font-family:var(--font-m); font-size:.74rem; color:var(--c-accent); font-weight:600; padding:10px 0;">✓ SEMINAR COMPLETED</div>`;
    }
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');

  if (dEl) dEl.textContent = String(d).padStart(2, '0');
  if (hEl) hEl.textContent = String(h).padStart(2, '0');
  if (mEl) mEl.textContent = String(m).padStart(2, '0');
  if (sEl) sEl.textContent = String(s).padStart(2, '0');
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    setupLinks();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    startSysClock();
  });
} else {
  setupLinks();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  startSysClock();
}

// ——————————————————————————————————————————
// LIVE SYS_TIME CLOCK
// ——————————————————————————————————————————
function startSysClock() {
  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const el = document.getElementById('sysTimeClock');
    if (el) el.textContent = `${hh}:${mm}:${ss}`;
  }
  tick();
  setInterval(tick, 1000);
}

// ——————————————————————————————————————————
// BRUTALIST GRID MATRIX CANVAS
// ——————————————————————————————————————————
(function initMatrix() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const SPACING = 44;  // Grid cell size
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', function () {
    mouse.x = null; mouse.y = null;
  });

  let time = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const dark = document.documentElement.dataset.theme === 'dark';
    const dotColor = dark ? 'rgba(200,255,0,' : 'rgba(91,33,182,';
    const lineColor = dark ? 'rgba(200,255,0,' : 'rgba(91,33,182,';

    time += 0.006;

    const cols = Math.ceil(W / SPACING) + 1;
    const rows = Math.ceil(H / SPACING) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = c * SPACING;
        const by = r * SPACING;

        // Wave pulse offset
        const wave = Math.sin(time + c * 0.4 + r * 0.3) * 0.5 + 0.5;

        let px = bx, py = by;
        let dotR = 1.2;
        let dotAlpha = dark ? 0.08 + wave * 0.1 : 0.06 + wave * 0.07;

        // Mouse proximity attraction / repulsion
        if (mouse.x !== null) {
          const dx = bx - mouse.x;
          const dy = by - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            px = bx + Math.cos(angle) * force * 14;
            py = by + Math.sin(angle) * force * 14;
            dotR = 1.2 + force * 3.5;
            dotAlpha = (dark ? 0.18 : 0.14) + force * 0.45;
          }
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fillStyle = dotColor + dotAlpha + ')';
        ctx.fill();

        // Horizontal connector line
        if (c < cols - 1) {
          const nx = (c + 1) * SPACING;
          const ny = by;
          const ddist = mouse.x !== null ? Math.sqrt((bx - mouse.x) ** 2 + (by - mouse.y) ** 2) : 9999;
          const lineAlpha = dark
            ? (ddist < mouse.radius ? 0.08 + (1 - ddist / mouse.radius) * 0.18 : 0.04)
            : (ddist < mouse.radius ? 0.06 + (1 - ddist / mouse.radius) * 0.12 : 0.03);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = lineColor + lineAlpha + ')';
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
        // Vertical connector line
        if (r < rows - 1) {
          const nx = bx;
          const ny = (r + 1) * SPACING;
          const ddist = mouse.x !== null ? Math.sqrt((bx - mouse.x) ** 2 + (by - mouse.y) ** 2) : 9999;
          const lineAlpha = dark
            ? (ddist < mouse.radius ? 0.08 + (1 - ddist / mouse.radius) * 0.18 : 0.04)
            : (ddist < mouse.radius ? 0.06 + (1 - ddist / mouse.radius) * 0.12 : 0.03);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = lineColor + lineAlpha + ')';
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ——————————————————————————————————————————
// SCROLL ANIMATIONS (IntersectionObserver)
// ——————————————————————————————————————————
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.05 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ——————————————————————————————————————————
// EVALUATION LOCK CONTROLLER — Target: 30 July 2026 4:15 PM GMT+7
// ——————————————————————————————————————————
function checkEvalLock() {
  const unlockTime = new Date('2026-07-30T16:15:00+07:00');
  const now = new Date();

  const img = document.getElementById('evalQrImg');
  const overlay = document.getElementById('evalLockOverlay');
  const status = document.getElementById('evalStatus');
  const desc = document.getElementById('evalDesc');
  const btn = document.getElementById('evalFormBtn');

  if (!img) return;

  if (now >= unlockTime) {
    img.classList.remove('qr-blurred');
    if (overlay) overlay.style.display = 'none';
    if (status) status.textContent = 'Now available — scan to evaluate!';
    if (desc) desc.textContent = 'Thank you for attending! Please scan the QR code to submit your evaluation. Your feedback helps us improve future events.';
    if (btn) btn.style.display = 'flex';
  } else {
    const diff = unlockTime - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);

    if (status) {
      if (d > 0) status.textContent = `Unlocks in ${d} day${d > 1 ? 's' : ''} and ${h} hour${h !== 1 ? 's' : ''}`;
      else if (h > 0) status.textContent = `Unlocks in ${h} hour${h !== 1 ? 's' : ''} and ${m} min`;
      else status.textContent = `Unlocks in ${m} minute${m !== 1 ? 's' : ''}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', checkEvalLock);
setInterval(checkEvalLock, 60000);


