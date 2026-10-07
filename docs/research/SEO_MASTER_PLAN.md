# SEO Master Plan — vietnamtours.co.uk (UK market)

Owner goal: rank on Google UK and Bing (which also feeds ChatGPT Search) for **private / luxury / tailor-made Vietnam holidays**, and convert visits into enquiries.
Companion docs: [GEO_PLAN.md](GEO_PLAN.md) (AI answer engines) · [GEO_RUNBOOK.md](GEO_RUNBOOK.md) (ops). GEO is a subset of this plan — everything here also helps ChatGPT visibility.

Stack: Next.js 16 (App Router, ISR 60s) · Sanity · Vercel.

---

## 0. Where we are (evidence from the repo / git history)

| Fact | Source | Implication |
|---|---|---|
| Only ~27 of 136 sitemap URLs were indexed; cause was a global canonical pointing every page to the homepage | commit `29e1cdb`, `d429829` | Biggest win already shipped. Priority now = **get Google to recrawl and re-index**, then monitor. |
| `/blog/*` is a noindex mirror of `/travel-guides/*` (canonical → travel-guides) | `blog/[slug]/page.tsx` | One URL per piece of content. Keep it that way. |
| `/enquire` noindex, `/accommodations` out of sitemap (no content) | sitemap.ts | Fine. Accommodation pages need real content before they return. |
| ~50 itineraries, many scraped (`tours_data.json`); day-by-day text partly **templated** (`itineraryDetailsBuilder.ts`) | code | Thin / near-duplicate content risk across itinerary pages. |
| Catalogue prices inconsistent (e.g. 10-day tours £1,450 vs £5,200; homepage "from £3,960pp"; 31 day-tours at £120) | `/vietnam-guides/vietnam-tour-cost-from-uk` data | Trust + SERP-snippet mismatch. Needs a pricing audit. |
| Structured data, answer-first guides, llms.txt, IndexNow, AI-crawler logging now exist | this branch | Foundation for Phases 1–3 below is done. |
| Overlap: `/visa-guide` and `/vietnam-guides/vietnam-visa-for-uk-citizens` target the same query | new guide | **Keyword cannibalisation** — decide a primary (see §4). |
| No evidence of Bing Webmaster Tools, review profiles, or backlink programme | repo | Biggest off-site gaps. |

---

## 1. Strategy in one paragraph

Win **UK-intent, high-consideration queries** ("private tour Vietnam from UK", "tailor-made Vietnam holiday", "Vietnam itinerary 2 weeks", "best time to visit Vietnam") with a small number of **deep, trustworthy, well-linked pages** rather than 700 thin ones. Make every indexed URL unique, fast, and clearly about one query. Build trust (reviews, specialists, UK protection credentials *if real*), earn links from UK travel media, and measure by enquiries — not just rankings.

---

## 2. Phase 1 — Indexation & technical health (weeks 0–2)

Goal: every URL we *want* indexed is indexed; nothing we don't want is.

- [ ] **Search Console**: confirm domain property; inspect and *Request indexing* for the top 20 pages (home, /itineraries, /destinations, hub guides, top 8 tours). Check "Pages" report weekly for *Duplicate, Google chose different canonical*, *Crawled – currently not indexed*, *Discovered – not indexed*.
- [ ] **Bing Webmaster Tools**: verify, import GSC, submit sitemap; env `NEXT_PUBLIC_BING_SITE_VERIFICATION` (code ready).
- [ ] **Run `scripts/audit-sitemap.mjs`** after each deploy: every sitemap URL must be 200, self-canonical, indexable.
- [ ] **Canonical map** — one canonical per content item:

  | Content | Canonical URL | Notes |
  |---|---|---|
  | Tour | `/itineraries/[slug]` | `/destinations/[d]/tours/[t]` already redirects |
  | Destination | `/destinations/[slug]` | |
  | Article | `/travel-guides/[slug]` | `/blog/*` & `/destinations/*/blog/*` noindex → travel-guides |
  | Cruise | `/destinations/[d]/cruises/[c]` | add to sitemap only when content is unique |

