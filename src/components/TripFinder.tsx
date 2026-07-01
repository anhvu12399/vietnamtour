'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Itinerary } from '@/sanity/types';

interface TripFinderProps {
  itineraries: Itinerary[];
}

export default function TripFinder({ itineraries }: TripFinderProps) {
  const [step, setStep] = useState<number>(1);
  const [traveller, setTraveller] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [results, setResults] = useState<Itinerary[]>([]);

  const steps = [
    {
      title: 'Who is travelling?',
      description: 'Select your party composition to customize the pace and accommodation styling.',
      options: [
        { label: 'Honeymooners', value: 'honeymoon' },
        { label: 'Couples & Romance', value: 'couple' },
        { label: 'Families (Multi-generation)', value: 'family' },
        { label: 'Solo Explorers', value: 'solo' },
      ],
    },
    {
      title: 'Select your preferred travel style',
      description: 'Choose the focus of your journey. All trips are fully bespoke.',
      options: [
        { label: 'Beach & Wellness', value: 'beach' },
        { label: 'Cultural & Heritage', value: 'culture' },
        { label: 'Food & Gastronomy', value: 'culinary' },
        { label: 'Active & Wilderness', value: 'wilderness' },
      ],
    },
    {
      title: 'What is your ideal duration?',
      description: 'How many days do you wish to spend exploring Vietnam?',
      options: [
        { label: '7 - 10 Days', value: 'short' },
        { label: '11 - 14 Days', value: 'medium' },
        { label: '15+ Days', value: 'long' },
      ],
    },
  ];

  const handleSelect = (val: string) => {
    if (step === 1) {
      setTraveller(val);
      setStep(2);
    } else if (step === 2) {
      setStyle(val);
      setStep(3);
    } else if (step === 3) {
      setDuration(val);
      calculateMatches(val);
      setStep(4);
    }
  };

  const calculateMatches = (finalDuration: string) => {
    let filtered = itineraries.filter((it) => {
      let durationMatches = true;
      if (finalDuration === 'short') durationMatches = it.duration <= 10;
      else if (finalDuration === 'medium') durationMatches = it.duration > 10 && it.duration <= 14;
      else if (finalDuration === 'long') durationMatches = it.duration > 14;

      let styleMatches = false;
      const titleLower = it.title.toLowerCase();
      const hlLower = it.highlights.join(' ').toLowerCase();
      
      if (style === 'beach') {
        styleMatches = titleLower.includes('beach') || titleLower.includes('romance') || hlLower.includes('amanoi');
      } else if (style === 'culture') {
        styleMatches = titleLower.includes('grand') || titleLower.includes('culture') || hlLower.includes('historic');
      } else if (style === 'culinary') {
        styleMatches = titleLower.includes('culinary') || hlLower.includes('chef') || hlLower.includes('dining');
      } else if (style === 'wilderness') {
        styleMatches = titleLower.includes('grand') || hlLower.includes('lodge') || hlLower.includes('sapa');
      }

      return durationMatches || styleMatches;
    });

    if (filtered.length === 0) {
      filtered = itineraries.slice(0, 2);
    }
    
    setResults(filtered.slice(0, 2));
  };

  const resetFinder = () => {
    setTraveller('');
    setStyle('');
    setDuration('');
    setResults([]);
    setStep(1);
  };

  return (
    <div className="w-full bg-[#161C1A] py-16 px-6 sm:px-12 relative overflow-hidden transition-all duration-500 text-[#EDE9E3]">
      {/* Background soft lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#9A4B33]/5 rounded-full blur-3xl pointer-events-none" />

      {step <= 3 ? (
        <div className="space-y-10 max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-[9px] tracking-[0.25em] uppercase font-medium text-[#9A4B33]">
            <span>Curating Your Journey</span>
            <span>Step {step} of 3</span>
          </div>
          <div className="h-[1px] bg-white/10 w-full relative">
            <div 
              className="h-full bg-[#9A4B33] transition-all duration-500" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight tracking-wide">
              {steps[step - 1].title}
            </h3>
            <p className="text-xs sm:text-sm font-light text-[#EDE9E3]/60 tracking-wider">
              {steps[step - 1].description}
            </p>
          </div>

          {/* Options Grid (Delicate Underline Text Links Instead of Box Borders) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-4">
            {steps[step - 1].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="group w-full py-4 text-left border-b border-white/10 hover:border-[#9A4B33] transition-all duration-300 flex items-center justify-between cursor-pointer"
              >
                <span className="font-serif text-lg tracking-wider text-white/90 group-hover:text-[#9A4B33] transition-colors">
                  {opt.label}
                </span>
                <span className="text-xs text-[#9A4B33] translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  &rarr;
                </span>
              </button>
            ))}
          </div>

          {/* Back button */}
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-[9px] text-[#EDE9E3]/55 hover:text-[#9A4B33] transition-colors font-medium uppercase tracking-[0.2em] pt-6 block cursor-pointer"
            >
              &larr; Back to previous question
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10 max-w-5xl mx-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A4B33] font-semibold">
              Your Recommended Journeys
            </span>
            <button
              onClick={resetFinder}
              className="text-[9px] text-[#EDE9E3]/50 hover:text-[#9A4B33] transition-colors font-semibold uppercase tracking-[0.25em] underline underline-offset-4 cursor-pointer"
            >
              Reset Quiz
            </button>
          </div>

          <p className="text-xs sm:text-sm font-light text-[#EDE9E3]/70 leading-relaxed max-w-2xl tracking-wide">
            Based on your party composition, styling, and duration preferences, we have curated the following signature journeys for you.
          </p>

          {/* Results Display: Tall cards, Image occupies 70%, Text occupies 30% */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            {results.map((it) => (
              <div 
                key={it._id} 
                className="group flex flex-col justify-between border border-[#EDE9E3]/5 bg-[#222927]/40 overflow-hidden hover:border-[#9A4B33]/40 transition-all duration-500"
              >
                {/* Image 70% Height */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={it.gallery?.[0] || '/images/vietnamtour_amanoi_villa.png'}
                    alt={it.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-[4000ms] ease-out brightness-[0.7] img-editorial"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161C1A] via-transparent to-transparent opacity-65" />
                </div>

                {/* Text 30% Height */}
                <div className="p-6 space-y-4 bg-[#161C1A] flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Captions like 8 Nights | Central Coast */}
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#B8AC94] font-medium block">
                      {it.duration} Nights | {it.title.includes('Sa Pa') || it.title.includes('North') ? 'Northern Highlands' : 'Bespoke Route'}
                    </span>
                    <h4 className="font-serif text-lg text-white font-light leading-snug tracking-wide group-hover:text-[#9A4B33] transition-colors duration-300">
                      {it.title}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] tracking-wider text-[#EDE9E3]/60 font-light">
                      Fully Customisable
                    </span>
                    <Link
                      href={`/itineraries/${it.slug?.current || ''}`}
                      className="text-[9px] font-semibold text-[#9A4B33] tracking-[0.2em] uppercase flex items-center gap-1 hover:text-white transition-colors duration-300"
                    >
                      Explore Trip &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <p className="text-xs sm:text-sm font-medium text-white tracking-wide">Not exactly what you had in mind?</p>
              <p className="text-[11px] text-[#EDE9E3]/60 font-light">Our specialists can craft a 100% custom route from scratch.</p>
            </div>
            <Link
              href={`/enquire?traveller=${traveller}&style=${style}&duration=${duration}`}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#9A4B33] text-[#9A4B33] hover:bg-[#9A4B33] hover:text-[#161C1A] font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 text-center"
            >
              Customise with a Specialist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
