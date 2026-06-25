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
  'Travel Tips':          'bg-blue-900/30 text-blue-300/90 border-blue-700/30',
  'Culture & History':    'bg-amber-900/30 text-luxury-gold border-amber-700/30',
  'Food & Drink':         'bg-orange-900/30 text-orange-300/90 border-orange-700/30',
  'Adventure':            'bg-green-900/30 text-green-300/90 border-green-700/30',
  'Planning & Logistics': 'bg-teal-900/30 text-teal-300/90 border-teal-700/30',
  'News & Updates':       'bg-pink-900/30 text-pink-300/90 border-pink-700/30',
};

function getCategoryColor(cat: string) {
  return categoryColors[cat] || 'bg-luxury-slate text-luxury-linen border-luxury-gold/30';
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
        <div className="my-10 p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-[#1c2622] to-[#141b18] border border-luxury-gold/20 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-bl-full -mr-8 -mt-8" />
          
          <div className="flex items-start gap-4 lg:gap-6 relative z-10">
            {specialist?.image ? (
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-luxury-gold/30">
                <Image src={specialist.image} alt={specialist.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border-2 border-luxury-gold/30">
                <span className="text-xl lg:text-2xl text-luxury-gold">💡</span>
              </div>
            )}
            
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-bold mb-2">
                Specialist Insight
              </h4>
              <div className="text-white/80 font-playfair text-lg lg:text-xl leading-relaxed italic mb-4">
                "{tipText}"
              </div>
              {specialist && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-luxury-gold/50" />
                  <span className="text-xs text-white/50 tracking-wider uppercase font-medium">
                    {specialist.name} {specialist.role ? `• ${specialist.role}` : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    },
    pullQuote: ({ value }) => {
      if (!value?.quote) return null;
      return (
        <blockquote className="my-12 lg:my-16 pl-6 lg:pl-10 border-l-2 border-luxury-gold relative">
          <span className="absolute -left-2 -top-4 text-6xl text-luxury-gold/20 font-serif leading-none">"</span>
          <p className="text-2xl lg:text-3xl font-playfair text-white leading-snug italic relative z-10">
            {value.quote}
          </p>
          {value.source && (
            <footer className="mt-6 text-xs tracking-wider uppercase text-white/50 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-luxury-gold/40" />
              {value.source}
            </footer>
          )}
        </blockquote>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="mb-6 lg:mb-8 text-white/70 leading-relaxed text-base lg:text-lg font-light">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl lg:text-3xl font-playfair text-white mt-14 mb-6 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl lg:text-2xl font-playfair text-white mt-10 mb-4 leading-snug">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg text-luxury-gold font-medium uppercase tracking-wider mt-8 mb-4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-2 border-luxury-gold/50 text-xl font-playfair italic text-white/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-white/90">{children}</strong>,
    em: ({ children }) => <em className="italic text-white/80">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-luxury-gold hover:text-white transition-colors border-b border-luxury-gold/30 hover:border-white/50 pb-0.5"
        >
          {children}
        </a>
      );
    },
  },
};

// ─── Main Page Component ──────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlugFromSanity(slug);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt || post.seo?.metaDescription || post.title}
        url={`https://www.vietnamtours.co.uk/blog/${post.slug?.current}`}
        image={post.seo?.ogImage || post.featuredImage || 'https://www.vietnamtours.co.uk/images/things_halong_kayaking.png'}
        publishedAt={post.publishedAt}
        author={post.author?.name || 'Vietnam Tour Specialists'}
        section={post.category || 'Travel'}
      />

      <Navbar />

      <main className="bg-luxury-slate min-h-screen">
        {/* ── Hero Section ── */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden min-h-[60vh]">
          {post.featuredImage && (
            <>
              <Image
                src={post.featuredImage}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover opacity-40 brightness-75 mix-blend-overlay"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#121816]/90 via-[#121816]/60 to-[#121816]" />
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
                <span key={tag} className="text-[10px] uppercase tracking-wider text-white/50 border border-white/10 px-3 py-1 rounded-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-playfair font-normal text-white leading-[1.1] mb-8">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-12 pt-12 border-t border-white/10 w-full lg:w-3/4 mx-auto">
              {post.author && (
                <div className="flex items-center gap-4">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="rounded-full border border-luxury-gold/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-luxury-gold/30" />
                  )}
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{post.author.name}</div>
                    <div className="text-[10px] uppercase tracking-wider text-luxury-gold">{post.author.role}</div>
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
        <div id="details" className="bg-[#18201d] border-b border-white/5">
          <CategoriesTabBar activeTab="guides" />
        </div>

        {/* ── Content Body ── */}
        <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-4xl mx-auto">
          {post.excerpt && (
            <div className="mb-16">
              <p className="text-2xl lg:text-3xl font-playfair text-white/90 leading-relaxed italic text-center">
                "{post.excerpt}"
              </p>
              <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-10" />
            </div>
          )}

          <div className="prose prose-invert prose-lg lg:prose-xl max-w-none">
            {post.content ? (
              <PortableText value={post.content} components={portableTextComponents} />
            ) : (
              <p className="text-center text-white/50 py-20">Content coming soon...</p>
            )}
          </div>
        </section>

        {/* ── Related Posts & CTA ── */}
        {(post.relatedPosts?.length > 0 || post.ctaHeading) && (
          <section className="bg-[#18201d] py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              {post.relatedPosts?.length > 0 && (
                <div className="mb-24">
                  <h2 className="text-sm tracking-[0.2em] text-luxury-gold font-bold uppercase mb-12 flex items-center gap-4">
                    <span>Keep Reading</span>
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-luxury-gold/50 to-transparent"></span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {post.relatedPosts.map((related: any) => (
                      <Link key={related._id} href={`/blog/${related.slug.current}`} className="group block">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 border border-white/5">
                          {related.featuredImage ? (
                            <Image src={related.featuredImage} alt={related.imageAlt || related.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="absolute inset-0 bg-white/5" />
                          )}
                        </div>
                        <div className="text-xs text-luxury-gold tracking-wider uppercase mb-3">{related.category}</div>
                        <h3 className="text-xl font-playfair text-white group-hover:text-luxury-gold transition-colors">{related.title}</h3>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {post.ctaHeading && (
                <div className="max-w-4xl mx-auto text-center bg-luxury-slate p-12 lg:p-20 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  <div className="relative z-10">
                    <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-bold mb-4 block">DESIGN YOUR JOURNEY</span>
                    <h2 className="text-3xl lg:text-5xl font-playfair text-white mb-6 leading-tight">{post.ctaHeading}</h2>
                    <p className="text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">{post.ctaBody || 'Speak with our specialists to craft a bespoke itinerary tailored to your preferences.'}</p>
                    <Link href="/enquire" className="inline-flex items-center justify-center px-8 py-4 bg-luxury-gold text-[#121816] hover:bg-white transition-colors uppercase tracking-wider text-sm font-bold">
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
