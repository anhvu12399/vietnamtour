import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import BestTimeInteractive from '@/components/BestTimeInteractive';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Time to Visit Vietnam | Travel Ideas by Month | Vietnam Tour',
  description: 'Find the best time to visit Vietnam. Explore weather forecasts, regional climate zones, month-by-month recommendations, and detailed temperature guides.',
  keywords: ['best time to visit Vietnam', 'Vietnam weather', 'Vietnam climate zones', 'when to go to Vietnam', 'Vietnam weather table'],
};

const regionsData = [
  {
    name: 'Northern Vietnam',
    subtitle: 'Hanoi, Halong Bay, Sapa, Ha Giang',
    description: 'There are two distinct seasons. It\'s hot and humid from May to October with high rainfall, but the weather cools down from November to April and it\'s much drier. December and January can be quite cold in the highlands, with temperatures dropping below 10°C (50°F) in Sapa.',
    bestMonths: 'October – April',
  },
  {
    name: 'Central Vietnam',
    subtitle: 'Hoi An, Hue, Da Nang, Nha Trang',
    description: 'Central Vietnam\'s summer season lasts from January until the end of August. The weather is hot and dry, with temperatures ranging between 26°C and 35°C. Conditions between September and December are much wetter, with high rainfall and occasional tropical storms.',
    bestMonths: 'February – May',
  },
  {
    name: 'Southern Vietnam',
    subtitle: 'Ho Chi Minh City, Mekong Delta, Phu Quoc',
    description: 'Southern Vietnam\'s hot and dry season starts in November and finishes at the end of April, with temperatures often reaching 32°C - 35°C. Rain falls regularly between May and October, but the weather still remains warm, usually between 28°C and 32°C, with rainfall typically limited to brief afternoon downpours.',
    bestMonths: 'November – April',
  },
];

