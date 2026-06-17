import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-luxury-moss text-luxury-linen/90 border-t border-luxury-gold/20 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <svg 
                className="w-6 h-6 text-luxury-gold" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 9l-3 3 3 3 3-3-3-3z" />
              </svg>
              <span className="font-serif text-lg tracking-[0.2em] font-semibold uppercase text-luxury-gold">
                VIETNAM TOUR
              </span>
            </div>
            <p className="text-sm text-luxury-linen/70 font-light leading-relaxed max-w-sm">
              We design extraordinary, bespoke luxury journeys to Vietnam for discerning UK travellers. Every itinerary is tailor-made, hand-crafted, and curated by specialists with deep local expertise.
            </p>
            <div className="flex items-center space-x-4 text-xs font-semibold tracking-wider text-luxury-gold">
              <span>ABTA MEMBER</span>
              <span>•</span>
              <span>ATOL PROTECTED 10452</span>
            </div>
          </div>

          {/* Journeys & Styles */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-widest uppercase text-luxury-gold font-medium">
              Signature Journeys
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/itineraries/the-grand-tour-of-vietnam" className="hover:text-luxury-gold transition-colors">
                  The Grand Tour of Vietnam
                </Link>
              </li>
              <li>
                <Link href="/itineraries/vietnamese-culinary-and-culture-journey" className="hover:text-luxury-gold transition-colors">
                  Culinary & Culture Voyage
                </Link>
              </li>
              <li>
                <Link href="/itineraries/indochine-romance-and-beach-escape" className="hover:text-luxury-gold transition-colors">
                  Indochine Romance & Beach
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-widest uppercase text-luxury-gold font-medium">
              Explore More
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/destinations" className="hover:text-luxury-gold transition-colors">Destinations</Link>
              </li>
              <li>
                <Link href="/itineraries" className="hover:text-luxury-gold transition-colors font-medium">Bespoke Journeys</Link>
              </li>
              <li>
                <Link href="/accommodations" className="hover:text-luxury-gold transition-colors">Luxury Retreats</Link>
              </li>
              <li>
                <Link href="/specialists" className="hover:text-luxury-gold transition-colors">Speak to a Specialist</Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-luxury-gold transition-colors text-luxury-gold font-medium">
                  Enquire Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-widest uppercase text-luxury-gold font-medium">
              Contact & Hours
            </h4>
            <div className="space-y-4 text-sm font-light">
              <p className="leading-relaxed text-luxury-linen/70">
                Speak directly to our UK-based team of destination specialists:
              </p>
              <div className="space-y-1">
                <a href="tel:+442078459200" className="block text-base font-medium text-luxury-gold hover:underline">
                  +44 (0) 20 7845 9200
                </a>
                <a href="mailto:expert@vietnamtour.co.uk" className="block text-xs text-luxury-linen/60 hover:underline">
                  expert@vietnamtour.co.uk
                </a>
              </div>
              <div className="text-xs text-luxury-linen/60 space-y-1">
                <p>Monday - Friday: 09:00 - 18:00 GMT</p>
                <p>Saturday: 10:00 - 14:00 GMT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-luxury-linen/10 flex flex-col md:flex-row items-center justify-between text-xs text-luxury-linen/50 font-light">
          <p>© {new Date().getFullYear()} VietnamTour.co.uk. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Booking</a>
            <a href="#" className="hover:underline">ATOL Protection Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
