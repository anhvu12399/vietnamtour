import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { ideasByMonthData, getMonthBySlug, getAllMonthSlugs } from '@/lib/ideasByMonthData';
import { getItineraries, getSpecialists, getMonthGuideFromSanity } from '@/sanity/client';
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/SeoJsonLd';

interface PageProps {
  params: Promise<{ month: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllMonthSlugs();
  return slugs.map((month) => ({
    month,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { month } = await params;
  const sanityData = await getMonthGuideFromSanity(month);
  const data = sanityData || getMonthBySlug(month);
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://www.vietnamtours.co.uk/ideas-by-month/${data.slug}`,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: data.heroImage }],
    },
  };
}

export default async function MonthSlugPage({ params }: PageProps) {
  const specialists = await getSpecialists();
  const mainSpecialist = specialists[0] || {
    name: "Alice Mercer",
    role: "Vietnam Specialist",
    image: "/images/specialist_alice.png",
    slug: { current: "alice-mercer" }
  };

  const { month } = await params;
  const sanityData = await getMonthGuideFromSanity(month);
  const monthData = sanityData || getMonthBySlug(month);

  if (!monthData) {
    notFound();
  }

  // Load all itineraries to display relevant recommendations
  const itineraries = await getItineraries();
  
  // Custom smart matching to filter itineraries based on the current month
  let recommendedTours = itineraries.filter(it => {
    const title = it.title.toLowerCase();
    const currentMonth = monthData.slug.toLowerCase();
    
    // Some general categories based on season
    if (['january', 'february', 'december'].includes(currentMonth) && (title.includes('beach') || title.includes('classic') || title.includes('luxury'))) return true;
    if (['march', 'april', 'may'].includes(currentMonth) && (title.includes('bike') || title.includes('cycling') || title.includes('adventure') || title.includes('indochina'))) return true;
    if (['june', 'july', 'august'].includes(currentMonth) && (title.includes('family') || title.includes('kayak') || title.includes('culinary'))) return true;
    if (['september', 'october', 'november'].includes(currentMonth) && (title.includes('motorcycle') || title.includes('trekking') || title.includes('hagiang') || title.includes('loop'))) return true;
    
    return false;
  });

  // Fallback to top 4 itineraries if no specific matches found
  if (recommendedTours.length === 0) {
    recommendedTours = itineraries.slice(0, 4);
  } else {
    recommendedTours = recommendedTours.slice(0, 4);
  }

  // Related months (e.g. adjacent months)
  const crossLinks = (monthData.relatedSlugs || [])
    .map((relSlug: string) => ideasByMonthData.find(m => m.slug === relSlug))
    .filter((x: any): x is typeof ideasByMonthData[0] => !!x);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.vietnamtours.co.uk' },
        { name: 'Ideas By Month', url: 'https://www.vietnamtours.co.uk/ideas-by-month' },
        { name: monthData.title, url: `https://www.vietnamtours.co.uk/ideas-by-month/${monthData.slug}` },
      ]} />
      <ArticleJsonLd
        title={monthData.title}
        description={monthData.metaDescription || monthData.intro?.substring(0, 160)}
        url={`https://www.vietnamtours.co.uk/ideas-by-month/${monthData.slug}`}
        image={monthData.heroImage.startsWith('http') ? monthData.heroImage : `https://www.vietnamtours.co.uk${monthData.heroImage}`}
        section={monthData.category}
      />
      {monthData.faqs && monthData.faqs.length > 0 && (
        <FaqJsonLd faqs={monthData.faqs} />
      )}

      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-[#343434]">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[320px] sm:h-[400px] lg:h-[480px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={monthData.heroImage}
            alt={monthData.title}
            fill
            className="object-cover brightness-[0.55]"
            priority
          />
          <div className="absolute inset-0 bg-[#161C1A]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32 lg:pt-36">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#9A4B33] font-bold bg-slate-950/45 px-4 py-1.5 border border-[#e6e2d6] rounded-sm mb-4 inline-block">
              {monthData.category}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight tracking-wide drop-shadow-sm max-w-5xl mx-auto">
              {monthData.title}
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-slate-300 font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <Link href="/ideas-by-month" className="hover:text-white transition-colors">Ideas by Month</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">{monthData.breadcrumb}</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="weather" />

        {/* Main Two-Column Layout */}
        <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Rich Articles and Inline Images */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Introduction Lead Paragraph */}
              <div className="bg-white border-l-2 border-luxury-gold p-6 sm:p-8 shadow-md rounded-xs">
                <p className="font-serif text-lg sm:text-xl font-medium text-[#343434] leading-relaxed italic">
                  {monthData.intro}
                </p>
              </div>

