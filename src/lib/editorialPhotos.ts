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
  '/images/commons/hanoi-1.jpg', '/images/commons/hanoi-2.jpg', '/images/commons/hanoi-3.jpg',
  '/images/commons/halong-1.jpg', '/images/commons/halong-2.jpg',
  '/images/commons/hoian-1.jpg', '/images/commons/hoian-2.jpg', '/images/commons/hoian-3.jpg',
  '/images/commons/ninhbinh-1.jpg', '/images/commons/ninhbinh-2.jpg',
  '/images/commons/hue-1.jpg', '/images/commons/hue-2.jpg',
  '/images/commons/saigon-1.jpg', '/images/commons/saigon-2.jpg',
  '/images/commons/phuquoc-1.jpg', '/images/commons/phuquoc-2.jpg',
  '/images/commons/danang-1.jpg', '/images/commons/danang-2.jpg',
  '/images/commons/dalat-1.jpg', '/images/commons/dalat-2.jpg',
  '/images/commons/sapa-1.jpg', '/images/commons/sapa-2.jpg', '/images/commons/bacha-1.jpg',
  '/images/commons/mekong-1.jpg', '/images/commons/mekong-2.jpg',
  '/images/commons/phongnha-1.jpg', '/images/commons/phongnha-2.jpg',
  '/images/commons/myson-1.jpg', '/images/commons/cuchi-1.jpg',
  '/images/commons/hagiang-1.jpg', '/images/commons/maichau-1.jpg',
  '/images/commons/nhatrang-1.jpg', '/images/commons/vinhhy-1.jpg', '/images/commons/ninhvanbay-1.jpg',
  '/images/commons/metropole-hanoi-1.jpg', '/images/commons/capella-hanoi-1.jpg',
];

editorialPhotoLibrary.push(...commonsEditorialPhotoLibrary);

