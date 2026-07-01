# Layout Architecture - Audley Travel

This document describes the layout structure, grid systems, sticky position behaviors, and layer (z-index) configurations of the Audley Travel website.

## 1. Grid & Column System

Audley Travel uses a custom Flexbox-based grid layout rather than native CSS Grid for its major sections.

- **Class structure:** `.grid` contains one or more `.col` children.
- **Offsets and Margin:** 
  - Gaps are handled using negative margins on the parent grid wrapper and positive padding on the columns.
  - Mobile: `.grid` has `margin-top: -12px; margin-left: -12px`. Columns have `padding-left: 12px; margin-top: 12px`.
  - Tablet (`min-width: 37.5em` / 600px): `.grid` has `margin-top: -16px; margin-left: -16px`. Columns have `padding-left: 16px; margin-top: 16px`.
  - Desktop (`min-width: 64em` / 1024px): `.grid` has `margin-top: -20px; margin-left: -20px`. Columns have `padding-left: 20px; margin-top: 20px`.
- **Column Fractions:**
  - `.col--1/3`: `flex: 0 0 33.333333%; max-width: 33.333333%`
  - `.col--1/2`: `flex: 0 0 50%; max-width: 50%`
  - `.col--2/3`: `flex: 0 0 66.666667%; max-width: 66.666667%`
  - Responsive variants: `.col--xs-1/2`, `.col--sm-1/3`, `.col--md-1/4`, `.col--lg-1/2`, etc.

---

## 2. Sticky & Positioned Elements

The page relies on a series of sticky elements to keep navigation and utilities accessible:

### A. The Header (`header.hdr`)
- **Behavior:** Fixed or sticky at the very top.
- **Desktop CSS:** `position: sticky; top: 0; z-index: 100;` (shrink behavior on scroll).

### B. Jump Links Container (`.jump-links-container` / `.page-hdr`)
- **Behavior:** Sticks below the header on scroll.
- **Desktop CSS:** `position: sticky; top: 60px; z-index: 3;`
- **Effects:** When stuck (adds `.is-stuck` class), a box shadow overlay drops down to visually separate it.

### C. Filter Bar (`.listing__filterbar`)
- **Behavior:** Sticks at the top of listing pages.
- **Desktop CSS:** `position: sticky; top: 60px; z-index: 15;`

---

## 3. Z-Index Layer Map

To avoid overlap bugs, the page has structured layering:

| Selector | Z-Index | Purpose |
|---|---|---|
| `.filter-menu` | `1001` | Slide-out mobile filter drawer |
| `.filter-overlay` | `1000` | Backdrop tint under mobile drawer |
| `header.hdr` | `100` | Main global navigation header |
| `.time-driven-popup` | `99` | Slide-in promotion / contact widget |
| `.listing__filterbar` | `15` | Sticky filter bar for listing pages |
| `.jump-links-container` | `3` | Anchor nav under the header |
| `.play-btn` | `1` | Video play overlays |

---

## 4. Scroll snapping
Some carousel sections (e.g. `.tabs--season .tabs__nav`) utilize CSS scroll snapping:
- `scroll-snap-type: both mandatory` on scroll containers.
- `scroll-snap-align: center` on items.
