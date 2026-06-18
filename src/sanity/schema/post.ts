import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog / Article',
  type: 'document',
  groups: [
    { name: 'hero', title: '① Hero & Info', default: true },
    { name: 'intro', title: '② Intro Section' },
    { name: 'chapters', title: '③ Chapters' },
    { name: 'gallery', title: '④ Photo Gallery' },
    { name: 'cta', title: '⑤ Call-to-Action' },
    { name: 'seo', title: '⑥ SEO' },
  ],
  fields: [
    // ────────────────────────────────────
    // GROUP 1: HERO & BASIC INFO
    // ────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      description: 'The main headline displayed at the top of the article.',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from title. This is the URL path (e.g. /inspiration/my-article).',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this article was published. Displayed under the title.',
      group: 'hero',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      description: 'The large feature image displayed in the article hero section.',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      description: 'A brief summary shown below the title (italic quote style). Also used on the listing page.',
      group: 'hero',
    }),
    defineField({
      name: 'heroAuthor',
      title: 'Article Author / Curator',
      type: 'object',
      description: 'The person shown as the author/curator in the hero section.',
      group: 'hero',
      fields: [
        { name: 'name', type: 'string', title: 'Name', description: 'e.g. Alice Mercer' },
        { name: 'role', type: 'string', title: 'Role', description: 'e.g. Senior Travel Specialist' },
        { name: 'avatar', type: 'image', title: 'Avatar Photo', options: { hotspot: true } },
      ],
    }),

    // ────────────────────────────────────
    // GROUP 2: INTRO SECTION (sidebar)
    // ────────────────────────────────────
    defineField({
      name: 'introContent',
      title: 'Introduction Text',
      type: 'array',
      description: 'The opening paragraphs of the article (left column). The first paragraph gets a decorative drop cap.',
      group: 'intro',
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: 'Inline Image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'factSheet',
      title: 'Journey Fact Sheet (Right Sidebar)',
      type: 'object',
      description: 'The "At a Glance" info card shown beside the introduction.',
      group: 'intro',
      fields: [
        { name: 'pacing', type: 'string', title: 'Pacing', description: 'e.g. Bespoke & Leisurely' },
        { name: 'bestMonths', type: 'string', title: 'Best Months', description: 'e.g. November – April' },
        { name: 'duration', type: 'string', title: 'Duration', description: 'e.g. 14 Days / 13 Nights' },
        { name: 'destinations', type: 'string', title: 'Destinations', description: 'e.g. Hanoi · Halong Bay · Hoi An' },
        { name: 'operatorType', type: 'string', title: 'Operator Type', description: 'e.g. Private Jet/VIP Ground' },
      ],
    }),
    defineField({
      name: 'sidebarTip',
      title: 'Sidebar Specialist Tip',
      type: 'object',
      description: 'A specialist tip displayed in the sidebar next to the introduction.',
      group: 'intro',
      fields: [
        {
          name: 'specialist',
          type: 'reference',
          to: [{ type: 'specialist' }],
          title: 'Specialist (link to existing)',
          description: 'Select a specialist, or use the manual fields below instead.',
        },
        { name: 'manualName', type: 'string', title: 'Manual Name', description: 'Use this if you don\'t want to link a specialist.' },
        { name: 'manualRole', type: 'string', title: 'Manual Role' },
        { name: 'manualAvatar', type: 'image', title: 'Manual Avatar' },
        {
          name: 'tip',
          type: 'text',
          title: 'Tip Text',
          description: 'The insider tip text displayed in quotes.',
        },
      ],
    }),

    // ────────────────────────────────────
    // GROUP 3: CHAPTERS (the main body)
    // ────────────────────────────────────
    defineField({
      name: 'chapters',
      title: 'Article Chapters',
      type: 'array',
      description: 'Each chapter = 1 section with a heading, image, and text. They alternate left/right automatically.',
      group: 'chapters',
      of: [
        {
          type: 'object',
          name: 'chapter',
          title: 'Chapter',
          preview: {
            select: {
              title: 'heading',
              media: 'image',
            },
          },
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: 'Chapter Heading',
              description: 'e.g. "Days 1–3: Hanoi & the Old Quarter"',
              validation: (rule) => rule.required(),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Chapter Image',
              description: 'The main photo for this chapter (displayed beside the text).',
              options: { hotspot: true },
            },
            {
              name: 'imageCaption',
              type: 'string',
              title: 'Image Caption',
              description: 'Text shown below the image, e.g. "The colonial grace and timeless streets of Hanoi."',
            },
            {
              name: 'body',
              type: 'array',
              title: 'Chapter Content',
              description: 'The text, images, tips, and quotes inside this chapter.',
              of: [
                { type: 'block' },
                {
                  type: 'image',
                  title: 'Inline Image',
                  options: { hotspot: true },
                  fields: [
                    { name: 'caption', type: 'string', title: 'Caption' },
                    { name: 'alt', type: 'string', title: 'Alt Text' },
                  ],
                },
                {
                  type: 'object',
                  name: 'specialistTip',
                  title: '💡 Specialist Tip',
                  fields: [
                    {
                      name: 'specialist',
                      type: 'reference',
                      to: [{ type: 'specialist' }],
                      title: 'Specialist (link)',
                      description: 'Optional: link to an existing specialist.',
                    },
                    { name: 'customName', type: 'string', title: 'Custom Name (override)' },
                    { name: 'customRole', type: 'string', title: 'Custom Role (override)' },
                    { name: 'customAvatar', type: 'image', title: 'Custom Avatar (override)' },
                    { name: 'tip', type: 'text', title: 'Tip Text', validation: (rule) => rule.required() },
                  ],
                },
                {
                  type: 'object',
                  name: 'pullQuote',
                  title: '✨ Pull Quote',
                  fields: [
                    { name: 'quote', type: 'text', title: 'Quote Text', validation: (rule) => rule.required() },
                    { name: 'author', type: 'string', title: 'Author / Source' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    // ────────────────────────────────────
    // GROUP 4: PHOTO GALLERY SECTION
    // ────────────────────────────────────
    defineField({
      name: 'photoEssayHeading',
      title: 'Gallery Section Label',
      type: 'string',
      description: 'Small label text above the heading. e.g. "Visual Poetry"',
      group: 'gallery',
    }),
    defineField({
      name: 'photoEssayTitle',
      title: 'Gallery Section Heading',
      type: 'string',
      description: 'Main heading text. e.g. "The Art of Bespoke Travel"',
      group: 'gallery',
    }),
    defineField({
      name: 'photoEssayDescription',
      title: 'Gallery Section Description',
      type: 'string',
      description: 'Short description below heading.',
      group: 'gallery',
    }),
    defineField({
      name: 'photoEssay',
      title: 'Gallery Images (max 3)',
      type: 'array',
      description: 'A visual break section with up to 3 images, each with a title and caption.',
      group: 'gallery',
      of: [
        {
          type: 'object',
          name: 'essayItem',
          title: 'Gallery Item',
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
          fields: [
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'title', type: 'string', title: 'Overlay Title', description: 'e.g. "Exclusive Dining"' },
            { name: 'caption', type: 'string', title: 'Overlay Caption', description: 'e.g. "Private chef table inside Halong caverns."' },
          ],
        },
      ],
      validation: (rule) => rule.max(3),
    }),

    // ────────────────────────────────────
    // GROUP 5: BOTTOM CALL-TO-ACTION
    // ────────────────────────────────────
    defineField({
      name: 'ctaLabel',
      title: 'CTA Top Label',
      type: 'string',
      description: 'Small label above the CTA heading. e.g. "DESIGN YOUR JOURNEY"',
      group: 'cta',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      description: 'Main CTA heading. e.g. "Begin Writing Your Own Travel Chapter"',
      group: 'cta',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      description: 'Text below the CTA heading.',
      group: 'cta',
    }),

    // ────────────────────────────────────
    // GROUP 6: SEO
    // ────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
});
