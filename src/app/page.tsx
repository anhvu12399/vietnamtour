import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripFinder from '@/components/TripFinder';
import HeroSlider from '@/components/HeroSlider';
import { getFeaturedItineraries, getAccommodations, getSpecialists, getDestinations, getHomepage } from '@/sanity/client';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  return {
    title: homepage?.seoTitle || 'VietnamTour.co.uk | Luxury Bespoke Travel Vietnam',
    description: homepage?.seoDescription || 'Experience ultra-luxury travel in Vietnam. Fully bespoke itineraries curated by local specialists.',
  };
}

export default async function HomePage() {
  try {
    const [itineraries, accommodations, specialists, destinations, homepage] = await Promise.all([
      getFeaturedItineraries(),
      getAccommodations(),
      getSpecialists(),
      getDestinations(),
      getHomepage(),
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

    // TripAdvisor reviews data
    const tripAdvisorReviews = [
      {
        title: "Bespoke Perfection: Our 2-Week Luxury Journey",
        text: "Vietnam Tour exceeded every expectation. Alice Mercer designed a flawless honeymoon covering Amanoi, a private catamaran in Lan Ha Bay, and historic sidecar tours in Hanoi. Every hotel stay included exclusive upgrades, and our private guides felt like family. Truly a bespoke luxury experience.",
        author: "Charles & Victoria S.",
        location: "London, UK",
        rating: 5,
        date: "June 2026",
        highlights: ["Private Yacht Charter", "Bespoke Itinerary", "Amanoi Retreat"]
      },
      {
        title: "Flawless Multi-Generational Family Holiday",
        text: "Traveling with three generations is challenging, but Alice orchestrated a seamless flow. From private cooking classes inside rock caves to slow luxury sampan cruising in the Mekong Delta, everything was tailored to our pacing. The attention to detail was incredible.",
        author: "The Sinclair Family",
        location: "Surrey, UK",
        rating: 5,
        date: "May 2026",
        highlights: ["Mekong Sampan", "Cave Dining", "Private Guides"]
      },
      {
        title: "Unrivaled Local Access and Elite Service",
        text: "James Harrison set us up with local historians in Saigon and arranged a private helicopter transfer to Ninh Van Bay. His insider tips on Ninh Thuan were spot-on. Vietnam Tour is in a league of its own for luxury Indochina travel. Worth every penny.",
        author: "Sir Arthur & Lady Evelyn",
        location: "Edinburgh, Scotland",
        rating: 5,
        date: "April 2026",
        highlights: ["Helicopter Transfer", "Expert Insights", "VIP Airport Meet"]
      }
    ];

    return (
      <>
        <Navbar />
        
        {/* 1. Hero Section — Premium Slideshow */}
        <HeroSlider
          heroHeading={homepage?.heroHeading}
          heroSubheading={homepage?.heroSubheading}
        />

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
                {homepage?.introHeading ? (
                  homepage.introHeading
                ) : (
                  <>Tailor-Made Luxury Holidays <br />
                  <span className="text-luxury-gold font-light italic">with Vietnam Tour</span></>
                )}
              </h2>
              <div className="h-[1px] w-20 bg-luxury-gold" />
              <p className="text-sm text-luxury-linen/70 font-light leading-relaxed">
                {homepage?.introParagraph1 || "Since our founding, we have worked tirelessly to become the premier luxury travel operator for Vietnam. With our seamless service, deep insider insights, and carefully curated collection, we design one-of-a-kind experiences."}
              </p>
              <p className="text-sm text-luxury-linen/70 font-light leading-relaxed">
                {homepage?.introParagraph2 || "Delve deep into destinations on privately guided tours, enjoy exclusive access to the country's most sought-after sites, and embark on journeys that are truly out of the ordinary."}
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
              {(homepage?.gridCategories && homepage.gridCategories.length > 0 ? homepage.gridCategories : gridCategories).map((cat, idx) => (
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

        {/* 7. What Our Guests Have Said on TripAdvisor */}
        <section className="py-28 bg-luxury-slate relative overflow-hidden border-t border-luxury-gold/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.05),transparent_40%)]" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Sticky Summary Card on the Left (4 columns) */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
                    Guest Chronicles
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-linen leading-tight font-medium">
                    Voices of the <br />
                    <span className="text-luxury-gold font-light italic">Journey</span>
                  </h2>
                  <div className="h-[1px] w-16 bg-luxury-gold" />
                </div>
                
                {/* TripAdvisor Badge Box */}
                <div className="p-8 bg-luxury-moss border border-luxury-gold/15 space-y-6">
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-luxury-gold" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z" />
                    </svg>
                    <span className="font-serif text-sm tracking-widest font-semibold uppercase text-luxury-gold">tripadvisor</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-luxury-gold flex items-center justify-center text-[10px] text-luxury-moss">
                          ●
                        </div>
                      ))}
                      <span className="text-lg font-serif font-bold text-luxury-linen ml-2">5.0</span>
                    </div>
                    <p className="text-xs text-luxury-linen/70 font-light leading-relaxed">
                      Based on verified guest feedback, Vietnam Tour is rated #1 Specialty Lodging and Tour Operator in Vietnam with 100% Excellent reviews.
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <a 
                      href="https://www.tripadvisor.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gold hover:underline flex items-center"
                    >
                      Read All TripAdvisor Reviews &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Asymmetrical Reviews List on the Right (8 columns) */}
              <div className="lg:col-span-8 space-y-12">
                {tripAdvisorReviews.map((rev, idx) => {
                  const offsets = [
                    "lg:mr-12",
                    "lg:ml-12 border-l border-luxury-gold/30",
                    "lg:mr-6 lg:ml-6"
                  ];
                  
                  return (
                    <div 
                      key={idx} 
                      className={`p-8 bg-luxury-moss/30 border border-luxury-gold/10 hover:border-luxury-gold/30 hover:bg-luxury-moss/50 transition-all duration-500 rounded-none shadow-xl relative group ${offsets[idx]}`}
                    >
                      <span className="absolute right-6 top-4 text-7xl font-serif text-luxury-gold/5 select-none pointer-events-none group-hover:text-luxury-gold/10 transition-colors duration-500">
                        “
                      </span>
                      
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center space-x-1">
                            {[...Array(rev.rating)].map((_, i) => (
                              <span key={i} className="text-luxury-gold text-sm">★</span>
                            ))}
                            <span className="text-[10px] uppercase tracking-wider text-luxury-linen/50 ml-2">{rev.date}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                            Verified Guest
                          </span>
                        </div>
                        
                        <h3 className="font-serif text-xl text-luxury-linen font-medium leading-snug group-hover:text-luxury-gold transition-colors">
                          &ldquo;{rev.title}&rdquo;
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-luxury-linen/80 font-light leading-relaxed italic">
                          {rev.text}
                        </p>
                        
                        <div className="pt-4 border-t border-luxury-gold/10 flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <span className="font-serif text-sm text-luxury-gold font-medium block">{rev.author}</span>
                            <span className="text-[10px] text-luxury-linen/50 block">{rev.location}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {rev.highlights.map((h, i) => (
                              <span key={i} className="text-[9px] uppercase tracking-wider bg-luxury-gold/10 text-luxury-gold px-2.5 py-1 font-medium border border-luxury-gold/15">
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* 8. Meet Our Specialists */}
        <section className="py-28 bg-luxury-moss relative overflow-hidden border-t border-luxury-gold/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,168,128,0.04),transparent_50%)]" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-20">
            
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
                Architects of the Extraordinary
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-luxury-linen font-medium leading-tight">
                Meet Our Travel Specialists
              </h2>
              <div className="h-[1px] w-20 bg-luxury-gold mx-auto mt-4" />
              <p className="text-xs sm:text-sm text-luxury-linen/70 font-light leading-relaxed">
                We don&apos;t just book trips. We map out memories. Our experts have lived in and mapped out every corner of Vietnam to curate your perfect itinerary.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
              {specialists.map((spec, idx) => {
                const isEven = idx % 2 === 0;
                
                return (
                  <div 
                    key={spec._id} 
                    className={`flex flex-col space-y-8 group ${!isEven ? 'lg:pt-12' : ''}`}
                  >
                    <div className="relative h-[480px] w-full overflow-hidden border border-luxury-gold/20 group-hover:border-luxury-gold/50 transition-all duration-700 shadow-2xl flex items-end">
                      <Image
                        src={spec.image || (isEven ? '/images/specialist_alice.png' : '/images/specialist_james.png')}
                        alt={spec.name}
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-[1000ms] brightness-90 group-hover:brightness-95"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-luxury-slate/20 to-transparent opacity-90 z-10" />
                      
                      <div className="absolute top-6 right-6 bg-luxury-moss/80 backdrop-blur-sm border border-luxury-gold/20 px-4 py-2 z-20">
                        <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-semibold">
                          Certified Specialist
                        </span>
                      </div>

                      <div className="relative z-20 p-8 space-y-2 w-full">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-gold block">
                          {spec.role}
                        </span>
                        <h3 className="font-serif text-3xl text-white font-medium group-hover:text-luxury-gold transition-colors duration-300">
                          {spec.name}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-6 flex-grow flex flex-col justify-between">
                      <p className="text-sm text-luxury-linen/75 font-light leading-relaxed">
                        {Array.isArray(spec.bio) && spec.bio[0]?.children?.[0]?.text
                          ? spec.bio[0].children[0].text
                          : "A passionate traveler with over a decade mapping out bespoke paths through Indochina. Dedicated to crafting seamless, private, and unforgettable experiences."}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block">
                          Favorite Havens:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(spec.favoriteDestinations || ['Hoi An', 'Sapa', 'Amanoi']).map((dest, i) => (
                            <span 
                              key={i} 
                              className="text-[10px] text-luxury-linen bg-luxury-slate/40 border border-luxury-gold/15 px-3 py-1 font-light rounded-none"
                            >
                              {dest}
                            </span>
                          ))}
                        </div>
                      </div>

                      {spec.expertTips && spec.expertTips.length > 0 && (
                        <div className="p-5 bg-luxury-slate/40 border-l border-luxury-gold space-y-2 shadow-inner">
                          <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-semibold block">
                            Bespoke Insider Tip:
                          </span>
                          <p className="text-xs italic text-luxury-linen/85 leading-relaxed font-light">
                            &ldquo;{spec.expertTips[0]}&rdquo;
                          </p>
                        </div>
                      )}

                      <div className="pt-4 border-t border-luxury-gold/10 flex items-center justify-between">
                        <a 
                          href={`mailto:${spec.email}`}
                          className="text-xs text-luxury-linen hover:text-luxury-gold transition-colors block font-medium"
                        >
                          ✉ {spec.email}
                        </a>
                        <Link
                          href={`/specialists/${spec.slug?.current || ''}`}
                          className="text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:underline flex items-center"
                        >
                          Consult {spec.name.split(' ')[0]} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
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
  } catch (err: any) {
    return (
      <div style={{ padding: '2rem', backgroundColor: '#7f1d1d', color: 'white', fontFamily: 'monospace', minHeight: '100vh' }}>
        <h1>Server-side Rendering Error:</h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{err?.message || 'Unknown Error'}</p>
        {err?.stack && <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{err.stack}</pre>}
      </div>
    );
  }
}
