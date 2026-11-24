# ChatGPT prompts about Vietnam tours (Semrush Keyword Magic 2.0, DB UK)

Source: Semrush web, Prompts tab, filter Search Engine = ChatGPT, text filter "vietnam".
Seeds run: `vietnam tour` (62 prompts), `vietnam holidays` (31), `vietnam itinerary` (108).
Seed `vietnam holiday price` returned 0 prompts (Semrush substituted "cheap vietnam holidays").
Number in brackets is Semrush relevance to the seed, not real ChatGPT query volume.

## 1. High purchase intent (landing pages first)
- Can you recommend package holidays to Vietnam and Cambodia? [42]
- What are the best travel agencies for Vietnam tours? [42]
- How do I find affordable tour packages for Vietnam and Cambodia? [40]
- Are there any special deals on holidays to Vietnam and Cambodia? [40]
- Vietnam and Cambodia Cruises and Holidays (from the UK) [77]
- Vietnam, Laos, and Cambodia Tours [44]
- How do I plan a trip covering Vietnam, Laos, and Cambodia on a budget? [38]
- Are there any exclusive luxury escape packages for Vietnam? [61]
- What are the best cruise options to Vietnam and Cambodia? [39]
- What should I know before booking a cruise to Vietnam and Cambodia? [39]
- Which river cruises are popular in Vietnam? [40]

## 2. Itinerary and planning (largest new cluster, from `vietnam itinerary`)
- How should I plan my travel route for a 10-day Vietnam adventure? [73]
- Can you suggest a detailed 10-day itinerary for Vietnam? [45]
- Vietnam 10-Day Travel Itinerary [45]
- Are there any recommended travel itineraries for 14 days in Vietnam? [44]
- What are the best 2-week itineraries for exploring Vietnam? [44]
- What should I include in a 1-month travel plan for Vietnam? [43]
- How can I plan a 3-week trip to Vietnam to see the main attractions? [43]
- How should I plan a 7-day trip to Northern Vietnam? [42]
- Can you recommend a 10-day itinerary for Vietnam and Cambodia? [40]
- What are some hidden gems to visit in Vietnam within 10 days? [39]
- What are the must-see attractions in a 10-day Vietnam trip? [42]
- How long should I plan for a trip covering Vietnam, Cambodia, and Thailand? [38]
- What are the best travel packages for exploring Vietnam, Cambodia, and Thailand together? [40]

## 3. Comparison and consideration
- Is it generally cheaper to visit Vietnam or Thailand? [53]
- How do the costs of traveling in Vietnam compare to Thailand? [39]
- What is the best time of year to visit Vietnam for good weather? [38]
- What is the best time of year to visit Vietnam, Laos, and Cambodia? [37]
- What are the peak seasons for small group tours in Vietnam and Cambodia? [38]
- Vietnam Weather and Travel Timing [42]
- What is the best time to visit Son Doong Cave in Vietnam? [39]
- What should I pack for a trip to Vietnam considering the weather conditions? [37]

## 4. Niche segments
- Solo: What should I know before planning a solo trip to Vietnam? [45]; How safe is it to travel alone in Vietnam? [37]; best places for solo travelers [42]; affordable hostels [36]
- Cycling: Vietnam Cycling Tours [53]; best routes [53]; family-friendly cycling [53]; reliable operator [38]; what to pack [53]
- Train: Vietnam Train Travel [41]; best routes for train travel [39]; how to buy tickets [38]; are overnight trains comfortable [34]
- Luxury hotels: Four Seasons, Hoi An, Vinpearl, Hilton, Phu Quoc, Bali and Vietnam comparisons
- Family: theme parks, family cycling
- Northern Vietnam: must-see attractions [41]; best time [37]; local food [36]; 7-day plan [42]

## 5. UK-specific admin (short guides that lead to the enquiry form)
- Vietnam Visa Requirements for UK Citizens [38]
- What documents are needed for a Vietnam visa application from the UK? [36]
- How can I apply for a visa to visit Vietnam? [40]

## 6. Informational, low lead value (skip or treat as support content)
Maps and airports, Lonely Planet comparison, wildlife and dangerous animals, Hoa Lo Prison, BIS HCMC, bridges, garden spots.

