"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Itinerary } from '@/sanity/types';

interface Props {
  itineraries: Itinerary[];
}

export default function ItinerariesGridInteractive({ itineraries }: Props) {
  // Initially show 8 tours (2 complete rows on desktop)
  const [visibleCount, setVisibleCount] = useState(8);

  const totalCount = itineraries.length;
  const visibleTours = itineraries.slice(0, visibleCount);
  const isAllLoaded = visibleCount >= totalCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, totalCount));
  };

  const progressPercent = Math.min((visibleCount / totalCount) * 100, 100);

  return (
    <>
      {/* Grid 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleTours.map((it) => (
          <div key={it._id} className="group bg-white border border-[#d8d8d8] hover:border-blue/30 transition-all duration-300 hover:shadow-md flex flex-col justify-between h-full relative rounded-none">
            
            {/* Featured Badge */}
            <div className="bg-blue text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-none absolute top-4 left-4 z-10 flex items-center gap-0.5 shadow-sm">
              <span>★</span>
              <span>FEATURED</span>
            </div>

            <div>
              {/* Tour Image */}
              <div className="relative h-48 overflow-hidden bg-[#f4efe6] border-b border-[#d8d8d8]">
                <Image
                  src={it.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                  alt={it.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 text-left space-y-2 bg-white">
                <span className="text-[9px] text-blue tracking-widest uppercase font-bold block">
                  VIETNAM
                </span>
                
                <h4 className="font-serif text-[15px] leading-snug font-medium text-green hover:text-blue transition-colors">
                  <Link href={`/itineraries/${it.slug?.current || ''}`}>
                    {it.title}
                  </Link>
                </h4>

                <p className="text-[11px] font-medium text-gray-500 tracking-wide pt-1">
                  {it.duration} Days from <span className="text-blue font-semibold block text-xs">£{it.priceFrom?.toLocaleString('en-GB')}pp</span>
                </p>
              </div>
            </div>

            {/* Card Actions Footer */}
            <div className="px-5 py-4 border-t border-[#d8d8d8] flex items-center justify-between text-[10px] font-bold tracking-wider uppercase bg-bg-light">
              <Link 
                href={`/itineraries/${it.slug?.current || ''}`}
                className="text-gray-500 hover:text-blue transition-colors"
              >
                View Detail
              </Link>
              <Link 
                href="/enquire"
                className="text-blue hover:text-green transition-colors"
              >
                Request quote
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination & Progress */}
      <div className="mt-16 pb-12 flex flex-col items-center space-y-4 max-w-xs mx-auto text-center border-b border-[#d8d8d8]">
        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
          You've viewed {Math.min(visibleCount, totalCount)} of {totalCount} tours
        </span>
        
        {/* Progress Line */}
        <div className="w-full h-[3px] bg-[#d8d8d8] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gold rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Load More Button */}
        <button 
          onClick={handleLoadMore}
          disabled={isAllLoaded}
          className="w-full bg-gold text-white py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gold/90 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-2 rounded-none"
        >
          {isAllLoaded ? "ALL TOURS LOADED" : "LOAD MORE TOURS"}
        </button>
      </div>
    </>
  );
}
