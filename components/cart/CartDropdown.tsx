"use client";

import { X, ShoppingCart, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, totalPrice, itemCount, removeItem } = useCart();

  if (!isOpen) return null;

  // Show only first 5 items in preview
  const previewItems = items.slice(0, 5);
  const remainingCount = items.length - 5;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-cyan-400" />
            <span className="font-bold text-white">
              購物車 ({itemCount})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
              <p>購物車是空的</p>
              <p className="text-sm mt-2">快去選購心儀的遊戲吧！</p>
            </div>
          ) : (
            <>
              {previewItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                    <Image
                      src={item.gameImage}
                      alt={item.gameName}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {item.gameName}
                    </p>
                    <p className="text-sm text-slate-400 truncate">
                      {item.packageName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-slate-500">
                        x{item.quantity}
                      </span>
                      <span className="text-cyan-400 font-bold">
                        NT${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    aria-label="移除商品"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              {remainingCount > 0 && (
                <div className="p-4 text-center text-slate-500 text-sm">
                  還有 {remainingCount} 件商品...
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-800/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">小計</span>
              <span className="text-xl font-bold text-white">
                NT${totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
              >
                查看購物車
                <ChevronRight size={16} />
              </Link>

              <Link
                href="/cart?checkout=true"
                onClick={onClose}
                className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all"
              >
                前往結帳
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
