// ─── Shared types ────────────────────────────────────────────────────────────
export interface TripFaq {
  question: string;
  answer: string;
}

export interface TripRelatedTour {
  title: string;
  duration: string;
  price: string;
  href: string;
  image: string;
}

export interface TripPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;          // main banner image
  heroSubtitle: string;
  category: string;           // badge text
  breadcrumb: string;
  intro: string;              // lead paragraph
  sections: {
    heading: string;
    body: string;
    image?: string;           // optional inline image (2 per page)
    imageAlt?: string;
    imageCaption?: string;
  }[];
  highlights: string[];       // bullet list
  faqs: TripFaq[];
  relatedSlugs: string[];     // cross-link to other trip-ideas pages
  ctaHeading: string;
  ctaBody: string;
}

// ─── Trip Ideas Data ──────────────────────────────────────────────────────────
export const tripIdeasData: TripPageData[] = [
  // 1. CULINARY TOURS
  {
    slug: 'vietnam-culinary-tours',
    title: 'Vietnam Culinary Tours: Eat Your Way Through the Country',
    metaTitle: 'Vietnam Culinary Tours 2025 | Private Food & Cooking Experiences | Vietnam Tour',
    metaDescription: 'Discover Vietnam through its extraordinary food culture. Private culinary tours from Hanoi pho to Hoi An cao lau, market visits, cooking classes, and chef\'s table dinners curated by food specialists.',
    heroImage: '/images/trip_culinary_street_food.png',
    heroSubtitle: 'From street food stalls to imperial banquets — Vietnam\'s culinary landscape is one of the world\'s great undiscovered food journeys.',
    category: 'CULINARY TOURS',
    breadcrumb: 'Culinary Tours',
    intro: 'Vietnamese cuisine is not one cuisine — it is three entirely distinct regional traditions united by a shared genius for balance and freshness. In the north, dishes are restrained and precise: broth-based soups, subtle aromatics, minimal sugar. In Hue, the central highlands, cooking becomes more complex and ceremonial, shaped by centuries of imperial court tradition. In the south, influences from Cambodia and China arrive alongside the abundance of the Mekong Delta — sweeter, richer, more exuberant. A private culinary tour threading all three is one of the most rewarding journeys you can take anywhere in the world.',
    sections: [
      {
        heading: 'Hanoi: Where Pho Was Born',
        body: 'The north is the place to understand Vietnamese cooking\'s fundamentals. Pho originated in Nam Dinh province and evolved into Hanoi\'s defining dish over a century of refinement. At Pho Thin on Dinh Tien Hoang, the broth has been simmering since 4am; the star anise, cinnamon, and charred ginger are balanced to within a breath of perfection. Your private food guide knows which stalls open at 5:30am and which family restaurants have been serving the same recipes for three generations without a printed menu. On a private Hanoi food walk, you eat where the city actually eats — not where tourists are directed.\n\nBeyond pho, Hanoi\'s food story includes bun cha (the dish Barack Obama ate with Anthony Bourdain in 2016), banh cuon (steamed rice rolls with wood ear mushroom), and bun doc mung (rice noodle soup with taro stem) — dishes that barely register on tourist food maps but represent the city\'s culinary soul.',
        image: '/images/trip_culinary_street_food.png',
        imageAlt: 'Street food vendor in Hoi An ancient town preparing bánh mì',
        imageCaption: 'A bánh mì vendor at Hoi An\'s famous Bánh Mì Phượng — the sandwich that helped put Vietnamese street food on the global map.',
      },
      {
        heading: 'Hue: The Cuisine of Emperors',
        body: 'Hue is a city that takes food seriously to the point of obsession. As Vietnam\'s imperial capital for 140 years, it developed a cuisine of extraordinary complexity — dozens of small courses, ceremonial presentation, and the use of ingredients available only in this region. Bun bo Hue is the flagship: a beef noodle soup far more complex than pho, with lemongrass at its centre and cubes of congealed pork blood for authenticity. Your private guide will take you to the stall on Nguyen Chi Thanh that has been serving it since 1978 — the version the emperor\'s descendants still eat.\n\nFor a full imperial dining experience, your specialist can arrange a private dinner at Madame Tuyen\'s garden home on the outskirts of the Citadel. The multi-course menu draws from royal recipes preserved by her family for generations. The setting — a candlelit colonial-era garden — is as memorable as the food.',
      },
      {
        heading: 'Cooking Classes: Learning to Cook Vietnamese',
        body: 'The best cooking classes in Vietnam are not hotel programmes with tourist kitchens. They begin at the market at 7am, where you shop alongside actual home cooks, selecting herbs by smell and fish by eye. Your private cooking teacher — typically a specialist with decades of experience, not a chef hired for tourist programmes — explains the philosophy: balance between hot and cold, the role of fresh herbs as a primary ingredient rather than garnish, why fish sauce is the foundation of everything.\n\nWe recommend classes in Hoi An (where the market walk is genuinely extraordinary), Hue (for royal-influenced dishes), and Saigon (for the complexity of southern cooking). Three to four hours, a private kitchen, six to eight dishes — and you leave with recipes you will actually use at home.',
        image: '/images/vietnamtour_cave_dining.png',
        imageAlt: 'Private cave dining experience in Halong Bay Vietnam',
        imageCaption: 'Cave dining in Halong Bay — one of Vietnam\'s most dramatic and exclusive culinary experiences, bookable through our specialists.',
      },
    ],
    highlights: [
      'Private market walks with a food specialist guide in Hanoi, Hoi An, and Saigon',
      'Cooking classes in family homes (not hotel kitchens)',
      'Imperial banquet dinner at Madame Tuyen\'s, Hue',
      'Cave dining experience in Halong Bay on a private junk',
      'Street food walks curated around authentic local favourites',
      'Farm-to-table lunch at Tra Que organic vegetable village, Hoi An',
      'Mekong Delta floating market and river kitchen experience',
      'Vietnamese coffee culture tour: egg coffee, weasel coffee, and more',
    ],
    faqs: [
      { question: 'Is Vietnamese food suitable for vegetarians?', answer: 'Vietnam has a rich Buddhist vegetarian tradition. Many restaurants offer excellent vegetarian menus, and markets are full of tofu, mushrooms, and fresh vegetables. We specify vegetarian or vegan requirements to all our restaurants and cooking class hosts in advance.' },
      { question: 'Can I do a culinary tour without eating meat?', answer: 'Yes, with advance planning. Vietnamese vegetarian cuisine is substantial and delicious — not a reduced version of the main menu. We have designed fully vegetarian culinary itineraries that hit every major flavour note of Vietnamese cooking through plant-based ingredients.' },
      { question: 'How many cooking classes should I do on a culinary tour?', answer: 'We recommend one cooking class per city on a multi-stop culinary tour. Each region\'s cuisine is sufficiently distinct that a Hanoi class, a Hue class, and a Hoi An class each reveal something entirely different. Three classes over a 12-day tour gives you the full picture without repetition.' },
      { question: 'What is the best city for food in Vietnam?', answer: 'An impossible question. Hanoi for discipline and clarity. Hue for complexity and ceremony. Hoi An for distinctive local specialities and the quality of its cooking schools. Saigon for diversity and innovation. Every city deserves at least one full day dedicated to eating.' },
      { question: 'Can I combine a culinary tour with a Halong Bay cruise?', answer: 'Absolutely. A two-night Halong Bay cruise on a premium junk includes excellent Vietnamese food and typically offers a cooking demonstration. We also book cave dining experiences in Halong Bay — an entirely private dinner set up inside a volcanic rock cave — as the most memorable meal of any culinary tour.' },
    ],
    relatedSlugs: ['bike-and-boat-tours', 'classic-tours', 'beach-holidays'],
    ctaHeading: 'Design Your Vietnam Culinary Journey',
    ctaBody: 'Our food specialists have eaten in every market, cooked in every kitchen worth knowing, and built culinary itineraries around the dishes that genuinely define this extraordinary country.',
  },

  // 2. BIKE & BOAT TOURS
  {
    slug: 'bike-and-boat-tours',
    title: 'Vietnam Bike & Boat Tours: Cycling Through the Country\'s Heart',
    metaTitle: 'Vietnam Bike & Boat Tours 2025 | Private Cycling & River Cruises | Vietnam Tour',
    metaDescription: 'Explore Vietnam by bicycle and boat — cycle through Sapa\'s rice terraces, pedal Hoi An\'s village paths, and cruise the Mekong Delta on a private river boat. Fully supported private cycling tours.',
    heroImage: '/images/trip_bike_rice_paddies.png',
    heroSubtitle: 'Vietnam reveals itself differently from a bicycle saddle. The roads that tour buses bypass lead to the places worth remembering.',
    category: 'BIKE & BOAT TOURS',
    breadcrumb: 'Bike & Boat Tours',
    intro: 'Vietnam\'s best landscapes — the emerald rice terraces of Sapa, the village tracks of the Mekong Delta, the coastal plains between Da Nang and Hoi An — are ideally suited to slow, human-paced exploration by bicycle. When the terrain changes and the terrain becomes water, a private river boat continues the journey seamlessly. A well-designed bike and boat tour combines both: cycling where the ground rewards it, cruising where the rivers and bays take over. The result is one of the most immersive ways to experience the country.',
    sections: [
      {
        heading: 'Sapa: Cycling the Terraced Highlands',
        body: 'The road from Sapa town descends through the Muong Hoa Valley — 1,200 metres of elevation loss over 18 kilometres of beautifully paved switchbacks. In October, when the rice harvest turns the terraces gold, this descent is among the most visually extraordinary bicycle routes in Asia. Your private guide knows which village tracks to take at the valley floor, threading between paddy fields and past H\'Mong weaving cooperatives, stopping for lunch at a family home that doesn\'t appear on any map.\n\nAll bikes are quality aluminium hybrids or road bikes, properly fitted before departure. A support vehicle follows at a discreet distance, carrying luggage, water, and anyone who finds the terrain more demanding than anticipated. Every cyclist in our tour groups finishes the route.',
        image: '/images/trip_bike_rice_paddies.png',
        imageAlt: 'Cyclists on a winding road through terraced rice paddies in Sapa Vietnam',
        imageCaption: 'The Muong Hoa Valley descent, Sapa — arguably the most beautiful cycling route in Southeast Asia at harvest time.',
      },
      {
        heading: 'Hoi An: The Village Loop',
        body: 'Hoi An is perfectly designed for cycling. The ancient town itself is pedestrianised in the evenings; the surrounding countryside is flat, with well-maintained paths connecting vegetable farms, pottery villages, and river crossings. The classic Hoi An cycling loop runs through Tra Que organic vegetable village (where you can stop for a working lunch), north to Kim Bong carpentry village across the river, and back via Cam Kim island on a small wooden ferry. Twenty-two kilometres, entirely flat, finishing at the riverside at sunset.\n\nFor a longer excursion, cycle south from Hoi An along the coast road to My Son Sanctuary — 45 kilometres of beach road and paddy paths, arriving at the Cham ruins for the golden-hour lighting that makes them as atmospheric as anything in Southeast Asia.',
      },
      {
        heading: 'The Mekong Delta: Cycling and River Life',
        body: 'The Mekong Delta is the flattest, most cycle-friendly landscape in Vietnam. The challenge here is not terrain but navigation — thousands of small roads threading between canals, rice paddies, and orchards in a landscape that rewards getting genuinely lost with a local guide. Base yourself in Can Tho for two nights, cycling the levee roads between villages in the morning and taking a private river boat to Cai Rang floating market at dawn.\n\nThe combination of bicycle (for the villages) and small wooden river boat (for the canals between them) gives you access to a landscape that no vehicle larger than a bicycle can reach. Your private river guide navigates the delta\'s water highways; your cycling guide knows the village paths between them.',
        image: '/images/vietnamtour_mekong_sampan.png',
        imageAlt: 'Traditional wooden sampan on the Mekong Delta river',
        imageCaption: 'A private sampan navigates the Mekong Delta\'s waterways — the river portion of a bike and boat itinerary through southern Vietnam.',
      },
    ],
    highlights: [
      'Sapa valley descent by bicycle through the harvest-season rice terraces',
      'Hoi An village loop: Tra Que, Kim Bong, and Cam Kim island by bicycle and ferry',
      'Mekong Delta cycling with private river boat transfers',
      'Halong Bay cycling option: Cat Ba Island circuits and coastal roads',
      'Support vehicle on all routes (no cyclist left behind)',
      'Custom-fitted quality bicycles included',
      'Private guides for both cycling routes and river passages',
      'Accommodation at selected boutique properties along each route',
    ],
    faqs: [
      { question: 'How fit do I need to be for a Vietnam bike and boat tour?', answer: 'Our standard cycling routes are designed for recreational cyclists with basic fitness. The Sapa valley descent is physically easy (mostly downhill). The Hoi An loops and Mekong Delta routes are flat. A support vehicle is always present. For more experienced cyclists, we have challenging options in Ha Giang and the northern mountains.' },
      { question: 'What type of bike is provided?', answer: 'Quality aluminium hybrid bikes suitable for mixed terrain, with front suspension, multiple gears, and proper saddles. Bike fitting (seat height, handlebar position) is done before departure. For guests who prefer a road bike or e-bike, alternatives are available on request.' },
      { question: 'Can children join a bike and boat tour?', answer: 'Yes. The Mekong Delta and Hoi An routes are ideal for families with children aged 8 and above. Tandem bikes and child seats are available. The river boat portions are calm and perfectly safe for children.' },
      { question: 'How many kilometres per day do I cycle?', answer: 'Typically 20-40 kilometres per day on standard itineraries. This is achievable in 3-5 hours at a relaxed pace with stops. Longer routes (50-80km) are available for experienced cyclists and can be specified when designing your itinerary.' },
      { question: 'What happens if I cannot complete a cycling section?', answer: 'Our support vehicle follows all cycling routes and can pick up any participant at any point. There is no pressure to complete a route; many guests cycle half the distance and ride the support vehicle for the remainder. The experience is designed to be enjoyable, not challenging.' },
    ],
    relatedSlugs: ['motorcycling-tours', 'adventure-off-beaten-track', 'vietnam-culinary-tours'],
    ctaHeading: 'Plan Your Vietnam Cycling & Boat Tour',
    ctaBody: 'We design cycling itineraries from single-day excursions to two-week fully supported tours. Every route is private, every boat is exclusive, every guide knows the back roads.',
  },

  // 3. MOTORCYCLING
  {
    slug: 'motorcycling-tours',
    title: 'Vietnam Motorcycling Tours: The Road Trip of a Lifetime',
    metaTitle: 'Vietnam Motorcycle Tours 2025 | Ha Giang Loop & Coastal Routes | Vietnam Tour',
    metaDescription: 'Explore Vietnam by motorcycle — from the legendary Ha Giang Loop through limestone peaks to the coastal Hai Van Pass. Private guided motorcycle tours with expert local riders and full support.',
    heroImage: '/images/trip_motorcycle_hagiang.png',
    heroSubtitle: 'Vietnam\'s mountain roads were made to be ridden. The Ha Giang Loop is among the most spectacular road journeys on the planet.',
    category: 'MOTORCYCLING',
    breadcrumb: 'Motorcycling Tours',
    intro: 'There is a point on the Ma Pi Leng Pass, above the Nho Que River gorge in Ha Giang Province, where the road clings to a cliff edge with a 1,000-metre drop on one side and a wall of limestone on the other. The turquoise river far below catches the light in a way that seems almost artificial. Riding this road — slowly, deliberately, with a guide who knows every bend — is one of the genuinely transcendent travel experiences available in Southeast Asia. Vietnam\'s motorcycle touring culture is among the world\'s most developed, and for good reason: the roads here are extraordinary.',
    sections: [
      {
        heading: 'The Ha Giang Loop: Vietnam\'s Greatest Road',
        body: 'The Ha Giang Loop is a 350-kilometre circuit through Vietnam\'s far north: Ha Giang city to Quan Ba (Heaven\'s Gate) to Yen Minh to Dong Van to Meo Vac and back. It crosses the UNESCO Dong Van Karst Plateau — a geological formation 400 million years old — and delivers views that feel genuinely impossible: limestone peaks dissolving into cloud, valleys of buckwheat flowers turning bright pink in October, ethnic minority villages clinging to hillsides that appear vertical. The Ma Pi Leng Pass between Dong Van and Meo Vac is the high point, in every sense.\n\nWe do not put novice riders on this road. The Ha Giang Loop requires a reasonable level of motorcycling competence, concentration, and respect for mountain roads. For guests who prefer to experience the scenery without riding, a private car follows the same route on the same schedule — the views from the car windows are identical, and equally extraordinary.',
        image: '/images/trip_motorcycle_hagiang.png',
        imageAlt: 'Motorcycle on the Ma Pi Leng pass above the Nho Que River gorge in Ha Giang Vietnam',
        imageCaption: 'The Ma Pi Leng Pass — the most dramatic road in Vietnam, 1,000 metres above the turquoise Nho Que River gorge.',
      },
      {
        heading: 'The Hai Van Pass: Vietnam\'s Most Famous Road',
        body: 'The Hai Van Pass (literally "Ocean Cloud Pass") connects Da Nang and Hue along Vietnam\'s central coast — 21 kilometres of spectacular mountain road that rise to 496 metres before descending to the Lang Co lagoon and the historic city of Hue. Jeremy Clarkson called it "one of the best coast roads in the world" after riding it for Top Gear in 2008, and the claim has held up over the intervening years.\n\nRiding or driving the Hai Van Pass is straightforward enough for riders of all experience levels — the road is well-paved and not technically demanding. The views are what make it extraordinary: on one side, the South China Sea extending to the horizon; on the other, the forested slopes of the Bach Ma National Park. Stop at the summit (the old French fortifications are still visible) for coffee and the panorama.',
      },
      {
        heading: 'The Ho Chi Minh Road: Vietnam\'s Legendary Highway',
        body: 'The Ho Chi Minh Road (National Route 15) runs roughly parallel to the better-known Highway 1, following the old wartime supply route through the country\'s mountainous interior. From Hanoi to Ho Chi Minh City, the road covers 1,800 kilometres of highland scenery — dense jungle, highland waterfalls, remote ethnic minority communities, and the emptiness of the central highlands — that Highway 1\'s coastal towns never deliver.\n\nWe design custom Ho Chi Minh Road itineraries over 10 to 21 days, combining motorcycle sections with overnight accommodation in highland towns and private car transfers where the roads become unsuitable for touring riders.',
        image: '/images/hero_sapa.png',
        imageAlt: 'Mountain road through misty highlands in northern Vietnam',
        imageCaption: 'The northern highlands of Vietnam — a landscape that reveals itself completely differently from a motorcycle saddle.',
      },
    ],
    highlights: [
      'Ha Giang Loop guided by experienced local motorcycle escort',
      'Hai Van Pass: Da Nang to Hue in a half-day ride',
      'Ho Chi Minh Road: multi-day highland touring from north to south',
      'Premium Minsk, Honda CB, or Royal Enfield motorcycles available',
      'Parallel private car option for non-riders (identical route and views)',
      'Emergency support vehicle on all routes',
      'Overnight stays in highland homestays and boutique mountain lodges',
      'H\'Mong village visits accessible only by motorcycle',
    ],
    faqs: [
      { question: 'Do I need a Vietnamese motorcycle licence?', answer: 'Technically, a Vietnamese licence or International Driving Permit endorsed for motorcycles is required. In practice, for private guided tours on pre-planned routes, enforcement varies significantly. We will advise you based on your nationality and planned route, and can arrange fully guided tours where our local guide leads from their own vehicle on all public roads.' },
      { question: 'What size motorcycles are available?', answer: 'We offer semi-automatic 110cc Honda Waves (ideal for less experienced riders), 150cc Honda CRF trail bikes (for off-road sections), and 350cc Royal Enfield Himalayans (for experienced riders who want a more substantial machine). All bikes are fully serviced and mechanically checked before each tour.' },
      { question: 'Is the Ha Giang Loop safe?', answer: 'The Ha Giang Loop is challenging mountain riding that requires experience, concentration, and appropriate respect for the terrain. We assess all riders\' experience before departure and will not permit novice riders on the more demanding mountain sections. For guests who are not confident riders, the identical route by private car is equally spectacular and highly recommended.' },
      { question: 'What is the best time to ride the Ha Giang Loop?', answer: 'September and October, when the buckwheat flowers are in bloom (turning the plateau pink and red) and the rice terraces are ripening gold. March and April for spring planting, when the terraces are flooded and mirror the sky. Avoid the main wet season (July-August) when roads can be extremely slippery and visibility is reduced.' },
      { question: 'Can I book a motorcycle tour as part of a longer Vietnam itinerary?', answer: 'Yes, and this is actually our recommended approach. A 3-5 day Ha Giang motorcycle extension combines well with a classic Hanoi to Ho Chi Minh City itinerary — Ha Giang at the start, then south by domestic flight or private car for the rest of the country.' },
    ],
    relatedSlugs: ['bike-and-boat-tours', 'adventure-off-beaten-track', 'classic-tours'],
    ctaHeading: 'Ride Vietnam With a Local Guide',
    ctaBody: 'Our motorcycle tour specialists have ridden every road in Vietnam multiple times. They know the passes, the petrol stations, the best viewpoints, and the family guesthouses that do not appear online.',
  },

  // 4. CLASSIC TOURS
  {
    slug: 'classic-tours',
    title: 'Classic Vietnam Tours: The Essential Journey from North to South',
    metaTitle: 'Classic Vietnam Tours 2025 | Private Hanoi to Ho Chi Minh City | Vietnam Tour',
    metaDescription: 'The definitive private Vietnam tour from Hanoi to Ho Chi Minh City. Two weeks through Halong Bay, Hoi An, Hue, and the Mekong Delta with a private guide, driver, and handpicked luxury hotels.',
    heroImage: '/images/vietnamtour_hanoi_colonial.png',
    heroSubtitle: 'Vietnam from north to south is one of the great travel journeys — 1,600 kilometres of landscape, history, and culture that deserves to be done slowly and well.',
    category: 'CLASSIC TOURS',
    breadcrumb: 'Classic Tours',
    intro: 'A classic Vietnam tour runs from Hanoi in the north to Ho Chi Minh City in the south — or south to north, which has the advantage of ending in Hanoi, a city that rewards a final lingering dinner on Hoan Kiem Lake. The journey covers approximately 1,600 kilometres and usually takes between 12 and 21 days depending on pace. Done properly — with a private guide, a private driver, a junk boat on Halong Bay, and genuine time in each location — it is one of the finest itineraries in all of travel.',
    sections: [
      {
        heading: 'The Classic Route: What to Expect',
        body: 'The standard north-to-south route runs: Hanoi (2-3 nights) → Halong Bay cruise (2 nights) → Hue (2 nights) → Hoi An (3 nights) → Ho Chi Minh City (2 nights) → optional Mekong Delta extension (1-2 nights). Each stop is connected by domestic flight or private car, depending on distance and preference. All transfers are private — no shared shuttles, no group minibuses.\n\nThis is the route that most first-time visitors to Vietnam take, and it has not become a cliché because of overexposure — it has become canonical because it works brilliantly. The cities are genuinely distinct. The landscapes change dramatically. The food evolves from Hanoi\'s restraint to Hue\'s ceremony to Hoi An\'s complexity to Saigon\'s exuberance. The classic route shows you an entire country in motion.',
        image: '/images/vietnamtour_hanoi_colonial.png',
        imageAlt: 'French colonial architecture in Hanoi old quarter',
        imageCaption: 'Hanoi\'s French colonial district — the starting point of every classic Vietnam tour, and a city that rewards three days of serious exploration.',
      },
      {
        heading: 'Customising the Classic Route',
        body: 'The classic route is a starting point, not a fixed itinerary. Our specialists customise every journey: add Ninh Binh (the "Halong Bay on land") between Hanoi and Halong Bay; extend Hoi An with a Cham Island snorkelling day; include a Da Nang cooking class; add the Mekong Delta after Ho Chi Minh City. Or extend the total duration to 21 days and add Sapa in the north and Phu Quoc Island in the south — transforming a classic circuit into a comprehensive survey of everything Vietnam has to offer.\n\nThe accommodation selection can also be adjusted to any standard: comfortable 4-star boutique hotels, curated luxury 5-star properties, or ultra-luxury resorts at each stop. We know every significant property in every city on this route.',
      },
      {
        heading: 'Why Private Matters on the Classic Route',
        body: 'Group tours of the classic Vietnam route have been running for decades, and the difference between a group tour and a private tour on the same route is not marginal — it is fundamental. A private guide adjusts pace, depth, and focus to you specifically. They can spend an extra hour at the Hue Citadel if you are interested in Nguyen dynasty history. They can skip the standard sites in favour of the neighbourhood market on Tuesday morning. They speak directly to the restaurant kitchen and the museum curator and the local family.\n\nA private driver means your car leaves when you are ready and stops at the roadside viewpoint you want to photograph. A private junk on Halong Bay means no strangers at breakfast, no schedule set by committee, no group dynamic.',
        image: '/images/hero_hoian.png',
        imageAlt: 'Hoi An ancient town at dusk with lanterns glowing',
        imageCaption: 'Hoi An at dusk — the centrepiece of every classic Vietnam itinerary, and a town that genuinely improves after the day\'s tour groups have left.',
      },
    ],
    highlights: [
      'Hanoi Old Quarter, Hoan Kiem Lake, and Hoa Lo Prison',
      'Two-night luxury junk cruise on Halong Bay or Lan Ha Bay',
      'Hue Imperial Citadel and Royal Tombs private tour',
      'Hoi An Ancient Town, Tra Que village, and Cham Island option',
      'Ho Chi Minh City: War Remnants Museum, Reunification Palace',
      'Optional Mekong Delta extension with private river boat',
      'All transfers by private air-conditioned vehicle',
      'Fully customisable duration (10-21 days) and accommodation tier',
    ],
    faqs: [
      { question: 'How long should a classic Vietnam tour be?', answer: 'Two weeks (14 days) is the sweet spot. Long enough to travel Hanoi to Ho Chi Minh City without feeling rushed, with 2-3 nights at each major stop. Ten days is possible but compressed. Three weeks allows you to add Sapa, Ninh Binh, or Phu Quoc.' },
      { question: 'Should I travel north to south or south to north?', answer: 'Either works well. North to south is slightly more common and ends in the energetic south. South to north ends in Hanoi, which is quieter and makes for a more reflective final evening. Weather considerations (check the regional climate calendar for your travel dates) sometimes determine the optimal direction.' },
      { question: 'Is it better to fly or take the train between stops?', answer: 'For the long distances (Hanoi to Da Nang, Da Nang to Ho Chi Minh City), domestic flights are the practical choice — fast, cheap, and reliable. The Hanoi to Da Nang overnight train is a beautiful journey and worth considering if you have time. Private car is appropriate for all shorter transfers within a region.' },
      { question: 'What is included in the price of a classic Vietnam tour?', answer: 'Our private tours include: private air-conditioned car and driver for all road transfers, English-speaking guide, accommodation at agreed hotels, domestic flights (quoted separately), selected meals, entrance fees, and cruise costs. International flights are not included.' },
      { question: 'Can I add a beach extension to a classic Vietnam tour?', answer: 'Absolutely — and we recommend it for stays of 14 days or more. Da Nang\'s My Khe Beach, the Four Seasons Nam Hai north of Hoi An, Nha Trang\'s offshore islands, and Phu Quoc Island all integrate naturally into the classic route without significant backtracking.' },
    ],
    relatedSlugs: ['vietnam-culinary-tours', 'beach-holidays', 'bike-and-boat-tours'],
    ctaHeading: 'Plan Your Classic Vietnam Tour',
    ctaBody: 'We have designed this route hundreds of times and still find ways to improve it. Every itinerary is freshly considered — not pulled from a catalogue.',
  },

  // 5. GOLF TOURS
  {
    slug: 'golf-tours',
    title: 'Vietnam Golf Tours: World-Class Courses in Extraordinary Settings',
    metaTitle: 'Vietnam Golf Tours 2025 | Private Golf Holidays | Vietnam Tour',
    metaDescription: 'Vietnam is one of Asia\'s premier golf destinations — championship courses set against limestone karsts, rice terraces, and coastal scenery. Private golf tours combining tee times with luxury accommodation and cultural exploration.',
    heroImage: '/images/trip_golf_vietnam.png',
    heroSubtitle: 'Vietnam\'s golf scene has matured into one of Asia\'s finest — spectacular courses, excellent facilities, and green fees that still surprise most Western golfers.',
    category: 'GOLF TOURS',
    breadcrumb: 'Golf Tours',
    intro: 'In the past decade, Vietnam has emerged as one of Asia\'s most compelling golf destinations. The combination of affordable green fees, exceptional course design (several by major championship architects), and the unmatched visual setting — limestone karsts, rice paddy valleys, coastal cliffs — has drawn golf travellers from across Europe and Australia who find the experience genuinely superior to Thailand or Malaysia at a significantly lower cost. A private golf tour through Vietnam\'s finest courses can be combined with cultural sightseeing, beach time, and luxury accommodation to create one of the most complete golf holidays anywhere in the world.',
    sections: [
      {
        heading: 'The Best Golf Courses in Vietnam',
        body: 'BRG Kings Island Golf Resort in Hanoi — designed by Lee Schmidt, a 45-hole complex on Dong Mo Lake — is consistently ranked among the top three courses in Southeast Asia. The Mountain Course, with its extraordinary limestone karst backdrop, is the signature round. Ba Na Hills Golf Club near Da Nang, designed by Luke Donald, opened in 2016 and immediately became one of the continent\'s most visually spectacular courses: 18 holes at altitude, with views of the central Vietnamese coast on one side and the Bach Ma National Park\'s jungle on the other.\n\nThe Montgomerie Links in Da Nang, designed by Colin Montgomerie, plays along a 5-kilometre stretch of pristine Vietnamese coastline. At Laguna Golf Lang Co, on the UNESCO-protected Lang Co lagoon between Da Nang and Hue, Sir Nick Faldo\'s signature course offers 18 holes of extraordinary coastal golf with Hai Van Pass as the backdrop.',
        image: '/images/trip_golf_vietnam.png',
        imageAlt: 'Golfer on a championship course with limestone karst mountains in background, Vietnam',
        imageCaption: 'BRG Kings Island Golf Resort\'s Mountain Course, Hanoi — the most visually dramatic course in Vietnam, set against Dong Mo Lake\'s limestone backdrop.',
      },
      {
        heading: 'Planning a Golf Tour Itinerary',
        body: 'A 10-day Vietnam golf tour typically covers three of the country\'s best golfing regions: Hanoi (BRG Kings Island, Van Tri Golf Club), Da Nang and Hue (Montgomerie Links, Ba Na Hills, Laguna Lang Co), and Ho Chi Minh City (Vietnam Golf & Country Club, Long Thanh Golf Club). Between rounds, private sightseeing is scheduled around tee times — Hanoi\'s Old Quarter in the morning, Kings Island in the afternoon; Hoi An\'s Ancient Town on a rest day between Da Nang courses.\n\nFor dedicated golfers, we offer 14-day tours covering eight to ten courses across all three regions, staying at properties immediately adjacent to the most important clubs.',
      },
      {
        heading: 'Golf and Culture: Making the Most of Both',
        body: 'The best Vietnam golf tours are not purely about golf — they alternate between world-class rounds and cultural experiences that no other Asian golf destination can offer. Halong Bay on the afternoon after Kings Island. The Hue Imperial Citadel on the rest day between Da Nang courses. The Hoi An Ancient Town evening market after a morning round at The Montgomerie.\n\nFor golfers travelling with non-golfing partners, private cultural programmes run in parallel with tee times — ensuring that the non-golfer\'s itinerary is equally considered and equally excellent. We coordinate both schedules simultaneously so that the group reunites in the evenings at their shared luxury hotel.',
        image: '/images/hero_hoian.png',
        imageAlt: 'Hoi An ancient town at dusk during a Vietnam cultural experience',
        imageCaption: 'A rest day in Hoi An between Da Nang golf rounds — the town\'s Ancient Quarter rewards an entire day of slow exploration.',
      },
    ],
    highlights: [
      'BRG Kings Island Mountain Course, Hanoi — consistently ranked top 3 in Southeast Asia',
      'Montgomerie Links, Da Nang — 5km of pristine Vietnamese coastline',
      'Ba Na Hills Golf Club, designed by Luke Donald (elevated mountain setting)',
      'Laguna Golf Lang Co, Sir Nick Faldo signature course',
      'Tee time bookings at all major courses guaranteed through our partnerships',
      'Golf and culture combinations for mixed-interest groups',
      'Parallel programmes for non-golfing partners',
      'Luxury golf hotel accommodation at or adjacent to each course',
    ],
    faqs: [
      { question: 'What is the standard of Vietnamese golf courses?', answer: 'The best Vietnamese courses are genuinely world-class — designed by major championship architects, maintained to international standards, with excellent facilities. The top five courses (BRG Kings Island, Montgomerie Links, Ba Na Hills, Laguna Lang Co, Vietnam Golf & Country Club) would be highly regarded on any Asian golf circuit.' },
      { question: 'How much do green fees cost in Vietnam?', answer: 'Green fees at Vietnam\'s best courses range from approximately £40-£120 for 18 holes, depending on the course and season — significantly less than equivalent courses in Thailand or Malaysia. We book tee times through our established partnerships, often at preferential rates.' },
      { question: 'Can I hire clubs in Vietnam?', answer: 'All major courses have club hire available, including premium brands (Callaway, TaylorMade, Titleist). We recommend hiring locally rather than transporting clubs internationally for most guests. Club quality at the top courses is generally excellent.' },
      { question: 'What is the best time of year for golf in Vietnam?', answer: 'November to April in central Vietnam (Da Nang, Hue) and Ho Chi Minh City. The Hanoi region is best October to April (avoiding the summer heat). The central coast has a wet season from October to December, though shower patterns are usually brief and tee times are rarely fully cancelled.' },
      { question: 'Can golf be combined with a Halong Bay cruise?', answer: 'Yes — this is one of our most popular combinations. Play Kings Island near Hanoi on day two or three, then transfer to Halong Bay for a two-night cruise before flying south to Da Nang for the central coast courses.' },
    ],
    relatedSlugs: ['classic-tours', 'beach-holidays', 'vietnam-culinary-tours'],
    ctaHeading: 'Design Your Vietnam Golf Tour',
    ctaBody: 'We book tee times at every significant course in Vietnam and build golf itineraries that balance the best rounds with the best of the country between them.',
  },

  // 6. BEACH HOLIDAYS
  {
    slug: 'beach-holidays',
    title: 'Vietnam Beach Holidays: The Country\'s Most Magnificent Coasts',
    metaTitle: 'Vietnam Beach Holidays 2025 | Phu Quoc, Da Nang & Nha Trang | Vietnam Tour',
    metaDescription: 'Vietnam\'s coastline stretches 3,260km with some of Southeast Asia\'s finest beaches. Private beach holidays combining Phu Quoc island paradise, Da Nang\'s resort coast, and Nha Trang\'s azure waters.',
    heroImage: '/images/trip_beach_vietnam.png',
    heroSubtitle: 'Vietnam\'s 3,260-kilometre coastline contains some of Southeast Asia\'s finest beaches — and the best of them are still discovering their potential.',
    category: 'BEACH HOLIDAYS',
    breadcrumb: 'Beach Holidays',
    intro: 'Vietnam\'s relationship with its coastline is recent. For decades, the beaches were neglected in favour of the cultural heartland inland. Then, gradually, the rest of the world discovered what Vietnamese fishermen had always known: the coast here is extraordinary. White sand, warm water, coral reefs in the south, dramatic headlands in the centre, and a resort infrastructure that has matured from basic to genuinely world-class in under a decade. A Vietnam beach holiday today can mean a barefoot island villa in Phu Quoc, a luxury resort on Da Nang\'s My Khe Beach, or a private boat to an uninhabited island off the Nha Trang coast.',
    sections: [
      {
        heading: 'Phu Quoc: Vietnam\'s Island Paradise',
        body: 'Phu Quoc, Vietnam\'s largest island, sits in the Gulf of Thailand 45 minutes by plane from Ho Chi Minh City. The north of the island is covered by national park; the west coast has the finest beaches; the south has a working fishing port and the island\'s famous fish sauce factories. In the dry season (November to April), the water is extraordinarily clear — snorkelling and diving conditions rival Thailand at a fraction of the infrastructure congestion.\n\nThe resort corridor north of Duong Dong town has matured into one of Southeast Asia\'s most impressive luxury enclaves: the Regent Phu Quoc (52 pool villas, private beach access), Park Hyatt Phu Quoc (150 ocean-view rooms), and JW Marriott Phu Quoc all occupy the same 8-kilometre stretch of immaculate coastline. Sao Beach on the south-east, accessible only by boat, is the most beautiful beach on the island and genuinely one of the finest in Southeast Asia.',
        image: '/images/trip_beach_vietnam.png',
        imageAlt: 'Luxury resort infinity pool overlooking turquoise bay in Phu Quoc island Vietnam at sunset',
        imageCaption: 'Phu Quoc\'s northern resort corridor at sunset — where Vietnam\'s most sophisticated beach resort infrastructure meets an island that still feels genuinely undiscovered in the right places.',
      },
      {
        heading: 'Da Nang and the Central Coast',
        body: 'Da Nang\'s My Khe Beach stretches 30 kilometres of fine white sand along a coast backed by granite mountains — one of the longest urban beaches in the world, now lined with international resort brands. The Four Seasons Nam Hai, 30 minutes north at Ha My Beach, is Vietnam\'s most exceptional resort: three pools (one per beach zone), 100 pool villas, and a cooking programme that draws from the surrounding Hoi An food culture.\n\nThe central coast also offers the extraordinary Hoi An beach experience: An Bang Beach, 5 kilometres from the Ancient Town, is less developed than My Khe and far more relaxed. Good beach clubs, excellent seafood, and enough sand to find a quiet corner even in the high season. Combine three days in Hoi An\'s ancient town with two days on An Bang Beach for the ideal central coast balance.',
      },
      {
        heading: 'Nha Trang and the Offshore Islands',
        body: 'Nha Trang\'s main beach is busy year-round and best approached as a base for offshore island exploration rather than as a destination in itself. The Vinpearl resort complex on Hon Tre island is an interesting anomaly — a self-contained luxury island resort with cable car access from the mainland. More interesting for genuine beach seekers are the private islands accessible only by chartered boat: Hon Mun (the best snorkelling in Vietnam), Hon Mot, and the utterly deserted beaches of the Bai Tram archipelago, 30 kilometres south.\n\nFor complete privacy, the Six Senses Ninh Van Bay — accessible only by speedboat from Nha Trang — offers 58 villa suites built among granite boulders above a private beach, with no roads, no outside visitors, and a spa programme rated consistently among Asia\'s best.',
        image: '/images/vietnamtour_phu_quoc_beach.png',
        imageAlt: 'Pristine sandy beach with clear waters in Phu Quoc Vietnam',
        imageCaption: 'Sao Beach, Phu Quoc — consistently rated among Southeast Asia\'s finest beaches, accessible only by boat and always quiet.',
      },
    ],
    highlights: [
      'Phu Quoc: Regent, Park Hyatt, or JW Marriott pool villas with private beach access',
      'Four Seasons Nam Hai, Ha My Beach — Vietnam\'s finest resort experience',
      'Sao Beach private boat excursion, Phu Quoc',
      'Six Senses Ninh Van Bay — private granite-boulder island accessible only by speedboat',
      'Da Nang\'s My Khe Beach: 30km of white sand backed by the Marble Mountains',
      'Hoi An An Bang Beach: relaxed, uncrowded, excellent beachside dining',
      'Private island snorkelling at Hon Mun, Nha Trang',
      'Combined beach and cultural itineraries from 7 to 21 days',
    ],
    faqs: [
      { question: 'When is the best time for beach holidays in Vietnam?', answer: 'Phu Quoc and southern beaches: November to April. Da Nang and central beaches: February to August (avoiding the wet season October-December). Nha Trang: January to August. Vietnam\'s regional weather variation means there is always an excellent beach destination available, regardless of travel dates.' },
      { question: 'Can I combine beaches with cultural sightseeing?', answer: 'Yes, and this is the recommended approach. The central coast (Da Nang/Hoi An) is the easiest combination — world-class beaches within 30 minutes of a UNESCO heritage town. Phu Quoc works well as a final extension after a cultural tour of the south. Nha Trang connects naturally to a Ha Giang or highlands extension.' },
      { question: 'Which Vietnamese beach is best for families?', answer: 'Da Nang\'s My Khe Beach has the best family-friendly resort infrastructure. Phu Quoc is excellent for families who want a tropical island experience. Hoi An\'s An Bang Beach is the most relaxed option for families with young children — calm water, good beach clubs, and the Ancient Town five minutes away for non-beach days.' },
      { question: 'Are there private villa options on Vietnamese beaches?', answer: 'Yes — several. The Regent Phu Quoc has 52 pool villas. Nam Hai near Hoi An offers 100 pool villas. Amanoi at Vinh Hy Bay (40 minutes from Nha Trang) has extraordinarily private hilltop villas above a national park bay. Six Senses Ninh Van Bay has 58 villa suites on a private island. We know them all in detail.' },
      { question: 'Is sea swimming safe in Vietnam?', answer: 'The calm-season water at all major Vietnamese beach destinations is safe for swimming. Some beaches, particularly on Da Nang\'s exposed northern sections, have seasonal rip currents — the lifeguarded zones are always well-marked. Phu Quoc\'s western beaches in the dry season are exceptionally calm and safe for all swimmers.' },
    ],
    relatedSlugs: ['classic-tours', 'golf-tours', 'vietnam-culinary-tours'],
    ctaHeading: 'Plan Your Vietnam Beach Holiday',
    ctaBody: 'We know every beach resort, private villa, and offshore island access point in Vietnam. From barefoot island escapes to sophisticated resort experiences — we find the one that fits.',
  },

  // 7. FIRST TIME GUIDE
  {
    slug: 'first-time-guide-vietnam',
    title: 'First Time in Vietnam: Your Complete Planning Guide',
    metaTitle: 'First Time Vietnam Guide 2025 | Expert Planning Advice | Vietnam Tour',
    metaDescription: 'Everything first-time visitors need to know about travelling Vietnam — visas, best regions, when to go, what to budget, and how to avoid the most common planning mistakes. Expert advice from specialists who know Vietnam intimately.',
    heroImage: '/images/hero_hoian.png',
    heroSubtitle: 'Vietnam rewards preparation. Every first-time traveller who plans well has a trip they talk about for the rest of their life.',
    category: 'FIRST TIME',
    breadcrumb: 'First Time Guide',
    intro: 'Vietnam is one of the most rewarding first-time travel destinations in the world, and also one of the most commonly under-planned. The country is longer than many people expect (1,650 kilometres from north to south — longer than the UK), more varied than its reputation suggests, and considerably more demanding of planning than a package beach holiday. The good news: done correctly, a first visit to Vietnam produces one of those trips people talk about for the rest of their lives. This guide covers everything you need to know before you book.',
    sections: [
      {
        heading: 'How Much Time Do You Need?',
        body: 'Ten days is the absolute minimum for a meaningful first visit. Two weeks is the recommended standard. Three weeks is ideal if you want to add Sapa and Phu Quoc Island to the classic route without feeling rushed. The single most common mistake first-time visitors make is trying to see too much in too little time — stringing together seven cities in ten days and experiencing each one only superficially.\n\nOur recommendation for a two-week first visit: Hanoi (3 nights) → Halong Bay cruise (2 nights) → Hue (2 nights) → Hoi An (3 nights) → Ho Chi Minh City (2 nights). This covers the country\'s essential highlights at a genuinely comfortable pace. It can be adjusted in either direction depending on what interests you most.',
        image: '/images/hero_hoian.png',
        imageAlt: 'Hoi An ancient town with traditional yellow buildings and paper lanterns',
        imageCaption: 'Hoi An\'s ancient town — the highlight of almost every first-time visitor\'s Vietnam itinerary, and a destination that rewards at least three full days.',
      },
      {
        heading: 'The Essential Practical Information',
        body: 'Visas: UK citizens can apply for a 90-day e-Visa online at evisa.gov.vn (US$25, approval usually within 24 hours). Most Western European nationalities have similar arrangements. Always check current requirements before applying — the rules update periodically.\n\nMoney: The Vietnamese Dong (VND). Approximately 30,000 VND to £1. ATMs are widely available in cities; BIDV and Vietcombank machines are most reliable. Card payment is accepted at hotels and restaurants; markets and street food are cash only.\n\nHealth: The NHS recommends Hepatitis A, Typhoid, and current Tetanus vaccines for Vietnam. Malaria prophylaxis for rural/jungle areas — your GP will advise based on your specific itinerary. Travel insurance is essential and non-negotiable.\n\nLanguage: English is widely spoken in tourist areas, hotels, and restaurants. Vietnamese is a tonal language that very few short-term visitors learn beyond basic pleasantries — a good phrasebook or translation app covers the small gaps.',
      },
      {
        heading: 'The Regions: What to Know Before You Choose',
        body: 'Vietnam\'s three distinct regions have different characters, climates, and cuisines. The north (Hanoi, Halong Bay, Sapa, Ha Giang) is cooler, more traditional, and culinarily austere — the food here is precise and refined. The centre (Hue, Hoi An, Da Nang) is where Vietnam\'s cultural density is highest — UNESCO heritage towns, imperial architecture, and the country\'s most complex food traditions. The south (Ho Chi Minh City, Mekong Delta, Phu Quoc) is hotter, more energetic, and more Chinese-influenced in both food and character.\n\nWeather varies significantly between regions. The north has four seasons (cool and misty in winter, hot and humid in summer). The centre has a distinct wet season (October to December). The south is hot year-round with a wet season (May to October). The advantage of Vietnam\'s length is that when one region is in its wet season, another is in its best weather — there is always a good time to visit somewhere.',
        image: '/images/hero_sapa.png',
        imageAlt: 'Misty morning over rice terraces and mountains in Sapa northern Vietnam',
        imageCaption: 'Sapa in the northern highlands — a very different Vietnam from the coastal cities, and one of the country\'s most rewarding additions to a first-time itinerary.',
      },
    ],
    highlights: [
      'Recommended two-week first itinerary: Hanoi → Halong Bay → Hue → Hoi An → Ho Chi Minh City',
      'Visa: UK e-Visa available online, 90 days, US$25, 24-hour approval',
      'Best time: Spring (Feb-April) and Autumn (Aug-Oct) for most regions',
      'Private guide and driver: the single biggest upgrade to any first-time visit',
      'Food to try: pho (Hanoi), bun bo Hue (Hue), cao lau (Hoi An), banh mi (everywhere)',
      'Top first-time cultural experiences: Halong Bay cruise, Hoi An evening market, Hue Citadel',
      'What to avoid: over-scheduling, under-budgeting for quality hotels, shared group tours',
      'Budget guidance: quality private tours from approximately £180-300 per person per day',
    ],
    faqs: [
      { question: 'Is Vietnam safe for first-time visitors?', answer: 'Yes. Vietnam is generally a very safe destination for tourists. The main risks are petty theft (bag snatching on motorbikes in busy Old Quarter areas) and traffic — Vietnamese road traffic is dense and requires pedestrian confidence. Violent crime against tourists is extremely rare. Women travelling solo consistently report Vietnam as one of the safer countries in Southeast Asia.' },
      { question: 'Should I book a tour or travel independently?', answer: 'For first-time visitors, a private guided tour delivers significantly better value and experience than independent travel. A private guide provides access, context, and logistics management that transforms the same sights into genuinely different experiences. After your first trip, you will have the local knowledge to travel independently with confidence.' },
      { question: 'What should I pack for Vietnam?', answer: 'Light, breathable clothing (the country is hot most of the year). A light layer for Sapa, Halong Bay evenings, and air-conditioned restaurants. Modest clothing (shoulders and knees covered) for temple visits. Good walking shoes (street surfaces are uneven). Insect repellent for rural areas. Sun protection for beach destinations.' },
      { question: 'How much should I budget for a two-week private Vietnam tour?', answer: 'A comfortable private tour with 4-star hotels, private guide and driver, all domestic flights, and most meals typically costs £180-220 per person per day. Luxury 5-star accommodation and ultra-premium experiences move this to £250-400+ per person per day. We can design itineraries at any budget level.' },
      { question: 'Can I combine Vietnam with neighbouring countries on a first trip?', answer: 'Possible, but not recommended for a first visit of under three weeks. Vietnam alone contains more than enough to fill two or three visits. Adding Cambodia (Angkor Wat) as a short extension is feasible; a combined Indochina tour (Vietnam, Cambodia, Laos) needs at least 21 days to do any of the three countries justice.' },
    ],
    relatedSlugs: ['classic-tours', 'vietnam-culinary-tours', 'beach-holidays'],
    ctaHeading: 'Talk to a First-Time Vietnam Specialist',
    ctaBody: 'Our specialists have helped hundreds of first-time visitors plan trips that exceeded every expectation. No question is too basic, no detail too small.',
  },

  // 8. SCHOOLS TOURS
  {
    slug: 'schools-tours',
    title: 'Vietnam Educational School Tours: Learning Through Travel',
    metaTitle: 'Vietnam School Tours 2025 | Educational Group Travel | Vietnam Tour',
    metaDescription: 'Inspiring educational tours to Vietnam for school and university groups. History, culture, geography, and sustainability programmes designed around curriculum objectives. Private groups with specialist educational guides.',
    heroImage: '/images/vietnamtour_hanoi_colonial.png',
    heroSubtitle: 'Vietnam\'s history, geography, and culture offer some of the most powerful educational experiences available to student groups anywhere in the world.',
    category: 'EDUCATIONAL',
    breadcrumb: 'Schools Tours',
    intro: 'Vietnam is an extraordinary destination for educational group travel. Its modern history — from the American War to the economic miracle of the Doi Moi reforms — is directly relevant to multiple curriculum areas. Its geography spans limestone karst geology (among the world\'s finest examples), tropical ecosystems, highland ethnic diversity, and marine environments. Its cultural heritage includes two UNESCO World Heritage Sites (Hoi An, Hue), a World Natural Heritage Site (Halong Bay), and one of the world\'s most complex living culinary cultures. We design private educational programmes for school groups of 8-30 students that address specific curriculum objectives while delivering genuinely memorable experiences.',
    sections: [
      {
        heading: 'History and Modern Vietnam',
        body: 'The American War (what Vietnam calls the period known in the West as the "Vietnam War") is one of the most studied conflicts of the 20th century. A private educational programme covering this period typically includes: the War Remnants Museum in Ho Chi Minh City (confronting but essential); the Cu Chi Tunnels underground network used by Viet Cong fighters; the Reunification Palace, frozen in the moment of the 1975 fall of Saigon; and Hoa Lo Prison (the "Hanoi Hilton") in the north, used both as a colonial prison and a US POW facility. These sites deliver history with an immediacy and emotional weight that no classroom can replicate.',
        image: '/images/press_hero_colonial.png',
        imageAlt: 'Colonial era architecture in Hanoi representing Vietnamese historical study',
        imageCaption: 'Hanoi\'s French colonial architecture tells the story of a century of colonial rule — part of any serious historical study of modern Vietnam.',
      },
      {
        heading: 'Geography, Ecology, and Sustainability',
        body: 'Halong Bay is one of the world\'s great geology classrooms: 1,969 limestone karst formations created over 500 million years of geological process, now at the intersection of a UNESCO World Heritage designation and significant environmental pressure from tourism. A field study programme aboard a private junk includes meetings with marine biologists studying the bay\'s ecosystem, visual observation of karst formation processes, and examination of the sustainable tourism policies being implemented by the Vietnam National Administration of Tourism.\n\nCat Ba Island\'s national park, at Halong Bay\'s southern edge, is home to the critically endangered Cat Ba langur (fewer than 100 individuals remaining in the wild) and offers a case study in protected area management that is directly relevant to A-level and IB geography and environmental science curricula.',
      },
    ],
    highlights: [
      'American War history programme: War Remnants Museum, Cu Chi Tunnels, Reunification Palace',
      'Halong Bay geology and marine ecology field study',
      'Cat Ba Island biodiversity and conservation programme',
      'Vietnamese culture and society: ethnic minority village visits in Sapa',
      'Sustainable development: comparing Doi Moi economic reforms with today\'s Vietnam',
      'All programmes designed to specific curriculum objectives on request',
      'Private educational guides with academic backgrounds',
      'Risk assessments, teacher briefing packs, and student activity resources provided',
    ],
    faqs: [
      { question: 'What curriculum areas does a Vietnam educational tour cover?', answer: 'History (American War, French colonial period, Vietnamese independence movements), Geography (karst geology, tropical ecosystems, sustainable development), RE and Culture (Buddhism, Confucian social values, ethnic minority traditions), and Modern Studies (economic development, urbanisation, globalisation).' },
      { question: 'What is the minimum group size for a school tour?', answer: 'Our educational programmes are designed for groups of 8-30 students plus accompanying teachers. Smaller groups (8-15) can be accommodated with private arrangements throughout. Larger groups (30+) may require split arrangements for some activities.' },
      { question: 'Is Vietnam suitable for student safety?', answer: 'Vietnam is one of the safer Asian destinations for student groups. We provide comprehensive risk assessments for every itinerary, have 24/7 emergency support, and our local guides are experienced with student groups. Standard insurance requirements apply.' },
      { question: 'What accommodation is available for school groups?', answer: 'We use reliable 3-4 star hotels with twin-share or triple rooms, single-sex floor arrangements where required, and dining facilities that can accommodate group meals. All hotels are vetted for security and student-appropriate facilities.' },
      { question: 'How far in advance should we book a school tour to Vietnam?', answer: 'A minimum of 6 months in advance for standard groups; 9-12 months for groups larger than 20 or for travel during peak Vietnamese holiday periods. Early booking secures the best hotel availability and allows time for risk assessments and curriculum alignment.' },
    ],
    relatedSlugs: ['classic-tours', 'first-time-guide-vietnam', 'adventure-off-beaten-track'],
    ctaHeading: 'Design Your Educational Vietnam Programme',
    ctaBody: 'We work directly with teachers and school coordinators to design programmes aligned with your curriculum objectives, safety requirements, and budget.',
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
export function getTripIdea(slug: string | undefined | null): TripPageData | null {
  if (!slug) return null;
  return tripIdeasData.find(t => t.slug === slug) || null;
}

export function getAllTripSlugs(): string[] {
  return tripIdeasData.map(t => t.slug);
}
