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
          // ─── Core Pages ───────────────────────
          {
            route: '/',
            filter: '_type == "homepage"',
          },
          // ─── Destinations & Travel ────────────
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
          // ─── Editorial Content ────────────────
          {
            route: '/blog/:slug',
            filter: '_type == "blogPost" && slug.current == $slug',
          },
          {
            route: '/trip-ideas/:slug',
            filter: '_type == "tripIdea" && slug.current == $slug',
          },
          {
            route: '/things-to-do/:slug',
            filter: '_type == "thingToDo" && slug.current == $slug',
          },
          {
            route: '/ideas-by-month/:month',
            filter: '_type == "monthGuide" && slug.current == $month',
          },
          {
            route: '/inspiration/:slug',
            filter: '_type == "post" && slug.current == $slug',
          },
          {
            route: '/inspirations/:slug',
            filter: '_type == "inspiration" && slug.current == $slug',
          },
          // ─── Landing Pages (Singletons) ───────
          {
            route: '/tours',
            filter: '_type == "toursLanding"',
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
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Inspiration Article', href: `/inspiration/${doc.slug}` } : null
              ].filter(Boolean) as any
            })
          }),
          // ─── New document types ─────────────────
          blogPost: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Blog Post', href: `/blog/${doc.slug}` } : null,
              ].filter(Boolean) as any
            })
          }),
          tripIdea: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Trip Idea', href: `/trip-ideas/${doc.slug}` } : null,
              ].filter(Boolean) as any
            })
          }),
          thingToDo: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Thing to Do', href: `/things-to-do/${doc.slug}` } : null,
              ].filter(Boolean) as any
            })
          }),
          monthGuide: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Month Guide', href: `/ideas-by-month/${doc.slug}` } : null,
              ].filter(Boolean) as any
            })
          }),
          inspiration: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                doc?.slug ? { title: doc.title || 'Inspiration', href: `/inspirations/${doc.slug}` } : null,
              ].filter(Boolean) as any
            })
          }),
          toursLanding: defineLocations({
            select: {
              title: 'title',
            },
            resolve: () => ({
              locations: [
                { title: 'Tours Landing Page', href: '/tours' },
              ]
            })
          }),
        }
      },
      previewUrl: {
        origin:
          typeof window !== 'undefined'
            ? window.location.origin
            : process.env.NEXT_PUBLIC_VERCEL_URL
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
              : 'http://localhost:3000',
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
