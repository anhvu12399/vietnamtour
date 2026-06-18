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

const getBlockText = (block: any): string => {
  return block.children?.map((c: any) => c.text).join('') || '';
};

// Render a single PortableText block (shared between intro and chapter body)
function renderBlock(block: any, blockIdx: number, isFirstIntroBlock: boolean = false) {
  // Image block
  if (block._type === 'image') {
    return (
      <div key={blockIdx} className="my-8 relative aspect-[4/3] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss rounded-sm shadow-lg group">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={block.url}
            alt={block.alt || 'Article image'}
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

  // Specialist tip block
  if (block._type === 'specialistTip') {
    const avatar = block.customAvatar?.url || block.specialist?.image || '/images/specialist_alice.png';
    const name = block.customName || block.specialist?.name || 'Travel Specialist';
    const role = block.customRole || block.specialist?.role || 'Expert';
    return (
      <div key={blockIdx} className="my-8 p-6 bg-luxury-moss border-t-2 border-luxury-gold/30 space-y-4 rounded-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 border border-luxury-gold/15">
            <Image src={avatar} alt={name} fill className="object-cover grayscale" />
          </div>
          <div>
            <span className="block text-[11px] font-serif text-luxury-linen font-medium">{name}</span>
            <span className="block text-[8px] uppercase tracking-wider text-luxury-linen/40 font-light">{role}</span>
          </div>
        </div>
        <p className="text-xs text-luxury-gold font-light leading-relaxed italic">
          &ldquo;{block.tip}&rdquo;
        </p>
      </div>
    );
  }

  // Pull quote block
  if (block._type === 'pullQuote') {
    return (
      <blockquote
        key={blockIdx}
        className="border-y border-luxury-gold/20 py-8 my-10 text-center relative max-w-2xl mx-auto"
      >
        <span className="text-4xl font-serif text-luxury-gold/30 block leading-none select-none pointer-events-none mb-1">&ldquo;</span>
        <p className="font-serif text-xl sm:text-2xl text-luxury-linen font-light italic leading-relaxed">
          {block.quote}
        </p>
        {block.author && (
          <span className="block text-[10px] uppercase tracking-widest text-luxury-gold mt-4 font-semibold">
            — {block.author}
          </span>
        )}
      </blockquote>
    );
  }

  // Regular text block — drop cap for first intro paragraph
  const text = getBlockText(block);
  if (isFirstIntroBlock && text) {
    return (
      <p key={blockIdx} className="text-base sm:text-lg font-light text-luxury-linen/85 leading-relaxed first-letter:text-6xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:text-luxury-gold first-letter:mt-1">
        {renderSpans(block.children || [])}
      </p>
    );
  }

  return (
    <p key={blockIdx} className="text-base sm:text-lg font-light text-luxury-linen/80 leading-relaxed">
      {renderSpans(block.children || [])}
    </p>
  );
}

// Roman numeral helper
const getRomanNumeral = (num: number) => {
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  return numerals[num] || String(num + 1);
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Resolve hero author info
  const authorName = post.heroAuthor?.name;
  const authorRole = post.heroAuthor?.role;
  const authorAvatar = post.heroAuthor?.avatar;

  // Resolve sidebar tip specialist info
  const tipName = post.sidebarTip?.specialist?.name || post.sidebarTip?.manualName;
  const tipRole = post.sidebarTip?.specialist?.role || post.sidebarTip?.manualRole;
  const tipAvatar = post.sidebarTip?.specialist?.image || post.sidebarTip?.manualAvatar;

  const chapters = post.chapters || [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 pb-24 bg-luxury-slate text-luxury-linen overflow-hidden">

        {/* ═══════════════════════════════════════════
            EDITORIAL HERO BLOCK
        ═══════════════════════════════════════════ */}
        <section className="relative w-full border-b border-luxury-gold/15 py-12 lg:py-20 bg-luxury-moss/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column - Metadata & Title */}
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

                {/* Author info — all from Sanity */}
                {authorName && (
                  <div className="flex items-center space-x-4 pt-4">
                    {authorAvatar && (
                      <div className="w-10 h-10 rounded-full overflow-hidden relative border border-luxury-gold/30">
                        <Image src={authorAvatar} alt={authorName} fill className="object-cover grayscale" />
                      </div>
                    )}
                    <div>
                      <span className="block text-xs font-serif text-luxury-gold font-medium">Curated by {authorName}</span>
                      {authorRole && (
                        <span className="block text-[9px] uppercase tracking-wider text-luxury-linen/40 font-light">{authorRole}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Hero image */}
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
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-luxury-gold/30 pointer-events-none" />
                  <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-luxury-gold/30 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            INTRO SECTION + SIDEBAR
        ═══════════════════════════════════════════ */}
        {(post.introContent || post.factSheet || post.sidebarTip) && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-b border-luxury-moss/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Intro text */}
              <div className="lg:col-span-7 space-y-6">
                {post.introContent?.map((block: any, idx: number) =>
                  renderBlock(block, idx, idx === 0)
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5 space-y-8">

                {/* Fact Sheet */}
                {post.factSheet && (
                  <div className="bg-luxury-moss border border-luxury-gold/20 p-8 shadow-xl relative rounded-xs">
                    <span className="absolute -top-3 left-6 bg-luxury-slate px-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                      JOURNEY FACT SHEET
                    </span>
                    <div className="divide-y divide-luxury-gold/10 pt-4 space-y-4">
                      {post.factSheet.pacing && (
                        <div className="flex justify-between items-center text-xs pb-4">
                          <span className="uppercase tracking-widest text-luxury-linen/50 font-light">Pacing</span>
                          <span className="font-serif text-luxury-linen font-medium">{post.factSheet.pacing}</span>
                        </div>
                      )}
                      {post.factSheet.bestMonths && (
                        <div className="flex justify-between items-center text-xs pt-4 pb-4">
                          <span className="uppercase tracking-widest text-luxury-linen/50 font-light">Best Months</span>
                          <span className="font-serif text-luxury-gold font-medium">{post.factSheet.bestMonths}</span>
                        </div>
                      )}
                      {post.factSheet.duration && (
                        <div className="flex justify-between items-center text-xs pt-4 pb-4">
                          <span className="uppercase tracking-widest text-luxury-linen/50 font-light">Duration</span>
                          <span className="font-serif text-luxury-linen font-medium">{post.factSheet.duration}</span>
                        </div>
                      )}
                      {post.factSheet.destinations && (
                        <div className="flex justify-between items-start text-xs pt-4 pb-4">
                          <span className="uppercase tracking-widest text-luxury-linen/50 font-light mt-0.5">Destinations</span>
                          <span className="font-serif text-luxury-linen font-medium text-right max-w-[200px]">
                            {post.factSheet.destinations}
                          </span>
                        </div>
                      )}
                      {post.factSheet.operatorType && (
                        <div className="flex justify-between items-center text-xs pt-4">
                          <span className="uppercase tracking-widest text-luxury-linen/50 font-light">Operator Type</span>
                          <span className="font-serif text-luxury-gold font-medium uppercase tracking-wider text-[10px]">
                            {post.factSheet.operatorType}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Sidebar Specialist Tip */}
                {post.sidebarTip?.tip && (
                  <div className="border border-luxury-gold/10 p-6 bg-luxury-slate relative rounded-xs">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-gold block mb-3">
                      SPECIALIST INSIDER TIP
                    </span>
                    <div className="flex items-start space-x-4">
                      {tipAvatar && (
                        <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0 border border-luxury-gold/20">
                          <Image
                            src={tipAvatar}
                            alt={tipName || 'Specialist'}
                            fill
                            className="object-cover grayscale"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <p className="text-xs text-luxury-linen/80 font-light leading-relaxed italic">
                          &ldquo;{post.sidebarTip.tip}&rdquo;
                        </p>
                        {tipName && (
                          <span className="block text-[10px] font-serif text-luxury-gold pt-2">
                            — {tipName}{tipRole ? `, ${tipRole}` : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            CHAPTERS (Alternating image-text layouts)
            All data from Sanity — no hardcoded text
        ═══════════════════════════════════════════ */}
        {chapters.length > 0 && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">
              {chapters.map((chapter, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
                  >

                    {/* Image Column */}
                    <div className={`lg:col-span-5 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      {chapter.image ? (
                        <>
                          <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[3/4] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss/30 rounded-sm group shadow-xl">
                            <div className="relative w-full h-full overflow-hidden">
                              <Image
                                src={chapter.image}
                                alt={chapter.heading}
                                fill
                                className="object-cover group-hover:scale-[1.03] transition-transform duration-[800ms] ease-out"
                                sizes="(max-width: 1024px) 100vw, 450px"
                              />
                            </div>
                          </div>
                          {chapter.imageCaption && (
                            <span className="block text-[10px] text-luxury-linen/50 uppercase tracking-widest font-light text-center sm:text-left">
                              {chapter.imageCaption}
                            </span>
                          )}
                        </>
                      ) : (
                        <div className="relative aspect-[4/3] lg:aspect-[3/4] w-full bg-luxury-moss/30 rounded-sm border border-luxury-gold/15" />
                      )}
                    </div>

                    {/* Text Column */}
                    <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>

                      {/* Chapter Header */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
                          CHAPTER {getRomanNumeral(idx)}
                        </span>
                        <h2 className="font-serif text-2xl sm:text-4xl text-luxury-linen font-medium leading-tight">
                          {chapter.heading}
                        </h2>
                        <div className="h-[1px] w-16 bg-luxury-gold/40 mt-3" />
                      </div>

                      {/* Chapter Body */}
                      <div className="space-y-6">
                        {chapter.body?.map((block: any, bIdx: number) =>
                          renderBlock(block, bIdx)
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            PHOTO ESSAY / GALLERY SECTION
            Heading, title, description from Sanity
        ═══════════════════════════════════════════ */}
        {post.photoEssay && post.photoEssay.length > 0 && (
          <section className="py-20 bg-luxury-moss/10 border-t border-b border-luxury-moss/50 my-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
              <div className="text-center space-y-3 max-w-xl mx-auto">
                {post.photoEssayHeading && (
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">{post.photoEssayHeading}</span>
                )}
                {post.photoEssayTitle && (
                  <h3 className="font-serif text-2xl sm:text-3xl text-luxury-linen font-medium">{post.photoEssayTitle}</h3>
                )}
                {post.photoEssayDescription && (
                  <p className="text-xs text-luxury-linen/60 font-light">{post.photoEssayDescription}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {post.photoEssay.map((item, idx) => (
                  <div key={idx} className="relative aspect-[4/3] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss rounded-sm group">
                    <div className="relative w-full h-full overflow-hidden">
                      {item.url && (
                        <Image src={item.url} alt={item.title || 'Gallery photo'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                    </div>
                    {(item.title || item.caption) && (
                      <div className="absolute bottom-4 left-4 right-4 bg-luxury-slate/90 border border-luxury-gold/15 p-3 text-center">
                        {item.title && <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block">{item.title}</span>}
                        {item.caption && <span className="text-[9px] text-luxury-linen/70 font-light block">{item.caption}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            BOTTOM CTA — all text from Sanity
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 pt-12">
          <div className="bg-luxury-moss/30 border border-luxury-gold/15 p-8 sm:p-12 rounded-sm text-center space-y-6 shadow-2xl relative">
            {post.ctaLabel && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-luxury-slate border-l border-r border-luxury-gold/30 px-6 text-[10px] uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                {post.ctaLabel}
              </div>
            )}

            {post.ctaHeading && (
              <h3 className="font-serif text-2xl sm:text-4xl text-luxury-linen font-medium leading-tight">
                {post.ctaHeading}
              </h3>
            )}
            {post.ctaDescription && (
              <p className="text-sm sm:text-base text-luxury-linen/70 font-light max-w-lg mx-auto leading-relaxed">
                {post.ctaDescription}
              </p>
            )}
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
