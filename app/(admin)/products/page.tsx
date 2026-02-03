"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Gamepad2,
  Package,
  DollarSign,
  TrendingUp,
  Image,
  Tag,
  CheckCircle,
  XCircle
} from "lucide-react"

// 遊戲類型
const gameCategories = [
  { id: "all", name: "全部遊戲" },
  { id: "genshin", name: "原神" },
  { id: "hsr", name: "崩壞：星穹鐵道" },
  { id: "zzz", name: "絕區零" },
  { id: "lol", name: "英雄聯盟" },
  { id: "honkai3", name: "崩壞3" },
]

// 商品狀態
const productStatuses = [
  { value: "active", label: "上架中", color: "bg-emerald-500/10 text-emerald-400" },
  { value: "inactive", label: "已下架", color: "bg-slate-500/10 text-slate-400" },
  { value: "outofstock", label: "缺貨", color: "bg-red-500/10 text-red-400" },
]

// 模擬商品數據
const productsData = [
  {
    id: "PROD-001",
    game: "原神",
    gameId: "genshin",
    name: "6480 创世结晶",
    description: "6480 创世结晶 + 1600 创世结晶（赠送）",
    price: 1620,
    cost: 1350,
    stock: 999,
    status: "active",
    sales: 156,
    image: "/games/genshin.jpg",
    tags: ["熱銷", "秒到帳"],
    servers: ["Asia", "TW/HK/MO", "NA", "EU"],
    createdAt: "2025-01-01"
  },
  {
    id: "PROD-002",
    game: "原神",
    gameId: "genshin",
    name: "空月祝福",
    description: "30天空月祝福，每日可領取 90 原石",
    price: 150,
    cost: 120,
    stock: 999,
    status: "active",
    sales: 234,
    image: "/games/genshin.jpg",
    tags: ["熱銷"],
    servers: ["Asia", "TW/HK/MO", "NA", "EU"],
    createdAt: "2025-01-01"
  },
  {
    id: "PROD-003",
    game: "崩壞：星穹鐵道",
    gameId: "hsr",
    name: "6480 夢華",
    description: "6480 夢華 + 1600 夢華（赠送）",
    price: 2450,
    cost: 2050,
    stock: 500,
    status: "active",
    sales: 98,
    image: "/games/hsr.jpg",
    tags: ["秒到帳"],
    servers: ["Asia", "TW/HK/MO", "NA", "EU"],
    createdAt: "2025-02-01"
  },
  {
    id: "PROD-004",
    game: "絕區零",
    gameId: "zzz",
    name: "6480 菲林底片",
    description: "6480 菲林底片 + 1600 菲林底片（赠送）",
    price: 820,
    cost: 680,
    stock: 300,
    status: "active",
    sales: 67,
    image: "/games/zzz.jpg",
    tags: ["新品", "秒到帳"],
    servers: ["Asia", "TW/HK/MO", "NA", "EU"],
    createdAt: "2025-03-01"
  },
  {
    id: "PROD-005",
    game: "英雄聯盟",
    gameId: "lol",
    name: "10000 聯盟幣",
    description: "10000 聯盟幣（RP）",
    price: 1000,
    cost: 850,
    stock: 0,
    status: "outofstock",
    sales: 89,
    image: "/games/lol.jpg",
    tags: [],
    servers: ["TW", "NA", "EUW"],
    createdAt: "2025-01-15"
  },
  {
    id: "PROD-006",
    game: "原神",
    gameId: "genshin",
    name: "1980 创世结晶",
    description: "1980 创世结晶 + 260 创世结晶（赠送）",
    price: 495,
    cost: 410,
    stock: 999,
    status: "inactive",
    sales: 45,
    image: "/games/genshin.jpg",
    tags: [],
    servers: ["Asia", "TW/HK/MO", "NA", "EU"],
    createdAt: "2025-01-01"
  },
]

// 狀態徽章
function StatusBadge({ status }: { status: string }) {
  const statusInfo = productStatuses.find(s => s.value === status) || productStatuses[0]
  return (
    <Badge className={statusInfo.color}>
      {statusInfo.label}
    </Badge>
  )
}

