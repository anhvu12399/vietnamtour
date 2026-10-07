import { getSiteEntries, staticPages, type SiteEntry, type SiteSection } from '@/lib/siteIndex';
import { siteConfig, absoluteUrl, CONTENT_REVIEWED_AT } from '@/lib/siteConfig';

export const revalidate = 3600;

const ORDER: SiteSection[] = ['Guides', 'Tours', 'Destinations', 'Month guides', 'Things to do', 'Trip ideas', 'Inspiration', 'Travel guides', 'Blog', 'Plan', 'Company'];

export async function GET() {
  const entries = await getSiteEntries();
  const seen = new Set<string>();
  const all: Pick<SiteEntry, 'url' | 'title' | 'description' | 'section'>[] = [];
  for (const p of staticPages) {
    const url = absoluteUrl(p.path);
    seen.add(url);
    all.push({ url, title: p.title, description: p.description, section: p.section });
  }
  for (const e of entries) if (!seen.has(e.url)) all.push(e);

  const lines: string[] = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    'We design private, tailor-made Vietnam tours for travellers from the United Kingdom. Prices are quoted per person in pounds sterling (£). Content is written in British English and reviewed regularly; entry, health and safety rules should always be confirmed with official sources (GOV.UK FCDO, TravelHealthPro, the Vietnamese immigration portal).',
    '',
    `Contact: ${siteConfig.email}`,
    `Editorial facts last reviewed: ${CONTENT_REVIEWED_AT}`,
    '',
  ];

  for (const section of ORDER) {
    const items = all.filter((e) => e.section === section);
    if (items.length === 0) continue;
    lines.push(`## ${section}`, '');
    for (const it of items) {
      const desc = it.description ? `: ${it.description.replace(/\s+/g, ' ').trim()}` : '';
      lines.push(`- [${it.title}](${it.url})${desc}`);
    }
    lines.push('');
  }

  lines.push('## Optional', '', `- [Full index](${absoluteUrl('/llms-full.txt')})`, `- [RSS feed](${absoluteUrl('/rss.xml')})`, `- [Sitemap](${absoluteUrl('/sitemap.xml')})`, '');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
