"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Copy,
  Gift,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Crown,
  Tag
} from "lucide-react"

// 優惠券類型
const couponTypes = [
  { value: "percentage", label: "百分比折扣", icon: TrendingUp },
  { value: "fixed", label: "固定金額", icon: Tag },
  { value: "free_shipping", label: "免運費", icon: Gift },
]

// 適用對象
const applicableTargets = [
  { value: "all", label: "所有會員" },
  { value: "vip_bronze", label: "青銅 VIP 以上" },
  { value: "vip_silver", label: "白銀 VIP 以上" },
  { value: "vip_gold", label: "黃金 VIP 以上" },
  { value: "new_user", label: "新會員" },
]

// 模擬優惠券資料
const couponsData = [
  {
    id: "CPN-001",
    code: "WELCOME2026",
    name: "新會員歡迎禮",
    type: "percentage",
    value: 10,
    minOrder: 500,
    maxDiscount: 200,
    target: "new_user",
    usageLimit: 1,
    usageCount: 156,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "active",
    description: "新會員首次消費享 9 折優惠",
  },
  {
    id: "CPN-002",
    code: "VIPBRONZE",
    name: "青銅 VIP 專屬",
    type: "fixed",
    value: 50,
    minOrder: 500,
    maxDiscount: null,
    target: "vip_bronze",
    usageLimit: null,
    usageCount: 89,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "active",
    description: "青銅 VIP 每月專屬優惠券",
  },
  {
    id: "CPN-003",
    code: "VIPSILVER",
    name: "白銀 VIP 專屬",
    type: "fixed",
    value: 100,
    minOrder: 1000,
    maxDiscount: null,
    target: "vip_silver",
    usageLimit: null,
    usageCount: 45,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "active",
    description: "白銀 VIP 每月專屬優惠券",
  },
  {
    id: "CPN-004",
    code: "VIPGOLD",
    name: "黃金 VIP 專屬",
    type: "fixed",
    value: 200,
    minOrder: 2000,
    maxDiscount: null,
    target: "vip_gold",
    usageLimit: null,
    usageCount: 23,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "active",
    description: "黃金 VIP 每月專屬優惠券",
  },
  {
    id: "CPN-005",
    code: "SPRING2026",
    name: "春季特惠",
    type: "percentage",
    value: 15,
    minOrder: 1000,
    maxDiscount: 500,
    target: "all",
    usageLimit: null,
    usageCount: 234,
    startDate: "2026-02-01",
    endDate: "2026-04-30",
    status: "active",
    description: "春季限定 85 折優惠",
  },
  {
    id: "CPN-006",
    code: "FLASHSALE",
    name: "限時快閃",
    type: "percentage",
    value: 20,
    minOrder: 2000,
    maxDiscount: 1000,
    target: "all",
    usageLimit: 100,
    usageCount: 100,
    startDate: "2026-01-15",
    endDate: "2026-01-20",
    status: "expired",
    description: "限時快閃 8 折優惠（已結束）",
  },
]

// 優惠券統計
const couponStats = {
  total: couponsData.length,
  active: couponsData.filter(c => c.status === "active").length,
  expired: couponsData.filter(c => c.status === "expired").length,
  totalUsage: couponsData.reduce((sum, c) => sum + c.usageCount, 0),
}

// 狀態徽章
function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    expired: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    disabled: "bg-red-500/10 text-red-400 border-red-500/20",
  }
  const labels = {
    active: "進行中",
    expired: "已過期",
    disabled: "已停用",
  }
  return (
    <Badge variant="outline" className={styles[status as keyof typeof styles]}>
      {labels[status as keyof typeof labels]}
    </Badge>
  )
}

// 類型徽章
function TypeBadge({ type, value }: { type: string; value: number }) {
  const labels = {
    percentage: `${value}% OFF`,
    fixed: `NT$ ${value}`,
    free_shipping: "免運",
  }
  const colors = {
    percentage: "bg-purple-500/10 text-purple-400",
    fixed: "bg-cyan-500/10 text-cyan-400",
    free_shipping: "bg-emerald-500/10 text-emerald-400",
  }
  return (
    <Badge className={`${colors[type as keyof typeof colors]}`}>
      {labels[type as keyof typeof labels]}
    </Badge>
  )
}

// 適用對象徽章
function TargetBadge({ target }: { target: string }) {
  const labels: Record<string, string> = {
    all: "全部",
    vip_bronze: "青銅+",
    vip_silver: "白銀+",
    vip_gold: "黃金",
    new_user: "新會員",
  }
  const colors: Record<string, string> = {
    all: "bg-slate-500/10 text-slate-400",
    vip_bronze: "bg-orange-500/10 text-orange-400",
    vip_silver: "bg-slate-300/10 text-slate-300",
    vip_gold: "bg-amber-500/10 text-amber-400",
    new_user: "bg-emerald-500/10 text-emerald-400",
  }
  return (
    <Badge className={colors[target]}>
      {labels[target]}
    </Badge>
  )
}

