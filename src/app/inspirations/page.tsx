import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { inspirationsData } from '@/lib/inspirationsData';
import { getInspirationsFromSanity } from '@/sanity/client';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Travel Inspiration & Curated Styles',
  description: 'Immerse yourself in our collection of curated travel inspirations. Discover luxury pool villas, adventure expeditions, and family tours to Vietnam.',
  keywords: ['Vietnam travel inspiration', 'luxury Vietnam tours', 'Vietnam pool villas', 'Vietnam family tours', 'Vietnam adventure expeditions'],
  alternates: {
    canonical: 'https://www.vietnamtours.co.uk/inspirations',
  },
  openGraph: {
    title: 'Travel Inspiration & Curated Styles',
    description: 'Discover curated travel styles — luxury pool villas, adventure expeditions, and family tours to Vietnam.',
    url: 'https://www.vietnamtours.co.uk/inspirations',
    images: [{ url: '/images/dest_hoian_lanterns.png', width: 1200, height: 630, alt: 'Vietnam travel inspiration — Hoi An lanterns' }],
  },
};

export default async function InspirationsListingPage() {
  // Try Sanity first, fallback to hardcoded data
  let items = inspirationsData;
  try {
    const sanityItems = await getInspirationsFromSanity();
    if (sanityItems && sanityItems.length > 0) {
      items = sanityItems.map((item: any) => ({
        ...item,
        slug: item.slug?.current || item.slug,
        heroImage: item.heroImage || '/images/trip_luxury_villa.png',
      }));
    }
  } catch {
    // fallback to hardcoded data
  }
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-paper text-ink">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[280px] sm:h-[350px] lg:h-[400px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/trip_luxury_villa.png"
            alt="Travel Inspiration Header"
            fill
            className="object-cover brightness-[0.55]"
            priority
          />
          <div className="absolute inset-0 bg-ink/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              Luxury Travel Inspiration
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-copper font-semibold">
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
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-copper block">
              Curated Travel Inspiration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-medium leading-tight">
              Get Inspired for Your Next Journey
            </h2>
            <p className="text-base text-ink-soft font-light leading-relaxed">
              Explore our travel journals, design philosophy, and curated lists of premium experiences. Whether you seek ultimate luxury retreats, remote adventures, or family bonding, let these stories spark your imagination.
            </p>
            <div className="h-[2px] w-20 bg-[#9A4B33] mx-auto mt-6" />
          </div>

          {/* Grid of Inspiration Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div 
                key={item.slug} 
                className="group bg-white border border-line shadow-md hover:shadow-xl hover:border-line transition-all duration-300 flex flex-col h-full rounded-xs overflow-hidden"
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
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-ink text-[9px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-none border border-line">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium leading-snug group-hover:text-copper transition-colors">
                      <Link href={`/inspirations/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-soft font-light leading-relaxed line-clamp-3">
                      {item.heroSubtitle}
                    </p>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-2 pt-2 border-t border-line">
                    <span className="text-[10px] uppercase tracking-wider text-ink-soft font-semibold block">Exclusive Features:</span>
                    <ul className="text-xs text-ink space-y-1">
                      {item.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                          <span className="text-copper font-bold shrink-0">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/inspirations/${item.slug}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-copper hover:text-ink transition-colors"
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
        <section className="bg-paper text-ink py-16 sm:py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9A4B33_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-copper block">
              Tailor-Made Design
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-ink font-medium leading-tight">
              Let Us Craft Your Dream Journey
            </h3>
            <p className="text-base sm:text-lg text-ink-soft font-light max-w-2xl mx-auto leading-relaxed">
              Every detail is tailored to your pacing, interests, and style of luxury travel. Speak with our specialists to plan your private tour.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-[#9A4B33] hover:bg-gold hover:text-ink text-slate-950 text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
              >
                Request a Custom Quote
              </Link>
              <Link
                href="/specialists"
                className="w-full sm:w-auto border border-line hover:border-copper hover:text-copper text-ink text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
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
