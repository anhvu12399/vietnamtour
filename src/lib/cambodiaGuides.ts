import type { Post, RichTextBlock, EditorialEvidence } from '@/sanity/types';

// Guides for UK travellers combining Vietnam with Cambodia.
// Facts come from the sources listed in each guide's `editorial.sources`.
// No prices, availability or service promises are stated: those need a written proposal for the traveller's dates.

type Part =
  | { h: string }
  | { p: string }
  | { img: string; alt: string; credit: string };

let counter = 0;
function build(parts: Part[]): RichTextBlock[] {
  return parts.map((part) => {
    counter += 1;
    const key = `cambodia-${counter}`;
    if ('img' in part) {
      return { _type: 'image', _key: key, url: part.img, alt: part.alt, caption: part.credit };
    }
    const text = 'h' in part ? part.h : part.p;
    return {
      _type: 'block', _key: key, style: 'h' in part ? 'h2' : 'normal', markDefs: [],
      children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }],
    };
  });
}

const ACCESSED = '24 November 2026';
const sources: NonNullable<EditorialEvidence['sources']> = [
  { label: 'GOV.UK: Cambodia entry requirements (FCDO)', url: 'https://www.gov.uk/foreign-travel-advice/cambodia/entry-requirements', accessedAt: ACCESSED },
  { label: 'GOV.UK: Cambodia travel advice and warnings (FCDO)', url: 'https://www.gov.uk/foreign-travel-advice/cambodia', accessedAt: ACCESSED },
  { label: 'GOV.UK: Vietnam entry requirements (FCDO)', url: 'https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements', accessedAt: ACCESSED },
  { label: 'Cambodia e-Arrival Card (official government site)', url: 'https://arrival.gov.kh/', accessedAt: ACCESSED },
  { label: 'Royal Embassy of Cambodia in the UK: apply for an e-visa', url: 'https://www.cambodiaembassyuk.org/visa-cosular-services/apply-e-visa/', accessedAt: ACCESSED },
  { label: 'UNESCO World Heritage Centre: Angkor', url: 'https://whc.unesco.org/en/list/668', accessedAt: ACCESSED },
  { label: 'Wikipedia: Angkor Wat', url: 'https://en.wikipedia.org/wiki/Angkor_Wat', accessedAt: ACCESSED },
  { label: 'Wikipedia: Angkor', url: 'https://en.wikipedia.org/wiki/Angkor', accessedAt: ACCESSED },
  { label: 'Wikipedia: Bayon', url: 'https://en.wikipedia.org/wiki/Bayon', accessedAt: ACCESSED },
  { label: 'Wikipedia: Ta Prohm', url: 'https://en.wikipedia.org/wiki/Ta_Prohm', accessedAt: ACCESSED },
  { label: 'Wikipedia: Tonlé Sap', url: 'https://en.wikipedia.org/wiki/Tonl%C3%A9_Sap', accessedAt: ACCESSED },
  { label: 'Wikipedia: Royal Palace, Phnom Penh', url: 'https://en.wikipedia.org/wiki/Royal_Palace,_Phnom_Penh', accessedAt: ACCESSED },
  { label: 'Wikipedia: Siem Reap–Angkor International Airport', url: 'https://en.wikipedia.org/wiki/Siem_Reap%E2%80%93Angkor_International_Airport', accessedAt: ACCESSED },
  { label: 'Wikipedia: Geography of Cambodia (climate)', url: 'https://en.wikipedia.org/wiki/Geography_of_Cambodia', accessedAt: ACCESSED },
];

const editorial: EditorialEvidence = {
  author: { name: 'VietnamTours.co.uk travel team' },
  sources,
};

const CREDIT = {
  angkor: 'Angkor Wat. Photo: Satdeep Gill, CC BY-SA 4.0, via Wikimedia Commons',
  bayon: 'The Bayon, Angkor Thom. Photo: Marcin Konsek, CC BY-SA 4.0, via Wikimedia Commons',
  taprohm: 'Ta Prohm. Photo: lumoplank, CC0, via Wikimedia Commons',
  tonle: 'Floating village on the Tonlé Sap. Photo: Christophe95, CC BY-SA 4.0, via Wikimedia Commons',
  palace: 'Royal Palace, Phnom Penh. Photo: Hanay, CC BY-SA 3.0, via Wikimedia Commons',
};

