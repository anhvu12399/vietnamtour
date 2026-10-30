import { Itinerary } from '@/sanity/types';

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
  dayLabel?: string;
  title: string;
  description: string;
  region: 'North' | 'Central' | 'South' | 'Route';
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


  return points;
}

function blockText(value: unknown): string {
  if (!Array.isArray(value)) return '';
  return value.map((block: unknown) => {
    if (!block || typeof block !== 'object' || !('children' in block) || !Array.isArray(block.children)) return '';
    return block.children.map((span: unknown) => span && typeof span === 'object' && 'text' in span && typeof span.text === 'string' ? span.text : '').join('');
  }).filter(Boolean).join('\n\n');
}

export function generateDayByDayTimeline(itinerary: Itinerary): DayTimelineDetail[] {
  // Render only documented days. Never manufacture activities, hotels or VIP access.
  return (itinerary.timeline || []).map((item, index) => {
    const points = getRoutePoints({ ...itinerary, title: '', timeline: [item] });
    const region = (points[0]?.region || 'Route') as DayTimelineDetail['region'];
    return {
      dayNumber: index + 1, dayLabel: item.dayRange,
      title: item.title, description: blockText(item.description), region,
      phase: region === 'Route' ? 'Your itinerary' : `${region} Vietnam`,
      hotelName: typeof item.accommodation === 'string' ? item.accommodation : item.accommodation?.name || '',
      meals: '', tags: [], insiderNotes: '', hourlySchedule: [],
    };
  });
}
