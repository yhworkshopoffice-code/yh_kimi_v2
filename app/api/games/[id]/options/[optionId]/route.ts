import { NextRequest, NextResponse } from "next/server";
import { GAMES } from "@/lib/storefront/constants";
import { getGameOptionGroups } from "@/lib/storefront/optionGroupUtils";
import { Option, OptionGroup } from "@/lib/types";

// In-memory storage (shared)
declare global {
  var optionGroupsStore: Map<string, OptionGroup[]>;
}

if (!global.optionGroupsStore) {
  global.optionGroupsStore = new Map();
}

const optionGroupsStore = global.optionGroupsStore;

// PUT /api/games/[id]/options/[optionId]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; optionId: string }> }
) {
  try {
    const { id, optionId } = await params;
    const game = GAMES.find((g) => g.id === id);
    
    if (!game) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { groupId, name, price, image, description, minQty, maxQty, step } = body;

    // Validation
    if (minQty !== undefined && maxQty !== undefined && minQty > maxQty) {
      return NextResponse.json(
        { error: "minQty cannot be greater than maxQty" },
        { status: 400 }
      );
    }

    // Get current groups
    const currentGroups = optionGroupsStore.get(id) || getGameOptionGroups(game);
    
    // Find option in any group
    let found = false;
    const updatedGroups = currentGroups.map((group) => {
      const optionIndex = group.options.findIndex((o) => o.id === optionId);
      if (optionIndex === -1) return group;
      
      found = true;
      const updatedOptions = [...group.options];
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        ...(name && { name }),
        ...(price !== undefined && { price }),
        ...(image !== undefined && { image }),
        ...(description !== undefined && { description }),
        ...(minQty !== undefined && { minQty }),
        ...(maxQty !== undefined && { maxQty }),
        ...(step !== undefined && { step }),
      };
      
      return { ...group, options: updatedOptions };
    });

    if (!found) {
      return NextResponse.json(
        { error: "Option not found" },
        { status: 404 }
      );
    }

    optionGroupsStore.set(id, updatedGroups);

    // Find and return updated option
    const updatedOption = updatedGroups
      .flatMap((g) => g.options)
      .find((o) => o.id === optionId);

    return NextResponse.json({ option: updatedOption });
  } catch (error) {
    console.error("Error updating option:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/games/[id]/options/[optionId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; optionId: string }> }
) {
  try {
    const { id, optionId } = await params;
    const game = GAMES.find((g) => g.id === id);
    
    if (!game) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }

    // Get current groups
    const currentGroups = optionGroupsStore.get(id) || getGameOptionGroups(game);
    
    // Find and remove option from any group
    let found = false;
    const updatedGroups = currentGroups.map((group) => {
      const filteredOptions = group.options.filter((o) => {
        if (o.id === optionId) {
          found = true;
          return false;
        }
        return true;
      });
      return { ...group, options: filteredOptions };
    });

    if (!found) {
      return NextResponse.json(
        { error: "Option not found" },
        { status: 404 }
      );
    }

    optionGroupsStore.set(id, updatedGroups);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting option:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
