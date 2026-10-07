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
  canonicalUrl?: string;
}

export interface Destination {
  _updatedAt?: string;
  answerSummary?: string;
  geoFaqs?: { question: string; answer: string }[];
  lastReviewedAt?: string;
  sources?: { label?: string; url?: string }[];
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
  _updatedAt?: string;
  answerSummary?: string;
  geoFaqs?: { question: string; answer: string }[];
  lastReviewedAt?: string;
  sources?: { label?: string; url?: string }[];
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
  _updatedAt?: string;
  answerSummary?: string;
  geoFaqs?: { question: string; answer: string }[];
  lastReviewedAt?: string;
  sources?: { label?: string; url?: string }[];
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
  _updatedAt?: string;
  answerSummary?: string;
  geoFaqs?: { question: string; answer: string }[];
  lastReviewedAt?: string;
  sources?: { label?: string; url?: string }[];
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
  _updatedAt?: string;
  answerSummary?: string;
  geoFaqs?: { question: string; answer: string }[];
  lastReviewedAt?: string;
  sources?: { label?: string; url?: string }[];
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: string;
  excerpt?: string;
  heroAuthor?: {
    name?: string;
    role?: string;
    avatar?: string;
  };
  content?: any[]; // PortableText
  ctaLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  seo?: SeoFields;
}
