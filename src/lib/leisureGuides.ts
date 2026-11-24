import type { Post, RichTextBlock, EditorialEvidence } from '@/sanity/types';

// Cycling, family and luxury-stay guides for UK travellers. Facts come from each guide's `editorial.sources`.
// No prices, hotel rankings, availability or service promises are stated: those need a written proposal for the traveller's dates.

type Part = { h: string } | { p: string } | { img: string; alt: string; credit: string };

let counter = 0;
function build(parts: Part[]): RichTextBlock[] {
  return parts.map((part) => {
    counter += 1;
    const key = `leisure-${counter}`;
    if ('img' in part) return { _type: 'image', _key: key, url: part.img, alt: part.alt, caption: part.credit };
    const text = 'h' in part ? part.h : part.p;
    return { _type: 'block', _key: key, style: 'h' in part ? 'h2' : 'normal', markDefs: [], children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }] };
  });
}

const D = '24 November 2026';
const src = (label: string, url: string) => ({ label, url, accessedAt: D });
const S = {
  vnEntry: src('GOV.UK: Vietnam entry requirements (FCDO)', 'https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements'),
  vnSafety: src('GOV.UK: Vietnam safety and security, including road travel (FCDO)', 'https://www.gov.uk/foreign-travel-advice/vietnam/safety-and-security'),
  vnHealth: src('GOV.UK: Vietnam health (FCDO)', 'https://www.gov.uk/foreign-travel-advice/vietnam/health'),
  wTrangAn: src('Wikipedia: Tràng An', 'https://en.wikipedia.org/wiki/Tr%C3%A0ng_An'),
  wHaiVan: src('Wikipedia: Hải Vân Pass', 'https://en.wikipedia.org/wiki/H%E1%BA%A3i_V%C3%A2n_Pass'),
  wMekong: src('Wikipedia: Mekong Delta', 'https://en.wikipedia.org/wiki/Mekong_Delta'),
  wHaLong: src('Wikipedia: Ha Long Bay', 'https://en.wikipedia.org/wiki/Ha_Long_Bay'),
  wPhuQuoc: src('Wikipedia: Phú Quốc', 'https://en.wikipedia.org/wiki/Ph%C3%BA_Qu%E1%BB%91c'),
  wHue: src('Wikipedia: Huế', 'https://en.wikipedia.org/wiki/Hu%E1%BA%BF'),
};
const ed = (...s: (typeof S)[keyof typeof S][]): EditorialEvidence => ({ author: { name: 'VietnamTours.co.uk travel team' }, sources: s });
const hero = { name: 'VietnamTours.co.uk travel team', role: 'Vietnam trip planning' };

const C = {
  ninhbinh: 'Karst landscape of Ninh Binh. Photo: MapStaringEnthusiast, CC BY-SA 4.0, via Wikimedia Commons',
  mekong: 'Cai Rang floating market, Can Tho. Photo: Vyacheslav Argenberg, CC BY 4.0, via Wikimedia Commons',
  hoian: 'Japanese Bridge, Hoi An. Photo: Chainwit., CC BY 4.0, via Wikimedia Commons',
  halong: 'Boat in Ha Long Bay. Photo: Benoît Prieur, CC0, via Wikimedia Commons',
  phuquoc: 'Beach on Phu Quoc island. Photo: dronepicr, CC BY 2.0, via Wikimedia Commons',
  metropole: 'Hotel Metropole, Hanoi. Photo: The Hanoian, CC BY-SA 4.0, via Wikimedia Commons',
  capella: 'Capella Hanoi hotel. Photo: The Hanoian, CC BY-SA 4.0, via Wikimedia Commons',
  hue: 'Citadel of Hue. Photo: dronepicr, CC BY 2.0, via Wikimedia Commons',
  danang: 'Dragon Bridge, Da Nang. Photo: Kuroczynski, CC BY-SA 4.0, via Wikimedia Commons',
};

const proposalNote: Part[] = [
  { h: 'How to request a proposal' },
  { p: 'Send your month and year, number of nights, adults and children with ages, rooms and the places you want. Ask for a written proposal naming each hotel, transfers, flights, guiding and activities, with cancellation terms. Compare quotes line by line, as explained in our guide to the cost of a private Vietnam tour.' },
];

