// ── AOS Init ───────────────────────────────────────────────
AOS.init({
  duration: 750,
  easing: "ease-out-cubic",
  once: true,
  offset: 40,
});

// ── Scroll Reveal (keep for elements already using .reveal) ─
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -36px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ── Navbar scroll ──────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 55);
  },
  { passive: true },
);

// ── Mobile drawer ───────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const backdrop = document.getElementById("nav-backdrop");
const drawerClose = document.getElementById("drawer-close");

function openDrawer() {
  hamburger.classList.add("active");
  navLinks.classList.add("open");
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  hamburger.classList.remove("active");
  navLinks.classList.remove("open");
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  navLinks.classList.contains("open") ? closeDrawer() : openDrawer();
});

drawerClose.addEventListener("click", closeDrawer);
backdrop.addEventListener("click", closeDrawer);

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

// Fechar com Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

// ── Tabs ───────────────────────────────────────────────────────
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

// ── Carousel ───────────────────────────────────────────────────
function initCarousel(prefix, autoplayMs) {
  const track = document.getElementById(prefix + "-track");
  const dots = document.querySelectorAll("#" + prefix + "-dots .carousel-dot");
  const slides = track.querySelectorAll(".carousel-slide");
  let current = 0;
  let timer;

  function goTo(index) {
    current = ((index % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), autoplayMs || 5000);
  }
  function stopAuto() {
    clearInterval(timer);
  }

  document.getElementById(prefix + "-prev").addEventListener("click", () => {
    stopAuto();
    goTo(current - 1);
    startAuto();
  });
  document.getElementById(prefix + "-next").addEventListener("click", () => {
    stopAuto();
    goTo(current + 1);
    startAuto();
  });
  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      stopAuto();
      goTo(i);
      startAuto();
    }),
  );
  startAuto();
}

initCarousel("resultados", 6000);
initCarousel("depoimentos", 5000);

// ── Smooth scroll ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target)
      window.scrollTo({ top: target.offsetTop - 76, behavior: "smooth" });
  });
});

// ── Spotlight Cards ────────────────────────────────────────────
document.querySelectorAll(".diferencial-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--sx", x + "%");
    card.style.setProperty("--sy", y + "%");
  });
});

// ── Sticky CTA Bar ─────────────────────────────────────────────
const stickyBar = document.getElementById("sticky-cta");
const stickyClose = document.getElementById("sticky-cta-close");
const heroSection = document.getElementById("inicio");
const footerEl = document.querySelector(".footer");
let stickyClosed = false;

stickyClose.addEventListener("click", () => {
  stickyClosed = true;
  stickyBar.classList.remove("visible");
});

window.addEventListener(
  "scroll",
  () => {
    if (stickyClosed) return;
    const scrollY = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const footerTop = footerEl.getBoundingClientRect().top + scrollY;
    const nearFooter = scrollY + window.innerHeight > footerTop - 80;

    if (scrollY > heroBottom * 0.65 && !nearFooter) {
      stickyBar.classList.add("visible");
    } else {
      stickyBar.classList.remove("visible");
    }
  },
  { passive: true },
);