const entryAndSafety: Part[] = [
  { h: 'Entry rules for UK passport holders' },
  { p: 'Vietnam and Cambodia have separate entry rules, so check both before you book flights. GOV.UK says UK travellers can visit Vietnam without a visa for up to 45 days for tourism, and that an e-visa allowing a 90-day stay is available for longer trips. Cambodia is different: GOV.UK states you must have a visa to enter as a visitor, tourist visas are valid for 30 days from the date of entry, and the e-visa should be applied for at least 4 days in advance. A visa on arrival is possible at airports and land borders, paid in US dollars with a photo.' },
  { p: 'Since 1 September 2024 Cambodia also requires an electronic Arrival Card for travellers entering by air at Phnom Penh, Siem Reap or Sihanoukville. GOV.UK says it must be submitted within 7 days before arrival and is free. Use the official government site (arrival.gov.kh) and the Royal Embassy of Cambodia in the UK for visa fees and photo rules. Rules change, so confirm them again close to departure.' },
  { h: 'Check the current FCDO warning for Cambodia' },
  { p: 'At the time of writing, the FCDO advises against all but essential travel within 20 km of the land border with Thailand, following heavy fighting in 2025. GOV.UK reports that land borders and crossings between Cambodia and Thailand remain suspended, and that several temple sites in border areas are closed. The temples around Siem Reap and the capital, Phnom Penh, are not described in that warning, but the advice is updated regularly. Read the full page before you book and again before you travel, and check your travel insurance covers the route.' },
];

const bestTime: Part[] = [
  { h: 'When to go' },
  { p: 'Wikipedia describes Cambodia as having two seasons of roughly equal length, defined mainly by rainfall, with temperatures and humidity high and steady all year. Vietnam is different: the north, centre and south each have their own weather pattern, so no single month is ideal everywhere. Use our Vietnam by month guide for the Vietnamese legs, then check Cambodian conditions for the same dates. One local effect to know about: the Tonlé Sap lake changes level with the seasons, and Wikipedia reports that post-monsoon water can be as much as 10 metres higher than during the monsoons, which changes what a lake visit looks like.' },
];

const faqNote = 'Ask for a written proposal that names each hotel, every domestic and international flight, the transfers and the guiding arrangements. Compare quotes on the same basis, as described in our guide to the cost of a private Vietnam tour.';

