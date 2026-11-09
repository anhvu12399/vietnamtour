import type { Post, RichTextBlock } from '@/sanity/types';

const block = (text: string, index: number, style = 'normal'): RichTextBlock => ({
  _type: 'block', _key: `planning-${index}`, style, markDefs: [],
  children: [{ _type: 'span', _key: `span-${index}`, text, marks: [] }],
});
function article(slug: string, title: string, excerpt: string, sections: [string, string][]): Post {
  return {
    _id: `planning-${slug}`, slug: { current: slug }, title, excerpt,
    mainImage: '/images/unsplash/halong.jpg',
    content: sections.flatMap(([heading, text], index) => [block(heading, index * 2, 'h2'), block(text, index * 2 + 1)]),
    ctaHeading: 'Request a proposal for your dates',
    ctaDescription: 'Share your dates, number of travellers, preferred pace and budget. Ask for a written breakdown of the route and included services.',
  };
}

export const planningGuides: Post[] = [
  article('vietnam-private-tour-cost', 'Vietnam Private Tour Cost: How to Compare a Tailor-Made Quote',
    'A useful Vietnam tour price identifies the dates, party size, route, room category and included services. Compare the total holiday cost, not just a headline price per person.', [
      ['What determines the cost of a private Vietnam tour?', 'Start with your number of nights, travellers and rooms. Then compare the same route, hotel categories, guiding arrangements and transport. A proposal for a private car and guide differs from a shared excursion, and a room category can matter as much as a hotel name. Ask which components are confirmed and which are still subject to availability.'],
      ['A checklist for comparing two quotations', 'Check accommodation and room type; airport and intercity transfers; domestic flights and baggage; private or shared guiding; meals and drinks; entry fees and activity tickets; cruise cabin and sailing; taxes; and any supplements. Mark each item included, excluded or awaiting confirmation. If one quote is cheaper, identify the changed assumptions before deciding whether it is a better fit.'],
      ['A price per person needs a clear basis', 'Ask how many people and rooms the price assumes. Check the currency, date of the quote, payment schedule and any conditions attached to availability. Solo travel, different room arrangements, extra nights and changes to the route can produce a different total. Catalogue guide prices and examples do not guarantee a current price for your dates.'],
      ['What about international flights?', 'Confirm explicitly whether international flights are included. If you arrange them separately, give the operator your arrival and departure details before the itinerary is finalised. Compare domestic flights and baggage on the same basis as the rest of the proposal. Do not assume that a description saying flights arranged means every flight is included in the price.'],
      ['Choosing where to spend and where to simplify', 'Choose your priorities before requesting revisions: hotel style, fewer transfers, a particular cruise or more guided time. Ask for the cost of a change and what it removes or adds. A shorter route can be worth discussing if it leaves more time for the experiences that matter to you. A low headline price is not useful if the resulting schedule or inclusions do not meet your needs.'],
      ['How to request a meaningful quote', 'Send your intended month and year, number of nights, adults and children with their ages, number of rooms, preferred destinations and budget currency. Identify any fixed flights, mobility requirements or activities you do not want to miss. Ask for a dated proposal with the contracting operator, total price, inclusions, exclusions and cancellation conditions before paying.'],
    ]),
  article('choosing-vietnam-private-tour-operator', 'Choosing a Vietnam Private Tour Operator: What to Check Before Booking',
    'Check who is providing the trip, what the written proposal includes and how changes are handled. A specialist title, star rating or polished itinerary is not enough to verify an operator.', [
      ['Identify the contracting operator', 'Ask which company will appear on your quotation, invoice and booking confirmation, and how its contact details relate to the website brand. Consult the operator’s own published information, then request the current documents you need to verify it. A website badge or licence number by itself is not independent certification.'],
      ['Check the proposed services, not just the itinerary story', 'Request the named accommodation or selection process, room categories, transport, guiding language and whether activities are private or shared. Confirm the services that depend on a third-party provider. A sample day plan does not establish that every described experience or privileged access is available for your travel dates.'],
      ['Use reviews in context', 'Look for a link to the original review platform and read the recent feedback relevant to your kind of trip. Check the company and location the reviews concern. An unattributed quotation or a rating copied onto a website is not the same as an independently accessible review. Distinguish a traveller’s opinion from a factual statement about a licence or booking protection.'],
      ['Ask who will help during the journey', 'Confirm how to contact the operator, what support is included and how changes are coordinated. Discuss delays, weather changes and any essential accessibility or dietary arrangements. Ask for the relevant contact process in your final documents rather than assuming round-the-clock or UK-based support from a general marketing claim.'],
      ['Read the proposal and booking conditions together', 'Check dates, names, prices, included services, payment schedule and cancellation or amendment conditions. Clarify anything that differs between the itinerary, quotation and booking terms before confirming. Keep copies of the agreed documents. This guide is a planning checklist, not a substitute for advice about your individual contract or insurance.'],
      ['Questions for VietnamTours.co.uk', 'Ask the team to identify the operator and explain the route, pace, accommodation and services in a written proposal. Tell us which arrangements need additional confirmation before you decide. Our company-information page links to the operator information published by My Way Travel; that link should be assessed as information from the operator itself.'],
    ]),
];
