'use client';

import { useState } from 'react';

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

export default function TripAdvisorReviews({ reviews }: TripAdvisorReviewsProps) {
  const [activeReview, setActiveReview] = useState(0);

  const handlePrev = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="py-28 bg-luxury-slate relative overflow-hidden border-t border-luxury-gold/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.05),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* TripAdvisor Badge on the Left (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
                Guest Chronicles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-linen leading-tight font-medium">
                Voices of the <br />
                <span className="text-luxury-gold font-light italic">Journey</span>
              </h2>
              <div className="h-[1px] w-16 bg-luxury-gold" />
            </div>
            
            <div className="p-8 bg-luxury-moss border border-luxury-gold/15 space-y-5">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-luxury-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z" />
                </svg>
                <span className="font-serif text-sm tracking-widest font-semibold uppercase text-luxury-gold">tripadvisor</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-luxury-gold flex items-center justify-center text-[10px] text-luxury-moss">
                      ●
                    </div>
                  ))}
                  <span className="text-lg font-serif font-bold text-luxury-linen ml-2">5.0</span>
                </div>
                <p className="text-xs text-luxury-linen/70 font-light leading-relaxed">
                  Based on verified guest feedback, Vietnam Tour is rated #1 Specialty Lodging and Tour Operator in Vietnam.
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Slider on the Right (8 columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full min-h-[340px] sm:min-h-[280px]">
            {/* Slider Container with fixed height and overflow hidden */}
            <div className="relative h-[250px] sm:h-[200px] overflow-hidden w-full">
              <div 
                className="transition-transform duration-700 ease-in-out h-full flex flex-col"
                style={{ transform: `translateY(-${activeReview * 100}%)` }}
              >
                {reviews.map((rev, idx) => (
                  <div 
                    key={idx} 
                    className="h-full w-full flex-shrink-0 flex flex-col justify-between p-8 bg-luxury-moss/30 border border-luxury-gold/10 relative group"
                  >
                    <span className="absolute right-6 top-4 text-7xl font-serif text-luxury-gold/5 select-none pointer-events-none group-hover:text-luxury-gold/10 transition-colors duration-500">
                      “
                    </span>
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <span key={i} className="text-luxury-gold text-sm">★</span>
                          ))}
                          <span className="text-[10px] uppercase tracking-wider text-luxury-linen/50 ml-2">{rev.date}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                          Verified Guest
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-lg sm:text-xl text-luxury-linen font-medium leading-snug group-hover:text-luxury-gold transition-colors">
                        &ldquo;{rev.title}&rdquo;
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-luxury-linen/80 font-light leading-relaxed italic line-clamp-3">
                        {rev.text}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-luxury-gold/10 flex flex-wrap items-center justify-between gap-4 mt-auto">
                      <div>
                        <span className="font-serif text-sm text-luxury-gold font-medium block">{rev.author}</span>
                        <span className="text-[10px] text-luxury-linen/50 block">{rev.location}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {rev.highlights.slice(0, 2).map((h, i) => (
                          <span key={i} className="text-[9px] uppercase tracking-wider bg-luxury-gold/10 text-luxury-gold px-2.5 py-1 font-medium border border-luxury-gold/15">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center space-x-4 mt-6">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold flex items-center justify-center transition-all cursor-pointer hover:bg-luxury-gold/10 active:scale-95"
                aria-label="Previous Review"
              >
                ↑
              </button>
              <span className="text-xs font-serif text-luxury-linen/70 tracking-widest min-w-[50px] text-center">
                {String(activeReview + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
              </span>
              <button 
                onClick={handleNext}
                className="w-10 h-10 border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold flex items-center justify-center transition-all cursor-pointer hover:bg-luxury-gold/10 active:scale-95"
                aria-label="Next Review"
              >
                ↓
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
