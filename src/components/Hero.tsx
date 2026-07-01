"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SlideData {
  src: string;
  title: string;
  label: string;
  description: string;
}

export default function Hero() {
  const slides: SlideData[] = [
    {
      src: "/images/vietnam_hero.jpg",
      label: "Signature Cruise",
      title: "Traditional Luxury Junks in Ha Long Bay",
      description: "Spend a quiet night sailing past limestone towers on a private, single-cabin wooden junk.",
    },
    {
      src: "/images/sapa.jpg",
      label: "Highland Trekking",
      title: "Misty Valleys & Terraces in Sa Pa",
      description: "Hike through emerald green rice paddies and meet local Hmong villagers in private valleys.",
    },
    {
      src: "/images/hoian.jpg",
      label: "Heritage Town",
      title: "Ancient Lantern Streets of Hoi An",
      description: "Wander through beautifully preserved merchant streets under the soft glow of silk lanterns.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-bg-light overflow-hidden pt-36 pb-16 px-4 lg:px-12">
      {/* Background Large Watermark */}
      <div className="absolute right-[-10%] bottom-[-5%] text-[24vw] font-serif font-bold text-black/[0.02] select-none pointer-events-none uppercase tracking-widest leading-none">
        Vietnam
      </div>

      <div className="container mx-auto max-w-6xl z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Creative Typography */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-blue" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-blue font-sans font-bold">
                Bespoke Luxury Journeys
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-green leading-[1.05]">
              Feel the world <br />
              <span className="font-serif italic text-blue font-light">differently.</span>
            </h1>

            <p className="font-sans text-sm md:text-base text-gray-600 font-light max-w-md leading-relaxed">
              We design highly exclusive, privately guided expeditions through Vietnam. No templates, no schedules—simply the art of travel, recomposed for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <a
                href="#"
                className="bg-green hover:bg-dark-green text-white text-center font-bold py-4 px-8 rounded-none transition-all duration-300 text-[10px] tracking-widest uppercase"
              >
                Design Your Journey
              </a>
              <a
                href="#"
                className="border border-green/30 hover:border-blue text-green hover:text-blue text-center font-bold py-4 px-8 rounded-none transition-all duration-300 text-[10px] tracking-widest uppercase bg-white/40 backdrop-blur-sm"
              >
                Explore Expeditions
              </a>
            </div>
          </div>

          {/* Right Side: Indochine Archway Slideshow & Floating Card */}
          <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Main Arched Image Container with Crossfade */}
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl border border-gold/10">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${
                    idx === currentIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-[6000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Overlapping Floating Glassmorphic Card (Transitions with Active Slide) */}
            <div className="absolute bottom-6 left-2 sm:left-12 lg:left-[-20px] bg-white/85 backdrop-blur-md p-6 border border-white/50 shadow-lg max-w-[250px] flex flex-col gap-2 z-20 min-h-[160px] justify-between">
              <div>
                <span className="text-[9px] tracking-widest uppercase text-blue font-bold font-sans transition-all duration-500">
                  {slides[currentIndex].label}
                </span>
                <h4 className="font-serif text-sm md:text-base text-green leading-snug font-medium mt-1 transition-all duration-500">
                  {slides[currentIndex].title}
                </h4>
              </div>
              <p className="font-sans text-[10px] text-gray-500 font-light leading-relaxed transition-all duration-500">
                {slides[currentIndex].description}
              </p>
            </div>
            
            {/* Decorative Gold Rings */}
            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full border border-gold/20 pointer-events-none hidden sm:block z-0" />
            <div className="absolute top-20 right-[-30px] w-12 h-12 rounded-full border border-blue/30 pointer-events-none hidden sm:block z-0" />
          </div>

        </div>
      </div>
    </section>
  );
}
