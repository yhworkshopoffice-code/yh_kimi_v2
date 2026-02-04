import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "登入 - YH遊戲倉庫",
  description: "使用 LINE 或 Google 帳號登入 YH遊戲倉庫",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">歡迎回來</CardTitle>
          <CardDescription className="text-slate-400">
            登入您的帳號以繼續
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Credential Login Form */}
          <form className="space-y-4" action="#">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                電子郵件 / 手機號碼
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="your@email.com 或 0912345678"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                密碼
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-slate-400 cursor-pointer"
                >
                  記住我
                </Label>
              </div>
              <Link
                href="/auth/forgot"
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                忘記密碼？
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              登入
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">或</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 bg-[#06C755] hover:bg-[#05b34d] text-white border-0 flex items-center justify-center gap-3"
              asChild
            >
              <Link href="/api/auth/line">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .345-.285.63-.631.63s-.63-.285-.63-.63V8.108c0-.345.283-.63.63-.63.346 0 .63.285.63.63v4.771zm-1.995.63c-.345 0-.63-.285-.63-.63V8.108c0-.345.285-.63.63-.63.346 0 .629.285.629.63v4.155h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.384zm-3.33-3.016c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H8.323v1.125h1.842c.349 0 .63.283.63.63 0 .344-.281.629-.63.629H7.369c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.796c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H8.323v1.125h1.842zm-3.855 3.016c0 .345-.285.63-.631.63s-.63-.285-.63-.63V8.108c0-.345.283-.63.63-.63.346 0 .63.285.63.63v4.771z"/>
                </svg>
                使用 LINE 登入
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 bg-white hover:bg-gray-100 text-gray-700 border-gray-300 flex items-center justify-center gap-3"
              asChild
            >
              <Link href="/api/auth/google">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                使用 Google 登入
              </Link>
            </Button>
          </div>

          {/* Register Link */}
          <div className="text-center text-sm text-slate-400 pt-2">
            還沒有帳號？{" "}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 underline">
              立即註冊
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