const cycling: Post = {
  _id: 'leisure-cycling-vietnam',
  slug: { current: 'cycling-holidays-in-vietnam-routes-safety-and-choosing-an-operator' },
  title: 'Cycling Holidays in Vietnam: Routes, Safety and How to Choose an Operator',
  excerpt: 'Short guided rides suit most visitors: countryside near Hoi An, the Ninh Binh karst area and the Mekong Delta have flatter terrain than the mountains. GOV.UK warns that road compliance in Vietnam is poor and motorbike accidents are common, so choose a reputable operator, a helmet that fits and insurance that covers cycling.',
  mainImage: '/images/commons/ninhbinh-1.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial: ed(S.vnSafety, S.vnEntry, S.wTrangAn, S.wHaiVan, S.wMekong),
  heroAuthor: hero,
  content: build([
    { p: 'Cycling in Vietnam can mean a gentle half-day ride between rice fields, or a multi-day route on busy roads. This guide explains where short guided rides work well, what the UK government says about road safety, and how to check an operator before you book. It is a planning checklist, not a route description for you to follow alone.' },
    { h: 'Where guided rides work well' },
    { p: 'Ninh Binh is known for its karst scenery and boat tours at Tràng An, which Wikipedia says was inscribed as a UNESCO World Heritage Site on 23 June 2014. Quiet lanes around the area suit a half-day ride combined with a boat trip. Around Hoi An, countryside rides between villages are a common half-day activity. In the Mekong Delta, a region Wikipedia says covers more than 40,500 square kilometres of south-western Vietnam, short rides along village paths pair well with boat travel. Ask the operator to describe the actual route, surface and traffic exposure for your day.' },
    { img: '/images/commons/ninhbinh-1.jpg', alt: 'Karst landscape near Ninh Binh in northern Vietnam', credit: C.ninhbinh },
    { h: 'What GOV.UK says about road safety' },
    { p: 'GOV.UK says compliance with road laws in Vietnam is poor, advises keeping your speed down and staying alert, and says that if you are involved in an accident you could face criminal charges and may need to pay compensation, even if the injuries are minor. It describes travelling by motorbike as much riskier than in the UK and says it is illegal for motorbike drivers and passengers to ride without a helmet. Use a good helmet that fits, ride with a guide who knows the roads, and avoid busy highways. Check that your travel insurance covers cycling, because some policies exclude it.' },
    { h: 'Mountain passes need extra thought' },
    { p: 'Wikipedia describes the Hải Vân Pass as an approximately 21-kilometre mountain pass on National Route 1 between Da Nang and Hue. It is better known to visitors as a scenic road than as a gentle ride. If you want to cycle a pass, ask about the traffic, the support vehicle, the weather and what happens if you cannot finish. Many visitors prefer to travel the pass by car and ride on quieter roads elsewhere.' },
    { img: '/images/commons/mekong-1.jpg', alt: 'Cai Rang floating market in the Mekong Delta', credit: C.mekong },
    { h: 'How to choose a cycling operator' },
    { p: 'Ask what bikes are supplied and when they were last serviced, whether helmets are included and in what sizes, how many guests ride with each guide, and whether a support vehicle follows the group. Ask for the planned route and distance, the rest stops, and the plan if someone is tired or the weather changes. Ask whether the operator rents bikes directly or uses a third party, and who to contact if there is a problem. Never leave your passport as a deposit; GOV.UK says not to use your passport as a deposit for hiring vehicles.' },
    { h: 'What to pack' },
    { p: 'Bring a helmet if you want a guaranteed fit, padded shorts, sun protection, a refillable water bottle, insect repellent and a light rain layer. Check the current GOV.UK health guidance and ask a travel-health professional what applies to your itinerary.' },
    ...proposalNote,
  ]),
  ctaHeading: 'Ask about a guided cycling day',
  ctaDescription: 'Tell us your dates, fitness level and who is riding. We will send a written outline naming the route, bikes and support.',
  seo: {
    metaTitle: 'Cycling Holidays in Vietnam: Routes, Safety and Choosing an Operator',
    metaDescription: 'Cycling in Vietnam for UK travellers: where short guided rides work, what GOV.UK says about road safety, and what to ask an operator before booking.',
    keywords: ['cycling holidays Vietnam', 'Vietnam cycling tours', 'family cycling Vietnam', 'best routes cycling Vietnam', 'reliable cycling tour operator Vietnam'],
  },
};

