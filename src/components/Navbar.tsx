'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const isHeroPage = pathname === '/' || pathname.startsWith('/itineraries/');

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

  const navLinks = [
    { name: 'Journeys', href: '/#journeys' },
    { name: 'Accommodations', href: '/#accommodations' },
    { name: 'Specialists', href: '/#specialists' },
  ];

  const navbarBg = isHeroPage
    ? isScrolled
      ? 'bg-luxury-cream/95 backdrop-blur-md shadow-sm border-b border-luxury-sand'
      : 'bg-transparent text-white'
    : 'bg-luxury-cream/95 backdrop-blur-md shadow-sm border-b border-luxury-sand';

  const textColor = isHeroPage && !isScrolled ? 'text-white' : 'text-luxury-charcoal';
  const logoColor = isHeroPage && !isScrolled ? 'text-white' : 'text-luxury-gold';
  const buttonStyle = isHeroPage && !isScrolled
    ? 'border-white text-white hover:bg-white hover:text-luxury-charcoal'
    : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg} ${textColor}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <svg 
                className={`w-6 h-6 transition-transform duration-500 group-hover:rotate-45 ${logoColor}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 9l-3 3 3 3 3-3-3-3z" />
              </svg>
              <span className={`font-serif text-lg lg:text-xl tracking-[0.2em] font-semibold uppercase ${logoColor}`}>
                VIETNAM TOUR
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm tracking-widest uppercase font-medium hover:text-luxury-gold transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="tel:+442078459200" 
              className="text-xs lg:text-sm font-medium tracking-wider hover:text-luxury-gold transition-colors duration-200"
            >
              📞 +44 (0) 20 7845 9200
            </a>
            <Link
              href="/enquire"
              className={`px-6 py-2.5 border text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-none ${buttonStyle}`}
            >
              Enquire
            </Link>
          </div>

          {/* Mobile Menu Toggles */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-luxury-gold focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-luxury-cream text-luxury-charcoal border-b border-luxury-sand animate-fade-in">
          <div className="px-6 pt-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm tracking-widest uppercase font-medium hover:text-luxury-gold py-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-luxury-sand flex flex-col space-y-4">
              <a 
                href="tel:+442078459200" 
                className="text-sm font-medium tracking-wide"
              >
                📞 +44 (0) 20 7845 9200
              </a>
              <Link
                href="/enquire"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-6 py-3 border border-luxury-gold text-luxury-gold bg-transparent hover:bg-luxury-gold hover:text-white text-xs tracking-widest uppercase font-semibold transition-all duration-300"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
