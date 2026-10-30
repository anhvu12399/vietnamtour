import Link from 'next/link';
import { enquiryUrl } from '@/lib/seo';

const seasons: Record<string, { north: string; central: string; south: string; route: string }> = {
  january: { north: 'Cool, misty', central: 'Coastal variation', south: 'Generally drier', route: 'Hanoi → Ho Chi Minh City → Phu Quoc' },
  february: { north: 'Cool, misty', central: 'Improving conditions', south: 'Generally drier', route: 'Hanoi → Hoi An → Ho Chi Minh City' },
  march: { north: 'Cool, misty', central: 'Generally drier', south: 'Dry, warming', route: 'Hanoi → Ha Long Bay → Hue → Hoi An → Ho Chi Minh City' },
  april: { north: 'Warming up', central: 'Generally drier', south: 'Hot, transitional', route: 'Hanoi → Ha Long Bay → Hoi An' },
  may: { north: 'Hotter conditions', central: 'Hot, drier', south: 'Rain increasing', route: 'Hanoi → Hoi An → Da Nang' },
  june: { north: 'Hot, rainy', central: 'Hot, drier', south: 'Wet season', route: 'Hue → Hoi An → Da Nang' },
  july: { north: 'Rain, storms', central: 'Hot, drier', south: 'Wet season', route: 'Hoi An → Da Nang, with optional northern visits' },
  august: { north: 'Rain, storms', central: 'Coastal variation', south: 'Wet season', route: 'Hoi An → Da Nang, subject to weather' },
  september: { north: 'Seasonal transition', central: 'Rain increasing', south: 'Wet season', route: 'Hanoi → Sapa, with optional Ha Long Bay' },
  october: { north: 'Cooler conditions', central: 'Rain, flooding', south: 'Seasonal transition', route: 'Hanoi → Sapa → Ho Chi Minh City' },
  november: { north: 'Cooler conditions', central: 'Rain, flooding', south: 'Generally drier', route: 'Hanoi → Ha Long Bay → Ho Chi Minh City → Phu Quoc' },
  december: { north: 'Cool, misty', central: 'Rain possible', south: 'Generally drier', route: 'Hanoi → Ho Chi Minh City → Phu Quoc' },
};

export function SeasonalPlanning({ month }: { month: string }) {
  const season = seasons[month];
  if (!season) return null;
  const label = month[0].toUpperCase() + month.slice(1);
  return (
    <section className="my-10 space-y-6 border-y border-line py-8" aria-label={`${label} route planning`}>
      <h2 className="font-serif text-2xl text-ink">Choosing a route in {label}</h2>
      <p className="text-sm leading-relaxed text-ink-soft">Regional climate patterns are a starting point, not a forecast. Coastal areas differ and conditions can change. Check local forecasts and the operator&apos;s arrangements before committing to weather-dependent activities.</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="pb-3 text-left text-xs text-ink-soft">Broad regional patterns; confirm the specific destinations and dates.</caption>
          <thead><tr className="border-b border-line"><th scope="col" className="p-3">North</th><th scope="col" className="p-3">Central coast</th><th scope="col" className="p-3">South</th></tr></thead>
          <tbody><tr><td className="p-3">{season.north}</td><td className="p-3">{season.central}</td><td className="p-3">{season.south}</td></tr></tbody>
        </table>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft"><strong className="text-ink">A route to discuss:</strong> {season.route}. This is a planning suggestion; the final sequence depends on your trip length, transport and current conditions.</p>
      <div className="space-y-3 text-sm leading-relaxed text-ink-soft">
        <h3 className="font-serif text-xl text-ink">Before requesting your proposal</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>Share your exact dates and number of nights, including the children&apos;s ages if travelling as a family. UK school holiday dates vary by school.</li>
          <li>Ask which flights, hotels, meals and activities the price includes, and which changes require a new quote.</li>
          <li>Agree an alternative if a cruise or outdoor activity cannot operate. Ask how cancellation and additional hotel costs are handled.</li>
          <li>Check the relevant year&apos;s public holidays and Tet dates before relying on opening hours or transport availability.</li>
        </ul>
      </div>
      <p className="text-xs leading-relaxed text-ink-soft">Climate reference: <a className="underline" href="https://vietnam.travel/things-to-do/weather-and-climate-vietnam/">Vietnam Tourism&apos;s regional weather guide</a>, consulted 28 October 2026. This reference check does not represent a field visit or verification of every statement on this page.</p>
      <Link href={enquiryUrl(`Vietnam in ${label}`)} className="inline-block bg-copper px-6 py-3 text-sm text-white">Discuss your {label} itinerary</Link>
    </section>
  );
}
