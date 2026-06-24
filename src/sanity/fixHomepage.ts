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

async function main() {
  try {
    console.log('Fetching homepage document from Sanity...');
    const homepage = await client.fetch(`*[_type == "homepage" && _id == "homepage-singleton"][0]`);
    if (!homepage) {
      console.error('No homepage document found with ID "homepage-singleton"');
      return;
    }

    console.log('Homepage found. Checking gridCategories...');
    if (!homepage.gridCategories || !Array.isArray(homepage.gridCategories)) {
      console.log('No gridCategories array found or it is not an array.');
      return;
    }

    const updatedGridCategories = [];

    for (const item of homepage.gridCategories) {
      console.log(`\nProcessing item: "${item.title}"`);
      
      // If the image is a string, we need to upload it and replace it with an asset reference object.
      if (typeof item.image === 'string') {
        const imagePath = item.image;
        // The image path is relative to public, e.g. /images/vietnamtour_halong_yacht_luxury.png
        const fullLocalPath = path.join(process.cwd(), 'public', imagePath);
        
        console.log(`Image is a string: "${imagePath}". Local path: "${fullLocalPath}"`);
        
        if (fs.existsSync(fullLocalPath)) {
          console.log(`Uploading local file to Sanity...`);
          const asset = await client.assets.upload('image', fs.createReadStream(fullLocalPath), {
            filename: path.basename(fullLocalPath),
          });
          console.log(`✓ Image uploaded successfully. Asset ID: ${asset._id}`);
          
          updatedGridCategories.push({
            ...item,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
            },
          });
        } else {
          console.warn(`⚠ Local file does not exist at "${fullLocalPath}". Setting image to undefined so user can upload it.`);
          const { image, ...rest } = item;
          updatedGridCategories.push(rest);
        }
      } else {
        console.log(`Image is already an object or undefined. Keeping as is.`);
        updatedGridCategories.push(item);
      }
    }

    console.log('\nUpdating homepage document in Sanity...');
    await client
      .patch('homepage-singleton')
      .set({ gridCategories: updatedGridCategories })
      .commit();
    
    console.log('✓ Homepage document updated successfully!');
    
  } catch (err) {
    console.error('Error in script:', err);
  }
}

main();
