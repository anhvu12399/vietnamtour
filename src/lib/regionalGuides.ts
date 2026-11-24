import type { Post, RichTextBlock, EditorialEvidence } from '@/sanity/types';

// Multi-country and planning guides for UK travellers. Facts come from each guide's `editorial.sources`.
// No prices, availability, flight times or service promises are stated: those need a written proposal for the traveller's dates.

type Part = { h: string } | { p: string } | { img: string; alt: string; credit: string };

let counter = 0;
function build(parts: Part[]): RichTextBlock[] {
  return parts.map((part) => {
    counter += 1;
    const key = `regional-${counter}`;
    if ('img' in part) return { _type: 'image', _key: key, url: part.img, alt: part.alt, caption: part.credit };
    const text = 'h' in part ? part.h : part.p;
    return { _type: 'block', _key: key, style: 'h' in part ? 'h2' : 'normal', markDefs: [], children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }] };
  });
}

const D = '24 November 2026';
const src = (label: string, url: string) => ({ label, url, accessedAt: D });
const S = {
  vnEntry: src('GOV.UK: Vietnam entry requirements (FCDO)', 'https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements'),
  vnSafety: src('GOV.UK: Vietnam safety and security (FCDO)', 'https://www.gov.uk/foreign-travel-advice/vietnam/safety-and-security'),
  khEntry: src('GOV.UK: Cambodia entry requirements (FCDO)', 'https://www.gov.uk/foreign-travel-advice/cambodia/entry-requirements'),
  khWarn: src('GOV.UK: Cambodia travel advice and warnings (FCDO)', 'https://www.gov.uk/foreign-travel-advice/cambodia'),
  laEntry: src('GOV.UK: Laos entry requirements (FCDO)', 'https://www.gov.uk/foreign-travel-advice/laos/entry-requirements'),
  laWarn: src('GOV.UK: Laos travel advice and warnings (FCDO)', 'https://www.gov.uk/foreign-travel-advice/laos'),
  thEntry: src('GOV.UK: Thailand entry requirements (FCDO)', 'https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements'),
  arrival: src('Cambodia e-Arrival Card (official government site)', 'https://arrival.gov.kh/'),
  angkor: src('UNESCO World Heritage Centre: Angkor', 'https://whc.unesco.org/en/list/668'),
  wAngkorWat: src('Wikipedia: Angkor Wat', 'https://en.wikipedia.org/wiki/Angkor_Wat'),
  wLuang: src('Wikipedia: Luang Prabang', 'https://en.wikipedia.org/wiki/Luang_Prabang'),
  wKuang: src('Wikipedia: Kuang Si Falls', 'https://en.wikipedia.org/wiki/Kuang_Si_Falls'),
  wArun: src('Wikipedia: Wat Arun', 'https://en.wikipedia.org/wiki/Wat_Arun'),
  wBangkok: src('Wikipedia: Bangkok', 'https://en.wikipedia.org/wiki/Bangkok'),
  wPhiPhi: src('Wikipedia: Ko Phi Phi Don', 'https://en.wikipedia.org/wiki/Ko_Phi_Phi_Don'),
  wMekong: src('Wikipedia: Mekong Delta', 'https://en.wikipedia.org/wiki/Mekong_Delta'),
  wTonle: src('Wikipedia: Tonlé Sap', 'https://en.wikipedia.org/wiki/Tonl%C3%A9_Sap'),
  wCambodiaGeo: src('Wikipedia: Geography of Cambodia (climate)', 'https://en.wikipedia.org/wiki/Geography_of_Cambodia'),
};
const ed = (...s: (typeof S)[keyof typeof S][]): EditorialEvidence => ({ author: { name: 'VietnamTours.co.uk travel team' }, sources: s });
const hero = { name: 'VietnamTours.co.uk travel team', role: 'Vietnam and Southeast Asia trip planning' };

const C = {
  luang: 'Wat Xieng Thong, Luang Prabang. Photo: Basile Morin, CC BY-SA 4.0, via Wikimedia Commons',
  kuang: 'Kuang Si Falls near Luang Prabang. Photo: Basile Morin, CC BY-SA 4.0, via Wikimedia Commons',
  angkor: 'Angkor Wat. Photo: Satdeep Gill, CC BY-SA 4.0, via Wikimedia Commons',
  arun: 'Wat Arun, Bangkok. Photo: Diego Delso, CC BY-SA 3.0, via Wikimedia Commons',
  phiphi: 'Ko Phi Phi Don. Photo: Diego Delso, CC BY-SA 3.0, via Wikimedia Commons',
  mekong: 'Cai Rang floating market, Can Tho. Photo: Vyacheslav Argenberg, CC BY 4.0, via Wikimedia Commons',
  hanoi: 'Hoan Kiem Lake, Hanoi. Photo: Vyacheslav Argenberg, CC BY 4.0, via Wikimedia Commons',
};