- [ ] **HTTP hygiene**: single host (`www`) with 301 from apex and http; trailing-slash consistency; no soft-404s (check `/accommodations/[slug]`, `/specialists/[slug]` when empty).
- [ ] **Core Web Vitals** (Vercel Speed Insights / PageSpeed, mobile): LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Likely fixes: hero `priority` + correct `sizes`, AVIF via `next/image`, defer Leaflet map (`dynamic`, below the fold), self-host fonts already via `next/font`, reduce `/itineraries` HTML (511 KB) with pagination or lazy lists.
- [ ] **Crawl budget**: keep `/api/`, `/studio/` disallowed; no parameterised URLs in the sitemap (`/itineraries?region=north` links in the footer — add `rel=canonical` to `/itineraries` for query variants or turn them into static filtered routes if worth ranking).
- [ ] **Redirect map** for any legacy URLs (WordPress-era) discovered in GSC "Not found (404)".
- [ ] **International**: single `en-GB` site; no hreflang needed unless an en-US version is added.

Exit criteria: ≥ 90% of sitemap URLs "Indexed" in GSC within 6 weeks; zero canonical-conflict warnings.

---

## 3. Phase 2 — Keyword architecture (weeks 1–3)

Validate volumes/difficulty in Ahrefs/Semrush/GSC before committing (no volumes are asserted here — they are hypotheses). Map **one primary query → one URL**.

| Cluster | Intent | Primary URL (target) | Status |
|---|---|---|---|
| Private / luxury / tailor-made Vietnam tours (UK) | Commercial | `/` and `/itineraries` | exists – needs on-page rework (§5) |
| Vietnam holidays from the UK (flights, time, money, visa) | Informational → commercial | `/vietnam-holidays-from-uk` | **new** |
| Vietnam tour cost / price in £ | Commercial investigation | `/vietnam-guides/vietnam-tour-cost-from-uk` | **new** |
| Best time to visit Vietnam (+ by month) | Informational | `/vietnam-guides/best-time-to-visit-vietnam-uk-travellers`, `/ideas-by-month/[month]` | new + exists |
| Vietnam visa for UK citizens | Informational | `/visa-guide` *(see §4 decision)* | exists + new |
| Vietnam itineraries (7 / 10 / 14 / 21 days) | Commercial | `/itineraries` + dedicated landing per duration | **gap** |
| Region/destination (Ha Long, Hoi An, Sa Pa, Mekong, Hanoi, Hue, Da Nang, Phu Quoc) | Mixed | `/destinations/[slug]` | exists – deepen |
| Trip types (honeymoon, family, luxury, culinary, adventure, cycling, photography) | Commercial | `/trip-ideas/[slug]`, `/inspirations/[slug]` | exists – differentiate |
| Combos (Vietnam + Cambodia / Laos / Thailand) | Commercial | **new** landing pages | **gap** |
| Things to do | Informational | `/things-to-do/[slug]` | exists |
| Comparison / decision (Ha Long vs Lan Ha, private vs group, north vs south) | Informational | `/vietnam-guides/*` | new |

**Gap pages to add (priority order):** duration landings (10/14/21 days), "Vietnam & Cambodia tour", "Vietnam honeymoon", "Vietnam family holiday", "Vietnam with kids", "Vietnam in [month] from the UK", "Hanoi to Ho Chi Minh City route guide".

---

## 4. Phase 3 — On-page & content quality (weeks 2–8, then continuous)

