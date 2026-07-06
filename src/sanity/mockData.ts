import { Accommodation, Specialist, Itinerary, Destination } from './types';

export const mockAccommodations: Accommodation[] = [
  {
    _id: 'accom-1',
    name: 'Amanoi',
    slug: { current: 'amanoi-ninh-thuan' },
    location: 'Vinh Hy Bay, Ninh Thuan Province',
    rating: '5-Star Ultra-Luxury',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Claiming a spectacular stretch of Vietnam’s mountainous coastline within Nui Chua National Park, Amanoi is a natural sanctuary overlooking Vinh Hy Bay. Meaning "place of peace," the resort fits seamlessly into the pristine landscape, offering private pavilions, multi-bedroom villas, and an exceptional wellness spa.'
          }
        ]
      }
    ],
    features: ['Private Plunge Pool', 'Personal Butler Service', 'Hilltop Infinity Pool', 'Private Beach Club', 'World-Class Spa Pavilions'],
    gallery: [
      '/images/hotel_amanoi.png'
    ],
    websiteUrl: 'https://www.aman.com/resorts/amanoi'
  },
  {
    _id: 'accom-2',
    name: 'Six Senses Ninh Van Bay',
    slug: { current: 'six-senses-ninh-van-bay' },
    location: 'Ninh Van Bay, Nha Trang',
    rating: '5-Star Luxury Eco-Resort',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Six Senses Ninh Van Bay sits on a dramatic bay that gives the feeling of being on an island. Impressive rock formations, a white sand beach, and towering mountains behind add to the fantasy. The resort offers spacious pool villas nestled on the beach, perched over water, or hidden in the tropical jungle.'
          }
        ]
      }
    ],
    features: ['Overwater & Hilltop Villas', 'Wine Cave Dining', 'Pristine Coral Reef Access', 'Award-winning Wellness Spa', 'Eco-friendly Sustainability Philosophy'],
    gallery: [
      '/images/hotel_six_senses.png'
    ],
    websiteUrl: 'https://www.sixsenses.com/en/resorts/ninh-van-bay'
  },
  {
    _id: 'accom-3',
    name: 'Sofitel Legend Metropole Hanoi',
    slug: { current: 'sofitel-legend-metropole-hanoi' },
    location: 'Hoan Kiem, Hanoi',
    rating: '5-Star Historic Palace',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A prominent landmark in the heart of Hanoi since 1901, the Sofitel Legend Metropole Hanoi has a long-standing history of hosting royalty, heads of state, and legendary writers. Blending French colonial grandeur with neo-classical elegance, this award-winning heritage hotel features luxurious rooms, Michelin-recommended dining, and a hidden wartime bunker.'
          }
        ]
      }
    ],
    features: ['Historic French-Colonial Wing', 'Michelin-selected Restaurant', 'Bespoke Sommelier Service', 'Heated Outdoor Pool', 'Private Historical Bunker Tour'],
    gallery: [
      '/images/hotel_metropole.png'
    ],
    websiteUrl: 'https://all.accor.com/hotel/1555/index.en.shtml'
  },
  {
    _id: 'accom-4',
    name: 'Regent Phu Quoc',
    slug: { current: 'regent-phu-quoc' },
    location: 'Long Beach, Phu Quoc Island',
    rating: '5-Star Modern Ultra-Luxury',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'An ultra-luxury beachfront sanctuary located on Phu Quoc’s tranquil Long Beach, Regent Phu Quoc offers a stunning mix of modern design and Vietnamese hospitality. The resort is designed to be a personal haven, featuring massive suites and pool villas, private lagoons, and unparalleled dining experiences curated by global chefs.'
          }
        ]
      }
    ],
    features: ['Private Lagoon Villas', 'Ocean View Sky Pools', 'Omakase & Fine Dining', 'Private Luxury Catamaran', 'Interactive Kids Club'],
    gallery: [
      '/images/hotel_regent.png'
    ],
    websiteUrl: 'https://phuquoc.regenthotels.com'
  },
  {
    _id: 'accom-5',
    name: 'Four Seasons Resort The Nam Hai',
    slug: { current: 'four-seasons-the-nam-hai-hoi-an' },
    location: 'Ha My Beach, Hoi An',
    rating: '5-Star Ultra-Luxury',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A luxurious beachfront oasis along the pristine Ha My Beach, Four Seasons Resort The Nam Hai offers a seamless portal to three UNESCO World Heritage sites. The resort features elegant pool villas, tranquil infinity pools, and a world-class spa floating on a lotus-filled lagoon.'
          }
        ]
      }
    ],
    features: ['Private Beachfront Villas', 'Three Tiered Infinity Pools', 'Heart of the Earth Spa', 'Michelin-Caliber Dining', 'Bespoke Cooking Academy'],
    gallery: [
      '/images/hotel_nam_hai.png'
    ],
    websiteUrl: 'https://www.fourseasons.com/hoian/'
  },
  {
    _id: 'accom-6',
    name: 'Capella Hanoi',
    slug: { current: 'capella-hanoi' },
    location: 'Hoan Kiem, Hanoi',
    rating: '5-Star Boutique Luxury',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Located just steps from the iconic Hanoi Opera House, Capella Hanoi is a boutique masterpiece designed by Bill Bensley. Celebrating the glamorous opera era of the 1920s, the hotel features individual suites themed after opera legends, a Michelin-starred restaurant, and an opulent indoor pool.'
          }
        ]
      }
    ],
    features: ['Bill Bensley Art-Deco Suites', 'Michelin-Starred Hibana Restaurant', 'Auriga Spa & Royal Pool', 'Capella Culturist Service', 'Historical Opera Memorabilia'],
    gallery: [
      '/images/hotel_capella.png'
    ],
    websiteUrl: 'https://capellahotels.com/en/capella-hanoi'
  }
];

