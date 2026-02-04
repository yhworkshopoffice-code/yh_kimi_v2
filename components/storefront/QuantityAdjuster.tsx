"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantityAdjusterProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function QuantityAdjuster({
  value,
  min = 0,
  max = 99,
  step = 1,
  onChange,
  disabled = false,
}: QuantityAdjusterProps) {
  const canDecrement = value > min && !disabled;
  const canIncrement = value < max && !disabled;

  const handleDecrement = () => {
    if (canDecrement) {
      const newValue = Math.max(min, value - step);
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    if (canIncrement) {
      const newValue = Math.min(max, value + step);
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full border-slate-700 bg-slate-800 text-slate-300",
          "hover:bg-slate-700 hover:text-white",
          "disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        onClick={handleDecrement}
        disabled={!canDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <span className={cn(
        "w-8 text-center font-bold text-lg",
        disabled ? "text-slate-500" : "text-white"
      )}>
        {value}
      </span>
      
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full border-slate-700 bg-slate-800 text-slate-300",
          "hover:bg-slate-700 hover:text-white",
          "disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        onClick={handleIncrement}
        disabled={!canIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
