"use client";

import React from "react";
import Image from "next/image";

export default function BrochureRequest() {
  return (
    <section className="bg-light-brown py-16 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-sm border border-[#e1e3e4] overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
        
        {/* Left Side: Brochure Cover Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-[180px] h-[250px] shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/brochure_vietnam_cover.png"
              alt="Vietnam Private Tours Luxury Lookbook 2024 — request your free copy"
              fill
              sizes="180px"
              loading="lazy"
              className="object-cover rounded-sm"
            />
          </div>
        </div>

        {/* Right Side: Text & CTA */}
        <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <span className="text-[10px] tracking-widest uppercase text-gold font-sans font-semibold">
            Inspirations
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#343434] font-light tracking-wide">
            Request our Vietnam lookbook
          </h2>
          <p className="font-sans text-sm text-[#545454] leading-relaxed max-w-lg font-light">
            Our private edition Vietnam lookbook contains curated tailor-made itineraries, boutique cruise vessel profiles, and heritage destination guides to help you start planning your bespoke Vietnam holiday from the UK.
          </p>
          <a
            href="/enquire"
            className="border border-green hover:bg-green hover:text-white text-green font-bold py-3.5 px-8 rounded-none transition-all duration-300 text-[10px] tracking-widest uppercase mt-4 shadow-sm"
          >
            REQUEST A LOOKBOOK
          </a>
        </div>

      </div>
    </section>
  );
}
