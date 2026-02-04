import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/lib/cart/types";

// In-memory cart storage (shared across requests)
declare global {
  var cartStore: Map<string, CartItem[]>;
}

if (!global.cartStore) {
  global.cartStore = new Map();
}

const cartStore = global.cartStore;

// Helper to get user ID from session (simplified for demo)
function getUserId(request: NextRequest): string | null {
  // In production, this would verify the session token
  // For now, we'll use a simple header or cookie
  const userId = request.headers.get("x-user-id");
  return userId;
}

// GET /api/cart
// Returns user's cart items
export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const items = cartStore.get(userId) || [];
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/cart/items
// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const item: CartItem = await request.json();
    const currentItems = cartStore.get(userId) || [];
    
    // Check if item already exists (same game + package)
    const existingIndex = currentItems.findIndex(
      (i) => i.gameId === item.gameId && i.packageId === item.packageId
    );
    
    if (existingIndex >= 0) {
      // Update quantity
      currentItems[existingIndex].quantity += item.quantity;
    } else {
      // Add new item
      currentItems.push(item);
    }
    
    cartStore.set(userId, currentItems);
    
    return NextResponse.json(currentItems, { status: 201 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
