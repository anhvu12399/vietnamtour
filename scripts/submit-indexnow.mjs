// Submit published sitemap URLs to IndexNow after deployment.
// Run: node scripts/submit-indexnow.mjs [https://www.vietnamtours.co.uk]
const base = new URL(process.argv[2] || 'https://www.vietnamtours.co.uk').origin;
const host = new URL(base).host;
const key = process.env.INDEXNOW_KEY || 'bfb03d52674e47be91307b22a00c6d5b';
const keyLocation = `${base}/${key}.txt`;

const keyRes = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
const keyText = (await keyRes.text()).trim();
if (!keyRes.ok || keyText !== key) {
  throw new Error(`IndexNow key file not live at ${keyLocation} (status=${keyRes.status})`);
}

const sitemapRes = await fetch(`${base}/sitemap.xml`, { signal: AbortSignal.timeout(20000) });
if (!sitemapRes.ok) {
  throw new Error(`Failed to fetch sitemap.xml: ${sitemapRes.status}`);
}
const xml = await sitemapRes.text();
const urlList = [...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim()).filter(Boolean))];
if (urlList.length === 0) {
  throw new Error('No URLs found in sitemap.xml');
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  signal: AbortSignal.timeout(20000),
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

const body = await response.text();
console.log(JSON.stringify({ status: response.status, submittedUrls: urlList.length, host, keyLocation, body }, null, 2));
if (response.status !== 200 && response.status !== 202) {
  process.exitCode = 1;
}
