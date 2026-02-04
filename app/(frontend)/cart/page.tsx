"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { useCartValidation } from "@/lib/cart/useCartValidation";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, AlertTriangle } from "lucide-react";
import MultiItemCheckout from "@/components/cart/MultiItemCheckout";

export default function CartPage() {
  const { items, totalPrice, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const { isValid, unavailableItems, priceChangedItems } = useCartValidation(items);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShoppingCart size={80} className="mx-auto mb-6 text-slate-700" />
          <h1 className="text-3xl font-bold text-white mb-4">購物車是空的</h1>
          <p className="text-slate-400 mb-8">快去選購心儀的遊戲商品吧！</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold hover:from-purple-500 hover:to-cyan-500 transition-all"
          >
            前往商城
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              繼續購物
            </Link>
            <h1 className="text-2xl font-bold text-white">購物車 ({itemCount})</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2"
          >
            <Trash2 size={18} />
            清空購物車
          </button>
        </div>

        {/* Validation Alerts */}
        {!isValid && (
          <div className="mb-6 space-y-3">
            {unavailableItems.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-red-400">部分商品已下架</p>
                  <p className="text-sm text-slate-400 mt-1">
                    以下商品已無法購買，請從購物車中移除：
                    {unavailableItems.map(item => item.gameName).join('、')}
                  </p>
                </div>
              </div>
            )}
            
            {priceChangedItems.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-amber-400">商品價格已更新</p>
                  <p className="text-sm text-slate-400 mt-1">
                    部分商品價格已調整，請確認後再結帳
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex gap-4"
              >
                {/* Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                  <Image
                    src={item.gameImage}
                    alt={item.gameName}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{item.gameName}</h3>
                  <p className="text-slate-400">{item.packageName}</p>
                  <p className="text-cyan-400 font-bold mt-2">
                    NT${item.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors p-2"
                    aria-label="移除商品"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                      aria-label="減少數量"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        updateQuantity(item.id, value);
                      }}
                      className="w-14 text-center font-bold text-white bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                      aria-label="增加數量"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">小計</p>
                    <p className="text-xl font-bold text-white">
                      NT${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6">訂單摘要</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>商品數量</span>
                  <span>{itemCount} 件</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>小計</span>
                  <span>NT${totalPrice.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-white">總計</span>
                    <span className="text-2xl font-bold text-cyan-400">
                      NT${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                disabled={!isValid}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all"
              >
                {!isValid ? "請先處理異常商品" : "前往結帳"}
              </button>

              {showCheckout && (
                <MultiItemCheckout onClose={() => setShowCheckout(false)} />
              )}

              <p className="text-center text-slate-500 text-sm mt-4">
                結帳時請準備好遊戲帳號資訊
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
