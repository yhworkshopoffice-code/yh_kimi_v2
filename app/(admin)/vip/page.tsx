"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
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
  Crown, 
  Edit, 
  Plus, 
  Users,
  TrendingUp,
  Gift,
  Headphones,
  Percent,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  Award
} from "lucide-react"

// VIP 等級配置（根據設計文檔 - 水豚主題）
const vipLevelsConfig = [
  { 
    key: "normal", 
    name: "普通水豚", 
    nameEn: "一般會員",
    icon: "🐾",
    minAmount: 0,
    maxAmount: 2999,
    color: "#94a3b8",
    gradient: "from-slate-600 to-slate-500",
    benefits: [
      { icon: Gift, text: "基本服務", enabled: true },
      { icon: Sparkles, text: "生日優惠券", enabled: true },
    ],
    feedbackRate: 0,
    monthlyCoupons: 0,
    memberCount: 2450
  },
  { 
    key: "bronze", 
    name: "河岸水豚", 
    nameEn: "青銅 VIP",
    icon: "🌊",
    minAmount: 3000,
    maxAmount: 9999,
    color: "#cd7f32",
    gradient: "from-orange-700 to-orange-600",
    benefits: [
      { icon: Percent, text: "消費回饋 2%", enabled: true },
      { icon: Gift, text: "每月專屬優惠券 x1", enabled: true },
      { icon: Headphones, text: "優先客服（排隊優先）", enabled: true },
    ],
    feedbackRate: 2,
    monthlyCoupons: 1,
    memberCount: 320
  },
  { 
    key: "silver", 
    name: "溫泉水豚", 
    nameEn: "白銀 VIP",
    icon: "♨️",
    minAmount: 10000,
    maxAmount: 29999,
    color: "#c0c0c0",
    gradient: "from-slate-400 to-slate-300",
    benefits: [
      { icon: Percent, text: "消費回饋 3%", enabled: true },
      { icon: Gift, text: "每月專屬優惠券 x2", enabled: true },
      { icon: Headphones, text: "專屬客服通道", enabled: true },
      { icon: Star, text: "新品優先體驗", enabled: true },
    ],
    feedbackRate: 3,
    monthlyCoupons: 2,
    memberCount: 145
  },
  { 
    key: "gold", 
    name: "皇家水豚", 
    nameEn: "黃金 VIP",
    icon: "👑",
    minAmount: 30000,
    maxAmount: 999999,
    color: "#fbbf24",
    gradient: "from-amber-500 to-amber-400",
    benefits: [
      { icon: Percent, text: "消費回饋 5%", enabled: true },
      { icon: Gift, text: "每月專屬優惠券 x3", enabled: true },
      { icon: Headphones, text: "1對1專屬客服", enabled: true },
      { icon: Award, text: "專屬折扣碼（可分享）", enabled: true },
      { icon: Sparkles, text: "限定周邊贈品", enabled: true },
    ],
    feedbackRate: 5,
    monthlyCoupons: 3,
    memberCount: 58
  },
]

// 自動發放設定
const autoDistributionSettings = {
  enabled: true,
  dayOfMonth: 1,
  couponTypes: [
    { level: "bronze", amount: 50, minOrder: 500 },
    { level: "silver", amount: 100, minOrder: 1000 },
    { level: "gold", amount: 200, minOrder: 2000 },
  ]
}

