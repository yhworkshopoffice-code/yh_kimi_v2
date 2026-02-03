"use client";

import React from 'react';
import { Gamepad2, ShieldCheck, Send, Zap, ChevronRight } from 'lucide-react';

export default function ProcessSteps() {
  const steps = [
    {
      icon: <Gamepad2 className="text-purple-400" size={32} />,
      title: "選購遊戲方案",
      desc: "在商城選擇遊戲與面額，並填寫帳號資料。"
    },
    {
      icon: <ShieldCheck className="text-cyan-400" size={32} />,
      title: "付款與驗證",
      desc: "選擇付款方式，並完成手機號碼安全驗證。"
    },
    {
      icon: <Send className="text-purple-400" size={32} />,
      title: "發送繳費收據",
      desc: "系統將自動跳轉 LINE，請將繳費證明傳給客服。"
    },
    {
      icon: <Zap className="text-cyan-400" size={32} />,
      title: "坐等極速入帳",
      desc: "客服確認款項無誤後，將於 5-10 分鐘內完成。"
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">簡單 4 步，極速入帳</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group text-center">
              <div className="mb-6 mx-auto w-24 h-24 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center transform transition-all group-hover:scale-110 group-hover:rotate-3 group-hover:border-purple-500/50 shadow-xl">
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-[10px] font-black text-white">
                  STEP 0{idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed px-4">{step.desc}</p>
              
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] pointer-events-none opacity-20">
                   <ChevronRight className="text-slate-400" size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
