import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getPostBySlug, getPosts, getItineraries } from '@/sanity/client';
import { PortableText, PortableTextComponents } from '@portabletext/react';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug?.current || '',
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.seo?.metaTitle || `${post.title} | Vietnam Travel Guide`;
  const description = post.seo?.metaDescription || post.excerpt || `Expert travel guide: ${post.title}. Insider knowledge for planning your perfect Vietnam trip.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(post.mainImage && { images: [{ url: post.mainImage }] }),
    },
  };
}

// ─── Reading time helper ──────────────────────────────────────────────────────
function getReadingTime(content: any[] | undefined | null): number {
  if (!content || !Array.isArray(content)) return 5;
  let wordCount = 0;
  content.forEach((block: any) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) wordCount += child.text.trim().split(/\s+/).length;
      });
    }
  });
  return Math.max(2, Math.ceil(wordCount / 220));
}

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

// ─── PortableText components (matching itineraries style) ────────────────────
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.url) return null;
      return (
        <div className="my-10 relative w-full border border-luxury-gold/10 p-1.5 bg-luxury-slate/20 rounded-sm group">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xs">
            <Image
              src={value.url}
              alt={value.alt || 'Article image'}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
          {value.caption && (
            <span className="block text-[10px] text-luxury-linen/50 uppercase tracking-widest font-light mt-3 text-center">
              {value.caption}
            </span>
          )}
        </div>
      );
    },
    gallery: ({ value }: any) => {
      const images = value?.images || [];
      if (images.length === 0) return null;
      return (
        <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((item: any, idx: number) => (
            <div key={idx} className="relative aspect-[4/3] overflow-hidden border border-luxury-gold/10 rounded-sm group">
              {item.url && (
                <Image src={item.url} alt={item.caption || 'Gallery photo'} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              )}
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] uppercase tracking-widest text-white/90 font-light">{item.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    },
    specialistTip: ({ value }: any) => {
      const avatar = value.customAvatar?.url || value.specialist?.image || '/images/specialist_alice.png';
      const name = value.customName || value.specialist?.name || 'Travel Specialist';
      const role = value.customRole || value.specialist?.role || 'Expert';
      return (
        <div className="my-8 float-none lg:float-right lg:w-[42%] lg:ml-10 p-7 bg-luxury-slate/50 border border-luxury-gold/20 border-t-2 border-t-[#c5a880]/80 shadow-xl rounded-xs relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a880] block mb-3">
            Specialist Insider Tip
          </span>
          <p className="text-sm text-luxury-linen/80 font-light leading-relaxed italic border-l-2 border-[#c5a880]/40 pl-4">
            &ldquo;{value.tip}&rdquo;
          </p>
          <div className="flex items-center space-x-3 pt-4 mt-4 border-t border-luxury-gold/10">
            <div className="w-9 h-9 rounded-full overflow-hidden relative flex-shrink-0 border border-[#c5a880]/30">
              <Image src={avatar} alt={name} fill className="object-cover grayscale" />
            </div>
            <div>
              <span className="block text-xs font-serif text-luxury-linen font-semibold">{name}</span>
              <span className="block text-[9px] uppercase tracking-wider text-luxury-linen/50 font-light">{role}</span>
            </div>
          </div>
        </div>
      );
    },
    pullQuote: ({ value }: any) => (
      <blockquote className="clear-both border-y border-[#c5a880]/30 py-10 my-12 text-center relative max-w-3xl mx-auto px-6">
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-5xl font-serif text-[#c5a880]/30 leading-none select-none">&ldquo;</span>
        <p className="font-serif text-xl sm:text-3xl text-luxury-linen font-light italic leading-relaxed">
          {value.quote}
        </p>
        {value.author && (
          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#c5a880] mt-6 font-medium">
            — {value.author}
          </span>
        )}
      </blockquote>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-base sm:text-[17px] font-light text-luxury-linen/90 leading-relaxed mb-6 max-w-3xl">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="clear-both font-serif text-2xl sm:text-4xl text-luxury-linen font-semibold leading-tight mt-16 mb-8 pb-4 border-b border-luxury-gold/10 max-w-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="clear-both font-serif text-xl sm:text-2xl text-luxury-gold font-medium leading-tight mt-10 mb-5 max-w-3xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#c5a880] pl-6 py-1 my-8 text-lg font-light italic text-luxury-linen/70 max-w-3xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-luxury-gold">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-luxury-gold/90">{children}</em>,
  },
};

// ─── Related FAQs (per guide topic) ──────────────────────────────────────────
function getRelatedFaqs(title: string) {
  const t = title.toLowerCase();
  if (t.includes('halong') || t.includes('lan ha')) return [
    { question: 'How many nights should I spend on Halong Bay?', answer: 'Two nights is the minimum we recommend. One night gives you only a few hours on the bay after departure and before return; two nights allows you to explore multiple areas and experience sunrise on the water, which is the defining moment of a bay cruise.' },
    { question: 'What is the difference between Halong Bay and Bai Tu Long Bay?', answer: 'They are adjacent areas of the same geological formation. Bai Tu Long is less visited and slightly wilder in character, though the infrastructure is less developed. Heritage Line and some other premium operators run itineraries combining both.' },
    { question: 'Is Halong Bay suitable for children?', answer: 'Yes, with the right boat. Choose a vessel with a stable deck, a shallow-water swimming area, and an excursion programme that includes kayaking to lagoons. Most premium boats accommodate children extremely well.' },
  ];
  if (t.includes('sapa')) return [
    { question: 'Do I need to be fit to trek in Sapa?', answer: 'Most Sapa treks are rated moderate. The terrain is hilly rather than steep mountain climbing. A reasonably fit person who walks regularly will find the standard routes very manageable. Porter support can always be arranged for bags.' },
    { question: 'What is the best way to get from Hanoi to Sapa?', answer: 'The overnight sleeper train from Hanoi to Lao Cai (the town at the foot of the Sapa valley) departs at 9:30pm and arrives at 6am — a scenic and comfortable journey in a private cabin. From Lao Cai, a private car takes you to Sapa in about 1 hour.' },
    { question: 'Which villages near Sapa should I visit?', answer: 'Cat Cat, Ta Van, and Y Linh Ho are accessible and make for excellent half or full-day treks. Ta Phin village, home of the Red Dao community, requires a longer journey (40 minutes by car plus 45 minutes on foot) but is far less visited and very rewarding.' },
  ];
  if (t.includes('hoi an')) return [
    { question: 'How many days should I spend in Hoi An?', answer: 'Three full days is ideal for a first visit: one day for the Ancient Town and riverside, one day for bicycle riding to Tra Que village, and one day for Cham Island or the beach at An Bang. Five days allows you to go deeper into cooking classes, tailoring, and day trips to My Son.' },
    { question: 'Is the beach at Hoi An good?', answer: 'An Bang Beach, 5km from the Ancient Town, is the best nearby beach. It is quieter and more relaxed than Da Nang\'s My Khe, with good beach clubs and excellent seafood. Cua Dai Beach, the historically famous option, has suffered significant erosion and is no longer recommended.' },
    { question: 'Can I get clothes made in Hoi An?', answer: 'Yes, and it is one of Hoi An\'s most famous features. The tailoring industry is concentrated on Le Loi and Tran Phu streets. Allow 48-72 hours for a good result. Bring reference photos; Yaly Couture and Bebe Tailor are the most reliable options for quality work.' },
  ];
  if (t.includes('hanoi')) return [
    { question: 'How many days should I spend in Hanoi?', answer: 'Two full days covers the major highlights. Three days allows you to go deeper — the Museum of Ethnology, a bicycle ride to the flower villages, a cooking class, and evening egg coffee in a rooftop bar overlooking Hoan Kiem Lake.' },
    { question: 'Is Hanoi safe to visit?', answer: 'Hanoi is a very safe city for tourists. Petty theft (bag snatching from motorbikes) is the main risk on busy Old Quarter streets — keep cameras inside bags and avoid phone use on the pavement. Violent crime against tourists is extremely rare.' },
    { question: 'Which are the best restaurants in Hanoi?', answer: 'For authentic local food: Pho Thin (pho), Bun Cha Huong Lien (bun cha), Cha Ca La Vong (turmeric fish). For a fine-dining experience: Secrets of Hanoi (multi-course Vietnamese tasting menu) or HOME Restaurant (modern Vietnamese in a beautifully restored French villa).' },
  ];
  // default FAQs for all other guides
  return [
    { question: 'How far in advance should I book a Vietnam tour?', answer: 'We recommend booking 2-4 months in advance for travel between October and March (peak season). For other periods, 6-8 weeks is usually sufficient, though popular properties and cruise boats can fill up quickly year-round.' },
    { question: 'Is Vietnam suitable for solo travellers?', answer: 'Yes — Vietnam is one of the most rewarding destinations for solo travellers. With a private guide and driver, you have complete flexibility of schedule while still having expert support. Our single-traveller supplements are kept as low as possible.' },
    { question: 'What is included in a private Vietnam tour?', answer: 'Every private tour includes: private car and driver for all transfers, a dedicated English-speaking guide, accommodation at 4 or 5-star properties, and selected meals. International and domestic flights are arranged but priced separately. All activities and excursions are included unless marked optional.' },
  ];
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
];

// ─── Page Component ───────────────────────────────────────────────────────────
export default async function TravelGuideDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [post, allPosts, itineraries] = await Promise.all([
    getPostBySlug(slug),
    getPosts(),
    getItineraries(),
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((p) => p._id !== post._id).slice(0, 3);
  const featuredItineraries = itineraries.filter((it) => it.featured).slice(0, 3);
  const recommendedTours = featuredItineraries.length ? featuredItineraries : itineraries.slice(0, 3);
  const relatedFaqs = getRelatedFaqs(post.title);
  const heroImage = post.mainImage || FALLBACK_IMAGES[0];
  const readingTime = getReadingTime(post.content);
  const category = getCategory(post.title);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-luxury-slate text-luxury-linen">

        {/* ════════════════════════════════════════════
            1. SCENIC HERO BANNER
        ════════════════════════════════════════════ */}
        <section className="relative h-[360px] sm:h-[440px] lg:h-[500px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage}
            alt={post.title}
            fill
            className="object-cover brightness-[0.50]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0c]/60 via-[#0a0d0c]/15 to-transparent" />

          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32 lg:pt-36 max-w-4xl mx-auto">
            {/* Category + Reading Time tags */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="bg-[#c5a880]/90 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                {category}
              </span>
              <span className="bg-black/40 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                🕒 {readingTime} min read
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
                {post.excerpt}
              </p>
            )}

            {/* Breadcrumbs */}
            <div className="mt-5 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-[#c5a880] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <Link href="/travel-guides" className="hover:text-white transition-colors">Travel Guides</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">{category}</span>
            </div>
          </div>
        </section>

        {/* ── CATEGORIES TAB BAR ── */}
        <CategoriesTabBar activeTab="guides" />

        {/* ════════════════════════════════════════════
            2. ARTICLE CONTENT + SPECIALIST SIDEBAR
        ════════════════════════════════════════════ */}
        <section id="article-content" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── LEFT: Main article content ── */}
            <div className="lg:col-span-8">
              {/* Published metadata bar */}
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-luxury-gold/10">
                {post.publishedAt && (
                  <span className="text-[11px] text-luxury-linen/50 uppercase tracking-widest font-medium">
                    Published {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                )}
                <span className="text-luxury-gold/25">|</span>
                <span className="text-[11px] text-luxury-linen/50 uppercase tracking-widest font-medium">{readingTime} min read</span>
                {post.heroAuthor?.name && (
                  <>
                    <span className="text-luxury-gold/25">|</span>
                    <span className="text-[11px] text-luxury-linen/50 uppercase tracking-widest font-medium">By {post.heroAuthor.name}</span>
                  </>
                )}
              </div>

              {/* Drop-cap article content */}
              {post.content && post.content.length > 0 ? (
                <div className="article-body">
                  <style dangerouslySetInnerHTML={{ __html: `
                    .article-body > p:first-of-type::first-letter {
                      float: left;
                      font-size: 4.5rem;
                      line-height: 0.82;
                      padding-right: 0.65rem;
                      padding-top: 0.4rem;
                      font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
                      font-weight: 600;
                      color: #ba996a;
                    }
                  `}} />
                  <PortableText value={post.content} components={portableTextComponents} />
                </div>
              ) : (
                <p className="text-luxury-linen/40 italic">Full article content coming soon.</p>
              )}

              {/* Social share strip */}
              <div className="mt-12 pt-8 border-t border-luxury-gold/10 flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-linen/40">Share this guide</span>
                {['Facebook', 'X (Twitter)', 'Email'].map((sn) => (
                  <span key={sn} className="text-[10px] uppercase tracking-widest font-bold text-[#ba996a] hover:text-luxury-linen transition-colors cursor-pointer">{sn}</span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Sticky sidebar ── */}
            <div className="lg:col-span-4 space-y-8">

              {/* Specialist contact card */}
              <div className="bg-luxury-slate/30 border border-luxury-gold/10 p-8 shadow-xl flex flex-col items-center text-center space-y-5 sticky top-28">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#c5a880] block">
                  Plan this journey
                </span>
                <h3 className="font-serif text-lg font-semibold text-luxury-linen leading-snug">
                  Speak to a Vietnam specialist
                </h3>

                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-luxury-gold/15 shadow-sm shrink-0">
                  <Image
                    src="/images/specialist_alice.png"
                    alt="Alice Mercer"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-sans text-sm font-bold text-luxury-linen uppercase tracking-wider">Alice Mercer</h4>
                  <p className="text-xs text-luxury-linen/60 leading-relaxed font-light">Senior Vietnam Travel Specialist</p>
                </div>

                <Link
                  href="/enquire"
                  className="w-full bg-luxury-gold text-luxury-slate hover:bg-luxury-gold/90 transition-colors duration-300 font-sans text-xs font-bold tracking-[0.2em] uppercase py-3.5 text-center"
                >
                  MAKE AN INQUIRY
                </Link>

                <div className="pt-2 border-t border-luxury-gold/10 w-full flex flex-col items-center">
                  <span className="text-[10px] uppercase text-luxury-linen/40 font-bold tracking-widest block mb-1">Or call us directly</span>
                  <a href="tel:+442078459200" className="text-base font-bold text-luxury-linen hover:text-luxury-gold transition-colors">
                    +44 (0) 20 7845 9200
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════
            3. RECOMMENDED TOURS SECTION
        ════════════════════════════════════════════ */}
        {recommendedTours.length > 0 && (
          <section className="bg-luxury-slate/10 border-t border-luxury-gold/10 py-16 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">

              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-luxury-gold/10 pb-10 mb-12">
                <div className="space-y-3 text-left">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a880] block">Signature Journeys</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-luxury-linen font-medium">
                    Highly Recommended Tours
                  </h2>
                  <p className="text-sm text-luxury-linen/60 font-light">
                    Itineraries that pair perfectly with this travel guide.
                  </p>
                </div>
                <Link
                  href="/itineraries"
                  className="text-xs uppercase tracking-widest font-bold text-[#c5a880] hover:text-luxury-linen transition-colors pb-1 border-b border-[#c5a880]/30 hover:border-luxury-gold self-start sm:self-end"
                >
                  View all tours
                </Link>
              </div>

              {/* Tours grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedTours.map((it) => (
                  <div key={it._id} className="group bg-luxury-slate/30 border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300 hover:shadow-xl flex flex-col h-full relative">

                    {/* Featured badge */}
                    {it.featured && (
                      <div className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm absolute top-4 left-4 z-10 flex items-center gap-0.5 shadow-sm">
                        <span>★</span>
                        <span>FEATURED</span>
                      </div>
                    )}

                    <div>
                      {/* Tour image */}
                      <div className="relative h-52 overflow-hidden bg-luxury-slate/20 border-b border-luxury-gold/10">
                        <Image
                          src={it.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                          alt={it.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Card content */}
                      <div className="p-5 text-left space-y-2">
                        <span className="text-[10px] text-[#c5a880] tracking-widest uppercase font-bold block">VIETNAM</span>
                        <h4 className="font-serif text-[16px] leading-snug font-semibold text-luxury-linen group-hover:text-luxury-gold transition-colors duration-200">
                          <Link href={`/itineraries/${it.slug?.current || ''}`}>{it.title}</Link>
                        </h4>
                        {it.duration && it.priceFrom && (
                          <p className="text-[12px] font-medium text-luxury-linen/60 tracking-wide pt-1">
                            {it.duration} Days from £{it.priceFrom?.toLocaleString('en-GB')}pp
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-5 py-4 border-t border-luxury-gold/10 flex items-center justify-between text-xs font-semibold bg-luxury-slate/40 mt-auto">
                      <Link href={`/itineraries/${it.slug?.current || ''}`} className="text-luxury-linen/70 hover:text-luxury-gold transition-colors">
                        View detail
                      </Link>
                      <Link href="/enquire" className="text-luxury-gold hover:text-luxury-linen transition-colors">
                        Request a quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            4. FAQ SECTION
        ════════════════════════════════════════════ */}
        <section id="faq-section" className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a880] block">Expert Knowledge</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-luxury-linen font-semibold leading-tight">
              Useful information for planning your holiday in Vietnam
            </h2>
            <div className="h-[1.5px] w-12 bg-[#c5a880] mx-auto mt-4" />
          </div>

          <div className="w-full flex justify-center">
            <FaqAccordion faqs={relatedFaqs} />
          </div>
        </section>

        {/* ════════════════════════════════════════════
            5. MORE TRAVEL GUIDES
        ════════════════════════════════════════════ */}
        {relatedPosts.length > 0 && (
          <section id="blog-section" className="py-20 px-6 lg:px-12 bg-luxury-slate/10 border-t border-luxury-gold/10">
            <div className="max-w-7xl mx-auto">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div className="space-y-3 text-left">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a880] block">
                    Travel Journal
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-luxury-linen font-semibold leading-tight">
                    More Vietnam Travel Guides
                  </h2>
                </div>
                <Link
                  href="/travel-guides"
                  className="text-xs uppercase tracking-widest font-bold text-[#c5a880] hover:text-luxury-linen transition-colors pb-1 border-b border-[#c5a880]/30 hover:border-luxury-gold self-start sm:self-end"
                >
                  View all guides
                </Link>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((rp, idx) => (
                  <article key={rp._id} className="group flex flex-col space-y-4 text-left h-full">
                    <div className="relative h-64 overflow-hidden rounded-sm bg-luxury-slate/20 border border-luxury-gold/10">
                      <Image
                        src={rp.mainImage || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]}
                        alt={rp.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute bottom-4 left-4 bg-luxury-slate/85 border border-luxury-gold/10 backdrop-blur-[2px] text-luxury-linen text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 shadow-sm rounded-sm">
                        <span>🕒</span>
                        <span>{getReadingTime(rp.content)} minutes read</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {rp.publishedAt && (
                        <span className="text-[9px] text-luxury-linen/50 uppercase tracking-widest block font-bold">
                          {new Date(rp.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      )}
                      <h4 className="font-serif text-lg leading-snug font-semibold text-luxury-linen group-hover:text-[#c5a880] transition-colors duration-200">
                        <Link href={`/travel-guides/${rp.slug?.current || ''}`}>
                          {rp.title}
                        </Link>
                      </h4>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            6. BOTTOM CTA
        ════════════════════════════════════════════ */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto bg-luxury-slate/30 border border-luxury-gold/10 p-10 sm:p-16 text-center space-y-8 shadow-xl">
            {post.ctaLabel && (
              <div className="inline-block border border-[#c5a880]/40 px-6 py-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#c5a880]">
                {post.ctaLabel}
              </div>
            )}

            <h3 className="font-serif text-2xl sm:text-4xl text-luxury-linen font-medium leading-tight">
              {post.ctaHeading || 'Ready to Start Planning?'}
            </h3>

            {post.ctaDescription && (
              <p className="text-base text-luxury-linen/60 font-light max-w-xl mx-auto leading-relaxed">
                {post.ctaDescription}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-luxury-gold text-luxury-slate text-xs uppercase tracking-widest font-semibold px-10 py-4 hover:bg-luxury-gold/90 transition-colors"
              >
                Enquire Online
              </Link>
              <Link
                href="/itineraries"
                className="w-full sm:w-auto border border-luxury-gold/30 hover:border-luxury-gold hover:text-luxury-gold text-luxury-linen text-xs uppercase tracking-widest font-semibold px-10 py-4 transition-colors"
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