const proposalNote: Part[] = [
  { h: 'How to request a proposal' },
  { p: 'Send your month and year, number of nights, adults and children with ages, rooms, the places you want and any fixed flights. Ask for a written proposal naming each hotel, every flight, the transfers, the guiding arrangements and the cancellation terms. Compare quotes line by line rather than by headline price, as explained in our guide to the cost of a private Vietnam tour.' },
];

const vlc: Post = {
  _id: 'regional-vietnam-laos-cambodia',
  slug: { current: 'vietnam-laos-and-cambodia-itinerary-3-4-weeks' },
  title: 'Vietnam, Laos and Cambodia: A 3 to 4 Week Route and Planning Guide for UK Travellers',
  excerpt: 'Three to four weeks is enough to combine northern Vietnam, Luang Prabang in Laos and Angkor in Cambodia without constant transfers. UK passport holders can enter Vietnam visa-free for 45 days, but need a visa for both Laos (30 days) and Cambodia (30 days), so plan the order and dates before booking flights.',
  mainImage: '/images/commons/luangprabang-1.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial: ed(S.vnEntry, S.laEntry, S.laWarn, S.khEntry, S.khWarn, S.arrival, S.angkor, S.wLuang, S.wKuang, S.wAngkorWat),
  heroAuthor: hero,
  content: build([
    { p: 'Three countries in a month is realistic when you treat the trip as three bases rather than three checklists. This guide sets out a sample order, the entry rules that decide your timetable, and how to keep the cost sensible without choosing poor-quality services. It is a planning outline, not a priced package. Flight schedules, hotel availability and prices depend on your dates.' },
    { h: 'A sample 3 to 4 week order' },
    { p: 'Start in northern Vietnam: Hanoi for several nights with a trip to Ha Long Bay or Ninh Binh, then fly to Luang Prabang in Laos for four nights, then continue to Siem Reap in Cambodia for four nights, and finish with a stay on the Vietnamese coast or in Ho Chi Minh City before flying home. A fourth week lets you add central Vietnam (Hue and Hoi An) or the Mekong Delta. Schedules between these cities change by season, so ask for current flight timetables before you commit to a sequence.' },
    { img: '/images/commons/luangprabang-1.jpg', alt: 'Wat Xieng Thong temple in Luang Prabang, Laos', credit: C.luang },
    { h: 'Luang Prabang in Laos' },
    { p: 'Wikipedia reports that Luang Prabang was designated a UNESCO World Heritage Site in 1995 and is recognised for blending Lao architecture, European colonial buildings and more than 30 Buddhist temples, with a morning alms-giving ceremony that still takes place. The Kuang Si Falls are about 29 kilometres south of the town, with a main fall of around 60 metres, and are a popular side trip. Give the town at least three nights so that the visit does not become a sequence of excursions.' },
    { img: '/images/commons/kuangsi-1.jpg', alt: 'Turquoise pools at Kuang Si Falls near Luang Prabang', credit: C.kuang },
    { h: 'Angkor in Cambodia' },
    { p: 'Angkor Wat was built between 1113 and 1150 CE and sits in the medieval capital of Angkor. The wider Angkor area is a UNESCO World Heritage Site. Three nights at Siem Reap gives two full days at the temples with a lighter day between. Our Vietnam and Cambodia guides cover the temples and the capital, Phnom Penh, in more detail.' },
    { img: '/images/commons/angkorwat-1.jpg', alt: 'Angkor Wat at sunrise, Cambodia', credit: C.angkor },
    { h: 'Entry rules for UK passport holders' },
    { p: 'GOV.UK states that UK travellers can visit Vietnam without a visa for up to 45 days. For Laos, you must have a visa: tourist visas are valid for 30 days from arrival, and you can apply for a single-entry e-visa at least 5 days in advance or obtain a single-entry visa on arrival at several entry points including Vientiane, Luang Prabang and Pakse airports. GOV.UK also says tourist visas can be extended twice while in Laos, for a total of 60 additional days. For Cambodia, a visa is required, valid for 30 days, and the e-visa should be requested at least 4 days ahead. Air arrivals must also complete a free electronic Arrival Card within 7 days before arrival. Because the Laos e-visa is single entry, do not plan to leave Laos and come back on the same visa.' },
    { h: 'Check the FCDO warnings' },
    { p: 'The FCDO advises against all but essential travel to Xaisomboun Province in Laos, which is not on the route above, and against all but essential travel within 20 km of the Cambodia–Thailand land border. Land crossings between Cambodia and Thailand were suspended at the time of writing. Read both pages in full before you book and again before you travel, and confirm that your insurance covers the whole route.' },
    { h: 'Keeping the budget sensible' },
    { p: 'The biggest cost drivers on a multi-country trip are the number of flights, the hotel category and whether guiding is private or shared. A route with fewer flights and longer stays in each place usually costs less in total than a route that moves every second night. Decide whether you prefer a private guide on the days that need explanation, such as the temples, and free time on the others. Ask for each of those components to be itemised so you can see what a change saves.' },
    { h: 'When to go' },
    { p: 'Vietnam has different weather in the north, centre and south, and Wikipedia describes Cambodia as having two seasons of roughly equal length defined by rainfall. Check conditions for each leg for the same dates, using our Vietnam by month guide for the Vietnamese legs, rather than choosing a single ideal month for all three countries.' },
    ...proposalNote,
  ]),
  ctaHeading: 'Request a Vietnam, Laos and Cambodia proposal',
  ctaDescription: 'Tell us your dates, number of travellers, hotel style and preferred pace. We will send a written outline that names flights, hotels and guiding.',
  seo: {
    metaTitle: 'Vietnam, Laos and Cambodia in 3 to 4 Weeks: Route and Visas for UK Travellers',
    metaDescription: 'A 3 to 4 week Vietnam, Laos and Cambodia route for UK travellers: Hanoi, Luang Prabang and Angkor, with visa rules, FCDO warnings, seasons and budget tips.',
    keywords: ['Vietnam Laos Cambodia tour', 'Vietnam Laos Cambodia itinerary', 'Vietnam Laos Cambodia 4 weeks', 'Vietnam Laos Cambodia budget trip from UK', 'Luang Prabang Angkor Hanoi'],
  },
};

