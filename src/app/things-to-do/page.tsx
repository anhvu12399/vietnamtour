import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { thingsToDoData } from '@/lib/thingsToDoData';

export const metadata: Metadata = {
  title: 'Things To Do in Vietnam | Authentic Experiences & Activities | Vietnam Tour',
  description: 'Discover the most remarkable things to do in Vietnam — from kayaking hidden Ha Long Bay lagoons and trekking Sapa\'s rice terraces to attending Hoi An\'s full moon lantern festival. First-hand guides from specialists who know Vietnam deeply.',
  alternates: {
    canonical: 'https://www.vietnamtours.co.uk/things-to-do',
  },
  openGraph: {
    title: 'Things To Do in Vietnam | Vietnam Tour',
    description: 'Kayaking hidden lagoons, trekking rice terraces, learning imperial cuisine — the experiences that make Vietnam unforgettable.',
    images: [{ url: '/images/things_halong_kayaking.png' }],
  },
};

const categoryColors: Record<string, string> = {
  'WATER ADVENTURES':    'bg-blue-900/30 text-blue-300/90 border-blue-700/30',
  'CULTURE & HERITAGE':  'bg-amber-900/30 text-luxury-gold border-amber-700/30',
  'TREKKING & HIKING':   'bg-green-900/30 text-green-300/90 border-green-700/30',
  'FESTIVALS & CULTURE': 'bg-pink-900/30 text-pink-300/90 border-pink-700/30',
  'CULINARY EXPERIENCES':'bg-orange-900/30 text-orange-300/90 border-orange-700/30',
  'RIVER JOURNEYS':      'bg-teal-900/30 text-teal-300/90 border-teal-700/30',
};

