import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/lib/cart/types";

// In-memory cart storage (shared)
declare global {
  var cartStore: Map<string, CartItem[]>;
}

const cartStore = global.cartStore;

// Helper to get user ID from session
function getUserId(request: NextRequest): string | null {
  const userId = request.headers.get("x-user-id");
  return userId;
}

// POST /api/cart/sync
// Sync localStorage cart to database (used on login)
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { items: localItems }: { items: CartItem[] } = await request.json();
    
    // Get existing server cart
    const serverItems = cartStore.get(userId) || [];
    
    // Merge carts: localStorage wins for conflicts
    const mergedMap = new Map<string, CartItem>();
    
    // Add server items first
    serverItems.forEach((item) => {
      const key = `${item.gameId}-${item.packageId}`;
      mergedMap.set(key, item);
    });
    
    // Override with local items
    localItems.forEach((item) => {
      const key = `${item.gameId}-${item.packageId}`;
      mergedMap.set(key, item);
    });
    
    const mergedItems = Array.from(mergedMap.values());
    
    // Save merged cart
    cartStore.set(userId, mergedItems);
    
    return NextResponse.json(mergedItems);
  } catch (error) {
    console.error("Error syncing cart:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