### 4.1 Decisions to make now
1. **Visa cannibalisation.** Recommended: keep `/visa-guide` as the single ranking page (richer, existing authority) and fold the unique parts of `/vietnam-guides/vietnam-visa-for-uk-citizens` into it, then 301 the guide → `/visa-guide`. (Alternative: canonicalise the guide to `/visa-guide`.)
2. **Pricing source of truth.** Audit `priceFrom` in Sanity + `tours_data.json`; remove or fix day-tour £120 vs journeys; make the homepage "from £X" computed from data so SERP snippets, schema and page agree.
3. **Scraped tour pages**: for each, either (a) rewrite with unique itinerary copy, specialist notes, and real hotel names, or (b) `noindex` until improved. Do not leave 50 near-duplicates indexable.

### 4.2 Page templates (what "done" looks like)
- **Title** ≤ 60 chars: `Primary query | Differentiator | Brand`. **Meta description** 140–160 chars with a reason to click (price from £, days, "private"). Auto-generated defaults already exist; hand-write for the top 30 pages.
- **One H1** matching the primary query; H2s as questions/sub-topics; short intro that answers the query (also feeds GEO).
- **Itinerary page**: summary box (days, regions, price from £, best months, group type), day-by-day, hotels with names, what's included/excluded, map, FAQs, specialist, reviews, CTA. Min. ~800 unique words.
- **Destination page**: when to go, how many days, how to get there from UK, top experiences, sample tours (internal links), FAQs.
- **Article (travel-guide)**: author (named specialist with bio), `lastReviewed`, sources, internal links to 3 tours + 2 related guides.
- **Images**: descriptive file names + alt text (existing alt-enrichment commit `50c6439` — extend to Sanity galleries), AVIF, explicit width/height.

### 4.3 Internal linking
- Hub-and-spoke: `/vietnam-holidays-from-uk` → guides → tours; every tour links up to its destination, month guide and a cost guide; destination pages list their tours and guides.
- Contextual links in body copy (not just nav/footer); anchor text = the target's primary query.
- Add **breadcrumbs** UI (JSON-LD exists) and "Related tours/guides" blocks driven from Sanity references.
- Footer already links the new guides; add the 3–4 duration landings once built.

### 4.4 Content calendar (suggested cadence: 4 pieces/month)
Month 1: duration landings 10/14 days, Vietnam+Cambodia, honeymoon · Month 2: family, Hanoi→HCMC route, "Vietnam in [Oct–Dec]" · Month 3: refresh top 10 pages with real traveller quotes/photos, add video. Rule: **refresh before you publish new** for any page with impressions but position > 8.

---

## 5. Phase 4 — Trust, E-E-A-T & conversion (weeks 2–10)

- **Specialists**: real names, photos, bios, credentials, "written/reviewed by" on guides; `/specialists/[slug]` indexed with Person schema (done in code for authors).
- **Reviews**: collect from past UK clients on **Trustpilot, TripAdvisor, Google Business Profile**; show on site with source links; add `aggregateRating` **only** from a verifiable public profile (env vars ready).
- **Protection & credentials**: publish ABTA / ATOL / insurance / registered-company details **only if held** (env `NEXT_PUBLIC_MEMBERSHIPS`); otherwise state how deposits are protected. UK consumers search for this.
- **Contact transparency**: UK phone/WhatsApp, office/registered address if any, response time, clear T&Cs and cancellation terms.
- **Enquiry funnel (CRO)**: shorter first step, sticky CTA on tours (exists), trust strip near the form, thank-you page tracked as a conversion, WhatsApp click events.
- **Policies** (privacy, terms) reviewed for UK GDPR + cookie consent (needed before adding more tracking).

---

## 6. Phase 5 — Authority & links (months 2–6, continuous)

