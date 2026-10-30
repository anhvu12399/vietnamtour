import type { EditorialEvidence, SeoFields } from '@/sanity/types';

// ─── Shared types ────────────────────────────────────────────────────────────
export interface ThingFaq {
  question: string;
  answer: string;
}

export interface ThingSection {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export interface ThingToDoData {
  _id?: string;
  _updatedAt?: string;
  seo?: SeoFields;
  editorial?: EditorialEvidence;
  excerpt?: string;
  keywords?: string[];
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroSubtitle: string;
  category: string;
  breadcrumb: string;
  intro: string;
  readingTime: number;
  highlights: string[];
  sections: ThingSection[];
  practicalInfo: {
    bestTime: string;
    duration: string;
    difficulty: string;
    price: string;
    location: string;
  };
  faqs: ThingFaq[];
  relatedSlugs: string[];
  ctaHeading: string;
  ctaBody: string;
}

// ─── Things To Do Data ────────────────────────────────────────────────────────
export const thingsToDoData: ThingToDoData[] = [
  {
    "slug": "kayaking-halong-bay",
    "title": "Kayaking Ha Long Bay: Paddling into Hidden Lagoons",
    "metaTitle": "Kayaking Ha Long Bay | Hidden Lagoons & Sea Caves | Vietnam Tour",
    "metaDescription": "Discover Ha Long Bay's hidden lagoons and sea caves by kayak. An experience no cruise deck can match — gliding through cathedral arches of limestone into private, mirror-still waters.",
    "heroImage": "/images/things_halong_kayaking.png",
    "heroSubtitle": "Compare the experience, practical arrangements and the right fit for your trip.",
    "category": "WATER ADVENTURES",
    "breadcrumb": "Kayaking Ha Long Bay",
    "intro": "Kayaking can bring you closer to the limestone scenery of Ha Long Bay, but it should be chosen around the actual cruise route, weather and your confidence on the water. Confirm the kayaking area, guide arrangements and equipment before booking. A scenic cruise does not automatically include every cave or lagoon shown in its photographs.",
    "readingTime": 2,
    "highlights": [
      "Paddle through cave passages into hidden lagoons inaccessible to larger boats",
      "Experience the Ba Hang floating fishing village from the water",
      "Watch sunrise from the kayak with the karsts turning gold in silence",
      "Best done from a premium overnight cruise with Indochine, Paradise, or Heritage Line"
    ],
    "sections": [
      {
        "heading": "Luon Cave: The Passage That Changes Everything",
        "body": "Luon Cave is a possible kayaking stop on some Ha Long Bay routes. Ask your cruise operator whether your sailing includes it and whether the activity is guided. Tide, weather and local operating decisions can change access. Do not plan around a particular cave solely because it appears in a general destination guide.\n\nFor a first kayaking outing, discuss your swimming ability, previous experience and any mobility concerns. Ask about the available life jackets, briefing and assistance returning to the boat.",
        "image": "/images/things_halong_kayaking.png",
        "imageAlt": "Kayaker emerging into a hidden Ha Long Bay lagoon through a limestone cave passage",
        "imageCaption": "Travel inspiration for this experience; confirm the specific arrangements in your proposal."
      },
      {
        "heading": "Bai Tu Long: The Quieter Bay Next Door",
        "body": "Compare Ha Long, Lan Ha and Bai Tu Long itineraries by the places they actually visit, not just the name of the bay in the marketing. The Ha Long Bay–Cat Ba Archipelago has UNESCO World Heritage recognition; this does not certify individual cruise companies or their activities.\n\nA smaller boat or a different route may suit your preferences, but neither guarantees solitude. Ask how many cabins and passengers will share the sailing and activity sessions."
      },
      {
        "heading": "Practical Notes: How to Do It Right",
        "body": "Request a written list of inclusions: kayaking, transfers, cabin category, meals and any equipment charge. Check age restrictions and the policy if kayaking or the whole sailing cannot operate.\n\nBuild your wider itinerary so a weather-related change can be discussed without jeopardising an international flight. For families, confirm child-sized equipment directly with the operator."
      }
    ],
    "practicalInfo": {
      "bestTime": "Check the region, forecast and operator schedule",
      "duration": "Confirm the chosen itinerary",
      "difficulty": "Beginner-friendly. No experience needed.",
      "price": "Request a current quote",
      "location": "Ha Long Bay & Bai Tu Long Bay, Quang Ninh Province"
    },
    "faqs": [
      {
        "question": "What should I confirm before booking this experience?",
        "answer": "Ask for the operator, meeting point, duration, group size, inclusions and cancellation conditions in writing. Confirm any age, mobility or dietary requirements relevant to your group."
      },
      {
        "question": "Can this fit into a private Vietnam itinerary?",
        "answer": "Share your dates and wider route with the travel team. They can discuss whether the activity fits the available time and which transfers or overnight stays the proposal would need."
      },
      {
        "question": "What happens if the planned activity cannot operate?",
        "answer": "Ask which alternatives are available and how changes, refunds or extra costs would be handled. Do not assume that a different activity or extra night is automatically included."
      }
    ],
    "relatedSlugs": [
      "watching-water-puppets-hanoi",
      "trekking-sapa-rice-terraces",
      "cruising-mekong-delta"
    ],
    "ctaHeading": "Add Ha Long Bay Kayaking to Your Private Itinerary",
    "ctaBody": "Our specialists will match you with the right cruise and ensure you have dedicated early-morning kayak sessions at the most beautiful spots in the bay.",
    "editorial": {
      "sources": [
        {
          "label": "UNESCO: Ha Long Bay–Cat Ba Archipelago",
          "url": "https://whc.unesco.org/en/list/672/",
          "accessedAt": "2026-10-28"
        }
      ]
    }
  },
  {
    "slug": "watching-water-puppets-hanoi",
    "title": "Watching Water Puppets in Hanoi: A 1,000-Year-Old Art Form",
    "metaTitle": "Water Puppet Theatre Hanoi | Thang Long Puppet Show Guide | Vietnam Tour",
    "metaDescription": "Attend a water puppet performance at Hanoi's Thang Long Water Puppet Theatre — a uniquely Vietnamese art form born in the Red River Delta over a thousand years ago. Our insider guide tells you exactly what to know.",
    "heroImage": "/images/things_water_puppets_hanoi.png",
    "heroSubtitle": "Compare the experience, practical arrangements and the right fit for your trip.",
    "category": "CULTURE & HERITAGE",
    "breadcrumb": "Water Puppets Hanoi",
    "intro": "A water-puppet performance is one way to include traditional theatre in a Hanoi stay. Choose the theatre and session first, then organise the rest of the day around the confirmed ticket. Performance times, seats, prices and accessibility should be checked with the venue rather than assumed from an older guide.",
    "readingTime": 2,
    "highlights": [
      "Watch 1,000-year-old Vietnamese water puppetry at Hanoi's most celebrated venue",
      "Live traditional orchestra with dan bau one-string instrument and trong drums",
      "Iconic scenes including the Dragon King's court, the rice harvest, and the legendary Ho Hoan Kiem turtle",
      "Performances daily at Thang Long Theatre on Dinh Tien Hoang Street, beside Hoan Kiem Lake",
      "Post-show meet with performers who explain the hidden mechanics of rod-puppet operation",
      "Best combined with an egg coffee evening at Cafe Giang on Nguyen Huu Huan Street"
    ],
    "sections": [
      {
        "heading": "What Actually Happens Inside the Theatre",
        "body": "Water puppetry combines puppets performed over water with music and storytelling. It can be enjoyed visually even when a visitor does not understand the spoken dialogue. The programme and musical presentation depend on the venue.\n\nWhen comparing tickets, confirm the theatre name, seat category and session. A ticket reseller may offer a different service or price from the venue itself.",
        "image": "/images/things_water_puppets_hanoi.png",
        "imageAlt": "Thang Long Water Puppet Theatre performers with ornate stage in Hanoi",
        "imageCaption": "Travel inspiration for this experience; confirm the specific arrangements in your proposal."
      },
      {
        "heading": "The History You Should Know Before You Go",
        "body": "Vietnam Tourism describes water puppetry as a traditional performing art associated with rural life. Treat the show as a performance to understand and enjoy, rather than a checklist of effects that every production must include.\n\nIf you want a deeper cultural visit, ask whether a guide can explain the themes before or after the show. That is a separate arrangement from a standard theatre ticket."
      },
      {
        "heading": "How to See It Without the Tourist Experience",
        "body": "Allow time to find the theatre and collect tickets. Discuss stairs, seating and access with the venue if these matter to your group. Children may have different responses to a dark auditorium, loud music and water effects.\n\nAsk about late arrival, cancellation and the actual show duration before scheduling a dinner or onward transfer. Do not assume that backstage access is included."
      }
    ],
    "practicalInfo": {
      "bestTime": "Check the region, forecast and operator schedule",
      "duration": "Confirm the chosen itinerary",
      "difficulty": "Suitable for all ages and abilities",
      "price": "Request a current quote",
      "location": "Thang Long Water Puppet Theatre, 57B Dinh Tien Hoang, Hoan Kiem, Hanoi"
    },
    "faqs": [
      {
        "question": "What should I confirm before booking this experience?",
        "answer": "Ask for the operator, meeting point, duration, group size, inclusions and cancellation conditions in writing. Confirm any age, mobility or dietary requirements relevant to your group."
      },
      {
        "question": "Can this fit into a private Vietnam itinerary?",
        "answer": "Share your dates and wider route with the travel team. They can discuss whether the activity fits the available time and which transfers or overnight stays the proposal would need."
      },
      {
        "question": "What happens if the planned activity cannot operate?",
        "answer": "Ask which alternatives are available and how changes, refunds or extra costs would be handled. Do not assume that a different activity or extra night is automatically included."
      }
    ],
    "relatedSlugs": [
      "kayaking-halong-bay",
      "hoi-an-lantern-festival",
      "vietnamese-cooking-class-hue"
    ],
    "ctaHeading": "Make Water Puppets Part of Your Hanoi Evening",
    "ctaBody": "We build it into every Hanoi stay — with front-row seats pre-booked, a private guide to explain the symbolism, and dinner afterwards at one of the Old Quarter's best restaurants.",
    "editorial": {
      "sources": [
        {
          "label": "Vietnam Tourism: water puppets",
          "url": "https://beta-v2.vietnam.travel/things-to-do/vietnam-water-puppets",
          "accessedAt": "2026-10-28"
        }
      ]
    }
  },
  {
    "slug": "trekking-sapa-rice-terraces",
    "title": "Trekking the Rice Terraces of Sapa: Walking in a Painting",
    "metaTitle": "Trekking Sapa Rice Terraces Vietnam | Hmong Village Treks | Vietnam Tour",
    "metaDescription": "Trek through Sapa's extraordinary rice terraces with a Black Hmong or Red Dao guide. The landscape carved over centuries into Fansipan's flanks is unlike anything else in Southeast Asia.",
    "heroImage": "/images/things_sapa_trekking.png",
    "heroSubtitle": "Compare the experience, practical arrangements and the right fit for your trip.",
    "category": "TREKKING & HIKING",
    "breadcrumb": "Trekking Sapa",
    "intro": "A Sa Pa walking itinerary should be matched to your fitness, the season and the route conditions. Terraced fields change through the agricultural year; no specific colour or harvest scene can be guaranteed for a travel date. Choose the walking distance, overnight arrangements and guide before deciding which scenery to prioritise.",
    "readingTime": 2,
    "highlights": [
      "Trek through the Muong Hoa Valley — Sapa's most dramatic landscape of terraced rice fields",
      "Walk with a Black Hmong guide through Cat Cat, Ta Van, and Y Linh Ho villages",
      "Visit Ta Phin village, home of the Red Dao community and their extraordinary medicinal herbs",
      "Trek the trail from Sapa town down to Ban Ho — 22km through four distinct ethnic minority villages",
      "Watch the sunrise over Fansipan (3,147m), the highest peak in Indochina, from Sapa ridge",
      "September–October harvest season turns the terraces from green to deep gold"
    ],
    "sections": [
      {
        "heading": "The Muong Hoa Valley: The Route Everyone Should Do",
        "body": "The Muong Hoa area offers village and valley walking options. Routes differ in gradients, surfaces and transport access, so ask for the actual start and finish, distance and expected time on foot.\n\nA private itinerary can be discussed around shorter walks or more demanding routes. Confirm whether there is a vehicle alternative if someone needs to stop, rather than assuming every village path is accessible by road.",
        "image": "/images/things_sapa_trekking.png",
        "imageAlt": "Trekker and Black Hmong guide walking through golden rice terraces in Sapa at sunset",
        "imageCaption": "Travel inspiration for this experience; confirm the specific arrangements in your proposal."
      },
      {
        "heading": "The Harvest Season: September and October are Extraordinary",
        "body": "Northern mountain weather differs from lowland Hanoi. The official Vietnam Tourism climate guide is a useful starting point, but local forecasts and the guide's assessment matter for the walk itself. Rice planting and harvesting are working agricultural activities, not fixed-date attractions.\n\nTake footwear appropriate to the confirmed route and ask how rain affects surfaces, visibility and cancellation decisions. Do not rely on a general claim of clear skies."
      },
      {
        "heading": "Ta Phin Village: The Trek Most Visitors Miss",
        "body": "Visits to villages and homes should be arranged respectfully. Ask who leads the walk, which communities are included and whether any household visit or overnight stay has been agreed.\n\nConfirm the accommodation standard, meals, bathroom arrangements and any dietary or accessibility requirements. Ask before photographing people, and separate a guide's local knowledge from a claim of official heritage status."
      }
    ],
    "practicalInfo": {
      "bestTime": "Check the region, forecast and operator schedule",
      "duration": "Confirm the chosen itinerary",
      "difficulty": "Moderate. Good footwear essential. Some steep descents.",
      "price": "Request a current quote",
      "location": "Sapa, Lao Cai Province, Northern Vietnam"
    },
    "faqs": [
      {
        "question": "What should I confirm before booking this experience?",
        "answer": "Ask for the operator, meeting point, duration, group size, inclusions and cancellation conditions in writing. Confirm any age, mobility or dietary requirements relevant to your group."
      },
      {
        "question": "Can this fit into a private Vietnam itinerary?",
        "answer": "Share your dates and wider route with the travel team. They can discuss whether the activity fits the available time and which transfers or overnight stays the proposal would need."
      },
      {
        "question": "What happens if the planned activity cannot operate?",
        "answer": "Ask which alternatives are available and how changes, refunds or extra costs would be handled. Do not assume that a different activity or extra night is automatically included."
      }
    ],
    "relatedSlugs": [
      "kayaking-halong-bay",
      "cruising-mekong-delta",
      "hoi-an-lantern-festival"
    ],
    "ctaHeading": "Trek Sapa With a Local Hmong Guide",
    "ctaBody": "We arrange private treks with the valley's most experienced local guides, accommodation in a boutique lodge with the view you came for, and the sleeper train from Hanoi that makes the whole journey part of the adventure.",
    "editorial": {
      "sources": [
        {
          "label": "Vietnam Tourism: destination climate guide",
          "url": "https://vietnam.travel/things-to-do/weather-and-climate-vietnam/",
          "accessedAt": "2026-10-28"
        }
      ]
    }
  },
  {
    "slug": "hoi-an-lantern-festival",
    "title": "Hoi An's Full Moon Lantern Festival: The Most Beautiful Night in Vietnam",
    "metaTitle": "Hoi An Full Moon Lantern Festival | When & How to Experience It | Vietnam Tour",
    "metaDescription": "Every 14th day of the lunar month, Hoi An Ancient Town turns off its electric lights and fills with silk lanterns. This is one of the most beautiful nights in all of Vietnam — here's how to experience it properly.",
    "heroImage": "/images/things_hoi_an_lanterns.png",
    "heroSubtitle": "Compare the experience, practical arrangements and the right fit for your trip.",
    "category": "FESTIVALS & CULTURE",
    "breadcrumb": "Hoi An Lantern Festival",
    "intro": "Hoi An has lantern-lit streets as well as events associated with the lunar calendar. These are not interchangeable experiences. If a particular festival matters to your trip, confirm the year-specific date and local programme before arranging hotels or transport around it.",
    "readingTime": 2,
    "highlights": [
      "Every 14th day of the lunar month — typically once per calendar month",
      "Release a floating flower lantern (đèn hoa đăng) on the Thu Bon River for luck",
      "Walk the lamplit streets of the UNESCO World Heritage Ancient Town after dark",
      "Visit the Japanese Covered Bridge — built in 1593 — under lantern glow",
      "Watch traditional music and dance performed on the riverside stage",
      "Browse the night market stalls selling hand-made silk lanterns from local artisans"
    ],
    "sections": [
      {
        "heading": "What Actually Happens on Lantern Night",
        "body": "Plan an evening walk around your interests: architecture, food, crafts or photography. On event nights, crowds, pedestrian arrangements and individual businesses may change. Do not assume a fixed switch-off time or an identical programme every month.\n\nChoose a meeting place with your guide and discuss the walk back to your hotel. Confirm any boat ride separately, including price, duration and safety arrangements.",
        "image": "/images/things_hoi_an_lanterns.png",
        "imageAlt": "Couples walking through Hoi An Ancient Town during the Full Moon Lantern Festival",
        "imageCaption": "Travel inspiration for this experience; confirm the specific arrangements in your proposal."
      },
      {
        "heading": "The History Behind the Light",
        "body": "Hoi An Ancient Town is recognised by UNESCO for its historic trading-port fabric and cultural influences. That recognition applies to the heritage site; it does not authenticate a particular shop, tour or festival package.\n\nThe preserved street plan and buildings can be explored independently of a festival date. Ask which buildings or tickets your guided visit includes, since an evening walk and admission to individual heritage sites are different arrangements."
      },
      {
        "heading": "How to Do the Festival Without the Crowd",
        "body": "Allow flexibility for rain and crowds, and avoid promising an empty old town. If you prefer a quieter visit, discuss alternative walking times rather than relying on a guaranteed crowd-free hour.\n\nFor tailoring, workshops or dining, confirm the supplier and appointment in your proposal. Extra nights can make scheduling easier, but the right length of stay depends on what you want to do."
      }
    ],
    "practicalInfo": {
      "bestTime": "Check the region, forecast and operator schedule",
      "duration": "Confirm the chosen itinerary",
      "difficulty": "Easy walking on flat ancient town streets",
      "price": "Request a current quote",
      "location": "Hoi An Ancient Town, Quang Nam Province, Central Vietnam"
    },
    "faqs": [
      {
        "question": "What should I confirm before booking this experience?",
        "answer": "Ask for the operator, meeting point, duration, group size, inclusions and cancellation conditions in writing. Confirm any age, mobility or dietary requirements relevant to your group."
      },
      {
        "question": "Can this fit into a private Vietnam itinerary?",
        "answer": "Share your dates and wider route with the travel team. They can discuss whether the activity fits the available time and which transfers or overnight stays the proposal would need."
      },
      {
        "question": "What happens if the planned activity cannot operate?",
        "answer": "Ask which alternatives are available and how changes, refunds or extra costs would be handled. Do not assume that a different activity or extra night is automatically included."
      }
    ],
    "relatedSlugs": [
      "vietnamese-cooking-class-hue",
      "watching-water-puppets-hanoi",
      "kayaking-halong-bay"
    ],
    "ctaHeading": "Time Your Visit Around the Lantern Festival",
    "ctaBody": "We align your Hoi An nights with the full moon schedule and arrange a riverside restaurant table with the view that makes the evening — so you can watch the lanterns float past from a proper seat.",
    "editorial": {
      "sources": [
        {
          "label": "UNESCO: Hoi An Ancient Town",
          "url": "https://whc.unesco.org/en/list/948/",
          "accessedAt": "2026-10-28"
        }
      ]
    }
  },
  {
    "slug": "vietnamese-cooking-class-hue",
    "title": "A Cooking Class in Hue: Learning to Cook Imperial Vietnamese Food",
    "metaTitle": "Vietnamese Cooking Class Hue | Imperial Vietnamese Cuisine | Vietnam Tour",
    "metaDescription": "Take a cooking class in Hue and learn the imperial cuisine that was served to Vietnamese emperors for six centuries. The most complex, beautiful, and delicious cooking tradition in Vietnam.",
    "heroImage": "/images/things_cooking_class_hue.png",
    "heroSubtitle": "Compare the experience, practical arrangements and the right fit for your trip.",
    "category": "CULINARY EXPERIENCES",
    "breadcrumb": "Cooking Class Hue",
    "intro": "A Hue cooking class can be built around a market visit, a particular menu or time with a local instructor. Compare the actual class format before booking. A personal story about an unnamed chef is not a substitute for knowing the provider, meeting point, group size and ingredients.",
    "readingTime": 2,
    "highlights": [
      "Learn to prepare bánh khoái (Hue-style sizzling crepes) with local ingredients sourced from Dong Ba market",
      "Master the technique for bún bò Huế — Hue's famous spicy beef noodle soup, more complex than Hanoi's pho",
      "Prepare bánh nậm and bánh lọc — the rice-flour dumplings wrapped in banana leaves unique to Hue's imperial kitchen",
      "Visit Dong Ba Market with your instructor to understand the ingredients before cooking",
      "Cook in a restored traditional kitchen in the Citadel district",
      "Sit down to eat everything you've made for lunch, with local wine"
    ],
    "sections": [
      {
        "heading": "The Market First: Why Hue's Cooking Begins at Dong Ba",
        "body": "If a market visit is important, confirm that it is part of your class rather than an optional add-on. Ask which market is used, how you travel there and what happens if the visit cannot operate.\n\nMarket conditions and produce vary. Tell the instructor about allergies and dietary restrictions in advance, including whether shared utensils or ingredients are a concern. A tour description alone cannot guarantee an allergen-free kitchen.",
        "image": "/images/things_cooking_class_hue.png",
        "imageAlt": "Traveler and Vietnamese grandmother wrapping bánh nậm in banana leaves in a traditional Hue kitchen",
        "imageCaption": "Travel inspiration for this experience; confirm the specific arrangements in your proposal."
      },
      {
        "heading": "The Dish That Will Follow You Home: Bánh Khoái",
        "body": "Choose the dishes you want to learn, then ask how much hands-on preparation is included. Some sessions focus on demonstrations while others divide tasks among participants. Confirm whether the class includes a meal and what drinks or ingredients cost extra.\n\nFor a family group, ask about age limits, supervision around heat and knives, and whether children can prepare an alternative dish."
      },
      {
        "heading": "Why Hue Cooking Is Different from Hanoi or Saigon",
        "body": "Regional food traditions are a useful starting point for choosing a menu, but instructors and households cook differently. Ask the provider what they teach rather than treating one recipe as the only authentic version.\n\nYour proposal should identify the provider, language, duration, transfer arrangements and cancellation terms. No named instructor or private-home access should be promised until confirmed."
      }
    ],
    "practicalInfo": {
      "bestTime": "Check the region, forecast and operator schedule",
      "duration": "Confirm the chosen itinerary",
      "difficulty": "No cooking experience required. Suitable for all abilities.",
      "price": "Request a current quote",
      "location": "Hue City, Thua Thien-Hue Province, Central Vietnam"
    },
    "faqs": [
      {
        "question": "What should I confirm before booking this experience?",
        "answer": "Ask for the operator, meeting point, duration, group size, inclusions and cancellation conditions in writing. Confirm any age, mobility or dietary requirements relevant to your group."
      },
      {
        "question": "Can this fit into a private Vietnam itinerary?",
        "answer": "Share your dates and wider route with the travel team. They can discuss whether the activity fits the available time and which transfers or overnight stays the proposal would need."
      },
      {
        "question": "What happens if the planned activity cannot operate?",
        "answer": "Ask which alternatives are available and how changes, refunds or extra costs would be handled. Do not assume that a different activity or extra night is automatically included."
      }
    ],
    "relatedSlugs": [
      "hoi-an-lantern-festival",
      "watching-water-puppets-hanoi",
      "cruising-mekong-delta"
    ],
    "ctaHeading": "Add Imperial Hue Cooking to Your Itinerary",
    "ctaBody": "We arrange private classes with the best instructors in the Citadel district, including a guided market visit and lunch beside the Perfume River afterwards.",
    "editorial": {
      "sources": [
        {
          "label": "Vietnam Tourism: destination climate guide",
          "url": "https://vietnam.travel/things-to-do/weather-and-climate-vietnam/",
          "accessedAt": "2026-10-28"
        }
      ]
    }
  },
  {
    "slug": "cruising-mekong-delta",
    "title": "The Mekong Delta by Sampan: Vietnam's Other World",
    "metaTitle": "Mekong Delta Sampan Cruise | Floating Markets & Waterways | Vietnam Tour",
    "metaDescription": "The Mekong Delta is a world of water — 22,000km of canals, floating markets, stilted homes, and river life unchanged for centuries. A sampan journey through its back-channels is unlike anything else in Vietnam.",
    "heroImage": "/images/things_mekong_sampan.png",
    "heroSubtitle": "Compare the experience, practical arrangements and the right fit for your trip.",
    "category": "RIVER JOURNEYS",
    "breadcrumb": "Mekong Delta Boat Journey",
    "intro": "A Mekong Delta visit works best when the river activity, starting point and road transfers are planned together. A day trip from Ho Chi Minh City and an overnight stay near Can Tho offer different schedules. Confirm the actual market or canal route instead of assuming every Delta excursion includes the same sights.",
    "readingTime": 2,
    "highlights": [
      "Float through Cai Rang Floating Market — the largest in the Mekong Delta, largest before 8am",
      "Navigate the narrow back-canals of Ben Tre province by traditional wooden sampan",
      "Visit a coconut candy workshop, a rice paper factory, and a honey bee farm on the same morning",
      "Cross the Mekong by local ferry — the way 17 million Delta residents travel every day",
      "Cycle through Vinh Long's fruit orchards and try 30 varieties of tropical fruit with a local family",
      "Stay overnight on a river homestay and eat dinner with the fishing family whose boat is also their home"
    ],
    "sections": [
      {
        "heading": "Cai Rang Floating Market: Early Morning or Nothing",
        "body": "Cai Rang is a floating-market destination associated with Can Tho. Consult current local tourism information and ask your boat operator about trading activity and departure arrangements for your dates. Do not assume an older photograph represents the number of boats you will see.\n\nIf the market is your main reason to visit, compare an overnight in Can Tho with a long road transfer. Ask for a realistic departure and return schedule in your written itinerary.",
        "image": "/images/things_mekong_sampan.png",
        "imageAlt": "Traditional wooden sampan navigating dense jungle waterways in the Mekong Delta, Vietnam",
        "imageCaption": "Travel inspiration for this experience; confirm the specific arrangements in your proposal."
      },
      {
        "heading": "Ben Tre Province: The Back-Canals That Most Visitors Miss",
        "body": "A canal outing, a larger river cruise and a market visit are different products. Ask which waterways, stops and boats are included. Private transport does not by itself guarantee a quiet setting or access to a household.\n\nConfirm boarding conditions, shade, life jackets, toilets and the amount of walking at each stop. This is particularly useful for families and travellers with mobility concerns."
      },
      {
        "heading": "Homestay on the Water: Staying With a River Family",
        "body": "An overnight stay can leave more room for river activities, but confirm the accommodation and household arrangements before booking. Ask about room type, bathroom, meals and how the hosts are involved.\n\nBuild a plan around your interests, with clear inclusions and a weather alternative. Do not rely on a claim that a market, homestay or tour is UNESCO-certified unless the specific designation can be verified."
      }
    ],
    "practicalInfo": {
      "bestTime": "Check the region, forecast and operator schedule",
      "duration": "Confirm the chosen itinerary",
      "difficulty": "Easy. Comfortable seated sampan journeys on flat water.",
      "price": "Request a current quote",
      "location": "Can Tho, Ben Tre, Vinh Long — Mekong Delta, Southern Vietnam"
    },
    "faqs": [
      {
        "question": "What should I confirm before booking this experience?",
        "answer": "Ask for the operator, meeting point, duration, group size, inclusions and cancellation conditions in writing. Confirm any age, mobility or dietary requirements relevant to your group."
      },
      {
        "question": "Can this fit into a private Vietnam itinerary?",
        "answer": "Share your dates and wider route with the travel team. They can discuss whether the activity fits the available time and which transfers or overnight stays the proposal would need."
      },
      {
        "question": "What happens if the planned activity cannot operate?",
        "answer": "Ask which alternatives are available and how changes, refunds or extra costs would be handled. Do not assume that a different activity or extra night is automatically included."
      }
    ],
    "relatedSlugs": [
      "kayaking-halong-bay",
      "vietnamese-cooking-class-hue",
      "trekking-sapa-rice-terraces"
    ],
    "ctaHeading": "Explore the Mekong Delta by Private Sampan",
    "ctaBody": "We arrange private sampan journeys with the best local guides in Ben Tre and Vinh Long, including a night in a carefully vetted river homestay and a dawn visit to Cai Rang floating market.",
    "editorial": {
      "sources": [
        {
          "label": "Can Tho Tourism: Cai Rang Floating Market",
          "url": "https://canthotourism.vn/en/chocairang",
          "accessedAt": "2026-10-28"
        }
      ]
    }
  }
];

// ─── Helper functions ─────────────────────────────────────────────────────────
export function getThingToDo(slug: string): ThingToDoData | undefined {
  return thingsToDoData.find((t) => t.slug === slug);
}

export function getAllThingToDoSlugs(): string[] {
  return thingsToDoData.map((t) => t.slug);
}
