'use client';

import { useEffect, useRef, useState } from 'react';

const stops = [
  {
    num: '01',
    label: 'Hanoi',
    day: 'Days 1–2 · Old Quarter & French Quarter',
    cx: 120,
    cy: 40,
    tx: 142,
    tyNum: 30,
    tyLabel: 48,
    tyDay: 64,
    align: 'start',
  },
  {
    num: '02',
    label: 'Halong Bay',
    day: 'Days 3–5 · Private Junk',
    cx: 160,
    cy: 240,
    tx: 182,
    tyNum: 230,
    tyLabel: 248,
    tyDay: 264,
    align: 'start',
  },
  {
    num: '03',
    label: 'Hue',
    day: 'Days 6–7 · Imperial Citadel',
    cx: 420,
    cy: 320,
    tx: 442,
    tyNum: 310,
    tyLabel: 328,
    tyDay: 344,
    align: 'start',
  },
  {
    num: '04',
    label: 'Hoi An',
    day: 'Days 8–10 · Ancient Town',
    cx: 340,
    cy: 470,
    tx: 230,
    tyNum: 490,
    tyLabel: 508,
    tyDay: 524,
    align: 'end',
  },
  {
    num: '05',
    label: 'Saigon',
    day: 'Days 11–12 · District 1',
    cx: 700,
    cy: 540,
    tx: 722,
    tyNum: 530,
    tyLabel: 548,
    tyDay: 564,
    align: 'start',
  },
  {
    num: '06',
    label: 'Mekong Delta',
    day: 'Days 13–14 · River Passage',
    cx: 980,
    cy: 600,
    tx: 880,
    tyNum: 592,
    tyLabel: 610,
    tyDay: 626,
    align: 'end',
  },
];

export default function SignatureMap() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="route"
      className="bg-ink text-paper py-24 lg:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-5xl">
          <h2 className="font-serif text-3xl md:text-5xl text-paper font-light tracking-wide leading-tight">
            A single ribbon of silk,<br className="hidden sm:block" />
            drawn the length of the coast.
          </h2>
          <p className="max-w-md text-sm md:text-base text-celadon/90 font-light leading-relaxed">
            Our signature fourteen-night passage — north to south, mountain to delta. 
            Every stop below can be lengthened, shortened, or set aside entirely.
          </p>
        </div>

        {/* Route Map SVG Wrap */}
        <div 
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Desktop SVG Map */}
          <div className="hidden md:block w-full">
            <svg viewBox="0 0 1160 640" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              {/* Route line */}
              <path
                className="stroke-gold fill-none stroke-[2px] transition-all duration-[2400ms]"
                style={{
                  strokeDasharray: 1500,
                  strokeDashoffset: isVisible ? 0 : 1500,
                  transitionTimingFunction: 'cubic-bezier(.2,.7,.2,1)',
                }}
                d="M120,40 C 260,90 40,180 160,240 C 280,300 460,230 420,320 C 380,410 220,400 340,470 C 460,540 640,470 700,540 C 760,610 900,560 980,600"
              />

              {/* Stops Group */}
              {stops.map((stop, index) => (
                <g key={stop.num} className="select-none">
                  {/* Stop dot marker */}
                  <circle
                    cx={stop.cx}
                    cy={stop.cy}
                    r="7"
                    className="fill-paper stroke-gold stroke-[2px] transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                      transformOrigin: `${stop.cx}px ${stop.cy}px`,
                      transitionDelay: `${index * 250 + 400}ms`,
                    }}
                  />

                  {/* Stop Information */}
                  <text
                    x={stop.tx}
                    y={stop.tyNum}
                    textAnchor={stop.align === 'end' ? 'end' : 'start'}
                    className="font-mono text-[11px] fill-gold-soft font-semibold transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${index * 250 + 600}ms`,
                    }}
                  >
                    {stop.num}
                  </text>
                  <text
                    x={stop.tx}
                    y={stop.tyLabel}
                    textAnchor={stop.align === 'end' ? 'end' : 'start'}
                    className="font-serif text-[14px] font-semibold fill-paper transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${index * 250 + 700}ms`,
                    }}
                  >
                    {stop.label}
                  </text>
                  <text
                    x={stop.tx}
                    y={stop.tyDay}
                    textAnchor={stop.align === 'end' ? 'end' : 'start'}
                    className="font-mono text-[10px] fill-celadon transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${index * 250 + 800}ms`,
                    }}
                  >
                    {stop.day}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Mobile Linear List representation for readability */}
          <div className="block md:hidden space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gold/30">
            {stops.map((stop, index) => (
              <div 
                key={stop.num} 
                className="flex items-start gap-6 relative transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Dot */}
                <div className="w-[31px] h-[31px] flex-shrink-0 rounded-full bg-ink border-2 border-gold flex items-center justify-center z-10">
                  <span className="font-mono text-[10px] text-gold-soft font-bold">
                    {stop.num}
                  </span>
                </div>
                {/* Info */}
                <div className="space-y-1 pt-1">
                  <h4 className="font-serif text-base font-semibold text-paper leading-none">
                    {stop.label}
                  </h4>
                  <p className="font-mono text-xs text-celadon">
                    {stop.day}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
