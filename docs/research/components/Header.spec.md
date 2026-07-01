# Header Component Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** Click-driven dropdown menus, active states, mobile hamburger drawer overlay.
- **Computed styles:** 
  - Background: `#ffffff`
  - Border-bottom: `1px solid #d8d8d8`
  - Text-color: `#343434` (hover: `#4d726d`)

## DOM Structure
- `header.hdr` (container)
  - `div.hdr__brand` (brand bar)
    - `div.container`
      - `a.hdr__logo` (contains Logo component)
      - `div.favourites-link-message` (hidden until favorites added)
      - `button.mob-nav-btn` (menu button on mobile)
      - Mobile call/phone icons
  - `div.hdr__content` (menu navigation)
    - `div.hdr__main`
      - `div.container`
        - location selector popover (`.mkt-sel`)
        - favorites link (`.favourites-link`)
        - MyAudley link (`.my-audley-link`)
        - telephone number links (`.telephone`)
        - Quote button (`.btn--cta`)
    - `nav.hdr__nav` (navigation menu link listing)

## States & Behaviors
- **Location Selector:** Clicking the location button opens a list of countries (UK, Canada, etc.).
- **Burger Menu:** Mobile views show a MENU button. Clicking toggle expands a drawer overlay and blocks body scrolling.
- **Header Shrinking:** On scroll, the header padding decreases and gains a box shadow.
