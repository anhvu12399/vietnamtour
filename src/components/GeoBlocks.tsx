import FaqAccordion from '@/components/FaqAccordion';
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
