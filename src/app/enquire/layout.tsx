import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Your Vietnam Holiday | Free Consultation',
  description: 'Share your Vietnam travel dates, preferences and budget to discuss itinerary options with the travel team. No obligation to book.',
  keywords: ['plan Vietnam holiday', 'Vietnam tour quote', 'bespoke Vietnam itinerary', 'Vietnam travel consultant', 'book Vietnam tour UK', 'Vietnam holiday enquiry'],
  alternates: {
    canonical: 'https://www.vietnamtours.co.uk/enquire',
  },
  openGraph: {
    title: 'Plan Your Vietnam Holiday | Free Consultation',
    description: 'Share your travel preferences to discuss itinerary options with the Vietnam travel team. No obligation to book.',
    url: 'https://www.vietnamtours.co.uk/enquire',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
