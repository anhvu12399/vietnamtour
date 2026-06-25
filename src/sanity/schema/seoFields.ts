import { defineField, defineType } from 'sanity';

export const seoFields = defineType({
  name: 'seoFields',
  title: '🔍 SEO Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: '📝 Meta Title',
      type: 'string',
      description: 'Tiêu đề hiển thị trên Google. Tối ưu: 50-60 ký tự. Bao gồm từ khoá chính + brand. Ví dụ: "Kayaking Ha Long Bay | Hidden Lagoons & Caves | Vietnam Tour"',
      validation: (rule) => rule.max(70).warning('Google thường cắt tiêu đề dài hơn 60 ký tự'),
    }),
    defineField({
      name: 'metaDescription',
      title: '📄 Meta Description',
      type: 'text',
      rows: 3,
      description: 'Mô tả hiển thị trên kết quả Google. Tối ưu: 120-160 ký tự. Viết hấp dẫn để người dùng muốn click.',
      validation: (rule) => rule.max(170).warning('Google thường cắt mô tả dài hơn 160 ký tự'),
    }),
    defineField({
      name: 'ogImage',
      title: '🖼 Open Graph Image',
      type: 'image',
      description: 'Ảnh hiển thị khi chia sẻ lên Facebook/Twitter. Kích thước tối ưu: 1200×630px.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'keywords',
      title: '🏷 Keywords',
      type: 'array',
      description: 'Từ khoá SEO. Ví dụ: "ha long bay kayaking", "vietnam things to do", "hidden lagoons"',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'canonicalUrl',
      title: '🔗 Canonical URL (tuỳ chọn)',
      type: 'string',
      description: 'Chỉ dùng khi muốn ghi đè canonical URL mặc định. Để trống nếu không chắc chắn.',
    }),
    defineField({
      name: 'noIndex',
      title: '🚫 Ẩn khỏi Google (noindex)',
      type: 'boolean',
      description: 'BẬT = trang này sẽ KHÔNG xuất hiện trên Google. Chỉ dùng cho trang draft/test.',
      initialValue: false,
    }),
  ],
});
