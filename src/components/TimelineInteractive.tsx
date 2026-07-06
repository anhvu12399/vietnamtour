'use client';

import React, { useState } from 'react';
import { DayTimelineDetail } from '@/lib/itineraryDetailsBuilder';
import { ChevronDown, ChevronUp, MapPin, Coffee, Utensils, Award } from 'lucide-react';

interface Props {
  timelineDays: DayTimelineDetail[];
}

export default function TimelineInteractive({ timelineDays }: Props) {
  // Store expanded state for each day (dayNumber is 1-indexed)
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const colors = {
    North: { bg: 'bg-[#1b4332]/10', border: 'border-[#1b4332]/30', text: 'text-[#1b4332]', dot: 'bg-[#1b4332]' },
    Central: { bg: 'bg-[#c5a880]/10', border: 'border-[#c5a880]/30', text: 'text-[#c5a880]', dot: 'bg-[#c5a880]' },
    South: { bg: 'bg-[#8B0000]/10', border: 'border-[#8B0000]/30', text: 'text-[#8B0000]', dot: 'bg-[#8B0000]' }
  };

  return (
    <div className="space-y-12">
      {timelineDays.map((day, idx) => {
        const isExpanded = !!expandedDays[day.dayNumber];
        const regionStyle = colors[day.region] || colors.North;

        // Render phase header if first day of a phase or first day in timeline
        const showPhaseHeader = idx === 0 || timelineDays[idx - 1].phase !== day.phase;

        return (
          <div key={day.dayNumber} className="space-y-6">
            {/* Phase Section Divider */}
            {showPhaseHeader && (
              <div className={`mt-8 first:mt-0 p-4 border ${regionStyle.border} ${regionStyle.bg} flex items-center justify-between`}>
                <span className={`font-serif text-sm uppercase tracking-widest font-semibold ${regionStyle.text}`}>
                  {day.phase}
                </span>
                <span className="text-[10px] bg-white border border-line px-2.5 py-0.5 rounded-none font-bold uppercase text-ink-soft">
                  {day.region} region
                </span>
              </div>
            )}

            {/* Day Item */}
            <div className="relative pl-8 sm:pl-10 border-l-2 border-line hover:border-gold/30 transition-colors py-2 text-left">
              {/* Circle Marker colored by phase */}
              <div className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform duration-300 ${regionStyle.dot}`} />

              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold">
                      Day {day.dayNumber}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-ink font-semibold leading-snug">
                      {day.title}
                    </h3>
                  </div>
                  
                  {/* Quick meals / hotel info */}
                  <div className="flex items-center space-x-2 text-[10px] text-ink-soft font-medium uppercase tracking-wider">
                    <span>🍴 {day.meals}</span>
                    <span>•</span>
                    <span className="truncate max-w-[150px] sm:max-w-none">🏨 {day.hotelName}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {day.tags.map((tag) => (
                    <span key={tag} className="text-[9px] uppercase tracking-widest font-semibold border border-line px-2 py-0.5 bg-paper-dim text-ink-soft">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base font-light text-ink-soft leading-relaxed">
                  {day.description}
                </p>

                {/* Insider Notes */}
                {day.insiderNotes && (
                  <div className="border-l-2 border-gold bg-[#f4efe6]/50 p-4 text-xs font-light text-ink-soft leading-relaxed space-y-1">
                    <span className="font-serif font-bold text-copper uppercase tracking-wider text-[9px] block">Insider Tip:</span>
                    <p className="italic">&ldquo;{day.insiderNotes}&rdquo;</p>
                  </div>
                )}

                {/* Expandable Hour-by-Hour Accordion */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleDay(day.dayNumber)}
                    className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-gold hover:text-copper transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Hour-by-Hour Schedule' : 'View Hour-by-Hour Schedule'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 bg-paper-dim border border-line p-5 space-y-4 animate-fade-in text-left">
                      <h4 className="font-serif text-xs uppercase tracking-widest text-ink font-semibold border-b border-line pb-2">
                        Bespoke Daily Timeline
                      </h4>
                      <div className="space-y-4">
                        {day.hourlySchedule.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-4 text-xs">
                            <span className="font-sans font-bold text-gold shrink-0 w-16 pt-0.5">
                              {item.time}
                            </span>
                            <div className="space-y-1">
                              <span className="font-bold text-ink block">{item.activity}</span>
                              <p className="font-light text-ink-soft leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Gastronomy Highlight */}
                      <div className="mt-4 pt-3 border-t border-line flex items-start space-x-3 text-xs">
                        <Utensils className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                        <div>
                          <span className="font-serif font-bold text-copper uppercase tracking-wider text-[9px] block">
                            Culinary Recommendation
                          </span>
                          <p className="font-light text-ink-soft leading-relaxed">
                            For a local highlight, request lunch at a boutique garden restaurant nearby, featuring regional herbs and slow-roasted meats.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
