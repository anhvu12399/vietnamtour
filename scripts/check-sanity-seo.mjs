import { createClient } from '@sanity/client';

if (!process.env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN is required');

const client = createClient({
  projectId: 'knxuvin4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  const itineraries = await client.fetch('*[_type == "itinerary"]{ _id, title, slug, seo }');
  console.log('=== ITINERARIES ===');
  itineraries.forEach(it => {
    console.log(`- ID: ${it._id}, Title: "${it.title}", Slug: "${it.slug?.current}", SEO:`, JSON.stringify(it.seo));
  });

  const blogPosts = await client.fetch('*[_type == "blogPost"]{ _id, title, slug, excerpt, seo }');
  console.log('\n=== BLOG POSTS ===');
  blogPosts.forEach(bp => {
    console.log(`- ID: ${bp._id}, Title: "${bp.title}", Slug: "${bp.slug?.current}", Excerpt: "${bp.excerpt}", SEO:`, JSON.stringify(bp.seo));
  });

  const posts = await client.fetch('*[_type == "post"]{ _id, title, slug, excerpt, seo }');
  console.log('\n=== POSTS (TRAVEL GUIDES) ===');
  posts.forEach(p => {
    console.log(`- ID: ${p._id}, Title: "${p.title}", Slug: "${p.slug?.current}", Excerpt: "${p.excerpt}", SEO:`, JSON.stringify(p.seo));
  });
}

run().catch(console.error);
