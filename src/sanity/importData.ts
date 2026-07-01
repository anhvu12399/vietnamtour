import { createClient } from '@sanity/client';
import { mockAccommodations, mockSpecialists, mockDestinations, mockItineraries } from './mockData';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const writeToken = process.env.SANITY_WRITE_TOKEN;

if (!writeToken) {
  console.error('ERROR: SANITY_WRITE_TOKEN is not defined in your environment.');
  console.error('Please get a Write/Editor token from sanity.io/manage and run:');
  console.error('export SANITY_WRITE_TOKEN="your_token" && npx tsx src/sanity/importData.ts');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-17',
  token: writeToken,
  useCdn: false,
});

async function importData() {
  try {
    console.log('Starting data import to Sanity CMS...');
    console.log(`Project ID: ${projectId}`);
    console.log(`Dataset: ${dataset}\n`);

    // 1. Import Accommodations
    console.log('Importing accommodations...');
    for (const acc of mockAccommodations) {
      const doc = {
        _type: 'accommodation',
        _id: acc._id, // Preserve ID for referencing
        name: acc.name,
        slug: acc.slug,
        location: acc.location,
        rating: acc.rating,
        description: acc.description,
        features: acc.features,
        gallery: acc.gallery,
        websiteUrl: acc.websiteUrl,
      };
      await client.createOrReplace(doc);
      console.log(`✓ Imported accommodation: ${acc.name} (${acc._id})`);
    }

    // 2. Import Specialists
    console.log('\nImporting specialists...');
    for (const spec of mockSpecialists) {
      const doc = {
        _type: 'specialist',
        _id: spec._id, // Preserve ID
        name: spec.name,
        slug: spec.slug,
        image: spec.image,
        role: spec.role,
        email: spec.email,
        phone: spec.phone,
        bio: spec.bio,
        favoriteDestinations: spec.favoriteDestinations,
        expertTips: spec.expertTips,
      };
      await client.createOrReplace(doc);
      console.log(`✓ Imported specialist: ${spec.name} (${spec._id})`);
    }

    // 3. Import Destinations
    console.log('\nImporting destinations...');
    for (const dest of mockDestinations) {
      const doc = {
        _type: 'destination',
        _id: dest._id, // Preserve ID
        name: dest.name,
        slug: dest.slug,
        image: dest.image,
        description: dest.description,
        highlights: dest.highlights,
        bestTimeToVisit: dest.bestTimeToVisit,
      };
      await client.createOrReplace(doc);
      console.log(`✓ Imported destination: ${dest.name} (${dest._id})`);
    }

    // 4. Import Itineraries
    console.log('\nImporting itineraries...');
    for (const it of mockItineraries) {
      // Convert objects back to references
      const accommodationsRefs = it.accommodations.map((acc: any) => ({
        _type: 'reference',
        _ref: acc._id,
        _key: acc._id,
      }));

      const specialistRef = {
        _type: 'reference',
        _ref: it.specialist._id,
      };

      const timelineMapped = it.timeline.map((item: any, idx: number) => {
        let accommodationField: any = undefined;
        if (item.accommodation) {
          if (typeof item.accommodation === 'object') {
            accommodationField = {
              _type: 'reference',
              _ref: item.accommodation._id,
            };
          } else {
            // Keep as string
            accommodationField = item.accommodation;
          }
        }

        return {
          _key: `timeline-item-${idx}`,
          dayRange: item.dayRange,
          title: item.title,
          description: item.description,
          ...(accommodationField && { accommodation: accommodationField }),
        };
      });

      const doc = {
        _type: 'itinerary',
        _id: it._id, // Preserve ID
        title: it.title,
        slug: it.slug,
        duration: it.duration,
        priceFrom: it.priceFrom,
        intro: it.intro,
        description: it.description,
        highlights: it.highlights,
        gallery: it.gallery,
        timeline: timelineMapped,
        accommodations: accommodationsRefs,
        specialist: specialistRef,
        featured: it.featured,
      };

      await client.createOrReplace(doc);
      console.log(`✓ Imported itinerary: ${it.title} (${it._id})`);
    }

    // 5. Import Homepage Singleton
    console.log('\nImporting default homepage...');
    const defaultHomepage = {
      _type: 'homepage',
      _id: 'homepage-singleton',
      title: 'Vietnam Tour Homepage (Default)',
      heroHeading: 'The Art of Travel',
      heroSubheading: 'Where Your Journey Meets Our Legacy',
      introHeading: 'Tailor-Made Luxury Holidays with Vietnam Tour',
      introParagraph1: 'Since our founding, we have worked tirelessly to become the premier luxury travel operator for Vietnam. With our seamless service, deep insider insights, and carefully curated collection, we design one-of-a-kind experiences.',
      introParagraph2: 'Delve deep into destinations on privately guided tours, enjoy exclusive access to the country\'s most sought-after sites, and embark on journeys that are truly out of the ordinary.',
      artOfTravelHeading: 'The Art of Travel',
      artOfTravelText: 'Vietnam Tour has transformed travel into an art form. Every journey taken is shaped by decades of expertise and an enduring passion for exploration. Where your journey meets our legacy is not simply a promise, but an invitation to experience travel crafted with care, enriched by history, and designed to inspire for generations to come.',
      finalCtaHeading: 'Draft Your Dream Itinerary',
      finalCtaSubtext: 'Every holiday we design is unique. Speak directly to Alice Mercer or James Harrison to tailor your travel dates, properties, and dining pacing.',
      gridCategories: [
        {
          _key: 'grid-cat-0',
          title: 'A Lifetime of Memories',
          image: '/images/vietnamtour_halong_yacht_luxury.png',
          link: '/itineraries/the-grand-tour-of-vietnam'
        },
        {
          _key: 'grid-cat-1',
          title: 'Elite Resort Offers',
          image: '/images/vietnamtour_amanoi_villa.png',
          link: '/accommodations'
        },
        {
          _key: 'grid-cat-2',
          title: 'Best Winter Sun Spots',
          image: '/images/vietnamtour_phu_quoc_beach.png',
          link: '/destinations/phu-quoc-island'
        },
        {
          _key: 'grid-cat-3',
          title: 'Top Culinary Expeditions',
          image: '/images/vietnamtour_cave_dining.png',
          link: '/itineraries/vietnamese-culinary-and-culture-journey'
        },
        {
          _key: 'grid-cat-4',
          title: 'Bucket List Journeys',
          image: '/images/vietnamtour_sapa_lodge.png',
          link: '/itineraries'
        },
        {
          _key: 'grid-cat-5',
          title: 'Active & Wilderness',
          image: '/images/vietnamtour_mekong_sampan.png',
          link: '/destinations/hanoi-and-the-north'
        }
      ],
      seoTitle: 'VietnamTour.co.uk | Luxury Bespoke Travel Vietnam',
      seoDescription: 'Experience ultra-luxury travel in Vietnam. Fully bespoke itineraries curated by local specialists.',
    };
    await client.createOrReplace(defaultHomepage);
    console.log('✓ Imported homepage singleton');

    console.log('\n=============================================');
    console.log('SUCCESS: All luxury mock datasets successfully imported!');
    console.log('Refresh your Sanity Studio at /studio to view and edit the live content.');
    console.log('=============================================');

  } catch (error) {
    console.error('Import failed:', error);
  }
}

importData();
