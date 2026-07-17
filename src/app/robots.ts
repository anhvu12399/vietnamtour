import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Only disallow admin/API routes. For pages with noindex meta (like /enquire),
      // we allow crawling so Googlebot can read the noindex directive.
      // Blocking via robots.txt prevents Google from even seeing the noindex meta.
      disallow: [
        '/studio/',
        '/api/',
      ],
    },
    sitemap: 'https://www.vietnamtours.co.uk/sitemap.xml',
  };
}
