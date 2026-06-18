import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getPosts } from '@/sanity/client';

export const revalidate = 60; // Revalidate every minute to show updates quickly

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

// Simple helper component to render basic PortableText blocks with marks (bold, italic, etc.)
function PortableTextContent({ content }: { content: any[] }) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="prose prose-invert prose-lg max-w-none space-y-8">
      {content.map((block: any, blockIdx: number) => {
        if (block._type !== 'block') {
          // Ignore non-block types for simplicity, or render placeholder if needed
          return null;
        }

        const isHeading = block.style && /^h[1-6]$/.test(block.style);
        const children = block.children || [];

        // Render children with marks (strong, em)
        const renderedText = children.map((child: any, childIdx: number) => {
          if (child._type !== 'span') return null;
          
          let element = <span key={childIdx}>{child.text}</span>;
          const marks = child.marks || [];

          if (marks.includes('strong')) {
            element = <strong key={childIdx} className="font-semibold text-luxury-linen">{child.text}</strong>;
          }
          if (marks.includes('em')) {
            element = <em key={childIdx} className="italic text-luxury-linen/90">{child.text}</em>;
          }

          return element;
        });

        // Determine tag based on style
        if (isHeading) {
          const HeadingTag = block.style as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
          
          const sizeClasses = {
            h1: 'text-3xl sm:text-4xl font-medium font-serif mt-12 mb-6 text-luxury-linen border-b border-luxury-moss/50 pb-2',
            h2: 'text-2xl sm:text-3xl font-medium font-serif mt-10 mb-5 text-luxury-gold',
            h3: 'text-xl sm:text-2xl font-medium font-serif mt-8 mb-4 text-luxury-linen',
            h4: 'text-lg sm:text-xl font-medium font-serif mt-6 mb-3 text-luxury-linen',
            h5: 'text-base font-semibold uppercase tracking-wider mt-6 mb-3 text-luxury-gold',
            h6: 'text-sm font-semibold uppercase tracking-wider mt-6 mb-3 text-luxury-linen',
          };

          return (
            <HeadingTag key={blockIdx} className={sizeClasses[HeadingTag] || sizeClasses.h2}>
              {renderedText}
            </HeadingTag>
          );
        }

        // Default: paragraph
        // Premium drop cap effect for the first letter of the first paragraph
        if (blockIdx === 0 && children[0]?.text) {
          const firstText = children[0].text;
          const firstChar = firstText.charAt(0);
          const restText = firstText.slice(1);
          
          return (
            <p key={blockIdx} className="text-base sm:text-lg font-light text-luxury-linen/85 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:text-luxury-gold first-letter:mt-1">
              {blockIdx === 0 ? (
                <>
                  {firstChar && <span className="sr-only">{firstChar}</span>}
                  {restText}
                  {renderedText.slice(1)}
                </>
              ) : (
                renderedText
              )}
            </p>
          );
        }

        return (
          <p key={blockIdx} className="text-base sm:text-lg font-light text-luxury-linen/80 leading-relaxed">
            {renderedText}
          </p>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 bg-luxury-slate text-luxury-linen">
        <article className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12 animate-fade-in">
          
          {/* Back Link & Date */}
          <div className="space-y-4">
            <Link 
              href="/inspiration" 
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:underline"
            >
              <span>← Back to Inspiration</span>
            </Link>
            
            {post.publishedAt && (
              <span className="block text-xs uppercase tracking-wider text-luxury-linen/50 font-light">
                Published on {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>

          {/* Heading & Excerpt */}
          <div className="space-y-6">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight text-luxury-linen">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg sm:text-xl font-light text-luxury-linen/75 italic border-l-2 border-luxury-gold pl-6 py-1 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="relative h-[40vh] sm:h-[55vh] min-h-[300px] w-full overflow-hidden rounded-sm bg-luxury-moss border border-luxury-moss/30 shadow-2xl">
              <Image 
                src={post.mainImage} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority 
              />
            </div>
          )}

          {/* Content Body */}
          <div className="max-w-3xl mx-auto pt-6">
            {post.content && post.content.length > 0 ? (
              <PortableTextContent content={post.content} />
            ) : (
              <p className="text-base text-luxury-linen/50 font-light italic">
                No article content available.
              </p>
            )}
          </div>

          {/* Editorial Footer CTA */}
          <div className="max-w-3xl mx-auto pt-16 border-t border-luxury-moss/50 mt-16">
            <div className="bg-luxury-moss/30 border border-luxury-moss p-8 rounded-sm text-center space-y-6">
              <h3 className="font-serif text-2xl text-luxury-linen font-medium">
                Craft Your Perfect Vietnam Journey
              </h3>
              <p className="text-sm text-luxury-linen/70 font-light max-w-lg mx-auto leading-relaxed">
                Our destination specialists can tailor a unique itinerary based on your interests, timing, and luxury travel style.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </div>

        </article>
      </main>

      <Footer />
    </>
  );
}
