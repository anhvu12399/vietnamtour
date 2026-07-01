import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Time to Visit Vietnam | Vietnam Heritage Tours',
  description: 'A month-by-month guide to the best time to travel to Vietnam — from the emerald waters of Halong Bay to the lantern-lit streets of Hoi An and the misty highlands of Sapa.',
  keywords: ['best time to visit Vietnam', 'Vietnam weather', 'Vietnam travel seasons', 'when to go to Vietnam', 'Vietnam monsoon'],
};

const months = [
  { month: 'January', rating: 5, north: 'Cool & dry', central: 'Warm & dry', south: 'Hot & dry', highlight: 'Ideal for the whole country. Peak season — book well in advance.' },
  { month: 'February', rating: 5, north: 'Cool & dry', central: 'Warm & dry', south: 'Hot & dry', highlight: 'Tet New Year festivities. Spectacular atmosphere; some businesses close briefly.' },
  { month: 'March', rating: 5, north: 'Warming', central: 'Very warm', south: 'Hot', highlight: 'One of the finest months across Vietnam. Lighter crowds than January.' },
  { month: 'April', rating: 4, north: 'Warm', central: 'Hot', south: 'Very hot', highlight: 'Good across most regions. The south grows hot; head north for comfort.' },
  { month: 'May', rating: 3, north: 'Warm & humid', central: 'Wet season begins', south: 'Rainy season starts', highlight: 'The shoulder season. Fewer tourists; brief afternoon showers in the south.' },
  { month: 'June', rating: 3, north: 'Hot & humid', central: 'Wet', south: 'Rainy', highlight: 'Good for the north and highlands. Rain in the south is typically short-lived.' },
  { month: 'July', rating: 3, north: 'Hot & humid', central: 'Wet', south: 'Rainy', highlight: 'Northern highlands such as Sapa are lush and beautiful. Central coast is wet.' },
  { month: 'August', rating: 3, north: 'Hot', central: 'Wet', south: 'Rainy', highlight: 'Similar to July. Halong Bay can be choppy. Excellent for Hanoi and surrounds.' },
  { month: 'September', rating: 3, north: 'Cooler', central: 'Very wet', south: 'Still rainy', highlight: 'Rice harvest in the north is stunning. Central Vietnam can experience typhoons.' },
  { month: 'October', rating: 4, north: 'Pleasant', central: 'Wet (flooding risk)', south: 'Drying out', highlight: 'Hoi An\'s famous flood season — beautiful but boats may be diverted.' },
  { month: 'November', rating: 5, north: 'Cool & clear', central: 'Drying', south: 'Ideal', highlight: 'Outstanding month. The whole country settles into its finest weather.' },
  { month: 'December', rating: 5, north: 'Cool & dry', central: 'Warm & dry', south: 'Warm & dry', highlight: 'Perfect weather nationwide. Peak season; accommodation books quickly.' },
];

