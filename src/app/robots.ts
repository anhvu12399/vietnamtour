import { MetadataRoute } from 'next';

const BASE_URL = 'https://vietnamtour.co.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'], // Block Sanity studio and API endpoints from indexing
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
