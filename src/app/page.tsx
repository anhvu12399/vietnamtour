import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedItineraries, getAccommodations, getSpecialists } from '@/sanity/client';

export const revalidate = 3600;

export default async function HomePage() {
  const [itineraries, accommodations, specialists] = await Promise.all([
    getFeaturedItineraries(),
    getAccommodations(),
    getSpecialists()
  ]);

  return (
    <>
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80"
            alt="Lan Ha Bay, Vietnam"
            fill
            className="object-cover brightness-75 scale-105 transition-transform duration-[10s] hover:scale-100"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-luxury-charcoal/25 to-luxury-charcoal/40 z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6 text-white animate-fade-in space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-luxury-gold">
            Bespoke Luxury Travel
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-tight font-medium">
            Extraordinary Vietnam
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-light tracking-wide text-white/80 max-w-2xl mx-auto leading-relaxed">
            Tailor-made itineraries, ultra-luxury retreats, and private cultural expeditions curated by destination experts.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/enquire"
              className="w-full sm:w-auto px-8 py-3.5 bg-luxury-gold hover:bg-luxury-gold/90 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-lg"
            >
              Enquire Online
            </Link>
            <a
              href="#journeys"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/50 hover:border-white text-white bg-transparent hover:bg-white/10 font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none"
            >
              Explore Journeys
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:block">
          <a href="#journeys" aria-label="Scroll down">
            <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* 2. Brand Value Pitch Section */}
      <section className="bg-luxury-sand py-24 border-y border-luxury-gold/20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-serif text-2xl lg:text-4xl text-luxury-charcoal font-medium">
            The Art of Customised Travel
          </h2>
          <div className="h-[1px] w-24 bg-luxury-gold mx-auto" />
          <p className="font-serif italic text-lg sm:text-xl text-luxury-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            &ldquo;We don&rsquo;t believe in pre-packaged tours. Your journey to Vietnam will be drafted from a blank page, aligned with your personal pacing, style, and culinary wishes.&rdquo;
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="space-y-3">
              <h3 className="font-serif text-lg text-luxury-charcoal font-medium">Bespoke Curation</h3>
              <p className="text-xs sm:text-sm text-luxury-charcoal/70 font-light leading-relaxed">
                Handpicked boutique stays, private regional flights, and customized daily activities configured for you.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg text-luxury-charcoal font-medium">True Local Expertise</h3>
              <p className="text-xs sm:text-sm text-luxury-charcoal/70 font-light leading-relaxed">
                Consultants who have lived, traveled, and thoroughly explored Vietnam to bring you real insider insight.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg text-luxury-charcoal font-medium">Peace of Mind</h3>
              <p className="text-xs sm:text-sm text-luxury-charcoal/70 font-light leading-relaxed">
                Full ATOL and ABTA security, with 24/7 localized support from arrival to departure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Journeys */}
      <section id="journeys" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              Tailor-Made Options
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-medium">
              Curated Itineraries
            </h2>
          </div>
          <p className="text-sm text-luxury-charcoal/60 font-light max-w-md leading-relaxed">
            Get inspired by our popular itineraries. You can personalize any element, length of stay, or selection of resorts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itineraries.map((it) => (
            <div key={it._id} className="group flex flex-col bg-white border border-luxury-sand overflow-hidden transition-all duration-300 hover:shadow-xl">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={it.gallery[0]}
                  alt={it.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-luxury-charcoal text-white text-[10px] tracking-widest uppercase font-semibold px-3 py-1">
                  {it.duration} Days
                </div>
              </div>

              {/* Body */}
              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-luxury-charcoal group-hover:text-luxury-gold transition-colors font-medium leading-snug">
                    {it.title}
                  </h3>
                  <p className="text-xs text-luxury-charcoal/60 font-light leading-relaxed line-clamp-3">
                    {it.intro}
                  </p>
                </div>

                <div className="pt-6 border-t border-luxury-sand flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-luxury-charcoal/50 block font-light">From</span>
                    <span className="text-base font-semibold text-luxury-charcoal">£{it.priceFrom.toLocaleString('en-GB')}pp</span>
                  </div>
                  <Link
                    href={`/itineraries/${it.slug.current}`}
                    className="text-xs uppercase tracking-widest font-semibold text-luxury-gold group-hover:underline flex items-center space-x-1"
                  >
                    <span>View Trip</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Luxury Accommodation Section */}
      <section id="accommodations" className="bg-luxury-sand py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              Elite Retreats
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-medium">
              Featured Luxury Stays
            </h2>
            <div className="h-[1px] w-16 bg-luxury-gold mx-auto mt-4" />
            <p className="text-sm text-luxury-charcoal/65 font-light leading-relaxed">
              We partner only with Vietnam&rsquo;s most premium, private resorts to guarantee absolute seclusion, customized spa programs, and fine dining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {accommodations.map((acc) => (
              <div key={acc._id} className="bg-white border border-luxury-sand p-4 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 sm:h-auto w-full sm:w-48 md:w-56 shrink-0 overflow-hidden">
                  <Image
                    src={acc.gallery[0]}
                    alt={acc.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between py-2 pr-2">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-luxury-gold font-semibold block">{acc.rating}</span>
                      <h3 className="font-serif text-lg text-luxury-charcoal font-semibold">{acc.name}</h3>
                      <p className="text-xs text-luxury-charcoal/50 italic">{acc.location}</p>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {acc.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="text-[10px] bg-luxury-sand text-luxury-charcoal/80 px-2 py-0.5 rounded-none font-medium">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-luxury-sand flex items-center justify-between">
                    <span className="text-[10px] uppercase text-luxury-charcoal/50 font-light">Featured accommodation</span>
                    <a
                      href={acc.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-luxury-gold hover:underline flex items-center space-x-1"
                    >
                      <span>Website</span>
                      <span className="text-[9px]">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Specialist Spotlight */}
      <section id="specialists" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
            Local Curators
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal font-medium">
            Meet Our Travel Experts
          </h2>
          <div className="h-[1px] w-16 bg-luxury-gold mx-auto mt-4" />
          <p className="text-sm text-luxury-charcoal/65 font-light leading-relaxed">
            Our experts travel to Vietnam regularly, mapping out new adventures and building close ties with local hosts to ensure your itinerary runs perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {specialists.map((spec) => (
            <div key={spec._id} className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <div className="relative w-36 h-36 rounded-full overflow-hidden shrink-0 border-2 border-luxury-gold/30">
                <Image
                  src={spec.image}
                  alt={spec.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 flex-grow">
                <div>
                  <h3 className="font-serif text-xl text-luxury-charcoal font-semibold">{spec.name}</h3>
                  <p className="text-xs text-luxury-gold uppercase tracking-wider font-semibold">{spec.role}</p>
                </div>
                <p className="text-xs sm:text-sm text-luxury-charcoal/75 font-light leading-relaxed">
                  {spec.bio[0].children[0].text}
                </p>
                <div className="pt-2 text-xs space-y-1">
                  <p className="text-luxury-charcoal/60">📍 Favorite Area: <span className="font-medium text-luxury-charcoal">{spec.favoriteDestinations.join(', ')}</span></p>
                  <p className="text-luxury-charcoal/70 font-semibold">📞 Direct UK: <a href={`tel:${spec.phone?.replace(/\s+/g, '')}`} className="text-luxury-gold hover:underline">{spec.phone}</a></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Editorial CTA Banner */}
      <section className="relative bg-luxury-charcoal text-white py-24 overflow-hidden">
        {/* Decorative subtle texture/glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(186,153,106,0.15),transparent_50%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
            Design Your Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-snug">
            Ready to Begin Planning Your Custom Trip?
          </h2>
          <p className="text-sm sm:text-base font-light text-white/70 max-w-2xl mx-auto leading-relaxed">
            Contact us today. We will match you with one of our Vietnam specialists to draft a bespoke itinerary matching your preferred pacing and luxury hotels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href="/enquire"
              className="w-full sm:w-auto px-10 py-4 bg-luxury-gold hover:bg-luxury-gold/90 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none shadow-lg"
            >
              Start Planning
            </Link>
            <a
              href="tel:+442078459200"
              className="text-sm font-semibold tracking-wider text-luxury-gold hover:text-white transition-colors"
            >
              Or Call +44 (0) 20 7845 9200
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
