# PossibilitiesCarousel Component Specification

## Overview
- **Target file:** `src/components/PossibilitiesCarousel.tsx`
- **Interaction model:** Horizontal swipe or navigation arrows, indicators.

## DOM Structure
- `section.brand-carousel-block` (container)
  - `div.brand-carousel-block__container`
    - Box overlay containing:
      - `h2` ("Possibilities, not packages")
      - `a` ("View trip finder")
    - Swiper layout wrapper:
      - Itinerary cards (Rhine Cruise, Netherlands, Amalfi Coast, New Zealand, Thailand, Australia, Switzerland).
  - Navigation indicators / arrows.
