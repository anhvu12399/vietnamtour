import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getPosts } from '@/sanity/client';

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

  const seo = post.seo;
  const title = seo?.metaTitle || `${post.title} – Inspiration | Vietnam Tour`;
  const description = seo?.metaDescription || post.excerpt || `Read our latest article: ${post.title}. Discover insider travel tips for Vietnam.`;

  return {
    title,
    description,
    keywords: seo?.keywords?.join(', '),
    openGraph: {
      title,
      description,
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
      ...(post.mainImage && !seo?.ogImage && { images: [{ url: post.mainImage }] }),
    },
  };
}

// Helpers for parsing content blocks
const getBlockText = (block: any): string => {
  return block.children?.map((c: any) => c.text).join('') || '';
};

const isSectionHeading = (block: any): boolean => {
  if (block._type !== 'block') return false;
  if (block.style && /^h[1-6]$/.test(block.style)) return true;
  const text = getBlockText(block).trim();
  // Match lines starting with "Days" or "Day" or headers
  return text.startsWith('Days') || text.startsWith('Day ') || text.startsWith('A Few Practical');
};

interface EditorialSection {
  headingText?: string;
  headingBlock?: any;
  blocks: any[];
}

// Helper to render inline marks (bold/italic) for children spans
function renderSpans(children: any[]) {
  return children.map((child: any, idx: number) => {
    if (child._type !== 'span') return null;
    let element = <span key={idx}>{child.text}</span>;
    const marks = child.marks || [];
    if (marks.includes('strong')) {
      element = <strong key={idx} className="font-semibold text-luxury-linen">{child.text}</strong>;
    }
    if (marks.includes('em')) {
      element = <em key={idx} className="italic text-luxury-linen/90">{child.text}</em>;
    }
    return element;
  });
}

// Specialist Tips database matching regions
const getSpecialistTip = (heading: string) => {
  const h = heading.toLowerCase();
  if (h.includes('hanoi')) {
    return {
      author: 'Alice Mercer',
      role: 'Hanoi Specialist',
      avatar: '/images/specialist_alice.png',
      tip: "Hanoi is best explored slowly on foot. Ask your private guide to lead you through the back alleys of the French Quarter to discover hidden colonial courtyards and art-deco villas serving egg coffee."
    };
  }
  if (h.includes('halong')) {
    return {
      author: 'James Harrison',
      role: 'Cruise Specialist',
      avatar: '/images/specialist_james.png',
      tip: "To avoid the crowded channels of Halong Bay, we always recommend booking a boutique private charter yacht sailing through Lan Ha or Bai Tu Long bays, offering identical karsts but complete seclusion."
    };
  }
  if (h.includes('hoi an')) {
    return {
      author: 'Alice Mercer',
      role: 'Central Vietnam Expert',
      avatar: '/images/specialist_alice.png',
      tip: "Hoi An tailors are legendary, but quality varies. We work exclusively with a multi-generational tailor house where you can have private fittings over premium silk while sipping gin and tonics."
    };
  }
  if (h.includes('saigon') || h.includes('ho chi minh')) {
    return {
      author: 'James Harrison',
      role: 'Saigon Specialist',
      avatar: '/images/specialist_james.png',
      tip: "For a real thrill, explore Saigon's culinary scene from the back of a vintage Vespa at night. We'll arrange private drivers to whisk you from street-food stalls to secret jazz bars."
    };
  }
  if (h.includes('mekong')) {
    return {
      author: 'Alice Mercer',
      role: 'Mekong Specialist',
      avatar: '/images/specialist_alice.png',
      tip: "Board a private wooden sampan boat at sunrise. Gliding through the quiet, palm-lined side canals of Ben Tre before the heat sets in is the most peaceful experience in the south."
    };
  }
  return null;
};

