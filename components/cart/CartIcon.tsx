"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

interface CartIconProps {
  onClick?: () => void;
  className?: string;
}

export function CartIcon({ onClick, className = "" }: CartIconProps) {
  const { itemCount } = useCart();

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-slate-300 hover:text-cyan-400 transition-colors ${className}`}
      aria-label="購物車"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in-95">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
