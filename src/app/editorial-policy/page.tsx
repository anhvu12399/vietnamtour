import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Editorial Policy and Sources',
  description: 'How to read our Vietnam travel guides, distinguish planning suggestions from confirmed services, and report a correction.',
  alternates: { canonical: 'https://www.vietnamtours.co.uk/editorial-policy' },
};
export default function EditorialPolicyPage() {
  return <><Navbar /><main className="mx-auto max-w-3xl space-y-8 px-6 pb-24 pt-36 text-sm leading-relaxed text-ink-soft">
    <h1 className="font-serif text-4xl text-ink">Editorial policy and sources</h1>
    <p>Our guides help you compare destinations and prepare questions for a private itinerary. A guide is not a booking confirmation, live availability feed or personal medical or legal assessment.</p>
    <section className="space-y-3"><h2 className="font-serif text-2xl text-ink">Sources and changing information</h2><p>Use the sources linked beside the relevant planning information. Government entry rules, provider schedules, prices and local conditions can change. A date attached to one source check does not mean that every statement on the page has been independently verified on that date.</p></section>
    <section className="space-y-3"><h2 className="font-serif text-2xl text-ink">Authors, reviewers and experience</h2><p>Named author, review and field-visit records are shown when they are recorded with the article. We do not use the current build date as an automatic fact-check date. A general team byline identifies the publisher; it is not evidence that a particular person visited every place described.</p></section>
    <section className="space-y-3"><h2 className="font-serif text-2xl text-ink">Suggestions and quotations</h2><p>Sample routes, hotel ideas and catalogue prices need confirmation for your dates. Ask for the operator, services, total price and conditions in a written proposal. A suggested activity is not a promise of special access or a confirmed arrangement.</p></section>
    <section className="space-y-3"><h2 className="font-serif text-2xl text-ink">Corrections and enquiries</h2><p>If you spot information that needs correction, email <a className="underline" href="mailto:info@vietnamtours.co.uk">info@vietnamtours.co.uk</a> with the page URL and the relevant source. For a trip proposal, <Link href="/enquire" className="underline">contact the travel team</Link>.</p></section>
  </main><Footer /></>;
}
