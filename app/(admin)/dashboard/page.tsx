"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Crown,
  ArrowRight,
  Gamepad2,
  Sparkles,
  Zap,
  Trophy
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

// 模擬數據 - 銷售趨勢
const salesData = [
  { name: "1月", sales: 125000, cost: 95000 },
  { name: "2月", sales: 148000, cost: 112000 },
  { name: "3月", sales: 162000, cost: 122000 },
  { name: "4月", sales: 145000, cost: 108000 },
  { name: "5月", sales: 198000, cost: 148000 },
  { name: "6月", sales: 234000, cost: 175000 },
]

// VIP 等級分佈
const vipDistribution = [
  { name: "一般會員", value: 2450, color: "#94a3b8" },
  { name: "青銅 VIP", value: 320, color: "#cd7f32" },
  { name: "白銀 VIP", value: 145, color: "#c0c0c0" },
  { name: "黃金 VIP", value: 58, color: "#fbbf24" },
]

// 熱門商品排行
const topProducts = [
  { name: "原神 - 6480 結晶", sales: 156, revenue: 2527200 },
  { name: "崩壞：星穹鐵道 - 6480 夢華", sales: 98, revenue: 1587600 },
  { name: "原神 - 空月祝福", sales: 234, revenue: 105300 },
  { name: "絕區零 - 6480 菲林", sales: 67, revenue: 1085400 },
  { name: "英雄聯盟 - 10000 聯盟幣", sales: 89, revenue: 890000 },
]

// 最新訂單
const recentOrders = [
  { id: "ORD-202502-001", game: "原神", amount: 16200, status: "completed", time: "2分鐘前", vip: "gold" },
  { id: "ORD-202502-002", game: "崩壞：星穹鐵道", amount: 2450, status: "processing", time: "5分鐘前", vip: "silver" },
  { id: "ORD-202502-003", game: "絕區零", amount: 8200, status: "pending", time: "8分鐘前", vip: "bronze" },
  { id: "ORD-202502-004", game: "原神", amount: 450, status: "completed", time: "12分鐘前", vip: "normal" },
  { id: "ORD-202502-005", game: "英雄聯盟", amount: 1000, status: "completed", time: "15分鐘前", vip: "gold" },
]

const statCards = [
  {
    title: "本月銷售額",
    value: "$234,000",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "cyan",
  },
  {
    title: "本月訂單數",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    color: "blue",
  },
  {
    title: "總會員數",
    value: "2,973",
    change: "+5.3%",
    trend: "up",
    icon: Users,
    color: "purple",
  },
  {
    title: "本月毛利",
    value: "$59,000",
    change: "-2.1%",
    trend: "down",
    icon: Package,
    color: "emerald",
  },
]

function getStatusBadge(status: string) {
  const styles = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  }
  const labels = {
    completed: "已完成",
    processing: "處理中",
    pending: "待付款",
  }
  return (
    <Badge variant="outline" className={styles[status as keyof typeof styles]}>
      {labels[status as keyof typeof labels]}
    </Badge>
  )
}

function getVipBadge(vip: string) {
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
    <Badge className={styles[vip as keyof typeof styles]}>
      {labels[vip as keyof typeof labels]}
    </Badge>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">儀表板</h1>
          <p className="text-slate-400 mt-1">歡迎回來，這是今日的營運概況</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            匯出報表
          </Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            查看詳細報表
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          const trendColor = stat.trend === "up" ? "text-emerald-400" : "text-red-400"
          
          return (
            <Card key={stat.title} className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
                    <TrendIcon className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Trend Chart */}
        <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">銷售與成本趨勢</CardTitle>
            <CardDescription className="text-slate-400">過去6個月的銷售額與成本比較</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8' }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                  />
                  <Area type="monotone" dataKey="sales" name="銷售額" stroke="#06b6d4" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                  <Area type="monotone" dataKey="cost" name="成本" stroke="#f59e0b" fillOpacity={1} fill="url(#colorCost)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* VIP Distribution */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              VIP 會員分佈
            </CardTitle>
            <CardDescription className="text-slate-400">各等級會員人數統計</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vipDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vipDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    formatter={(value, name) => [`${value} 人`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {vipDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-400">{item.name}</span>
                  <span className="text-white font-medium ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">熱門商品排行</CardTitle>
              <CardDescription className="text-slate-400">本月銷售最佳商品 TOP 5</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value/10000}萬`} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={120} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '營收']}
                  />
                  <Bar dataKey="revenue" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">最新訂單</CardTitle>
              <CardDescription className="text-slate-400">最近 5 筆訂單動態</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      {order.game === "原神" ? <Gamepad2 className="w-5 h-5 text-cyan-400" /> : 
                       order.game === "崩壞：星穹鐵道" ? <Sparkles className="w-5 h-5 text-purple-400" /> : 
                       order.game === "絕區零" ? <Zap className="w-5 h-5 text-blue-400" /> : 
                       <Trophy className="w-5 h-5 text-amber-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{order.id}</p>
                      <p className="text-xs text-slate-400">{order.game} · {order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">NT$ {order.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getVipBadge(order.vip)}
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
