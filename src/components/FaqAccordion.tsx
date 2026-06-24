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
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="border-b border-luxury-moss pb-4 cursor-pointer group"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center py-4">
              <h4 className="font-serif text-lg sm:text-xl text-luxury-linen group-hover:text-luxury-gold transition-colors duration-300 pr-8">
                {faq.question}
              </h4>
              <span className={`text-luxury-gold text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                +
              </span>
            </div>
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-luxury-linen/70 font-light leading-relaxed pt-2 pb-4">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