const family: Post = {
  _id: 'leisure-family-vietnam',
  slug: { current: 'family-holidays-in-vietnam-planning-with-children' },
  title: 'Family Holidays in Vietnam: Planning With Children',
  excerpt: 'A family trip to Vietnam works best with fewer bases, shorter transfers and a mix of heritage, boat time and beach. Ha Long Bay, Hoi An and Phu Quoc are common choices. UK travellers can enter visa-free for up to 45 days; ask about child policies, cabin and room types, and what activities suit each age before booking.',
  mainImage: '/images/commons/halong-2.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial: ed(S.vnEntry, S.vnHealth, S.vnSafety, S.wHaLong, S.wPhuQuoc),
  heroAuthor: hero,
  content: build([
    { p: 'Families ask what is realistic with children rather than what is on a list of highlights. This guide outlines a pace and structure that tends to work, what to ask about on the ground, and what to check with official sources before you travel. It is general guidance. Always follow the advice of your own doctor and the current FCDO pages for your children’s needs.' },
    { h: 'Plan fewer bases, shorter transfers' },
    { p: 'Two weeks with three or four bases is easier for children than six one-night stops. Put the longest transfers on days with a gentle activity and avoid long drives on arrival day, when children may be tired from the flight. Ask the proposal to list each transfer and its length, and to say whether a child seat is available on the private vehicle. If a seat is needed for safety, confirm it in writing rather than assuming.' },
    { img: '/images/commons/halong-2.jpg', alt: 'A boat on Ha Long Bay', credit: C.halong },
    { h: 'Ha Long Bay with children' },
    { p: 'Wikipedia describes Ha Long Bay as a bay in north-eastern Vietnam featuring thousands of limestone karsts and islets, listed as a UNESCO World Heritage Site. If you cruise, ask about the minimum age on the boat, the swimming arrangements, the cabin layout for a family and how safety equipment is handled for children. A one-night cruise is usually enough for younger children; older children may enjoy a second night with kayaking or a cave visit if the itinerary suits them.' },
    { img: '/images/commons/hoian-2.jpg', alt: 'The Japanese Bridge in Hoi An', credit: C.hoian },
    { h: 'Hoi An and the coast' },
    { p: 'Hoi An’s old town is easy to explore on foot, and the nearby coast offers beach time. Combine a morning of heritage with an afternoon at the beach, and keep one free day without a schedule. Ask the hotel about family rooms and a pool, and check whether the beach you plan to visit has lifeguards.' },
    { h: 'Phu Quoc for a beach stay' },
    { p: 'Wikipedia says Phú Quốc is the largest island in Vietnam, with a total area of 575 square kilometres. It is a common choice for a few days at the end of a trip. Ask about the transfer from the airport, the beach conditions in your month, and what the resort offers for children.' },
    { img: '/images/commons/phuquoc-2.jpg', alt: 'A beach on Phu Quoc island', credit: C.phuquoc },
    { h: 'Entry, health and safety' },
    { p: 'GOV.UK says UK travellers can visit Vietnam without a visa for up to 45 days. It also says violent crime against foreigners is rare but petty theft occurs regularly, and that compliance with road laws is poor. Use seat belts where fitted and take care on busy streets. For vaccinations and health advice for children, use the current GOV.UK Vietnam health page and speak to a qualified travel-health professional.' },
    { h: 'Questions to ask an operator' },
    { p: 'Ask about child rates and age limits, family room availability, activities that suit each age, the guide’s experience with children, meal options and what happens if a child is unwell. Ask how to reach someone on the ground during the trip and what the cancellation terms are if plans change.' },
    ...proposalNote,
  ]),
  ctaHeading: 'Plan a family holiday in Vietnam',
  ctaDescription: 'Tell us your dates, the children’s ages and the pace you prefer. We will send a written outline for your family.',
  seo: {
    metaTitle: 'Family Holidays in Vietnam: Planning With Children',
    metaDescription: 'Family holidays in Vietnam for UK travellers: pace, Ha Long Bay, Hoi An and Phu Quoc with children, entry rules and what to ask before booking.',
    keywords: ['family holiday Vietnam', 'Vietnam with children', 'family tours Vietnam', 'family friendly activities Vietnam', 'Vietnam family trip UK'],
  },
};

