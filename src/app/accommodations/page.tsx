import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getAccommodations } from '@/sanity/client';

export const revalidate = 3600;

export default async function AccommodationsPage() {
  const accommodations = await getAccommodations();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-luxury-slate text-luxury-linen">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[250px] sm:h-[300px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/vietnamtour_amanoi_villa.png"
            alt="Luxury Resorts Header"
            fill
            className="object-cover brightness-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-[#161C1A]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-wide">
              Luxury Resorts & Hotels
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-[#9A4B33] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Hotels</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="hotels" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-16">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
              Elite Hideaways
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-luxury-linen font-medium leading-tight">
              Luxury Resorts & Lodges
            </h1>
            <p className="text-base sm:text-lg text-luxury-linen/70 font-light leading-relaxed">
              We have handpicked only the finest properties in Vietnam. From remote clifftop pool villas overlooking Vinh Hy Bay to heritage palaces in Hanoi, these stays guarantee premium luxury.
            </p>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {accommodations.map((acc, idx) => (
              <div key={acc._id} className="bg-luxury-moss border border-luxury-moss p-6 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all duration-300">
                <div className="relative h-60 sm:h-auto w-full sm:w-56 md:w-64 shrink-0 overflow-hidden">
                  <Image
                    src={acc.gallery[0]}
                    alt={acc.name}
                    fill
                    className="object-cover"
                    priority={idx < 2}
                  />
                </div>
                <div className="flex flex-col justify-between py-2 pr-2 flex-grow space-y-4 sm:space-y-0">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-luxury-gold font-semibold block">{acc.rating}</span>
                      <h3 className="font-serif text-xl text-luxury-linen font-semibold">{acc.name}</h3>
                      <p className="text-xs text-luxury-linen/50 italic">{acc.location}</p>
                    </div>
                    <p className="text-xs text-luxury-linen/60 font-light leading-relaxed line-clamp-3">
                      {acc.description?.[0]?.children?.[0]?.text || ''}
                    </p>
                    <ul className="flex flex-wrap gap-2 pt-2">
                      {acc.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="text-[10px] bg-luxury-slate text-luxury-linen/80 px-2.5 py-1 font-medium border border-luxury-gold/10">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-luxury-slate/50 flex items-center justify-between">
                    <Link
                      href={`/accommodations/${acc.slug?.current || ''}`}
                      className="text-xs font-semibold text-luxury-gold hover:underline flex items-center space-x-1"
                    >
                      <span>Explore Resort</span>
                      <span>→</span>
                    </Link>
                    {acc.websiteUrl && (
                      <a
                        href={acc.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-luxury-linen/40 hover:underline hover:text-luxury-gold"
                      >
                        Official Site ↗
                      </a>
                    )}
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
