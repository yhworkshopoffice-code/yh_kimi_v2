import { NextRequest, NextResponse } from "next/server";
import { GAMES } from "@/lib/storefront/constants";
import { getGameOptionGroups } from "@/lib/storefront/optionGroupUtils";
import { OptionGroup } from "@/lib/types";

// In-memory storage (shared)
declare global {
  var optionGroupsStore: Map<string, OptionGroup[]>;
}

if (!global.optionGroupsStore) {
  global.optionGroupsStore = new Map();
}

const optionGroupsStore = global.optionGroupsStore;

// GET /api/games/[id]
// Returns game details with optionGroups (new format) and packages (legacy format)
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

    // Get option groups from store or convert from packages
    const optionGroups = optionGroupsStore.get(id) || getGameOptionGroups(game);

    // Return both formats for backward compatibility
    const response = {
      ...game,
      optionGroups,
      // Legacy packages format for backward compatibility
      packages: game.packages,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching game:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
