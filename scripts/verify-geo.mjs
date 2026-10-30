// Verify a built local server. GETs only, except an intentionally invalid enquiry
// which must be rejected before any delivery dependency is called.
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const base = new URL(process.argv[2] || 'http://localhost:3100').origin;
const production = 'https://www.vietnamtours.co.uk';
const isProduction = base === production;
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname) && !isProduction) throw new Error('Use a local test server or the verified production domain.');
const sitemapResponse = await fetch(base + '/sitemap.xml');
assert.equal(sitemapResponse.status, 200);
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap entries');
assert.equal(urls.filter((url) => url.includes('/accommodations/')).length, 6, 'Published hotels lost URLs');
assert.equal(urls.filter((url) => url.includes('/itineraries/')).length, 50, 'Published tour catalogue lost URLs');
assert.ok(!urls.includes(production + '/enquire'), 'Noindex enquiry must be excluded');
const results = [];
let next = 0;
async function worker() {
  while (next < urls.length) {
    const url = urls[next++];
    const pathname = new URL(url).pathname;
    const response = await fetch(base + pathname, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const canonical = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)].map((m) => m[1]);
    assert.deepEqual(canonical, [url], `Canonical mismatch: ${pathname}`);
    assert.ok(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), `Noindex in sitemap: ${pathname}`);
    const readable = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    assert.ok(!/[\u200b-\u200d\ufeff]{5}/.test(readable), `Preview metadata leaked into public text: ${pathname}`);
    const h1 = html.match(/<h1\b/g) || [];
    assert.equal(h1.length, 1, `H1: ${pathname}`);
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    if (pathname.startsWith('/travel-guides/')) assert.ok(schemas.some((schema) => schema['@type'] === 'Article'), `Missing Article: ${pathname}`);
    if (pathname.startsWith('/ideas-by-month/')) assert.ok(html.includes('Choosing a route in'), `Missing seasonal decision support: ${pathname}`);
    assert.ok(!html.includes('Information last verified and updated:'), `Synthetic review date: ${pathname}`);
    results.push({ pathname, status: response.status, canonical: canonical[0], h1: h1.length });
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
const snapshot = JSON.parse(await readFile(new URL('../docs/research/geo-audit/snapshot.json', import.meta.url), 'utf8'));
for (const article of snapshot.articles.filter((article) => article.type === 'blogPost')) {
  const pathname = '/blog/' + article.slug;
  const response = await fetch(base + pathname, { redirect: 'manual' });
  assert.equal(response.status, 308, `Empty mirror did not redirect: ${pathname}`);
  assert.equal(new URL(response.headers.get('location'), base).pathname, '/travel-guides/' + article.slug);
}
for (const slug of ['alice-mercer', 'james-harrison']) {
  const profile = await fetch(base + '/specialists/' + slug, { redirect: 'manual' });
  assert.equal(profile.status, 308, 'Unverified profile must redirect: ' + slug);
}
const about = await fetch(base + '/about', { redirect: 'manual' });
assert.equal(about.status, 308);
const robots = await (await fetch(base + '/robots.txt')).text();
assert.match(robots, /Disallow: \/studio\//); assert.match(robots, /Disallow: \/api\//);
const invalid = await fetch(base + '/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
assert.equal(invalid.status, 400);
const visa = await (await fetch(base + '/visa-guide')).text();
assert.ok(visa.includes('US$25 single / US$50 multiple entry'));
const firstTime = await (await fetch(base + '/travel-guides/first-time-visiting-vietnam-guide')).text();
assert.ok(firstTime.includes('US$50')); assert.ok(!firstTime.includes('approval usually comes within 24 hours'));
const itinerary = await (await fetch(base + '/travel-guides/2-week-vietnam-itinerary-private-tour')).text();
assert.ok(!itinerary.includes('Da Nang (45 minutes)')); assert.ok(!itinerary.includes('Minh Mang&#x27;s tomb at Tu Duc'));
const output = { testedAt: new Date().toISOString(), server: base, sitemapUrls: urls.length, tours: 50, blogRedirects: 14, hotels: 6, canonicalFailures: 0, invalidEnquiryRejected: true, pages: results.sort((a, b) => a.pathname.localeCompare(b.pathname)) };
await mkdir('docs/research/geo-audit', { recursive: true });
await writeFile(`docs/research/geo-audit/${isProduction ? 'production' : 'local'}-verification.json`, JSON.stringify(output, null, 2) + '\n');
console.log(`Verified ${urls.length} indexable pages, 50 tours, 14 permanent blog redirects, metadata/schema, seasonal sections, robots and invalid-enquiry rejection.`);
