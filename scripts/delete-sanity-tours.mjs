// Script to delete all Sanity itineraries (the 3 default ones)
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'knxuvin4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skgyWLvpfJJaWSoaBLQXUw3KaI8WVqoTl0CVr1JcHOfL1pdE1ZD04dncxMO5WY85Uo2ZELrU8G5B83LfYRIgfJ668CaUDDbOu9kgNKyV1Eif8tTB95CrHyrdsFES981QLRqw7zB5aCPr8jC8zQ6wCD8WLu4zPoT6rwnWlSdtVd9dWkt9tUU1',
  useCdn: false,
});

async function deleteAllItineraries() {
  const docs = await client.fetch(`*[_type == "itinerary"]{ _id, title }`);
  console.log(`Found ${docs.length} itineraries to delete:`);
  docs.forEach((d: any) => console.log(`  - ${d._id}: ${d.title}`));

  for (const doc of docs) {
    await client.delete(doc._id);
    console.log(`Deleted: ${doc.title}`);
  }
  console.log('Done!');
}

deleteAllItineraries().catch(console.error);
