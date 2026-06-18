'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
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

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
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

  const navLinks = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Journeys', href: '/itineraries' },
    { name: 'Accommodations', href: '/accommodations' },
    { name: 'Specialists', href: '/specialists' },
    { name: 'Enquire', href: '/enquire' },
  ];

  const navbarBg = isHeroPage
    ? isScrolled
      ? 'bg-luxury-slate/95 backdrop-blur-md shadow-sm border-b border-luxury-moss/50'
      : 'bg-transparent text-white'
    : 'bg-luxury-slate/95 backdrop-blur-md shadow-sm border-b border-luxury-moss/50';

  const textColor = isHeroPage && !isScrolled ? 'text-white' : 'text-luxury-linen';
  const logoColor = isHeroPage && !isScrolled ? 'text-white' : 'text-luxury-gold';
  const buttonStyle = isHeroPage && !isScrolled
    ? 'border-white text-white hover:bg-white hover:text-luxury-slate'
    : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-slate';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg} ${textColor}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center justify-between h-20 lg:h-24 relative z-50">
            
            {/* Left side: Hamburger Toggle & EN indicator (Regent Style) */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-3 group focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                <div className="flex flex-col space-y-1.5 w-6">
                  <span className={`block h-[2px] w-6 bg-current transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-[2px] w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-[2px] w-6 bg-current transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
                <span className="hidden sm:inline text-xs tracking-[0.2em] font-semibold uppercase">
                  {isOpen ? 'Close' : 'Menu'}
                </span>
              </button>

              <div className="hidden sm:flex items-center text-xs tracking-wider font-medium opacity-70 hover:opacity-100 transition-opacity">
                <span>EN</span>
                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Center: Absolutely Centered Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 group">
                <svg 
                  className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-45 ${logoColor}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 9l-3 3 3 3 3-3-3-3z" />
                </svg>
                <span className={`font-serif text-base lg:text-lg tracking-[0.2em] font-semibold uppercase ${logoColor}`}>
                  VIETNAM TOUR
                </span>
              </Link>
            </div>

            {/* Right side: Enquire CTA button */}
            <div className="flex items-center">
              <Link
                href="/enquire"
                onClick={() => setIsOpen(false)}
                className={`px-5 py-2.5 border text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-none ${buttonStyle}`}
              >
                Enquire
              </Link>
            </div>

          </div>
        </div>

        {/* Full-Screen Overlay Menu Drawer */}
        <div 
          className={`fixed inset-0 z-40 bg-luxury-slate/98 backdrop-blur-md transition-all duration-500 ease-in-out flex flex-col md:flex-row ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Left Side (Desktop: 40% Split Image & Contacts) */}
          <div className="hidden md:flex md:w-[40%] bg-luxury-moss border-r border-luxury-gold/10 flex-col justify-between p-12 lg:p-16 pt-32 lg:pt-36">
            {/* Featured Image */}
            <div className="relative flex-grow rounded-none overflow-hidden border border-luxury-gold/15 group min-h-[200px] max-h-[350px]">
              <Image
                src="/images/halong_night.png"
                alt="Luxury Travel Vietnam"
                fill
                className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-gold">Bespoke Experience</span>
                <h4 className="font-serif text-lg text-white font-medium mt-1">Crafting Legacies in Vietnam</h4>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 pt-8">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-semibold block">Enquire & Plan</span>
                <a href="tel:+442078459200" className="text-sm text-luxury-linen hover:text-luxury-gold transition-colors block font-medium">
                  📞 +44 (0) 20 7845 9200
                </a>
                <a href="mailto:inspire@vietnamtour.co.uk" className="text-sm text-luxury-linen hover:text-luxury-gold transition-colors block font-medium">
                  ✉ inspire@vietnamtour.co.uk
                </a>
              </div>
              
              <div className="h-[1px] w-12 bg-luxury-gold/20" />
              
              <div className="text-[10px] tracking-widest text-luxury-linen/50 font-light">
                © {new Date().getFullYear()} Vietnam Tour. All rights reserved.
              </div>
            </div>
          </div>

          {/* Right Side (Links & Navigation: 60% Desktop, 100% Mobile) */}
          <div className="flex-grow flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-28 pt-28 md:pt-20 pb-12">
            <div className="space-y-6 sm:space-y-8 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-luxury-gold block">
                Where will your journey lead?
              </span>
              
              <div className="flex flex-col space-y-4 sm:space-y-6">
                {navLinks.map((link, idx) => {
                  const delayStyles = {
                    transitionDelay: isOpen ? `${(idx + 1) * 100}ms` : '0ms'
                  };
                  
                  return (
                    <div key={link.name} className="overflow-hidden">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        style={delayStyles}
                        className={`block font-serif text-3xl sm:text-5xl lg:text-6xl text-luxury-linen hover:text-luxury-gold transition-all duration-700 ease-out transform ${
                          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Details (Mobile only, shown at bottom) */}
            <div className="md:hidden mt-auto pt-8 border-t border-luxury-gold/10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-semibold block mb-1">Phone</span>
                  <a href="tel:+442078459200" className="text-xs text-luxury-linen block font-medium">
                    +44 (0) 20 7845 9200
                  </a>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-semibold block mb-1">Email</span>
                  <a href="mailto:inspire@vietnamtour.co.uk" className="text-xs text-luxury-linen block font-medium truncate">
                    inspire@vietnamtour.co.uk
                  </a>
                </div>
              </div>
              <div className="text-[9px] tracking-widest text-luxury-linen/40 font-light">
                © {new Date().getFullYear()} Vietnam Tour.
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
