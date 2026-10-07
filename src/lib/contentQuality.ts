// Quality gate: near-empty pages should not be indexed (and are kept out of the
// sitemap). Raise MIN_ITINERARY_WORDS as the catalogue improves.
import type { Itinerary } from '@/sanity/types';

export const MIN_ITINERARY_WORDS = 250;

interface PtBlock {
  children?: { text?: string }[];
}

function blockText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return '';
  return (blocks as PtBlock[])
    .map((b) => (b.children || []).map((c) => c.text || '').join(' '))
    .join(' ');
}

function words(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function itineraryWordCount(it: Itinerary): number {
  const parts = [
    it.intro || '',
    blockText(it.description),
    (it.highlights || []).join(' '),
    ...(it.timeline || []).map((t) => `${t.title || ''} ${blockText(t.description)}`),
  ];
  return words(parts.join(' '));
}

export function isThinItinerary(it: Itinerary): boolean {
  return itineraryWordCount(it) < MIN_ITINERARY_WORDS;
}
