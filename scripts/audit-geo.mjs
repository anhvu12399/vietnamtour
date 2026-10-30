// Read-only audit: public CMS content + GET requests. Never submits an enquiry.
// Run: node scripts/audit-geo.mjs [https://www.vietnamtours.co.uk]
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import ts from 'typescript';

const base = new URL(process.argv[2] || 'https://www.vietnamtours.co.uk').origin;
const output = 'docs/research/geo-audit';
await mkdir(output, { recursive: true });
const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const text = (s = '') => decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attrs = (s) => Object.fromEntries([...s.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]));
async function get(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'VietnamTours-ReadOnly-SEO-Audit/1.0' } });
  return { status: r.status, finalUrl: r.url, headers: { xRobotsTag: r.headers.get('x-robots-tag'), contentType: r.headers.get('content-type') }, body: await r.text() };
}
const infrastructure = {};
for (const route of ['/robots.txt', '/sitemap.xml']) {
  try { infrastructure[route] = await get(base + route); }
  catch (error) { infrastructure[route] = { error: error.message }; }
}
const contentTypes = ['post', 'blogPost', 'travelGuide', 'itinerary', 'destination', 'specialist', 'tripIdea', 'inspiration', 'monthGuide', 'thingToDo', 'cruise', 'accommodation'];
const query = `*[!(_id in path("drafts.**")) && _type in ${JSON.stringify(contentTypes)}]{_id,_type,_updatedAt,title,name,slug,publishedAt,updatedAt,reviewedAt,lastReviewedAt,reviewer,author->{name,"slug":slug.current,bio},heroAuthor,excerpt,intro,content,sections,faqs,highlights,practicalInfo,seo,ctaHeading,ctaBody,ctaDescription,"destinationSlug":destination->slug.current}`;
// Only public editorial fields are requested. No tokens, environment files or lead records.
const cmsResponse = await get('https://knxuvin4.api.sanity.io/v2026-06-17/data/query/production?perspective=published&query=' + encodeURIComponent(query));
if (cmsResponse.status !== 200) throw new Error(`Public CMS returned ${cmsResponse.status}`);
const cms = JSON.parse(cmsResponse.body).result;
if (!Array.isArray(cms)) throw new Error('Invalid public CMS response');
const locals = [];
for (const [file, key, type, prefix] of [
  ['thingsToDoData', 'thingsToDoData', 'thingToDo', '/things-to-do/'],
  ['tripIdeasData', 'tripIdeasData', 'tripIdea', '/trip-ideas/'],
  ['inspirationsData', 'inspirationsData', 'inspiration', '/inspirations/'],
  ['ideasByMonthData', 'ideasByMonthData', 'monthGuide', '/ideas-by-month/'],
]) {
  const source = await readFile(`src/lib/${file}.ts`, 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const data = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
  locals.push(...data[key].map((d) => ({ ...d, _type: type, source: `src/lib/${file}.ts`, url: base + prefix + d.slug })));
}
function cmsUrl(d) {
  const slug = d.slug?.current;
  if (!slug) return null;
  const prefix = { post: '/travel-guides/', blogPost: '/blog/', itinerary: '/itineraries/', destination: '/destinations/', specialist: '/specialists/', accommodation: '/accommodations/', thingToDo: '/things-to-do/', tripIdea: '/trip-ideas/', inspiration: '/inspirations/', monthGuide: '/ideas-by-month/' }[d._type];
  if (prefix) return base + prefix + slug;
  if (d.destinationSlug) return `${base}/destinations/${d.destinationSlug}/${d._type === 'cruise' ? 'cruises' : 'blog'}/${slug}`;
  return null;
}
function strings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.entries(value).filter(([key]) => !key.startsWith('_') && !['marks', 'style'].includes(key)).flatMap(([, v]) => strings(v));
  return [];
}
const inventory = [...cms.map((d) => ({ ...d, source: 'public Sanity', url: cmsUrl(d) })), ...locals];
const sitemapUrls = [...(infrastructure['/sitemap.xml'].body || '').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
const urls = [...new Set([...sitemapUrls, ...inventory.map((d) => d.url).filter(Boolean), base + '/about', base + '/enquire', base + '/our-story', base + '/terms', base + '/privacy-policy'])].filter((u) => new URL(u).origin === base);
const pages = [];
let next = 0;
async function crawl() {
  while (next < urls.length) {
    const url = urls[next++];
    try {
      const r = await get(url);
      const main = r.body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || r.body;
      const meta = [...r.body.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]));
      const links = [...main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => ({ href: attrs(m[1]).href, label: text(m[2]) })).filter((a) => a.href);
      const jsonLd = [];
      let invalidJsonLd = 0;
      for (const m of r.body.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
        try { jsonLd.push(JSON.parse(m[1])); } catch { invalidJsonLd++; }
      }
      const page = { url, status: r.status, finalUrl: r.finalUrl, headers: r.headers, inSitemap: sitemapUrls.includes(url), title: text(r.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]), description: meta.find((m) => m.name === 'description')?.content || '', robots: meta.filter((m) => ['robots', 'googlebot'].includes(m.name)).map((m) => `${m.name}: ${m.content}`), canonicals: [...r.body.matchAll(/<link\b[^>]*>/gi)].map((m) => attrs(m[0])).filter((a) => a.rel === 'canonical').map((a) => a.href), h1: [...r.body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1])), headings: [...main.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi)].map((m) => text(m[1])), links, jsonLd, invalidJsonLd, text: text(main) };
      pages.push(page);
    } catch (error) { pages.push({ url, error: error.message, inSitemap: sitemapUrls.includes(url) }); }
    if (pages.length % 40 === 0) console.log(`Crawled ${pages.length}/${urls.length}`);
  }
}
await Promise.all(Array.from({ length: 5 }, crawl));
pages.sort((a, b) => a.url.localeCompare(b.url));
const articles = inventory.map((d) => {
  const body = Array.isArray(d.content) ? d.content.filter((b) => b._type === 'block').map((b) => (b.children || []).map((c) => c.text || '').join('')).join(' ') : Array.isArray(d.sections) ? d.sections.map((s) => [s.heading, s.body].filter(Boolean).join(' ')).join(' ') : (typeof d.intro === 'string' ? d.intro : '');
  const sources = [...new Set(strings(d.content || d.sections || []).filter((s) => /^https?:\/\//.test(s)))];
  const p = pages.find((p) => p.url === d.url);
  return { type: d._type, source: d.source, title: d.title || d.name, slug: typeof d.slug === 'string' ? d.slug : d.slug?.current, url: d.url, wordsApprox: body.trim() ? body.trim().split(/\s+/).length : 0, author: d.author?.name || d.heroAuthor?.name || '', authorProfileSlug: d.author?.slug || '', publishedAt: d.publishedAt || '', cmsUpdatedAt: d._updatedAt || '', explicitReviewDate: d.reviewedAt || d.lastReviewedAt || '', reviewer: d.reviewer || null, sourceUrlsInBody: sources, hasCmsCta: !!(d.ctaHeading || d.ctaBody || d.ctaDescription), faqCount: d.faqs?.length || 0, status: p?.status || null, robots: p?.robots || [], canonicals: p?.canonicals || [], inSitemap: p?.inSitemap || false, text: body };
});
const byType = Object.fromEntries(contentTypes.map((t) => [t, cms.filter((d) => d._type === t).length]));
const summary = { capturedAt: new Date().toISOString(), base, cmsCounts: byType, localCounts: Object.fromEntries(['thingToDo', 'tripIdea', 'inspiration', 'monthGuide'].map((t) => [t, locals.filter((d) => d._type === t).length])), sitemapUrls: sitemapUrls.length, sitemapUniqueUrls: new Set(sitemapUrls).size, sitemapDuplicates: [...new Set(sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index))], crawled: pages.length, httpStatuses: Object.fromEntries([...new Set(pages.map((p) => p.status || 'error'))].map((s) => [s, pages.filter((p) => (p.status || 'error') === s).length])), errors: pages.filter((p) => p.error), non200: pages.filter((p) => p.status && p.status !== 200).map(({ url, status }) => ({ url, status })), noindex: pages.filter((p) => /noindex/i.test((p.robots || []).join(' ') + (p.headers?.xRobotsTag || ''))).map((p) => p.url), sitemapCanonicalMismatch: pages.filter((p) => p.inSitemap && p.status === 200 && p.canonicals?.some((c) => c.replace(/\/$/, '') !== p.finalUrl.replace(/\/$/, ''))).map(({ url, canonicals }) => ({ url, canonicals })) };
await writeFile(`${output}/snapshot.json`, JSON.stringify({ summary, infrastructure, pages, articles }, null, 2) + '\n');
const csv = (value) => '"' + String(value ?? '').replace(/"/g, '""') + '"';
const columns = ['type', 'source', 'title', 'url', 'wordsApprox', 'author', 'authorProfileSlug', 'explicitReviewDate', 'hasCmsCta', 'faqCount', 'status', 'robots', 'canonicals', 'inSitemap', 'sourceUrlsInBody'];
await writeFile(`${output}/article-inventory.csv`, [columns.join(','), ...articles.map((a) => columns.map((c) => csv(Array.isArray(a[c]) ? a[c].join(' | ') : a[c])).join(','))].join('\n') + '\n');
console.log(JSON.stringify({ ...summary, sitemapCanonicalMismatch: summary.sitemapCanonicalMismatch.length }, null, 2));
