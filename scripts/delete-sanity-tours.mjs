// Script to delete all Sanity itineraries (the 3 default ones)
import { createClient } from '@sanity/client';

if (!process.env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN is required');

const client = createClient({
  projectId: 'knxuvin4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function deleteAllItineraries() {
  const docs = await client.fetch(`*[_type == "itinerary"]{ _id, title }`);
  console.log(`Found ${docs.length} itineraries to delete:`);
  docs.forEach((d) => console.log(`  - ${d._id}: ${d.title}`));

  for (const doc of docs) {
    await client.delete(doc._id);
    console.log(`Deleted: ${doc.title}`);
  }
  console.log('Done!');
}

deleteAllItineraries().catch(console.error);
