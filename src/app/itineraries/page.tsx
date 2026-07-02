import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getItineraries, getSpecialists, getToursLanding, getPosts } from '@/sanity/client';

export const revalidate = 3600;

// Helper function to calculate reading time based on block content
function getReadingTime(content: any[] | undefined | null): number {
  if (!content || !Array.isArray(content)) return 4; // fallback to 4 min read
  let wordCount = 0;
  content.forEach((block: any) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          wordCount += child.text.trim().split(/\s+/).length;
        }
      });
    }
  });
  return Math.max(2, Math.ceil(wordCount / 220)); // Average reading speed: 220 WPM
}

export default async function ItinerariesPage() {
  const specialists = await getSpecialists();
  const mainSpecialist = specialists[0] || {
    name: "Alice Mercer",
    role: "Vietnam Specialist",
    image: "/images/specialist_alice.png",
    slug: { current: "alice-mercer" }
  };

  const [itineraries, toursLanding, allPosts] = await Promise.all([
    getItineraries(),
    getToursLanding(),
    getPosts(),
  ]);

  // Fallbacks if data is missing or useMock is true
  const heroHeading = toursLanding?.heroHeading || 'Bespoke Vietnam Itineraries';
  const heroImage = toursLanding?.heroImage || '/images/hero_hoian.png';
  
  const faqs = toursLanding?.faqs?.length ? toursLanding.faqs : [
    { question: 'When is the best time to visit Vietnam?', answer: 'Vietnam is a year-round destination, but the best time generally depends on the regions you plan to visit. Spring (February to April) and Autumn (August to October) offer the most pleasant weather across the country.' },
    { question: 'Do I need a visa for Vietnam?', answer: 'Many nationalities are eligible for an e-Visa or visa exemption for short stays. We recommend checking the latest requirements with your local embassy before travel.' },
    { question: 'Can the itineraries be customized?', answer: 'Absolutely. Every itinerary we offer is just a starting point. Our travel specialists will tailor the journey to your exact preferences, from accommodations to exclusive experiences.' },
  ];

  const inspirationPosts = toursLanding?.inspirationPosts?.length 
    ? toursLanding.inspirationPosts 
    : allPosts.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-bg-light text-[#343434] font-sans">
        
        {/* ── 1. SCENIC HERO BANNER ── */}
        <section className="relative h-[320px] sm:h-[400px] lg:h-[450px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage}
            alt="Vietnam Tours Landscape Header"
            fill
            className="object-cover brightness-[0.65]"
            priority
          />
          <div className="absolute inset-0 bg-[#0e1628]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32 lg:pt-36">
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold block mb-2">
              Heritage Journeys
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight tracking-wide drop-shadow-sm">
              {heroHeading}
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Vietnam</span>
            </div>
          </div>
        </section>

        {/* ── 2. CHARCOAL SLATE CATEGORIES TAB BAR ── */}
        <CategoriesTabBar activeTab="tours" />

        {/* ── 3. TWO-COLUMN DETAILS & LOCAL EXPERT ── */}
        <section id="details" className="py-20 px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Vietnam Intro Text) */}
            <div className="lg:col-span-8 space-y-6 text-[#545454] leading-relaxed font-light text-sm md:text-base">
              <p className="font-serif text-xl lg:text-2xl font-light text-green leading-relaxed">
                Travelers love Vietnam for its friendly people, rich culture, and breathtaking landscapes – from charming towns to lush countryside.
              </p>
              
              <p>
                In Hanoi, the capital, take in delicious meals in lovely French colonial villas, shop at chic boutiques, and explore the charming Old Quarter. Travel south to Hoi An, a UNESCO site, where you can visit beautifully preserved merchant homes, wander through lively markets, and lounge on lovely beaches. In Saigon (Ho Chi Minh City), you can tour vibrant markets, explore art galleries, or have a local tailor make a custom ao dai for you to wear.
              </p>
              
              <p>
                There are also so many natural wonders outside the cities. You can sail through stunning limestone formations in Halong Bay, hike to hill tribe villages and rice paddies near Sapa, or kayak along the relaxed waters of the Mekong Delta.
              </p>

              <div className="pt-6 space-y-4">
                <h3 className="font-serif text-base font-semibold text-green uppercase tracking-wider">
                  Our private tours are designed to highlight the best of Vietnam, including:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 list-none pl-0 text-xs md:text-sm font-light text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue shrink-0" /> Stays at luxury hotels and resorts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue shrink-0" /> A personal guide and driver for tailored experiences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue shrink-0" /> Tips from local Vietnam experts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue shrink-0" /> Support from our offices throughout the country
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue shrink-0" /> Smooth regional flights and private transfers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue shrink-0" /> Extra services like restaurant bookings, meetings with artists, cooking classes, shopping tours, and access to cultural events.
                  </li>
                </ul>
              </div>

              <p className="text-xs italic text-gray-400 pt-6">
                All tours are private, available year-round, and fully customizable. For more info, feel free to submit an online query or consult with our team.
              </p>
            </div>

            {/* Right Column (Contact Local Expert Box) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#d8d8d8] p-8 shadow-sm flex flex-col items-center text-center space-y-6 rounded-none">
                <span className="text-[9px] tracking-widest uppercase text-blue font-sans font-bold">
                  Design Team
                </span>
                <h3 className="font-serif text-lg font-semibold text-green leading-snug">
                  Speak to one of our local experts
                </h3>
                
                {/* Specialist Circular Image */}
                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gold/15 shadow-sm shrink-0">
                  <Image 
                    src={mainSpecialist.image || "/images/specialist_alice.png"}
                    alt={mainSpecialist.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-sans text-xs font-bold text-green uppercase tracking-widest">
                    Alice Mercer
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-[240px] mx-auto font-light">
                    Start planning your tailor-made trip by contacting one of our travel experts
                  </p>
                </div>

                <Link
                  href="/enquire"
                  className="w-full bg-gold hover:bg-gold/80 text-white transition-all duration-300 font-sans text-[10px] font-bold tracking-[0.2em] uppercase py-3.5 text-center rounded-none shadow-sm"
                >
                  MAKE AN INQUIRY
                </Link>

                <div className="pt-4 border-t border-[#d8d8d8] w-full flex flex-col items-center">
                  <span className="text-[9px] uppercase text-gray-400 font-bold tracking-widest block mb-1">Or call us directly</span>
                  <a href="tel:+84988600388" className="text-sm font-bold text-green hover:text-blue transition-colors">
                    +84 988600388
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. VACATIONS HEADER & FILTER SELECTOR ── */}
        <section className="bg-light-brown/40 border-t border-[#d8d8d8] py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#d8d8d8] pb-10">
            <div className="space-y-4 max-w-2xl text-left">
              <span className="text-[10px] tracking-widest uppercase text-blue font-sans font-bold block">
                Itinerary Ideas
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-green font-light">
                Tailor-made Vietnam Vacations
              </h2>
              <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                These sample itineraries are here to inspire your Vietnam journey – each one based on routes we know work brilliantly and can be tailored to suit your travel style.
              </p>
            </div>
            
            {/* Destination Picker Dropdown */}
            <div className="flex flex-col items-start space-y-2 self-start lg:self-end">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block">Pick another destination</span>
              <div className="relative">
                <select 
                  defaultValue="vietnam"
                  className="appearance-none bg-white border border-[#d8d8d8] text-[#343434] text-xs font-bold tracking-widest uppercase py-3.5 pl-5 pr-12 rounded-none focus:outline-none focus:border-gold cursor-pointer min-w-[240px]"
                >
                  <option value="vietnam">Vietnam</option>
                  <option value="cambodia">Cambodia</option>
                  <option value="laos">Laos</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. TOURS GRID SECTION ── */}
          <div id="tours-listing" className="max-w-6xl mx-auto pt-16">
            
            {/* Listing Header Toggles */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#d8d8d8]">
              <h3 className="font-serif text-xl font-medium text-green text-left">
                Vietnam Expeditions
              </h3>
              
              <div className="flex items-center space-x-6 self-start sm:self-center">
                {/* Summary / Detail Toggles */}
                <div className="flex bg-white border border-[#d8d8d8] p-1 rounded-none text-[10px] font-bold uppercase tracking-widest select-none">
                  <button className="bg-gold text-white px-4 py-1.5 shadow-sm rounded-none">Summary</button>
                  <button className="text-gray-500 hover:text-green px-4 py-1.5 transition-colors">Detail</button>
                </div>

                {/* Filter Trigger button */}
                <button className="flex items-center gap-2 border border-[#d8d8d8] hover:border-gold transition-colors px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-[#343434] bg-white rounded-none cursor-pointer">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span>Filter Expedition</span>
                </button>
              </div>
            </div>

            {/* Grid 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {itineraries.map((it) => (
                <div key={it._id} className="group bg-white border border-[#d8d8d8] hover:border-blue/30 transition-all duration-300 hover:shadow-md flex flex-col justify-between h-full relative rounded-none">
                  
                  {/* Featured Badge */}
                  <div className="bg-blue text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-none absolute top-4 left-4 z-10 flex items-center gap-0.5 shadow-sm">
                    <span>★</span>
                    <span>FEATURED</span>
                  </div>

                  <div>
                    {/* Tour Image */}
                    <div className="relative h-48 overflow-hidden bg-[#f4efe6] border-b border-[#d8d8d8]">
                      <Image
                        src={it.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                        alt={it.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-5 text-left space-y-2 bg-white">
                      <span className="text-[9px] text-blue tracking-widest uppercase font-bold block">
                        VIETNAM
                      </span>
                      
                      <h4 className="font-serif text-[15px] leading-snug font-medium text-green hover:text-blue transition-colors">
                        <Link href={`/itineraries/${it.slug?.current || ''}`}>
                          {it.title}
                        </Link>
                      </h4>

                      <p className="text-[11px] font-medium text-gray-500 tracking-wide pt-1">
                        {it.duration} Days from <span className="text-blue font-semibold block text-xs">£{it.priceFrom?.toLocaleString('en-GB')}pp</span>
                      </p>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-5 py-4 border-t border-[#d8d8d8] flex items-center justify-between text-[10px] font-bold tracking-wider uppercase bg-bg-light">
                    <Link 
                      href={`/itineraries/${it.slug?.current || ''}`}
                      className="text-gray-500 hover:text-blue transition-colors"
                    >
                      View Detail
                    </Link>
                    <Link 
                      href="/enquire"
                      className="text-blue hover:text-green transition-colors"
                    >
                      Request quote
                    </Link>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination & Progress */}
            <div className="mt-16 pb-12 flex flex-col items-center space-y-4 max-w-xs mx-auto text-center border-b border-[#d8d8d8]">
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                You've viewed {itineraries.length} of {itineraries.length} tours
              </span>
              
              {/* Progress Line */}
              <div className="w-full h-[3px] bg-[#d8d8d8] rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full w-full" />
              </div>

              {/* Load More Button */}
              <button 
                disabled 
                className="w-full bg-gold text-white py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-gold/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2 rounded-none"
              >
                LOAD MORE TOURS
              </button>
            </div>

          </div>
        </section>

        {/* ── NEW SECTION: SUGGESTED ACTIVITIES (BESPOKE EXPERIENCES REEL) ── */}
        <section className="py-24 px-6 lg:px-12 bg-white border-t border-[#d8d8d8]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center flex flex-col items-center gap-4 mb-16">
              <span className="text-[10px] tracking-widest uppercase text-blue font-sans font-bold">
                Bespoke Experiences
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-green font-light tracking-wide leading-tight">
                Suggested Activities for Vietnam
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#545454] leading-relaxed max-w-2xl font-light">
                Enjoy a guided tour of Ho Chi Minh City on the back of a Vespa, sample Hanoi’s best street food with a local guide, or cruise along the Mekong on a wooden boat. Whatever your interests, our specialists will suggest experiences designed to enhance your trip.
              </p>
            </div>

            {/* Activities Staggered Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Cruise on a traditional junk",
                  location: "Halong Bay",
                  image: "/images/halong_card.jpg",
                  description: "Set sail into the bay area and enjoy the stunning limestone scenery from the sundeck or private cabin balcony."
                },
                {
                  title: "Ho Chi Minh City Vespa Tour",
                  location: "Ho Chi Minh City",
                  image: "/images/hoian.jpg",
                  description: "Wander through glowing food stalls and street markets on the back of a vintage Vespa scooter with a local guide."
                },
                {
                  title: "Private Mekong Sampan Cruise",
                  location: "Mekong Delta",
                  image: "/images/mekong.jpg",
                  description: "Float down peaceful coconut-shaded canals and visit local cottage workshops on a private wooden sampan."
                },
                {
                  title: "Sa Pa Highland Trekking",
                  location: "Sa Pa Valley",
                  image: "/images/sapa.jpg",
                  description: "Hike through mist-shrouded green terraces and encounter authentic local Hmong and Dao hilltribe hospitality."
                }
              ].map((act, index) => (
                <div key={index} className="group relative flex flex-col justify-between h-[420px] overflow-hidden border border-[#d8d8d8] bg-[#faf8f5]">
                  
                  {/* Photo Background */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={act.image}
                      alt={act.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c16] via-[#080c16]/30 to-transparent z-10" />
                    <div className="absolute inset-0 bg-black/10 z-10 transition-opacity group-hover:opacity-10" />
                  </div>

                  {/* Overlapping Info Panel */}
                  <div className="relative z-20 p-6 flex flex-col justify-end h-full text-white gap-3">
                    <div>
                      <span className="text-[9px] tracking-widest uppercase text-gold font-sans font-bold block mb-1">
                        {act.location}
                      </span>
                      <h3 className="font-serif text-lg leading-snug font-medium text-white group-hover:text-gold transition-colors duration-300">
                        {act.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-gray-200 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                      {act.description}
                    </p>
                    <a
                      href="#"
                      className="border border-white hover:border-gold hover:bg-gold hover:text-white text-white font-bold py-2.5 px-4 text-[9px] tracking-widest uppercase mt-2 w-max"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. FAQ BOX ACCORDION SECTION ── */}
        {faqs.length > 0 && (
          <section id="faq-section" className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12 flex flex-col items-center">
              <span className="text-[10px] tracking-widest uppercase text-blue font-sans font-bold block">
                Planning Tips
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-green font-light leading-tight">
                Useful information for planning your holiday in Vietnam
              </h2>
              <div className="h-[1.5px] w-12 bg-blue mx-auto mt-4" />
            </div>

            <div className="w-full flex justify-center">
              <FaqAccordion faqs={faqs} />
            </div>
          </section>
        )}

        {/* ── 7. MAGAZINE GUIDES & BLOG ── */}
        {inspirationPosts.length > 0 && (
          <section id="blog-section" className="py-20 px-6 lg:px-12 bg-light-brown/40 border-t border-[#d8d8d8]">
            <div className="max-w-6xl mx-auto">
              
              {/* Blog Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div className="space-y-3 text-left">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue block">
                    Travel Journal
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-green font-light leading-tight">
                    Read more Vietnam Travel Guides on our blog
                  </h2>
                </div>
                
                <Link
                  href="/travel-guides"
                  className="text-[10px] uppercase tracking-widest font-bold text-blue hover:text-green transition-colors pb-1 border-b border-blue/30 hover:border-green"
                >
                  View all articles
                </Link>
              </div>

              {/* Grid 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {inspirationPosts.map((post) => (
                  <article key={post._id} className="group flex flex-col space-y-4.5 text-left h-full">
                    
                    {/* Blog Image */}
                    <div className="relative h-64 overflow-hidden rounded-none bg-white border border-[#d8d8d8]">
                      <Image
                        src={post.mainImage || '/images/featured_guide_passport.png'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      
                      {/* Duration Overlay */}
                      <div className="absolute bottom-4 left-4 bg-white border border-[#e6e2d6] text-[#343434] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 shadow-sm rounded-none">
                        <span>🕒</span>
                        <span>{getReadingTime(post.content)} minutes read</span>
                      </div>
                    </div>

                    {/* Blog Body */}
                    <div className="space-y-2 pt-2 bg-transparent">
                      {post.publishedAt && (
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">
                          {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      
                      <h4 className="font-serif text-lg leading-snug font-medium text-green group-hover:text-blue transition-colors">
                        <Link href={`/travel-guides/${post.slug?.current || ''}`}>
                          {post.title}
                        </Link>
                      </h4>
                    </div>

                  </article>
                ))}
              </div>

            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}
