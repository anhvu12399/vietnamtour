# Component Inventory - Audley Travel

This document lists all the components that must be built for the Audley Travel homepage clone.

## 1. Inventory Summary

| Component Name | File Path | Interaction Model | Extracted Selector |
|---|---|---|---|
| **Header** | `src/components/Header.tsx` | Click-driven menus, scroll shrinking | `header.hdr` |
| **Hero** | `src/components/Hero.tsx` | Static media, overlay details | `section.brand-video-hero` |
| **PreambleText** | `src/components/PreambleText.tsx` | Static | `section.brand-preamble-text` |
| **DestinationsTabbed**| `src/components/DestinationsTabbed.tsx`| Click-driven tab switching | `section.brand-destinations-tabbed`|
| **BreakingLine** | `src/components/BreakingLine.tsx` | Static | `section.brand-breaking-line` |
| **JourneyBlock** | `src/components/JourneyBlock.tsx` | Static / Hover transitions | `section.brand-journey-block` |
| **PossibilitiesCarousel**| `src/components/PossibilitiesCarousel.tsx`| Horizontal drag / pagination | `section.brand-carousel-block` |
| **Testimonials** | `src/components/Testimonials.tsx` | Slide cycle transition | `section.brand-client-feedback-testimonial`|
| **CTASection** | `src/components/CTASection.tsx` | Hover transitions | `section.brand-cta` |
| **BrochureRequest** | `src/components/BrochureRequest.tsx` | Hover transitions | `section.brand-brochure-request` |
| **WhyUs** | `src/components/WhyUs.tsx` | Hover transitions | `section.brand-why-us` |
| **Footer** | `src/components/Footer.tsx` | Mobile accordion drawers | `footer.ftr.brand-footer` |

---

## 2. Component Details

### A. Header (`Header.tsx`)
- **Structure:**
  - Logo: Inline custom SVG logo.
  - Location Selector: Popover/dropdown list allowing market updates.
  - Hamburger Menu: Sliding drawer for tablet/mobile overlays.
- **Computed CSS Colors:**
  - Background: `#ffffff`
  - Border Bottom: `1px solid #d8d8d8`
  - Text Color: `#343434`

### B. DestinationsTabbed (`DestinationsTabbed.tsx`)
- **Structure:**
  - Header: `<h2>` - "Where are you waiting to discover?"
  - Tabs Row: Scrollable buttons for regions (e.g. "Asia", "Africa", "Europe", "South America").
  - Grid Cards: Image, title, subtitle, and primary button.
- **State management:** React `useState` tracks the selected region. Switching tabs changes the cards via state filters.

### C. PossibilitiesCarousel (`PossibilitiesCarousel.tsx`)
- **Structure:**
  - Carousel window containing cards with travel ideas (Rhine Cruise, Amalfi Coast, New Zealand drive).
  - Navigation buttons: Chevron arrows and dot indicators.
- **Fidelity detail:** Smooth horizontal slide transition.

### D. Testimonials (`Testimonials.tsx`)
- **Structure:**
  - Centered double-quote SVG icons.
  - Large quotation text (`Merriweather` italic font).
- **Behavior:** Fades through different customer feedback reviews automatically.

### E. Footer (`Footer.tsx`)
- **Structure:**
  - Form: Newsletter subscription input field.
  - Accordion panels: Toggle columns on mobile screen widths.
  - Badges row: BBB, USTOA, IATA logos.
- **Behavior:** Links collapse into accordions when viewport is less than `768px`.
