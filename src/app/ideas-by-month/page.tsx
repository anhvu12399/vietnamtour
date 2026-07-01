import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { ideasByMonthData } from '@/lib/ideasByMonthData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Time to Visit Vietnam | Travel Ideas by Month | Vietnam Tour',
  description: 'Find the best time to visit Vietnam. Explore weather forecasts and top recommendations month-by-month, from January to December.',
};

export default function IdeasByMonthListingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-[#343434]">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[280px] sm:h-[350px] lg:h-[400px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/trip_bike_rice_paddies.png"
            alt="Best Time to Visit Vietnam Header"
            fill
            className="object-cover brightness-[0.55]"
            priority
          />
          <div className="absolute inset-0 bg-[#161C1A]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              Best Time to Visit Vietnam
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-[#9A4B33] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Ideas by Month</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="weather" />

        {/* Content Section */}
        <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
          
          {/* Header Introduction */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9A4B33] block">
              Monthly Weather & Guides
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#343434] font-medium leading-tight">
              When Will Your Journey Begin?
            </h2>
            <p className="text-base text-[#545454] font-light leading-relaxed">
              Vietnam is a year-round destination, but weather varies significantly by region and season. Click on any month below to read our detailed travel guide, weather analysis (North, Central, South), and recommended travel spots.
            </p>
            <div className="h-[2px] w-20 bg-[#9A4B33] mx-auto mt-6" />
          </div>

          {/* Grid of 12 Months */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {ideasByMonthData.map((item) => (
              <Link 
                key={item.slug} 
                href={`/ideas-by-month/${item.slug}`}
                className="group relative h-48 sm:h-56 overflow-hidden rounded-xs border border-[#e6e2d6] shadow-md flex flex-col justify-end p-6 bg-luxury-slate transition-all duration-300 hover:shadow-xl hover:border-[#e6e2d6]"
              >
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  fill
                  className="object-cover brightness-[0.45] group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="relative z-10 space-y-1.5 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#9A4B33] font-bold block">
                    Vietnam Guide
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#343434] font-semibold leading-none group-hover:text-[#9A4B33] transition-colors">
                    {item.breadcrumb}
                  </h3>
                  <p className="text-[10px] text-[#343434]/75 font-light line-clamp-1 group-hover:text-white transition-colors">
                    {item.heroSubtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </section>

        {/* Bottom CTA Block */}
        <section className="bg-[#faf8f5] text-[#343434] py-16 sm:py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9A4B33_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9A4B33] block">
              Tailor-Made Planning
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#343434] font-medium leading-tight">
              Ready to Plan Your Seasonal Escape?
            </h3>
            <p className="text-base sm:text-lg text-[#545454] font-light max-w-2xl mx-auto leading-relaxed">
              No matter what month you travel, our specialists will craft the perfect itinerary to match the best climates and festivals in Vietnam.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-[#9A4B33] hover:bg-luxury-gold hover:text-luxury-slate text-slate-950 text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
              >
                Request a Custom Quote
              </Link>
              <Link
                href="/specialists"
                className="w-full sm:w-auto border border-[#e6e2d6] hover:border-[#9A4B33] hover:text-[#9A4B33] text-[#343434] text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
              >
                Speak to a Specialist
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
