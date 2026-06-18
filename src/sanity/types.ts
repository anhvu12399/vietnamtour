export interface Accommodation {
  _id: string;
  name: string;
  slug: { current: string };
  location: string;
  rating: string;
  description: any[]; // PortableText
  features: string[];
  gallery: string[]; // Mocked as image urls
  websiteUrl?: string;
}

export interface Specialist {
  _id: string;
  name: string;
  slug: { current: string };
  image: string; // Mocked as image url
  role: string;
  email: string;
  phone?: string;
  bio: any[]; // PortableText
  favoriteDestinations: string[];
  expertTips: string[];
}

export interface TimelineItem {
  dayRange: string;
  title: string;
  description: any[]; // PortableText
  accommodation?: Accommodation | string; // Reference or object
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string; // URL resolved by client
  keywords?: string[];
}

export interface Destination {
  _id: string;
  name: string;
  slug: { current: string };
  image: string; // Image URL
  description: any[]; // PortableText
  highlights: string[];
  bestTimeToVisit: string;
  featuredTours?: Itinerary[];
  seo?: SeoFields;
}

export interface Itinerary {
  _id: string;
  title: string;
  slug: { current: string };
  duration: number;
  priceFrom: number;
  intro: string;
  description: any[]; // PortableText
  highlights: string[];
  gallery: string[]; // Image URLs
  mapImage?: string; // Image URL
  timeline: TimelineItem[];
  accommodations: Accommodation[];
  specialist: Specialist;
  featured: boolean;
  destination?: Pick<Destination, '_id' | 'name' | 'slug'>;
  seo?: SeoFields;
}

export interface Cruise {
  _id: string;
  title: string;
  slug: { current: string };
  location?: string;
  duration?: string;
  price?: number;
  mainImage?: string;
  description?: string;
  destination?: Pick<Destination, '_id' | 'name' | 'slug'>;
  seo?: SeoFields;
}

export interface TravelGuide {
  _id: string;
  title: string;
  slug: { current: string };
  destination?: Pick<Destination, '_id' | 'name' | 'slug'>;
  mainImage?: string;
  content?: any[]; // PortableText
  relatedTours?: (Itinerary | Cruise)[];
  seo?: SeoFields;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: string;
  excerpt?: string;
  factSheet?: {
    pacing?: string;
    bestMonths?: string;
    duration?: string;
    destinations?: string;
    operatorType?: string;
  };
  sidebarTip?: {
    tip?: string;
    specialist?: {
      name?: string;
      role?: string;
      image?: string;
    };
  };
  photoEssay?: {
    title?: string;
    caption?: string;
    url?: string;
  }[];
  content?: any[]; // PortableText
  seo?: SeoFields;
}
