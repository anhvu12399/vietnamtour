import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { getItineraries, getToursLanding, getPosts } from '@/sanity/client';

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
  const [itineraries, toursLanding, allPosts] = await Promise.all([
    getItineraries(),
    getToursLanding(),
    getPosts(),
  ]);

  // Fallbacks if data is missing or useMock is true
  const heroHeading = toursLanding?.heroHeading || 'Bespoke Vietnam Itineraries';
  const heroSubheading = toursLanding?.heroSubheading || 'Explore our collection of meticulously curated itineraries. Every trip can be completely tailormade, adjusted in length, pacing, and selection of luxury resorts to fit your personal desires.';
  const heroImage = toursLanding?.heroImage || '/images/hero_hoian.png';
  
  const recommendedToursLabel = toursLanding?.recommendedToursLabel || 'Signature Journeys';
  const recommendedToursHeading = toursLanding?.recommendedToursHeading || 'Highly Recommended Tours';
  const recommendedTours = toursLanding?.recommendedTours?.length 
    ? toursLanding.recommendedTours 
    : itineraries.slice(0, 3);

  const faqLabel = toursLanding?.faqLabel || 'Expert Knowledge';
  const faqHeading = toursLanding?.faqHeading || 'Frequently Asked Questions';
  const faqs = toursLanding?.faqs?.length ? toursLanding.faqs : [
    { question: 'When is the best time to visit Vietnam?', answer: 'Vietnam is a year-round destination, but the best time generally depends on the regions you plan to visit. Spring (February to April) and Autumn (August to October) offer the most pleasant weather across the country.' },
    { question: 'Do I need a visa for Vietnam?', answer: 'Many nationalities are eligible for an e-Visa or visa exemption for short stays. We recommend checking the latest requirements with your local embassy before travel.' },
    { question: 'Can the itineraries be customized?', answer: 'Absolutely. Every itinerary we offer is just a starting point. Our travel specialists will tailor the journey to your exact preferences, from accommodations to exclusive experiences.' },
  ];

  const inspirationLabel = toursLanding?.inspirationLabel || 'Travel Journal';
  const inspirationHeading = toursLanding?.inspirationHeading || 'Get Inspired for Your Trip';
  const inspirationPosts = toursLanding?.inspirationPosts?.length 
    ? toursLanding.inspirationPosts 
    : allPosts.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-slate-800">
        
        {/* ── 1. SCENIC HERO BANNER ── */}
        <section className="relative h-[320px] sm:h-[400px] lg:h-[450px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage}
            alt="Vietnam Tours Landscape Header"
            fill
            className="object-cover brightness-[0.55]"
            priority
          />
          <div className="absolute inset-0 bg-[#121816]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32 lg:pt-36">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              {heroHeading}
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] lg:text-[12px] uppercase tracking-widest text-[#c5a880] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Vietnam</span>
            </div>
          </div>
        </section>

        {/* ── 2. DARK NAVY CATEGORIES BAR ── */}
        <section className="w-full bg-[#002244] text-white sticky top-[88px] z-30 shadow-md border-b border-[#001f3f]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 overflow-x-auto scrollbar-none">
            <div className="flex items-center space-x-8 lg:space-x-10 min-w-max h-14">
              {/* Category 1: Vietnam Tours */}
              <a href="#tours-listing" className="relative h-full flex items-center gap-1.5 hover:text-[#c5a880] transition-colors duration-200 cursor-pointer">
                <span className="inline-flex items-center justify-center bg-[#c5a880] text-[#121816] text-[9px] font-bold rounded-full w-[19px] h-[19px]">
                  {itineraries.length}
                </span>
                <span className="text-[11px] lg:text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-white">
                  Vietnam Tours
                </span>
                {/* Downward triangle caret */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-[#002244] z-10" />
              </a>

              {/* Category 2: Travel Guides */}
              <a href="#blog-section" className="relative h-full flex items-center gap-1.5 hover:text-[#c5a880] transition-colors duration-200 cursor-pointer">
                <span className="inline-flex items-center justify-center bg-white/20 text-white text-[9px] font-bold rounded-full w-[19px] h-[19px]">
                  {allPosts.length}
                </span>
                <span className="text-[11px] lg:text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-white/80">
                  Travel Guides
                </span>
              </a>

              {/* Category 3: Places to Visit */}
              <Link href="/destinations" className="relative h-full flex items-center gap-1.5 hover:text-[#c5a880] transition-colors duration-200">
                <span className="inline-flex items-center justify-center bg-white/10 text-white/60 text-[9px] font-bold rounded-full w-[19px] h-[19px]">
                  12
                </span>
                <span className="text-[11px] lg:text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-white/80">
                  Places to visit
                </span>
              </Link>

              {/* Category 4: Hotels */}
              <Link href="/accommodations" className="relative h-full flex items-center gap-1.5 hover:text-[#c5a880] transition-colors duration-200">
                <span className="inline-flex items-center justify-center bg-white/10 text-white/60 text-[9px] font-bold rounded-full w-[19px] h-[19px]">
                  25
                </span>
                <span className="text-[11px] lg:text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-white/80">
                  Hotels
                </span>
              </Link>

              {/* Category 5: Things to Do */}
              <a href="#recommended" className="relative h-full flex items-center gap-1.5 hover:text-[#c5a880] transition-colors duration-200 cursor-pointer">
                <span className="inline-flex items-center justify-center bg-white/10 text-white/60 text-[9px] font-bold rounded-full w-[19px] h-[19px]">
                  32
                </span>
                <span className="text-[11px] lg:text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-white/80">
                  Things to do
                </span>
              </a>

              {/* Category 6: Cruises */}
              <a href="#tours-listing" className="relative h-full flex items-center gap-1.5 hover:text-[#c5a880] transition-colors duration-200 cursor-pointer">
                <span className="inline-flex items-center justify-center bg-white/10 text-white/60 text-[9px] font-bold rounded-full w-[19px] h-[19px]">
                  5
                </span>
                <span className="text-[11px] lg:text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-white/80">
                  Vietnam Cruises
                </span>
              </a>

              {/* Category 7: Best Time to Visit */}
              <a href="#faq-section" className="relative h-full flex items-center gap-1.5 hover:text-[#c5a880] transition-colors duration-200 cursor-pointer">
                <span className="inline-flex items-center justify-center bg-white/10 text-white/60 text-[9px] font-bold rounded-full w-[19px] h-[19px]">
                  12
                </span>
                <span className="text-[11px] lg:text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-white/80">
                  Best time to visit
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 3. TWO-COLUMN DETAILS & LOCAL EXPERT ── */}
        <section id="details" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Vietnam Intro Text) */}
            <div className="lg:col-span-8 space-y-6 text-slate-700 leading-relaxed font-light text-base">
              <p className="font-serif text-lg lg:text-xl font-medium text-slate-800 leading-relaxed">
                Travelers love Vietnam for its friendly people, rich culture, and breathtaking landscapes – from charming towns to lush countryside.
              </p>
              
              <p>
                In Hanoi, the capital, take in delicious meals in lovely French colonial villas, shop at chic boutiques, and explore the charming Old Quarter. Travel south to Hoi An, a UNESCO site, where you can visit beautifully preserved merchant homes, wander through lively markets, and lounge on lovely beaches. In Saigon (Ho Chi Minh City), you can tour vibrant markets, explore art galleries, or have a local tailor make a custom ao dai for you to wear.
              </p>
              
              <p>
                There are also so many natural wonders outside the cities. You can sail through stunning limestone formations in Halong Bay, hike to hill tribe villages and rice paddies near Sapa, or kayak along the relaxed waters of the Mekong Delta.
              </p>

              <div className="pt-4 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-slate-800 uppercase tracking-wide">
                  Our private tours are designed to highlight the best of Vietnam, including:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 list-disc pl-5 text-sm font-medium text-slate-600">
                  <li>Stays at luxury hotels and resorts</li>
                  <li>A personal guide and driver for tailored experiences</li>
                  <li>Tips from local Vietnam experts</li>
                  <li>Support from our offices throughout the country</li>
                  <li>Smooth regional flights and private transfers</li>
                  <li>Extra services like restaurant bookings, meetings with artists, cooking classes, shopping tours, and access to cultural events.</li>
                </ul>
              </div>

              <p className="text-sm italic text-slate-500 pt-4">
                All tours are private, available year-round, and fully customizable. For more info, feel free to submit an online query or consult with our team.
              </p>
            </div>

            {/* Right Column (Contact Local Expert Box) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-slate-200/70 p-8 shadow-sm flex flex-col items-center text-center space-y-6">
                <h3 className="font-serif text-xl font-semibold text-slate-800 leading-snug">
                  Speak to one of our local experts
                </h3>
                
                {/* Specialist Circular Image */}
                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
                  <Image 
                    src="/images/specialist_alice.png"
                    alt="Alice Mercer"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Alice Mercer
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mx-auto font-light">
                    Start planning your tailor-made trip by contacting one of our travel experts
                  </p>
                </div>

                <Link
                  href="/enquire"
                  className="w-full bg-[#ba996a] text-white hover:bg-slate-800 transition-colors duration-300 font-sans text-xs font-bold tracking-[0.2em] uppercase py-3.5 text-center cursor-pointer"
                >
                  MAKE AN INQUIRY
                </Link>

                <div className="pt-2 border-t border-slate-100 w-full flex flex-col items-center">
                  <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest block mb-0.5">Or call us directly</span>
                  <a href="tel:+442078459200" className="text-base font-bold text-slate-800 hover:text-[#c5a880] transition-colors duration-200">
                    +44 (0) 20 7845 9200
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. VACATIONS HEADER & FILTER SELECTOR ── */}
        <section className="bg-white border-t border-slate-200/40 py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-100 pb-10">
            <div className="space-y-4 max-w-2xl text-left">
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-800 font-medium">
                Tailor-made Vietnam vacations
              </h2>
              <p className="text-sm lg:text-base text-slate-500 font-light leading-relaxed">
                These sample itineraries are here to inspire your Vietnam journey – each one based on routes we know work brilliantly and can be tailored to suit your travel style.
              </p>
            </div>
            
            {/* Destination Picker Dropdown */}
            <div className="flex flex-col items-start space-y-2 self-start lg:self-end">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400 block">Pick another destination</span>
              <div className="relative">
                <select 
                  defaultValue="vietnam"
                  className="appearance-none bg-white border border-slate-200 text-slate-800 text-sm font-semibold tracking-wide py-3.5 pl-5 pr-12 rounded-sm focus:outline-none focus:border-slate-400 cursor-pointer min-w-[240px]"
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
          <div id="tours-listing" className="max-w-7xl mx-auto pt-12">
            
            {/* Listing Header Toggles */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
              <h3 className="font-serif text-2xl font-semibold text-slate-800 text-left">
                Vietnam Tours
              </h3>
              
              <div className="flex items-center space-x-6 self-start sm:self-center">
                {/* Summary / Detail Toggles */}
                <div className="flex bg-slate-100 p-1 rounded-sm text-xs font-semibold select-none">
                  <button className="bg-white text-slate-800 px-4 py-1.5 shadow-sm rounded-sm">Summary</button>
                  <button className="text-slate-500 hover:text-slate-800 px-4 py-1.5 transition-colors duration-200">Detail</button>
                </div>

                {/* Filter Trigger button */}
                <button className="flex items-center gap-2 border border-slate-200 hover:border-slate-400 transition-colors duration-200 px-4 py-2 text-xs font-semibold text-slate-700 bg-white rounded-sm cursor-pointer">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span>Filter tour idea</span>
                </button>
              </div>
            </div>

            {/* Grid 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {itineraries.map((it) => (
                <div key={it._id} className="group bg-white border border-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:shadow-lg flex flex-col justify-between h-full relative">
                  
                  {/* Featured Badge */}
                  <div className="bg-red-600 border border-[#c5a880]/30 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm absolute top-4 left-4 z-10 flex items-center gap-0.5 shadow-sm">
                    <span>★</span>
                    <span>FEATURED</span>
                  </div>

                  <div>
                    {/* Tour Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-50 border-b border-slate-100">
                      <Image
                        src={it.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                        alt={it.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-5 text-left space-y-2">
                      <span className="text-[10px] text-[#c5a880] tracking-widest uppercase font-bold block">
                        VIETNAM
                      </span>
                      
                      <h4 className="font-serif text-[16px] lg:text-[17px] leading-snug font-semibold text-slate-800 hover:text-[#c5a880] transition-colors duration-200">
                        <Link href={`/itineraries/${it.slug?.current || ''}`}>
                          {it.title}
                        </Link>
                      </h4>

                      <p className="text-[12px] font-medium text-slate-500 tracking-wide pt-1">
                        {it.duration} Days from £{it.priceFrom?.toLocaleString('en-GB')}pp
                      </p>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold select-none bg-white">
                    <Link 
                      href={`/itineraries/${it.slug?.current || ''}`}
                      className="text-slate-600 hover:text-slate-900 hover:underline transition-colors"
                    >
                      View detail
                    </Link>
                    <Link 
                      href="/enquire"
                      className="text-[#c5a880] hover:text-slate-900 hover:underline transition-colors"
                    >
                      Request a quote
                    </Link>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination & Progress */}
            <div className="mt-16 pb-12 flex flex-col items-center space-y-4 max-w-xs mx-auto text-center border-b border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">
                You've viewed {itineraries.length} of {itineraries.length} tours
              </span>
              
              {/* Progress Line */}
              <div className="w-full h-[3px] bg-slate-200/60 rounded-full overflow-hidden">
                <div className="h-full bg-slate-800 rounded-full w-full" />
              </div>

              {/* Load More Button */}
              <button 
                disabled 
                className="w-full bg-[#002244] text-white py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-slate-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2 rounded-sm"
              >
                LOAD MORE TOURS
              </button>
            </div>

          </div>
        </section>

        {/* ── 6. FAQ BOX ACCORDION SECTION ── */}
        {faqs.length > 0 && (
          <section id="faq-section" className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 font-semibold leading-tight">
                Useful information for planning your holiday in Vietnam
              </h2>
              <div className="h-[1.5px] w-12 bg-[#c5a880] mx-auto mt-4" />
            </div>

            <div className="w-full flex justify-center">
              <FaqAccordion faqs={faqs} />
            </div>
          </section>
        )}

        {/* ── 7. MAGAZINE GUIDES & BLOG ── */}
        {inspirationPosts.length > 0 && (
          <section id="blog-section" className="py-20 px-6 lg:px-12 bg-white border-t border-slate-200/50">
            <div className="max-w-7xl mx-auto">
              
              {/* Blog Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div className="space-y-3 text-left">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a880] block">
                    Travel Journal
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 font-semibold leading-tight">
                    Read more Vietnam Travel Guides on our blog
                  </h2>
                </div>
                
                <Link
                  href="/inspiration"
                  className="text-xs uppercase tracking-widest font-bold text-[#c5a880] hover:text-slate-800 transition-colors pb-1 border-b border-[#c5a880]/30 hover:border-slate-800"
                >
                  View all articles
                </Link>
              </div>

              {/* Grid 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {inspirationPosts.map((post) => (
                  <article key={post._id} className="group flex flex-col space-y-4.5 text-left h-full">
                    
                    {/* Blog Image */}
                    <div className="relative h-64 overflow-hidden rounded-sm bg-slate-50 border border-slate-200/40">
                      <Image
                        src={post.mainImage || '/images/featured_guide_passport.png'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      
                      {/* Duration Overlay */}
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-[2px] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 shadow-sm rounded-sm">
                        <span>🕒</span>
                        <span>{getReadingTime(post.content)} minutes read</span>
                      </div>
                    </div>

                    {/* Blog Body */}
                    <div className="space-y-2">
                      {post.publishedAt && (
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">
                          {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      
                      <h4 className="font-serif text-lg leading-snug font-semibold text-slate-800 group-hover:text-[#c5a880] transition-colors duration-200">
                        <Link href={`/inspiration/${post.slug?.current || ''}`}>
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
