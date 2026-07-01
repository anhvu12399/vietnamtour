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
      src: "/images/hero_halong_bay.png",
      label: "Signature Cruise",
      title: "Traditional Luxury Junks in Ha Long Bay",
      description: "Spend a quiet night sailing past limestone towers on a private, single-cabin wooden junk.",
    },
    {
      src: "/images/hero_sapa.png",
      label: "Highland Trekking",
      title: "Misty Valleys & Terraces in Sa Pa",
      description: "Hike through emerald green rice paddies and meet local Hmong villagers in private valleys.",
    },
    {
      src: "/images/hero_hoian.png",
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
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden mt-[80px]">
      
      {/* Full-Screen Crossfading Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center transition-transform duration-[6000ms] ease-out"
            />
            {/* Elegant dark overlay vignette to make text pop */}
            <div className="absolute inset-0 bg-black/45" />
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-20 container mx-auto max-w-6xl px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 h-full w-full">
        
        {/* Left Side: Editorial Typography */}
        <div className="flex flex-col items-start gap-5 text-left text-white max-w-xl">
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

          <p className="font-sans text-sm md:text-base text-gray-200 font-light max-w-md leading-relaxed">
            We design highly exclusive, privately guided expeditions through Vietnam. No templates, no schedules—simply the art of travel, recomposed for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <a
              href="#"
              className="bg-gold hover:bg-gold/80 text-white text-center font-bold py-4 px-8 rounded-none transition-all duration-300 text-[10px] tracking-widest uppercase shadow-lg"
            >
              Design Your Journey
            </a>
            <a
              href="#"
              className="border border-white/40 hover:border-gold text-white hover:text-gold text-center font-bold py-4 px-8 rounded-none transition-all duration-300 text-[10px] tracking-widest uppercase bg-black/20 backdrop-blur-sm"
            >
              Explore Expeditions
            </a>
          </div>
        </div>

        {/* Right Side: Elegant Floating Card detailing current view */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end self-end lg:self-center pb-8 lg:pb-0">
          <div className="bg-black/45 backdrop-blur-md p-6 border border-white/10 shadow-2xl max-w-[280px] flex flex-col gap-2.5 text-white transition-all duration-500 hover:border-gold/30">
            <div>
              <span className="text-[9px] tracking-widest uppercase text-gold font-bold font-sans">
                {slides[currentIndex].label}
              </span>
              <h4 className="font-serif text-sm md:text-base text-white leading-snug font-medium mt-1">
                {slides[currentIndex].title}
              </h4>
            </div>
            <p className="font-sans text-[10px] text-gray-300 font-light leading-relaxed">
              {slides[currentIndex].description}
            </p>
          </div>
        </div>

      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-gold scale-125" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
