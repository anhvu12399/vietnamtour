import { createClient } from '@sanity/client';
import { defineLive } from 'next-sanity/live';
import { draftMode } from 'next/headers';
import { mockItineraries, mockAccommodations, mockSpecialists, mockDestinations } from './mockData';
import { Itinerary, Accommodation, Specialist, Destination, TravelGuide, Cruise, Post } from './types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2026-06-17';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      stega: {
        enabled: true,
        studioUrl: '/studio',
      },
    })
  : null;

const useMock = !client;

export const { sanityFetch, SanityLive } = client
  ? defineLive({
      client,
      serverToken: process.env.SANITY_WRITE_TOKEN,
      browserToken: process.env.SANITY_WRITE_TOKEN,
    })
  : { sanityFetch: null, SanityLive: () => null };

async function fetchSanity<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  if (sanityFetch) {
    let previewOptions: {
      perspective: 'published' | 'previewDrafts';
      stega: boolean;
    } = {
      perspective: 'published',
      stega: false,
    };

    try {
      const draft = await draftMode();
      previewOptions = {
        perspective: draft.isEnabled ? 'previewDrafts' : 'published',
        stega: draft.isEnabled,
      };
    } catch (e) {
      // draftMode() throws during static generation / build time without HTTP request context
    }

    try {
      const { data } = await sanityFetch({
        query,
        params,
        ...previewOptions,
      });
      return data as T;
    } catch (error) {
      console.error('sanityFetch failed, falling back to client.fetch:', error);
      if (client) {
        return await client.fetch(query, params);
      }
      throw error;
    }
  }
  if (client) {
    return await client.fetch(query, params);
  }
  throw new Error('Sanity client not configured');
}

// --- Itineraries ---