const thai: Post = {
  _id: 'regional-vietnam-vs-thailand',
  slug: { current: 'vietnam-or-thailand-which-to-visit-and-what-affects-cost' },
  title: 'Vietnam or Thailand? How to Choose, and What Really Affects the Cost',
  excerpt: 'Neither country is cheaper in every case: the cost of a trip depends on flights, hotel category, guiding and pace more than on the country. For UK travellers, Vietnam allows a visa-free stay of up to 45 days, while Thailand’s visa-exempt tourist stay is up to 30 days from 15 September 2026. Compare written quotes for the same route and dates.',
  mainImage: '/images/commons/watarun-1.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial: ed(S.vnEntry, S.thEntry, S.wArun, S.wBangkok, S.wPhiPhi),
  heroAuthor: hero,
  content: build([
    { p: 'People ask whether Vietnam or Thailand is cheaper. We do not publish a headline answer, because a fair comparison needs the same dates, the same hotel standard and the same amount of guiding in both countries. This guide explains what actually moves the price, what differs in entry rules for UK travellers, and how the two countries feel different, so you can decide before requesting quotes.' },
    { h: 'What affects the cost more than the country' },
    { p: 'Four things usually dominate: the number of flights and baggage allowance, the hotel category and room type, whether guiding and transfers are private or shared, and the season of travel. A beach-focused trip with one long-haul flight and a single resort looks very different in cost from a two-week route with many internal flights and a private guide on most days. Compare like with like by asking for a written breakdown of each, then check what each quote includes and excludes.' },
    { img: '/images/commons/hanoi-2.jpg', alt: 'Hoan Kiem Lake in the centre of Hanoi', credit: C.hanoi },
    { h: 'Entry rules for UK passport holders' },
    { p: 'GOV.UK says UK travellers can visit Vietnam without a visa for up to 45 days, and that an e-visa allowing up to 90 days is available for longer visits. For Thailand, GOV.UK says that from 15 September 2026, entry under the visa-exemption scheme allows up to 30 days for tourism only, that officials may ask for proof of funds (at least 10,000 Thai baht per person or 20,000 baht per family) and onward or return travel, and that British nationals have been refused entry for failing to show this. Keep evidence to hand for either country and check the pages again before you travel.' },
    { h: 'How the two countries differ in character' },
    { p: 'Thailand is a strong choice if you want a beach holiday alongside a city stay. Wikipedia describes Phi Phi Don as the largest island of the Phi Phi archipelago, around 8 kilometres long, and Bangkok as the capital and largest city, with an estimated 9.1 million people in 2024. Wat Arun, on the west bank of the Chao Phraya River, is one of the country’s best-known landmarks. Vietnam works well if you want to cover very different regions in one trip, from Hanoi and Ha Long Bay in the north to Hoi An on the coast and the Mekong Delta in the south, each with its own food and weather.' },
    { img: '/images/commons/watarun-1.jpg', alt: 'Wat Arun temple on the Chao Phraya River, Bangkok', credit: C.arun },
    { img: '/images/commons/phiphi-1.jpg', alt: 'Ko Phi Phi Don island in Thailand', credit: C.phiphi },
    { h: 'Can I combine the two?' },
    { p: 'Yes, but each added country adds a flight, an entry process and a night or two of transfer time. If you want to combine Vietnam, Cambodia and Thailand, plan at least three weeks, and read our guide on how long to allow. Entry rules differ for each country, so check each GOV.UK page for your dates.' },
    { h: 'A simple way to decide' },
    { p: 'Choose Thailand first if your priority is a beach stay with easy island hopping. Choose Vietnam first if you want culture, food and scenery across several regions with private guiding. If you cannot decide, ask for two outline proposals of the same length and hotel standard, then compare the written totals and inclusions.' },
    ...proposalNote,
  ]),
  ctaHeading: 'Compare Vietnam with a written proposal',
  ctaDescription: 'Tell us your dates and preferred style. We will send an outline you can compare with any Thailand quotation line by line.',
  seo: {
    metaTitle: 'Vietnam or Thailand? How to Choose and What Affects Cost',
    metaDescription: 'Vietnam or Thailand for UK travellers: entry rules, what really affects the price, how the two countries differ and how to compare quotes fairly.',
    keywords: ['Vietnam or Thailand', 'Is Vietnam cheaper than Thailand', 'Vietnam vs Thailand holiday UK', 'Vietnam Thailand visa UK', 'Vietnam and Thailand cost comparison'],
  },
};

