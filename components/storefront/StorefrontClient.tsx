"use client";

import React, { useState, useCallback } from 'react';
import { Game, StorefrontView, InfoModalType, GamePackage } from '@/lib/storefront/types';
import { DEFAULT_GAME } from '@/lib/storefront/constants';

// Components
import Ticker from './Ticker';
import Navbar from './Navbar';
import FloatingContact from './FloatingContact';

// Sections
import HeroCarousel from './sections/HeroCarousel';
import ProcessSteps from './sections/ProcessSteps';
import Partners from './sections/Partners';
import FeaturedSection from './sections/FeaturedSection';
import PriceList from './sections/PriceList';
import VIPSection from './sections/VIPSection';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ShopView from './ShopView';

// Modals
import OrderWizard from './modals/OrderWizard';
import InfoModal from './modals/InfoModal';

export default function StorefrontClient() {
  const [view, setView] = useState<StorefrontView>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<GamePackage | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);

  // Handle starting an order - with optional game and package
  const handleStartOrder = useCallback((game?: Game, pkg?: GamePackage) => {
    if (game) {
      setSelectedGame(game);
    } else {
      setSelectedGame(DEFAULT_GAME);
    }
    setSelectedPackage(pkg || null);
    setIsWizardOpen(true);
  }, []);

  // Handle navigation between home and shop
  const handleNavigate = useCallback((page: StorefrontView) => {
    setView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle contact scroll - scrolls to contact section or navigates home first
  const handleContactScroll = useCallback(() => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById('contact-footer');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('contact-footer');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [view]);

  // Handle footer link clicks
  const handleFooterLink = useCallback((id: string) => {
    switch (id) {
      case 'home':
        handleNavigate('home');
        break;
      case 'shop':
        handleNavigate('shop');
        break;
      case 'vip':
        setInfoModal('vip');
        break;
      case 'terms':
        setInfoModal('terms');
        break;
      case 'privacy':
        setInfoModal('privacy');
        break;
      case 'contact':
        handleContactScroll();
        break;
      case 'faq':
        if (view !== 'home') {
          setView('home');
          setTimeout(() => {
            document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      default:
        break;
    }
  }, [handleNavigate, handleContactScroll, view]);

  return (
    <div className={`min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 ${infoModal ? 'overflow-hidden' : ''}`}>
      <Ticker />
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={view} 
        onContactClick={handleContactScroll}
      />
      
      <main className="transition-all duration-500">
        {view === 'home' ? (
          <div className="animate-in fade-in duration-700">
            <HeroCarousel onStartOrder={() => handleNavigate('shop')} />
            <ProcessSteps />
            <Partners />
            <FeaturedSection 
              onOrder={handleStartOrder} 
              onBrowseShop={() => handleNavigate('shop')} 
            />
            <PriceList />
            <VIPSection onOpenVIP={() => setInfoModal('vip')} />
            <FAQ />
            <Contact />
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <ShopView 
              onBack={() => handleNavigate('home')} 
              onOrder={handleStartOrder} 
            />
          </div>
        )}
      </main>

      <Footer onLinkClick={handleFooterLink} />
      
      {/* Interactive Elements */}
      <FloatingContact />
      
      {/* Order Wizard Modal */}
      {isWizardOpen && (
        <OrderWizard 
          game={selectedGame} 
          initialPackage={selectedPackage}
          onClose={() => {
            setIsWizardOpen(false);
            setSelectedPackage(null);
          }} 
        />
      )}

      {/* Info Modal */}
      {infoModal && (
        <InfoModal 
          type={infoModal} 
          onClose={() => setInfoModal(null)} 
        />
      )}
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[5%] w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_cyan]"></div>
        <div className="absolute top-[40%] right-[10%] w-1 h-1 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_purple] delay-700"></div>
        <div className="absolute bottom-[20%] left-[15%] w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_cyan] delay-1000"></div>
      </div>
    </div>
  );
}
