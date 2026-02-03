"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, UserCircle2, CreditCard, Sparkles, ChevronRight, Search, LayoutGrid } from 'lucide-react';
import { GAMES } from '@/lib/storefront/constants';
import { Game, GameCategory } from '@/lib/storefront/types';

interface ShopViewProps {
  onBack: () => void;
  onOrder: (game: Game) => void;
}

export default function ShopView({ onBack, onOrder }: ShopViewProps) {
  const [activeTab, setActiveTab] = useState<GameCategory>('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const filteredGames = GAMES.filter(g => 
    g.category === activeTab && 
    (g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     g.englishName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const tabs = [
    { id: 'hot' as const, label: '近期熱門', icon: <Flame size={20} />, desc: '最受歡迎代儲項目' },
    { id: 'uid' as const, label: 'UID 直儲', icon: <UserCircle2 size={20} />, desc: '免帳密，極速入帳' },
    { id: 'card' as const, label: '點卡專區', icon: <CreditCard size={20} />, desc: 'MyCard / 禮品卡' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row pt-32 lg:pt-36">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col w-80 bg-slate-900/50 border-r border-slate-800 h-[calc(100vh-144px)] sticky p-8 shadow-2xl shadow-black transition-all duration-300 ${isVisible ? 'top-32 lg:top-36 opacity-100' : 'top-10 opacity-0 pointer-events-none'}`}>
        <div className="mb-10">
          <h2 className="text-2xl font-black text-white mb-2 tracking-tighter">遊戲商城庫</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Game Store Category</p>
        </div>

        <nav className="flex-grow space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all group ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                {tab.icon}
              </div>
              <div className="text-left">
                <div className="font-black text-sm">{tab.label}</div>
                <div className={`text-[10px] font-bold opacity-60 ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`}>
                  {tab.desc}
                </div>
              </div>
              {activeTab === tab.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-800">
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-slate-500 hover:text-white hover:bg-slate-800 transition-all font-black text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={18} /> 返回首頁
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation Slider */}
      <div 
        className={`lg:hidden flex flex-col w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 fixed z-40 transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        style={{ top: '124px' }}
      >
        <div className="flex overflow-x-auto p-4 gap-3 no-scrollbar scroll-smooth">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap shadow-sm ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-purple-500/20' : 'bg-slate-800 text-slate-400'}`}
            >
              {tab.label}
            </button>
          ))}
          <button 
            onClick={onBack}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm bg-slate-800 text-slate-400"
          >
            <ArrowLeft size={16} /> 返回
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="flex-grow p-6 lg:p-12 min-h-[calc(100vh-144px)]">
        <div className="max-w-6xl mx-auto">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black text-white flex items-center gap-4">
                {tabs.find(t => t.id === activeTab)?.label}專區
                {activeTab === 'hot' && <Flame size={32} className="text-orange-500 animate-pulse drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />}
              </h2>
              <p className="text-slate-500 mt-3 font-bold text-sm lg:text-base">精選全球熱門遊戲，提供最即時的儲值方案</p>
            </div>

            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="搜尋遊戲名稱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl pl-14 pr-6 py-4 text-white font-bold placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Special Tip for UID Direct */}
          {activeTab === 'uid' && (
            <div className="mb-10 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-[2.5rem] flex items-start gap-5 text-cyan-400 shadow-2xl shadow-cyan-500/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="font-black text-xl mb-1">什麼是 UID 直儲？</p>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  這是一種最安全的儲值方式！您只需要提供遊戲內的 UID 編號（通常在設置或頭像旁），我們即可直接將資源入帳。
                  <span className="block mt-1 font-black text-xs uppercase tracking-widest text-white/40">No Account Password Required</span>
                </p>
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => onOrder(game)}
                className="group relative cursor-pointer bg-slate-900/80 border border-slate-800/50 rounded-[2.5rem] overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5),0_10px_30px_rgba(168,85,247,0.1)]"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Hover Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-purple-600/10 backdrop-blur-[2px]">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      <LayoutGrid size={28} />
                    </div>
                  </div>

                  {game.isHot && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/30">
                      Hot
                    </div>
                  )}
                </div>
                
                <div className="p-7">
                  <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">{game.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                      {game.englishName}
                    </span>
                    <div className="h-1 w-8 bg-slate-800 rounded-full group-hover:w-12 group-hover:bg-purple-500 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredGames.length === 0 && (
            <div className="py-48 text-center flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center justify-center text-slate-700 shadow-inner">
                <Search size={40} />
              </div>
              <div className="max-w-sm">
                <p className="text-slate-300 text-2xl font-black">沒找到這款遊戲？</p>
                <p className="text-slate-500 mt-3 font-bold leading-relaxed">庫存可能尚未更新，或者這是一款隱藏版服務，請直接點擊客服諮詢卡皮！</p>
              </div>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTab('hot'); }}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-sm transition-all border border-slate-700"
              >
                回到熱門推薦
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