const climateGuide = [
  {
    name: 'Con Dao Islands',
    months: [
      { temp: '82°', rain: '1"' },
      { temp: '82°', rain: '0"' },
      { temp: '86°', rain: '0"' },
      { temp: '88°', rain: '2"' },
      { temp: '88°', rain: '9"' },
      { temp: '88°', rain: '12"' },
      { temp: '86°', rain: '10"' },
      { temp: '86°', rain: '13"' },
      { temp: '86°', rain: '13"' },
      { temp: '84°', rain: '12"' },
      { temp: '84°', rain: '7"' },
      { temp: '82°', rain: '2"' },
    ]
  },
  {
    name: 'Halong Bay',
    months: [
      { temp: '70°', rain: '1"' },
      { temp: '68°', rain: '1"' },
      { temp: '73°', rain: '2"' },
      { temp: '81°', rain: '3"' },
      { temp: '88°', rain: '6"' },
      { temp: '90°', rain: '8"' },
      { temp: '90°', rain: '11"' },
      { temp: '90°', rain: '13"' },
      { temp: '88°', rain: '13"' },
      { temp: '84°', rain: '4"' },
      { temp: '79°', rain: '1"' },
      { temp: '72°', rain: '1"' },
    ]
  },
  {
    name: 'Hanoi',
    months: [
      { temp: '68°', rain: '1"' },
      { temp: '70°', rain: '1"' },
      { temp: '73°', rain: '1"' },
      { temp: '82°', rain: '3"' },
      { temp: '90°', rain: '8"' },
      { temp: '91°', rain: '9"' },
      { temp: '91°', rain: '12"' },
      { temp: '90°', rain: '13"' },
      { temp: '88°', rain: '10"' },
      { temp: '84°', rain: '5"' },
      { temp: '79°', rain: '2"' },
      { temp: '72°', rain: '1"' },
    ]
  },
  {
    name: 'Ho Chi Minh City',
    months: [
      { temp: '90°', rain: '1"' },
      { temp: '91°', rain: '0"' },
      { temp: '93°', rain: '0"' },
      { temp: '95°', rain: '2"' },
      { temp: '91°', rain: '8"' },
      { temp: '90°', rain: '12"' },
      { temp: '88°', rain: '11"' },
      { temp: '88°', rain: '10"' },
      { temp: '88°', rain: '12"' },
      { temp: '88°', rain: '10"' },
      { temp: '88°', rain: '4"' },
      { temp: '88°', rain: '2"' },
    ]
  },
  {
    name: 'Hoi An',
    months: [
      { temp: '77°', rain: '4"' },
      { temp: '79°', rain: '2"' },
      { temp: '82°', rain: '1"' },
      { temp: '88°', rain: '1"' },
      { temp: '91°', rain: '2"' },
      { temp: '93°', rain: '4"' },
      { temp: '93°', rain: '3"' },
      { temp: '93°', rain: '4"' },
      { temp: '88°', rain: '13"' },
      { temp: '84°', rain: '21"' },
      { temp: '81°', rain: '15"' },
      { temp: '77°', rain: '8"' },
    ]
  },
  {
    name: 'Hue',
    months: [
      { temp: '75°', rain: '6"' },
      { temp: '77°', rain: '3"' },
      { temp: '81°', rain: '3"' },
      { temp: '86°', rain: '2"' },
      { temp: '91°', rain: '4"' },
      { temp: '93°', rain: '3"' },
      { temp: '93°', rain: '3"' },
      { temp: '93°', rain: '5"' },
      { temp: '88°', rain: '14"' },
      { temp: '84°', rain: '24"' },
      { temp: '81°', rain: '25"' },
      { temp: '75°', rain: '13"' },
    ]
  },
  {
    name: 'Mekong Delta',
    months: [
      { temp: '86°', rain: '0"' },
      { temp: '86°', rain: '0"' },
      { temp: '88°', rain: '0"' },
      { temp: '91°', rain: '2"' },
      { temp: '91°', rain: '7"' },
      { temp: '91°', rain: '8"' },
      { temp: '88°', rain: '9"' },
      { temp: '88°', rain: '9"' },
      { temp: '88°', rain: '8"' },
      { temp: '88°', rain: '10"' },
      { temp: '88°', rain: '6"' },
      { temp: '86°', rain: '2"' },
    ]
  },
  {
    name: 'Nha Trang',
    months: [
      { temp: '82°', rain: '2"' },
      { temp: '84°', rain: '1"' },
      { temp: '86°', rain: '1"' },
      { temp: '90°', rain: '2"' },
      { temp: '91°', rain: '2"' },
      { temp: '91°', rain: '2"' },
      { temp: '91°', rain: '1"' },
      { temp: '91°', rain: '2"' },
      { temp: '90°', rain: '5"' },
      { temp: '86°', rain: '11"' },
      { temp: '84°', rain: '11"' },
      { temp: '82°', rain: '6"' },
    ]
  },
  {
    name: 'Phu Quoc',
    months: [
      { temp: '86°', rain: '1"' },
      { temp: '86°', rain: '1"' },
      { temp: '88°', rain: '3"' },
      { temp: '90°', rain: '6"' },
      { temp: '88°', rain: '8"' },
      { temp: '88°', rain: '13"' },
      { temp: '86°', rain: '18"' },
      { temp: '86°', rain: '24"' },
      { temp: '86°', rain: '18"' },
      { temp: '86°', rain: '12"' },
      { temp: '86°', rain: '7"' },
      { temp: '86°', rain: '2"' },
    ]
  },
  {
    name: 'Sapa & Tonkinese Alps',
    months: [
      { temp: '55°', rain: '1"' },
      { temp: '59°', rain: '2"' },
      { temp: '66°', rain: '2"' },
      { temp: '72°', rain: '5"' },
      { temp: '77°', rain: '10"' },
      { temp: '75°', rain: '11"' },
      { temp: '77°', rain: '18"' },
      { temp: '77°', rain: '16"' },
      { temp: '73°', rain: '10"' },
      { temp: '70°', rain: '5"' },
      { temp: '64°', rain: '1"' },
      { temp: '61°', rain: '0"' },
    ]
  }
];

