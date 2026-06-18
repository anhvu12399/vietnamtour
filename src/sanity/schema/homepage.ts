import { defineField, defineType } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: '① Hero Slider', default: true },
    { name: 'pillars', title: '② Value Pillars' },
    { name: 'intro', title: '③ Intro & Grid' },
    { name: 'artOfTravel', title: '④ Art of Travel' },
    { name: 'experiences', title: '⑤ Bespoke Experiences' },
    { name: 'steps', title: '⑥ Four Steps' },
    { name: 'press', title: '⑦ In the Press' },
    { name: 'reviews', title: '⑧ Reviews' },
    { name: 'cta', title: '⑨ Final CTA' },
    { name: 'seo', title: '⑩ SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      description: 'Internal name for this document in Sanity.',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),

    // ── ① HERO SECTION ──────────────────────────────────────
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading on the first hero slide. e.g. "The Art of Travel"',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
      description: 'Subheading below the main title. e.g. "Where Your Journey Meets Our Legacy"',
      group: 'hero',
    }),

    // ── ② VALUE PILLARS ──────────────────────────────────────
    defineField({
      name: 'valuePillars',
      title: 'Value Pillars (4 highlights)',
      type: 'array',
      description: 'The 4 key value propositions shown below the hero. Each has a title and description.',
      group: 'pillars',
      of: [
        {
          type: 'object',
          name: 'pillar',
          title: 'Pillar',
          fields: [
            { name: 'title', type: 'string', title: 'Title', description: 'e.g. "Unique to You"' },
            { name: 'desc', type: 'text', title: 'Description', rows: 3 },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
      validation: (rule) => rule.max(4),
    }),

    // ── ③ INTRO & GRID ──────────────────────────────────
    defineField({
      name: 'introHeading',
      title: 'Intro Heading',
      type: 'string',
      description: 'e.g. "Tailor-Made Luxury Holidays with Vietnam Tour"',
      group: 'intro',
    }),
    defineField({
      name: 'introParagraph1',
      title: 'Intro Paragraph 1',
      type: 'text',
      rows: 4,
      group: 'intro',
    }),
    defineField({
      name: 'introParagraph2',
      title: 'Intro Paragraph 2',
      type: 'text',
      rows: 4,
      group: 'intro',
    }),
    defineField({
      name: 'introButtonText',
      title: 'Intro Button Text',
      type: 'string',
      description: 'e.g. "Discover Our Journeys"',
      group: 'intro',
    }),
    defineField({
      name: 'introButtonLink',
      title: 'Intro Button Link',
      type: 'string',
      description: 'e.g. "/itineraries"',
      group: 'intro',
    }),
    defineField({
      name: 'gridCategories',
      title: 'Grid Categories (6 image cards)',
      type: 'array',
      description: 'The 6 category cards next to the intro text. Each needs a title, image, and link.',
      group: 'intro',
      of: [
        {
          type: 'object',
          name: 'gridCategory',
          title: 'Grid Category',
          preview: {
            select: { title: 'title', media: 'image' },
          },
          fields: [
            { name: 'title', title: 'Title', type: 'string', description: 'e.g. "A Lifetime of Memories"' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'link', title: 'Link URL', type: 'string', description: 'e.g. "/itineraries"' },
          ],
        },
      ],
      validation: (rule) => rule.max(6),
    }),

    // ── ④ ART OF TRAVEL ──────────────────────────────────
    defineField({
      name: 'artOfTravelHeading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "The Art of Travel"',
      group: 'artOfTravel',
    }),
    defineField({
      name: 'artOfTravelText',
      title: 'Body Text',
      type: 'text',
      rows: 5,
      group: 'artOfTravel',
    }),
    defineField({
      name: 'artOfTravelButtonText',
      title: 'Button Text',
      type: 'string',
      description: 'e.g. "Meet Our Experts"',
      group: 'artOfTravel',
    }),
    defineField({
      name: 'artOfTravelButtonLink',
      title: 'Button Link',
      type: 'string',
      description: 'e.g. "/specialists"',
      group: 'artOfTravel',
    }),
    defineField({
      name: 'artOfTravelImage',
      title: 'Side Image',
      type: 'image',
      description: 'The large image shown on the right side.',
      options: { hotspot: true },
      group: 'artOfTravel',
    }),
    defineField({
      name: 'artOfTravelImageLabel',
      title: 'Image Overlay Label',
      type: 'string',
      description: 'Small label on the image. e.g. "Featured Sanctuary"',
      group: 'artOfTravel',
    }),
    defineField({
      name: 'artOfTravelImageTitle',
      title: 'Image Overlay Title',
      type: 'string',
      description: 'Title on the image. e.g. "the secrets of Sapa"',
      group: 'artOfTravel',
    }),

    // ── ⑤ BESPOKE EXPERIENCES ──────────────────────────────
    defineField({
      name: 'experiencesLabel',
      title: 'Section Label',
      type: 'string',
      description: 'e.g. "Bespoke Elements"',
      group: 'experiences',
    }),
    defineField({
      name: 'experiencesHeading',
      title: 'Section Heading',
      type: 'string',
      description: 'e.g. "Signature Luxury Experiences"',
      group: 'experiences',
    }),
    defineField({
      name: 'experiencesDescription',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      group: 'experiences',
    }),
    defineField({
      name: 'experiences',
      title: 'Experience Cards (3 cards)',
      type: 'array',
      description: 'The 3 signature experience cards. Each has an image, title, description, and badge text.',
      group: 'experiences',
      of: [
        {
          type: 'object',
          name: 'experienceCard',
          title: 'Experience',
          preview: {
            select: { title: 'title', media: 'image' },
          },
          fields: [
            { name: 'title', type: 'string', title: 'Title', description: 'e.g. "Cave Dining in Halong Bay"' },
            { name: 'desc', type: 'text', title: 'Description', rows: 3 },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'badge', type: 'string', title: 'Badge Text', description: 'e.g. "Included in Luxury Programmes"' },
            { name: 'link', type: 'string', title: 'Link URL', description: 'e.g. "/enquire"' },
          ],
        },
      ],
      validation: (rule) => rule.max(3),
    }),

    // ── ⑥ FOUR STEPS ──────────────────────────────────────
    defineField({
      name: 'stepsHeading',
      title: 'Steps Section Heading',
      type: 'string',
      description: 'e.g. "Four Steps to Your Luxury Holiday"',
      group: 'steps',
    }),
    defineField({
      name: 'steps',
      title: 'Planning Steps',
      type: 'array',
      description: 'The step-by-step process. Each step has a number, title, and description.',
      group: 'steps',
      of: [
        {
          type: 'object',
          name: 'step',
          title: 'Step',
          preview: {
            select: { title: 'title', subtitle: 'desc' },
          },
          fields: [
            { name: 'num', type: 'string', title: 'Step Number', description: 'e.g. "1"' },
            { name: 'title', type: 'string', title: 'Title', description: 'e.g. "Make an Enquiry"' },
            { name: 'desc', type: 'text', title: 'Description', rows: 2 },
          ],
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'stepsButtonText',
      title: 'Steps Button Text',
      type: 'string',
      description: 'e.g. "Design My Holiday"',
      group: 'steps',
    }),

    // ── ⑦ IN THE PRESS ──────────────────────────────────
    defineField({
      name: 'pressLabel',
      title: 'Press Section Label',
      type: 'string',
      description: 'e.g. "As Featured In"',
      group: 'press',
    }),
    defineField({
      name: 'pressHeading',
      title: 'Press Section Heading',
      type: 'string',
      description: 'e.g. "In the Press"',
      group: 'press',
    }),
    defineField({
      name: 'pressBackgroundImage',
      title: 'Press Background Image',
      type: 'image',
      description: 'The full-bleed background image for the press section.',
      options: { hotspot: true },
      group: 'press',
    }),
    defineField({
      name: 'pressQuotes',
      title: 'Press Quotes',
      type: 'array',
      description: 'Quotes from press outlets.',
      group: 'press',
      of: [
        {
          type: 'object',
          name: 'pressQuote',
          title: 'Quote',
          preview: {
            select: { title: 'source', subtitle: 'quote' },
          },
          fields: [
            { name: 'quote', type: 'text', title: 'Quote Text', rows: 3 },
            { name: 'source', type: 'string', title: 'Source', description: 'e.g. "CONDÉ NAST TRAVELLER"' },
          ],
        },
      ],
    }),

    // ── ⑧ REVIEWS ──────────────────────────────────────
    defineField({
      name: 'reviewsHeading',
      title: 'Reviews Section Heading',
      type: 'string',
      description: 'e.g. "What Our Guests Have Said"',
      group: 'reviews',
    }),
    defineField({
      name: 'reviews',
      title: 'Guest Reviews',
      type: 'array',
      description: 'TripAdvisor-style guest reviews.',
      group: 'reviews',
      of: [
        {
          type: 'object',
          name: 'review',
          title: 'Review',
          preview: {
            select: { title: 'title', subtitle: 'author' },
          },
          fields: [
            { name: 'title', type: 'string', title: 'Review Title' },
            { name: 'text', type: 'text', title: 'Review Text', rows: 4 },
            { name: 'author', type: 'string', title: 'Author Name', description: 'e.g. "Charles & Victoria S."' },
            { name: 'location', type: 'string', title: 'Location', description: 'e.g. "London, UK"' },
            { name: 'rating', type: 'number', title: 'Rating (1-5)', validation: (rule) => rule.min(1).max(5) },
            { name: 'date', type: 'string', title: 'Date', description: 'e.g. "June 2026"' },
            { name: 'highlights', type: 'array', title: 'Highlights Tags', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),

    // ── ⑨ FINAL CTA ──────────────────────────────────────
    defineField({
      name: 'finalCtaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'e.g. "Bespoke Planning"',
      group: 'cta',
    }),
    defineField({
      name: 'finalCtaHeading',
      title: 'CTA Heading',
      type: 'string',
      description: 'e.g. "Draft Your Dream Itinerary"',
      group: 'cta',
    }),
    defineField({
      name: 'finalCtaSubtext',
      title: 'CTA Description',
      type: 'text',
      rows: 3,
      group: 'cta',
    }),
    defineField({
      name: 'finalCtaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'e.g. "Start Planning"',
      group: 'cta',
    }),
    defineField({
      name: 'finalCtaPhone',
      title: 'CTA Phone Number',
      type: 'string',
      description: 'e.g. "+44 (0) 20 7845 9200"',
      group: 'cta',
    }),

    // ── ⑩ SEO ───────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Meta Title (max 60 chars)',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Keep under 60 characters'),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description (max 160 chars)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep under 160 characters'),
      group: 'seo',
    }),
  ],

  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Homepage', subtitle: 'Main Pages' };
    },
  },
});
