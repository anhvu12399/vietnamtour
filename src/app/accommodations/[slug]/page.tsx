import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAccommodationBySlug, getAccommodations } from '@/sanity/client';

export const revalidate = 3600;

export async function generateStaticParams() {
  const accommodations = await getAccommodations();
  return accommodations.map((acc) => ({
    slug: acc.slug.current,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AccommodationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const accommodation = await getAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

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
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/20 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full text-white space-y-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-warm-sand font-semibold hover:underline flex items-center space-x-1.5"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3 text-xs font-semibold tracking-wider text-warm-sand uppercase">
            <span>{accommodation.rating}</span>
            <span>•</span>
            <span>{accommodation.location}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl">
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
              <h2 className="font-serif text-2xl lg:text-3xl text-deep-green font-medium border-b border-linen pb-4">
                About the Resort
              </h2>
              <p className="text-base font-light text-primary-dark/80 leading-relaxed">
                {accommodation.description[0]?.children[0]?.text}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-deep-green font-medium">
                Resort Features & Signature Experiences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accommodation.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-4 bg-linen/30 border border-linen">
                    <span className="w-2.5 h-2.5 bg-burnt-sienna rounded-full shrink-0" />
                    <span className="text-sm text-primary-dark/80 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-deep-green font-medium">
                Photo Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {accommodation.gallery.map((img, idx) => (
                  <div key={idx} className="relative h-64 overflow-hidden border border-linen group">
                    <Image
                      src={img}
                      alt={`${accommodation.name} Gallery ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: CTA Panel */}
          <div className="space-y-8">
            <div className="bg-linen p-8 border border-border-gold/30 space-y-6 shadow-sm">
              <h3 className="font-serif text-xl text-deep-green font-medium">
                Plan a Luxury Escape
              </h3>
              <p className="text-sm text-primary-dark/75 font-light leading-relaxed">
                Stay at {accommodation.name} as part of your tailor-made Vietnam itinerary. Speak to a travel specialist today.
              </p>
              <div className="pt-4 border-t border-border-gold/20 space-y-4">
                <Link
                  href="/enquire"
                  className="block w-full py-3 bg-burnt-sienna hover:bg-burnt-sienna/95 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center"
                >
                  Book this Resort
                </Link>
                {accommodation.websiteUrl && (
                  <a
                    href={accommodation.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 border border-deep-green text-deep-green font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none text-center hover:bg-deep-green hover:text-white"
                  >
                    Visit Official Site ↗
                  </a>
                )}
              </div>
            </div>
            
            <div className="border border-linen p-8 space-y-4 text-xs font-light text-primary-dark/70">
              <h4 className="font-serif text-xs tracking-widest uppercase text-deep-green font-semibold">
                Why book with us?
              </h4>
              <ul className="space-y-2">
                <li>✓ Preferential rates & exclusive room upgrades (subject to availability).</li>
                <li>✓ Bespoke transfers and local airport meet-and-greets.</li>
                <li>✓ Integrated booking: flights, transfers, accommodation, and private tours.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
