"use client";

import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, ShieldCheck, CreditCard, Landmark, Smartphone, MessageCircle, AlertCircle, Check, Copy } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { CartItem } from '@/lib/cart/types';
import { CONTACT_INFO } from '@/lib/storefront/constants';
import Image from 'next/image';

interface MultiItemCheckoutProps {
  onClose: () => void;
}

interface AccountInfo {
  loginType: 'Google' | 'Facebook' | 'GameID' | 'Apple';
  account: string;
  password: string;
  uid: string;
}

interface CheckoutData {
  items: Array<{
    cartItem: CartItem;
    accountInfo: AccountInfo;
  }>;
  paymentMethod: 'Bank' | 'Convenience' | 'LinePay';
  phone: string;
  isPhoneVerified: boolean;
}

export default function MultiItemCheckout({ onClose }: MultiItemCheckoutProps) {
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    items: items.map(item => ({
      cartItem: item,
      accountInfo: {
        loginType: 'Google',
        account: '',
        password: '',
        uid: ''
      }
    })),
    paymentMethod: 'Bank',
    phone: '',
    isPhoneVerified: false
  });
  const [phoneError, setPhoneError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(items[0]?.id || null);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const updateAccountInfo = (itemId: string, field: keyof AccountInfo, value: string) => {
    setCheckoutData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.cartItem.id === itemId 
          ? { ...item, accountInfo: { ...item.accountInfo, [field]: value } }
          : item
      )
    }));
  };

  const copyFromPrevious = (currentIndex: number) => {
    if (currentIndex === 0) return;
    const previousItem = checkoutData.items[currentIndex - 1];
    setCheckoutData(prev => ({
      ...prev,
      items: prev.items.map((item, idx) => 
        idx === currentIndex 
          ? { ...item, accountInfo: { ...previousItem.accountInfo } }
          : item
      )
    }));
  };

  const validatePhone = () => {
    const reg = /^09\d{8}$/;
    setIsValidating(true);
    
    setTimeout(() => {
      setIsValidating(false);
      if (reg.test(checkoutData.phone)) {
        setCheckoutData(prev => ({ ...prev, isPhoneVerified: true }));
        setPhoneError('');
        setTimeout(handleNext, 1200);
      } else {
        setPhoneError('格式錯誤：請輸入 09 開頭的 10 位數字');
      }
    }, 600);
  };

  const getFinalPrice = () => {
    return checkoutData.paymentMethod === 'Convenience' ? totalPrice + 30 : totalPrice;
  };

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) {
      return checkoutData.items.every(item => {
        return item.accountInfo.account.length > 0;
      });
    }
    if (step === 3) return checkoutData.isPhoneVerified;
    return true;
  };

  const handleFinalSubmit = () => {
    const messageLines = checkoutData.items.map((item, idx) => {
      return `【商品 ${idx + 1}】
遊戲：${item.cartItem.gameName}
方案：${item.cartItem.packageName}
數量：${item.cartItem.quantity}
小計：TWD ${item.cartItem.price * item.cartItem.quantity}
帳號：${item.accountInfo.account}`;
    });

    const message = `【YH遊戲倉庫 - 多筆訂單通知】
總金額：TWD ${getFinalPrice()}
付款方式：${checkoutData.paymentMethod === 'Bank' ? '銀行轉帳' : checkoutData.paymentMethod === 'Convenience' ? '超商代碼' : 'LINE Pay'}
驗證手機：${checkoutData.phone}
----------------------
${messageLines.join('\n')}`;
    
    const encoded = encodeURIComponent(message);
    window.open(`${CONTACT_INFO.lineLink}?text=${encoded}`, '_blank');
    onClose();
  };

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
        <div className="relative bg-slate-900 border border-purple-500/30 rounded-[2.5rem] p-8 text-center">
          <p className="text-white text-xl">購物車是空的</p>
          <button onClick={onClose} className="mt-4 text-purple-400">關閉</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose}></div>

      <div className="relative w-full max-w-3xl bg-slate-900 border border-purple-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center text-sm shadow-lg shadow-purple-500/20">YH</span>
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">結帳 ({items.length} 件商品)</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Progress */}
        <div className="px-8 pt-6 flex-shrink-0">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`flex flex-col items-center gap-1 transition-opacity ${step >= s ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 ${step >= s ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                  {s}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">確認商品</h3>
              {checkoutData.items.map((item) => (
                <div key={item.cartItem.id} className="bg-slate-800/30 border border-slate-700 rounded-2xl p-4 flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                    <Image
                      src={item.cartItem.gameImage}
                      alt={item.cartItem.gameName}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{item.cartItem.gameName}</h4>
                    <p className="text-slate-400 text-sm">{item.cartItem.packageName}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-slate-500">x{item.cartItem.quantity}</span>
                      <span className="text-cyan-400 font-bold">
                        NT${(item.cartItem.price * item.cartItem.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
