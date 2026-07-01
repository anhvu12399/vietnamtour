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
      src: "/images/hero_halong_luxury.png",
      label: "Signature Cruise",
      title: "Traditional Luxury Junks in Ha Long Bay",
      description: "Spend a quiet night sailing past limestone towers on a private, single-cabin wooden junk.",
    },
    {
      src: "/images/hero_sapa_luxury.png",
      label: "Highland Trekking",
      title: "Misty Valleys & Terraces in Sa Pa",
      description: "Trek through cascading rice fields and meet local Hmong villagers in private valleys.",
    },
    {
      src: "/images/hero_hoian_luxury.png",
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
    <section
      aria-label="Bespoke luxury private Vietnam tours from the UK"
      className="relative w-full min-h-[90vh] flex items-center bg-[#0e1628] overflow-hidden pt-36 pb-16 px-4 lg:px-12 mt-[80px]"
    >
      
      {/* 1. Full-Screen Sharp Background Slideshow (Matches active slide) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              idx === currentIndex ? "opacity-60 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.src}
              alt={idx === 0 ? slide.title + " — luxury private Vietnam tours from the UK" : ""}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[6000ms] ease-out"
            />
          </div>
        ))}
        {/* Asymmetrical Gradient Vignette: Darker on the left for text readability, clear in the middle, dark on right edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1628]/95 via-[#0e1628]/40 to-[#0e1628]/60 z-10" />
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="relative z-20 container mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Creative Typography */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left text-white">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans font-bold">
                Bespoke Luxury Journeys
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.05] text-white">
              Feel the world <br />
              <span className="font-serif italic text-gold font-light">differently.</span>
            </h1>

            <p className="font-sans text-sm md:text-base text-gray-300 font-light max-w-md leading-relaxed">
              We design highly exclusive, privately guided expeditions through Vietnam. No templates, no schedules—simply the art of travel, recomposed for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <a
                href="/enquire"
                className="bg-gold hover:bg-gold/80 text-white text-center font-bold py-4 px-8 rounded-none transition-all duration-300 text-[10px] tracking-widest uppercase shadow-md"
              >
                Design Your Journey
              </a>
              <a
                href="/itineraries"
                className="border border-white/30 hover:border-gold text-white hover:text-gold text-center font-bold py-4 px-8 rounded-none transition-all duration-300 text-[10px] tracking-widest uppercase bg-black/10 backdrop-blur-sm"
              >
                Explore Expeditions
              </a>
            </div>
          </div>

          {/* Right Side: Sharp Indochine Archway Slideshow & Floating Card */}
          <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Sharp Arched Image Container */}
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl border border-gold/25 z-10 bg-[#0e1628]/40">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Overlapping Floating Glassmorphic Card (Transitions with Active Slide) */}
            <div className="absolute bottom-6 left-2 sm:left-12 lg:left-[-20px] bg-black/60 backdrop-blur-md p-6 border border-white/10 shadow-lg max-w-[250px] flex flex-col gap-2 z-20 min-h-[160px] justify-between text-white rounded-none">
              <div>
                <span className="text-[9px] tracking-widest uppercase text-gold font-bold font-sans transition-all duration-500">
                  {slides[currentIndex].label}
                </span>
                <h4 className="font-serif text-sm md:text-base text-white leading-snug font-medium mt-1 transition-all duration-500">
                  {slides[currentIndex].title}
                </h4>
              </div>
              <p className="font-sans text-[10px] text-gray-300 font-light leading-relaxed transition-all duration-500">
                {slides[currentIndex].description}
              </p>
            </div>
            
            {/* Decorative Gold Rings */}
            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full border border-gold/20 pointer-events-none hidden sm:block z-0" />
            <div className="absolute top-20 right-[-30px] w-12 h-12 rounded-full border border-gold/10 pointer-events-none hidden sm:block z-0" />
          </div>

        </div>
      </div>
    </section>
  );
}
