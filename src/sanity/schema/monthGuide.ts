import { defineField, defineType } from 'sanity';

export const monthGuide = defineType({
  name: 'monthGuide',
  title: 'Month Guide Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '① Hero & Header', default: true },
    { name: 'content', title: '② Lead & Body Sections' },
    { name: 'highlights', title: '③ Highlights & Sidebar' },
    { name: 'faqs', title: '④ FAQs' },
    { name: 'cta', title: '⑤ CTA & Cross-Links' },
    { name: 'seo', title: '⑥ SEO Metadata' },
  ],
  fields: [
    // Hero Group
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main H1 heading (e.g., Vietnam in January: Best Places to Visit & Travel Guide)',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL path (e.g., /ideas-by-month/january)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'The subtitle or teaser text displayed below the main page title in the banner.',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Banner Image',
      type: 'image',
      description: 'Full-bleed landscape banner image.',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'category',
      title: 'Category Label',
      type: 'string',
      description: 'e.g. IDEAS BY MONTH',
      group: 'hero',
    }),
    defineField({
      name: 'breadcrumb',
      title: 'Breadcrumb Label',
      type: 'string',
      description: 'Short name for breadcrumbs (e.g., January)',
      group: 'hero',
    }),

    // Content Group
    defineField({
      name: 'intro',
      title: 'Introduction Text',
      type: 'text',
      description: 'Lead italicized introduction paragraph.',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Article Body Sections',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          title: 'Article Section',
          fields: [
            { name: 'heading', type: 'string', title: 'Section Heading' },
            { name: 'body', type: 'text', title: 'Section Body Text', description: 'Supports line breaks.' },
            { 
              name: 'image', 
              type: 'image', 
              title: 'Section Image', 
              options: { hotspot: true },
              fields: [
                { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
                { name: 'imageCaption', type: 'string', title: 'Image Caption' }
              ]
            },
          ]
        }
      ]
    }),

    // Highlights Group
    defineField({
      name: 'highlights',
      title: 'Highlights List',
      type: 'array',
      description: 'Key bullet points displayed in the sidebar (or best parts list).',
      group: 'highlights',
      of: [{ type: 'string' }]
    }),

    // FAQs Group
    defineField({
      name: 'faqs',
      title: 'Page FAQs',
      type: 'array',
      group: 'faqs',
      of: [
        {
          type: 'object',
          title: 'FAQ Item',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' }
          ]
        }
      ]
    }),

    // CTA Group
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaBody',
      title: 'CTA Body Copy',
      type: 'text',
      group: 'cta',
    }),
    defineField({
      name: 'relatedSlugs',
      title: 'Related Pages (Slugs)',
      type: 'array',
      description: 'Cross-links to other pages in the same category.',
      group: 'cta',
      of: [{ type: 'string' }]
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Fields',
      type: 'seoFields',
      group: 'seo',
    })
  ]
});
