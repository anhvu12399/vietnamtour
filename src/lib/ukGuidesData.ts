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
  /** Show matching tours from the catalogue (by duration) for internal linking */
  tours?: { minDays: number; maxDays: number; heading: string };
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
    metaTitle: 'Vietnam Holidays from the UK: Complete Guide',
    metaDescription:
      'Planning a Vietnam holiday from the UK? Flights from London, visa rules, time difference, costs and the best time to go.',
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
    related: ['best-time-to-visit-vietnam-uk-travellers', 'vietnam-tour-cost-from-uk', 'is-vietnam-safe-for-uk-travellers', 'vietnam-14-day-itinerary', 'vietnam-and-cambodia-tour', 'vietnam-honeymoon-tour', 'vietnam-family-holiday'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-tour-cost-from-uk',
    path: '/vietnam-guides/vietnam-tour-cost-from-uk',
    title: 'How Much Does a Private Vietnam Tour Cost from the UK?',
    metaTitle: 'Private Vietnam Tour Cost from the UK (£)',
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
    metaTitle: 'Best Time to Visit Vietnam for UK Travellers',
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
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'is-vietnam-safe-for-uk-travellers',
    path: '/vietnam-guides/is-vietnam-safe-for-uk-travellers',
    title: 'Is Vietnam Safe for UK Travellers? Safety, Health and Solo Travel',
    metaTitle: 'Is Vietnam Safe for UK Travellers?',
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
    related: ['vietnam-holidays-from-uk'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ha-long-bay-vs-lan-ha-bay',
    path: '/vietnam-guides/ha-long-bay-vs-lan-ha-bay',
    title: 'Ha Long Bay vs Lan Ha Bay: Which Should You Choose?',
    metaTitle: 'Ha Long Bay vs Lan Ha Bay: Which to Choose',
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
    metaTitle: 'Private vs Group Tour in Vietnam',
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
    metaTitle: 'Vietnam 10–14 Day Itinerary for UK Travellers',
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

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-14-day-itinerary',
    path: '/vietnam-guides/vietnam-14-day-itinerary',
    title: 'Vietnam in 14 Days: A Private Tour Itinerary for UK Travellers',
    metaTitle: 'Vietnam 14-Day Itinerary | Private Tour Route',
    metaDescription:
      'A realistic 14-day Vietnam itinerary for UK travellers: north, centre and south with nights per stop, internal flights, pacing tips and matching private tours.',
    answer:
      'Fourteen days is the sweet spot for a first private tour of Vietnam: roughly 3 nights in Hanoi, 1–2 on a Ha Long or Lan Ha Bay cruise, 1 in Hue, 3 in Hoi An, 2–3 in Ho Chi Minh City and 1–2 in the Mekong Delta, with internal flights between regions.',
    heroImage: '/images/hero_halong_bay.png',
    category: 'Itineraries',
    tours: { minDays: 12, maxDays: 16, heading: 'Private tours of about two weeks' },
    sections: [
      {
        heading: 'Day-by-day outline',
        table: {
          caption: 'Sample 14-day Vietnam route',
          headers: ['Days', 'Where', 'Highlights'],
          rows: [
            ['1–3', 'Hanoi', 'Old Quarter, Temple of Literature, street food, water puppets'],
            ['4–5', 'Ha Long or Lan Ha Bay', 'Overnight cruise, kayaking, caves'],
            ['6', 'Hue', 'Imperial Citadel, royal tombs (fly or drive from Da Nang)'],
            ['7–9', 'Hoi An', 'Ancient Town, cooking class, countryside cycling, beach'],
            ['10–12', 'Ho Chi Minh City', 'Reunification Palace, markets, Cu Chi tunnels'],
            ['13', 'Mekong Delta', 'Boat trip, orchards, floating markets'],
            ['14', 'Departure', 'Fly home from Ho Chi Minh City or Hanoi'],
          ],
        },
      },
      {
        heading: 'How to make two weeks feel relaxed',
        bullets: [
          'Fly between Hanoi, Da Nang and Ho Chi Minh City; overland transfers eat days.',
          'Allow a gentle first day for the flight from the UK (the time difference is 6–7 hours).',
          'Stay at least 2 nights in each main base; use one-night stays only for the cruise and Hue.',
          'Book an open-jaw flight (fly into Hanoi, home from Ho Chi Minh City) to avoid backtracking.',
        ],
      },
      {
        heading: 'Who suits this route',
        paragraphs: ['First-time visitors, couples and families with older children who want a balanced mix of culture, food, landscapes and a little beach time. For a slower pace, drop the Mekong or Hue; for more adventure, swap the cruise for the northern highlands.'],
      },
    ],
    faqs: [
      { question: 'Is 14 days enough for Vietnam?', answer: 'Yes. Two weeks covers north, centre and south at a comfortable pace with internal flights.' },
      { question: 'Can I add a beach stay?', answer: 'Yes. Add 3–4 nights on the central coast (Da Nang / Hoi An) or an island such as Phu Quoc, choosing the beach by season.' },
      { question: 'Should I fly or take the train between regions?', answer: 'Flights save time (Hanoi to Ho Chi Minh City is roughly two hours). The Reunification Express train is scenic but takes well over a day end to end.' },
    ],
    sources: [],
    related: ['best-time-to-visit-vietnam-uk-travellers', 'vietnam-tour-cost-from-uk', 'vietnam-3-week-itinerary'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-3-week-itinerary',
    path: '/vietnam-guides/vietnam-3-week-itinerary',
    title: 'Vietnam in 3 Weeks: An In-Depth Private Itinerary',
    metaTitle: 'Vietnam 3-Week Itinerary | In-Depth Private Tour',
    metaDescription:
      'Three weeks in Vietnam: northern highlands, Ha Long Bay, the central coast, the south and a beach finish — a slower route for UK travellers, with matching private tours.',
    answer:
      'Three weeks lets you add the northern highlands (Sa Pa or Ha Giang), a longer central-coast stay and a beach finish to the classic north–south route, at an unhurried pace of 2–4 nights per base.',
    heroImage: '/images/hero_hoian.png',
    category: 'Itineraries',
    tours: { minDays: 15, maxDays: 25, heading: 'Longer private tours' },
    sections: [
      {
        heading: 'Sample 3-week structure',
        table: {
          caption: 'Sample 21-day Vietnam route',
          headers: ['Days', 'Region', 'What you add vs a 2-week trip'],
          rows: [
            ['1–4', 'Hanoi and surroundings', 'Day trip to Ninh Binh or a village homestay'],
            ['5–8', 'Northern highlands', 'Sa Pa terraces or the Ha Giang loop; trekking with local guides'],
            ['9–10', 'Ha Long / Lan Ha Bay', 'Two-night cruise for quieter bays'],
            ['11–15', 'Hue, Da Nang, Hoi An', 'Extra days for the coast, My Son and countryside'],
            ['16–19', 'Ho Chi Minh City and Mekong', 'Cu Chi tunnels, deeper Mekong stay'],
            ['20–21', 'Beach finish', 'Phu Quoc, Con Dao or Nha Trang depending on season'],
          ],
        },
      },
      {
        heading: 'Tips for a longer trip',
        bullets: [
          'Check seasons region by region: the north is best roughly October–April, the centre February–August, the south December–April.',
          'Build in at least two rest days with no fixed plan.',
          'Consider combining with Cambodia (Angkor Wat) or Laos if you have extra time.',
        ],
      },
    ],
    faqs: [
      { question: 'Is 3 weeks too long for Vietnam?', answer: 'Not at all. Three weeks allows slower travel, the northern highlands and a proper beach stay without rushing.' },
      { question: 'Can I add Cambodia or Laos?', answer: 'Yes, short regional flights make Siem Reap (Angkor Wat) and Luang Prabang easy additions. Each country has its own entry rules, so check official sources.' },
    ],
    sources: [],
    related: ['vietnam-14-day-itinerary', 'vietnam-and-cambodia-tour', 'best-time-to-visit-vietnam-uk-travellers'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-and-cambodia-tour',
    path: '/vietnam-guides/vietnam-and-cambodia-tour',
    title: 'Vietnam and Cambodia Combined Tour from the UK',
    metaTitle: 'Vietnam & Cambodia Combined Tour from the UK',
    metaDescription:
      'Combine Vietnam with Cambodia on one private tour from the UK: Angkor Wat, Siem Reap and the best order, flights, seasons and visa notes.',
    answer:
      'Vietnam and Cambodia combine easily on one trip: short flights link Hanoi, Da Nang or Ho Chi Minh City with Siem Reap (roughly 1–2 hours). Allow 3 nights in Siem Reap for Angkor Wat and 14–18 days in total. Each country has its own entry rules.',
    heroImage: '/images/dest_halong_limestone.png',
    category: 'Combinations',
    tours: { minDays: 14, maxDays: 25, heading: 'Longer tours that can be extended to Cambodia' },
    sections: [
      {
        heading: 'Best way to combine them',
        bullets: [
          'North–south in Vietnam, then fly Ho Chi Minh City to Siem Reap, and fly home from Siem Reap or Phnom Penh.',
          'Or start in Siem Reap and finish in Hanoi if your flights suit.',
          'Allow 3 nights for Angkor Wat, Ta Prohm and Bayon at a relaxed pace, ideally with sunrise or sunset visits.',
        ],
      },
      {
        heading: 'Seasons and entry rules',
        paragraphs: [
          'Cambodia is generally best in the cooler, drier months (roughly November–March), which overlaps well with the north and south of Vietnam. Cambodia is a separate country with its own visa and health requirements — confirm both on GOV.UK FCDO and TravelHealthPro before you travel.',
        ],
      },
    ],
    faqs: [
      { question: 'How many days do I need for Vietnam and Cambodia?', answer: 'Around 14–18 days: roughly 10–12 in Vietnam and 3–4 in Cambodia, with short flights between them.' },
      { question: 'Do UK citizens need a separate visa for Cambodia?', answer: 'Cambodia has its own entry requirements separate from Vietnam. Check the FCDO travel advice and the official Cambodian e-visa site before booking.' },
    ],
    sources: [{ label: 'FCDO – Cambodia travel advice (GOV.UK)', url: 'https://www.gov.uk/foreign-travel-advice/cambodia' }],
    related: ['vietnam-3-week-itinerary', 'best-time-to-visit-vietnam-uk-travellers', 'vietnam-14-day-itinerary'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-honeymoon-tour',
    path: '/vietnam-guides/vietnam-honeymoon-tour',
    title: 'Vietnam Honeymoon: Romantic Private Tours from the UK',
    metaTitle: 'Vietnam Honeymoon Tours | Romantic Itineraries',
    metaDescription:
      'Plan a Vietnam honeymoon: romantic stays in Hoi An and Ha Long Bay, the best beaches by season, and a private tour structure that gives you time together.',
    answer:
      'A Vietnam honeymoon works best as 10–14 days: culture and food in Hanoi, a private Ha Long or Lan Ha Bay cruise, lantern-lit Hoi An, then 4–5 nights on a beach chosen for the season. Private guides and transfers keep the days effortless.',
    heroImage: '/images/hero_hoian.png',
    category: 'Trip types',
    tours: { minDays: 9, maxDays: 14, heading: 'Private tours suited to honeymooners' },
    sections: [
      {
        heading: 'A romantic route',
        table: {
          caption: 'Sample honeymoon structure',
          headers: ['Stage', 'Where', 'Why'],
          rows: [
            ['Arrive', 'Hanoi (2 nights)', 'Boutique hotel, street food, private evening tour'],
            ['Scenery', 'Ha Long / Lan Ha Bay (1–2 nights)', 'Private cabin, sunset on deck, kayaking'],
            ['Romance', 'Hoi An (3 nights)', 'Lantern-lit Old Town, tailoring, cooking class'],
            ['Relax', 'Beach (4–5 nights)', 'Da Nang coast, Phu Quoc or Nha Trang depending on month'],
          ],
        },
      },
      {
        heading: 'Choosing the beach by season',
        paragraphs: ['Central-coast beaches (Da Nang, Hoi An) are at their best roughly March–August; southern islands such as Phu Quoc are best around November–April. Tell your planner your dates and the beach can be matched to the weather.'],
      },
    ],
    faqs: [
      { question: 'How long should a Vietnam honeymoon be?', answer: '10–14 days works well: about a week of sightseeing plus 4–5 nights of beach time.' },
      { question: 'When is the best time for a honeymoon in Vietnam?', answer: 'Spring (March–May) and autumn are popular, but the right month depends on the regions and beach you choose.' },
    ],
    sources: [],
    related: ['best-time-to-visit-vietnam-uk-travellers', 'ha-long-bay-vs-lan-ha-bay', 'vietnam-14-day-itinerary'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-family-holiday',
    path: '/vietnam-guides/vietnam-family-holiday',
    title: 'Vietnam Family Holiday: Private Tours with Children from the UK',
    metaTitle: 'Vietnam Family Holiday | Private Tours with Kids',
    metaDescription:
      'Taking children to Vietnam? Family-friendly private itineraries, pacing, health and safety notes, and the best activities for kids and teenagers.',
    answer:
      'Vietnam suits families well when the pace is gentle: 10–14 days, short drives, internal flights, 2–3 nights per base and hands-on activities such as cooking classes, cycling, boat trips and water puppets. A private guide and driver make logistics with children much easier.',
    heroImage: '/images/vietnamtour_hanoi_colonial.png',
    category: 'Trip types',
    tours: { minDays: 8, maxDays: 14, heading: 'Private tours that work for families' },
    sections: [
      {
        heading: 'Family-friendly highlights',
        bullets: [
          'Hanoi: water-puppet show, egg coffee and street-food walk (child-friendly pace)',
          'Ha Long / Lan Ha Bay: kayaking and swimming on a private cruise',
          'Hoi An: lantern-making, cooking class and countryside cycling',
          'Mekong Delta: boat rides and coconut candy workshops',
          'Beach days to balance sightseeing',
        ],
      },
      {
        heading: 'Planning with children',
        bullets: [
          'Check vaccinations and sun/water precautions with your GP or TravelHealthPro 6–8 weeks before departure.',
          'Choose hotels with family rooms or connecting rooms and a pool.',
          'Keep drives under about 3 hours where possible and add free afternoons.',
          'Ask for car seats and child-friendly meal options when you book.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Vietnam suitable for young children?', answer: 'Yes, with a relaxed itinerary and good planning. Check health advice for children and avoid very long travel days.' },
      { question: 'What age is best for a Vietnam family trip?', answer: 'Primary-school age and older children tend to enjoy the activities most, but families travel with toddlers too — pacing and hotel choice matter most.' },
    ],
    sources: [{ label: 'TravelHealthPro (NaTHNaC) – Vietnam', url: 'https://travelhealthpro.org.uk/country/227/vietnam' }],
    related: ['is-vietnam-safe-for-uk-travellers', 'vietnam-14-day-itinerary', 'vietnam-tour-cost-from-uk'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'hanoi-to-ho-chi-minh-city-route',
    path: '/vietnam-guides/hanoi-to-ho-chi-minh-city-route',
    title: 'Hanoi to Ho Chi Minh City: Best Route, Stops and Transport',
    metaTitle: 'Hanoi to Ho Chi Minh City Route: Stops & Transport',
    metaDescription:
      'The classic Hanoi to Ho Chi Minh City route: best stops (Ha Long, Hue, Hoi An, Mekong), flying vs train, how many days to allow and a sample plan.',
    answer:
      'The classic north–south route runs Hanoi – Ha Long/Lan Ha Bay – Hue – Hoi An/Da Nang – Ho Chi Minh City – Mekong Delta. Fly Hanoi to Da Nang and Da Nang to Ho Chi Minh City (about 1–2 hours each) and allow 10–14 days.',
    heroImage: '/images/vietnamtour_hanoi_colonial.png',
    category: 'Itineraries',
    tours: { minDays: 9, maxDays: 14, heading: 'North-to-south private tours' },
    sections: [
      {
        heading: 'Transport options',
        table: {
          caption: 'Hanoi to Ho Chi Minh City: transport compared',
          headers: ['Option', 'Time', 'Notes'],
          rows: [
            ['Direct flight', 'About 2 hours', 'Fastest; several flights daily'],
            ['Fly via Da Nang', 'About 1–2 hours per leg', 'Best for the classic stops: Hue and Hoi An'],
            ['Reunification Express train', 'Well over a day end to end', 'Scenic; best done in sections, e.g. Hue–Da Nang'],
            ['Private car/driver', 'Days', 'Used for regional legs, not the full length'],
          ],
        },
      },
      {
        heading: 'Recommended stops',
        bullets: ['Ha Long / Lan Ha Bay (north)', 'Ninh Binh (day trip from Hanoi)', 'Hue and Hoi An (centre)', 'Mekong Delta (south)'],
      },
    ],
    faqs: [
      { question: 'How far is Hanoi from Ho Chi Minh City?', answer: 'Roughly 1,600 km by road; the direct flight takes about 2 hours.' },
      { question: 'Is the train worth it?', answer: 'It is scenic and memorable in sections, but flying is the practical option for most itineraries.' },
    ],
    sources: [],
    related: ['vietnam-14-day-itinerary', 'vietnam-itinerary-10-14-days', 'best-time-to-visit-vietnam-uk-travellers'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vietnam-one-week-itinerary',
    path: '/vietnam-guides/vietnam-one-week-itinerary',
    title: 'One Week in Vietnam: Best 7–9 Day Private Itinerary',
    metaTitle: 'Vietnam 7-Day Itinerary | One Week Options',
    metaDescription:
      'How to spend one week in Vietnam: pick two regions, avoid rushing, and see sample 7–9 day routes with matching private tours.',
    answer:
      'With a week in Vietnam, choose two regions rather than three: for example Hanoi, Ha Long Bay and Hoi An, or Ho Chi Minh City, the Mekong Delta and a beach. Use one internal flight and keep to 2–3 nights per base.',
    heroImage: '/images/hero_halong_bay.png',
    category: 'Itineraries',
    tours: { minDays: 5, maxDays: 9, heading: 'Shorter private tours' },
    sections: [
      {
        heading: 'Two sample one-week routes',
        table: {
          caption: 'Sample 7–9 day Vietnam routes',
          headers: ['Route', 'Nights', 'Best for'],
          rows: [
            ['Hanoi → Ha Long Bay → Hoi An', '3 + 1 + 3', 'Culture, scenery and a heritage town'],
            ['Ho Chi Minh City → Mekong Delta → beach', '3 + 1 + 3', 'Food, river life and relaxation'],
          ],
        },
      },
    ],
    faqs: [
      { question: 'Is one week enough for Vietnam?', answer: 'It is enough to see two regions well. For the full north–south journey, plan 12–14 days.' },
    ],
    sources: [],
    related: ['vietnam-14-day-itinerary', 'vietnam-itinerary-10-14-days', 'vietnam-tour-cost-from-uk'],
  },
];

export function getUkGuide(slug: string): UkGuide | undefined {
  return ukGuides.find((g) => g.slug === slug);
}

export function getAllUkGuideSlugs(): string[] {
  return ukGuides.map((g) => g.slug);
}
