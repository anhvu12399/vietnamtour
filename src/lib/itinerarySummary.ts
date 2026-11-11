import type { Itinerary } from '@/sanity/types';
import type { RoutePoint } from '@/lib/itineraryDetailsBuilder';
import { commonsPhotoCredits, type CreditEntry } from '@/lib/photoCredits';

export interface ShortAnswerFact {
  label: string;
  value: string;
}

export interface ItineraryShortAnswer {
  directAnswer: string;
  facts: ShortAnswerFact[];
}

interface LocationRule {
  label: string;
  region: 'north' | 'highlands' | 'central' | 'south';
  pattern: RegExp;
  commonsFiles: string[];
}

const LOCATION_RULES: LocationRule[] = [
  {
    label: 'Sapa',
    region: 'highlands',
    pattern: /\bsapa\b|\bsa pa\b|\bfansipan\b/,
    commonsFiles: ['/images/commons/sapa-1.jpg', '/images/commons/sapa-2.jpg', '/images/commons/bacha-1.jpg'],
  },
  {
    label: 'Bac Ha Market',
    region: 'highlands',
    pattern: /\bbac ha\b/,
    commonsFiles: ['/images/commons/bacha-1.jpg', '/images/commons/sapa-1.jpg', '/images/commons/sapa-2.jpg'],
  },
  {
    label: 'Ha Giang',
    region: 'highlands',
    pattern: /\bha giang\b|\bdong van\b|\bma pi leng\b/,
    commonsFiles: ['/images/commons/hagiang-1.jpg', '/images/commons/sapa-2.jpg'],
  },
  {
    label: 'Da Bac and Mai Chau',
    region: 'highlands',
    pattern: /\bda bac\b|\bmai chau\b|\bhoa binh\b/,
    commonsFiles: ['/images/commons/maichau-1.jpg', '/images/commons/sapa-1.jpg'],
  },
  {
    label: 'Hanoi',
    region: 'north',
    pattern: /\bhanoi\b|\bha noi\b|\bold quarter\b|\bhoan kiem\b|\btemple of literature\b/,
    commonsFiles: ['/images/commons/hanoi-2.jpg', '/images/commons/hanoi-3.jpg', '/images/commons/hanoi-1.jpg'],
  },
  {
    label: 'Ha Long Bay',
    region: 'north',
    pattern: /\bha long\b|\bhalong\b|\blan ha\b|\bbai tu long\b|\blazalee\b/,
    commonsFiles: ['/images/commons/halong-1.jpg', '/images/commons/halong-2.jpg'],
  },
  {
    label: 'Ninh Binh (Trang An & Hoa Lu)',
    region: 'north',
    pattern: /\bninh binh\b|\btrang an\b|\bhoa lu\b|\btam coc\b/,
    commonsFiles: ['/images/commons/ninhbinh-1.jpg', '/images/commons/ninhbinh-2.jpg'],
  },
  {
    label: 'Phong Nha-Ke Bang',
    region: 'central',
    pattern: /\bphong nha\b|\bson doong\b|\bparadise cave\b|\bdark cave\b|\bkong\b/,
    commonsFiles: ['/images/commons/phongnha-1.jpg', '/images/commons/phongnha-2.jpg'],
  },
  {
    label: 'Hue',
    region: 'central',
    pattern: /\bhue\b|\bimperial citadel\b|\bperfume river\b/,
    commonsFiles: ['/images/commons/hue-1.jpg', '/images/commons/hue-2.jpg'],
  },
  {
    label: 'Da Nang',
    region: 'central',
    pattern: /\bda nang\b|\bdanang\b|\bmarble mountain\b|\bba na\b/,
    commonsFiles: ['/images/commons/danang-1.jpg', '/images/commons/danang-2.jpg'],
  },
  {
    label: 'My Son Sanctuary',
    region: 'central',
    pattern: /\bmy son\b/,
    commonsFiles: ['/images/commons/myson-1.jpg', '/images/commons/hoian-2.jpg'],
  },
  {
    label: 'Hoi An',
    region: 'central',
    pattern: /\bhoi an\b|\bhoian\b|\bthu bon\b|\btra que\b/,
    commonsFiles: ['/images/commons/hoian-2.jpg', '/images/commons/hoian-1.jpg', '/images/commons/hoian-3.jpg'],
  },
  {
    label: 'Da Lat',
    region: 'south',
    pattern: /\bda lat\b|\bdalat\b/,
    commonsFiles: ['/images/commons/dalat-1.jpg', '/images/commons/dalat-2.jpg'],
  },
  {
    label: 'Nha Trang',
    region: 'south',
    pattern: /\bnha trang\b|\bninh van\b/,
    commonsFiles: ['/images/commons/nhatrang-1.jpg', '/images/commons/ninhvanbay-1.jpg'],
  },
  {
    label: 'Vinh Hy Bay',
    region: 'south',
    pattern: /\bvinh hy\b|\bamanoi\b|\bcam ranh\b/,
    commonsFiles: ['/images/commons/vinhhy-1.jpg', '/images/commons/nhatrang-1.jpg'],
  },
  {
    label: 'Cu Chi Tunnels',
    region: 'south',
    pattern: /\bcu chi\b/,
    commonsFiles: ['/images/commons/cuchi-1.jpg', '/images/commons/saigon-1.jpg', '/images/commons/saigon-2.jpg'],
  },
  {
    label: 'Ho Chi Minh City',
    region: 'south',
    pattern: /\bho chi minh\b|\bsaigon\b|\bhcmc\b/,
    commonsFiles: ['/images/commons/saigon-1.jpg', '/images/commons/saigon-2.jpg'],
  },
  {
    label: 'Mekong Delta',
    region: 'south',
    pattern: /\bmekong\b|\bcai be\b|\bcan tho\b|\ble jarai\b|\bben tre\b/,
    commonsFiles: ['/images/commons/mekong-1.jpg', '/images/commons/mekong-2.jpg'],
  },
  {
    label: 'Phu Quoc',
    region: 'south',
    pattern: /\bphu quoc\b|\bphuquoc\b/,
    commonsFiles: ['/images/commons/phuquoc-1.jpg', '/images/commons/phuquoc-2.jpg'],
  },
];

