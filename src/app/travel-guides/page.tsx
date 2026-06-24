import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getPosts } from '@/sanity/client';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Vietnam Travel Guides | Expert Tips & Insider Insights | Vietnam Tour',
  description: 'Expert-written Vietnam travel guides. Real experiences, authentic advice on Hanoi, Halong Bay, Hoi An, Sapa, Mekong Delta and every region in between.',
};

// Helper function to calculate reading time based on block content
function getReadingTime(content: any[] | undefined | null): number {
  if (!content || !Array.isArray(content)) return 5;
  let wordCount = 0;
  content.forEach((block: any) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          wordCount += child.text.trim().split(/\s+/).length;
        }
      });
    }
  });
  return Math.max(2, Math.ceil(wordCount / 220));
}

// Category colour mapping
const CATEGORY_COLOURS: Record<string, string> = {
  'vietnam': '#c5a880',
  'halong': '#4a8fa8',
  'hanoi': '#8a6a4a',
  'hoi an': '#9a7a4a',
  'sapa': '#4a8a6a',
  'mekong': '#6a8a4a',
  'phu quoc': '#4a6a8a',
  'culinary': '#a84a4a',
  'luxury': '#8a4a8a',
  'first time': '#4a8a8a',
};

function getCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('halong')) return 'HALONG BAY';
  if (t.includes('hanoi')) return 'HANOI';
  if (t.includes('hoi an')) return 'HOI AN';
  if (t.includes('sapa')) return 'SAPA';
  if (t.includes('mekong')) return 'MEKONG DELTA';
  if (t.includes('phu quoc')) return 'PHU QUOC';
  if (t.includes('culinary') || t.includes('food') || t.includes('fork')) return 'CULINARY';
  if (t.includes('luxury')) return 'LUXURY';
  if (t.includes('first time') || t.includes('first-time')) return 'FIRST TIMER';
  if (t.includes('ha giang')) return 'HA GIANG';
  return 'VIETNAM';
}

const FALLBACK_IMAGES = [
  '/images/hero_hoian.png',
  '/images/hero_halong_bay.png',
  '/images/hero_sapa.png',
  '/images/vietnamtour_cave_dining.png',
  '/images/vietnamtour_mekong_sampan.png',
  '/images/vietnamtour_phu_quoc_beach.png',
  '/images/vietnamtour_sapa_lodge.png',
  '/images/vietnamtour_hanoi_colonial.png',
  '/images/halong_night.png',
  '/images/beach_night.png',
  '/images/sapa_night.png',
];

