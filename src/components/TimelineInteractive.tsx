import type { DayTimelineDetail } from '@/lib/itineraryDetailsBuilder';

interface Props { timelineDays: DayTimelineDetail[] }

export default function TimelineInteractive({ timelineDays }: Props) {
  return (
    <div className="space-y-12">
      {timelineDays.map((day, index) => (
        <section key={`${day.dayNumber}-${day.title}`} className="space-y-6">
          {(index === 0 || timelineDays[index - 1].phase !== day.phase) && (
            <h3 className="border border-line bg-paper-dim p-4 font-serif text-sm font-semibold uppercase tracking-widest text-ink">{day.phase}</h3>
          )}
          <div className="space-y-4 border-l-2 border-line pl-8 sm:pl-10">
            <p className="text-xs font-bold uppercase tracking-widest text-copper">{day.dayLabel || `Day ${day.dayNumber}`}</p>
            <h4 className="font-serif text-xl text-ink sm:text-2xl">{day.title}</h4>
            {day.description.split('\n\n').filter(Boolean).map((paragraph, i) => <p key={i} className="text-sm font-light leading-relaxed text-ink-soft">{paragraph}</p>)}
            {day.hotelName && <p className="text-xs text-ink-soft">Accommodation listed in the sample: {day.hotelName}. Confirm the property and room category in your proposal.</p>}
          </div>
        </section>
      ))}
    </div>
  );
}
