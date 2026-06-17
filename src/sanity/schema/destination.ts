export const destination = {
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
    },
    {
      name: 'featuredTours',
      title: 'Featured Tours',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'itinerary' }] }],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
    },
  ],
};
