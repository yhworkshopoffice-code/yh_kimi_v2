"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ComposedChart,
  Legend,
} from "recharts"
import { 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  PieChart as PieChartIcon,
  BarChart3,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  CreditCard,
  Gamepad2
} from "lucide-react"

// 時間範圍選項
const timeRanges = [
  { value: "7d", label: "近7天" },
  { value: "30d", label: "近30天" },
  { value: "this_month", label: "本月" },
  { value: "last_month", label: "上月" },
  { value: "this_quarter", label: "本季" },
  { value: "this_year", label: "今年" },
]

// 模擬財務數據 - 每日銷售
const dailySalesData = [
  { date: "01/26", sales: 8500, cost: 6800, profit: 1700 },
  { date: "01/27", sales: 9200, cost: 7300, profit: 1900 },
  { date: "01/28", sales: 7800, cost: 6200, profit: 1600 },
  { date: "01/29", sales: 10500, cost: 8200, profit: 2300 },
  { date: "01/30", sales: 11200, cost: 8900, profit: 2300 },
  { date: "01/31", sales: 12800, cost: 9800, profit: 3000 },
  { date: "02/01", sales: 15200, cost: 11500, profit: 3700 },
]

// 月度數據
const monthlyData = [
  { month: "8月", sales: 185000, cost: 148000, profit: 37000, orders: 892 },
  { month: "9月", sales: 198000, cost: 158000, profit: 40000, orders: 945 },
  { month: "10月", sales: 215000, cost: 172000, profit: 43000, orders: 1023 },
  { month: "11月", sales: 248000, cost: 198000, profit: 50000, orders: 1156 },
  { month: "12月", sales: 312000, cost: 246000, profit: 66000, orders: 1432 },
  { month: "1月", sales: 234000, cost: 185000, profit: 49000, orders: 1108 },
  { month: "2月", sales: 162000, cost: 128000, profit: 34000, orders: 756 },
]

// 遊戲銷售佔比
const gameSalesData = [
  { name: "原神", value: 45, amount: 450000 },
  { name: "崩壞：星穹鐵道", value: 28, amount: 280000 },
  { name: "絕區零", value: 15, amount: 150000 },
  { name: "英雄聯盟", value: 8, amount: 80000 },
  { name: "其他", value: 4, amount: 40000 },
]

// 支付方式佔比
const paymentMethodData = [
  { name: "ATM 轉帳", value: 65, amount: 650000 },
  { name: "信用卡", value: 25, amount: 250000 },
  { name: "超商代碼", value: 8, amount: 80000 },
  { name: "Line Pay", value: 2, amount: 20000 },
]

// 成本明細
const costBreakdown = [
  { category: "商品成本", amount: 980000, percentage: 78.4, type: "fixed" },
  { category: "簡訊費用", amount: 8500, percentage: 0.7, type: "variable" },
  { category: "金流手續費", amount: 18500, percentage: 1.5, type: "variable" },
  { category: "伺服器費用", amount: 12000, percentage: 1.0, type: "fixed" },
  { category: "行銷費用", amount: 45000, percentage: 3.6, type: "marketing" },
  { category: "人事費用", amount: 150000, percentage: 12.0, type: "fixed" },
  { category: "其他營運", amount: 35000, percentage: 2.8, type: "variable" },
]

// 顏色配置
const COLORS = ["#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#64748b"]
const COST_COLORS = {
  fixed: "#06b6d4",
  variable: "#f59e0b",
  marketing: "#8b5cf6",
}

// 計算總計
const totalStats = {
  sales: monthlyData.reduce((sum, m) => sum + m.sales, 0),
  cost: monthlyData.reduce((sum, m) => sum + m.cost, 0),
  profit: monthlyData.reduce((sum, m) => sum + m.profit, 0),
  orders: monthlyData.reduce((sum, m) => sum + m.orders, 0),
}

