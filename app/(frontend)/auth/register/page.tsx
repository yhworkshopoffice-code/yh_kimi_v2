import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "註冊 - YH遊戲倉庫",
  description: "註冊 YH遊戲倉庫帳號",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">建立帳號</CardTitle>
          <CardDescription className="text-slate-400">
            填寫以下資訊完成註冊
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">電子郵件</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">密碼</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
              <p className="text-xs text-slate-500">
                密碼至少需要 8 個字元，包含大小寫字母和數字
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">確認密碼</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              註冊
            </Button>
          </form>

          <div className="text-center text-sm text-slate-400">
            已有帳號？{" "}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 underline">
              立即登入
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