export default function ThingsToDoListingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-[#343434]">

        {/* ── Hero Banner ── */}
        <section className="relative h-[340px] sm:h-[420px] lg:h-[480px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/things_halong_kayaking.png"
            alt="Kayaking through a limestone cave into a hidden Ha Long Bay lagoon"
            fill
            className="object-cover brightness-[0.45]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-slate/10 via-transparent to-luxury-slate/70" />

          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32 max-w-3xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-bold bg-luxury-slate/60 px-4 py-1.5 border border-luxury-gold/20 rounded-sm mb-5 inline-block">
              Authentic Experiences
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight tracking-wide drop-shadow-md">
              Things To Do in Vietnam
            </h1>
            <p className="mt-5 text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
              Written by specialists who have done them — every experience below is chosen because it genuinely changes how you understand Vietnam.
            </p>
          </div>
        </section>

        {/* ── Categories Tab Bar ── */}
        <CategoriesTabBar activeTab="things" />

        {/* ── Intro ── */}
        <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold block mb-4">
            Curated Experiences
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#343434] font-medium leading-snug mb-5">
            Not a checklist. A collection of moments.
          </h2>
          <p className="text-base text-[#343434]/75 font-light leading-relaxed max-w-2xl mx-auto">
            Vietnam rewards those who move slowly and choose deliberately. The activities listed here are not tours — they are doorways. Each one leads somewhere that generalist travel cannot reach: into a hidden lagoon, a century-old kitchen, a festival that has been repeating since the 11th century. They are written in the voice of people who were actually there.
          </p>
          <div className="h-[1.5px] w-12 bg-luxury-gold mx-auto mt-8" />
        </section>

        {/* ── Articles Grid ── */}
        <section className="pb-24 px-6 lg:px-12 max-w-7xl mx-auto">

          {/* Featured (first article) */}
          <div className="mb-10">
            {(() => {
              const featured = thingsToDoData[0];
              const colorClass = categoryColors[featured.category] || 'bg-white text-luxury-gold border-luxury-gold/20';
              return (
                <Link href={`/things-to-do/${featured.slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#e6e2d6] hover:border-[#e6e2d6] transition-all duration-500 hover:shadow-2xl overflow-hidden">
                    {/* Image */}
                    <div className="relative h-72 sm:h-80 lg:h-[420px] overflow-hidden bg-[#f4efe6]">
                      <Image
                        src={featured.heroImage}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-luxury-slate/30 lg:block hidden" />
                    </div>

                    {/* Content */}
                    <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center bg-white space-y-5">
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1 border rounded-sm ${colorClass}`}>
                          {featured.category}
                        </span>
                        <span className="text-[10px] text-[#343434]/40 font-medium">{featured.readingTime} min read</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#343434] font-medium leading-snug group-hover:text-luxury-gold transition-colors duration-300">
                        {featured.title}
                      </h2>

                      <p className="text-sm text-[#343434]/70 font-light leading-relaxed line-clamp-3">
                        {featured.heroSubtitle}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-[11px] uppercase tracking-widest font-bold text-luxury-gold group-hover:text-[#343434] transition-colors">
                          Read the full guide
                        </span>
                        <span className="text-luxury-gold group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })()}
          </div>

          {/* Remaining articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thingsToDoData.slice(1).map((item) => {
              const colorClass = categoryColors[item.category] || 'bg-white text-luxury-gold border-luxury-gold/20';
              return (
                <Link
                  key={item.slug}
                  href={`/things-to-do/${item.slug}`}
                  className="group flex flex-col h-full border border-[#e6e2d6] hover:border-[#e6e2d6] transition-all duration-400 hover:shadow-xl overflow-hidden bg-[#f4efe6]"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-[#f4efe6] flex-shrink-0">
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-[1.05] transition-transform duration-600 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/70 via-transparent to-transparent" />

                    {/* Category badge overlaid */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-[8px] uppercase tracking-[0.25em] font-bold px-2.5 py-1 border rounded-sm ${colorClass}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-[#343434]/40 font-medium uppercase tracking-widest">{item.readingTime} min read</span>
                      <span className="text-[#343434]/20">·</span>
                      <span className="text-[9px] text-[#343434]/40 font-medium uppercase tracking-widest">{item.practicalInfo.location.split(',')[0]}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl text-[#343434] font-medium leading-snug group-hover:text-luxury-gold transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#545454] font-light leading-relaxed line-clamp-3 flex-grow">
                      {item.heroSubtitle}
                    </p>

                    <div className="pt-3 border-t border-[#e6e2d6] flex items-center justify-between">
                      <ul className="space-y-0.5">
                        {item.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="text-[10px] text-[#343434]/55 flex items-start gap-1.5 line-clamp-1">
                            <span className="text-luxury-gold font-bold shrink-0">•</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold group-hover:text-[#343434] transition-colors">
                        Read guide
                      </span>
                      <span className="text-luxury-gold text-xs group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Practical Info Bar ── */}
        <section className="border-t border-[#e6e2d6] bg-white py-14 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🧭', label: 'Private Guides', desc: 'All experiences are led by private, expert local guides — no group tours' },
              { icon: '🗓', label: 'Year-Round', desc: 'Most experiences are available all year; we match activities to the best season for you' },
              { icon: '✦', label: 'Fully Bespoke', desc: 'Every experience is tailored — timing, pace, depth — to your exact preferences' },
              { icon: '📞', label: 'Expert Planning', desc: 'Speak to a Vietnam specialist who has done every experience listed here personally' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <span className="text-2xl block">{item.icon}</span>
                <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-luxury-gold">{item.label}</h4>
                <p className="text-xs text-[#343434]/55 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-[#faf8f5] py-20 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9A4B33_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold block">
              Build Your Itinerary
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#343434] font-medium leading-tight">
              Combine the Experiences That Matter to You
            </h3>
            <p className="text-base text-[#343434]/75 font-light max-w-xl mx-auto leading-relaxed">
              Tell us which of these experiences resonate and we will build an itinerary that weaves them into the best possible sequence — at the right time of year, in the right order, at the right pace.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-luxury-gold text-luxury-slate text-xs uppercase tracking-widest font-bold px-10 py-4 hover:bg-luxury-linen transition-colors duration-300"
              >
                Start Planning
              </Link>
              <Link
                href="/itineraries"
                className="w-full sm:w-auto border border-[#e6e2d6] hover:border-luxury-gold text-[#343434] text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
              >
                View Vietnam Tours
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