const luxury: Post = {
  _id: 'leisure-luxury-vietnam',
  slug: { current: 'luxury-hotels-and-resorts-in-vietnam-how-to-choose' },
  title: 'Luxury Hotels and Resorts in Vietnam: How to Choose the Right Stay',
  excerpt: 'Choose a luxury stay in Vietnam by location, room category and service rather than by star rating alone. Hanoi suits heritage hotels, Da Nang and Hoi An suit beach resorts, and Phu Quoc suits a quiet island stay. Ask for the exact room type, transfers and inclusions in writing, and check recent independent reviews.',
  mainImage: '/images/commons/metropole-hanoi-1.jpg',
  publishedAt: '2026-11-24T12:00:00Z',
  editorial: ed(S.vnEntry, S.vnSafety, S.wHue, S.wPhuQuoc, S.wHaLong),
  heroAuthor: hero,
  content: build([
    { p: 'People ask for the best luxury hotels in Vietnam, but the right answer depends on what you want from the stay. We do not rank hotels here, because rankings change and a fair comparison needs your dates and room type. This guide explains how to choose a luxury stay in each region, what to ask, and how to check a hotel’s claims.' },
    { h: 'Start with the place, then the hotel' },
    { p: 'Hanoi has a number of heritage hotels in and around the centre, useful if you want to walk to the Old Quarter. Hue is the former imperial centre in central Vietnam, so a hotel near the Perfume River or the citadel saves time on a short stay. Da Nang and Hoi An suit a beach resort combined with the old town. Phú Quốc, which Wikipedia says is the largest island in Vietnam at 575 square kilometres, suits a quiet island stay after sightseeing. For Ha Long Bay, the choice is between a cruise cabin and a hotel on shore.' },
    { img: '/images/commons/metropole-hanoi-1.jpg', alt: 'A heritage hotel in central Hanoi', credit: C.metropole },
    { img: '/images/commons/capella-hanoi-1.jpg', alt: 'A boutique luxury hotel in Hanoi', credit: C.capella },
    { h: 'What to ask before booking' },
    { p: 'Ask for the exact room category, bed type, view and size, because two rooms in the same hotel can be very different. Ask whether breakfast, airport transfers and resort fees are included, whether the pool or beach is private or shared, and what the cancellation terms are. Ask which services are provided by the hotel and which by a third party, such as spa treatments or excursions.' },
    { img: '/images/commons/hue-1.jpg', alt: 'The citadel of Hue from above', credit: C.hue },
    { h: 'How to check a hotel’s claims' },
    { p: 'Read the hotel’s own website for room and policy details, then read recent reviews on an independent platform for the same period you plan to travel. Look for comments from guests who had a similar trip to yours. Treat a star rating as a starting point, not a guarantee, and distinguish a guest’s opinion from a factual statement about a facility. If a photograph looks edited, ask for a current image.' },
    { img: '/images/commons/danang-1.jpg', alt: 'Dragon Bridge in Da Nang at night', credit: C.danang },
    { h: 'Beach resorts and seasons' },
    { p: 'Beach conditions depend on the season and the coast, so check the weather for your dates before choosing a resort. Use our Vietnam by month guide as a starting point, then ask the hotel about sea conditions, pool and indoor options if rain is likely.' },
    { h: 'Entry and safety' },
    { p: 'GOV.UK says UK travellers can visit Vietnam without a visa for up to 45 days and that violent crime against foreigners is rare, but theft and bag-snatching occur in crowded places. Keep valuables in the room safe and check current FCDO advice before you travel.' },
    ...proposalNote,
  ]),
  ctaHeading: 'Request a luxury stay proposal',
  ctaDescription: 'Tell us your dates, the places you want and the kind of room you prefer. We will send a written outline that names each hotel and room category.',
  seo: {
    metaTitle: 'Luxury Hotels and Resorts in Vietnam: How to Choose',
    metaDescription: 'How to choose a luxury hotel or resort in Vietnam: location, room category, what to ask, how to check claims and entry rules for UK travellers.',
    keywords: ['luxury hotels Vietnam', 'luxury resorts Vietnam', 'best hotels Vietnam', 'luxury Vietnam holiday UK', 'luxury hotels Hoi An Phu Quoc'],
  },
};

export const leisureGuides: Post[] = [cycling, family, luxury];
