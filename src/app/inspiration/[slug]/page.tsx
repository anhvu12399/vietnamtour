import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getPosts } from '@/sanity/client';
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

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.url) return null;
      return (
        <div className="my-16 relative w-full border border-luxury-gold/15 p-2 bg-luxury-moss/30 rounded-sm shadow-xl group clear-both">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-xs">
            <Image
              src={value.url}
              alt={value.alt || 'Article image'}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-[800ms] ease-out"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          {value.caption && (
            <span className="block text-[10px] text-luxury-linen/50 uppercase tracking-widest font-light mt-4 text-center">
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
        <div className="my-24 clear-both border-t border-b border-luxury-moss/50 py-16 bg-luxury-moss/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
            {images.map((item: any, idx: number) => (
              <div key={idx} className="relative aspect-[4/3] w-full overflow-hidden border border-luxury-gold/15 p-2 bg-luxury-moss rounded-sm group shadow-lg">
                <div className="relative w-full h-full overflow-hidden">
                  {item.url && (
                    <Image src={item.url} alt={item.caption || 'Gallery photo'} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  )}
                </div>
                {item.caption && (
                  <div className="absolute bottom-4 left-4 right-4 bg-luxury-slate/95 border border-luxury-gold/15 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-light block">{item.caption}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    },
    specialistTip: ({ value }: any) => {
      const avatar = value.customAvatar?.url || value.specialist?.image || '/images/specialist_alice.png';
      const name = value.customName || value.specialist?.name || 'Travel Specialist';
      const role = value.customRole || value.specialist?.role || 'Expert';
      return (
        <div className="my-10 float-none lg:float-right lg:w-[40%] lg:ml-12 p-8 bg-luxury-moss border-t-2 border-luxury-gold/40 shadow-2xl relative rounded-xs group z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-gold block mb-4">
            Specialist Insider Tip
          </span>
          <div className="space-y-4">
            <p className="text-sm text-luxury-linen/90 font-light leading-relaxed italic border-l border-luxury-gold/30 pl-4">
              &ldquo;{value.tip}&rdquo;
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0 border border-luxury-gold/30 group-hover:border-luxury-gold transition-colors">
                <Image src={avatar} alt={name} fill className="object-cover grayscale" />
              </div>
              <div>
                <span className="block text-xs font-serif text-luxury-gold">{name}</span>
                <span className="block text-[9px] uppercase tracking-wider text-luxury-linen/50 font-light">{role}</span>
              </div>
            </div>
          </div>
        </div>
      );
    },
    pullQuote: ({ value }: any) => {
      return (
        <blockquote className="clear-both border-y border-luxury-gold/20 py-12 my-16 text-center relative max-w-4xl mx-auto px-6">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl font-serif text-luxury-gold/20 leading-none select-none pointer-events-none">&ldquo;</span>
          <p className="font-serif text-2xl sm:text-4xl text-luxury-linen font-light italic leading-relaxed">
            {value.quote}
          </p>
          {value.author && (
            <span className="block text-[11px] uppercase tracking-[0.2em] text-luxury-gold mt-8 font-medium">
              — {value.author}
            </span>
          )}
        </blockquote>
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-base sm:text-lg font-light text-luxury-linen/85 leading-relaxed mb-6 max-w-3xl">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="clear-both font-serif text-3xl sm:text-5xl text-luxury-linen font-medium leading-tight mt-20 mb-10 pb-4 border-b border-luxury-gold/20 max-w-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="clear-both font-serif text-2xl sm:text-3xl text-luxury-gold font-light leading-tight mt-12 mb-6 max-w-3xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-luxury-gold pl-6 py-2 my-8 text-xl font-light italic text-luxury-linen/70 max-w-3xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-luxury-linen">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-luxury-gold/90">{children}</em>,
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const authorName = post.heroAuthor?.name;
  const authorRole = post.heroAuthor?.role;
  const authorAvatar = post.heroAuthor?.avatar;

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 pb-24 bg-luxury-slate text-luxury-linen overflow-hidden">

        {/* ═══════════════════════════════════════════
            EDITORIAL HERO BLOCK
        ═══════════════════════════════════════════ */}
        <section className="relative w-full border-b border-luxury-gold/15 py-12 lg:py-24 bg-luxury-moss/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column - Metadata & Title */}
              <div className="lg:col-span-6 space-y-8 pr-0 lg:pr-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                    <Link href="/inspiration" className="hover:text-luxury-linen transition-colors">Inspiration</Link>
                    <span>•</span>
                    <span>Travel Journal</span>
                  </div>
                  {post.publishedAt && (
                    <span className="block text-[11px] uppercase tracking-widest text-luxury-linen/50 font-light border-l border-luxury-gold/50 pl-3">
                      Published on {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-[64px] font-medium leading-[1.1] text-luxury-linen tracking-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-lg sm:text-xl font-light text-luxury-linen/75 italic leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Author info */}
                {authorName && (
                  <div className="flex items-center space-x-5 pt-4 border-t border-luxury-gold/15 inline-block">
                    {authorAvatar && (
                      <div className="w-12 h-12 rounded-full overflow-hidden relative border border-luxury-gold/30">
                        <Image src={authorAvatar} alt={authorName} fill className="object-cover grayscale" />
                      </div>
                    )}
                    <div>
                      <span className="block text-sm font-serif text-luxury-gold font-medium">Words by {authorName}</span>
                      {authorRole && (
                        <span className="block text-[10px] uppercase tracking-wider text-luxury-linen/40 font-light mt-0.5">{authorRole}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Hero image */}
              <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] border border-luxury-gold/25 p-3 bg-luxury-moss/50 shadow-2xl rounded-sm">
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
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b border-l border-luxury-gold/40 pointer-events-none" />
                  <div className="absolute -top-4 -right-4 w-20 h-20 border-t border-r border-luxury-gold/40 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            MAIN CONTENT (Portable Text)
        ═══════════════════════════════════════════ */}
        {post.content && post.content.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <div className="mx-auto lg:mx-0 w-full magazine-content">
              {/* Dropcap style is applied via global css or tailwind arbitrarily on the first paragraph */}
              <style dangerouslySetInnerHTML={{__html: `
                .magazine-content > p:first-of-type::first-letter {
                  float: left;
                  font-size: 5rem;
                  line-height: 0.8;
                  padding-right: 0.75rem;
                  padding-top: 0.5rem;
                  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
                  font-weight: 600;
                  color: #D4AF37; /* luxury-gold */
                }
              `}} />
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            BOTTOM CTA
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <div className="bg-luxury-moss/30 border border-luxury-gold/15 p-10 sm:p-16 rounded-sm text-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            {post.ctaLabel && (
              <div className="inline-block border border-luxury-gold/30 px-6 py-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-luxury-gold bg-luxury-slate">
                {post.ctaLabel}
              </div>
            )}

            {post.ctaHeading && (
              <h3 className="font-serif text-3xl sm:text-5xl text-luxury-linen font-medium leading-tight relative z-10">
                {post.ctaHeading}
              </h3>
            )}
            
            {post.ctaDescription && (
              <p className="text-base sm:text-lg text-luxury-linen/70 font-light max-w-2xl mx-auto leading-relaxed relative z-10">
                {post.ctaDescription}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 relative z-10">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-luxury-gold hover:bg-luxury-linen text-luxury-slate text-xs uppercase tracking-widest font-semibold px-10 py-4 transition-colors duration-300"
              >
                Enquire Online
              </Link>
              <Link
                href="/specialists"
                className="w-full sm:w-auto border border-luxury-linen/30 hover:border-luxury-gold hover:text-luxury-gold text-xs uppercase tracking-widest font-semibold px-10 py-4 transition-colors duration-300"
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
