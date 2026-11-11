import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAccommodationBySlug, getAccommodations } from '@/sanity/client';
import { uniqueEditorialImages } from '@/lib/editorialPhotos';
import { creditForImagePath, licenseUrl } from '@/lib/photoCredits';

export const revalidate = 60;

export async function generateStaticParams() {
  const accommodations = await getAccommodations();
  return accommodations.filter((acc) => acc.slug?.current).map((acc) => ({
    slug: acc.slug.current,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getAccommodationBySlug(slug);
  if (!item) return {};
  const title = `${item.name} | Vietnam Accommodation`;
  const url = `https://www.vietnamtours.co.uk/accommodations/${slug}`;
  return { title, description: `Plan a stay at ${item.name} as part of your private Vietnam travel planning.`, alternates: { canonical: url }, openGraph: { title, url } };
}

export default async function AccommodationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const accommodation = await getAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

  const candidatePair = uniqueEditorialImages(
    [0, 1],
    (_, idx) => `${accommodation.name} ${accommodation.location} gallery-${idx}`,
  );
  const galleryImages = accommodation.gallery.length > 1
    ? accommodation.gallery
    : Array.from(new Set([...accommodation.gallery, ...candidatePair])).slice(0, 2);

  return (
    <>
      <Navbar />

      {/* Hero Image Banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end justify-start">
        <div className="absolute inset-0 z-0">
          <Image
            src={accommodation.gallery[0]}
            alt={accommodation.name}
            fill
            className="object-cover brightness-[0.7] animate-fade-in"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/95 via-luxury-slate/20 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full text-white space-y-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-gold font-semibold hover:underline flex items-center space-x-1.5"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3 text-xs font-semibold tracking-wider text-gold uppercase">
            <span>{accommodation.rating}</span>
            <span>•</span>
            <span>{accommodation.location}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl text-white">
            {accommodation.name}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Description & Features & Gallery */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Description */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl lg:text-3xl text-ink font-medium border-b border-jade-deep/50 pb-4">
                About the Hotel
              </h2>
              <p className="text-base font-light text-ink-soft leading-relaxed">
                {accommodation.description?.[0]?.children?.[0]?.text || ''}
              </p>
              {accommodation.photoNote && (
                <p className="text-xs text-ink/60 leading-relaxed">{accommodation.photoNote}</p>
              )}
              {!!accommodation.editorial?.sources?.length && (
                <div className="border-l-2 border-gold pl-4 text-sm text-ink-soft">
                  <h3 className="font-semibold text-ink">Rating and property sources</h3>
                  <ul className="mt-2 space-y-2">
                    {accommodation.editorial.sources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.label}</a>
                        {source.accessedAt ? ` — checked ${source.accessedAt}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Features list */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-ink font-medium">
                Hotel Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accommodation.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-4 bg-jade-deep/30 border border-jade-deep/50">
                    <span className="w-2.5 h-2.5 bg-gold rounded-full shrink-0" />
                    <span className="text-sm text-ink-soft font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-xl text-ink font-medium">
                  Photo Gallery
                </h3>
                <Link href="/photo-credits" className="text-xs text-copper underline underline-offset-2 hover:text-ink">
                  Photo credits &amp; licences
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {galleryImages.map((img, idx) => {
                  const credit = creditForImagePath(img);
                  return (
                    <figure key={idx} className="border border-jade-deep/50 bg-white overflow-hidden">
                      <div className="relative h-64 overflow-hidden group">
                        <Image
                          src={img}
                          alt={credit?.description || `${accommodation.name} Gallery ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {credit && (
                        <figcaption className="p-3 text-[11px] leading-snug text-ink-soft border-t border-line">
                          <span className="font-medium text-ink block truncate">{credit.description}</span>
                          <span>
                            Photo: {credit.photographer} ·{' '}
                            <a href={licenseUrl(credit.license)} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                              {credit.license}
                            </a>{' '}
                            ·{' '}
                            <a href={credit.source} target="_blank" rel="noopener noreferrer" className="text-copper underline hover:text-ink">
                              Source ↗
                            </a>
                          </span>
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: CTA Panel */}
          <div className="space-y-8">
            <div className="bg-jade-deep p-8 border border-line space-y-6 shadow-sm">
              <h3 className="font-serif text-xl text-white font-medium">
                Discuss a Stay
              </h3>
              <p className="text-sm text-paper/90 font-light leading-relaxed">
                Ask our team to include {accommodation.name} in a draft itinerary. Confirm room type, operating facilities, availability, inclusions and current prices with the property for your dates.
              </p>
              <div className="pt-4 border-t border-gold/20 space-y-4">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-gold hover:bg-gold/95 text-ink font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center"
                >
                  Discuss this Hotel
                </Link>
                {accommodation.websiteUrl && (
                  <a
                    href={accommodation.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 border border-luxury-linen text-paper font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center hover:bg-paper hover:text-ink"
                  >
                    Visit Official Site ↗
                  </a>
                )}
              </div>
            </div>
            
            <div className="border border-jade-deep p-8 space-y-4 text-xs font-light text-ink/70">
              <h4 className="font-serif text-xs tracking-widest uppercase text-ink font-semibold">
                Why book with us?
              </h4>
              <ul className="space-y-2">
                <li>Share your dates, room preferences and any accessibility requirements.</li>
                <li>We can discuss accommodation alongside transfers and private tours in your proposal.</li>
                <li>All inclusions, rates and availability are confirmed for the requested dates.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
