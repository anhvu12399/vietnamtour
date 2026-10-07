#!/usr/bin/env node
// SEO audit of every URL in the sitemap.
//   node scripts/seo-audit.mjs [baseUrl]            (default http://localhost:3000)
//   node scripts/seo-audit.mjs https://www.vietnamtours.co.uk
// Reports: status, self-canonical, noindex, title/description length, H1 count,
// word count, duplicate titles/descriptions, internal-link counts (orphans),
// plus a pricing consistency check. Exit code 1 if any URL has a blocking issue.

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const UA = 'Mozilla/5.0 (compatible; VietnamToursSEOAudit/1.0)';
const CONCURRENCY = 8;

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location'), text: res.status === 200 ? await res.text() : '', xrobots: res.headers.get('x-robots-tag') || '' };
}

const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const pick = (re, h) => (re.exec(h) || [])[1]?.trim() || '';

function analyse(url, r) {
  const issues = [];
  const warns = [];
  if (r.status !== 200) {
    issues.push(`HTTP ${r.status}${r.location ? ` → ${r.location}` : ''}`);
    return { url, issues, warns };
  }
  const h = r.text;
  const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/i, h);
  const desc = pick(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i, h) || pick(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i, h);
  const canonical = pick(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i, h);
  const robots = pick(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i, h);
  const h1s = (h.match(/<h1[\s>]/gi) || []).length;
  const wc = strip(h.replace(/<(nav|header|footer)[\s\S]*?<\/\1>/gi, ' ')).split(' ').length;

  if (/noindex/i.test(robots) || /noindex/i.test(r.xrobots)) issues.push('noindex but listed in sitemap');
  if (!canonical) issues.push('missing canonical');
  else if (canonical.replace(/\/$/, '') !== url.replace(/\/$/, '')) issues.push(`canonical ≠ URL (${canonical})`);
  if (!title) issues.push('missing <title>');
  else if (title.length > 70) warns.push(`title ${title.length} chars`);
  if (!desc) issues.push('missing meta description');
  else if (desc.length < 70) warns.push(`description short (${desc.length})`);
  else if (desc.length > 170) warns.push(`description long (${desc.length})`);
  if (h1s === 0) issues.push('no <h1>');
  if (h1s > 1) warns.push(`${h1s} <h1>`);
  if (wc < 300) warns.push(`thin: ~${wc} words`);

  const links = new Set([...h.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1].replace(/\/$/, '') || '/'));
  return { url, title, desc, wc, links, issues, warns };
}

const sm = await fetch(`${base}/sitemap.xml`).then((r) => r.text());
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
// Audit against the local origin when auditing a local build (sitemap contains production URLs)
const toFetch = (u) => (base.includes('localhost') ? base + new URL(u).pathname : u);

console.log(`SEO audit → ${base} · ${urls.length} sitemap URLs\n`);

const results = [];
for (let i = 0; i < urls.length; i += CONCURRENCY) {
  const batch = urls.slice(i, i + CONCURRENCY);
  const out = await Promise.all(batch.map(async (u) => analyse(u, await get(toFetch(u)))));
  results.push(...out);
}

// canonical comparison: when local, compare paths only
if (base.includes('localhost')) {
  for (const r of results) {
    r.issues = r.issues.filter((x) => !x.startsWith('canonical ≠ URL') || !x.includes(new URL(r.url).pathname));
  }
}

const dup = (key) => {
  const m = new Map();
  for (const r of results) if (r[key]) m.set(r[key], [...(m.get(r[key]) || []), r.url]);
  return [...m.entries()].filter(([, v]) => v.length > 1);
};
const dupTitles = dup('title');
const dupDescs = dup('desc');

// Orphans: sitemap URLs with no internal links pointing to them
const inbound = new Map(urls.map((u) => [new URL(u).pathname.replace(/\/$/, '') || '/', 0]));
for (const r of results) for (const l of r.links || []) if (inbound.has(l)) inbound.set(l, inbound.get(l) + 1);
const orphans = [...inbound.entries()].filter(([, n]) => n === 0).map(([p]) => p);

let blocking = 0;
for (const r of results) {
  if (r.issues.length) {
    blocking += r.issues.length;
    console.log(`✘ ${new URL(r.url).pathname}\n    ${r.issues.join('\n    ')}`);
  }
}
const warnRows = results.filter((r) => r.warns?.length);
if (warnRows.length) {
  console.log(`\n⚠ ${warnRows.length} URLs with warnings (showing 25):`);
  for (const r of warnRows.slice(0, 25)) console.log(`  ${new URL(r.url).pathname}: ${r.warns.join('; ')}`);
}
if (dupTitles.length) {
  console.log(`\n⚠ Duplicate <title> (${dupTitles.length}):`);
  for (const [t, us] of dupTitles.slice(0, 10)) console.log(`  "${t.slice(0, 70)}" ×${us.length}`);
}
if (dupDescs.length) {
  console.log(`\n⚠ Duplicate meta description (${dupDescs.length}):`);
  for (const [d, us] of dupDescs.slice(0, 10)) console.log(`  "${d.slice(0, 70)}…" ×${us.length}`);
}
if (orphans.length) console.log(`\n⚠ ${orphans.length} sitemap URLs with no internal links (orphans), e.g.\n  ${orphans.slice(0, 10).join('\n  ')}`);

// Pricing consistency: day-tour vs journey ratios, homepage claim vs catalogue minimum
try {
  const home = await get(base + '/');
  const claim = /From\s*£\s*([\d,]+)\s*pp/i.exec(home.text)?.[1];
  const costPage = await get(base + '/vietnam-guides/vietnam-tour-cost-from-uk');
  const rows = [...strip(costPage.text).matchAll(/(Day tours|Short breaks[^£]*|Regional journeys[^£]*|Full Vietnam journeys[^£]*|Extended journeys[^£]*)\s+(\d+)\s+(£[\d,]+(?:\s*–\s*£[\d,]+)?)/g)];
  console.log('\nPricing check');
  if (claim) console.log(`  homepage claims "from £${claim}pp"`);
  for (const m of rows) console.log(`  ${m[1].trim()}: ${m[2]} tours, ${m[3]}`);
  if (claim && rows.length) console.log('  → confirm the homepage claim matches what the catalogue actually sells (pricing audit, SEO plan §4.1).');
} catch (e) {
  console.log(`\nPricing check skipped: ${e.message}`);
}

console.log(`\n${results.length} URLs · ${blocking} blocking issues · ${warnRows.length} with warnings`);
process.exit(blocking ? 1 : 0);
