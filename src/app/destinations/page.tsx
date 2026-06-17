import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDestinations } from '@/sanity/client';

export const revalidate = 3600;

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
              Regions & Landscapes
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-luxury-linen font-medium leading-tight">
              Vietnam Destinations
            </h1>
            <p className="text-base sm:text-lg text-luxury-linen/70 font-light leading-relaxed">
              From the high Sapa highlands to the tropical beaches of Phu Quoc, explore our key regions to inspire your custom journey.
            </p>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {destinations.map((dest, idx) => (
              <div key={dest._id} className="group relative h-[350px] overflow-hidden flex items-end justify-start p-8 border border-luxury-moss/50 shadow-lg">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-luxury-slate/20 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="relative z-20 space-y-3">
                  <h3 className="font-serif text-2xl lg:text-3xl text-luxury-linen font-medium">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-luxury-linen/80 font-light leading-relaxed line-clamp-2 max-w-lg">
                    {dest.description[0]?.children[0]?.text}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/destinations/${dest.slug.current}`}
                      className="text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:underline flex items-center space-x-1.5"
                    >
                      <span>Explore Region</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
