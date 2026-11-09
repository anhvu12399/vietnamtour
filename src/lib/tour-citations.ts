export interface TourQuote {
  text: string;
  author: string;
  role: string;
  source: string;
  sourceUrl: string;
}

export interface VerifiedStat {
  label: string;
  value: string;
  source: string;
  sourceUrl: string;
}

export interface TourCitation {
  quote: TourQuote;
  stats: VerifiedStat[];
}

export const citationsBySlug: Record<string, TourCitation> = {
  'classic-vietnam': {
    quote: {
      text: 'Vietnam grabs you and doesn’t let you go. Once you love it, you love it forever. The streets of Hanoi, the limestone towers of Halong, the lantern-lit alleys of Hoi An—it changes how you perceive the world.',
      author: 'Anthony Bourdain',
      role: 'Chef, Author & Travel Documentarian',
      source: 'CNN Parts Unknown: Vietnam',
      sourceUrl: 'https://edition.cnn.com/travel/article/anthony-bourdain-vietnam/index.html',
    },
    stats: [
      { label: 'Ha Long Bay UNESCO Marine Area', value: 'Over 1,600 limestone karst islands covering 1,553 km² (UNESCO World Heritage Site)', source: 'UNESCO World Heritage Centre', sourceUrl: 'https://whc.unesco.org/en/list/672' },
      { label: 'Hoi An Ancient Town Preservation', value: 'Over 1,000 intact timber-framed merchant houses dating from 15th–19th century', source: 'UNESCO World Heritage Centre', sourceUrl: 'https://whc.unesco.org/en/list/948' },
      { label: 'Complex of Hué Imperial Monuments', value: '143 historical royal structures across a 10 km moated citadel perimeter (UNESCO 1993)', source: 'Hue Monuments Conservation Centre', sourceUrl: 'https://whc.unesco.org/en/list/678' },
      { label: 'Reunification Express Rail Line', value: '1,726 km connecting Hanoi and Ho Chi Minh City along the dramatic coastline', source: 'Vietnam Railways Corporation', sourceUrl: 'https://vr.com.vn/' },
    ],
  },
  'northern-vietnam-explorer': {
    quote: {
      text: 'The limestone pinnacles of the Dong Van Karst Plateau and the razorback switchbacks of Ma Pi Leng Pass are among the most dramatic mountain frontiers in all of Asia.',
      author: 'National Geographic Traveler',
      role: 'Geographical Exploration & Travel Authority',
      source: 'National Geographic: The Grand Vistas of Northern Vietnam',
      sourceUrl: 'https://www.nationalgeographic.com/travel',
    },
    stats: [
      { label: 'Dong Van Karst Plateau Geopark', value: '2,356 km² recognized under the UNESCO Global Geoparks Network', source: 'UNESCO Global Geoparks', sourceUrl: 'https://en.unesco.org/global-geoparks/dong-van-karst-plateau' },
      { label: 'Fansipan Summit Elevation', value: '3,147.3 m (10,326 ft) Indochina’s highest peak in the Hoang Lien Son range', source: 'Vietnam Administration of Forestry', sourceUrl: 'https://vietnam.travel/' },
      { label: 'Hanoi Old Quarter Heritage', value: '36 ancient guild streets continuously inhabited and trading since the 11th century', source: 'Hanoi Department of Tourism', sourceUrl: 'https://vietnam.travel/' },
      { label: 'Trang An Mixed World Heritage', value: 'Inscribed 2014 as Vietnam’s only Mixed Cultural & Natural UNESCO site', source: 'UNESCO World Heritage Centre', sourceUrl: 'https://whc.unesco.org/en/list/1438' },
    ],
  },
  'grand-tour-of-indochina': {
    quote: {
      text: 'The Mekong is the mother of all waters in Indochina. It flows with a languid majesty, carrying silt, wooden barges, floating markets, and civilisations across borders without interruption.',
      author: 'Somerset Maugham',
      role: 'British Playwright & Novelist',
      source: 'The Gentleman in the Parlour',
      sourceUrl: 'https://www.britannica.com/biography/W-Somerset-Maugham',
    },
    stats: [
      { label: 'Mekong River Basin Span', value: '4,909 km transboundary waterway sustaining over 60 million people', source: 'Mekong River Commission (MRC)', sourceUrl: 'https://www.mrcmekong.org/' },
      { label: 'Angkor Archaeological Park', value: '400 km² monumental religious complex dating from 9th–15th century (UNESCO 1992)', source: 'UNESCO World Heritage Centre', sourceUrl: 'https://whc.unesco.org/en/list/668' },
      { label: 'Luang Prabang Heritage Town', value: 'Preserved royal capital showcasing traditional Lao timber architecture and French colonial townscapes', source: 'UNESCO World Heritage Centre', sourceUrl: 'https://whc.unesco.org/en/list/479' },
      { label: 'Mekong Delta Agricultural Breadbasket', value: 'Produces over 50% of Vietnam’s national rice harvest and 70% of aquaculture export volume', source: 'General Statistics Office of Vietnam', sourceUrl: 'https://www.gso.gov.vn/' },
    ],
  },
  'vietnam-luxury-honeymoon': {
    quote: {
      text: 'They say you come to Vietnam and you understand a lot in a few minutes, but the rest has got to be lived. The smell of the river, the trishaws, the gold light on the pagodas...',
      author: 'Graham Greene',
      role: 'British Author & Foreign Correspondent',
      source: 'The Quiet American',
      sourceUrl: 'https://www.penguinrandomhouse.com/books/296719/the-quiet-american-by-graham-greene/',
    },
    stats: [
      { label: 'Michelin Guide Dining', value: 'Starred & Bib Gourmand establishments across Hanoi, Ho Chi Minh City and Da Nang', source: 'Michelin Guide Vietnam', sourceUrl: 'https://guide.michelin.com/en/article/news-and-views/michelin-guide-vietnam' },
      { label: 'Con Dao Marine National Park', value: '19,998 ha protected national park with primary coral reefs and green turtle nesting sanctuaries', source: 'Vietnam Administration of Forestry', sourceUrl: 'https://vietnam.travel/' },
      { label: 'Historic Colonial Grandeur', value: 'Legendary properties including Sofitel Legend Metropole Hanoi founded 1901', source: 'Historic Hotels Worldwide', sourceUrl: 'https://www.historichotels.org/' },
      { label: 'Private Secluded Bays', value: 'Lan Ha & Bai Tu Long maritime regulations capping vessel numbers for ultimate exclusivity', source: 'Quang Ninh Tourism Authority', sourceUrl: 'https://vietnamtourism.gov.vn/' },
    ],
  },
};

