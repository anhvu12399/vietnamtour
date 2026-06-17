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

  return (
    <section className="relative h-screen min-h-[650px] flex items-center justify-start overflow-hidden">
      {/* Background images — all stacked, only current one is visible */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out"
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-slate/85 via-luxury-slate/30 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full space-y-8 text-left">
        <div
          className="space-y-4 max-w-3xl transition-all duration-500"
          style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? 'translateY(12px)' : 'translateY(0)' }}
        >
          {/* Location badge */}
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-luxury-gold/80 block">
            {slide.location}
          </span>

          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-luxury-gold block">
            Bespoke Luxury Travel
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-tight font-semibold tracking-wide text-luxury-linen">
            {current === 0 && heroHeading ? heroHeading : slide.heading}
          </h1>
          <h2 className="font-serif text-lg sm:text-2xl text-luxury-linen font-normal tracking-wide max-w-xl">
            {current === 0 && heroSubheading ? heroSubheading : slide.subheading}
          </h2>

          <div className="pt-2">
            <Link
              href={slide.cta.href}
              className="inline-block border border-luxury-gold text-luxury-gold text-xs tracking-widest uppercase px-8 py-3 hover:bg-luxury-gold hover:text-luxury-slate transition-all duration-300 font-semibold"
            >
              {slide.cta.label} →
            </Link>
          </div>
        </div>

        {/* Quick category pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-4">
          {quickCategories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="bg-white text-[#0f4c43] text-[11px] tracking-[0.18em] font-bold py-4 px-2 hover:bg-[#0f4c43] hover:text-white transition-all duration-300 text-center uppercase shadow-lg border-none rounded-none flex items-center justify-center min-h-[48px]"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Left / Right Arrow Controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center border border-white/30 bg-black/20 backdrop-blur-sm hover:bg-luxury-gold hover:border-luxury-gold hover:text-luxury-slate text-white transition-all duration-300 rounded-none group"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center border border-white/30 bg-black/20 backdrop-blur-sm hover:bg-luxury-gold hover:border-luxury-gold hover:text-luxury-slate text-white transition-all duration-300 rounded-none"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300 rounded-none"
            style={{
              width: i === current ? '28px' : '8px',
              height: '2px',
              backgroundColor: i === current ? 'rgba(197,168,128,1)' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-8 z-30 text-[10px] tracking-widest text-white/40 font-semibold">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:block">
        <a href="#pillars" aria-label="Scroll down">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
