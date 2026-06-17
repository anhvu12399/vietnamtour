import { defineField, defineType } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      description: 'Tên nội bộ để nhận biết tài liệu này trong Sanity',
      validation: (rule) => rule.required(),
    }),

    // ── Hero Section ──────────────────────────────────────
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (Tiêu đề chính slide 1)',
      type: 'string',
      description: 'Tiêu đề lớn hiển thị trên ảnh hero đầu tiên. Ví dụ: "The Art of Travel"',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading (Phụ đề slide 1)',
      type: 'text',
      rows: 2,
      description: 'Phụ đề bên dưới tiêu đề chính. Ví dụ: "Where Your Journey Meets Our Legacy"',
    }),

    // ── Intro / Pitch Section ─────────────────────────────
    defineField({
      name: 'introHeading',
      title: 'Intro Heading (Tiêu đề phần giới thiệu)',
      type: 'string',
      description: 'Ví dụ: "Tailor-Made Luxury Holidays with Vietnam Tour"',
    }),
    defineField({
      name: 'introParagraph1',
      title: 'Intro Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'introParagraph2',
      title: 'Intro Paragraph 2',
      type: 'text',
      rows: 4,
    }),

    // ── Art of Travel Block ───────────────────────────────
    defineField({
      name: 'artOfTravelHeading',
      title: '"The Art of Travel" Heading',
      type: 'string',
      description: 'Tiêu đề phần "The Art of Travel". Mặc định: "The Art of Travel"',
    }),
    defineField({
      name: 'artOfTravelText',
      title: '"The Art of Travel" Body Text',
      type: 'text',
      rows: 5,
    }),

    // ── CTA ───────────────────────────────────────────────
    defineField({
      name: 'finalCtaHeading',
      title: 'Final CTA Heading',
      type: 'string',
      description: 'Tiêu đề phần kêu gọi hành động cuối trang. Ví dụ: "Draft Your Dream Itinerary"',
    }),
    defineField({
      name: 'finalCtaSubtext',
      title: 'Final CTA Subtext',
      type: 'text',
      rows: 3,
    }),

    // ── SEO ───────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Meta Title (tối đa 60 ký tự)',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Nên giữ dưới 60 ký tự'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description (tối đa 160 ký tự)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Nên giữ dưới 160 ký tự'),
    }),
  ],

  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Homepage', subtitle: 'Main Pages' };
    },
  },
});
