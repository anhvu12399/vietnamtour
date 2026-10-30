import type { MetadataRoute } from 'next';
import {
  getItineraries, getPosts, getDestinations, getSpecialists, getAccommodations,
  getBlogPostsFromSanity, getTripIdeasFromSanity, getInspirationsFromSanity,
  getMonthGuidesFromSanity, getThingsToDoFromSanity,
} from '@/sanity/client';
import { thingsToDoData } from '@/lib/thingsToDoData';
import { tripIdeasData } from '@/lib/tripIdeasData';
import { inspirationsData } from '@/lib/inspirationsData';
import { ideasByMonthData } from '@/lib/ideasByMonthData';
import { canonicalUrl, validIsoDate } from '@/lib/seo';

export const revalidate = 60;
interface SitemapDocument {
  slug?: { current?: string } | string;
  _updatedAt?: string;
  publishedAt?: string;
  hasContent?: boolean;
  seo?: { noIndex?: boolean };
}
function entries(documents: SitemapDocument[], prefix: string): MetadataRoute.Sitemap {
  const unique = new Map(documents.map((doc) => [typeof doc.slug === 'string' ? doc.slug : doc.slug?.current, doc]));
  return [...unique.values()].filter((doc) => !doc.seo?.noIndex).flatMap((doc) => {
    const slug = typeof doc.slug === 'string' ? doc.slug : doc.slug?.current;
    if (!slug) return [];
    const modified = validIsoDate(doc._updatedAt || doc.publishedAt);
    return [{ url: canonicalUrl(`${prefix}/${slug}`), ...(modified && { lastModified: modified }) }];
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, guides, destinations, specialists, hotels, blogs, tripIdeas, inspirations, months, things] = await Promise.all([
    getItineraries(), getPosts(), getDestinations(), getSpecialists(), getAccommodations(),
    getBlogPostsFromSanity(), getTripIdeasFromSanity(), getInspirationsFromSanity(),
    getMonthGuidesFromSanity(), getThingsToDoFromSanity(),
  ]);
  const urls: MetadataRoute.Sitemap = [
    ...['', '/itineraries', '/destinations', '/travel-guides', '/blog', '/things-to-do',
      '/ideas-by-month', '/trip-ideas', '/inspirations', '/accommodations', '/visa-guide',
      '/specialists', '/our-story', '/privacy-policy', '/terms', '/editorial-policy'].map((path) => ({ url: canonicalUrl(path) })),
    ...entries(tours, '/itineraries'),
    ...entries(guides, '/travel-guides'),
    ...entries(destinations, '/destinations'),
    ...entries(specialists, '/specialists'),
    ...entries(hotels, '/accommodations'),
    // Imported empty mirrors are redirects, not sitemap destinations.
    ...entries((blogs as SitemapDocument[]).filter((blog) => blog.hasContent), '/blog'),
    ...entries([...thingsToDoData, ...things], '/things-to-do'),
    ...entries([...tripIdeasData, ...tripIdeas], '/trip-ideas'),
    ...entries([...inspirationsData, ...inspirations], '/inspirations'),
    ...entries([...ideasByMonthData, ...months], '/ideas-by-month'),
  ];
  return [...new Map(urls.map((entry) => [entry.url, entry])).values()];
}