const vct: Post = {
  _id: 'regional-vietnam-cambodia-thailand',
  slug: { current: 'vietnam-cambodia-and-thailand-how-long-to-allow' },
  title: 'Vietnam, Cambodia and Thailand: How Long to Allow and How to Order the Route',
  excerpt: 'Allow at least three weeks to combine Vietnam, Cambodia and Thailand without spending most of the trip in transit. Entry rules differ: Vietnam up to 45 days visa-free, Cambodia a visa valid for 30 days, Thailand up to 30 days visa-exempt for tourism from 15 September 2026. Land crossings between Cambodia and Thailand were suspended at the time of writing, so plan flights.',
  mainImage: '/images/commons/angkorwat-1.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial: ed(S.vnEntry, S.khEntry, S.khWarn, S.thEntry, S.arrival, S.angkor, S.wAngkorWat, S.wArun),
  heroAuthor: hero,
  content: build([
    { p: 'The usual question is how long a trip covering Vietnam, Cambodia and Thailand needs. Our answer is three weeks as a minimum for a first visit and four if you want a slower pace. This guide explains why, how to order the stops, and what to check about entry and borders before you book.' },
    { h: 'A three-week outline' },
    { p: 'One workable order is Hanoi and Ha Long Bay or Ninh Binh in northern Vietnam, then Hoi An on the central coast, then Siem Reap for Angkor, then Bangkok, then a beach stay in southern Thailand before flying home. That is five bases in roughly twenty-one days, so keep stays at three nights or more in the places you care most about. If you want fewer flights, drop the beach stay or one of the Vietnamese stops.' },
    { img: '/images/commons/angkorwat-1.jpg', alt: 'Angkor Wat reflected in water at sunrise', credit: C.angkor },
    { h: 'Plan flights between Cambodia and Thailand' },
    { p: 'GOV.UK reports that land borders and crossings between Cambodia and Thailand continue to be suspended and that the FCDO advises against all but essential travel within 20 km of the land border. Fly between Siem Reap or Phnom Penh and Bangkok rather than planning an overland crossing, and check the FCDO page again before you travel.' },
    { img: '/images/commons/watarun-1.jpg', alt: 'Wat Arun in Bangkok', credit: C.arun },
    { h: 'Entry rules for UK passport holders' },
    { p: 'Vietnam: GOV.UK says UK travellers can visit for up to 45 days without a visa. Cambodia: a visa is required, tourist visas are valid for 30 days, the e-visa should be requested at least 4 days in advance, and air arrivals must complete a free electronic Arrival Card within 7 days before arrival. Thailand: from 15 September 2026, entry under the visa-exemption scheme allows up to 30 days for tourism only, and officials may ask for proof of funds and onward travel. Keep evidence of onward flights for each leg.' },
    { h: 'Choosing the order' },
    { p: 'Start in the country with the most tiring transfer, usually Vietnam if you are flying from the UK with a connection, and finish with a beach stay so the last days are restful. Avoid the longest journey on the day you arrive or depart. Ask each proposal how many flights it includes, who handles baggage and transfers, and what happens if a flight changes.' },
    ...proposalNote,
  ]),
  ctaHeading: 'Request a three-country proposal',
  ctaDescription: 'Tell us your dates, group size and preferred pace. We will send a written outline naming flights, hotels and guiding.',
  seo: {
    metaTitle: 'Vietnam, Cambodia and Thailand: How Long to Allow',
    metaDescription: 'How long to plan for Vietnam, Cambodia and Thailand together, in what order, with UK visa rules, FCDO border warnings and what to ask before booking.',
    keywords: ['Vietnam Cambodia Thailand itinerary', 'how long for Vietnam Cambodia Thailand', 'Vietnam Cambodia Thailand tour from UK', 'Vietnam Cambodia Thailand 3 weeks', 'best travel packages Vietnam Cambodia Thailand'],
  },
};

