#!/usr/bin/env node
// GEO smoke test. Usage: node scripts/geo-check.mjs [baseUrl]
//   node scripts/geo-check.mjs http://localhost:3000
//   node scripts/geo-check.mjs https://www.vietnamtours.co.uk
// Checks: AI bots can fetch pages (HTTP 200 + real HTML), robots.txt rules,
// llms.txt, sitemap freshness, and that every JSON-LD block parses and key
// pages carry the schema types answer engines need.

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');

const BOT_UAS = {
  'OAI-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  'ChatGPT-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
  Bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
};

let failures = 0;
const ok = (m) => console.log(`  ✔ ${m}`);
const bad = (m) => {
  failures++;
  console.log(`  ✘ ${m}`);
};

async function get(path, ua) {
  const res = await fetch(base + path, { headers: ua ? { 'user-agent': ua } : {}, redirect: 'follow' });
  return { status: res.status, text: await res.text(), headers: res.headers };
}

function jsonLdBlocks(html) {
  const out = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function types(node, acc = new Set()) {
  if (Array.isArray(node)) node.forEach((n) => types(n, acc));
  else if (node && typeof node === 'object') {
    const t = node['@type'];
    (Array.isArray(t) ? t : t ? [t] : []).forEach((x) => acc.add(x));
    Object.values(node).forEach((v) => types(v, acc));
  }
  return acc;
}

console.log(`GEO check → ${base}\n`);

console.log('robots.txt');
{
  const { status, text } = await get('/robots.txt');
  status === 200 ? ok('200') : bad(`status ${status}`);
  for (const bot of ['OAI-SearchBot', 'ChatGPT-User']) {
    const re = new RegExp(`User-Agent:[^\\n]*${bot}`, 'i');
    re.test(text) ? ok(`${bot} explicitly allowed`) : bad(`${bot} missing from robots.txt`);
  }
  /Sitemap:/i.test(text) ? ok('sitemap declared') : bad('no Sitemap line');
}

console.log('\nllms.txt');
{
  const { status, text } = await get('/llms.txt');
  status === 200 && text.startsWith('# ') ? ok(`served (${text.split('\n').length} lines)`) : bad(`status ${status}`);
}

console.log('\nsitemap.xml');
let urls = [];
{
  const { status, text } = await get('/sitemap.xml');
  if (status !== 200) bad(`status ${status}`);
  else {
    urls = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const mods = [...text.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    ok(`${urls.length} URLs`);
    const distinct = new Set(mods.map((m) => m.slice(0, 16))).size;
    distinct > 1 ? ok(`lastmod varies (${distinct} distinct values)`) : bad('all lastmod values identical — freshness signal is fake');
  }
}

const pages = ['/', '/vietnam-holidays-from-uk', '/vietnam-guides/vietnam-tour-cost-from-uk', '/visa-guide', '/itineraries'];
const sampleItinerary = urls.find((u) => /\/itineraries\/[^/]+$/.test(u));
const sampleDestination = urls.find((u) => /\/destinations\/[^/]+$/.test(u));
for (const u of [sampleItinerary, sampleDestination]) if (u) pages.push(new URL(u).pathname);

const EXPECT = {
  '/': ['TravelAgency', 'WebSite'],
  '/vietnam-holidays-from-uk': ['Article', 'FAQPage', 'BreadcrumbList', 'WebPage'],
  '/visa-guide': ['FAQPage', 'BreadcrumbList'],
};
if (sampleItinerary) EXPECT[new URL(sampleItinerary).pathname] = ['TouristTrip', 'FAQPage', 'BreadcrumbList', 'Offer'];
if (sampleDestination) EXPECT[new URL(sampleDestination).pathname] = ['TouristDestination', 'FAQPage', 'BreadcrumbList'];

for (const path of pages) {
  console.log(`\n${path}`);
  for (const [name, ua] of Object.entries(BOT_UAS)) {
    try {
      const { status, text } = await get(path, ua);
      status === 200 && text.length > 5000 ? ok(`${name}: 200, ${Math.round(text.length / 1024)} KB HTML`) : bad(`${name}: status ${status}, ${text.length} bytes`);
    } catch (e) {
      bad(`${name}: ${e.message}`);
    }
  }
  const { text } = await get(path);
  const canonical = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/.exec(text)?.[1];
  canonical ? ok(`canonical ${canonical}`) : bad('no canonical');
  const blocks = jsonLdBlocks(text);
  const found = new Set();
  let parseFail = 0;
  for (const b of blocks) {
    try {
      types(JSON.parse(b), found);
    } catch {
      parseFail++;
    }
  }
  parseFail === 0 ? ok(`${blocks.length} JSON-LD blocks parse`) : bad(`${parseFail} JSON-LD blocks fail to parse`);
  for (const t of EXPECT[path] || []) found.has(t) ? ok(`schema ${t}`) : bad(`missing schema ${t}`);
  if (/\bh1\b/i.test(text) === false) bad('no <h1>');
}

console.log(failures === 0 ? '\nAll checks passed ✔' : `\n${failures} check(s) failed ✘`);
process.exit(failures === 0 ? 0 : 1);
