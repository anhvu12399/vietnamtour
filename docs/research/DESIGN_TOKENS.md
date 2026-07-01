# Design Tokens - Audley Travel

This document specifies the design tokens extracted from the Audley Travel CSS stylesheet (`main.63736ac3f2.css`).

## Color Palette

| Token Name | Computed Hex Value | Tailwind v4 Variable | Usage Context |
|---|---|---|---|
| White | `#ffffff` | `--color-white` | Page background, cards, text overlays |
| Primary Green | `#4d726d` | `--color-green` | Brand headers, links, callouts, active elements |
| Dark Green | `#385450` | `--color-dark-green` | Deep brand text, overlays, focus outlines |
| Dark Brand | `#343434` | `--color-dark` | Primary body text, headings, dark background blocks |
| Dark Gray | `#484848` | `--color-dark-gray` | Subtitles, icon fills, meta details |
| Medium Gray | `#a4a4a4` | `--color-lighter-gray` | Form borders, disabled states |
| Light Gray Border | `#d8d8d8` | `--color-light-gray` | Divider borders, line breaks |
| Background Mid | `#dae0e4` | `--bg-mid` | Subtitle borders, table headers, container fills |
| Background Light | `#edf2f2` | `--bg-light` | Section backgrounds, card containers |
| Primary Blue | `#007bc7` | `--color-blue` | CTAs, special buttons, links |
| Dark Blue | `#005b94` | `--color-dark-blue` | Hover states for primary blue buttons |
| Sand / Brown | `#c7c3ab` | `--color-brown` | Warm accent backgrounds, highlight text |
| Light Sand | `#f3f2ed` | `--color-light-brown` | Alternate section backgrounds |
| Warm Gold | `#8f8a6a` | `--color-gold` | Accent headings (`.goldColor`), CTA borders |
| White Footer | `#f0f0f0` | `--color-white-footer` | Footer lists and legal copy |

---

## Typography

The font-families declared in the `@font-face` rules are:

### 1. **Open Sans** (Primary Sans-Serif)
- **Use:** Body copy, buttons, labels, and standard inputs.
- **Font-weight range:** 300 to 800 (variable font).
- **Fallback:** `sans-serif`.

### 2. **Merriweather** (Primary Serif)
- **Use:** Testimonial quotes, italic accents.
- **Font-weight range:** 300 to 900 (variable font, italic).
- **Fallback:** `serif`.

### 3. **The Seasons** (`Seasons` and `Seasons-Light`)
- **Use:** Prominent headings, serif display.
- **Font-weight:** Regular (400) and Light (300).
- **Fallback:** `serif`.

### 4. **Minion Pro**
- **Use:** Editorials, body features, and book-style text.
- **Font-weight:** Medium (500).
- **Fallback:** `serif`.

### 5. **Source Sans 3**
- **Use:** Functional UI, charts, tables.
- **Font-weight range:** 200 to 900.
- **Fallback:** `sans-serif`.

---

## Responsive Breakpoints

The stylesheet makes extensive use of the following breakpoints:

| Breakpoint Name | Media Query | Pixel Equivalent | Layout Changes |
|---|---|---|---|
| `xs` | `min-width: 30em` | `480px` | 1/2 column layouts |
| `sm` | `min-width: 37.5em` | `600px` | Margin increments, 1/4 and 1/3 columns |
| `md` | `min-width: 48em` | `768px` | Hidden/visible elements shift, grid flow, page headers fixed |
| `lg` | `min-width: 64em` | `1024px` | Navbar desktop styling triggers, padding increments |
| `xl` | `min-width: 80em` | `1280px` | Container width increases to 1170px |
| `2xl` | `min-width: 120em` | `1920px` | Container width increases to 1460px |
| `3xl` | `min-width: 160em` | `2560px` | Container width increases to 2060px |

---

## Spacing & Grid System

- **Base scale:** 12px, 16px, 20px, 30px, 40px, 50px, 60px.
- **Column Padding:**
  - Below `600px` (sm): `12px` padding-left, `12px` margin-top.
  - `600px` to `768px` (md): `16px` padding-left, `16px` margin-top.
  - Above `1024px` (lg): `20px` padding-left, `20px` margin-top.
- **Content Max Widths:**
  - Default Container: `100%` width.
  - `lg` viewport: Max width `1140px` (1080px + 60px padding).
  - `xl` viewport: Max width `1170px` (1110px + 60px padding).
  - `2xl` viewport: Max width `1460px` (1400px + 60px padding).
  - `3xl` viewport: Max width `2060px` (2000px + 60px padding).
