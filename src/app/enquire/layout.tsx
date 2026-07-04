import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Your Vietnam Holiday | Free Consultation | VietnamTours.co.uk',
  description: 'Start planning your bespoke Vietnam holiday. Tell us your travel dates, preferences and budget — our specialists will craft a personalised itinerary within 48 hours. No obligation.',
  keywords: ['plan Vietnam holiday', 'Vietnam tour quote', 'bespoke Vietnam itinerary', 'Vietnam travel consultant', 'book Vietnam tour UK', 'Vietnam holiday enquiry'],
  alternates: {
    canonical: 'https://www.vietnamtours.co.uk/enquire',
  },
  openGraph: {
    title: 'Plan Your Vietnam Holiday | Free Consultation',
    description: 'Tell us your travel preferences — our Vietnam specialists will craft a personalised itinerary within 48 hours. No obligation.',
    url: 'https://www.vietnamtours.co.uk/enquire',
  },
};

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
