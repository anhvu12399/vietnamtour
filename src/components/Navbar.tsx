'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    { name: 'Inspiration', href: '/inspiration' },
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

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg} ${textColor}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center justify-between h-20 lg:h-24 relative">
            
            {/* Logo on the Left (Desktop & Mobile) */}
            <div className="flex-shrink-0 relative z-50">
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

            {/* Desktop Nav Links on the Right (Scott Dunn Style) */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-10 ml-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[15px] lg:text-base tracking-wide font-medium hover:text-luxury-gold transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger Toggle on the Right (Regent Style Overlay Switch) */}
            <div className="md:hidden flex items-center relative z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col space-y-1.5 w-6 focus:outline-none cursor-pointer"
                aria-label="Toggle Mobile Menu"
              >
                <span className={`block h-[2px] w-6 bg-current transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-[2px] w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[2px] w-6 bg-current transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile-Only Overlay Menu Drawer */}
        <div 
          className={`fixed inset-0 z-40 bg-luxury-slate/98 backdrop-blur-md transition-all duration-500 ease-in-out flex flex-col justify-center px-8 pb-12 pt-24 md:hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="space-y-6 max-w-md w-full mx-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
              Where will your journey lead?
            </span>
            
            <div className="flex flex-col space-y-3">
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
                      className={`block font-serif text-3xl text-luxury-linen hover:text-luxury-gold transition-all duration-700 ease-out transform py-2 ${
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
          <div className="mt-auto pt-8 border-t border-luxury-gold/10 space-y-4 max-w-md w-full mx-auto">
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
              © {new Date().getFullYear()} Vietnam Tour. All rights reserved.
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
