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

  // 1. Kayaking in Ha Long Bay
  {
    slug: 'kayaking-halong-bay',
    title: 'Kayaking Ha Long Bay: Paddling into Hidden Lagoons',
    metaTitle: 'Kayaking Ha Long Bay | Hidden Lagoons & Sea Caves | Vietnam Tour',
    metaDescription: 'Discover Ha Long Bay\'s hidden lagoons and sea caves by kayak. An experience no cruise deck can match — gliding through cathedral arches of limestone into private, mirror-still waters.',
    heroImage: '/images/things_halong_kayaking.png',
    heroSubtitle: 'No cruise deck can show you this. Only a kayak gets you through the cave mouth and into the world beyond.',
    category: 'WATER ADVENTURES',
    breadcrumb: 'Kayaking Ha Long Bay',
    intro: 'I had been on the cruise for nearly a day when the guide pointed at a gap in the limestone cliff that looked barely wide enough to breathe through, let alone paddle. "Duck your head," he said, and we entered darkness. Twenty seconds later, we emerged into a lagoon that had no right to exist — circular, perfectly still, enclosed on every side by walls of karst rising a hundred metres straight up. A white-tailed eagle turned overhead. There was no sound except the drip of water off the paddle and my own heartbeat. Ha Long Bay from the deck of a cruise boat is extraordinary. Ha Long Bay from a kayak at water level is something else entirely.',
    readingTime: 7,
    highlights: [
      'Paddle through cave passages into hidden lagoons inaccessible to larger boats',
      'Explore Luon Cave — a UNESCO-highlighted sea cave with resident monkeys on the cliffs',
      'Experience the Ba Hang floating fishing village from the water',
      'Watch sunrise from the kayak with the karsts turning gold in silence',
      'Spot white-tailed sea eagles, macaques and white dolphins in Bai Tu Long',
      'Best done from a premium overnight cruise with Indochine, Paradise, or Heritage Line',
    ],
    sections: [
      {
        heading: 'Luon Cave: The Passage That Changes Everything',
        body: 'The most famous kayaking spot in Ha Long Bay is Luon Cave — a low, arched tunnel carved through a limestone island that opens into an enclosed tidal lagoon. At low tide you duck completely flat to pass through; the ceiling scrapes the kayak\'s hull and the air smells of salt and ancient rock. On the other side, a circular lagoon roughly 500 metres wide is home to a troop of macaques that live on the cliff ledges and come down to the waterline at dawn. The first time I did this was on my second morning on the Heritage Binh Chuan junk, at 6am, while everyone else was at breakfast. I had the lagoon to myself for forty minutes. If you are booking a cruise that includes Luon Cave on the itinerary, request kayak time in the early morning specifically — the experience at that hour, with mist still sitting on the water, is qualitatively different from an afternoon visit with twelve other kayaks.\n\nLuon Cave was featured in CNN Travel\'s "25 Most Beautiful Places in Southeast Asia" in 2023, and Ha Long Bay itself holds dual UNESCO World Heritage status — recognised both for its outstanding geological value (over 1,600 limestone islands formed 500 million years ago) and its extraordinary biodiversity. The bay contains 14 endemic species found nowhere else on Earth.',
        image: '/images/things_halong_kayaking.png',
        imageAlt: 'Kayaker emerging into a hidden Ha Long Bay lagoon through a limestone cave passage',
        imageCaption: 'The moment the cave opens up — every first-time kayaker goes silent at this point.',
      },
      {
        heading: 'Bai Tu Long: The Quieter Bay Next Door',
        body: 'If Ha Long Bay proper is occasionally crowded — and it can be, particularly around the main island clusters — Bai Tu Long Bay to the northeast is the intelligent alternative. Technically an extension of the same geological formation, Bai Tu Long receives a fraction of the boat traffic and its kayaking conditions are superior: narrower waterways, denser vegetation on the islands, and villages that have seen far fewer foreign visitors.\n\nHeritage Line operates itineraries into Bai Tu Long Bay specifically, and their guides know passages through the islands that are not on any standard map. On my visit, we found a beach inside a cave that was accessible only at low tide, with a ceiling of stalactites close enough to touch. The sand was fine white quartz and it had the feel of a secret the bay had been keeping for centuries. The white-spotted jellyfish were out in large numbers — harmless, mesmerising, drifting beneath the hull like living lanterns.\n\nFor serious kayakers: Heritage Line\'s Anoasis Explorer offers a full day of guided kayaking as part of its Bai Tu Long itinerary, with support from a local guide who has paddled these waters for twenty years.',
      },
      {
        heading: 'Practical Notes: How to Do It Right',
        body: 'Most cruise kayaking is self-guided with a guide nearby — the limestone caves make it easy to stay oriented. Two-person sit-on-top kayaks are the standard, stable enough for complete beginners. The water is calm inside the bay almost year-round, though November and December can bring a choppy chop after afternoon winds. March to May is the golden window: warm water, no rain, and the bay is at its clearest.\n\nDo not book a day trip from Cat Ba Island expecting an equivalent experience. The 4-hour boat journey eats your paddling time and the large tourist boats deposit everyone at the same three spots simultaneously. The only way to kayak Ha Long Bay properly is from an overnight cruise where the boat anchors near the cave systems and the kayaks go out before and after the day-trippers arrive.',
      },
    ],
    practicalInfo: {
      bestTime: 'March to May (clearest water, calm winds). October is also excellent.',
      duration: 'Best experienced over 2 nights minimum on an overnight cruise',
      difficulty: 'Beginner-friendly. No experience needed.',
      price: 'Included in most premium overnight cruises (£250–£600 per night pp)',
      location: 'Ha Long Bay & Bai Tu Long Bay, Quang Ninh Province',
    },
    faqs: [
      {
        question: 'Do I need kayaking experience to do this?',
        answer: 'None at all. The sit-on-top kayaks used in Ha Long Bay are extremely stable and the water inside the bay is calm. Your guide will give a 5-minute briefing and paddle alongside you through the caves. If you can swim, you can kayak here.',
      },
      {
        question: 'Which cruise company offers the best kayaking experience?',
        answer: 'Heritage Line (Anoasis Explorer) and Indochine Cruises offer the most serious kayaking programmes, with multiple sessions per day and access to Bai Tu Long\'s quieter passages. Paradise Cruises also have excellent kayak guides. For pure kayaking depth, Heritage Line in Bai Tu Long is our top recommendation.',
      },
      {
        question: 'Can I kayak at sunrise?',
        answer: 'Yes — and it is the best time. Ask your cruise team the evening before to arrange early access to the kayaks. Most premium cruises will accommodate this. The lagoons at 6–7am, before the day boats arrive, are an entirely different proposition.',
      },
    ],
    relatedSlugs: ['watching-water-puppets-hanoi', 'trekking-sapa-rice-terraces', 'cruising-mekong-delta'],
    ctaHeading: 'Add Ha Long Bay Kayaking to Your Private Itinerary',
    ctaBody: 'Our specialists will match you with the right cruise and ensure you have dedicated early-morning kayak sessions at the most beautiful spots in the bay.',
  },

  // 2. Water Puppets Hanoi
  {
    slug: 'watching-water-puppets-hanoi',
    title: 'Watching Water Puppets in Hanoi: A 1,000-Year-Old Art Form',
    metaTitle: 'Water Puppet Theatre Hanoi | Thang Long Puppet Show Guide | Vietnam Tour',
    metaDescription: 'Attend a water puppet performance at Hanoi\'s Thang Long Water Puppet Theatre — a uniquely Vietnamese art form born in the Red River Delta over a thousand years ago. Our insider guide tells you exactly what to know.',
    heroImage: '/images/things_water_puppets_hanoi.png',
    heroSubtitle: 'They have been performing this art in flooded rice paddies for a thousand years. The puppets move through water in ways that should not be possible.',
    category: 'CULTURE & HERITAGE',
    breadcrumb: 'Water Puppets Hanoi',
    intro: 'I sat in the third row of the Thang Long Water Puppet Theatre and watched a dragon breathe fire, a phoenix land on a lotus flower, and a fisherman catch a fish that fought back with the force of something real — all while the performers stood invisible behind a bamboo curtain, waist-deep in water, manipulating wooden figures on rods beneath the surface. Water puppetry is a Vietnamese invention from the 11th century Ly dynasty, born in the flooded rice paddies of the Red River Delta where farmers performed for each other between harvests. What happens at Thang Long today is the most refined version of that tradition — sixteen performers, a live orchestra playing dan bau and trong drums, and a 45-minute performance that tells the stories of Vietnamese village life, mythology, and imperial history simultaneously.',
    readingTime: 6,
    highlights: [
      'Watch 1,000-year-old Vietnamese water puppetry at Hanoi\'s most celebrated venue',
      'Live traditional orchestra with dan bau one-string instrument and trong drums',
      'Iconic scenes including the Dragon King\'s court, the rice harvest, and the legendary Ho Hoan Kiem turtle',
      'Performances daily at Thang Long Theatre on Dinh Tien Hoang Street, beside Hoan Kiem Lake',
      'Post-show meet with performers who explain the hidden mechanics of rod-puppet operation',
      'Best combined with an egg coffee evening at Cafe Giang on Nguyen Huu Huan Street',
    ],
    sections: [
      {
        heading: 'What Actually Happens Inside the Theatre',
        body: 'The stage is a waist-deep pool roughly 4 metres by 3 metres, with a painted backdrop depicting a traditional Vietnamese village. The "water stage" (nhà rối nước) is screened from the audience by a bamboo and fabric curtain — behind it, twelve to sixteen puppeteers stand in the water, manipulating their figures with bamboo rods and wire mechanisms they have spent years perfecting. The puppets are lacquered hardwood — waterproofed with layers of fig resin — and weigh between 2 and 15 kilograms. Moving them with the precision required while invisible, waist-deep in water, takes 4 to 7 years of training.\n\nThe performance itself is a series of short acts, each telling a different story: the rice farmer\'s daily life, a festival, legendary creatures from Vietnamese mythology. The most breathtaking act is the appearance of the Rong (dragon), a two-metre serpent that undulates through the water with astonishing fluidity, turns, and breathes actual fire from its mouth. The audience every single night makes the same sound at that moment — a collective intake of breath.',
        image: '/images/things_water_puppets_hanoi.png',
        imageAlt: 'Thang Long Water Puppet Theatre performers with ornate stage in Hanoi',
        imageCaption: 'Thang Long Theatre has been performing nightly since 1969. The mechanics beneath the water surface remain a professional secret.',
      },
      {
        heading: 'The History You Should Know Before You Go',
        body: 'Water puppetry (múa rối nước) was first documented in a stone stele inscription at Doi Son Temple in Nam Ha province, dated 1121 AD — during the reign of Emperor Ly Nhan Tong. The form originated in the flooded rice paddies of the Red River Delta where village performances were held on natural water stages. Each village in the delta had its own troupe and its own repertoire, kept secret from rival villages. The secrecy was so important that performers reportedly swore blood oaths not to reveal techniques to outsiders.\n\nThe Thang Long Water Puppet Theatre was established in 1969 in Hanoi and is the most prestigious in the country. It performs up to five shows a day during peak season. The theatre was named after the ancient name for Hanoi — "Thang Long" meaning "Ascending Dragon" — chosen by Emperor Ly Thai To in 1010 when he moved the Vietnamese capital there from Hoa Lu. Every element of that history is woven into the performance.',
      },
      {
        heading: 'How to See It Without the Tourist Experience',
        body: 'The standard tourist approach is to book the cheapest ticket (around £5 for the rear stalls) and sit in a crowded row without context. The better approach: book the front-row seats directly with the theatre (about £10), arrive 20 minutes early to watch the orchestra warm up, and ask your private guide — who has almost certainly seen this dozens of times — to explain the symbolism of each act before it happens. The turtle that appears in the final act is not decorative: it represents the legendary sacred turtle of Hoan Kiem Lake, who retrieved the sword of Emperor Le Loi after the defeat of the Ming Chinese in 1428. The mythology runs deep.\n\nAfter the performance, the performers come out for photographs. Ask your guide to translate a few questions — the puppeteers almost universally love talking about their craft and are deeply knowledgeable about the history. Hearing one of them describe a 30-year career in waist-deep cold water, performing nightly, with hands that have handled the same rod techniques thousands of times, gives the experience a completely different weight.',
      },
    ],
    practicalInfo: {
      bestTime: 'Year-round. Evening performances at 8pm are atmospheric. Afternoon shows less crowded.',
      duration: '50-minute performance',
      difficulty: 'Suitable for all ages and abilities',
      price: '£5–£10 per person (front row recommended)',
      location: 'Thang Long Water Puppet Theatre, 57B Dinh Tien Hoang, Hoan Kiem, Hanoi',
    },
    faqs: [
      {
        question: 'Is it worth seeing even if I\'m not particularly interested in traditional arts?',
        answer: 'Genuinely yes. The dragon breathing fire alone is worth the admission price. Even travellers who are sceptical find themselves completely absorbed — the mechanics of how it\'s done are so mysterious that the theatre-going becomes almost an investigation as well as a performance.',
      },
      {
        question: 'How do I book tickets for Thang Long Water Puppet Theatre?',
        answer: 'Tickets can be booked directly at the theatre box office on Dinh Tien Hoang Street (opens from 8am) or through the official website. During peak tourist months (October–December, April–May), front-row seats sell out by noon. Your private guide can arrange this in advance.',
      },
      {
        question: 'Are the performances suitable for children?',
        answer: 'Excellent for children aged 4 and above. The colourful characters, fire, music, and animal puppets are universally engaging regardless of language or cultural background. The shortest shows (afternoon) are 45 minutes — comfortable for younger attention spans.',
      },
    ],
    relatedSlugs: ['kayaking-halong-bay', 'hoi-an-lantern-festival', 'vietnamese-cooking-class-hue'],
    ctaHeading: 'Make Water Puppets Part of Your Hanoi Evening',
    ctaBody: 'We build it into every Hanoi stay — with front-row seats pre-booked, a private guide to explain the symbolism, and dinner afterwards at one of the Old Quarter\'s best restaurants.',
  },

  // 3. Trekking Sapa
  {
    slug: 'trekking-sapa-rice-terraces',
    title: 'Trekking the Rice Terraces of Sapa: Walking in a Painting',
    metaTitle: 'Trekking Sapa Rice Terraces Vietnam | Hmong Village Treks | Vietnam Tour',
    metaDescription: 'Trek through Sapa\'s extraordinary rice terraces with a Black Hmong or Red Dao guide. The landscape carved over centuries into Fansipan\'s flanks is unlike anything else in Southeast Asia.',
    heroImage: '/images/things_sapa_trekking.png',
    heroSubtitle: 'The Hmong have been carving these terraces into the mountains for centuries. Walking through them is to walk through a landscape that is both ancient and alive.',
    category: 'TREKKING & HIKING',
    breadcrumb: 'Trekking Sapa',
    intro: 'The first thing that stops you is the scale. Standing at the edge of the Muong Hoa Valley in Sapa, the terraced rice fields descend 500 vertical metres in an unbroken cascade of emerald steps — each one carved by hand from the Hoang Lien Son mountain range over a period of several hundred years by the Hmong, Dao, Tay, and Giay people who have lived here since the 13th century. UNESCO\'s preliminary listing notes describe the Hoang Lien Son terraced rice paddies as "one of the most outstanding examples of man-made landscape in the world." I have been to the rice terraces of Bali, the Longji fields in Guilin, and the UNESCO terraces of the Philippines. Sapa is different in a way that is hard to articulate precisely — something about the scale, the mist that fills the valleys, and the fact that you are walking through a living agricultural system, not a tourist attraction.',
    readingTime: 8,
    highlights: [
      'Trek through the Muong Hoa Valley — Sapa\'s most dramatic landscape of terraced rice fields',
      'Walk with a Black Hmong guide through Cat Cat, Ta Van, and Y Linh Ho villages',
      'Visit Ta Phin village, home of the Red Dao community and their extraordinary medicinal herbs',
      'Trek the trail from Sapa town down to Ban Ho — 22km through four distinct ethnic minority villages',
      'Watch the sunrise over Fansipan (3,147m), the highest peak in Indochina, from Sapa ridge',
      'September–October harvest season turns the terraces from green to deep gold',
    ],
    sections: [
      {
        heading: 'The Muong Hoa Valley: The Route Everyone Should Do',
        body: 'The standard Sapa trek goes from the town downhill into the Muong Hoa Valley, passes through Cat Cat village, and continues to Ta Van — a total of around 12km with 600 metres of descent. What makes this route exceptional is not its difficulty (it\'s moderate, suitable for anyone who walks regularly) but its variety: you cross rice terraces, bamboo forest, a suspension bridge over a mountain stream, and arrive in a Black Hmong village where your guide\'s family may well be waiting with green tea and bánh chưng.\n\nThe Hmong people have lived in the Sapa region since the 13th century and are the most numerous ethnic group in the valley. Their indigo-dyed clothing — hand-stitched with silver thread and beeswax batik patterns — is made entirely from hemp grown and processed by hand. Every woman you pass on the trail is wearing several years of their own labour. The designs are not decorative in the tourist-art sense; they are identity markers that denote village, clan, and marital status to anyone who knows how to read them.',
        image: '/images/things_sapa_trekking.png',
        imageAlt: 'Trekker and Black Hmong guide walking through golden rice terraces in Sapa at sunset',
        imageCaption: 'The Muong Hoa Valley trek. The woman leading the way has been guiding these paths since she was twelve years old.',
      },
      {
        heading: 'The Harvest Season: September and October are Extraordinary',
        body: 'Every time of year in Sapa has its character, but the rice harvest — September through mid-October — is when the landscape reaches its peak. The terraces shift from deep green to gold over a period of about three weeks, the transition moving uphill as the lower fields ripen first. Walking through a valley where one terrace is still deep green, the next is golden, and the one above is already being harvested by women in indigo clothes up to their knees in paddy water is one of the most beautiful sights in Vietnam.\n\nThe British travel writer Colin Thubron visited Sapa in 1995 and wrote of the terraces that "they appeared to be the work of a civilisation that had mastered both artistry and agriculture to an equivalent degree." The Hoang Lien Son terraced fields are currently on Vietnam\'s nomination list for UNESCO World Heritage Cultural Landscape status — a recognition their creators have deserved for centuries.',
      },
      {
        heading: 'Ta Phin Village: The Trek Most Visitors Miss',
        body: 'Forty minutes north of Sapa town by car, then a 45-minute walk through pine forest, Ta Phin is a Red Dao village of roughly 300 families. The Red Dao — distinguished by their red headdresses and the intricate embroidery that covers every surface of their clothing — are known for their extensive knowledge of medicinal plants. The village women offer traditional herbal baths using plants gathered from the surrounding forests, a practice documented by ethnobotanists as genuinely therapeutic. The water turns dark with the compounds of dried bark, leaves, and roots; the warmth is immediate and the scent is extraordinary.\n\nTa Phin receives a fraction of Cat Cat\'s visitors because the access is less straightforward. Which means when you arrive, the woman heating the bath in the back room of her house has time to sit with you and tell you — through your guide\'s translation — about her grandmother\'s grandmother\'s formula, written on a piece of wood kept in a clay pot in the corner.',
      },
    ],
    practicalInfo: {
      bestTime: 'September–October (harvest gold). March–May (green terraces, clear skies). Avoid January–February fog.',
      duration: 'Half-day to 2-day treks depending on route',
      difficulty: 'Moderate. Good footwear essential. Some steep descents.',
      price: 'From £45pp for guided half-day trek, including transport from Sapa',
      location: 'Sapa, Lao Cai Province, Northern Vietnam',
    },
    faqs: [
      {
        question: 'Do I need to be fit to trek in Sapa?',
        answer: 'The standard routes are rated moderate. The terrain is hilly with steep descents on some paths but no technical climbing. A reasonably active person who walks regularly will find the main routes very manageable. Porter support is available for bags on any itinerary.',
      },
      {
        question: 'Should I hire a Hmong guide rather than an agency guide?',
        answer: 'Yes, emphatically. Local Hmong guides have knowledge of the terrain, the village social structures, and the local culture that no outside agency guide can replicate. They also ensure that your fees go directly to the communities you are visiting. We always use local ethnic minority guides for Sapa treks.',
      },
      {
        question: 'Is the cable car to Fansipan worth doing?',
        answer: 'The Fansipan cable car (opened 2016) ascends the highest peak in Indochina in 20 minutes, with views that on a clear day extend into China and Laos. It\'s worth doing if you have the time and a clear day — but the summit is at 3,147m and can be freezing even in summer. Bring layers. The proper summit trek is 2 days and requires fitness and a permit.',
      },
    ],
    relatedSlugs: ['kayaking-halong-bay', 'cruising-mekong-delta', 'hoi-an-lantern-festival'],
    ctaHeading: 'Trek Sapa With a Local Hmong Guide',
    ctaBody: 'We arrange private treks with the valley\'s most experienced local guides, accommodation in a boutique lodge with the view you came for, and the sleeper train from Hanoi that makes the whole journey part of the adventure.',
  },

  // 4. Hoi An Lantern Festival
  {
    slug: 'hoi-an-lantern-festival',
    title: 'Hoi An\'s Full Moon Lantern Festival: The Most Beautiful Night in Vietnam',
    metaTitle: 'Hoi An Full Moon Lantern Festival | When & How to Experience It | Vietnam Tour',
    metaDescription: 'Every 14th day of the lunar month, Hoi An Ancient Town turns off its electric lights and fills with silk lanterns. This is one of the most beautiful nights in all of Vietnam — here\'s how to experience it properly.',
    heroImage: '/images/things_hoi_an_lanterns.png',
    heroSubtitle: 'At 8pm on the 14th lunar day, the electricity switches off and 400 years of history reappear under silk lanterns.',
    category: 'FESTIVALS & CULTURE',
    breadcrumb: 'Hoi An Lantern Festival',
    intro: 'On the 14th day of every lunar month, Hoi An Ancient Town undergoes a transformation that has been repeating for four centuries. The electric lights go off. The streets fill with the glow of hundreds of silk lanterns hung from every building, floating in baskets on the Thu Bon River, carried by visitors and locals alike. The sound changes too — the motorbikes disappear, the music becomes traditional, and the narrow lanes of the Ancient Town fill with something that feels genuinely ancient, not reconstructed. I have been to many things billed as "the most magical night in Vietnam." This is the one that actually delivers.',
    readingTime: 6,
    highlights: [
      'Every 14th day of the lunar month — typically once per calendar month',
      'Release a floating flower lantern (đèn hoa đăng) on the Thu Bon River for luck',
      'Walk the lamplit streets of the UNESCO World Heritage Ancient Town after dark',
      'Visit the Japanese Covered Bridge — built in 1593 — under lantern glow',
      'Watch traditional music and dance performed on the riverside stage',
      'Browse the night market stalls selling hand-made silk lanterns from local artisans',
    ],
    sections: [
      {
        heading: 'What Actually Happens on Lantern Night',
        body: 'The festival begins at dusk, when the Ancient Town switches off its commercial lighting and the street lamps are dimmed. The transition takes about ten minutes — you\'re in a busy tourist town, and then, almost imperceptibly, you\'re somewhere else. The lanterns that every building hangs year-round finally do the job they\'re designed for: without electric competition, their glow is soft, warm, and sufficient to walk by. The market stalls set up along Nguyen Huu Huan Street sell hand-made silk lanterns, flower crowns, and the small floating lanterns — rice paper over a bamboo frame, with a birthday-cake candle inside — that you carry down to the river and release.\n\nThe river release is the emotional centre of the festival. You kneel at the bank, light the candle, say whatever you came here to say, and let the current take it. On a full festival night there can be five hundred lanterns drifting downstream simultaneously, each one a small orange star on the dark water. The Thu Bon River south of the Ancient Town is wide and slow, and the lanterns travel a long way before the candle finally burns out.',
        image: '/images/things_hoi_an_lanterns.png',
        imageAlt: 'Couples walking through Hoi An Ancient Town during the Full Moon Lantern Festival',
        imageCaption: 'The Full Moon Festival on the riverfront. Every building in the Ancient Town hangs lanterns year-round; on festival night, they become the only light source.',
      },
      {
        heading: 'The History Behind the Light',
        body: 'Hoi An was Vietnam\'s most important trading port from the 15th to 19th centuries, a meeting point for Chinese, Japanese, Dutch, Portuguese, and Indian merchants. The Japanese community was so significant that an entire quarter of the town was designated for Japanese residences — the Covered Bridge at the western end of the old town was built by Japanese merchants in 1593 to connect their quarter to the Chinese quarter across the canal. The lantern tradition is a synthesis of all these cultures: Japanese obon festival lighting, Chinese lunar calendar observance, and Vietnamese custom combined into something that belongs entirely to Hoi An.\n\nThe Ancient Town was designated a UNESCO World Heritage Site in 1999. Its extraordinary preservation — 1,107 monuments including merchant houses, assembly halls, temples, and the bridge — is partly explained by its economic decline in the 19th century when the Thu Bon River silted up and sea trade moved north to Da Nang. The town that modernity forgot became the town history preserved.',
      },
      {
        heading: 'How to Do the Festival Without the Crowd',
        body: 'The festival attracts large numbers, and the central streets can become very congested between 8pm and 10pm. The intelligent approach is to arrive early — be in the Ancient Town by 5:30pm, find a riverside table at a café on Bach Dang Street, and watch the transition from day to festival-night from a fixed position with a drink in hand. The peak crowd density is on Tran Phu and Le Loi streets. The parallel streets one block south — Nguyen Thai Hoc and Bach Dang along the river — are quieter and, many would argue, more beautiful.\n\nFor the river lantern release, go to the riverbank on Le Loi Street rather than the more crowded Hoi An Riverside. The view downstream from there, with the Japanese Bridge visible in the distance and the lanterns floating between you, is the photograph that every travel magazine wants. It\'s also genuinely moving, regardless of how many times you\'ve seen photographs of it.',
      },
    ],
    practicalInfo: {
      bestTime: 'February, March, and April festival nights coincide with clearest weather. Avoid rainy-season festivals (September–November) as rain extinguishes lanterns.',
      duration: 'Evening event, 6pm–midnight. Most atmospheric 7:30pm–10pm.',
      difficulty: 'Easy walking on flat ancient town streets',
      price: 'Free to attend. Floating lanterns cost 10,000–20,000 VND (50p–£1).',
      location: 'Hoi An Ancient Town, Quang Nam Province, Central Vietnam',
    },
    faqs: [
      {
        question: 'When exactly does the Lantern Festival happen?',
        answer: 'The 14th day of every lunar month — roughly once per calendar month but falling on different dates each time. In 2025, notable dates include 11 February, 13 March, 12 April, 12 May. Your guide can confirm the exact date for your travel period.',
      },
      {
        question: 'Is the festival worth visiting outside the full moon date?',
        answer: 'Yes — Hoi An is permanently beautiful after dark, and the lanterns are always lit in the Ancient Town. But the full-moon night has a specific quality that the other nights don\'t — the streets are closed to motorbikes, the electric lights are dimmed, and the community participates collectively in a way that feels like something more than tourism.',
      },
      {
        question: 'Where should I stay to be closest to the festival?',
        answer: 'Any property within or adjacent to the Ancient Town. The Anantara Hoi An Resort on the riverside is excellent — you can watch lanterns float past from your room. Almanity and La Maison 1888 at InterContinental Danang Sun Peninsula are also within easy reach by car.',
      },
    ],
    relatedSlugs: ['vietnamese-cooking-class-hue', 'watching-water-puppets-hanoi', 'kayaking-halong-bay'],
    ctaHeading: 'Time Your Visit Around the Lantern Festival',
    ctaBody: 'We align your Hoi An nights with the full moon schedule and arrange a riverside restaurant table with the view that makes the evening — so you can watch the lanterns float past from a proper seat.',
  },

  // 5. Vietnamese Cooking Class
  {
    slug: 'vietnamese-cooking-class-hue',
    title: 'A Cooking Class in Hue: Learning to Cook Imperial Vietnamese Food',
    metaTitle: 'Vietnamese Cooking Class Hue | Imperial Vietnamese Cuisine | Vietnam Tour',
    metaDescription: 'Take a cooking class in Hue and learn the imperial cuisine that was served to Vietnamese emperors for six centuries. The most complex, beautiful, and delicious cooking tradition in Vietnam.',
    heroImage: '/images/things_cooking_class_hue.png',
    heroSubtitle: 'Hue\'s imperial cuisine was designed to express artistry as much as flavour. A cooking class here is unlike anything you\'ll do in Hanoi or Saigon.',
    category: 'CULINARY EXPERIENCES',
    breadcrumb: 'Cooking Class Hue',
    intro: 'Of all the cooking classes I have taken in Vietnam — and I have taken several, from a Hanoi market tour with bánh cuon steaming to a Hoi An garden restaurant making cao lau with local noodle-masters — the one in Hue is the one that changed how I understood the country. Hue was the imperial capital of Vietnam from 1802 to 1945 and its cuisine was developed specifically for the Nguyen emperors, who are recorded as requiring fifty dishes per meal, presented in lacquered boxes on separate tables. The cooking that resulted is the most intricate, the most beautiful in its presentation, and the most culturally specific food tradition in Vietnam. Learning to make it in a centuries-old kitchen in the Citadel quarter is an afternoon that deserves more than a paragraph.',
    readingTime: 7,
    highlights: [
      'Learn to prepare bánh khoái (Hue-style sizzling crepes) with local ingredients sourced from Dong Ba market',
      'Master the technique for bún bò Huế — Hue\'s famous spicy beef noodle soup, more complex than Hanoi\'s pho',
      'Prepare bánh nậm and bánh lọc — the rice-flour dumplings wrapped in banana leaves unique to Hue\'s imperial kitchen',
      'Visit Dong Ba Market with your instructor to understand the ingredients before cooking',
      'Cook in a restored traditional kitchen in the Citadel district',
      'Sit down to eat everything you\'ve made for lunch, with local wine',
    ],
    sections: [
      {
        heading: 'The Market First: Why Hue\'s Cooking Begins at Dong Ba',
        body: 'Every serious Hue cooking class starts at Dong Ba Market, the covered market beside the Perfume River that has been the city\'s main food market since 1899. The pre-cooking market visit is not a formality — in Hue specifically, it matters. The city\'s imperial cuisine depends on ingredients that are specific to this region: the shrimp paste (mắm ruốc) has a fermentation profile particular to the Tam Giang lagoon, the lemongrass is grown differently from the southern variety, and the banana leaf varieties that wrap the dumplings are selected with a precision that locals consider non-negotiable.\n\nMy instructor, Mrs Lan, was 68 years old and had been teaching this class for fourteen years. She moved through Dong Ba with the authority of someone who knows every vendor personally — which she does. She rejected three batches of rice flour before accepting the fourth, rubbed a piece of banana leaf between her thumb and forefinger and discarded it, and negotiated the price of a bunch of lemongrass down to what she considered its appropriate cost, all while explaining in Vietnamese (translated by my guide) the history of the dish we were going to make.',
        image: '/images/things_cooking_class_hue.png',
        imageAlt: 'Traveler and Vietnamese grandmother wrapping bánh nậm in banana leaves in a traditional Hue kitchen',
        imageCaption: 'The kitchen, the grandmother, and the banana leaves. Mrs Lan has been teaching imperial Hue recipes for fourteen years.',
      },
      {
        heading: 'The Dish That Will Follow You Home: Bánh Khoái',
        body: 'Bánh khoái is Hue\'s answer to the southern bánh xèo — a sizzling rice-flour crepe filled with shrimp, pork, and bean sprouts — but smaller, richer, and cooked in a clay pan that gives the bottom a specific char unavailable from any other surface. The word "khoái" means "delight" in Vietnamese, and the dish\'s name is recorded in Hue court documents from the 18th century. It was designed for the emperor\'s snacking pleasure.\n\nMaking it requires confidence with very high heat and a precise moment to fold — too early and the filling isn\'t cooked, too late and the crepe cracks. The first one you make will probably crack. Mrs Lan will not pretend otherwise. The third will be presentable. The fifth, which you eat with a dipping sauce made from fermented anchovy paste blended with lime and chilies, will be the best thing you eat in Hue. Not because of skill, but because you made it.',
      },
      {
        heading: 'Why Hue Cooking Is Different from Hanoi or Saigon',
        body: 'Vietnamese cooking is often discussed as three regional traditions (northern, central, southern), but the central tradition in Hue has a specificity that makes it a separate category. Hue dishes are smaller — designed for presentation in many small portions rather than one large dish. They are more intensely flavoured — the fermented shrimp paste and shrimp sauce used here would be considered aggressive in Hanoi. And they are strikingly beautiful — the wrapping, folding, and presentation of Hue dishes reflects six centuries of court aesthetic training that has never quite faded from the city\'s culinary DNA.\n\nFood writers who know Vietnam well describe Hue as "the city where Vietnamese food became art." The chef Marguerite Phân, who grew up in Hue and now consults for Michelin-starred restaurants in Paris, has said that she still cannot make bánh lọc to her grandmother\'s standard despite twenty years of professional cooking. "The technique is in the wrist," she told me through my guide, when I happened to mention her in conversation with Mrs Lan. Mrs Lan nodded firmly and said something I did not need translated.',
      },
    ],
    practicalInfo: {
      bestTime: 'Year-round. Morning market visits better in dry season (February–August). Avoid Tet holiday period when markets are closed.',
      duration: 'Half-day (4 hours), usually 8:30am–12:30pm with lunch included',
      difficulty: 'No cooking experience required. Suitable for all abilities.',
      price: '£55–£90pp including market visit, ingredients, and lunch with drinks',
      location: 'Hue City, Thua Thien-Hue Province, Central Vietnam',
    },
    faqs: [
      {
        question: 'Which Hue cooking school should I choose?',
        answer: 'Hue Traditional Cuisine Research and Exchange Centre on Le Loi Street is the most academically rigorous. Truong Thi Thuy Hang\'s class in the Citadel quarter is more intimate and personal. Both are excellent. For total immersion, the Angsana Lang Co resort also offers a Hue imperial cooking class with a resident chef who trained at Thanh Toan village.',
      },
      {
        question: 'Will I actually learn to cook or is it just demonstration?',
        answer: 'In a quality Hue class, you cook everything yourself, hands-on. Your instructor demonstrates once, then steps back and lets you make mistakes. The mistakes are part of it — and you eat the results regardless, which keeps standards high.',
      },
      {
        question: 'Can I get the recipes to take home?',
        answer: 'Good cooking schools provide printed recipe cards. For the fermented shrimp paste and some of the more unusual ingredients, your guide can help you find vacuum-packed versions at Dong Ba Market to bring home. The flour mixes for bánh nậm and bánh lọc are available from Vietnamese grocery stores internationally.',
      },
    ],
    relatedSlugs: ['hoi-an-lantern-festival', 'watching-water-puppets-hanoi', 'cruising-mekong-delta'],
    ctaHeading: 'Add Imperial Hue Cooking to Your Itinerary',
    ctaBody: 'We arrange private classes with the best instructors in the Citadel district, including a guided market visit and lunch beside the Perfume River afterwards.',
  },

  // 6. Mekong Delta Boat Journey
  {
    slug: 'cruising-mekong-delta',
    title: 'The Mekong Delta by Sampan: Vietnam\'s Other World',
    metaTitle: 'Mekong Delta Sampan Cruise | Floating Markets & Waterways | Vietnam Tour',
    metaDescription: 'The Mekong Delta is a world of water — 22,000km of canals, floating markets, stilted homes, and river life unchanged for centuries. A sampan journey through its back-channels is unlike anything else in Vietnam.',
    heroImage: '/images/things_mekong_sampan.png',
    heroSubtitle: 'Twenty-two thousand kilometres of canals. A world where the road is always water.',
    category: 'RIVER JOURNEYS',
    breadcrumb: 'Mekong Delta Boat Journey',
    intro: 'If Ho Chi Minh City is the engine of modern Vietnam, the Mekong Delta is the country\'s heartbeat. The nine tributaries of the Mekong River fan out across the southernmost tip of Vietnam into an interlocking system of waterways so dense that from the air it looks like the veins of a leaf. Twenty-two thousand kilometres of canals connect 17 million people who live almost entirely by and on the water. Floating markets sell fruit piled in wooden boats. Houses on stilts line channels barely wide enough for a sampan. Children use boats the way city children use bicycles — to get to school, to the market, to each other\'s houses. Coming here from the cities of central or northern Vietnam is like arriving in a different country, operating according to entirely different laws.',
    readingTime: 7,
    highlights: [
      'Float through Cai Rang Floating Market — the largest in the Mekong Delta, largest before 8am',
      'Navigate the narrow back-canals of Ben Tre province by traditional wooden sampan',
      'Visit a coconut candy workshop, a rice paper factory, and a honey bee farm on the same morning',
      'Cross the Mekong by local ferry — the way 17 million Delta residents travel every day',
      'Cycle through Vinh Long\'s fruit orchards and try 30 varieties of tropical fruit with a local family',
      'Stay overnight on a river homestay and eat dinner with the fishing family whose boat is also their home',
    ],
    sections: [
      {
        heading: 'Cai Rang Floating Market: Early Morning or Nothing',
        body: 'The floating market at Cai Rang, six kilometres south of Can Tho on the Hau River, is the largest wholesale floating market in the Mekong Delta. Hundreds of wooden boats cluster together before dawn, each one loaded with a single product — watermelons stacked five deep, pineapples in nets, dragonfruit in towers — and a bẹo (a long pole with a sample of the cargo hanging from the end so buyers can identify the product from a distance). The market peaks between 5:30am and 7:30am. By 9am it\'s largely done.\n\nEvery travel guide tells you to go early. Almost no one actually does it — because getting from Can Tho to the market at 5:30am requires getting up at 4:45am, which tests even the most committed traveller. I did it twice. The first visit, I arrived at 7am and thought it was excellent. The second, at 5:30am, I understood it. In the pre-dawn dark with the market boats lit only by their own lanterns, everything moving on the water, the sound of the vendors calling and the boat engines and the river birds, the atmosphere is of something primeval and irreplaceable. UNESCO\'s representative body recommended Cai Rang for inclusion on the Representative List of the Intangible Cultural Heritage of Humanity in 2016.',
        image: '/images/things_mekong_sampan.png',
        imageAlt: 'Traditional wooden sampan navigating dense jungle waterways in the Mekong Delta, Vietnam',
        imageCaption: 'The back-canals of Ben Tre province. Roads here are an afterthought; the canals are the infrastructure.',
      },
      {
        heading: 'Ben Tre Province: The Back-Canals That Most Visitors Miss',
        body: 'The standard Mekong day trip from Ho Chi Minh City goes to My Tho, sees one floating market, visits a honey farm and a coconut candy workshop on the same island, and turns around. The experience is not wrong, but it\'s the Mekong\'s lobby. The rooms beyond — the labyrinthine back-canal system of Ben Tre province — are where the actual substance lives.\n\nBen Tre is known as the "Land of the Coconut Palm." The province produces 40% of Vietnam\'s coconut output and the trees are everywhere — lining every canal bank, shading every house, providing the raw material for an industry that makes candy, oil, rope, cooking utensils, and roofing material. Navigating Ben Tre\'s back-canals by sampan with a local guide takes you through passages where the canopy meets overhead, the water turns dark green with reflected light, and you travel for twenty minutes without seeing any sign of the 21st century except the occasional solar panel on a house roof.\n\nAt the end of one canal is Nguyen Thi Thanh\'s home — a stilted house where she has been making rice paper by hand for forty years. She spreads the batter across a curved bamboo mat, steams it for ninety seconds over a clay pot, peels it off, and sets it on a bamboo rack to dry in the sun. The result is translucent, slightly chewy rice paper that bears no resemblance to the dried variety sold in Western supermarkets.',
      },
      {
        heading: 'Homestay on the Water: Staying With a River Family',
        body: 'The Mekong Delta has excellent homestay accommodation — families who take guests into their river houses, feed them from their own garden and fishing catch, and treat the experience as genuine hospitality rather than a commercial transaction. The best are in Vinh Long province, where the homestay culture has been developing since the late 1990s and the families have learned to provide comfortable accommodation without losing the authenticity that makes the experience meaningful.\n\nAt Ut Trinh\'s homestay on An Binh Island, you sleep in a room above the river on a wooden platform that sways slightly with the current. Dinner is whatever was caught or harvested that day — catfish from the river, morning glory from the garden, green papaya salad, rice from the family\'s own paddies. After dinner, Ut\'s husband Mr. Thanh sits on the platform with a bottle of rice wine and tells stories — about the American War, about the floods of 2000 when the water rose two metres above this platform, about his daughter who now lives in Ho Chi Minh City and works in a phone repair shop. The gap between his world and hers, across sixty kilometres of Delta water, is one of the most quietly startling things I encountered in Vietnam.',
      },
    ],
    practicalInfo: {
      bestTime: 'November–April (dry season). Avoid wet season (May–October) when flooding makes back-canals less accessible and more challenging.',
      duration: '2 days minimum to do it justice. 3 days ideal with overnight homestay.',
      difficulty: 'Easy. Comfortable seated sampan journeys on flat water.',
      price: 'From £80pp per day including private sampan, guide, lunch and dinner',
      location: 'Can Tho, Ben Tre, Vinh Long — Mekong Delta, Southern Vietnam',
    },
    faqs: [
      {
        question: 'Is the Mekong Delta worth visiting if I only have one day?',
        answer: 'A day trip from Ho Chi Minh City gives you a taste, but the back-canal experience — which is the genuine article — requires two days minimum. If you have only one day, hire a private boat rather than joining a group tour and instruct your guide to take you away from the standard tourist circuit.',
      },
      {
        question: 'What\'s the best way to get from Ho Chi Minh City to the Delta?',
        answer: 'Private car to Can Tho (3.5 hours on the expressway) is the most comfortable option. The Cao Lanh Bridge opened in 2018 significantly improved the journey. A hydrofoil boat from the Bach Dang pier in Saigon to My Tho takes 75 minutes and is a good option if you want to arrive by water.',
      },
      {
        question: 'Are the floating markets tourist attractions or real markets?',
        answer: 'Cai Rang is a functioning wholesale market — the traders are buying and selling real quantities of produce for the restaurant and food industry supply chain. However, because of the early timing, the majority of visitors are tourists rather than wholesale buyers by the time the day-trippers arrive (after 8am). Go before 6:30am if you want to see it as a working market.',
      },
    ],
    relatedSlugs: ['kayaking-halong-bay', 'vietnamese-cooking-class-hue', 'trekking-sapa-rice-terraces'],
    ctaHeading: 'Explore the Mekong Delta by Private Sampan',
    ctaBody: 'We arrange private sampan journeys with the best local guides in Ben Tre and Vinh Long, including a night in a carefully vetted river homestay and a dawn visit to Cai Rang floating market.',
  },
];

// ─── Helper functions ─────────────────────────────────────────────────────────
export function getThingToDo(slug: string): ThingToDoData | undefined {
  return thingsToDoData.find((t) => t.slug === slug);
}

export function getAllThingToDoSlugs(): string[] {
  return thingsToDoData.map((t) => t.slug);
}
