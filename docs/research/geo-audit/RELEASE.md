# Production release — 28 October 2026

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
