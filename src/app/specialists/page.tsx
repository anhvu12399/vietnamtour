import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSpecialists } from '@/sanity/client';

export const revalidate = 3600;

export default async function SpecialistsPage() {
  const specialists = await getSpecialists();

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
              Destination Curators
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#343434] font-medium leading-tight">
              Our Vietnam Specialists
            </h1>
            <p className="text-base sm:text-lg text-[#343434]/70 font-light leading-relaxed">
              Our travel specialists have spent years living and travelling in Vietnam. They know the country intimately—from hidden street kitchens to exclusive luxury retreats. Talk directly to the expert who will plan your trip.
            </p>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {specialists.map((spec) => (
              <div key={spec._id} className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left bg-luxury-moss p-6 border border-luxury-moss">
                <div className="relative w-36 h-36 rounded-full overflow-hidden shrink-0 border-2 border-[#e6e2d6]">
                  <Image
                    src={spec.image}
                    alt={spec.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 flex-grow">
                  <div>
                    <h3 className="font-serif text-xl text-[#343434] font-semibold">{spec.name}</h3>
                    <p className="text-xs text-luxury-gold uppercase tracking-wider font-semibold">{spec.role}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#343434]/75 font-light leading-relaxed">
                    {spec.bio[0]?.children[0]?.text}
                  </p>
                  <div className="pt-2 text-xs space-y-2 border-t border-luxury-slate/50">
                    <p className="text-[#545454]">📍 Favourite Area: <span className="font-medium text-[#343434]">{spec.favoriteDestinations.join(', ')}</span></p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <p className="text-[#343434]/70 font-semibold">📞 UK: <a href={`tel:${spec.phone?.replace(/\s+/g, '')}`} className="text-luxury-gold hover:underline">{spec.phone}</a></p>
                      <Link
                        href={`/specialists/${spec.slug?.current || ''}`}
                        className="text-xs font-semibold text-luxury-gold hover:underline flex items-center space-x-1"
                      >
                        <span>View Profile</span>
                        <span>→</span>
                      </Link>
                    </div>
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
