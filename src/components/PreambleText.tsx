"use client";

import React from "react";

export default function PreambleText() {
  return (
    <section className="bg-light-brown text-[#343434] py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <span className="text-[10px] tracking-widest uppercase text-gold font-sans font-semibold">
          Our Philosophy
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
          We curate extraordinary <br />
          <span className="italic text-green font-light font-serif">travel moments</span>
        </h2>
        <div className="font-sans text-sm md:text-base leading-relaxed text-[#545454] max-w-2xl font-light">
          <p>
            The finest journeys are not merely planned—they are composed. Shaped around
            your unique cadence, our signature expeditions connect you with the deep
            soul of Vietnam. From misty northern terraces to the silent, winding waters
            of the Mekong, we curate travel that feels entirely, fortuitously yours.
          </p>
        </div>
        <a
          href="#"
          className="border border-green hover:bg-green hover:text-white text-green font-bold py-3.5 px-8 rounded-none transition-all duration-300 text-[10px] tracking-widest uppercase mt-4"
        >
          Begin Your Tale
        </a>
      </div>
    </section>
  );
}
