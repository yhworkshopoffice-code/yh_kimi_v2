"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Crown,
  Gift,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  Link2,
  Unlink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth/AuthContext"
import { ProviderBindingPanel } from "./ProviderBindingPanel"

const userData = {
  name: "王小明",
  email: "user@example.com",
  phone: "0912-345-678",
  vipLevel: "gold",
  vipName: "黃金 VIP",
  totalSpent: 45680,
  feedbackPoints: 2284,
  coupons: 3,
  orders: [
    { id: "ORD-202502-001", game: "原神", product: "6480 創世結晶", amount: 1620, status: "completed", date: "2026-02-01" },
    { id: "ORD-202502-002", game: "崩壞：星穹鐵道", product: "6480 古老夢華", amount: 2450, status: "processing", date: "2026-02-01" },
    { id: "ORD-202501-015", game: "絕區零", product: "3280 菲林底片", amount: 415, status: "completed", date: "2026-01-28" },
  ]
}

const vipLevels: Record<string, { name: string; color: string; nextLevel: string; nextAmount: number }> = {
  normal: { name: "一般會員", color: "bg-slate-500", nextLevel: "青銅 VIP", nextAmount: 3000 },
  bronze: { name: "青銅 VIP", color: "bg-orange-500", nextLevel: "白銀 VIP", nextAmount: 10000 },
  silver: { name: "白銀 VIP", color: "bg-slate-300", nextLevel: "黃金 VIP", nextAmount: 30000 },
  gold: { name: "黃金 VIP", color: "bg-amber-400", nextLevel: "最高等級", nextAmount: 0 },
}

function getStatusBadge(status: string) {
  const styles = {
    completed: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "已完成" },
    processing: { bg: "bg-blue-500/10", text: "text-blue-400", label: "處理中" },
    pending: { bg: "bg-amber-500/10", text: "text-amber-400", label: "待付款" },
  }
  const style = styles[status as keyof typeof styles] || styles.pending
  return (
    <Badge className={`${style.bg} ${style.text} border-0`}>
      {style.label}
    </Badge>
  )
}