function extractTimelineText(itinerary: Itinerary): string {
  const parts: string[] = [
    itinerary.slug?.current || '',
    itinerary.title || '',
    itinerary.destination?.name || '',
    itinerary.intro || '',
    ...(itinerary.highlights || []),
  ];
  for (const day of itinerary.timeline || []) {
    if (day.title) parts.push(day.title);
    if (typeof day.accommodation === 'string') parts.push(day.accommodation);
    else if (day.accommodation?.name) parts.push(day.accommodation.name);
    if (Array.isArray(day.description)) {
      for (const block of day.description) {
        if (block && typeof block === 'object' && 'children' in block && Array.isArray(block.children)) {
          for (const span of block.children) {
            if (span && typeof span === 'object' && 'text' in span && typeof span.text === 'string') {
              parts.push(span.text);
            }
          }
        }
      }
    }
  }
  return parts.join(' ').toLowerCase().replace(/[-_]/g, ' ');
}

function formatPlaceList(places: string[]): string {
  if (places.length === 0) return 'Vietnam';
  if (places.length === 1) return places[0];
  if (places.length === 2) return `${places[0]} and ${places[1]}`;
  return `${places.slice(0, -1).join(', ')}, and ${places[places.length - 1]}`;
}

function seasonWindowForRegions(regions: Set<LocationRule['region']>): string {
  const hasHighlands = regions.has('highlands');
  const hasNorth = regions.has('north') || hasHighlands;
  const hasCentral = regions.has('central');
  const hasSouth = regions.has('south');

  if (hasNorth && hasCentral && hasSouth) {
    return 'Nov–Apr overall (Feb–Apr gives the driest cross-country balance across North, Central and South Vietnam; Sept–Nov brings peak central rainfall).';
  }
  if (hasHighlands && !hasCentral && !hasSouth) {
    return 'Oct–Apr for cooler, drier mountain trails; Sept–Oct for golden rice harvests; Mar–May for clearer valley visibility.';
  }
  if (hasNorth && hasSouth && !hasCentral) {
    return 'Nov–Apr (dry season in southern Vietnam alongside cool, generally drier conditions across the north).';
  }
  if (hasNorth && hasCentral && !hasSouth) {
    return 'Feb–Apr (drier coastal conditions in Central Vietnam while the north stays mild and comfortable before summer rains).';
  }
  if (hasCentral && hasSouth && !hasNorth) {
    return 'Feb–Apr (southern dry season combined with low rainfall along the central coast).';
  }
  if (hasCentral && !hasNorth && !hasSouth) {
    return 'Feb–Aug (drier coastal and cave access in Central Vietnam; Sept–Nov carries peak central rain and storm risk).';
  }
  if (hasSouth && !hasNorth && !hasCentral) {
    return 'Nov–Apr (southern dry season with lowest humidity and calmest coastal seas).';
  }
  return 'Oct–Apr (coolest, driest northern conditions in Hanoi and Ha Long Bay; Mar–May for milder spring temperatures).';
}

