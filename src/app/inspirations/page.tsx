import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { inspirationsData } from '@/lib/inspirationsData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Inspiration & Curated Styles | Vietnam Tour',
  description: 'Immerse yourself in our collection of curated travel inspirations. Discover luxury pool villas, adventure expeditions, and family tours to Vietnam.',
};

export default function InspirationsListingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-[#343434]">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[280px] sm:h-[350px] lg:h-[400px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/trip_luxury_villa.png"
            alt="Travel Inspiration Header"
            fill
            className="object-cover brightness-[0.55]"
            priority
          />
          <div className="absolute inset-0 bg-[#161C1A]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              Luxury Travel Inspiration
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-[#9A4B33] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Inspiration</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="guides" />

        {/* Content Section */}
        <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
          
          {/* Header Introduction */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9A4B33] block">
              Curated Travel Inspiration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#343434] font-medium leading-tight">
              Get Inspired for Your Next Journey
            </h2>
            <p className="text-base text-[#545454] font-light leading-relaxed">
              Explore our travel journals, design philosophy, and curated lists of premium experiences. Whether you seek ultimate luxury retreats, remote adventures, or family bonding, let these stories spark your imagination.
            </p>
            <div className="h-[2px] w-20 bg-[#9A4B33] mx-auto mt-6" />
          </div>

          {/* Grid of Inspiration Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inspirationsData.map((item) => (
              <div 
                key={item.slug} 
                className="group bg-white border border-[#e6e2d6] shadow-md hover:shadow-xl hover:border-[#e6e2d6] transition-all duration-300 flex flex-col h-full rounded-xs overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden shrink-0 bg-[#f4efe6]">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#343434] text-[9px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-none border border-[#e6e2d6]">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#343434] font-medium leading-snug group-hover:text-[#9A4B33] transition-colors">
                      <Link href={`/inspirations/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#545454] font-light leading-relaxed line-clamp-3">
                      {item.heroSubtitle}
                    </p>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-2 pt-2 border-t border-[#e6e2d6]">
                    <span className="text-[10px] uppercase tracking-wider text-[#545454] font-semibold block">Exclusive Features:</span>
                    <ul className="text-xs text-[#343434] space-y-1">
                      {item.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                          <span className="text-[#9A4B33] font-bold shrink-0">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/inspirations/${item.slug}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-[#9A4B33] hover:text-[#343434] transition-colors"
                    >
                      <span>Read Inspiration Guide</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Bottom CTA Block */}
        <section className="bg-[#faf8f5] text-[#343434] py-16 sm:py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9A4B33_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9A4B33] block">
              Tailor-Made Design
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#343434] font-medium leading-tight">
              Let Us Craft Your Dream Journey
            </h3>
            <p className="text-base sm:text-lg text-[#545454] font-light max-w-2xl mx-auto leading-relaxed">
              Every detail is tailored to your pacing, interests, and style of luxury travel. Speak with our specialists to plan your private tour.
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