export default function FinancePage() {
  const [timeRange, setTimeRange] = useState("this_month")

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">財務報表</h1>
          <p className="text-slate-400 mt-1">查看銷售數據、成本分析與利潤報表</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {timeRanges.map(range => (
                <SelectItem key={range.value} value={range.value} className="text-white">
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" />
            匯出報表
          </Button>
        </div>
      </div>

      {/* 關鍵指標卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">總銷售額</p>
                <p className="text-2xl font-bold text-white mt-1">
                  NT$ {(totalStats.sales / 10000).toFixed(1)}萬
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">+12.5%</span>
                  <span className="text-xs text-slate-500">vs 上期</span>
                </div>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">總成本</p>
                <p className="text-2xl font-bold text-white mt-1">
                  NT$ {(totalStats.cost / 10000).toFixed(1)}萬
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-amber-400">+8.3%</span>
                  <span className="text-xs text-slate-500">vs 上期</span>
                </div>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Receipt className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">毛利潤</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">
                  NT$ {(totalStats.profit / 10000).toFixed(1)}萬
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">+18.2%</span>
                  <span className="text-xs text-slate-500">vs 上期</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">毛利率</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {((totalStats.profit / totalStats.sales) * 100).toFixed(1)}%
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">+2.1%</span>
                  <span className="text-xs text-slate-500">vs 上期</span>
                </div>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <PieChartIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 圖表區域 */}
      <Tabs defaultValue="trend" className="space-y-6">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="trend" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            銷售趨勢
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            成本分析
          </TabsTrigger>
          <TabsTrigger value="distribution" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <PieChartIcon className="w-4 h-4 mr-2" />
            銷售分佈
          </TabsTrigger>
        </TabsList>

        {/* 銷售趨勢圖表 */}
        <TabsContent value="trend" className="space-y-6">
          {/* 銷售與成本趨勢 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">銷售、成本與利潤趨勢</CardTitle>
              <CardDescription className="text-slate-400">
                近7個月的營運數據比較
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                      labelStyle={{ color: '#94a3b8' }}
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" name="銷售額" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="cost" name="成本" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="left" type="monotone" dataKey="profit" name="利潤" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 每日銷售明細 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">近7日銷售明細</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailySalesData}>
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${v}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="sales" name="銷售額" stroke="#06b6d4" fill="url(#salesGradient)" strokeWidth={2} />
                    <Area type="monotone" dataKey="profit" name="利潤" stroke="#10b981" fill="url(#profitGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 成本分析 */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* 成本明細表格 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">成本明細</CardTitle>
                <CardDescription className="text-slate-400">
                  各項成本佔比與金額
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800 hover:bg-transparent">
                      <TableHead className="text-slate-400">項目</TableHead>
                      <TableHead className="text-slate-400">類型</TableHead>
                      <TableHead className="text-slate-400 text-right">金額</TableHead>
                      <TableHead className="text-slate-400 text-right">佔比</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costBreakdown.map((item) => (
                      <TableRow key={item.category} className="border-slate-800 hover:bg-slate-800/50">
                        <TableCell className="text-white">{item.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline" 
                            className={
                              item.type === "fixed" ? "border-cyan-500/30 text-cyan-400" :
                              item.type === "variable" ? "border-amber-500/30 text-amber-400" :
                              "border-purple-500/30 text-purple-400"
                            }
                          >
                            {item.type === "fixed" ? "固定" : item.type === "variable" ? "變動" : "行銷"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-white">
                          NT$ {item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-slate-400">{item.percentage}%</span>
                            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  width: `${item.percentage}%`,
                                  backgroundColor: COST_COLORS[item.type as keyof typeof COST_COLORS]
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 成本分類圓餅圖 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">成本分類</CardTitle>
                <CardDescription className="text-slate-400">
                  固定成本 vs 變動成本 vs 行銷費用
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "固定成本", value: costBreakdown.filter(c => c.type === "fixed").reduce((s, c) => s + c.amount, 0) },
                          { name: "變動成本", value: costBreakdown.filter(c => c.type === "variable").reduce((s, c) => s + c.amount, 0) },
                          { name: "行銷費用", value: costBreakdown.filter(c => c.type === "marketing").reduce((s, c) => s + c.amount, 0) },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#06b6d4" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#8b5cf6" />
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        formatter={(value) => [`NT$ ${Number(value).toLocaleString()}`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-400">固定成本</p>
                    <p className="font-medium text-white">
                      NT$ {costBreakdown.filter(c => c.type === "fixed").reduce((s, c) => s + c.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-400">變動成本</p>
                    <p className="font-medium text-white">
                      NT$ {costBreakdown.filter(c => c.type === "variable").reduce((s, c) => s + c.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-400">行銷費用</p>
                    <p className="font-medium text-white">
                      NT$ {costBreakdown.filter(c => c.type === "marketing").reduce((s, c) => s + c.amount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 銷售分佈 */}
        <TabsContent value="distribution" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* 遊戲銷售佔比 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                  遊戲銷售佔比
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gameSalesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, value}) => `${name} ${value}%`}
                      >
                        {gameSalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        formatter={(value, name, props) => [
                          `NT$ ${props.payload.amount.toLocaleString()}`, 
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 支付方式佔比 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  支付方式佔比
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, value}) => `${name} ${value}%`}
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        formatter={(value, name, props) => [
                          `NT$ ${props.payload.amount.toLocaleString()}`, 
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
