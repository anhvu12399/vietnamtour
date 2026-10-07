import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UkGuideView from '@/components/UkGuideView';
import { getAllUkGuideSlugs, getUkGuide } from '@/lib/ukGuidesData';
import { absoluteUrl } from '@/lib/siteConfig';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  // The hub guide lives at /vietnam-holidays-from-uk
  return getAllUkGuideSlugs()
    .filter((slug) => slug !== 'vietnam-holidays-from-uk')
    .map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getUkGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: absoluteUrl(guide.path) },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: absoluteUrl(guide.path),
      type: 'article',
      images: [{ url: guide.heroImage, width: 1200, height: 630, alt: guide.title }],
    },
  };
}

export default async function VietnamGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getUkGuide(slug);
  if (!guide || slug === 'vietnam-holidays-from-uk') notFound();
  return <UkGuideView guide={guide} />;
}
