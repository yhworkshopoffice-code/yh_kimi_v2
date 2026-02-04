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

// POST /api/games/[id]/options
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    if (!groupId || !name || price === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: groupId, name, price" },
        { status: 400 }
      );
    }

    if (minQty !== undefined && maxQty !== undefined && minQty > maxQty) {
      return NextResponse.json(
        { error: "minQty cannot be greater than maxQty" },
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

    const newOption: Option = {
      id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      price,
      image,
      description,
      minQty: minQty ?? 0,
      maxQty: maxQty ?? 99,
      step: step ?? 1,
    };

    // Add option to group
    const updatedGroups = [...currentGroups];
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      options: [...updatedGroups[groupIndex].options, newOption],
    };
    
    optionGroupsStore.set(id, updatedGroups);

    return NextResponse.json({ option: newOption }, { status: 201 });
  } catch (error) {
    console.error("Error creating option:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