const tenDay: Post = {
  _id: 'cambodia-vietnam-cambodia-10-day-itinerary',
  slug: { current: 'vietnam-and-cambodia-10-day-itinerary' },
  title: 'Vietnam and Cambodia in 10 Days: A Sample Route for UK Travellers',
  excerpt: 'Ten days is enough for two or three bases in Vietnam plus Angkor in Cambodia, but only if you fly between them. A workable split is 3 nights in Hanoi and its surroundings, 3 in Hoi An or Hue, and 3 in Siem Reap, leaving one day for departure. UK passport holders need a visa for Cambodia but not for a short Vietnam stay.',
  mainImage: '/images/commons/angkorwat-1.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial,
  heroAuthor: { name: 'VietnamTours.co.uk travel team', role: 'Vietnam and Cambodia trip planning' },
  content: build([
    { p: 'Ten days works if you accept a simple rule: no more than three bases, and flights between them. Anything that adds a fourth stop turns the holiday into a series of airports. This guide sets out one sample route, explains the trade-offs and lists what to verify before you commit. It is a planning outline, not a fixed product: prices, flight schedules and hotel availability depend on your dates.' },
    { h: 'The sample route at a glance' },
    { p: 'Days 1 to 3: Hanoi, with one day trip to Ninh Binh or an overnight in Ha Long Bay if you prefer the water. Days 4 to 6: fly to Da Nang for Hoi An, or to Hue if you want the imperial history more than the beaches and lanterns. Days 7 to 9: fly to Siem Reap for Angkor. Day 10: depart from Siem Reap, or transfer to Phnom Penh if your flight home leaves from there. Keep the longest travel day away from your first and last days, because a delayed flight on either can cost you a night of hotel you have already paid for.' },
    { img: '/images/commons/angkorwat-1.jpg', alt: 'Angkor Wat reflected in the water at sunrise', credit: CREDIT.angkor },
    { h: 'Why three nights in Siem Reap is the minimum' },
    { p: 'Angkor Wat sits within the medieval capital of Angkor on a site Wikipedia gives as 162.6 hectares, built between 1113 and 1150 CE for the Khmer king Suryavarman II. It is only one part of the Angkor area, which UNESCO lists as a World Heritage Site and which also includes the Bayon at Angkor Thom and the jungle-wrapped temple of Ta Prohm. Seeing all three properly takes more than one day. Three nights gives you two full days at the temples with a gentler day or a half-day rest between.' },
    { img: '/images/commons/bayon-1.jpg', alt: 'Carved stone faces of the Bayon temple at Angkor Thom', credit: CREDIT.bayon },
    { h: 'What you will see at Angkor' },
    { p: 'The Bayon was built in the late 12th or early 13th century as the state temple of King Jayavarman VII and stands at the centre of Angkor Thom. Ta Prohm, about a kilometre east of Angkor Thom, was built largely in the late 12th and early 13th centuries as a Buddhist monastery dedicated to the king’s mother. Wikipedia notes that almost 80,000 people were required to maintain or attend it. Angkor Wat itself is oriented to the west, unlike most Angkorian temples, and is still an active Buddhist site, so shoulders and knees should be covered.' },
    { img: '/images/commons/taprohm-1.jpg', alt: 'Tree roots growing over the stonework of Ta Prohm temple', credit: CREDIT.taprohm },
    { h: 'Getting between Vietnam and Cambodia' },
    { p: 'Fly rather than cross by land when time is short. The main Siem Reap airport is Siem Reap–Angkor International Airport, which Wikipedia describes as the second largest in Cambodia. It is roughly 40 km east of Angkor Wat and 50 km from Siem Reap town, so allow transfer time on arrival and departure rather than assuming a short hop. Airlines and routes between Vietnamese cities and Siem Reap change by season, so ask your adviser or airline to confirm the current schedule, baggage allowance and any connections before you pay.' },
    ...entryAndSafety,
    ...bestTime,
    { h: 'Is ten days too short?' },
    { p: 'For a first visit to both countries it is tight but workable if you are happy to see one region of Vietnam well rather than the whole country. If you want Hanoi, Hue, Hoi An and Ho Chi Minh City as well as Angkor, our 14-day Vietnam and Cambodia guide is a better fit. If you would rather add Laos or Thailand, allow at least three or four weeks.' },
    { h: 'How to request a proposal' },
    { p: faqNote },
  ]),
  ctaHeading: 'Request a Vietnam and Cambodia proposal',
  ctaDescription: 'Tell us your dates, number of travellers, hotel style and preferred pace. We will send a written outline you can compare line by line.',
  seo: {
    metaTitle: 'Vietnam and Cambodia in 10 Days: Sample Route for UK Travellers',
    metaDescription: 'A 10-day Vietnam and Cambodia route for UK travellers: Hanoi, Hoi An and Angkor, with entry rules, FCDO warnings, seasons and what to check before booking.',
    keywords: ['Vietnam and Cambodia 10 day itinerary', 'Vietnam Cambodia holiday from UK', 'Vietnam and Cambodia tour', 'Angkor Wat and Hanoi trip', 'Vietnam Cambodia visa UK'],
  },
};

