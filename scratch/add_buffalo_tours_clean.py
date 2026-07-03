import re

with open('src/sanity/mockData.ts', 'r') as f:
    content = f.read()

# Define tours using double quotes for all string literals to avoid quote conflicts
new_tours_code = """
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
      "/images/vietnamtour_phu_quoc_beach.png",
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
"""

# Let's find the closing of the last array item before the closing bracket of mockItineraries
target_pattern = r'featured: true\s*\}\s*\n\];'
replacement_pattern = 'featured: true\\n  },\\n' + new_tours_code.replace('\\', '\\\\').replace('\n', '\\n') + '\\n];'

content_modified = re.sub(target_pattern, replacement_pattern, content)

with open('src/sanity/mockData.ts', 'w') as f:
    f.write(content_modified)

print("Tours appended cleanly with double quotes!")
