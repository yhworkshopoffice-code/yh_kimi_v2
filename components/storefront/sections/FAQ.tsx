"use client";

import React, { useState } from 'react';
import { FAQ_DATA } from '@/lib/storefront/constants';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-purple-500 font-black uppercase tracking-widest text-sm mb-3">FAQ</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">常見問題</h3>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => (
            <div 
              key={idx} 
              className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all ${openIndex === idx ? 'border-purple-500/30 shadow-lg shadow-purple-500/5' : 'border-slate-800'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-white pr-4">{item.question}</span>
                <ChevronDown 
                  className={`text-slate-400 flex-shrink-0 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40' : 'max-h-0'}`}
              >
                <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
