import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripFinder from '@/components/TripFinder';
import { getFeaturedItineraries, getAccommodations, getSpecialists, getDestinations } from '@/sanity/client';

export const revalidate = 3600;

export default async function HomePage() {
  const [itineraries, accommodations, specialists, destinations] = await Promise.all([
    getFeaturedItineraries(),
    getAccommodations(),
    getSpecialists(),
    getDestinations()
  ]);

  // Value Pillars data
  const valuePillars = [
    {
      title: 'Unique to You',
      desc: 'We listen to your travel goals and craft unique trips that are completely bespoke to you.'
    },
    {
      title: 'Seamless Service',
      desc: 'UK-based specialists available 24/7, providing end-to-end support throughout your journey.'
    },
    {
      title: 'Carefully Curated',
      desc: "We've hand-selected only the finest properties, private cruises, and experiences in Vietnam."
    },
    {
      title: 'Luxury in Every Sense',
      desc: "Awarded Condé Nast Traveller's Top Travel Specialists for exemplary bespoke service."
    }
  ];

  // Grid Categories on the right side of the introductory layout
  const gridCategories = [
    {
      title: 'A Lifetime of Memories',
      image: '/images/vietnamtour_halong_yacht_luxury.png',
      link: '/itineraries/the-grand-tour-of-vietnam'
    },
    {
      title: 'Elite Resort Offers',
      image: '/images/vietnamtour_amanoi_villa.png',
      link: '/accommodations'
    },
    {
      title: 'Best Winter Sun Spots',
      image: '/images/vietnamtour_phu_quoc_beach.png',
      link: '/destinations/phu-quoc-island'
    },
    {
      title: 'Top Culinary Expeditions',
      image: '/images/vietnamtour_cave_dining.png',
      link: '/itineraries/vietnamese-culinary-and-culture-journey'
    },
    {
      title: 'Bucket List Journeys',
      image: '/images/vietnamtour_sapa_lodge.png',
      link: '/itineraries'
    },
    {
      title: 'Active & Wilderness',
      image: '/images/vietnamtour_mekong_sampan.png',
      link: '/destinations/hanoi-and-the-north'
    }
  ];

  // Four Steps data
  const planningSteps = [
    {
      num: '1',
      title: 'Make an Enquiry',
      desc: 'Submit a holiday enquiry online or connect via phone.'
    },
    {
      num: '2',
      title: 'Speak to an Expert',
      desc: 'Discuss your travel plans with your dedicated travel specialist.'
    },
    {
      num: '3',
      title: 'Receive a Quote',
      desc: 'We craft your dream holiday draft and send you a detailed proposal.'
    },
    {
      num: '4',
      title: 'Book Your Trip',
      desc: 'Once every detail is just right, we confirm your booking and protection.'
    }
  ];

  // Press quotes
  const pressQuotes = [
    {
      quote: '"With different interests, ages, and pacing, Vietnam Tour ensures every adventure is packed with special moments and bespoke touches."',
      source: 'COUNTRY & TOWN HOUSE'
    },
    {
      quote: '"For nearly four decades of expertise, Vietnam Tour has been fashioning bespoke and tailormade holidays, working 24/7 to perfect every detail."',
      source: 'THE STANDARD'
    },
    {
      quote: '"...this global tour operator specialises in high-end holidays, curating the most spectacular retreats and local encounters for the UK market."',
      source: 'CONDÉ NAST TRAVELLER'
    }
  ];

  // Trending Blog / What's Hot data
  const trendingStories = [
    {
      title: 'Expedition Cruises',
      desc: 'Surrender to the cathartic rhythm of private catamaran cruising through the lesser-visited limestone karsts of Lan Ha Bay.',
      image: '/images/vietnamtour_halong_yacht_luxury.png',
      link: '/itineraries/the-grand-tour-of-vietnam'
    },
    {
      title: 'Best New Hideaways',
      desc: 'As a team of fervent travellers, nothing excites us more than adding a brilliant new villa property like Regent Phu Quoc to our portfolio.',
      image: '/images/vietnamtour_phu_quoc_beach.png',
      link: '/accommodations/regent-phu-quoc'
    },
    {
      title: 'Memorable Dining',
      desc: 'Explore Ninh Van Bay\'s most memorable dining experiences - from sunset beach barbecues to private chef feasts inside natural rock wine caves.',
      image: '/images/vietnamtour_cave_dining.png',
      link: '/itineraries/vietnamese-culinary-and-culture-journey'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* 1. Hero Section (Full-bleed matching layout) */}
      <section className="relative h-screen min-h-[650px] flex items-center justify-start overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/vietnamtour_halong_yacht_luxury.png"
            alt="Twilight over Halong Bay, Vietnam"
            fill
            className="object-cover brightness-50 scale-100 transition-transform duration-[12s] hover:scale-105"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-slate/90 via-luxury-slate/40 to-transparent z-10" />
        </div>

        {/* Content (Left-aligned editorial layout) */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full animate-fade-in space-y-8 text-left">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] font-semibold text-luxury-gold block">
              Bespoke Luxury Travel
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-tight font-light uppercase tracking-wide text-luxury-linen">
              The Art of Travel
            </h1>
            <h2 className="font-serif text-lg sm:text-2xl text-luxury-gold/90 font-light italic tracking-wide max-w-xl">
              Where Your Journey Meets Our Legacy
            </h2>
          </div>

          {/* Quick Categories Bar (Matching layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-6">
            {[
              { name: 'FOR HONEYMOONS', href: '/enquire' },
              { name: 'FOR COUPLES', href: '/itineraries/indochine-romance-and-beach-escape' },
              { name: 'TO THE BEACH', href: '/accommodations' },
              { name: 'FOR WILDERNESS', href: '/destinations/hanoi-and-the-north' }
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="bg-luxury-slate/75 backdrop-blur-sm border border-luxury-gold/20 p-4 text-center text-[10px] tracking-widest font-semibold hover:border-luxury-gold hover:bg-luxury-gold hover:text-luxury-slate transition-all duration-300 text-luxury-linen rounded-none"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:block">
          <a href="#pillars" aria-label="Scroll down">
            <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Interactive Trip Finder Section */}
      <section className="relative z-30 max-w-6xl mx-auto px-6 -mt-16 sm:-mt-24 pb-12">
        <TripFinder itineraries={itineraries} />
      </section>

      {/* 2. Value Pillars Section */}
      <section id="pillars" className="bg-luxury-moss py-16 border-y border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePillars.map((p, idx) => (
              <div key={idx} className="space-y-3 text-center sm:text-left">
                <h3 className="font-serif text-lg text-luxury-gold font-medium border-b border-luxury-gold/10 pb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-luxury-linen/75 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Categories & Pitch Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Left Column: Title and Pitch */}
          <div className="space-y-6 lg:sticky lg:top-32">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-linen leading-tight font-medium">
              Tailor-Made Luxury Holidays <br />
              <span className="text-luxury-gold font-light italic">with Vietnam Tour</span>
            </h2>
            <div className="h-[1px] w-20 bg-luxury-gold" />
            <p className="text-sm text-luxury-linen/70 font-light leading-relaxed">
              Since our founding, we have worked tirelessly to become the premier luxury travel operator for Vietnam. With our seamless service, deep insider insights, and carefully curated collection, we design one-of-a-kind experiences.
            </p>
            <p className="text-sm text-luxury-linen/70 font-light leading-relaxed">
              Delve deep into destinations on privately guided tours, enjoy exclusive access to the country\'s most sought-after sites, and embark on journeys that are truly out of the ordinary.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/itineraries"
                className="px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none"
              >
                Discover Our Journeys
              </Link>
            </div>
          </div>

          {/* Right Columns: 2x3 Grid Categories */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gridCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group relative h-64 overflow-hidden flex items-end p-6 border border-luxury-moss/50 shadow-lg"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/90 via-luxury-slate/20 to-transparent z-10" />
                </div>
                <h3 className="relative z-20 font-serif text-lg sm:text-xl text-luxury-linen group-hover:text-luxury-gold transition-colors font-semibold">
                  {cat.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Editorial Philosophy Block */}
      <section className="bg-luxury-moss py-24 border-y border-luxury-gold/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div className="space-y-6 max-w-xl">
              <h2 className="font-serif text-3xl lg:text-4xl text-luxury-linen font-medium uppercase tracking-wide">
                The Art of Travel
              </h2>
              <div className="h-[1px] w-16 bg-luxury-gold" />
              <p className="text-sm sm:text-base text-luxury-linen/80 font-light leading-relaxed">
                Vietnam Tour has transformed travel into an art form. Every journey taken is shaped by decades of expertise and an enduring passion for exploration. Where your journey meets our legacy is not simply a promise, but an invitation to experience travel crafted with care, enriched by history, and designed to inspire for generations to come.
              </p>
              <div className="pt-4">
                <Link
                  href="/specialists"
                  className="px-6 py-2.5 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-slate text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-none"
                >
                  Meet Our Experts
                </Link>
              </div>
            </div>

            {/* Right graphic frame */}
            <div className="relative h-[450px] border border-luxury-gold/20 overflow-hidden group">
              <Image
                src="/images/vietnamtour_sapa_lodge.png"
                alt="Secrets of Sapa valleys"
                fill
                className="object-cover brightness-75 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 z-10" />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">Featured Sanctuary</span>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-light mt-1">
                  the secrets of Sapa
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Bespoke Experiences Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
            Bespoke Elements
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-luxury-linen font-medium">
            Signature Luxury Experiences
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-luxury-linen/70 font-light leading-relaxed">
            Unique activities crafted exclusively for Vietnam Tour travelers, ensuring your holiday is unlike any other.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Cave Dining in Halong Bay",
              desc: "A candle-lit gourmet banquet set up inside a private volcanic rock cave, listening to the gentle lap of waves.",
              image: "/images/vietnamtour_cave_dining.png",
              price: "Included in Luxury Programmes"
            },
            {
              title: "Private Lan Ha Bay Catamaran",
              desc: "Charter our custom catamaran to explore secret lagoons and limestone karsts far from the standard tourist paths.",
              image: "/images/vietnamtour_halong_yacht_luxury.png",
              price: "Available for Private Booking"
            },
            {
              title: "Misty Sapa Sanctuary Retreat",
              desc: "Wake up above the clouds in a hand-crafted cedar lodge overlooking emerald rice terraces, with a private local guide.",
              image: "/images/vietnamtour_sapa_lodge.png",
              price: "Featured in Adventure Tours"
            }
          ].map((exp, idx) => (
            <div key={idx} className="group flex flex-col bg-luxury-moss border border-luxury-gold/10 overflow-hidden hover:border-luxury-gold/45 transition-all duration-300 shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block">
                    {exp.price}
                  </span>
                  <h3 className="font-serif text-xl text-luxury-linen font-semibold group-hover:text-luxury-gold transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-luxury-linen/60 font-light leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-luxury-slate flex justify-start">
                  <Link
                    href="/enquire"
                    className="text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:underline flex items-center"
                  >
                    Enquire About Experience &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Four Steps Process */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-16">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl lg:text-4xl text-luxury-linen font-medium">
            Four Steps to Your Luxury Holiday
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {planningSteps.map((step, idx) => (
            <div key={idx} className="space-y-4 relative flex flex-col items-center">
              {/* Step indicator circle */}
              <div className="w-16 h-16 rounded-full border border-luxury-gold/30 bg-luxury-moss flex items-center justify-center font-serif text-xl font-semibold text-luxury-gold shadow-md">
                {step.num}
              </div>
              <h3 className="font-serif text-lg text-luxury-linen font-medium">{step.title}</h3>
              <p className="text-xs text-luxury-linen/70 font-light leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <Link
            href="/enquire"
            className="px-10 py-3.5 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-lg"
          >
            Design My Holiday
          </Link>
        </div>
      </section>

      {/* 6. In The Press Section (Client references & Badger quotes) */}
      <section className="bg-luxury-moss py-24 border-y border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-16">
          <h2 className="font-serif text-2xl lg:text-3xl text-luxury-linen font-medium">
            In the Press
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center">
            {pressQuotes.map((q, idx) => (
              <div key={idx} className="space-y-6 max-w-md mx-auto flex flex-col justify-between h-full">
                <p className="font-serif italic text-base sm:text-lg text-luxury-linen/85 leading-relaxed">
                  {q.quote}
                </p>
                <div className="space-y-2">
                  <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-gold">
                    {q.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Where to Go in the World (Carousel/Grid of destinations) */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
            Regions & Landscapes
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-luxury-linen font-medium">
            Where to Go in Vietnam
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest._id}
              href={`/destinations/${dest.slug.current}`}
              className="group relative h-80 overflow-hidden flex items-end p-6 border border-luxury-moss/50 shadow-md"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/95 via-luxury-slate/20 to-transparent z-10" />
              </div>
              <div className="relative z-20 space-y-2">
                <h3 className="font-serif text-lg text-luxury-linen group-hover:text-luxury-gold transition-colors font-medium">
                  {dest.name}
                </h3>
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold/90 font-semibold group-hover:underline flex items-center">
                  Explore Region →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. What's Hot / Blog Section */}
      <section className="bg-luxury-moss py-24 border-t border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              Trends & Guides
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-luxury-linen font-medium">
              What&rsquo;s Hot in the World of Travel?
            </h2>
            <div className="h-[1px] w-20 bg-luxury-gold mx-auto mt-4" />
            <p className="text-xs sm:text-sm text-luxury-linen/70 font-light leading-relaxed">
              Based on the latest travel trends our tour operators are seeing, here are the hottest experiences to keep on your radar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingStories.map((story, idx) => (
              <div key={idx} className="flex flex-col bg-luxury-slate border border-luxury-moss/50 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl text-luxury-linen font-semibold">
                      {story.title}
                    </h3>
                    <p className="text-xs text-luxury-linen/60 font-light leading-relaxed">
                      {story.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-luxury-moss/50">
                    <Link
                      href={story.link}
                      className="text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:underline flex items-center"
                    >
                      Explore More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final Secluded Dark CTA */}
      <section className="relative bg-luxury-slate text-luxury-linen py-24 overflow-hidden border-t border-luxury-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,168,128,0.12),transparent_50%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
            Bespoke Planning
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-snug">
            Draft Your Dream Itinerary
          </h2>
          <p className="text-sm sm:text-base font-light text-luxury-linen/70 max-w-2xl mx-auto leading-relaxed">
            Every holiday we design is unique. Speak directly to Alice Mercer or James Harrison to tailor your travel dates, properties, and dining pacing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href="/enquire"
              className="w-full sm:w-auto px-10 py-4 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-lg"
            >
              Start Planning
            </Link>
            <a
              href="tel:+442078459200"
              className="text-sm font-semibold tracking-wider text-luxury-gold hover:text-white transition-colors"
            >
              Call +44 (0) 20 7845 9200
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
