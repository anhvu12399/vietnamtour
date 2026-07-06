'use client';

import dynamic from 'next/dynamic';

const ItineraryMap = dynamic(() => import('./ItineraryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-paper-dim flex items-center justify-center border border-line">
      <span className="text-xs uppercase tracking-widest text-ink-soft">Loading interactive map...</span>
    </div>
  ),
});

export default ItineraryMap;
