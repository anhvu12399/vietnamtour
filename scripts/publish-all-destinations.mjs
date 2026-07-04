import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'knxuvin4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skgyWLvpfJJaWSoaBLQXUw3KaI8WVqoTl0CVr1JcHOfL1pdE1ZD04dncxMO5WY85Uo2ZELrU8G5B83LfYRIgfJ668CaUDDbOu9kgNKyV1Eif8tTB95CrHyrdsFES981QLRqw7zB5aCPr8jC8zQ6wCD8WLu4zPoT6rwnWlSdtVd9dWkt9tUU1',
  useCdn: false,
});

const destinations = [
  {
    _id: 'dest-hanoi',
    _type: 'destination',
    name: 'Hanoi',
    slug: { _type: 'slug', current: 'hanoi' },
    image: '/images/vietnamtour_hanoi_colonial.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "Hanoi, the historic capital, is famed for its tree-lined boulevards, busy Old Quarter streets, and unique colonial architecture. It represents the cultural heart of northern Vietnam." }]
      }
    ],
    highlights: [
      "Explore the 36 guild streets of the Old Quarter",
      "Visit the historic Temple of Literature",
      "Sip egg coffee overlooking Hoan Kiem Lake at sunrise"
    ],
    bestTimeToVisit: 'October to April'
  },
  {
    _id: 'dest-halong',
    _type: 'destination',
    name: 'Ha Long Bay',
    slug: { _type: 'slug', current: 'ha-long-bay' },
    image: '/images/dest_halong_limestone.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "A UNESCO World Heritage Site renowned for its emerald waters and thousands of towering limestone islands topped by rainforests." }]
      }
    ],
    highlights: [
      "Cruise on a traditional wooden junk boat",
      "Kayak through Luon Cave and hidden lagoons",
      "Trek up Ti Top Island for panoramic views"
    ],
    bestTimeToVisit: 'October to April'
  },
  {
    _id: 'dest-sapa',
    _type: 'destination',
    name: 'Sapa',
    slug: { _type: 'slug', current: 'sapa' },
    image: '/images/dest_sapa_highland.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "Nestled in the Hoang Lien Son mountains, Sapa is famous for its cascading golden rice terraces, ethnic minority cultures, and misty peaks." }]
      }
    ],
    highlights: [
      "Trek through bamboo forests and terraced paddies",
      "Stay overnight in a H'Mong family homestay",
      "Explore vibrant weekend ethnic markets"
    ],
    bestTimeToVisit: 'September to October'
  },
  {
    _id: 'dest-ninhbinh',
    _type: 'destination',
    name: 'Ninh Binh',
    slug: { _type: 'slug', current: 'ninh-binh' },
    image: '/images/tour_ninhbinh_landscape.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "Known as 'Ha Long Bay on land', Ninh Binh features spectacular karst mountains rising out of green rice paddies and winding rivers." }]
      }
    ],
    highlights: [
      "Rowboat excursion through Trang An caves",
      "Climb 500 steps to Hang Mua viewpoint",
      "Explore the ancient capital of Hoa Lu"
    ],
    bestTimeToVisit: 'March to May, September to November'
  },
  {
    _id: 'dest-hue',
    _type: 'destination',
    name: 'Hue',
    slug: { _type: 'slug', current: 'hue' },
    image: '/images/things_cooking_class_hue.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "The former imperial capital of Vietnam, Hue holds the grand Imperial Citadel, royal tombs, and a rich culinary heritage." }]
      }
    ],
    highlights: [
      "Tour the UNESCO-listed Imperial Citadel",
      "Cruise the Perfume River to Thien Mu Pagoda",
      "Savor refined imperial multi-course cuisine"
    ],
    bestTimeToVisit: 'February to August'
  },
  {
    _id: 'dest-danang',
    _type: 'destination',
    name: 'Da Nang',
    slug: { _type: 'slug', current: 'da-nang' },
    image: '/images/trip_adventure_jungle.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "A modern coastal city boasting long sandy beaches, bridging the gap between the imperial city of Hue and the ancient town of Hoi An." }]
      }
    ],
    highlights: [
      "Walk on the famous Golden Bridge in Ba Na Hills",
      "Explore the caves of the Marble Mountains",
      "Relax on clean, white-sand My Khe beach"
    ],
    bestTimeToVisit: 'February to August'
  },
  {
    _id: 'dest-hoian',
    _type: 'destination',
    name: 'Hoi An',
    slug: { _type: 'slug', current: 'hoi-an' },
    image: '/images/dest_hoian_lanterns.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "A beautifully preserved UNESCO ancient merchant town, famous for its lantern-lit canals, historic wooden houses, and expert tailors." }]
      }
    ],
    highlights: [
      "Wander the car-free streets of the ancient town",
      "Commission custom tailored clothing",
      "Take a bicycle tour to Tra Que village"
    ],
    bestTimeToVisit: 'February to August'
  },
  {
    _id: 'dest-phongnha',
    _type: 'destination',
    name: 'Phong Nha',
    slug: { _type: 'slug', current: 'phong-nha' },
    image: '/images/dest_phongnha_cave.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "A national park holding some of the world's largest caves, underground rivers, and untouched tropical jungles." }]
      }
    ],
    highlights: [
      "Explore the massive chambers of Paradise Cave",
      "Take a boat ride into Phong Nha water cave",
      "Zipline and mudbath inside Dark Cave"
    ],
    bestTimeToVisit: 'February to August'
  },
  {
    _id: 'dest-dalat',
    _type: 'destination',
    name: 'Da Lat',
    slug: { _type: 'slug', current: 'da-lat' },
    image: '/images/trip_bike_rice_paddies.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "The city of eternal spring, nestled in the southern highlands, famous for its pine forests, French villas, and cool mountain climate." }]
      }
    ],
    highlights: [
      "Visit beautiful colonial-era villas",
      "Explore local flower farms and coffee plantations",
      "Hike through lush pine forests"
    ],
    bestTimeToVisit: 'November to March'
  },
  {
    _id: 'dest-hcmc',
    _type: 'destination',
    name: 'Ho Chi Minh City',
    slug: { _type: 'slug', current: 'ho-chi-minh-city' },
    image: '/images/tour_saigon_vespa_night.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "Formerly Saigon, this buzzing economic metropolis blends modern skyscrapers with historic French landmarks and vibrant street markets." }]
      }
    ],
    highlights: [
      "Explore the War Remnants Museum & Central Post Office",
      "Vespa evening street food tour of local districts",
      "Half-day excursion to the historic Cu Chi Tunnels"
    ],
    bestTimeToVisit: 'November to April'
  },
  {
    _id: 'dest-mekong',
    _type: 'destination',
    name: 'Mekong Delta',
    slug: { _type: 'slug', current: 'mekong-delta' },
    image: '/images/dest_mekong_canal.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "Vietnam's rice bowl, a vast labyrinth of rivers, canals, fruit orchards, and floating markets reflecting traditional river life." }]
      }
    ],
    highlights: [
      "Visit the Cai Rang floating market at sunrise",
      "Cruise narrow palm-shaded canals on a wooden sampan",
      "Cycle through local fruit orchards on rustic paths"
    ],
    bestTimeToVisit: 'November to April'
  }
];

async function publishAllDestinations() {
  console.log('Clearing old destinations in Sanity...');
  const oldDocs = await client.fetch('*[_type == "destination"]{ _id }');
  for (const doc of oldDocs) {
    await client.delete(doc._id);
    console.log(`Deleted old destination: ${doc._id}`);
  }

  console.log('Publishing 11 destinations to Sanity...');
  for (const doc of destinations) {
    await client.createOrReplace(doc);
    console.log(`Created destination: ${doc.name}`);
  }
  console.log('Successfully published all 11 destinations!');
}

publishAllDestinations().catch(console.error);
