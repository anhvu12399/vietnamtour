import type { MetadataRoute } from 'next';
import {
  getItineraries,
  getPosts,
  getDestinations,
  getBlogPostsFromSanity,
} from '@/sanity/client';
import { thingsToDoData } from '@/lib/thingsToDoData';
import { tripIdeasData } from '@/lib/tripIdeasData';
import { inspirationsData } from '@/lib/inspirationsData';
import { ideasByMonthData } from '@/lib/ideasByMonthData';

const BASE_URL = 'https://www.vietnamtours.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic content from Sanity
  const [itineraries, travelGuides, destinations, blogPosts] = await Promise.all([
    getItineraries(),
    getPosts(),
    getDestinations(),
    getBlogPostsFromSanity(),
  ]);

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/itineraries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/travel-guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
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
      url: `${BASE_URL}/ideas-by-month`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/trip-ideas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/inspirations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/accommodations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/visa-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/enquire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/our-story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/specialists`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  // ── Dynamic itinerary pages ───────────────────────────────────────────────
  const itineraryPages: MetadataRoute.Sitemap = itineraries
    .filter((it) => it.slug?.current)
    .map((it) => ({
      url: `${BASE_URL}/itineraries/${it.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // ── Dynamic destination pages ─────────────────────────────────────────────
  const destinationPages: MetadataRoute.Sitemap = destinations
    .filter((d) => d.slug?.current)
    .map((d) => ({
      url: `${BASE_URL}/destinations/${d.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // ── Dynamic travel guide pages ────────────────────────────────────────────
  const guidePages: MetadataRoute.Sitemap = travelGuides
    .filter((p) => p.slug?.current)
    .map((p) => ({
      url: `${BASE_URL}/travel-guides/${p.slug.current}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // ── Dynamic blog pages ────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter((bp) => bp.slug?.current)
    .map((bp) => ({
      url: `${BASE_URL}/blog/${bp.slug.current}`,
      lastModified: bp.publishedAt ? new Date(bp.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // ── Static data-driven pages ──────────────────────────────────────────────
  const thingsToDoPages: MetadataRoute.Sitemap = thingsToDoData.map((t) => ({
    url: `${BASE_URL}/things-to-do/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tripIdeaPages: MetadataRoute.Sitemap = tripIdeasData.map((t) => ({
    url: `${BASE_URL}/trip-ideas/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const inspirationPages: MetadataRoute.Sitemap = inspirationsData.map((i) => ({
    url: `${BASE_URL}/inspirations/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const monthPages: MetadataRoute.Sitemap = ideasByMonthData.map((m) => ({
    url: `${BASE_URL}/ideas-by-month/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...itineraryPages,
    ...destinationPages,
    ...guidePages,
    ...blogPages,
    ...thingsToDoPages,
    ...tripIdeaPages,
    ...inspirationPages,
    ...monthPages,
  ];
}