export function AccountCenter() {
  const [activeTab, setActiveTab] = useState("overview")
  const { logout } = useAuth()
  const vip = vipLevels[userData.vipLevel]
  const progress = userData.vipLevel === "gold" ? 100 : (userData.totalSpent / vip.nextAmount) * 100

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-5 h-5">
                  <ellipse cx="50" cy="60" rx="35" ry="25" fill="#0f172a"/>
                  <circle cx="30" cy="45" r="18" fill="#0f172a"/>
                  <ellipse cx="22" cy="38" rx="8" ry="6" fill="#0891b2"/>
                  <circle cx="70" cy="30" r="12" fill="#E74C3C"/>
                  <circle cx="70" cy="30" r="6" fill="#fbbf24"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                YH<span className="text-cyan-400">代儲</span>
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                返回首頁
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-slate-900 border-slate-800 mb-6">
              <CardContent className="p-6 text-center">
                <div className={`w-20 h-20 mx-auto rounded-full ${vip.color} flex items-center justify-center mb-4`}>
                  <User className="w-10 h-10 text-slate-950" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{userData.name}</h2>
                <Badge className={`${vip.color} text-slate-950 font-medium`}>
                  <Crown className="w-3 h-3 mr-1" />
                  {vip.name}
                </Badge>
                
                {userData.vipLevel !== "gold" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>VIP 進度</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      還差 NT$ {(vip.nextAmount - userData.totalSpent).toLocaleString()} 升級{vip.nextLevel}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 mb-6">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">回饋金</span>
                  <span className="text-emerald-400 font-bold">${userData.feedbackPoints}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">優惠券</span>
                  <span className="text-amber-400 font-bold">{userData.coupons} 張</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">累計消費</span>
                  <span className="text-white font-bold">NT$ {userData.totalSpent.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-1">
              {[
                { id: "overview", label: "會員總覽", icon: User },
                { id: "orders", label: "我的訂單", icon: ShoppingBag },
                { id: "coupons", label: "我的優惠券", icon: Gift },
                { id: "security", label: "安全設定", icon: Shield },
                { id: "bindings", label: "帳號綁定", icon: Link2 },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id 
                      ? "bg-cyan-500/10 text-cyan-400" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                登出
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">會員總覽</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">進行中訂單</p>
                          <p className="text-2xl font-bold text-white">1</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">已完成訂單</p>
                          <p className="text-2xl font-bold text-white">24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                          <Gift className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">可用優惠券</p>
                          <p className="text-2xl font-bold text-white">{userData.coupons}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">最近訂單</CardTitle>
                    <button 
                      onClick={() => setActiveTab("orders")}
                      className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center"
                    >
                      查看全部
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{order.game}</span>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-slate-400 text-sm">{order.product}</p>
                            <p className="text-slate-500 text-xs">{order.id} · {order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">NT$ {order.amount.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Crown className="w-6 h-6 text-amber-400" />
                      <h3 className="text-lg font-bold text-white">{userData.vipName} 專屬權益</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "5% 消費回饋",
                        "每月專屬優惠券 x3",
                        "1對1專屬客服",
                        "生日禮金 NT$ 1,000",
                        "免手續費 x5/月",
                        "專屬折扣活動",
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">我的訂單</h1>
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="p-0">
                    {userData.orders.map((order, idx) => (
                      <div 
                        key={order.id} 
                        className={`flex items-center justify-between p-5 ${idx !== userData.orders.length - 1 ? "border-b border-slate-800" : ""}`}
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium">{order.game}</span>
                            <span className="text-slate-500 text-sm">{order.product}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            {getStatusBadge(order.status)}
                            <span className="text-slate-500 text-sm">{order.id}</span>
                            <span className="text-slate-500 text-sm flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {order.date}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">NT$ {order.amount.toLocaleString()}</p>
                          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 mt-1">
                            查看詳情
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "coupons" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">我的優惠券</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { code: "VIPGOLD", name: "黃金 VIP 專屬", value: "NT$ 200", min: "滿 NT$ 2,000", expiry: "2026-02-28" },
                    { code: "BIRTHDAY", name: "生日禮金", value: "NT$ 1,000", min: "滿 NT$ 5,000", expiry: "2026-03-15" },
                    { code: "SPRING", name: "春季特惠", value: "15% OFF", min: "滿 NT$ 1,000", expiry: "2026-04-30" },
                  ].map((coupon, idx) => (
                    <Card key={idx} className="bg-slate-900 border-slate-800">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge className="bg-amber-500/10 text-amber-400 mb-2">{coupon.name}</Badge>
                            <h3 className="text-2xl font-bold text-white">{coupon.value}</h3>
                            <p className="text-slate-400 text-sm">{coupon.min}</p>
                            <p className="text-slate-500 text-xs mt-2">代碼: {coupon.code}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-500 text-xs">到期日</p>
                            <p className="text-slate-400 text-sm">{coupon.expiry}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">安全設定</h1>
                
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      更新電子郵件
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">目前 Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input defaultValue={userData.email} disabled className="pl-10 bg-slate-800/50 border-slate-700 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">新 Email</Label>
                      <Input 
                        type="email" 
                        placeholder="new@email.com"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" 
                      />
                    </div>
                    <Button className="bg-cyan-500 hover:bg-cyan-600">更新 Email</Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      修改密碼
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">目前密碼</Label>
                      <Input type="password" className="bg-slate-800 border-slate-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">新密碼</Label>
                      <Input type="password" className="bg-slate-800 border-slate-700 text-white" />
                      <p className="text-xs text-slate-500">
                        密碼至少需要 8 個字元，包含大小寫字母和數字
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">確認新密碼</Label>
                      <Input type="password" className="bg-slate-800 border-slate-700 text-white" />
                    </div>
                    <Button className="bg-cyan-500 hover:bg-cyan-600">更新密碼</Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "bindings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">帳號綁定</h1>
                <ProviderBindingPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
