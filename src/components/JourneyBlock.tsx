"use client";

import React from "react";

interface Step {
  num: string;
  title: string;
  description: string;
}

export default function JourneyBlock() {
  const steps: Step[] = [
    {
      num: "01",
      title: "Uncovering your motivations",
      description:
        "We spend time learning what truly drives your curiosity. Rather than suggesting cookie-cutter routes, we start with a blank page.",
    },
    {
      num: "02",
      title: "Handcrafting your unique route",
      description:
        "Every hotel, private transfer, and local dining recommendation is handpicked by a designer who has personally vetted them.",
    },
    {
      num: "03",
      title: "Hosting you at every single step",
      description:
        "Our local concierge is active 24/7 on the ground. From VIP airport tracks to sudden itinerary changes, you are fully hosted.",
    },
  ];

  return (
    <section className="bg-white text-green py-24 px-4 lg:px-12 border-t border-[#d8d8d8]/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Narrative Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-blue" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-blue font-sans font-bold">
                The Bespoke Process
              </span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-[1.1] text-green">
              Expeditions that feel <br />
              <span className="italic text-blue font-light font-serif">like they were waiting</span>
            </h2>
            
            <p className="font-sans text-sm text-[#545454] leading-relaxed max-w-sm font-light mt-2">
              You are not meant to see Vietnam like everyone else. You are meant to feel
              it, like only you can. It is why our designers use their deep local insight to craft
              moments that feel fortuitously right.
            </p>
          </div>

          {/* Right Column: Creative Staggered Cards Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-8 w-full mt-8 lg:mt-0">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col sm:flex-row gap-6 p-8 bg-light-brown/50 border border-gray-100 hover:border-blue/30 transition-all duration-500 hover:shadow-md hover:bg-white"
              >
                {/* Large Serif Numeral */}
                <div className="font-serif text-5xl md:text-6xl font-light text-blue/40 group-hover:text-blue transition-colors duration-300 leading-none select-none">
                  {step.num}
                </div>

                {/* Step Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-lg md:text-xl font-medium tracking-wide text-green group-hover:text-blue transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Left Border Glow Effect on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-blue transition-all duration-300" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
