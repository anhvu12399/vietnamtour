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

    console.log('\n=============================================');
    console.log('SUCCESS: All luxury mock datasets successfully imported!');
    console.log('Refresh your Sanity Studio at /studio to view and edit the live content.');
    console.log('=============================================');

  } catch (error) {
    console.error('Import failed:', error);
  }
}

importData();
