export interface RichTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: { _type?: string; _key?: string; text?: string; marks?: string[] }[];
  markDefs?: { _type: string; _key: string; href?: string }[];
  [key: string]: unknown;
}

export interface Accommodation {
  _id: string;
  name: string;
  slug: { current: string };
  location: string;
  rating: string;
  description: RichTextBlock[]; // PortableText
  features: string[];
  gallery: string[]; // Mocked as image urls
  websiteUrl?: string;
  editorial?: EditorialEvidence;
  photoNote?: string;
}

export interface Specialist {
  profileVerified?: boolean;
  profileEvidenceUrl?: string;
  _id: string;
  name: string;
  slug: { current: string };
  image: string; // Mocked as image url
  role: string;
  email: string;
  phone?: string;
  bio: RichTextBlock[]; // PortableText
  favoriteDestinations: string[];
  expertTips: string[];
}

export interface TimelineItem {
  dayRange: string;
  title: string;
  description: RichTextBlock[]; // PortableText
  accommodation?: Accommodation | string; // Reference or object
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string; // URL resolved by client
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface Destination {
  _id: string;
  name: string;
  slug: { current: string };
  image: string; // Image URL
  description: RichTextBlock[]; // PortableText
  highlights: string[];
  bestTimeToVisit: string;
  featuredTours?: Itinerary[];
  seo?: SeoFields;
}

export interface Itinerary {
  catalogueSource?: 'archive';
  _id: string;
  title: string;
  slug: { current: string };
  duration: number;
  priceFrom: number;
  intro: string;
  description: RichTextBlock[]; // PortableText
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
  content?: RichTextBlock[]; // PortableText
  relatedTours?: (Itinerary | Cruise)[];
  seo?: SeoFields;
}

export interface Post {
  _updatedAt?: string;
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  editorial?: EditorialEvidence;
  mainImage?: string;
  excerpt?: string;
  heroAuthor?: {
    name?: string;
    role?: string;
    avatar?: string;
  };
  content?: RichTextBlock[]; // PortableText
  ctaLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  seo?: SeoFields;
}

export interface EditorialEvidence {
  lastReviewedAt?: string;
  reviewer?: { name: string; slug?: { current: string } };
  author?: { name: string; slug?: { current: string } };
  sources?: { label: string; url: string; accessedAt?: string }[];
  fieldVisits?: { location: string; visitedAt: string; evidenceUrl?: string }[];
}

export interface BlogPost extends Omit<Post, 'mainImage'> {
  featuredImage?: string;
  imageAlt?: string;
  category?: string;
  tags?: string[];
  hasContent?: boolean;
  author?: { name: string; role?: string; slug?: { current: string }; bio?: RichTextBlock[]; avatar?: string };
  relatedPosts?: BlogPost[];
  relatedTours?: Itinerary[];
  ctaBody?: string;
}