const regions = [
  {
    name: 'Northern Vietnam',
    description: 'Hanoi, Halong Bay, Sapa',
    bestTime: 'October – April',
    avoid: 'June – August (hot, humid)',
    icon: '🏔️',
    detail: 'The north experiences four distinct seasons. Spring (March–April) brings mild temperatures and blossom. Autumn (October–November) offers crisp skies and golden light — perfect for Halong Bay cruises and Sapa trekking.'
  },
  {
    name: 'Central Vietnam',
    description: 'Hoi An, Hue, Da Nang',
    bestTime: 'February – May',
    avoid: 'September – November (typhoon risk)',
    icon: '🏛️',
    detail: 'Central Vietnam\'s coast basks in warm, dry sunshine from February to May. The ancient town of Hoi An is at its most atmospheric during this window. Avoid the typhoon season from September to November when flooding can affect low-lying areas.'
  },
  {
    name: 'Southern Vietnam',
    description: 'Ho Chi Minh City, Mekong Delta, Phu Quoc',
    bestTime: 'December – April',
    avoid: 'May – October (heavy rain)',
    icon: '🌿',
    detail: 'The south operates on a simple two-season rhythm: dry and wet. The dry season from December to April is ideal for all southern destinations. Even during the wet season, rain typically arrives as a brief afternoon shower, leaving mornings clear and pleasant.'
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-sm ${s <= rating ? 'text-[#9A4B33]' : 'text-[#e6e2d6]'}`}>★</span>
      ))}
    </div>
  );
}

export default function BestTimeToVisitPage() {
  return (
    <main className="bg-[#faf8f5] text-[#343434]">

      {/* Hero — no image needed, text-driven */}
      <section className="bg-[#343434] text-white py-28 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-4">Travel Planning</p>
        <h1 className="font-serif text-4xl md:text-6xl font-light mb-6 max-w-3xl mx-auto leading-tight">
          Best Time to Visit Vietnam
        </h1>
        <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
          Vietnam's long, slender shape means the weather varies considerably by region and season. Our month-by-month guide helps you choose the perfect window for your journey.
        </p>
      </section>

      {/* Regional Overview */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A4B33] font-semibold text-center mb-4">By Region</p>
        <h2 className="font-serif text-3xl font-light text-center mb-16">Vietnam's Three Climate Zones</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {regions.map((r) => (
            <div key={r.name} className="bg-white border border-[#e6e2d6] p-8">
              <div className="text-3xl mb-4">{r.icon}</div>
              <h3 className="font-serif text-lg text-[#343434] mb-1">{r.name}</h3>
              <p className="text-[10px] uppercase tracking-widest text-[#9A4B33] font-semibold mb-6">{r.description}</p>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#545454] font-semibold mb-1">Best Time</p>
                  <p className="text-sm font-medium text-[#343434]">{r.bestTime}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#545454] font-semibold mb-1">Avoid</p>
                  <p className="text-sm text-[#9A4B33]">{r.avoid}</p>
                </div>
              </div>
              <p className="text-xs text-[#545454] leading-relaxed font-light">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Month by Month */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A4B33] font-semibold text-center mb-4">Month by Month</p>
          <h2 className="font-serif text-3xl font-light text-center mb-16">At a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e6e2d6]">
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#545454] font-semibold">Month</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#545454] font-semibold">Rating</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#545454] font-semibold hidden md:table-cell">North</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#545454] font-semibold hidden md:table-cell">Central</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#545454] font-semibold hidden md:table-cell">South</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-[#545454] font-semibold">Highlights</th>
                </tr>
              </thead>
              <tbody>
                {months.map((m, i) => (
                  <tr key={m.month} className={`border-b border-[#e6e2d6] ${i % 2 === 0 ? 'bg-[#faf8f5]/50' : ''}`}>
                    <td className="py-4 pr-4 font-medium text-[#343434]">{m.month}</td>
                    <td className="py-4 pr-4"><StarRating rating={m.rating} /></td>
                    <td className="py-4 pr-4 text-[#545454] font-light hidden md:table-cell">{m.north}</td>
                    <td className="py-4 pr-4 text-[#545454] font-light hidden md:table-cell">{m.central}</td>
                    <td className="py-4 pr-4 text-[#545454] font-light hidden md:table-cell">{m.south}</td>
                    <td className="py-4 text-[#545454] font-light text-xs leading-relaxed">{m.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="font-serif text-3xl font-light mb-4">Not Sure When to Travel?</h2>
        <p className="text-sm text-[#545454] font-light mb-10 max-w-md mx-auto">
          Tell us your preferred dates and our specialists will recommend the regions and experiences that will be at their very best during your window.
        </p>
        <Link
          href="/enquire"
          className="inline-block bg-[#9A4B33] text-white text-[11px] uppercase tracking-widest font-bold py-4 px-10 hover:bg-[#7e3c28] transition-colors"
        >
          Ask a Specialist
        </Link>
      </section>

    </main>
  );
}
