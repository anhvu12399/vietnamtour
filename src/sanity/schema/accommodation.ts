export const accommodation = {
  name: 'accommodation',
  title: 'Accommodation',
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
      name: 'location',
      title: 'Location (e.g. Nha Trang, Vietnam)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Luxury Rating (e.g. 5-Star Ultra-Luxury)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'features',
      title: 'Key Features & Amenities',
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
      name: 'websiteUrl',
      title: 'Official Website URL',
      type: 'url',
    },
  ],
};
