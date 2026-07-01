/**
 * Silo route: /destinations/[slug]/tours/[tourSlug]
 * Renders the same itinerary detail page but under a destination-scoped URL
 * for SEO Silo architecture. The canonical content lives at this URL.
 */
import { redirect } from 'next/navigation';
import { getDestinations, getItineraries } from '@/sanity/client';

export const revalidate = 3600;

export async function generateStaticParams() {
  const [destinations, itineraries] = await Promise.all([
    getDestinations(),
    getItineraries(),
  ]);

  const params: { slug: string; tourSlug: string }[] = [];
  for (const dest of destinations) {
    if (!dest.slug?.current) continue;
    for (const it of itineraries) {
      if (!it.slug?.current) continue;
      // Include only tours whose destination matches or tours that have no destination
      if (!it.destination || it.destination?.slug?.current === dest.slug.current) {
        params.push({ slug: dest.slug.current, tourSlug: it.slug.current });
      }
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ slug: string; tourSlug: string }>;
}

// For silo linking we reuse the /itineraries/[slug] page content.
// We pass the destination context via the URL for breadcrumbs.
export default async function DestinationTourPage({ params }: PageProps) {
  const { tourSlug } = await params;
  // Redirect to the canonical itinerary detail page which reads destination from Sanity
  redirect(`/itineraries/${tourSlug}`);
}
