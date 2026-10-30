import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import type { RichTextBlock } from '@/sanity/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/SeoJsonLd';
import { EditorialEvidence } from '@/components/EditorialEvidence';
import { getBlogPostBySlugFromSanity, getBlogPostsFromSanity, getPostBySlug } from '@/sanity/client';
import type { EditorialEvidence as Evidence, SeoFields } from '@/sanity/types';
import { absoluteUrl, canonicalUrl, enquiryUrl } from '@/lib/seo';

export const revalidate = 60;
interface PageProps { params: Promise<{ slug: string }> }
interface BlogArticle {
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: string;
  publishedAt?: string;
  content?: RichTextBlock[];
  editorial?: Evidence;
  author?: { name: string; slug?: { current: string } };
  seo?: SeoFields;
}

async function getArticle(slug: string): Promise<BlogArticle> {
  const [guide, article]: [Awaited<ReturnType<typeof getPostBySlug>>, BlogArticle | null] = await Promise.all([
    getPostBySlug(slug), getBlogPostBySlugFromSanity(slug),
  ]);
  // Empty imported mirrors are consolidated only when a populated destination exists.
  if (!article?.content?.length && guide?.content?.length) permanentRedirect(`/travel-guides/${slug}`);
  if (!article?.content?.length) notFound();
  return article;
}

export async function generateStaticParams() {
  const posts: { slug?: { current?: string } }[] = await getBlogPostsFromSanity();
  return posts.filter((p) => p.slug?.current).map((p) => ({ slug: p.slug!.current! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticle(slug);
  const url = canonicalUrl(`/blog/${slug}`);
  const description = post.seo?.metaDescription || post.excerpt || post.title;
  return {
    title: post.title, description, alternates: { canonical: url },
    robots: { index: !post.seo?.noIndex, follow: true },
    openGraph: { type: 'article', title: post.title, description, url, ...(post.featuredImage && { images: [absoluteUrl(post.featuredImage)] }) },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getArticle(slug);
  const url = canonicalUrl(`/blog/${slug}`);
  const author = post.editorial?.author || post.author;
  return (
    <>
      <ArticleJsonLd title={post.title} description={post.excerpt || post.title} url={url}
        image={absoluteUrl(post.featuredImage || '/images/dest_halong_limestone.png')}
        publishedAt={post.publishedAt} author={author?.name}
        authorType={author ? 'Person' : 'Organization'}
        authorUrl={author?.slug?.current ? absoluteUrl(`/specialists/${author.slug.current}`) : undefined} />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: absoluteUrl('/') }, { name: 'Blog', url: absoluteUrl('/blog') }, { name: post.title, url }]} />
      <Navbar />
      <main className="min-h-screen bg-paper px-6 pb-24 pt-36 text-ink lg:px-12">
        <article className="mx-auto max-w-4xl space-y-8">
          <h1 className="font-serif text-4xl leading-tight lg:text-6xl">{post.title}</h1>
          {post.excerpt && <p className="text-xl leading-relaxed text-ink-soft">{post.excerpt}</p>}
          <EditorialEvidence evidence={post.editorial} />
          {post.featuredImage && <Image src={post.featuredImage} width={1200} height={630} alt={post.title} priority className="h-auto w-full" />}
          <div className="space-y-6 leading-relaxed">
            <PortableText value={post.content || []} components={{
              types: {
                image: ({ value }: { value: { url?: string; alt?: string; caption?: string } }) => value.url ? <figure><Image src={value.url} alt={value.alt || ''} width={1200} height={800} className="h-auto w-full" />{value.caption && <figcaption>{value.caption}</figcaption>}</figure> : null,
              },
              marks: { link: ({ children, value }) => <a className="underline" href={value?.href}>{children}</a> },
              block: {
                h2: ({ children }) => <h2 className="pt-6 font-serif text-3xl">{children}</h2>,
                h3: ({ children }) => <h3 className="pt-4 font-serif text-2xl">{children}</h3>,
              },
            }} />
          </div>
          <section className="border-t border-line pt-8">
            <h2 className="font-serif text-2xl">Plan this journey around you</h2>
            <p className="my-4">Share your dates, interests and budget so we can discuss a private itinerary.</p>
            <Link href={enquiryUrl(post.title)} className="inline-block bg-copper px-6 py-3 text-white">Request a tailored itinerary</Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
