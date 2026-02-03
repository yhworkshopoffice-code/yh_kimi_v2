"use client";

import React from 'react';
import { StorefrontView, InfoModalType } from '@/lib/storefront/types';

interface FooterProps {
  onLinkClick: (id: string) => void;
}

export default function Footer({ onLinkClick }: FooterProps) {
  const footerLinks = {
    navigate: [
      { name: '首頁', id: 'home' },
      { name: '商城', id: 'shop' },
      { name: 'VIP制度', id: 'vip' },
      { name: '常見問題', id: 'faq' },
    ],
    legal: [
      { name: '服務條款', id: 'terms' },
      { name: '隱私政策', id: 'privacy' },
      { name: '聯絡我們', id: 'contact' },
    ]
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">YH</span>
              </div>
              <span className="text-white font-bold text-xl">YH遊戲倉庫</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              全台最安心的遊戲代儲專家，提供快速、安全、透明的遊戲儲值服務。以水豚般的穩重，守護您的每一筆遊戲資產。
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-white font-bold mb-4">快速導航</h4>
            <ul className="space-y-2">
              {footerLinks.navigate.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onLinkClick(link.id)}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">相關條款</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onLinkClick(link.id)}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} YH遊戲倉庫. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full">SSL 安全加密</span>
            <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full">24/7 客服</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
