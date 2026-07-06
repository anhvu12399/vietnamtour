'use client';

import React from 'react';

interface RoutePoint {
  id: string;
  name: string;
  color: string;
  region: string;
}

interface Props {
  points: RoutePoint[];
}

export default function RouteStrip({ points }: Props) {
  if (points.length === 0) return null;

  return (
    <div className="bg-jade-deep/10 border border-jade-deep/20 p-5 rounded-none flex items-center justify-start overflow-x-auto w-full select-none gap-4 no-scrollbar">
      <div className="flex items-center space-x-3 shrink-0 mr-4">
        <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Expedition Route</span>
        <span className="text-xs text-ink/40">|</span>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        {points.map((pt, idx) => (
          <React.Fragment key={pt.id}>
            <div className="flex items-center space-x-2 bg-white border border-line px-3 py-1.5 shadow-xs">
              <span className={`w-2 h-2 rounded-full shrink-0`} style={{
                backgroundColor: pt.color === 'jade' ? '#1b4332' : pt.color === 'gold' ? '#c5a880' : '#8B0000'
              }} />
              <span className="font-serif text-xs font-semibold text-ink">{pt.name}</span>
            </div>
            
            {idx < points.length - 1 && (
              <span className="text-gold font-semibold text-xs leading-none">➔</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