export const mockSpecialists: Specialist[] = [
  {
    _id: 'spec-1',
    name: 'Alice Mercer',
    slug: { current: 'alice-mercer' },
    image: '/images/specialist_alice.png',
    role: 'Senior Indochina Specialist',
    email: 'alice.mercer@vietnamtour.co.uk',
    phone: '+84 988600388',
    bio: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Alice has spent over 12 years travelling through Southeast Asia, with a particular love for Vietnam. She has mapped out hidden cycling routes in Hue, sampled private chef tables in Hanoi, and stayed at every premium property in the country. Alice specialises in planning immersive, multi-generational family journeys and private luxury escapes.'
          }
        ]
      }
    ],
    favoriteDestinations: ['Hoi An Ancient Town', 'Sapa Highlands', 'Vinh Hy Bay (Amanoi)'],
    expertTips: [
      'Take a private vintage sidecar tour through the streets of Hanoi at dusk to experience the city like a local, followed by an exclusive dining experience at a restored colonial villa.',
      'For the ultimate beach privacy, schedule your stay at Amanoi in Ninh Thuan, and ask for Pavilion 18 for the most breathtaking sunrise views over the bay.'
    ]
  },
  {
    _id: 'spec-2',
    name: 'James Harrison',
    slug: { current: 'james-harrison' },
    image: '/images/specialist_james.png',
    role: 'Vietnam & Expedition Consultant',
    email: 'james.harrison@vietnamtour.co.uk',
    phone: '+84 988600388',
    bio: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Having lived in Saigon (Ho Chi Minh City) for five years, James is our go-to expert for high-adrenaline adventure, private yacht expeditions in Halong Bay, and off-the-beaten-path cultural encounters. He works closely with local culinary historians to curate bespoke food expeditions that span the entire country.'
          }
        ]
      }
    ],
    favoriteDestinations: ['Mekong Delta Backwaters', 'Phong Nha Caves', 'Phu Quoc Marine Reserve'],
    expertTips: [
      'Instead of the standard tour boats in Halong Bay, charter a private luxury catamaran to the lesser-visited Lan Ha Bay, where you can kayak in complete solitude through hidden lagoons.',
      'The best way to see the Mekong Delta is by private luxury sampan, stopping at local orchards and private colonial estates for lunch.'
    ]
  }
];

