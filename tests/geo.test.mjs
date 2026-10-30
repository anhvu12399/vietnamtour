import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function moduleFrom(path, transform = (source) => source) {
  const source = transform(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
}
const { detectTrafficSource } = await moduleFrom('src/lib/trafficDetector.ts');
const { canStoreEnquiry, deliverEnquiry, emailAcknowledged, parseEnquiry } = await moduleFrom('src/lib/enquiryDelivery.ts');
const { canonicalUrl, serializeJsonLd } = await moduleFrom('src/lib/seo.ts');
const { applyEditorialCorrections } = await moduleFrom('src/lib/editorialCorrections.ts');
const catalogue = await readFile(new URL('../src/lib/tours_data.json', import.meta.url), 'utf8');
const teamCode = ts.transpileModule(await readFile(new URL('../src/lib/team.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const teamUrl = 'data:text/javascript;base64,' + Buffer.from(teamCode).toString('base64');
const { mergeItineraryCatalogue } = await moduleFrom('src/lib/legacyItineraries.ts', (source) => source.replace("import catalogue from './tours_data.json';", `const catalogue = ${catalogue};`).replace("from './team'", `from '${teamUrl}'`));
const { generateDayByDayTimeline } = await moduleFrom('src/lib/itineraryDetailsBuilder.ts');

const input = {
  submissionId: '12345678-1234-4567-8901-123456789012', firstName: 'Test', lastName: 'Traveller',
  email: 'traveller@example.test', phone: '123456789', destination: 'Hoi An', travelYear: '2027', availableTime: 'Morning',
};

test('AI host matching rejects spoofed hostnames, path and query text', () => {
  assert.equal(detectTrafficSource('https://chatgpt.com/share/1').isAi, true);
  for (const url of ['https://chatgpt.com.evil.test', 'https://evil.test/?from=chatgpt.com', 'https://evil.test/chatgpt.com', 'https://notchatgpt.com']) assert.equal(detectTrafficSource(url).isAi, false);
});
test('AI campaigns, referrals and paid campaigns retain distinct evidence', () => {
  assert.equal(detectTrafficSource('', 'chatgpt').evidence, 'campaign');
  assert.equal(detectTrafficSource('https://www.perplexity.ai/search/x').evidence, 'observed_referral');
  assert.equal(detectTrafficSource('', 'gemini').source, 'Gemini');
  assert.equal(detectTrafficSource('', 'google', '', '', 'cpc').channel, 'cpc');
  assert.equal(detectTrafficSource('https://www.google.co.uk/search?q=x').channel, 'organic');
});
test('Markdown, footnotes and missing referrer never become AI acquisition', () => {
  const r = detectTrafficSource('', '', '| Day | Place | **Hanoi** [1]');
  assert.equal(r.isAi, false); assert.equal(r.channel, 'unknown'); assert.equal(r.contentHints.length, 1);
  assert.equal(detectTrafficSource('https://www.vietnamtours.co.uk/enquire').channel, 'unknown');
});
test('validation preserves form fields and rejects missing/invalid contacts', () => {
  const r = parseEnquiry(input); assert.deepEqual(r.destinations, ['Hoi An']); assert.equal(r.travelYear, '2027'); assert.equal(r.availableTime, 'Morning');
  for (const invalid of [null, [], { ...input, email: 'bad' }, { ...input, adults: -1 }, { ...input, adults: 1.5 }, { ...input, submissionId: '../bad' }, { ...input, phone: '' }]) assert.equal(parseEnquiry(invalid), null);
});
test('delivery fails if neither independent channel acknowledges receipt', async () => {
  const r = await deliverEnquiry({ save: async () => { throw Error('offline'); }, forwardEmail: async () => false });
  assert.equal(r.accepted, false);
});
test('CMS success survives failed email; email can recover a CMS failure', async () => {
  const stored = await deliverEnquiry({ save: async () => ({ id: 'lead-1', created: true }), forwardEmail: async () => { throw Error('offline'); } });
  assert.equal(stored.accepted, true); assert.equal(stored.leadId, 'lead-1');
  const emailed = await deliverEnquiry({ save: async () => null, forwardEmail: async () => true });
  assert.equal(emailed.accepted, true); assert.equal(emailed.emailed, true);
});
test('stored retry does not send another notification', async () => {
  let notifications = 0;
  const r = await deliverEnquiry({ save: async () => ({ id: 'lead-1', created: false }), forwardEmail: async () => { notifications++; return true; } });
  assert.equal(r.duplicate, true); assert.equal(notifications, 0);
});
test('email HTTP or application errors are never acknowledged', () => {
  assert.equal(emailAcknowledged(false, { success: true }), false);
  assert.equal(emailAcknowledged(true, { success: false }), false);
  assert.equal(emailAcknowledged(true, { message: 'sent' }), false);
  assert.equal(emailAcknowledged(true, { success: 'true' }), true);
});
test('canonical strips tracking while JSON-LD cannot close its script', () => {
  assert.equal(canonicalUrl('/itineraries/example?utm_source=x#details'), 'https://www.vietnamtours.co.uk/itineraries/example');
  assert.ok(!serializeJsonLd({ title: '</script><script>alert(1)</script>' }).includes('<'));
});
test('published tours override catalogue entries and all 50 production slugs survive', async () => {
  const snapshot = JSON.parse(await readFile(new URL('../docs/research/geo-audit/snapshot.json', import.meta.url), 'utf8'));
  const archive = mergeItineraryCatalogue([]);
  const published = snapshot.articles.filter((a) => a.type === 'itinerary').map((a) => ({ ...archive[0], title: a.title, slug: { current: a.slug }, _id: a.slug }));
  const tours = mergeItineraryCatalogue(published);
  assert.equal(tours.length, 50);
  assert.equal(tours.find((t) => t.slug.current === published[0].slug.current).title, published[0].title);
  const slugs = new Set(tours.map((t) => t.slug.current));
  for (const page of snapshot.pages.filter((p) => new URL(p.url).pathname.startsWith('/itineraries/'))) assert.ok(slugs.has(new URL(page.url).pathname.split('/').at(-1)), page.url);
});
test('timeline does not invent days, meals, activities or an hourly schedule', () => {
  const tour = { ...mergeItineraryCatalogue([])[0], duration: 20, timeline: [{ dayRange: 'Day 1–2', title: 'Hanoi', description: [{ children: [{ text: 'Documented activity.' }] }] }] };
  const days = generateDayByDayTimeline(tour);
  assert.equal(days.length, 1); assert.equal(days[0].dayLabel, 'Day 1–2'); assert.equal(days[0].description, 'Documented activity.');
  assert.equal(days[0].meals, ''); assert.deepEqual(days[0].hourlySchedule, []); assert.equal(days[0].hotelName, '');
});
test('known visa correction changes full PortableText content without mutating the source', () => {
  const original = { slug: { current: 'first-time-visiting-vietnam-guide' }, content: [{ children: [{ text: 'Rates are roughly 30,000 VND to £1.' }] }] };
  const corrected = applyEditorialCorrections(original);
  assert.match(corrected.content[0].children[0].text, /current GBP\/VND/);
  assert.equal(original.content[0].children[0].text, 'Rates are roughly 30,000 VND to £1.');
});

test('contact data can only be stored in an explicitly configured private dataset', () => {
  const datasets = [{ name: 'production', aclMode: 'public' }, { name: 'enquiries', aclMode: 'private' }];
  assert.equal(canStoreEnquiry(undefined, datasets), false);
  assert.equal(canStoreEnquiry('production', datasets), false);
  assert.equal(canStoreEnquiry('missing', datasets), false);
  assert.equal(canStoreEnquiry('enquiries', datasets), true);
});
