"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitting(true);
      try {
        await fetch("https://formsubmit.co/ajax/mywaytravelinc@gmail.com", {
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
        alert(`Thank you for subscribing!`);
        setEmail("");
      } catch (error) {
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const footerLinks = [
    {
      title: "Expeditions",
      links: ["Northern Highlands", "Central Heritage", "Southern Pulse", "Beach Escapes"],
    },
    {
      title: "Resources",
      links: ["Visa Guide", "Best Time to Visit", "Bespoke Services", "Agent Portal"],
    },
    {
      title: "Philosophy",
      links: ["Our Story", "Handpicked Scholars", "Green ecolodges", "Social Impact"],
    },
    {
      title: "Legal",
      links: ["Terms & Conditions", "Privacy Policy", "Accessibility Statement"],
    },
  ];

  const socialIcons = [
    { icon: "/images/facebookwhite.svg", alt: "Facebook" },
    { icon: "/images/instagramwhite.svg", alt: "Instagram" },
    { icon: "/images/youtube-white.svg", alt: "YouTube" },
    { icon: "/images/linkedin-svgrepo-com.svg", alt: "LinkedIn" },
  ];

  const badges = [
    { icon: "/images/bbb-26.svg", alt: "BBB" },
    { icon: "/images/ustoa-26.svg", alt: "USTOA" },
    { icon: "/images/iata-26.svg", alt: "IATA" },
    { icon: "/images/adventuretravel-26.svg", alt: "Adventure Travel" },
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
              Feed your love of travel by signing up for our emails. Every week, we
              deliver fresh travel inspiration straight to your inbox.
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
                    <a href="#" className="hover:text-gold transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Badges Row */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Icons */}
          <div className="flex gap-4">
            {socialIcons.map((soc, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold flex items-center justify-center transition-colors"
              >
                <div className="relative w-4 h-4">
                  <Image
                    src={soc.icon}
                    alt={soc.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </a>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 items-center bg-white/5 py-4 px-6 rounded-none">
            {badges.map((badge, idx) => (
              <div key={idx} className="relative w-[70px] h-[30px] opacity-60 hover:opacity-100 transition-opacity">
                <Image
                  src={badge.icon}
                  alt={badge.alt}
                  fill
                  className="object-contain invert brightness-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] text-gray-500 mt-16 border-t border-gray-900 pt-6 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Vietnam Heritage Tours. All rights reserved. Handcrafted Luxury Travels in Indochina.
        </div>

      </div>
    </footer>
  );
}
