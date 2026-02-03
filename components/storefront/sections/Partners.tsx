"use client";

import React from 'react';
import { PARTNERS } from '@/lib/storefront/constants';
import { BadgeCheck, Quote } from 'lucide-react';

export default function Partners() {
  return (
    <section className="py-24 bg-slate-900/30 border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-purple-500 font-black uppercase tracking-widest text-sm mb-3">Trusted Partners</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">實況主與戰隊信賴推薦</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNERS.map((partner) => (
            <div key={partner.id} className="group bg-slate-900/80 border border-slate-800 rounded-[2rem] p-6 hover:border-purple-500/30 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center gap-4 mb-4">
                <img src={partner.avatar} alt={partner.name} className="w-14 h-14 rounded-full border-2 border-slate-700" />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-white">{partner.name}</h4>
                    {partner.isVerified && <BadgeCheck className="text-cyan-400" size={16} />}
                  </div>
                  <p className="text-slate-500 text-xs font-bold">{partner.mainGame}</p>
                </div>
              </div>
              <div className="relative">
                <Quote className="absolute -top-2 -left-1 text-slate-800" size={20} />
                <p className="text-slate-400 text-sm leading-relaxed pl-4 italic">{partner.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
