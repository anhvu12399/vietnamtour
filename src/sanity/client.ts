import { createClient } from '@sanity/client';
import { mockItineraries, mockAccommodations, mockSpecialists, mockDestinations } from './mockData';
import { Itinerary, Accommodation, Specialist, Destination, TravelGuide, Cruise, Post } from './types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2026-06-17';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const useMock = !client;

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
  return await client!.fetch(query);
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
  return await client!.fetch(query);
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
  return await client!.fetch(query, { slug });
}

// --- Accommodations ---

export async function getAccommodations(): Promise<Accommodation[]> {
  if (useMock) {
    return mockAccommodations;
  }
  return await client!.fetch(`*[_type == "accommodation"]`);
}

export async function getAccommodationBySlug(slug: string): Promise<Accommodation | null> {
  if (useMock) {
    return mockAccommodations.find(acc => acc.slug.current === slug) || null;
  }
  return await client!.fetch(`*[_type == "accommodation" && slug.current == $slug][0]`, { slug });
}

// --- Specialists ---

export async function getSpecialists(): Promise<Specialist[]> {
  if (useMock) {
    return mockSpecialists;
  }
  return await client!.fetch(`*[_type == "specialist"]`);
}

export async function getSpecialistBySlug(slug: string): Promise<Specialist | null> {
  if (useMock) {
    return mockSpecialists.find(spec => spec.slug.current === slug) || null;
  }
  return await client!.fetch(`*[_type == "specialist" && slug.current == $slug][0]`, { slug });
}

// --- Destinations ---

export async function getDestinations(): Promise<Destination[]> {
  if (useMock) {
    return mockDestinations;
  }
  return await client!.fetch(`*[_type == "destination"]{
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
  return await client!.fetch(query, { slug });
}

// --- Cruises ---

export async function getCruises(): Promise<Cruise[]> {
  if (useMock) return [];
  return await client!.fetch(`*[_type == "cruise"]{
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
  return await client!.fetch(query, { slug });
}

export async function getCruisesByDestination(destinationSlug: string): Promise<Cruise[]> {
  if (useMock) return [];
  const query = `*[_type == "cruise" && destination->slug.current == $destinationSlug]{
    ...,
    destination->{ _id, name, slug },
    "mainImage": mainImage.asset->url
  }`;
  return await client!.fetch(query, { destinationSlug });
}

// --- Travel Guides ---

export async function getTravelGuides(): Promise<TravelGuide[]> {
  if (useMock) return [];
  return await client!.fetch(`*[_type == "travelGuide"]{
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
  return await client!.fetch(query, { destinationSlug, guideSlug });
}

export async function getTravelGuidesByDestination(destinationSlug: string): Promise<TravelGuide[]> {
  if (useMock) return [];
  const query = `*[_type == "travelGuide" && destination->slug.current == $destinationSlug]{
    _id, title, slug,
    "mainImage": mainImage.asset->url,
    destination->{ _id, name, slug }
  }`;
  return await client!.fetch(query, { destinationSlug });
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
  seoTitle?: string;
  seoDescription?: string;
}

export async function getHomepage(): Promise<HomepageData | null> {
  if (useMock) return null;
  return await client!.fetch(`*[_type == "homepage"][0]{
    title, heroHeading, heroSubheading,
    introHeading, introParagraph1, introParagraph2,
    artOfTravelHeading, artOfTravelText,
    finalCtaHeading, finalCtaSubtext,
    seoTitle, seoDescription
  }`);
}

// --- Posts ---

export async function getPosts(): Promise<Post[]> {
  if (useMock) return [];
  return await client!.fetch(`*[_type == "post"] | order(publishedAt desc){
    ...,
    "mainImage": mainImage.asset->url,
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
    "seo": seo{
      metaTitle, metaDescription, keywords,
      "ogImage": ogImage.asset->url
    }
  }`;
  return await client!.fetch(query, { slug });
}

