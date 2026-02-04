"use client";

import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, ShieldCheck, CreditCard, Landmark, Smartphone, MessageCircle, AlertCircle, Check } from 'lucide-react';
import { Game, GamePackage, OrderFormData } from '@/lib/storefront/types';
import { CONTACT_INFO } from '@/lib/storefront/constants';
import { Step1OptionSelection } from './Step1OptionSelection';

interface OrderWizardProps {
  game: Game | null;
  initialPackage?: GamePackage | null;
  onClose: () => void;
}

export default function OrderWizard({ game, initialPackage, onClose }: OrderWizardProps) {
  const [step, setStep] = useState(initialPackage ? 2 : 1);
  const [selectedPkg, setSelectedPkg] = useState<GamePackage | null>(initialPackage || null);
  const [formData, setFormData] = useState<OrderFormData>({
    loginType: 'Google',
    account: '',
    password: '',
    paymentMethod: 'Bank',
    phone: '',
    isPhoneVerified: false
  });
  const [phoneError, setPhoneError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  if (!game) return null;

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const validatePhone = () => {
    const reg = /^09\d{8}$/;
    setIsValidating(true);
    
    setTimeout(() => {
      setIsValidating(false);
      if (reg.test(formData.phone)) {
        setFormData({ ...formData, isPhoneVerified: true });
        setPhoneError('');
        setTimeout(handleNext, 1200);
      } else {
        setPhoneError('格式錯誤：請輸入 09 開頭的 10 位數字');
      }
    }, 600);
  };

  const getFinalPrice = () => {
    if (!selectedPkg) return 0;
    return formData.paymentMethod === 'Convenience' ? selectedPkg.price + 30 : selectedPkg.price;
  };

  const handleFinalSubmit = () => {
    const isUidGame = game.uidOnly;
    const message = `【YH遊戲倉庫 - 訂單通知】
遊戲：${game.name}
方案：${selectedPkg?.name}
實付金額：TWD ${getFinalPrice()}
----------------------
${isUidGame ? `UID：${formData.account}` : `登入方式：${formData.loginType}
帳號：${formData.account}
密碼：${formData.password}`}
驗證手機：${formData.phone}
付款方式：${formData.paymentMethod === 'Bank' ? '銀行轉帳' : formData.paymentMethod === 'Convenience' ? '超商代碼' : 'LINE Pay'}`;
    
    const encoded = encodeURIComponent(message);
    window.open(`${CONTACT_INFO.lineLink}?text=${encoded}`, '_blank');
    onClose();
  };

  // Step validation
  const canProceed = () => {
    if (step === 1) return selectedPkg !== null;
    if (step === 2) {
      if (game.uidOnly) return formData.account.length > 0;
      return formData.account.length > 0 && formData.password.length > 0;
    }
    if (step === 3) return formData.isPhoneVerified;
    return true;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl bg-slate-900 border border-purple-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center text-sm shadow-lg shadow-purple-500/20">YH</span>
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{game.name} 快速下單</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Progress Tracker */}
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
              className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Content */}
        <div className="flex-grow overflow-y-auto p-8">
          {step === 1 && <Step1OptionSelection game={game} onNext={handleNext} />}

          {step === 2 && (
            <div className="animate-in slide-in-from-right-10 duration-300 space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <ChevronRight className="text-purple-500" /> {game.uidOnly ? '填寫遊戲 UID' : '填寫帳號與付款方式'}
                </h3>
                
                <div className="grid grid-cols-1 gap-5 bg-slate-800/20 p-6 rounded-[2rem] border border-slate-800">
                  {game.uidOnly ? (
                    <div>
                      <label className="block text-slate-500 text-xs font-black mb-2 uppercase tracking-widest">遊戲 UID</label>
                      <input 
                        type="text"
                        placeholder="請輸入正確的遊戲 UID"
                        value={formData.account}
                        onChange={e => setFormData({...formData, account: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                      <p className="mt-2 text-cyan-400 text-xs italic">免帳密儲值：請確認 UID 是否正確，以免儲值錯誤</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-500 text-xs font-black mb-2 uppercase tracking-widest">登入方式</label>
                          <select 
                            value={formData.loginType}
                            onChange={e => setFormData({...formData, loginType: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer"
                          >
                            <option>Google</option>
                            <option>Facebook</option>
                            <option>Game ID / 官方帳號</option>
                            <option>Apple ID</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-500 text-xs font-black mb-2 uppercase tracking-widest">帳號 / 信箱</label>
                          <input 
                            type="text"
                            placeholder="帳號 ID"
                            value={formData.account}
                            onChange={e => setFormData({...formData, account: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-500 text-xs font-black mb-2 uppercase tracking-widest">密碼</label>
                        <input 
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={e => setFormData({...formData, password: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-500 text-xs font-black mb-4 uppercase tracking-widest">選擇付款方式</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Bank' as const, icon: <Landmark size={20} />, label: '銀行轉帳' },
                    { id: 'Convenience' as const, icon: <CreditCard size={20} />, label: '超商代碼 (+30)' },
                    { id: 'LinePay' as const, icon: <Smartphone size={20} />, label: 'LINE Pay' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setFormData({...formData, paymentMethod: m.id})}
                      className={`flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border-2 font-bold transition-all ${formData.paymentMethod === m.id ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-slate-800 bg-slate-800/40 text-slate-500 hover:border-slate-700'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.paymentMethod === m.id ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                        {m.icon}
                      </div>
                      <span className="text-sm">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in slide-in-from-right-10 duration-300 text-center py-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 ${formData.isPhoneVerified ? 'bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.4)]' : 'bg-slate-800'}`}>
                {formData.isPhoneVerified ? <Check className="text-slate-950" size={48} /> : <ShieldCheck className="text-purple-500" size={48} />}
              </div>
              <h3 className="text-2xl font-black text-white mb-2">手機號碼驗證</h3>
              <p className="text-slate-400 mb-10">為了交易安全，我們需確認您的手機資訊</p>
              
              <div className="max-w-xs mx-auto space-y-6">
                <div className="relative">
                  <input 
                    type="text"
                    disabled={formData.isPhoneVerified}
                    placeholder="0912-345-678"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className={`w-full bg-slate-900 border rounded-[2rem] px-8 py-5 text-center text-2xl font-black tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${phoneError ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : formData.isPhoneVerified ? 'border-green-400 text-green-400' : 'border-slate-700'}`}
                  />
                  {formData.isPhoneVerified && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-green-400 flex items-center gap-1 font-bold text-xs uppercase">
                      Verified <Check size={14} />
                    </div>
                  )}
                </div>

                {phoneError && <p className="text-red-500 text-sm font-bold flex items-center justify-center gap-2"><AlertCircle size={16}/>{phoneError}</p>}
                
                {!formData.isPhoneVerified && (
                  <button 
                    onClick={validatePhone}
                    disabled={isValidating || !formData.phone}
                    className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-black py-5 rounded-[2rem] transition-all shadow-xl shadow-purple-600/20 text-lg flex items-center justify-center gap-2"
                  >
                    {isValidating ? '驗證中...' : '發送並驗證'}
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in slide-in-from-right-10 duration-300 space-y-6">
              <div className="bg-slate-800/40 border border-slate-700 rounded-[2.5rem] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" size={24} /> 訂單確認
                </h3>
                <div className="space-y-4 text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Game</span>
                    <span className="text-white font-black">{game.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Item</span>
                    <span className="text-white font-black">{selectedPkg?.name}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total</span>
                    <span className="text-3xl font-black text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">TWD {getFinalPrice()}</span>
                  </div>
                </div>
              </div>

              {formData.paymentMethod === 'Bank' ? (
                <div className="bg-purple-600/10 border border-purple-500/40 rounded-[2rem] p-8 text-center">
                  <h4 className="font-black text-purple-400 mb-4 text-lg">轉帳資訊</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                      <p className="text-slate-500 text-xs font-bold mb-1">銀行代碼 (中國信託)</p>
                      <p className="text-3xl font-black text-white">822</p>
                    </div>
                    <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                      <p className="text-slate-500 text-xs font-bold mb-1">匯款帳號</p>
                      <p className="text-2xl font-black text-white tracking-widest">1234-567-890123</p>
                    </div>
                    <p className="text-slate-400 text-xs italic mt-4">※ 匯款完畢後請務必通知 LINE 客服</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800/30 border border-slate-700 rounded-[2rem] p-8 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-3xl flex items-center justify-center text-purple-500">
                    <MessageCircle size={32} />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg mb-2">由客服提供支付連結</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">請點擊下方按鈕，專屬客服將在 LINE 為您發送超商代碼或支付碼。</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between flex-shrink-0">
          {step > 1 && step < 4 && (
            <button onClick={handleBack} className="text-slate-500 hover:text-white font-black uppercase tracking-widest text-xs transition-colors p-4">
              Back
            </button>
          )}
          <div className="flex-grow"></div>
          {step === 4 ? (
            <button 
              onClick={handleFinalSubmit}
              className="px-10 py-5 bg-[#06C755] hover:bg-[#05a345] text-slate-950 rounded-3xl font-black text-xl shadow-2xl shadow-green-500/20 flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle size={24} /> 通知客服
            </button>
          ) : step === 2 ? (
             <button 
              disabled={!canProceed()}
              onClick={handleNext}
              className="px-12 py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-3xl font-black text-xl shadow-xl transition-all flex items-center gap-3"
            >
              下一步 <ChevronRight size={24} />
            </button>
          ) : step === 1 ? (
            // Step 1 Next button is handled inside Step1OptionSelection component
            null
          ) : null}
        </div>
      </div>
    </div>
  );
}
