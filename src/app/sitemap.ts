import { MetadataRoute } from 'next';
import { getItineraries, getPosts, getDestinations, getAccommodations, getCruises } from '@/sanity/client';
import { thingsToDoData } from '@/lib/thingsToDoData';
import { tripIdeasData } from '@/lib/tripIdeasData';
import { inspirationsData } from '@/lib/inspirationsData';
import { ideasByMonthData } from '@/lib/ideasByMonthData';

const BASE_URL = 'https://vietnamtour.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    itineraries,
    posts, // Travel Guides
    destinations,
    accommodations,
    cruises,
  ] = await Promise.all([
    getItineraries(),
    getPosts(),
    getDestinations(),
    getAccommodations(),
    getCruises(),
  ]);

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/itineraries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/travel-guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/things-to-do`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/accommodations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ideas-by-month`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Destinations
  const destinationUrls: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${BASE_URL}/destinations/${dest.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Itineraries
  const itineraryUrls: MetadataRoute.Sitemap = itineraries.map((tour) => ({
    url: `${BASE_URL}/itineraries/${tour.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Travel Guides (Posts)
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/travel-guides/${post.slug.current}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Things to Do
  const thingsUrls: MetadataRoute.Sitemap = thingsToDoData.map((thing) => ({
    url: `${BASE_URL}/things-to-do/${thing.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Trip Ideas
  const tripIdeaUrls: MetadataRoute.Sitemap = tripIdeasData.map((idea) => ({
    url: `${BASE_URL}/trip-ideas/${idea.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Inspirations
  const inspirationUrls: MetadataRoute.Sitemap = inspirationsData.map((insp) => ({
    url: `${BASE_URL}/inspirations/${insp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Ideas By Month
  const monthUrls: MetadataRoute.Sitemap = ideasByMonthData.map((month) => ({
    url: `${BASE_URL}/ideas-by-month/${month.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Accommodations
  const accommodationUrls: MetadataRoute.Sitemap = accommodations.map((hotel) => ({
    url: `${BASE_URL}/accommodations/${hotel.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Cruises
  const cruiseUrls: MetadataRoute.Sitemap = cruises.map((cruise) => ({
    url: `${BASE_URL}/cruises/${cruise.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...routes,
    ...destinationUrls,
    ...itineraryUrls,
    ...postUrls,
    ...thingsUrls,
    ...tripIdeaUrls,
    ...inspirationUrls,
    ...monthUrls,
    ...accommodationUrls,
    ...cruiseUrls,
  ];
}
