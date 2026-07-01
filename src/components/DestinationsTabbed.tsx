"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Card {
  title: string;
  description: string;
  image: string;
  link: string;
  btnText: string;
}

interface TabData {
  id: string;
  label: string;
  cards: Card[];
}

export default function DestinationsTabbed() {
  const [activeTab, setActiveTab] = useState("northern");

  const tabData: TabData[] = [
    {
      id: "northern",
      label: "Northern Highlands",
      cards: [
        {
          title: "Sapa Valley",
          description: "Trek through cascading emerald rice terraces and encounter local hilltribe cultures.",
          image: "/images/dest_sapa_highland.png",
          link: "/destinations/hanoi-and-the-north",
          btnText: "Explore Sapa",
        },
        {
          title: "Ha Long Bay",
          description: "Sail past towering limestone pillars on a boutique traditional wooden junk boat.",
          image: "/images/dest_halong_limestone.png",
          link: "/destinations/hanoi-and-the-north",
          btnText: "Explore Ha Long",
        },
      ],
    },
    {
      id: "central",
      label: "Central Heritage",
      cards: [
        {
          title: "Hoi An Ancient Town",
          description: "Wander through lantern-lit merchant streets and taste signature culinary secrets.",
          image: "/images/dest_hoian_lanterns.png",
          link: "/destinations/central-coast-and-hoi-an",
          btnText: "Explore Hoi An",
        },
        {
          title: "Phong Nha Caves",
          description: "Venture deep into the world's largest cave systems and pristine primary jungles.",
          image: "/images/dest_phongnha_cave.png",
          link: "/destinations/central-coast-and-hoi-an",
          btnText: "Explore Phong Nha",
        },
      ],
    },
    {
      id: "southern",
      label: "Southern Pulse",
      cards: [
        {
          title: "Mekong Delta",
          description: "Float down peaceful coconut canals and witness colourful floating market trades.",
          image: "/images/dest_mekong_canal.png",
          link: "/destinations/saigon-and-mekong-delta",
          btnText: "Explore Mekong",
        },
        {
          title: "Phu Quoc Island",
          description: "Unwind on powdery white sands and swim in turquoise waters at luxury beach retreats.",
          image: "/images/dest_phuquoc_beach.png",
          link: "/destinations/phu-quoc-island",
          btnText: "Explore Phu Quoc",
        },
      ],
    },
  ];

  const currentTab = tabData.find((t) => t.id === activeTab) || tabData[0];

  return (
    <section className="bg-light-brown py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center flex flex-col items-center gap-4 mb-12">
          <span className="text-[10px] tracking-widest uppercase text-gold font-sans font-semibold">
            Bespoke Regions
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#343434] font-light tracking-wide">
            Where are you waiting to discover?
          </h2>
        </div>

        {/* Tab Nav */}
        <div className="flex justify-center border-b border-[#d8d8d8] mb-12 max-w-lg mx-auto">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 text-center py-4 text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "border-green text-green"
                  : "border-transparent text-[#747474] hover:text-[#343434]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {currentTab.cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative h-[450px] overflow-hidden flex flex-col justify-end p-8 bg-[#121615] text-white transition-all duration-500 shadow-md hover:shadow-xl border border-gray-100"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.image}
                  alt={`${card.title} — luxury private Vietnam tours UK`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121615] via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-black/35 z-10 transition-opacity group-hover:opacity-20" />
              </div>

              {/* Card Contents */}
              <div className="relative z-20 flex flex-col gap-4">
                <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide">
                  {card.title}
                </h3>
                <p className="font-sans text-xs text-gray-200 font-light leading-relaxed max-w-md">
                  {card.description}
                </p>
                <a
                  href={card.link}
                  className="border border-white hover:bg-gold hover:border-gold text-white text-center font-bold py-3 px-6 transition-all duration-300 text-[10px] tracking-widest uppercase mt-2 w-max"
                >
                  {card.btnText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="text-center mt-16">
          <a
            href="/destinations"
            className="border border-green hover:bg-green hover:text-white text-green font-bold py-3.5 px-8 transition-colors text-[10px] tracking-widest uppercase"
          >
            VIEW ALL EXPEDITIONS
          </a>
        </div>
      </div>
    </section>
  );
}
