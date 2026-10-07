import { ukGuides } from '@/lib/ukGuidesData';
import { siteConfig, absoluteUrl, CONTENT_REVIEWED_AT } from '@/lib/siteConfig';
import { getItineraries } from '@/sanity/client';

export const revalidate = 3600;

// Plain-text rendering of the key answer content so agents can read it without
// parsing HTML. Everything here is also visible on the public pages.
export async function GET() {
  const itineraries = await getItineraries().catch(() => []);
  const out: string[] = [
    `# ${siteConfig.name} — full content index`,
    '',
    `> ${siteConfig.description}`,
    `Last reviewed: ${CONTENT_REVIEWED_AT}. Currency: GBP (£). Language: en-GB.`,
    '',
    '# Private tours (starting prices per person)',
    '',
  ];

  for (const it of itineraries) {
    if (!it.slug?.current) continue;
    out.push(`- ${it.title} — ${it.duration} days — from £${it.priceFrom?.toLocaleString('en-GB')} pp — ${absoluteUrl(`/itineraries/${it.slug.current}`)}`);
  }
  out.push('');

  for (const g of ukGuides) {
    out.push(`# ${g.title}`, `URL: ${absoluteUrl(g.path)}`, '', g.answer, '');
    for (const s of g.sections) {
      out.push(`## ${s.heading}`, '');
      s.paragraphs?.forEach((p) => out.push(p, ''));
      s.bullets?.forEach((b) => out.push(`- ${b}`));
      if (s.bullets) out.push('');
      if (s.table) {
        out.push(`| ${s.table.headers.join(' | ')} |`, `| ${s.table.headers.map(() => '---').join(' | ')} |`);
        s.table.rows.forEach((r) => out.push(`| ${r.join(' | ')} |`));
        out.push('');
      }
    }
    out.push('## FAQ', '');
    g.faqs.forEach((f) => out.push(`Q: ${f.question}`, `A: ${f.answer}`, ''));
    if (g.sources.length) {
      out.push('Sources:');
      g.sources.forEach((s) => out.push(`- ${s.label}: ${s.url}`));
      out.push('');
    }
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
