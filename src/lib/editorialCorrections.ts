import type { Post } from '@/sanity/types';

// Correct known published copy at read time without overwriting the source CMS.
// Keep this list explicit and covered by regression checks until editors migrate it.
export function applyEditorialCorrections(post: Post): Post {
  const slug = post.slug.current;
  const replacements: [string, string][] = [];
  if (slug === '2-week-vietnam-itinerary-private-tour') {
    replacements.push(
      ['Fly from Hanoi to Da Nang (45 minutes), transfer to Hue (1.5 hours along one of Asia\'s great coastal roads).', 'Fly from Hanoi to Da Nang, then transfer to Hue. Confirm flight and road-transfer timings for your departure date before finalising the itinerary.'],
      ['hire a private cyclo to reach Minh Mang\'s tomb at Tu Duc.', 'arrange a private transfer to the royal tombs. Minh Mang and Tu Duc are separate sites; choose the visits with your guide.'],
      ['The 30-minute drive from Da Nang to Hoi An crosses the Hai Van Pass — ask your driver to stop at the top. The view down both coasts simultaneously is breath-taking.', 'Travel from Hue to Hoi An via the Hai Van Pass and Da Nang. The direct Da Nang–Hoi An transfer is a separate leg and does not cross the pass. Allow time for stops and confirm the road schedule with your driver.'],
    );
  }
  if (slug === 'first-time-visiting-vietnam-guide') {
    replacements.push(
      ['UK citizens can obtain an e-Visa online (evisa.gov.vn) for stays up to 90 days. Apply at least 3 working days before travel; approval usually comes within 24 hours. Cost: US$25. Save the approval letter and print it — some immigration officers still want a hard copy. If you are connecting through Bangkok or Singapore on the way, you may need that country\'s transit requirements too.', 'British citizen passport holders can generally visit for up to 45 days without a visa. For longer visits, check eligibility for an e-visa of up to 90 days. The official fee is US$25 for single entry or US$50 for multiple entry. Apply through evisa.gov.vn; do not rely on approval within 24 hours. Check GOV.UK and your transit country\'s rules before travel.'],
      ['No vaccinations are legally required for entry from the UK, but the NHS recommends Hepatitis A, Typhoid, and an up-to-date Tetanus. Malaria risk exists in some rural areas (not in cities or Halong Bay) — your GP will advise based on your specific itinerary.', 'Check the current GOV.UK Vietnam health and entry guidance, then ask a qualified travel-health professional about your itinerary and medical history. Entry declarations and vaccination requirements can change.'],
      ['Rates are roughly 30,000 VND to £1.', 'Check a current GBP/VND rate and your card provider\'s fees before budgeting.'],
    );
  }
  if (slug === 'the-ultimate-14-day-vietnam-itinerary-a-british-guide-to-going-private') {
    replacements.push(['(it’s GMT+6 over here)', '(Vietnam is UTC+7; the time difference from the UK changes with British Summer Time)']);
  }
  if (!replacements.length) return post;
  const correct = (value: unknown): unknown => {
    if (typeof value === 'string') return replacements.reduce((s, [from, to]) => s.replaceAll(from, to), value);
    if (Array.isArray(value)) return value.map(correct);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, correct(item)]));
    return value;
  };
  return { ...post, content: correct(post.content) as Post['content'] };
}