// 新增/編輯優惠券對話框
function CouponDialog({ coupon, onSave }: { coupon?: typeof couponsData[0], onSave: () => void }) {
  const [open, setOpen] = useState(false)
  const isEditing = !!coupon

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
            <Edit className="w-4 h-4 mr-1" />
            編輯
          </Button>
        ) : (
          <Button className="bg-cyan-500 hover:bg-cyan-600">
            <Plus className="w-4 h-4 mr-2" />
            新增優惠券
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "編輯優惠券" : "新增優惠券"}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {isEditing ? `編輯優惠券：${coupon?.name}` : "設定新的優惠券代碼與規則"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>優惠券代碼</Label>
              <Input 
                defaultValue={coupon?.code}
                placeholder="例如：WELCOME2026"
                className="bg-slate-800 border-slate-700 text-white uppercase"
              />
            </div>
            <div className="space-y-2">
              <Label>優惠券名稱</Label>
              <Input 
                defaultValue={coupon?.name}
                placeholder="例如：新會員歡迎禮"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>描述</Label>
            <Input 
              defaultValue={coupon?.description}
              placeholder="優惠券描述"
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>優惠類型</Label>
              <Select defaultValue={coupon?.type || "percentage"}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {couponTypes.map(type => (
                    <SelectItem key={type.value} value={type.value} className="text-white">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>優惠數值</Label>
              <Input 
                type="number"
                defaultValue={coupon?.value}
                placeholder="例如：10 表示 10% 或 NT$ 10"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>最低消費金額 (NT$)</Label>
              <Input 
                type="number"
                defaultValue={coupon?.minOrder}
                placeholder="0"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>最高折扣金額 (NT$)</Label>
              <Input 
                type="number"
                defaultValue={coupon?.maxDiscount || ""}
                placeholder="不限"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>適用對象</Label>
            <Select defaultValue={coupon?.target || "all"}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {applicableTargets.map(target => (
                  <SelectItem key={target.value} value={target.value} className="text-white">
                    {target.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>開始日期</Label>
              <Input 
                type="date"
                defaultValue={coupon?.startDate}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>結束日期</Label>
              <Input 
                type="date"
                defaultValue={coupon?.endDate}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>使用次數限制 (空白表示不限)</Label>
            <Input 
              type="number"
              defaultValue={coupon?.usageLimit || ""}
              placeholder="每位會員可使用次數"
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-slate-700 text-slate-300">
            取消
          </Button>
          <Button onClick={() => { onSave(); setOpen(false) }} className="bg-cyan-500 hover:bg-cyan-600">
            {isEditing ? "保存變更" : "建立優惠券"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 刪除確認對話框
function DeleteDialog({ couponName, onDelete }: { couponName: string, onDelete: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>確認刪除</DialogTitle>
          <DialogDescription className="text-slate-400">
            確定要刪除優惠券「{couponName}」嗎？此操作無法撤銷。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="border-slate-700 text-slate-300">
            取消
          </Button>
          <Button onClick={() => { onDelete(); setOpen(false) }} className="bg-red-500 hover:bg-red-600">
            確認刪除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [coupons, setCoupons] = useState(couponsData)

  // 過濾優惠券
  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = 
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.name.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSave = () => {
    console.log("保存優惠券")
  }

  const handleDelete = () => {
    console.log("刪除優惠券")
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">優惠券管理</h1>
          <p className="text-slate-400 mt-1">管理優惠券代碼、發放規則與使用統計</p>
        </div>
        <CouponDialog onSave={handleSave} />
      </div>

      {/* 統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Gift className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">總優惠券數</p>
                <p className="text-2xl font-bold text-white">{couponStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">進行中</p>
                <p className="text-2xl font-bold text-emerald-400">{couponStats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">已過期</p>
                <p className="text-2xl font-bold text-slate-400">{couponStats.expired}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">總使用次數</p>
                <p className="text-2xl font-bold text-amber-400">{couponStats.totalUsage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜尋與篩選 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                placeholder="搜尋優惠券代碼或名稱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="狀態篩選" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white">全部狀態</SelectItem>
                <SelectItem value="active" className="text-white">進行中</SelectItem>
                <SelectItem value="expired" className="text-white">已過期</SelectItem>
                <SelectItem value="disabled" className="text-white">已停用</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 優惠券列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">優惠券列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">優惠券</TableHead>
                <TableHead className="text-slate-400">類型</TableHead>
                <TableHead className="text-slate-400">適用對象</TableHead>
                <TableHead className="text-slate-400">使用統計</TableHead>
                <TableHead className="text-slate-400">有效期</TableHead>
                <TableHead className="text-slate-400">狀態</TableHead>
                <TableHead className="text-slate-400 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{coupon.name}</p>
                        <button 
                          onClick={() => copyCode(coupon.code)}
                          className="text-slate-500 hover:text-cyan-400 transition-colors"
                          title="複製代碼"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-mono text-cyan-400">{coupon.code}</p>
                      <p className="text-xs text-slate-500 mt-1">{coupon.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={coupon.type} value={coupon.value} />
                    <p className="text-xs text-slate-500 mt-1">
                      最低消費 NT$ {coupon.minOrder.toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <TargetBadge target={coupon.target} />
                  </TableCell>
                  <TableCell>
                    <div className="text-white">
                      {coupon.usageCount.toLocaleString()} 次
                    </div>
                    {coupon.usageLimit && (
                      <p className="text-xs text-slate-500">
                        上限: {coupon.usageLimit} 次/人
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-sm">{coupon.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-sm">{coupon.endDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={coupon.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <CouponDialog coupon={coupon} onSave={handleSave} />
                      <DeleteDialog couponName={coupon.name} onDelete={handleDelete} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
