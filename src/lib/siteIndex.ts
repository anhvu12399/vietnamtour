// One list of every public page, shared by sitemap.xml, llms.txt, rss.xml and IndexNow.
import {
  getItineraries,
  getPosts,
  getDestinations,
  getBlogPostsFromSanity,
} from '@/sanity/client';
import { thingsToDoData } from '@/lib/thingsToDoData';
import { tripIdeasData } from '@/lib/tripIdeasData';
import { inspirationsData } from '@/lib/inspirationsData';
import { ideasByMonthData } from '@/lib/ideasByMonthData';
import { ukGuides } from '@/lib/ukGuidesData';
import { CONTENT_REVIEWED_AT, absoluteUrl } from '@/lib/siteConfig';

export type SiteSection =
  | 'Guides'
  | 'Tours'
  | 'Destinations'
  | 'Travel guides'
  | 'Blog'
  | 'Things to do'
  | 'Trip ideas'
  | 'Inspiration'
  | 'Month guides'
  | 'Company'
  | 'Plan';

export interface SiteEntry {
  url: string;
  title: string;
  description?: string;
  section: SiteSection;
  lastModified: Date;
  /** Only set for dated articles (RSS) */
  publishedAt?: Date;
}

const EDITORIAL_DATE = new Date(CONTENT_REVIEWED_AT);

function toDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

interface WithSlug {
  slug?: { current?: string };
  _updatedAt?: string;
}

export async function getSiteEntries(): Promise<SiteEntry[]> {
  const [itineraries, travelGuides, destinations, blogPosts] = await Promise.all([
    getItineraries(),
    getPosts(),
    getDestinations(),
    getBlogPostsFromSanity(),
  ]);

  const entries: SiteEntry[] = [];

  // Hub + guides (editorial date, bumped via CONTENT_REVIEWED_AT)
  entries.push({ url: absoluteUrl('/vietnam-guides'), title: 'Vietnam guides for UK travellers', section: 'Guides', lastModified: EDITORIAL_DATE });
  for (const g of ukGuides) {
    entries.push({ url: absoluteUrl(g.path), title: g.title, description: g.answer, section: 'Guides', lastModified: EDITORIAL_DATE });
  }

  for (const it of itineraries as (WithSlug & { title: string; intro?: string; duration?: number; priceFrom?: number })[]) {
    if (!it.slug?.current) continue;
    const price = it.priceFrom ? ` From £${it.priceFrom.toLocaleString('en-GB')} per person.` : '';
    entries.push({
      url: absoluteUrl(`/itineraries/${it.slug.current}`),
      title: it.title,
      description: `${it.duration ? `${it.duration}-day private tour. ` : ''}${(it.intro || '').slice(0, 140)}${price}`.trim(),
      section: 'Tours',
      lastModified: toDate(it._updatedAt) || EDITORIAL_DATE,
    });
  }

  for (const d of destinations as (WithSlug & { name: string })[]) {
    if (!d.slug?.current) continue;
    entries.push({
      url: absoluteUrl(`/destinations/${d.slug.current}`),
      title: d.name,
      section: 'Destinations',
      lastModified: toDate(d._updatedAt) || EDITORIAL_DATE,
    });
  }

  for (const p of travelGuides as (WithSlug & { title: string; excerpt?: string; publishedAt?: string })[]) {
    if (!p.slug?.current) continue;
    entries.push({
      url: absoluteUrl(`/travel-guides/${p.slug.current}`),
      title: p.title,
      description: p.excerpt,
      section: 'Travel guides',
      lastModified: toDate(p._updatedAt) || toDate(p.publishedAt) || EDITORIAL_DATE,
      publishedAt: toDate(p.publishedAt),
    });
  }

  for (const b of blogPosts as (WithSlug & { title: string; excerpt?: string; publishedAt?: string })[]) {
    if (!b.slug?.current) continue;
    entries.push({
      url: absoluteUrl(`/blog/${b.slug.current}`),
      title: b.title,
      description: b.excerpt,
      section: 'Blog',
      lastModified: toDate(b._updatedAt) || toDate(b.publishedAt) || EDITORIAL_DATE,
      publishedAt: toDate(b.publishedAt),
    });
  }

  const staticSets: { base: string; section: SiteSection; data: { slug: string; title: string; metaDescription: string }[] }[] = [
    { base: '/things-to-do', section: 'Things to do', data: thingsToDoData },
    { base: '/trip-ideas', section: 'Trip ideas', data: tripIdeasData },
    { base: '/inspirations', section: 'Inspiration', data: inspirationsData },
    { base: '/ideas-by-month', section: 'Month guides', data: ideasByMonthData },
  ];
  for (const set of staticSets) {
    for (const item of set.data) {
      entries.push({
        url: absoluteUrl(`${set.base}/${item.slug}`),
        title: item.title,
        description: item.metaDescription,
        section: set.section,
        lastModified: EDITORIAL_DATE,
      });
    }
  }

  return entries;
}

/** Top-level pages (not dynamic). */
export const staticPages: { path: string; title: string; description: string; section: SiteSection }[] = [
  { path: '/', title: 'Home', description: 'Bespoke private Vietnam tours for UK travellers', section: 'Plan' },
  { path: '/itineraries', title: 'All private Vietnam itineraries', description: 'Tailor-made tours with starting prices in £ per person', section: 'Tours' },
  { path: '/destinations', title: 'Vietnam destinations', description: 'Hanoi, Ha Long Bay, Sa Pa, Hue, Hoi An, Ho Chi Minh City, Mekong Delta and more', section: 'Destinations' },
  { path: '/travel-guides', title: 'Travel guides', description: 'Specialist travel guides for Vietnam', section: 'Travel guides' },
  { path: '/blog', title: 'Vietnam travel blog', description: 'Articles and tips from our Vietnam specialists', section: 'Blog' },
  { path: '/things-to-do', title: 'Things to do in Vietnam', description: 'Experiences and activities', section: 'Things to do' },
  { path: '/ideas-by-month', title: 'Vietnam by month', description: 'When to go, month by month', section: 'Month guides' },
  { path: '/trip-ideas', title: 'Trip ideas', description: 'Honeymoon, family, adventure and more', section: 'Trip ideas' },
  { path: '/inspirations', title: 'Inspiration', description: 'Ideas for your Vietnam journey', section: 'Inspiration' },
  { path: '/accommodations', title: 'Hotels and accommodation', description: 'Handpicked luxury hotels', section: 'Plan' },
  { path: '/visa-guide', title: 'Vietnam visa guide', description: 'Entry requirements and e-visa', section: 'Guides' },
  { path: '/enquire', title: 'Enquire', description: 'Request a tailor-made quote', section: 'Plan' },
  { path: '/our-story', title: 'Our story', description: 'Who we are', section: 'Company' },
  { path: '/specialists', title: 'Our specialists', description: 'Meet your Vietnam travel specialists', section: 'Company' },
  { path: '/privacy-policy', title: 'Privacy policy', description: '', section: 'Company' },
  { path: '/terms', title: 'Terms and conditions', description: '', section: 'Company' },
];