// 新增/編輯商品對話框
function ProductDialog({ product, onSave }: { product?: typeof productsData[0], onSave: () => void }) {
  const [open, setOpen] = useState(false)
  const isEditing = !!product

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
            新增商品
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>{isEditing ? "編輯商品" : "新增商品"}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {isEditing ? `編輯商品：${product?.name}` : "填寫以下資訊新增商品"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>遊戲</Label>
              <Select defaultValue={product?.gameId || "genshin"}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="選擇遊戲" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {gameCategories.filter(g => g.id !== "all").map(game => (
                    <SelectItem key={game.id} value={game.id} className="text-white">
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>商品名稱</Label>
              <Input 
                defaultValue={product?.name} 
                placeholder="例如：6480 创世结晶"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>商品描述</Label>
            <Input 
              defaultValue={product?.description} 
              placeholder="商品詳細描述"
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>售價 (NT$)</Label>
              <Input 
                type="number"
                defaultValue={product?.price} 
                placeholder="1620"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>成本 (NT$)</Label>
              <Input 
                type="number"
                defaultValue={product?.cost} 
                placeholder="1350"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>庫存</Label>
              <Input 
                type="number"
                defaultValue={product?.stock} 
                placeholder="999"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch id="status" defaultChecked={product?.status === "active"} />
              <Label htmlFor="status">上架商品</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="instant" defaultChecked={product?.tags?.includes("秒到帳")} />
              <Label htmlFor="instant">秒到帳</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="hot" defaultChecked={product?.tags?.includes("熱銷")} />
              <Label htmlFor="hot">熱銷標籤</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-slate-700 text-slate-300">
            取消
          </Button>
          <Button onClick={onSave} className="bg-cyan-500 hover:bg-cyan-600">
            {isEditing ? "保存變更" : "新增商品"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 刪除確認對話框
function DeleteDialog({ productName, onDelete }: { productName: string, onDelete: () => void }) {
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
            確定要刪除商品「{productName}」嗎？此操作無法撤銷。
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

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [products, setProducts] = useState(productsData)

  // 過濾商品
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.game.includes(searchQuery)
    const matchesCategory = categoryFilter === "all" || product.gameId === categoryFilter
    return matchesSearch && matchesCategory
  })

  // 統計數據
  const stats = {
    total: products.length,
    active: products.filter(p => p.status === "active").length,
    outOfStock: products.filter(p => p.status === "outofstock").length,
    totalSales: products.reduce((sum, p) => sum + p.sales, 0)
  }

  const handleSave = () => {
    // 模擬保存
    console.log("保存商品")
  }

  const handleDelete = () => {
    // 模擬刪除
    console.log("刪除商品")
  }

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">商品管理</h1>
          <p className="text-slate-400 mt-1">管理遊戲充值商品、價格與庫存</p>
        </div>
        <ProductDialog onSave={handleSave} />
      </div>

      {/* 統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Package className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">總商品數</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
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
                <p className="text-sm text-slate-400">上架中</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">缺貨</p>
                <p className="text-2xl font-bold text-red-400">{stats.outOfStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">總銷量</p>
                <p className="text-2xl font-bold text-amber-400">{stats.totalSales}</p>
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
                placeholder="搜尋商品名稱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="遊戲篩選" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {gameCategories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id} className="text-white">
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 商品列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">商品列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">商品資訊</TableHead>
                <TableHead className="text-slate-400">價格 / 成本</TableHead>
                <TableHead className="text-slate-400">庫存</TableHead>
                <TableHead className="text-slate-400">銷量</TableHead>
                <TableHead className="text-slate-400">狀態</TableHead>
                <TableHead className="text-slate-400 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">
                        <Gamepad2 className="w-6 h-6 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-sm text-slate-400">{product.game}</p>
                        <div className="flex gap-1 mt-1">
                          {product.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-cyan-500/10 text-cyan-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white">NT$ {product.price.toLocaleString()}</p>
                      <p className="text-sm text-slate-500">成本: NT$ {product.cost.toLocaleString()}</p>
                      <p className="text-xs text-emerald-400">
                        毛利: NT$ {(product.price - product.cost).toLocaleString()} ({((product.price - product.cost) / product.price * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? "text-red-400" : "text-white"}>
                      {product.stock === 999 ? "充足" : product.stock.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-white">{product.sales}</TableCell>
                  <TableCell>
                    <StatusBadge status={product.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ProductDialog product={product} onSave={handleSave} />
                      <DeleteDialog productName={product.name} onDelete={handleDelete} />
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
