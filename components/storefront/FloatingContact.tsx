"use client";

import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/storefront/constants';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col gap-3 items-end">
      {/* IG FAB */}
      <a
        href={CONTACT_INFO.igLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3"
      >
        <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-slate-800 shadow-xl">
          IG 私訊詢問
        </span>
        <div className="w-12 h-12 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-2xl flex items-center justify-center text-white shadow-xl transform transition-transform hover:scale-110 active:scale-90">
          <Instagram size={24} />
        </div>
      </a>

      {/* LINE FAB */}
      <a
        href={CONTACT_INFO.lineLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3"
      >
        <span className="bg-[#06C755] text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
          點我私訊下單
        </span>
        <div className="w-16 h-16 bg-[#06C755] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#06C755]/30 transform transition-all hover:scale-110 active:scale-90 ring-4 ring-white/10">
          <MessageCircle size={32} />
        </div>
      </a>
    </div>
  );
}
