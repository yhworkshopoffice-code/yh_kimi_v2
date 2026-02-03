"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Shield, 
  Zap, 
  Clock, 
  Check,
  Gamepad2,
  Sparkles,
  Trophy,
  ShoppingCart,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 遊戲資料
const gamesData: Record<string, {
  name: string
  icon: typeof Gamepad2
  gradient: string
  products: { id: string; name: string; description: string; price: number; popular?: boolean }[]
}> = {
  genshin: {
    name: "原神",
    icon: Gamepad2,
    gradient: "from-violet-500 to-purple-600",
    products: [
      { id: "gc_6480", name: "6480 創世結晶", description: "6480 創世結晶 + 1600 贈送", price: 1620, popular: true },
      { id: "gc_3280", name: "3280 創世結晶", description: "3280 創世結晶 + 600 贈送", price: 820 },
      { id: "gc_1980", name: "1980 創世結晶", description: "1980 創世結晶 + 260 贈送", price: 495 },
      { id: "gc_980", name: "980 創世結晶", description: "980 創世結晶 + 110 贈送", price: 245 },
      { id: "blessing", name: "空月祝福", description: "30天空月祝福，每日90原石", price: 150 },
    ]
  },
  honkai: {
    name: "崩壞：星穹鐵道",
    icon: Sparkles,
    gradient: "from-pink-500 to-rose-500",
    products: [
      { id: "dream_6480", name: "6480 古老夢華", description: "6480 古老夢華 + 1600 贈送", price: 2450, popular: true },
      { id: "dream_3280", name: "3280 古老夢華", description: "3280 古老夢華 + 600 贈送", price: 1230 },
      { id: "express", name: "列車補給憑證", description: "30天每日獎勵", price: 150 },
    ]
  },
  zzz: {
    name: "絕區零",
    icon: Zap,
    gradient: "from-cyan-500 to-blue-500",
    products: [
      { id: "film_6480", name: "6480 菲林底片", description: "6480 菲林底片 + 1600 贈送", price: 820, popular: true },
      { id: "film_3280", name: "3280 菲林底片", description: "3280 菲林底片 + 600 贈送", price: 415 },
      { id: "growth", name: "成長配給", description: "30天每日獎勵", price: 150 },
    ]
  },
  lol: {
    name: "英雄聯盟",
    icon: Trophy,
    gradient: "from-amber-500 to-orange-500",
    products: [
      { id: "rp_10000", name: "10000 聯盟幣", description: "10000 RP", price: 1000, popular: true },
      { id: "rp_5000", name: "5000 聯盟幣", description: "5000 RP", price: 500 },
      { id: "rp_2500", name: "2500 聯盟幣", description: "2500 RP", price: 250 },
    ]
  },
}

// Internal component that uses useSearchParams
function ProductPageContent() {
  const searchParams = useSearchParams()
  const gameId = searchParams.get("game") || "genshin"
  const game = gamesData[gameId] || gamesData.genshin
  const Icon = game.icon

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-white">選擇商品</h1>
            </div>
            <Link href="/account">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                我的帳號
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Game Hero */}
      <div className={`bg-gradient-to-br ${game.gradient} py-12`}>
        <div className="container mx-auto px-4 text-center">
          <Icon className="w-20 h-20 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">{game.name}</h1>
          <p className="text-white/80">選擇您需要的商品進行儲值</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">選擇商品</h2>
            {game.products.map((product) => (
              <Card 
                key={product.id} 
                className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer group"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{product.name}</h3>
                        {product.popular && (
                          <Badge className="bg-red-500 text-white">熱門</Badge>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{product.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400" />
                          秒到帳
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-emerald-400" />
                          安全保障
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">
                        NT$ {product.price.toLocaleString()}
                      </div>
                      <Button 
                        size="sm" 
                        className="mt-2 bg-cyan-500 hover:bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        選擇
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Info */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">為何選擇我們</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">安全可靠</h4>
                    <p className="text-slate-400 text-sm">SSL加密，保護您的帳號安全</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">極速到帳</h4>
                    <p className="text-slate-400 text-sm">平均28秒完成儲值</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">24/7 客服</h4>
                    <p className="text-slate-400 text-sm">全天候專業客服支援</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Order */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">訂購流程</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: 1, text: "選擇商品並輸入UID" },
                    { step: 2, text: "確認訂單並付款" },
                    { step: 3, text: "等待系統自動充值" },
                    { step: 4, text: "遊戲內查收到帳" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
                        {item.step}
                      </div>
                      <span className="text-slate-300 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* VIP Promo */}
            <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400 font-bold">VIP 會員專屬</span>
                </div>
                <p className="text-slate-300 text-sm mb-4">
                  加入 VIP 會員，享受 2-5% 消費回饋、生日禮金等專屬福利！
                </p>
                <Link href="/#vip">
                  <Button variant="outline" size="sm" className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                    了解 VIP 方案
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main export with Suspense wrapper
export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">載入中...</div>
      </div>
    }>
      <ProductPageContent />
    </Suspense>
  )
}
