import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vietnam Visa Guide 2024 | Vietnam Heritage Tours',
  description: 'Everything you need to know about obtaining a visa for Vietnam — e-visa applications, visa on arrival, entry requirements, and expert tips for UK, EU, and international travellers.',
  keywords: ['Vietnam visa', 'e-visa Vietnam', 'Vietnam visa on arrival', 'Vietnam entry requirements', 'UK passport Vietnam visa'],
};

const visaTypes = [
  {
    type: 'E-Visa (Recommended)',
    duration: 'Up to 90 days, single or multiple entry',
    cost: 'USD $25',
    processingTime: '3 business days',
    suitable: 'All nationalities. The simplest and most convenient option.',
    steps: [
      'Apply online at evisa.xuatnhapcanh.gov.vn',
      'Upload your passport photo and passport data page',
      'Pay the $25 fee by card',
      'Receive your e-visa via email within 3 business days',
      'Present the printed or digital e-visa upon arrival',
    ],
  },
  {
    type: 'Visa on Arrival (Pre-arranged)',
    duration: 'Up to 30 days (extendable)',
    cost: 'USD $25 stamping fee + agency processing fee',
    processingTime: '1–3 business days for the approval letter',
    suitable: 'Travellers arriving by air only. Not valid for land or sea borders.',
    steps: [
      'Apply through a licensed Vietnam agency for an approval letter',
      'Receive your approval letter by email',
      'On arrival, queue at the Visa on Arrival counter',
      'Present your approval letter, photos, and fee',
      'Receive your visa stamp and proceed to immigration',
    ],
  },
  {
    type: 'Visa Exemption',
    duration: 'Up to 45 days (no extension possible)',
    cost: 'Free',
    processingTime: 'No application required',
    suitable: 'Citizens of the UK, Germany, France, Italy, Spain, and several other countries.',
    steps: [
      'No action required',
      'Simply book your flights and accommodation',
      'Present your valid passport upon arrival in Vietnam',
      'You may stay for up to 45 days without a visa',
    ],
  },
];

export default function VisaGuidePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#faf8f5] text-[#343434] flex-grow flex flex-col">

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src="/images/visa-guide-hero.jpg"
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
          <span className="font-bold">Good news for UK travellers:</span> British passport holders currently enjoy{' '}
          <span className="underline underline-offset-2">45-day visa-free entry</span> to Vietnam. No application required.
        </p>
      </section>

      {/* Visa Types */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A4B33] font-semibold text-center mb-4">Visa Options</p>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-center mb-16">
          Which Visa Is Right for You?
        </h2>
        <div className="space-y-8">
          {visaTypes.map((v, i) => (
            <div key={i} className="bg-white border border-[#e6e2d6] p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  <h3 className="font-serif text-xl text-[#343434] mb-1">{v.type}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#9A4B33] font-semibold">{v.suitable}</p>
                </div>
                <div className="flex gap-6 text-center shrink-0">
                  <div className="bg-[#faf8f5] px-5 py-3">
                    <p className="text-[9px] uppercase tracking-widest text-[#545454] mb-1">Cost</p>
                    <p className="font-serif text-base text-[#343434]">{v.cost}</p>
                  </div>
                  <div className="bg-[#faf8f5] px-5 py-3">
                    <p className="text-[9px] uppercase tracking-widest text-[#545454] mb-1">Processing</p>
                    <p className="font-serif text-base text-[#343434]">{v.processingTime}</p>
                  </div>
                  <div className="bg-[#faf8f5] px-5 py-3">
                    <p className="text-[9px] uppercase tracking-widest text-[#545454] mb-1">Stay</p>
                    <p className="font-serif text-base text-[#343434]">{v.duration}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#545454] font-semibold mb-4">Step-by-Step Process</p>
                <ol className="space-y-2">
                  {v.steps.map((step, j) => (
                    <li key={j} className="flex gap-4 items-start">
                      <span className="w-5 h-5 rounded-full bg-[#9A4B33]/10 text-[#9A4B33] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {j + 1}
                      </span>
                      <span className="text-sm text-[#545454] font-light leading-relaxed">{step}</span>
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
              { tip: 'Passport validity', detail: 'Your passport must be valid for at least 6 months beyond your intended departure date from Vietnam.' },
              { tip: 'Blank pages', detail: 'Ensure you have at least two blank visa pages in your passport for stamps.' },
              { tip: 'E-visa format', detail: 'Download and print your e-visa approval letter before you fly. Airline staff may ask to see it at check-in.' },
              { tip: 'Entry points', detail: 'E-visas are valid at all official international border crossings — airports, land borders, and seaports.' },
              { tip: 'Extension', detail: 'If you wish to stay beyond your visa period, extensions can be arranged in-country through a local agent.' },
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
        <p className="text-sm text-[#545454] font-light mb-10 max-w-md mx-auto">
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
