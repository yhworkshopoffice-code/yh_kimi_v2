"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  GripVertical,
  Package,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { OptionGroup, Option } from "@/lib/types"
import { GAMES } from "@/lib/storefront/constants"
import { getGameOptionGroups } from "@/lib/storefront/optionGroupUtils"

// Option Group Form Component
function OptionGroupForm({ 
  group, 
  onSave, 
  onCancel 
}: { 
  group?: OptionGroup
  onSave: (group: OptionGroup) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<OptionGroup>>({
    id: group?.id || ``,
    label: group?.label || "",
    order: group?.order || 0,
    required: group?.required ?? true,
    selectionMode: group?.selectionMode || "single",
    minSelections: group?.minSelections,
    maxSelections: group?.maxSelections,
    minTotalQty: group?.minTotalQty,
    maxTotalQty: group?.maxTotalQty,
    options: group?.options || [],
  })

  const [errors, setErrors] = useState<string[]>([])

  const validate = (): boolean => {
    const newErrors: string[] = []

    if (!formData.label?.trim()) {
      newErrors.push("類別名稱為必填")
    }

    if (formData.selectionMode === "single") {
      if (formData.maxSelections && formData.maxSelections > 1) {
        newErrors.push("單選模式不可設定 maxSelections > 1")
      }
    }

    if (formData.minSelections !== undefined && formData.maxSelections !== undefined) {
      if (formData.minSelections > formData.maxSelections) {
        newErrors.push("minSelections 不可大於 maxSelections")
      }
    }

    if (formData.minTotalQty !== undefined && formData.maxTotalQty !== undefined) {
      if (formData.minTotalQty > formData.maxTotalQty) {
        newErrors.push("minTotalQty 不可大於 maxTotalQty")
      }
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSave = () => {
    if (validate()) {
      onSave(formData as OptionGroup)
    }
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {errors.length > 0 && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="font-bold text-sm">請修正以下錯誤：</span>
          </div>
          <ul className="space-y-1">
            {errors.map((error, idx) => (
              <li key={idx} className="text-red-300 text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>類別名稱 *</Label>
          <span className="text-xs text-slate-500" title="顯示在 Tab 上的名稱">ⓘ</span>
        </div>
        <Input
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          placeholder="例如：儲值方案、加購商品"
          className="bg-slate-800 border-slate-700"
        />
        <p className="text-xs text-slate-500">這個名稱會顯示在 Tab 上讓客戶選擇</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>排序</Label>
          <Input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="bg-slate-800 border-slate-700"
          />
        </div>
        <div className="space-y-2">
          <Label>是否必選</Label>
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              checked={formData.required}
              onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
            />
            <span className="text-sm text-slate-400">{formData.required ? "必選" : "非必選"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>選擇模式</Label>
          <span className="text-xs text-slate-500" title="單選：客戶只能選一個選項；多選：客戶可以選多個選項">ⓘ</span>
        </div>
        <Select
          value={formData.selectionMode}
          onValueChange={(value: "single" | "multi") => setFormData({ ...formData, selectionMode: value })}
        >
          <SelectTrigger className="bg-slate-800 border-slate-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">單選（只能選一個）</SelectItem>
            <SelectItem value="multi">多選（可選多個）</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-slate-500">
          {formData.selectionMode === "single" 
            ? "單選模式下，客戶選擇新選項時會自動取消之前的選擇" 
            : "多選模式下，客戶可以同時選擇多個選項，各自調整數量"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>最少選擇數量</Label>
            <span className="text-xs text-slate-500" title="客戶至少要選幾個「不同」的選項">ⓘ</span>
          </div>
          <Input
            type="number"
            value={formData.minSelections || ""}
            onChange={(e) => setFormData({ ...formData, minSelections: e.target.value ? parseInt(e.target.value) : undefined })}
            placeholder="不限"
            className="bg-slate-800 border-slate-700"
          />
          <p className="text-xs text-slate-500">客戶至少要選幾個「不同」的選項</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>最多選擇數量</Label>
            <span className="text-xs text-slate-500" title="客戶最多可以選幾個「不同」的選項">ⓘ</span>
          </div>
          <Input
            type="number"
            value={formData.maxSelections || ""}
            onChange={(e) => setFormData({ ...formData, maxSelections: e.target.value ? parseInt(e.target.value) : undefined })}
            placeholder="不限"
            className="bg-slate-800 border-slate-700"
          />
          <p className="text-xs text-slate-500">客戶最多可以選幾個「不同」的選項</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>最少總數量</Label>
            <span className="text-xs text-slate-500" title="所有選項的數量加總至少要達到這個數字">ⓘ</span>
          </div>
          <Input
            type="number"
            value={formData.minTotalQty || ""}
            onChange={(e) => setFormData({ ...formData, minTotalQty: e.target.value ? parseInt(e.target.value) : undefined })}
            placeholder="不限"
            className="bg-slate-800 border-slate-700"
          />
          <p className="text-xs text-slate-500">所有選項的數量加總至少要達到這個數字</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>最多總數量</Label>
            <span className="text-xs text-slate-500" title="所有選項的數量加總不能超過這個數字">ⓘ</span>
          </div>
          <Input
            type="number"
            value={formData.maxTotalQty || ""}
            onChange={(e) => setFormData({ ...formData, maxTotalQty: e.target.value ? parseInt(e.target.value) : undefined })}
            placeholder="不限"
            className="bg-slate-800 border-slate-700"
          />
          <p className="text-xs text-slate-500">所有選項的數量加總不能超過這個數字</p>
        </div>
      </div>

      {/* Validation Preview */}
      <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg mt-4">
        <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          規則預覽
        </h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">選擇模式:</span>
            <span className={formData.selectionMode === "single" ? "text-cyan-400" : "text-purple-400"}>
              {formData.selectionMode === "single" ? "單選（只能選一個）" : "多選（可選多個）"}
            </span>
          </div>
          {formData.required && (
            <div className="flex justify-between">
              <span className="text-slate-400">必選:</span>
              <span className="text-amber-400">是</span>
            </div>
          )}
          {formData.minSelections !== undefined && (
            <div className="flex justify-between">
              <span className="text-slate-400">最少選擇:</span>
              <span className="text-white">{formData.minSelections} 個選項</span>
            </div>
          )}
          {formData.maxSelections !== undefined && (
            <div className="flex justify-between">
              <span className="text-slate-400">最多選擇:</span>
              <span className="text-white">{formData.maxSelections} 個選項</span>
            </div>
          )}
          {formData.minTotalQty !== undefined && (
            <div className="flex justify-between">
              <span className="text-slate-400">最少總數:</span>
              <span className="text-white">{formData.minTotalQty} 件</span>
            </div>
          )}
          {formData.maxTotalQty !== undefined && (
            <div className="flex justify-between">
              <span className="text-slate-400">最多總數:</span>
              <span className="text-white">{formData.maxTotalQty} 件</span>
            </div>
          )}
          <div className="pt-2 border-t border-slate-700 mt-2">
            <p className="text-xs text-slate-500">
              {formData.selectionMode === "single" 
                ? "✓ 選擇一個選項後，其他選項會自動取消" 
                : "✓ 可同時選擇多個選項"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="border-slate-700">
          取消
        </Button>
        <Button onClick={handleSave} className="bg-cyan-500 hover:bg-cyan-600">
          保存
        </Button>
      </div>
    </div>
  )
}

// Option Form Component
function OptionForm({
  option,
  onSave,
  onCancel,
}: {
  option?: Option
  onSave: (option: Option) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Option>>({
    id: option?.id || ``,
    name: option?.name || "",
    price: option?.price || 0,
    image: option?.image || "",
    description: option?.description || "",
    minQty: option?.minQty ?? 0,
    maxQty: option?.maxQty ?? 99,
    step: option?.step ?? 1,
  })

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>選項名稱 *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="例如：1000 遊戲幣"
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label>價格 *</Label>
        <Input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label>圖片 URL</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://..."
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label>描述</Label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="選項描述..."
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>最小數量</Label>
          <Input
            type="number"
            value={formData.minQty}
            onChange={(e) => setFormData({ ...formData, minQty: parseInt(e.target.value) || 0 })}
            className="bg-slate-800 border-slate-700"
          />
        </div>
        <div className="space-y-2">
          <Label>最大數量</Label>
          <Input
            type="number"
            value={formData.maxQty}
            onChange={(e) => setFormData({ ...formData, maxQty: parseInt(e.target.value) || 99 })}
            className="bg-slate-800 border-slate-700"
          />
        </div>
        <div className="space-y-2">
          <Label>步進值</Label>
          <Input
            type="number"
            value={formData.step}
            onChange={(e) => setFormData({ ...formData, step: parseInt(e.target.value) || 1 })}
            className="bg-slate-800 border-slate-700"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="border-slate-700">
          取消
        </Button>
        <Button 
          onClick={() => onSave(formData as Option)} 
          className="bg-cyan-500 hover:bg-cyan-600"
          disabled={!formData.name || formData.price === undefined}
        >
          保存
        </Button>
      </div>
    </div>
  )
}

function OptionGroupsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gameId = searchParams.get("gameId")
  
  const game = GAMES.find((g) => g.id === gameId)
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>(
    game ? getGameOptionGroups(game) : []
  )
  
  const [editingGroup, setEditingGroup] = useState<OptionGroup | undefined>()
  const [editingOption, setEditingOption] = useState<{ groupId: string; option?: Option } | null>(null)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false)

  if (!game) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-white font-bold">找不到該遊戲</p>
        <Button 
          variant="outline" 
          className="mt-4 border-slate-700"
          onClick={() => router.push("/admin/products")}
        >
          返回商品列表
        </Button>
      </div>
    )
  }

  const handleSaveGroup = (group: OptionGroup) => {
    if (editingGroup) {
      // Update existing
      setOptionGroups(optionGroups.map((g) => (g.id === editingGroup.id ? group : g)))
    } else {
      // Create new
      setOptionGroups([...optionGroups, { ...group, id: `group_${Date.now()}`, options: [] }])
    }
    setIsGroupDialogOpen(false)
    setEditingGroup(undefined)
  }

  const handleDeleteGroup = (groupId: string) => {
    setOptionGroups(optionGroups.filter((g) => g.id !== groupId))
  }

  const handleSaveOption = (option: Option) => {
    if (!editingOption) return
    
    const { groupId } = editingOption
    
    setOptionGroups(optionGroups.map((group) => {
      if (group.id !== groupId) return group
      
      if (editingOption.option) {
        // Update existing
        return {
          ...group,
          options: group.options.map((o) => (o.id === editingOption.option!.id ? option : o)),
        }
      } else {
        // Create new
        return {
          ...group,
          options: [...group.options, { ...option, id: `opt_${Date.now()}` }],
        }
      }
    }))
    
    setIsOptionDialogOpen(false)
    setEditingOption(null)
  }

  const handleDeleteOption = (groupId: string, optionId: string) => {
    setOptionGroups(optionGroups.map((group) => {
      if (group.id !== groupId) return group
      return {
        ...group,
        options: group.options.filter((o) => o.id !== optionId),
      }
    }))
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="border-slate-700"
            onClick={() => router.push("/admin/products")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">選項類別管理</h1>
            <p className="text-slate-400">{game.name}</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setEditingGroup(undefined)
            setIsGroupDialogOpen(true)
          }}
          className="bg-cyan-500 hover:bg-cyan-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增類別
        </Button>
      </div>

      {/* Option Groups List */}
      <div className="space-y-4">
        {optionGroups.length === 0 ? (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">暫無選項類別</p>
              <p className="text-slate-500 text-sm mt-1">點擊上方按鈕新增類別</p>
            </CardContent>
          </Card>
        ) : (
          optionGroups.map((group) => (
            <Card key={group.id} className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-slate-600 cursor-move" />
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        {group.label}
                        {group.required && (
                          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                            必選
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        {group.selectionMode === "single" ? "單選" : "多選"} · 
                        {group.options.length} 個選項
                        {group.minSelections !== undefined && ` · 最少 ${group.minSelections} 個`}
                        {group.maxSelections !== undefined && ` · 最多 ${group.maxSelections} 個`}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700"
                      onClick={() => {
                        setEditingGroup(group)
                        setIsGroupDialogOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      編輯
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="options" className="border-slate-800">
                    <AccordionTrigger className="text-slate-300 hover:text-white">
                      選項列表 ({group.options.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {group.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {option.image ? (
                                <img
                                  src={option.image}
                                  alt={option.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                                  <Package className="w-5 h-5 text-slate-500" />
                                </div>
                              )}
                              <div>
                                <p className="text-white font-medium">{option.name}</p>
                                <p className="text-slate-400 text-sm">
                                  NT$ {option.price.toLocaleString()} · 
                                  數量 {option.minQty}-{option.maxQty}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-white"
                                onClick={() => {
                                  setEditingOption({ groupId: group.id, option })
                                  setIsOptionDialogOpen(true)
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => handleDeleteOption(group.id, option.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="w-full border-slate-700 border-dashed mt-2"
                          onClick={() => {
                            setEditingOption({ groupId: group.id })
                            setIsOptionDialogOpen(true)
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          新增選項
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Group Dialog */}
      <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingGroup ? "編輯類別" : "新增類別"}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              設定類別名稱與選擇規則
            </DialogDescription>
          </DialogHeader>
          <OptionGroupForm
            group={editingGroup}
            onSave={handleSaveGroup}
            onCancel={() => {
              setIsGroupDialogOpen(false)
              setEditingGroup(undefined)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Option Dialog */}
      <Dialog open={isOptionDialogOpen} onOpenChange={setIsOptionDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingOption?.option ? "編輯選項" : "新增選項"}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              設定選項名稱、價格與數量限制
            </DialogDescription>
          </DialogHeader>
          <OptionForm
            option={editingOption?.option}
            onSave={handleSaveOption}
            onCancel={() => {
              setIsOptionDialogOpen(false)
              setEditingOption(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Main page component with Suspense
export default function OptionGroupsPageWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">載入中...</div>}>
      <OptionGroupsPage />
    </Suspense>
  )
}
