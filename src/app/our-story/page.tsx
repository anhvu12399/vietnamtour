import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Vietnam Heritage Tours',
  description: 'Discover how Vietnam Heritage Tours was founded — a passion-led journey to share the authentic soul of Vietnam with discerning travellers from around the world.',
  keywords: ['Vietnam travel company', 'luxury Vietnam tours', 'about us', 'Vietnam Heritage Tours story'],
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#faf8f5] text-[#343434] flex-grow flex flex-col">

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
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-4">Est. 2008</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-light max-w-3xl leading-tight">
            Our Story
          </h1>
          <p className="mt-4 text-white/80 text-sm md:text-base max-w-xl font-light leading-relaxed">
            A decade and a half of crafting extraordinary journeys through Indochina's heart.
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A4B33] font-semibold mb-6">Where It Began</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#343434] leading-snug mb-8">
              Born from a love of Vietnam, built for those who seek more than a holiday.
            </h2>
            <p className="text-[#545454] text-sm leading-loose mb-6 font-light">
              Vietnam Heritage Tours was founded in 2008 by a small team of passionate travellers who had fallen irreversibly in love with Vietnam. They had witnessed the country's transformation — its ancient temples standing firm beside gleaming new cities, its fishing villages humming with the same rhythms as they had for centuries — and they wanted to share that wonder with the world.
            </p>
            <p className="text-[#545454] text-sm leading-loose mb-6 font-light">
              What began as a handful of carefully curated itineraries for friends and colleagues has grown into one of the most trusted names in luxury Vietnam travel. Yet our founding principle has never changed: every journey we design must be as extraordinary as the country it explores.
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
                body: 'We reject the superficial. Every experience we recommend — every guide, every lodge, every meal — has been personally vetted by our specialists. If it doesn\'t feel real, it doesn\'t make the cut.'
              },
              {
                title: 'Responsible Luxury',
                body: 'We believe that privilege comes with responsibility. Our journeys support local communities, champion sustainable practices, and leave destinations better than we found them.'
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
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A4B33] font-semibold text-center mb-4">A Journey of Our Own</p>
        <h2 className="font-serif text-3xl font-light text-center mb-16">Milestones</h2>
        <div className="space-y-12">
          {[
            { year: '2008', text: 'Founded in Hanoi with a team of five specialists and a shared love of authentic Vietnamese travel.' },
            { year: '2011', text: 'Expanded to cover Cambodia and Laos, offering full Indochina journey planning.' },
            { year: '2015', text: 'Recognised by Condé Nast Traveller as one of Southeast Asia\'s leading boutique operators.' },
            { year: '2019', text: 'Launched our Responsible Travel Charter, committing to carbon-conscious, community-first itineraries.' },
            { year: '2024', text: 'Proud to have guided over 12,000 travellers and counting — each journey as personal as the last.' },
          ].map((m) => (
            <div key={m.year} className="flex gap-8 items-start">
              <span className="font-serif text-2xl text-[#9A4B33] font-light w-16 shrink-0">{m.year}</span>
              <div className="border-t border-[#e6e2d6] pt-4 flex-1">
                <p className="text-sm text-[#545454] leading-loose font-light">{m.text}</p>
              </div>
            </div>
          ))}
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
          className="inline-block bg-white text-[#9A4B33] text-[11px] uppercase tracking-widest font-bold py-4 px-10 hover:bg-[#faf8f5] transition-colors"
        >
          Plan Your Journey
        </Link>
      </section>

    </main>
      <Footer />
    </>
  );
}
