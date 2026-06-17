import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineDocuments, defineLocations } from 'sanity/presentation';
import { schemaTypes } from './sanity/schema';
import { structure } from './sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'knxuvin4';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Vietnam Tour Admin',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: '_type == "homepage"',
          },
          {
            route: '/destinations/:slug',
            filter: '_type == "destination" && slug.current == $slug',
          },
          {
            route: '/accommodations/:slug',
            filter: '_type == "accommodation" && slug.current == $slug',
          },
          {
            route: '/itineraries/:slug',
            filter: '_type == "itinerary" && slug.current == $slug',
          },
          {
            route: '/destinations/:destinationSlug/cruises/:slug',
            filter: '_type == "cruise" && slug.current == $slug && destination->slug.current == $destinationSlug',
          },
          {
            route: '/destinations/:destinationSlug/blog/:slug',
            filter: '_type == "travelGuide" && slug.current == $slug && destination->slug.current == $destinationSlug',
          },
        ]),
        locations: {
          homepage: defineLocations({
            select: {
              title: 'title',
            },
            resolve: () => ({
              locations: [
                { title: 'Home', href: '/' }
              ]
            })
          }),
          destination: defineLocations({
            select: {
              title: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Destination', href: `/destinations/${doc.slug}` } : null
              ].filter(Boolean) as any
            })
          }),
          accommodation: defineLocations({
            select: {
              title: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Accommodation', href: `/accommodations/${doc.slug}` } : null
              ].filter(Boolean) as any
            })
          }),
          itinerary: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
              destinationSlug: 'destination->slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Itinerary', href: `/itineraries/${doc.slug}` } : null,
                doc?.slug && doc?.destinationSlug ? { title: `${doc.title} (Region Tour)`, href: `/destinations/${doc.destinationSlug}/tours/${doc.slug}` } : null
              ].filter(Boolean) as any
            })
          }),
          cruise: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
              destinationSlug: 'destination->slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug && doc?.destinationSlug ? { title: doc.title || 'Cruise', href: `/destinations/${doc.destinationSlug}/cruises/${doc.slug}` } : null
              ].filter(Boolean) as any
            })
          }),
          travelGuide: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
              destinationSlug: 'destination->slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug && doc?.destinationSlug ? { title: doc.title || 'Travel Guide', href: `/destinations/${doc.destinationSlug}/blog/${doc.slug}` } : null
              ].filter(Boolean) as any
            })
          }),
        }
      },
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
