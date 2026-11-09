import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { enquiryUrl } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import ItineraryMap from '@/components/ItineraryMapWrapper';
import RouteStrip from '@/components/RouteStrip';
import TimelineInteractive from '@/components/TimelineInteractive';
import { getItineraryBySlug, getItineraries } from '@/sanity/client';
import { getRoutePoints, generateDayByDayTimeline } from '@/lib/itineraryDetailsBuilder';
import { getItineraryCitation } from '@/lib/tour-citations';

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
  let itinerary;
  try {
    itinerary = await getItineraryBySlug(slug);
  } catch (err) {
    console.warn(`[generateMetadata] Sanity fetch warning for ${slug}:`, err);
    return { title: 'Vietnam Tailor-Made Itinerary | Vietnam Tours' };
  }
  if (!itinerary) return {};

  const seo = itinerary.seo;
  const title = itinerary.title;
  const description = seo?.metaDescription || `${itinerary.intro?.slice(0, 155)}...`;

  const baseKeywords = ["Vietnam private itinerary", "Luxury Vietnam tours", "Bespoke Vietnam holidays", "Tailor-made Vietnam trips", "Vietnam custom tours"];
  let dynamicKeywords = seo?.keywords || [];
  if (dynamicKeywords.length === 0) {
    const destName = itinerary.destination?.name || 'Vietnam';
    dynamicKeywords = [
      itinerary.title,
      `${itinerary.title} private tour`,
      `${itinerary.title} itinerary`,
      `${destName} private tour`,
      `${destName} holiday`,
      `${itinerary.duration} days in Vietnam`
    ];
  }
  const mergedKeywords = Array.from(new Set([...baseKeywords, ...dynamicKeywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    robots: { index: !seo?.noIndex, follow: true },
    alternates: {
      canonical: `https://www.vietnamtours.co.uk/itineraries/${slug}`,
    },
    openGraph: {
      url: `https://www.vietnamtours.co.uk/itineraries/${slug}`,
      title,
      description,
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
  };
}

export default async function ItineraryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let itinerary;
  try {
    itinerary = await getItineraryBySlug(slug);
  } catch (err) {
    console.warn(`[ItineraryDetailPage] Sanity fetch error for ${slug}:`, err);
  }

  if (!itinerary) {
    notFound();
  }

  // Build route points and Day-by-Day timeline dynamically
  const routePoints = getRoutePoints(itinerary);
  const timelineDays = generateDayByDayTimeline(itinerary);
  const citation = getItineraryCitation(slug, itinerary.destination?.name);

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
            <span>{itinerary.catalogueSource ? 'Archived guide price' : 'From'} £{itinerary.priceFrom.toLocaleString('en-GB')} per person</span>
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

            {itinerary.catalogueSource && <p className="border border-line p-4 text-sm leading-relaxed text-ink-soft">This sample route and guide price come from our existing catalogue. Ask us to confirm current operation, hotels, inclusions and pricing for your dates before booking.</p>}

            {/* Authentic Expert Quote Callout & Verified Geographic Facts */}
            {citation && (
              <div className="space-y-6 text-left">
                {/* Quote Callout */}
                <figure className="bg-paper-dim border-l-4 border-gold p-6 sm:p-7 rounded-r shadow-xs">
                  <blockquote cite={citation.quote.sourceUrl} className="mb-3">
                    <p className="font-serif italic text-xl sm:text-2xl text-ink leading-snug">
                      “{citation.quote.text}”
                    </p>
                  </blockquote>
                  <figcaption className="text-xs sm:text-sm text-ink-soft space-y-0.5">
                    <div className="font-semibold text-ink">— {citation.quote.author}</div>
                    <div className="text-xs text-ink-soft/80">{citation.quote.role}</div>
                    <a
                      href={citation.quote.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-xs text-gold hover:text-ink font-medium underline underline-offset-2"
                    >
                      Source: {citation.quote.source} ↗
                    </a>
                  </figcaption>
                </figure>

                {/* Verified Facts Card */}
                {citation.stats && citation.stats.length > 0 && (
                  <div className="border border-line bg-paper p-6 sm:p-7 shadow-xs">
                    <div className="flex flex-wrap items-baseline gap-2 pb-3 mb-4 border-b border-line">
                      <span className="text-xs font-bold uppercase tracking-wider text-ink">
                        ✓ Verified Geographical & Heritage Facts
                      </span>
                      <span className="text-xs text-ink-soft">
                        Official records from UNESCO, MRC & National Authorities
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {citation.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="bg-paper-dim p-4 rounded border-l-2 border-gold">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-1">
                            {stat.label}
                          </div>
                          <div className="text-sm font-medium text-ink mb-2 leading-relaxed">
                            {stat.value}
                          </div>
                          <a
                            href={stat.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-jade-deep hover:text-gold underline underline-offset-2"
                          >
                            Source: {stat.source} ↗
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Interactive Journey Map */}
            <div className="space-y-6 text-left">
              <h2 className="font-serif text-2xl lg:text-3xl text-ink font-medium border-b border-jade-deep/50 pb-4">
                Interactive Journey Map
              </h2>
              {routePoints.length > 0 && <ItineraryMap points={routePoints} />}
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
                    Weather differs between the north, central coast and south. <Link href="/ideas-by-month" className="underline">Compare travel months</Link> before choosing your dates.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">What to Pack</h4>
                  <p className="font-light">
                    Pack lightweight linen clothing for walking. Smart casual attire is recommended for dining at luxury hotels. Don&apos;t forget sun protection and comfortable walking shoes.
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
                  Plan with {itinerary.specialist?.name || 'our travel team'}
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
                Discuss the route, accommodation and pace with our team. Your proposal will confirm the arrangements available for your dates.
              </p>

              <div className="pt-4 border-t border-luxury-linen/20 space-y-4">
                <Link
                  href={enquiryUrl(itinerary.title)}
                  className="block w-full py-3 bg-gold hover:bg-gold/90 text-ink font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center"
                >
                  Request A Quote
                </Link>
                <div className="text-xs space-y-1.5 pt-2">
                  <p className="text-paper/60">Direct Phone: <span className="font-semibold text-white">{itinerary.specialist?.phone || '+84988600388'}</span></p>
                  <p className="text-paper/60">Email: <span className="font-semibold text-white">{itinerary.specialist?.email || 'info@vietnamtours.co.uk'}</span></p>
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
        archived={Boolean(itinerary.catalogueSource)}
      />

      <Footer />
    </>
  );
}
