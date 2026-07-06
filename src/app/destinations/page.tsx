import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getDestinations } from '@/sanity/client';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Vietnam Destinations | Places to Visit | VietnamTours.co.uk',
  description: 'Explore Vietnam\'s most captivating destinations — Ha Long Bay, Hanoi, Hoi An, Sa Pa, Mekong Delta, Phú Quốc, Da Nang, Da Lat and Phong Nha. Expert destination guides and recommended tours.',
  keywords: ['Vietnam destinations', 'places to visit in Vietnam', 'Ha Long Bay', 'Hanoi', 'Hoi An', 'Sapa Vietnam', 'Mekong Delta', 'Phu Quoc', 'Da Nang', 'Phong Nha'],
  alternates: {
    canonical: 'https://www.vietnamtours.co.uk/destinations',
  },
  openGraph: {
    title: 'Vietnam Destinations | Places to Visit',
    description: 'Ha Long Bay, Hanoi, Hoi An, Sa Pa, Mekong Delta and beyond — discover Vietnam\'s finest destinations with expert-curated guides.',
    url: 'https://www.vietnamtours.co.uk/destinations',
    images: [{ url: '/images/dest_hoian_lanterns.png', width: 1200, height: 630, alt: 'Hoi An Ancient Town lanterns — top Vietnam destination' }],
  },
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-paper text-ink">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[250px] sm:h-[300px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/hero_sapa.png"
            alt="Vietnam Destinations Header"
            fill
            className="object-cover brightness-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-ink/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-wide">
              Vietnam Regions & Destinations
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-copper font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Destinations</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="places" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-16">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold block">
              Regions & Landscapes
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-ink font-medium leading-tight">
              Vietnam Destinations
            </h1>
            <p className="text-base sm:text-lg text-ink/70 font-light leading-relaxed">
              From the high Sapa highlands to the tropical beaches of Phu Quoc, explore our key regions to inspire your custom journey.
            </p>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {destinations.map((dest, idx) => (
              <div key={dest._id} className="group relative h-[350px] overflow-hidden flex items-end justify-start p-8 border border-jade-deep/50 shadow-lg">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={dest.image}
                    alt={`${dest.name || 'Vietnam destination'} — luxury places to visit in Vietnam`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-luxury-slate/20 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="relative z-20 space-y-3">
                  <h3 className="font-serif text-2xl lg:text-3xl text-white font-medium">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed line-clamp-2 max-w-lg">
                    {dest.description?.[0]?.children?.[0]?.text || ''}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/destinations/${dest.slug?.current || ''}`}
                      className="text-xs uppercase tracking-widest font-semibold text-gold hover:underline flex items-center space-x-1.5"
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
