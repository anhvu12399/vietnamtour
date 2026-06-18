import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog / Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'factSheet',
      title: 'Journey Fact Sheet',
      type: 'object',
      description: 'Metadata displayed in the "At a Glance" fact sheet block',
      fields: [
        { name: 'pacing', type: 'string', title: 'Pacing (e.g. Bespoke & Leisurely)' },
        { name: 'bestMonths', type: 'string', title: 'Best Months (e.g. November – April)' },
        { name: 'duration', type: 'string', title: 'Duration (e.g. 14 Days / 13 Nights)' },
        { name: 'destinations', type: 'string', title: 'Destinations (e.g. Hanoi · Halong Bay · Hoi An)' },
        { name: 'operatorType', type: 'string', title: 'Operator Type (e.g. Private Jet/VIP Ground)' }
      ]
    }),
    defineField({
      name: 'sidebarTip',
      title: 'Intro Sidebar Specialist Tip',
      type: 'object',
      description: 'The specialist tip displayed in the introduction sidebar',
      fields: [
        { 
          name: 'specialist', 
          type: 'reference', 
          to: [{ type: 'specialist' }], 
          title: 'Specialist' 
        },
        { 
          name: 'tip', 
          type: 'text', 
          title: 'Tip Text' 
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: 'Image Block',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alternative Text' }
          ]
        },
        {
          type: 'object',
          name: 'specialistTip',
          title: 'Inline Specialist Tip',
          fields: [
            {
              name: 'specialist',
              type: 'reference',
              to: [{ type: 'specialist' }],
              title: 'Specialist Reference'
            },
            { name: 'customName', type: 'string', title: 'Custom Name Override' },
            { name: 'customRole', type: 'string', title: 'Custom Role Override' },
            { name: 'customAvatar', type: 'image', title: 'Custom Avatar Override' },
            { name: 'tip', type: 'text', title: 'Tip Text', validation: rule => rule.required() }
          ]
        },
        {
          type: 'object',
          name: 'pullQuote',
          title: 'Pull Quote Block',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote Text', validation: rule => rule.required() },
            { name: 'author', type: 'string', title: 'Author/Source' }
          ]
        }
      ],
    }),
    defineField({
      name: 'photoEssay',
      title: 'Bottom Photo Essay (3 Images)',
      type: 'array',
      description: 'Visual break collage of 3 images displayed at the bottom of the article',
      of: [
        {
          type: 'object',
          name: 'essayItem',
          title: 'Essay Item',
          fields: [
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'title', type: 'string', title: 'Title (e.g. Exclusive Dining)' },
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        }
      ],
      validation: (rule) => rule.max(3)
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
    }),
  ],
});
