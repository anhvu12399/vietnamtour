import Link from 'next/link';
import type { EditorialEvidence as Evidence } from '@/sanity/types';
import { validIsoDate } from '@/lib/seo';

export function EditorialEvidence({ evidence }: { evidence?: Evidence }) {
  if (!evidence) return null;
  const reviewedAt = validIsoDate(evidence.lastReviewedAt);
  return (
    <aside aria-label="Article authors and sources" className="my-8 space-y-4 border-y border-line py-6 text-sm text-ink-soft">
      {evidence.author && <p>Written by {evidence.author.slug?.current ? <Link className="underline" href={`/specialists/${evidence.author.slug.current}`}>{evidence.author.name}</Link> : evidence.author.name}</p>}
      {reviewedAt && evidence.reviewer && (
        <p>Reviewed by {evidence.reviewer.slug?.current ? <Link className="underline" href={`/specialists/${evidence.reviewer.slug.current}`}>{evidence.reviewer.name}</Link> : evidence.reviewer.name} on <time dateTime={reviewedAt}>{new Date(reviewedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>.</p>
      )}
      {!!evidence.sources?.length && <div><h2 className="font-semibold text-ink">Sources</h2><ul className="mt-2 space-y-2">{evidence.sources.map((source) => <li key={source.url}><a href={source.url} className="underline" rel="noopener noreferrer">{source.label}</a>{source.accessedAt ? ` — consulted ${source.accessedAt}` : ''}</li>)}</ul></div>}
      {!!evidence.fieldVisits?.length && <div><h2 className="font-semibold text-ink">Field visits</h2><ul className="mt-2 space-y-2">{evidence.fieldVisits.map((visit) => <li key={`${visit.location}-${visit.visitedAt}`}>{visit.location} — {visit.visitedAt}{visit.evidenceUrl && <> · <a href={visit.evidenceUrl} className="underline">Field report</a></>}</li>)}</ul></div>}
    </aside>
  );
}
