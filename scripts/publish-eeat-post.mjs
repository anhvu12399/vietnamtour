import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'knxuvin4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skgyWLvpfJJaWSoaBLQXUw3KaI8WVqoTl0CVr1JcHOfL1pdE1ZD04dncxMO5WY85Uo2ZELrU8G5B83LfYRIgfJ668CaUDDbOu9kgNKyV1Eif8tTB95CrHyrdsFES981QLRqw7zB5aCPr8jC8zQ6wCD8WLu4zPoT6rwnWlSdtVd9dWkt9tUU1',
  useCdn: false,
});

async function publishEeatPost() {
  const doc = {
    _type: 'post',
    _id: 'best-places-to-visit-in-vietnam-local-operators-guide',
    title: "Best Places to Visit in Vietnam: A Local Operator's Guide",
    slug: {
      _type: 'slug',
      current: 'best-places-to-visit-in-vietnam-local-operators-guide'
    },
    publishedAt: '2026-07-04T12:00:00Z',
    excerpt: "Written by the Vietnam Tours team, based in Ho Chi Minh City, running tours across Vietnam since 2012. Every destination below has been visited by our own guides within the last 12 months.",
    heroAuthor: {
      name: 'Vietnam Tours Team',
      role: 'Local Operator'
    },
    content: [
      {
        _type: 'block',
        _key: 'intro-block-1',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: "Written by the Vietnam Tours team, based in Ho Chi Minh City, running tours across Vietnam since 2012. Every destination below has been visited by our own guides within the last 12 months. Prices and opening hours are cross-checked against official sources where available."
          }
        ],
        style: 'normal'
      }
    ]
  };

  console.log('Publishing post to Sanity...');
  await client.createOrReplace(doc);
  console.log('Post published successfully to Sanity CMS!');
}

publishEeatPost().catch(console.error);
