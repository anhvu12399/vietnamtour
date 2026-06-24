'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  
  const isHeroPage = pathname === '/' || pathname.startsWith('/itineraries/') || pathname.startsWith('/destinations/');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Click outside listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleMobileExpanded = (menu: string) => {
    setMobileExpanded(mobileExpanded === menu ? null : menu);
  };

  // Determine navbar background based on scroll, active dropdown state, and current page
  const navbarBg = activeMenu
    ? 'bg-luxury-navy border-b border-white/10'
    : isHeroPage
      ? isScrolled
        ? 'bg-luxury-navy/95 backdrop-blur-md shadow-sm border-b border-white/10'
        : 'bg-transparent text-white'
      : 'bg-luxury-navy/95 backdrop-blur-md shadow-sm border-b border-white/10';

  const textColor = activeMenu 
    ? 'text-luxury-linen' 
    : isHeroPage && !isScrolled 
      ? 'text-white' 
      : 'text-luxury-linen';

  const logoColor = activeMenu
    ? 'text-luxury-gold'
    : isHeroPage && !isScrolled 
      ? 'text-white' 
      : 'text-luxury-gold';

  return (
    <>
      {/* Page Backdrop (Overlay) when a dropdown is open */}
      {activeMenu && (
        <div 
          className="fixed inset-0 top-[80px] lg:top-[112px] bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300"
          onClick={() => setActiveMenu(null)}
        />
      )}

      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 ${
          isScrolled ? 'shadow-md border-b border-slate-200/50' : 'border-b border-slate-200/30'
        }`}
      >
        {/* ── DESKTOP HEADER (Two-tier) ── */}
        <div className="hidden md:flex flex-col w-full">
          {/* Top Row: Logo & Actions */}
          <div className="w-full bg-[#faf9f6] border-b border-slate-200/40 px-6 lg:px-12 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Logo (Left) */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex flex-col items-start leading-none group select-none">
                  <span className="font-serif italic text-[24px] lg:text-[28px] tracking-normal text-[#121816] font-semibold">
                    Vietnam
                  </span>
                  <span className="font-sans text-[9px] lg:text-[10px] tracking-[0.35em] uppercase text-[#c5a880] font-bold -mt-0.5">
                    Tour
                  </span>
                </Link>
              </div>

              {/* Top Actions (Right) */}
              <div className="flex items-center space-x-6 lg:space-x-8">
                {/* UK Flag dropdown */}
                <div className="flex items-center gap-1.5 text-[11px] lg:text-[12px] font-sans font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
                  <span>🇬🇧</span>
                  <span className="uppercase tracking-wider text-[11px] font-bold">UK</span>
                  <span className="text-[7px] text-slate-400">▼</span>
                </div>

                {/* Wishlist Icon */}
                <button className="text-slate-500 hover:text-slate-800 transition-colors duration-200 cursor-pointer" aria-label="Wishlist">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Account Icon */}
                <button className="text-slate-500 hover:text-slate-800 transition-colors duration-200 cursor-pointer" aria-label="Account">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {/* Contact phone info */}
                <div className="text-[12px] text-slate-500 font-sans flex items-center gap-1.5">
                  <span>Call us today until 8pm</span>
                  <a href="tel:+442078459200" className="font-semibold text-slate-800 hover:text-[#c5a880] transition-colors duration-200 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +44 (0) 20 7845 9200
                  </a>
                  <span className="text-slate-300">or</span>
                </div>

                {/* Quote Button */}
                <Link 
                  href="/enquire" 
                  className="bg-[#121816] text-[#eadcc9] hover:bg-[#c5a880] hover:text-[#121816] transition-all duration-300 font-sans text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-none shadow-sm cursor-pointer"
                >
                  REQUEST A QUOTE
                </Link>
              </div>

            </div>
          </div>

          {/* Bottom Row: Navigation Links */}
          <div className="w-full bg-[#f2eee4] px-6 lg:px-12 py-3">
            <div className="max-w-7xl mx-auto flex items-center">
              
              <div className="flex items-center space-x-8">
                {/* 1. Vietnam Tours Dropdown Trigger */}
                <button
                  onClick={() => handleMenuClick('vietnam-tours')}
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase text-[#121816]/85 hover:text-[#c5a880] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                    activeMenu === 'vietnam-tours' ? 'text-[#c5a880]' : ''
                  }`}
                >
                  VIETNAM TOURS
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 text-slate-400 ${
                    activeMenu === 'vietnam-tours' ? 'rotate-180 text-[#c5a880]' : ''
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 2. Trip Ideas Dropdown Trigger */}
                <button
                  onClick={() => handleMenuClick('trip-ideas')}
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase text-[#121816]/85 hover:text-[#c5a880] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                    activeMenu === 'trip-ideas' ? 'text-[#c5a880]' : ''
                  }`}
                >
                  TRIP IDEAS
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 text-slate-400 ${
                    activeMenu === 'trip-ideas' ? 'rotate-180 text-[#c5a880]' : ''
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 3. Inspirations Dropdown Trigger */}
                <button
                  onClick={() => handleMenuClick('inspirations')}
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase text-[#121816]/85 hover:text-[#c5a880] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                    activeMenu === 'inspirations' ? 'text-[#c5a880]' : ''
                  }`}
                >
                  INSPIRATIONS
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 text-slate-400 ${
                    activeMenu === 'inspirations' ? 'rotate-180 text-[#c5a880]' : ''
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 4. Tailor-made Direct Link */}
                <Link
                  href="/enquire"
                  className="font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase text-[#121816]/85 hover:text-[#c5a880] transition-colors duration-200"
                >
                  TAILOR-MADE
                </Link>

                {/* 5. About Us Dropdown Trigger */}
                <button
                  onClick={() => handleMenuClick('about-us')}
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase text-[#121816]/85 hover:text-[#c5a880] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                    activeMenu === 'about-us' ? 'text-[#c5a880]' : ''
                  }`}
                >
                  ABOUT US
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 text-slate-400 ${
                    activeMenu === 'about-us' ? 'rotate-180 text-[#c5a880]' : ''
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Search Icon (Far Right of Bottom Row) */}
              <button className="text-slate-600 hover:text-[#c5a880] transition-colors duration-200 cursor-pointer ml-auto" aria-label="Search">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

            </div>
          </div>
        </div>

        {/* ── MOBILE HEADER (Single-tier) ── */}
        <div className="flex md:hidden w-full h-20 bg-[#faf9f6] text-slate-800 px-6 items-center justify-between relative z-50">
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex flex-col items-start leading-none group select-none">
              <span className="font-serif italic text-[20px] tracking-normal text-[#121816] font-semibold">
                Vietnam
              </span>
              <span className="font-sans text-[8px] tracking-[0.35em] uppercase text-[#c5a880] font-bold -mt-0.5">
                Tour
              </span>
            </Link>
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center space-x-4">
            {/* Quick Phone Call Icon */}
            <a href="tel:+442078459200" className="text-slate-600 hover:text-[#c5a880] transition-colors duration-200" aria-label="Call Us">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>

            {/* Quick Quote Icon */}
            <Link 
              href="/enquire" 
              onClick={() => setIsOpen(false)}
              className="bg-[#121816] text-[#eadcc9] hover:bg-[#c5a880] hover:text-[#121816] transition-all duration-300 font-sans text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-2 rounded-none"
            >
              QUOTE
            </Link>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col space-y-1.5 w-6 focus:outline-none cursor-pointer animate-fade-in"
              aria-label="Toggle Mobile Menu"
            >
              <span className={`block h-[2px] w-6 bg-slate-800 transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-[2px] w-6 bg-slate-800 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-6 bg-slate-800 transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── DESKTOP MEGA MENUS ── */}

        {/* 1. Vietnam Tours Mega Menu */}
        {activeMenu === 'vietnam-tours' && (
          <div className="absolute left-0 w-full top-full bg-white border-b border-slate-200 shadow-2xl py-12 px-6 lg:px-12 z-50 animate-fade-in text-slate-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Column 1 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Vietnam Tours
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/itineraries" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Vietnam Tours
                  </Link>
                  <Link href="/itineraries?category=bike" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Bike Tours
                  </Link>
                  <Link href="/itineraries?category=indochina" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Indochina Tours
                  </Link>
                  <Link href="/itineraries?category=culinary" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Culinary Tours
                  </Link>
                  <Link href="/itineraries?category=battlefield" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Battlefield Tours
                  </Link>
                  <Link href="/itineraries?category=day" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Day Tours
                  </Link>
                </div>
                <Link
                  href="/destinations"
                  onClick={() => setActiveMenu(null)}
                  className="inline-block mt-8 px-5 py-2 border border-[#c5a880]/50 text-[#c5a880] hover:border-[#c5a880] hover:bg-[#c5a880] hover:text-white font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 font-bold text-center"
                >
                  ALL DESTINATIONS A-Z
                </Link>
              </div>

              {/* Column 2 */}
              <div className="pt-8">
                <div className="flex flex-col space-y-3.5">
                  <Link href="/itineraries?category=top-10" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Top 10 Vietnam Tours
                  </Link>
                  <Link href="/itineraries?category=shore" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Shore Excursions
                  </Link>
                  <Link href="/itineraries?category=first-time" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    First time travel Vietnam
                  </Link>
                  <Link href="/itineraries?category=family" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Family Tours
                  </Link>
                  <Link href="/itineraries?category=student" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Student Tours
                  </Link>
                  <Link href="/itineraries?category=luxury" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Luxury Tours
                  </Link>
                </div>
              </div>

              {/* Column 3 - Popular Destinations */}
              <div className="border-l border-slate-100 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Popular Destinations
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Hanoi
                  </Link>
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Halong Bay
                  </Link>
                  <Link href="/destinations/saigon-and-mekong-delta" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Ho Chi Minh city
                  </Link>
                  <Link href="/destinations/central-coast-and-hoi-an" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Hoi An
                  </Link>
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Ha Giang
                  </Link>
                  <Link href="/destinations/saigon-and-mekong-delta" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Mekong delta
                  </Link>
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Sapa
                  </Link>
                  <Link href="/destinations/central-coast-and-hoi-an" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Nha Trang
                  </Link>
                  <Link href="/destinations/phu-quoc-island" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Phu Quoc Island
                  </Link>
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Ninh Binh
                  </Link>
                  <Link href="/destinations/central-coast-and-hoi-an" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Hue
                  </Link>
                </div>
              </div>

              {/* Column 4 - Featured Guides */}
              <div className="border-l border-slate-100 pl-8">
                <div className="flex items-center gap-1.5 mb-6 border-b border-slate-100 pb-2">
                  <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase">
                    Featured guides
                  </h3>
                  <span className="text-[11px] text-slate-400">&gt;</span>
                </div>
                
                <div className="space-y-6">
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="font-serif text-[15px] leading-snug font-medium text-slate-800 hover:text-[#c5a880] transition-colors duration-200 block">
                    Top 12 Places to Visit in Vietnam on Your Next Trip
                  </Link>

                  <div className="flex items-start gap-4">
                    <div className="relative w-[110px] h-[80px] flex-shrink-0 border border-slate-100 bg-slate-50">
                      <Image 
                        src="/images/featured_guide_passport.png"
                        alt="Passport Guide"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[13px] leading-snug text-slate-500 hover:text-[#c5a880] transition-colors duration-200 font-medium">
                      Your Guide to Tan Son Nhat International Airport: Arrival and Transportation Options
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Trip Ideas Mega Menu */}
        {activeMenu === 'trip-ideas' && (
          <div className="absolute left-0 w-full top-full bg-white border-b border-slate-200 shadow-2xl py-12 px-6 lg:px-12 z-50 animate-fade-in text-slate-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Column 1 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  By Duration
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/itineraries" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    1-7 Days Itineraries
                  </Link>
                  <Link href="/itineraries" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    8-14 Days Itineraries
                  </Link>
                  <Link href="/itineraries" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    15+ Days Itineraries
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  By Experience
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/itineraries?category=luxury" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Luxury Retreats
                  </Link>
                  <Link href="/itineraries?category=adventure" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Adventure Expeditions
                  </Link>
                  <Link href="/itineraries?category=culture" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Cultural Immersions
                  </Link>
                  <Link href="/itineraries?category=romance" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Honeymoon & Romance
                  </Link>
                </div>
              </div>

              {/* Column 3 */}
              <div className="border-l border-slate-100 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Popular Itineraries
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/itineraries/the-grand-tour-of-vietnam" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    The Grand Tour of Vietnam
                  </Link>
                  <Link href="/itineraries/vietnamese-culinary-and-culture-journey" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Vietnamese Culinary & Culture
                  </Link>
                </div>
              </div>

              {/* Column 4 */}
              <div className="border-l border-slate-100 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Featured Accommodation
                </h3>
                <div className="space-y-4">
                  <div className="relative w-full h-[120px] border border-slate-100">
                    <Image 
                      src="/images/vietnamtour_amanoi_villa.png"
                      alt="Amanoi Villa"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-slate-800">Amanoi Sanctuary</h4>
                    <p className="text-[12px] leading-relaxed text-slate-500 font-light mt-1">
                      A private hilltop sanctuary overlooking Vinh Hy Bay, offering ultimate peace and luxury.
                    </p>
                    <Link href="/accommodations/amanoi-ninh-thuan" onClick={() => setActiveMenu(null)} className="inline-block text-[11px] uppercase tracking-wider text-[#c5a880] font-bold hover:underline mt-2">
                      Discover Amanoi &rarr;
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. Inspirations Mega Menu */}
        {activeMenu === 'inspirations' && (
          <div className="absolute left-0 w-full top-full bg-white border-b border-slate-200 shadow-2xl py-12 px-6 lg:px-12 z-50 animate-fade-in text-slate-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Column 1 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Travel Journal
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Latest Articles
                  </Link>
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Luxury Travel Trends
                  </Link>
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Expert Travel Tips
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Practical Guides
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Best Time to Visit
                  </Link>
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Visa & Entry Requirements
                  </Link>
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Packing Essentials
                  </Link>
                </div>
              </div>

              {/* Column 3 */}
              <div className="border-l border-slate-100 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Featured Article
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    The Ultimate Guide to Cave Dining in Halong Bay
                  </Link>
                  <Link href="/inspiration" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Unveiling Sapa: A Trek Above the Clouds
                  </Link>
                </div>
              </div>

              {/* Column 4 */}
              <div className="border-l border-slate-100 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Photo Gallery
                </h3>
                <div className="space-y-4">
                  <div className="relative w-full h-[120px] border border-slate-100">
                    <Image 
                      src="/images/vietnamtour_cave_dining.png"
                      alt="Cave Dining"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[12px] leading-relaxed text-slate-500 font-light">
                    Capture the moments that define luxury travel. Read our travel journals and feel inspired.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 4. About Us Mega Menu */}
        {activeMenu === 'about-us' && (
          <div className="absolute left-0 w-full top-full bg-white border-b border-slate-200 shadow-2xl py-12 px-6 lg:px-12 z-50 animate-fade-in text-slate-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Column 1 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Our Company
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/specialists" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Who We Are
                  </Link>
                  <Link href="/specialists" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Why Choose Us
                  </Link>
                  <Link href="/enquire" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Experts & Press
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/specialists" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Meet Our Specialists
                  </Link>
                  <Link href="/#reviews" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Guest Reviews
                  </Link>
                  <Link href="/#pillars" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    In the Press
                  </Link>
                </div>
              </div>

              {/* Column 3 */}
              <div className="border-l border-slate-100 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Tailor-Made Design
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/#steps" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    How It Works
                  </Link>
                  <Link href="/enquire" onClick={() => setActiveMenu(null)} className="text-[14px] text-slate-600 hover:text-[#c5a880] transition-colors duration-200">
                    Enquire Online
                  </Link>
                </div>
              </div>

              {/* Column 4 */}
              <div className="border-l border-slate-100 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-slate-800 uppercase mb-6 border-b border-slate-100 pb-2">
                  Our Specialist
                </h3>
                <div className="flex items-start gap-4">
                  <div className="relative w-[70px] h-[70px] flex-shrink-0 rounded-full overflow-hidden border border-slate-100">
                    <Image 
                      src="/images/specialist_alice.png"
                      alt="Alice Mercer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-slate-800">Alice Mercer</h4>
                    <p className="text-[11px] leading-relaxed text-slate-500 font-light mt-0.5">
                      12+ years designing bespoke luxury itineraries.
                    </p>
                    <Link href="/specialists/alice-mercer" onClick={() => setActiveMenu(null)} className="inline-block text-[11px] uppercase tracking-wider text-[#c5a880] font-bold hover:underline mt-1">
                      Read Profile &rarr;
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </nav>

      {/* ── MOBILE ACCORDION OVERLAY MENU ── */}
      <div 
        className={`fixed inset-0 z-40 bg-[#faf9f6] text-slate-800 transition-all duration-500 ease-in-out flex flex-col justify-start px-8 pb-12 pt-28 md:hidden overflow-y-auto ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-6 max-w-md w-full mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a880] block">
            Where will your journey lead?
          </span>
          
          <div className="flex flex-col space-y-4">
            
            {/* 1. Vietnam Tours Accordion */}
            <div>
              <button 
                onClick={() => toggleMobileExpanded('vietnam-tours')}
                className="w-full text-left font-serif text-2xl text-slate-800 hover:text-[#c5a880] flex items-center justify-between py-1 focus:outline-none cursor-pointer"
              >
                <span>VIETNAM TOURS</span>
                <span className={`text-base transition-transform duration-300 ${mobileExpanded === 'vietnam-tours' ? 'rotate-90 text-[#c5a880]' : 'text-slate-400'}`}>
                  &gt;
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                mobileExpanded === 'vietnam-tours' ? 'max-h-[350px] opacity-100 mt-2 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <Link href="/itineraries" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Vietnam Tours</Link>
                <Link href="/itineraries?category=bike" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Bike Tours</Link>
                <Link href="/itineraries?category=culinary" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Culinary Tours</Link>
                <Link href="/itineraries?category=luxury" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Luxury Tours</Link>
                <Link href="/destinations" onClick={() => setIsOpen(false)} className="block text-xs uppercase tracking-widest text-[#c5a880] font-bold pt-1 hover:underline">All Destinations A-Z</Link>
              </div>
            </div>

            {/* 2. Trip Ideas Accordion */}
            <div>
              <button 
                onClick={() => toggleMobileExpanded('trip-ideas')}
                className="w-full text-left font-serif text-2xl text-slate-800 hover:text-[#c5a880] flex items-center justify-between py-1 focus:outline-none cursor-pointer"
              >
                <span>TRIP IDEAS</span>
                <span className={`text-base transition-transform duration-300 ${mobileExpanded === 'trip-ideas' ? 'rotate-90 text-[#c5a880]' : 'text-slate-400'}`}>
                  &gt;
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                mobileExpanded === 'trip-ideas' ? 'max-h-[250px] opacity-100 mt-2 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <Link href="/itineraries" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">By Duration</Link>
                <Link href="/itineraries?category=adventure" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Adventure Expeditions</Link>
                <Link href="/itineraries/the-grand-tour-of-vietnam" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">The Grand Tour of Vietnam</Link>
              </div>
            </div>

            {/* 3. Inspirations Accordion */}
            <div>
              <button 
                onClick={() => toggleMobileExpanded('inspirations')}
                className="w-full text-left font-serif text-2xl text-slate-800 hover:text-[#c5a880] flex items-center justify-between py-1 focus:outline-none cursor-pointer"
              >
                <span>INSPIRATIONS</span>
                <span className={`text-base transition-transform duration-300 ${mobileExpanded === 'inspirations' ? 'rotate-90 text-[#c5a880]' : 'text-slate-400'}`}>
                  &gt;
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                mobileExpanded === 'inspirations' ? 'max-h-[250px] opacity-100 mt-2 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <Link href="/inspiration" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Travel Journal</Link>
                <Link href="/inspiration" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Practical Guides</Link>
              </div>
            </div>

            {/* 4. Tailor-Made Direct Link */}
            <div>
              <Link 
                href="/enquire" 
                onClick={() => setIsOpen(false)}
                className="block text-left font-serif text-2xl text-slate-800 hover:text-[#c5a880] py-1 font-semibold"
              >
                TAILOR-MADE
              </Link>
            </div>

            {/* 5. About Us Accordion */}
            <div>
              <button 
                onClick={() => toggleMobileExpanded('about-us')}
                className="w-full text-left font-serif text-2xl text-slate-800 hover:text-[#c5a880] flex items-center justify-between py-1 focus:outline-none cursor-pointer"
              >
                <span>ABOUT US</span>
                <span className={`text-base transition-transform duration-300 ${mobileExpanded === 'about-us' ? 'rotate-90 text-[#c5a880]' : 'text-slate-400'}`}>
                  &gt;
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                mobileExpanded === 'about-us' ? 'max-h-[250px] opacity-100 mt-2 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <Link href="/specialists" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Who We Are</Link>
                <Link href="/specialists" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Meet Our Specialists</Link>
                <Link href="/enquire" onClick={() => setIsOpen(false)} className="block text-sm text-slate-600 py-1 hover:text-[#c5a880]">Contact Us</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Details (Mobile only, shown at bottom) */}
        <div className="mt-12 pt-8 border-t border-slate-200 space-y-4 max-w-md w-full mx-auto pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-bold block mb-1">Phone</span>
              <a href="tel:+442078459200" className="text-xs text-slate-800 block font-semibold hover:text-[#c5a880]">
                +44 (0) 20 7845 9200
              </a>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-bold block mb-1">Email</span>
              <a href="mailto:inspire@vietnamtour.co.uk" className="text-xs text-slate-800 block font-semibold truncate hover:text-[#c5a880]">
                inspire@vietnamtour.co.uk
              </a>
            </div>
          </div>
          <div className="text-[9px] tracking-widest text-slate-400 font-light">
            © {new Date().getFullYear()} Vietnam Tour. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
