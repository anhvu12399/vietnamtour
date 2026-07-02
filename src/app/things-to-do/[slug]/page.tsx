import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { thingsToDoData, getThingToDo, getAllThingToDoSlugs } from '@/lib/thingsToDoData';
import { getItineraries, getSpecialists } from '@/sanity/client';
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/SeoJsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllThingToDoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getThingToDo(slug);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://www.vietnamtours.co.uk/things-to-do/${data.slug}`,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: data.heroImage }],
    },
  };
}

export default async function ThingToDoDetailPage({ params }: PageProps) {
  const specialists = await getSpecialists();
  const mainSpecialist = specialists[0] || {
    name: "Alice Mercer",
    role: "Vietnam Specialist",
    image: "/images/specialist_alice.png",
    slug: { current: "alice-mercer" }
  };

  const { slug } = await params;
  const thing = getThingToDo(slug);

  if (!thing) notFound();

  const itineraries = await getItineraries();
  const recommendedTours = itineraries.slice(0, 3);

  const crossLinks = (thing.relatedSlugs || [])
    .map((s) => thingsToDoData.find((t) => t.slug === s))
    .filter((x): x is typeof thingsToDoData[0] => !!x);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.vietnamtours.co.uk' },
        { name: 'Things To Do', url: 'https://www.vietnamtours.co.uk/things-to-do' },
        { name: thing.title, url: `https://www.vietnamtours.co.uk/things-to-do/${thing.slug}` },
      ]} />
      <ArticleJsonLd
        title={thing.title}
        description={thing.metaDescription || thing.intro.substring(0, 160)}
        url={`https://www.vietnamtours.co.uk/things-to-do/${thing.slug}`}
        image={`https://www.vietnamtours.co.uk${thing.heroImage}`}
        section={thing.category}
      />
      {thing.faqs && thing.faqs.length > 0 && (
        <FaqJsonLd faqs={thing.faqs} />
      )}

      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-[#343434]">

        {/* ════════════════════════════════════════════
            1. CINEMATIC HERO
        ════════════════════════════════════════════ */}
        <section className="relative h-[380px] sm:h-[460px] lg:h-[540px] w-full flex items-end justify-center overflow-hidden">
          <Image
            src={thing.heroImage}
            alt={thing.title}
            fill
            className="object-cover brightness-[0.48]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-luxury-slate/20 to-transparent" />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 sm:pb-16">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-luxury-gold font-semibold mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/30">›</span>
              <Link href="/things-to-do" className="hover:text-white transition-colors">Things To Do</Link>
              <span className="text-white/30">›</span>
              <span className="text-white/70">{thing.breadcrumb}</span>
            </div>

            {/* Category badge */}
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-luxury-gold bg-luxury-slate/70 border border-luxury-gold/20 px-3 py-1 rounded-sm inline-block mb-4">
              {thing.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight drop-shadow-md max-w-3xl">
              {thing.title}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl">
              {thing.heroSubtitle}
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-5 mt-5 text-[10px] uppercase tracking-widest font-medium text-[#545454]">
              <span>🕒 {thing.readingTime} min read</span>
              <span className="text-luxury-gold/30">|</span>
              <span>📍 {thing.practicalInfo.location.split(',')[0]}</span>
              <span className="text-luxury-gold/30">|</span>
              <span>⭐ {thing.practicalInfo.difficulty}</span>
            </div>
          </div>
        </section>

        {/* ── Categories Tab Bar ── */}
        <CategoriesTabBar activeTab="things" />

        {/* ════════════════════════════════════════════
            2. ARTICLE BODY + SIDEBAR
        ════════════════════════════════════════════ */}
        <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── MAIN CONTENT ── */}
            <article className="lg:col-span-8">

              {/* Drop-cap Intro */}
              <div className="mb-12 pb-8 border-b border-[#e6e2d6]">
                <style dangerouslySetInnerHTML={{ __html: `
                  .drop-cap-intro > p:first-of-type::first-letter {
                    float: left;
                    font-size: 4.5rem;
                    line-height: 0.82;
                    padding-right: 0.65rem;
                    padding-top: 0.4rem;
                    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
                    font-weight: 600;
                    color: #9A4B33;
                  }
                `}} />
                <div className="drop-cap-intro">
                  <p className="text-base sm:text-[17px] font-light text-[#343434]/90 leading-relaxed">
                    {thing.intro}
                  </p>
                </div>
              </div>

              {/* Highlights strip */}
              <div className="mb-12 bg-luxury-slate/40 border border-[#e6e2d6] p-6 sm:p-8">
                <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold mb-5">
                  What Makes This Experience Special
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {thing.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#545454] font-light">
                      <span className="text-luxury-gold font-bold shrink-0 mt-0.5">✦</span>
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sections */}
              {thing.sections.map((section, idx) => (
                <div key={idx} className="mb-14">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#343434] font-semibold leading-tight mb-6 pb-4 border-b border-[#e6e2d6]">
                    {section.heading}
                  </h2>

                  {/* Body paragraphs */}
                  {section.body.split('\n\n').map((para, pi) => (
                    <p key={pi} className="text-base sm:text-[17px] font-light text-[#343434] leading-relaxed mb-6">
                      {para}
                    </p>
                  ))}

                  {/* Section image */}
                  {section.image && (
                    <div className="my-8 border border-[#e6e2d6] p-1.5 bg-[#f4efe6]">
                      <div className="relative w-full aspect-[16/9] overflow-hidden">
                        <Image
                          src={section.image}
                          alt={section.imageAlt || section.heading}
                          fill
                          className="object-cover hover:scale-[1.02] transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 800px"
                        />
                      </div>
                      {section.imageCaption && (
                        <p className="text-[10px] text-[#343434]/45 uppercase tracking-widest text-center mt-3 font-light px-2">
                          {section.imageCaption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Share strip */}
              <div className="mt-10 pt-8 border-t border-[#e6e2d6] flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#343434]/35">Share</span>
                {['Facebook', 'X (Twitter)', 'Email'].map((sn) => (
                  <span key={sn} className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold hover:text-[#343434] transition-colors cursor-pointer">{sn}</span>
                ))}
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <aside className="lg:col-span-4 space-y-6 sticky top-28">

              {/* Practical Info Card */}
              <div className="bg-luxury-slate/40 border border-[#e6e2d6] p-6 space-y-4">
                <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold border-b border-[#e6e2d6] pb-3">
                  Practical Information
                </h3>
                {[
                  { label: 'Best Time', value: thing.practicalInfo.bestTime },
                  { label: 'Duration', value: thing.practicalInfo.duration },
                  { label: 'Difficulty', value: thing.practicalInfo.difficulty },
                  { label: 'Price Guide', value: thing.practicalInfo.price },
                  { label: 'Location', value: thing.practicalInfo.location },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-gold/70 block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-xs text-[#545454] font-light leading-relaxed">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Specialist Contact Card */}
              <div className="bg-white border border-[#e6e2d6] p-7 flex flex-col items-center text-center space-y-4">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-luxury-gold block">
                  Plan this experience
                </span>
                <h3 className="font-serif text-base font-semibold text-[#343434] leading-snug">
                  Speak to a Vietnam specialist
                </h3>
                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#e6e2d6] shadow-md shrink-0">
                  <Image src={mainSpecialist.image || "/images/specialist_alice.png"} alt={mainSpecialist.name} fill className="object-cover" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans text-xs font-bold text-[#343434] uppercase tracking-wider">{mainSpecialist.name}</h4>
                  <p className="text-[11px] text-[#343434]/55 font-light">Senior Vietnam Travel Specialist</p>
                </div>
                <Link
                  href="/enquire"
                  className="w-full bg-luxury-gold text-luxury-slate hover:bg-luxury-gold/90 transition-colors duration-300 font-sans text-xs font-bold tracking-[0.2em] uppercase py-3 text-center block"
                >
                  MAKE AN ENQUIRY
                </Link>
                <div className="pt-1 border-t border-[#e6e2d6] w-full flex flex-col items-center">
                  <span className="text-[9px] uppercase text-[#343434]/35 font-bold tracking-widest block mb-1">Or call us</span>
                  <a href="tel:+84988600388" className="text-sm font-bold text-[#343434] hover:text-luxury-gold transition-colors">
                    +84 988600388
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            3. FAQ SECTION
        ════════════════════════════════════════════ */}
        {thing.faqs && thing.faqs.length > 0 && (
          <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto border-t border-[#e6e2d6]">
            <div className="text-center space-y-3 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold block">Expert Answers</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#343434] font-semibold leading-tight">
                Frequently Asked Questions
              </h2>
              <div className="h-[1.5px] w-10 bg-luxury-gold mx-auto mt-3" />
            </div>
            <FaqAccordion faqs={thing.faqs} />
          </section>
        )}

        {/* ════════════════════════════════════════════
            4. RECOMMENDED TOURS
        ════════════════════════════════════════════ */}
        {recommendedTours.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-[#f4efe6] border-t border-[#e6e2d6]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 mb-10 border-b border-[#e6e2d6]">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold block">Signature Journeys</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#343434] font-medium">
                    Tours That Include This Experience
                  </h2>
                </div>
                <Link
                  href="/itineraries"
                  className="text-xs uppercase tracking-widest font-bold text-luxury-gold hover:text-[#343434] transition-colors pb-1 border-b border-[#e6e2d6] hover:border-luxury-gold self-start sm:self-end"
                >
                  View all tours
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recommendedTours.map((it) => (
                  <div key={it._id} className="group bg-white border border-[#e6e2d6] hover:border-[#e6e2d6] transition-all duration-300 hover:shadow-xl flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-[#f4efe6] border-b border-[#e6e2d6]">
                      <Image
                        src={it.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                        alt={it.title}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5 space-y-2 flex-grow">
                      <span className="text-[9px] text-luxury-gold tracking-widest uppercase font-bold">VIETNAM PRIVATE TOUR</span>
                      <h4 className="font-serif text-base leading-snug font-semibold text-[#343434] group-hover:text-luxury-gold transition-colors">
                        <Link href={`/itineraries/${it.slug?.current || ''}`}>{it.title}</Link>
                      </h4>
                      {it.duration && it.priceFrom && (
                        <p className="text-xs font-medium text-[#343434]/55">
                          {it.duration} days from <span className="text-luxury-gold">£{it.priceFrom.toLocaleString('en-GB')}pp</span>
                        </p>
                      )}
                    </div>
                    <div className="px-5 py-3.5 border-t border-[#e6e2d6] flex items-center justify-between text-xs font-semibold bg-luxury-slate/40">
                      <Link href={`/itineraries/${it.slug?.current || ''}`} className="text-[#343434]/65 hover:text-luxury-gold transition-colors">
                        View itinerary
                      </Link>
                      <Link href="/enquire" className="text-luxury-gold hover:text-[#343434] transition-colors">
                        Enquire
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            5. RELATED THINGS TO DO
        ════════════════════════════════════════════ */}
        {crossLinks.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-[#faf8f5] border-t border-[#e6e2d6]">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center md:text-left space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold block">More To Discover</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  You Might Also Enjoy
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {crossLinks.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/things-to-do/${item.slug}`}
                    className="group relative h-60 overflow-hidden border border-[#e6e2d6] hover:border-[#e6e2d6] flex flex-col justify-end bg-luxury-slate/40 transition-all duration-300"
                  >
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      className="object-cover brightness-[0.45] group-hover:scale-[1.04] group-hover:brightness-[0.55] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="relative z-10 p-5 space-y-1">
                      <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-luxury-gold block">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg text-white font-medium leading-snug group-hover:text-luxury-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-white/60 font-light line-clamp-2">{item.heroSubtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            6. BOTTOM CTA
        ════════════════════════════════════════════ */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto bg-white border border-[#e6e2d6] p-10 sm:p-16 text-center space-y-8 shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold block">Plan Your Journey</span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#343434] font-medium leading-tight">
              {thing.ctaHeading}
            </h3>
            <p className="text-sm text-[#545454] font-light max-w-xl mx-auto leading-relaxed">
              {thing.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/enquire"
                className="w-full sm:w-auto bg-luxury-gold text-luxury-slate text-xs uppercase tracking-widest font-semibold px-10 py-4 hover:bg-luxury-gold/90 transition-colors"
              >
                Enquire Online
              </Link>
              <Link
                href="/things-to-do"
                className="w-full sm:w-auto border border-[#e6e2d6] hover:border-luxury-gold hover:text-luxury-gold text-[#343434] text-xs uppercase tracking-widest font-semibold px-10 py-4 transition-colors"
              >
                More Things To Do
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
