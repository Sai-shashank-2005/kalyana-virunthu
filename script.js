/* ============================================================
   Santhosh weds Priya — Wedding Invitation Main Script
   Resolution-independent parallax hero, buttery native scroll,
   scroll-reveals, and ambient background music player.
   ============================================================ */

// Clean scroll restoration on reload
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const heroTrack = document.getElementById("heroTrack");
const groomHand = document.getElementById("groomhand");
const brideHand = document.getElementById("bridehand");
const groomHandCut = document.getElementById("groomhandcut");
const handsStage = document.getElementById("handsStage");
const bgBig = document.getElementById("bgBig");
const scrollCue = document.getElementById("scrollCue");
const allText = document.getElementById("allText");

const flowers = ["f1", "f2", "f3", "f4", "f5", "f6"].map((id) =>
  document.getElementById(id),
);

const supportsWebP = (() => {
  const canvas = document.createElement("canvas");
  return canvas.toDataURL("image/webp").startsWith("data:image/webp");
})();

const toPreferredFormat = (src) =>
  supportsWebP ? src.replace(/\.png$/i, ".webp") : src;

function hydrateImages(selector) {
  document.querySelectorAll(selector).forEach((img) => {
    const baseSrc = img.dataset.src;
    if (!baseSrc || img.getAttribute("src")) return;
    img.src = toPreferredFormat(baseSrc);
  });
}

/* ---------- tunables ---------- */

const POSE = {
  groom: { x: -35.0, y: 23.8, rot: 0 },
  brideCut: { x: -35.0, y: 23.8, rot: 0 },
  bride: { x: 30.3, y: 15.5, rot: 15 },
};

const ENTRY = {
  groom: { x: -38, y: 0, rot: 0 },
  brideCut: { x: -38, y: 0, rot: 0 },
  bride: { x: 38, y: -42, rot: 5 },
};

const SCALE = { START: 0.82, END: 1.0 };
const HANDS_PHASE = 0.42;
const TEXT_FADE = { START: 0.42, END: 0.75 };

const AUTO = {
  DELAY: 400,
  PHASE1_DURATION: 1600,
  PAUSE: 250,
  PHASE2_DURATION: 1200,
  TARGET: TEXT_FADE.END,
};

/* ---------- helpers ---------- */

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const stageProgress = (v, start, end) =>
  clamp((v - start) / (end - start), 0, 1);
const ease = (t) => 1 - Math.pow(1 - t, 3);
const easeIO = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ---------- state ---------- */

let currentProgress = 0;
let ticking = false;
let autoRAF = null;
let autoTimeout = null;
let autoDone = false;

function getScrollProgress() {
  if (!heroTrack) return 0;
  const maxScroll = heroTrack.offsetHeight - window.innerHeight;
  if (maxScroll <= 0) return 1;
  const scrollY = window.scrollY || window.pageYOffset || 0;
  return clamp(scrollY / maxScroll, 0, 1);
}

/* ---------- main render ---------- */

