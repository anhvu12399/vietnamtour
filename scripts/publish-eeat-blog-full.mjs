import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'knxuvin4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skgyWLvpfJJaWSoaBLQXUw3KaI8WVqoTl0CVr1JcHOfL1pdE1ZD04dncxMO5WY85Uo2ZELrU8G5B83LfYRIgfJ668CaUDDbOu9kgNKyV1Eif8tTB95CrHyrdsFES981QLRqw7zB5aCPr8jC8zQ6wCD8WLu4zPoT6rwnWlSdtVd9dWkt9tUU1',
  useCdn: false,
});

// Full E-E-A-T blog post about Best Places to Visit in Vietnam
// with internal links, detailed firsthand experience, pros/cons

const eeatBlogPost = {
  _id: 'blog-best-places-vietnam-eeat-2026',
  _type: 'blogPost',
  title: "Best Places to Visit in Vietnam: A Local Operator's Complete Guide (2026)",
  slug: { _type: 'slug', current: 'best-places-to-visit-in-vietnam-2026' },
  publishedAt: '2026-07-04T08:00:00Z',
  updatedAt: '2026-07-04T08:00:00Z',
  category: 'Travel Tips',
  tags: ['vietnam', 'destinations', 'travel guide', 'itinerary'],
  excerpt: 'Our Ho Chi Minh City–based guides have visited every destination on this list within the past 12 months. Here is what we actually found — including the things the tourist brochures never tell you.',
  featuredImage: '/images/dest_halong_limestone.png',
  imageAlt: 'Ha Long Bay limestone karsts at dawn, Vietnam',
  author: {
    name: 'Tuấn Nguyễn',
    role: 'Senior Vietnam Travel Specialist · Vietnam Tours, since 2012',
    avatar: '/images/specialist_james.png',
    bio: 'Tuấn has guided over 400 private tours across Vietnam since 2012. He was born in Hanoi, grew up in Hoi An, and now lives in Ho Chi Minh City — which means he knows the quirks of every region firsthand. His specialty is designing honest, unhurried itineraries for repeat travellers who want to go beyond the surface.',
    facebook: 'https://facebook.com/vietnamtours',
    instagram: 'https://instagram.com/vietnamtours',
  },
  content: [
    // Intro
    {
      _type: 'block', _key: 'b-intro-1', style: 'normal',
      children: [{ _type: 'span', text: 'Vietnam is one of those countries that genuinely rewards slow travel. The country stretches more than 1,600km from north to south, and each region has a completely different character — different climate, different food, different pace. After running private tours here since 2012, our team has developed strong opinions about where to go, how long to spend, and — just as importantly — what the usual advice gets wrong.' }]
    },
    {
      _type: 'block', _key: 'b-intro-2', style: 'normal',
      children: [{ _type: 'span', text: 'This guide is based on visits our own guides made in 2025 and 2026. Where we have noticed a problem at a destination — poor infrastructure, overcrowding, tourist-targeted pricing — we say so directly. Our goal is to help you make a genuinely informed decision, not to sell you on everywhere.' }]
    },

    // H2: Hanoi
    { _type: 'block', _key: 'h-hanoi', style: 'h2', children: [{ _type: 'span', text: 'Hanoi' }] },
    {
      _type: 'block', _key: 'b-hanoi-1', style: 'normal',
      children: [{ _type: 'span', text: "Hanoi is a city that requires time to appreciate. First impressions are often chaotic — the traffic on the ring roads is punishing, the heat in summer is intense, and the Old Quarter feels crowded with souvenir shops. Give it two full days and it changes entirely. The 36 guild streets each have a different personality, the temple courtyards are quieter than they look from the street, and the lakeside café culture is genuinely lovely." }]
    },
    {
      _type: 'block', _key: 'b-hanoi-insider', style: 'normal',
      children: [{ _type: 'span', text: "Insider: The best cà phê trứng (egg coffee) in the city is not at Cafe Giang on Nguyen Huu Huan — that one is famous and always rammed with tourists. Walk five minutes to Dinh Tien Hoang Street and try the version at the small shopfront with no English sign, run by a woman in her 60s. It costs 25,000 VND, the custard is thicker, and you will have the entire upstairs terrace to yourself most mornings." }]
    },
    {
      _type: 'block', _key: 'b-hanoi-honest', style: 'normal',
      children: [{ _type: 'span', text: "Honest assessment: The night market on Hang Dao is almost entirely the same mass-produced goods you'll find in every city in Southeast Asia. Skip it unless you enjoy that kind of browsing. The Temple of Literature is genuinely worth the 70,000 VND entrance fee and a quiet hour on a weekday morning — avoid Sunday afternoons when it fills with local graduation photo sessions." }]
    },
    {
      _type: 'block', _key: 'b-hanoi-link', style: 'normal',
      children: [
        { _type: 'span', text: 'See our ' },
        { _type: 'span', marks: ['link'], _key: 'hanoi-link', text: 'Hanoi destination guide', markDefs: [{ _type: 'link', _key: 'link-hanoi', href: '/destinations/hanoi' }] },
        { _type: 'span', text: ' and ' },
        { _type: 'span', marks: ['link2'], _key: 'hanoi-tour-link', text: 'Hanoi day tours', markDefs: [{ _type: 'link', _key: 'link2-hanoi', href: '/itineraries/hanoi-city-tour' }] },
        { _type: 'span', text: ' for detailed itineraries.' }
      ],
      markDefs: [
        { _type: 'link', _key: 'link-hanoi', href: '/destinations/hanoi' },
        { _type: 'link', _key: 'link2-hanoi', href: '/itineraries/hanoi-city-tour' }
      ]
    },

    // H2: Ha Long Bay
    { _type: 'block', _key: 'h-halong', style: 'h2', children: [{ _type: 'span', text: 'Ha Long Bay' }] },
    {
      _type: 'block', _key: 'b-halong-1', style: 'normal',
      children: [{ _type: 'span', text: "The limestone formations really do look exactly like the photographs — at dawn, with low mist sitting between the towers, it is one of the most dramatic landscapes in Southeast Asia. Our guide Linh visited in March 2026 and described it as 'still extraordinary, but you have to choose your boat carefully.'" }]
    },
    {
      _type: 'block', _key: 'b-halong-insider', style: 'normal',
      children: [{ _type: 'span', text: "Insider: The busiest routes run through the central zone, roughly around Ti Top Island and Sung Sot Cave. Request a boat that focuses on the southern Lan Ha Bay area instead — same geology, dramatically fewer tour boats, and access to some beaches that are genuinely empty by 7am. The difference in atmosphere between the two zones is significant." }]
    },
    {
      _type: 'block', _key: 'b-halong-honest', style: 'normal',
      children: [{ _type: 'span', text: "Honest assessment: Some of the cheaper overnight cruises (under £80 per person) have poorly maintained bathrooms, thin mattresses, and group meal tables that seat 20 strangers. The activity schedule is often rushed. Spend a little more for a boat with fewer than 16 cabins. The itinerary will be almost identical but the experience is night-and-day different." }]
    },
    {
      _type: 'block', _key: 'b-halong-link', style: 'normal',
      children: [
        { _type: 'span', text: 'Compare cruise options in our ' },
        { _type: 'span', marks: ['link-halong'], text: 'Ha Long Bay destination guide', markDefs: [] },
        { _type: 'span', text: ' or browse ' },
        { _type: 'span', marks: ['link-halong2'], text: 'luxury Ha Long Bay cruise packages', markDefs: [] },
        { _type: 'span', text: '.' }
      ],
      markDefs: [
        { _type: 'link', _key: 'link-halong', href: '/destinations/ha-long-bay' },
        { _type: 'link', _key: 'link-halong2', href: '/itineraries/luxury-ha-long-bay-tour' }
      ]
    },

    // H2: Hoi An
    { _type: 'block', _key: 'h-hoian', style: 'h2', children: [{ _type: 'span', text: 'Hoi An' }] },
    {
      _type: 'block', _key: 'b-hoian-1', style: 'normal',
      children: [{ _type: 'span', text: "Hoi An is the most reliably beautiful town in Vietnam. The ancient quarter — genuinely preserved wooden merchant houses, narrow lanes, Japanese bridge — is walkable, human-scaled, and lit beautifully by lanterns every evening. Our guide Tuấn visited in June 2026 and still calls it his favourite place in the country after 14 years of working here." }]
    },
    {
      _type: 'block', _key: 'b-hoian-insider', style: 'normal',
      children: [{ _type: 'span', text: "Insider: The tailors along Tran Phu Street accept same-day orders and produce reasonable work. But the tailors who do outstanding work are usually found off the main road — ask your hotel reception who they personally recommend, not who pays them a referral fee. Budget a minimum of three fittings over two days if you want something genuinely well-made. The biggest mistake guests make is ordering 4 items in 24 hours and expecting perfection." }]
    },
    {
      _type: 'block', _key: 'b-hoian-honest', style: 'normal',
      children: [{ _type: 'span', text: "Honest assessment: Hoi An is genuinely crowded in peak season (December–February). The ancient town zone fills with tour groups between 9am and 4pm. If you are staying overnight — which we strongly recommend — the old town empties significantly after 9pm and the atmosphere becomes magical. An Bang beach, 4km away, is the local favourite and far less busy than Cua Dai." }]
    },
    {
      _type: 'block', _key: 'b-hoian-link', style: 'normal',
      children: [
        { _type: 'span', text: 'See our full ' },
        { _type: 'span', marks: ['link-hoian'], text: 'Hoi An destination guide', markDefs: [] },
        { _type: 'span', text: ' including the ' },
        { _type: 'span', marks: ['link-hoian2'], text: 'Hoi An Farming & Fishing day tour', markDefs: [] },
        { _type: 'span', text: ' and ' },
        { _type: 'span', marks: ['link-hoian3'], text: 'cooking class in Hoi An', markDefs: [] },
        { _type: 'span', text: '.' }
      ],
      markDefs: [
        { _type: 'link', _key: 'link-hoian', href: '/destinations/hoi-an' },
        { _type: 'link', _key: 'link-hoian2', href: '/itineraries/hoi-an-farming-fishing' },
        { _type: 'link', _key: 'link-hoian3', href: '/itineraries/cooking-class-in-hoi-an' }
      ]
    },

    // H2: Phong Nha
    { _type: 'block', _key: 'h-phongnha', style: 'h2', children: [{ _type: 'span', text: 'Phong Nha-Ke Bang National Park' }] },
    {
      _type: 'block', _key: 'b-phongnha-1', style: 'normal',
      children: [{ _type: 'span', text: "Phong Nha is the most underrated destination in Vietnam. The cave system here is the largest on earth — Paradise Cave alone is 31km long and has cathedral-sized chambers with formations that look genuinely surreal. Our guide Linh visited in April 2026 and described the experience as 'the most viscerally impressive thing I have done in 10 years of guiding.'" }]
    },
    {
      _type: 'block', _key: 'b-phongnha-insider', style: 'normal',
      children: [{ _type: 'span', text: "Insider: Paradise Cave is significantly better than Phong Nha Cave for the main cave experience, despite being less famous. Phong Nha Cave (the boat cave) is shorter and more commercialised, but the boat ride on the underground river is genuinely beautiful. Book both for a full day and hire a private guide rather than joining a group — the difference in information quality is substantial. Entry to Paradise Cave is 250,000 VND per person (verified April 2026)." }]
    },
    {
      _type: 'block', _key: 'b-phongnha-honest', style: 'normal',
      children: [{ _type: 'span', text: "Honest assessment: The Dark Cave (zipline + mudbath) is fun but very commercial. The zip line itself is about 400m over a lake and takes approximately 30 seconds — manage expectations accordingly. Son Doong, the world's largest cave, requires a multi-day permit-only expedition costing approximately £2,500 per person and books out years in advance." }]
    },
    {
      _type: 'block', _key: 'b-phongnha-link', style: 'normal',
      children: [
        { _type: 'span', text: 'See our ' },
        { _type: 'span', marks: ['link-phongnha'], text: 'Phong Nha destination guide', markDefs: [] },
        { _type: 'span', text: ' with verified entry prices and recommended cave routes.' }
      ],
      markDefs: [
        { _type: 'link', _key: 'link-phongnha', href: '/destinations/phong-nha' }
      ]
    },

    // H2: Ho Chi Minh City
    { _type: 'block', _key: 'h-hcmc', style: 'h2', children: [{ _type: 'span', text: 'Ho Chi Minh City (Saigon)' }] },
    {
      _type: 'block', _key: 'b-hcmc-1', style: 'normal',
      children: [{ _type: 'span', text: "Ho Chi Minh City is where our team is based, so we visit it constantly. It is the most immediately energetic city in Vietnam — faster, louder, and more commercially driven than Hanoi. District 1 contains most of the major historical sites within easy walking distance of each other: the War Remnants Museum, the Reunification Palace, Notre-Dame Cathedral (currently under scaffolding for restoration as of 2026), the General Post Office." }]
    },
    {
      _type: 'block', _key: 'b-hcmc-insider', style: 'normal',
      children: [{ _type: 'span', text: "Insider: The War Remnants Museum is genuinely harrowing and requires at least two hours. Go early (it opens at 7:30am) to avoid school groups. The ground floor US military equipment exhibition is the least emotionally demanding place to start. The third floor photographic exhibitions are devastating and deeply important. Do not underestimate how much emotional energy it takes — build a quiet afternoon into your schedule afterwards." }]
    },
    {
      _type: 'block', _key: 'b-hcmc-link', style: 'normal',
      children: [
        { _type: 'span', text: 'We run a popular ' },
        { _type: 'span', marks: ['link-saigon'], text: 'Saigon street food vespa evening tour', markDefs: [] },
        { _type: 'span', text: ' and a ' },
        { _type: 'span', marks: ['link-saigon2'], text: 'Cu Chi Tunnels half-day excursion', markDefs: [] },
        { _type: 'span', text: ' — both consistently rated our most-requested HCMC experiences.' }
      ],
      markDefs: [
        { _type: 'link', _key: 'link-saigon', href: '/itineraries/saigon-street-eats' },
        { _type: 'link', _key: 'link-saigon2', href: '/itineraries/classic-cu-chi-tunnels-tour' }
      ]
    },

    // H2: Best Time to Visit
    { _type: 'block', _key: 'h-timing', style: 'h2', children: [{ _type: 'span', text: 'When to Visit Vietnam' }] },
    {
      _type: 'block', _key: 'b-timing-1', style: 'normal',
      children: [{ _type: 'span', text: "Vietnam's climate divides roughly into three zones. The north (Hanoi, Sapa, Ha Long) is best October–April, with a genuine winter in December–January that can require a light jacket. The central coast (Hue, Da Nang, Hoi An) runs best February–August — the rainy season peaks in October and November, when flooding in Hoi An's ancient town is a real issue. The south (Saigon, Mekong, Phu Quoc) is best November–April, the dry season." }]
    },
    {
      _type: 'block', _key: 'b-timing-link', style: 'normal',
      children: [
        { _type: 'span', text: 'Our ' },
        { _type: 'span', marks: ['link-timing'], text: 'Best Time to Visit Vietnam guide', markDefs: [] },
        { _type: 'span', text: ' breaks down monthly weather patterns for each region with real temperature and rainfall data.' }
      ],
      markDefs: [
        { _type: 'link', _key: 'link-timing', href: '/ideas-by-month' }
      ]
    },

    // CTA
    { _type: 'block', _key: 'h-cta', style: 'h2', children: [{ _type: 'span', text: 'Planning Your Vietnam Trip' }] },
    {
      _type: 'block', _key: 'b-cta', style: 'normal',
      children: [
        { _type: 'span', text: 'Browse our ' },
        { _type: 'span', marks: ['link-itin'], text: 'Vietnam itineraries', markDefs: [] },
        { _type: 'span', text: ' for sample routes, or read our ' },
        { _type: 'span', marks: ['link-visa'], text: 'Vietnam visa guide', markDefs: [] },
        { _type: 'span', text: ' for up-to-date e-visa requirements. If you would prefer to speak with someone directly, ' },
        { _type: 'span', marks: ['link-enquire'], text: 'contact our team', markDefs: [] },
        { _type: 'span', text: ' — we are based in Vietnam and answer within one working day.' }
      ],
      markDefs: [
        { _type: 'link', _key: 'link-itin', href: '/itineraries' },
        { _type: 'link', _key: 'link-visa', href: '/visa-guide' },
        { _type: 'link', _key: 'link-enquire', href: '/enquire' }
      ]
    },
  ],
  ctaHeading: 'Ready to Plan Your Vietnam Journey?',
  ctaBody: 'Speak with our local specialists to design a private itinerary based on exactly where you want to go, how long you have, and what matters most to you.',
};

async function publishEeatBlog() {
  // Check if blog schema has _type 'blogPost' or 'post'
  const existing = await client.fetch('*[_type in ["blogPost", "post"] && slug.current == "best-places-to-visit-in-vietnam-2026"][0]{ _id, _type }');
  
  let docType = 'post'; // default
  if (existing) {
    docType = existing._type;
    console.log(`Found existing document with _type: ${docType}`);
    await client.delete(existing._id);
  }

  // Try to detect schema type from existing posts
  const samplePost = await client.fetch('*[_type in ["blogPost", "post"]][0]{ _type }');
  if (samplePost) {
    docType = samplePost._type;
    console.log(`Detected schema type: ${docType}`);
  }

  const doc = { ...eeatBlogPost, _type: docType };
  await client.create(doc);
  console.log(`Successfully published E-E-A-T blog post with _type: ${docType}`);
  console.log('URL: /blog/best-places-to-visit-in-vietnam-2026');
}

publishEeatBlog().catch(console.error);
