'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { fetchMainSpecialistAction } from '@/app/actions';
import { Specialist } from '@/sanity/types';

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mainSpecialist, setMainSpecialist] = useState<Specialist | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  
  
  useEffect(() => {
    fetchMainSpecialistAction().then(res => {
      if (res) setMainSpecialist(res);
    }).catch(console.error);
  }, []);

  const isHeroPage = pathname === '/' || 
    pathname.startsWith('/itineraries') || 
    pathname.startsWith('/destinations') || 
    pathname.startsWith('/accommodations') || 
    pathname.startsWith('/inspiration') || 
    pathname.startsWith('/travel-guides') ||
    pathname.startsWith('/trip-ideas') ||
    pathname.startsWith('/inspirations') ||
    pathname.startsWith('/ideas-by-month');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (activeMenu) {
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollYRef.current) {
          setShowBottomBar(false);
        } else {
          setShowBottomBar(true);
        }
      } else {
        setShowBottomBar(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMenu]);

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

  const isTransparent = false;

  // Top Bar Classes
  const topBarBgClass = isTransparent
    ? 'w-full bg-transparent border-b border-white/10 px-6 lg:px-12 py-5 text-white transition-all duration-300'
    : 'w-full bg-ink/95 border-b border-white/5 px-6 lg:px-12 py-3 text-paper-dim transition-all duration-300';

  // Bottom Bar Classes
  const bottomBarBgClass = isTransparent
    ? 'w-full bg-transparent px-6 lg:px-12 text-white/90 transition-all duration-300'
    : 'w-full bg-ink/95 px-6 lg:px-12 text-paper-dim/90 transition-all duration-300';

  // Logo text colors
  const logoMainColorClass = 'text-white';

  // Action text/icon classes
  const actionTextClass = 'text-paper-dim/80 hover:text-white transition-colors duration-200';
  const actionIconClass = 'text-paper-dim/70 hover:text-white transition-colors duration-200';

  // Phone Call info text class
  const phoneTextClass = 'text-paper-dim/60 transition-colors duration-200';
  const phoneLinkClass = 'font-semibold text-paper-dim hover:text-gold transition-colors duration-200';

  // Quote Button class
  const quoteButtonClass = 'border border-gold text-gold-soft hover:bg-gold hover:text-ink transition-all duration-300 font-sans text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-none shadow-sm cursor-pointer';

  // Bottom row menu items text colors and hover pill colors
  const menuItemClass = 'text-paper-dim/85 hover:bg-white/10 hover:text-white';

  const menuItemChevronClass = 'text-paper-dim/50';

  return (
    <>
      {/* Page Backdrop (Overlay) when a dropdown is open */}
      {activeMenu && (
        <div 
          className={`fixed inset-0 bg-black/45 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
            isTransparent ? 'top-[116px]' : 'top-[88px]'
          } top-[80px] lg:${isTransparent ? 'top-[116px]' : 'top-[88px]'}`}
          onClick={() => setActiveMenu(null)}
        />
      )}

      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent border-b border-transparent'
            : isScrolled
              ? 'bg-ink/92 backdrop-blur-md shadow-md border-b border-white/5'
              : 'bg-ink border-b border-white/5'
        }`}
      >
        {/* ── DESKTOP HEADER (Two-tier) ── */}
        <div className="hidden md:flex flex-col w-full">
          {/* Top Row: Logo & Actions */}
          <div className={topBarBgClass}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Logo (Left) */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-3 group select-none">
                  <Image
                    src="/logo-sun-hat.png"
                    alt="Vietnam Tours Logo"
                    width={64}
                    height={40}
                    className="h-[40px] w-auto shrink-0 object-contain"
                    priority
                  />
                  <span className="flex flex-col leading-none">
                    <span className="font-sans font-bold text-[16px] tracking-[0.16em] text-paper uppercase transition-all duration-300">
                      Vietnam Tours
                    </span>
                    <span className="font-mono font-normal text-[9.5px] tracking-[0.32em] text-gold-soft uppercase mt-1">
                      Est. 2009 · Bespoke
                    </span>
                  </span>
                </Link>
              </div>

              {/* Top Actions (Right) */}
              <div className="flex items-center space-x-6 lg:space-x-8">


                {/* Contact phone info */}
                <div className={`text-[12px] font-sans flex items-center gap-1.5 ${phoneTextClass}`}>
                  <span>Call us today until 8pm</span>
                  <a href="tel:+84988600388" className={phoneLinkClass}>
                    <svg className="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +84 988600388
                  </a>
                  <span className="text-slate-300">or</span>
                </div>

                {/* Quote Button */}
                <Link href="/enquire" className={quoteButtonClass}>
                  REQUEST A QUOTE
                </Link>
              </div>

            </div>
          </div>

          {/* Bottom Row: Navigation Links */}
          <div 
            className={`${bottomBarBgClass} transition-all duration-300 ease-in-out overflow-hidden ${
              showBottomBar 
                ? isTransparent ? 'py-3.5' : 'py-2' 
                : 'py-0'
            }`}
            style={{
              maxHeight: showBottomBar ? '60px' : '0px',
              opacity: showBottomBar ? 1 : 0,
              pointerEvents: showBottomBar ? 'auto' : 'none',
            }}
          >
            <div className="max-w-7xl mx-auto flex items-center">
              
              <div className="flex items-center space-x-6 lg:space-x-8">
                {/* 1. Vietnam Tours Dropdown Trigger */}
                <button
                  onClick={() => handleMenuClick('vietnam-tours')}
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase flex items-center gap-1.5 focus:outline-none transition-all duration-300 cursor-pointer ${menuItemClass} ${
                    activeMenu === 'vietnam-tours' ? (isTransparent ? 'bg-white/10 text-white font-bold' : 'bg-paper-dim text-ink font-bold') : ''
                  }`}
                >
                  VIETNAM TOURS
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${menuItemChevronClass} ${
                    activeMenu === 'vietnam-tours' ? 'rotate-180 text-copper' : ''
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 2. Trip Ideas Dropdown Trigger */}
                <button
                  onClick={() => handleMenuClick('trip-ideas')}
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase flex items-center gap-1.5 focus:outline-none transition-all duration-300 cursor-pointer ${menuItemClass} ${
                    activeMenu === 'trip-ideas' ? (isTransparent ? 'bg-white/10 text-white font-bold' : 'bg-paper-dim text-ink font-bold') : ''
                  }`}
                >
                  TRIP IDEAS
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${menuItemChevronClass} ${
                    activeMenu === 'trip-ideas' ? 'rotate-180 text-copper' : ''
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 3. Inspirations Dropdown Trigger */}
                <button
                  onClick={() => handleMenuClick('inspirations')}
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase flex items-center gap-1.5 focus:outline-none transition-all duration-300 cursor-pointer ${menuItemClass} ${
                    activeMenu === 'inspirations' ? (isTransparent ? 'bg-white/10 text-white font-bold' : 'bg-paper-dim text-ink font-bold') : ''
                  }`}
                >
                  INSPIRATIONS
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${menuItemChevronClass} ${
                    activeMenu === 'inspirations' ? 'rotate-180 text-copper' : ''
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 4. Tailor-made Direct Link */}
                <Link
                  href="/enquire"
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase transition-all duration-300 ${menuItemClass}`}
                >
                  TAILOR-MADE
                </Link>

                {/* 5. About Us Dropdown Trigger */}
                <button
                  onClick={() => handleMenuClick('about-us')}
                  className={`font-sans text-[12px] lg:text-[13px] tracking-[0.18em] font-semibold uppercase flex items-center gap-1.5 focus:outline-none transition-all duration-300 cursor-pointer ${menuItemClass} ${
                    activeMenu === 'about-us' ? (isTransparent ? 'bg-white/10 text-white font-bold' : 'bg-paper-dim text-ink font-bold') : ''
                  }`}
                >
                  ABOUT US
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${menuItemChevronClass} ${
                    activeMenu === 'about-us' ? 'rotate-180 text-copper' : ''
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Search Icon (Far Right of Bottom Row) */}
              <button className={`transition-colors duration-200 cursor-pointer ml-auto ${actionIconClass}`} aria-label="Search">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

            </div>
          </div>
        </div>

        {/* ── MOBILE HEADER (Single-tier) ── */}
        <div className={`flex md:hidden w-full h-20 px-6 items-center justify-between relative z-50 transition-all duration-300 ${
          isTransparent 
            ? 'bg-transparent border-b border-white/10 text-white' 
            : 'bg-paper-dim text-ink border-b border-[#2A2D2B]/15'
        }`}>
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group select-none">
              <Image
                src="/logo-sun-hat.png"
                alt="Vietnam Tours Logo"
                width={50}
                height={32}
                className="h-[32px] w-auto shrink-0 object-contain"
                priority
              />
              <span className="flex flex-col leading-none">
                <span className="font-sans font-bold text-[14px] tracking-[0.14em] text-paper uppercase">
                  Vietnam Tours
                </span>
                <span className="font-mono font-normal text-[8px] tracking-[0.28em] text-gold-soft uppercase mt-0.5">
                  Est. 2009 · Bespoke
                </span>
              </span>
            </Link>
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center space-x-4">
            {/* Quick Phone Call Icon */}
            <a href="tel:+84988600388" className={`transition-colors duration-200 ${isTransparent ? 'text-white/80 hover:text-white' : 'text-ink/80 hover:text-copper'}`} aria-label="Call Us">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>

            {/* Quick Quote Icon */}
            <Link 
              href="/enquire" 
              onClick={() => setIsOpen(false)}
              className={`${
                isTransparent 
                  ? 'bg-white/95 text-slate-900 hover:bg-copper hover:text-ink' 
                  : 'bg-ink text-paper-dim hover:bg-copper hover:text-ink'
              } transition-all duration-300 font-sans text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-2 rounded-none`}
            >
              QUOTE
            </Link>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col space-y-1.5 w-6 focus:outline-none cursor-pointer animate-fade-in"
              aria-label="Toggle Mobile Menu"
            >
              <span className={`block h-[2px] w-6 transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2' : ''} bg-paper`} />
              <span className={`block h-[2px] w-6 transition-all duration-300 ${isOpen ? 'opacity-0' : ''} bg-paper`} />
              <span className={`block h-[2px] w-6 transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-2' : ''} bg-paper`} />
            </button>
          </div>
        </div>

        {/* ── DESKTOP MEGA MENUS ── */}

        {/* 1. Vietnam Tours Mega Menu */}
        {activeMenu === 'vietnam-tours' && (
          <div className="absolute left-0 w-full top-full bg-paper-dim border-b border-[#2A2D2B]/10 shadow-2xl py-12 px-6 lg:px-12 z-50 animate-fade-in text-ink">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Column 1 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Vietnam Tours
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/itineraries" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Vietnam Tours
                  </Link>
                  <Link href="/itineraries?category=bike" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Bike Tours
                  </Link>
                  <Link href="/itineraries?category=indochina" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Indochina Tours
                  </Link>
                  <Link href="/itineraries?category=culinary" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Culinary Tours
                  </Link>
                  <Link href="/itineraries?category=battlefield" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Battlefield Tours
                  </Link>
                  <Link href="/itineraries?category=day" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Day Tours
                  </Link>
                </div>
                <Link
                  href="/destinations"
                  onClick={() => setActiveMenu(null)}
                  className="inline-block mt-8 px-5 py-2 border border-copper/50 text-copper hover:border-copper hover:bg-copper hover:text-white font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 font-bold text-center"
                >
                  ALL DESTINATIONS A-Z
                </Link>
              </div>

              {/* Column 2 */}
              <div className="pt-8">
                <div className="flex flex-col space-y-3.5">
                  <Link href="/itineraries?category=top-10" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Top 10 Vietnam Tours
                  </Link>
                  <Link href="/itineraries?category=shore" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Shore Excursions
                  </Link>
                  <Link href="/itineraries?category=first-time" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    First time travel Vietnam
                  </Link>
                  <Link href="/itineraries?category=family" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Family Tours
                  </Link>
                  <Link href="/itineraries?category=student" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Student Tours
                  </Link>
                  <Link href="/itineraries?category=luxury" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Luxury Tours
                  </Link>
                </div>
              </div>

              {/* Column 3 - Popular Destinations */}
              <div className="border-l border-[#2A2D2B]/10 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Popular Destinations
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Hanoi
                  </Link>
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Halong Bay
                  </Link>
                  <Link href="/destinations/saigon-and-mekong-delta" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Ho Chi Minh city
                  </Link>
                  <Link href="/destinations/central-coast-and-hoi-an" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Hoi An
                  </Link>
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Ha Giang
                  </Link>
                  <Link href="/destinations/saigon-and-mekong-delta" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Mekong delta
                  </Link>
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Sapa
                  </Link>
                  <Link href="/destinations/central-coast-and-hoi-an" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Nha Trang
                  </Link>
                  <Link href="/destinations/phu-quoc-island" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Phu Quoc Island
                  </Link>
                  <Link href="/destinations/hanoi-and-the-north" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Ninh Binh
                  </Link>
                  <Link href="/destinations/central-coast-and-hoi-an" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Hue
                  </Link>
                </div>
              </div>

              {/* Column 4 - Featured Guides */}
              <div className="border-l border-[#2A2D2B]/10 pl-8">
                <div className="flex items-center gap-1.5 mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase">
                    Featured guides
                  </h3>
                  <span className="text-[11px] text-ink/50">&gt;</span>
                </div>
                
                <div className="space-y-6">
                  <Link href="/travel-guides" onClick={() => setActiveMenu(null)} className="font-serif text-[15px] leading-snug font-medium text-ink hover:text-copper transition-colors duration-200 block">
                    Top 12 Places to Visit in Vietnam on Your Next Trip
                  </Link>

                  <div className="flex items-start gap-4">
                    <div className="relative w-[110px] h-[80px] flex-shrink-0 border border-[#2A2D2B]/10 bg-slate-50">
                      <Image 
                        src="/images/featured_guide_passport.png"
                        alt="Passport Guide"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link href="/travel-guides" onClick={() => setActiveMenu(null)} className="text-[13px] leading-snug text-ink/70 hover:text-copper transition-colors duration-200 font-medium">
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
          <div className="absolute left-0 w-full top-full bg-paper-dim border-b border-[#2A2D2B]/10 shadow-2xl py-12 px-6 lg:px-12 z-50 animate-fade-in text-ink">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Column 1: By Activity */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Trip Ideas By Activity
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/trip-ideas/vietnam-culinary-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    Vietnam Culinary Tours
                  </Link>
                  <Link href="/trip-ideas/bike-and-boat-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    Bike & Boat Tours
                  </Link>
                  <Link href="/trip-ideas/motorcycling-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    Motorcycling Tours
                  </Link>
                  <Link href="/trip-ideas/golf-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    Golf Tours
                  </Link>
                </div>
              </div>

              {/* Column 2: Travel Styles */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Travel Styles
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/trip-ideas/classic-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    Classic Tours
                  </Link>
                  <Link href="/trip-ideas/schools-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    Schools Tours
                  </Link>
                  <Link href="/trip-ideas/beach-holidays" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    Beach Holidays
                  </Link>
                  <Link href="/trip-ideas/beach-itinerary-ideas" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    Beach Itinerary Ideas
                  </Link>
                  <Link href="/trip-ideas/first-time-guide-vietnam" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200 font-medium">
                    First Time Guide Vietnam
                  </Link>
                </div>
              </div>

              {/* Column 3: Ideas by Month Calendar Grid */}
              <div className="border-l border-[#2A2D2B]/10 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-4 border-b border-[#2A2D2B]/10 pb-2">
                  Ideas By Month
                </h3>
                <p className="text-[11px] text-ink/50 mb-4 font-light">Select a month to see local weather and trip recommendations:</p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] tracking-widest font-semibold">
                  {['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].map((month, idx) => {
                    const fullMonths = [
                      'jannuary', 'february', 'march', 'april', 'may', 'june',
                      'july', 'august', 'september', 'october', 'november', 'december'
                    ];
                    // Correcting typo in january slug
                    const slugMonth = idx === 0 ? 'january' : fullMonths[idx];
                    return (
                      <Link 
                        key={month}
                        href={`/ideas-by-month/${slugMonth}`}
                        onClick={() => setActiveMenu(null)}
                        className="border border-slate-150 py-1.5 hover:bg-copper hover:text-white hover:border-copper transition-colors uppercase font-sans text-ink/80"
                      >
                        {month}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/ideas-by-month"
                  onClick={() => setActiveMenu(null)}
                  className="inline-block mt-5 text-[11px] font-bold tracking-widest uppercase text-copper hover:underline"
                >
                  View All Months Guide &rarr;
                </Link>
              </div>

              {/* Column 4: Featured culinary idea */}
              <div className="border-l border-[#2A2D2B]/10 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Featured Trip Idea
                </h3>
                <div className="space-y-4">
                  <div className="relative w-full h-[120px] border border-[#2A2D2B]/10">
                    <Image 
                      src="/images/trip_culinary_street_food.png"
                      alt="Hoi An Culinary Tour"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-ink">Vietnam Culinary Tours</h4>
                    <p className="text-[12px] leading-relaxed text-ink/70 font-light mt-1">
                      Eat your way through the country, exploring street food stalls to imperial dining rooms.
                    </p>
                    <Link href="/trip-ideas/vietnam-culinary-tours" onClick={() => setActiveMenu(null)} className="inline-block text-[11px] uppercase tracking-wider text-copper font-bold hover:underline mt-2">
                      Discover Cuisine &rarr;
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. Inspirations Mega Menu */}
        {activeMenu === 'inspirations' && (
          <div className="absolute left-0 w-full top-full bg-paper-dim border-b border-[#2A2D2B]/10 shadow-2xl py-12 px-6 lg:px-12 z-50 animate-fade-in text-ink">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Column 1: Travel Inspirations */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Travel Inspirations
                </h3>
                <div className="flex flex-col space-y-3.5 font-medium">
                  <Link href="/inspirations/luxury-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Luxury Tours
                  </Link>
                  <Link href="/inspirations/adventure-off-beaten-track" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Adventure & Off-Beaten Track
                  </Link>
                  <Link href="/inspirations/family-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Family Tours
                  </Link>
                  <Link href="/inspirations/culinary-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Culinary Inspiration
                  </Link>
                  <Link href="/inspirations/golf-tours" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Golf Inspiration
                  </Link>
                </div>
              </div>

              {/* Column 2: Travel Journal */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Travel Journal
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/travel-guides" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Latest Articles
                  </Link>
                  <Link href="/travel-guides?category=places" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Places to Visit
                  </Link>
                  <Link href="/travel-guides?category=things" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Things to Do
                  </Link>
                </div>
              </div>

              {/* Column 3: Hotels & Cruises */}
              <div className="border-l border-[#2A2D2B]/10 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Accommodations & Cruises
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/accommodations" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Luxury Hotels & Villas
                  </Link>
                  <Link href="/itineraries?category=cruise" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Premium Cruises
                  </Link>
                  <Link href="/specialists" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Speak to Specialists
                  </Link>
                </div>
              </div>

              {/* Column 4: Featured Image Card */}
              <div className="border-l border-[#2A2D2B]/10 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Featured Inspiration
                </h3>
                <div className="space-y-4">
                  <div className="relative w-full h-[120px] border border-[#2A2D2B]/10">
                    <Image 
                      src="/images/trip_luxury_villa.png"
                      alt="Luxury Amanoi resort"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[12px] leading-relaxed text-ink/70 font-light">
                    Discover Amanoi Sanctuary — a private luxury hilltop retreat overlooking pristine Vinh Hy Bay.
                  </p>
                  <Link href="/inspirations/luxury-tours" onClick={() => setActiveMenu(null)} className="inline-block text-[11px] uppercase tracking-wider text-copper font-bold hover:underline mt-1">
                    Discover Luxury &rarr;
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 4. About Us Mega Menu */}
        {activeMenu === 'about-us' && (
          <div className="absolute left-0 w-full top-full bg-paper-dim border-b border-[#2A2D2B]/10 shadow-2xl py-12 px-6 lg:px-12 z-50 animate-fade-in text-ink">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Column 1 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Our Company
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/specialists" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Who We Are
                  </Link>
                  <Link href="/specialists" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Why Choose Us
                  </Link>
                  <Link href="/enquire" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Experts & Press
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/specialists" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Meet Our Specialists
                  </Link>
                  <Link href="/#reviews" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Guest Reviews
                  </Link>
                  <Link href="/#pillars" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    In the Press
                  </Link>
                </div>
              </div>

              {/* Column 3 */}
              <div className="border-l border-[#2A2D2B]/10 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Tailor-Made Design
                </h3>
                <div className="flex flex-col space-y-3.5">
                  <Link href="/#steps" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    How It Works
                  </Link>
                  <Link href="/enquire" onClick={() => setActiveMenu(null)} className="text-[14px] text-ink/80 hover:text-copper transition-colors duration-200">
                    Enquire Online
                  </Link>
                </div>
              </div>

              {/* Column 4 */}
              <div className="border-l border-[#2A2D2B]/10 pl-8">
                <h3 className="font-serif text-sm tracking-[0.2em] font-semibold text-ink uppercase mb-6 border-b border-[#2A2D2B]/10 pb-2">
                  Our Specialist
                </h3>
                <div className="flex items-start gap-4">
                  <div className="relative w-[70px] h-[70px] flex-shrink-0 rounded-full overflow-hidden border border-[#2A2D2B]/10">
                    <Image 
                      src={mainSpecialist?.image || "/images/specialist_alice.png"}
                      alt={mainSpecialist?.name || "Alice Mercer"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-ink">{mainSpecialist?.name || "Alice Mercer"}</h4>
                    <p className="text-[11px] leading-relaxed text-ink/70 font-light mt-0.5">
                      {mainSpecialist?.role || "12+ years designing bespoke luxury itineraries."}
                    </p>
                    <Link href={`/specialists/${mainSpecialist?.slug?.current || "alice-mercer"}`} onClick={() => setActiveMenu(null)} className="inline-block text-[11px] uppercase tracking-wider text-copper font-bold hover:underline mt-1">
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
        className={`fixed inset-0 z-40 bg-ink text-paper transition-all duration-500 ease-in-out flex flex-col justify-start px-8 pb-12 pt-28 md:hidden overflow-y-auto ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-6 max-w-md w-full mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-soft block">
            Where will your journey lead?
          </span>
          
          <div className="flex flex-col space-y-4">
            
            {/* 1. Vietnam Tours Accordion */}
            <div>
              <button 
                onClick={() => toggleMobileExpanded('vietnam-tours')}
                className="w-full text-left font-serif text-2xl text-paper hover:text-gold flex items-center justify-between py-1 focus:outline-none cursor-pointer"
              >
                <span>VIETNAM TOURS</span>
                <span className={`text-base transition-transform duration-300 ${mobileExpanded === 'vietnam-tours' ? 'rotate-90 text-gold' : 'text-paper-dim/50'}`}>
                  &gt;
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                mobileExpanded === 'vietnam-tours' ? 'max-h-[350px] opacity-100 mt-2 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <Link href="/itineraries" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Vietnam Tours</Link>
                <Link href="/itineraries?category=bike" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Bike Tours</Link>
                <Link href="/itineraries?category=culinary" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Culinary Tours</Link>
                <Link href="/itineraries?category=luxury" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Luxury Tours</Link>
                <Link href="/destinations" onClick={() => setIsOpen(false)} className="block text-xs uppercase tracking-widest text-gold-soft font-bold pt-1 hover:underline">All Destinations A-Z</Link>
              </div>
            </div>

            {/* 2. Trip Ideas Accordion */}
            <div>
              <button 
                onClick={() => toggleMobileExpanded('trip-ideas')}
                className="w-full text-left font-serif text-2xl text-paper hover:text-gold flex items-center justify-between py-1 focus:outline-none cursor-pointer"
              >
                <span>TRIP IDEAS</span>
                <span className={`text-base transition-transform duration-300 ${mobileExpanded === 'trip-ideas' ? 'rotate-90 text-gold' : 'text-paper-dim/50'}`}>
                  &gt;
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                mobileExpanded === 'trip-ideas' ? 'max-h-[350px] opacity-100 mt-2 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <Link href="/trip-ideas" onClick={() => setIsOpen(false)} className="block text-sm text-gold-soft font-bold py-1 hover:underline">All Trip Ideas &rarr;</Link>
                <Link href="/trip-ideas/vietnam-culinary-tours" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Culinary Tours</Link>
                <Link href="/trip-ideas/bike-and-boat-tours" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Bike & Boat Tours</Link>
                <Link href="/trip-ideas/motorcycling-tours" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Motorcycling Tours</Link>
                <Link href="/trip-ideas/classic-tours" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Classic Tours</Link>
                <Link href="/ideas-by-month" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold italic">Best Time / Month Ideas &rarr;</Link>
              </div>
            </div>

            {/* 3. Inspirations Accordion */}
            <div>
              <button 
                onClick={() => toggleMobileExpanded('inspirations')}
                className="w-full text-left font-serif text-2xl text-paper hover:text-gold flex items-center justify-between py-1 focus:outline-none cursor-pointer"
              >
                <span>INSPIRATIONS</span>
                <span className={`text-base transition-transform duration-300 ${mobileExpanded === 'inspirations' ? 'rotate-90 text-gold' : 'text-paper-dim/50'}`}>
                  &gt;
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                mobileExpanded === 'inspirations' ? 'max-h-[350px] opacity-100 mt-2 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <Link href="/inspirations" onClick={() => setIsOpen(false)} className="block text-sm text-gold-soft font-bold py-1 hover:underline">All Inspirations &rarr;</Link>
                <Link href="/inspirations/luxury-tours" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Luxury Tours</Link>
                <Link href="/inspirations/adventure-off-beaten-track" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Adventure</Link>
                <Link href="/inspirations/family-tours" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Family Tours</Link>
                <Link href="/travel-guides" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Travel Journal</Link>
              </div>
            </div>

            {/* 4. Tailor-Made Direct Link */}
            <div>
              <Link 
                href="/enquire" 
                onClick={() => setIsOpen(false)}
                className="block text-left font-serif text-2xl text-paper hover:text-gold py-1 font-semibold"
              >
                TAILOR-MADE
              </Link>
            </div>

            {/* 5. About Us Accordion */}
            <div>
              <button 
                onClick={() => toggleMobileExpanded('about-us')}
                className="w-full text-left font-serif text-2xl text-paper hover:text-gold flex items-center justify-between py-1 focus:outline-none cursor-pointer"
              >
                <span>ABOUT US</span>
                <span className={`text-base transition-transform duration-300 ${mobileExpanded === 'about-us' ? 'rotate-90 text-gold' : 'text-paper-dim/50'}`}>
                  &gt;
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                mobileExpanded === 'about-us' ? 'max-h-[250px] opacity-100 mt-2 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <Link href="/specialists" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Who We Are</Link>
                <Link href="/specialists" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Meet Our Specialists</Link>
                <Link href="/enquire" onClick={() => setIsOpen(false)} className="block text-sm text-paper-dim/90 py-1 hover:text-gold">Contact Us</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Details (Mobile only, shown at bottom) */}
        <div className="mt-12 pt-8 border-t border-luxury-linen/10 space-y-4 max-w-md w-full mx-auto pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-gold-soft font-bold block mb-1">Phone</span>
              <a href="tel:+84988600388" className="text-xs text-paper block font-semibold hover:text-gold">
                +84 988600388
              </a>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-gold-soft font-bold block mb-1">Email</span>
              <a href="mailto:inspire@vietnamtour.co.uk" className="text-xs text-paper block font-semibold truncate hover:text-gold">
                inspire@vietnamtour.co.uk
              </a>
            </div>
          </div>
          <div className="text-[9px] tracking-widest text-paper-dim/40 font-light">
            © {new Date().getFullYear()} Vietnam Tour. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
