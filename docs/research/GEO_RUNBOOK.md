# GEO Runbook — what is built, what you must do by hand

Plan: [GEO_PLAN.md](GEO_PLAN.md). This file = operations.

## 1. What the code now does

| Area | Where |
|---|---|
| Brand/entity config (env-driven, never invented) | `src/lib/siteConfig.ts`, `.env.example` |
| robots with explicit AI search bots (OAI-SearchBot, ChatGPT-User, Perplexity, Claude, Bing…) | `src/app/robots.ts` (replaces `public/robots.txt`) |
| Honest sitemap (`lastModified` = Sanity `_updatedAt`) | `src/app/sitemap.ts`, `src/lib/siteIndex.ts` |
| `llms.txt`, `llms-full.txt`, `rss.xml` | `src/app/llms.txt`, `llms-full.txt`, `rss.xml` |
| IndexNow (Bing) + ISR revalidation webhook | `src/app/api/indexnow/route.ts`, `…/key/route.ts` |
| JSON-LD graph: TravelAgency + WebSite (`@id`), TouristTrip+Offer (£), TouristDestination, FAQPage, Article(Person author, dateModified), WebPage+speakable, BreadcrumbList | `src/components/SeoJsonLd.tsx` |
| Answer block, FAQ and sources on itinerary / destination pages | `src/components/GeoBlocks.tsx`, `src/lib/geoDefaults.ts` |
| Sanity fields `answerSummary`, `geoFaqs`, `lastReviewedAt`, `sources` on itinerary, destination, post, blogPost, travelGuide | `src/sanity/schema/geoFields.ts` |
| UK answer-first guides (hub + 7) | `src/lib/ukGuidesData.ts`, `/vietnam-holidays-from-uk`, `/vietnam-guides/*` |
| Visa guide: quick answer + FAQ + sources | `src/app/visa-guide/page.tsx` |
| AI referral tracking: `ai_visit` analytics event for `utm_source=chatgpt.com` / AI referrers (enquiry first-touch is handled by `TrafficTracker`) | `src/components/AiReferralTracker.tsx`, `src/lib/firstTouch.ts` |
| AI crawler logging (JSON line per hit) | `src/proxy.ts` |
| Smoke test | `node scripts/geo-check.mjs <baseUrl>` |

Per-page canonicals are now set on every dynamic route (the root layout no longer forces the homepage canonical on every page).

## 2. Manual steps (cannot be done from code)

1. **Bing Webmaster Tools** → add `https://www.vietnamtours.co.uk` (import from Google Search Console), copy the meta-tag value to Vercel env `NEXT_PUBLIC_BING_SITE_VERIFICATION`, submit `/sitemap.xml`.
2. **IndexNow**: in Vercel env set `INDEXNOW_KEY` (random 32-char alphanumeric) and `INDEXNOW_WEBHOOK_SECRET`. Check `https://www.vietnamtours.co.uk/api/indexnow/key` returns the key.
3. **Sanity webhook** (sanity.io/manage → API → Webhooks): URL `https://www.vietnamtours.co.uk/api/indexnow?secret=<INDEXNOW_WEBHOOK_SECRET>`, trigger on create/update/delete, projection `{ "_type": _type, "slug": slug.current }`, HTTP POST. One-off full submit: `curl -X POST "https://www.vietnamtours.co.uk/api/indexnow?secret=…&all=1"`.
4. **Vercel → Firewall / Bot Protection**: make sure `OAI-SearchBot`, `ChatGPT-User`, `Bingbot` are not challenged. Verify: `node scripts/geo-check.mjs https://www.vietnamtours.co.uk`.
5. **Fill the entity data you actually have** (Vercel env, see `.env.example`): `NEXT_PUBLIC_SAME_AS` (TripAdvisor, Trustpilot, LinkedIn, YouTube…), UK phone/address, `NEXT_PUBLIC_MEMBERSHIPS` (ABTA/ATOL only if held), rating only if it matches a public profile.
6. **Editors**: fill `Answer Summary` + `FAQs (GEO)` in Studio on the top tours/destinations; bump `Last reviewed` when prices/visa change. Defaults are generated from existing data when empty.
7. **Re-verify facts** in `src/lib/ukGuidesData.ts` (visa, flights, seasons) against GOV.UK FCDO, TravelHealthPro and the Vietnamese e-visa portal, then bump `CONTENT_REVIEWED_AT` in `siteConfig.ts`. Review every claim about what a tour includes (guide, vehicle, flights not included) against your real terms.
8. Off-site: TripAdvisor/Trustpilot/Google reviews from UK clients, UK travel press, Reddit, YouTube (see GEO_PLAN Phase 5).

## 3. Measuring

- **Vercel Analytics → Events → `ai_visit`** (props `source`, `landing`). Needs a plan that supports custom events.
- **Vercel Logs**: filter `ai_crawler` → which bot hit which path.
- **Sanity enquiries**: `trafficSource` / `isAi` use the session first-touch captured by `TrafficTracker`.
- **Weekly prompt test** (ChatGPT, UK, logged out): record in a sheet — prompt, brand mentioned?, linked?, position, competitors cited.

### Prompt set (run weekly)
1. best luxury private tour operator for Vietnam from the UK
2. tailor-made Vietnam holiday 2 weeks cost per person UK
3. how much does a private tour of Vietnam cost from London
4. best time to visit Vietnam for UK travellers by month
5. Vietnam visa for UK citizens
6. Ha Long Bay luxury cruise vs Lan Ha Bay
7. is Vietnam safe for solo female travellers / families from the UK
8. Vietnam itinerary 10 days / 14 days / 3 weeks
9. direct flights London to Hanoi, flight time, jet lag
10. Vietnam and Cambodia combined tour from the UK
11. best Vietnam tour operators for UK travellers
12. Vietnam honeymoon / family / multi-generational private tour UK
(Add 20–40 more from Bing Webmaster “Search Performance” long-tail queries.)
