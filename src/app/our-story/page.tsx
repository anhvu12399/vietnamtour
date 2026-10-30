import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About VietnamTours',
  description: 'Learn how to plan a private Vietnam journey, contact the travel team and check the operator information before booking.',
  keywords: ['Vietnam travel company', 'luxury Vietnam tours', 'about us', 'VietnamTours.co.uk story'],
  alternates: {
    canonical: 'https://www.vietnamtours.co.uk/our-story',
  },
  openGraph: {
    title: 'About VietnamTours',
    description: 'A passion-led journey to share the authentic soul of Vietnam with discerning travellers.',
    url: 'https://www.vietnamtours.co.uk/our-story',
    images: [{ url: '/images/dest_hoian_lanterns.png', width: 1200, height: 630, alt: 'Our Story - VietnamTours.co.uk' }],
  },
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper text-ink flex-grow flex flex-col">

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src="/images/our-story-hero.jpg"
          alt="Traditional junk boat sailing Halong Bay at sunset"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center px-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-4">Private Vietnam travel</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-light max-w-3xl leading-tight">
            Our Story
          </h1>
          <p className="mt-4 text-white/80 text-sm md:text-base max-w-xl font-light leading-relaxed">
            Plan your Vietnam journey around the places, pace and experiences that matter to you.
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-copper font-semibold mb-6">Where It Began</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-ink leading-snug mb-8">
              Born from a love of Vietnam, built for those who seek more than a holiday.
            </h2>
            <p className="text-ink-soft text-sm leading-loose mb-6 font-light">
              VietnamTours.co.uk brings together sample private itineraries, destination guides and practical planning information. Use these as a starting point, then discuss the route, accommodation and budget with the travel team.
            </p>
            <p className="text-ink-soft text-sm leading-loose mb-6 font-light">
              A sample itinerary is not a confirmed booking. Your written proposal should identify the operator, the services included, the total price and the applicable booking conditions before you pay.
            </p>
          </div>
          <div className="relative h-[460px] w-full overflow-hidden">
            <Image
              src="/images/our-story-hero.jpg"
              alt="Halong Bay at sunset"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Strip */}
      <section className="bg-[#343434] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold text-center mb-4">Our Values</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-center mb-16">
            What We Believe In
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Authenticity Above All',
                body: 'Discuss the experiences you want and ask how each activity will be delivered. Confirm the guide, language and local arrangements in your proposal.'
              },
              {
                title: 'Responsible Luxury',
                body: 'Ask about local guides, community visits and the practical impact of your itinerary. Choose the activities and pace that suit your interests.'
              },
              {
                title: 'Bespoke by Nature',
                body: 'We do not sell packages — we create experiences. Every itinerary begins with a conversation, and ends with a journey that is entirely, unmistakably yours.'
              }
            ].map((v) => (
              <div key={v.title} className="border-t border-white/10 pt-8">
                <h3 className="font-serif text-lg text-gold mb-4">{v.title}</h3>
                <p className="text-white/70 text-sm leading-loose font-light">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-[10px] uppercase tracking-[0.3em] text-copper font-semibold text-center mb-4">From enquiry to itinerary</p>
        <h2 className="font-serif text-3xl font-light text-center mb-16">How planning works</h2>
        <div className="space-y-12">
          {[
            { year: '01', text: 'Share your dates, interests, group size and budget.' },
            { year: '02', text: 'Discuss the route, pace, accommodation and transport options.' },
            { year: '03', text: 'Check the written proposal, operator details, inclusions and cancellation conditions.' },
            { year: '04', text: 'Confirm your chosen arrangements and keep a copy of your booking documents.' },
          ].map((m) => (
            <div key={m.year} className="flex gap-8 items-start">
              <span className="font-serif text-2xl text-copper font-light w-16 shrink-0">{m.year}</span>
              <div className="border-t border-line pt-4 flex-1">
                <p className="text-sm text-ink-soft leading-loose font-light">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-ink-soft">
          <h2 className="font-serif text-3xl text-ink">Operator information and contact</h2>
          <p>VietnamTours.co.uk identifies My Way Travel as its operator. My Way Travel publishes its company and licensing information on its own website. Consult that source and confirm the contracting company in your written quotation.</p>
          <p><a href="https://www.mywaytravel.com/why-us/" className="underline">My Way Travel: company and operator information</a></p>
          <p>Website contact: <a href="mailto:info@vietnamtours.co.uk" className="underline">info@vietnamtours.co.uk</a> · <a href="tel:+84988600388" className="underline">+84 988600388</a>.</p>
          <p>This is a link to information supplied by the operator, not an independent certification. Request the current licence and booking documents if you need to verify them before payment.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#9A4B33] py-20 px-6 text-center text-white">
        <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
          Begin Your Story in Vietnam
        </h2>
        <p className="text-white/80 text-sm font-light mb-10 max-w-md mx-auto">
          Speak with one of our specialists and let us craft a journey that is entirely your own.
        </p>
        <Link
          href="/enquire"
          className="inline-block bg-white text-copper text-[11px] uppercase tracking-widest font-bold py-4 px-10 hover:bg-paper transition-colors"
        >
          Plan Your Journey
        </Link>
      </section>

    </main>
      <Footer />
    </>
  );
}
