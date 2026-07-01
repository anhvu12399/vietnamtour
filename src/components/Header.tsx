"use client";

import React, { useState, useEffect } from "react";
import { Logo, HeartIcon, ProfileIcon, PhoneIcon } from "./icons";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMarketDropdown, setShowMarketDropdown] = useState(false);
  const [market, setMarket] = useState("US");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full bg-white z-[100] transition-all duration-300 border-b border-[#d8d8d8]",
        scrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand Lockup */}
          <a href="#" className="transition-colors flex items-center gap-2">
            <span className="font-serif text-lg md:text-xl font-bold tracking-widest text-gold uppercase">
              Vietnam Luxury Journeys
            </span>
          </a>

          {/* Right items - Desktop */}
          <div className="hidden lg:flex items-center gap-8 text-[#343434] font-sans text-xs tracking-wider uppercase">
            <a href="#" className="hover:text-gold transition-colors font-semibold">Philosophy</a>
            <a href="#" className="hover:text-gold transition-colors font-semibold">Curating</a>
            <a href="#" className="hover:text-gold transition-colors font-semibold">Expeditions</a>
            <a href="#" className="hover:text-gold transition-colors font-semibold">Concierge</a>

            {/* Quote CTA */}
            <a
              href="#"
              className="border border-gold hover:bg-gold hover:text-white text-gold font-bold py-2.5 px-6 rounded-none transition-all duration-300 tracking-widest text-[10px]"
            >
              Bespoke Concierge
            </a>
          </div>

          {/* Hamburger Mobile Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 border border-[#d8d8d8] rounded-full hover:bg-[#f5f0e6] transition-colors"
          >
            <span className={cn("w-5 h-0.5 bg-[#343434] transition-all duration-300", isOpen && "transform rotate-45 translate-y-1")} />
            <span className={cn("w-5 h-0.5 bg-[#343434] my-1 transition-all duration-300", isOpen && "opacity-0")} />
            <span className={cn("w-5 h-0.5 bg-[#343434] transition-all duration-300", isOpen && "-transform -rotate-45 -translate-y-1")} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-6 border-t border-[#d8d8d8] flex flex-col gap-4 font-sans text-xs tracking-wider uppercase text-[#343434] pt-4">
            <a href="#" className="font-semibold py-1 hover:text-gold transition-colors">Philosophy</a>
            <a href="#" className="font-semibold py-1 hover:text-gold transition-colors">Curating</a>
            <a href="#" className="font-semibold py-1 hover:text-gold transition-colors">Expeditions</a>
            <a href="#" className="font-semibold py-1 hover:text-gold transition-colors">Concierge</a>
            
            <hr className="border-[#d8d8d8] my-2" />

            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="border border-gold text-center text-gold font-bold py-3 px-6 rounded-none transition-colors tracking-widest text-[10px]"
              >
                Bespoke Concierge
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
