import type { Rule, PreviewValue } from 'sanity';
export const specialist = {
  name: 'specialist',
  title: 'Specialist',
  type: 'document',
  fields: [
    { name: 'profileVerified', title: 'Profile checked and approved for publication', type: 'boolean', initialValue: false, description: 'Only enable for a real team member with consent and a checked public professional profile.' },
    { name: 'profileEvidenceUrl', title: 'Public professional profile or team biography', type: 'url' },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Designation (e.g. Lead Vietnam Specialist)',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
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
