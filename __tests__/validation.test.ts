/**
 * Unit Tests for Validation Logic
 * 
 * 測試選項群組和選項的驗證邏輯
 */

import { describe, it, expect } from "@jest/globals";
import { OptionGroup, Option } from "@/lib/types";

// 模擬驗證函數（從 Step1OptionSelection.tsx 提取）
function validateGroupRules(
  group: OptionGroup,
  selections: { [optionId: string]: number }
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const selectedOptions = Object.entries(selections).filter(([, qty]) => qty > 0);
  const selectionCount = selectedOptions.length;
  const totalQty = selectedOptions.reduce((sum, [, qty]) => sum + qty, 0);

  // Check required
  if (group.required && selectionCount === 0) {
    errors.push(`${group.label} 為必選`);
  }

  // Check minSelections
  if (group.minSelections !== undefined && selectionCount < group.minSelections) {
    errors.push(`${group.label} 至少需要選擇 ${group.minSelections} 個選項`);
  }

  // Check maxSelections
  if (group.maxSelections !== undefined && selectionCount > group.maxSelections) {
    errors.push(`${group.label} 最多只能選擇 ${group.maxSelections} 個選項`);
  }

  // Check minTotalQty
  if (group.minTotalQty !== undefined && totalQty < group.minTotalQty) {
    errors.push(`${group.label} 至少需要 ${group.minTotalQty} 件商品`);
  }

  // Check maxTotalQty
  if (group.maxTotalQty !== undefined && totalQty > group.maxTotalQty) {
    errors.push(`${group.label} 最多只能 ${group.maxTotalQty} 件商品`);
  }

  return { isValid: errors.length === 0, errors };
}

function validateOptionQty(option: Option, qty: number): { isValid: boolean; error?: string } {
  const minQty = option.minQty ?? 0;
  const maxQty = option.maxQty ?? 99;

  if (qty < minQty) {
    return { isValid: false, error: `數量不能少於 ${minQty}` };
  }

  if (qty > maxQty) {
    return { isValid: false, error: `數量不能超過 ${maxQty}` };
  }

  return { isValid: true };
}

describe("Group-level Validation", () => {
  const baseGroup: OptionGroup = {
    id: "test-group",
    label: "測試類別",
    order: 0,
    required: true,
    selectionMode: "single",
    options: [],
  };

  it("should pass when required group has selection", () => {
    const group = { ...baseGroup, required: true };
    const selections = { opt1: 1 };
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should fail when required group has no selection", () => {
    const group = { ...baseGroup, required: true };
    const selections = {};
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("測試類別 為必選");
  });

  it("should pass when optional group has no selection", () => {
    const group = { ...baseGroup, required: false };
    const selections = {};
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(true);
  });

  it("should enforce minSelections", () => {
    const group = { ...baseGroup, minSelections: 2 };
    const selections = { opt1: 1 };
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("測試類別 至少需要選擇 2 個選項");
  });

  it("should enforce maxSelections", () => {
    const group = { ...baseGroup, maxSelections: 2 };
    const selections = { opt1: 1, opt2: 1, opt3: 1 };
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("測試類別 最多只能選擇 2 個選項");
  });

  it("should enforce minTotalQty", () => {
    const group = { ...baseGroup, minTotalQty: 5 };
    const selections = { opt1: 3 };
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("測試類別 至少需要 5 件商品");
  });

  it("should enforce maxTotalQty", () => {
    const group = { ...baseGroup, maxTotalQty: 10 };
    const selections = { opt1: 5, opt2: 6 };
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("測試類別 最多只能 10 件商品");
  });

  it("should pass when all constraints are satisfied", () => {
    const group = {
      ...baseGroup,
      required: true,
      minSelections: 1,
      maxSelections: 3,
      minTotalQty: 2,
      maxTotalQty: 10,
    };
    const selections = { opt1: 2, opt2: 3 };
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe("Option-level Validation", () => {
  const baseOption: Option = {
    id: "test-opt",
    name: "測試選項",
    price: 100,
    minQty: 1,
    maxQty: 10,
    step: 1,
  };

  it("should pass for valid quantity", () => {
    const result = validateOptionQty(baseOption, 5);
    expect(result.isValid).toBe(true);
  });

  it("should fail for quantity below minQty", () => {
    const result = validateOptionQty(baseOption, 0);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("數量不能少於 1");
  });

  it("should fail for quantity above maxQty", () => {
    const result = validateOptionQty(baseOption, 11);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("數量不能超過 10");
  });

  it("should use default values when not specified", () => {
    const option: Option = {
      id: "test",
      name: "Test",
      price: 100,
    };
    
    expect(validateOptionQty(option, 0).isValid).toBe(true);
    expect(validateOptionQty(option, 99).isValid).toBe(true);
    expect(validateOptionQty(option, 100).isValid).toBe(false);
  });
});

describe("Edge Cases", () => {
  it("should handle empty selections", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: false,
      selectionMode: "multi",
      options: [],
    };
    const result = validateGroupRules(group, {});
    expect(result.isValid).toBe(true);
  });

  it("should handle zero quantity selections", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "single",
      options: [],
    };
    const selections = { opt1: 0, opt2: 0 };
    const result = validateGroupRules(group, selections);
    expect(result.isValid).toBe(false);
  });

  it("should handle multiple validation errors", () => {
    const group: OptionGroup = {
      id: "test",
      label: "Test",
      order: 0,
      required: true,
      selectionMode: "multi",
      minSelections: 3,
      maxSelections: 2, // Invalid: min > max
      options: [],
    };
    const selections = { opt1: 1 };
    const result = validateGroupRules(group, selections);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});