const fourteenDay: Post = {
  _id: 'cambodia-vietnam-cambodia-14-day-itinerary',
  slug: { current: 'vietnam-and-cambodia-14-day-itinerary' },
  title: 'Vietnam and Cambodia in 14 Days: A Two-Week Private Route from the UK',
  excerpt: 'Two weeks lets you see Vietnam’s north, centre and south and add Angkor without rushing. A sample split is 3 nights Hanoi and Ha Long Bay, 3 nights Hue and Hoi An, 2 nights Ho Chi Minh City and the Mekong Delta, 4 nights Siem Reap, and 1 night Phnom Penh. Cambodia needs a visa for UK passports; Vietnam allows up to 45 days without one.',
  mainImage: '/images/commons/tonlesap-1.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial,
  heroAuthor: { name: 'VietnamTours.co.uk travel team', role: 'Vietnam and Cambodia trip planning' },
  content: build([
    { p: 'Fourteen days is the most common length people ask about for Vietnam and Cambodia together, and it is the point where the route stops feeling rushed. You can see Vietnam from north to south using internal flights, spend several nights at Angkor, and still reach Phnom Penh. This is a sample route with reasons for each stop, not a priced package. Costs and availability depend on dates, hotel category and flights.' },
    { h: 'The sample route' },
    { p: 'Nights 1 to 3: Hanoi, with a night on Ha Long Bay or a day in Ninh Binh. Nights 4 to 6: Hue for the imperial citadel, then Hoi An for the old town and the coast. Nights 7 to 8: Ho Chi Minh City, with a day in the Mekong Delta. Nights 9 to 12: Siem Reap for Angkor. Night 13: Phnom Penh. Day 14: fly home. Each leg between cities is a domestic or short international flight, so ask how baggage, transfers and airport times are handled in the proposal.' },
    { img: '/images/commons/tonlesap-1.jpg', alt: 'A floating village on the Tonlé Sap lake in Cambodia', credit: CREDIT.tonle },
    { h: 'Why Siem Reap gets four nights' },
    { p: 'With four nights you can visit Angkor Wat, the Bayon and Ta Prohm on separate days, leave a morning free, and add a trip to the Tonlé Sap. Wikipedia describes it as the largest freshwater lake in Southeast Asia and one of the most productive ecosystems in the world; UNESCO designated it a Biosphere Reserve in 1997. The same article notes that it is under increasing pressure from deforestation, intensive agriculture, fishing, infrastructure and climate change. Choose floating-village visits carefully and ask how the operator selects the boat and community partners.' },
    { img: '/images/commons/angkorwat-1.jpg', alt: 'Angkor Wat reflected in a pool at dawn', credit: CREDIT.angkor },
    { h: 'Angkor in a little more detail' },
    { p: 'Angkor Wat was built between 1113 and 1150 CE as a Hindu temple dedicated to Vishnu and was gradually transformed into a Buddhist temple from the late 13th century onward. The Bayon, at the centre of Angkor Thom, was the state temple of King Jayavarman VII, and Ta Prohm is a Bayon-style temple that was founded as a Buddhist monastery and centre of learning. Wikipedia records that the Khmer Empire flourished from roughly the 9th to the 15th centuries. A guide who can explain the history behind what you are looking at adds more than extra hours of walking.' },
    { img: '/images/commons/bayon-1.jpg', alt: 'The faces of the Bayon temple at Angkor Thom', credit: CREDIT.bayon },
    { h: 'Phnom Penh: a short stop that is worth planning' },
    { p: 'One night in Phnom Penh lets you see the Royal Palace, which Wikipedia describes as the official royal residence of the King of Cambodia, occupied by Cambodian monarchs since it was built in the 1860s, apart from a period during and after the Khmer Rouge era. The palace is a working royal site, so check opening hours and dress rules for your date. If you want to learn about the Khmer Rouge period, give the capital at least two nights and plan time for museums and memorials, which deserve more than a rushed visit.' },
    { img: '/images/commons/phnompenh-1.jpg', alt: 'Buildings of the Royal Palace in Phnom Penh', credit: CREDIT.palace },
    ...entryAndSafety,
    ...bestTime,
    { h: 'Choosing between 10 and 14 days' },
    { p: 'If you only want Hanoi, one central stop and Angkor, our 10-day guide covers it. Fourteen days suits travellers who also want the south of Vietnam and a night in Phnom Penh, or who prefer a slower pace with fewer same-day transfers. A third week would let you add beaches, trekking or Laos, but every added country adds an entry process, so decide what you most want before you extend.' },
    { h: 'How to request a proposal' },
    { p: faqNote },
  ]),
  ctaHeading: 'Request a two-week Vietnam and Cambodia proposal',
  ctaDescription: 'Tell us your dates, number of travellers, hotel style and preferred pace. We will send a written outline naming flights, hotels and guiding.',
  seo: {
    metaTitle: 'Vietnam and Cambodia in 14 Days: Private Two-Week Route from the UK',
    metaDescription: 'A two-week Vietnam and Cambodia route: Hanoi, Hue, Hoi An, Ho Chi Minh City, Angkor and Phnom Penh. UK visa rules, FCDO warnings, seasons and what to ask before booking.',
    keywords: ['Vietnam and Cambodia 14 day itinerary', 'Vietnam Cambodia 2 week holiday', 'Vietnam and Cambodia tour from UK', 'Angkor Wat Hanoi Hoi An itinerary', 'Phnom Penh Siem Reap Vietnam trip'],
  },
};

export const cambodiaGuides: Post[] = [tenDay, fourteenDay];
