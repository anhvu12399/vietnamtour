/**
 * Silo route: /destinations/[slug]/blog/[guideSlug]
 * Travel Guide article page with relatedTours cross-sell section.
 */
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  getTravelGuideBySlug,
  getTravelGuidesByDestination,
  getDestinations,
} from '@/sanity/client';
import { Itinerary, Cruise } from '@/sanity/types';

export const revalidate = 3600;

export async function generateStaticParams() {
  const destinations = await getDestinations();
  const params: { slug: string; guideSlug: string }[] = [];
  for (const dest of destinations) {
    const guides = await getTravelGuidesByDestination(dest.slug.current);
    for (const guide of guides) {
      params.push({ slug: dest.slug.current, guideSlug: guide.slug.current });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ slug: string; guideSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, guideSlug } = await params;
  const guide = await getTravelGuideBySlug(slug, guideSlug);
  if (!guide) return {};

  const seo = guide.seo;
  const title = seo?.metaTitle || `${guide.title} – Vietnam Travel Guide`;
  const description = seo?.metaDescription || `Read our expert travel guide: ${guide.title}. Insider tips, top experiences and recommended tours in Vietnam.`;

  return {
    title,
    description,
    keywords: seo?.keywords?.join(', '),
    openGraph: {
      title,
      description,
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
      ...(guide.mainImage && !seo?.ogImage && { images: [{ url: guide.mainImage }] }),
    },
  };
}

// Helper to distinguish Itinerary from Cruise in relatedTours
function isItinerary(tour: Itinerary | Cruise): tour is Itinerary {
  return (tour as Itinerary).duration !== undefined && typeof (tour as Itinerary).duration === 'number';
}

export default async function TravelGuidePage({ params }: PageProps) {
  const { slug, guideSlug } = await params;
  const guide = await getTravelGuideBySlug(slug, guideSlug);

  if (!guide) notFound();

  const relatedTours = guide.relatedTours || [];

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end justify-start">
        <div className="absolute inset-0 z-0">
          {guide.mainImage ? (
            <Image src={guide.mainImage} alt={guide.title} fill className="object-cover brightness-[0.65] animate-fade-in" priority />
          ) : (
            <div className="absolute inset-0 bg-luxury-slate" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/95 via-luxury-slate/30 to-transparent z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-luxury-gold font-semibold">
            <Link href={`/destinations/${slug}`} className="hover:underline">
              {guide.destination?.name || slug}
            </Link>
            <span className="opacity-50">›</span>
            <span className="opacity-70">Travel Guides</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-luxury-gold/70 font-semibold">
            Travel Guide
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-luxury-linen">
            {guide.title}
          </h1>
        </div>
      </section>

      {/* Article Body */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Article content – left 2 cols */}
          <div className="lg:col-span-2 space-y-12">
            {/* Content (PortableText simplified) */}
            {guide.content && guide.content.length > 0 && (
              <div className="prose prose-invert prose-lg max-w-none space-y-6">
                {guide.content.map((block: any, i: number) => (
                  <p key={i} className="text-base font-light text-luxury-linen/80 leading-relaxed">
                    {block.children?.map((c: any) => c.text).join('')}
                  </p>
                ))}
              </div>
            )}

            {/* Related Tours Cross-sell */}
            {relatedTours.length > 0 && (
              <section className="space-y-8 pt-8 border-t border-luxury-moss/50">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block">
                    Handpicked For You
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl text-luxury-linen font-medium">
                    Recommended Tours & Cruises
                  </h2>
                  <p className="text-sm text-luxury-linen/60 font-light">
                    Our specialists have selected these experiences to complement this guide.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedTours.map((tour) => {
                    const isTour = isItinerary(tour);
                    const image = isTour ? (tour as Itinerary).gallery?.[0] : (tour as Cruise).mainImage;
                    const detailHref = isTour
                      ? `/destinations/${slug}/tours/${tour.slug.current}`
                      : `/destinations/${slug}/cruises/${tour.slug.current}`;
                    const label = isTour ? 'Land Tour' : 'Cruise';
                    const meta = isTour
                      ? `${(tour as Itinerary).duration} Days · From £${(tour as Itinerary).priceFrom?.toLocaleString('en-GB')}`
                      : `${(tour as Cruise).duration || ''} · From £${(tour as Cruise).price?.toLocaleString('en-GB') || 'POA'}`;

                    return (
                      <div
                        key={tour._id}
                        className="bg-luxury-moss border border-luxury-gold/20 overflow-hidden flex flex-col group hover:shadow-xl hover:border-luxury-gold/40 transition-all duration-300"
                      >
                        {image && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={image}
                              alt={tour.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 bg-luxury-slate/80 text-luxury-gold text-[9px] uppercase tracking-widest px-2 py-1 font-semibold">
                              {label}
                            </div>
                          </div>
                        )}
                        <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                          <h3 className="font-serif text-base font-medium text-luxury-linen group-hover:text-luxury-gold transition-colors">
                            {tour.title}
                          </h3>
                          <div className="flex items-center justify-between pt-4 border-t border-luxury-slate/50">
                            <span className="text-xs text-luxury-linen/50 font-light">{meta}</span>
                            <Link
                              href={detailHref}
                              className="text-xs font-semibold text-luxury-gold hover:underline flex items-center space-x-1"
                            >
                              <span>View Details</span>
                              <span>→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA strip */}
                <div className="bg-luxury-moss/60 border border-luxury-gold/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-base text-luxury-linen">Looking for something more bespoke?</p>
                    <p className="text-xs text-luxury-linen/60 font-light">Our specialists craft journeys entirely around you.</p>
                  </div>
                  <Link
                    href="/enquire"
                    className="shrink-0 py-2.5 px-8 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 text-center"
                  >
                    Plan My Journey
                  </Link>
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-8">
            <div className="bg-luxury-moss p-8 border border-luxury-gold/30 space-y-6">
              <h3 className="font-serif text-lg text-luxury-linen font-medium">Explore {guide.destination?.name}</h3>
              <p className="text-sm text-luxury-linen/70 font-light leading-relaxed">
                Discover all tours, cruises and travel guides curated for this region.
              </p>
              <Link
                href={`/destinations/${slug}`}
                className="block w-full py-3 border border-luxury-gold text-luxury-gold font-semibold text-xs tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-slate transition-all duration-300 text-center"
              >
                View Destination
              </Link>
              <Link
                href="/enquire"
                className="block w-full py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 text-center"
              >
                Plan This Journey
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