// VIP 設定編輯對話框
function VipLevelDialog({ level }: { level: typeof vipLevelsConfig[0] }) {
  const [open, setOpen] = useState(false)
  const [feedbackRate, setFeedbackRate] = useState(level.feedbackRate)
  const [monthlyCoupons, setMonthlyCoupons] = useState(level.monthlyCoupons)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
          <Edit className="w-4 h-4 mr-1" />
          編輯
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{level.icon}</span>
            編輯 {level.name} 設定
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            調整此 VIP 等級的權益與門檻
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* 消費門檻 */}
          <div className="space-y-2">
            <Label>消費門檻 (NT$)</Label>
            <Input 
              type="number"
              defaultValue={level.minAmount}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <p className="text-xs text-slate-500">累計消費達到此金額即自動升級</p>
          </div>

          {/* 回饋比例 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>消費回饋比例</Label>
              <span className="text-cyan-400 font-medium">{feedbackRate}%</span>
            </div>
            <Slider 
              value={[feedbackRate]} 
              onValueChange={(v) => setFeedbackRate(v[0])}
              max={10} 
              step={0.5}
              className="py-2"
            />
          </div>

          {/* 每月優惠券數量 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>每月優惠券數量</Label>
              <span className="text-cyan-400 font-medium">{monthlyCoupons} 張</span>
            </div>
            <Slider 
              value={[monthlyCoupons]} 
              onValueChange={(v) => setMonthlyCoupons(v[0])}
              max={5} 
              step={1}
              className="py-2"
            />
          </div>

          {/* 權益開關 */}
          <div className="space-y-3">
            <Label>權益設定</Label>
            {level.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <benefit.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
                <Switch defaultChecked={benefit.enabled} />
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-slate-700 text-slate-300">
            取消
          </Button>
          <Button onClick={() => setOpen(false)} className="bg-cyan-500 hover:bg-cyan-600">
            保存設定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function VipPage() {
  const [autoEnabled, setAutoEnabled] = useState(autoDistributionSettings.enabled)

  // 統計數據
  const totalMembers = vipLevelsConfig.reduce((sum, level) => sum + level.memberCount, 0)
  const vipMembers = totalMembers - vipLevelsConfig[0].memberCount

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">VIP 管理</h1>
          <p className="text-slate-400 mt-1">管理 VIP 等級制度與會員權益</p>
        </div>
        <Button className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          新增等級
        </Button>
      </div>

      {/* 統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">總會員數</p>
                <p className="text-2xl font-bold text-white">{totalMembers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">VIP 會員</p>
                <p className="text-2xl font-bold text-amber-400">{vipMembers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">VIP 轉換率</p>
                <p className="text-2xl font-bold text-emerald-400">{((vipMembers / totalMembers) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Gift className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">本月發放優惠券</p>
                <p className="text-2xl font-bold text-purple-400">523 張</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VIP 等級卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {vipLevelsConfig.map((level) => (
          <Card key={level.key} className="bg-slate-900 border-slate-800 overflow-hidden">
            {/* 頂部漸層 */}
            <div className={`h-2 bg-gradient-to-r ${level.gradient}`} />
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{level.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{level.name}</h3>
                    <p className="text-xs text-slate-400">{level.nameEn}</p>
                  </div>
                </div>
                {level.key !== "normal" && <VipLevelDialog level={level} />}
              </div>

              {/* 消費門檻 */}
              <div className="mb-4">
                <p className="text-sm text-slate-400 mb-1">消費門檻</p>
                <p className="text-lg font-bold" style={{ color: level.color }}>
                  NT$ {level.minAmount.toLocaleString()}
                  {level.maxAmount < 999999 && ` - ${level.maxAmount.toLocaleString()}`}
                  {level.maxAmount >= 999999 && "+"}
                </p>
              </div>

              {/* 會員數 */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">會員數</span>
                  <span className="text-white">{level.memberCount.toLocaleString()} 人</span>
                </div>
                <Progress 
                  value={(level.memberCount / totalMembers) * 100} 
                  className="h-1.5 bg-slate-800"
                />
              </div>

              {/* 權益列表 */}
              <div className="space-y-2">
                <p className="text-sm text-slate-400">權益</p>
                <div className="space-y-1">
                  {level.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-slate-300">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 自動發放設定 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            優惠券自動發放設定
          </CardTitle>
          <CardDescription className="text-slate-400">
            設定每月自動發放給 VIP 會員的優惠券
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 啟用開關 */}
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="font-medium text-white">自動發放優惠券</p>
              <p className="text-sm text-slate-400">每月自動發放優惠券給符合資格的 VIP 會員</p>
            </div>
            <Switch 
              checked={autoEnabled} 
              onCheckedChange={setAutoEnabled}
            />
          </div>

          {/* 發放設定表格 */}
          {autoEnabled && (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400">VIP 等級</TableHead>
                  <TableHead className="text-slate-400">優惠券金額</TableHead>
                  <TableHead className="text-slate-400">最低消費門檻</TableHead>
                  <TableHead className="text-slate-400">發放數量</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {autoDistributionSettings.couponTypes.map((setting) => {
                  const level = vipLevelsConfig.find(l => l.key === setting.level)
                  return (
                    <TableRow key={setting.level} className="border-slate-800">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{level?.icon}</span>
                          <span className="text-white">{level?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          defaultValue={setting.amount}
                          className="w-24 bg-slate-800 border-slate-700 text-white"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          defaultValue={setting.minOrder}
                          className="w-24 bg-slate-800 border-slate-700 text-white"
                        />
                      </TableCell>
                      <TableCell className="text-slate-400">
                        每月 {level?.monthlyCoupons} 張
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              重置預設值
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              保存設定
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 回饋金設定 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Percent className="w-5 h-5 text-emerald-400" />
            消費回饋設定
          </CardTitle>
          <CardDescription className="text-slate-400">
            各 VIP 等級的消費回饋比例設定
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {vipLevelsConfig.filter(l => l.key !== "normal").map((level) => (
              <div key={level.key} className="p-4 bg-slate-800/50 rounded-lg text-center">
                <div className="text-2xl mb-2">{level.icon}</div>
                <p className="font-medium text-white mb-1">{level.name}</p>
                <div className="flex items-center justify-center gap-2">
                  <Input 
                    type="number" 
                    defaultValue={level.feedbackRate}
                    className="w-16 bg-slate-800 border-slate-700 text-white text-center"
                  />
                  <span className="text-slate-400">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">消費回饋比例</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              更新回饋比例
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
