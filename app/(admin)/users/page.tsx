"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
} from "@/components/ui/dialog"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Crown,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  ShoppingBag,
  Edit,
  Ban,
  CheckCircle,
  TrendingUp,
  Gift
} from "lucide-react"

// VIP 等級配置（根據設計文檔）
const vipLevels = [
  { 
    key: "normal", 
    name: "普通水豚", 
    nameEn: "一般會員",
    minAmount: 0,
    color: "#94a3b8",
    bgColor: "bg-slate-500",
    benefits: ["基本服務", "生日優惠券"]
  },
  { 
    key: "bronze", 
    name: "河岸水豚", 
    nameEn: "青銅 VIP",
    minAmount: 3000,
    color: "#cd7f32",
    bgColor: "bg-orange-600",
    benefits: ["消費回饋 2%", "每月專屬優惠券 x1", "優先客服"]
  },
  { 
    key: "silver", 
    name: "溫泉水豚", 
    nameEn: "白銀 VIP",
    minAmount: 10000,
    color: "#c0c0c0",
    bgColor: "bg-slate-300",
    benefits: ["消費回饋 3%", "每月專屬優惠券 x2", "專屬客服通道", "新品優先體驗"]
  },
  { 
    key: "gold", 
    name: "皇家水豚", 
    nameEn: "黃金 VIP",
    minAmount: 30000,
    color: "#fbbf24",
    bgColor: "bg-amber-400",
    benefits: ["消費回饋 5%", "每月專屬優惠券 x3", "1對1專屬客服", "專屬折扣碼", "限定周邊贈品"]
  },
]

// 模擬會員數據
const usersData = [
  {
    id: "USR-001",
    name: "王小明",
    email: "user1@example.com",
    phone: "0912-345-678",
    vipLevel: "gold",
    totalSpent: 45680,
    orderCount: 23,
    registerDate: "2025-06-15",
    lastOrderDate: "2026-02-01",
    status: "active",
    feedback: 1250,
    coupons: 3
  },
  {
    id: "USR-002",
    name: "李大華",
    email: "user2@example.com",
    phone: "0923-456-789",
    vipLevel: "silver",
    totalSpent: 12800,
    orderCount: 12,
    registerDate: "2025-08-20",
    lastOrderDate: "2026-02-01",
    status: "active",
    feedback: 384,
    coupons: 2
  },
  {
    id: "USR-003",
    name: "張小美",
    email: "user3@example.com",
    phone: "0934-567-890",
    vipLevel: "bronze",
    totalSpent: 4200,
    orderCount: 8,
    registerDate: "2025-10-05",
    lastOrderDate: "2026-01-28",
    status: "active",
    feedback: 84,
    coupons: 1
  },
  {
    id: "USR-004",
    name: "陳小龍",
    email: "user4@example.com",
    phone: "0945-678-901",
    vipLevel: "normal",
    totalSpent: 850,
    orderCount: 3,
    registerDate: "2025-12-10",
    lastOrderDate: "2026-01-15",
    status: "active",
    feedback: 0,
    coupons: 1
  },
  {
    id: "USR-005",
    name: "林志遠",
    email: "user5@example.com",
    phone: "0956-789-012",
    vipLevel: "gold",
    totalSpent: 52100,
    orderCount: 31,
    registerDate: "2025-03-20",
    lastOrderDate: "2026-02-01",
    status: "active",
    feedback: 2605,
    coupons: 3
  },
  {
    id: "USR-006",
    name: "黃小芳",
    email: "user6@example.com",
    phone: "0967-890-123",
    vipLevel: "normal",
    totalSpent: 0,
    orderCount: 0,
    registerDate: "2026-01-15",
    lastOrderDate: null,
    status: "inactive",
    feedback: 0,
    coupons: 1
  },
]

// VIP 徽章
function VipBadge({ level }: { level: string }) {
  const vipInfo = vipLevels.find(v => v.key === level) || vipLevels[0]
  return (
    <Badge 
      className="font-medium"
      style={{ 
        backgroundColor: `${vipInfo.color}20`, 
        color: vipInfo.color,
        border: `1px solid ${vipInfo.color}40`
      }}
    >
      <Crown className="w-3 h-3 mr-1" />
      {vipInfo.nameEn}
    </Badge>
  )
}

// 計算 VIP 進度
function getVipProgress(spent: number, currentLevel: string) {
  const currentVipIndex = vipLevels.findIndex(v => v.key === currentLevel)
  const nextVip = vipLevels[currentVipIndex + 1]
  
  if (!nextVip) {
    return { progress: 100, nextAmount: 0, nextLevel: null }
  }
  
  const progress = Math.min(100, (spent / nextVip.minAmount) * 100)
  const nextAmount = nextVip.minAmount - spent
  
  return { progress, nextAmount, nextLevel: nextVip }
}

