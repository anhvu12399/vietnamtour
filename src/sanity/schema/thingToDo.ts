import { defineField, defineType } from 'sanity';

export const thingToDo = defineType({
  name: 'thingToDo',
  title: '🧭 Things To Do',
  type: 'document',
  icon: () => '🧭',
  groups: [
    { name: 'hero', title: '① Hero & Tiêu đề', default: true },
    { name: 'content', title: '② Nội dung bài viết' },
    { name: 'practical', title: '③ Thông tin thực tế' },
    { name: 'faqs', title: '④ Câu hỏi thường gặp' },
    { name: 'links', title: '⑤ Liên kết & CTA' },
    { name: 'seo', title: '⑥ SEO' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? `🏷 ${subtitle}` : 'No category',
        media,
      };
    },
  },
  fields: [
    // ═══════════════════════════════════════════
    // GROUP 1: HERO & HEADER
    // ═══════════════════════════════════════════
    defineField({
      name: 'title',
      title: '📝 Tiêu đề bài viết',
      type: 'string',
      description: 'Tiêu đề chính hiển thị trên trang (H1). Ví dụ: "Kayaking Ha Long Bay: Paddling into Hidden Lagoons"',
      validation: (rule) => rule.required().error('Bắt buộc nhập tiêu đề bài viết'),
      group: 'hero',
    }),
    defineField({
      name: 'slug',
      title: '🔗 URL Slug',
      type: 'slug',
      description: 'Tự động tạo từ tiêu đề. Đây là đường dẫn URL (ví dụ: /things-to-do/kayaking-halong-bay)',
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
      validation: (rule) => rule.required().error('Bắt buộc tạo slug'),
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: '🖼 Ảnh banner chính',
      type: 'image',
      description: 'Ảnh ngang toàn chiều rộng hiển thị ở đầu trang. Kích thước đề nghị: 1920×1080px.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Mô tả ảnh (Alt Text)',
          description: 'Mô tả ngắn cho SEO và accessibility. Ví dụ: "Chèo kayak qua hang đá vôi vào đầm ẩn ở Vịnh Hạ Long"',
          validation: (rule: any) => rule.required().error('Alt text bắt buộc cho SEO'),
        },
      ],
      validation: (rule) => rule.required().error('Bắt buộc tải ảnh banner'),
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: '💬 Mô tả ngắn dưới tiêu đề',
      type: 'text',
      rows: 3,
      description: 'Câu mô tả hấp dẫn hiển thị ngay dưới tiêu đề chính trên banner.',
      group: 'hero',
    }),
    defineField({
      name: 'category',
      title: '🏷 Danh mục',
      type: 'string',
      description: 'Nhãn danh mục hiển thị trên badge. Chọn hoặc tự nhập.',
      options: {
        list: [
          { title: 'Water Adventures', value: 'WATER ADVENTURES' },
          { title: 'Culture & Heritage', value: 'CULTURE & HERITAGE' },
          { title: 'Trekking & Hiking', value: 'TREKKING & HIKING' },
          { title: 'Festivals & Culture', value: 'FESTIVALS & CULTURE' },
          { title: 'Culinary Experiences', value: 'CULINARY EXPERIENCES' },
          { title: 'River Journeys', value: 'RIVER JOURNEYS' },
          { title: 'Beach & Islands', value: 'BEACH & ISLANDS' },
          { title: 'Wildlife & Nature', value: 'WILDLIFE & NATURE' },
          { title: 'History & War Sites', value: 'HISTORY & WAR SITES' },
        ],
      },
      group: 'hero',
    }),
    defineField({
      name: 'breadcrumb',
      title: '🍞 Tên breadcrumb',
      type: 'string',
      description: 'Tên ngắn hiển thị trên breadcrumb. Ví dụ: "Kayaking Ha Long Bay"',
      group: 'hero',
    }),
    defineField({
      name: 'readingTime',
      title: '⏱ Thời gian đọc (phút)',
      type: 'number',
      description: 'Ước tính thời gian đọc bài viết.',
      initialValue: 7,
      validation: (rule) => rule.min(1).max(60),
      group: 'hero',
    }),

    // ═══════════════════════════════════════════
    // GROUP 2: NỘI DUNG BÀI VIẾT
    // ═══════════════════════════════════════════
    defineField({
      name: 'intro',
      title: '📖 Đoạn mở đầu',
      type: 'text',
      rows: 6,
      description: 'Đoạn văn mở đầu hiển thị với drop-cap (chữ cái đầu lớn). Viết như lời kể trải nghiệm thật.',
      validation: (rule) => rule.required().min(100).error('Đoạn mở đầu cần ít nhất 100 ký tự'),
      group: 'content',
    }),
    defineField({
      name: 'highlights',
      title: '✨ Điểm nổi bật',
      type: 'array',
      description: 'Danh sách 4-8 điểm nổi bật của trải nghiệm. Hiển thị dạng bullet list.',
      group: 'content',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(3).error('Cần ít nhất 3 điểm nổi bật'),
    }),
    defineField({
      name: 'sections',
      title: '📄 Các phần bài viết',
      type: 'array',
      description: 'Mỗi phần gồm tiêu đề + nội dung + ảnh minh họa (tuỳ chọn). Nên có 2-4 phần.',
      group: 'content',
      of: [
        {
          type: 'object',
          title: 'Phần bài viết',
          icon: () => '📄',
          preview: {
            select: { title: 'heading', media: 'image' },
            prepare({ title, media }: { title?: string; media?: any }) {
              return { title: title || 'Chưa có tiêu đề', media };
            },
          },
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: '📌 Tiêu đề phần',
              description: 'Ví dụ: "Luon Cave: The Passage That Changes Everything"',
              validation: (rule: any) => rule.required(),
            },
            {
              name: 'body',
              type: 'text',
              title: '📝 Nội dung',
              rows: 12,
              description: 'Viết nội dung chi tiết. Dùng dấu xuống dòng (Enter 2 lần) để tạo đoạn văn mới.',
            },
            {
              name: 'image',
              type: 'image',
              title: '🖼 Ảnh minh họa (tuỳ chọn)',
              description: 'Ảnh minh họa cho phần này. Kích thước đề nghị: 1200×675px.',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Mô tả ảnh (Alt Text)',
                  description: 'Mô tả ngắn cho SEO. Bắt buộc nếu có ảnh.',
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Chú thích ảnh',
                  description: 'Dòng chữ nhỏ hiển thị dưới ảnh.',
                },
              ],
            },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // GROUP 3: THÔNG TIN THỰC TẾ
    // ═══════════════════════════════════════════
    defineField({
      name: 'practicalInfo',
      title: '📋 Thông tin thực tế',
      type: 'object',
      description: 'Thông tin hướng dẫn du khách hiển thị ở sidebar.',
      group: 'practical',
      fields: [
        {
          name: 'bestTime',
          type: 'string',
          title: '🌤 Thời điểm tốt nhất',
          description: 'Ví dụ: "Tháng 3-5 (nước trong nhất, gió nhẹ). Tháng 10 cũng tuyệt."',
        },
        {
          name: 'duration',
          type: 'string',
          title: '⏳ Thời lượng',
          description: 'Ví dụ: "Nửa ngày đến 2 ngày tuỳ tuyến"',
        },
        {
          name: 'difficulty',
          type: 'string',
          title: '💪 Độ khó',
          description: 'Ví dụ: "Dễ — phù hợp mọi lứa tuổi" hoặc "Trung bình — cần đi bộ thường xuyên"',
          options: {
            list: [
              { title: 'Easy — suitable for all', value: 'Beginner-friendly. No experience needed.' },
              { title: 'Moderate — good fitness recommended', value: 'Moderate. Good footwear essential.' },
              { title: 'Challenging — experienced required', value: 'Challenging. Good fitness and experience required.' },
            ],
          },
        },
        {
          name: 'price',
          type: 'string',
          title: '💰 Mức giá tham khảo',
          description: 'Ví dụ: "Từ £45/người cho trek nửa ngày"',
        },
        {
          name: 'location',
          type: 'string',
          title: '📍 Địa điểm',
          description: 'Ví dụ: "Vịnh Hạ Long, tỉnh Quảng Ninh"',
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // GROUP 4: CÂU HỎI THƯỜNG GẶP
    // ═══════════════════════════════════════════
    defineField({
      name: 'faqs',
      title: '❓ Câu hỏi thường gặp (FAQ)',
      type: 'array',
      description: 'Danh sách FAQ hiển thị dạng accordion. Google sử dụng phần này cho Featured Snippets.',
      group: 'faqs',
      of: [
        {
          type: 'object',
          title: 'Câu hỏi',
          icon: () => '❓',
          preview: {
            select: { title: 'question' },
          },
          fields: [
            {
              name: 'question',
              type: 'string',
              title: '❓ Câu hỏi',
              validation: (rule: any) => rule.required(),
            },
            {
              name: 'answer',
              type: 'text',
              title: '💬 Câu trả lời',
              rows: 4,
              validation: (rule: any) => rule.required(),
            },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // GROUP 5: LIÊN KẾT & CTA
    // ═══════════════════════════════════════════
    defineField({
      name: 'ctaHeading',
      title: '📣 Tiêu đề CTA',
      type: 'string',
      description: 'Tiêu đề kêu gọi hành động ở cuối trang. Ví dụ: "Add Ha Long Bay Kayaking to Your Itinerary"',
      group: 'links',
    }),
    defineField({
      name: 'ctaBody',
      title: '📣 Nội dung CTA',
      type: 'text',
      rows: 3,
      description: 'Mô tả ngắn kèm theo CTA.',
      group: 'links',
    }),
    defineField({
      name: 'relatedThings',
      title: '🔗 Trải nghiệm liên quan',
      type: 'array',
      description: 'Chọn các bài "Things To Do" liên quan để hiển thị cuối trang.',
      group: 'links',
      of: [
        {
          type: 'reference',
          to: [{ type: 'thingToDo' }],
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'recommendedTours',
      title: '🗺 Tour đề xuất',
      type: 'array',
      description: 'Chọn các tour itinerary liên quan.',
      group: 'links',
      of: [
        {
          type: 'reference',
          to: [{ type: 'itinerary' }],
        },
      ],
      validation: (rule) => rule.max(4),
    }),

    // ═══════════════════════════════════════════
    // GROUP 6: SEO
    // ═══════════════════════════════════════════
    defineField({
      name: 'seo',
      title: '🔍 SEO Settings',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
});
