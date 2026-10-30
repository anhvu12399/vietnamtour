import { defineField, defineType } from 'sanity';

export const editorialEvidence = defineType({
  name: 'editorialEvidence',
  title: 'Author, review & sources',
  type: 'object',
  description: 'Use real people, dates and evidence. A CMS edit is not a fact-check.',
  fields: [
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'specialist' }] }),
    defineField({ name: 'reviewer', title: 'Reviewed by', type: 'reference', to: [{ type: 'specialist' }] }),
    defineField({ name: 'lastReviewedAt', title: 'Date reviewed', type: 'datetime', description: 'Only set after checking the article and its sources. Never automatically populated.' }),
    defineField({
      name: 'sources', title: 'Sources supporting the article', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'url', type: 'url', validation: (rule) => rule.required().uri({ scheme: ['https', 'http'] }) }),
        defineField({ name: 'accessedAt', title: 'Date consulted', type: 'date' }),
      ] }],
    }),
    defineField({
      name: 'fieldVisits', title: 'Documented field visits', type: 'array',
      description: 'Only record visits supported by original field notes, photographs or an approved trip record.',
      of: [{ type: 'object', fields: [
        defineField({ name: 'location', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'visitedAt', type: 'date', validation: (rule) => rule.required() }),
        defineField({ name: 'evidenceUrl', title: 'Public field report or original photo', type: 'url' }),
      ] }],
    }),
  ],
});
