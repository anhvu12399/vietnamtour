import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: '📝 Blog Post',
  type: 'document',
  icon: () => '📝',
  groups: [
    { name: 'main', title: '① Bài viết', default: true },
    { name: 'content', title: '② Nội dung' },
    { name: 'links', title: '③ Liên kết' },
    { name: 'seo', title: '④ SEO' },
  ],
  orderings: [
    {
      title: 'Ngày đăng (mới nhất)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      date: 'publishedAt',
      media: 'featuredImage',
      authorName: 'author.name',
    },
    prepare({ title, subtitle, date, media, authorName }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Draft';
      return {
        title: title || 'Untitled Post',
        subtitle: `${subtitle || 'No category'} · ${authorName || 'No author'} · ${formattedDate}`,
        media,
      };
    },
  },
  fields: [
    // ═══════════════════════════════════════════
    // GROUP 1: BÀI VIẾT
    // ═══════════════════════════════════════════
    defineField({
      name: 'title',
      title: '📝 Tiêu đề bài viết',
      type: 'string',
      description: 'Tiêu đề chính (H1). Viết hấp dẫn, có từ khoá SEO. Ví dụ: "10 Hidden Temples in Hanoi That Most Tourists Never Find"',
      validation: (rule) => rule.required().error('Bắt buộc nhập tiêu đề'),
      group: 'main',
    }),
    defineField({
      name: 'slug',
      title: '🔗 URL Slug',
      type: 'slug',
      description: 'Tự động tạo từ tiêu đề → URL: /blog/ten-bai-viet',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'publishedAt',
      title: '📅 Ngày đăng',
      type: 'datetime',
      description: 'Ngày bài viết được xuất bản. Hiển thị trên trang và dùng cho sắp xếp.',
      initialValue: () => new Date().toISOString(),
      group: 'main',
    }),
    defineField({
      name: 'category',
      title: '🏷 Danh mục',
      type: 'string',
      description: 'Chọn danh mục cho bài viết.',
      options: {
        list: [
          { title: '✈️ Travel Tips', value: 'Travel Tips' },
          { title: '🏛 Culture & History', value: 'Culture & History' },
          { title: '🍜 Food & Drink', value: 'Food & Drink' },
          { title: '🏔 Adventure', value: 'Adventure' },
          { title: '📋 Planning & Logistics', value: 'Planning & Logistics' },
          { title: '📰 News & Updates', value: 'News & Updates' },
          { title: '🏨 Hotels & Stays', value: 'Hotels & Stays' },
          { title: '👨‍👩‍👧‍👦 Family Travel', value: 'Family Travel' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'featuredImage',
      title: '🖼 Ảnh đại diện',
      type: 'image',
      description: 'Ảnh chính hiển thị trên listing và hero. Kích thước đề nghị: 1200×675px.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Mô tả ảnh (Alt Text)',
          description: 'Bắt buộc cho SEO.',
          validation: (rule: any) => rule.required().error('Alt text bắt buộc'),
        },
      ],
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'excerpt',
      title: '💬 Tóm tắt ngắn',
      type: 'text',
      rows: 3,
      description: 'Tóm tắt 1-2 câu hiển thị trên trang listing và meta description. Tối đa 200 ký tự.',
      validation: (rule) => rule.required().max(250).error('Tóm tắt cần dưới 250 ký tự'),
      group: 'main',
    }),
    defineField({
      name: 'author',
      title: '👤 Tác giả',
      type: 'reference',
      to: [{ type: 'specialist' }],
      description: 'Chọn specialist làm tác giả bài viết.',
      group: 'main',
    }),
    defineField({
      name: 'tags',
      title: '🏷 Tags',
      type: 'array',
      description: 'Từ khoá/tags cho bài viết. Ví dụ: "hanoi", "street food", "budget travel"',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'main',
    }),

    // ═══════════════════════════════════════════
    // GROUP 2: NỘI DUNG
    // ═══════════════════════════════════════════
    defineField({
      name: 'content',
      title: '📝 Nội dung bài viết',
      type: 'array',
      description: 'Soạn nội dung: văn bản, ảnh, gallery, tips chuyên gia, trích dẫn.',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule: any) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                        allowRelative: true,
                      }),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Link',
                icon: () => '🔗',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Trang liên kết',
                    to: [
                      { type: 'itinerary' },
                      { type: 'destination' },
                      { type: 'thingToDo' },
                      { type: 'blogPost' },
                      { type: 'accommodation' },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          title: '🖼 Ảnh trong bài',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Mô tả ảnh cho SEO',
              validation: (rule: any) => rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Chú thích ảnh',
            },
          ],
        },
        {
          type: 'object',
          name: 'gallery',
          title: '🖼 Photo Gallery',
          icon: () => '🖼',
          fields: [
            {
              name: 'images',
              type: 'array',
              title: 'Ảnh (tối đa 4)',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'image', type: 'image', title: 'Ảnh', options: { hotspot: true } },
                    { name: 'alt', type: 'string', title: 'Alt Text' },
                    { name: 'caption', type: 'string', title: 'Chú thích' },
                  ],
                },
              ],
              validation: (rule: any) => rule.max(4),
            },
          ],
        },
        {
          type: 'object',
          name: 'specialistTip',
          title: '💡 Tip từ chuyên gia',
          icon: () => '💡',
          fields: [
            {
              name: 'specialist',
              type: 'reference',
              to: [{ type: 'specialist' }],
              title: 'Chọn chuyên gia',
            },
            {
              name: 'tip',
              type: 'text',
              title: 'Nội dung tip',
              rows: 4,
              validation: (rule: any) => rule.required(),
            },
          ],
        },
        {
          type: 'object',
          name: 'pullQuote',
          title: '✨ Trích dẫn nổi bật',
          icon: () => '✨',
          fields: [
            {
              name: 'quote',
              type: 'text',
              title: 'Nội dung trích dẫn',
              validation: (rule: any) => rule.required(),
            },
            {
              name: 'source',
              type: 'string',
              title: 'Nguồn (tuỳ chọn)',
            },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // GROUP 3: LIÊN KẾT
    // ═══════════════════════════════════════════
    defineField({
      name: 'relatedPosts',
      title: '🔗 Bài viết liên quan',
      type: 'array',
      description: 'Chọn các blog post liên quan hiển thị cuối bài.',
      group: 'links',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'relatedTours',
      title: '🗺 Tour liên quan',
      type: 'array',
      description: 'Chọn tour itinerary liên quan.',
      group: 'links',
      of: [{ type: 'reference', to: [{ type: 'itinerary' }] }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'ctaHeading',
      title: '📣 CTA Heading',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'ctaBody',
      title: '📣 CTA Body',
      type: 'text',
      rows: 3,
      group: 'links',
    }),

    // ═══════════════════════════════════════════
    // GROUP 4: SEO
    // ═══════════════════════════════════════════
    defineField({
      name: 'seo',
      title: '🔍 SEO Settings',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
});
