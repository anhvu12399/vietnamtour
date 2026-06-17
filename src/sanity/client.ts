import { createClient } from '@sanity/client';
import { mockItineraries, mockAccommodations, mockSpecialists, mockDestinations } from './mockData';
import { Itinerary, Accommodation, Specialist, Destination } from './types';

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

export async function getItineraries(): Promise<Itinerary[]> {
  if (useMock) {
    return mockItineraries;
  }
  const query = `*[_type == "itinerary"]{
    ...,
    accommodations[]->,
    specialist->
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
    specialist->
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
    specialist->
  }`;
  return await client!.fetch(query, { slug });
}

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

export async function getDestinations(): Promise<Destination[]> {
  if (useMock) {
    return mockDestinations;
  }
  return await client!.fetch(`*[_type == "destination"]`);
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  if (useMock) {
    return mockDestinations.find(dest => dest.slug.current === slug) || null;
  }
  return await client!.fetch(`*[_type == "destination" && slug.current == $slug][0]`, { slug });
}
