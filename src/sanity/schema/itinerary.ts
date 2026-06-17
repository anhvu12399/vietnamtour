export const itinerary = {
  name: 'itinerary',
  title: 'Itinerary',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration (Days)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'priceFrom',
      title: 'Price From (£ GBP)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'intro',
      title: 'Intro Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Detailed Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'highlights',
      title: 'Trip Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'mapImage',
      title: 'Map Image',
      type: 'image',
    },
    {
      name: 'timeline',
      title: 'Timeline (Day-by-Day)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dayItem',
          title: 'Day Item',
          fields: [
            { name: 'dayRange', title: 'Day Range (e.g. Day 1-2)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
            {
              name: 'accommodation',
              title: 'Featured Accommodation',
              type: 'reference',
              to: [{ type: 'accommodation' }],
            },
          ],
        },
      ],
    },
    {
      name: 'accommodations',
      title: 'Included Accommodations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'accommodation' }] }],
    },
    {
      name: 'specialist',
      title: 'Assigned Specialist',
      type: 'reference',
      to: [{ type: 'specialist' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Trip',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
