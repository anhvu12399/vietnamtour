'use client';

import React, { useState, useEffect } from 'react';

export default function WhatsAppFloating() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay for smooth entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/84988600388"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center group bg-[#0a231c] text-[#c5a880] border border-[#c5a880]/40 hover:border-[#c5a880] px-4 py-3 rounded-full shadow-2xl transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] transform scale-100 hover:scale-105"
      aria-label="Chat with a Specialist on WhatsApp"
    >
      {/* Golden Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-[#c5a880]/10 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '3s' }} />

      {/* WhatsApp Golden Icon */}
      <svg
        className="w-5 h-5 fill-current shrink-0 transition-transform duration-500 group-hover:rotate-[15deg]"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.425 1.451 5.432.003 9.851-4.413 9.854-9.85.002-2.634-1.02-5.11-2.881-6.973-1.861-1.863-4.337-2.887-6.971-2.888-5.439 0-9.859 4.417-9.862 9.853-.001 1.936.505 3.826 1.466 5.475l-.98 3.578 3.673-.963zm9.733-5.324c-.266-.134-1.576-.778-1.82-.866-.245-.09-.423-.134-.6.134-.178.267-.689.866-.844 1.044-.156.178-.311.201-.577.067-.266-.134-1.124-.414-2.142-1.322-.792-.707-1.327-1.58-1.482-1.847-.156-.267-.017-.411.117-.544.121-.119.266-.312.4-.467.133-.156.178-.267.266-.445.089-.178.045-.334-.022-.467-.067-.134-.6-1.446-.823-1.98-.217-.523-.436-.453-.6-.461-.168-.008-.36-.01-.553-.01-.193 0-.507.073-.772.36-.266.287-1.016.992-1.016 2.42s1.038 2.81 1.182 3.002c.145.193 2.043 3.12 4.95 4.373.692.298 1.232.476 1.653.61.695.221 1.328.19 1.827.115.556-.083 1.576-.644 1.8-.1.264-.224.22-.38.089-.506z" />
      </svg>

      {/* Luxury Sliding Text label */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out font-serif text-[11px] uppercase tracking-[0.2em] font-semibold text-right select-none whitespace-nowrap ml-0 group-hover:ml-3">
        Chat on WhatsApp
      </span>
    </a>
  );
}
