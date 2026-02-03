"use client";

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { InfoModalType } from '@/lib/storefront/types';
import { TERMS_CONTENT, PRIVACY_CONTENT, VIP_CONTENT } from '@/lib/storefront/constants';

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
}

export default function InfoModal({ type, onClose }: InfoModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus trap and escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const getContent = () => {
    switch (type) {
      case 'terms':
        return { title: '服務條款', content: TERMS_CONTENT };
      case 'privacy':
        return { title: '隱私政策', content: PRIVACY_CONTENT };
      case 'vip':
        return { title: 'VIP 會員制度', content: VIP_CONTENT };
      default:
        return { title: '', content: '' };
    }
  };

  const { title, content } = getContent();

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    const lines = text.trim().split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl font-black text-white mb-6">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-xl font-bold text-purple-400 mt-8 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-lg font-bold text-white mt-6 mb-3">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={idx} className="text-slate-400 ml-4 mb-2">{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-4"></div>;
      }
      return <p key={idx} className="text-slate-400 leading-relaxed mb-4">{line}</p>;
    });
  };

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      <div 
        ref={contentRef}
        className="relative w-full max-w-2xl bg-slate-900 border border-purple-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-black text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8">
          <div className="prose prose-invert max-w-none">
            {renderContent(content)}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex-shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