export function buildItineraryShortAnswer(itinerary: Itinerary, routePoints: RoutePoint[]): ItineraryShortAnswer {
  const corpus = extractTimelineText(itinerary);
  const titleAndTimelineCorpus = [
    itinerary.slug?.current || '',
    itinerary.title || '',
    itinerary.destination?.name || '',
    ...(itinerary.timeline || []).map((day) => day.title || ''),
  ].join(' ').toLowerCase().replace(/[-_]/g, ' ');

  const matchedRules = LOCATION_RULES.filter((rule) => rule.pattern.test(titleAndTimelineCorpus));
  const fallbackRules = matchedRules.length > 0
    ? matchedRules
    : LOCATION_RULES.filter((rule) => rule.pattern.test(corpus));

  const placeNames = Array.from(new Set([
    ...routePoints.map((p) => p.name),
    ...fallbackRules.map((r) => r.label),
  ])).slice(0, 6);

  const regions = new Set<LocationRule['region']>(fallbackRules.map((r) => r.region));
  for (const p of routePoints) {
    if (p.region === 'North') regions.add('north');
    if (p.region === 'Central') regions.add('central');
    if (p.region === 'South') regions.add('south');
  }

  const durationDays = Math.max(1, itinerary.duration || itinerary.timeline?.length || 1);
  const durationLabel = durationDays === 1 ? '1-day private guided excursion' : `${durationDays}-day private tailor-made itinerary`;
  const stopsText = formatPlaceList(placeNames);
  const priceText = `£${(itinerary.priceFrom || 0).toLocaleString('en-GB')} per person`;
  const isArchived = Boolean(itinerary.catalogueSource);
  const priceLabel = isArchived ? `Sample guide price from ${priceText}` : `From ${priceText}`;
  const timelineCount = itinerary.timeline?.length || 0;
  const stageNote = timelineCount > 0 ? ` structured across ${timelineCount} documented ${timelineCount === 1 ? 'stage' : 'stages'}` : '';
  const seasonText = seasonWindowForRegions(regions);
  const firstHighlight = itinerary.highlights?.[0]?.replace(/\.$/, '');

  const directAnswer = [
    `${itinerary.title} is a ${durationLabel} covering ${stopsText}${stageNote}.`,
    `${priceLabel} (land and cruise arrangements only; international flights excluded, subject to final confirmation for your travel dates and hotel category).`,
    firstHighlight ? `Key focus: ${firstHighlight}.` : '',
    `Recommended window: ${seasonText}`,
  ].filter(Boolean).join(' ');

  return {
    directAnswer,
    facts: [
      {
        label: 'Duration & Route Stops',
        value: `${durationDays} ${durationDays === 1 ? 'day' : 'days'} · ${stopsText}`,
      },
      {
        label: 'Guide Price (GBP)',
        value: `${priceLabel} (excl. international flights; confirmed per date & room tier)`,
      },
      {
        label: 'Best Travel Window',
        value: seasonText,
      },
      {
        label: 'UK Passport Entry',
        value: '45-day visa-free entry for British citizen passports; 90-day e-visa (US$25 single / US$50 multiple) via evisa.gov.vn for longer stays.',
      },
    ],
  };
}