## Observations
- Many prompts combine Vietnam with Cambodia, Laos or Thailand, and mention a UK departure. Multi-country itineraries are a clear gap.
- ChatGPT's answer to `vietnam trips` named no brand at all (brands = 0), so citation space is open.
- Google AI answers for the same head terms cite Intrepid, TUI, Trailfinders and Wendy Wu Tours.

---

# Gap check against the site (2026-11-24)

Checked: `src/lib/tours_data.json` (47 tours), `planningGuides.ts`, `ideasByMonthData.ts`, `thingsToDoData.ts`, `public/llms.txt`, `src/app/visa-guide`.
Not checked: content that lives only in Sanity CMS (travel guides, itineraries, destinations). Verify there before writing.

| Prompt cluster | Status | Existing page |
|---|---|---|
| Vietnam visa for UK | Covered | /visa-guide |
| Best time by month | Covered (Jan to Oct seen in data) | /ideas-by-month |
| Cost / how to compare private quotes | Covered | /travel-guides/vietnam-private-tour-cost |
| Choosing a tour operator / best agencies | Covered | /travel-guides/choosing-vietnam-private-tour-operator |
| 10-day itinerary | Partial: Northern Vietnam Explorer (10d), A Local's Story (10d) | itineraries |
| 14-day / 2-week | Partial: Luxury Honeymoon (14d), Classic Vietnam (12-14d) | itineraries |
| 3-week | Partial: Grand Tour of Indochina (21d), Vietnam In-Depth (19d) | itineraries |
| 7-day Northern Vietnam | Gap (nearest: Sapa 6d) | none |
| 1-month plan | Gap | none |
| Vietnam + Cambodia 10-day / package | Gap (only the 21-day Indochina tour) | none |
| Vietnam + Laos + Cambodia budget | Gap | none |
| Vietnam + Cambodia + Thailand | Gap | none |
| Vietnam + Cambodia cruise / river cruise | Gap (only Mekong Delta cruises, Ha Long cruises) | partial |
| Best time for Vietnam + Cambodia | Gap | none |
| Vietnam vs Thailand cost | Gap | none |
| Solo travel safety / places | Gap | none |
| Cycling tours | Tours exist (Hoi An cycling), no guide pages | tours only |
| Train travel (routes, tickets, overnight) | Gap | none |
| Family trips | Gap as a guide | none |
| Northern Vietnam guide / best time / food | Gap as a guide | partial via Sapa tours |
| Luxury hotels (Four Seasons, Hoi An) | Partial via /accommodations | check |

## Suggested order (highest lead value, lowest effort first)
1. Vietnam and Cambodia 10-day and 14-day itinerary pages (UK departure, price from, enquiry CTA).
2. "Vietnam vs Thailand: which costs less" with real GBP ranges.
3. "Vietnam, Cambodia and Laos on a budget: 3 and 4 weeks".
4. Itinerary hub pages by length: 7, 10, 14, 21 days, plus 1 month.
5. Solo travel in Vietnam (safety, routes) with a short enquiry form.
6. Vietnam by train: routes, tickets, overnight sleepers.
7. Best time for Vietnam and Cambodia together; best time for Northern Vietnam.

## Published from this research (2026-11-24)
- /travel-guides/vietnam-and-cambodia-10-day-itinerary
- /travel-guides/vietnam-and-cambodia-14-day-itinerary
Source file: `src/lib/cambodiaGuides.ts`. Photos: 5 Wikimedia Commons images in `public/images/commons/` with licences in `credits.json`.
Sources used: GOV.UK (FCDO), the official Cambodia e-Arrival site, Cambodian embassy in the UK, UNESCO, Wikipedia. No competitor sites.

## Second batch published (2026-11-24), `src/lib/regionalGuides.ts`
- /travel-guides/vietnam-laos-and-cambodia-itinerary-3-4-weeks
- /travel-guides/vietnam-or-thailand-which-to-visit-and-what-affects-cost
- /travel-guides/vietnam-cambodia-and-thailand-how-long-to-allow
- /travel-guides/solo-travel-in-vietnam-safety-and-planning
- /travel-guides/vietnam-and-cambodia-cruise-what-to-know-before-booking
All added to llms.txt; sitemap picks them up automatically.

## Still open
- Cycling, family and luxury-hotel guides (need source-backed facts first).
- Real GBP price ranges: need operator quotes; none were invented.
- Visa guide already covers the UK visa cluster; consider adding a "documents needed" section.
- Check Sanity for existing posts with the same topics before publishing.
