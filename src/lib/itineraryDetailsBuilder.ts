import { Itinerary, TimelineItem, Accommodation } from '@/sanity/types';

export interface RoutePoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: 'jade' | 'gold' | 'red';
  region: string;
  hotel: string;
  hotelDesc: string;
}

export interface DayTimelineDetail {
  dayNumber: number;
  title: string;
  description: string;
  region: 'North' | 'Central' | 'South';
  phase: string;
  hotelName: string;
  meals: string;
  tags: string[];
  insiderNotes: string;
  hourlySchedule: { time: string; activity: string; desc: string }[];
}

const DESTINATION_POINTS: Record<string, RoutePoint> = {
  hanoi: { id: 'hanoi', name: 'Hanoi', lat: 21.0285, lng: 105.8542, color: 'jade', region: 'North', hotel: 'Sofitel Legend Metropole Hanoi', hotelDesc: 'Historic French colonial hotel in the heart of Hanoi.' },
  halong: { id: 'halong', name: 'Ha Long Bay', lat: 20.9101, lng: 107.1839, color: 'jade', region: 'North', hotel: 'Orchid Cruises Luxury Charter', hotelDesc: 'Ultra-luxury private charter cruise through Halong and Lan Ha Bay.' },
  sapa: { id: 'sapa', name: 'Sapa', lat: 22.3364, lng: 103.8438, color: 'jade', region: 'North', hotel: 'Topas Ecolodge', hotelDesc: 'Stunning mountain ecolodge perched on a scenic hilltop.' },
  hue: { id: 'hue', name: 'Hue', lat: 16.4637, lng: 107.5908, color: 'gold', region: 'Central', hotel: 'Azerai La Residence Hue', hotelDesc: 'Elegant Art Deco mansion overlooking the Perfume River.' },
  hoian: { id: 'hoian', name: 'Hoi An', lat: 15.8801, lng: 108.3380, color: 'gold', region: 'Central', hotel: 'Four Seasons Resort The Nam Hai', hotelDesc: 'Ultra-luxury beachfront villa resort near the ancient town.' },
  danang: { id: 'danang', name: 'Da Nang', lat: 16.0544, lng: 108.2022, color: 'gold', region: 'Central', hotel: 'InterContinental Danang Sun Peninsula Resort', hotelDesc: 'Spectacular luxury resort nestled in the hills of Son Tra Peninsula.' },
  nhatrang: { id: 'nhatrang', name: 'Nha Trang', lat: 12.2581, lng: 109.1967, color: 'red', region: 'South', hotel: 'Six Senses Ninh Van Bay', hotelDesc: 'Exclusive beachfront villas built directly into ocean boulders.' },
  saigon: { id: 'saigon', name: 'Ho Chi Minh City', lat: 10.8231, lng: 106.6297, color: 'red', region: 'South', hotel: 'The Reverie Saigon', hotelDesc: 'Opulent luxury hotel in the heart of District 1.' },
  mekong: { id: 'mekong', name: 'Mekong Delta', lat: 10.0452, lng: 105.7469, color: 'red', region: 'South', hotel: 'Azerai Can Tho', hotelDesc: 'Private islet sanctuary surrounded by the Mekong River.' },
  phuquoc: { id: 'phuquoc', name: 'Phu Quoc', lat: 10.2899, lng: 103.9840, color: 'red', region: 'South', hotel: 'Regent Phu Quoc', hotelDesc: 'Ultra-luxury pool villa beachfront resort.' },
  camranh: { id: 'camranh', name: 'Vinh Hy Bay', lat: 11.9056, lng: 109.1583, color: 'red', region: 'South', hotel: 'Amanoi', hotelDesc: 'Ultra-exclusive luxury resort overlooking Vinh Hy Bay.' }
};

