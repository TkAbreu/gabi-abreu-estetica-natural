/* =============================================================
   Gabi Abreu — Estética Natural | script.js
   Todos os comportamentos interativos da landing page
============================================================= */

/* ── AOS — Animate On Scroll ────────────────────────────────
   ATENÇÃO: easing deve ser valor CSS válido.
   "ease-out-cubic" não existe em CSS — usar "ease-out"        */
AOS.init({
  duration: 700,
  easing: 'ease-out',
  once: true,
  offset: 120,
  anchorPlacement: 'top-center',
  disable: false,
});

/* ── Scroll Reveal (elementos com classe .reveal) ───────────
   Mantido para títulos, subtítulos e textos que ainda
   usam .reveal / .reveal-delay-*                              */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ── Navbar — escurece ao rolar ─────────────────────────────*/
const navbar = document.getElementById('navbar');
window.addEventListener(
  'scroll',
  () => navbar.classList.toggle('scrolled', window.scrollY > 55),
  { passive: true }
);

/* ── Mobile Drawer ──────────────────────────────────────────*/
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('nav-links');
const backdrop    = document.getElementById('nav-backdrop');
const drawerClose = document.getElementById('drawer-close');

function getFocusableDrawerElements() {
  return Array.from(
    navLinks.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  );
}

function openDrawer() {
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Fechar menu');
  navLinks.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  const focusable = getFocusableDrawerElements();
  if (focusable.length) focusable[0].focus();
}

function closeDrawer() {
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Abrir menu');
  navLinks.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.focus();
}

/* Trap de foco: Tab/Shift+Tab circulam dentro do drawer */
navLinks.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusable = getFocusableDrawerElements();
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
  }
});

hamburger.addEventListener('click', () =>
  navLinks.classList.contains('open') ? closeDrawer() : openDrawer()
);
drawerClose.addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) closeDrawer();
});

/* Evita overflow:hidden vazando ao redimensionar para desktop */
window.addEventListener('resize', () => {
  if (window.innerWidth > 960 && navLinks.classList.contains('open')) closeDrawer();
});

/* ── Tabs (Serviços) ─────────────────────────────────────────
   AOS.refresh() ao trocar aba reativa animações nos cards
   que estavam ocultos em display:none                         */
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    AOS.refresh();
  });
});

/* ── Carousel ───────────────────────────────────────────────*/
function initCarousel(prefix, autoplayMs) {
  const track  = document.getElementById(prefix + '-track');
  const dots   = document.querySelectorAll('#' + prefix + '-dots .carousel-dot');
  const slides = track.querySelectorAll('.carousel-slide');
  let current  = 0;
  let timer;

  function goTo(index) {
    current = ((index % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() { timer = setInterval(() => goTo(current + 1), autoplayMs || 5000); }
  function stopAuto()  { clearInterval(timer); }

  document.getElementById(prefix + '-prev')
    .addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  document.getElementById(prefix + '-next')
    .addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); })
  );
  startAuto();
}

initCarousel('resultados', 6000);
initCarousel('depoimentos', 5000);

/* ── Smooth Scroll ──────────────────────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 76, behavior: 'smooth' });
  });
});

/* ── Spotlight Cards (Diferenciais) ─────────────────────────*/
document.querySelectorAll('.diferencial-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--sx', ((e.clientX - rect.left) / rect.width  * 100) + '%');
    card.style.setProperty('--sy', ((e.clientY - rect.top)  / rect.height * 100) + '%');
  });
});

/* ── Sticky CTA Bar ─────────────────────────────────────────*/
const stickyBar   = document.getElementById('sticky-cta');
const stickyClose = document.getElementById('sticky-cta-close');
const heroSection = document.getElementById('inicio');
const footerEl    = document.querySelector('.footer');
let stickyClosed  = false;

stickyClose.addEventListener('click', () => {
  stickyClosed = true;
  stickyBar.classList.remove('visible');
});

window.addEventListener(
  'scroll',
  () => {
    if (stickyClosed) return;
    const scrollY    = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const footerTop  = footerEl.getBoundingClientRect().top + scrollY;
    const nearFooter = scrollY + window.innerHeight > footerTop - 80;

    stickyBar.classList.toggle('visible', scrollY > heroBottom * 0.65 && !nearFooter);
  },
  { passive: true }
);
