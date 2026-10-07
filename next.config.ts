import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      // One ranking URL per query: the visa guide for UK travellers lives at /visa-guide
      { source: '/vietnam-guides/vietnam-visa-for-uk-citizens', destination: '/visa-guide', permanent: true },
      // Duplicates of established /travel-guides/* posts: one URL per query
      { source: '/vietnam-guides/ha-long-bay-vs-lan-ha-bay', destination: '/travel-guides/halong-bay-vs-lan-ha-bay-guide', permanent: true },
      { source: '/vietnam-guides/vietnam-14-day-itinerary', destination: '/travel-guides/the-ultimate-14-day-vietnam-itinerary-a-british-guide-to-going-private', permanent: true },
      { source: '/vietnam-guides/vietnam-itinerary-10-14-days', destination: '/travel-guides/the-ultimate-14-day-vietnam-itinerary-a-british-guide-to-going-private', permanent: true },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
