"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface Slide {
  title: string;
  destinations: string;
  price: string;
  image: string;
  link: string;
}

export default function PossibilitiesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slides: Slide[] = [
    {
      title: "Vietnam In-Depth Tour",
      destinations: "Hanoi, Halong, Hue, Hoi An, Mekong Delta",
      price: "19 days from £2,450pp",
      image: "/images/trip_golf_vietnam.png",
      link: "/itineraries/vietnam-in-depth-tour",
    },
    {
      title: "Highlights of Vietnam Tour",
      destinations: "Hanoi, Halong Bay, Hue, Hoi An, HCMC",
      price: "12 days from £1,650pp",
      image: "/images/trip_bike_rice_paddies.png",
      link: "/itineraries/highlights-of-vietnam-tour",
    },
    {
      title: "Uncover Vietnam from South to North",
      destinations: "Saigon, Mekong Delta, Hoi An, Hanoi, Halong",
      price: "12 days from £1,580pp",
      image: "/images/trip_motorcycle_hagiang.png",
      link: "/itineraries/uncover-vietnam-from-south-to-north",
    },
    {
      title: "The Essence of Vietnam - North to South",
      destinations: "Hanoi, Halong Bay, Hoi An, Saigon, Mekong",
      price: "11 days from £1,490pp",
      image: "/images/trip_luxury_villa.png",
      link: "/itineraries/the-essence-of-vietnam-north-to-south",
    },
    {
      title: "Gourmet Vietnam Tour",
      destinations: "Hanoi, Hue, Hoi An, Saigon Street Eats",
      price: "11 days from £1,850pp",
      image: "/images/trip_culinary_street_food.png",
      link: "/itineraries/gourmet-vietnam-tour",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-bg-light py-20 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-8">
        
        {/* Left Side: Info Box */}
        <div className="lg:w-1/3 flex flex-col items-start gap-4">
          <span className="text-[10px] tracking-widest uppercase text-gold font-sans font-semibold">
            Inspirations
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-light tracking-wide leading-tight">
            Possibilities, <br />
            <span className="italic text-jade font-light font-serif">not packages</span>
          </h2>
          <p className="font-sans text-sm text-ink-soft leading-relaxed font-light">
            Only you decide where your journey will take you. These custom curated itineraries are just possibilities to inspire you for an expedition that is as individual as you.
          </p>
          <a
            href="/itineraries"
            className="text-jade hover:text-gold font-semibold underline text-xs tracking-wider uppercase transition-colors mt-2"
          >
            Open Trip Finder
          </a>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden lg:flex gap-4 mt-8">
            <button
              onClick={() => handleScroll("left")}
              className="w-10 h-10 border border-line rounded-full flex items-center justify-center bg-white hover:bg-light-brown text-ink transition-colors"
              aria-label="Previous"
            >
              &#8592;
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-10 h-10 border border-line rounded-full flex items-center justify-center bg-white hover:bg-light-brown text-ink transition-colors"
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Right Side: Scrollable Carousel */}
        <div className="lg:w-2/3 w-full relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-thin snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="w-[280px] sm:w-[320px] flex-shrink-0 bg-white rounded-none overflow-hidden shadow-sm flex flex-col justify-between border border-[#e1e3e4] snap-start transition-all hover:shadow-md"
              >
                {/* Media Image */}
                <div className="relative h-[220px] w-full bg-[#121615]">
                  <Image
                    src={slide.image}
                    alt={`${slide.title} — bespoke Vietnam holiday UK`}
                    fill
                    sizes="320px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-4 justify-between bg-white">
                  <div>
                    <span className="text-[10px] text-gold font-sans tracking-widest uppercase block mb-1">
                      {slide.destinations.split(",")[0]}
                    </span>
                    <h3 className="font-serif text-lg text-ink leading-snug font-normal hover:text-jade transition-colors">
                      <a href={slide.link}>{slide.title}</a>
                    </h3>
                  </div>
                  
                  <div className="mt-2 pt-4 border-t border-[#e1e3e4] flex items-center justify-between">
                    <span className="text-[10px] text-ink-soft font-sans tracking-wide uppercase">
                      {slide.price.split("from")[0]} from{" "}
                      <strong className="text-xs font-semibold text-jade block">{slide.price.split("from")[1]}</strong>
                    </span>
                    <a
                      href={slide.link}
                      className="border border-green hover:bg-[#f5f0e6] text-jade font-bold py-2 px-4 transition-colors text-[9px] tracking-widest uppercase"
                    >
                      View Journey
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls (Mobile) */}
          <div className="flex lg:hidden justify-center gap-4 mt-6">
            <button
              onClick={() => handleScroll("left")}
              className="w-10 h-10 border border-line rounded-full flex items-center justify-center bg-white hover:bg-light-brown text-ink transition-colors"
            >
              &#8592;
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-10 h-10 border border-line rounded-full flex items-center justify-center bg-white hover:bg-light-brown text-ink transition-colors"
            >
              &#8594;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
