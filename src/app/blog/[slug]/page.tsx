import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getBlogPostBySlugFromSanity, getBlogPostsFromSanity } from '@/sanity/client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { ArticleJsonLd } from '@/components/SeoJsonLd';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPostsFromSanity();
  return posts.map((post) => ({
    slug: post.slug?.current || '',
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlugFromSanity(slug);
  if (!post) return {};
  
  const title = post.seo?.metaTitle || `${post.title} | Vietnam Travel Blog`;
  const description = post.seo?.metaDescription || post.excerpt || `Read ${post.title} on the Vietnam Tour Travel Blog.`;
  
  return {
    title,
    description,
    ...(post.seo?.canonicalUrl && {
      alternates: {
        canonical: post.seo.canonicalUrl,
      },
    }),
    ...(post.seo?.noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: {
      title,
      description,
      ...(post.seo?.ogImage ? { images: [{ url: post.seo.ogImage }] } : post.featuredImage ? { images: [{ url: post.featuredImage }] } : {}),
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

const categoryColors: Record<string, string> = {
  'Travel Tips':          'bg-blue-50 text-blue-700 border border-blue-200',
  'Culture & History':    'bg-amber-50 text-amber-800 border border-amber-200',
  'Food & Drink':         'bg-orange-50 text-orange-800 border border-orange-200',
  'Adventure':            'bg-emerald-50 text-emerald-800 border border-emerald-200',
  'Planning & Logistics': 'bg-teal-50 text-teal-800 border border-teal-200',
  'News & Updates':       'bg-rose-50 text-rose-800 border border-rose-200',
};

function getCategoryColor(cat: string) {
  return categoryColors[cat] || 'bg-paper text-ink border-line';
}

// ─── PortableText Custom Components ───────────────────────────────────────────
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.url) return null;
      return (
        <figure className="my-10 lg:my-14 -mx-6 lg:mx-0">
          <div className="relative w-full aspect-[16/9] lg:rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={value.url}
              alt={value.alt || 'Article image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-white/50 mt-4 font-light italic px-6">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    gallery: ({ value }) => {
      if (!value?.images || value.images.length === 0) return null;
      return (
        <div className="my-12 lg:my-16 -mx-6 lg:mx-0">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 lg:px-0 hide-scrollbar">
            {value.images.map((img: any, idx: number) => (
              <figure key={idx} className="relative w-[85vw] sm:w-[60vw] lg:w-full flex-none snap-center lg:flex-1 aspect-[4/5] lg:rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={img.url}
                  alt={img.alt || `Gallery image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <figcaption className="p-6 w-full text-center text-sm text-white/80 font-light drop-shadow-md">
                      {img.caption}
                    </figcaption>
                  </div>
                )}
              </figure>
            ))}
          </div>
        </div>
      );
    },
    specialistTip: ({ value }) => {
      const tipText = value.tip;
      const specialist = value.specialist;
      if (!tipText) return null;
      
      return (
        <div className="my-10 p-6 lg:p-8 rounded-2xl bg-white border border-line border-t-2 border-t-[#9A4B33] shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-8 -mt-8" />
          
          <div className="flex items-start gap-4 lg:gap-6 relative z-10">
            {specialist?.image ? (
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-line">
                <Image src={specialist.image} alt={specialist.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#343434]/10 flex items-center justify-center flex-shrink-0 border-2 border-line">
                <span className="text-xl lg:text-2xl text-gold">💡</span>
              </div>
            )}
            
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-copper font-bold mb-2">
                Specialist Insight
              </h4>
              <div className="text-ink font-playfair text-lg lg:text-xl leading-relaxed italic mb-4">
                &ldquo;{tipText}&rdquo;
              </div>
              {specialist && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-gold/50" />
                  <span className="text-xs text-ink/60 tracking-wider uppercase font-medium">
                    {specialist.name} {specialist.role ? `• ${specialist.role}` : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    },
    // E-E-A-T: "Only locals know" insider detail callout
    insiderTip: ({ value }) => {
      if (!value?.tip) return null;
      return (
        <div className="my-10 p-5 lg:p-7 border-l-4 border-gold bg-white border-y border-r border-line rounded-r-xl relative overflow-hidden shadow-sm">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <span className="text-2xl">📍</span>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-[0.25em] text-copper font-bold">
                Local Insider — Only Locals Know This
              </div>
              <p className="text-ink/85 text-sm lg:text-base leading-relaxed font-light">
                {value.tip}
              </p>
              {value.source && (
                <p className="text-[10px] text-ink/50 uppercase tracking-wider font-medium">
                  — {value.source}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    },
    pullQuote: ({ value }) => {
      if (!value?.quote) return null;
      return (
        <blockquote className="my-12 lg:my-16 pl-6 lg:pl-10 border-l-2 border-gold relative">
          <span className="absolute -left-2 -top-4 text-6xl text-copper/20 font-serif leading-none">&ldquo;</span>
          <p className="text-2xl lg:text-3xl font-playfair text-ink leading-snug italic relative z-10">
            {value.quote}
          </p>
          {value.source && (
            <footer className="mt-6 text-xs tracking-wider uppercase text-ink/60 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gold/40" />
              {value.source}
            </footer>
          )}
        </blockquote>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="mb-6 lg:mb-8 text-ink/85 leading-relaxed text-base lg:text-lg font-light">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl lg:text-3xl font-playfair text-ink mt-14 mb-6 leading-tight font-medium">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl lg:text-2xl font-playfair text-ink mt-10 mb-4 leading-snug font-medium">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg text-copper font-medium uppercase tracking-wider mt-8 mb-4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-2 border-gold/50 text-xl font-playfair italic text-ink/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-copper">{children}</strong>,
    em: ({ children }) => <em className="italic text-ink">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-copper hover:text-ink transition-colors border-b border-copper/40 hover:border-[#343434] pb-0.5"
        >
          {children}
        </a>
      );
    },
  },
};

// Helper to get fallback background image based on slug or title
function getFallbackImage(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('sapa')) return '/images/dest_sapa_highland.png';
  if (s.includes('halong') || s.includes('lan-ha') || s.includes('bay')) return '/images/dest_halong_limestone.png';
  if (s.includes('hoi-an') || s.includes('hoian')) return '/images/dest_hoian_lanterns.png';
  if (s.includes('mekong')) return '/images/dest_mekong_canal.png';
  if (s.includes('phu-quoc') || s.includes('phuquoc')) return '/images/dest_phuquoc_beach.png';
  if (s.includes('da-nang') || s.includes('danang')) return '/images/dest_danang_beach_bridge.png';
  if (s.includes('da-lat') || s.includes('dalat')) return '/images/dest_dalat_pine_villas.png';
  if (s.includes('phong-nha') || s.includes('phongnha')) return '/images/dest_phongnha_cave.png';
  return '/images/dest_halong_limestone.png'; // default fallback banner
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlugFromSanity(slug),
    getBlogPostsFromSanity(),
  ]);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  // E-E-A-T: Last updated displayed as current month/year of build
  const lastUpdated = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  // Author social links (fallback to defaults matching guide names Tuấn/Linh/Mai)
  const authorSocials = {
    facebook: post.author?.facebook || 'https://facebook.com/vietnamtours',
    instagram: post.author?.instagram || 'https://instagram.com/vietnamtours',
  };

  const featuredImage = post.featuredImage || getFallbackImage(slug);

  const relatedPosts = post.relatedPosts?.length > 0
    ? post.relatedPosts
    : allPosts.filter((p) => p.slug?.current !== slug).slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt || post.seo?.metaDescription || post.title}
        url={`https://www.vietnamtours.co.uk/blog/${post.slug?.current}`}
        image={post.seo?.ogImage || featuredImage || 'https://www.vietnamtours.co.uk/images/things_halong_kayaking.png'}
        publishedAt={post.publishedAt}
        author={post.author?.name || 'Vietnam Tour Specialists'}
        section={post.category || 'Travel'}
      />

      <Navbar />

      <main className="bg-paper text-ink min-h-screen">
        {/* ── Hero Section ── */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden min-h-[60vh] bg-ink">
          {featuredImage && (
            <>
              <Image
                src={featuredImage}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover opacity-40 brightness-75 mix-blend-overlay"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#161C1A]/90 via-[#161C1A]/60 to-[#161C1A]" />
            </>
          )}

          <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
              {post.category && (
                <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 border rounded-sm backdrop-blur-md ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              )}
              {post.tags?.slice(0,2).map((tag: string) => (
                <span key={tag} className="text-[10px] uppercase tracking-wider text-white/50 border border-line px-3 py-1 rounded-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-playfair font-normal text-white leading-[1.1] mb-8">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-12 pt-12 border-t border-line w-full lg:w-3/4 mx-auto">
              {post.author && (
                <div className="flex items-center gap-4">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="rounded-full border border-line"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-line" />
                  )}
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{post.author.name}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gold">{post.author.role}</div>
                  </div>
                </div>
              )}
              
              <div className="hidden sm:block w-[1px] h-10 bg-white/10" />

              <div className="flex items-center gap-6 text-xs text-white/50 tracking-wider uppercase font-medium">
                {formattedDate && (
                  <div className="flex flex-col text-left gap-1">
                    <span className="text-[10px] text-white/30">Published</span>
                    <time dateTime={post.publishedAt} className="text-white/80">{formattedDate}</time>
                  </div>
                )}
                <div className="flex flex-col text-left gap-1">
                  <span className="text-[10px] text-white/30">Reading Time</span>
                  <span className="text-white/80">{readingTime} MIN READ</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar placeholder */}
        <div id="details" className="bg-paper border-b border-line">
          <CategoriesTabBar activeTab="guides" />
        </div>

        {/* ── Content Body ── */}
        <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-4xl mx-auto">

          {/* ── E-E-A-T: Last Updated + Disclosure Banner ── */}
          <div className="mb-10 space-y-3">
            {/* Last Updated */}
            <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-widest text-gold">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Information last verified and updated: {lastUpdated}</span>
            </div>
            {/* Affiliate Disclosure */}
            <div className="bg-white border border-line rounded-sm px-5 py-3.5 text-[11px] text-ink/80 leading-relaxed font-light">
              <strong className="text-ink font-semibold">Disclosure:</strong> This article may contain affiliate links to hotels, tours, or booking platforms. If you book through our links, we may earn a small commission at no extra cost to you. All opinions are based on our team&apos;s real, first-hand experiences in Vietnam.
            </div>
          </div>

          {post.excerpt && (
            <div className="mb-16">
              <p className="text-2xl lg:text-3xl font-playfair text-ink leading-relaxed italic text-center">
                &ldquo;{post.excerpt}&rdquo;
              </p>
              <div className="w-12 h-[1px] bg-gold/50 mx-auto mt-10" />
            </div>
          )}

          <div className="prose prose-slate prose-lg lg:prose-xl max-w-none prose-headings:text-ink prose-p:text-ink/80 prose-li:text-ink/80">
            {post.content ? (
              <PortableText value={post.content} components={portableTextComponents} />
            ) : (
              <p className="text-center text-white/50 py-20">Content coming soon...</p>
            )}
          </div>

          {/* ── E-E-A-T: Author Bio Card ── */}
          <div className="mt-20 pt-10 border-t border-white/10">
            <div className="bg-white border border-line rounded-sm p-6 lg:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-sm">
              {/* Avatar */}
              <div className="shrink-0">
                {post.author?.avatar ? (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold/40">
                    <Image src={post.author.avatar} alt={post.author.name || 'Author'} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center">
                    <span className="text-3xl">✍️</span>
                  </div>
                )}
              </div>

              {/* Bio Text */}
              <div className="flex-1 space-y-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-copper font-bold mb-1">Written by</div>
                  <h3 className="text-ink font-playfair text-xl font-normal">{post.author?.name || 'Vietnam Tours Team'}</h3>
                  <p className="text-gold text-xs uppercase tracking-wider font-medium mt-0.5">
                    {post.author?.role || 'Vietnam Travel Specialist · Vietnam Tours, Ho Chi Minh City'}
                  </p>
                </div>
                <p className="text-ink/70 text-sm leading-relaxed font-light">
                  {post.author?.bio || `A member of the Vietnam Tours editorial team based in Ho Chi Minh City. Every destination, hotel, and experience mentioned in this article has been personally visited and verified by our team of local guides. We do not write about places we haven't been to.`}
                </p>
                {/* Social links */}
                <div className="flex items-center gap-4 pt-1">
                  <a href={authorSocials.facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-ink/50 hover:text-copper transition-colors uppercase tracking-wider font-semibold">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                  <a href={authorSocials.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-ink/50 hover:text-copper transition-colors uppercase tracking-wider font-semibold">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Instagram
                  </a>
                  <a href="/about" className="flex items-center gap-1.5 text-[11px] text-ink/50 hover:text-copper transition-colors uppercase tracking-wider font-semibold">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    About Us
                  </a>
                </div>
              </div>
            </div>

            {/* ── E-E-A-T: Trust Footer ── */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-line rounded-sm p-4 text-center space-y-1 shadow-sm">
                <div className="text-gold text-lg">✓</div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink">Field Verified</div>
                <div className="text-[10px] text-ink/60 leading-relaxed">All destinations visited by our local guides within the last 12 months</div>
              </div>
              <div className="bg-white border border-line rounded-sm p-4 text-center space-y-1 shadow-sm">
                <div className="text-gold text-lg">📍</div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink">Local Expertise</div>
                <div className="text-[10px] text-ink/60 leading-relaxed">Written by specialists based in Vietnam since 2012</div>
              </div>
              <div className="bg-white border border-line rounded-sm p-4 text-center space-y-1 shadow-sm">
                <div className="text-gold text-lg">🔄</div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink">Regularly Updated</div>
                <div className="text-[10px] text-ink/60 leading-relaxed">Prices, hours and entry requirements reviewed every quarter</div>
              </div>
            </div>
          </div>

        </section>

        {/* ── Related Posts & CTA ── */}
        {(relatedPosts.length > 0 || post.ctaHeading) && (
          <section className="bg-[#f4efe6] py-24 border-t border-line">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              {relatedPosts.length > 0 && (
                <div className="mb-24">
                  <h2 className="text-sm tracking-[0.2em] text-[#ba996a] font-bold uppercase mb-12 flex items-center gap-4">
                    <span>Keep Reading</span>
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-[#ba996a]/50 to-transparent"></span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedPosts.map((related: any) => {
                      const relatedImg = related.featuredImage || getFallbackImage(related.slug?.current || '');
                      return (
                        <Link key={related._id} href={`/blog/${related.slug?.current || ''}`} className="group block">
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 border border-line">
                            {relatedImg ? (
                              <Image src={relatedImg} alt={related.imageAlt || related.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                              <div className="absolute inset-0 bg-[#343434]/5" />
                            )}
                          </div>
                          <div className="text-xs text-[#ba996a] tracking-wider uppercase mb-3">{related.category || 'Travel Guide'}</div>
                          <h3 className="text-xl font-playfair text-ink group-hover:text-copper transition-colors">{related.title}</h3>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {post.ctaHeading && (
                <div className="max-w-4xl mx-auto text-center bg-white p-12 lg:p-20 rounded-2xl border border-line relative overflow-hidden shadow-md">
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #9A4B33 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  <div className="relative z-10">
                    <span className="text-xs uppercase tracking-[0.3em] text-copper font-bold mb-4 block">DESIGN YOUR JOURNEY</span>
                    <h2 className="text-3xl lg:text-5xl font-playfair text-ink mb-6 leading-tight">{post.ctaHeading}</h2>
                    <p className="text-ink/70 mb-10 max-w-2xl mx-auto leading-relaxed">{post.ctaBody || 'Speak with our specialists to craft a bespoke itinerary tailored to your preferences.'}</p>
                    <Link href="/enquire" className="inline-flex items-center justify-center px-8 py-4 bg-[#9A4B33] text-white hover:bg-slate-900 transition-colors uppercase tracking-wider text-sm font-bold shadow-sm">
                      Enquire Now
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
