"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-400">
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="搜尋訂單、會員..."
              className="w-80 pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-[10px]">
              3
            </Badge>
          </Button>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-700" />

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">管理員</p>
              <p className="text-xs text-slate-400">admin@yh-recharge.com</p>
            </div>
            <Avatar className="h-9 w-9 border-2 border-cyan-500/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-cyan-500/20 text-cyan-400 text-sm">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
