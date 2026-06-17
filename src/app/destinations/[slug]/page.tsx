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

export const revalidate = 3600;

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
  const title = seo?.metaTitle || `${destination.name} – Luxury Vietnam Tours`;
  const description = seo?.metaDescription || `Discover the beauty of ${destination.name}. Explore tailor-made luxury tours, travel guides and insider tips with Vietnam Tour UK.`;

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

  return (
    <>
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
            className="text-xs uppercase tracking-widest text-luxury-gold font-semibold hover:underline flex items-center space-x-1.5"
          >
            <span>←</span>
            <span>All Destinations</span>
          </Link>
          <div className="flex items-center space-x-3 text-xs font-semibold tracking-wider text-luxury-gold uppercase">
            <span>Vietnam</span>
            <span>•</span>
            <span>{destination.bestTimeToVisit}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-luxury-linen">
            {destination.name}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left columns */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* Description */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl lg:text-3xl text-luxury-linen font-medium border-b border-luxury-moss/50 pb-4">
                Region Overview
              </h2>
              <p className="text-base font-light text-luxury-linen/80 leading-relaxed">
                {destination.description[0]?.children[0]?.text}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-luxury-moss p-8 border border-luxury-gold/30 space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl text-luxury-linen font-medium">
                Key Region Highlights
              </h3>
              <ul className="space-y-4">
                {destination.highlights.map((hl, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-luxury-gold font-semibold text-lg leading-none">✓</span>
                    <span className="text-sm sm:text-base text-luxury-linen/75 font-light leading-relaxed">
                      {hl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Tours from Sanity reference */}
            {featuredTours.length > 0 && (
              <div className="space-y-8">
                <h2 className="font-serif text-2xl lg:text-3xl text-luxury-linen font-medium border-b border-luxury-moss/50 pb-4">
                  Signature Land Tours
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {featuredTours.map((it) => (
                    <div key={it._id} className="bg-luxury-moss border border-luxury-moss overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
                      {it.gallery?.[0] && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={it.gallery[0]}
                            alt={it.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <h4 className="font-serif text-base font-medium text-luxury-linen group-hover:text-luxury-gold transition-colors">
                          {it.title}
                        </h4>
                        <div className="flex justify-between items-center pt-4 border-t border-luxury-slate/50">
                          <span className="text-xs text-luxury-linen/60 font-semibold">{it.duration} Days</span>
                          <Link
                            href={`/destinations/${slug}/tours/${it.slug?.current || ''}`}
                            className="text-xs font-semibold text-luxury-gold hover:underline flex items-center space-x-1"
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

            {/* Cruises for this destination */}
            {cruises.length > 0 && (
              <div className="space-y-8">
                <h2 className="font-serif text-2xl lg:text-3xl text-luxury-linen font-medium border-b border-luxury-moss/50 pb-4">
                  Luxury Cruises
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {cruises.map((cruise) => (
                    <div key={cruise._id} className="bg-luxury-moss border border-luxury-moss overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
                      {cruise.mainImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image src={cruise.mainImage} alt={cruise.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <h4 className="font-serif text-base font-medium text-luxury-linen group-hover:text-luxury-gold transition-colors">{cruise.title}</h4>
                        <div className="flex justify-between items-center pt-4 border-t border-luxury-slate/50">
                          <span className="text-xs text-luxury-linen/60 font-semibold">{cruise.duration}</span>
                          <Link href={`/destinations/${slug}/cruises/${cruise.slug?.current || ''}`} className="text-xs font-semibold text-luxury-gold hover:underline flex items-center space-x-1">
                            <span>View Cruise</span><span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Guides for this destination */}
            {guides.length > 0 && (
              <div className="space-y-8">
                <h2 className="font-serif text-2xl lg:text-3xl text-luxury-linen font-medium border-b border-luxury-moss/50 pb-4">
                  Travel Guides & Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {guides.map((guide) => (
                    <Link
                      key={guide._id}
                      href={`/destinations/${slug}/blog/${guide.slug?.current || ''}`}
                      className="group bg-luxury-moss border border-luxury-moss overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
                    >
                      {guide.mainImage && (
                        <div className="relative h-40 overflow-hidden">
                          <Image src={guide.mainImage} alt={guide.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">Travel Guide</span>
                        <h4 className="font-serif text-sm font-medium text-luxury-linen group-hover:text-luxury-gold transition-colors">{guide.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: CTA Panel */}
          <div className="space-y-8">
            <div className="bg-luxury-moss p-8 border border-luxury-gold/30 space-y-6 shadow-sm">
              <h3 className="font-serif text-xl text-luxury-linen font-medium">
                Tailormade Travel Planning
              </h3>
              <p className="text-sm text-luxury-linen/75 font-light leading-relaxed">
                Want to combine {destination.name} with other regions? We will draft an itinerary from scratch tailored to you.
              </p>
              <div className="pt-4 border-t border-luxury-gold/20 space-y-4">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center"
                >
                  Plan this Journey
                </Link>
              </div>
            </div>

            <div className="border border-luxury-moss p-8 space-y-4">
              <h4 className="font-serif text-sm tracking-widest uppercase text-luxury-linen font-semibold">
                Best time to travel
              </h4>
              <p className="text-xs sm:text-sm font-light text-luxury-linen/80 leading-relaxed">
                {destination.bestTimeToVisit}. Travel pacing can be adjusted based on local weather conditions.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
