'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ideasByMonthData } from '@/lib/ideasByMonthData';

const monthsList = [
  { slug: 'january', label: 'JAN' },
  { slug: 'february', label: 'FEB' },
  { slug: 'march', label: 'MAR' },
  { slug: 'april', label: 'APR' },
  { slug: 'may', label: 'MAY' },
  { slug: 'june', label: 'JUN' },
  { slug: 'july', label: 'JUL' },
  { slug: 'august', label: 'AUG' },
  { slug: 'september', label: 'SEP' },
  { slug: 'october', label: 'OCT' },
  { slug: 'november', label: 'NOV' },
  { slug: 'december', label: 'DEC' },
];

export default function BestTimeInteractive() {
  const [activeMonthSlug, setActiveMonthSlug] = useState('january');
  
  const currentMonthData = ideasByMonthData.find(m => m.slug === activeMonthSlug) || ideasByMonthData[0];

  return (
    <section className="py-20 bg-[#faf8f5] border-t border-b border-[#e6e2d6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-3xl font-light text-center text-[#343434] mb-4">
          Month-by-month guide for traveling in Vietnam
        </h2>
        <p className="text-center text-xs text-[#545454] font-light max-w-lg mx-auto mb-10 leading-relaxed">
          Select a month to see detailed regional weather highlights, recommendations, and local travel conditions.
        </p>

        {/* Month Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {monthsList.map((m) => {
            const isActive = activeMonthSlug === m.slug;
            return (
              <button
                key={m.slug}
                onClick={() => setActiveMonthSlug(m.slug)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#343434] text-white shadow-md'
                    : 'bg-white text-[#545454] border border-[#e6e2d6] hover:bg-[#faf8f5] hover:text-[#343434]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Selected Month Content */}
        <div className="bg-white border border-[#e6e2d6] rounded-sm shadow-sm overflow-hidden p-8 md:p-12 transition-all duration-500">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A4B33] font-semibold">
                Monthly Breakdown
              </span>
              <h3 className="font-serif text-2xl font-light text-[#343434] leading-tight">
                Visiting Vietnam in {currentMonthData.breadcrumb}
              </h3>
              
              <div className="text-sm text-[#545454] leading-relaxed font-light space-y-4">
                <p>{currentMonthData.intro}</p>
                {currentMonthData.sections && currentMonthData.sections[0] && (
                  <p className="border-l-2 border-[#BC986A] pl-4 italic text-xs text-[#545454]/90">
                    {currentMonthData.sections[0].body.split('\n\n')[0]}
                  </p>
                )}
              </div>

              {/* Highlights Bullet Points */}
              <div className="pt-2">
                <h4 className="text-[10px] uppercase tracking-wider text-[#343434] font-bold mb-3">
                  Key Highlights for {currentMonthData.breadcrumb}:
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-[#545454] font-light">
                  {currentMonthData.highlights.slice(0, 4).map((hl, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#9A4B33] mt-0.5">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <a
                  href={`/ideas-by-month/${currentMonthData.slug}`}
                  className="inline-flex items-center text-xs font-bold text-[#9A4B33] hover:text-[#7e3c28] group transition-colors"
                >
                  Read Full {currentMonthData.breadcrumb} Guide
                  <span className="transform translate-x-1 group-hover:translate-x-2 transition-transform ml-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Right Media Image */}
            <div className="md:col-span-5 relative w-full h-[280px] sm:h-[350px] overflow-hidden rounded-sm bg-[#faf8f5]">
              <Image
                src={currentMonthData.heroImage}
                alt={currentMonthData.title}
                fill
                sizes="(max-w-768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[10px] text-white/90 font-light italic leading-tight">
                  {currentMonthData.heroSubtitle}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
