import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  getDestinationBySlug,
  getDestinations,
  getTravelGuidesByDestination,
  getCruisesByDestination,
} from '@/sanity/client';
import { PortableText } from '@portabletext/react';
import { BreadcrumbJsonLd, FaqJsonLd, TouristDestinationJsonLd, WebPageJsonLd } from '@/components/SeoJsonLd';
import { GeoAnswer, GeoFaqSection, GeoSources, PlanningGuides } from '@/components/GeoBlocks';
import { destinationAnswer, destinationFaqs } from '@/lib/geoDefaults';
import { CONTENT_REVIEWED_AT, absoluteUrl, stripBrand } from '@/lib/siteConfig';

export const revalidate = 60;

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.filter((dest) => dest.slug?.current).map((dest) => ({
    slug: dest.slug.current,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};

  const seo = destination.seo;
  const title = stripBrand(seo?.metaTitle || '') || `${destination.name} – Luxury Vietnam Tours`;
  const description = seo?.metaDescription || `Discover the beauty of ${destination.name}. Explore tailor-made luxury tours, travel guides and insider tips with Vietnam Tour UK.`;

  const url = absoluteUrl(`/destinations/${slug}`);
  const ogImage = seo?.ogImage || destination.image;
  const baseKeywords = [`Visit ${destination.name}`, `${destination.name} luxury travel`, `Best places in ${destination.name}`, "Vietnam luxury tours", "Vietnam private holidays"];
  const dynamicKeywords = seo?.keywords || [];
  const mergedKeywords = Array.from(new Set([...baseKeywords, ...dynamicKeywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: seo?.canonicalUrl || `https://www.vietnamtours.co.uk/destinations/${slug}`,
    },
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

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [destination, guides, cruises] = await Promise.all([
    getDestinationBySlug(slug),
    getTravelGuidesByDestination(slug),
    getCruisesByDestination(slug),
  ]);

  if (!destination) {
    notFound();
  }

  const featuredTours = destination.featuredTours || [];

  const pageUrl = absoluteUrl(`/destinations/${destination.slug.current}`);
  const answer = destinationAnswer(destination);
  const faqs = destinationFaqs(destination);
  const reviewedAt = destination.lastReviewedAt || (destination._updatedAt ? destination._updatedAt.slice(0, 10) : CONTENT_REVIEWED_AT);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Destinations', url: '/destinations' },
          { name: destination.name, url: pageUrl },
        ]}
      />
      <WebPageJsonLd name={`${destination.name} – Luxury Vietnam Tours`} description={answer} url={pageUrl} modifiedAt={reviewedAt} speakable={['[data-answer]']} />
      <TouristDestinationJsonLd
        name={destination.name}
        description={answer}
        url={pageUrl}
        image={destination.image}
        includesAttraction={destination.highlights}
      />
      <FaqJsonLd faqs={faqs} />

      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end justify-start">
        <div className="absolute inset-0 z-0">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover brightness-[0.7] animate-fade-in"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/95 via-luxury-slate/20 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full text-white space-y-4">
          <Link
            href="/destinations"
            className="text-xs uppercase tracking-widest text-gold font-semibold hover:underline flex items-center space-x-1.5"
          >
            <span>←</span>
            <span>All Destinations</span>
          </Link>
          <div className="flex items-center space-x-3 text-xs font-semibold tracking-wider text-gold uppercase">
            <span>Vietnam</span>
            <span>•</span>
            <span>{destination.bestTimeToVisit}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-white">
            {destination.name}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left columns */}
          <div className="lg:col-span-2 space-y-20">
            
            <GeoAnswer answer={answer} reviewedAt={reviewedAt} label={`${destination.name} at a glance`} />

            {/* Description */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl lg:text-3xl text-ink font-medium border-b border-jade-deep/50 pb-4">
                Region Overview
              </h2>
              <div className="text-base font-light text-ink-soft leading-relaxed space-y-4 [&>p]:mb-4 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:text-ink [&>h3]:mt-8 [&>h3]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-4">
                <PortableText value={destination.description || []} />
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-jade-deep p-8 border border-line space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl text-white font-medium">
                Key Region Highlights
              </h3>
              <ul className="space-y-4">
                {destination.highlights.map((hl, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-gold font-semibold text-lg leading-none">✓</span>
                    <span className="text-sm sm:text-base text-paper/90 font-light leading-relaxed">
                      {hl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <GeoFaqSection faqs={faqs} heading={`${destination.name}: your questions answered`} />
            <GeoSources sources={destination.sources} />
            <PlanningGuides />

          </div>

          {/* Right Column: CTA Panel */}
          <div className="space-y-8">
            <div className="bg-jade-deep p-8 border border-line space-y-6 shadow-sm">
              <h3 className="font-serif text-xl text-white font-medium">
                Tailormade Travel Planning
              </h3>
              <p className="text-sm text-paper/90 font-light leading-relaxed">
                Want to combine {destination.name} with other regions? We will draft an itinerary from scratch tailored to you.
              </p>
              <div className="pt-4 border-t border-gold/20 space-y-4">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-gold hover:bg-gold/90 text-ink font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center"
                >
                  Plan this Journey
                </Link>
              </div>
            </div>

            <div className="border border-jade-deep p-8 space-y-4">
              <h4 className="font-serif text-sm tracking-widest uppercase text-ink font-semibold">
                Best time to travel
              </h4>
              <p className="text-xs sm:text-sm font-light text-ink-soft leading-relaxed">
                {destination.bestTimeToVisit}. Travel pacing can be adjusted based on local weather conditions.
              </p>
            </div>
          </div>
        </div>

        {/* ─── FULL-WIDTH BOTTOM SECTIONS ─── */}
        <div className="mt-24 space-y-24 border-t border-jade-deep/20 pt-16">
          
          {/* Featured Tours */}
          {featuredTours.length > 0 && (
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold block">Bespoke Journeys</span>
                <h2 className="font-serif text-3xl md:text-4xl text-ink font-medium">
                  Signature Tours in {destination.name}
                </h2>
                <div className="h-[1px] w-12 bg-gold mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredTours.map((it) => (
                  <div key={it._id} className="bg-jade-deep border border-jade-deep overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
                    {it.gallery?.[0] && (
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={it.gallery[0]}
                          alt={it.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-widest text-gold font-semibold">Private Guided Tour</span>
                        <h4 className="font-serif text-lg font-medium text-white group-hover:text-gold transition-colors leading-snug">
                          {it.title}
                        </h4>
                        <p className="text-xs text-paper/70 font-light line-clamp-3">
                          {it.intro}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-luxury-slate/50">
                        <span className="text-xs text-paper/70 font-semibold">{it.duration} Days</span>
                        <Link
                          href={`/destinations/${slug}/tours/${it.slug?.current || ''}`}
                          className="text-xs font-bold text-gold hover:underline flex items-center space-x-1.5 uppercase tracking-wider"
                        >
                          <span>Explore Trip</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cruises */}
          {cruises.length > 0 && (
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold block">Water Expeditions</span>
                <h2 className="font-serif text-3xl md:text-4xl text-ink font-medium">
                  Luxury Cruises
                </h2>
                <div className="h-[1px] w-12 bg-gold mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cruises.map((cruise) => (
                  <div key={cruise._id} className="bg-jade-deep border border-jade-deep overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
                    {cruise.mainImage && (
                      <div className="relative h-56 overflow-hidden">
                        <Image src={cruise.mainImage} alt={cruise.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-widest text-gold font-semibold">Bespoke Cruise</span>
                        <h4 className="font-serif text-lg font-medium text-white group-hover:text-gold transition-colors leading-snug">{cruise.title}</h4>
                        <p className="text-xs text-paper/70 font-light line-clamp-3">
                          Experience {destination.name} from the water with premium cabin amenities, dining, and custom shore excursions.
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-luxury-slate/50">
                        <span className="text-xs text-paper/70 font-semibold">{cruise.duration}</span>
                        <Link href={`/destinations/${slug}/cruises/${cruise.slug?.current || ''}`} className="text-xs font-bold text-gold hover:underline flex items-center space-x-1.5 uppercase tracking-wider">
                          <span>View Cruise</span><span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Guides */}
          {guides.length > 0 && (
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold block">Insider Knowledge</span>
                <h2 className="font-serif text-3xl md:text-4xl text-ink font-medium">
                  Travel Guides & Articles
                </h2>
                <div className="h-[1px] w-12 bg-gold mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {guides.map((guide) => (
                  <Link
                    key={guide._id}
                    href={`/destinations/${slug}/blog/${guide.slug?.current || ''}`}
                    className="group bg-jade-deep border border-jade-deep overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
                  >
                    {guide.mainImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image src={guide.mainImage} alt={guide.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <span className="text-[9px] uppercase tracking-widest text-gold font-semibold">Travel Guide</span>
                      <h4 className="font-serif text-base font-medium text-white group-hover:text-gold transition-colors leading-snug line-clamp-2">{guide.title}</h4>
                      <p className="text-xs text-paper/60 font-light line-clamp-3">
                        {guide.content?.[0]?.children?.[0]?.text || 'Read our expert guide to plan your activities and cultural visits in ' + destination.name + '.'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Massive Request Quote CTA Card */}
          <div className="bg-jade-deep border border-line p-10 md:p-16 text-center space-y-6 rounded-none shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold block">
              Bespoke Expedition Design
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide max-w-2xl mx-auto leading-tight">
              Ready to design your bespoke journey to {destination.name}?
            </h2>
            <p className="text-sm md:text-base text-paper/85 font-light max-w-2xl mx-auto leading-relaxed">
              Connect with a luxury travel specialist to customize one of our signature itineraries or design a unique route from scratch.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/enquire"
                className="px-10 py-4 bg-gold hover:bg-gold-soft text-ink font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-md"
              >
                Request Custom Quote
              </Link>
              <a
                href="https://wa.me/84988600388"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border border-gold/40 hover:border-gold text-gold font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-none bg-black/20"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
