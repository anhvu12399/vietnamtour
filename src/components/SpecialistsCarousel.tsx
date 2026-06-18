'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Specialist {
  _id: string;
  name: string;
  slug: { current: string };
  image?: string;
  role?: string;
  bio?: any[];
  favoriteDestinations?: string[];
  email?: string;
}

interface SpecialistsCarouselProps {
  specialists: Specialist[];
}

export default function SpecialistsCarousel({ specialists }: SpecialistsCarouselProps) {
  // Bổ sung thêm mock specialists nếu danh sách thực tế ít hơn 3 người để giao diện cân đối
  const [displayList, setDisplayList] = useState<Specialist[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let list = [...specialists];
    if (list.length === 0) {
      list = [
        {
          _id: 'mock-1',
          name: 'Milly Darnell',
          slug: { current: 'milly-darnell' },
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300',
          role: 'Luxury Travel Specialist',
          bio: [{ children: [{ text: "With 14 years' experience in the travel industry, I've been fortunate to explore a wide range of incredible destinations, which has only strengthened my..." }] }]
        },
        {
          _id: 'mock-2',
          name: 'Rikki Poynton',
          slug: { current: 'rikki-poynton' },
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300',
          role: 'Luxury Travel Specialist',
          bio: [{ children: [{ text: "I've always been interested in travel from a young age after several visits to Russia with school and then learning languages in university. After graduating, I moved..." }] }]
        },
        {
          _id: 'mock-3',
          name: 'Hannah Ingle',
          slug: { current: 'hannah-ingle' },
          image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300&h=300',
          role: 'Luxury Travel Specialist',
          bio: [{ children: [{ text: "My career in travel has exposed me to some of the most incredible travel experiences across Southern Europe & Scandinavia. Italy has a special..." }] }]
        }
      ];
    } else if (list.length === 1) {
      list.push(
        {
          _id: 'mock-2',
          name: 'Rikki Poynton',
          slug: { current: 'rikki-poynton' },
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300',
          role: 'Luxury Travel Specialist',
          bio: [{ children: [{ text: "I've always been interested in travel from a young age after several visits to Russia with school and then learning languages in university. After graduating, I moved..." }] }]
        },
        {
          _id: 'mock-3',
          name: 'Hannah Ingle',
          slug: { current: 'hannah-ingle' },
          image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300&h=300',
          role: 'Luxury Travel Specialist',
          bio: [{ children: [{ text: "My career in travel has exposed me to some of the most incredible travel experiences across Southern Europe & Scandinavia. Italy has a special..." }] }]
        }
      );
    } else if (list.length === 2) {
      // Đổi tên hoặc giữ nguyên 2 người chính và bổ sung người thứ 3
      list.push({
        _id: 'mock-3',
        name: 'Hannah Ingle',
        slug: { current: 'hannah-ingle' },
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300&h=300',
        role: 'Luxury Travel Specialist',
        bio: [{ children: [{ text: "My career in travel has exposed me to some of the most incredible travel experiences across Southern Europe & Scandinavia. Italy has a special..." }] }]
      });
    }
    setDisplayList(list);
  }, [specialists]);

  // Số lượng item hiển thị cùng lúc
  // Desktop: 3, Tablet: 2, Mobile: 1
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [displayList]);

  const maxIndex = Math.max(0, displayList.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="py-24 bg-luxury-moss relative overflow-hidden border-t border-luxury-gold/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.03),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-luxury-linen leading-tight font-medium">
            Meet Our Luxury Travel Specialists
          </h2>
        </div>
 
        {/* Carousel Viewport Wrapper */}
        <div className="relative flex items-center justify-between px-4 sm:px-8">
          
          {/* Left Navigation Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 z-20 w-8 h-8 flex items-center justify-center text-luxury-linen/50 hover:text-luxury-gold transition-colors cursor-pointer"
            aria-label="Previous Specialist"
          >
            <span className="text-3xl font-light select-none">‹</span>
          </button>
 
          {/* Carousel Viewport */}
          <div className="overflow-hidden w-full mx-4 sm:mx-8">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                width: `${(displayList.length / itemsPerPage) * 100}%`
              }}
            >
              {displayList.map((spec) => {
                const bioText = Array.isArray(spec.bio) && spec.bio[0]?.children?.[0]?.text
                  ? spec.bio[0].children[0].text
                  : "A passionate traveler with years of experience mapping out bespoke paths through Indochina. Dedicated to crafting seamless, private, and unforgettable experiences.";
                
                return (
                  <div 
                    key={spec._id} 
                    style={{ width: `${100 / displayList.length}%` }}
                    className="px-4 flex-shrink-0"
                  >
                    <div className="flex items-start space-x-4 group h-full">
                      {/* Avatar */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-luxury-gold/20 group-hover:border-luxury-gold/50 transition-colors duration-500 shadow-lg bg-black/20">
                        <Image
                          src={spec.image || '/images/specialist_alice.png'}
                          alt={spec.name}
                          fill
                          className="object-cover grayscale brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                          sizes="(max-width: 640px) 96px, 112px"
                        />
                      </div>
 
                      {/* Info */}
                      <div className="flex flex-col justify-between py-1 h-full min-h-[96px] sm:min-h-[112px]">
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl text-luxury-linen font-medium group-hover:text-luxury-gold transition-colors duration-300">
                            {spec.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-luxury-linen/70 font-light leading-relaxed mt-2 line-clamp-3">
                            {bioText}
                          </p>
                        </div>
                        <div className="mt-2">
                          <Link
                            href={`/specialists/${spec.slug?.current || ''}`}
                            className="text-xs text-luxury-linen/80 hover:text-luxury-gold underline hover:no-underline transition-all font-light"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* Right Navigation Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-0 z-20 w-8 h-8 flex items-center justify-center text-luxury-linen/50 hover:text-luxury-gold transition-colors cursor-pointer"
            aria-label="Next Specialist"
          >
            <span className="text-3xl font-light select-none">›</span>
          </button>
        </div>
 
        {/* Explore Our Experts Button */}
        <div className="text-center mt-16">
          <Link
            href="/specialists"
            className="inline-block px-8 py-3 bg-luxury-gold text-luxury-slate hover:bg-transparent hover:text-luxury-gold border border-luxury-gold font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-md"
          >
            Explore Our Experts
          </Link>
        </div>
 
      </div>
    </section>
  );
}
