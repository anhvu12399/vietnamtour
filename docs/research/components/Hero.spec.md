# Hero Component Specification

## Overview
- **Target file:** `src/components/Hero.tsx`
- **Interaction model:** Static fallback image or HTML video, input text search.
- **Computed styles:**
  - Overlay: `rgba(0,0,0,0.3)`
  - Title Font: `Merriweather` italic or serif font

## DOM Structure
- `section.brand-video-hero` (container)
  - `div.brand-video-hero__overlay`
  - `video` (background player)
  - `div.brand-video-hero__container`
    - `h1` (main header: "Find out where you're meant to be.")
    - `div.search-bar` (text input + submit icon)
