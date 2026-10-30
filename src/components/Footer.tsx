"use client";

import React, { useState } from "react";
import Link from "next/link";
import { emailAcknowledged } from "@/lib/enquiryDelivery";

export default function Footer() {
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://formsubmit.co/ajax/mywaytravelinc@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            email: email,
            _subject: "New Newsletter Subscription - Vietnam Tours",
          }),
        });
        const receipt: unknown = await response.json();
        if (!emailAcknowledged(response.ok, receipt)) throw new Error("Subscription not acknowledged");
        alert(`Thank you for subscribing!`);
        setEmail("");
      } catch {
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const footerLinks = [
    {
      title: "Destinations",
      links: [
        { label: "Northern Highlands", href: "/itineraries?region=north" },
        { label: "Central Heritage", href: "/itineraries?region=central" },
        { label: "Southern Pulse", href: "/itineraries?region=south" },
        { label: "Beach Escapes", href: "/trip-ideas/beach-holidays" },
        { label: "All Itineraries", href: "/itineraries" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Visa Guide", href: "/visa-guide" },
        { label: "Best Time to Visit", href: "/ideas-by-month" },
        { label: "Travel Guides", href: "/travel-guides" },
        { label: "Editorial Policy", href: "/editorial-policy" },
        { label: "Enquire Now", href: "/enquire" },
      ],
    },
    {
      title: "About Us",
      links: [
        { label: "Our Story", href: "/our-story" },
        { label: "Our Specialists", href: "/specialists" },
        { label: "Tailor-Made Tours", href: "/enquire" },
        { label: "info@vietnamtours.co.uk", href: "mailto:info@vietnamtours.co.uk" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-dark text-white pt-20 pb-8 border-t border-gray-800 font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Newsletter Section */}
        <div className="border-b border-gray-800 pb-12 mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center lg:text-left">
            <h5 className="font-serif text-xl md:text-2xl text-gold font-light mb-2">
              A world of travel in your inbox
            </h5>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Feed your love of travel by signing up for our emails. Receive travel inspiration and trip-planning ideas in your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-gray-700 rounded-none px-5 py-3.5 text-sm text-white focus:outline-none focus:border-gold placeholder:text-gray-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold hover:bg-gold/80 disabled:opacity-50 text-white font-bold py-3.5 px-8 rounded-none transition-colors text-[10px] tracking-widest uppercase"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-xs text-gray-300 uppercase tracking-wider font-light">
          {footerLinks.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h5 className="font-serif text-sm font-semibold text-gold tracking-widest">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.href} className="hover:text-gold transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info bar */}
        <div className="border-t border-gray-800 pt-8 pb-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-300">
          <span className="text-gray-400 font-light">Direct Assistance:</span>
          <a href="mailto:info@vietnamtours.co.uk" className="text-gold hover:underline flex items-center gap-1.5 font-medium transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@vietnamtours.co.uk
          </a>
          <span className="text-gray-600 hidden sm:inline">·</span>
          <a href="tel:+84988600388" className="text-gold hover:underline flex items-center gap-1.5 font-medium transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +84 988600388 (24/7 Hotline & WhatsApp)
          </a>
        </div>

        {/* SEO Contextual Internal Linking */}
        <div className="border-t border-gray-800 pt-8 pb-4 text-center text-xs text-gray-400 font-light leading-relaxed max-w-4xl mx-auto">
          VietnamTours.co.uk is a leading specialist in <Link href="/" title="Luxury Vietnam Private Tours" className="text-gold hover:underline">Luxury Vietnam Private Tours</Link>. We craft bespoke holidays and tailor-made journeys to Vietnam, Cambodia, and Laos, guaranteeing authentic experiences and exceptional service. Let our local experts guide you on your next unforgettable adventure.
        </div>

        <nav aria-label="Company and contact information" className="flex flex-wrap justify-center gap-6 border-t border-gray-800 pt-8 text-xs text-gold">
          <Link href="/our-story">About VietnamTours</Link>
          <Link href="/specialists">Meet the team</Link>
          <Link href="/enquire">Discuss your itinerary</Link>
        </nav>

        {/* Copyright */}
        <div className="text-center text-[9px] text-gray-500 mt-16 border-t border-gray-900 pt-6 uppercase tracking-widest leading-relaxed">
          &copy; 2026 VIETNAM TOURS. OPERATED BY MY WAY TRAVEL. ALL RIGHTS RESERVED. HANDCRAFTED LUXURY TRAVELS IN INDOCHINA.
        </div>

      </div>
    </footer>
  );
}
