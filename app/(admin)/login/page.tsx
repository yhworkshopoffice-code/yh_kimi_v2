"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 模擬登入驗證
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 跳轉到儀表板
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
                <ellipse cx="50" cy="60" rx="35" ry="25" fill="#0f172a"/>
                <circle cx="30" cy="45" r="18" fill="#0f172a"/>
                <ellipse cx="22" cy="38" rx="8" ry="6" fill="#0891b2"/>
                <circle cx="70" cy="30" r="12" fill="#E74C3C"/>
                <circle cx="70" cy="30" r="6" fill="#fbbf24"/>
              </svg>
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-white">YH</span>
              <span className="text-2xl font-bold text-cyan-400">管理後台</span>
            </div>
          </Link>
          <p className="text-slate-400 mt-2">請登入以繼續管理您的平台</p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white text-center">管理員登入</CardTitle>
            <CardDescription className="text-slate-400 text-center">
              輸入您的管理員帳號密碼
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  電子郵件
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@yh-recharge.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300">
                    密碼
                  </Label>
                  <Link 
                    href="#" 
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    忘記密碼？
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    登入中...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    登入
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-400 text-center mb-2">示範帳號</p>
              <div className="space-y-1 text-sm text-slate-500 text-center">
                <p>Email: admin@yh-recharge.com</p>
                <p>Password: admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <p className="text-center mt-6 text-slate-500 text-sm">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            ← 返回前台首頁
          </Link>
        </p>

        {/* Security Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-600 text-xs">
          <Lock className="w-3 h-3" />
          <span>SSL 加密連線保護</span>
          <span>•</span>
          <span>安全登入</span>
        </div>
      </div>
    </div>
  )
}
