import { getSiteEntries } from '@/lib/siteIndex';
import { siteConfig, absoluteUrl } from '@/lib/siteConfig';

export const revalidate = 3600;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  const entries = (await getSiteEntries())
    .filter((e) => e.section === 'Blog' || e.section === 'Travel guides' || e.section === 'Guides')
    .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
    .slice(0, 50);

  const items = entries
    .map(
      (e) => `    <item>
      <title>${esc(e.title)}</title>
      <link>${esc(e.url)}</link>
      <guid isPermaLink="true">${esc(e.url)}</guid>
      <pubDate>${(e.publishedAt || e.lastModified).toUTCString()}</pubDate>
      <category>${esc(e.section)}</category>${e.description ? `\n      <description>${esc(e.description)}</description>` : ''}
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)} — Vietnam travel guides</title>
    <link>${absoluteUrl('/')}</link>
    <description>${esc(siteConfig.tagline)}</description>
    <language>en-GB</language>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