export function getRoutePoints(itinerary: Itinerary): RoutePoint[] {
  const points: RoutePoint[] = [];
  const added = new Set<string>();

  const checkText = (text: string) => {
    const t = text.toLowerCase();
    if ((t.includes('hanoi') || t.includes('ha noi')) && !added.has('hanoi')) {
      points.push(DESTINATION_POINTS.hanoi);
      added.add('hanoi');
    }
    if ((t.includes('halong') || t.includes('ha long') || t.includes('lan ha')) && !added.has('halong')) {
      points.push(DESTINATION_POINTS.halong);
      added.add('halong');
    }
    if (t.includes('sapa') && !added.has('sapa')) {
      points.push(DESTINATION_POINTS.sapa);
      added.add('sapa');
    }
    if (t.includes('hue') && !added.has('hue')) {
      points.push(DESTINATION_POINTS.hue);
      added.add('hue');
    }
    if ((t.includes('hoi an') || t.includes('hoian')) && !added.has('hoian')) {
      points.push(DESTINATION_POINTS.hoian);
      added.add('hoian');
    }
    if ((t.includes('da nang') || t.includes('danang')) && !added.has('danang')) {
      points.push(DESTINATION_POINTS.danang);
      added.add('danang');
    }
    if ((t.includes('nha trang') || t.includes('nhatrang') || t.includes('ninh van')) && !added.has('nhatrang')) {
      points.push(DESTINATION_POINTS.nhatrang);
      added.add('nhatrang');
    }
    if ((t.includes('saigon') || t.includes('ho chi minh') || t.includes('hcmc')) && !added.has('saigon')) {
      points.push(DESTINATION_POINTS.saigon);
      added.add('saigon');
    }
    if ((t.includes('mekong') || t.includes('can tho') || t.includes('cantho')) && !added.has('mekong')) {
      points.push(DESTINATION_POINTS.mekong);
      added.add('mekong');
    }
    if ((t.includes('phu quoc') || t.includes('phuquoc')) && !added.has('phuquoc')) {
      points.push(DESTINATION_POINTS.phuquoc);
      added.add('phuquoc');
    }
    if ((t.includes('vinh hy') || t.includes('cam ranh') || t.includes('amanoi')) && !added.has('camranh')) {
      points.push(DESTINATION_POINTS.camranh);
      added.add('camranh');
    }
  };

  // 1. Scan timeline titles
  (itinerary.timeline || []).forEach((item) => {
    if (item.title) checkText(item.title);
  });

  // 2. Scan itinerary title if empty
  if (points.length === 0 && itinerary.title) {
    checkText(itinerary.title);
  }

  // 3. Scan timeline description if still empty
  if (points.length === 0) {
    (itinerary.timeline || []).forEach((item) => {
      if (item.description && item.description[0]?.children?.[0]?.text) {
        checkText(item.description[0].children[0].text);
      }
    });
  }

  // Fallbacks based on typical tours
  if (points.length === 0) {
    if (itinerary.slug?.current.includes('romance')) {
      return [DESTINATION_POINTS.camranh, DESTINATION_POINTS.phuquoc];
    }
    if (itinerary.slug?.current.includes('culinary')) {
      return [DESTINATION_POINTS.hanoi, DESTINATION_POINTS.hoian, DESTINATION_POINTS.nhatrang];
    }
    return [DESTINATION_POINTS.hanoi, DESTINATION_POINTS.halong, DESTINATION_POINTS.hue, DESTINATION_POINTS.hoian, DESTINATION_POINTS.camranh];
  }

  return points;
}