const solo: Post = {
  _id: 'regional-solo-vietnam',
  slug: { current: 'solo-travel-in-vietnam-safety-and-planning' },
  title: 'Solo Travel in Vietnam: Safety, Routes and What to Ask Before You Book',
  excerpt: 'Vietnam is a workable destination for solo travellers, but plan for petty crime: GOV.UK says violent crime against foreigners is rare while theft, pickpocketing and motorbike bag-snatching occur regularly, especially around Christmas and Tet. UK travellers can enter visa-free for up to 45 days. Choose a route with a few bases and decide where you want company.',
  mainImage: '/images/commons/hanoi-2.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial: ed(S.vnSafety, S.vnEntry),
  heroAuthor: hero,
  content: build([
    { p: 'Solo travellers ask two things: is it safe, and is it lonely. This guide covers what the UK government says about safety in Vietnam, how to structure a route so that you have company when you want it, and what to ask an operator before paying a single-supplement price. It is general guidance rather than personal advice.' },
    { h: 'What the FCDO says about safety' },
    { p: 'GOV.UK says violent crime against foreigners in Vietnam is rare, but petty crime such as theft and pickpocketing occurs regularly. Bag-snatchers operate in crowded areas and in places visited by tourists, and bag-snatching by thieves on motorcycles is common. It advises holding bags in front of you or on the side away from traffic. It also says petty crime typically rises around Christmas and the Tet Lunar New Year seasons. These are risks to plan for, not reasons to avoid the country.' },
    { img: '/images/commons/hanoi-2.jpg', alt: 'Hoan Kiem Lake in Hanoi', credit: C.hanoi },
    { h: 'Rules worth knowing' },
    { p: 'GOV.UK notes that Vietnam has a single-party political system, that protests are generally not tolerated and should be avoided, and that you should not expect internet privacy, since local authorities can review content on your devices. UK travellers can visit without a visa for up to 45 days. Keep copies of your passport and insurance and check the FCDO pages again before you travel.' },
    { h: 'Choosing a route you will enjoy alone' },
    { p: 'Pick a few bases rather than many one-night stops. Hanoi, Hoi An and Ho Chi Minh City are easy bases for a first visit, each with a lot to do on foot or with a local guide. Mix guided days that need local explanation, such as a food tour or a heritage site, with unplanned days. If you want company, a small-group excursion on selected days can sit inside an otherwise independent trip.' },
    { img: '/images/commons/hoian-1.jpg', alt: 'A restaurant in Hoi An old town at night', credit: 'A restaurant in Hoi An Old Town at night. Photo: Alexkom000, CC BY 4.0, via Wikimedia Commons' },
    { h: 'What to ask before booking' },
    { p: 'Ask whether the price assumes two people sharing and what the single supplement is. Ask how arrival and departure transfers work, how to reach someone if plans change, and whether the guide for each day will speak good English. Confirm hotel locations, because a well-placed hotel matters more for a solo traveller than a larger room.' },
    ...proposalNote,
  ]),
  ctaHeading: 'Plan a solo trip to Vietnam',
  ctaDescription: 'Tell us your dates, how much company you want and the places you are drawn to. We will send a written outline for one traveller.',
  seo: {
    metaTitle: 'Solo Travel in Vietnam: Safety, Routes and Booking Questions',
    metaDescription: 'Solo travel in Vietnam for UK travellers: what GOV.UK says about safety, how to structure a route and what to ask before paying a single supplement.',
    keywords: ['solo travel Vietnam', 'is Vietnam safe for solo travellers', 'solo trip to Vietnam from UK', 'Vietnam solo travel women', 'Vietnam solo holiday'],
  },
};

