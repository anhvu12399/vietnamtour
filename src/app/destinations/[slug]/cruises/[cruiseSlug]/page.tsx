/**
 * Silo route: /destinations/[slug]/cruises/[cruiseSlug]
 * Renders cruise detail page under destination-scoped URL for SEO Silo architecture.
 */
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCruiseBySlug, getCruisesByDestination, getDestinations } from '@/sanity/client';

export const revalidate = 3600;

export async function generateStaticParams() {
  const destinations = await getDestinations();
  const params: { slug: string; cruiseSlug: string }[] = [];
  for (const dest of destinations) {
    if (!dest.slug?.current) continue;
    const cruises = await getCruisesByDestination(dest.slug.current);
    for (const cruise of cruises) {
      if (!cruise.slug?.current) continue;
      params.push({ slug: dest.slug.current, cruiseSlug: cruise.slug.current });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ slug: string; cruiseSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cruiseSlug } = await params;
  const cruise = await getCruiseBySlug(cruiseSlug);
  if (!cruise) return {};

  const seo = cruise.seo;
  const title = seo?.metaTitle || `${cruise.title} – Luxury Vietnam Cruises`;
  const description = seo?.metaDescription || `Experience the stunning ${cruise.location} aboard a luxury cruise. Book with Vietnam Tour UK.`;

  return {
    title,
    description,
    keywords: seo?.keywords?.join(', '),
    openGraph: {
      title,
      description,
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
  };
}

export default async function DestinationCruisePage({ params }: PageProps) {
  const { slug, cruiseSlug } = await params;
  const cruise = await getCruiseBySlug(cruiseSlug);

  if (!cruise) notFound();

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end justify-start">
        <div className="absolute inset-0 z-0">
          {cruise.mainImage ? (
            <Image src={cruise.mainImage} alt={cruise.title} fill className="object-cover brightness-[0.65] animate-fade-in" priority />
          ) : (
            <div className="absolute inset-0 bg-luxury-slate" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/95 via-luxury-slate/30 to-transparent z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full space-y-4">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-luxury-gold font-semibold">
            <Link href={`/destinations/${slug}`} className="hover:underline">
              {cruise.destination?.name || slug}
            </Link>
            <span className="opacity-50">›</span>
            <span className="opacity-70">Cruises</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-luxury-linen">
            {cruise.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs font-semibold tracking-wider text-luxury-gold uppercase">
            {cruise.location && <span>{cruise.location}</span>}
            {cruise.duration && <><span>•</span><span>{cruise.duration}</span></>}
            {cruise.price && <><span>•</span><span>From £{cruise.price.toLocaleString('en-GB')}</span></>}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-10">
            {cruise.description && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-luxury-linen font-medium border-b border-luxury-moss/50 pb-4">
                  About This Cruise
                </h2>
                <p className="text-base font-light text-luxury-linen/80 leading-relaxed">{cruise.description}</p>
              </div>
            )}
          </div>

          {/* Right CTA */}
          <div className="space-y-8">
            <div className="bg-luxury-moss p-8 border border-luxury-gold/30 space-y-6 shadow-sm">
              <h3 className="font-serif text-xl text-luxury-linen font-medium">Enquire About This Cruise</h3>
              <p className="text-sm text-luxury-linen/75 font-light leading-relaxed">
                Our specialists can build a complete luxury itinerary around this cruise experience.
              </p>
              <Link
                href="/enquire"
                className="block w-full py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 text-center"
              >
                Request A Quote
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
