import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { tripIdeasData, getTripIdea, getAllTripSlugs } from '@/lib/tripIdeasData';
import { getItineraries, getTripIdeaFromSanity } from '@/sanity/client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTripSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sanityData = await getTripIdeaFromSanity(slug);
  const data = sanityData || getTripIdea(slug);
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://www.vietnamtours.co.uk/trip-ideas/${data.slug}`,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: data.heroImage }],
    },
  };
}

export default async function TripIdeaSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const sanityIdea = await getTripIdeaFromSanity(slug);
  const idea = sanityIdea || getTripIdea(slug);

  if (!idea) {
    notFound();
  }

  // Load all itineraries to display relevant recommendations
  const itineraries = await getItineraries();
  
  // Custom smart matching to filter itineraries based on the current trip idea
  let recommendedTours = itineraries.filter(it => {
    const title = it.title.toLowerCase();
    const currentSlug = idea.slug.toLowerCase();
    
    if (currentSlug.includes('culinary') && (title.includes('culinary') || title.includes('food') || title.includes('culture'))) return true;
    if (currentSlug.includes('bike') && (title.includes('bike') || title.includes('cycling') || title.includes('boat') || title.includes('adventure'))) return true;
    if (currentSlug.includes('motorcycle') && (title.includes('motorcycle') || title.includes('hagiang') || title.includes('loop') || title.includes('adventure'))) return true;
    if (currentSlug.includes('classic') && (title.includes('grand') || title.includes('classic') || title.includes('highlights'))) return true;
    if (currentSlug.includes('luxury') && (title.includes('grand') || title.includes('luxury') || title.includes('resort') || title.includes('retreat'))) return true;
    if (currentSlug.includes('family') && (title.includes('family') || title.includes('holiday') || title.includes('heritage'))) return true;
    if (currentSlug.includes('golf') && (title.includes('golf') || title.includes('sport') || title.includes('vietnam'))) return true;
    if (currentSlug.includes('beach') && (title.includes('beach') || title.includes('island') || title.includes('phu quoc') || title.includes('retreat'))) return true;
    
    return false;
  });

  // Fallback to top 4 itineraries if no specific matches found
  if (recommendedTours.length === 0) {
    recommendedTours = itineraries.slice(0, 4);
  } else {
    recommendedTours = recommendedTours.slice(0, 4);
  }

  // Related trip ideas
  const crossLinks = (idea.relatedSlugs || [])
    .map((relSlug: string) => tripIdeasData.find(t => t.slug === relSlug))
    .filter((x: any): x is typeof tripIdeasData[0] => !!x);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-slate-800">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[320px] sm:h-[400px] lg:h-[480px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={idea.heroImage}
            alt={idea.title}
            fill
            className="object-cover brightness-[0.55]"
            priority
          />
          <div className="absolute inset-0 bg-[#121816]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32 lg:pt-36">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-bold bg-slate-950/45 px-4 py-1.5 border border-white/10 rounded-sm mb-4 inline-block">
              {idea.category}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight tracking-wide drop-shadow-sm max-w-5xl mx-auto">
              {idea.title}
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-slate-300 font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <Link href="/trip-ideas" className="hover:text-white transition-colors">Trip Ideas</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">{idea.breadcrumb}</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="tours" />

        {/* Main Two-Column Layout */}
        <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Rich Articles and Inline Images */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Introduction Lead Paragraph */}
              <div className="bg-white border-l-2 border-[#c5a880] p-6 sm:p-8 shadow-xs rounded-xs">
                <p className="font-serif text-lg sm:text-xl font-medium text-slate-900 leading-relaxed italic">
                  {idea.intro}
                </p>
              </div>

              {/* Dynamic sections */}
              <div className="space-y-12 font-light text-slate-700 leading-relaxed text-base">
                {(idea.sections || []).map((section: any, idx: number) => (
                  <div key={idx} className="space-y-6">
                    <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium border-b border-slate-200 pb-3">
                      {section.heading}
                    </h2>
                    
                    {/* Preserve line breaks for formatting */}
                    <div className="whitespace-pre-line space-y-4">
                      {section.body}
                    </div>

                    {/* Optional inline image */}
                    {section.image && (
                      <div className="my-8 border border-slate-200 p-2.5 bg-white rounded-xs shadow-xs group">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xs">
                          <Image
                            src={section.image}
                            alt={section.imageAlt || section.heading}
                            fill
                            className="object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                            sizes="(max-width: 1024px) 100vw, 800px"
                          />
                        </div>
                        {section.imageCaption && (
                          <span className="block text-[11px] text-slate-400 italic mt-3 text-center">
                            {section.imageCaption}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Expert Specialist and Highlights Info Card */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
              
              {/* Specialist Contact Box */}
              <div className="bg-white border border-slate-200/70 p-8 shadow-xs rounded-xs flex flex-col items-center text-center space-y-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#c5a880] block">
                  Bespoke Planner
                </span>
                <h3 className="font-serif text-xl font-medium text-slate-900 leading-snug">
                  Let us tailor this experience for you
                </h3>
                
                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
                  <Image 
                    src="/images/specialist_alice.png"
                    alt="Alice Mercer"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Alice Mercer
                  </h4>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5 block">
                    Vietnam Specialist
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  "I have designed hundreds of customized trips. Tell me what inspires you, and I will build the ultimate personal itinerary."
                </p>

                <div className="w-full pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <Link 
                    href="/enquire"
                    className="bg-slate-900 hover:bg-[#c5a880] hover:text-slate-950 text-white text-[11px] font-bold tracking-widest uppercase py-3 transition-colors duration-300 rounded-none w-full"
                  >
                    Start Custom Quote
                  </Link>
                  <a 
                    href="tel:+442078459200" 
                    className="text-xs font-semibold text-slate-700 hover:text-[#c5a880] transition-colors py-2 flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +44 (0) 20 7845 9200
                  </a>
                </div>
              </div>

              {/* Trip Highlights Card */}
              <div className="bg-slate-900 text-white p-8 rounded-xs shadow-xs space-y-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#c5a880] block border-b border-white/10 pb-3">
                  Trip Highlights
                </span>
                
                <ul className="space-y-4">
                  {(idea.highlights || []).map((item: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                      <span className="text-[#c5a880] font-bold text-sm shrink-0 leading-none">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* Recommended Tours / Itineraries Section */}
        {recommendedTours.length > 0 && (
          <section className="bg-white border-t border-slate-200/50 py-16 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center md:text-left space-y-2">
                <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#c5a880] block">
                  Signature Journeys
                </span>
                <h3 className="font-serif text-3xl text-slate-900 font-medium">
                  Recommended Private Tours
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedTours.map((tour) => (
                  <div key={tour._id} className="group bg-white border border-slate-200 hover:border-[#c5a880]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full rounded-xs overflow-hidden">
                    <div>
                      {/* Tour Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-50 border-b border-slate-100">
                        <Image
                          src={tour.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                          alt={tour.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="p-5 text-left space-y-2">
                        <span className="text-[10px] text-[#c5a880] tracking-widest uppercase font-bold block">
                          VIETNAM PRIVATE TOUR
                        </span>
                        
                        <h4 className="font-serif text-[16px] leading-snug font-semibold text-slate-800 hover:text-[#c5a880] transition-colors duration-200">
                          <Link href={`/itineraries/${tour.slug?.current || ''}`}>
                            {tour.title}
                          </Link>
                        </h4>

                        <p className="text-[12px] font-medium text-slate-500 tracking-wide pt-1">
                          {tour.duration} Days from £{tour.priceFrom?.toLocaleString('en-GB')}pp
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold select-none bg-slate-50/50">
                      <Link 
                        href={`/itineraries/${tour.slug?.current || ''}`}
                        className="text-slate-600 hover:text-slate-950 transition-colors"
                      >
                        View Itinerary
                      </Link>
                      <Link 
                        href="/enquire" 
                        className="text-[#c5a880] hover:text-[#b4956c] transition-colors"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs Accordion Section */}
        {idea.faqs && idea.faqs.length > 0 && (
          <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto border-t border-slate-200/50">
            <div className="space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c5a880] block">
                  Expert Insights
                </span>
                <h3 className="font-serif text-3xl text-slate-900 font-medium">
                  Frequently Asked Questions
                </h3>
              </div>

              <FaqAccordion faqs={idea.faqs} />
            </div>
          </section>
        )}

        {/* Cross-linking Related Styles */}
        {crossLinks.length > 0 && (
          <section className="bg-slate-900 text-white py-16 px-6 lg:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center md:text-left space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c5a880] block">
                  Related Travel Ideas
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  Explore Alternative Travel Styles
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {crossLinks.map((item: any) => (
                  <Link 
                    key={item.slug} 
                    href={`/trip-ideas/${item.slug}`}
                    className="group relative h-64 overflow-hidden rounded-xs border border-white/10 p-6 flex flex-col justify-end bg-slate-800"
                  >
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      className="object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <div className="relative z-10 space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-bold block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl text-white font-semibold leading-snug group-hover:text-[#c5a880] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA Block */}
        <section className="bg-[#121816] text-white py-16 sm:py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c5a880] block">
              Tailor-Made Design
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#eadcc9] font-medium leading-tight">
              {idea.ctaHeading}
            </h3>
            <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              {idea.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-[#c5a880] hover:bg-white text-[#121816] text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
              >
                Request a Custom Quote
              </Link>
              <Link
                href="/specialists"
                className="w-full sm:w-auto border border-white/25 hover:border-[#c5a880] hover:text-[#c5a880] text-white text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
              >
                Speak to a Specialist
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
