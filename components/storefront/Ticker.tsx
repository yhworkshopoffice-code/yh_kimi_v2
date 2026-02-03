"use client";

import React from 'react';
import { Sparkles, Zap, Shield, Clock } from 'lucide-react';

export default function Ticker() {
  const items = [
    { icon: Sparkles, text: "全台最優惠匯率" },
    { icon: Zap, text: "5-10分鐘極速到帳" },
    { icon: Shield, text: "100% 正軌安全" },
    { icon: Clock, text: "24/7 全年無休" },
  ];

  return (
    <div className="fixed top-0 w-full z-[70] bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-8 text-xs font-bold text-slate-400 flex-wrap">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <item.icon className="w-3.5 h-3.5 text-cyan-400" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
