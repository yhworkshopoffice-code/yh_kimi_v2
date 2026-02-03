"use client";

import React from 'react';
import { CONTACT_INFO } from '@/lib/storefront/constants';
import { MessageCircle, Instagram, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact-footer" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-purple-500 font-black uppercase tracking-widest text-sm mb-3">Contact</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">聯絡我們</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* LINE */}
          <a
            href={CONTACT_INFO.lineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-[#06C755]/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-[#06C755]/10 text-center"
          >
            <div className="w-16 h-16 bg-[#06C755] rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110">
              <MessageCircle className="text-white" size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">LINE 官方帳號</h4>
            <p className="text-slate-400 text-sm mb-2">最快回覆，即時下單</p>
            <p className="text-[#06C755] font-bold">{CONTACT_INFO.line}</p>
          </a>

          {/* Instagram */}
          <a
            href={CONTACT_INFO.igLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-pink-500/50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-500/10 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110">
              <Instagram className="text-white" size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Instagram</h4>
            <p className="text-slate-400 text-sm mb-2">最新活動與優惠資訊</p>
            <p className="text-pink-400 font-bold">@{CONTACT_INFO.instagram}</p>
          </a>

          {/* Email */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="text-slate-400" size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">電子郵件</h4>
            <p className="text-slate-400 text-sm mb-2">業務合作與建議</p>
            <p className="text-cyan-400 font-bold text-sm">support@yh-store.com</p>
          </div>

          {/* Hours */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="text-slate-400" size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">服務時間</h4>
            <p className="text-slate-400 text-sm mb-2">全年無休</p>
            <p className="text-cyan-400 font-bold">24 小時服務</p>
          </div>
        </div>
      </div>
    </section>
  );
}
