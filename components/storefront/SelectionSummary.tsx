"use client";

import { ShoppingCart, Package } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SelectionSummaryProps {
  totalItems: number;
  totalPrice: number;
  groupBreakdown?: Array<{
    groupLabel: string;
    itemCount: number;
    groupTotal: number;
  }>;
}

export function SelectionSummary({
  totalItems,
  totalPrice,
  groupBreakdown,
}: SelectionSummaryProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-purple-400" />
          </div>
          
          <div>
            <p className="text-slate-400 text-sm">已選商品</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">{totalItems}</span>
              <span className="text-slate-500">件</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-slate-400 text-sm">總計</p>
          <p className="text-3xl font-black text-green-400">
            NT$ {totalPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {groupBreakdown && groupBreakdown.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-slate-500 text-xs mb-2">明細</p>
          <div className="space-y-1">
            {groupBreakdown.map((group, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Package className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-400">{group.groupLabel}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500">{group.itemCount} 件</span>
                  <span className="text-white font-medium">
                    NT$ {group.groupTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
