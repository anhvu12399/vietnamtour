import type { MetadataRoute } from 'next';
import { AI_SEARCH_BOTS, AI_TRAINING_BOTS, ALLOW_AI_TRAINING, SITE_URL } from '@/lib/siteConfig';

// Only disallow admin/API routes. Pages with a noindex meta (e.g. /enquire, /blog/*)
// must stay crawlable so bots can read the noindex directive — blocking them in
// robots.txt would prevent that.
const PRIVATE_PATHS = ['/studio/', '/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      // Search-facing AI crawlers: required to be cited in ChatGPT / Perplexity / Claude search.
      { userAgent: [...AI_SEARCH_BOTS], allow: '/', disallow: PRIVATE_PATHS },
      // Training crawlers: separate business decision (GEO_ALLOW_AI_TRAINING=false to block).
      ALLOW_AI_TRAINING
        ? { userAgent: [...AI_TRAINING_BOTS], allow: '/', disallow: PRIVATE_PATHS }
        : { userAgent: [...AI_TRAINING_BOTS], disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
