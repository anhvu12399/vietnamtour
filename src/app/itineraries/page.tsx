import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { getItineraries, getToursLanding, getPosts } from '@/sanity/client';

export const revalidate = 3600;

export default async function ItinerariesPage() {
  const [itineraries, toursLanding, allPosts] = await Promise.all([
    getItineraries(),
    getToursLanding(),
    getPosts(),
  ]);

  // Fallbacks if data is missing or useMock is true
  const heroHeading = toursLanding?.heroHeading || 'Bespoke Vietnam Itineraries';
  const heroSubheading = toursLanding?.heroSubheading || 'Explore our collection of meticulously curated itineraries. Every trip can be completely tailormade, adjusted in length, pacing, and selection of luxury resorts to fit your personal desires.';
  const heroImage = toursLanding?.heroImage || '/images/vietnamtour_cave_dining.png';
  
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

      <main className="min-h-screen bg-luxury-slate">
        
        {/* HERO SECTION */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage}
            alt="Vietnam Tours Hero"
            fill
            className="object-cover animate-fade-in"
            priority
          />
          <div className="absolute inset-0 bg-luxury-navy/60" />
          
          <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-6">
              Vietnam Tours
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-luxury-linen font-medium leading-tight mb-8">
              {heroHeading}
            </h1>
            <p className="text-base sm:text-lg text-luxury-linen/80 font-light leading-relaxed max-w-2xl mx-auto">
              {heroSubheading}
            </p>
            <div className="mt-12">
               <a href="#recommended" className="inline-block px-8 py-4 bg-luxury-gold text-luxury-navy text-xs uppercase tracking-widest font-semibold hover:bg-luxury-linen transition-colors duration-300">
                 Explore Tours
               </a>
            </div>
          </div>
        </section>

        {/* RECOMMENDED TOURS */}
        <section id="recommended" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
              {recommendedToursLabel}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-luxury-linen font-medium">
              {recommendedToursHeading}
            </h2>
            <div className="h-[1px] w-16 bg-luxury-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recommendedTours.map((it) => (
              <div key={it._id} className="group relative h-[500px] overflow-hidden flex flex-col justify-end p-8 bg-luxury-moss border border-luxury-moss/50 hover:border-luxury-gold/50 transition-all duration-500">
                <Image
                  src={it.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                  alt={it.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/90 via-luxury-navy/40 to-transparent" />
                
                <div className="relative z-10 space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-center text-luxury-gold text-[10px] uppercase tracking-widest font-semibold">
                    <span>{it.duration} Days</span>
                    <span>From £{it.priceFrom?.toLocaleString('en-GB')}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-luxury-linen leading-snug">
                    {it.title}
                  </h3>
                  <p className="text-sm text-luxury-linen/70 font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {it.intro}
                  </p>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <Link
                      href={`/itineraries/${it.slug?.current || ''}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:text-luxury-linen transition-colors"
                    >
                      <span>View Journey</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ALL TOURS GRID */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-luxury-moss">
          <div className="space-y-4 max-w-3xl mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-luxury-linen font-medium leading-tight">
              All Itineraries
            </h2>
            <p className="text-base text-luxury-linen/70 font-light leading-relaxed">
              Browse our complete collection of tailor-made Vietnam tours, from rapid highlights to extensive multi-week explorations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((it) => (
              <div key={it._id} className="group flex flex-col bg-luxury-moss/50 border border-luxury-moss hover:border-luxury-gold/30 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={it.gallery?.[0] || '/images/vietnamtour_cave_dining.png'}
                    alt={it.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-luxury-navy/90 backdrop-blur-sm text-luxury-linen text-[10px] tracking-widest uppercase font-semibold px-3 py-1">
                    {it.duration} Days
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl text-luxury-linen group-hover:text-luxury-gold transition-colors font-medium leading-snug">
                      {it.title}
                    </h3>
                    <p className="text-xs text-luxury-linen/60 font-light leading-relaxed line-clamp-3">
                      {it.intro}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-luxury-slate flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-luxury-linen/50 block font-light">From</span>
                      <span className="text-base font-semibold text-luxury-linen">£{it.priceFrom?.toLocaleString('en-GB')}pp</span>
                    </div>
                    <Link
                      href={`/itineraries/${it.slug?.current || ''}`}
                      className="text-xs uppercase tracking-widest font-semibold text-luxury-gold group-hover:underline flex items-center space-x-1"
                    >
                      <span>Discover</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        {faqs.length > 0 && (
          <section className="py-24 px-6 lg:px-12 bg-luxury-navy/50 border-y border-luxury-moss">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
                  {faqLabel}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-luxury-linen font-medium leading-tight">
                  {faqHeading}
                </h2>
                <div className="h-[1px] w-16 bg-luxury-gold mt-6" />
                <p className="text-luxury-linen/70 font-light leading-relaxed pt-4">
                  Planning a journey to Vietnam comes with questions. Our experts have compiled the most common inquiries to help you prepare for your bespoke adventure.
                </p>
              </div>
              <div className="lg:col-span-7">
                <FaqAccordion faqs={faqs} />
              </div>
            </div>
          </section>
        )}

        {/* INSPIRATION / BLOG */}
        {inspirationPosts.length > 0 && (
          <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 space-y-6 sm:space-y-0">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
                  {inspirationLabel}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-luxury-linen font-medium">
                  {inspirationHeading}
                </h2>
              </div>
              <Link
                href="/inspiration"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:text-luxury-linen transition-colors pb-2 border-b border-luxury-gold/30 hover:border-luxury-linen"
              >
                <span>View All Articles</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {inspirationPosts.map((post) => (
                <article key={post._id} className="group flex flex-col space-y-5">
                  <div className="relative h-64 overflow-hidden rounded-sm bg-luxury-moss border border-luxury-moss/30">
                    <Image
                      src={post.mainImage || '/images/featured_guide_passport.png'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="space-y-3">
                    {post.publishedAt && (
                      <span className="text-[10px] text-luxury-linen/50 uppercase tracking-wider block font-light">
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                    <h4 className="font-serif text-lg text-luxury-linen group-hover:text-luxury-gold transition-colors font-medium leading-snug">
                      <Link href={`/inspiration/${post.slug?.current || ''}`}>
                        {post.title}
                      </Link>
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}
