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
}