export default async function TravelGuidesPage() {
  const posts = await getPosts();

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-slate-800">

        {/* ── 1. HERO BANNER ── */}
        <section className="relative h-[320px] sm:h-[400px] lg:h-[450px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/vietnamtour_cave_dining.png"
            alt="Vietnam Travel Guides"
            fill
            className="object-cover brightness-[0.52]"
            priority
          />
          <div className="absolute inset-0 bg-[#121816]/20" />

          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32 lg:pt-36">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              Vietnam Travel Guides
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/75 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Authentic insider knowledge from specialists who live and breathe Vietnam.
            </p>

            {/* Breadcrumbs */}
            <div className="mt-5 flex items-center justify-center space-x-2 text-[11px] lg:text-[12px] uppercase tracking-widest text-[#c5a880] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Travel Guides</span>
            </div>
          </div>
        </section>

        {/* ── 2. CATEGORIES TAB BAR ── */}
        <CategoriesTabBar activeTab="guides" />

        {/* ── 3. INTRO + SPECIALIST CARD ── */}
        <section id="details" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left – intro text */}
            <div className="lg:col-span-8 space-y-6 text-slate-700 leading-relaxed font-light text-base">
              <p className="font-serif text-lg lg:text-xl font-medium text-slate-800 leading-relaxed">
                Vietnam is not a destination you understand from a brochure. It reveals itself in a roadside bowl of pho eaten at 6am, in the silence of a karst lagoon at dawn, in the warmth of a family who insists you stay for dinner.
              </p>
              <p>
                These guides are written by people who have spent years in Vietnam — not travel writers on press trips, but specialists who have driven every mountain road, sailed every bay, and eaten in every kitchen worth knowing about. They exist to help you travel smarter, slower, and deeper.
              </p>
              <p>
                Each guide covers a specific region, experience type, or practical question in genuine detail. Use them as your starting point, then speak to one of our specialists to tailor a journey around them.
              </p>

              <div className="pt-4 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-slate-800 uppercase tracking-wide">
                  Our travel guides cover:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 list-disc pl-5 text-sm font-medium text-slate-600">
                  <li>Itinerary planning & regional routes</li>
                  <li>Where to eat like a local in every city</li>
                  <li>Best luxury hotels & private villas</li>
                  <li>Hidden beaches, mountain treks & river journeys</li>
                  <li>First-timer tips & practical advice</li>
                  <li>Culinary tourism & cultural immersion</li>
                </ul>
              </div>

              <p className="text-sm italic text-slate-500 pt-4">
                All guides are updated regularly. For personalised advice based on your specific travel dates and interests, our Vietnam specialists are available by phone or email.
              </p>
            </div>

            {/* Right – contact card */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-slate-200/70 p-8 shadow-sm flex flex-col items-center text-center space-y-6">
                <h3 className="font-serif text-xl font-semibold text-slate-800 leading-snug">
                  Speak to one of our local experts
                </h3>

                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
                  <Image
                    src="/images/specialist_james.png"
                    alt="James Harrison"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">
                    James Harrison
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mx-auto font-light">
                    Vietnam travel specialist with 12 years of on-the-ground expertise
                  </p>
                </div>

                <Link
                  href="/enquire"
                  className="w-full bg-[#ba996a] text-white hover:bg-slate-800 transition-colors duration-300 font-sans text-xs font-bold tracking-[0.2em] uppercase py-3.5 text-center cursor-pointer"
                >
                  MAKE AN INQUIRY
                </Link>

                <div className="pt-2 border-t border-slate-100 w-full flex flex-col items-center">
                  <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest block mb-0.5">Or call us directly</span>
                  <a href="tel:+442078459200" className="text-base font-bold text-slate-800 hover:text-[#c5a880] transition-colors duration-200">
                    +44 (0) 20 7845 9200
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. GUIDES LISTING ── */}
        <section className="bg-white border-t border-slate-200/40 py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-10 mb-12">
              <div className="space-y-4 max-w-2xl text-left">
                <h2 className="font-serif text-3xl sm:text-4xl text-slate-800 font-medium">
                  Vietnam Travel Guides &amp; Expert Articles
                </h2>
                <p className="text-sm lg:text-base text-slate-500 font-light leading-relaxed">
                  {posts.length} guide{posts.length !== 1 ? 's' : ''} written by specialists who know Vietnam inside out.
                </p>
              </div>
            </div>

            {/* Featured Article (first post, large) */}
            {featuredPost && (
              <div className="mb-16">
                <Link href={`/travel-guides/${featuredPost.slug?.current || ''}`}>
                  <article className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-slate-200/60 hover:border-[#c5a880]/40 hover:shadow-xl transition-all duration-500 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-72 lg:h-[420px] overflow-hidden bg-slate-100">
                      <Image
                        src={featuredPost.mainImage || FALLBACK_IMAGES[0]}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        priority
                      />
                      <div className="absolute top-5 left-5 bg-[#ba996a] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                        FEATURED GUIDE
                      </div>
                      <div className="absolute bottom-5 left-5 bg-black/55 backdrop-blur-[2px] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 rounded-sm">
                        <span>🕒</span>
                        <span>{getReadingTime(featuredPost.content)} min read</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-10 lg:p-14 flex flex-col justify-center space-y-5">
                      <div className="space-y-2">
                        <span className="text-[10px] text-[#c5a880] tracking-widest uppercase font-bold block">
                          {getCategory(featuredPost.title)}
                        </span>
                        {featuredPost.publishedAt && (
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium block">
                            {new Date(featuredPost.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-snug font-semibold text-slate-800 group-hover:text-[#ba996a] transition-colors duration-300">
                        {featuredPost.title}
                      </h3>

                      {featuredPost.excerpt && (
                        <p className="text-sm text-slate-600 leading-relaxed font-light line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}

                      <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ba996a] group-hover:text-slate-800 transition-colors">
                        <span>Read Full Guide</span>
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* Grid — remaining posts */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gridPosts.map((post, idx) => (
                  <Link key={post._id} href={`/travel-guides/${post.slug?.current || ''}`}>
                    <article className="group bg-white border border-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:shadow-lg flex flex-col h-full">

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-50 border-b border-slate-100">
                        <Image
                          src={post.mainImage || FALLBACK_IMAGES[(idx + 1) % FALLBACK_IMAGES.length]}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                        <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-[2px] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 flex items-center gap-1 rounded-sm">
                          <span>🕒</span>
                          <span>{getReadingTime(post.content)} min</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 text-left space-y-2 flex-1 flex flex-col">
                        <span className="text-[10px] text-[#c5a880] tracking-widest uppercase font-bold block">
                          {getCategory(post.title)}
                        </span>
                        <h4 className="font-serif text-[16px] lg:text-[17px] leading-snug font-semibold text-slate-800 group-hover:text-[#c5a880] transition-colors duration-200 flex-1">
                          {post.title}
                        </h4>
                        {post.publishedAt && (
                          <p className="text-[11px] font-medium text-slate-400 tracking-wide pt-1">
                            {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold bg-white">
                        <span className="text-slate-600 group-hover:text-slate-900 group-hover:underline transition-colors">
                          Read guide
                        </span>
                        <svg className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* Count progress bar */}
            <div className="mt-16 pb-12 flex flex-col items-center space-y-4 max-w-xs mx-auto text-center border-b border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">
                You've viewed {posts.length} of {posts.length} guides
              </span>
              <div className="w-full h-[3px] bg-slate-200/60 rounded-full overflow-hidden">
                <div className="h-full bg-slate-800 rounded-full w-full" />
              </div>
            </div>

          </div>
        </section>

        {/* ── 5. FAQ ── */}
        <section id="faq-section" className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a880] block">Expert Knowledge</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 font-semibold leading-tight">
              Frequently Asked Questions About Vietnam Travel
            </h2>
            <div className="h-[1.5px] w-12 bg-[#c5a880] mx-auto mt-4" />
          </div>

          <div className="space-y-3 w-full max-w-3xl mx-auto">
            {[
              { q: 'How long do I need to see Vietnam properly?', a: 'A minimum of 10 days is needed to see the highlights without feeling rushed. Two weeks is the sweet spot — enough to travel from Hanoi to Ho Chi Minh City with meaningful time in Halong Bay, Hoi An, and one other region. Three weeks allows you to add Sapa or the Mekong Delta at a genuinely relaxed pace.' },
              { q: 'Is Vietnam suitable for first-time visitors to Southeast Asia?', a: 'Absolutely. Vietnam is one of the most accessible destinations in Southeast Asia. The major cities have excellent international hotel options, the infrastructure for travel is well-developed, and English is widely spoken in tourist areas. With a private guide and driver, even the more remote regions are completely manageable.' },
              { q: 'What is the best way to get around Vietnam?', a: 'For a private tour, a combination of domestic flights (VietJet or Vietnam Airlines) for long distances and private air-conditioned cars for regional travel works best. Overnight trains between Hanoi and Da Nang are a memorable experience if you have the time. We arrange all transfers as part of your itinerary.' },
              { q: 'Which region of Vietnam is the most beautiful?', a: 'An impossible question — every region is distinct. Halong Bay for dramatic seascapes. Sapa for mountain landscapes and ethnic culture. Hoi An for architectural beauty and food. The Mekong Delta for river life. Ha Giang for wild, off-grid scenery. Our specialists will help you choose based on your interests and travel dates.' },
              { q: 'When should I avoid visiting Vietnam?', a: 'The main weather risks are: typhoon season on the central coast (September-November); the cool, foggy season in Sapa (December-February); and the wet season in the south (May-October). However, Vietnam is a year-round destination — the north and south often have opposite seasons, so there is always a great region to visit.' },
            ].map((item, i) => (
              <details key={i} className="group bg-[#f5f6f6] border border-slate-200/70 rounded-sm shadow-sm open:border-slate-300">
                <summary className="flex justify-between items-center px-6 py-4 cursor-pointer list-none select-none">
                  <h4 className="font-serif text-[15px] sm:text-[17px] text-slate-800 font-semibold leading-snug pr-4">
                    {item.q}
                  </h4>
                  <span className="text-[#c5a880] text-xl font-light transition-transform duration-300 group-open:rotate-45 inline-block shrink-0">＋</span>
                </summary>
                <div className="px-6 pb-5 pt-1 border-t border-slate-200/40">
                  <p className="text-slate-600 text-sm leading-relaxed font-light">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── 6. FEATURED TOURS ── */}
        <section className="py-20 px-6 lg:px-12 bg-white border-t border-slate-200/50">
          <div className="max-w-7xl mx-auto text-center space-y-4 mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a880] block">Signature Journeys</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 font-semibold">Explore Our Vietnam Tour Collection</h2>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 justify-center">
            {[
              { label: 'Classic Vietnam', desc: '14 days from Hanoi to Saigon', link: '/itineraries', img: '/images/vietnamtour_hanoi_colonial.png' },
              { label: 'Luxury Coastal', desc: 'Halong Bay, Hoi An & the coast', link: '/itineraries', img: '/images/hero_halong_bay.png' },
              { label: 'Culinary Journey', desc: 'Vietnam through its food culture', link: '/itineraries', img: '/images/vietnamtour_cave_dining.png' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="group flex-1 min-w-[240px] max-w-sm">
                <div className="relative h-56 overflow-hidden rounded-sm border border-slate-200/40">
                  <Image src={item.img} alt={item.label} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                    <h4 className="font-serif text-lg text-white font-semibold">{item.label}</h4>
                    <p className="text-xs text-white/75 font-light mt-1">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/itineraries"
              className="inline-block bg-[#002244] text-white text-xs font-bold uppercase tracking-[0.2em] px-10 py-4 hover:bg-slate-700 transition-colors"
            >
              VIEW ALL VIETNAM TOURS
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