export async function getItineraries(): Promise<Itinerary[]> {
  if (useMock) {
    return mockItineraries;
  }
  const query = `*[_type == "itinerary"]{
    ...,
    accommodations[]->,
    specialist->,
    destination->{ _id, name, slug },
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Itinerary[]>(query);
}

export async function getFeaturedItineraries(): Promise<Itinerary[]> {
  if (useMock) {
    return mockItineraries.filter(it => it.featured);
  }
  const query = `*[_type == "itinerary" && featured == true]{
    ...,
    accommodations[]->,
    specialist->,
    destination->{ _id, name, slug },
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Itinerary[]>(query);
}

export async function getItineraryBySlug(slug: string): Promise<Itinerary | null> {
  if (useMock) {
    return mockItineraries.find(it => it.slug.current === slug) || null;
  }
  const query = `*[_type == "itinerary" && slug.current == $slug][0]{
    ...,
    accommodations[]->,
    specialist->,
    destination->{ _id, name, slug },
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Itinerary | null>(query, { slug });
}

// --- Accommodations ---

export async function getAccommodations(): Promise<Accommodation[]> {
  if (useMock) {
    return mockAccommodations;
  }
  return await fetchSanity<Accommodation[]>(`*[_type == "accommodation"]`);
}

export async function getAccommodationBySlug(slug: string): Promise<Accommodation | null> {
  if (useMock) {
    return mockAccommodations.find(acc => acc.slug.current === slug) || null;
  }
  return await fetchSanity<Accommodation | null>(`*[_type == "accommodation" && slug.current == $slug][0]`, { slug });
}

// --- Specialists ---

export async function getSpecialists(): Promise<Specialist[]> {
  if (useMock) {
    return mockSpecialists;
  }
  return await fetchSanity<Specialist[]>(`*[_type == "specialist"]`);
}

export async function getSpecialistBySlug(slug: string): Promise<Specialist | null> {
  if (useMock) {
    return mockSpecialists.find(spec => spec.slug.current === slug) || null;
  }
  return await fetchSanity<Specialist | null>(`*[_type == "specialist" && slug.current == $slug][0]`, { slug });
}

// --- Destinations ---

export async function getDestinations(): Promise<Destination[]> {
  if (useMock) {
    return mockDestinations;
  }
  return await fetchSanity<Destination[]>(`*[_type == "destination"]{
    ...,
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`);
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  if (useMock) {
    return mockDestinations.find(dest => dest.slug.current === slug) || null;
  }
  const query = `*[_type == "destination" && slug.current == $slug][0]{
    ...,
    featuredTours[]->{
      _id, title, slug, duration, priceFrom, intro, featured,
      "gallery": gallery[].asset->url
    },
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Destination | null>(query, { slug });
}

// --- Cruises ---

export async function getCruises(): Promise<Cruise[]> {
  if (useMock) return [];
  return await fetchSanity<Cruise[]>(`*[_type == "cruise"]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url,
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`);
}

export async function getCruiseBySlug(slug: string): Promise<Cruise | null> {
  if (useMock) return null;
  const query = `*[_type == "cruise" && slug.current == $slug][0]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url,
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Cruise | null>(query, { slug });
}

export async function getCruisesByDestination(destinationSlug: string): Promise<Cruise[]> {
  if (useMock) return [];
  const query = `*[_type == "cruise" && destination->slug.current == $destinationSlug]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url
  }`;
  return await fetchSanity<Cruise[]>(query, { destinationSlug });
}

// --- Travel Guides ---

export async function getTravelGuides(): Promise<TravelGuide[]> {
  if (useMock) return [];
  return await fetchSanity<TravelGuide[]>(`*[_type == "travelGuide"]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url,
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`);
}

export async function getTravelGuideBySlug(destinationSlug: string, guideSlug: string): Promise<TravelGuide | null> {
  if (useMock) return null;
  const query = `*[_type == "travelGuide" && slug.current == $guideSlug && destination->slug.current == $destinationSlug][0]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url,
    relatedTours[]->{
      _type,
      _id,
      title,
      slug,
      ... _type == "itinerary" => {
        duration, priceFrom, intro,
        "gallery": gallery[].asset->url
      },
      ... _type == "cruise" => {
        location, duration, price,
        "mainImage": mainImage.asset->url
      }
    },
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<TravelGuide | null>(query, { destinationSlug, guideSlug });
}

export async function getTravelGuidesByDestination(destinationSlug: string): Promise<TravelGuide[]> {
  if (useMock) return [];
  const query = `*[_type == "travelGuide" && destination->slug.current == $destinationSlug]{
    _id, title, slug,
    "mainImage": mainImage.asset->url,
    destination->{ _id, name, slug }
  }`;
  return await fetchSanity<TravelGuide[]>(query, { destinationSlug });
}

// --- Homepage ---

export interface HomepageData {
  title?: string;
  heroHeading?: string;
  heroSubheading?: string;
  introHeading?: string;
  introParagraph1?: string;
  introParagraph2?: string;
  artOfTravelHeading?: string;
  artOfTravelText?: string;
  finalCtaHeading?: string;
  finalCtaSubtext?: string;
  gridCategories?: {
    title: string;
    image: string;
    link: string;
  }[];
  seoTitle?: string;
  seoDescription?: string;
}

export async function getHomepage(): Promise<HomepageData | null> {
  if (useMock) return null;
  return await fetchSanity<HomepageData | null>(`*[_type == "homepage"][0]{
    title, heroHeading, heroSubheading,
    introHeading, introParagraph1, introParagraph2,
    artOfTravelHeading, artOfTravelText,
    finalCtaHeading, finalCtaSubtext,
    gridCategories,
    seoTitle, seoDescription
  }`);
}

// --- Posts ---

export async function getPosts(): Promise<Post[]> {
  if (useMock) return [];
  return await fetchSanity<Post[]>(`*[_type == "post"] | order(publishedAt desc){
    ...,
    "mainImage": mainImage.asset->url,
    factSheet,
    sidebarTip{
      tip,
      specialist->{
        name,
        role,
        "image": image.asset->url
      }
    },
    photoEssay[]{
      title,
      caption,
      "url": image.asset->url
    },
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "specialistTip" => {
        ...,
        specialist->{
          name,
          role,
          "image": image.asset->url
        },
        customAvatar{
          "url": asset->url
        }
      }
    },
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (useMock) return null;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    ...,
    "mainImage": mainImage.asset->url,
    factSheet,
    sidebarTip{
      tip,
      specialist->{
        name,
        role,
        "image": image.asset->url
      }
    },
    photoEssay[]{
      title,
      caption,
      "url": image.asset->url
    },
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "specialistTip" => {
        ...,
        specialist->{
          name,
          role,
          "image": image.asset->url
        },
        customAvatar{
          "url": asset->url
        }
      }
    },
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await fetchSanity<Post | null>(query, { slug });
}
