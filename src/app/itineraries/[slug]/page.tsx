import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { getItineraryBySlug, getItineraries } from '@/sanity/client';

export const revalidate = 3600;

// Generate static routes for itineraries to speed up production builds
export async function generateStaticParams() {
  const itineraries = await getItineraries();
  return itineraries.map((it) => ({
    slug: it.slug.current,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
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
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/20 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full text-white space-y-4">
          <Link
            href="/#journeys"
            className="text-xs uppercase tracking-widest text-warm-sand font-semibold hover:underline flex items-center space-x-1.5"
          >
            <span>←</span>
            <span>Back to Journeys</span>
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wider text-warm-sand uppercase">
            <span>{itinerary.duration} Days Tailor-Made</span>
            <span>•</span>
            <span>From £{itinerary.priceFrom.toLocaleString('en-GB')} per person</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl">
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
              <h2 className="font-serif text-2xl lg:text-3xl text-deep-green font-medium border-b border-linen pb-4">
                Overview
              </h2>
              <p className="text-base font-light text-primary-dark/80 leading-relaxed">
                {itinerary.description[0]?.children[0]?.text || itinerary.intro}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-linen p-8 border border-border-gold/30 space-y-6">
              <h3 className="font-serif text-xl text-deep-green font-medium">
                Trip Highlights
              </h3>
              <ul className="space-y-4">
                {itinerary.highlights.map((hl, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-burnt-sienna font-semibold text-lg leading-none">✓</span>
                    <span className="text-sm sm:text-base text-primary-dark/75 font-light leading-relaxed">
                      {hl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day-by-Day Timeline */}
            <div className="space-y-12">
              <h2 className="font-serif text-2xl lg:text-3xl text-deep-green font-medium border-b border-linen pb-4">
                Day-by-Day Itinerary
              </h2>
              
              <div className="relative pl-6 sm:pl-8 border-l border-border-gold/40 space-y-16">
                {itinerary.timeline.map((item, idx) => (
                  <div key={idx} className="relative space-y-4">
                    {/* Circle Marker */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 bg-burnt-sienna border-2 border-canvas-light rounded-full" />
                    
                    {/* Header */}
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-widest text-burnt-sienna font-semibold block">
                        {item.dayRange}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-deep-green font-medium">
                        {item.title}
                      </h3>
                    </div>

                    {/* Body */}
                    <p className="text-sm sm:text-base font-light text-primary-dark/75 leading-relaxed">
                      {item.description[0]?.children[0]?.text}
                    </p>

                    {/* Accommodation Tag */}
                    {item.accommodation && (
                      <div className="pt-2">
                        {typeof item.accommodation === 'object' ? (
                          <div className="inline-flex items-center space-x-3 bg-linen/50 border border-linen p-3 px-4">
                            <span className="text-[10px] uppercase tracking-wider text-primary-dark/50">Stay:</span>
                            <span className="text-xs font-semibold text-deep-green">{item.accommodation.name}</span>
                            <span className="text-[10px] bg-border-gold/30 text-deep-green px-2 py-0.5 rounded-none font-medium">
                              {item.accommodation.rating}
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-2 bg-linen/50 border border-linen p-2 px-3 text-xs">
                            <span className="text-[10px] uppercase tracking-wider text-primary-dark/50">Stay:</span>
                            <span className="font-medium text-deep-green">{item.accommodation}</span>
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
            <div className="bg-white border border-linen p-8 text-center space-y-6 shadow-sm">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-burnt-sienna font-semibold block">
                  Your Destination Curator
                </span>
                <h3 className="font-serif text-lg text-deep-green font-semibold">
                  Plan with {itinerary.specialist.name}
                </h3>
              </div>

              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-border-gold/30">
                <Image
                  src={itinerary.specialist.image}
                  alt={itinerary.specialist.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-primary-dark/70 font-light leading-relaxed">
                Alice has designed this journey based on personal travels. She can adjust any detail to suit your preferences.
              </p>

              <div className="pt-4 border-t border-linen space-y-4">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-deep-green hover:bg-deep-green/95 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center"
                >
                  Request A Quote
                </Link>
                <div className="text-xs space-y-1.5 pt-2">
                  <p className="text-primary-dark/50">Direct Phone: <span className="font-semibold text-deep-green">{itinerary.specialist.phone}</span></p>
                  <p className="text-primary-dark/50">Email: <span className="font-semibold text-deep-green">{itinerary.specialist.email}</span></p>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="border border-linen p-8 space-y-4">
              <h4 className="font-serif text-sm tracking-widest uppercase text-deep-green font-semibold">
                Trip Details
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm font-light text-primary-dark/80">
                <li className="flex justify-between py-1 border-b border-linen">
                  <span className="text-primary-dark/50">Pacing:</span>
                  <span className="font-medium">Relaxed / Luxury</span>
                </li>
                <li className="flex justify-between py-1 border-b border-linen">
                  <span className="text-primary-dark/50">Primary currency:</span>
                  <span className="font-medium">£ GBP (UK Market)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-linen">
                  <span className="text-primary-dark/50">Best Season:</span>
                  <span className="font-medium">Oct to Apr</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="text-primary-dark/50">Protection:</span>
                  <span className="font-medium text-deep-green">ATOL Protected</span>
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
