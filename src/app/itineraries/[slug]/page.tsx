import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import ItineraryMap from '@/components/ItineraryMapWrapper';
import RouteStrip from '@/components/RouteStrip';
import TimelineInteractive from '@/components/TimelineInteractive';
import { getItineraryBySlug, getItineraries } from '@/sanity/client';
import { getRoutePoints, generateDayByDayTimeline } from '@/lib/itineraryDetailsBuilder';
import { BreadcrumbJsonLd, FaqJsonLd, TouristTripJsonLd, WebPageJsonLd } from '@/components/SeoJsonLd';
import { GeoAnswer, GeoFaqSection, GeoSources } from '@/components/GeoBlocks';
import { itineraryAnswer, itineraryFaqs } from '@/lib/geoDefaults';
import { CONTENT_REVIEWED_AT, absoluteUrl } from '@/lib/siteConfig';

export const revalidate = 60;

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

  const url = absoluteUrl(`/itineraries/${slug}`);
  const ogImage = seo?.ogImage || itinerary.gallery?.[0];
  return {
    title,
    description,
    keywords: seo?.keywords?.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'en_GB',
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: { card: 'summary_large_image', title, description, ...(ogImage && { images: [ogImage] }) },
  };
}

export default async function ItineraryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);

  if (!itinerary) {
    notFound();
  }

  // Build route points and Day-by-Day timeline dynamically
  const routePoints = getRoutePoints(itinerary);
  const timelineDays = generateDayByDayTimeline(itinerary);

  const pageUrl = absoluteUrl(`/itineraries/${itinerary.slug.current}`);
  const answer = itineraryAnswer(itinerary);
  const faqs = itineraryFaqs(itinerary);
  const reviewedAt = itinerary.lastReviewedAt || (itinerary._updatedAt ? itinerary._updatedAt.slice(0, 10) : CONTENT_REVIEWED_AT);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Itineraries', url: '/itineraries' },
          ...(itinerary.destination?.slug?.current
            ? [{ name: itinerary.destination.name, url: `/destinations/${itinerary.destination.slug.current}` }]
            : []),
          { name: itinerary.title, url: pageUrl },
        ]}
      />
      <WebPageJsonLd
        name={itinerary.seo?.metaTitle || itinerary.title}
        description={answer}
        url={pageUrl}
        modifiedAt={reviewedAt}
        speakable={['[data-answer]']}
      />
      <TouristTripJsonLd
        name={itinerary.title}
        description={answer}
        url={pageUrl}
        image={(itinerary.gallery || []).slice(0, 4)}
        duration={itinerary.duration}
        price={itinerary.priceFrom}
        destination={itinerary.destination?.name || 'Vietnam'}
        days={timelineDays.map((d) => ({ name: `Day ${d.dayNumber}: ${d.title}`, description: d.description }))}
        highlights={itinerary.highlights}
        modifiedAt={reviewedAt}
      />
      <FaqJsonLd faqs={faqs} />

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
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gold font-semibold">
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
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wider text-gold uppercase">
            <span>{itinerary.duration} Days Tailor-Made</span>
            <span>•</span>
            <span>From £{itinerary.priceFrom.toLocaleString('en-GB')} per person</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-white">
            {itinerary.title}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Columns - Description, Highlights, Map, Timeline, Tips */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Direct answer — quotable by answer engines */}
            <GeoAnswer answer={answer} reviewedAt={reviewedAt} />

            {/* Overview */}
            <div className="space-y-6 text-left">
              <h2 className="font-serif text-2xl lg:text-3xl text-ink font-medium border-b border-jade-deep/50 pb-4">
                Overview
              </h2>
              <p className="text-base font-light text-ink-soft leading-relaxed">
                {itinerary.description?.[0]?.children?.[0]?.text || itinerary.intro}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-jade-deep p-8 border border-line space-y-6 text-left">
              <h3 className="font-serif text-xl text-white font-medium">
                Trip Highlights
              </h3>
              <ul className="space-y-4">
                {itinerary.highlights.map((hl, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-gold font-semibold text-lg leading-none">✓</span>
                    <span className="text-sm sm:text-base text-paper/90 font-light leading-relaxed">
                      {hl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Journey Map */}
            <div className="space-y-6 text-left">
              <h2 className="font-serif text-2xl lg:text-3xl text-ink font-medium border-b border-jade-deep/50 pb-4">
                Interactive Journey Map
              </h2>
              <ItineraryMap points={routePoints} />
              <RouteStrip points={routePoints} />
            </div>

            {/* Day-by-Day Timeline */}
            <div className="space-y-12">
              <h2 className="font-serif text-2xl lg:text-3xl text-ink font-medium border-b border-jade-deep/50 pb-4 text-left">
                Day-by-Day Itinerary
              </h2>
              
              <TimelineInteractive timelineDays={timelineDays} />
            </div>

            {/* Essential Expedition Tips & Info */}
            <div className="border border-jade-deep p-8 space-y-8 bg-paper-dim text-left">
              <h3 className="font-serif text-2xl text-ink font-semibold border-b border-line pb-3">
                📍 Expedition Planning & Practical Info
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm leading-relaxed text-ink-soft">
                <div className="space-y-2">
                  <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Best Time to Travel</h4>
                  <p className="font-light">
                    The best season for this route is <strong>October to April</strong>. The skies are generally clear and temperatures are comfortable.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">What to Pack</h4>
                  <p className="font-light">
                    Pack lightweight linen clothing for walking. Smart casual attire is recommended for dining at luxury hotels. Don't forget sun protection and comfortable walking shoes.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Practical Info</h4>
                  <p className="font-light">
                    UK passport holders require a visa for stays exceeding 45 days. Local currency is VND, though credit cards are widely accepted at all pre-selected luxury establishments.
                  </p>
                </div>
              </div>
            </div>

            <GeoFaqSection faqs={faqs} heading={`${itinerary.title}: your questions answered`} />
            <GeoSources sources={itinerary.sources} />

          </div>

          {/* Right Column - Specialist Sidebar & Quick Actions */}
          <div className="space-y-10">
            {/* Specialist Panel */}
            <div className="bg-jade-deep border border-jade-deep p-8 text-center space-y-6 shadow-sm">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">
                  Your Destination Curator
                </span>
                <h3 className="font-serif text-lg text-white font-semibold">
                  Plan with {itinerary.specialist.name}
                </h3>
              </div>

              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-line">
                {itinerary.specialist?.image && (
                  <Image
                    src={typeof itinerary.specialist.image === 'string' ? itinerary.specialist.image : itinerary.specialist.image}
                    alt={itinerary.specialist.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <p className="text-xs sm:text-sm text-paper/80 font-light leading-relaxed">
                {itinerary.specialist?.name?.split(' ')[0] || 'Our specialist'} has designed this journey based on personal travels. They can adjust any detail to suit your preferences.
              </p>

              <div className="pt-4 border-t border-luxury-linen/20 space-y-4">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-gold hover:bg-gold/90 text-ink font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center"
                >
                  Request A Quote
                </Link>
                <div className="text-xs space-y-1.5 pt-2">
                  <p className="text-paper/60">Direct Phone: <span className="font-semibold text-white">{itinerary.specialist.phone}</span></p>
                  <p className="text-paper/60">Email: <span className="font-semibold text-white">{itinerary.specialist.email}</span></p>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="border border-jade-deep p-8 space-y-4 text-left">
              <h4 className="font-serif text-sm tracking-widest uppercase text-ink font-semibold">
                Trip Details
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm font-light text-ink-soft">
                <li className="flex justify-between py-1 border-b border-jade-deep/50">
                  <span className="text-ink-soft">Pacing:</span>
                  <span className="font-medium">Relaxed / Luxury</span>
                </li>
                <li className="flex justify-between py-1 border-b border-jade-deep/50">
                  <span className="text-ink-soft">Primary currency:</span>
                  <span className="font-medium">£ GBP (UK Market)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-jade-deep/50">
                  <span className="text-ink-soft">Best Season:</span>
                  <span className="font-medium">Oct to Apr</span>
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
