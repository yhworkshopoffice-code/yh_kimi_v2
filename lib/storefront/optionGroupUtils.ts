/**
 * Option Group Transformation Utilities
 * 
 * 提供舊版 GamePackage 與新版 OptionGroup 之間的轉換功能
 * 確保向後兼容性
 */

import { Game, GamePackage, OptionGroup, Option } from '@/lib/types';

/**
 * 將單一 GamePackage 轉換為 Option
 */
export function packageToOption(pkg: GamePackage): Option {
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
 * 用於向後兼容：舊資料視為單一 group
 */
export function packagesToDefaultOptionGroup(
  packages: GamePackage[],
  groupLabel: string = '選擇方案'
): OptionGroup {
  return {
    id: 'default',
    label: groupLabel,
    order: 0,
    required: true,
    selectionMode: 'single',
    minSelections: 1,
    maxSelections: 1,
    options: packages.map(packageToOption),
  };
}

/**
 * 取得 Game 的 OptionGroups
 * 優先使用 optionGroups，若不存在則從 packages 轉換
 */
export function getGameOptionGroups(game: Game): OptionGroup[] {
  if (game.optionGroups && game.optionGroups.length > 0) {
    return game.optionGroups;
  }
  
  // 向後兼容：從 packages 轉換
  if (game.packages && game.packages.length > 0) {
    return [packagesToDefaultOptionGroup(game.packages)];
  }
  
  return [];
}

/**
 * 檢查 Game 是否使用新版 OptionGroup 結構
 */
export function hasOptionGroups(game: Game): boolean {
  return !!(game.optionGroups && game.optionGroups.length > 0);
}

/**
 * 將 Game 轉換為新版結構（用於資料遷移）
 */
export function migrateGameToOptionGroups(game: Game): Game {
  if (hasOptionGroups(game)) {
    return game;
  }
  
  return {
    ...game,
    optionGroups: getGameOptionGroups(game),
  };
}

/**
 * 批次遷移多個 Games
 */
export function migrateGamesToOptionGroups(games: Game[]): Game[] {
  return games.map(migrateGameToOptionGroups);
}
