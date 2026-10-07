import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Vietnam Tour Content')
    .items([
      // 1. Main Pages
      S.listItem()
        .title('Main Pages')
        .child(
          S.list()
            .title('Main Pages')
            .items([
              S.listItem()
                .title('Homepage')
                .child(S.document().schemaType('homepage').documentId('homepage')),
              S.listItem()
                .title('About Us')
                .child(S.document().schemaType('about').documentId('about')),
              S.listItem()
                .title('Tours Landing Page')
                .child(S.document().schemaType('toursLanding').documentId('toursLanding')),
            ])
        ),
      
      S.divider(),
      
      // 2. Destinations & Travel Guides
      S.listItem()
        .title('Destinations & Travel Guides')
        .child(
          S.list()
            .title('Destinations & Guides')
            .items([
              S.documentTypeListItem('destination').title('Destinations'),
              S.documentTypeListItem('travelGuide').title('Travel Guides'),
            ])
        ),
      
      S.divider(),
      
      // 3. Tour Packages & Cruises
      S.listItem()
        .title('Tour Packages & Cruises')
        .child(
          S.list()
            .title('Tours & Cruises')
            .items([
              S.documentTypeListItem('itinerary').title('Land Tours (Itineraries)'),
              S.documentTypeListItem('cruise').title('Cruises'),
            ])
        ),
      
      S.divider(),
      
      // 4. Editorial Content
      S.listItem()
        .title('Editorial Content')
        .child(
          S.list()
            .title('Editorial')
            .items([
              S.documentTypeListItem('blogPost').title('📝 Blog Posts'),
              S.documentTypeListItem('post').title('📰 Inspiration Articles'),
              S.documentTypeListItem('tripIdea').title('💡 Trip Ideas'),
              S.documentTypeListItem('inspiration').title('✨ Inspiration Pages'),
              S.documentTypeListItem('thingToDo').title('🎯 Things to Do'),
              S.documentTypeListItem('monthGuide').title('📅 Month Guides'),
            ])
        ),
      
      S.divider(),
      
      // 5. Media Library
      S.listItem()
        .title('Media Library')
        .child(
          S.documentTypeList('mediaAsset').title('Media Assets')
        ),
      
      S.divider(),
      
      // 6. System & Operations
      S.listItem()
        .title('System & Operations')
        .child(
          S.list()
            .title('Operations')
            .items([
              S.documentTypeListItem('accommodation').title('Accommodations'),
              S.documentTypeListItem('specialist').title('Specialists'),
              S.documentTypeListItem('enquiry').title('Enquiries'),
            ])
        ),
    ]);
