import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/* 8.5. Why Vietnam Tour Section (Why Us) */}
      <section className="bg-luxury-moss py-24 border-t border-luxury-gold/20 relative overflow-hidden text-left">
        {/* Subtle decorative background pattern / lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,22,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,22,0.5)_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />

        {/* Elegant Vietnamese Lotus Line Art Background (Right Bottom) */}
        <svg viewBox="0 0 200 200" className="absolute right-0 bottom-0 w-[400px] h-[400px] opacity-[0.06] text-luxury-gold pointer-events-none select-none" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Center petal */}
          <path d="M100 150 C90 110, 90 70, 100 40 C110 70, 110 110, 100 150 Z" />
          {/* Left petals */}
          <path d="M100 150 C75 120, 65 90, 80 60 C88 85, 95 110, 100 150 Z" />
          <path d="M100 150 C55 130, 45 105, 60 80 C72 100, 85 120, 100 150 Z" />
          <path d="M100 150 C35 145, 30 125, 45 105 C60 120, 78 132, 100 150 Z" />
          {/* Right petals */}
          <path d="M100 150 C125 120, 135 90, 120 60 C112 85, 105 110, 100 150 Z" />
          <path d="M100 150 C145 130, 155 105, 140 80 C128 100, 115 120, 100 150 Z" />
          <path d="M100 150 C165 145, 170 125, 155 105 C140 120, 122 132, 100 150 Z" />
          {/* Leaves / Pad */}
          <path d="M30 160 C50 180, 150 180, 170 160 C150 165, 50 165, 30 160 Z" />
          {/* Stems */}
          <path d="M100 170 C98 180, 95 190, 95 200" />
          <path d="M105 170 C104 180, 102 190, 101 200" />
        </svg>

        {/* Elegant Vietnamese Bamboo Line Art Background (Left Top) */}
        <svg viewBox="0 0 200 200" className="absolute left-0 top-0 w-96 h-96 opacity-[0.05] text-luxury-gold pointer-events-none select-none" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Stalk 1 */}
          <path d="M40 200 C45 150, 48 100, 42 50 C40 30, 38 10, 35 0" />
          <path d="M40 200 L43 198" />
          <path d="M44 150 L47 148" />
          <path d="M46 100 L49 98" />
          <path d="M43 50 L46 48" />
          {/* Leaf clusters */}
          <path d="M44 150 Q70 140, 90 155 Q65 160, 44 150" fill="currentColor" opacity="0.3" />
          <path d="M44 150 Q80 130, 110 135 Q75 145, 44 150" fill="currentColor" opacity="0.3" />
          <path d="M46 100 Q75 80, 105 85 Q70 95, 46 100" fill="currentColor" opacity="0.3" />
          <path d="M46 100 Q85 95, 115 110 Q80 115, 46 100" fill="currentColor" opacity="0.3" />
          <path d="M43 50 Q70 30, 95 35 Q65 45, 43 50" fill="currentColor" opacity="0.3" />
          <path d="M43 50 Q75 45, 100 55 Q70 60, 43 50" fill="currentColor" opacity="0.3" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              Our Legacy
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-luxury-linen font-light">
              Why Vietnam Tour?
            </h2>
            <div className="h-[1px] w-20 bg-luxury-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Tailor-Made Purity",
                icon: (
                  <svg className="w-5 h-5 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
                bullets: [
                  "We listen to your travel goals and craft 100% unique itineraries bespoke to you.",
                  "Every day is paced around your energy level, private dining desires, and guide requirements."
                ]
              },
              {
                title: "Deep Insider Trust",
                icon: (
                  <svg className="w-5 h-5 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                bullets: [
                  "Dedicated UK-based specialists who have spent decades living and traveling across Vietnam.",
                  "Exclusive local access to closed historical sites, private art collectors, and culinary hosts."
                ]
              },
              {
                title: "Curated Sanctity",
                icon: (
                  <svg className="w-5 h-5 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                bullets: [
                  "We hand-select only the finest 5-star properties, private luxury catamarans, and secret ecolodges.",
                  "Seamless transitions: fast-track airport arrivals, private helicopter transfers, and dedicated local hosts."
                ]
              },
              {
                title: "Elite Assurance",
                icon: (
                  <svg className="w-5 h-5 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                bullets: [
                  "100% financial protection with full ATOL protection for complete peace of mind.",
                  "24/7 UK and local support throughout your journey, adjusting variables in real-time."
                ]
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="flex flex-col bg-luxury-slate border border-luxury-gold/10 hover:border-luxury-gold/40 transition-all duration-500 shadow-2xl relative group pt-8 pb-4 min-h-[260px]"
              >
                {/* Overlapping Round Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-luxury-moss border border-luxury-gold/30 rounded-full flex items-center justify-center shadow-lg group-hover:border-luxury-gold transition-colors duration-300">
                  {card.icon}
                </div>

                {/* White-to-Moss Header Block */}
                <div className="bg-luxury-moss/50 py-4 text-center border-b border-luxury-gold/10">
                  <h3 className="font-serif text-lg text-luxury-linen group-hover:text-luxury-gold transition-colors font-medium">
                    {card.title}
                  </h3>
                </div>

                {/* Bullet details */}
                <div className="p-6 flex-grow space-y-4 bg-luxury-moss/20">
                  {card.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-2.5">
                      <span className="text-luxury-gold font-semibold text-sm select-none shrink-0 mt-0.5">✓</span>
                      <p className="text-xs text-luxury-linen/70 font-light leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-luxury-moss text-luxury-linen/90 border-t border-luxury-gold/20 pt-20 pb-10 mt-auto text-left">
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
                <Link href="/inspiration" className="hover:text-luxury-gold transition-colors font-medium">Inspiration</Link>
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
    </>
  );
}
