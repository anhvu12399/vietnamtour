// Answer-first planning guides for UK travellers.
// Written for AI answer engines (ChatGPT etc.) AND humans: direct answer first,
// concrete facts, tables, FAQs, official sources.
//
// EDITORIAL RULE: only state facts that are stable or that point to an official
// source for the live value (visa, health, safety, schedules). When you
// re-verify, bump CONTENT_REVIEWED_AT in src/lib/siteConfig.ts.

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: GuideTable;
}

export interface GuideSource {
  label: string;
  url: string;
}

export interface UkGuide {
  slug: string;
  /** Public path. Hub lives at its own URL, others under /vietnam-guides */
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** 40–60 word direct answer, shown under H1 and in JSON-LD */
  answer: string;
  heroImage: string;
  category: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  sources: GuideSource[];
  related: string[]; // slugs
  /** If true, a live "tour prices from the catalogue" table is rendered */
  showPricing?: boolean;
}

const FCDO = { label: 'FCDO – Vietnam travel advice (GOV.UK)', url: 'https://www.gov.uk/foreign-travel-advice/vietnam' };
const THP = { label: 'TravelHealthPro (NaTHNaC) – Vietnam', url: 'https://travelhealthpro.org.uk/country/227/vietnam' };
const EVISA = { label: 'Vietnam National Web Portal on Immigration (official e-visa)', url: 'https://evisa.gov.vn' };

