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
        { label: 'Couples / Romantic', value: 'couple' },
        { label: 'Families (Multi-gen)', value: 'family' },
        { label: 'Solo Adventurer', value: 'solo' },
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
    // Basic scoring/filtering system
    let filtered = itineraries.filter((it) => {
      // 1. Duration filter
      let durationMatches = true;
      if (finalDuration === 'short') durationMatches = it.duration <= 10;
      else if (finalDuration === 'medium') durationMatches = it.duration > 10 && it.duration <= 14;
      else if (finalDuration === 'long') durationMatches = it.duration > 14;

      // 2. Style filter
      let styleMatches = false;
      const titleLower = it.title.toLowerCase();
      const introLower = it.intro.toLowerCase();
      const hlLower = it.highlights.join(' ').toLowerCase();
      
      if (style === 'beach') {
        styleMatches = titleLower.includes('beach') || titleLower.includes('romance') || hlLower.includes('amanoi') || hlLower.includes('resort');
      } else if (style === 'culture') {
        styleMatches = titleLower.includes('grand') || titleLower.includes('culture') || hlLower.includes('imperial') || hlLower.includes('historic');
      } else if (style === 'culinary') {
        styleMatches = titleLower.includes('culinary') || titleLower.includes('culture') || hlLower.includes('chef') || hlLower.includes('dining');
      } else if (style === 'wilderness') {
        styleMatches = titleLower.includes('grand') || hlLower.includes('lodge') || hlLower.includes('sapa') || hlLower.includes('hike');
      }

      return durationMatches || styleMatches;
    });

    // Fallback: If no matches, return all featured itineraries
    if (filtered.length === 0) {
      filtered = itineraries.slice(0, 2);
    }
    
    setResults(filtered.slice(0, 2)); // Return top 2 recommendations
  };

  const resetFinder = () => {
    setTraveller('');
    setStyle('');
    setDuration('');
    setResults([]);
    setStep(1);
  };

  return (
    <div className="w-full bg-luxury-moss border border-luxury-gold/30 p-8 sm:p-12 relative overflow-hidden transition-all duration-500 shadow-2xl">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

      {step <= 3 ? (
        <div className="space-y-8 animate-fade-in">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-[10px] tracking-widest uppercase font-semibold text-luxury-gold">
            <span>Bespoke Finder</span>
            <span>Step {step} of 3</span>
          </div>
          <div className="h-[2px] bg-luxury-slate w-full relative">
            <div 
              className="h-full bg-luxury-gold transition-all duration-500" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-luxury-linen leading-tight">
              {steps[step - 1].title}
            </h3>
            <p className="text-xs sm:text-sm font-light text-luxury-linen/70">
              {steps[step - 1].description}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps[step - 1].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="group border border-luxury-gold/20 hover:border-luxury-gold/70 bg-luxury-slate/30 p-6 text-left hover:bg-luxury-gold hover:text-luxury-slate transition-all duration-300 flex items-center justify-between rounded-none"
              >
                <span className="font-serif text-base sm:text-lg tracking-wide">
                  {opt.label}
                </span>
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Back button */}
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs text-luxury-linen/50 hover:text-luxury-gold transition-colors font-semibold uppercase tracking-widest pt-4"
            >
              ← Back to previous question
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">
              Your Recommended Journeys
            </span>
            <button
              onClick={resetFinder}
              className="text-xs text-luxury-linen/50 hover:text-luxury-gold transition-colors font-semibold uppercase tracking-widest underline decoration-dotted"
            >
              Reset Quiz
            </button>
          </div>

          <p className="text-sm font-light text-luxury-linen/80 leading-relaxed max-w-2xl">
            Based on your party composition, styling, and duration preferences, we have curated the following signature journeys for you.
          </p>

          {/* Results Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {results.map((it) => (
              <div 
                key={it._id} 
                className="bg-luxury-slate border border-luxury-gold/15 p-6 flex flex-col justify-between space-y-6 hover:border-luxury-gold/40 transition-all duration-300"
              >
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold block">
                    {it.duration} Days • Signature Trip
                  </span>
                  <h4 className="font-serif text-xl text-luxury-linen leading-tight">
                    {it.title}
                  </h4>
                  <p className="text-xs text-luxury-linen/60 font-light leading-relaxed line-clamp-3">
                    {it.intro}
                  </p>
                </div>

                <div className="pt-4 border-t border-luxury-moss flex items-center justify-between">
                  <span className="text-xs font-semibold text-luxury-linen">
                    From £{it.priceFrom.toLocaleString('en-GB')} pp
                  </span>
                  <Link
                    href={`/itineraries/${it.slug?.current || ''}`}
                    className="text-xs font-semibold text-luxury-gold hover:underline flex items-center space-x-1"
                  >
                    <span>View Itinerary</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="pt-6 border-t border-luxury-gold/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <p className="text-sm font-medium text-luxury-linen">Not exactly what you had in mind?</p>
              <p className="text-xs text-luxury-linen/60 font-light">Our specialists can craft a 100% custom route from scratch.</p>
            </div>
            <Link
              href={`/enquire?traveller=${traveller}&style=${style}&duration=${duration}`}
              className="w-full sm:w-auto px-8 py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-slate font-semibold text-xs tracking-widest uppercase transition-all duration-300 text-center"
            >
              Customise with a Specialist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
