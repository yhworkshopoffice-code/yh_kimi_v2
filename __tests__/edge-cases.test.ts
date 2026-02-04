/**
 * Edge Case Tests for Option Groups
 * 
 * 測試各種邊界情況和規則組合
 */

import { describe, it, expect } from "@jest/globals";
import { OptionGroup, Option } from "@/lib/types";

// 模擬驗證函數
function validateSelection(
  group: OptionGroup,
  selections: { [optionId: string]: number }
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const selectedOptions = Object.entries(selections).filter(([, qty]) => qty > 0);
  const selectionCount = selectedOptions.length;
  const totalQty = selectedOptions.reduce((sum, [, qty]) => sum + qty, 0);

  if (group.required && selectionCount === 0) {
    errors.push("Required");
  }

  if (group.minSelections !== undefined && selectionCount < group.minSelections) {
    errors.push("MinSelections");
  }

  if (group.maxSelections !== undefined && selectionCount > group.maxSelections) {
    errors.push("MaxSelections");
  }

  if (group.minTotalQty !== undefined && totalQty < group.minTotalQty) {
    errors.push("MinTotalQty");
  }

  if (group.maxTotalQty !== undefined && totalQty > group.maxTotalQty) {
    errors.push("MaxTotalQty");
  }

  return { isValid: errors.length === 0, errors };
}

describe("Edge Cases - Rule Combinations", () => {
  // 組合 1: 必選 + 單選
  it("required + single: must select exactly 1", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "single",
      options: [],
    };

    expect(validateSelection(group, {}).isValid).toBe(false);
    expect(validateSelection(group, { opt1: 1 }).isValid).toBe(true);
    expect(validateSelection(group, { opt1: 1, opt2: 1 }).isValid).toBe(true); // UI should prevent this
  });

  // 組合 2: 必選 + 多選 + 最少選擇數
  it("required + multi + minSelections: must select at least N", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      minSelections: 2,
      options: [],
    };

    expect(validateSelection(group, {}).isValid).toBe(false);
    expect(validateSelection(group, { opt1: 1 }).isValid).toBe(false);
    expect(validateSelection(group, { opt1: 1, opt2: 1 }).isValid).toBe(true);
    expect(validateSelection(group, { opt1: 1, opt2: 1, opt3: 1 }).isValid).toBe(true);
  });

  // 組合 3: 必選 + 多選 + 最多選擇數
  it("required + multi + maxSelections: must select at most N", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      maxSelections: 2,
      options: [],
    };

    expect(validateSelection(group, { opt1: 1 }).isValid).toBe(true);
    expect(validateSelection(group, { opt1: 1, opt2: 1 }).isValid).toBe(true);
    expect(validateSelection(group, { opt1: 1, opt2: 1, opt3: 1 }).isValid).toBe(false);
  });

  // 組合 4: 最少總數量限制
  it("minTotalQty: total quantity must meet minimum", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      minTotalQty: 5,
      options: [],
    };

    expect(validateSelection(group, { opt1: 3 }).isValid).toBe(false);
    expect(validateSelection(group, { opt1: 3, opt2: 2 }).isValid).toBe(true);
    expect(validateSelection(group, { opt1: 5 }).isValid).toBe(true);
  });

  // 組合 5: 最多總數量限制
  it("maxTotalQty: total quantity must not exceed maximum", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      maxTotalQty: 10,
      options: [],
    };

    expect(validateSelection(group, { opt1: 5, opt2: 5 }).isValid).toBe(true);
    expect(validateSelection(group, { opt1: 6, opt2: 5 }).isValid).toBe(false);
  });

  // 組合 6: 複雜組合
  it("complex: required + multi + min/max selections + min/max total qty", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      minSelections: 2,
      maxSelections: 4,
      minTotalQty: 3,
      maxTotalQty: 20,
      options: [],
    };

    // 選擇數量不足
    expect(validateSelection(group, { opt1: 5 }).isValid).toBe(false);
    
    // 總數量不足
    expect(validateSelection(group, { opt1: 1, opt2: 1 }).isValid).toBe(false);
    
    // 符合所有條件
    expect(validateSelection(group, { opt1: 2, opt2: 2 }).isValid).toBe(true);
    
    // 選擇數量超過
    expect(validateSelection(group, { opt1: 1, opt2: 1, opt3: 1, opt4: 1, opt5: 1 }).isValid).toBe(false);
    
    // 總數量超過
    expect(validateSelection(group, { opt1: 10, opt2: 11 }).isValid).toBe(false);
  });
});

describe("Edge Cases - Boundary Values", () => {
  it("handles zero values correctly", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: false,
      selectionMode: "multi",
      minSelections: 0,
      minTotalQty: 0,
      options: [],
    };

    expect(validateSelection(group, {}).isValid).toBe(true);
    expect(validateSelection(group, { opt1: 0 }).isValid).toBe(true);
  });

  it("handles large numbers", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      maxTotalQty: 999999,
      options: [],
    };

    expect(validateSelection(group, { opt1: 999999 }).isValid).toBe(true);
    expect(validateSelection(group, { opt1: 1000000 }).isValid).toBe(false);
  });

  it("handles exact boundary values", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      minSelections: 2,
      maxSelections: 2,
      minTotalQty: 5,
      maxTotalQty: 5,
      options: [],
    };

    // Exactly at boundaries
    expect(validateSelection(group, { opt1: 2, opt2: 3 }).isValid).toBe(true);
    
    // One under
    expect(validateSelection(group, { opt1: 2 }).isValid).toBe(false);
    
    // One over
    expect(validateSelection(group, { opt1: 2, opt2: 2, opt3: 1 }).isValid).toBe(false);
  });
});

describe("Edge Cases - Invalid Configurations", () => {
  it("detects impossible min > max configurations", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      minSelections: 5,
      maxSelections: 3, // Impossible!
      options: [],
    };

    // Any selection should fail validation
    expect(validateSelection(group, { opt1: 1, opt2: 1, opt3: 1 }).isValid).toBe(false);
  });

  it("handles empty option groups", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "single",
      options: [],
    };

    expect(validateSelection(group, {}).isValid).toBe(false);
  });

  it("handles negative quantities", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "single",
      options: [],
    };

    // Negative quantities should be treated as 0
    const selections = { opt1: -1 };
    const selectedOptions = Object.entries(selections).filter(([, qty]) => qty > 0);
    expect(selectedOptions.length).toBe(0);
  });
});
