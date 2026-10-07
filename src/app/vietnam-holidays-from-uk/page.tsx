import type { Metadata } from 'next';
import UkGuideView from '@/components/UkGuideView';
import { getUkGuide } from '@/lib/ukGuidesData';
import { absoluteUrl } from '@/lib/siteConfig';

const guide = getUkGuide('vietnam-holidays-from-uk')!;

export const revalidate = 3600;

export const metadata: Metadata = {
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

export default function VietnamHolidaysFromUkPage() {
  return <UkGuideView guide={guide} />;
}
