"use client";

import Image from "next/image";
import { Check, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { QuantityAdjuster } from "./QuantityAdjuster";
import { Option } from "@/lib/storefront/types";

interface OptionCardProps {
  option: Option;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
  selected?: boolean;
}

export function OptionCard({
  option,
  quantity,
  onQuantityChange,
  disabled = false,
  selected = false,
}: OptionCardProps) {
  const isSelected = quantity > 0;
  
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        "border-2 bg-slate-900",
        selected || isSelected
          ? "border-purple-500 bg-purple-500/10"
          : "border-slate-800 hover:border-slate-600",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Selection Indicator */}
      {(selected || isSelected) && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            {quantity > 0 && (
              <Badge className="bg-purple-500 text-white border-0">
                x{quantity}
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 p-4">
        {/* Image */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
          {option.image ? (
            <Image
              src={option.image}
              alt={option.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-8 h-8 text-slate-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-bold text-lg truncate",
            selected || isSelected ? "text-purple-400" : "text-white"
          )}>
            {option.name}
          </h3>
          
          {option.description && (
            <p className="text-slate-400 text-sm truncate mt-1">
              {option.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            <span className="text-2xl font-black text-white">
              NT$ {option.price.toLocaleString()}
            </span>

            <QuantityAdjuster
              value={quantity}
              min={option.minQty ?? 0}
              max={option.maxQty ?? 99}
              step={option.step ?? 1}
              onChange={onQuantityChange}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
