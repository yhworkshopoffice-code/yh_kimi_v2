import { NextRequest, NextResponse } from "next/server";
import { GAMES } from "@/lib/storefront/constants";
import { getGameOptionGroups } from "@/lib/storefront/optionGroupUtils";
import { OptionGroup } from "@/lib/types";

// In-memory storage for option groups (replace with database in production)
const optionGroupsStore: Map<string, OptionGroup[]> = new Map();

// GET /api/games/[id]/option-groups
export async function GET(
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

    // Check if we have stored option groups for this game
    const storedGroups = optionGroupsStore.get(id);
    if (storedGroups) {
      return NextResponse.json({ optionGroups: storedGroups });
    }

    // Fall back to default conversion from packages
    const optionGroups = getGameOptionGroups(game);
    return NextResponse.json({ optionGroups });
  } catch (error) {
    console.error("Error fetching option groups:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/games/[id]/option-groups
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
    const { label, order, required, selectionMode, minSelections, maxSelections, minTotalQty, maxTotalQty } = body;

    // Validation
    if (!label || !selectionMode) {
      return NextResponse.json(
        { error: "Missing required fields: label, selectionMode" },
        { status: 400 }
      );
    }

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

    const newGroup: OptionGroup = {
      id: `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      label,
      order: order || 0,
      required: required ?? true,
      selectionMode,
      minSelections,
      maxSelections,
      minTotalQty,
      maxTotalQty,
      options: [],
    };

    // Get current groups or initialize
    const currentGroups = optionGroupsStore.get(id) || getGameOptionGroups(game);
    const updatedGroups = [...currentGroups, newGroup];
    
    // Store updated groups
    optionGroupsStore.set(id, updatedGroups);

    return NextResponse.json({ optionGroup: newGroup }, { status: 201 });
  } catch (error) {
    console.error("Error creating option group:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
