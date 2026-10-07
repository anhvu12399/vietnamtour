import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from '@/components/SeoJsonLd';
import { getItineraries } from '@/sanity/client';
import { CONTENT_REVIEWED_AT, absoluteUrl } from '@/lib/siteConfig';
import { getUkGuide, type UkGuide } from '@/lib/ukGuidesData';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function guideWordCount(guide: UkGuide): number {
  const text = [
    guide.answer,
    ...guide.sections.flatMap((s) => [s.heading, ...(s.paragraphs || []), ...(s.bullets || []), ...(s.table?.rows.flat() || [])]),
    ...guide.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

const BANDS: { label: string; min: number; max: number }[] = [
  { label: 'Day tours (1 day)', min: 1, max: 1 },
  { label: 'Short breaks and cruises (2–3 days)', min: 2, max: 3 },
  { label: 'Regional journeys (4–9 days)', min: 4, max: 9 },
  { label: 'Full Vietnam journeys (10–14 days)', min: 10, max: 14 },
  { label: 'Extended journeys (15+ days)', min: 15, max: 999 },
];

async function PricingTable() {
  const itineraries = await getItineraries();
  const priced = itineraries.filter((it) => it.slug?.current && it.duration && it.priceFrom);
  const rows = BANDS.map((band) => {
    const inBand = priced.filter((it) => it.duration >= band.min && it.duration <= band.max);
    if (inBand.length === 0) return null;
    const prices = inBand.map((it) => it.priceFrom);
    return { band, count: inBand.length, low: Math.min(...prices), high: Math.max(...prices) };
  }).filter((r): r is NonNullable<typeof r> => !!r);
  if (rows.length === 0) return null;

  const fmt = (n: number) => `£${n.toLocaleString('en-GB')}`;
  const multi = rows.filter((r) => r.band.min >= 2);
  const multiLow = multi.length ? Math.min(...multi.map((r) => r.low)) : null;

  return (
    <section className="mb-14" id="prices">
      <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold leading-tight mb-4 pb-4 border-b border-line">
        Current starting prices (per person, £ GBP)
      </h2>
      <p className="text-base font-light text-ink leading-relaxed mb-5">
        Based on our current itineraries{multiLow ? <>, multi-day journeys start from <strong>{fmt(multiLow)} per person</strong></> : null}. These are “from” prices;
        your final quote depends on dates, hotels, group size and options. Browse every itinerary on our{' '}
        <Link href="/itineraries" className="text-copper underline underline-offset-2">itineraries page</Link>.
      </p>
      <div className="overflow-x-auto border border-line">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Starting prices per person in pounds sterling by trip length</caption>
          <thead className="bg-paper-dim text-[11px] uppercase tracking-widest text-ink-soft">
            <tr>
              <th scope="col" className="px-4 py-3">Trip length</th>
              <th scope="col" className="px-4 py-3">Itineraries</th>
              <th scope="col" className="px-4 py-3">“From” price range (per person)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.band.label} className="border-t border-line">
                <th scope="row" className="px-4 py-3 font-semibold text-ink">{r.band.label}</th>
                <td className="px-4 py-3 text-ink-soft">{r.count}</td>
                <td className="px-4 py-3 text-ink font-medium">
                  {r.low === r.high ? fmt(r.low) : `${fmt(r.low)} – ${fmt(r.high)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function UkGuideView({ guide }: { guide: UkGuide }) {
  const url = absoluteUrl(guide.path);
  const related = guide.related.map((s) => getUkGuide(s)).filter((g): g is UkGuide => !!g);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Vietnam Guides for UK Travellers', url: '/vietnam-guides' },
          { name: guide.title, url: guide.path },
        ]}
      />
      <WebPageJsonLd
        name={guide.metaTitle}
        description={guide.metaDescription}
        url={url}
        modifiedAt={CONTENT_REVIEWED_AT}
        speakable={['[data-answer]']}
      />
      <ArticleJsonLd
        title={guide.title}
        description={guide.metaDescription}
        url={url}
        image={guide.heroImage}
        publishedAt={CONTENT_REVIEWED_AT}
        modifiedAt={CONTENT_REVIEWED_AT}
        section={guide.category}
        answer={guide.answer}
        sources={guide.sources}
        wordCount={guideWordCount(guide)}
      />
      <FaqJsonLd faqs={guide.faqs} />

      <Navbar />

      <main className="min-h-screen bg-paper text-ink">
        <section className="relative h-[320px] sm:h-[400px] w-full flex items-end overflow-hidden">
          <Image src={guide.heroImage} alt={guide.title} fill priority className="object-cover brightness-[0.48]" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-luxury-slate/20 to-transparent" />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-10 sm:pb-14">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold mb-4">
              <Link href="/" className="text-gold hover:text-white">Home</Link>
              <span className="text-white/30">›</span>
              <Link href="/vietnam-guides" className="text-gold hover:text-white">Vietnam Guides</Link>
            </nav>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold bg-luxury-slate/70 border border-gold/20 px-3 py-1 inline-block mb-4">
              {guide.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight max-w-3xl">
              {guide.title}
            </h1>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          {/* Direct answer — the passage answer engines quote */}
          <div className="mb-10 border-l-4 border-gold bg-paper-dim p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-2">Quick answer</p>
            <p data-answer className="text-base sm:text-lg text-ink leading-relaxed font-normal">
              {guide.answer}
            </p>
            <p className="mt-3 text-xs text-ink-soft">
              Last reviewed <time dateTime={CONTENT_REVIEWED_AT}>{formatDate(CONTENT_REVIEWED_AT)}</time> by the VietnamTours.co.uk team.
            </p>
          </div>

          {guide.showPricing && <PricingTable />}

          {guide.sections.map((section) => (
            <section key={section.heading} className="mb-14">
              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold leading-tight mb-5 pb-4 border-b border-line">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-base sm:text-[17px] font-light text-ink leading-relaxed mb-5">{p}</p>
              ))}
              {section.table && (
                <div className="overflow-x-auto border border-line my-6">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">{section.table.caption}</caption>
                    <thead className="bg-paper-dim text-[11px] uppercase tracking-widest text-ink-soft">
                      <tr>
                        {section.table.headers.map((h, i) => (
                          <th key={i} scope="col" className="px-4 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri} className="border-t border-line align-top">
                          {row.map((cell, ci) =>
                            ci === 0 ? (
                              <th key={ci} scope="row" className="px-4 py-3 font-semibold text-ink whitespace-nowrap">{cell}</th>
                            ) : (
                              <td key={ci} className="px-4 py-3 text-ink-soft font-light">{cell}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.bullets && (
                <ul className="space-y-2.5 mb-2">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-base font-light text-ink-soft">
                      <span className="text-gold font-bold shrink-0">✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mb-14">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold mb-6 pb-4 border-b border-line">
              Frequently asked questions
            </h2>
            <FaqAccordion faqs={guide.faqs} />
          </section>

          {guide.sources.length > 0 && (
            <section className="mb-14">
              <h2 className="font-serif text-xl text-ink font-semibold mb-4">Official sources</h2>
              <ul className="space-y-2 text-sm">
                {guide.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-copper hover:text-ink underline underline-offset-2">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-ink-soft">
                Entry, health and safety rules change. Always confirm with the official sources above before you book and before you travel.
              </p>
            </section>
          )}

          {related.length > 0 && (
            <section className="mb-14">
              <h2 className="font-serif text-xl text-ink font-semibold mb-4">Related guides</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link href={g.path} className="block border border-line p-4 hover:border-gold transition-colors">
                      <span className="text-[9px] uppercase tracking-widest text-gold font-bold">{g.category}</span>
                      <span className="block font-serif text-base text-ink mt-1">{g.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="bg-white border border-line p-8 text-center space-y-4">
            <h2 className="font-serif text-2xl text-ink">Plan your private Vietnam tour</h2>
            <p className="text-sm text-ink-soft font-light max-w-xl mx-auto">
              Tell us your dates, interests and group, and a Vietnam specialist will design a tailor-made itinerary with a clear price in pounds.
            </p>
            <Link href="/enquire" className="inline-block bg-gold text-ink text-xs uppercase tracking-widest font-semibold px-10 py-4 hover:bg-gold/90 transition-colors">
              Enquire online
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
