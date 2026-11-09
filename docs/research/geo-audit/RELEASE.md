# Production release history

## Latest update — 1 November 2026

**Deployment:** `dpl_47ei222MhU3Po8mcovV8fwYF2Ahp` — READY<br>
**Production:** https://www.vietnamtours.co.uk<br>
**Inspector:** https://vercel.com/mywaytravelinc-5015s-projects/vietnamtour/47ei222MhU3Po8mcovV8fwYF2Ahp

- Replaced repeated CMS-selected imagery with 50 distinct editorial photographs: 34 from Unsplash and 16 from Wikimedia Commons. The selector now uses concise titles, places and slugs rather than long descriptions that caused unrelated cards to converge on the same image.
- Assigned unique images to each tour card (all 50), destination card (12), month tab (12), accommodation card (6) and travel-guide card (16). Hero and recommendation images on the audited listing pages also avoid duplicates with their cards.
- Added `/photo-credits`, linked in the footer, with all 50 image sources, photographers and licence details. Alt text now describes the image itself.

**Validation:** `npm run check` passed: 0 lint errors / 27 existing warnings, TypeScript passed, production build generated 153 routes. Production smoke checks returned HTTP 200 for itineraries, destinations, ideas-by-month, accommodations, travel-guides and photo-credits. The visible image sets on itineraries (16), destinations (12), accommodations (7) and travel-guides (20) have no repeated files; the 12 month tabs and 50-tour selector were checked for unique assignments.

## Previous release — 31 October 2026

**Deployment:** `dpl_BQmkzeCm5NL9VURFWWMWczxh3Gve` — READY<br>
**Production:** https://www.vietnamtours.co.uk<br>
**Inspector:** https://vercel.com/mywaytravelinc-5015s-projects/vietnamtour/BQmkzeCm5NL9VURFWWMWczxh3Gve

- Published the current Vietnam international tour-operator licence details and the New York company-registration identifier on `/our-story`, with direct sources and an explanation that a DOS ID is not a travel licence or certification. The licence scan is not linked from this site because it contains personal identifiers.
- Identified VietnamTours.co.uk as a Vietnam-focused My Way Travel brand. The legal term “subsidiary” remains unverified by the available documents and is not used.
- Reduced enquiry friction: email is required; name and phone are optional. Accepted-lead analytics now reports a privacy-safe channel, AI flag and evidence type; it does not classify AI Overview referrals separately from ordinary search.
- Added official UK/Vietnam travel-entry and health sources to the first-time guide and removed stale visa/FX/medical specifics. Replaced unsupported route-history, golf-partnership, student-risk and beach-safety promises with trip-specific confirmation wording.
- Updated the import-template CTA copy to remove unsupported experience claims; existing Sanity documents were not edited.

**Validation:** `npm run check` passed: lint 0 errors / 27 warnings, TypeScript passed, production build generated 152 routes. Live smoke checks returned expected credential, official-source and optional-field copy on `/our-story`, `/trip-ideas/first-time-guide-vietnam` and `/enquire`.

**E-E-A-T remains partial across the site.** Experience evidence, full CMS post review, current supplier/pricing verification, exact corporate ownership proof, and the reconciliation between the current licence and legacy registry record remain outstanding.

**Released:** https://www.vietnamtours.co.uk<br>
**Deployment:** `dpl_83PNhCY7jZ7wkWkXmpSnZuhLcGvz` — READY<br>
**Inspector:** https://vercel.com/mywaytravelinc-5015s-projects/vietnamtour/83PNhCY7jZ7wkWkXmpSnZuhLcGvz

## Changes in this release

- Replaced repeated itinerary gallery imagery with destination-based selections. All 47 local itinerary galleries now contain three distinct image files; all referenced files exist. Sanity-backed galleries now select different photos by gallery position rather than duplicating one image across every slot.
- Added six Vietnam photographs from Unsplash with photographer, source page and license records in `public/images/unsplash/credits.json` (17 total credited images in the library). Images are illustrative and are not company field photography.
- Removed unsupported first-hand, personally inspected, routinely updated and 24-hour response claims from the relevant public pages and enquiry confirmation. The homepage carousel now identifies its content as trip-planning prompts, not traveller reviews.
- Removed unsupported “leading specialist”, guaranteed-service, 24/7 support and hotel-vetting claims from the footer and planning process. Removed universal “FEATURED” badges. Marked local catalogue pricing as guide pricing that needs current confirmation.
- Removed guaranteed-weather wording. Replaced unsubstantiated operator/protection language with a link to the Vietnamese tourism authority's operator registry and advice to confirm payment and support terms. The authority's legal name/license formatting still needs matching against the current original business documents.
- Added the site-wide findings and unresolved source/evidence checklist in `EEAT_AUDIT.md`.

## Validation

