import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('ERROR: SANITY_WRITE_TOKEN is not defined in your environment.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-17',
  token,
  useCdn: false,
});

async function uploadImageIfNeeded(imageVal: any): Promise<any> {
  if (typeof imageVal !== 'string') {
    return imageVal; // Already an object or null/undefined
  }

  // The path in Sanity will be like "/images/specialist_alice.png"
  const localPath = path.join(process.cwd(), 'public', imageVal);
  if (!fs.existsSync(localPath)) {
    console.warn(`  ⚠ Local image does not exist: ${localPath}`);
    return undefined; // Set to undefined if local file doesn't exist
  }

  console.log(`  Uploading image: ${imageVal}...`);
  const asset = await client.assets.upload('image', fs.createReadStream(localPath), {
    filename: path.basename(localPath),
  });
  console.log(`  ✓ Uploaded. Asset ID: ${asset._id}`);
  
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function main() {
  try {
    // 1. Specialists
    console.log('--- Checking Specialists ---');
    const specialists = await client.fetch(`*[_type == "specialist"]`);
    for (const spec of specialists) {
      console.log(`Specialist: ${spec.name} (${spec._id})`);
      if (typeof spec.image === 'string') {
        const newImageObj = await uploadImageIfNeeded(spec.image);
        await client.patch(spec._id).set({ image: newImageObj }).commit();
        console.log(`✓ Specialist ${spec.name} updated.`);
      } else {
        console.log(`- Specialist ${spec.name} already has correct type.`);
      }
    }

    // 2. Destinations
    console.log('\n--- Checking Destinations ---');
    const destinations = await client.fetch(`*[_type == "destination"]`);
    for (const dest of destinations) {
      console.log(`Destination: ${dest.name} (${dest._id})`);
      if (typeof dest.image === 'string') {
        const newImageObj = await uploadImageIfNeeded(dest.image);
        await client.patch(dest._id).set({ image: newImageObj }).commit();
        console.log(`✓ Destination ${dest.name} updated.`);
      } else {
        console.log(`- Destination ${dest.name} already has correct type.`);
      }
    }

    // 3. Accommodations
    console.log('\n--- Checking Accommodations ---');
    const accommodations = await client.fetch(`*[_type == "accommodation"]`);
    for (const acc of accommodations) {
      console.log(`Accommodation: ${acc.name} (${acc._id})`);
      if (acc.gallery && Array.isArray(acc.gallery)) {
        let needsUpdate = false;
        const newGallery = [];
        
        for (const item of acc.gallery) {
          if (typeof item === 'string') {
            needsUpdate = true;
            const newImgObj = await uploadImageIfNeeded(item);
            if (newImgObj) {
              newGallery.push(newImgObj);
            }
          } else {
            newGallery.push(item);
          }
        }

        if (needsUpdate) {
          await client.patch(acc._id).set({ gallery: newGallery }).commit();
          console.log(`✓ Accommodation ${acc.name} gallery updated.`);
        } else {
          console.log(`- Accommodation ${acc.name} gallery already has correct type.`);
        }
      }
    }

    // 4. Itineraries
    console.log('\n--- Checking Itineraries ---');
    const itineraries = await client.fetch(`*[_type == "itinerary"]`);
    for (const it of itineraries) {
      console.log(`Itinerary: ${it.title} (${it._id})`);
      if (it.gallery && Array.isArray(it.gallery)) {
        let needsUpdate = false;
        const newGallery = [];

        for (const item of it.gallery) {
          if (typeof item === 'string') {
            needsUpdate = true;
            const newImgObj = await uploadImageIfNeeded(item);
            if (newImgObj) {
              newGallery.push(newImgObj);
            }
          } else {
            newGallery.push(item);
          }
        }

        if (needsUpdate) {
          await client.patch(it._id).set({ gallery: newGallery }).commit();
          console.log(`✓ Itinerary ${it.title} gallery updated.`);
        } else {
          console.log(`- Itinerary ${it.title} gallery already has correct type.`);
        }
      }
    }

    console.log('\n=============================================');
    console.log('SUCCESS: All documents successfully migrated to proper image objects!');
    console.log('=============================================');

  } catch (err) {
    console.error('Migration failed:', err);
  }
}

main();