export function generateDayByDayTimeline(itinerary: Itinerary): DayTimelineDetail[] {
  const points = getRoutePoints(itinerary);
  const totalDays = itinerary.duration || 15;
  const dayList: DayTimelineDetail[] = [];

  // Determine regions visited
  const hasNorth = points.some(p => p.region === 'North');
  const hasCentral = points.some(p => p.region === 'Central');
  const hasSouth = points.some(p => p.region === 'South');

  // Distribute days across regions
  const activeRegions: ('North' | 'Central' | 'South')[] = [];
  if (hasNorth) activeRegions.push('North');
  if (hasCentral) activeRegions.push('Central');
  if (hasSouth) activeRegions.push('South');

  if (activeRegions.length === 0) activeRegions.push('North');

  const daysPerRegion = Math.ceil(totalDays / activeRegions.length);

  for (let d = 1; d <= totalDays; d++) {
    // Determine region for this day
    const regionIdx = Math.min(Math.floor((d - 1) / daysPerRegion), activeRegions.length - 1);
    const region = activeRegions[regionIdx];

    // Find destination in this region
    const dest = points.find(p => p.region === region) || DESTINATION_POINTS.hanoi;

    let phase = 'Phase 1: Northern Highlands & Wonders';
    if (region === 'Central') phase = 'Phase 2: Central Imperial Heritage';
    if (region === 'South') phase = 'Phase 3: Southern Tropical Pulse';

    // Activity tags
    const activityPool = {
      North: [
        ['Michelin Dining', 'Cyclo Heritage Tour', 'Private Water Puppets'],
        ['VIP Catamaran Sailing', 'Hidden Caves Kayaking', 'Sunset Champagne'],
        ['Hilltribe Trekking', 'Bespoke Ecolodge Stay', 'Mountain Sunrise']
      ],
      Central: [
        ['Imperial Tombs Tour', 'Perfume River Cruise', 'Royal Feast'],
        ['Organic Farming', 'Lantern Making Workshop', 'Beachfront Bliss'],
        ['UNESCO Heritage Walk', 'Bespoke Tailoring', 'Cycling Excursion']
      ],
      South: [
        ['Floating Markets', 'Private Sampan Cruise', 'Local Artisans'],
        ['Vespa Night Crawl', 'Skyline Cocktails', 'Heritage Landmarks'],
        ['Couples Spa Ritual', 'Beachfront Barbecue', 'Private Yacht Snorkeling']
      ]
    };

    const tags = activityPool[region][(d - 1) % 3];

    // Meals
    let meals = 'B, L, D';
    if (d === 1) meals = 'D'; // Arrive day
    else if (d === totalDays) meals = 'B'; // Depart day

    // Dynamic descriptions based on day
    let title = `${dest.name} Discovery & Leisure`;
    let description = `Enjoy a luxury private tour around the historic sights of ${dest.name}, culminating in a bespoke evening dinner curated by local chefs.`;
    let insiderNotes = `Ask our private driver for the scenic route to avoid highway traffic.`;

    if (d === 1) {
      title = `Arrival in ${dest.name} - Airport Fast-Track VIP Check-in`;
      description = `Land in Vietnam where you are met at the aircraft door by our hostess and fast-tracked through VIP immigration. Board your private vehicle transfer to the luxury ${dest.hotel}.`;
      insiderNotes = `Keep your flight details updated. Our private host coordinates the landing time in real-time.`;
    } else if (d === totalDays) {
      title = `Departure from ${dest.name}`;
      description = `Morning at leisure to enjoy the resort's premium spa or infinity pool. Transfer by private vehicle to the airport for your onward international flight back to the UK.`;
      insiderNotes = `Late check-out is pre-arranged subject to flight schedule.`;
    } else {
      if (region === 'North') {
        if (dest.id === 'hanoi') {
          title = `Hanoi Old Quarter Heritage & Art Tour`;
          description = `Explore Hanoi's ancient guild streets by vintage sidecar. Visit private art galleries, talk with local curators, and savor a refined lunch at a Michelin-selected Vietnamese townhouse.`;
          insiderNotes = `Try the famous egg coffee at a quiet rooftop spot overlooking Hoan Kiem Lake. Ask your guide for the secret entrance.`;
        } else if (dest.id === 'halong') {
          title = `Lan Ha Bay & Halong Bay Luxury Cruise`;
          description = `Board your private charter yacht. Cruise past towering limestone karsts, kayak through the low arch of Luon Cave into a hidden monkey-inhabited lagoon, and dine under the stars on deck.`;
          insiderNotes = `Sunrise Tai Chi on the sundeck is highly recommended. The mist rising over the karsts is magical.`;
        }
      } else if (region === 'Central') {
        if (dest.id === 'hoian') {
          title = `Hoi An Ancient Town Artistry & Cooking`;
          description = `Join a local chef at an organic farm to harvest ingredients, followed by a private cooking masterclass. Stroll the lantern-lit streets of the ancient town in the evening.`;
          insiderNotes = `The best local tailors can deliver custom pieces in 24 hours. Your guide will introduce you to a master tailor.`;
        } else if (dest.id === 'hue') {
          title = `Forbidden Purple City & Royal Garden Feast`;
          description = `Explore the Royal Palace ruins with private access to restricted sectors. Dine on a multi-course royal feast inside a beautifully restored garden home of a royal descendant.`;
          insiderNotes = `The sunset over the Perfume River is best viewed from the terrace of La Residence.`;
        }
      } else {
        if (dest.id === 'camranh') {
          title = `Amanoi Cliffside Seclusion & Wellness`;
          description = `A day dedicated to peace. Enjoy a personalized holistic spa therapy, join a private yoga session on the floating lake pavilion, and savor a private beach barbecue.`;
          insiderNotes = `Ask your host to set up a private sunset cocktail session on the cliffs overlooking Vinh Hy Bay.`;
        } else if (dest.id === 'phuquoc') {
          title = `Private Catamaran Charter & Sunset Snorkelling`;
          description = `Charter the resort's private catamaran to sail around Phu Quoc's southern islands. Swim in turquoise waters, snorkel over pristine coral gardens, and enjoy champagne on board.`;
          insiderNotes = `Phu Quoc black pepper is world-renowned. Visit an organic farm to pick up gifts for friends back in the UK.`;
        }
      }
    }

    // Hourly Schedule
    const hourlySchedule = [
      { time: '09:00 AM', activity: 'Private Host Briefing', desc: `Meet your specialist guide in the hotel lobby for a day itinerary alignment.` },
      { time: '10:30 AM', activity: 'VIP Guided Expedition', desc: `Enter historic landmarks via priority skip-the-line access.` },
      { time: '01:00 PM', activity: 'Gourmet Lunch Experience', desc: `Dine at a handpicked boutique restaurant specializing in refined local cuisine.` },
      { time: '03:30 PM', activity: 'Hands-on Cultural Artistry', desc: `Engage with master craftsmen in a private workshop setting.` },
      { time: '07:30 PM', activity: 'Signature Culinary Dinner', desc: `Relish a tasting menu crafted by executive chefs with wine pairings.` }
    ];

    dayList.push({
      dayNumber: d,
      title,
      description,
      region,
      phase,
      hotelName: dest.hotel,
      meals,
      tags,
      insiderNotes,
      hourlySchedule
    });
  }

  return dayList;
}
