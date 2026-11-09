import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vietnam Visa Guide for UK Travellers',
  description: 'Everything you need to know about obtaining a visa for Vietnam — visa exemption, e-visa fees and official entry guidance for UK and international travellers.',
  keywords: ['Vietnam visa', 'e-visa Vietnam', 'Vietnam visa on arrival', 'Vietnam entry requirements', 'UK passport Vietnam visa', 'Vietnam visa 2026'],
  alternates: {
    canonical: 'https://www.vietnamtours.co.uk/visa-guide',
  },
  openGraph: {
    title: 'Vietnam Visa Guide 2026 | Entry Requirements & Tips',
    description: 'Everything you need to know about obtaining a visa for Vietnam — e-visa applications, entry requirements, and expert tips for UK travellers.',
    url: 'https://www.vietnamtours.co.uk/visa-guide',
    images: [{ url: '/images/unsplash/halong.jpg', width: 1200, height: 630, alt: 'Vietnam visa guide' }],
  },
};

const visaTypes = [
  {
    type: 'Visa exemption: British citizen passports',
    duration: 'Up to 45 days', cost: 'No visa fee', processingTime: 'No visa application',
    suitable: 'Check the conditions for your passport, purpose and length of stay.',
    steps: ['Check GOV.UK and the Vietnamese authorities before travel', 'Check passport validity and your permitted stay', 'Check any arrival-card or health-declaration requirements'],
  },
  {
    type: 'E-visa for eligible longer stays',
    duration: 'Up to 90 days', cost: 'US$25 single / US$50 multiple entry', processingTime: 'Allow time for processing',
    suitable: 'Check eligibility, entry points and validity on the official portal.',
    steps: ['Apply through evisa.gov.vn', 'Upload the required passport details and photograph', 'Select single or multiple entry and pay the applicable fee', 'Check the application result; approval within 24 hours is not guaranteed', 'Check the approved dates and entry details before departure'],
  },
];

export default function VisaGuidePage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper text-ink flex-grow flex flex-col">

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src="/images/unsplash/hanoi.jpg"
          alt="Vietnam travel essentials: passport, map and visa"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center px-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-4">Travel Essentials</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light">Vietnam Visa Guide</h1>
          <p className="mt-3 text-white/80 text-sm max-w-lg font-light">
            Everything you need to enter Vietnam smoothly — explained clearly.
          </p>
        </div>
      </section>

      {/* UK Exemption Banner */}
      <section className="bg-[#9A4B33] text-white py-8 px-6 text-center">
        <p className="text-sm font-light">
          <span className="font-bold">Good news for UK travellers:</span> British citizen passport holders can generally use{' '}
          <span className="underline underline-offset-2">45-day visa-free entry</span> to Vietnam. Check the official conditions before booking.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pt-10 text-sm leading-relaxed text-ink-soft">
        <h2 className="font-serif text-2xl text-ink">Official sources</h2>
        <p className="mt-3">Entry guidance consulted on <time dateTime="2026-10-28">28 October 2026</time>. Rules can change; confirm your individual requirements before travelling.</p>
        <ul className="mt-3 space-y-2">
          <li><a className="underline" href="https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements">GOV.UK: Vietnam entry requirements</a></li>
          <li><a className="underline" href="https://evisa.gov.vn/">Vietnam official e-visa application and fees</a></li>
        </ul>
      </section>

      {/* Visa Types */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-[10px] uppercase tracking-[0.3em] text-copper font-semibold text-center mb-4">Visa Options</p>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-center mb-16">
          Which Visa Is Right for You?
        </h2>
        <div className="space-y-8">
          {visaTypes.map((v, i) => (
            <div key={i} className="bg-white border border-line p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  <h3 className="font-serif text-xl text-ink mb-1">{v.type}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-copper font-semibold">{v.suitable}</p>
                </div>
                <div className="grid gap-4 text-center sm:grid-cols-3 md:max-w-lg">
                  <div className="bg-paper px-5 py-3">
                    <p className="text-[9px] uppercase tracking-widest text-ink-soft mb-1">Cost</p>
                    <p className="font-serif text-base text-ink">{v.cost}</p>
                  </div>
                  <div className="bg-paper px-5 py-3">
                    <p className="text-[9px] uppercase tracking-widest text-ink-soft mb-1">Processing</p>
                    <p className="font-serif text-base text-ink">{v.processingTime}</p>
                  </div>
                  <div className="bg-paper px-5 py-3">
                    <p className="text-[9px] uppercase tracking-widest text-ink-soft mb-1">Stay</p>
                    <p className="font-serif text-base text-ink">{v.duration}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink-soft font-semibold mb-4">Step-by-Step Process</p>
                <ol className="space-y-2">
                  {v.steps.map((step, j) => (
                    <li key={j} className="flex gap-4 items-start">
                      <span className="w-5 h-5 rounded-full bg-[#9A4B33]/10 text-copper text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {j + 1}
                      </span>
                      <span className="text-sm text-ink-soft font-light leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="bg-[#343434] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold text-center mb-4">Expert Advice</p>
          <h2 className="font-serif text-3xl font-light text-center mb-14">Before You Travel</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { tip: 'Passport validity', detail: 'GOV.UK specifies at least 6 months of passport validity from arrival. Check the current requirements before travel.' },
              { tip: 'Blank pages', detail: 'Ensure you have at least two blank visa pages in your passport for stamps.' },
              { tip: 'E-visa format', detail: 'Download and print your e-visa approval letter before you fly. Airline staff may ask to see it at check-in.' },
              { tip: 'Entry points', detail: 'Check that your intended entry and exit points are permitted for your visa on the official portal.' },
              { tip: 'Extension', detail: 'Do not assume an extension is available. Ask the Vietnamese immigration authorities about your circumstances before your permission expires.' },
              { tip: 'Our assistance', detail: 'Our specialists are happy to guide you through the application process as part of your trip planning — simply ask.' },
            ].map((t) => (
              <div key={t.tip} className="border-t border-white/10 pt-6">
                <h4 className="text-gold text-sm font-semibold mb-2">{t.tip}</h4>
                <p className="text-white/70 text-sm font-light leading-relaxed">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="font-serif text-3xl font-light mb-4">Ready to Plan Your Vietnam Journey?</h2>
        <p className="text-sm text-ink-soft font-light mb-10 max-w-md mx-auto">
          Our travel specialists handle all the details — including visa guidance — so you can simply look forward to your trip.
        </p>
        <Link
          href="/enquire"
          className="inline-block bg-[#9A4B33] text-white text-[11px] uppercase tracking-widest font-bold py-4 px-10 hover:bg-[#7e3c28] transition-colors"
        >
          Speak to a Specialist
        </Link>
      </section>

    </main>
      <Footer />
    </>
  );
}
