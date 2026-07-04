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
      label: "North Inspiration",
      cards: [
        {
          title: "Trekking in Sapa",
          description: "A first-hand guide to Sapa's mountain kingdom, ethnic minority villages, and golden terraced rice fields.",
          image: "/images/dest_sapa_highland.png",
          link: "/blog/sapa-trekking-guide-vietnam",
          btnText: "Read Trekking Guide",
        },
        {
          title: "Halong Bay vs Lan Ha Bay",
          description: "An honest comparison between the iconic Halong Bay and the pristine Lan Ha Bay to help you choose the best voyage.",
          image: "/images/dest_halong_limestone.png",
          link: "/blog/halong-bay-vs-lan-ha-bay-guide",
          btnText: "Read Cruise Guide",
        },
      ],
    },
    {
      id: "central",
      label: "Central Heritage",
      cards: [
        {
          title: "Hoi An Ancient Town",
          description: "Discover Hoi An's lantern-lit ancient streets, the best local tailors, and hidden culinary secrets.",
          image: "/images/dest_hoian_lanterns.png",
          link: "/blog/hoi-an-complete-travel-guide",
          btnText: "Read Town Guide",
        },
        {
          title: "Best Places to Visit in Vietnam",
          description: "Our Ho Chi Minh City-based specialists share a definitive, field-verified list of destinations for 2026.",
          image: "/images/dest_phongnha_cave.png",
          link: "/blog/best-places-to-visit-in-vietnam-2026",
          btnText: "Read Operator Guide",
        },
      ],
    },
    {
      id: "southern",
      label: "Southern & Food",
      cards: [
        {
          title: "Mekong Delta Done Right",
          description: "How to explore peaceful canals and floating markets properly on a private tour, without the crowds.",
          image: "/images/dest_mekong_canal.png",
          link: "/blog/mekong-delta-private-tour-guide",
          btnText: "Read Delta Guide",
        },
        {
          title: "Vietnam Culinary Tour",
          description: "A foodie's dream journey through culinary secrets from the streets of Hanoi to the bustling food stalls of Saigon.",
          image: "/images/things_cooking_class_hue.png",
          link: "/blog/vietnam-culinary-food-tour-guide",
          btnText: "Read Foodie Guide",
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
            Travel Inspiration
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
            href="/blog"
            className="border border-green hover:bg-green hover:text-white text-green font-bold py-3.5 px-8 transition-colors text-[10px] tracking-widest uppercase"
          >
            VIEW ALL TRAVEL GUIDES
          </a>
        </div>
      </div>
    </section>
  );
}
