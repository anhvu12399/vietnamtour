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
    "heroImage": "/images/unsplash/halong.jpg",
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
        "image": "/images/unsplash/halong.jpg",
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
    "heroImage": "/images/unsplash/hanoi.jpg",
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
        "image": "/images/unsplash/hanoi.jpg",
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
    "heroImage": "/images/unsplash/sapa.jpg",
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
        "image": "/images/unsplash/sapa.jpg",
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
    "heroImage": "/images/unsplash/hoian.jpg",
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
        "image": "/images/unsplash/hoian.jpg",
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
    "heroImage": "/images/unsplash/food.jpg",
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
        "image": "/images/unsplash/food.jpg",
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
    "heroImage": "/images/unsplash/mekong.jpg",
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
        "image": "/images/unsplash/mekong.jpg",
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
  },
  {
    slug: 'boat-ride-trang-an-ninh-binh',
    title: 'Take a Boat Ride Through Trang An, Ninh Binh',
    metaTitle: 'Trang An Boat Ride Guide | Ninh Binh, Vietnam',
    metaDescription: 'Plan a visit to Trang An Landscape Complex in Ninh Binh. Learn what the UNESCO site includes and what to confirm about boat routes, timing and conditions.',
    heroImage: '/images/unsplash/trang-an-boats.jpg',
    heroSubtitle: 'A source-led guide to the landscape, boat visit and practical checks.',
    category: 'NATURE & HERITAGE',
    breadcrumb: 'Trang An Boat Ride',
    intro: 'Trang An Landscape Complex is a UNESCO World Heritage property in Ninh Binh, known for limestone karsts, valleys and waterways. A boat trip is a common way to see parts of the complex, but the route, duration, stops and operating conditions should be checked locally before travel. This guide uses UNESCO and Vietnam Tourism references and does not claim a first-hand visit.',
    readingTime: 3,
    highlights: [
      'See part of the UNESCO-listed landscape from its waterways',
      'Compare the available boat routes and stops before choosing',
      'Combine the visit with other Ninh Binh sights only after checking travel time',
    ],
    sections: [
      {
        heading: 'What the Trang An landscape includes',
        body: 'UNESCO describes Trang An as a landscape of limestone karst peaks, valleys and waterways, with cultural and archaeological elements in the wider property. The designation applies to the protected heritage property; it is not an endorsement of a particular tour operator or service.\n\nUse the official site information to understand the heritage context, then confirm the current visitor arrangements through local authorities or your accommodation.',
        image: '/images/unsplash/trang-an-boats.jpg',
        imageAlt: 'Boats on a waterway beneath limestone karsts in Trang An, Ninh Binh',
        imageCaption: 'Destination photograph; boat routes and conditions vary.',
      },
      {
        heading: 'Choose a route around your group',
        body: 'Ask at the official ticket point which routes are operating, how long each takes, what stops are included and whether visitors share a boat. Confirm child, mobility and safety arrangements before paying. Bring sun protection and drinking water, and follow instructions from the local boat team.',
      },
      {
        heading: 'Plan time for Ninh Binh',
        body: 'Trang An is one of several sites in Ninh Binh. Distances and transfer times can be longer than they appear on a map, so avoid combining multiple timed activities without checking the day’s schedule. Weather and water conditions may affect operations; keep onward transport flexible.',
      },
    ],
    practicalInfo: {
      bestTime: 'Check local weather and operating conditions for your dates',
      duration: 'Confirm current route duration and stops locally',
      difficulty: 'Seated boat trip; check boarding and mobility access',
      price: 'Check current ticket and boat charges with the official visitor service',
      location: 'Trang An Landscape Complex, Ninh Binh Province',
    },
    faqs: [
      { question: 'How long is the Trang An boat trip?', answer: 'Routes and durations can vary. Confirm the currently operating route and expected duration at the official ticket point on the day.' },
      { question: 'Does UNESCO operate the boats?', answer: 'No. UNESCO recognises and describes the heritage property; local authorities and service operators manage visitor arrangements.' },
      { question: 'Can the boat visit be combined with other sights?', answer: 'It may be possible, but check route duration, local transfers, opening arrangements and your group’s pace before scheduling additional stops.' },
    ],
    relatedSlugs: ['trekking-sapa-rice-terraces', 'kayaking-halong-bay', 'cruising-mekong-delta'],
    ctaHeading: 'Plan a Ninh Binh Day That Fits Your Route',
    ctaBody: 'Share your dates and preferred pace to discuss transfers and time for the sites you want to visit.',
    editorial: {
      lastReviewedAt: '2026-11-01',
      sources: [
        { label: 'UNESCO World Heritage Centre: Trang An Landscape Complex', url: 'https://whc.unesco.org/en/list/1438/', accessedAt: '2026-11-01' },
        { label: 'Vietnam Tourism: heritage sites in Vietnam', url: 'https://vietnam.travel/things-to-do/5-must-see-heritage-sites-vietnam/', accessedAt: '2026-11-01' },
      ],
    },
  },
  {
    slug: 'visit-hue-imperial-city',
    title: 'Explore the Imperial City of Hue',
    metaTitle: 'Hue Imperial City Guide | History and Visit Planning',
    metaDescription: 'Plan time at Hue’s Imperial City with historical context from UNESCO and practical advice to confirm current access, opening arrangements and restoration work.',
    heroImage: '/images/commons/hue-1.jpg',
    heroSubtitle: 'Understand the heritage site and check current visitor access before you go.',
    category: 'CULTURE & HERITAGE',
    breadcrumb: 'Hue Imperial City',
    intro: 'Hue’s Imperial City forms part of the Complex of Hue Monuments, recognised by UNESCO as a World Heritage property. The walled complex was central to the Nguyen dynasty’s capital from 1802 to 1945. Restoration, weather and site management can affect access to individual buildings, so check local notices and ticket arrangements close to your visit.',
    readingTime: 3,
    highlights: [
      'Explore the former imperial capital within the wider Hue heritage complex',
      'Use UNESCO’s site description to understand how the capital was planned',
      'Allow time for walking and check access to buildings ahead of arrival',
    ],
    sections: [
      {
        heading: 'A planned capital of the Nguyen dynasty',
        body: 'UNESCO describes Hue as the political, cultural and religious centre of the Nguyen dynasty from 1802 to 1945. The wider monument complex includes the Citadel, Imperial City, Forbidden Purple City and associated monuments. The heritage designation covers a much larger area than one palace or gate.\n\nFor historical context, consult the UNESCO record or the Hue Monuments Conservation Centre’s current visitor information.',
        image: '/images/commons/hue-1.jpg',
        imageAlt: 'Historic gate and courtyard at the Hue Imperial City complex',
        imageCaption: 'Hue heritage-site photograph; individual buildings may have access restrictions.',
      },
      {
        heading: 'Make a realistic visit plan',
        body: 'The complex is extensive and some surfaces may be uneven or exposed to sun and rain. Wear comfortable footwear, carry water and check accessibility needs in advance. If a particular hall or exhibition matters to you, verify that it is open on your date rather than assuming every structure is accessible.',
      },
      {
        heading: 'Respect conservation work and local rules',
        body: 'UNESCO notes ongoing conservation and restoration work across the monuments. Follow posted boundaries, photography rules and staff directions, and expect routes to change while work is underway. A local guide can add context; check what language, duration and sites are included before arranging one.',
      },
    ],
    practicalInfo: {
      bestTime: 'Check forecast, opening notices and restoration access before visiting',
      duration: 'Allow several hours; tailor this to the areas open and your pace',
      difficulty: 'Walking on a large historic site; check step-free access directly',
      price: 'Check current admission and ticket conditions with the local authority',
      location: 'Imperial City, Hue, central Vietnam',
    },
    faqs: [
      { question: 'Is the Imperial City a UNESCO World Heritage Site?', answer: 'It is part of the Complex of Hue Monuments, which UNESCO inscribed on the World Heritage List in 1993.' },
      { question: 'How much time should I allow?', answer: 'Allow several hours for a measured visit, then adjust for current access, weather, mobility needs and whether you are visiting with a guide.' },
      { question: 'Are all buildings open to visitors?', answer: 'Access can change due to conservation and local operations. Check current notices with the Hue Monuments Conservation Centre before your visit.' },
    ],
    relatedSlugs: ['watching-water-puppets-hanoi', 'vietnamese-cooking-class-hue', 'boat-ride-trang-an-ninh-binh'],
    ctaHeading: 'Add Hue’s Heritage Sites to Your Route',
    ctaBody: 'Discuss how much time to set aside for Hue and which heritage sites suit your group.',
    editorial: {
      lastReviewedAt: '2026-11-01',
      sources: [
        { label: 'UNESCO World Heritage Centre: Complex of Hue Monuments', url: 'https://whc.unesco.org/en/list/678/', accessedAt: '2026-11-01' },
        { label: 'Vietnam Tourism: Hue destination guide', url: 'https://vietnam.travel/places-to-go/north-central-coast/hue', accessedAt: '2026-11-01' },
      ],
    },
  },
  {
    slug: 'explore-phong-nha-caves',
    title: 'Explore the Caves of Phong Nha',
    metaTitle: 'Phong Nha Caves Guide | Routes, Seasons and Safety',
    metaDescription: 'Compare cave visits in Phong Nha and check season, route, operator and safety details using Vietnam Tourism and UNESCO references.',
    heroImage: '/images/unsplash/cave.jpg',
    heroSubtitle: 'Choose a cave visit that matches your time, mobility and comfort outdoors.',
    category: 'NATURE & ADVENTURE',
    breadcrumb: 'Phong Nha Caves',
    intro: 'Phong Nha is a gateway to the caves and karst landscapes of Phong Nha–Ke Bang National Park, a UNESCO World Heritage property. The area offers different levels of cave visits, from a short boat-access visit to longer guided trips. Seasonal weather, flood risk, physical demands and operator rules matter; verify the current conditions before booking.',
    readingTime: 3,
    highlights: [
      'Compare short cave visits with longer guided excursions',
      'Check seasonal weather and water conditions before travelling',
      'Match the route to fitness, mobility, age requirements and equipment',
    ],
    sections: [
      {
        heading: 'Different caves suit different plans',
        body: 'Vietnam Tourism describes Phong Nha Cave as accessible by boat from the town, while other caves involve walking, climbing or guided outdoor activities. These are separate experiences with different durations and requirements. Confirm the route, transport, equipment, group size and included safety briefing with the actual operator.\n\nThe national park’s World Heritage status recognises its natural values; it does not certify any specific tour company.',
        image: '/images/unsplash/cave.jpg',
        imageAlt: 'Limestone cave interior in the Phong Nha region',
        imageCaption: 'Destination photograph; cave routes and access vary by operator and conditions.',
      },
      {
        heading: 'Check the season and current conditions',
        body: 'Vietnam Tourism notes that the region has a tropical monsoon climate, with a rainy season that can affect access. Check local weather and operator notices close to departure, especially for water-based cave visits. Do not rely on an old timetable or price in a guide: operating arrangements can change.',
      },
      {
        heading: 'Book a trip with clear safety information',
        body: 'For any guided excursion, ask about the route, duration, required fitness, age limits, equipment, guide qualifications, emergency procedures and cancellation policy. Tell the operator about relevant medical or mobility needs in advance. Follow the guide’s instructions and do not enter restricted areas independently.',
      },
    ],
    practicalInfo: {
      bestTime: 'Check seasonal weather and the operator’s current access notices',
      duration: 'From a short visit to multi-day expeditions; confirm the chosen route',
      difficulty: 'Varies by cave and trip; ask the operator for specific requirements',
      price: 'Request current rates directly from the named operator',
      location: 'Phong Nha–Ke Bang National Park, Quang Binh Province',
    },
    faqs: [
      { question: 'Is every Phong Nha cave visit a strenuous expedition?', answer: 'No. The area includes different visit types. Confirm the transport, walking, climbing and swimming involved in your specific itinerary.' },
      { question: 'When is cave access affected by weather?', answer: 'The rainy season can affect access and water activities. Check current conditions and the operator’s cancellation or alternative arrangements close to travel.' },
      { question: 'Can I visit caves without a guide?', answer: 'Some visitor areas have managed access, while expeditions require an authorised operator. Follow park rules and confirm requirements for your chosen cave.' },
    ],
    relatedSlugs: ['kayaking-halong-bay', 'boat-ride-trang-an-ninh-binh', 'trekking-sapa-rice-terraces'],
    ctaHeading: 'Find the Right Phong Nha Cave Visit',
    ctaBody: 'Share your dates, comfort level and available time to discuss suitable cave options and transfers.',
    editorial: {
      lastReviewedAt: '2026-11-01',
      sources: [
        { label: 'Vietnam Tourism: Phong Nha destination guide', url: 'https://vietnam.travel/place-to-go/north-central-coast/phong-nha/', accessedAt: '2026-11-01' },
        { label: 'UNESCO World Heritage Centre: Phong Nha-Ke Bang National Park', url: 'https://whc.unesco.org/en/list/951/', accessedAt: '2026-11-01' },
      ],
    },
  }
];

// ─── Helper functions ─────────────────────────────────────────────────────────
export function getThingToDo(slug: string): ThingToDoData | undefined {
  return thingsToDoData.find((t) => t.slug === slug);
}

export function getAllThingToDoSlugs(): string[] {
  return thingsToDoData.map((t) => t.slug);
}
