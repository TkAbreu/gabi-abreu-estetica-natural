# Gabi Abreu Estética Natural — Landing Page

Professional landing page built for **Gabi Abreu**, a natural aesthetics specialist based in Taubaté, São Paulo, Brazil. The page is designed to convert visitors into clients through direct WhatsApp contact.

**Live site:** [www.gabiabreuesteticanatural.com.br](https://www.gabiabreuesteticanatural.com.br)

---

## Deployment

| Service | Details |
|---|---|
| **Hosting** | [Vercel](https://vercel.com) |
| **Domain registrar** | [Registro.br](https://registro.br) |
| **Domain** | `gabiabreuesteticanatural.com.br` |

The project is deployed directly from this repository via Vercel's Git integration. Every push to the `main` branch triggers an automatic production deployment.

---

## Project Structure

```
cliente-gabi-abreu/
├── index.html          # Main page markup
├── style.css           # Styles and design system
├── script.js           # Behaviors and interactivity
└── assets/
    ├── logo/           # Logotype and favicon
    ├── fotosGabi/      # Professional photos
    ├── outrasFotos/    # Background and ambient images
    └── antes_depois/   # Before × after results gallery
```

---

## Technologies

### Languages
- **HTML5** — semantic markup with native elements (`<nav>`, `<section>`, `<article>`, `<footer>`)
- **CSS3** — complete styling system with no frameworks
- **JavaScript ES6+** — interactivity logic with no framework dependencies

### External Libraries (CDN)
| Library | Version | Purpose |
|---|---|---|
| [AOS — Animate On Scroll](https://michalsnik.github.io/aos/) | 2.3.4 | Scroll-triggered entrance animations |
| [Google Fonts](https://fonts.google.com/) | — | Cormorant Garamond and Jost typefaces |

### Analytics & Tracking
| Tool | ID |
|---|---|
| Google Analytics 4 | `G-NR4DH36CT9` |
| Meta Pixel (Facebook) | `450648716406340` |

---

## CSS Techniques

### Design System
- **CSS Custom Properties** — centralized design tokens for colors, fonts, and spacing
- **`clamp()`** — fluid typography that scales between breakpoints without extra media queries
- **`min()`** — responsive containers with a max-width cap (`width: min(1200px, 90%)`)

### Layout
- **CSS Grid** — navbar, About section, differentials, footer, results grids
- **Flexbox** — alignment and distribution of elements throughout the page

### Visual Effects
- **`backdrop-filter: blur()`** — frosted glass effect on the navbar, hero badges, and floating CTA
- **`::before` / `::after` pseudo-elements** — decorative overlays, noise grain texture, and animated border on the profile photo
- **`@keyframes`** — custom animations: `bounce`, `beam1/2/3` (light rays), `floatA/B/C/D` (floating), `marqueeScroll` (scrolling ticker)
- **`animation-play-state: paused`** — pauses the marquee on hover
- **CSS Variables via JavaScript** — `--sx` / `--sy` injected at runtime for the cursor-tracking spotlight effect

### Responsiveness
Breakpoints at: `480px`, `540px`, `600px`, `640px`, `768px`, `769px–1024px`, `900px`, `960px`, `1100px`

---

## JavaScript Techniques

### Scroll & Visibility
- **`IntersectionObserver` API** — custom scroll-reveal system applied via the `.reveal` class
- **`window.addEventListener('scroll', ..., { passive: true })`** — passive scroll listener to avoid blocking the main thread

### Mobile Navigation
- **Drawer with full focus trap** — Tab/Shift+Tab cycle confined to menu elements
- **`Escape` key listener** — closes the drawer on key press
- **`window.addEventListener('resize', ...)`** — resets drawer state on viewport resize
- **ARIA state management via JS** — `aria-expanded` and `aria-label` toggled dynamically

### Carousel
- **Touch events** (`touchstart` / `touchend`) — swipe support on mobile devices
- **`transform: translateX`** — GPU-accelerated sliding with no layout reflow
- **`setInterval` / `clearInterval`** — autoplay with pause on user interaction

### Mouse Tracking
- **`element.style.setProperty()`** — real-time CSS variable injection for the spotlight effect that follows the cursor in the hero section

### Smooth Scroll
- **`window.scrollTo({ behavior: 'smooth' })`** — programmatic scroll with offset calculated from the fixed navbar height

---

## Accessibility

- `aria-label`, `aria-expanded`, `aria-controls`, `aria-modal`, `aria-hidden` on all relevant interactive elements
- Full keyboard navigation (Tab, Shift+Tab, Escape)
- `lang="pt-BR"` declared on the `<html>` element
- `rel="noopener"` on all external links

---

## Performance

- `loading="lazy"` on below-the-fold images
- `loading="eager"` on the first carousel slide (above the fold)
- `background-attachment: scroll` instead of `fixed` to avoid paint performance issues on mobile
- Scroll listeners with `passive: true` flag
- CSS animations using `transform` and `opacity` (composited properties, no reflow)
- `<noscript>` fallback for the Meta Pixel

---

## SEO

- Descriptive `<meta name="description">`
- Semantic heading hierarchy (`h1` → `h2` → `h3`)
- Descriptive `alt` attributes on all images
- Clean URL structure

---

## Page Sections

| Section | Content |
|---|---|
| Hero | Main headline, credential badges, WhatsApp CTA |
| About | Professional introduction, mission and values |
| Services | Treatment cards with individual CTAs |
| Results | Before × after photo carousel |
| Differentials | Value proposition with icons |
| Testimonials | Client reviews carousel |
| Packages | Plans and pricing table |
| FAQ | Frequently asked questions |
| Location | Embedded Google Maps and address |
| Footer | Social links, contact info, and legal information |
| Floating CTA | Always-visible WhatsApp button |

---

## Contact & Social

- WhatsApp: `(12) 98214-3105`
- Instagram: [@gabiabreu.esteticanatural](https://instagram.com/gabiabreu.esteticanatural)
- Location: Taubaté, SP — Estúdio Natália Antunes
