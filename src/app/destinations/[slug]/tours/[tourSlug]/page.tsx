import { notFound, permanentRedirect } from 'next/navigation';
import { getDestinationBySlug, getItineraryBySlug, getItineraries } from '@/sanity/client';

export const revalidate = 60;

export async function generateStaticParams() {
  const itineraries = await getItineraries();
  return itineraries.filter((tour) => tour.destination?.slug?.current && tour.slug?.current).map((tour) => ({
    slug: tour.destination!.slug.current, tourSlug: tour.slug.current,
  }));
}
interface PageProps { params: Promise<{ slug: string; tourSlug: string }> }

export default async function DestinationTourPage({ params }: PageProps) {
  const { slug, tourSlug } = await params;
  const [destination, tour] = await Promise.all([getDestinationBySlug(slug), getItineraryBySlug(tourSlug)]);
  if (!destination || !tour || (tour.destination && tour.destination.slug.current !== slug)) notFound();
  permanentRedirect(`/itineraries/${tourSlug}`);
}
