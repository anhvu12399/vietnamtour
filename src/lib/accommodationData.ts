import type { Accommodation } from '@/sanity/types';

const consultedAt = '2026-11-01';

const illustrativePhotoNote =
  'Destination photograph for context; this is not a photograph of the hotel. Check the official property website for current room and facility images.';

export const curatedAccommodations: Accommodation[] = [
  {
    _id: 'curated-sunway-hotel-hanoi',
    name: 'Sunway Hotel Hanoi',
    slug: { current: 'sunway-hotel-hanoi' },
    location: 'Hai Ba Trung District, Hanoi',
    rating: '4-Star (hotel website description)',
    description: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Sunway Hotel Hanoi describes itself as a 4-star hotel on Pham Dinh Ho Street, near Hanoi’s French Quarter. Its website lists 143 rooms, a fitness centre, restaurant, lounge and meeting rooms. Check the property site for current room options, facilities, rates and availability.',
      }],
    }],
    features: ['143 rooms (property-published)', 'Fitness centre', 'Restaurant and lounge'],
    gallery: ['/images/commons/hanoi-1.jpg'],
    websiteUrl: 'https://www.sunwayhotels.com/sunway-hanoi',
    photoNote: illustrativePhotoNote,
    editorial: {
      sources: [
        { label: 'Sunway Hotel Hanoi: official property information and self-described rating', url: 'https://www.sunwayhotels.com/sunway-hanoi', accessedAt: consultedAt },
      ],
    },
  },
  {
    _id: 'curated-haian-beach-hotel-spa',
    name: 'HAIAN Beach Hotel & Spa',
    slug: { current: 'haian-beach-hotel-spa' },
    location: 'My An, Ngu Hanh Son District, Da Nang',
    rating: '4-Star (listed by Da Nang tourism authority)',
    description: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'HAIAN Beach Hotel & Spa is listed among Da Nang’s 4-star accommodation properties by the city tourism portal. The hotel’s official website gives its address as 278 Vo Nguyen Giap and describes its room offering. Confirm current facilities, room types and availability directly with the property.',
      }],
    }],
    features: ['Beachfront area', 'Room options listed by the property', 'Confirm current facilities with the hotel'],
    gallery: ['/images/commons/danang-1.jpg'],
    websiteUrl: 'https://haianbeachhotelspa.com/',
    photoNote: illustrativePhotoNote,
    editorial: {
      sources: [
        { label: 'Da Nang tourism portal: HAIAN Beach Hotel & Spa, 4-star listing', url: 'https://danangfantasticity.com/en/4-sao/haian-beach-hotel-spa', accessedAt: consultedAt },
        { label: 'HAIAN Beach Hotel & Spa: official website', url: 'https://haianbeachhotelspa.com/', accessedAt: consultedAt },
      ],
    },
  },
  {
    _id: 'curated-white-lotus-hue-hotel',
    name: 'White Lotus Hue Hotel',
    slug: { current: 'white-lotus-hue-hotel' },
    location: 'Hue City Centre, Hue',
    rating: '4-Star (listed in Vietnam tourism database)',
    description: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'White Lotus Hue is recorded as a 4-star hotel in Vietnam’s tourism accommodation database. The official listing gives its address as 05–07 Hoang Hoa Tham and records facilities including a restaurant, spa, fitness centre and pool. Contact the hotel to verify which facilities are operating and included for your dates.',
      }],
    }],
    features: ['City-centre address', 'Pool listed in the government database', 'Restaurant and spa listed in the government database'],
    gallery: ['/images/commons/hue-1.jpg'],
    websiteUrl: 'https://www.whitelotushotel.com/',
    photoNote: illustrativePhotoNote,
    editorial: {
      sources: [
        { label: 'Vietnam National Authority of Tourism: White Lotus Hue accommodation record', url: 'https://csdl.vietnamtourism.gov.vn/cslt/?item=16206', accessedAt: consultedAt },
        { label: 'White Lotus Hue Hotel: official website', url: 'https://www.whitelotushotel.com/', accessedAt: consultedAt },
      ],
    },
  },
];

export function getCuratedAccommodationBySlug(slug: string): Accommodation | undefined {
  return curatedAccommodations.find((accommodation) => accommodation.slug.current === slug);
}
