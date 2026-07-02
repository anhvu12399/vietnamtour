"use client";

import React from "react";
import Image from "next/image";
import { PhoneIcon } from "./icons";

export default function CTASection() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta_vietnam_sapa_aerial.png"
          alt="Aerial view of Sa Pa rice terraces in Vietnam — design your bespoke private tour"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
        {/* Dark Tint Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Content Card */}
      <div className="relative z-20 bg-white text-[#343434] p-8 md:p-12 rounded-none shadow-xl text-center max-w-xl mx-4 flex flex-col items-center gap-4 border border-gold/20">
        <span className="text-[10px] tracking-widest uppercase text-gold font-sans font-semibold">
          Design Desk
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-green">
          Compose Your Private Expedition
        </h2>
        
        <div className="font-sans text-xs text-[#545454] uppercase tracking-wider">
          Connect with a Design Specialist
        </div>

        <div className="flex items-center gap-2 text-lg md:text-xl font-bold font-sans text-green">
          <PhoneIcon className="w-5 h-5 text-gold" />
          <a href="tel:+84988600388" className="hover:underline hover:text-gold transition-colors">
            +84 988600388
          </a>
        </div>

        <a
          href="/enquire"
          className="bg-gold hover:bg-gold/80 text-white font-bold py-3.5 px-8 rounded-none transition-colors text-[10px] tracking-widest uppercase mt-4 shadow-md"
        >
          BEGIN YOUR EXPEDITION
        </a>
      </div>
    </section>
  );
}
