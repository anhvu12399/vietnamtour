"use client";

import React, { useState, useEffect } from "react";

export default function Testimonials() {
  const quotes = [
    "“Watching the sunrise over the limestone karsts of Ha Long Bay from our private deck was a moment of absolute serenity.”",
    "“It was in the quiet valleys of Sa Pa that the country truly spoke to us. The emerald terraces, the warm smiles of our local Hmong hosts.”",
    "“Wandering the lantern-lit canals of Hoi An after midnight, we felt as though we had stepped back into another century.”",
    "“Our specialist managed to arrange a private meeting with a calligraphy master in Hanoi—an unforgettable window into Vietnamese art.”",
    "“Floating down the peaceful backwaters of the Mekong, watching the river life drift by, was the ultimate peace we were seeking.”",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section className="bg-white py-16 px-4 border-t border-[#e1e3e4]">
      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center gap-8">
        <h2 className="font-serif text-3xl md:text-4xl text-[#343434] font-light tracking-wide">
          Moments we’ve created
        </h2>

        {/* Quotes Display Box */}
        <div className="relative min-h-[140px] md:min-h-[100px] flex items-center justify-center w-full max-w-3xl">
          {quotes.map((quote, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                idx === currentIndex
                  ? "opacity-100 transform translate-y-0 pointer-events-auto"
                  : "opacity-0 transform -translate-y-4 pointer-events-none"
              }`}
            >
              <p className="font-merriweather italic text-lg md:text-2xl text-[#4d726d] leading-relaxed max-w-2xl px-6">
                {quote}
              </p>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex gap-2">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-green scale-110" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
