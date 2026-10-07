import type { MetadataRoute } from 'next';
import { getSiteEntries, staticPages } from '@/lib/siteIndex';
import { CONTENT_REVIEWED_AT, absoluteUrl } from '@/lib/siteConfig';

export const revalidate = 3600;

// lastModified comes from Sanity `_updatedAt` (or the editorial review date for
// code-based pages) so Bing / OAI-SearchBot get honest freshness signals.
// changeFrequency / priority are ignored by Google and Bing, so they are omitted.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSiteEntries();
  const editorialDate = new Date(CONTENT_REVIEWED_AT);

  const top: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: editorialDate,
  }));

  const seen = new Set(top.map((t) => t.url));
  const dynamic: MetadataRoute.Sitemap = entries
    .filter((e) => !seen.has(e.url))
    .map((e) => ({ url: e.url, lastModified: e.lastModified }));

  return [...top, ...dynamic];
}
