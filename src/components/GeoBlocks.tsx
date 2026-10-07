import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';
import type { GeoFaq } from '@/lib/geoDefaults';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Direct, quotable answer shown right under the H1. */
export function GeoAnswer({ answer, reviewedAt, label = 'At a glance' }: { answer: string; reviewedAt?: string; label?: string }) {
  if (!answer) return null;
  return (
    <div className="border-l-4 border-gold bg-paper-dim p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-2">{label}</p>
      <p data-answer className="text-base sm:text-lg text-ink leading-relaxed font-normal">
        {answer}
      </p>
      {reviewedAt && (
        <p className="mt-3 text-xs text-ink-soft">
          Last reviewed <time dateTime={reviewedAt}>{formatDate(reviewedAt)}</time>
        </p>
      )}
    </div>
  );
}

export function GeoFaqSection({ faqs, heading = 'Frequently asked questions' }: { faqs: GeoFaq[]; heading?: string }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="space-y-6 text-left">
      <h2 className="font-serif text-2xl lg:text-3xl text-ink font-medium border-b border-jade-deep/50 pb-4">{heading}</h2>
      <FaqAccordion faqs={faqs} />
    </section>
  );
}

export function GeoSources({ sources }: { sources?: { label?: string; url?: string }[] }) {
  const list = (sources || []).filter((s) => s.url);
  if (list.length === 0) return null;
  return (
    <div className="text-sm text-ink-soft">
      <p className="font-semibold text-ink mb-2">Sources</p>
      <ul className="space-y-1">
        {list.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-copper underline underline-offset-2 hover:text-ink">
              {s.label || s.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PLANNING_LINKS = [
  { href: '/vietnam-holidays-from-uk', label: 'Vietnam holidays from the UK: flights, time difference & money' },
  { href: '/vietnam-guides/vietnam-tour-cost-from-uk', label: 'How much does a private Vietnam tour cost?' },
  { href: '/vietnam-guides/best-time-to-visit-vietnam-uk-travellers', label: 'Best time to visit Vietnam, region by region' },
  { href: '/visa-guide', label: 'Vietnam visa for UK passport holders' },
  { href: '/vietnam-guides/is-vietnam-safe-for-uk-travellers', label: 'Is Vietnam safe? Health & safety advice' },
];

/** Contextual internal links to the core planning guides. */
export function PlanningGuides({ heading = 'Planning your trip from the UK' }: { heading?: string }) {
  return (
    <nav aria-label="Planning guides" className="border border-line p-6 bg-white text-left">
      <h2 className="font-serif text-xl text-ink font-semibold mb-4">{heading}</h2>
      <ul className="space-y-2 text-sm">
        {PLANNING_LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-copper underline underline-offset-2 hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
