/**
 * Cart Storage Utility - localStorage operations for cart
 */

import { CartItem, LocalCartData } from './types';

const CART_STORAGE_KEY = 'yh_cart';
const CART_VERSION = 1;

export const cartStorage = {
  /**
   * Load cart from localStorage
   */
  load(): LocalCartData {
    if (typeof window === 'undefined') {
      return { items: [], version: CART_VERSION, lastUpdated: new Date().toISOString() };
    }

    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      if (!data) {
        return { items: [], version: CART_VERSION, lastUpdated: new Date().toISOString() };
      }

      const parsed: LocalCartData = JSON.parse(data);
      
      // Version check for migrations
      if (parsed.version !== CART_VERSION) {
        console.warn('Cart version mismatch, clearing cart');
        this.clear();
        return { items: [], version: CART_VERSION, lastUpdated: new Date().toISOString() };
      }

      return parsed;
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return { items: [], version: CART_VERSION, lastUpdated: new Date().toISOString() };
    }
  },

  /**
   * Save cart to localStorage
   */
  save(items: CartItem[]): void {
    if (typeof window === 'undefined') return;

    try {
      const data: LocalCartData = {
        items,
        version: CART_VERSION,
        lastUpdated: new Date().toISOString(),
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded');
        // Could show user notification here
        throw new Error('購物車已滿，請先結帳或登入保存');
      }
      console.error('Failed to save cart to localStorage:', error);
    }
  },

  /**
   * Clear cart from localStorage
   */
  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cart from localStorage:', error);
    }
  },

  /**
   * Check if cart exists in localStorage
   */
  hasCart(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      if (!data) return false;

      const parsed: LocalCartData = JSON.parse(data);
      return parsed.items.length > 0;
    } catch {
      return false;
    }
  },

  /**
   * Get cart item count from localStorage
   */
  getItemCount(): number {
    const data = this.load();
    return data.items.reduce((sum, item) => sum + item.quantity, 0);
  },
};
