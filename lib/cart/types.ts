/**
 * Cart Types - 購物車類型定義
 */

import { Game, GamePackage } from '@/lib/types';

// 購物車項目
export interface CartItem {
  id: string;              // 唯一 ID (uuid)
  gameId: string;          // 遊戲 ID
  gameName: string;        // 遊戲名稱
  gameImage: string;       // 遊戲圖片 URL
  packageId: string;       // 方案 ID
  packageName: string;     // 方案名稱
  price: number;           // 單價
  quantity: number;        // 數量
}

// 購物車狀態
export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

// 購物車 Context 類型
export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
  addItem: (game: Game, pkg: GamePackage, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  syncCart: () => Promise<void>;
}

// localStorage 購物車資料
export interface LocalCartData {
  items: CartItem[];
  version: number;
  lastUpdated: string;
}

// API 購物車項目 (資料庫格式)
export interface ApiCartItem {
  id: string;
  user_id: string;
  game_id: string;
  package_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}