// 會員詳情對話框
function UserDetailDialog({ user }: { user: typeof usersData[0] }) {
  const vipProgress = getVipProgress(user.totalSpent, user.vipLevel)
  const currentVip = vipLevels.find(v => v.key === user.vipLevel) || vipLevels[0]
  
  return (
    <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          會員詳情
          <VipBadge level={user.vipLevel} />
        </DialogTitle>
        <DialogDescription className="text-slate-400">
          會員編號：{user.id}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 mt-4">
        {/* 基本信息 */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2" style={{ borderColor: currentVip.color }}>
            <AvatarFallback className="text-xl" style={{ backgroundColor: `${currentVip.color}20`, color: currentVip.color }}>
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{user.name}</h3>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4" />
                {user.phone}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                註冊：{user.registerDate}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <ShoppingBag className="w-4 h-4" />
                訂單：{user.orderCount} 筆
              </div>
            </div>
          </div>
        </div>

        {/* VIP 進度 */}
        <div className="p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5" style={{ color: currentVip.color }} />
              <span className="font-medium">{currentVip.name}</span>
            </div>
            <span className="text-sm text-slate-400">
              累計消費：NT$ {user.totalSpent.toLocaleString()}
            </span>
          </div>
          
          {vipProgress.nextLevel ? (
            <>
              <Progress value={vipProgress.progress} className="h-2 bg-slate-700" />
              <p className="text-sm text-slate-400 mt-2">
                還差 NT$ {vipProgress.nextAmount.toLocaleString()} 即可升級為 
                <span className="font-medium" style={{ color: vipProgress.nextLevel.color }}>
                  {vipProgress.nextLevel.name}
                </span>
              </p>
            </>
          ) : (
            <p className="text-sm text-amber-400 mt-2">🎉 已達最高等級！</p>
          )}
        </div>

        {/* 統計數據 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-lg text-center">
            <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">NT$ {user.totalSpent.toLocaleString()}</p>
            <p className="text-sm text-slate-400">累計消費</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg text-center">
            <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{user.feedback}</p>
            <p className="text-sm text-slate-400">回饋金餘額</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg text-center">
            <Gift className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{user.coupons}</p>
            <p className="text-sm text-slate-400">優惠券</p>
          </div>
        </div>

        {/* 權益列表 */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">目前權益</h4>
          <div className="space-y-2">
            {currentVip.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 操作按鈕 */}
        <div className="flex gap-2 pt-4 border-t border-slate-800">
          <Button className="bg-cyan-500 hover:bg-cyan-600">
            <Edit className="w-4 h-4 mr-2" />
            編輯資料
          </Button>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Gift className="w-4 h-4 mr-2" />
            發放優惠券
          </Button>
          {user.status === "active" ? (
            <Button variant="outline" className="border-red-700 text-red-400 hover:bg-red-950 ml-auto">
              <Ban className="w-4 h-4 mr-2" />
              停用帳號
            </Button>
          ) : (
            <Button variant="outline" className="border-emerald-700 text-emerald-400 hover:bg-emerald-950 ml-auto">
              <CheckCircle className="w-4 h-4 mr-2" />
              啟用帳號
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  )
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // 過濾會員
  const filteredUsers = usersData.filter(user => 
    user.name.includes(searchQuery) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  )

  // 統計數據
  const stats = {
    total: usersData.length,
    active: usersData.filter(u => u.status === "active").length,
    vipTotal: usersData.filter(u => u.vipLevel !== "normal").length,
    totalRevenue: usersData.reduce((sum, u) => sum + u.totalSpent, 0)
  }

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">會員管理</h1>
          <p className="text-slate-400 mt-1">管理會員資料、VIP 等級與權益</p>
        </div>
        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
          <Download className="w-4 h-4 mr-2" />
          匯出名單
        </Button>
      </div>

      {/* 統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">總會員數</p>
            <p className="text-2xl font-bold text-white">{stats.total.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">活躍會員</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.active.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">VIP 會員</p>
            <p className="text-2xl font-bold text-amber-400">{stats.vipTotal.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400">總消費額</p>
            <p className="text-2xl font-bold text-cyan-400">NT$ {(stats.totalRevenue / 10000).toFixed(1)}萬</p>
          </CardContent>
        </Card>
      </div>

      {/* VIP 等級說明卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        {vipLevels.map((vip) => (
          <Card key={vip.key} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5" style={{ color: vip.color }} />
                <span className="font-bold text-white">{vip.name}</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                {vip.minAmount > 0 ? `累計消費滿 NT$ ${vip.minAmount.toLocaleString()}` : "註冊即成為"}
              </p>
              <div className="space-y-1">
                {vip.benefits.slice(0, 2).map((benefit, idx) => (
                  <p key={idx} className="text-xs text-slate-500">• {benefit}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 搜尋 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                placeholder="搜尋會員名稱、Email、手機..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              篩選
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 會員列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">會員列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">會員</TableHead>
                <TableHead className="text-slate-400">VIP 等級</TableHead>
                <TableHead className="text-slate-400">累計消費</TableHead>
                <TableHead className="text-slate-400">訂單數</TableHead>
                <TableHead className="text-slate-400">回饋金</TableHead>
                <TableHead className="text-slate-400">狀態</TableHead>
                <TableHead className="text-slate-400 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-slate-700 text-slate-300">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <VipBadge level={user.vipLevel} />
                  </TableCell>
                  <TableCell className="text-white">
                    NT$ {user.totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-slate-400">{user.orderCount} 筆</TableCell>
                  <TableCell className="text-emerald-400">${user.feedback}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}
                      className={user.status === "active" 
                        ? "bg-emerald-500/10 text-emerald-400" 
                        : "bg-slate-500/10 text-slate-400"
                      }
                    >
                      {user.status === "active" ? "活躍" : "未活躍"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                          <Eye className="w-4 h-4 mr-1" />
                          詳情
                        </Button>
                      </DialogTrigger>
                      <UserDetailDialog user={user} />
                    </Dialog>
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
