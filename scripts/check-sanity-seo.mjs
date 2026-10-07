import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'knxuvin4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skgyWLvpfJJaWSoaBLQXUw3KaI8WVqoTl0CVr1JcHOfL1pdE1ZD04dncxMO5WY85Uo2ZELrU8G5B83LfYRIgfJ668CaUDDbOu9kgNKyV1Eif8tTB95CrHyrdsFES981QLRqw7zB5aCPr8jC8zQ6wCD8WLu4zPoT6rwnWlSdtVd9dWkt9tUU1',
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
