import { NextRequest, NextResponse } from "next/server";
import { GAMES } from "@/lib/storefront/constants";
import { getGameOptionGroups } from "@/lib/storefront/optionGroupUtils";
import { OptionGroup } from "@/lib/types";

// In-memory storage (shared with route.ts)
declare global {
  var optionGroupsStore: Map<string, OptionGroup[]>;
}

if (!global.optionGroupsStore) {
  global.optionGroupsStore = new Map();
}

const optionGroupsStore = global.optionGroupsStore;

// PUT /api/games/[id]/option-groups/[groupId]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; groupId: string }> }
) {
  try {
    const { id, groupId } = await params;
    const game = GAMES.find((g) => g.id === id);
    
    if (!game) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { label, order, required, selectionMode, minSelections, maxSelections, minTotalQty, maxTotalQty, options } = body;

    // Validation
    if (selectionMode === "single" && maxSelections && maxSelections > 1) {
      return NextResponse.json(
        { error: "Single selection mode cannot have maxSelections > 1" },
        { status: 400 }
      );
    }

    if (minSelections !== undefined && maxSelections !== undefined && minSelections > maxSelections) {
      return NextResponse.json(
        { error: "minSelections cannot be greater than maxSelections" },
        { status: 400 }
      );
    }

    if (minTotalQty !== undefined && maxTotalQty !== undefined && minTotalQty > maxTotalQty) {
      return NextResponse.json(
        { error: "minTotalQty cannot be greater than maxTotalQty" },
        { status: 400 }
      );
    }

    // Get current groups
    const currentGroups = optionGroupsStore.get(id) || getGameOptionGroups(game);
    const groupIndex = currentGroups.findIndex((g) => g.id === groupId);

    if (groupIndex === -1) {
      return NextResponse.json(
        { error: "Option group not found" },
        { status: 404 }
      );
    }

    // Update group
    const updatedGroup: OptionGroup = {
      ...currentGroups[groupIndex],
      ...(label && { label }),
      ...(order !== undefined && { order }),
      ...(required !== undefined && { required }),
      ...(selectionMode && { selectionMode }),
      ...(minSelections !== undefined && { minSelections }),
      ...(maxSelections !== undefined && { maxSelections }),
      ...(minTotalQty !== undefined && { minTotalQty }),
      ...(maxTotalQty !== undefined && { maxTotalQty }),
      ...(options && { options }),
    };

    const updatedGroups = [...currentGroups];
    updatedGroups[groupIndex] = updatedGroup;
    optionGroupsStore.set(id, updatedGroups);

    return NextResponse.json({ optionGroup: updatedGroup });
  } catch (error) {
    console.error("Error updating option group:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/games/[id]/option-groups/[groupId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; groupId: string }> }
) {
  try {
    const { id, groupId } = await params;
    const game = GAMES.find((g) => g.id === id);
    
    if (!game) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }

    // Get current groups
    const currentGroups = optionGroupsStore.get(id) || getGameOptionGroups(game);
    const updatedGroups = currentGroups.filter((g) => g.id !== groupId);

    if (updatedGroups.length === currentGroups.length) {
      return NextResponse.json(
        { error: "Option group not found" },
        { status: 404 }
      );
    }

    optionGroupsStore.set(id, updatedGroups);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting option group:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
