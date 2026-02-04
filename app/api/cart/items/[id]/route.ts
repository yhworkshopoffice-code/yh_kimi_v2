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

// PUT /api/cart/items/[id]
// Update item quantity
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { quantity } = await request.json();
    
    const currentItems = cartStore.get(userId) || [];
    const itemIndex = currentItems.findIndex((item) => item.id === id);
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }
    
    if (quantity <= 0) {
      // Remove item
      currentItems.splice(itemIndex, 1);
    } else {
      // Update quantity
      currentItems[itemIndex].quantity = quantity;
    }
    
    cartStore.set(userId, currentItems);
    
    return NextResponse.json(currentItems);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/items/[id]
// Remove item from cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    const currentItems = cartStore.get(userId) || [];
    const filteredItems = currentItems.filter((item) => item.id !== id);
    
    cartStore.set(userId, filteredItems);
    
    return NextResponse.json(filteredItems);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