export default function IdeasByMonthListingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-[#343434]">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[280px] sm:h-[350px] lg:h-[400px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/trip_bike_rice_paddies.png"
            alt="Best Time to Visit Vietnam Header"
            fill
            className="object-cover brightness-[0.55]"
            priority
          />
          <div className="absolute inset-0 bg-[#161C1A]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-wide drop-shadow-sm">
              Best Time to Visit Vietnam
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-[#9A4B33] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Best Time to Visit</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="weather" />

        {/* Regional Breakdown & Sidebar */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-10 md:py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Content (Regions) */}
            <div className="lg:col-span-8 space-y-12">
              <p className="text-base text-[#545454] leading-relaxed font-light">
                The best time to visit Vietnam is between <strong className="font-semibold text-[#343434]">November and April</strong>. This is when the country experiences the least amount of rain and temperatures are highly comfortable.
              </p>

              <div className="space-y-10 pt-4">
                {regionsData.map((reg) => (
                  <div key={reg.name} className="border-b border-[#e6e2d6] pb-8 last:border-0 last:pb-0">
                    <h3 className="font-serif text-2xl font-light text-[#343434] mb-1">
                      {reg.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-[#9A4B33] font-semibold mb-4">
                      {reg.subtitle}
                    </p>
                    <p className="text-sm text-[#545454] leading-relaxed font-light mb-4">
                      {reg.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[#faf8f5] border border-[#e6e2d6] px-4 py-2 text-xs">
                      <span className="font-semibold text-[#343434]">Recommended Months:</span>
                      <span className="text-[#9A4B33] font-bold">{reg.bestMonths}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#e6e2d6] p-8 text-center space-y-6">
                <h4 className="font-serif text-lg font-light text-[#343434] leading-snug">
                  Creating tailor-made tours for over 15 years
                </h4>
                
                {/* Badges */}
                <div className="flex justify-center items-center gap-4 py-2 border-t border-b border-[#faf8f5]">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-[#BC986A] flex items-center justify-center text-[10px] font-bold text-[#BC986A] bg-[#faf8f5] shadow-sm">
                      TA
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#545454] mt-1 font-semibold">A-List</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-[#9A4B33] flex items-center justify-center text-[10px] font-bold text-[#9A4B33] bg-[#faf8f5] shadow-sm">
                      ★ 5.0
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#545454] mt-1 font-semibold">TrustScore</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-[#343434] flex items-center justify-center text-[10px] font-bold text-[#343434] bg-[#faf8f5] shadow-sm">
                      LIC
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#545454] mt-1 font-semibold">Licensed</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href="/enquire"
                    className="block w-full bg-[#9A4B33] text-white text-[10px] uppercase tracking-widest font-bold py-3.5 hover:bg-[#7e3c28] transition-colors"
                  >
                    Make an Inquiry
                  </Link>
                  <a
                    href="https://wa.me/84988600388"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-[#343434] border border-[#e6e2d6] text-[10px] uppercase tracking-widest font-bold py-3.5 hover:bg-[#faf8f5] transition-colors"
                  >
                    Request a Callback
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Month-by-month Interactive Tab Section */}
        <BestTimeInteractive />

        {/* Climate Table Section */}
        <section className="py-12 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
            <h2 className="font-serif text-3xl font-light text-center text-[#343434] mb-4">
              Vietnam Climate Guide
            </h2>
            <p className="text-center text-xs text-[#545454] font-light max-w-lg mx-auto mb-8 md:mb-16 leading-relaxed">
              Explore the detailed average temperature and monthly rainfall (inches) guide across Vietnam's main destinations.
            </p>

            <div className="overflow-x-auto border border-[#e6e2d6]">
              <table className="w-full text-xs text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-[#343434] text-white border-b border-[#e6e2d6]">
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-[9px] w-[18%]">Destination</th>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                      <th key={m} className="py-4 px-2 font-semibold uppercase tracking-wider text-[9px] text-center">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {climateGuide.map((dest, i) => (
                    <tr
                      key={dest.name}
                      className={`border-b border-[#e6e2d6] transition-colors hover:bg-[#faf8f5] ${
                        i % 2 === 0 ? 'bg-white' : 'bg-[#faf8f5]/40'
                      }`}
                    >
                      <td className="py-4 px-6 font-medium text-[#343434]">{dest.name}</td>
                      {dest.months.map((m, mIdx) => (
                        <td key={mIdx} className="py-3 px-1 text-center">
                          <div className="font-semibold text-[#343434]">{m.temp}</div>
                          <div className="text-[10px] text-[#9A4B33] font-light mt-0.5">{m.rain}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Us and Advice Columns */}
        <section className="py-10 md:py-20 bg-[#faf8f5] border-t border-[#e6e2d6]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              
              {/* Left Column: Why travel with us */}
              <div className="bg-white border border-[#e6e2d6] p-8 lg:p-12 space-y-6">
                <h3 className="font-serif text-2xl font-light text-[#343434] border-b border-[#e6e2d6] pb-4">
                  Why travel with Vietnam Tours?
                </h3>
                <ul className="space-y-4 text-sm text-[#545454] font-light leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-[#BC986A] text-lg font-bold">✓</span>
                    <div>
                      <strong className="font-semibold text-[#343434]">100% custom and private:</strong> Every itinerary is handcrafted from scratch matching your travel pace and style.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#BC986A] text-lg font-bold">✓</span>
                    <div>
                      <strong className="font-semibold text-[#343434]">Official Registration:</strong> Operated by My Way Travel Co., Ltd with International Tour Operator License No. 79-0743/2017/TCDL.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#BC986A] text-lg font-bold">✓</span>
                    <div>
                      <strong className="font-semibold text-[#343434]">Financial Protection:</strong> Bounded security deposit under Government regulations at Vietcombank.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#BC986A] text-lg font-bold">✓</span>
                    <div>
                      <strong className="font-semibold text-[#343434]">Expert Specialists:</strong> Dedicated local specialists providing 24/7 on-ground assistance during your journey.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right Column: Travel Advice & Brochure */}
              <div className="space-y-8">
                
                {/* Block 1 */}
                <div className="bg-white border border-[#e6e2d6] p-8 space-y-4">
                  <span className="text-[9px] uppercase tracking-wider text-[#9A4B33] font-bold">Travel Advice</span>
                  <h4 className="font-serif text-lg font-light text-[#343434]">
                    Practical tips for traveling in Vietnam
                  </h4>
                  <p className="text-xs text-[#545454] leading-relaxed font-light">
                    From visas, health requirements, packaging guides, and local currencies, read our comprehensive travel guidelines to make your holiday seamless.
                  </p>
                  <Link
                    href="/visa-guide"
                    className="inline-flex items-center text-xs font-bold text-[#9A4B33] hover:text-[#7e3c28] pt-2"
                  >
                    View Visa & Travel Advice →
                  </Link>
                </div>

                {/* Block 2 */}
                <div className="bg-white border border-[#e6e2d6] p-8 space-y-4">
                  <span className="text-[9px] uppercase tracking-wider text-[#9A4B33] font-bold">Tailor-Made Brochure</span>
                  <h4 className="font-serif text-lg font-light text-[#343434]">
                    Download or request our luxury brochures
                  </h4>
                  <p className="text-xs text-[#545454] leading-relaxed font-light">
                    Packed with inspiring trip ideas, destination guides, and luxury hotel listings recommended by our travel experts.
                  </p>
                  <Link
                    href="/enquire"
                    className="inline-flex items-center text-xs font-bold text-[#9A4B33] hover:text-[#7e3c28] pt-2"
                  >
                    Request a Custom Brochure →
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
