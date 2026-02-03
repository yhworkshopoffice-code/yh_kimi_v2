"use client";

import React from 'react';
import { ExternalLink, Flame, ArrowRight } from 'lucide-react';
import { GAMES } from '@/lib/storefront/constants';
import { Game } from '@/lib/storefront/types';

interface FeaturedSectionProps {
  onOrder: (game: Game) => void;
  onBrowseShop: () => void;
}

export default function FeaturedSection({ onOrder, onBrowseShop }: FeaturedSectionProps) {
  const featured = GAMES.filter(g => g.isHot).slice(0, 3);

  return (
    <section id="hot-games" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-purple-500 font-black uppercase tracking-widest text-sm mb-3">Featured Games</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white">本週熱銷推薦</h3>
          </div>
          <button 
            onClick={onBrowseShop}
            className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-all group"
          >
            瀏覽完整商城 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featured.map((game) => (
            <div
              key={game.id}
              className="group relative bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img src={game.image} alt={game.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg shadow-red-500/40">
                  <Flame size={14} className="fill-current" /> HOT
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">{game.name}</h4>
                  <p className="text-slate-400 font-medium text-sm">{game.englishName}</p>
                </div>
                <button
                  onClick={() => onOrder(game)}
                  className="w-full py-3 bg-slate-700 hover:bg-purple-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/30"
                >
                  立即下單 <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
            <button 
                onClick={onBrowseShop}
                className="px-12 py-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-[2rem] font-black text-xl shadow-xl transition-all transform hover:scale-105"
            >
                進入遊戲商城
            </button>
        </div>
      </div>
    </section>
  );
}
