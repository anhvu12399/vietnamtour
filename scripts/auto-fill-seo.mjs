import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'knxuvin4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skgyWLvpfJJaWSoaBLQXUw3KaI8WVqoTl0CVr1JcHOfL1pdE1ZD04dncxMO5WY85Uo2ZELrU8G5B83LfYRIgfJ668CaUDDbOu9kgNKyV1Eif8tTB95CrHyrdsFES981QLRqw7zB5aCPr8jC8zQ6wCD8WLu4zPoT6rwnWlSdtVd9dWkt9tUU1',
  useCdn: false,
});

async function run() {
  console.log('1. Fetching and updating itineraries in Sanity...');
  const itineraries = await client.fetch('*[_type == "itinerary"]{ _id, title, duration, destination->{ name }, highlights, seo }');
  
  for (const it of itineraries) {
    const destName = it.destination?.name || 'Vietnam';
    const baseKeywords = [
      it.title,
      `${it.title} private tour`,
      `${it.title} itinerary`,
      `${destName} private tour`,
      `${destName} tailor-made holiday`,
      `${it.duration} days in Vietnam`,
      `${it.duration} day Vietnam tour`,
      `Vietnam private tour`,
      `Luxury Vietnam holiday`,
      `Bespoke Vietnam holiday`,
      `Tailor-made Vietnam tour`,
      `Vietnam custom itinerary`,
      `Vietnam tour specialist`
    ];
    
    if (it.highlights && Array.isArray(it.highlights)) {
      it.highlights.slice(0, 3).forEach(h => {
        baseKeywords.push(`${h} tour`);
      });
    }

    const uniqueKeywords = Array.from(new Set(baseKeywords.filter(Boolean)));
    const metaTitle = it.seo?.metaTitle || `${it.title} | ${it.duration} Days Private Tour`;
    const metaDescription = it.seo?.metaDescription || `Experience the ultimate ${it.duration}-day private guided tour of ${destName}. Customisable itinerary, handpicked boutique luxury hotels, and authentic local experiences.`;

    const updatedSeo = {
      _type: 'seoFields',
      metaTitle: metaTitle.slice(0, 70),
      metaDescription: metaDescription.slice(0, 160),
      keywords: uniqueKeywords,
      canonicalUrl: `https://www.vietnamtours.co.uk/itineraries/${it._id}`,
      noIndex: false
    };

    await client.patch(it._id).set({ seo: updatedSeo }).commit();
    console.log(`- Updated SEO for Itinerary: "${it.title}"`);
  }

  console.log('\n2. Fetching and updating posts (Travel Guides) in Sanity...');
  const posts = await client.fetch('*[_type == "post"]{ _id, title, slug, excerpt, seo, mainImage }');
  
  for (const p of posts) {
    const metaTitle = p.seo?.metaTitle || `${p.title} | Vietnam Travel Guide`;
    const metaDescription = p.seo?.metaDescription || p.excerpt || `Read our expert guide on "${p.title}" for insider tips and local recommendations on your luxury holiday to Vietnam.`;
    const keywords = p.seo?.keywords || [
      p.title,
      'Vietnam travel guide',
      'Vietnam travel tips',
      'Vietnam private tours',
      'Vietnam luxury holidays'
    ];

    const updatedSeo = {
      _type: 'seoFields',
      metaTitle: metaTitle.slice(0, 70),
      metaDescription: metaDescription.slice(0, 160),
      keywords: keywords,
      canonicalUrl: `https://www.vietnamtours.co.uk/travel-guides/${p.slug?.current || p._id}`,
      noIndex: false
    };

    await client.patch(p._id).set({ seo: updatedSeo }).commit();
    console.log(`- Updated SEO for Post: "${p.title}"`);
  }

  console.log('\n3. Migrating and populating blogPost documents from post documents...');
  for (const p of posts) {
    const blogPostId = `blogPost-${p._id.replace('post-', '')}`;
    const slug = p.slug?.current || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const blogPostDoc = {
      _id: blogPostId,
      _type: 'blogPost',
      title: p.title,
      slug: { _type: 'slug', current: slug },
      publishedAt: p.publishedAt || new Date().toISOString(),
      excerpt: p.excerpt || '',
      category: 'Travel Tips',
      content: p.content || [],
      tags: ['vietnam', 'travel tips'],
      seo: {
        _type: 'seoFields',
        metaTitle: `${p.title} | Vietnam Travel Blog`.slice(0, 70),
        metaDescription: (p.excerpt || `Read our travel blog about ${p.title}.`).slice(0, 160),
        keywords: [p.title, 'Vietnam travel blog', 'Vietnam travel tips'],
        canonicalUrl: `https://www.vietnamtours.co.uk/blog/${slug}`,
        noIndex: false
      }
    };

    // Copy mainImage to featuredImage if it exists
    const fullPost = await client.fetch(`*[_id == "${p._id}"][0]{ mainImage }`);
    if (fullPost && fullPost.mainImage) {
      blogPostDoc.featuredImage = {
        _type: 'image',
        asset: fullPost.mainImage.asset,
        alt: p.title
      };
    }

    await client.createOrReplace(blogPostDoc);
    console.log(`- Created blogPost: "${p.title}" with id: "${blogPostId}"`);
  }

  console.log('\nAll Sanity SEO auto-fills and blogPost migrations completed successfully!');
}

run().catch(console.error);
