# Site-wide E-E-A-T content audit

**Reviewed:** 31 October 2026  
**Scope:** Public route templates, local content data, Sanity read/render rules, the 45 article/topic records plus 14 overlapping blog slugs previously inventoried in `ARTICLE_REVIEW.md`, and live HTML checks on four representative production routes. This is an editorial risk review, not a Google score or certification. E-E-A-T is not itself a single Google ranking factor; Google describes trust as the most important aspect and recommends useful, people-first content ([Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

## Verdict

**The site does not yet have enough evidence to claim site-wide E-E-A-T readiness.** The code has good safeguards for showing author, reviewer and field-visit details only when evidence is recorded, and known visa/route errors have targeted corrections. However, content still contains first-person experience and operational promises whose proof is not present in this repository. Travel prices, availability, health and entry advice, provider arrangements and the identity/credentials of the operating business need documented verification.

## Findings by E-E-A-T area

| Area | Status | Evidence and remaining work |
|---|---|---|
| Experience | **Not established site-wide** | Profile and field-visit evidence fields exist and unverified specialist profiles are suppressed. This repository does not include field notes or source records for the claims across the guide/topic inventory. Some source content still uses first-person or “personally vetted” wording; see `ARTICLE_REVIEW.md` and the examples below. Stock/editorial photos are illustrations, not proof of a site visit. |
| Expertise | **Partial** | Targeted corrections address visa processing promises, medical wording, an incorrect 14-day route and UK/Vietnam time difference. Remaining articles need claim-by-claim source checks, especially travel rules, health, safety, transport times, prices, opening hours, hotel/provider facts and seasonal conditions. |
| Authoritativeness | **Partial** | The site now names the Vietnam operator and cites its 2024 international tour-operator licence as reported on My Way Travel's company page. The US LLC DOS ID is also presented as a company registration, not a certification. Exact corporate ownership of VietnamTours.co.uk, insurance, trade memberships, awards and supplier relationships still need primary proof. |
| Trust | **Partial** | The editorial policy explains source dates and distinguishes suggestions from confirmed arrangements. Enquiry delivery has acknowledgement checks. This pass removed several unsupported claims from public copy and clarified that the homepage carousel contains planning ideas rather than reviews. Legal terms/privacy, catalogue prices, service inclusions and current tour availability still need review against the actual operating entity and contract. |

## Concrete issues found and changes made

- Replaced the unsupported claim that the travel specialists had personally spent years throughout Vietnam with neutral team/contact wording.
- Removed “personally inspected” accommodation claims from accommodation metadata, and removed “done every experience personally” from the activities page.
- Replaced “updated regularly” guide wording with a prompt to check linked sources and confirm changing details.
- Clarified that itinerary listings are planning examples and that date-specific availability, services and prices require written confirmation.
- Removed the unsupported 24-hour response promise from the enquiry confirmation UI and email copy.
- Changed the homepage carousel from testimonial-like italic quotes to labelled planning prompts; it now states that these are not reviews or confirmed inclusions.
- Changed an unsupported claim that cooking classes are booked through personally used, vetted providers to practical questions travellers can confirm with a provider.
- Added source credits for the newly selected Vietnam photos. Their Unsplash pages identify the photographers and locations; the images should not be presented as the company's own field photography.
- Removed additional unsupported marketing claims from the footer and process section (leadership, guaranteed outcomes, personal hotel vetting and 24/7 care), removed universal “FEATURED” badges from itinerary cards, and labelled local catalogue prices as guide prices needing confirmation.
- Removed absolute weather guarantees. Month guides now describe regional variation and ask readers to check local forecasts and availability.
- Updated the public operator details from the current licence displayed on the operator's official company page: **MYWAY LIMITED LIABILITY COMPANY**, international operator licence **79-0743/2017/CDLQGVN-GP LHQT**, dated 6 May 2024, for inbound/outbound services. A separate government registry result still shows an earlier 2017 record with a company-name and licence-number variant; the operator should reconcile it with the current certificate and booking contract. The downloaded certificate scan includes personal identifiers, so it was not copied into the project or linked directly. [Operator company information](https://www.mywaytravel.com/why-us/) · [2017 government registry record](https://quanlyluhanh.vn/en/search/116).
- Added the New York DOS ID published for **My Way Luxury Travel LLC** (7926729) with a link to the state entity database and explicit wording that company registration is not a travel licence or consumer-protection certification.
- Changed the relationship statement to identify VietnamTours.co.uk as a Vietnam-focused My Way Travel brand. The public My Way source names a different website as its verified sub-brand; it does not establish that VietnamTours.co.uk is a legally registered subsidiary. Do not use the legal word “subsidiary” until corporate records confirm it.
- Reduced enquiry friction so email is the only required contact field; name and phone are optional. Accepted-lead analytics now records only a source channel, observed/campaign evidence type and AI yes/no flag, without sending contact details to analytics. Search referrals remain “organic” because Google AI referral traffic cannot reliably be separated.
- Removed unsupported first-person cycling/culinary/golf/student-service claims and several absolute beach-safety claims from local trip-idea content. Added official UK and Vietnam entry/health links to the first-time guide; removed stale year labels and unsupported current exchange-rate/vaccination specifics.

## High-priority unresolved content

The existing per-article issue list in `ARTICLE_REVIEW.md` remains the detailed action register. This pass also found the following unresolved examples in current source data:

- `src/lib/tripIdeasData.ts`: the most direct unsupported claims about personally designed vegetarian/cycling routes, route history, golf partnerships, school risk packs, and beach safety were replaced with route-specific confirmation language. Remaining destination descriptions, catalogue prices, named providers, transport durations and some qualitative claims still need sources or business verification.
- `src/lib/inspirationsData.ts`: claims about after-hours access, cave dining, and bespoke exclusivity need current, named provider confirmation before publication as available services.
- `src/lib/tours_data.json`: old catalogue records contain named hotels, operators, precise schedules, meals, inclusions and narrative assertions. Retaining a route URL does not verify that the trip is still sold or that its services/prices remain available.
- `src/sanity/importPosts.ts`: two import-template CTAs with unverified “hundreds helped” and “personally vetted” claims were rewritten. This does not edit posts already stored in Sanity; the CMS live content must still be checked and edited at its source.
- Exact corporate ownership of VietnamTours.co.uk, the contracting entity for each booking, insurance/financial protection, supplier agreements and current contract terms still need business records or first-party documents. The 2024 VN licence facts and NY DOS ID are currently attributed to the operator's own page; the DOS database should be checked directly before making a stronger claim.
- Live production itinerary HTML still contains specific route schedules, hotel names, cruise/provider names and a displayed £7,950 price in one sample route. Its current rendered copy identifies sample accommodation and asks readers to confirm arrangements, but the operator must verify every named provider, timing, inclusion and guide price before treating it as a live product offer.

## Required evidence before calling the content ready

1. For experience-led articles, record the real author/reviewer, date, field notes or other first-hand evidence, and the exact passages supported.
2. Attach a primary source to every time-sensitive travel, health, visa, price, safety, schedule and access claim; set a review date only after checking the article, not merely a source.
3. Confirm each tour/accommodation record with the current operator: live availability, price date, inclusions/exclusions, provider name, permissions and booking conditions. Mark unavailable/archive records accordingly.
4. Confirm legal entity, operator role, address/contact routes, licences, insurance and any membership, award or partnership claims with current documents.
5. Check live Sanity pages against the local source inventory and remove unsupported first-person narratives, testimonials, quotation attributions and provider claims at the CMS source.

## Image repetition review

All 47 local itinerary galleries were updated to use three distinct files per gallery, with destination-based selections. Sanity-backed galleries now rotate through distinct destination-specific photos instead of replacing every gallery item with one identical image. The additional images and photographer/page/license records are listed in `public/images/unsplash/credits.json`. Some photos are reused across itineraries within the same destination theme; they are illustrative assets, not a promise that an exact activity or service is included.
