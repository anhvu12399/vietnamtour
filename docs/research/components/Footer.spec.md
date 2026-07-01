# Footer Component Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** Mobile accordions for menu categories, input form subscription.

## DOM Structure
- `footer.ftr.brand-footer` (container)
  - `div.brand-footer-newsletter` (newsletter container)
    - `h5` ("A world of travel in your inbox")
    - Paragraph subtext
    - Form layout (email text input and Subscribe button)
  - `div.brand-footer-menu` (columns grid)
    - Column 1: Website links
    - Column 2: Resources links
    - Column 3: Company links
    - Column 4: Destinations links
  - `div.brand-footer-social` (social icons list)
  - `div.brand-footer-awards` (trust logos: BBB, USTOA, IATA, Adventure Travel)
  - `div.brand-footer-company` (legal text)
