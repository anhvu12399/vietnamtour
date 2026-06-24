import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-17',
  token,
  useCdn: false,
});

async function main() {
  try {
    const specialists = await client.fetch(`*[_type == "specialist"]`);
    const destinations = await client.fetch(`*[_type == "destination"]`);
    const accommodations = await client.fetch(`*[_type == "accommodation"]`);
    const itineraries = await client.fetch(`*[_type == "itinerary"]`);

    console.log('--- SPECIALISTS ---');
    specialists.forEach((s: any) => {
      console.log(`${s.name}: image type = ${typeof s.image}`, JSON.stringify(s.image));
    });

    console.log('--- DESTINATIONS ---');
    destinations.forEach((d: any) => {
      console.log(`${d.name}: image type = ${typeof d.image}`, JSON.stringify(d.image));
    });

    console.log('--- ACCOMMODATIONS ---');
    accommodations.forEach((a: any) => {
      console.log(`${a.name}: gallery types =`, a.gallery?.map((img: any) => typeof img));
    });

    console.log('--- ITINERARIES ---');
    itineraries.forEach((it: any) => {
      console.log(`${it.title}: gallery types =`, it.gallery?.map((img: any) => typeof img));
    });

  } catch (err) {
    console.error('Error:', err);
  }
}

main();
