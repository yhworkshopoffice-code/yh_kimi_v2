"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  RefreshCcw,
  MoreHorizontal,
  CreditCard,
  Gamepad2,
  User,
  Phone,
  Calendar,
  DollarSign
} from "lucide-react"

// 訂單狀態類型
const orderStatuses = [
  { value: "all", label: "全部狀態" },
  { value: "pending", label: "待付款" },
  { value: "processing", label: "處理中" },
  { value: "completed", label: "已完成" },
  { value: "cancelled", label: "已取消" },
  { value: "refunded", label: "已退款" },
]

// 模擬訂單數據
const ordersData = [
  {
    id: "ORD-202502-001",
    game: "原神",
    product: "6480 创世结晶",
    uid: "801234567",
    server: "Asia",
    amount: 1620,
    cost: 1350,
    status: "completed",
    paymentMethod: "ATM轉帳",
    customer: {
      name: "王小明",
      phone: "0912-345-678",
      email: "user1@example.com",
      vip: "gold"
    },
    createdAt: "2026-02-01 14:30:25",
    paidAt: "2026-02-01 14:35:10",
    completedAt: "2026-02-01 14:38:45",
    note: ""
  },
  {
    id: "ORD-202502-002",
    game: "崩壞：星穹鐵道",
    product: "6480 夢華",
    uid: "902345678",
    server: "Asia",
    amount: 2450,
    cost: 2050,
    status: "processing",
    paymentMethod: "ATM轉帳",
    customer: {
      name: "李大華",
      phone: "0923-456-789",
      email: "user2@example.com",
      vip: "silver"
    },
    createdAt: "2026-02-01 15:20:15",
    paidAt: "2026-02-01 15:25:30",
    completedAt: null,
    note: "處理中"
  },
  {
    id: "ORD-202502-003",
    game: "絕區零",
    product: "6480 菲林底片",
    uid: "703456789",
    server: "TW/HK/MO",
    amount: 820,
    cost: 680,
    status: "pending",
    paymentMethod: "ATM轉帳",
    customer: {
      name: "張小美",
      phone: "0934-567-890",
      email: "user3@example.com",
      vip: "bronze"
    },
    createdAt: "2026-02-01 16:45:00",
    paidAt: null,
    completedAt: null,
    note: ""
  },
  {
    id: "ORD-202502-004",
    game: "原神",
    product: "空月祝福",
    uid: "804567890",
    server: "Asia",
    amount: 150,
    cost: 120,
    status: "completed",
    paymentMethod: "ATM轉帳",
    customer: {
      name: "陳小龍",
      phone: "0945-678-901",
      email: "user4@example.com",
      vip: "normal"
    },
    createdAt: "2026-02-01 10:15:30",
    paidAt: "2026-02-01 10:20:45",
    completedAt: "2026-02-01 10:25:00",
    note: ""
  },
  {
    id: "ORD-202502-005",
    game: "英雄聯盟",
    product: "10000 聯盟幣",
    uid: "LOL123456",
    server: "TW",
    amount: 1000,
    cost: 850,
    status: "completed",
    paymentMethod: "ATM轉帳",
    customer: {
      name: "林志遠",
      phone: "0956-789-012",
      email: "user5@example.com",
      vip: "gold"
    },
    createdAt: "2026-02-01 09:30:00",
    paidAt: "2026-02-01 09:35:15",
    completedAt: "2026-02-01 09:40:30",
    note: ""
  },
  {
    id: "ORD-202502-006",
    game: "原神",
    product: "1980 创世结晶",
    uid: "805678901",
    server: "Asia",
    amount: 495,
    cost: 410,
    status: "cancelled",
    paymentMethod: "ATM轉帳",
    customer: {
      name: "黃小芳",
      phone: "0967-890-123",
      email: "user6@example.com",
      vip: "normal"
    },
    createdAt: "2026-02-01 08:00:00",
    paidAt: null,
    completedAt: null,
    note: "超時未付款"
  },
  {
    id: "ORD-202502-007",
    game: "崩壞3",
    product: "3280 水晶",
    uid: "903456789",
    server: "TW",
    amount: 328,
    cost: 270,
    status: "refunded",
    paymentMethod: "ATM轉帳",
    customer: {
      name: "吳小華",
      phone: "0978-901-234",
      email: "user7@example.com",
      vip: "silver"
    },
    createdAt: "2026-02-01 07:30:00",
    paidAt: "2026-02-01 07:35:00",
    completedAt: null,
    note: "客戶要求退款"
  },
]

