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

interface BestTimeInteractiveProps {
  initialMonthData?: any[];
}

export default function BestTimeInteractive({ initialMonthData }: BestTimeInteractiveProps) {
  const [activeMonthSlug, setActiveMonthSlug] = useState('january');
  
  const items = initialMonthData && initialMonthData.length > 0 ? initialMonthData : ideasByMonthData;
  const currentMonthData = items.find((m: any) => m.slug === activeMonthSlug) || items[0];

  return (
    <section className="py-10 md:py-20 bg-paper border-t border-b border-line">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <h2 className="font-serif text-3xl font-light text-center text-ink mb-4">
          Month-by-month guide for traveling in Vietnam
        </h2>
        <p className="text-center text-xs text-ink-soft font-light max-w-lg mx-auto mb-10 leading-relaxed">
          Select a month to see detailed regional weather highlights, recommendations, and local travel conditions.
        </p>

        {/* Month Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-12 max-w-4xl mx-auto">
          {monthsList.map((m) => {
            const isActive = activeMonthSlug === m.slug;
            return (
              <button
                key={m.slug}
                onClick={() => setActiveMonthSlug(m.slug)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#343434] text-white shadow-md'
                    : 'bg-white text-ink-soft border border-line hover:bg-paper hover:text-ink'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Selected Month Content */}
        <div className="bg-white border border-line rounded-sm shadow-sm overflow-hidden p-5 md:p-12 transition-all duration-500">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-copper font-semibold">
                Monthly Breakdown
              </span>
              <h3 className="font-serif text-2xl font-light text-ink leading-tight">
                Visiting Vietnam in {currentMonthData.breadcrumb}
              </h3>
              
              <div className="text-sm text-ink-soft leading-relaxed font-light space-y-4">
                <p>{currentMonthData.intro}</p>
                {currentMonthData.sections && currentMonthData.sections[0] && (
                  <p className="border-l-2 border-[#BC986A] pl-4 italic text-xs text-ink-soft/90">
                    {currentMonthData.sections[0].body.split('\n\n')[0]}
                  </p>
                )}
              </div>

              {/* Highlights Bullet Points */}
              <div className="pt-2">
                <h4 className="text-[10px] uppercase tracking-wider text-ink font-bold mb-3">
                  Key Highlights for {currentMonthData.breadcrumb}:
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-ink-soft font-light">
                  {currentMonthData.highlights.slice(0, 4).map((hl: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-copper mt-0.5">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <a
                  href={`/ideas-by-month/${currentMonthData.slug}`}
                  className="inline-flex items-center text-xs font-bold text-copper hover:text-[#7e3c28] group transition-colors"
                >
                  Read Full {currentMonthData.breadcrumb} Guide
                  <span className="transform translate-x-1 group-hover:translate-x-2 transition-transform ml-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Right Media Image */}
            <div className="md:col-span-5 relative w-full h-[280px] sm:h-[350px] overflow-hidden rounded-sm bg-paper">
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