- `npm run check`: PASS — lint (0 errors, 27 warnings), strict TypeScript and production build.
- Gallery audit: 47/47 local itinerary galleries have no duplicate image files and no missing files.
- Vercel production build: READY; production alias assigned to `https://www.vietnamtours.co.uk`.
- Production smoke checks returned HTTP 200 for `/`, `/specialists`, `/accommodations`, and `/itineraries/vietnam-in-depth-tour`. Homepage planning-prompt disclosure and revised specialist copy were present.
- All six new photo files returned HTTP 200 from production. The published itinerary map displayed OpenStreetMap attribution and loaded 12 OpenStreetMap raster tiles.
- No Sanity CMS document was edited as part of this release. CMS source content still needs the evidence review described in `EEAT_AUDIT.md` and `ARTICLE_REVIEW.md`.
- **E-E-A-T status:** unresolved across the full site. This release improves unsupported copy and records gaps; it does not establish first-hand experience, validate every factual claim/provider/catalogue price, or verify all company/legal records.

---

# Earlier production release — 28 October 2026

**Released:** https://www.vietnamtours.co.uk

- Vercel project: `mywaytravelinc-5015s-projects/vietnamtour`
- Deployment: `dpl_3vNzhTGeAxRxg7mE743FTNHEhsJP`
- Build URL: https://vietnamtour-7t8c5v01i-mywaytravelinc-5015s-projects.vercel.app
- Inspector: https://vercel.com/mywaytravelinc-5015s-projects/vietnamtour/3vNzhTGeAxRxg7mE743FTNHEhsJP
- Ready state: READY; custom production domain assigned.
- Release method: Vercel CLI from this workspace. No Git remote push or CMS content mutation was performed.

## Changes in this completed release

Canonical/sitemap corrections, permanent redirects for empty blog mirrors, preservation of all 50 tour routes and 6 accommodation routes, clean public CMS text without preview encoding, article/breadcrumb schema and functioning internal links.

The public catalogue now has 16 travel guides, including the new private-tour cost and operator-selection guides, plus an editorial policy. Seasonal pages include regional planning support and contextual enquiry links. Six experience articles were rewritten to remove unsupported personal anecdotes, named quotations and heritage claims. Golf, school-trip and beach advice was corrected or framed around provider confirmation.

Unverified specialist profiles are not published. The two former profile URLs permanently redirect to the team contact page. Editors can publish real profiles after recording approval and an evidence URL. Hardcoded additional people, review statistics, testimonials and affiliation badges without sources were removed or replaced with neutral planning content. Corporate information links to the operator's own source and is not labelled independent certification.

Contact and source attribution are carried into the enquiry. Submission success requires an acknowledged delivery channel, and formatted itinerary text is not treated as evidence of AI acquisition. Public analytics events do not include contact information or enquiry notes.

## Lead handling decision

**The user explicitly chose to deploy the frontend without setting up a private Sanity CRM dataset.** The form therefore uses the existing email delivery channel, with acknowledgement checks. It does not store contact details in the public editorial dataset.

A private-dataset guard is in place for any future CRM configuration. The existing Sanity token cannot create datasets, and no private dataset was created. This release does not promise a CRM dashboard or booking-revenue reporting. No valid enquiry, notification email, newsletter or WhatsApp message was sent as part of testing.

## Validation

- `npm run check`: PASS — ESLint, strict TypeScript and production build. ESLint: 0 errors, 27 non-blocking warnings. Rules remain enabled; third-party downloaded research scripts are excluded from project lint.
- `npm run test:geo`: PASS — 13 tests, including attribution, delivery failure/retry, catalogue preservation, timeline behaviour, content corrections and private-only contact storage.
- Final production verification: **130 indexable sitemap URLs, all HTTP 200 with self canonical, one H1 and no noindex**. All 50 tours and 6 hotels preserved. No public text containing Sanity preview-marker sequences.
- 14 empty blog mirrors: 308 redirects to populated guides. Two unverified specialist URLs: 308 to `/specialists`. `/about`: 308 to `/our-story`.
- Article schema, seasonal planning sections, robots, visa corrections and invalid-enquiry HTTP 400 checked on production. The invalid request was rejected before delivery.
- Mobile viewport 390 × 844: no horizontal overflow. Screenshot: `production-mobile.png`.
- Verification evidence: `production-verification.json`, tested at `2026-10-28T15:56:03.936Z`.

Crawling, indexing, AI citations and leads are separate outcomes. These checks confirm the release and technical/content changes, not a guarantee of indexing, an E-E-A-T certification or a forecast of lead volume.

## Previous versions for recovery

Immediately preceding release:
`https://vietnamtour-1su1nrme9-mywaytravelinc-5015s-projects.vercel.app`
(`dpl_Gih1ErXnNZ1NShcvPY8r19R2HSEu`).

Original production before this work:
`https://vietnamtour-k5i8u1x99-mywaytravelinc-5015s-projects.vercel.app`
(`dpl_yC3RpDkbHGXXSBKP4yQW3JnUSaTa`).

A rollback was not needed or performed. Any recovery should explicitly select the intended deployment within the same Vercel project.
