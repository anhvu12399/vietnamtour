// Sensible, factual defaults for answer-first blocks when the CMS has no
// hand-written `answerSummary` / `geoFaqs`. Uses only data we already hold
// (duration, price, destination fields) — never invented claims.
import type { Destination, Itinerary } from '@/sanity/types';
import { absoluteUrl } from '@/lib/siteConfig';

export interface GeoFaq {
  question: string;
  answer: string;
}

export function itineraryAnswer(it: Itinerary): string {
  if (it.answerSummary?.trim()) return it.answerSummary.trim();
  const price = it.priceFrom ? ` from £${it.priceFrom.toLocaleString('en-GB')} per person` : '';
  const dest = it.destination?.name ? ` in ${it.destination.name}` : ' in Vietnam';
  const highlights = (it.highlights || []).slice(0, 3).join(', ');
  return `${it.title} is a ${it.duration}-day private, tailor-made tour${dest}${price}, with a dedicated guide and driver. ${highlights ? `Highlights include ${highlights}. ` : ''}The itinerary and hotels can be adjusted to your dates and interests.`.replace(/\s+/g, ' ').trim();
}

export function itineraryFaqs(it: Itinerary): GeoFaq[] {
  if (it.geoFaqs && it.geoFaqs.length > 0) return it.geoFaqs;
  const faqs: GeoFaq[] = [];
  if (it.priceFrom) {
    faqs.push({
      question: `How much does the ${it.title} cost?`,
      answer: `Prices start from £${it.priceFrom.toLocaleString('en-GB')} per person for ${it.duration} days. The final price depends on travel dates, hotel choices, group size and any extras, and is confirmed in a written quote in pounds sterling.`,
    });
  }
  faqs.push(
    {
      question: `How long is the ${it.title}?`,
      answer: `It is a ${it.duration}-day itinerary. The route can be shortened, extended or rearranged by your travel specialist.`,
    },
    {
      question: 'Is this a private tour?',
      answer: 'Yes. Journeys are private and tailor-made, with your own guide and vehicle, so the pace and activities can be adapted to your group.',
    },
    {
      question: 'Do UK citizens need a visa for Vietnam?',
      answer: `UK passport holders currently receive visa-free entry for up to 45 days, and an e-visa is available for longer stays. Rules change, so confirm on the official sources listed in our visa guide: ${absoluteUrl('/vietnam-guides/vietnam-visa-for-uk-citizens')}.`,
    },
    {
      question: 'When is the best time to go?',
      answer: `It depends on the regions on your route: the north is best roughly October–April, the centre February–August and the south December–April. See our month-by-month guide for UK travellers: ${absoluteUrl('/vietnam-guides/best-time-to-visit-vietnam-uk-travellers')}.`,
    },
  );
  return faqs;
}

export function destinationAnswer(d: Destination): string {
  if (d.answerSummary?.trim()) return d.answerSummary.trim();
  const hl = (d.highlights || []).slice(0, 3).join(', ');
  const best = d.bestTimeToVisit ? ` The best time to visit is ${d.bestTimeToVisit}.` : '';
  return `${d.name} is one of the regions we include on private, tailor-made Vietnam tours for UK travellers.${hl ? ` Highlights include ${hl}.` : ''}${best}`.replace(/\s+/g, ' ').trim();
}

export function destinationFaqs(d: Destination): GeoFaq[] {
  if (d.geoFaqs && d.geoFaqs.length > 0) return d.geoFaqs;
  const faqs: GeoFaq[] = [];
  if (d.bestTimeToVisit) {
    faqs.push({ question: `When is the best time to visit ${d.name}?`, answer: `${d.bestTimeToVisit}. Weather differs across Vietnam, so plan the route and dates together with your specialist.` });
  }
  if (d.highlights?.length) {
    faqs.push({ question: `What are the highlights of ${d.name}?`, answer: d.highlights.slice(0, 6).join('; ') + '.' });
  }
  faqs.push({
    question: `Can I visit ${d.name} on a private tour from the UK?`,
    answer: `Yes. ${d.name} can be combined with other regions on a tailor-made private itinerary with a dedicated guide and driver, quoted in pounds sterling.`,
  });
  return faqs;
}
