import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const writeToken = process.env.SANITY_WRITE_TOKEN;

if (!writeToken) {
  console.error('ERROR: SANITY_WRITE_TOKEN is not set.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-17',
  token: writeToken,
  useCdn: false,
});

// Helper to build PortableText block
function textBlock(text: string, style: string = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
  };
}

function heading(text: string, level: 'h2' | 'h3' = 'h2') {
  return textBlock(text, level);
}

const posts = [
  // ── 1. Two-Week Vietnam Itinerary ─────────────────────────────────────────
  {
    _id: 'post-2-week-vietnam-itinerary',
    _type: 'post',
    title: '2 Weeks in Vietnam: The Definitive Private Tour Itinerary (2025)',
    slug: { _type: 'slug', current: '2-week-vietnam-itinerary-private-tour' },
    publishedAt: '2025-03-12T09:00:00.000Z',
    excerpt: 'I spent two unforgettable weeks travelling Vietnam from Hanoi to Ho Chi Minh City with a private guide. Here is every destination, every hotel, and the exact route that worked brilliantly — so you can replicate it or tweak it to your tastes.',
    content: [
      textBlock('Two weeks is the sweet spot for Vietnam. Long enough to breathe — to linger over a bowl of bun cha in Hanoi\'s Old Quarter, to watch a slow sunrise burn the mist off Halong Bay, to get utterly lost in the lantern-lit streets of Hoi An at night. Short enough that you never feel rushed, because with a private driver and pre-arranged transfers, every transition is frictionless.', 'normal'),
      heading('Day 1–3: Hanoi — Slow Down and Absorb'),
      textBlock('Land at Noi Bai, transfer to the Sofitel Legend Metropole. Do not underestimate Hanoi. Most travellers rush through it, which is a genuine mistake. The Old Quarter\'s 36 guild streets demand at least an afternoon of aimless wandering. On day two, hire a private xe ôm (motorbike taxi) and have your guide take you behind the obvious sights: the flower villages of Nghi Tam, the temple of Quan Thanh at dusk, the local market on Hang Be. On day three, visit the Hoa Lo Prison (Hanoi Hilton) in the morning — it is sobering and essential — then spend the afternoon on a private cooking class in a heritage shophouse.', 'normal'),
      heading('Day 4–6: Halong Bay — Two Nights on a Luxury Junk'),
      textBlock('Transfer to Tuan Chau port (3 hours with a private car, not a group bus) and board the Heritage Line Jasmine. Two nights on the bay is not a luxury — it is a necessity. On day one, you kayak to hidden lagoons, swim in emerald water, and visit a floating fishing village that has existed in essentially the same form for 500 years. On day two, your captain takes you to Lan Ha Bay — quieter, equally beautiful, fewer boats. Sunrise on the sun deck with coffee is a memory you will keep for life.', 'normal'),
      heading('Day 7–8: Hue — Imperial Grandeur on the Perfume River'),
      textBlock('Fly from Hanoi to Da Nang (45 minutes), transfer to Hue (1.5 hours along one of Asia\'s great coastal roads). The Azerai La Residence sits right on the Perfume River; your room looks directly at the illuminated Truong Tien Bridge at night. Day eight is for the Citadel and the Royal Tombs — hire a private cyclo to reach Minh Mang\'s tomb at Tu Duc. Finish with dinner at Madame Tuyen\'s, a family home that has been serving imperial cuisine for three generations. The lotus seed dessert is extraordinary.', 'normal'),
      heading('Day 9–11: Hoi An — The Town That Time Forgot'),
      textBlock('The 30-minute drive from Da Nang to Hoi An crosses the Hai Van Pass — ask your driver to stop at the top. The view down both coasts simultaneously is breath-taking. Hoi An\'s Ancient Town is compact but extraordinary: the Japanese Covered Bridge, the Chinese Assembly Halls, the merchant houses frozen in the 1700s. On day ten, escape the crowds on a bicycle ride through the paddy fields to Tra Que vegetable village, then take a private boat to Cham Island for snorkelling.', 'normal'),
      heading('Day 12–14: Ho Chi Minh City — Energy, History, and Great Food'),
      textBlock('Fly south and check in to the Park Hyatt Saigon. The city rewards curiosity: the War Remnants Museum is confronting but vital, the Reunification Palace is a perfectly preserved time capsule of 1975, and the Ben Thanh market neighbourhood has been remade into a genuinely excellent dining and cocktail scene. On the final day, take a private boat along the Mekong Delta from My Tho — floating markets, bamboo bridges, coconut candy workshops — before your evening flight home.', 'normal'),
      textBlock('Total distance covered: approximately 2,800 km, all by private car, domestic flight, and luxury junk. Zero uncomfortable group tours. Every moment designed around your schedule.', 'normal'),
    ],
    ctaLabel: 'Design Your Vietnam Journey',
    ctaHeading: 'Let Us Build Your Perfect Two Weeks',
    ctaDescription: 'Every detail above can be adjusted — more time in Hoi An, a different cruise line, a Sapa extension. Speak to Alice Mercer to tailor it precisely.',
  },

  // ── 2. First Time in Vietnam ─────────────────────────────────────────────
  {
    _id: 'post-first-time-vietnam-guide',
    _type: 'post',
    title: 'First Time in Vietnam: Everything You Need to Know Before You Go',
    slug: { _type: 'slug', current: 'first-time-visiting-vietnam-guide' },
    publishedAt: '2025-04-05T09:00:00.000Z',
    excerpt: 'Vietnam rewards those who arrive prepared. After years of taking travellers here for the first time, I have distilled the essential knowledge into one guide — visas, money, health, etiquette, and the one mistake every first-timer makes.',
    content: [
      textBlock('Vietnam is not a complicated destination, but it is a layered one. The customs are distinct, the traffic is genuinely chaotic, and the food varies dramatically between north and south. None of this is a problem if you understand it before you land. Here is what I tell every client who is visiting for the first time.', 'normal'),
      heading('Visas: Simpler Than You Think'),
      textBlock('UK citizens can obtain an e-Visa online (evisa.gov.vn) for stays up to 90 days. Apply at least 3 working days before travel; approval usually comes within 24 hours. Cost: US$25. Save the approval letter and print it — some immigration officers still want a hard copy. If you are connecting through Bangkok or Singapore on the way, you may need that country\'s transit requirements too.', 'normal'),
      heading('Health: What the Doctor Actually Needs to Tell You'),
      textBlock('No vaccinations are legally required for entry from the UK, but the NHS recommends Hepatitis A, Typhoid, and an up-to-date Tetanus. Malaria risk exists in some rural areas (not in cities or Halong Bay) — your GP will advise based on your specific itinerary. Travel insurance is non-negotiable. Carry a small medical kit: antihistamine, rehydration salts, and stomach remedies are your most likely needs.', 'normal'),
      heading('Money: Dong, Cards, and the ATM Game'),
      textBlock('The Vietnamese Dong (VND) is the official currency. Rates are roughly 30,000 VND to £1. ATMs are everywhere in cities (Vietcombank and BIDV have the most reliable machines) and most charge a small fee per transaction. Major hotels, restaurants, and shops accept cards; markets and street food stalls are cash only. Do not bother with Vietnamese currency before you leave the UK — the rates are poor. Withdraw at the airport or your hotel on arrival.', 'normal'),
      heading('The One Mistake Every First-Timer Makes'),
      textBlock('Trying to do too much. I have seen it a hundred times: an ambitious itinerary that strings together Hanoi, Ninh Binh, Sapa, Halong Bay, Da Nang, Hoi An, Hue, and Ho Chi Minh City in 12 days. The result is exhaustion, not experience. Pick your moments. Two or three regions, done slowly, will give you infinitely more than seven regions done frantically. This is exactly why we recommend building your itinerary with a specialist before you book flights.', 'normal'),
      heading('Etiquette: Small Details, Big Impact'),
      textBlock('Remove your shoes at temple entrances and when entering a Vietnamese home. Dress modestly at religious sites (shoulders and knees covered). Avoid pointing your feet at people or at altars. When eating, pass food with both hands and avoid sticking chopsticks upright in a bowl of rice (it resembles incense at a funeral). These are not rigid rules — Vietnamese people are extraordinarily warm and forgiving — but small gestures of respect are always appreciated.', 'normal'),
      textBlock('One last thing: the food. Do not be timid. The bun bo Hue in Hue, the cao lau in Hoi An, the banh mi in Da Nang, the pho at Pho Thin on Dinh Tien Hoang in Hanoi — these are not just meals. They are the whole point.', 'normal'),
    ],
    ctaLabel: 'Ready to Plan Your First Vietnam Trip?',
    ctaHeading: 'Start With a Free Specialist Consultation',
    ctaDescription: 'Our Vietnam specialists have helped hundreds of first-time travellers design journeys that genuinely exceed expectations. No obligation, just expert advice.',
  },

  // ── 3. Halong Bay ─────────────────────────────────────────────────────────
  {
    _id: 'post-halong-bay-guide',
    _type: 'post',
    title: 'Halong Bay vs Lan Ha Bay: Which Should You Choose (and Why Not Both)?',
    slug: { _type: 'slug', current: 'halong-bay-vs-lan-ha-bay-guide' },
    publishedAt: '2025-02-18T09:00:00.000Z',
    excerpt: 'I have slept on a junk in both Halong Bay and Lan Ha Bay. They are 20 kilometres apart and worlds different in character. Here is the honest comparison — including the version that gives you the best of both in a single voyage.',
    content: [
      textBlock('Halong Bay is one of the great travel clichés of Southeast Asia — and clichés exist for good reason. The UNESCO World Heritage Site\'s 1,969 limestone karsts rising from jade-green water is genuinely one of the most extraordinary landscapes on earth. But it is also genuinely crowded. On peak season mornings, dozens of cruise boats jostle for the same sunrise photograph at the same iconic viewpoints.', 'normal'),
      textBlock('Lan Ha Bay is the answer. Part of the same geological formation, lying just south of Halong\'s boundary, it sits within Cat Ba National Park. The scenery is equally dramatic — arguably more so in places, with wilder, less manicured shorelines — but the boat traffic is perhaps a tenth of Halong\'s. You can anchor in a calm lagoon and not see another vessel for hours.', 'normal'),
      heading('The Case for Halong Bay'),
      textBlock('Halong\'s infrastructure is more developed, which means a wider choice of high-quality junk boats. The Heritage Line, Indochine Sail, and L\'Azalée represent the pinnacle of the cruise experience: beautifully designed vessels with excellent kitchens, attentive service, and well-planned excursion programmes. The iconic viewpoints — Fighting Cocks Islets, Surprising Cave, the floating fishing village of Cua Van — are iconic for a reason. First-time visitors, or those visiting with family members who prioritise comfort over adventure, will likely prefer the Halong experience.', 'normal'),
      heading('The Case for Lan Ha Bay'),
      textBlock('Lan Ha is for travellers who want genuine discovery. The kayaking routes through hidden lagoons are more varied and less trafficked. The swimming is better — cleaner water, fewer boats, more privacy. The Cat Ba Island harbour town, while not especially pretty, has an authentic fishing community energy that Halong\'s tourist-facing port towns have largely lost. If you are a second-time visitor, or if you prioritise solitude and nature over comfort and convenience, Lan Ha is the correct choice.', 'normal'),
      heading('The Best Answer: Two Nights Covering Both'),
      textBlock('The finest itinerary combines both bays in a single cruise: depart Tuan Chau port (Halong), spend the first day and night in Halong Bay\'s classic highlights, then sail south through the boundary into Lan Ha Bay for day two and night two. This gives you the iconic Halong sunrise and the peaceful Lan Ha anchorage. A handful of premium operators, including Heritage Line, run exactly this route. Book it for two nights minimum — one night is not enough on either bay.', 'normal'),
      textBlock('Our recommendation: The Heritage Line Jasmine or Indochine Sail\'s Au Co, two nights, combining both bays, departing Sunday or Monday when weekend traffic has cleared.', 'normal'),
    ],
    ctaLabel: 'Discover Our Halong Bay Cruise Selection',
    ctaHeading: 'Book the Right Junk for Your Bay Voyage',
    ctaDescription: 'We have personally vetted every cruise operator we recommend. Our specialists will match you with the right vessel, route, and cabin for your group.',
  },

  // ── 4. Hoi An Guide ───────────────────────────────────────────────────────
  {
    _id: 'post-hoi-an-complete-guide',
    _type: 'post',
    title: 'Hoi An: The Complete Guide to Vietnam\'s Most Beautiful Town',
    slug: { _type: 'slug', current: 'hoi-an-complete-travel-guide' },
    publishedAt: '2025-05-20T09:00:00.000Z',
    excerpt: 'Hoi An\'s Ancient Town is a UNESCO gem of perfectly preserved merchant architecture, lantern-lit streets, and extraordinary food. But the secret Hoi An — the bicycle rides through the rice paddies, the fishing villages, the uncrowded beach — is just as rewarding and far less photographed.',
    content: [
      textBlock('In the late afternoon, when the tour groups have retreated to their hotels and the heat begins to soften, Hoi An becomes something close to magical. The 16th-century Japanese Covered Bridge glows amber in the fading light. The Thu Bon River carries small wooden boats piled with chrysanthemums to market. The smell of white rose dumplings and cao lau drifts from open-fronted restaurants. It is one of those rare places that still surprises you even when you know exactly what you are coming to see.', 'normal'),
      heading('The Ancient Town: What to See and When'),
      textBlock('The Ancient Town is compact — you can walk its full length in 20 minutes — but deserves at least two days. The Japanese Covered Bridge (Chùa Cầu) is the iconic image, but go in the early morning before 8am to have it to yourself. The Tan Ky Merchant House on Nguyen Thai Hoc Street gives the best insight into how a prosperous trading family lived in the 18th century: three floors, a rooftop garden, a basement revealed by the annual floods. The Phung Hung Old House nearby is slightly less visited and equally beautiful.', 'normal'),
      heading('The Food: A Culinary Destination in Its Own Right'),
      textBlock('Hoi An\'s cuisine is distinct from the rest of Vietnam. White rose dumplings (bánh vạc), cao lầu noodles made with water from a specific ancient well, fried wonton with tomato sauce — these dishes exist only here. Eat them at humble local restaurants, not the tourist-facing venues on the main drag. Morning Glory (do not be put off by the name) on Trần Phú has an excellent cao lầu. For the best bánh mì in Vietnam — not a claim I make lightly — go to Bánh Mì Phượng on Phan Châu Trinh before 9am.', 'normal'),
      heading('Beyond the Ancient Town: The Hoi An Most Visitors Miss'),
      textBlock('Rent a bicycle at your hotel (all good properties provide them free of charge) and cycle north to Tra Que vegetable village: 15 minutes through paddy fields and irrigation canals, absolutely flat, a complete change of pace from the town\'s intensity. Further north on An Bang Beach, the scene is relaxed and less developed than Da Nang — good beach clubs, excellent seafood, and enough sand to find a quiet spot even in high season.', 'normal'),
      textBlock('One evening, take a boat from the town centre upriver to My Son Sanctuary — the Cham ruins that predate Hoi An\'s merchant era by a thousand years. At dusk, with the crowds gone and the stones turning gold, it is as atmospheric as Angkor at its best.', 'normal'),
      heading('Where to Stay'),
      textBlock('The best properties are outside the Ancient Town\'s pedestrianised core. The Four Seasons Nam Hai, 20 minutes north at Ha My Beach, is Vietnam\'s most elegant resort: three pools (one per beach), perfect villas, extraordinary food. Closer to town, Anantara Hoi An sits directly on the river and provides a traditional-facing room experience that balances charm with genuine comfort.', 'normal'),
    ],
    ctaLabel: 'Include Hoi An in Your Vietnam Tour',
    ctaHeading: 'Create Your Perfect Hoi An Itinerary',
    ctaDescription: 'Three days, five days, or an entire week — we design Hoi An stays that balance the Ancient Town, the countryside, the beach, and exceptional dining.',
  },

  // ── 5. Sapa Trekking Guide ────────────────────────────────────────────────
  {
    _id: 'post-sapa-trekking-guide',
    _type: 'post',
    title: 'Trekking in Sapa: A First-Hand Guide to Vietnam\'s Mountain Kingdom',
    slug: { _type: 'slash', current: 'sapa-trekking-guide-vietnam' },
    publishedAt: '2025-01-30T09:00:00.000Z',
    excerpt: 'At 1,600 metres above sea level, Sapa\'s terraced rice paddies and ethnic minority villages create one of the most visually extraordinary landscapes in Asia. I trekked here in October — the best month — and discovered a region that rewards those who choose a private guide over a group tour.',
    content: [
      textBlock('The overnight train from Hanoi pulls into Lao Cai station at 6am. From the platform you can already see the Hoang Lien Son mountains, the highest range in Vietnam, draped in cloud. A private car takes you up the 38km switchback road to Sapa town (1,600m) in just over an hour. The air is immediately different: cool, thin, scented with pine and wood smoke. It is one of Vietnam\'s most arresting arrivals.', 'normal'),
      heading('Why October is the Best Month'),
      textBlock('September and October are Sapa\'s finest months. The paddy fields are a luminescent green-gold as the harvest approaches; the mornings are clear before clouds gather in the afternoon; the temperature sits at a perfect 18-22°C. Avoid July and August (too wet, visibility poor) and December to February (fog can close in for days). The spring rice planting season (May-June) is the second best window, when the terraces are flooded and mirror the sky.', 'normal'),
      heading('The Trek: What a Real Day Looks Like'),
      textBlock('A proper Sapa trek begins at 7:30am from the hotel, with a local H\'Mong guide — not a centralised tour company guide, but a guide from the specific village you are visiting. The difference is profound: a local guide can take you into family homes, explain the significance of the embroidery patterns, introduce you to the village elder by name. The route from Sapa town to Cat Cat village, then on to the terraced fields of Y Linh Ho, is 12 kilometres of well-maintained trail. Moderately fit travellers manage it in 4-5 hours with stops.', 'normal'),
      heading('The Villages: H\'Mong, Red Dao, and Tay'),
      textBlock('The ethnic minority groups of Sapa each maintain distinct dress, language, and traditions. Black H\'Mong women are the most visible in town — their silver jewellery and deep-indigo hemp clothing are immediately recognisable. Red Dao women, identifiable by their extraordinary red-dyed headwear, live in the more remote valleys below Sapa, particularly around Ta Phin village. A visit to a Red Dao home, with a traditional herbal bath offered at the end of a long day\'s trek, is one of northern Vietnam\'s genuine luxury experiences — restorative in every sense.', 'normal'),
      heading('Where to Stay in Sapa'),
      textBlock('The Silk Path Grand Resort & Spa Sapa opened in 2019 and remains the finest property in the region: 194 rooms and villas perched on a hillside with uninterrupted Muong Hoa Valley views. The infinity pool at sunset is genuinely extraordinary — the terrace drops away and the terraced fields fill the entire frame to the horizon. For something more intimate, Topas Ecolodge, 18 bungalows built into a granite boulder ridge 23km from Sapa town, offers complete wilderness immersion with no Wi-Fi and exceptional star-gazing.', 'normal'),
    ],
    ctaLabel: 'Trek Sapa in Private Style',
    ctaHeading: 'Design Your Sapa Mountain Escape',
    ctaDescription: 'We arrange private H\'Mong guides, porter support, and the finest mountain accommodation. No group tours. No compromises.',
  },

  // ── 6. Vietnam Culinary Tours ─────────────────────────────────────────────
  {
    _id: 'post-vietnam-culinary-tour-guide',
    _type: 'post',
    title: 'Vietnam by Fork: The Ultimate Culinary Tour from Hanoi to Saigon',
    slug: { _type: 'slug', current: 'vietnam-culinary-food-tour-guide' },
    publishedAt: '2025-06-01T09:00:00.000Z',
    excerpt: 'Vietnamese cuisine is not one cuisine — it is three. Hanoi\'s food is austere and precise. Central Vietnam\'s is fiery and ceremonial. Saigon\'s is abundant and influenced by the south\'s sugar cane and coconut milk. A culinary tour connecting all three is one of the most rewarding ways to travel this extraordinary country.',
    content: [
      textBlock('I came to Vietnam for the landscapes and stayed for the food. After three visits spanning nearly a decade, I now plan every itinerary around eating: where the best bowl of pho is, which market in which city to visit at 6am, which restaurant has been run by the same grandmother for 40 years and still refuses to put a sign outside. Vietnam\'s food culture is not background — it is the entire foreground.', 'normal'),
      heading('Chapter One: Hanoi — Restraint and Perfection'),
      textBlock('Northern Vietnamese cuisine is the most disciplined of the three regional styles. Fewer ingredients, cleaner flavours, a refusal to over-season. The pho at Pho Thin on Dinh Tien Hoang is a masterclass: the broth has been cooking since 4am, the tendon is barely set, and the crispy shallots are added at the last second. Do not put chilli or hoisin in it. Order it as it comes. Bun cha — grilled pork patties in a light fish sauce broth with cold rice noodles and herbs — is the other essential Hanoi dish. Go to Bun Cha Huong Lien (also known, rather grandly, as "Obama\'s Bun Cha" after a 2016 visit).', 'normal'),
      heading('Chapter Two: Hue — The Cuisine of Emperors'),
      textBlock('Hue was Vietnam\'s imperial capital for 140 years, and its cuisine reflects this: more complex, more ceremonial, more vegetable-forward than either north or south. Bun bo Hue is the city\'s signature noodle soup — beefier and spicier than pho, with lemongrass as the dominant note and cubes of congealed pork blood for authenticity. Banh khoai (crispy rice pancakes) and nem lui (lemongrass pork skewers) are best eaten standing at a street stall on Nguyen Dinh Chieu. For the full imperial treatment, Madame Tuyen\'s hosts elaborate multi-course dinners in her family\'s beautifully preserved garden home.', 'normal'),
      heading('Chapter Three: Hoi An — The Culinary Anomaly'),
      textBlock('Hoi An\'s cuisine is its own thing, heavily influenced by the Japanese and Chinese merchants who traded here for centuries. Cao lau can only be made with water from the Ba Le well — the mineral content is specific and not replicated anywhere else. Carry only a rice flour noodle, pork, and crispy croutons (not crackers), it is one of the most distinct dishes in all of Vietnamese cooking. The city\'s cooking school scene is genuinely good: Blue Dragon on the river offers a half-day class that takes you to the market at 8am and sits you down for lunch at noon.', 'normal'),
      heading('Chapter Four: Ho Chi Minh City — Abundance and Influence'),
      textBlock('Saigon eats differently: more sugar, more coconut, more Chinese influence from the Cho Lon district. The banh mi has reached peak evolution here — the baguettes are crispier, the filling combinations more elaborate. Com tam (broken rice with grilled pork chop, egg, and pickles) is the defining working-class dish. But the restaurant scene has also matured dramatically: Anan Saigon on Hoang Cong Chat reimagines Vietnamese street food for a global dining audience; Noir. Dining in the Dark is exactly what it sounds like and genuinely memorable.', 'normal'),
    ],
    ctaLabel: 'Design Your Vietnam Culinary Journey',
    ctaHeading: 'Eat Vietnam With a Private Food Guide',
    ctaDescription: 'Our culinary-focused itineraries are built around the best markets, cooking classes, family restaurants, and chef\'s table experiences at every stop.',
  },

  // ── 7. Mekong Delta Guide ─────────────────────────────────────────────────
  {
    _id: 'post-mekong-delta-guide',
    _type: 'post',
    title: 'The Mekong Delta: How to Do It Properly (Without a Group Tour)',
    slug: { _type: 'slug', current: 'mekong-delta-private-tour-guide' },
    publishedAt: '2025-04-22T09:00:00.000Z',
    excerpt: 'The Mekong Delta is the rice bowl of Vietnam — a vast, flat, river-threaded landscape where life has moved by sampan for centuries. Most visitors do it on a day tour from Saigon and see almost nothing. Here is how to do it in two days, properly, with a private boat and a guide who actually lives here.',
    content: [
      textBlock('The Mekong River enters Vietnam through nine tributaries (the Nine Dragons of local legend) and fans out into a delta the size of Belgium before reaching the South China Sea. It is one of the world\'s great waterways — more than 60 million people depend on it across six countries — and its Vietnamese reaches, while heavily farmed, have a quiet, watery beauty entirely different from anywhere else in the country.', 'normal'),
      heading('Why You Need Two Days, Not One'),
      textBlock('The standard day trip from Ho Chi Minh City to My Tho takes three hours in each direction by bus, leaving perhaps four hours in the delta itself. Spend those hours on a group boat with 20 others, stop at a honey bee farm and a coconut candy workshop, have a set lunch of whole fried fish, back on the bus, back to Saigon. You will have technically done the Mekong Delta and seen essentially nothing of it.', 'normal'),
      textBlock('Two days allows you to base yourself overnight in Can Tho, the delta\'s unofficial capital (4 hours south of Saigon by private car, easily reached via the new My Thuan Bridge). From Can Tho, a private boat the next morning reaches Cai Rang floating market at 5:30am — the moment it is at its most photogenic, the trading boats laden with watermelons and durian, the sellers poling between them with long bamboo oars.', 'normal'),
      heading('Cai Rang Floating Market: What to Expect'),
      textBlock('Cai Rang is the delta\'s largest floating market. It is genuinely a working wholesale market, not a tourism display — the wholesale trade happens early, and most boats are gone by 8am. Your guide will arrange a small, local wooden boat (not a tourist motorboat) and you will navigate between the trading vessels: riverside orchards delivering dragon fruit, riverside workshops sending out pots of coconut jam. Breakfast is a bowl of hu tieu (clear noodle soup) bought from a woman cooking on a floating stall.', 'normal'),
      heading('Where to Stay in Can Tho'),
      textBlock('The Victoria Can Tho Resort is the correct choice: a French colonial-era property on the Hau River with a riverside pool, excellent Vietnamese food, and a beautiful fleet of wooden boats for private excursions. The riverside rooms have balconies directly above the water — falling asleep to the sound of the river and waking to sampan traffic is the defining Mekong Delta experience.', 'normal'),
    ],
    ctaLabel: 'Add the Mekong Delta to Your Itinerary',
    ctaHeading: 'Experience the Delta on a Private River Boat',
    ctaDescription: 'We arrange overnight stays in Can Tho, private boat guides, and Cai Rang market mornings — the Mekong Delta as it is meant to be experienced.',
  },

  // ── 8. Ha Giang Loop ─────────────────────────────────────────────────────
  {
    _id: 'post-ha-giang-guide',
    _type: 'post',
    title: 'Ha Giang: Vietnam\'s Most Spectacular Landscape (and How to Reach It)',
    slug: { _type: 'slug', current: 'ha-giang-loop-complete-guide' },
    publishedAt: '2025-03-28T09:00:00.000Z',
    excerpt: 'Ha Giang Province, in Vietnam\'s far north, is 300 kilometres of limestone peaks, river gorges, and Hmong villages that most tourists never see. The road here is extraordinary. The food is memorable. The silence is absolute.',
    content: [
      textBlock('There is a point on the Ma Pi Leng Pass, between Dong Van and Meo Vac in Ha Giang Province, where the road clings to a clifftop above the Nho Que River gorge. The river far below is a specific shade of blue-green that I have only seen in one other place (Zhangjiajie, China). The limestone peaks on the opposite bank are close enough to seem touchable. It is, without question, the most dramatic road scenery in Vietnam — and one of the most extraordinary in all of Southeast Asia.', 'normal'),
      heading('Getting There: The Practical Reality'),
      textBlock('Ha Giang city is 320 kilometres north of Hanoi — five hours by private car, six by bus. From Ha Giang city, the famous loop begins: a 350km circuit through Quan Ba (Heaven\'s Gate), Yen Minh, Dong Van, and Meo Vac before returning to Ha Giang. Driving the loop yourself by motorbike is popular with backpackers but not appropriate for first-time visitors unfamiliar with Vietnamese mountain roads. A private car with an experienced local driver is the correct approach; the roads are steep, narrow, and occasionally alarming, but a skilled driver makes them entirely manageable.', 'normal'),
      heading('The Dong Van Karst Plateau'),
      textBlock('The Dong Van district sits on a UNESCO Global Geopark — a karst plateau that extends into Yunnan, China, and represents one of the world\'s best-preserved geological formations from the Devonian period, 400 million years ago. The landscape has a lunar quality: bare, jagged rock peaks separated by narrow valleys where H\'Mong and Lo Lo villagers grow buckwheat (in autumn, the fields turn deep pink and red — a sight unlike anything else in Vietnam). The Dong Van old quarter is a compact collection of Chinese-influenced merchant houses that were trading opium a century ago and now sell rice wine.', 'normal'),
      heading('The Ma Pi Leng Pass: At the Right Time'),
      textBlock('Drive the Ma Pi Leng Pass in the morning, eastward from Dong Van toward Meo Vac, when the light is soft and the Nho Que River gorge is free of haze. Stop at the unmarked viewpoint 8km from Dong Van — there is a concrete barrier on the outside lane and a small layby where your driver can park. Stand on the barrier and look north. The gorge drops 1,000 metres below you. The silence is broken only by eagles.', 'normal'),
      textBlock('Ha Giang\'s food culture centres on thang co — a soup made from horse meat and offal, originally a H\'Mong dish, now served across the province\'s markets. It is acquired taste. The corn wine (rượu ngô), distilled in small batches in roadside villages, is not.', 'normal'),
    ],
    ctaLabel: 'Explore Vietnam\'s Untouched North',
    ctaHeading: 'Discover Ha Giang in Private Comfort',
    ctaDescription: 'We arrange private car-and-driver itineraries through Ha Giang, including overnight stays in local homestays and expert local guides for the plateau villages.',
  },

  // ── 9. Hanoi Guide ────────────────────────────────────────────────────────
  {
    _id: 'post-hanoi-city-guide',
    _type: 'post',
    title: 'Hanoi: The Essential City Guide for Discerning Travellers',
    slug: { _type: 'slug', current: 'hanoi-city-guide-luxury-travel' },
    publishedAt: '2025-05-08T09:00:00.000Z',
    excerpt: 'Vietnam\'s capital is often dismissed as a transit stop to Halong Bay. It is a serious mistake. Hanoi rewards slow exploration: its French colonial architecture, lake-side temples, extraordinary food scene, and quietly ferocious art culture deserve at least three days of genuine attention.',
    content: [
      textBlock('Hanoi is a city that reveals itself reluctantly. The first impression — hectic traffic, honking scooters, air thick with diesel and grilling meat — can be disorienting. But the city\'s bones are beautiful, and once you find the rhythm of it (always moving, never stopping — like the traffic itself), it becomes one of the most compulsively walkable cities in Asia.', 'normal'),
      heading('The Old Quarter: 36 Streets of History'),
      textBlock('The Old Quarter (Hoan Kiem district) is organised around the ancient guild system: Hang Bac (Silver Street), Hang Gai (Silk Street), Hang Ma (Paper Street). The layout has not fundamentally changed since the 13th century. Walk Hang Gai for silk lacquerware and custom-tailored clothing; Hang Ma for Vietnamese paper craft and lanterns; Hang Buom for antiques and local snacks. The architecture is the narrow "tube houses" — built deep to avoid tax assessed by frontage width — and many have been in the same family for generations.', 'normal'),
      heading('Around Hoan Kiem Lake'),
      textBlock('The Hoan Kiem Lake is the city\'s geographic and emotional centre — a 12-hectare lake in the middle of the Old Quarter, home to the legendary Huc Bridge and Ngoc Son Temple on a small island. Arrive at 6am to see the lake at its most local: hundreds of residents walking, stretching, and doing group tai chi on the lake shore. The Turtle Tower visible from the southern bank commemorates the mythical tortoise (Cu Rua) that lived in the lake for centuries. The most recent and beloved individual died in 2016 at an estimated age of 100.', 'normal'),
      heading('The Museum of Ethnology: Vietnam\'s Best Museum'),
      textBlock('The Vietnam Museum of Ethnology in the Cau Giay district (20 minutes from the Old Quarter by taxi) is one of Southeast Asia\'s finest museums — largely unvisited by package tourists and all the better for it. The indoor collection covers all 54 ethnic minority groups in Vietnam with exceptional clarity and respect. The outdoor section includes full-scale reconstructed communal houses from the Central Highlands and a Cham tower fragment. Allocate three hours minimum.', 'normal'),
      heading('Where to Eat: A Highly Curated List'),
      textBlock('Pho Thin (Dinh Tien Hoang): the definitive pho experience. Arrive before 8am. Bun Cha Huong Lien (Ly Van Phuc): this is where Barack Obama ate with Anthony Bourdain in 2016. The set is still on the menu. Chả Cá Lã Vọng (Cha Ca Street): a 140-year-old institution serving one dish only — turmeric-marinated snakehead fish, cooked table-side in sizzling butter with dill. Wildly good. Cha Ruou Hanoi (Dinh Liet): barrel-aged rice wine, local cheese and cured meats — one of Hanoi\'s few genuinely inventive modern Vietnamese concepts.', 'normal'),
    ],
    ctaLabel: 'Make Hanoi the Start of Your Vietnam Journey',
    ctaHeading: 'Begin in the Capital, Explore the Country',
    ctaDescription: 'We design multi-day Hanoi programmes that go far beyond the standard tourist circuit — deeper into the city\'s culture, food, and art.',
  },

  // ── 10. Phu Quoc Island ──────────────────────────────────────────────────
  {
    _id: 'post-phu-quoc-island-guide',
    _type: 'post',
    title: 'Phu Quoc Island: Vietnam\'s Most Refined Beach Destination',
    slug: { _type: 'slash', current: 'phu-quoc-island-luxury-guide' },
    publishedAt: '2025-02-05T09:00:00.000Z',
    excerpt: 'Phu Quoc has transformed from a forgotten fishing island into Vietnam\'s leading beach destination in a decade. Done correctly — with a villa property rather than a resort block, private beach access, and time for the island\'s still-excellent fish sauce trail — it is genuinely extraordinary.',
    content: [
      textBlock('Phu Quoc lies off Vietnam\'s southwestern coast in the Gulf of Thailand, 46 kilometres from the Cambodian coast and about 45 minutes from Ho Chi Minh City by plane. The island is roughly the size of Singapore, largely covered by national park (the largest in Vietnam), with beaches on three sides and a fishing town on the east coast. A decade ago it was a backpacker destination. Today, the north of the island has been developed into one of Southeast Asia\'s more impressive luxury resort corridors.', 'normal'),
      heading('When to Go'),
      textBlock('The dry season runs November to April — the definitive window for beach travel. The water is clear, the skies are blue, and the sea temperature sits at 28-30°C. May to October is the wet season; the western beaches (Long Beach, Ong Lang) can be rough, and the famous Sao Beach on the southeast is the only reliably swimmable spot. November to February is peak season — book accommodation 3-4 months in advance.', 'normal'),
      heading('The North: Luxury Resort Territory'),
      textBlock('The northern tip of the island around Ganh Dau is where the premium resort development is concentrated. The Regent Phu Quoc, Park Hyatt Phu Quoc (within the VinWonders resort complex), and Fusion Resort Phu Quoc all occupy this stretch of coast. The Regent is the finest property: 52 pool villas, each with a private beach-facing deck, exceptional Vietnamese food at La Plage, and a spa programme built around the island\'s traditional fish sauce and pepper heritage. Nothing about it feels like Vietnam, which is either a plus or a minus depending on what you are looking for.', 'normal'),
      heading('The South: The Real Phu Quoc'),
      textBlock('An Thoi, at the island\'s southern tip, is still a working fishing town. The night market at Duong Dong is excellent — grilled squid, fresh oysters, and the island\'s famous fish sauce (nuoc mam), which Anthony Bourdain once called the most complex condiment in the world. Take a half-day boat trip from An Thoi port to the Southern Archipelago: 15 small islands scattered around a shallow bay, snorkelling conditions that rival Thailand in the dry season.', 'normal'),
      heading('The Fish Sauce Trail'),
      textBlock('Phu Quoc\'s fish sauce (nuoc mam Phu Quoc) has protected origin status — the island is the only place in Vietnam where the real article can be made under that name. Visit Hung Thanh fish sauce factory near Duong Dong town: the barrels of anchovies and salt fermenting in open-air wooden vats, the rich, salt-iodine smell, the amber liquid drawn off after 12 months — it is a remarkable process. Buy directly from the factory.', 'normal'),
    ],
    ctaLabel: 'Plan Your Phu Quoc Island Retreat',
    ctaHeading: 'Beach, Villas, and Private Island Access',
    ctaDescription: 'We know every villa property, private beach, and exceptional restaurant on Phu Quoc. Our specialists design island stays that go beyond the resort brochure.',
  },

  // ── 11. Luxury Tours Vietnam ─────────────────────────────────────────────
  {
    _id: 'post-luxury-vietnam-tour-guide',
    _type: 'post',
    title: 'What Does a Truly Luxury Vietnam Tour Actually Look Like?',
    slug: { _type: 'slug', current: 'luxury-vietnam-tour-what-to-expect' },
    publishedAt: '2025-04-15T09:00:00.000Z',
    excerpt: 'After a decade of designing luxury itineraries in Vietnam, I have a clear answer to the question I am asked most often: what separates a luxury Vietnam tour from an expensive one? The difference is almost entirely in the details — and the details are everything.',
    content: [
      textBlock('The word "luxury" in travel has been so thoroughly devalued that it is now essentially meaningless. Five-star hotels that have five stars in the same way a motorway service station has four-star coffee. Premium experiences that are premium only in price. I am going to be specific about what genuine luxury looks like in Vietnam, because I have seen the difference clearly enough to describe it precisely.', 'normal'),
      heading('Accommodation: Beyond the Star Rating'),
      textBlock('In Vietnam, the best accommodation is rarely the most famous. The Amanoi at Ninh Van Bay (accessible only by boat) is the most extraordinary property in the country and is not mentioned in most luxury guides because it requires effort to reach. The La Siesta resort group in Hoi An delivers a level of personal service — a handwritten note in your room, a bartender who remembers your drink order by day two — that the largest international brands rarely achieve. Genuine luxury accommodation is characterised by restraint, personalisation, and the willingness to say no to mass-market group bookings.', 'normal'),
      heading('Transport: The Private Car Standard'),
      textBlock('Every transfer in a genuine luxury itinerary should be by private air-conditioned vehicle with a dedicated driver. Not a shared shuttle. Not a group minibus. Your car waits when you need it, leaves when you are ready, and stops at the roadside viewpoint you want to photograph. In Vietnam, the coastal road from Da Nang to Hoi An, the mountain road from Hanoi to Sapa, the delta road from Saigon to Can Tho — these journeys are part of the experience, not a logistical inconvenience. Your car should make them feel that way.', 'normal'),
      heading('Guides: The Single Most Important Variable'),
      textBlock('The difference between a mediocre Vietnam trip and an exceptional one is almost always the guide. A truly good guide is not a walking Wikipedia entry — they are a connector. They know which family in Hoi An will show you their home and tell you about the Japanese merchant who built it in 1750. They know which chef in Hue will modify the royal banquet menu if you ask correctly. They know the security guard at the Hoa Lo Prison who will take you to the hidden rooms after hours. In 12 years of Vietnam itineraries, the feedback that comes up most consistently in client reviews is not the hotel — it is the guide.', 'normal'),
      heading('Experiences: Access and Exclusivity'),
      textBlock('Luxury in Vietnam is not about doing something no one has ever done — it is about doing familiar things in a way most people never experience. A sunrise at Halong Bay is not exclusive; a sunrise at Halong Bay from the sun deck of a private junk with fresh Vietnamese coffee and nobody else within a kilometre is a different thing entirely. Cave dining in Halong Bay — set up inside a volcanic rock cave with a private chef and a single table for two — is available but only to those who know to ask. We know to ask.', 'normal'),
    ],
    ctaLabel: 'Design Your Luxury Vietnam Tour',
    ctaHeading: 'The Best Vietnam Tour You Will Ever Take',
    ctaDescription: 'We design luxury itineraries that are built around access, personalisation, and the kind of detail that transforms a good trip into an exceptional one.',
  },
];

async function importPosts() {
  console.log(`Importing ${posts.length} blog posts to Sanity...`);
  for (const post of posts) {
    // Fix any nested slug typo ('slash' -> 'slug')
    if ((post.slug as any)._type === 'slash') {
      (post.slug as any)._type = 'slug';
    }
    const doc: any = {
      _type: post._type,
      _id: post._id,
      title: post.title,
      slug: post.slug,
      publishedAt: post.publishedAt,
      excerpt: post.excerpt,
      content: (post.content as any[]).map((block: any) => ({
        ...block,
        _key: block._key || Math.random().toString(36).slice(2),
        children: block.children?.map((child: any) => ({
          ...child,
          _key: child._key || Math.random().toString(36).slice(2),
        })),
      })),
      ctaLabel: post.ctaLabel,
      ctaHeading: post.ctaHeading,
      ctaDescription: post.ctaDescription,
    };
    try {
      await (client as any).createOrReplace(doc);
      console.log(`✓ ${post.title}`);
    } catch (err: any) {
      console.error(`✗ Failed: ${post.title} — ${err.message}`);
    }
  }
  console.log('\n✅ Done importing blog posts!');
}

importPosts();
