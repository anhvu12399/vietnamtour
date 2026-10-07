import { getItineraries } from '@/sanity/client';

/**
 * Lowest "from" price (GBP, per person) among multi-day itineraries (7+ days),
 * so meta descriptions never promise a price the catalogue does not sell.
 * Returns null when the catalogue cannot be read.
 */
export async function getMultiDayStartingPrice(): Promise<number | null> {
  try {
    const itineraries = await getItineraries();
    const prices = itineraries
      .filter((it) => it.duration >= 7 && it.priceFrom > 0)
      .map((it) => it.priceFrom);
    return prices.length ? Math.min(...prices) : null;
  } catch {
    return null;
  }
}

export function fromPriceLabel(price: number | null): string {
  return price ? ` From £${price.toLocaleString('en-GB')} per person.` : '';
}
