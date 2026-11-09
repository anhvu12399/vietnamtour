const image = (name: string) => `/images/unsplash/${name}.jpg`;

export const editorialPhotoLibrary = [
  image('hanoi-street-life'), image('hanoi-train'), image('hanoi'), image('food'),
  image('halong-day-cruise'), image('halong'), image('cave'), image('phong-nha-river'),
  image('trang-an-boats'), image('ninhbinh'), image('sapa-house-field'), image('mucangchai-terraces'),
  image('sapa'), image('hagiang'), image('dalat'), image('hoian-sunrise-street'),
  image('hoian-resort-beach'), image('hoian'), image('hoian-rice-farmer'), image('hue'),
  image('vietnam-temple'), image('da-nang-dragon-bridge'), image('mekong'), image('saigon'),
  image('phuquoc'),
  image('dalat-resort-pool'), image('phuquoc-resort-aerial'), image('muine-resort'), image('sapa-mountain-hotel'),
  image('saigon-hotel'), image('ninhbinh-hotel'), image('sapa-rice-hillside'), image('ninhbinh-rice-farmer'), image('mekong-canal-rower'),
];

export const commonsEditorialPhotoLibrary = [
  '/images/commons/hanoi-1.jpg',
  '/images/commons/halong-1.jpg', '/images/commons/halong-2.jpg',
  '/images/commons/hoian-1.jpg',
  '/images/commons/ninhbinh-1.jpg', '/images/commons/ninhbinh-2.jpg',
  '/images/commons/hue-1.jpg', '/images/commons/hue-2.jpg',
  '/images/commons/saigon-1.jpg', '/images/commons/saigon-2.jpg',
  '/images/commons/phuquoc-1.jpg', '/images/commons/phuquoc-2.jpg',
  '/images/commons/danang-1.jpg', '/images/commons/danang-2.jpg',
  '/images/commons/dalat-1.jpg', '/images/commons/dalat-2.jpg',
];

editorialPhotoLibrary.push(...commonsEditorialPhotoLibrary);

const candidatesFor = (context: string): string[] => {
  const text = context.toLowerCase().replace(/[-_]/g, ' ');
  if (/amanoi/.test(text)) return [image('muine-resort'), image('phuquoc-resort-aerial'), image('hoian-resort-beach')];
  if (/six senses|ninh van bay/.test(text)) return [image('phuquoc-resort-aerial'), image('hoian-resort-beach'), image('dalat-resort-pool')];
  if (/regent.*phu quoc|phu quoc.*regent/.test(text)) return [image('phuquoc'), image('phuquoc-resort-aerial'), image('muine-resort')];
  if (/nam hai|four seasons/.test(text)) return [image('hoian-resort-beach'), image('hoian'), image('dalat-resort-pool')];
  if (/sofitel|metropole|capella/.test(text)) return [image('hanoi'), image('hanoi-street-life'), image('hanoi-train'), image('saigon-hotel')];
  if (/phong nha|cave|cavern/.test(text)) return [image('cave'), image('phong-nha-river'), image('ninhbinh'), image('trang-an-boats')];
  if (/ninh binh|ninhbinh|tam coc|trang an/.test(text)) return ['/images/commons/ninhbinh-1.jpg', '/images/commons/ninhbinh-2.jpg', image('ninhbinh-rice-farmer'), image('ninhbinh-hotel'), image('trang-an-boats'), image('ninhbinh'), image('phong-nha-river'), image('cave')];
  if (/ha long|halong|lan ha/.test(text)) return ['/images/commons/halong-1.jpg', '/images/commons/halong-2.jpg', image('halong-day-cruise'), image('halong'), image('cave'), image('ninhbinh'), image('trang-an-boats')];
  if (/mekong|delta|cai be|can tho|sampan/.test(text)) return [image('mekong-canal-rower'), image('mekong'), image('hoian-rice-farmer'), image('saigon'), image('trang-an-boats')];
  if (/sapa|sa pa|terrace|highland|ha giang|hagiang|mu cang chai|mucangchai/.test(text)) return [image('sapa-rice-hillside'), image('sapa-mountain-hotel'), image('sapa-house-field'), image('mucangchai-terraces'), image('sapa'), image('hagiang'), image('dalat')];
  if (/hoi an|hoian|lantern|my son/.test(text)) return ['/images/commons/hoian-1.jpg', image('hoian-sunrise-street'), image('hoian-rice-farmer'), image('hoian'), image('hoian-resort-beach'), image('food')];
  if (/hue|imperial citadel/.test(text)) return ['/images/commons/hue-1.jpg', '/images/commons/hue-2.jpg', image('vietnam-temple'), image('hue'), image('da-nang-dragon-bridge'), image('hoian-sunrise-street')];
  if (/da nang|danang|marble mountain/.test(text)) return ['/images/commons/danang-1.jpg', '/images/commons/danang-2.jpg', image('da-nang-dragon-bridge'), image('vietnam-temple'), image('hoian-resort-beach'), image('hue')];
  if (/aman|six senses|regent|nam hai|capella|phu quoc|phuquoc|beach|coast|island|resort|hotel|villa|lodge/.test(text)) return [image('muine-resort'), image('phuquoc-resort-aerial'), image('dalat-resort-pool'), image('sapa-mountain-hotel'), image('hoian-resort-beach'), image('phuquoc'), image('halong-day-cruise'), image('hoian'), image('dalat')];
  if (/saigon|ho chi minh|cu chi/.test(text)) return ['/images/commons/saigon-1.jpg', '/images/commons/saigon-2.jpg', image('saigon'), image('hanoi-street-life'), image('food'), image('mekong')];
  if (/hanoi|ha noi/.test(text)) return ['/images/commons/hanoi-1.jpg', image('hanoi-street-life'), image('hanoi-train'), image('hanoi'), image('food'), image('vietnam-temple')];
  if (/food|culinary|cooking|gastronomy/.test(text)) return [image('food'), image('hoian-rice-farmer'), image('hoian-sunrise-street'), image('hanoi-street-life')];
  return editorialPhotoLibrary;
};

export function editorialImageFor(context: string): string {
  const candidates = candidatesFor(context);
  let hash = 0;
  for (let index = 0; index < context.length; index += 1) hash = (hash * 31 + context.charCodeAt(index)) >>> 0;
  return candidates[hash % candidates.length];
}

export function uniqueEditorialImages<T>(items: T[], getContext: (item: T, index: number) => string): string[] {
  const used = new Set<string>();
  return items.map((item, index) => {
    const context = getContext(item, index);
    const preferred = candidatesFor(context);
    const selected = preferred.find((photo) => !used.has(photo))
      || editorialPhotoLibrary.find((photo) => !used.has(photo))
      || editorialImageFor(context);
    used.add(selected);
    return selected;
  });
}
