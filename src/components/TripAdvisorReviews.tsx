'use client';

import { useState, useEffect, useRef } from 'react';

interface Review {
  title: string;
  text: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  highlights: string[];
}

interface TripAdvisorReviewsProps {
  reviews: Review[];
}

// TripAdvisor official green owl logo SVG
function TripAdvisorOwlLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* TripAdvisor owl icon - green circle with owl eyes */}
      <circle cx="25" cy="25" r="23" fill="#34E0A1" />
      {/* Left eye */}
      <circle cx="17" cy="25" r="7" fill="white" />
      <circle cx="17" cy="25" r="4" fill="#1D1D1D" />
      <circle cx="15.5" cy="23.5" r="1.2" fill="white" />
      {/* Right eye */}
      <circle cx="33" cy="25" r="7" fill="white" />
      <circle cx="33" cy="25" r="4" fill="#1D1D1D" />
      <circle cx="31.5" cy="23.5" r="1.2" fill="white" />
      {/* Owl beak */}
      <path d="M22 28 L25 31.5 L28 28 Z" fill="#F5A623" />
      {/* Owl ears/tufts */}
      <path d="M12 10 L15 19 L9 17 Z" fill="#34E0A1" stroke="#2bc88a" strokeWidth="0.5" />
      <path d="M38 10 L35 19 L41 17 Z" fill="#34E0A1" stroke="#2bc88a" strokeWidth="0.5" />
      {/* TripAdvisor text */}
      <text x="52" y="20" fontSize="10" fontWeight="700" fill="#00AF87" fontFamily="Arial, sans-serif">Trip</text>
      <text x="52" y="33" fontSize="10" fontWeight="700" fill="#00AF87" fontFamily="Arial, sans-serif">Advisor</text>
    </svg>
  );
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'md' ? 'text-base' : 'text-sm';
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${sizeClass === 'text-base' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`}
          viewBox="0 0 20 20"
          fill={i < rating ? '#34E0A1' : '#2a3a2f'}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TripAdvisorReviews({ reviews }: TripAdvisorReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((idx + reviews.length) % reviews.length);
      setIsAnimating(false);
    }, 300);
  };

  // Auto-advance every 7 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goTo(activeIndex + 1);
    }, 7000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activeIndex]);

  const review = reviews[activeIndex];

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#0d1612] relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(197,168,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,168,128,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#34E0A1]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[#34E0A1]/80 block">
              Guest Chronicles
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-luxury-linen leading-tight font-medium">
              What Our Travellers
              <br />
              <span className="text-luxury-gold font-light italic">Are Saying</span>
            </h2>
          </div>

          {/* TripAdvisor badge — right aligned */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-4 p-5 border border-[#34E0A1]/20 bg-[#34E0A1]/5 rounded-sm">
              <TripAdvisorOwlLogo className="w-[100px] h-[50px]" />
              <div className="border-l border-[#34E0A1]/20 pl-4 space-y-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#34E0A1">
                      <circle cx="10" cy="10" r="9" />
                    </svg>
                  ))}
                  <span className="text-white font-bold text-sm ml-1">5.0</span>
                </div>
                <p className="text-[10px] text-luxury-linen/50 font-light leading-snug max-w-[140px]">
                  #1 Tour Operator in Vietnam on TripAdvisor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Review area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Navigation dots + counter */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center gap-3 py-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-1.5 h-10 bg-luxury-gold'
                    : 'w-1.5 h-3 bg-luxury-linen/20 hover:bg-luxury-linen/40'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* Center: Main review card */}
          <div className="lg:col-span-8">
            <div
              className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
            >
              {/* Big quote mark */}
              <div className="text-[120px] leading-none text-luxury-gold/15 font-serif -mb-8 -ml-2 select-none">
                "
              </div>

              {/* Review title */}
              <h3 className="font-serif text-2xl lg:text-3xl text-luxury-linen font-medium leading-tight mb-6">
                {review.title}
              </h3>

              {/* Review body */}
              <p className="text-base text-luxury-linen/75 font-light leading-relaxed mb-8 max-w-2xl">
                {review.text}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {review.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border border-luxury-gold/25 text-luxury-gold/80 font-semibold hover:border-luxury-gold/60 transition-colors"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Author row */}
              <div className="flex items-center gap-4 pt-6 border-t border-luxury-linen/10">
                {/* Avatar initials */}
                <div className="w-12 h-12 rounded-full bg-luxury-gold/20 border border-luxury-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-luxury-gold font-semibold text-sm">
                    {review.author.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif text-luxury-linen font-medium">{review.author}</span>
                    <span className="text-luxury-linen/30 text-xs">·</span>
                    <span className="text-luxury-linen/50 text-xs">{review.location}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <StarRating rating={review.rating} />
                    <span className="text-[10px] uppercase tracking-widest text-luxury-linen/40 font-medium">{review.date}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#34E0A1]/70 font-semibold border border-[#34E0A1]/25 px-2 py-0.5">
                      Verified ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mini preview cards of other reviews */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {reviews.map((rev, i) => {
              if (i === activeIndex) return null;
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="text-left p-4 border border-luxury-linen/8 hover:border-luxury-gold/30 bg-luxury-linen/3 hover:bg-luxury-gold/5 transition-all duration-300 group cursor-pointer"
                >
                  <StarRating rating={rev.rating} />
                  <p className="text-xs text-luxury-linen/60 font-light leading-relaxed mt-2 line-clamp-2 group-hover:text-luxury-linen/80 transition-colors">
                    "{rev.title}"
                  </p>
                  <span className="text-[10px] text-luxury-gold/60 mt-2 block font-medium">{rev.author}</span>
                </button>
              );
            })}

            {/* Navigation controls */}
            <div className="flex gap-3 mt-auto pt-2">
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="flex-1 h-11 border border-luxury-gold/25 hover:border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 cursor-pointer flex items-center justify-center text-lg active:scale-95"
                aria-label="Previous"
              >
                ←
              </button>
              <span className="flex items-center justify-center text-xs font-serif text-luxury-linen/50 tracking-widest min-w-[44px] text-center">
                {String(activeIndex + 1).padStart(2, '0')}/{String(reviews.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="flex-1 h-11 border border-luxury-gold/25 hover:border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 cursor-pointer flex items-center justify-center text-lg active:scale-95"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom stat bar */}
        <div className="mt-16 pt-10 border-t border-luxury-linen/8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '5.0', label: 'Average TripAdvisor Rating', sub: 'Based on 200+ reviews' },
            { num: '38+', label: 'Years in Vietnam Travel', sub: 'Since 1986' },
            { num: '97%', label: 'Guests Would Return', sub: 'Or Recommend Us' },
            { num: '100%', label: 'Tailor-Made Itineraries', sub: 'No two trips alike' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="font-serif text-3xl text-luxury-gold font-light">{stat.num}</div>
              <div className="text-xs text-luxury-linen/80 font-medium leading-tight">{stat.label}</div>
              <div className="text-[10px] text-luxury-linen/40 font-light">{stat.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
