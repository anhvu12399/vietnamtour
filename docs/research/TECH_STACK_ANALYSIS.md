# Technical Stack Analysis - Audley Travel

This document lists the technical components discovered on the Audley Travel website and maps them to their modern equivalent implementations in our Next.js codebase.

## 1. Stack Comparison

| Technical Category | Original Implementation | Rebuilt Next.js Template Equivalent |
|---|---|---|
| **Core Framework** | Custom CMS / SSR Server | **Next.js 16 (App Router)** + React 19 (Strict TypeScript) |
| **Styling Library** | Custom SASS / Compiled CSS | **Tailwind CSS v4** + CSS variables mapping in `globals.css` |
| **Layout Model** | Flexbox grids (`.grid`, `.col`) | **Tailwind CSS Flex / Grid** classes conforming to design tokens |
| **Icons** | SVG sprites (`use href="..."`), inline SVGs | **Lucide React** + extracted custom inline SVG React components |
| **Carousels** | Swiper JS | **Embla Carousel / Radix primitives** (via shadcn Carousel components) |
| **Mobile Navigation** | Custom JS toggle classes | **Radix Dialog / Popover** (via shadcn Sheet / Drawer components) |
| **Cookie Banner** | OneTrust Cookies Consent | Mock banner or omitted (Out of Scope per plan) |
| **Image Hosting** | Cloudflare CDN | Local assets under `/images/` + **Next.js `next/image`** optimization |

---

## 2. Code Equivalents Strategy

### A. Grids
The original CSS uses a column system where classes like `.col--lg-1/3` represent widths. We will map these directly to Tailwind classes:
- `.col--lg-1/3` -> `lg:w-1/3 w-full`
- `.col--md-1/2` -> `md:w-1/2 w-full`
- `.grid` -> `flex flex-wrap -mx-2 md:-mx-4 lg:-mx-5`

### B. Typography
We will load **Open Sans** and **Merriweather** directly via `next/font/google` for speed and simplicity. For **Minion Pro**, we will host the custom `minionpro-medium.woff2` file locally under `public/fonts/` and register it using `next/font/local` to guarantee pixel-perfect font weights and characters.

### C. SVGs & Icons
All primary SVGs (Logo, Search, Phone, Chevron, etc.) will be stored in `src/components/icons.tsx` as functional React components:
```tsx
export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props}>
    {/* Extracted paths from original */}
  </svg>
);
```
This keeps our source clean and component files highly reusable.
