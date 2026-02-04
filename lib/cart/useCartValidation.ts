"use client";

import { useState, useEffect } from "react";
import { CartItem } from "./types";
import { GAMES } from "@/lib/storefront/constants";

interface CartValidationResult {
  isValid: boolean;
  unavailableItems: CartItem[];
  priceChangedItems: Array<{
    item: CartItem;
    newPrice: number;
    oldPrice: number;
  }>;
}

export function useCartValidation(items: CartItem[]): CartValidationResult {
  const [validation, setValidation] = useState<CartValidationResult>({
    isValid: true,
    unavailableItems: [],
    priceChangedItems: [],
  });

  useEffect(() => {
    const validateCart = () => {
      const unavailableItems: CartItem[] = [];
      const priceChangedItems: Array<{
        item: CartItem;
        newPrice: number;
        oldPrice: number;
      }> = [];

      items.forEach((item) => {
        // Check if game still exists
        const game = GAMES.find((g) => g.id === item.gameId);
        if (!game) {
          unavailableItems.push(item);
          return;
        }

        // Check if package still exists
        const pkg = game.packages.find((p) => p.id === item.packageId);
        if (!pkg) {
          unavailableItems.push(item);
          return;
        }

        // Check if price has changed
        if (pkg.price !== item.price) {
          priceChangedItems.push({
            item,
            newPrice: pkg.price,
            oldPrice: item.price,
          });
        }
      });

      setValidation({
        isValid: unavailableItems.length === 0 && priceChangedItems.length === 0,
        unavailableItems,
        priceChangedItems,
      });
    };

    validateCart();
  }, [items]);

  return validation;
}
