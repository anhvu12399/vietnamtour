import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BreadcrumbJsonLd, ItemListJsonLd } from '@/components/SeoJsonLd';
import { ukGuides } from '@/lib/ukGuidesData';
import { absoluteUrl } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Vietnam Planning Guides for UK Travellers',
  description:
    'Vietnam planning guides for UK travellers: flights from London, tour costs in pounds, best time to visit, safety and 7–21 day itineraries.',
  alternates: { canonical: absoluteUrl('/vietnam-guides') },
};

export default function VietnamGuidesIndex() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Vietnam Guides for UK Travellers', url: '/vietnam-guides' }]} />
      <ItemListJsonLd name="Vietnam guides for UK travellers" items={ukGuides.map((g) => ({ name: g.title, url: g.path }))} />
      <Navbar />
      <main className="min-h-screen bg-paper text-ink">
        <section className="max-w-5xl mx-auto px-6 pt-32 pb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block mb-3">Plan your trip</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-tight mb-5">Vietnam guides for UK travellers</h1>
          <p className="text-base sm:text-lg text-ink-soft font-light max-w-3xl leading-relaxed">
            Straight answers to the questions UK travellers ask before booking a private Vietnam tour: flights, visas, costs in pounds, the best time to go, safety and sample itineraries.
          </p>
        </section>
        <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-5">
          {ukGuides.map((g) => (
            <Link key={g.slug} href={g.path} className="block bg-white border border-line p-6 hover:border-gold hover:shadow-lg transition-all">
              <span className="text-[9px] uppercase tracking-widest text-gold font-bold">{g.category}</span>
              <h2 className="font-serif text-xl text-ink mt-2 mb-3 leading-snug">{g.title}</h2>
              <p className="text-sm text-ink-soft font-light leading-relaxed">{g.answer}</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
