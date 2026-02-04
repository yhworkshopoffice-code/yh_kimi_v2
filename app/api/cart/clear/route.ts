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

// POST /api/cart/clear
// Clear all items from cart
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Clear cart for user
    cartStore.set(userId, []);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