// 訂單狀態徽章
function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    refunded: "bg-red-500/10 text-red-400 border-red-500/20",
  }
  const labels = {
    pending: "待付款",
    processing: "處理中",
    completed: "已完成",
    cancelled: "已取消",
    refunded: "已退款",
  }
  return (
    <Badge variant="outline" className={styles[status as keyof typeof styles]}>
      {labels[status as keyof typeof labels]}
    </Badge>
  )
}

// VIP 徽章
function VipBadge({ level }: { level: string }) {
  const styles = {
    normal: "bg-slate-500/20 text-slate-400",
    bronze: "bg-orange-600/20 text-orange-400",
    silver: "bg-slate-300/20 text-slate-300",
    gold: "bg-amber-400/20 text-amber-400",
  }
  const labels = {
    normal: "一般",
    bronze: "青銅",
    silver: "白銀",
    gold: "黃金",
  }
  return (
    <Badge className={`${styles[level as keyof typeof styles]} text-xs`}>
      {labels[level as keyof typeof labels]}
    </Badge>
  )
}

// 訂單詳情對話框
function OrderDetailDialog({ order }: { order: typeof ordersData[0] }) {
  return (
    <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          訂單詳情
          <StatusBadge status={order.status} />
        </DialogTitle>
        <DialogDescription className="text-slate-400">
          訂單編號：{order.id}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 mt-4">
        {/* 訂單摘要 */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Gamepad2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">遊戲</p>
              <p className="font-medium">{order.game}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">付款方式</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">金額</p>
              <p className="font-medium">NT$ {order.amount.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">建立時間</p>
              <p className="font-medium">{order.createdAt}</p>
            </div>
          </div>
        </div>

        {/* 客戶資訊 */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">客戶資訊</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-500" />
              <span>{order.customer.name}</span>
              <VipBadge level={order.customer.vip} />
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-500" />
              <span>{order.customer.phone}</span>
            </div>
          </div>
        </div>

        {/* 充值資訊 */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">充值資訊</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">商品</span>
              <span>{order.product}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">伺服器</span>
              <span>{order.server}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">UID</span>
              <span className="font-mono">{order.uid}</span>
            </div>
          </div>
        </div>

        {/* 時間軸 */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">處理進度</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">訂單建立：{order.createdAt}</span>
            </div>
            {order.paidAt && (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">付款確認：{order.paidAt}</span>
              </div>
            )}
            {order.completedAt && (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">充值完成：{order.completedAt}</span>
              </div>
            )}
          </div>
        </div>

        {/* 備註 */}
        {order.note && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-sm text-amber-400">備註：{order.note}</p>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="flex gap-2 pt-4 border-t border-slate-800">
          {order.status === "pending" && (
            <>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                確認付款
              </Button>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <XCircle className="w-4 h-4 mr-2" />
                取消訂單
              </Button>
            </>
          )}
          {order.status === "processing" && (
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              完成充值
            </Button>
          )}
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 ml-auto">
            列印訂單
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 過濾訂單
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.includes(searchQuery) ||
      order.game.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 統計數據
  const stats = {
    total: ordersData.length,
    pending: ordersData.filter(o => o.status === "pending").length,
    processing: ordersData.filter(o => o.status === "processing").length,
    completed: ordersData.filter(o => o.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">訂單管理</h1>
          <p className="text-slate-400 mt-1">管理所有客戶訂單，處理付款與充值</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" />
            匯出訂單
          </Button>
        </div>
      </div>

      {/* 統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">總訂單數</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">待付款</p>
            <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">處理中</p>
            <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">已完成</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.completed}</p>
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
                placeholder="搜尋訂單編號、客戶名稱、遊戲..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="狀態篩選" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {orderStatuses.map(status => (
                  <SelectItem key={status.value} value={status.value} className="text-white">
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              更多篩選
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 訂單列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">訂單列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">訂單編號</TableHead>
                <TableHead className="text-slate-400">遊戲 / 商品</TableHead>
                <TableHead className="text-slate-400">客戶</TableHead>
                <TableHead className="text-slate-400">金額</TableHead>
                <TableHead className="text-slate-400">狀態</TableHead>
                <TableHead className="text-slate-400">建立時間</TableHead>
                <TableHead className="text-slate-400 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className="font-medium text-white">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white">{order.game}</p>
                      <p className="text-sm text-slate-400">{order.product}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{order.customer.name}</span>
                      <VipBadge level={order.customer.vip} />
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    NT$ {order.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-slate-400">{order.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                          <Eye className="w-4 h-4 mr-1" />
                          查看
                        </Button>
                      </DialogTrigger>
                      <OrderDetailDialog order={order} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* 分頁 */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="text-slate-400 hover:text-white" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="bg-cyan-500 text-white">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="text-slate-400 hover:text-white">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="text-slate-400 hover:text-white">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="text-slate-400 hover:text-white" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
