"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { StorefrontView } from '@/lib/storefront/types';

interface NavbarProps {
  onNavigate: (page: StorefrontView) => void;
  currentPage: StorefrontView;
  onContactClick: () => void;
}

export default function Navbar({ onNavigate, currentPage, onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);

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

  const navLinks = [
    { name: '首頁', id: 'home', action: () => onNavigate('home') },
    { name: '商城', id: 'shop', action: () => onNavigate('shop') },
    { name: 'VIP制度', id: 'vip', action: () => { onNavigate('home'); setTimeout(() => document.getElementById('vip')?.scrollIntoView({behavior: 'smooth'}), 100); } },
    { name: '聯絡我們', id: 'contact', action: onContactClick },
  ];

  return (
    <nav 
      className={`fixed w-full z-[60] transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-10' : '-translate-y-full'} ${scrolled || currentPage === 'shop' ? 'bg-slate-950/90 backdrop-blur-md py-3 shadow-lg border-b border-purple-500/20' : 'bg-transparent py-5'}`}
      style={{ top: isVisible ? '0' : '-80px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl">YH</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">YH遊戲倉庫</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => {
                  e.preventDefault();
                  link.action();
                }}
                className={`text-slate-300 hover:text-cyan-400 transition-colors font-bold text-sm lg:text-base ${currentPage === link.id ? 'text-cyan-400 neon-text-cyan' : ''}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => onNavigate('shop')}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-6 py-2.5 rounded-full font-black transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/30 flex items-center gap-2"
            >
              <ShoppingCart size={18} /> 快速下單
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full transition-all duration-300 ${isOpen ? 'top-full opacity-100' : '-top-[600px] opacity-0'} bg-slate-900 border-b border-purple-500/20 shadow-2xl`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { link.action(); setIsOpen(false); }}
              className="block w-full text-left flex items-center gap-4 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 px-3 py-4 rounded-xl transition-all"
            >
              <span className="text-lg font-bold">{link.name}</span>
            </button>
          ))}
          <div className="pt-4">
            <button
              onClick={() => { onNavigate('shop'); setIsOpen(false); }}
              className="block w-full text-center bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} /> 進入商城
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
