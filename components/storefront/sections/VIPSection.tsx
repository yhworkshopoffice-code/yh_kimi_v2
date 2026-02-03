"use client";

import React from 'react';
import { VIP_LEVELS } from '@/lib/storefront/constants';
import { Crown } from 'lucide-react';

interface VIPSectionProps {
  onOpenVIP: () => void;
}

export default function VIPSection({ onOpenVIP }: VIPSectionProps) {
  return (
    <section id="vip" className="py-24 bg-slate-900/50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-4">
            <Crown size={16} /> VIP 會員制度
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-4">加入水豚大家族</h3>
          <p className="text-slate-400">累積消費自動升級，享受更多專屬權益</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {VIP_LEVELS.map((vip, idx) => (
            <div key={idx} className={`relative bg-slate-800 rounded-[2.5rem] p-8 border border-slate-700 hover:border-purple-500/30 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 group`}>
              <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${vip.color} rounded-t-[2.5rem] opacity-60`}></div>
              
              <div className="text-center mb-6">
                <h4 className="text-xl font-black text-white mb-2">{vip.name}</h4>
                <p className="text-slate-500 text-sm font-bold">{vip.threshold}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {vip.benefits.map((benefit, bidx) => (
                  <li key={bidx} className="flex items-center gap-3 text-slate-300 text-sm">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${vip.color}`}></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenVIP}
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-bold transition-all"
              >
                了解更多
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
