'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FloatingCTAProps {
  title: string;
  duration: number;
  priceFrom: number;
}

export default function FloatingCTA({ title, duration, priceFrom }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-luxury-slate border-t border-luxury-gold/30 shadow-2xl z-40 transition-all duration-500 py-4 px-6 lg:px-12 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Info */}
        <div className="text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-wider text-luxury-gold font-semibold block">
            {duration} Days Tailor-Made Journey
          </span>
          <h4 className="font-serif text-sm md:text-base text-luxury-linen font-medium">
            {title}
          </h4>
        </div>

        {/* Right Price & Button */}
        <div className="flex items-center space-x-6">
          <div className="text-right hidden xs:block">
            <span className="text-[9px] uppercase tracking-wider text-luxury-linen/50 block font-light">From</span>
            <span className="text-sm md:text-base font-bold text-luxury-linen">£{priceFrom.toLocaleString('en-GB')}pp</span>
          </div>
          <Link
            href="/enquire"
            className="px-6 py-2.5 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-md"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