function render(raw) {
  if (raw === undefined) {
    raw = currentProgress;
  }
  raw = clamp(raw, 0, 1);

  /* --- HANDS --- */
  const hp = ease(clamp(raw / HANDS_PHASE, 0, 1));
  const inv = 1 - hp;
  const scale = SCALE.START + (SCALE.END - SCALE.START) * ease(raw);

  function poseHand(el, pose, entry) {
    if (!el) return;
    const x = pose.x + entry.x * inv;
    const y = pose.y + entry.y * inv;
    const r = pose.rot + entry.rot * inv;
    el.style.transform = `translate3d(${x}%, ${y}%, 0) rotate(${r}deg) scale(${scale})`;
  }

  poseHand(groomHand, POSE.groom, ENTRY.groom);
  poseHand(groomHandCut, POSE.brideCut, ENTRY.brideCut);
  poseHand(brideHand, POSE.bride, ENTRY.bride);

  /* --- BACKGROUND --- */
  if (bgBig) {
    const bgP = ease(raw);
    bgBig.style.transform = `scale(${1.06 - 0.06 * bgP})`;
  }

  /* --- FOCUS PROGRESS --- */
  const tp = ease(stageProgress(raw, TEXT_FADE.START, TEXT_FADE.END));
  const tInv = 1 - tp;

  /* --- FLOWERS --- */
  const FLOWER_MOTION = {
    f1: { i: 1, dx: -55, dy: 0, rot: -7 },
    f2: { i: 0, dx: -60, dy: 30, rot: -9 },
    f3: { i: 4, dx: 55, dy: 0, rot: 7 },
    f4: { i: 5, dx: -60, dy: 0, rot: -6 },
    f5: { i: 2, dx: -60, dy: -30, rot: -8 },
    f6: { i: 3, dx: 60, dy: 30, rot: 9 },
  };

  flowers.forEach((el) => {
    if (!el) return;
    const m = FLOWER_MOTION[el.id];
    if (!m) return;
    const from = 0.2 + m.i * 0.07;
    const p = ease(stageProgress(raw, from, from + 0.3));
    const fInv = 1 - p;

    const popLift = tInv * -3;
    const popScale = 1 + tp * 0.06;
    const popBlur = tInv * 5;

    el.style.opacity = p;
    el.style.filter = `blur(${popBlur}px)`;
    el.style.transform =
      `translate3d(${m.dx * fInv}%, ${m.dy * fInv + popLift}%, 0) ` +
      `rotate(${m.rot * fInv}deg) scale(${(0.86 + 0.14 * p) * popScale})`;
  });

  /* --- ALL TEXT --- */
  if (allText) {
    allText.style.opacity = tp;
    allText.style.filter = `blur(${tInv * 14}px)`;
    allText.style.transform = `translate3d(0, ${tInv * 3}%, 0) scale(${0.94 + tp * 0.06})`;
  }
  if (handsStage) {
    handsStage.style.filter = `blur(${tp * 4}px)`;
    handsStage.style.opacity = 1 - tp * 0.35;
  }

  if (scrollCue) {
    scrollCue.style.opacity = 1 - clamp(raw * 3, 0, 1);
  }
}

/* ---------- native scroll handler ---------- */

function onScroll() {
  cancelAuto();
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      currentProgress = getScrollProgress();
      render(currentProgress);
      ticking = false;
    });
  }
}

window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- auto-intro (plays once, user scroll cancels) ---------- */

function cancelAuto() {
  if (autoRAF !== null) {
    cancelAnimationFrame(autoRAF);
    autoRAF = null;
  }
  if (autoTimeout !== null) {
    clearTimeout(autoTimeout);
    autoTimeout = null;
  }
  autoDone = true;
}

function animateProgress(from, to, duration, onDone) {
  const t0 = performance.now();
  const step = (now) => {
    if (autoDone) return;
    const t = clamp((now - t0) / duration, 0, 1);
    currentProgress = from + (to - from) * easeIO(t);
    render(currentProgress);
    if (t < 1) {
      autoRAF = requestAnimationFrame(step);
    } else {
      autoRAF = null;
      if (onDone) onDone();
    }
  };
  autoRAF = requestAnimationFrame(step);
}

function startAuto() {
  if (autoDone) return;
  const scrollY = window.scrollY || window.pageYOffset || 0;
  if (scrollY > 20) {
    autoDone = true;
    currentProgress = getScrollProgress();
    render(currentProgress);
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    currentProgress = AUTO.TARGET;
    autoDone = true;
    render(currentProgress);
    return;
  }

  const meetPos = HANDS_PHASE;
  const finalPos = AUTO.TARGET;

  animateProgress(0, meetPos, AUTO.PHASE1_DURATION, () => {
    autoTimeout = setTimeout(() => {
      if (autoDone) return;
      autoTimeout = null;
      animateProgress(meetPos, finalPos, AUTO.PHASE2_DURATION, () => {
        autoDone = true;
      });
    }, AUTO.PAUSE);
  });
}

// User interactions cancel auto-play smoothly
window.addEventListener("touchstart", cancelAuto, { passive: true, once: true });
window.addEventListener("wheel", cancelAuto, { passive: true, once: true });
window.addEventListener("keydown", cancelAuto, { passive: true, once: true });

/* ---------- scroll cue click ---------- */

if (scrollCue) {
  scrollCue.style.cursor = "pointer";
  scrollCue.addEventListener("click", () => {
    cancelAuto();
    const nextSec = document.getElementById("auspicious");
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* ---------- resize / orientation ---------- */

window.addEventListener(
  "resize",
  () => {
    cancelAuto();
    currentProgress = getScrollProgress();
    render(currentProgress);
  },
  { passive: true },
);

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    currentProgress = getScrollProgress();
    render(currentProgress);
  }, 250);
});

/* ---------- loading screen ---------- */

const loader = document.getElementById("loader");
const loaderPct = document.getElementById("loaderPct");
const loaderMsg = document.getElementById("loaderMsg");
const ringFill = document.getElementById("ringFill");