              {/* Dynamic sections */}
              <div className="space-y-12 font-light text-[#343434] leading-relaxed text-base">
                {(monthData.sections || []).map((section: any, idx: number) => (
                  <div key={idx} className="space-y-6">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#343434] font-medium border-b border-[#e6e2d6] pb-3">
                      {section.heading}
                    </h2>
                    
                    <div className="whitespace-pre-line space-y-4">
                      {section.body}
                    </div>

                    {/* Optional inline image */}
                    {section.image && (
                      <div className="my-8 border border-[#e6e2d6] p-2.5 bg-[#f4efe6] rounded-xs shadow-xs group">
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
                          <span className="block text-[11px] text-[#545454] italic mt-3 text-center">
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
              <div className="bg-white border border-[#e6e2d6] p-8 shadow-md rounded-xs flex flex-col items-center text-center space-y-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A4B33] block">
                  Season Specialist
                </span>
                <h3 className="font-serif text-xl font-medium text-[#343434] leading-snug">
                  Let us plan your seasonal trip
                </h3>
                
                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-[#e6e2d6] shadow-sm shrink-0">
                  <Image 
                    src={mainSpecialist.image || "/images/specialist_alice.png"}
                    alt={mainSpecialist.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-sans text-sm font-bold text-[#343434] uppercase tracking-wider">
                    Alice Mercer
                  </h4>
                  <span className="text-[10px] uppercase tracking-widest text-[#545454] font-semibold mt-0.5 block">{mainSpecialist.role || "Bespoke Holiday Designer"}</span>
                </div>

                <p className="text-xs text-[#343434]/70 font-light leading-relaxed">
                  "I know the weather patterns of Vietnam inside out. I will make sure you are in the right region at the absolute best time."
                </p>

                <div className="w-full pt-4 border-t border-[#e6e2d6] flex flex-col gap-3">
                  <Link 
                    href="/enquire"
                    className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate text-[11px] font-bold tracking-widest uppercase py-3 transition-colors duration-300 rounded-none w-full"
                  >
                    Start Custom Quote
                  </Link>
                  <a 
                    href="tel:+442078459200" 
                    className="text-xs font-semibold text-[#343434] hover:text-[#9A4B33] transition-colors py-2 flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +44 (0) 20 7845 9200
                  </a>
                </div>
              </div>

              {/* Monthly Highlights Card */}
              <div className="bg-[#faf8f5] text-[#343434] p-8 rounded-xs shadow-md space-y-6 border border-[#e6e2d6]">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A4B33] block border-b border-[#e6e2d6] pb-3">
                  Best of {monthData.breadcrumb}
                </span>
                
                <ul className="space-y-4">
                  {(monthData.highlights || []).map((item: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-[#545454] leading-relaxed">
                      <span className="text-[#9A4B33] font-bold text-sm shrink-0 leading-none">✓</span>
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
                <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#9A4B33] block">
                  Recommended Journeys
                </span>
                <h3 className="font-serif text-3xl text-[#343434] font-medium">
                  Signature Tours for {monthData.breadcrumb}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedTours.map((tour) => (
                  <div key={tour._id} className="group bg-white border border-[#e6e2d6] hover:border-[#e6e2d6] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full rounded-xs overflow-hidden">
                    <div>
                      {/* Tour Image */}
                      <div className="relative h-48 overflow-hidden bg-[#f4efe6] border-b border-[#e6e2d6]">
                        <Image
                          src={tour.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                          alt={tour.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="p-5 text-left space-y-2">
                        <span className="text-[10px] text-[#9A4B33] tracking-widest uppercase font-bold block">
                          VIETNAM PRIVATE TOUR
                        </span>
                        
                        <h4 className="font-serif text-[16px] leading-snug font-semibold text-[#343434] hover:text-[#9A4B33] transition-colors duration-200">
                          <Link href={`/itineraries/${tour.slug?.current || ''}`}>
                            {tour.title}
                          </Link>
                        </h4>

                        <p className="text-[12px] font-medium text-[#343434]/70 tracking-wide pt-1">
                          {tour.duration} Days from <span className="text-luxury-gold">£{tour.priceFrom?.toLocaleString('en-GB')}pp</span>
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-5 py-4 border-t border-[#e6e2d6] flex items-center justify-between text-xs font-semibold select-none bg-luxury-slate/50">
                      <Link 
                        href={`/itineraries/${tour.slug?.current || ''}`}
                        className="text-[#343434]/70 hover:text-[#9A4B33] transition-colors"
                      >
                        View Itinerary
                      </Link>
                      <Link 
                        href="/enquire" 
                        className="text-[#9A4B33] hover:text-[#343434] transition-colors"
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
        {monthData.faqs && monthData.faqs.length > 0 && (
          <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto border-t border-[#e6e2d6]">
            <div className="space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9A4B33] block">
                  Seasonal Insights
                </span>
                <h3 className="font-serif text-3xl text-[#343434] font-medium">
                  Frequently Asked Questions
                </h3>
              </div>

              <FaqAccordion faqs={monthData.faqs} />
            </div>
          </section>
        )}

        {/* Cross-linking Related Months */}
        {crossLinks.length > 0 && (
          <section className="bg-[#faf8f5] text-[#343434] py-16 px-6 lg:px-12 border-t border-[#e6e2d6]">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center md:text-left space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9A4B33] block">
                  Seasonal Transitions
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  Compare Weather With Other Months
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {crossLinks.map((item: any) => (
                  <Link 
                    key={item.slug} 
                    href={`/ideas-by-month/${item.slug}`}
                    className="group relative h-64 overflow-hidden rounded-xs border border-[#e6e2d6] p-6 flex flex-col justify-end bg-luxury-slate/50"
                  >
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      className="object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <div className="relative z-10 space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#9A4B33] font-bold block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl text-white font-semibold leading-snug group-hover:text-[#9A4B33] transition-colors">
                        {item.breadcrumb} Guide
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA Block */}
        <section className="bg-[#faf8f5] text-[#343434] py-16 sm:py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#9A4B33_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9A4B33] block">
              Bespoke Travel Design
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#0e1628] font-medium leading-tight">
              {monthData.ctaHeading}
            </h3>
            <p className="text-base sm:text-lg text-[#545454] font-light max-w-2xl mx-auto leading-relaxed">
              {monthData.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-[#9A4B33] hover:bg-luxury-gold hover:text-luxury-slate text-[#161C1A] text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
              >
                Request a Custom Quote
              </Link>
              <Link
                href="/specialists"
                className="w-full sm:w-auto border border-[#e6e2d6] hover:border-[#9A4B33] hover:text-[#9A4B33] text-[#343434] text-xs uppercase tracking-widest font-bold px-10 py-4 transition-colors duration-300"
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