const candidatesFor = (context: string): string[] => {
  const text = context.toLowerCase().replace(/[-_]/g, ' ');
  if (/amanoi|vinh hy/.test(text)) return ['/images/commons/vinhhy-1.jpg', image('muine-resort'), image('phuquoc-resort-aerial'), image('hoian-resort-beach')];
  if (/six senses|ninh van bay/.test(text)) return ['/images/commons/ninhvanbay-1.jpg', image('phuquoc-resort-aerial'), image('hoian-resort-beach'), image('dalat-resort-pool')];
  if (/regent.*phu quoc|phu quoc.*regent/.test(text)) return ['/images/commons/phuquoc-2.jpg', image('phuquoc-resort-aerial'), '/images/commons/phuquoc-1.jpg', image('phuquoc')];
  if (/nam hai|four seasons/.test(text)) return [image('hoian-resort-beach'), '/images/commons/hoian-2.jpg', '/images/commons/danang-1.jpg', image('dalat-resort-pool')];
  if (/sofitel|metropole/.test(text)) return ['/images/commons/metropole-hanoi-1.jpg', '/images/commons/hanoi-2.jpg', image('hanoi'), image('hanoi-street-life')];
  if (/capella/.test(text)) return ['/images/commons/capella-hanoi-1.jpg', '/images/commons/hanoi-3.jpg', image('hanoi-street-life'), image('hanoi')];
  if (/phong nha|cave|cavern|kong/.test(text)) return ['/images/commons/phongnha-1.jpg', '/images/commons/phongnha-2.jpg', image('cave'), image('phong-nha-river'), '/images/commons/ninhbinh-1.jpg'];
  if (/ninh binh|ninhbinh|tam coc|trang an|hoa lu/.test(text)) return ['/images/commons/ninhbinh-1.jpg', '/images/commons/ninhbinh-2.jpg', image('ninhbinh-rice-farmer'), image('ninhbinh-hotel'), image('trang-an-boats'), image('ninhbinh')];
  if (/ha long|halong|lan ha|bai tu long/.test(text)) return ['/images/commons/halong-1.jpg', '/images/commons/halong-2.jpg', image('halong-day-cruise'), image('halong'), image('cave')];
  if (/mekong|delta|cai be|can tho|sampan|jarai/.test(text)) return ['/images/commons/mekong-1.jpg', '/images/commons/mekong-2.jpg', image('mekong-canal-rower'), image('mekong'), image('hoian-rice-farmer')];
  if (/bac ha/.test(text)) return ['/images/commons/bacha-1.jpg', '/images/commons/sapa-1.jpg', '/images/commons/sapa-2.jpg', image('sapa-rice-hillside')];
  if (/mai chau|da bac/.test(text)) return ['/images/commons/maichau-1.jpg', '/images/commons/sapa-1.jpg', image('sapa-house-field'), image('ninhbinh-rice-farmer')];
  if (/ha giang|hagiang|ma pi leng/.test(text)) return ['/images/commons/hagiang-1.jpg', image('hagiang'), '/images/commons/sapa-2.jpg', image('mucangchai-terraces')];
  if (/sapa|sa pa|terrace|highland|mu cang chai|mucangchai/.test(text)) return ['/images/commons/sapa-1.jpg', '/images/commons/sapa-2.jpg', '/images/commons/bacha-1.jpg', image('sapa-rice-hillside'), image('sapa-mountain-hotel'), image('sapa-house-field'), image('mucangchai-terraces'), image('sapa')];
  if (/my son/.test(text)) return ['/images/commons/myson-1.jpg', '/images/commons/hoian-2.jpg', '/images/commons/hoian-1.jpg', image('vietnam-temple')];
  if (/cu chi/.test(text)) return ['/images/commons/cuchi-1.jpg', '/images/commons/saigon-1.jpg', '/images/commons/saigon-2.jpg', image('saigon')];
  if (/hoi an|hoian|lantern/.test(text)) return ['/images/commons/hoian-2.jpg', '/images/commons/hoian-1.jpg', '/images/commons/hoian-3.jpg', image('hoian-sunrise-street'), image('hoian-rice-farmer'), image('hoian')];
  if (/hue|imperial citadel/.test(text)) return ['/images/commons/hue-1.jpg', '/images/commons/hue-2.jpg', image('vietnam-temple'), image('hue'), image('da-nang-dragon-bridge')];
  if (/da nang|danang|marble mountain/.test(text)) return ['/images/commons/danang-1.jpg', '/images/commons/danang-2.jpg', image('da-nang-dragon-bridge'), image('vietnam-temple'), image('hoian-resort-beach')];
  if (/nha trang|nhatrang/.test(text)) return ['/images/commons/nhatrang-1.jpg', '/images/commons/ninhvanbay-1.jpg', image('phuquoc-resort-aerial'), image('muine-resort')];
  if (/aman|six senses|regent|nam hai|capella|phu quoc|phuquoc|beach|coast|island|resort|hotel|villa|lodge/.test(text)) return ['/images/commons/phuquoc-1.jpg', '/images/commons/phuquoc-2.jpg', '/images/commons/dalat-2.jpg', image('muine-resort'), image('phuquoc-resort-aerial'), image('dalat-resort-pool'), image('sapa-mountain-hotel'), image('hoian-resort-beach')];
  if (/saigon|ho chi minh/.test(text)) return ['/images/commons/saigon-1.jpg', '/images/commons/saigon-2.jpg', '/images/commons/cuchi-1.jpg', image('saigon'), image('hanoi-street-life'), image('food')];
  if (/hanoi|ha noi/.test(text)) return ['/images/commons/hanoi-2.jpg', '/images/commons/hanoi-3.jpg', '/images/commons/hanoi-1.jpg', image('hanoi-street-life'), image('hanoi-train'), image('hanoi')];
  if (/food|culinary|cooking|gastronomy|eats/.test(text)) return ['/images/commons/hoian-1.jpg', '/images/commons/hanoi-1.jpg', '/images/commons/saigon-1.jpg', image('food'), image('hoian-rice-farmer'), image('hoian-sunrise-street')];
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