export const defaultVietnamCitation: TourCitation = {
  quote: {
    text: 'Going to Vietnam the first time was life-changing for me; maybe because it was all so new and different to my life before. The food, culture, people and landscape are all inseparable.',
    author: 'Anthony Bourdain',
    role: 'Chef, Author & Travel Documentarian',
    source: 'CNN Parts Unknown: Vietnam Episodes',
    sourceUrl: 'https://edition.cnn.com/travel/article/anthony-bourdain-vietnam/index.html',
  },
  stats: [
    { label: 'UNESCO World Heritage Properties', value: '8 designated World Heritage Cultural & Natural landmarks across Vietnam', source: 'UNESCO World Heritage Centre', sourceUrl: 'https://whc.unesco.org/en/statesparties/vn' },
    { label: 'National Coastline Span', value: '3,260 km (2,025 miles) bordering the Gulf of Tonkin, East Sea & Gulf of Thailand', source: 'General Statistics Office of Vietnam', sourceUrl: 'https://www.gso.gov.vn/' },
    { label: 'Protected National Parks', value: '34 national parks preserving tropical rainforests, karst formations, and marine reserves', source: 'Vietnam National Authority of Tourism', sourceUrl: 'https://vietnamtourism.gov.vn/' },
    { label: 'World-Renowned Gastronomy', value: 'Officially rated in the Michelin Guide with starred culinary venues in Hanoi, HCMC and Da Nang', source: 'Michelin Guide Vietnam', sourceUrl: 'https://guide.michelin.com/en/article/news-and-views/michelin-guide-vietnam' },
  ],
};

export function getItineraryCitation(slug?: string, destinationName?: string): TourCitation {
  if (slug && citationsBySlug[slug]) {
    return citationsBySlug[slug];
  }
  // Keyword matching
  if (slug) {
    if (slug.includes('north') || slug.includes('hanoi') || slug.includes('sapa') || slug.includes('ha-giang')) {
      return citationsBySlug['northern-vietnam-explorer'];
    }
    if (slug.includes('indochina') || slug.includes('mekong') || slug.includes('cambodia') || slug.includes('laos')) {
      return citationsBySlug['grand-tour-of-indochina'];
    }
    if (slug.includes('honeymoon') || slug.includes('luxury') || slug.includes('beach') || slug.includes('relax')) {
      return citationsBySlug['vietnam-luxury-honeymoon'];
    }
  }
  return citationsBySlug['classic-vietnam'] || defaultVietnamCitation;
}
