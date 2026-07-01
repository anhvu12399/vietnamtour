# DestinationsTabbed Component Specification

## Overview
- **Target file:** `src/components/DestinationsTabbed.tsx`
- **Interaction model:** Click tabs to filter and view different regional destinations.

## DOM Structure
- `section.brand-destinations-tabbed` (container)
  - `div.brand-destinations-tabbed__container`
    - `h2` ("Where are you waiting to discover?")
    - `div.brand-tabs` (tab switcher container)
      - Tab buttons (Japan, Australia & New Zealand, Egypt, Italy, Safari, Rail)
    - `div.brand-destinations-grid` (grid display of cards)
      - Cards (destination specific details: image background, heading title, "I want to explore" button)

## Per-State Content
- **Japan:** Featured image `japan_v1_700x921.webp`
- **Australia & New Zealand:** Featured image `new-zealand_v1_700x921.webp`
- **Egypt:** Featured image `egypt_v1_700x921.webp`
- **Italy:** Featured image `italy_v1_700x921.webp`
- **Safari:** Featured image `464345-highway--monument-valley.webp` (or similar)
- **Rail:** Featured image `1319931-temple-of-heaven-beijing.webp`