export const ukGuides: UkGuide[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-holidays-from-uk',
    path: '/vietnam-holidays-from-uk',
    title: 'Vietnam Holidays from the UK: The Complete Planning Guide',
    metaTitle: 'Vietnam Holidays from the UK: Flights, Visa, Cost & Best Time',
    metaDescription:
      'Planning a Vietnam holiday from the UK? Flights from London, visa rules for UK passports, time difference, currency, costs and the best time to go — answered by Vietnam specialists.',
    answer:
      'From the UK, Vietnam is reached by direct flights from London to Hanoi (around 11–12 hours) or one-stop routes to Ho Chi Minh City and Da Nang. UK passport holders can currently enter visa-free for up to 45 days. Allow 10–14 days for a first private tour covering north, centre and south.',
    heroImage: '/images/dest_halong_limestone.png',
    category: 'Planning',
    sections: [
      {
        heading: 'Quick facts for UK travellers',
        table: {
          caption: 'Vietnam at a glance for travellers from the United Kingdom',
          headers: ['Topic', 'What UK travellers need to know'],
          rows: [
            ['Flights', 'Direct London–Hanoi flights operate (roughly 11–12 hours). Ho Chi Minh City and Da Nang are usually one-stop from the UK. Check current schedules before booking.'],
            ['Time difference', 'Vietnam is UTC+7 all year. That is 7 hours ahead of the UK in winter (GMT) and 6 hours ahead during British Summer Time.'],
            ['Visa', 'UK passport holders currently get visa-free entry for up to 45 days; an e-visa (up to 90 days) is available for longer stays. Rules change — always confirm on the official portal.'],
            ['Currency', 'Vietnamese dong (VND). Cards are widely accepted in hotels and restaurants used on private tours; carry some cash for markets and tips.'],
            ['Language', 'Vietnamese. English is common in tourism but a private guide makes a large difference outside big cities.'],
            ['Health', 'Check routine and travel vaccinations with your GP or TravelHealthPro at least 6–8 weeks before departure.'],
            ['Plug type', 'Types A, C and sometimes F (230 V). Bring a UK-to-EU/universal adapter.'],
            ['Best overall time', 'Spring (March–May) and autumn (late September–November) suit most routes; see the month-by-month guide.'],
          ],
        },
      },
      {
        heading: 'How long do you need?',
        paragraphs: [
          'Most UK travellers underestimate how long it takes to move between Vietnam\'s regions. A realistic pace for a first private tour is 12–14 days: Hanoi and Ha Long Bay or Lan Ha Bay, Hue and Hoi An in the centre, then Ho Chi Minh City and the Mekong Delta.',
          'If time is short, 8–10 days works well when you choose two regions rather than three. A two-to-three-week journey allows a relaxed beach finish, a northern highlands stay in Sa Pa or Ha Giang, or a combination with Cambodia or Laos.',
        ],
        bullets: [
          '7–9 days: Hanoi, Ha Long/Lan Ha Bay and Hoi An, or Ho Chi Minh City, Mekong and a beach.',
          '10–12 days: add Hue and the central coast, or the northern highlands.',
          '13–16 days: north–centre–south with a beach stay and slower days.',
          '17+ days: add Cambodia or Laos, or an off-the-beaten-path region.',
        ],
      },
      {
        heading: 'When is the best time to go?',
        paragraphs: [
          'Vietnam is long and narrow, so the weather differs by region. The north is coolest from November to March and hottest and wettest in summer. The centre is driest from roughly February to August and sees heavier rain and typhoon risk in autumn. The south is driest from about December to April.',
        ],
        table: {
          caption: 'Typical seasons by region',
          headers: ['Region', 'Generally best', 'Be aware'],
          rows: [
            ['North (Hanoi, Ha Long, Sa Pa)', 'October–April; Sa Pa also lovely in spring', 'Cool and misty in winter; hot, humid summers'],
            ['Centre (Hue, Hoi An, Da Nang)', 'February–August', 'Heavier rain and typhoon risk roughly September–December'],
            ['South (Ho Chi Minh City, Mekong, Phu Quoc)', 'December–April', 'Rainy season roughly May–November, usually short afternoon downpours'],
          ],
        },
      },
      {
        heading: 'How much does it cost?',
        paragraphs: [
          'A private, guided tour with quality hotels costs more than a group tour, but you control pace, guide and itinerary. Use our live price table on the Vietnam tour cost guide for current "from" prices per person, quoted in pounds sterling.',
        ],
        bullets: ['Current starting prices are listed in the table on the cost guide page.'],
      },
      {
        heading: 'Booking protection and what to ask any operator',
        paragraphs: [
          'Before you pay a deposit to any operator, ask how your money is protected, whether the package is covered by UK package-travel rules, and what the cancellation terms are. Ask for the operator\'s registration or membership details in writing and verify them with the issuing body.',
        ],
      },
    ],
    faqs: [
      { question: 'Are there direct flights from the UK to Vietnam?', answer: 'Yes. Direct flights operate between London and Hanoi and take roughly 11–12 hours. Ho Chi Minh City and Da Nang are normally reached with one stop. Schedules change, so check airlines before booking.' },
      { question: 'Do UK citizens need a visa for Vietnam?', answer: 'UK passport holders currently receive visa-free entry for up to 45 days. For longer stays an e-visa (up to 90 days) can be obtained on the official Vietnamese portal. Entry rules change, so confirm on the official portal and the FCDO page before you travel.' },
      { question: 'What is the time difference between the UK and Vietnam?', answer: 'Vietnam is on UTC+7 all year. It is 7 hours ahead of the UK in winter and 6 hours ahead during British Summer Time.' },
      { question: 'How many days do I need for Vietnam?', answer: 'For a first private tour, 12–14 days comfortably covers north, centre and south. With 8–10 days, choose two regions rather than three.' },
      { question: 'What currency should I take to Vietnam?', answer: 'The local currency is the Vietnamese dong (VND). Cards work in most hotels and restaurants used on private tours; carry some cash for markets, tips and small purchases.' },
      { question: 'Is Vietnam suitable for a tailor-made private tour?', answer: 'Yes. Private tours with a dedicated guide and driver are the most flexible way to see several regions, especially for families, honeymooners and travellers with limited time.' },
    ],
    sources: [FCDO, THP, EVISA],
    related: ['best-time-to-visit-vietnam-uk-travellers', 'vietnam-tour-cost-from-uk', 'vietnam-visa-for-uk-citizens', 'is-vietnam-safe-for-uk-travellers'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-tour-cost-from-uk',
    path: '/vietnam-guides/vietnam-tour-cost-from-uk',
    title: 'How Much Does a Private Vietnam Tour Cost from the UK?',
    metaTitle: 'Private Vietnam Tour Cost from the UK (£ per person) | Price Guide',
    metaDescription:
      'What does a private tour of Vietnam cost from the UK? Live "from" prices per person in pounds, what is included, flights, and what changes the price.',
    answer:
      'Private Vietnam tours from the UK are priced per person and depend mainly on trip length, hotel level and season. See the live starting-price ranges below, calculated from our current itineraries. International flights from the UK are normally additional unless a package is quoted.',
    heroImage: '/images/hero_halong_bay.png',
    category: 'Cost',
    showPricing: true,
    sections: [
      {
        heading: 'What affects the price',
        bullets: [
          'Trip length: each extra night adds hotels, guides, transfers and meals.',
          'Hotel level: boutique vs five-star resorts, and Ha Long Bay cruise category.',
          'Season: peak periods (Christmas–New Year, Tet, and school holidays) cost more.',
          'Group size: private tours are often cheaper per person for couples and families than for solo travellers because of single supplements.',
          'Internal flights: Hanoi–Da Nang–Ho Chi Minh City sectors, if included.',
          'Experiences: private boat trips, cooking classes, cultural encounters and special access.',
        ],
      },
      {
        heading: 'What is typically included in a private tour',
        bullets: [
          'Accommodation with breakfast',
          'Private English-speaking guide and air-conditioned vehicle with driver',
          'Entrance fees and planned activities',
          'Domestic transfers (and internal flights if stated in the quote)',
        ],
        paragraphs: [
          'International flights, travel insurance, visas (if needed), tips and personal expenses are usually additional. Always check the quote to see exactly what is and is not included.',
        ],
      },
      {
        heading: 'Is a private tour worth it compared with a group tour?',
        paragraphs: [
          'A private tour lets you set the pace, choose hotels and avoid fixed group schedules. A small group tour is typically cheaper per person but follows a set itinerary. For couples, families, multi-generational trips and anyone with mobility or dietary needs, private is usually the better fit.',
        ],
      },
    ],
    faqs: [
      { question: 'Are flights from the UK included in the price?', answer: 'Normally no. Prices are for the land arrangements in Vietnam. International flights from the UK can be quoted separately or arranged by you; ask for a clear breakdown.' },
      { question: 'Why is the price per person lower for two travellers than for one?', answer: 'Hotel rooms, vehicles and guides are shared between two travellers. Solo travellers often pay a single supplement.' },
      { question: 'When are Vietnam tours cheapest?', answer: 'Shoulder and green seasons are usually cheaper than peak periods such as Christmas–New Year and Tet. Weather differs by region, so the best-value months depend on your route.' },
      { question: 'Can I pay in pounds sterling?', answer: 'Our quotes for UK travellers are presented in pounds sterling. Payment terms and methods are confirmed in your written quote.' },
      { question: 'Are prices fixed?', answer: 'The "from" prices on this page are starting points per person. The final price depends on dates, hotels, group size and options, and is confirmed in a written quote.' },
    ],
    sources: [],
    related: ['vietnam-holidays-from-uk', 'private-vs-group-tour-vietnam', 'best-time-to-visit-vietnam-uk-travellers'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-time-to-visit-vietnam-uk-travellers',
    path: '/vietnam-guides/best-time-to-visit-vietnam-uk-travellers',
    title: 'Best Time to Visit Vietnam for UK Travellers, Region by Region',
    metaTitle: 'Best Time to Visit Vietnam for UK Travellers | Month & Region Guide',
    metaDescription:
      'The best time to visit Vietnam for UK travellers: north, centre and south compared, with the best months for Ha Long Bay, Hoi An, Sa Pa and the Mekong Delta.',
    answer:
      'There is no single best month for all of Vietnam. March–May and late September–November suit most routes. For the north choose October–April, for the centre February–August, and for the south December–April. Pick your region first, then your month.',
    heroImage: '/images/hero_hoian.png',
    category: 'Planning',
    sections: [
      {
        heading: 'Best months by region',
        table: {
          caption: 'Best time to visit Vietnam by region and highlight',
          headers: ['Highlight', 'Best months', 'Notes'],
          rows: [
            ['Hanoi', 'October–April', 'Cool, drier winter; hot and humid summer'],
            ['Ha Long Bay / Lan Ha Bay', 'October–April (spring can be hazy)', 'Summer brings storms and sometimes cancellations'],
            ['Sa Pa & northern highlands', 'March–May, September–November', 'Rice terraces are green in summer and golden around September–October'],
            ['Hue & Hoi An', 'February–August', 'Rain and flood risk are highest roughly October–December'],
            ['Da Nang & central beaches', 'March–August', 'Good beach conditions in the dry season'],
            ['Ho Chi Minh City & Mekong Delta', 'December–April', 'Rainy season brings short heavy showers'],
            ['Phu Quoc & southern islands', 'November–April', 'Best sea conditions in the dry season'],
          ],
        },
      },
      {
        heading: 'What suits UK school holidays and key dates',
        bullets: [
          'Christmas and New Year: north is cool and dry, south is hot and dry — popular, book early.',
          'February: Tet (Lunar New Year) dates vary; many businesses close and travel is busy.',
          'Easter and May half-term: good conditions for most regions, with the north being warm.',
          'Summer holidays (July–August): hot in the north and south; central coast is at its best for beaches.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the best month to visit Vietnam overall?', answer: 'Spring (March–May) and autumn (late September–November) work well for most itineraries, but the best month depends on your regions. Pick regions first, then dates.' },
      { question: 'When should I avoid Vietnam?', answer: 'Avoid the central coast roughly October–December for heavier rain and typhoon risk, the north in the peak of summer storms if cruising on Ha Long Bay, and Tet if you want everything open.' },
      { question: 'Is Vietnam good in winter for UK travellers?', answer: 'Yes. December–March is dry in the south and centre can be mixed. The north is cool, sometimes cold in the mountains, so pack layers.' },
      { question: 'Is monsoon season a bad time to travel?', answer: 'Not necessarily. In the south, rain often falls in short afternoon bursts, with lower prices and fewer crowds. Plan flexibly and keep an eye on central-coast typhoon forecasts.' },
    ],
    sources: [{ label: 'Vietnam Meteorological and Hydrological Administration', url: 'https://www.nchmf.gov.vn' }],
    related: ['vietnam-holidays-from-uk', 'ha-long-bay-vs-lan-ha-bay', 'vietnam-itinerary-10-14-days'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-visa-for-uk-citizens',
    path: '/vietnam-guides/vietnam-visa-for-uk-citizens',
    title: 'Vietnam Visa for UK Citizens: Entry Rules Explained',
    metaTitle: 'Vietnam Visa for UK Citizens | Visa-Free Stay & E-Visa Guide',
    metaDescription:
      'Do UK citizens need a visa for Vietnam? Visa-free stay, e-visa for longer trips, passport rules and official sources to confirm before you travel.',
    answer:
      'UK passport holders currently receive visa-free entry to Vietnam for up to 45 days. For longer stays, an e-visa valid up to 90 days can be applied for online on the official government portal. Rules change, so confirm on the official portal and GOV.UK before travelling.',
    heroImage: '/images/dest_halong_limestone.png',
    category: 'Visa',
    sections: [
      {
        heading: 'Your options as a UK passport holder',
        table: {
          caption: 'Entry options for UK citizens (check official sources for live rules)',
          headers: ['Option', 'Stay', 'How to get it'],
          rows: [
            ['Visa exemption', 'Up to 45 days', 'No application; present a valid passport on arrival'],
            ['E-visa', 'Up to 90 days', 'Apply online on the official Vietnamese immigration portal'],
          ],
        },
      },
      {
        heading: 'Passport and entry checklist',
        bullets: [
          'Passport valid for at least 6 months beyond your arrival date, with blank pages',
          'Proof of onward or return travel may be requested by airlines',
          'Check the FCDO page for current entry requirements and health advice',
          'Use the official government e-visa site only — avoid look-alike paid sites',
        ],
      },
    ],
    faqs: [
      { question: 'Do UK citizens need a visa to visit Vietnam?', answer: 'Not for short stays. UK passport holders currently get visa-free entry for up to 45 days. For longer stays they can apply for an e-visa valid up to 90 days.' },
      { question: 'How do I apply for a Vietnam e-visa?', answer: 'Apply on the official Vietnamese government immigration portal. Beware of unofficial websites that add large fees.' },
      { question: 'How long must my passport be valid?', answer: 'At least 6 months from your date of arrival is the standard requirement, with blank pages.' },
      { question: 'Where can I check the latest entry rules?', answer: 'Check the FCDO travel advice for Vietnam on GOV.UK and the official Vietnam immigration portal before you book and again before you travel.' },
    ],
    sources: [FCDO, EVISA],
    related: ['vietnam-holidays-from-uk', 'is-vietnam-safe-for-uk-travellers'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'is-vietnam-safe-for-uk-travellers',
    path: '/vietnam-guides/is-vietnam-safe-for-uk-travellers',
    title: 'Is Vietnam Safe for UK Travellers? Safety, Health and Solo Travel',
    metaTitle: 'Is Vietnam Safe for UK Travellers? Safety, Health & Solo Travel Guide',
    metaDescription:
      'Is Vietnam safe for UK travellers, families and solo women? Practical safety advice, health and vaccines, road safety and where to check FCDO guidance.',
    answer:
      'Vietnam is widely visited by UK travellers, and serious crime against tourists is uncommon, but petty theft, traffic and scams need care. Check FCDO travel advice and TravelHealthPro before you go. A private guide and driver removes most day-to-day risks.',
    heroImage: '/images/vietnamtour_hanoi_colonial.png',
    category: 'Safety',
    sections: [
      {
        heading: 'Practical safety tips',
        bullets: [
          'Traffic is the biggest day-to-day risk — cross roads slowly and steadily; use a private driver rather than renting a scooter.',
          'Bag snatching from motorbikes occurs in busy cities; carry bags on the side away from the road.',
          'Use licensed taxis or ride-hailing apps; agree prices in advance.',
          'Drink bottled or filtered water; choose busy restaurants.',
          'Keep copies of your passport and take out comprehensive travel insurance.',
        ],
      },
      {
        heading: 'Health and vaccinations',
        paragraphs: [
          'Vaccine and health advice depends on your own medical history and itinerary. Use TravelHealthPro (NaTHNaC) and speak to your GP or travel clinic 6–8 weeks before departure.',
        ],
      },
      {
        heading: 'Families, solo women and older travellers',
        paragraphs: [
          'Private touring suits all three groups: you choose pace, hotels and activities; guides help with logistics, meals and accessibility. Tell your planner about mobility, dietary and medical needs early so routes and hotels can be adjusted.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Vietnam safe for solo female travellers from the UK?', answer: 'Many solo women travel in Vietnam without problems. Normal city precautions apply. A private guide and pre-booked transfers add confidence, particularly in the first days.' },
      { question: 'Is Vietnam safe for families with children?', answer: 'Yes, Vietnam is a popular family destination. Plan realistic distances, take sun and water precautions, and check vaccine advice for children with your clinic.' },
      { question: 'Do I need vaccinations for Vietnam?', answer: 'It depends on your health history and itinerary. Check TravelHealthPro and see your GP or travel clinic 6–8 weeks before travel.' },
      { question: 'Is the tap water safe to drink?', answer: 'Use bottled or filtered water. Your hotels and guides will provide it.' },
    ],
    sources: [FCDO, THP],
    related: ['vietnam-holidays-from-uk', 'vietnam-visa-for-uk-citizens'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ha-long-bay-vs-lan-ha-bay',
    path: '/vietnam-guides/ha-long-bay-vs-lan-ha-bay',
    title: 'Ha Long Bay vs Lan Ha Bay: Which Should You Choose?',
    metaTitle: 'Ha Long Bay vs Lan Ha Bay | Luxury Cruise Comparison',
    metaDescription:
      'Ha Long Bay or Lan Ha Bay for a luxury cruise? Differences in crowds, scenery, access and best time, with a clear recommendation.',
    answer:
      'Ha Long Bay is the famous UNESCO-listed bay with the most cruise options; Lan Ha Bay lies next to it, shares similar limestone scenery, and is generally quieter with more kayaking and beaches. Choose Lan Ha for fewer boats, Ha Long for the classic highlights.',
    heroImage: '/images/dest_halong_limestone.png',
    category: 'Compare',
    sections: [
      {
        heading: 'Side-by-side comparison',
        table: {
          caption: 'Ha Long Bay vs Lan Ha Bay',
          headers: ['', 'Ha Long Bay', 'Lan Ha Bay'],
          rows: [
            ['Reputation', 'Iconic, UNESCO World Heritage Site', 'Quieter neighbour, same limestone landscape'],
            ['Crowds', 'More boats, especially on popular routes', 'Fewer boats and calmer water'],
            ['Activities', 'Caves, floating villages, kayaking', 'Kayaking, swimming, beaches, quiet lagoons'],
            ['Typical access', 'From Hanoi via Tuan Chau or Hon Gai', 'From Hanoi via Cat Ba / Gia Luan area'],
            ['Best months', 'October–April', 'October–April; swimming is best in warmer months'],
          ],
        },
      },
      {
        heading: 'Our recommendation',
        paragraphs: [
          'For a first visit who wants the classic highlights, choose Ha Long Bay. For quieter water, swimming and a more private feel, choose Lan Ha Bay. Many private itineraries combine both with a night on Cat Ba or an overnight cruise.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Lan Ha Bay better than Ha Long Bay?', answer: 'Neither is "better"; Lan Ha Bay is quieter and good for swimming and kayaking, while Ha Long Bay has the classic, more varied cruise offering.' },
      { question: 'How long should I spend on a cruise?', answer: 'One night is the usual minimum; two nights give you time for kayaking, a cave and a quiet bay without rushing.' },
      { question: 'Is the weather good all year?', answer: 'Autumn to spring is generally better. Summer brings storms and sometimes cancelled sailings.' },
    ],
    sources: [{ label: 'UNESCO – Ha Long Bay', url: 'https://whc.unesco.org/en/list/672' }],
    related: ['best-time-to-visit-vietnam-uk-travellers', 'vietnam-itinerary-10-14-days'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'private-vs-group-tour-vietnam',
    path: '/vietnam-guides/private-vs-group-tour-vietnam',
    title: 'Private vs Group Tour in Vietnam: Which Is Right for You?',
    metaTitle: 'Private vs Group Tour in Vietnam | Pros, Cons & Costs',
    metaDescription:
      'Should you book a private or small-group Vietnam tour? Compare flexibility, cost, pace and who each option suits.',
    answer:
      'A private tour gives you your own guide, driver and flexible pace and suits couples, families and special occasions; a group tour is cheaper and sociable but follows a fixed schedule. Choose private if comfort and control matter, group if budget and company do.',
    heroImage: '/images/vietnamtour_hanoi_colonial.png',
    category: 'Compare',
    sections: [
      {
        heading: 'Comparison',
        table: {
          caption: 'Private tour vs group tour',
          headers: ['', 'Private tour', 'Group tour'],
          rows: [
            ['Itinerary', 'Fully tailored', 'Fixed departure'],
            ['Pace', 'Yours', 'Set by the group'],
            ['Guide & vehicle', 'Dedicated to you', 'Shared'],
            ['Hotels', 'Chosen by you', 'Set by the operator'],
            ['Price per person', 'Higher', 'Lower'],
            ['Best for', 'Couples, families, honeymoons, multi-generational trips, special needs', 'Solo travellers on a budget who like company'],
          ],
        },
      },
    ],
    faqs: [
      { question: 'Is a private tour in Vietnam worth the extra cost?', answer: 'For many travellers yes: you get flexibility, a dedicated guide and tailored hotels. It is especially valuable with children, mobility needs or limited time.' },
      { question: 'Can I mix private and independent time?', answer: 'Yes. A private itinerary can include free days, beach time or optional experiences.' },
    ],
    sources: [],
    related: ['vietnam-tour-cost-from-uk', 'vietnam-holidays-from-uk'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-itinerary-10-14-days',
    path: '/vietnam-guides/vietnam-itinerary-10-14-days',
    title: 'Vietnam Itinerary for 10–14 Days: A Sample Route from the UK',
    metaTitle: 'Vietnam 10–14 Day Itinerary | Sample Route for UK Travellers',
    metaDescription:
      'A sensible 10–14 day Vietnam itinerary: Hanoi, Ha Long Bay, Hue, Hoi An, Ho Chi Minh City and the Mekong, with days per stop and pacing tips.',
    answer:
      'A balanced 12-day Vietnam route: Hanoi (2–3 nights), Ha Long or Lan Ha Bay (1), Hue (1), Hoi An (3), then Ho Chi Minh City (2) and the Mekong Delta (1). Use internal flights between regions to save time and add a beach stay if you can.',
    heroImage: '/images/hero_hoian.png',
    category: 'Itineraries',
    sections: [
      {
        heading: 'Sample 12-night route',
        table: {
          caption: 'Sample route and nights',
          headers: ['Stop', 'Nights', 'Why'],
          rows: [
            ['Hanoi', '2–3', 'Old Quarter, culture, food, day trips'],
            ['Ha Long / Lan Ha Bay', '1', 'Limestone karsts and an overnight cruise'],
            ['Hue', '1', 'Imperial citadel and royal tombs'],
            ['Hoi An', '3', 'Heritage town, beach, cooking and lanterns'],
            ['Ho Chi Minh City', '2', 'History, markets, food'],
            ['Mekong Delta', '1', 'River life, orchards'],
          ],
        },
      },
      {
        heading: 'Pacing tips',
        bullets: [
          'Plan an easy first day to adjust to jet lag.',
          'Use domestic flights between Hanoi, Da Nang and Ho Chi Minh City.',
          'Avoid back-to-back one-night stays.',
          'Add a beach or spa stay at the end for rest before the flight home.',
        ],
      },
    ],
    faqs: [
      { question: 'Is 10 days enough for Vietnam?', answer: '10 days is enough to see two regions well. With 12–14 days you can cover north, centre and south at a comfortable pace.' },
      { question: 'Should I start in Hanoi or Ho Chi Minh City?', answer: 'Direct flights from the UK usually serve Hanoi, so many itineraries run north to south. An open-jaw ticket avoids backtracking.' },
    ],
    sources: [],
    related: ['best-time-to-visit-vietnam-uk-travellers', 'vietnam-tour-cost-from-uk'],
  },
];

export function getUkGuide(slug: string): UkGuide | undefined {
  return ukGuides.find((g) => g.slug === slug);
}

export function getAllUkGuideSlugs(): string[] {
  return ukGuides.map((g) => g.slug);
}
