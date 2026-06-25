import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { tripIdeasData } from '@/lib/tripIdeasData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke Vietnam Trip Ideas & Travel Inspiration | Vietnam Tour',
  description: 'Explore our curated Vietnam trip ideas. From culinary street food adventures and motorcycle loop tours to classic luxury journeys and family holidays.',
};

export default function TripIdeasListingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-luxury-slate text-luxury-linen">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[280px] sm:h-[350px] lg:h-[400px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/trip_bike_rice_paddies.png"
            alt="Vietnam Trip Ideas Header"
            fill
            className="object-cover brightness-[0.55]"
            priority
          />
          <div className="absolute inset-0 bg-[#121816]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              Inspirational Trip Ideas
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-[#c5a880] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Trip Ideas</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="tours" />

        {/* Content Section */}
        <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
          
          {/* Header Introduction */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c5a880] block">
              Curated Travel Styles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-luxury-linen font-medium leading-tight">
              Bespoke Ideas for Your Journey
            </h2>
            <p className="text-base text-luxury-linen/80 font-light leading-relaxed">
              Every traveler experiences Vietnam differently. We have crafted these specialized travel concepts to serve as inspiration for your bespoke, private holiday. Select a style below to view detailed itineraries, regional highlights, and planning tips.
            </p>
            <div className="h-[2px] w-20 bg-[#c5a880] mx-auto mt-6" />
          </div>

          {/* Grid of Trip Ideas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tripIdeasData.map((item) => (
              <div 
                key={item.slug} 
                className="group bg-luxury-slate/30 border border-luxury-gold/10 shadow-md hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-300 flex flex-col h-full rounded-xs overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden shrink-0 bg-luxury-slate/20">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-luxury-slate/90 backdrop-blur-xs text-luxury-linen text-[9px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-none border border-white/10">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-luxury-linen font-medium leading-snug group-hover:text-[#c5a880] transition-colors">
                      <Link href={`/trip-ideas/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-luxury-linen/60 font-light leading-relaxed line-clamp-3">
                      {item.heroSubtitle}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-luxury-gold/10">
                    <span className="text-[10px] uppercase tracking-wider text-luxury-linen/50 font-semibold block">Key Experiences:</span>
                    <ul className="text-xs text-luxury-linen/85 space-y-1">
                      {item.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                          <span className="text-[#c5a880] font-bold shrink-0">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/trip-ideas/${item.slug}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-[#c5a880] hover:text-luxury-linen transition-colors"
                    >
                      <span>Explore this style</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Bottom CTA Block */}
        <section className="bg-[#121816] text-white py-16 sm:py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c5a880] block">
              Tailor-Made Design
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-white font-medium leading-tight">
              Ready to Craft Your Bespoke Journey?
            </h3>
            <p className="text-base sm:text-lg text-luxury-linen/80 font-light max-w-2xl mx-auto leading-relaxed">
              Our specialists will weave these travel styles into a single, seamless, custom itinerary designed specifically for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-[#c5a880] hover:bg-luxury-gold hover:text-luxury-slate text-slate-950 text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
              >
                Request a Custom Quote
              </Link>
              <Link
                href="/specialists"
                className="w-full sm:w-auto border border-white/25 hover:border-[#c5a880] hover:text-[#c5a880] text-white text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
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
