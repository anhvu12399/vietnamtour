"use client";

import React from "react";
import Image from "next/image";

interface WhyUsItem {
  title: string;
  description: string;
  icon: string;
}

export default function WhyUs() {
  const items: WhyUsItem[] = [
    {
      title: "Bespoke Pacing",
      description: "No group plans. We handcraft the entire journey around your personal speed and interests.",
      icon: "/images/70x70_individual_white.svg",
    },
    {
      title: "Handpicked Storytellers",
      description: "Private local scholars, historians, and guides who bring Vietnam's rich heritage to life.",
      icon: "/images/70x70_specialist_white.svg",
    },
    {
      title: "Signature Retreats",
      description: "Access to private boutique traditional cruises, historic hotels, and sustainable luxury ecolodges.",
      icon: "/images/70x70_experiences_white.svg",
    },
    {
      title: "Seamless Logistics",
      description: "From VIP airport fast-track arrival services to private transfers, we handle every detail 24/7.",
      icon: "/images/70x70_experts_white.svg",
    },
  ];

  return (
    <section className="bg-dark text-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-[10px] tracking-widest uppercase text-gold font-sans font-semibold">
            Our Distinction
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">
            Why journey with us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-4 p-6 hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-800"
            >
              {/* Icon Media */}
              <div className="relative w-16 h-16 flex items-center justify-center bg-green rounded-none p-3.5 shadow-md">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Title & Subtext */}
              <h3 className="font-serif text-xl font-medium tracking-wide text-gold mt-2">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-gray-300 leading-relaxed max-w-xs font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
