"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Crown,
  PieChart,
  Settings,
  LogOut,
  Ticket,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "儀表板",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "訂單管理",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "會員管理",
    href: "/users",
    icon: Users,
  },
  {
    title: "商品管理",
    href: "/products",
    icon: Package,
  },
  {
    title: "VIP 管理",
    href: "/vip",
    icon: Crown,
  },
  {
    title: "優惠券",
    href: "/coupons",
    icon: Ticket,
  },
  {
    title: "財務報表",
    href: "/finance",
    icon: PieChart,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-7 h-7">
              <ellipse cx="50" cy="60" rx="35" ry="25" fill="#0f172a"/>
              <circle cx="30" cy="45" r="18" fill="#0f172a"/>
              <ellipse cx="22" cy="38" rx="8" ry="6" fill="#0891b2"/>
              <circle cx="70" cy="30" r="12" fill="#E74C3C"/>
              <circle cx="70" cy="30" r="6" fill="#fbbf24"/>
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold text-white">YH</span>
            <span className="text-xl font-bold text-cyan-400">管理後台</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Settings className="w-5 h-5" />
          系統設定
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          登出
        </Link>

      </div>
    </aside>
  )
}
