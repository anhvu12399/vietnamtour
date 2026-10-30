import { publicSpecialist } from './team';
import catalogue from './tours_data.json';
import type { Itinerary } from '@/sanity/types';

interface CatalogueTour {
  title: string;
  slug: string;
  duration: number;
  priceFrom: number;
  intro: string;
  highlights: string[];
  gallery: string[];
  timeline: { dayRange: string; title: string; description: string[]; accommodation: string }[];
}

const paragraph = (text: string, key: string) => ({
  _type: 'block', _key: key, style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: `${key}-text`, text, marks: [] }],
});

// Preserve the existing published catalogue without inventing replacement tours.
// CMS documents take precedence over this archived local source for the same slug.
export function mergeItineraryCatalogue(published: Itinerary[]): Itinerary[] {
  const bySlug = new Map<string, Itinerary>();
  for (const tour of Object.values(catalogue) as CatalogueTour[]) {
    const days = new Map<string, CatalogueTour['timeline'][number]>();
    for (const day of tour.timeline) {
      const key = `${day.dayRange}:${day.title}`;
      const previous = days.get(key);
      if (!previous || day.description.join(' ').length > previous.description.join(' ').length) days.set(key, day);
    }
    bySlug.set(tour.slug, {
      _id: `catalogue-${tour.slug}`, title: tour.title, slug: { current: tour.slug },
      duration: tour.duration, priceFrom: tour.priceFrom, intro: tour.intro,
      description: [paragraph(tour.intro, 'intro')], highlights: tour.highlights,
      gallery: tour.gallery, accommodations: [], featured: false, catalogueSource: 'archive',
      specialist: {
        _id: 'travel-team', name: 'VietnamTours travel team', slug: { current: '' },
        role: 'Trip planning', image: '', email: 'info@vietnamtours.co.uk', phone: '+84988600388',
        bio: [], favoriteDestinations: [], expertTips: [],
      },
      timeline: [...days.values()].map((day, i) => ({
        dayRange: day.dayRange, title: day.title,
        description: day.description.filter((p) => !p.startsWith('Enjoy your day exploring the beautiful highlights')).map((p, j) => paragraph(p, `day-${i}-${j}`)),
        accommodation: day.accommodation,
      })),
    });
  }
  for (const tour of published) {
    if (tour.slug?.current) bySlug.set(tour.slug.current, { ...tour, specialist: publicSpecialist(tour.specialist) });
  }
  return [...bySlug.values()];
}
