import { Accommodation, Specialist, Itinerary } from './types';

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
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    websiteUrl: 'https://phuquoc.regenthotels.com'
  }
];

export const mockSpecialists: Specialist[] = [
  {
    _id: 'spec-1',
    name: 'Alice Mercer',
    slug: { current: 'alice-mercer' },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    role: 'Senior Indochina Specialist',
    email: 'alice.mercer@vietnamtour.co.uk',
    phone: '+44 (0) 20 7845 9210',
    bio: [
      {
        _key: 'b1',
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Alice has spent over 12 years traveling through Southeast Asia, with a particular love for Vietnam. She has mapped out hidden cycling routes in Hue, sampled private chef tables in Hanoi, and stayed at every premium property in the country. Alice specializes in planning immersive, multi-generational family journeys and private luxury escapes.'
          }
        ]
      }
    ],
    favoriteDestinations: ['Hoi An Ancient Town', 'Sapa Highlands', 'Vinh Hy Bay (Amanoi)'],
    expertTips: [
      'Take a private sidecar tour through the streets of Hanoi at dusk to experience the city like a local, followed by an exclusive dining experience at a restored colonial villa.',
      'For the ultimate beach privacy, schedule your stay at Amanoi in Ninh Thuan, and ask for Pavilion 18 for the most breathtaking sunrise views over the bay.'
    ]
  },
  {
    _id: 'spec-2',
    name: 'James Harrison',
    slug: { current: 'james-harrison' },
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80',
    role: 'Vietnam & Expedition Consultant',
    email: 'james.harrison@vietnamtour.co.uk',
    phone: '+44 (0) 20 7845 9214',
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
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1509060464153-44667396260f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545638191-4df6e250f288?auto=format&fit=crop&w=1200&q=80'
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
  }
];