const RING_C = 276.46; // 2 * PI * r, r=44
const LOADER_TIMEOUT = 12000;

const MESSAGES = [
  "Setting the scene",
  "Arranging the flowers",
  "Polishing the ring",
  "Almost ready",
];

const CRITICAL_ASSETS = [
  "images/bbg.png",
  "images/groomhand.png",
  "images/bridehand.png",
  "images/groomhandcut.png",
].map(toPreferredFormat);

const DECORATIVE_ASSETS = [
  "images/texts/all_text.png",
  "images/objects/f1.png",
  "images/objects/f2.png",
  "images/objects/f3.png",
  "images/objects/f4.png",
  "images/objects/f5.png",
  "images/objects/f6.png",
].map(toPreferredFormat);

let loaded = 0;
let finished = false;
let shownPct = 0;
let decorativeStarted = false;
let decorativeReady = false;

function markDecorativeReady() {
  if (decorativeReady) return;
  decorativeReady = true;
  document.body.classList.add("decorative-ready");
  hydrateImages("#allText[data-src], .flower[data-src]");
}

function preloadDecorativeAssets() {
  if (decorativeStarted) return;
  decorativeStarted = true;

  let complete = 0;
  DECORATIVE_ASSETS.forEach((src) => {
    const img = new Image();
    let counted = false;
    const once = () => {
      if (counted) return;
      counted = true;
      complete++;
      if (complete >= DECORATIVE_ASSETS.length) markDecorativeReady();
    };

    img.loading = "eager";
    img.decoding = "async";
    img.fetchPriority = "low";
    img.onload = once;
    img.onerror = once;
    img.src = src;
    if (img.complete) once();
  });
}

function setProgress(frac) {
  const pct = Math.round(frac * 100);
  if (pct < shownPct) return;
  shownPct = pct;
  if (loaderPct) loaderPct.textContent = `${pct}%`;
  if (ringFill) ringFill.style.strokeDashoffset = RING_C * (1 - frac);

  const idx = Math.min(Math.floor(frac * MESSAGES.length), MESSAGES.length - 1);
  if (loaderMsg && loaderMsg.dataset.idx !== String(idx)) {
    loaderMsg.dataset.idx = String(idx);
    loaderMsg.classList.add("is-swapping");
    setTimeout(() => {
      loaderMsg.textContent = MESSAGES[idx];
      loaderMsg.classList.remove("is-swapping");
    }, 200);
  }
}

function finish() {
  if (finished) return;
  finished = true;

  setProgress(1);
  preloadDecorativeAssets();

  setTimeout(() => {
    if (loader) {
      loader.classList.add("loader--done");
      setTimeout(() => loader && loader.remove(), 800);
    }
    // Ensure music is triggered and unmuted when curtain lifts
    if (bgAudio && !userExplicitlyPaused) {
      bgAudio.muted = false;
      bgAudio.volume = 0.65;
      bgAudio.play().then(() => updateAudioUI(true)).catch(() => {});
    }
    setTimeout(startAuto, AUTO.DELAY);
  }, 420);
}

function bumpLoaded() {
  loaded++;
  if (loaded === 1) preloadDecorativeAssets();
  setProgress(Math.min(loaded / CRITICAL_ASSETS.length, 1));
  if (loaded >= CRITICAL_ASSETS.length) finish();
}

function preload() {
  setProgress(0);

  CRITICAL_ASSETS.forEach((src) => {
    const img = new Image();
    let counted = false;
    const once = () => {
      if (counted) return;
      counted = true;
      bumpLoaded();
    };
    img.onload = once;
    img.onerror = once;
    img.src = src;
    if (img.complete) once();
  });

  setTimeout(finish, LOADER_TIMEOUT);
}

/* ---------- scroll reveals ---------- */

function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -40px 0px", threshold: 0.12 },
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ============================================================
   BACKGROUND MUSIC CONTROLLER (DEFAULT AUTOPLAY & TOGGLE)
   ============================================================ */

const bgAudio = document.getElementById("bgAudio");
const audioToggleBtn = document.getElementById("audioToggleBtn");
const audioBars = document.getElementById("audioBars");
const audioIconMuted = document.getElementById("audioIconMuted");
const audioLabel = document.getElementById("audioLabel");

let userExplicitlyPaused = false;

