'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 w-full">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="bg-luxury-slate/40 border border-gold/15 rounded-sm cursor-pointer transition-all duration-300 hover:border-gold/35 shadow-md"
            onClick={() => toggle(index)}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4.5 select-none">
              <h4 className="font-serif text-[15px] sm:text-[17px] text-paper font-semibold leading-snug pr-4 transition-colors duration-200 group-hover:text-gold">
                {faq.question}
              </h4>
              <span className={`text-copper text-xl font-light transition-transform duration-300 inline-block ${isOpen ? 'rotate-45 text-copper' : ''}`}>
                ＋
              </span>
            </div>
            {/* Answer Content */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="px-6 pb-5 pt-1 border-t border-gold/10">
                <p className="text-paper/70 text-sm leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
