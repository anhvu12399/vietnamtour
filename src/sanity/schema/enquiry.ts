export const enquiry = {
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
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
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
