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
    const homepage = await client.fetch(`*[_type == "homepage"][0]`);
    console.log('Homepage document from Sanity:', JSON.stringify(homepage, null, 2));
  } catch (err) {
    console.error('Error fetching homepage:', err);
  }
}

main();
