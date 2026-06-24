import { defineField, defineType } from 'sanity';

export const toursLanding = defineType({
  name: 'toursLanding',
  title: 'Vietnam Tours Landing',
  type: 'document',
  groups: [
    { name: 'hero', title: '① Hero Section', default: true },
    { name: 'recommended', title: '② Recommended Tours' },
    { name: 'faq', title: '③ FAQs' },
    { name: 'inspiration', title: '④ Inspiration/Blog' },
    { name: 'seo', title: '⑤ SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Used for internal identification.',
      group: 'hero',
    }),
    
    // ── ① HERO ──────────────────────────────────────
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // ── ② RECOMMENDED TOURS ─────────────────────────
    defineField({
      name: 'recommendedToursLabel',
      title: 'Section Label',
      type: 'string',
      group: 'recommended',
    }),
    defineField({
      name: 'recommendedToursHeading',
      title: 'Section Heading',
      type: 'string',
      group: 'recommended',
    }),
    defineField({
      name: 'recommendedTours',
      title: 'Select Recommended Tours',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'itinerary' }] }],
      group: 'recommended',
      validation: (rule) => rule.max(3),
    }),

    // ── ③ FAQs ──────────────────────────────────────
    defineField({
      name: 'faqLabel',
      title: 'FAQ Section Label',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqHeading',
      title: 'FAQ Heading',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer', rows: 3 },
          ],
        },
      ],
    }),

    // ── ④ INSPIRATION/BLOG ──────────────────────────
    defineField({
      name: 'inspirationLabel',
      title: 'Inspiration Section Label',
      type: 'string',
      group: 'inspiration',
    }),
    defineField({
      name: 'inspirationHeading',
      title: 'Inspiration Heading',
      type: 'string',
      group: 'inspiration',
    }),
    defineField({
      name: 'inspirationPosts',
      title: 'Select Featured Blog Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      group: 'inspiration',
      validation: (rule) => rule.max(4),
    }),

    // ── ⑤ SEO ───────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Vietnam Tours Landing Page', subtitle: 'Landing Page' };
    },
  },
});
