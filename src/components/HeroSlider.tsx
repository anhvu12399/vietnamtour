'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    src: '/images/hero_halong_bay.png',
    alt: 'Halong Bay limestone karsts at golden sunset, Vietnam',
    location: 'Halong Bay · Northern Vietnam',
    heading: 'The Art of Travel',
    subheading: 'Where Your Journey Meets Our Legacy',
    cta: { label: 'Explore Halong Bay', href: '/destinations/hanoi-and-the-north' },
  },
  {
    src: '/images/hero_sapa.png',
    alt: 'Golden rice terraces of Sapa at harvest season, Vietnam',
    location: 'Sapa · Northwest Highlands',
    heading: 'A World Apart',
    subheading: "Discover the Majesty of Vietnam's Highland Heart",
    cta: { label: 'Explore Sapa', href: '/destinations/hanoi-and-the-north' },
  },
  {
    src: '/images/hero_hoian.png',
    alt: 'Hoi An ancient town lantern festival by the river at night',
    location: 'Hoi An · Central Vietnam',
    heading: 'A Thousand Lanterns',
    subheading: 'Timeless Elegance in the Ancient Town of Hoi An',
    cta: { label: 'Explore Hoi An', href: '/destinations/central-coast-and-hoi-an' },
  },
];

const quickCategories = [
  { name: 'FOR FAMILIES', href: '/enquire' },
  { name: 'FOR COUPLES', href: '/itineraries/indochine-romance-and-beach-escape' },
  { name: 'TO THE BEACH', href: '/accommodations' },
  { name: 'SAFARIS', href: '/destinations/hanoi-and-the-north' },
];

interface HeroSliderProps {
  heroHeading?: string | null;
  heroSubheading?: string | null;
}

export default function HeroSlider({ heroHeading, heroSubheading }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setTimeout(() => next(), 6000);
    return () => clearTimeout(timer);
  }, [current, next]);

  const slide = slides[current];
  const nextIndex = (current + 1) % slides.length;
  const nextSlide = slides[nextIndex];

  return (
    <section className="relative h-screen min-h-[750px] flex items-center justify-start overflow-hidden bg-[#161C1A] pt-0">
      {/* Background images — all stacked, only current one is visible */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current && !isTransitioning ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover brightness-[0.55]"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark vignette gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/40 z-10" />

      {/* Main Grid Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-28 lg:pt-36 pb-16">
          
          {/* Left Column (Main text and CTA) */}
          <div 
            className="lg:col-span-7 space-y-6 text-left transition-all duration-700 ease-out"
            style={{ 
              opacity: isTransitioning ? 0 : 1, 
              transform: isTransitioning ? 'translateY(15px)' : 'translateY(0)' 
            }}
          >
            {/* Category/Location Tag */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-[#9A4B33] block">
                {slide.location}
              </span>
              <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-white/60 block">
                Bespoke Luxury Journey
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-tight font-medium tracking-wide text-white max-w-2xl">
              {current === 0 && heroHeading ? heroHeading : slide.heading}
            </h1>

            {/* Subheading */}
            <h2 className="font-serif text-sm sm:text-lg text-white/80 font-light tracking-wide max-w-xl">
              {current === 0 && heroSubheading ? heroSubheading : slide.subheading}
            </h2>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={slide.cta.href}
                className="inline-flex items-center gap-2 border border-white text-white text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-white hover:text-black transition-all duration-300 rounded-none cursor-pointer group"
              >
                {slide.cta.label}
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>

            {/* Quick Categories */}
            <div className="flex flex-wrap gap-2.5 pt-6 border-t border-white/10 mt-8 max-w-lg">
              <span className="text-[9px] text-white/40 uppercase tracking-[0.25em] block w-full mb-1">Quick Categories</span>
              {quickCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="border border-white/15 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-[10px] tracking-[0.15em] font-semibold py-2 px-3.5 text-white/80 uppercase rounded-none cursor-pointer"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column (Floating Portrait Card Previewing Next Slide) */}
          <div className="hidden lg:col-span-5 lg:flex justify-end pr-4">
            <div 
              onClick={next}
              className="relative w-[280px] h-[380px] border border-white/10 shadow-2xl overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-[1.03] animate-fade-in-delay select-none"
            >
              {/* Card Image */}
              <Image 
                src={nextSlide.src}
                alt={`Next Up: ${nextSlide.heading}`}
                fill
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              
              {/* Bottom Card Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
              
              {/* Card Text Content */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-left space-y-1.5">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#9A4B33] block">
                  Next Up
                </span>
                <h3 className="font-serif text-lg leading-snug font-medium text-white group-hover:text-[#9A4B33] transition-colors duration-300">
                  {nextSlide.heading}
                </h3>
                <span className="text-[10px] text-white/60 tracking-wider block">
                  {nextSlide.location}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Panel (Pagination, Progress Bar & Arrow Controls) */}
        <div className="absolute bottom-10 left-6 right-6 lg:left-12 lg:right-12 z-30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Next Up Info (Mobile/Tablet View alternative text) */}
          <div className="flex flex-col text-left max-w-md">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/40">
              Next Up
            </span>
            <button 
              onClick={next} 
              className="font-serif text-sm lg:text-base text-white/80 hover:text-[#9A4B33] transition-colors duration-200 text-left mt-0.5"
            >
              {nextSlide.heading} — <span className="font-sans text-[11px] uppercase tracking-wider text-[#9A4B33]">{nextSlide.location}</span>
            </button>
          </div>

          {/* Slider Controls (Arrows & Counter) */}
          <div className="flex items-center space-x-6 self-end md:self-auto">
            {/* Slide counter */}
            <div className="text-[11px] tracking-[0.25em] text-white/60 font-semibold font-sans">
              {String(current + 1).padStart(2, '0')} <span className="text-white/20">/</span> {String(slides.length).padStart(2, '0')}
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center space-x-2">
              {/* Prev Arrow */}
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:bg-white hover:border-white transition-all duration-300 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Arrow */}
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:bg-white hover:border-white transition-all duration-300 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Slide Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30">
          <div 
            className="h-full bg-[#9A4B33] transition-all duration-6000 ease-linear"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
