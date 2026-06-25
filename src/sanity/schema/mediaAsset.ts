import { defineField, defineType } from 'sanity';

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: '🖼 Thư viện ảnh',
  type: 'document',
  icon: () => '🖼',
  orderings: [
    {
      title: 'Ngày tải lên (mới nhất)',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Theo danh mục',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Image',
        subtitle: subtitle ? `📁 ${subtitle}` : 'No category',
        media,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: '📝 Tên ảnh',
      type: 'string',
      description: 'Đặt tên mô tả ngắn. Ví dụ: "Ha Long Bay sunrise from junk boat" hoặc "Pho vendor Hanoi Old Quarter"',
      validation: (rule) => rule.required().error('Bắt buộc đặt tên ảnh'),
    }),
    defineField({
      name: 'image',
      title: '🖼 Tải ảnh lên',
      type: 'image',
      description: 'Tải ảnh lên Sanity CDN. Ảnh sẽ tự động được chuyển sang AVIF khi hiển thị trên website. Kích thước đề nghị: tối thiểu 1200px chiều rộng.',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
      },
      validation: (rule) => rule.required().error('Bắt buộc tải ảnh'),
    }),
    defineField({
      name: 'alt',
      title: '♿ Mô tả ảnh (Alt Text)',
      type: 'string',
      description: 'BẮT BUỘC cho SEO. Mô tả ngắn nội dung ảnh. Google dùng text này để hiểu ảnh. Ví dụ: "Kayaker paddles through limestone cave passage in Ha Long Bay"',
      validation: (rule) => rule.required().error('Alt text bắt buộc — rất quan trọng cho SEO'),
    }),
    defineField({
      name: 'caption',
      title: '💬 Chú thích ảnh',
      type: 'string',
      description: 'Tuỳ chọn. Dòng chữ nhỏ hiển thị dưới ảnh khi được sử dụng trong bài viết.',
    }),
    defineField({
      name: 'category',
      title: '📁 Danh mục',
      type: 'string',
      description: 'Phân loại ảnh để dễ tìm kiếm.',
      options: {
        list: [
          { title: '🏔 Destinations & Landscapes', value: 'Destinations' },
          { title: '🏨 Hotels & Resorts', value: 'Hotels' },
          { title: '🧭 Activities & Experiences', value: 'Activities' },
          { title: '🍜 Food & Cuisine', value: 'Food' },
          { title: '👤 People & Culture', value: 'People' },
          { title: '🚢 Cruises & Boats', value: 'Cruises' },
          { title: '🌅 Hero Banners', value: 'Banners' },
          { title: '📸 Other', value: 'Other' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: '🏷 Tags',
      type: 'array',
      description: 'Thêm tags để lọc ảnh. Ví dụ: "halong", "kayak", "sunrise", "cave"',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'photographer',
      title: '📷 Photographer Credit',
      type: 'string',
      description: 'Tuỳ chọn. Tên người chụp ảnh.',
    }),
    defineField({
      name: 'usedIn',
      title: '📄 Sử dụng trong',
      type: 'string',
      description: 'Tuỳ chọn. Ghi chú ảnh đang dùng ở đâu. Ví dụ: "Homepage hero", "Ha Long Bay article"',
    }),
  ],
});
