"use client";

import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { CartItem, CartState, CartContextType } from './types';
import { Game, GamePackage } from '@/lib/types';
import { cartStorage } from './cartStorage';
import { useAuth } from '@/lib/auth/AuthContext';
import { fetchWithRetry } from './apiHelpers';

// Action Types
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial State
const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.gameId === action.payload.gameId && item.packageId === action.payload.packageId
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: updatedItems };
      }

      // Add new item
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.itemId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'SET_CART':
      return { ...state, items: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated, user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const localCart = cartStorage.load();
    if (localCart.items.length > 0) {
      dispatch({ type: 'SET_CART', payload: localCart.items });
    }
  }, []);

  // Sync with localStorage on changes (for anonymous users)
  useEffect(() => {
    if (!isAuthenticated) {
      cartStorage.save(state.items);
    }
  }, [state.items, isAuthenticated]);

  // Sync cart on login
  useEffect(() => {
    if (isAuthenticated && user) {
      syncCartWithDatabase();
    }
  }, [isAuthenticated, user]);

  // Calculate derived values
  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  // Generate unique ID
  const generateItemId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Actions
  const addItem = useCallback((game: Game, pkg: GamePackage, quantity: number = 1) => {
    const newItem: CartItem = {
      id: generateItemId(),
      gameId: game.id,
      gameName: game.name,
      gameImage: game.image,
      packageId: pkg.id,
      packageName: pkg.name,
      price: pkg.price,
      quantity,
    };

    dispatch({ type: 'ADD_ITEM', payload: newItem });

    // If authenticated, sync to API
    if (isAuthenticated) {
      syncItemToApi(newItem);
    }
  }, [isAuthenticated]);

  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });

    if (isAuthenticated) {
      deleteItemFromApi(itemId);
    }
  }, [isAuthenticated]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });

    if (isAuthenticated) {
      updateItemQuantityInApi(itemId, quantity);
    }
  }, [isAuthenticated]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    cartStorage.clear();

    if (isAuthenticated) {
      clearCartInApi();
    }
  }, [isAuthenticated]);

  const syncCart = useCallback(async () => {
    if (!isAuthenticated) return;
    await syncCartWithDatabase();
  }, [isAuthenticated]);

  // API helpers with retry logic
  const syncItemToApi = async (item: CartItem) => {
    try {
      await fetchWithRetry('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
    } catch (error) {
      console.error('Failed to sync item to API after retries:', error);
      // Continue with local state - will retry on next sync
    }
  };

  const deleteItemFromApi = async (itemId: string) => {
    try {
      await fetchWithRetry(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete item from API after retries:', error);
    }
  };

  const updateItemQuantityInApi = async (itemId: string, quantity: number) => {
    try {
      await fetchWithRetry(`/api/cart/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
    } catch (error) {
      console.error('Failed to update item quantity in API after retries:', error);
    }
  };

  const clearCartInApi = async () => {
    try {
      await fetchWithRetry('/api/cart/clear', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to clear cart in API after retries:', error);
    }
  };

  const syncCartWithDatabase = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Get local cart
      const localCart = cartStorage.load();
      
      // Get server cart with retry
      const response = await fetchWithRetry('/api/cart', {}, 3, 1000);
      const serverCart: CartItem[] = response.ok ? await response.json() : [];
      
      // Merge carts (localStorage wins for conflicts)
      const mergedItems = mergeCarts(localCart.items, serverCart);
      
      // Update state
      dispatch({ type: 'SET_CART', payload: mergedItems });
      
      // Sync merged cart to server with retry
      await fetchWithRetry('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: mergedItems }),
      });
      
      // Clear localStorage
      cartStorage.clear();
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to sync cart' });
      console.error('Cart sync error:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const mergeCarts = (localItems: CartItem[], serverItems: CartItem[]): CartItem[] => {
    const merged = new Map<string, CartItem>();
    
    // Add server items first
    serverItems.forEach((item) => {
      const key = `${item.gameId}-${item.packageId}`;
      merged.set(key, item);
    });
    
    // Override with local items (localStorage wins)
    localItems.forEach((item) => {
      const key = `${item.gameId}-${item.packageId}`;
      merged.set(key, item);
    });
    
    return Array.from(merged.values());
  };

  const value: CartContextType = {
    items: state.items,
    itemCount,
    totalPrice,
    isLoading: state.isLoading,
    error: state.error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    syncCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
