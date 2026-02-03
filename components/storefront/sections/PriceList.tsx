"use client";

import React from 'react';
import { POKEMON_GO_PRICES } from '@/lib/storefront/constants';
import { TrendingDown } from 'lucide-react';

export default function PriceList() {
  return (
    <section id="pricing" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-purple-500 font-black uppercase tracking-widest text-sm mb-3">Pricing</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-4">透明優惠價格</h3>
          <p className="text-slate-400">以 Pokemon Go 為例，所有價格均明碼標示</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {POKEMON_GO_PRICES.map((item) => (
            <div key={item.id} className="group bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">{item.package}</h4>
                <div className="bg-green-500/10 text-green-400 px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1">
                  <TrendingDown size={12} /> 優惠
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-slate-500 line-through text-sm">{item.originalPrice}</span>
                <span className="text-2xl font-black text-white">{item.discountPrice}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">* 實際價格依遊戲幣種與匯率浮動，以結帳頁面為準</p>
        </div>
      </div>
    </section>
  );
}