export const mockDestinations: Destination[] = [
  {
    _id: 'dest-hanoi',
    name: 'Hanoi',
    slug: { current: 'hanoi' },
    image: '/images/vietnamtour_hanoi_colonial.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "Hanoi, the historic capital of Vietnam, is a captivating blend of East and West, combining traditional Sino-Vietnamese motifs with French colonial flair. As a city with over a thousand years of history, it stands as the cultural and political heart of the nation. Its tree-lined boulevards, busy Old Quarter streets, and unique colonial architecture create an atmosphere that is both nostalgic and dynamic." }]
      },
      {
        _key: 'b2',
        _type: 'block',
        children: [{ _type: 'span', text: "For discerning travelers, Hanoi offers an array of ultra-luxury boutique hotels, fine-dining restaurants serving refined Vietnamese cuisine, and private guided tours through its historic Old Quarter. Our local specialists recommend spending at least three days to fully immerse yourself in its unique atmosphere." }]
      },
      {
        _key: 'h1',
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: "Exclusive Local Experiences & Activities" }]
      },
      {
        _key: 'b3',
        _type: 'block',
        children: [{ _type: 'span', text: "• Private Historical Cyclo Ride: Wander through the labyrinth of the 36 guild streets of the Old Quarter, accompanied by a local historian who will share stories of ancient merchant guilds and architectural heritage." }]
      },
      {
        _key: 'b4',
        _type: 'block',
        children: [{ _type: 'span', text: "• Confucius Heritage: Visit the serene Temple of Literature, Vietnam's first national university built in 1070. Admire the stone steles dedicated to scholars and wander through its peaceful courtyard gardens." }]
      },
      {
        _key: 'b5',
        _type: 'block',
        children: [{ _type: 'span', text: "• Authentic Coffee Culture: Enjoy Hanoi's famous egg coffee (Ca Phe Trung) at a hidden rooftop café overlooking the mist-shrouded Hoan Kiem Lake, while watching locals practice Tai Chi at sunrise." }]
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
    name: 'Ha Long Bay',
    slug: { current: 'ha-long-bay' },
    image: '/images/dest_halong_limestone.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "Ha Long Bay, a UNESCO World Heritage Site in northeast Vietnam, is renowned for its emerald waters and thousands of towering limestone karsts topped by rainforests. Junk boat tours and sea kayak expeditions take visitors past islands named for their shapes, including Stone Dog and Teapot islets." }]
      },
      {
        _key: 'b2',
        _type: 'block',
        children: [{ _type: 'span', text: "For an unforgettable experience, we recommend embarking on a luxury 2-night or 3-night cruise on a boutique vessel. This allows you to sail deeper into the less-visited Bai Tu Long Bay or Lan Ha Bay, where the water is pristine and the scenery is peaceful." }]
      },
      {
        _key: 'h1',
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: "Signature Bay Activities" }]
      },
      {
        _key: 'b3',
        _type: 'block',
        children: [{ _type: 'span', text: "• Ultra-Luxury Junk Cruises: Sail on a classic hand-crafted wooden vessel, complete with private balconies, fine-dining restaurants, and sunrise Tai Chi classes on the sundeck." }]
      },
      {
        _key: 'b4',
        _type: 'block',
        children: [{ _type: 'span', text: "• Lagoon Kayaking: Paddle through Luon Cave, a low-hanging limestone archway, to enter a hidden circular lagoon surrounded by steep vertical cliffs inhabited by wild monkeys." }]
      },
      {
        _key: 'b5',
        _type: 'block',
        children: [{ _type: 'span', text: "• Panoramic Island Viewpoints: Hike up the stone steps of Ti Top Island to reach the summit pavilion, which offers an iconic 360-degree view of the karst-studded bay." }]
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
    name: 'Sapa',
    slug: { current: 'sapa' },
    image: '/images/dest_sapa_highland.png',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [{ _type: 'span', text: "Nestled in the Hoang Lien Son mountains of northwest Vietnam, Sapa is a premier trekking destination famous for its cascading golden rice terraces, misty mountain peaks, and rich cultural diversity. It overlooks the Muong Hoa Valley and stands in the shadow of Fansipan, Indochina's highest peak." }]
      },
      {
        _key: 'b2',
        _type: 'block',
        children: [{ _type: 'span', text: "The region is home to several ethnic minority groups, including the Black H'mong and Red Dzao. Traveling with a private local guide is highly recommended, as it supports the community and provides deep cultural insights into local weaving, agricultural traditions, and folklore." }]
      },
      {
        _key: 'h1',
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: "Top Highland Activities" }]
      },
      {
        _key: 'b3',
        _type: 'block',
        children: [{ _type: 'span', text: "• Guided Valley Trekking: Walk along narrow dirt tracks through cascading green and golden rice terraces, passing through tribal villages like Cat Cat, Lao Chai, and Ta Van." }]
      },
      {
        _key: 'b4',
        _type: 'block',
        children: [{ _type: 'span', text: "• Indigenous Homestays: Spend a night in a traditional stilt house with an ethnic minority family, enjoying home-cooked meals and learning about their daily way of life." }]
      },
      {
        _key: 'b5',
        _type: 'block',
        children: [{ _type: 'span', text: "• Fansipan Peak: Ascend Indochina's highest peak (3,143m) via a scenic three-cable gondola ride, which glides above the cloud-veiled valleys and rugged pine forests." }]
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
    name: 'Ninh Binh',
    slug: { current: 'ninh-binh' },
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
    name: 'Hue',
    slug: { current: 'hue' },
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
    name: 'Da Nang',
    slug: { current: 'da-nang' },
    image: '/images/dest_danang_beach_bridge.png',
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
    name: 'Hoi An',
    slug: { current: 'hoi-an' },
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
    name: 'Phong Nha',
    slug: { current: 'phong-nha' },
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
    name: 'Da Lat',
    slug: { current: 'da-lat' },
    image: '/images/dest_dalat_pine_villas.png',
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
    name: 'Ho Chi Minh City',
    slug: { current: 'ho-chi-minh-city' },
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
    name: 'Mekong Delta',
    slug: { current: 'mekong-delta' },
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

export const mockItineraries: Itinerary[] = [
  {
    _id: 'itinerary-1',
    title: 'The Grand Tour of Vietnam',
    slug: { current: 'the-grand-tour-of-vietnam' },
    duration: 14,
    priceFrom: 6950,
    intro: 'The definitive luxury journey from the colonial charm of Hanoi to the spectacular bays of the coast, culminating in the ultra-luxury sanctuary of Amanoi.',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This 14-day signature itinerary traverses the historic, cultural, and scenic highlights of Vietnam. Stay in the country’s most iconic, award-winning luxury hotels. Fly privately between destinations and enjoy curated VIP experiences: a private seaplane flight over Halong Bay, a personal historian guide in Hue, and private wellness therapies overlooking Vinh Hy Bay.'
          }
        ]
      }
    ],
    highlights: [
      'Private vintage sidecar tour of Hanoi and Michelin-selected dining.',
      'Overnight private charter cruise through Halong Bay and Lan Ha Bay.',
      'Exclusive access to the private Royal Tombs of Hue with a local historian.',
      'Bespoke lantern-making workshop with a master craftsman in Hoi An.',
      '4 nights of ultimate luxury and wellness at the prestigious Amanoi.'
    ],
    gallery: [
      '/images/vietnamtour_halong_yacht_luxury.png',
      '/images/vietnamtour_amanoi_villa.png',
      '/images/vietnamtour_hanoi_colonial.png'
    ],
    timeline: [
      {
        dayRange: 'Days 1-3',
        title: 'Hanoi - Colonial Splendour & Heritage',
        description: [
          {
            _key: 't1',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Arrive in Hanoi where you are met at the aircraft door and fast-tracked through customs. Transfer by luxury private vehicle to the legendary Sofitel Legend Metropole Hanoi. Spend your days exploring the Old Quarter with a private guide, tasting French-Vietnamese fusion, and enjoying a private water puppet show.'
              }
            ]
          }
        ],
        accommodation: mockAccommodations[2] // Sofitel Legend Metropole
      },
      {
        dayRange: 'Days 4-5',
        title: 'Halong Bay - Private Catamaran Cruise',
        description: [
          {
            _key: 't2',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Board a luxury private catamaran for a bespoke cruise in Lan Ha Bay and Halong Bay. Kayak into hidden caves, dine on freshly caught seafood prepared by your private chef on board, and watch the sunrise over the karst peaks.'
              }
            ]
          }
        ],
        accommodation: 'Private Luxury Cruise Vessel'
      },
      {
        dayRange: 'Days 6-9',
        title: 'Central Coast - Imperial Hue & Ancient Hoi An',
        description: [
          {
            _key: 't3',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Fly to Danang and transfer to the central coast. Visit the Imperial City of Hue with special permission to access parts of the Forbidden Purple City closed to the general public. Relish the slower pace of Hoi An, staying at a luxury resort along the beach, and exploring the ancient town with a local art expert.'
              }
            ]
          }
        ],
        accommodation: 'Four Seasons Resort The Nam Hai'
      },
      {
        dayRange: 'Days 10-14',
        title: 'Vinh Hy Bay - Ultimate Wellness at Amanoi',
        description: [
          {
            _key: 't4',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Fly south and transfer to Amanoi, one of the world’s most exclusive resort sanctuaries. Spend four days in complete tranquility. Enjoy personalized spa treatments, private yoga sessions on a pavilion floating on a lotus lake, and private catamaran cruises around the towering sea cliffs.'
              }
            ]
          }
        ],
        accommodation: mockAccommodations[0] // Amanoi
      }
    ],
    accommodations: [mockAccommodations[2], mockAccommodations[0]],
    specialist: mockSpecialists[0], // Alice Mercer
    featured: true
  },
  {
    _id: 'itinerary-2',
    title: 'Vietnamese Culinary & Culture Journey',
    slug: { current: 'vietnamese-culinary-and-culture-journey' },
    duration: 10,
    priceFrom: 5200,
    intro: 'A gourmet voyage through the culinary capitals of Vietnam, featuring cooking masterclasses with legendary chefs and stays in bespoke ecolodges.',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This curated culinary adventure is designed for discerning epicureans. Discover how French, Chinese, and royal court traditions have influenced modern Vietnamese gastronomy. Stay at historic hotels and high-end boutique lodges, taking private cooking classes, sampling exclusive street-food crawls, and relaxing in the bay of Nha Trang.'
          }
        ]
      }
    ],
    highlights: [
      'Chef-led street market food exploration in Hanoi.',
      'Private royal feast dining experience in a restored Hue garden home.',
      'Organic farming and cooking masterclass in Hoi An.',
      'Luxury dining in a private wine cave at Six Senses Ninh Van Bay.',
      'Craft beer and rooftop culinary crawl in Saigon by Vespa.'
    ],
    gallery: [
      '/images/vietnamtour_cave_dining.png',
      '/images/vietnamtour_mekong_sampan.png'
    ],
    timeline: [
      {
        dayRange: 'Days 1-3',
        title: 'Hanoi - Street Flavours & Masterclasses',
        description: [
          {
            _key: 't1',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Begin in Hanoi. Enjoy a private dinner at the home of a renowned local culinary historian, exploring the origins of Pho. Participate in a private morning masterclass at the Metropole cooking studio.'
              }
            ]
          }
        ],
        accommodation: mockAccommodations[2] // Metropole Hanoi
      },
      {
        dayRange: 'Days 4-6',
        title: 'Hoi An - Organic Gardens & Riverside Living',
        description: [
          {
            _key: 't2',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Travel to Hoi An. Visit an organic farming community to harvest fresh herbs. Master central Vietnamese specialties like White Rose dumplings under the guidance of a local master chef. Relax at a luxury riverside estate.'
              }
            ]
          }
        ],
        accommodation: 'Anantara Hoi An Resort'
      },
      {
        dayRange: 'Days 7-10',
        title: 'Ninh Van Bay - Coastal Bliss & Cave Dining',
        description: [
          {
            _key: 't3',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Fly to Nha Trang and boat across to Six Senses Ninh Van Bay. Spend your days snorkeling in crystal-clear waters and dining on custom organic dishes. Celebrate your final evening with a bespoke private dinner inside the resort’s natural volcanic rock wine cave.'
              }
            ]
          }
        ],
        accommodation: mockAccommodations[1] // Six Senses Ninh Van Bay
      }
    ],
    accommodations: [mockAccommodations[2], mockAccommodations[1]],
    specialist: mockSpecialists[1], // James Harrison
    featured: true
  },
  {
    _id: 'itinerary-3',
    title: 'Indochine Romance & Beach Escape',
    slug: { current: 'indochine-romance-and-beach-escape' },
    duration: 12,
    priceFrom: 7800,
    intro: 'The ultimate romantic honeymoon or anniversary getaway, staying in exclusive private pool villas on the shores of Vinh Hy Bay and Phu Quoc.',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Crafted for couples seeking seclusion, romance, and unrivaled luxury. Indulge in private beach barbecues, sunset luxury cruises, and couples massage therapies in Vietnam’s most remote and beautiful coastal corners. Stay in spectacular pool villas at Amanoi and Regent Phu Quoc, with every detail taken care of by private host teams.'
          }
        ]
      }
    ],
    highlights: [
      'Private sunset cruise in Lan Ha Bay with champagne and canapés.',
      'Romantic pool-side dining under the stars at Amanoi.',
      'Private luxury catamaran charter to Phu Quoc’s southern islands.',
      'Couples spa and holistic therapy sessions overlooking Vinh Hy Bay.',
      'Customized 24/7 butler service throughout the journey.'
    ],
    gallery: [
      '/images/vietnamtour_phu_quoc_beach.png',
      '/images/vietnamtour_amanoi_villa.png'
    ],
    timeline: [
      {
        dayRange: 'Days 1-4',
        title: 'Ninh Thuan Coastline - Secluded Cliffs of Amanoi',
        description: [
          {
            _key: 't1',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Land in Cam Ranh and take a private luxury transfer to Amanoi. Spend four days in your private pool villa. Enjoy a floating breakfast, a private guided hike to the rocky Goga Peak for a panoramic view of the coastline, and customized couples spa rituals.'
              }
            ]
          }
        ],
        accommodation: mockAccommodations[0] // Amanoi
      },
      {
        dayRange: 'Days 5-12',
        title: 'Phu Quoc - Beachfront Bliss at Regent Phu Quoc',
        description: [
          {
            _key: 't2',
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Fly to Phu Quoc Island and check into Regent Phu Quoc. Unwind in your massive Lagoon Pool Villa. Experience an evening cruise on the resort’s private luxury catamaran "Serenity", followed by a beach barbecue, and snorkel in the warm waters of the Gulf of Thailand.'
              }
            ]
          }
        ],
        accommodation: mockAccommodations[3] // Regent Phu Quoc
      }
    ],
    accommodations: [mockAccommodations[0], mockAccommodations[3]],
    specialist: mockSpecialists[0], // Alice Mercer
    featured: true
  },

  {
    _id: "itinerary-buffalo-1",
    title: "Highlights of Vietnam Tour",
    slug: { current: "highlights-of-vietnam-tour" },
    duration: 12,
    priceFrom: 4150,
    intro: "See the very best of Vietnam in just twelve days — a greatest-hits tour of this fascinating country. Discover historic Hanoi, trek Mai Chau, cruise Halong Bay, and explore imperial Hue, ancient Hoi An, vibrant Saigon and the Mekong Delta.",
    description: [
      {
        _key: "b1",
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Tour this fascinating country with a 12-day highlights of Vietnam tour. From the capital city Hanoi, to the ethnic minorities in Mai Chau, cruise Halong Bay and visit charming Hoi An. In the south, discover Saigon and take a cruise on the Mekong Delta."
          }
        ]
      }
    ],
    highlights: [
      "Soaking up the hustle and bustle of Hanoi’s Old Quarter with an evening street eats crawl.",
      "Trekking in Mai Chau and meeting welcoming ethnic minority Thai people.",
      "Spending time on a beautifully restored junk boat in romantic Halong Bay.",
      "Visiting the imperial city of Hue and enjoying a Perfume River boat cruise.",
      "Strolling through the lantern-filled streets and riverside promenade of Hoi An Ancient Town.",
      "Feeling the metropolitan pulse of Ho Chi Minh City and cruising the Mekong Delta."
    ],
    gallery: [
      "/images/vietnamtour_hanoi_colonial.png",
      "/images/hero_halong_bay.png",
      "/images/hero_hoian.png"
    ],
    timeline: [
      {
        dayRange: "Day 1",
        title: "Arrive in Hanoi - Evening Street Eats",
        description: [
          {
            _key: "t1",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Welcome to Vietnam! Meet with your guide at the airport and transfer to your hotel. In the evening, head on a culinary adventure sampling street food in the Old Quarter. Start at Bia Hoi Corner to sample local draft beer, then continue through narrow streets tasting beef skewers, woks, noodle dishes and dessert at Hanoi’s best-known ice-cream parlour."
              }
            ]
          }
        ],
        accommodation: "Sofitel Legend Metropole Hanoi"
      },
      {
        dayRange: "Day 2",
        title: "Hanoi Heritage & Culture Tour",
        description: [
          {
            _key: "t2",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Begin your journey to the highlights of Hanoi, starting with the Ho Chi Minh Mausoleum. Next, head to the 1000-year-old Temple of Literature. Dine on a traditional Vietnamese lunch at Home Restaurant in Truc Bach Lake. Spend the afternoon walking through the Old Quarter's 36 streets, sip Vietnamese coffee overlooking Hoan Kiem Lake, visit Ngoc Son Temple, and enjoy a traditional water puppet show."
              }
            ]
          }
        ],
        accommodation: "Sofitel Legend Metropole Hanoi"
      },
      {
        dayRange: "Day 3",
        title: "Hanoi to Mai Chau Valley Escape",
        description: [
          {
            _key: "t3",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Depart Hanoi for a scenic 4-hour drive to the beautiful Mai Chau Valley. Arrive at Mai Chau Lodge, enjoy lunch, then take a relaxing walk to the Thai ethnic minority villages of Pom Coong and Lac. Explore the natural Mo Luong Cave and enjoy an evening dinner followed by traditional hill tribe dancing."
              }
            ]
          }
        ],
        accommodation: "Mai Chau Lodge"
      },
      {
        dayRange: "Day 4",
        title: "Mai Chau Valley Biking - Return to Hanoi",
        description: [
          {
            _key: "t4",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Start a refreshing valley biking tour passing through charming local villages, lush rice paddies and peaceful countryside. Get to watch traditional farming up close and peek into local stilt houses. Return to the lodge to refresh before transferring back to Hanoi in the late afternoon."
              }
            ]
          }
        ],
        accommodation: "Sofitel Legend Metropole Hanoi"
      },
      {
        dayRange: "Day 5",
        title: "Halong Bay Luxury Junk Boat Cruise",
        description: [
          {
            _key: "t5",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Travel from Hanoi to the seaside port of Halong Bay. Board the L'Azalee Deluxe junk boat, cruising past the towering limestone karsts. Visit a local Pearl Farm, kayak in the secluded Kiem Lam Bay within Cat Ba National Park, and enjoy a Vietnamese cooking demonstration from the chef as the sun sets."
              }
            ]
          }
        ],
        accommodation: "L'Azalee Deluxe Cruise Junk"
      },
      {
        dayRange: "Day 6",
        title: "Halong Bay - Transfer to Hanoi - Fly to Hue",
        description: [
          {
            _key: "t6",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Motor towards Surprise Cave, the biggest and most spectacular cave in Halong Bay. Explore its massive limestone chambers. Return to the port and transfer to Hanoi airport for an evening flight to the imperial city of Hue. Meet your guide in Hue and check in to your hotel."
              }
            ]
          }
        ],
        accommodation: "Azerai La Residence Hue"
      },
      {
        dayRange: "Day 7",
        title: "Hue Imperial City & Royal Tombs",
        description: [
          {
            _key: "t7",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Float down the peaceful Perfume River by boat. Visit the majestic royal tombs of Emperor Khai Dinh and Minh Mang. Feast on a traditional vegetarian lunch prepared by Buddhist nuns at Dong Thuyen Pagoda. In the afternoon, visit Thanh Tien paper flower village and Tha Om Garden House to meet its royal heritage owner."
              }
            ]
          }
        ],
        accommodation: "Azerai La Residence Hue"
      },
      {
        dayRange: "Day 8",
        title: "Hai Van Pass Coastal Drive - Hoi An Walking Tour",
        description: [
          {
            _key: "t8",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Drive south to Hoi An over the spectacular Hai Van Pass, the most scenic coastal road in Vietnam. In the afternoon, explore Hoi An Ancient Town on foot. Visit Chua Ong Pagoda, Phuc Kien Assembly Hall, the 200-year-old Tan Ky ancestral house, and the iconic 17th-century Japanese Covered Bridge. Conclude with a boat trip on the Thu Bon River."
              }
            ]
          }
        ],
        accommodation: "Anantara Hoi An Resort"
      },
      {
        dayRange: "Day 9",
        title: "Free Day in Hoi An Ancient Town",
        description: [
          {
            _key: "t9",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "A completely free day to relax and enjoy the resort, stroll the lantern-lit streets, visit a local tailor for custom boutique clothing, or cycle to the nearby An Bang beach."
              }
            ]
          }
        ],
        accommodation: "Anantara Hoi An Resort"
      },
      {
        dayRange: "Day 10",
        title: "Fly to Ho Chi Minh City - Historic Saigon Tour",
        description: [
          {
            _key: "t10",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Transfer to Danang airport for a flight to Saigon. Start your afternoon tour of Ho Chi Minh City with the War Remnants Museum and the Reunification Palace. Visit the Notre Dame Cathedral and Central Post Office built by Gustave Eiffel, walk down historic Dong Khoi street, and finish with a speedboat ride through the city's ancient canals."
              }
            ]
          }
        ],
        accommodation: "The Reverie Saigon"
      },
      {
        dayRange: "Day 11",
        title: "Mekong Delta Cruise on Le Jarai Teak Boat",
        description: [
          {
            _key: "t11",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Drive to Ben Tre in the Mekong Delta. Board a private boat winding through local canals, visit a brick factory and a home-made coconut processing plant. Hop on a local tuk-tuk (xe loi) to the pier, then board the beautiful teak cruise boat Le Jarai. Enjoy a 3-course lunch of Mekong delicacies on board before returning to Saigon."
              }
            ]
          }
        ],
        accommodation: "The Reverie Saigon"
      },
      {
        dayRange: "Day 12",
        title: "Depart from Ho Chi Minh City",
        description: [
          {
            _key: "t12",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Enjoy breakfast at your hotel before your private guide transfers you to Tan Son Nhat International Airport for your return flight home."
              }
            ]
          }
        ],
        accommodation: "None (Departure)"
      }
    ],
    accommodations: [mockAccommodations[2], mockAccommodations[1]],
    specialist: mockSpecialists[0],
    featured: true
  },
  {
    _id: "itinerary-buffalo-2",
    title: "Vietnam In-Depth Tour",
    slug: { current: "vietnam-in-depth-tour" },
    duration: 19,
    priceFrom: 7950,
    intro: "An extraordinary 19-day journey traversing the entire length of Vietnam at a leisurely pace. Discover imperial ruins, mountain escapes, historic cities, tropical coastlines, and local life.",
    description: [
      {
        _key: "b1",
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Travel Vietnam in-depth whilst encountering the very best the country has to offer. Over 19 days, travel North to South discovering Vietnam's bustling cities, colonial relics, and pristine nature."
          }
        ]
      }
    ],
    highlights: [
      "In-depth exploration of Hanoi on cyclos with local culinary crawls.",
      "Scenic overnight cruise through the magical limestone karsts of Halong Bay.",
      "Imperial heritage tours in Hue and cycling alongside rural lagoons.",
      "Experiencing Hoi An life, basket boats, and master lantern-making workshops.",
      "Savouring the tropical beaches of Nha Trang and the cool mountain air of Dalat.",
      "Cruising the Mekong Delta and uncovering the hidden historical spots of Saigon."
    ],
    gallery: [
      "/images/dest_sapa_highland.png",
      "/images/vietnamtour_mekong_sampan.png",
      "/images/vietnamtour_cave_dining.png"
    ],
    timeline: [
      {
        dayRange: "Days 1-3",
        title: "Hanoi - Arrival, Street eats & Essence of the Capital",
        description: [
          {
            _key: "t1",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Arrive in Hanoi and transfer to your hotel. Savor the famous Old Quarter street foods like Bia Hoi, barbecue skewers and local ice cream. Take a comprehensive city tour visiting Ho Chi Minh Mausoleum, Temple of Literature, and enjoy cyclo rides through the 36 guilds, West Lake, and a local market."
              }
            ]
          }
        ],
        accommodation: "Sofitel Legend Metropole Hanoi"
      },
      {
        dayRange: "Days 4-5",
        title: "Halong Bay - Overnight Luxury Cruise",
        description: [
          {
            _key: "t2",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Board L'Azalee wooden junk cruise through Halong Bay. Kayak into sea caves in Kiem Lam Bay, visit a Pearl Farm, watch cooking demonstrations and tour Surprise Cave, the largest cave in the bay, before returning to Hanoi."
              }
            ]
          }
        ],
        accommodation: "L'Azalee Deluxe Cruise Junk"
      },
      {
        dayRange: "Days 6-8",
        title: "Hue - Imperial Ruins & Lagunes",
        description: [
          {
            _key: "t3",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Fly to Hue. Tour the royal tombs of Emperor Khai Dinh and Minh Mang, cruise the Perfume River, and have a vegetarian lunch at Dong Thuyen Pagoda. Bike into Phuoc Tich Village to bake traditional cakes, see the 'City of Ghosts' tombs, and cruise Tam Giang lagoon."
              }
            ]
          }
        ],
        accommodation: "Azerai La Residence Hue"
      },
      {
        dayRange: "Days 9-11",
        title: "Hoi An - Coastal Pass, Food Tour & Countryside Life",
        description: [
          {
            _key: "t4",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Drive over Hai Van Pass to Hoi An. Embark on a street food crawl tasting White Rose, Banh Can, Cao Lau and satay. Take a walking tour of the Japanese Covered Bridge, Phuc Kien Assembly Hall and Thu Bon River. Cycle to Cam Thanh basket boat village and attend a master lantern-making class."
              }
            ]
          }
        ],
        accommodation: "Anantara Hoi An Resort"
      },
      {
        dayRange: "Days 12-13",
        title: "Nha Trang - Tropical Beach Paradise",
        description: [
          {
            _key: "t5",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Fly to Nha Trang beach paradise. Spend a free day enjoying the golden sand beaches, island hopping in the bay, visiting the historic Po Nagar Cham towers, or relaxing at the resort."
              }
            ]
          }
        ],
        accommodation: "Six Senses Ninh Van Bay"
      },
      {
        dayRange: "Days 14-15",
        title: "Dalat - Mountain Retreat & Cool Highlands",
        description: [
          {
            _key: "t6",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Take a scenic 4-hour mountain drive to Dalat, the City of Eternal Spring. Explore the French colonial villas, pine forests, cascading waterfalls, and enjoy the cool mountain breeze."
              }
            ]
          }
        ],
        accommodation: "Ana Mandara Villas Dalat Resort & Spa"
      },
      {
        dayRange: "Days 16-19",
        title: "Saigon & Mekong Delta - City Life & Departure",
        description: [
          {
            _key: "t7",
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Fly to Ho Chi Minh City. Savor a street food tour including rice paper pizza, banh xeo and snails. Explore Chinatown (Cho Lon), Binh Tay Market, War Remnants Museum, Reunification Palace, and Notre Dame. Cruise the Mekong Delta on Le Jarai teak boat. On Day 19, transfer to the airport for departure."
              }
            ]
          }
        ],
        accommodation: "The Reverie Saigon"
      }
    ],
    accommodations: [mockAccommodations[2], mockAccommodations[1]],
    specialist: mockSpecialists[0],
    featured: true
  }

];