function updateAudioUI(isPlaying) {
  if (!audioToggleBtn) return;
  const actuallyOff = userExplicitlyPaused && !isPlaying;
  if (!actuallyOff) {
    audioToggleBtn.classList.add("is-playing");
    if (audioBars) audioBars.style.display = "flex";
    if (audioIconMuted) audioIconMuted.style.display = "none";
    if (audioLabel) audioLabel.textContent = "Music";
    audioToggleBtn.setAttribute("aria-label", "Pause background music");
  } else {
    audioToggleBtn.classList.remove("is-playing");
    if (audioBars) audioBars.style.display = "none";
    if (audioIconMuted) audioIconMuted.style.display = "block";
    if (audioLabel) audioLabel.textContent = "Music Off";
    audioToggleBtn.setAttribute("aria-label", "Play background music");
  }
}

function startAudioPlayback() {
  if (!bgAudio || userExplicitlyPaused) return Promise.resolve();
  bgAudio.muted = false;
  bgAudio.volume = 0.65;
  const promise = bgAudio.play();
  if (promise !== undefined) {
    return promise
      .then(() => {
        updateAudioUI(true);
      })
      .catch((err) => {
        // Fall back to muted stream so audio timeline runs from load,
        // and un-mutes to full volume on first visitor touch/click/scroll
        bgAudio.muted = true;
        bgAudio.play().then(() => {
          updateAudioUI(true);
        }).catch(() => {
          updateAudioUI(true);
        });
        throw err;
      });
  }
  return Promise.resolve();
}

const playAudio = startAudioPlayback;

function pauseAudioPlayback() {
  if (!bgAudio) return;
  bgAudio.pause();
  updateAudioUI(false);
}

if (bgAudio && audioToggleBtn) {
  // Sync UI automatically on audio element state changes
  bgAudio.addEventListener("playing", () => updateAudioUI(true));
  bgAudio.addEventListener("play", () => updateAudioUI(true));
  bgAudio.addEventListener("pause", () => {
    if (userExplicitlyPaused) updateAudioUI(false);
  });
  bgAudio.addEventListener("ended", () => {
    if (userExplicitlyPaused) updateAudioUI(false);
  });

  // Toggle button click: toggle playback directly without any race condition
  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!bgAudio.paused && !bgAudio.muted) {
      userExplicitlyPaused = true;
      pauseAudioPlayback();
    } else {
      userExplicitlyPaused = false;
      bgAudio.muted = false;
      bgAudio.volume = 0.65;
      bgAudio.play().then(() => updateAudioUI(true)).catch(() => {});
    }
  };

  audioToggleBtn.addEventListener("click", handleToggle);
  audioToggleBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
  audioToggleBtn.addEventListener("touchstart", (e) => e.stopPropagation(), { passive: true });

  // First interaction gesture to unlock unmuted sound on modern mobile/desktop browsers
  const gestureEvents = [
    "pointerdown",
    "click",
    "touchstart",
    "touchend",
    "touchmove",
    "scroll",
    "wheel",
    "keydown",
  ];
  const handleFirstGesture = (e) => {
    if (e.target && e.target.closest && e.target.closest("#audioToggleBtn")) return;
    if (userExplicitlyPaused) return;

    if (bgAudio) {
      bgAudio.muted = false;
      bgAudio.volume = 0.65;
      bgAudio.play()
        .then(() => {
          updateAudioUI(true);
          cleanupGestureListeners();
        })
        .catch(() => {});
    }
  };

  function cleanupGestureListeners() {
    gestureEvents.forEach((evt) => {
      window.removeEventListener(evt, handleFirstGesture);
      document.removeEventListener(evt, handleFirstGesture);
    });
  }

  gestureEvents.forEach((evt) => {
    window.addEventListener(evt, handleFirstGesture, { passive: true });
    document.addEventListener(evt, handleFirstGesture, { passive: true });
  });

  const loaderEl = document.getElementById("loader");
  if (loaderEl) {
    ["click", "pointerdown", "touchstart", "touchend"].forEach((evt) => {
      loaderEl.addEventListener(evt, handleFirstGesture, { passive: true });
    });
  }

  // Attempt initial playback immediately with unmuted sound
  startAudioPlayback().catch(() => {});
  window.addEventListener("load", () => startAudioPlayback().catch(() => {}), { once: true });
  document.addEventListener("DOMContentLoaded", () => startAudioPlayback().catch(() => {}), { once: true });
}

/* ---------- init execution ---------- */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollReveals);
} else {
  initScrollReveals();
}

hydrateImages(
  "#groomhand[data-src], #bridehand[data-src], #groomhandcut[data-src]",
);

render(0);
preload();
