/**
 * Feature Flags Configuration
 * 
 * 用於控制新功能的漸進式推出
 */

// Feature flag 類型
export type FeatureFlag = 
  | "optionGroupsEnabled"
  | "optionGroupsAdminEnabled"
  | "optionGroupsAPIEnabled";

// Feature flag 配置介面
interface FeatureFlagConfig {
  enabled: boolean;
  rolloutPercentage: number; // 0-100
  allowedUsers?: string[]; // 特定使用者 ID 列表
  allowedRoles?: string[]; // 特定角色列表
}

// 預設 feature flags 配置
const defaultFeatureFlags: Record<FeatureFlag, FeatureFlagConfig> = {
  optionGroupsEnabled: {
    enabled: true, // 前台 OrderWizard 使用 option groups
    rolloutPercentage: 100,
  },
  optionGroupsAdminEnabled: {
    enabled: true, // 後台管理介面
    rolloutPercentage: 100,
  },
  optionGroupsAPIEnabled: {
    enabled: true, // API 端點
    rolloutPercentage: 100,
  },
};

// 從環境變數或 localStorage 讀取配置
function loadFeatureFlags(): Record<FeatureFlag, FeatureFlagConfig> {
  if (typeof window === "undefined") {
    return defaultFeatureFlags;
  }

  try {
    const stored = localStorage.getItem("featureFlags");
    if (stored) {
      return { ...defaultFeatureFlags, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error("Error loading feature flags:", error);
  }

  return defaultFeatureFlags;
}

// 儲存 feature flags 到 localStorage
export function saveFeatureFlags(flags: Partial<Record<FeatureFlag, FeatureFlagConfig>>): void {
  if (typeof window === "undefined") return;

  try {
    const current = loadFeatureFlags();
    const updated = { ...current, ...flags };
    localStorage.setItem("featureFlags", JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving feature flags:", error);
  }
}

// 檢查 feature flag 是否啟用
export function isFeatureEnabled(
  flag: FeatureFlag,
  userId?: string,
  userRole?: string
): boolean {
  const flags = loadFeatureFlags();
  const config = flags[flag];

  if (!config) return false;

  // 檢查全局啟用狀態
  if (!config.enabled) return false;

  // 檢查特定使用者
  if (config.allowedUsers && userId) {
    return config.allowedUsers.includes(userId);
  }

  // 檢查特定角色
  if (config.allowedRoles && userRole) {
    return config.allowedRoles.includes(userRole);
  }

  // 檢查推出百分比（基於使用者 ID 的雜湊）
  if (config.rolloutPercentage < 100 && userId) {
    const hash = userId.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    const percentage = (hash % 100) + 1;
    return percentage <= config.rolloutPercentage;
  }

  return true;
}

// 啟用 feature flag
export function enableFeature(flag: FeatureFlag): void {
  saveFeatureFlags({
    [flag]: { ...loadFeatureFlags()[flag], enabled: true },
  });
}

// 禁用 feature flag
export function disableFeature(flag: FeatureFlag): void {
  saveFeatureFlags({
    [flag]: { ...loadFeatureFlags()[flag], enabled: false },
  });
}

// 設定推出百分比
export function setRolloutPercentage(flag: FeatureFlag, percentage: number): void {
  saveFeatureFlags({
    [flag]: { ...loadFeatureFlags()[flag], rolloutPercentage: Math.max(0, Math.min(100, percentage)) },
  });
}

// 獲取所有 feature flags 狀態
export function getAllFeatureFlags(): Record<FeatureFlag, FeatureFlagConfig> {
  return loadFeatureFlags();
}

// 重置所有 feature flags 為預設值
export function resetFeatureFlags(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("featureFlags");
}

// 開發者工具：在控制台快速切換功能
export const featureFlagDevTools = {
  enable: enableFeature,
  disable: disableFeature,
  setPercentage: setRolloutPercentage,
  status: getAllFeatureFlags,
  reset: resetFeatureFlags,
};

// 在開發環境中暴露到 window 物件
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).featureFlags = featureFlagDevTools;
  console.log("Feature flag dev tools available at window.featureFlags");
}
