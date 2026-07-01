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
    // GROUP 2: CONTENT (Main Body)
    // ────────────────────────────────────
    defineField({
      name: 'content',
      title: 'Article Content',
      type: 'array',
      description: 'The main body of the article. You can insert text, images, galleries, tips, and quotes here.',
      group: 'intro', // Can keep using the 'intro' group tab or just make it default
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: 'Inline Image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption', description: 'Text shown below the image' },
            { name: 'alt', type: 'string', title: 'Alt Text', description: 'Important for SEO and accessibility' },
          ],
        },
        {
          type: 'object',
          name: 'gallery',
          title: '🖼 Photo Gallery',
          description: 'A beautiful grid of up to 3 images side-by-side.',
          fields: [
            {
              name: 'images',
              type: 'array',
              title: 'Images',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                    { name: 'caption', type: 'string', title: 'Overlay Caption (Optional)' },
                  ],
                },
              ],
              validation: (Rule) => Rule.max(3),
            },
          ],
        },
        {
          type: 'object',
          name: 'specialistTip',
          title: '💡 Specialist Tip',
          description: 'An elegant sidebar-style tip with an avatar.',
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
            { name: 'customAvatar', type: 'image', title: 'Custom Avatar (override)', options: { hotspot: true } },
            { name: 'tip', type: 'text', title: 'Tip Text', validation: (rule) => rule.required() },
          ],
        },
        {
          type: 'object',
          name: 'pullQuote',
          title: '✨ Pull Quote',
          description: 'A large, magazine-style quote block.',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote Text', validation: (rule) => rule.required() },
            { name: 'author', type: 'string', title: 'Author / Source (Optional)' },
          ],
        },
      ],
    }),

    // ────────────────────────────────────
    // GROUP 3: BOTTOM CALL-TO-ACTION
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
    // GROUP 4: SEO
    // ────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
});
