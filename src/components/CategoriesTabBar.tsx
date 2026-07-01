import Link from 'next/link';
import { getItineraries, getPosts, getDestinations, getAccommodations, getCruises } from '@/sanity/client';
import { thingsToDoData } from '@/lib/thingsToDoData';

interface CategoriesTabBarProps {
  activeTab: 'tours' | 'guides' | 'places' | 'hotels' | 'cruises' | 'things' | 'weather';
}

export default async function CategoriesTabBar({ activeTab }: CategoriesTabBarProps) {
  const [itineraries, allPosts, destinations, accommodations, cruises] = await Promise.all([
    getItineraries(),
    getPosts(),
    getDestinations(),
    getAccommodations(),
    getCruises(),
  ]);

  const toursCount = itineraries.length;
  const guidesCount = allPosts.length;
  const placesCount = destinations.length;
  const hotelsCount = accommodations.length;
  const cruisesCount = cruises.length;
  const thingsToDoCount = thingsToDoData.length;
  const weatherCount = 12; // 12 months representing weather by month

  const tabs = [
    { id: 'tours', label: 'Vietnam Tours', count: toursCount, href: '/itineraries' },
    { id: 'guides', label: 'Travel Guides', count: guidesCount, href: '/travel-guides' },
    { id: 'places', label: 'Places to visit', count: placesCount, href: '/destinations' },
    { id: 'hotels', label: 'Hotels', count: hotelsCount, href: '/accommodations' },
    { id: 'things', label: 'Things to do', count: thingsToDoCount, href: '/things-to-do' },
    { id: 'cruises', label: 'Vietnam Cruises', count: cruisesCount, href: '/destinations' },
    { id: 'weather', label: 'Best time to visit', count: weatherCount, href: '/ideas-by-month' },
  ];

  return (
    <section className="w-full bg-[#faf8f5] text-[#343434] sticky top-[80px] md:top-[88px] z-30 shadow-sm border-b border-[#e6e2d6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-6 lg:space-x-8 min-w-max h-11">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="relative h-full flex items-center gap-1.5 hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                <span
                  className={`inline-flex items-center justify-center text-[8px] font-bold rounded-full w-4.5 h-4.5 transition-colors duration-200 ${
                    isActive
                      ? 'bg-gold text-white'
                      : 'bg-[#e6e2d6] text-[#545454]'
                  }`}
                >
                  {tab.count}
                </span>
                <span
                  className={`text-[10px] lg:text-[11px] font-sans font-bold uppercase tracking-[0.12em] transition-colors duration-200 ${
                    isActive ? 'text-gold' : 'text-[#545454]'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  /* Downward triangle caret */
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gold z-10" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
