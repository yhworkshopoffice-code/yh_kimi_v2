/**
 * Migration Script for Option Groups
 * 
 * 將現有的 GAMES 資料從舊版 packages 格式遷移到新版 optionGroups 格式
 * 
 * 使用方法:
 * 1. 在瀏覽器控制台執行: await migrateGamesData()
 * 2. 或在 Node.js 環境執行: node scripts/migrate-option-groups.ts
 */

import { GAMES } from "@/lib/storefront/constants";
import { Game, OptionGroup, Option } from "@/lib/types";

interface MigrationResult {
  success: boolean;
  gameId: string;
  gameName: string;
  oldPackageCount: number;
  newGroupCount: number;
  newOptionCount: number;
  errors?: string[];
}

interface MigrationReport {
  totalGames: number;
  successfulMigrations: number;
  failedMigrations: number;
  results: MigrationResult[];
  timestamp: string;
}

/**
 * 將單一 GamePackage 轉換為 Option
 */
function packageToOption(pkg: { id: string; name: string; price: number; image?: string }): Option {
  return {
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    image: pkg.image,
    minQty: 0,
    maxQty: 99,
    step: 1,
  };
}

/**
 * 將 GamePackage 陣列轉換為預設 OptionGroup
 */
function packagesToDefaultOptionGroup(
  packages: Array<{ id: string; name: string; price: number; image?: string }>,
  groupLabel: string = "選擇方案"
): OptionGroup {
  return {
    id: `default_${Date.now()}`,
    label: groupLabel,
    order: 0,
    required: true,
    selectionMode: "single",
    minSelections: 1,
    maxSelections: 1,
    options: packages.map(packageToOption),
  };
}

/**
 * 遷移單一遊戲資料
 */
export function migrateGame(game: Game): { game: Game; result: MigrationResult } {
  const errors: string[] = [];
  
  try {
    // 檢查是否已經遷移
    if (game.optionGroups && game.optionGroups.length > 0) {
      return {
        game,
        result: {
          success: true,
          gameId: game.id,
          gameName: game.name,
          oldPackageCount: game.packages.length,
          newGroupCount: game.optionGroups.length,
          newOptionCount: game.optionGroups.reduce((sum, g) => sum + g.options.length, 0),
          errors: ["Already migrated"],
        },
      };
    }

    // 檢查是否有 packages
    if (!game.packages || game.packages.length === 0) {
      errors.push("No packages found");
      return {
        game,
        result: {
          success: false,
          gameId: game.id,
          gameName: game.name,
          oldPackageCount: 0,
          newGroupCount: 0,
          newOptionCount: 0,
          errors,
        },
      };
    }

    // 執行遷移
    const optionGroup = packagesToDefaultOptionGroup(game.packages, "儲值方案");
    const migratedGame: Game = {
      ...game,
      optionGroups: [optionGroup],
    };

    return {
      game: migratedGame,
      result: {
        success: true,
        gameId: game.id,
        gameName: game.name,
        oldPackageCount: game.packages.length,
        newGroupCount: 1,
        newOptionCount: optionGroup.options.length,
      },
    };
  } catch (error) {
    errors.push(`Migration error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      game,
      result: {
        success: false,
        gameId: game.id,
        gameName: game.name,
        oldPackageCount: game.packages?.length || 0,
        newGroupCount: 0,
        newOptionCount: 0,
        errors,
      },
    };
  }
}

/**
 * 批次遷移所有遊戲資料
 */
export function migrateAllGames(games: Game[]): MigrationReport {
  const results: MigrationResult[] = [];
  let successfulMigrations = 0;
  let failedMigrations = 0;

  const migratedGames = games.map((game) => {
    const { game: migratedGame, result } = migrateGame(game);
    results.push(result);
    
    if (result.success && !result.errors?.includes("Already migrated")) {
      successfulMigrations++;
    } else if (!result.success) {
      failedMigrations++;
    }
    
    return migratedGame;
  });

  return {
    totalGames: games.length,
    successfulMigrations,
    failedMigrations,
    results,
    timestamp: new Date().toISOString(),
  };
}

/**
 * 生成遷移報告
 */
export function generateMigrationReport(report: MigrationReport): string {
  const lines = [
    "=== Option Groups Migration Report ===",
    `Timestamp: ${report.timestamp}`,
    ``,
    `Summary:`,
    `- Total Games: ${report.totalGames}`,
    `- Successful Migrations: ${report.successfulMigrations}`,
    `- Failed Migrations: ${report.failedMigrations}`,
    `- Success Rate: ${((report.successfulMigrations / report.totalGames) * 100).toFixed(1)}%`,
    ``,
    `Details:`,
    ...report.results.map((result) => {
      const status = result.success ? "✓" : "✗";
      const details = `${result.gameName} (${result.gameId}): ${result.oldPackageCount} packages → ${result.newGroupCount} groups, ${result.newOptionCount} options`;
      const errors = result.errors ? ` [Errors: ${result.errors.join(", ")}]` : "";
      return `  ${status} ${details}${errors}`;
    }),
    ``,
    "=== End of Report ===",
  ];

  return lines.join("\n");
}

/**
 * 驗證遷移結果
 */
export function validateMigration(originalGames: Game[], migratedGames: Game[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (originalGames.length !== migratedGames.length) {
    errors.push(`Game count mismatch: ${originalGames.length} → ${migratedGames.length}`);
  }

  migratedGames.forEach((game, index) => {
    const original = originalGames[index];
    
    if (game.id !== original.id) {
      errors.push(`Game ID mismatch at index ${index}: ${original.id} → ${game.id}`);
    }

    if (!game.optionGroups || game.optionGroups.length === 0) {
      errors.push(`Game ${game.id} has no option groups after migration`);
    } else {
      const totalOptions = game.optionGroups.reduce((sum, g) => sum + g.options.length, 0);
      if (totalOptions !== original.packages.length) {
        errors.push(`Game ${game.id} option count mismatch: ${original.packages.length} → ${totalOptions}`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 主遷移函數（用於手動執行）
 */
export async function runMigration(): Promise<void> {
  console.log("Starting Option Groups Migration...");
  console.log(`Processing ${GAMES.length} games...`);
  
  const report = migrateAllGames(GAMES);
  const reportText = generateMigrationReport(report);
  
  console.log(reportText);
  
  // 在開發環境中，可以將結果輸出到控制台
  if (typeof window !== "undefined") {
    console.log("Migration complete. Check console for details.");
    console.log("To apply changes, update the GAMES constant in lib/storefront/constants.ts");
  }
  
  // 驗證結果
  const validation = validateMigration(GAMES, GAMES.map((g) => migrateGame(g).game));
  if (!validation.valid) {
    console.error("Validation failed:", validation.errors);
  } else {
    console.log("✓ Migration validation passed");
  }
}

// 如果在 Node.js 環境中執行
if (typeof window === "undefined") {
  runMigration();
}
