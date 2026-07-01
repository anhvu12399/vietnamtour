# Interaction Patterns - Audley Travel

This document specifies the interactive states, hover behaviors, animation parameters, and script-driven components of the Audley Travel website.

## 1. Hover States & Transitions

### A. Buttons & CTAs
- **General Buttons (`.btn`):** Use smooth background transitions.
  - CSS: `transition: background-color .2s ease, color .2s ease, border-color .2s ease;`
- **Primary Green Buttons (`.btn--cta`):** 
  - Default: Background `#4d726d`, Color `#fff`.
  - Hover: Background `#385450`.
- **Primary Blue Buttons (`.brand-btn-blue`):**
  - Default: Background `#007bc7`, Color `#fff`.
  - Hover: Background `#005b94`.
- **Ghost/White Buttons (`.btn--white` / `.brand-btn-white`):**
  - Default: Background `#fff`, Color `#343434`, Border `1px solid #d8d8d8`.
  - Hover: Background `#edf2f2`, Color `#343434`.

### B. Link Micro-Animations
- **Ancillary Header Links:** Hover transitions color to `#4d726d` or underline.
- **Card Hover Effects:** Custom cards scale/grow image wrappers or show overlays:
  - `.card--tour:hover .icon`: Opacity changes to `1`.
  - `.card--destination:hover img`: Scales up slightly via `transform: scale(1.05)`.
  - `.card--destination:hover::after`: Gradient overlay opacity changes.

---

## 2. Interactive Navigation Components

### A. Mobile Burger Navigation
- **Trigger:** Button `.mob-nav-btn-gray` / `.mob-nav-btn`.
- **States:** Expand classes: `.is-open` or `aria-expanded="true"`.
- **Behavior:** Slide-out drawer or overlay from the right, preventing body scrolling (`.body-no-scroll` class added to `<body>`).

### B. Sticky Navbar Transition
- **Trigger:** Scroll past `50px`.
- **States:** Shrinks header heights and drops a box shadow.
- **CSS Transition:** `transition: height 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;`

---

## 3. Carousel & Sliders (Swiper)

The page implements two primary carousels:

### A. Possibilities Carousel (`section.brand-carousel-block`)
- **Interaction Model:** Drag/Swipe or Nav Click.
- **Pagination:** bullet indicator indicators `.js-brand-pagination` representing indices.
- **Responsive Layout:**
  - Desktop: Shows 3 cards at once.
  - Tablet: Shows 2 cards.
  - Mobile: Shows 1 card, with scroll snapping.

### B. Testimonials Quotation Slider (`section.brand-client-feedback-testimonial`)
- **Interaction Model:** Auto-playing loop or navigation arrows.
- **Transition:** Horizontal cross-fade or slide.
- **Duration:** Typically `5000ms` cycle.

---

## 4. Accordion Toggle Content (Mobile Footer)

- **Selectors:** `.toggle-content-btn` triggers `.toggled` wrapper.
- **Trigger:** Click.
- **Implementation:**
  - Default mobile: `.toggled` has `max-height: 0; overflow: hidden; transition: max-height .3s ease`.
  - Active: Adding `aria-expanded="true"` sets `.toggled` to `max-height: none` or calculates height.
  - Desktop: Media query overrides `.toggled` to `max-height: none; overflow: visible; transition: none`.