// Travel images database matching regions
const getChapterImage = (heading: string) => {
  const h = heading.toLowerCase();
  if (h.includes('hanoi')) {
    return {
      src: '/images/vietnamtour_hanoi_colonial.png',
      caption: 'The colonial grace and timeless streets of Hanoi.'
    };
  }
  if (h.includes('halong')) {
    return {
      src: '/images/vietnamtour_halong_yacht_luxury.png',
      caption: 'A private luxury junk cruising the dramatic karsts of Halong.'
    };
  }
  if (h.includes('hoi an')) {
    return {
      src: '/images/hero_hoian.png',
      caption: 'Lanterns glowing along the Thu Bon Riverfront in Hoi An.'
    };
  }
  if (h.includes('saigon') || h.includes('ho chi minh')) {
    return {
      src: '/images/press_hero_colonial.png',
      caption: 'Ho Chi Minh City’s elegant colonial heritage blending with modern life.'
    };
  }
  if (h.includes('mekong')) {
    return {
      src: '/images/vietnamtour_mekong_sampan.png',
      caption: 'Drifting through the palm-shaded canals of the Mekong Delta.'
    };
  }
  return {
    src: '/images/vietnamtour_cave_dining.png',
    caption: 'Bespoke private dining experiences tailored for our guests.'
  };
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Parse blocks into editorial sections
  const sections: EditorialSection[] = [];
  let currentSection: EditorialSection = { blocks: [] };

  if (post.content && Array.isArray(post.content)) {
    for (const block of post.content) {
      if (isSectionHeading(block)) {
        if (currentSection.blocks.length > 0 || currentSection.headingBlock) {
          sections.push(currentSection);
        }
        currentSection = { 
          headingBlock: block, 
          headingText: getBlockText(block),
          blocks: [] 
        };
      } else {
        currentSection.blocks.push(block);
      }
    }
    if (currentSection.blocks.length > 0 || currentSection.headingBlock) {
      sections.push(currentSection);
    }
  }

  // Split into intro and chapters
  const introSection = sections.find(s => !s.headingText);
  const chapters = sections.filter(s => !!s.headingText);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 pb-24 bg-luxury-slate text-luxury-linen overflow-hidden">
        
        {/* EDITORIAL HERO BLOCK (Asymmetric magazine cover style) */}
        <section className="relative w-full border-b border-luxury-gold/15 py-12 lg:py-20 bg-luxury-moss/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column - Metadata & Serif Title */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                    <Link href="/inspiration" className="hover:underline">Inspiration</Link>
                    <span>•</span>
                    <span>Travel Journal</span>
                  </div>
                  {post.publishedAt && (
                    <span className="block text-[11px] uppercase tracking-widest text-luxury-linen/50 font-light">
                      Published on {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-medium leading-tight text-luxury-linen tracking-tight">
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p className="text-base sm:text-lg font-light text-luxury-linen/75 italic border-l-2 border-luxury-gold pl-6 py-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-luxury-gold/30">
                    <Image src="/images/specialist_alice.png" alt="Alice Mercer" fill className="object-cover grayscale" />
                  </div>
                  <div>
                    <span className="block text-xs font-serif text-luxury-gold font-medium">Curated by Alice Mercer</span>
                    <span className="block text-[9px] uppercase tracking-wider text-luxury-linen/40 font-light">Senior Travel Specialist</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Premium floating offset frame */}
              <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:h-[450px] lg:w-[600px] border border-luxury-gold/25 p-3 bg-luxury-moss/50 shadow-2xl rounded-sm">
                  {post.mainImage ? (
                    <div className="relative w-full h-full overflow-hidden rounded-xs">
                      <Image 
                        src={post.mainImage} 
                        alt={post.title} 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                        priority 
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-luxury-moss" />
                  )}
                  {/* Decorative frame overlay */}
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-luxury-gold/30 pointer-events-none" />
                  <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-luxury-gold/30 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* INTRO COLUMN + WIDGETS SIDEBAR (2-Column Kinfolk style) */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-b border-luxury-moss/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Intro text - Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {introSection && introSection.blocks.map((block: any, blockIdx: number) => {
                if (block._type === 'image') {
                  return (
                    <div key={blockIdx} className="my-8 relative aspect-[4/3] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss rounded-sm shadow-lg group">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image 
                          src={block.url} 
                          alt={block.alt || 'Intro Image'} 
                          fill 
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                          sizes="(max-width: 768px) 100vw, 600px"
                        />
                      </div>
                      {block.caption && (
                        <span className="block text-[10px] text-luxury-linen/50 uppercase tracking-widest font-light mt-2 text-center">
                          {block.caption}
                        </span>
                      )}
                    </div>
                  );
                }
                
                const text = getBlockText(block);
                if (blockIdx === 0 && text) {
                  // Drop cap
                  const firstChar = text.charAt(0);
                  const restText = text.slice(1);
                  return (
                    <p key={blockIdx} className="text-base sm:text-lg font-light text-luxury-linen/85 leading-relaxed first-letter:text-6xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:text-luxury-gold first-letter:mt-1">
                      <span className="sr-only">{firstChar}</span>
                      {restText}
                    </p>
                  );
                }
                return (
                  <p key={blockIdx} className="text-base sm:text-lg font-light text-luxury-linen/80 leading-relaxed">
                    {renderSpans(block.children || [])}
                  </p>
                );
              })}
            </div>

            {/* Spec Sheet & Specialist Tip - Right Column */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Specification Card */}
              <div className="bg-luxury-moss border border-luxury-gold/20 p-8 shadow-xl relative rounded-xs">
                <span className="absolute -top-3 left-6 bg-luxury-slate px-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                  JOURNEY FACT SHEET
                </span>
                
                <div className="divide-y divide-luxury-gold/10 pt-4 space-y-4">
                  <div className="flex justify-between items-center text-xs pb-4">
                    <span className="uppercase tracking-widest text-luxury-linen/50 font-light">Pacing</span>
                    <span className="font-serif text-luxury-linen font-medium">Bespoke & Leisurely</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-4 pb-4">
                    <span className="uppercase tracking-widest text-luxury-linen/50 font-light">Best Months</span>
                    <span className="font-serif text-luxury-gold font-medium">November – April</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-4 pb-4">
                    <span className="uppercase tracking-widest text-luxury-linen/50 font-light">Duration</span>
                    <span className="font-serif text-luxury-linen font-medium">14 Days / 13 Nights</span>
                  </div>
                  <div className="flex justify-between items-start text-xs pt-4 pb-4">
                    <span className="uppercase tracking-widest text-luxury-linen/50 font-light mt-0.5">Destinations</span>
                    <span className="font-serif text-luxury-linen font-medium text-right max-w-[200px]">
                      Hanoi · Halong Bay · Hoi An · Saigon · Mekong Delta
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-4">
                    <span className="uppercase tracking-widest text-luxury-linen/50 font-light">Operator Type</span>
                    <span className="font-serif text-luxury-gold font-medium uppercase tracking-wider text-[10px]">Private Jet/VIP Ground</span>
                  </div>
                </div>
              </div>

              {/* Specialist Insider Tip */}
              <div className="border border-luxury-gold/10 p-6 bg-luxury-slate relative rounded-xs">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-gold block mb-3">
                  SPECIALIST INSIDER TIP
                </span>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0 border border-luxury-gold/20">
                    <Image src="/images/specialist_alice.png" alt="Alice Mercer" fill className="object-cover grayscale" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-luxury-linen/80 font-light leading-relaxed italic">
                      "While visa-free entry is valid for up to 45 days for UK passport holders, we recommend letting our VIP concierge handle fast-track clearance on arrival at Hanoi airport to keep your journey completely seamless."
                    </p>
                    <span className="block text-[10px] font-serif text-luxury-gold pt-2">— Alice Mercer, Senior Specialist</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* DYNAMIC CHAPTER SECTION (Alternating image-text layouts) */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">
            {chapters.map((chapter, idx) => {
              const headingText = chapter.headingText || '';
              const isEven = idx % 2 === 0;

              // Filter inline images uploaded via Sanity
              const inlineImages = chapter.blocks.filter(b => b._type === 'image' && b.url);

              // Select the main image for this chapter
              let chapterImageSrc = '';
              let chapterImageCaption = '';

              if (inlineImages.length > 0) {
                chapterImageSrc = inlineImages[0].url;
                chapterImageCaption = inlineImages[0].caption || inlineImages[0].alt || 'Travel scene in Vietnam';
              } else {
                const fallback = getChapterImage(headingText);
                chapterImageSrc = fallback.src;
                chapterImageCaption = fallback.caption;
              }

              // Exclude the first image from blocks rendering to avoid duplicating it
              const blocksToRender = chapter.blocks.filter(block => {
                if (block._type === 'image') {
                  return inlineImages.length > 0 && block !== inlineImages[0];
                }
                return true;
              });

              // Roman numeral generator
              const getRomanNumeral = (num: number) => {
                const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
                return numerals[num] || String(num + 1);
              };

              const specialistTip = getSpecialistTip(headingText);

              return (
                <div 
                  key={idx} 
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  
                  {/* Image Column - alternates left/right */}
                  <div className={`lg:col-span-5 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[3/4] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss/30 rounded-sm group shadow-xl">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image 
                          src={chapterImageSrc} 
                          alt={headingText} 
                          fill 
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-[800ms] ease-out" 
                          sizes="(max-width: 1024px) 100vw, 450px"
                        />
                      </div>
                    </div>
                    <span className="block text-[10px] text-luxury-linen/50 uppercase tracking-widest font-light text-center sm:text-left">
                      {chapterImageCaption}
                    </span>
                  </div>

                  {/* Text Column - alternates left/right */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Chapter Header */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
                        CHAPTER {getRomanNumeral(idx)}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-4.5xl text-luxury-linen font-medium leading-tight">
                        {headingText}
                      </h2>
                      <div className="h-[1px] w-16 bg-luxury-gold/40 mt-3" />
                    </div>

                    {/* Chapter Text Blocks */}
                    <div className="space-y-6">
                      {blocksToRender.map((block: any, bIdx: number) => {
                        if (block._type === 'image') {
                          return (
                            <div key={bIdx} className="my-8 relative aspect-[4/3] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss rounded-sm group shadow-lg">
                              <div className="relative w-full h-full overflow-hidden">
                                <Image 
                                  src={block.url} 
                                  alt={block.alt || 'Travel Image'} 
                                  fill 
                                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                                  sizes="(max-width: 768px) 100vw, 600px"
                                />
                              </div>
                              {block.caption && (
                                <span className="block text-[10px] text-luxury-linen/50 uppercase tracking-widest font-light mt-2 text-center">
                                  {block.caption}
                                </span>
                              )}
                            </div>
                          );
                        }

                        const text = getBlockText(block);
                        // Catch pull-quotes inside text (block styled or italic markers)
                        if (text.startsWith('Insider Tip:') || text.startsWith('How to do it right:')) {
                          return (
                            <blockquote 
                              key={bIdx} 
                              className="border-l border-luxury-gold pl-6 py-2 my-8 italic text-sm text-luxury-linen/90 font-light bg-luxury-moss/20 pr-4"
                            >
                              <span className="text-luxury-gold font-serif font-semibold not-italic block mb-1">
                                {text.startsWith('Insider Tip:') ? 'INSIDER RECOMMENDATION' : 'EXPERT ADVICE'}
                              </span>
                              {text.replace('Insider Tip: ', '').replace('How to do it right: ', '')}
                            </blockquote>
                          );
                        }
                        
                        return (
                          <p key={bIdx} className="text-base sm:text-lg font-light text-luxury-linen/80 leading-relaxed">
                            {renderSpans(block.children || [])}
                          </p>
                        );
                      })}
                    </div>

                    {/* Dynamic Specialist Quote Box within Chapter */}
                    {specialistTip && (
                      <div className="mt-8 p-6 bg-luxury-moss border-t-2 border-luxury-gold/30 space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 border border-luxury-gold/15">
                            <Image src={specialistTip.avatar} alt={specialistTip.author} fill className="object-cover grayscale" />
                          </div>
                          <div>
                            <span className="block text-[11px] font-serif text-luxury-linen font-medium">{specialistTip.author}</span>
                            <span className="block text-[8px] uppercase tracking-wider text-luxury-linen/40 font-light">{specialistTip.role}</span>
                          </div>
                        </div>
                        <p className="text-xs text-luxury-gold font-light leading-relaxed italic">
                          "Tip: {specialistTip.tip}"
                        </p>
                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* 3-IMAGE EDITORIAL PHOTO COLLAGE (Magazine visual break block) */}
        <section className="py-20 bg-luxury-moss/10 border-t border-b border-luxury-moss/50 my-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">Visual Poetry</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-luxury-linen font-medium">The Art of Bespoke Travel</h3>
              <p className="text-xs text-luxury-linen/60 font-light">A snapshot of the signature properties and exclusive experiences that await you.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Image 1 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss rounded-sm group">
                <div className="relative w-full h-full overflow-hidden">
                  <Image src="/images/vietnamtour_cave_dining.png" alt="Cave Dining" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-luxury-slate/90 border border-luxury-gold/15 p-3 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block">Exclusive Dining</span>
                  <span className="text-[9px] text-luxury-linen/70 font-light block">Private chef table inside Halong caverns.</span>
                </div>
              </div>

              {/* Image 2 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss rounded-sm group">
                <div className="relative w-full h-full overflow-hidden">
                  <Image src="/images/vietnamtour_amanoi_villa.png" alt="Amanoi Villa" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-luxury-slate/90 border border-luxury-gold/15 p-3 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block">Ultra-Luxury Retreats</span>
                  <span className="text-[9px] text-luxury-linen/70 font-light block">Ocean view private pavilions at Amanoi.</span>
                </div>
              </div>

              {/* Image 3 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss rounded-sm group">
                <div className="relative w-full h-full overflow-hidden">
                  <Image src="/images/vietnamtour_phu_quoc_beach.png" alt="Phu Quoc Beach" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-luxury-slate/90 border border-luxury-gold/15 p-3 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block">Remote Island Bliss</span>
                  <span className="text-[9px] text-luxury-linen/70 font-light block">Sun-kissed private beaches on Phu Quoc.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDITORIAL FOOTER CTA */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 pt-12">
          <div className="bg-luxury-moss/30 border border-luxury-gold/15 p-8 sm:p-12 rounded-sm text-center space-y-6 shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-luxury-slate border-l border-r border-luxury-gold/30 px-6 text-[10px] uppercase tracking-[0.25em] font-semibold text-luxury-gold">
              DESIGN YOUR JOURNEY
            </div>
            
            <h3 className="font-serif text-2xl sm:text-4xl text-luxury-linen font-medium leading-tight">
              Begin Writing Your Own Travel Chapter
            </h3>
            <p className="text-sm sm:text-base text-luxury-linen/70 font-light max-w-lg mx-auto leading-relaxed">
              Every detail is bespoke. Speak directly to Alice Mercer or James Harrison to curate your private transport, accommodations, and guided experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/enquire" 
                className="w-full sm:w-auto bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate text-xs uppercase tracking-widest font-semibold px-8 py-3.5 transition-colors duration-200"
              >
                Enquire Online
              </Link>
              <Link 
                href="/specialists" 
                className="w-full sm:w-auto border border-luxury-linen/20 hover:border-luxury-gold hover:text-luxury-gold text-xs uppercase tracking-widest font-semibold px-8 py-3.5 transition-colors duration-200"
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
