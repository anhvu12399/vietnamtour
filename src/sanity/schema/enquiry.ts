import type { Rule, PreviewValue } from 'sanity';
export const enquiry = {
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  fields: [
    { name: 'status', title: 'Lead stage', type: 'string', initialValue: 'new', options: { list: ['new', 'qualified', 'quote_sent', 'booked', 'lost'] } },
    { name: 'bookingValue', title: 'Confirmed booking value (GBP)', type: 'number', validation: (rule: Rule) => rule.min(0) },
    { name: 'salesNotes', title: 'Qualification and follow-up notes', type: 'text' },
    { name: 'closedAt', title: 'Date booked or closed', type: 'datetime' },
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'destinations',
      title: 'Selected Destinations',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'travelMonth',
      title: 'Travel Month',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Preferred Duration',
      type: 'string',
    },
    {
      name: 'adults',
      title: 'Number of Adults',
      type: 'string',
    },
    {
      name: 'children',
      title: 'Number of Children',
      type: 'string',
    },
    {
      name: 'budgetPerPerson',
      title: 'Budget Per Person (£ GBP)',
      type: 'string',
    },
    {
      name: 'style',
      title: 'Travel Style',
      type: 'string',
    },
    {
      name: 'notes',
      title: 'Additional Notes / Request details',
      type: 'text',
    },
    { name: 'travelYear', title: 'Travel Year', type: 'string' },
    { name: 'interest', title: 'Page or journey of interest', type: 'string' },
    { name: 'availableTime', title: 'Preferred contact time', type: 'string' },
    { name: 'attributionEvidence', title: 'Source evidence', type: 'string', description: 'observed_referral | campaign | unknown' },
    { name: 'contentHints', title: 'Message formatting hints (not acquisition evidence)', type: 'array', of: [{ type: 'string' }] },
    // ── Traffic Forensics & AI Detection Fields ──
    {
      name: 'trafficSource',
      title: 'Traffic Source Label (Nguồn vào)',
      type: 'string',
      description: 'Ví dụ: 🤖 ChatGPT, 🧭 Perplexity, 🔍 Google Search, 👤 Direct',
    },
    {
      name: 'trafficChannel',
      title: 'Channel',
      type: 'string',
      description: 'ai | organic | cpc | referral | unknown (legacy records may use direct)',
    },
    {
      name: 'isAi',
      title: 'AI Assistant Detected?',
      type: 'boolean',
    },
    {
      name: 'confidence',
      title: 'Legacy confidence (not calibrated)',
      type: 'number',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'referrer',
      title: 'Entry Referrer URL',
      type: 'string',
    },
    {
      name: 'landingPage',
      title: 'First Landing Page',
      type: 'string',
    },
    {
      name: 'utmSource',
      title: 'UTM Source',
      type: 'string',
    },
    {
      name: 'utmMedium',
      title: 'UTM Medium',
      type: 'string',
    },
    {
      name: 'utmCampaign',
      title: 'UTM Campaign',
      type: 'string',
    },
    {
      name: 'aiSignals',
      title: 'AI Forensics Signals',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
