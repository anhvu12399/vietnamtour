export const specialist = {
  name: 'specialist',
  title: 'Specialist',
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
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Designation (e.g. Lead Vietnam Specialist)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Direct Phone Number',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Biography & Travel Philosophy',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'favoriteDestinations',
      title: 'Favorite Places in Vietnam',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'expertTips',
      title: 'Expert Insider Tips',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
