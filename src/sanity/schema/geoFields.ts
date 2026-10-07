/* eslint-disable @typescript-eslint/no-explicit-any -- Sanity validation Rule is untyped in this codebase's schema files */
// Fields that make a document easy for AI answer engines (ChatGPT, Perplexity…) to quote.
// Spread into a document's `fields` array: `...geoFields`.

export const geoFields = [
  {
    name: 'answerSummary',
    title: '🤖 Answer Summary (GEO)',
    type: 'text',
    rows: 3,
    description:
      'Trả lời trực tiếp trong 40–60 từ, có số liệu cụ thể (giá £, số ngày, mùa). Hiển thị ngay dưới H1 và đưa vào JSON-LD. Viết như thể ChatGPT sẽ trích nguyên đoạn này.',
    validation: (Rule: any) =>
      Rule.max(400).warning('Giữ dưới ~60 từ (≈ 400 ký tự) để dễ được trích dẫn'),
  },
  {
    name: 'geoFaqs',
    title: '🤖 FAQs (GEO)',
    type: 'array',
    description: '5–8 câu hỏi UK travellers hay hỏi. Trả lời 1–3 câu, có số liệu. Hiển thị trên trang + FAQPage JSON-LD.',
    of: [
      {
        type: 'object',
        title: 'Câu hỏi',
        fields: [
          { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
        ],
        preview: { select: { title: 'question' } },
      },
    ],
  },
  {
    name: 'lastReviewedAt',
    title: '🤖 Last reviewed',
    type: 'date',
    description: 'Ngày biên tập viên kiểm tra lại thông tin (giá, visa, mùa). Hiển thị "Last reviewed" + dateModified.',
  },
  {
    name: 'sources',
    title: '🤖 Sources',
    type: 'array',
    description: 'Nguồn chính thức (FCDO, TravelHealthPro, cổng e-visa…) làm cơ sở cho thông tin.',
    of: [
      {
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'url', title: 'URL', type: 'url' },
        ],
        preview: { select: { title: 'label', subtitle: 'url' } },
      },
    ],
  },
];
