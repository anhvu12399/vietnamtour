import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { getItineraryBySlug, getItineraries } from '@/sanity/client';

export const revalidate = 3600;

export async function generateStaticParams() {
  const itineraries = await getItineraries();
  return itineraries.filter((it) => it.slug?.current).map((it) => ({
    slug: it.slug.current,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);
  if (!itinerary) return {};

  const seo = itinerary.seo;
  const title = seo?.metaTitle || `${itinerary.title} – Luxury Vietnam Tours`;
  const description = seo?.metaDescription || `${itinerary.intro?.slice(0, 155)}...`;

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

export default async function ItineraryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);

  if (!itinerary) {
    notFound();
  }

  return (
    <>
      <Navbar />

      {/* Hero Header Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end justify-start">
        <div className="absolute inset-0 z-0">
          <Image
            src={itinerary.gallery[0]}
            alt={itinerary.title}
            fill
            className="object-cover brightness-[0.7] animate-fade-in"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/95 via-luxury-slate/20 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full text-white space-y-4">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-luxury-gold font-semibold">
            {itinerary.destination && (
              <>
                <Link href={`/destinations/${itinerary.destination?.slug?.current || ''}`} className="hover:underline">
                  {itinerary.destination.name}
                </Link>
                <span className="opacity-50">›</span>
                <Link href={`/destinations/${itinerary.destination?.slug?.current || ''}/tours/${itinerary.slug?.current || ''}`} className="hover:underline opacity-70">
                  Tours
                </Link>
              </>
            )}
            {!itinerary.destination && (
              <Link href="/#journeys" className="hover:underline flex items-center space-x-1.5">
                <span>←</span><span>Back to Journeys</span>
              </Link>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wider text-luxury-gold uppercase">
            <span>{itinerary.duration} Days Tailor-Made</span>
            <span>•</span>
            <span>From £{itinerary.priceFrom.toLocaleString('en-GB')} per person</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-[#343434]">
            {itinerary.title}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Columns - Description, Highlights, Timeline */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Overview */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl lg:text-3xl text-[#343434] font-medium border-b border-luxury-moss/50 pb-4">
                Overview
              </h2>
              <p className="text-base font-light text-[#545454] leading-relaxed">
                {itinerary.description?.[0]?.children?.[0]?.text || itinerary.intro}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-luxury-moss p-8 border border-[#e6e2d6] space-y-6">
              <h3 className="font-serif text-xl text-[#343434] font-medium">
                Trip Highlights
              </h3>
              <ul className="space-y-4">
                {itinerary.highlights.map((hl, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-luxury-gold font-semibold text-lg leading-none">✓</span>
                    <span className="text-sm sm:text-base text-[#343434]/75 font-light leading-relaxed">
                      {hl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day-by-Day Timeline */}
            <div className="space-y-12">
              <h2 className="font-serif text-2xl lg:text-3xl text-[#343434] font-medium border-b border-luxury-moss/50 pb-4">
                Day-by-Day Itinerary
              </h2>
              
              <div className="relative pl-6 sm:pl-8 border-l border-luxury-gold/40 space-y-16">
                {itinerary.timeline.map((item, idx) => (
                  <div key={idx} className="relative space-y-4">
                    {/* Circle Marker */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 bg-luxury-gold border-2 border-luxury-slate rounded-full" />
                    
                    {/* Header */}
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold block">
                        {item.dayRange}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-[#343434] font-medium">
                        {item.title}
                      </h3>
                    </div>

                    {/* Body */}
                    <p className="text-sm sm:text-base font-light text-[#343434]/75 leading-relaxed">
                      {item.description?.[0]?.children?.[0]?.text || ''}
                    </p>

                    {/* Accommodation Tag */}
                    {item.accommodation && (
                      <div className="pt-2">
                        {typeof item.accommodation === 'object' ? (
                          <div className="inline-flex items-center space-x-3 bg-luxury-moss/50 border border-luxury-moss/60 p-3 px-4">
                            <span className="text-[10px] uppercase tracking-wider text-[#545454]">Stay:</span>
                            <span className="text-xs font-semibold text-[#343434]">{item.accommodation.name}</span>
                            <span className="text-[10px] bg-luxury-gold/20 text-[#343434] px-2 py-0.5 rounded-none font-medium">
                              {item.accommodation.rating}
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-2 bg-luxury-moss/50 border border-luxury-moss/60 p-2 px-3 text-xs">
                            <span className="text-[10px] uppercase tracking-wider text-[#545454]">Stay:</span>
                            <span className="font-medium text-[#343434]">{item.accommodation}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Specialist Sidebar & Quick Actions */}
          <div className="space-y-10">
            {/* Specialist Panel */}
            <div className="bg-luxury-moss border border-luxury-moss p-8 text-center space-y-6 shadow-sm">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-luxury-gold font-semibold block">
                  Your Destination Curator
                </span>
                <h3 className="font-serif text-lg text-[#343434] font-semibold">
                  Plan with {itinerary.specialist.name}
                </h3>
              </div>

              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-[#e6e2d6]">
                <Image
                  src={itinerary.specialist.image}
                  alt={itinerary.specialist.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-[#343434]/70 font-light leading-relaxed">
                Alice has designed this journey based on personal travels. She can adjust any detail to suit your preferences.
              </p>

              <div className="pt-4 border-t border-luxury-slate space-y-4">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center"
                >
                  Request A Quote
                </Link>
                <div className="text-xs space-y-1.5 pt-2">
                  <p className="text-[#545454]">Direct Phone: <span className="font-semibold text-[#343434]">{itinerary.specialist.phone}</span></p>
                  <p className="text-[#545454]">Email: <span className="font-semibold text-[#343434]">{itinerary.specialist.email}</span></p>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="border border-luxury-moss p-8 space-y-4">
              <h4 className="font-serif text-sm tracking-widest uppercase text-[#343434] font-semibold">
                Trip Details
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm font-light text-[#545454]">
                <li className="flex justify-between py-1 border-b border-luxury-moss/50">
                  <span className="text-[#545454]">Pacing:</span>
                  <span className="font-medium">Relaxed / Luxury</span>
                </li>
                <li className="flex justify-between py-1 border-b border-luxury-moss/50">
                  <span className="text-[#545454]">Primary currency:</span>
                  <span className="font-medium">£ GBP (UK Market)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-luxury-moss/50">
                  <span className="text-[#545454]">Best Season:</span>
                  <span className="font-medium">Oct to Apr</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="text-[#545454]">Protection:</span>
                  <span className="font-medium text-luxury-gold">ATOL Protected</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Floating CTA bar */}
      <FloatingCTA
        title={itinerary.title}
        duration={itinerary.duration}
        priceFrom={itinerary.priceFrom}
      />

      <Footer />
    </>
  );
}
