"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OptionGroup } from "@/lib/storefront/types";

interface OptionGroupTabsProps {
  groups: OptionGroup[];
  activeGroupId: string;
  onGroupChange: (groupId: string) => void;
  getGroupSelectionCount: (groupId: string) => number;
  getGroupTotalQty: (groupId: string) => number;
  children: React.ReactNode;
}

export function OptionGroupTabs({
  groups,
  activeGroupId,
  onGroupChange,
  getGroupSelectionCount,
  getGroupTotalQty,
  children,
}: OptionGroupTabsProps) {
  return (
    <Tabs
      value={activeGroupId}
      onValueChange={onGroupChange}
      className="w-full"
    >
      <TabsList className="w-full bg-slate-900 border border-slate-800 p-1 flex flex-wrap gap-1">
        {groups.map((group) => {
          const selectionCount = getGroupSelectionCount(group.id);
          const totalQty = getGroupTotalQty(group.id);
          const hasSelection = selectionCount > 0;

          return (
            <TabsTrigger
              key={group.id}
              value={group.id}
              className={cn(
                "flex-1 min-w-[120px] px-4 py-2 rounded-lg text-sm font-medium transition-all",
                "data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-slate-400",
                "data-[state=active]:bg-purple-600 data-[state=active]:text-white",
                "hover:data-[state=inactive]:bg-slate-700"
              )}
            >
              <div className="flex items-center gap-2">
                <span>{group.label}</span>
                {hasSelection && (
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white border-0 text-xs"
                  >
                    {totalQty > 1 ? `${totalQty}` : selectionCount}
                  </Badge>
                )}
                {group.required && !hasSelection && (
                  <span className="text-amber-400 text-xs">*</span>
                )}
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {groups.map((group) => (
        <TabsContent 
          key={group.id} 
          value={group.id}
          className="mt-4"
        >
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
}
