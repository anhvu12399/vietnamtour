import type { MetadataRoute } from 'next';
import {
  getItineraries,
  getPosts,
  getDestinations,
  getSpecialists,
} from '@/sanity/client';
import { thingsToDoData } from '@/lib/thingsToDoData';
import { tripIdeasData } from '@/lib/tripIdeasData';
import { inspirationsData } from '@/lib/inspirationsData';
import { ideasByMonthData } from '@/lib/ideasByMonthData';

const BASE_URL = 'https://www.vietnamtours.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic content from Sanity
  const [itineraries, travelGuides, destinations, specialists] = await Promise.all([
    getItineraries(),
    getPosts(),          // _type == "post" → /travel-guides/[slug]
    getDestinations(),
    getSpecialists(),
  ]);

  // ── Static pages ──────────────────────────────────────────────────────────
  // NOTE: Only include pages that:
  //   1. Return HTTP 200
  //   2. Are indexable (no noindex meta)
  //   3. Have meaningful content
  //   4. Are NOT blocked in robots.txt
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/itineraries`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/destinations`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/travel-guides`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-07-16'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/things-to-do`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ideas-by-month`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/trip-ideas`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/inspirations`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/visa-guide`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/specialists`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/our-story`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    // NOTE: REMOVED from sitemap:
    //   - /enquire    → robots.txt Disallow + noindex meta
    //   - /accommodations → no content (0 accommodation documents in Sanity)
  ];

  // ── Dynamic itinerary pages ───────────────────────────────────────────────
  const itineraryPages: MetadataRoute.Sitemap = itineraries
    .filter((it) => it.slug?.current)
    .map((it) => ({
      url: `${BASE_URL}/itineraries/${it.slug.current}`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // ── Dynamic destination pages ─────────────────────────────────────────────
  const destinationPages: MetadataRoute.Sitemap = destinations
    .filter((d) => d.slug?.current)
    .map((d) => ({
      url: `${BASE_URL}/destinations/${d.slug.current}`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // ── Dynamic travel guide pages ────────────────────────────────────────────
  // These are the canonical URLs for all blog content.
  // /blog/[slug] pages are MIRRORS of these — they self-canonical to /travel-guides/[slug]
  const guidePages: MetadataRoute.Sitemap = travelGuides
    .filter((p) => p.slug?.current)
    .map((p) => ({
      url: `${BASE_URL}/travel-guides/${p.slug.current}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date('2026-07-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // NOTE: /blog/[slug] pages are intentionally NOT in the sitemap.
  // They all self-canonical to /travel-guides/[slug] to avoid duplicate content.
  // Only /travel-guides/[slug] is the canonical URL.

  // ── Static data-driven pages ──────────────────────────────────────────────
  const thingsToDoPages: MetadataRoute.Sitemap = thingsToDoData.map((t) => ({
    url: `${BASE_URL}/things-to-do/${t.slug}`,
    lastModified: new Date('2026-07-15'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tripIdeaPages: MetadataRoute.Sitemap = tripIdeasData.map((t) => ({
    url: `${BASE_URL}/trip-ideas/${t.slug}`,
    lastModified: new Date('2026-07-15'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const inspirationPages: MetadataRoute.Sitemap = inspirationsData.map((i) => ({
    url: `${BASE_URL}/inspirations/${i.slug}`,
    lastModified: new Date('2026-07-15'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const monthPages: MetadataRoute.Sitemap = ideasByMonthData.map((m) => ({
    url: `${BASE_URL}/ideas-by-month/${m.slug}`,
    lastModified: new Date('2026-07-15'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ── Specialist pages ──────────────────────────────────────────────────────
  const specialistPages: MetadataRoute.Sitemap = specialists
    .filter((s) => s.slug?.current)
    .map((s) => ({
      url: `${BASE_URL}/specialists/${s.slug.current}`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  return [
    ...staticPages,
    ...itineraryPages,
    ...destinationPages,
    ...guidePages,
    ...thingsToDoPages,
    ...tripIdeaPages,
    ...inspirationPages,
    ...monthPages,
    ...specialistPages,
  ];
}