1. **Reviews & citations** (see §5) + consistent NAP across Google Business Profile, Bing Places, Yell, Facebook, Instagram, LinkedIn, YouTube.
2. **Digital PR (UK)**: data/story hooks — "What a private Vietnam tour really costs (2026)", "Vietnam post-Covid visa changes for Brits", "Best time to visit by month" with original data; pitch Guardian/Telegraph/Independent Travel, Wanderlust, Condé Nast Traveller UK, Lonely Planet UK, Time Out; use HARO-style services (Qwoted, Response Source, Featured).
3. **Partnerships**: hotels and cruise operators you feature (link from their "as seen in / partners"), Vietnam tourism board, UK travel bloggers & YouTubers (hosted trips with disclosure).
4. **Linkable assets**: price calculator, interactive best-time chart, printable packing list, route-planner map — build one per quarter.
5. **Community**: Reddit (r/VietnamTravel, r/uktravel), TripAdvisor forums — answer questions transparently; no spam.
6. **Hygiene**: disavow only for clear spam; monitor new/lost links monthly.

Target: 5 relevant UK referring domains by month 3, 15 by month 6 (hypothesis; adjust after baseline).

---

## 7. Phase 6 — Measurement & governance

| Layer | Tool | Cadence |
|---|---|---|
| Indexing & queries | Google Search Console, Bing WMT | weekly |
| Rankings (UK, mobile) | Ahrefs / Semrush / Sistrix — 50–100 tracked keywords by cluster | weekly |
| Traffic & conversions | Vercel Analytics + GA4 (enquiry submit, WhatsApp click, call click) | weekly |
| AI visibility | `ai_visit` event, `ai_crawler` logs, weekly ChatGPT prompt test ([GEO_RUNBOOK §3](GEO_RUNBOOK.md)) | weekly |
| Technical | `scripts/audit-sitemap.mjs`, `scripts/geo-check.mjs`, Lighthouse CI | per deploy |
| Enquiry quality | Sanity `enquiry` docs (source, AI flag, UTM) → lead→booking rate | monthly |

**KPIs (hypotheses — set baselines in week 2):**

| KPI | 30 d | 90 d | 180 d |
|---|---|---|---|
| Indexed / submitted URLs | ≥ 60% | ≥ 90% | ≥ 95% |
| Non-brand clicks (GSC, UK) | baseline | +50% | +150% |
| Keywords in top 10 (tracked set) | baseline | +10 | +30 |
| Enquiries from organic | baseline | +30% | +100% |
| Referring domains (relevant) | baseline | +5 | +15 |
| LCP (mobile p75) | < 3 s | < 2.5 s | < 2.5 s |

**Governance:** one owner for the sitemap/canonical map; every new content type must ship with: canonical rule, sitemap inclusion rule, schema, internal-link rule, and a Sanity SEO field set. Add a CI step running `tsc`, lint and a link/canonical check.

---

## 8. Risks & guardrails

- **Thin/duplicate programmatic pages** (scraped tours, templated timelines, near-identical `/trip-ideas` vs `/inspirations`): improve or noindex — more URLs ≠ more traffic.
- **Cannibalisation** between guides and legacy pages: one query → one URL.
- **Unverifiable claims** (awards, ratings, protection schemes): never publish; they hurt trust and invite regulatory (ASA/CMA) trouble.
- **Fact drift** (visa, flights, prices): date-stamp, link official sources, and review quarterly (`CONTENT_REVIEWED_AT`).
- **Over-optimisation**: no keyword stuffing; write for the traveller first.
- **Changes shipping on a Monday of the Google update**: avoid large template changes during known core updates; change one thing at a time and annotate it in the tracker.

---

## 9. 90-day sprint view

| Weeks | Focus | Deliverables |
|---|---|---|
| 1–2 | Indexation | GSC/Bing set up, request indexing, `audit-sitemap` clean, canonical map, CWV baseline |
| 3–4 | Architecture + decisions | Visa consolidation, pricing audit, noindex/rewrite plan for scraped tours, keyword map signed off |
| 5–8 | Content | 6–8 new landings (durations, combos, honeymoon, family), rewrite top 15 pages, internal-link pass |
| 9–10 | Trust & CRO | Review collection live, specialist pages, credentials (if real), funnel tweaks |
| 11–13 | Authority | First PR campaign, partnerships, linkable asset #1, 90-day report & next-quarter plan |