const cruise: Post = {
  _id: 'regional-vietnam-cambodia-cruise',
  slug: { current: 'vietnam-and-cambodia-cruise-what-to-know-before-booking' },
  title: 'Vietnam and Cambodia Cruises: What to Know Before You Book',
  excerpt: 'A cruise-based Vietnam and Cambodia trip usually means a Mekong river cruise plus separate stays at Angkor, Hanoi or Ho Chi Minh City. Before booking, confirm the sailing route and direction, the cabin, the visa steps for Cambodia and what is included. Water levels in the region change with the seasons.',
  mainImage: '/images/commons/mekong-1.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial: ed(S.wMekong, S.wTonle, S.khEntry, S.arrival, S.vnEntry, S.angkor),
  heroAuthor: hero,
  content: build([
    { p: 'Searches for Vietnam and Cambodia cruises mix several different products: Mekong river cruises, Ha Long Bay boat stays and ocean cruises that call at Vietnamese ports. This guide focuses on the Mekong river route and the questions worth asking before you commit. We do not list prices or sailing dates here, because they change and should come from a written quotation.' },
    { h: 'What a Mekong river cruise involves' },
    { p: 'Wikipedia describes the Mekong Delta as the region in south-western Vietnam where the Mekong River approaches and empties into the sea through a network of distributaries, covering more than 40,500 square kilometres. The area covered by water depends on the season. On the Cambodian side, the Tonlé Sap is the largest freshwater lake in Southeast Asia, and Wikipedia reports that its post-monsoon water level can be as much as 10 metres higher than during the monsoons. Both facts mean that sailing conditions and the available excursions can change from one month to the next.' },
    { img: '/images/commons/mekong-1.jpg', alt: 'Cai Rang floating market in Can Tho, Mekong Delta', credit: C.mekong },
    { h: 'Questions to ask before booking' },
    { p: 'Ask which direction the cruise sails, where it begins and ends, and how you get to and from the ship. Ask what the cabin is like, whether excursions are included and whether they run in small groups. Ask what happens if low water changes the route, and whether alternative arrangements are offered. Ask how guests are processed at the border, who arranges the visas, and whether you need to carry documents on board.' },
    { h: 'Visas and entry' },
    { p: 'GOV.UK says UK travellers can visit Vietnam without a visa for up to 45 days. For Cambodia, a visa is required: tourist visas are valid for 30 days, the e-visa should be requested at least 4 days ahead, and air arrivals must submit a free electronic Arrival Card within 7 days before arrival. If your cruise crosses by river, ask the operator which documents are needed and whether the visa is arranged for you. Do not assume the rules for air arrivals apply identically to a river border.' },
    { h: 'Combining a cruise with Angkor' },
    { p: 'Most travellers add a few nights at Siem Reap to see Angkor, a UNESCO World Heritage Site, before or after the river leg. Plan the order so that the longest transfer is not on your arrival or departure day.' },
    ...proposalNote,
  ]),
  ctaHeading: 'Ask about a Mekong river route',
  ctaDescription: 'Tell us your dates, group size and preferred cabin style. We will send a written outline that names the vessel or hotel, the route and what is included.',
  seo: {
    metaTitle: 'Vietnam and Cambodia Cruises: What to Know Before You Book',
    metaDescription: 'Mekong river cruise between Vietnam and Cambodia: questions to ask, visa rules for UK travellers, seasonal water levels and how to combine it with Angkor.',
    keywords: ['Vietnam and Cambodia cruise', 'Mekong river cruise Vietnam Cambodia', 'best cruise options Vietnam Cambodia', 'cruise Vietnam Cambodia from UK', 'Mekong cruise Angkor'],
  },
};

export const regionalGuides: Post[] = [vlc, thai, vct, solo, cruise];
