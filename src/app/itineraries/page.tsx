import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getItineraries } from '@/sanity/client';

export const revalidate = 3600;

export default async function ItinerariesPage() {
  const itineraries = await getItineraries();

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
              Bespoke Journeys
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-luxury-linen font-medium leading-tight">
              Bespoke Vietnam Itineraries
            </h1>
            <p className="text-base sm:text-lg text-luxury-linen/70 font-light leading-relaxed">
              Explore our collection of meticulously curated itineraries. Every trip can be completely tailormade, adjusted in length, pacing, and selection of luxury resorts to fit your personal desires.
            </p>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((it) => (
              <div key={it._id} className="group flex flex-col bg-luxury-moss border border-luxury-moss overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={it.gallery[0]}
                    alt={it.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-luxury-slate text-luxury-linen text-[10px] tracking-widest uppercase font-semibold px-3 py-1 border border-luxury-gold/30">
                    {it.duration} Days
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl text-luxury-linen group-hover:text-luxury-gold transition-colors font-medium leading-snug">
                      {it.title}
                    </h3>
                    <p className="text-xs text-luxury-linen/60 font-light leading-relaxed line-clamp-3">
                      {it.intro}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-luxury-slate flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-luxury-linen/50 block font-light">From</span>
                      <span className="text-base font-semibold text-luxury-linen">£{it.priceFrom.toLocaleString('en-GB')}pp</span>
                    </div>
                    <Link
                      href={`/itineraries/${it.slug.current}`}
                      className="text-xs uppercase tracking-widest font-semibold text-luxury-gold group-hover:underline flex items-center space-x-1"
                    >
                      <span>View Trip</span>
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