const creditByPath = new Map(commonsPhotoCredits.map((credit) => [credit.path, credit]));

export function wikimediaGalleryForItinerary(itinerary: Itinerary, routePoints: RoutePoint[], limit = 3): CreditEntry[] {
  const searchCorpus = [
    itinerary.slug?.current || '',
    itinerary.title || '',
    itinerary.destination?.name || '',
    ...(itinerary.timeline || []).map((day) => `${day.title || ''} ${typeof day.accommodation === 'string' ? day.accommodation : day.accommodation?.name || ''}`),
    ...(itinerary.highlights || []),
    itinerary.intro || '',
  ].join(' ').toLowerCase().replace(/[-_]/g, ' ');

  const candidatePaths: string[] = [];

  if (/metropole/.test(searchCorpus)) candidatePaths.push('/images/commons/metropole-hanoi-1.jpg');
  if (/capella/.test(searchCorpus)) candidatePaths.push('/images/commons/capella-hanoi-1.jpg');
  if (/amanoi|vinh hy/.test(searchCorpus)) candidatePaths.push('/images/commons/vinhhy-1.jpg');
  if (/six senses|ninh van/.test(searchCorpus)) candidatePaths.push('/images/commons/ninhvanbay-1.jpg');

  const matchedLocations = LOCATION_RULES.filter((rule) => rule.pattern.test(searchCorpus));
  const routeMatched = routePoints
    .map((point) => LOCATION_RULES.find((rule) => rule.pattern.test(point.name.toLowerCase())))
    .filter((rule): rule is LocationRule => Boolean(rule));

  const allMatches = Array.from(new Set([...routeMatched, ...matchedLocations]));
  for (const rule of allMatches) {
    if (rule.commonsFiles[0]) candidatePaths.push(rule.commonsFiles[0]);
  }
  for (const rule of allMatches) {
    candidatePaths.push(...rule.commonsFiles.slice(1));
  }

  const titleSlugCorpus = `${itinerary.slug?.current || ''} ${itinerary.title || ''}`.toLowerCase();
  if (/honeymoon|romance|beach|resort|retreat/.test(titleSlugCorpus)) {
    candidatePaths.push('/images/commons/phuquoc-1.jpg', '/images/commons/dalat-1.jpg', '/images/commons/metropole-hanoi-1.jpg');
  }

  // Balanced regional fallback if an itinerary mentions fewer than 3 distinct locations
  candidatePaths.push(
    '/images/commons/hanoi-2.jpg',
    '/images/commons/halong-1.jpg',
    '/images/commons/hoian-2.jpg',
    '/images/commons/hue-1.jpg',
    '/images/commons/mekong-1.jpg',
    '/images/commons/sapa-1.jpg',
  );

  const selected: CreditEntry[] = [];
  const seen = new Set<string>();
  for (const path of candidatePaths) {
    if (seen.has(path)) continue;
    const credit = creditByPath.get(path);
    if (!credit) continue;
    seen.add(path);
    selected.push(credit);
    if (selected.length >= limit) break;
  }
  return selected;
}
