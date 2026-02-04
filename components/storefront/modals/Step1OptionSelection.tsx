"use client";

import { useReducer, useMemo, useState } from "react";
import { AlertCircle, ChevronRight } from "lucide-react";
import { Game, OptionGroup, Option } from "@/lib/types";
import { getGameOptionGroups } from "@/lib/storefront/optionGroupUtils";
import { OptionCard } from "../OptionCard";
import { OptionGroupTabs } from "../OptionGroupTabs";
import { SelectionSummary } from "../SelectionSummary";

// Selection state type
type SelectionState = {
  [groupId: string]: {
    [optionId: string]: number;
  };
};

type SelectionAction =
  | { type: "SET_QUANTITY"; groupId: string; optionId: string; quantity: number }
  | { type: "RESET" };

function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case "SET_QUANTITY":
      return {
        ...state,
        [action.groupId]: {
          ...state[action.groupId],
          [action.optionId]: action.quantity,
        },
      };
    case "RESET":
      return {};
    default:
      return state;
  }
}

interface Step1OptionSelectionProps {
  game: Game;
  onNext: () => void;
}

export function Step1OptionSelection({ game, onNext }: Step1OptionSelectionProps) {
  const [selections, dispatch] = useReducer(selectionReducer, {});
  const [activeGroupId, setActiveGroupId] = useState<string>("");
  const [configError, setConfigError] = useState<string | null>(null);

  const optionGroups = useMemo(() => {
    const groups = getGameOptionGroups(game);
    if (groups.length > 0 && !activeGroupId) {
      setActiveGroupId(groups[0].id);
    }
    return groups;
  }, [game, activeGroupId]);

  // Validation logic
  const validation = useMemo(() => {
    const errors: string[] = [];
    let isValid = true;

    for (const group of optionGroups) {
      const groupSelections = selections[group.id] || {};
      const selectedOptions = Object.entries(groupSelections).filter(([, qty]) => qty > 0);
      const selectionCount = selectedOptions.length;
      const totalQty = selectedOptions.reduce((sum, [, qty]) => sum + qty, 0);

      // Check required
      if (group.required && selectionCount === 0) {
        errors.push(`${group.label} 為必選`);
        isValid = false;
      }

      // Check minSelections
      if (group.minSelections !== undefined && selectionCount < group.minSelections) {
        errors.push(`${group.label} 至少需要選擇 ${group.minSelections} 個選項`);
        isValid = false;
      }

      // Check maxSelections
      if (group.maxSelections !== undefined && selectionCount > group.maxSelections) {
        errors.push(`${group.label} 最多只能選擇 ${group.maxSelections} 個選項`);
        isValid = false;
      }

      // Check minTotalQty
      if (group.minTotalQty !== undefined && totalQty < group.minTotalQty) {
        errors.push(`${group.label} 至少需要 ${group.minTotalQty} 件商品`);
        isValid = false;
      }

      // Check maxTotalQty
      if (group.maxTotalQty !== undefined && totalQty > group.maxTotalQty) {
        errors.push(`${group.label} 最多只能 ${group.maxTotalQty} 件商品`);
        isValid = false;
      }

      // Check configuration validity
      if (group.minTotalQty !== undefined && group.maxTotalQty !== undefined) {
        const maxPossibleQty = group.options.reduce((sum: number, opt: Option) => sum + (opt.maxQty || 99), 0);
        if (group.minTotalQty > maxPossibleQty) {
          setConfigError(`${group.label} 配置錯誤：最小總數量超過最大可選數量`);
          isValid = false;
        }
      }
    }

    return { isValid, errors };
  }, [optionGroups, selections]);

  // Calculate totals
  const { totalItems, totalPrice, groupBreakdown } = useMemo(() => {
    let items = 0;
    let price = 0;
    const breakdown: Array<{ groupLabel: string; itemCount: number; groupTotal: number }> = [];

    for (const group of optionGroups) {
      const groupSelections = selections[group.id] || {};
      let groupItems = 0;
      let groupTotal = 0;

      for (const option of group.options) {
        const qty = groupSelections[option.id] || 0;
        if (qty > 0) {
          items += qty;
          price += option.price * qty;
          groupItems += qty;
          groupTotal += option.price * qty;
        }
      }

      if (groupItems > 0) {
        breakdown.push({
          groupLabel: group.label,
          itemCount: groupItems,
          groupTotal,
        });
      }
    }

    return { totalItems: items, totalPrice: price, groupBreakdown: breakdown };
  }, [optionGroups, selections]);

  // Helper functions
  const getQuantity = (groupId: string, optionId: string): number => {
    return selections[groupId]?.[optionId] || 0;
  };

  const getGroupSelectionCount = (groupId: string): number => {
    const groupSelections = selections[groupId] || {};
    return Object.values(groupSelections).filter((qty) => qty > 0).length;
  };

  const getGroupTotalQty = (groupId: string): number => {
    const groupSelections = selections[groupId] || {};
    return Object.values(groupSelections).reduce((sum, qty) => sum + qty, 0);
  };

  const isOptionDisabled = (group: OptionGroup, option: Option): boolean => {
    if (configError) return true;

    const currentQty = getQuantity(group.id, option.id);
    const groupSelections = selections[group.id] || {};
    const selectionCount = Object.values(groupSelections).filter((qty) => qty > 0).length;
    const totalQty = getGroupTotalQty(group.id);

    // Single mode: disable other options when one is selected
    if (group.selectionMode === "single" && selectionCount > 0 && currentQty === 0) {
      return true;
    }

    // Max selections reached
    if (group.maxSelections !== undefined && selectionCount >= group.maxSelections && currentQty === 0) {
      return true;
    }

    // Max total qty reached
    if (group.maxTotalQty !== undefined && totalQty >= group.maxTotalQty) {
      return true;
    }

    return false;
  };

  const handleQuantityChange = (group: OptionGroup, option: Option, quantity: number) => {
    // Handle single mode auto-deselect
    if (group.selectionMode === "single" && quantity > 0) {
      const groupSelections = selections[group.id] || {};
      // Reset all other options in this group
      Object.keys(groupSelections).forEach((optId) => {
        if (optId !== option.id) {
          dispatch({ type: "SET_QUANTITY", groupId: group.id, optionId: optId, quantity: 0 });
        }
      });
    }

    dispatch({ type: "SET_QUANTITY", groupId: group.id, optionId: option.id, quantity });
  };

  const activeGroup = optionGroups.find((g) => g.id === activeGroupId);

  if (optionGroups.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-white font-bold">此商品暫無可選方案</p>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-right-10 duration-300 space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <ChevronRight className="text-purple-500" /> 請選擇商品方案
      </h3>

      {configError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="font-bold">配置錯誤</span>
          </div>
          <p className="text-red-300 text-sm mt-1">{configError}</p>
          <p className="text-slate-400 text-xs mt-2">請聯繫客服處理此問題</p>
        </div>
      )}

      <OptionGroupTabs
        groups={optionGroups}
        activeGroupId={activeGroupId}
        onGroupChange={setActiveGroupId}
        getGroupSelectionCount={getGroupSelectionCount}
        getGroupTotalQty={getGroupTotalQty}
      >
        {activeGroup && (
          <div className="space-y-4">
            {activeGroup.options.map((option: Option) => (
              <OptionCard
                key={option.id}
                option={option}
                quantity={getQuantity(activeGroup.id, option.id)}
                onQuantityChange={(qty) => handleQuantityChange(activeGroup, option, qty)}
                disabled={isOptionDisabled(activeGroup, option)}
                selected={getQuantity(activeGroup.id, option.id) > 0}
              />
            ))}
          </div>
        )}
      </OptionGroupTabs>

      <SelectionSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        groupBreakdown={groupBreakdown}
      />

      {validation.errors.length > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-amber-400 text-sm font-bold mb-2">請完成以下項目：</p>
          <ul className="space-y-1">
            {validation.errors.map((error, index) => (
              <li key={index} className="text-amber-300 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        disabled={!validation.isValid || configError !== null}
        onClick={onNext}
        className="w-full px-12 py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-3xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3"
      >
        下一步 <ChevronRight size={24} />
      </button>
    </div>
  );
}
