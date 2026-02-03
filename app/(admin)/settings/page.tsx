"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Save, 
  Store, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Shield, 
  Mail,
  Smartphone,
  Globe,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react"

// 系統設定資料
const initialSettings = {
  // 商店設定
  store: {
    name: "YH代儲",
    description: "安全、快速、專業的遊戲代儲服務",
    contactEmail: "support@yh-recharge.com",
    contactPhone: "0912-345-678",
    timezone: "Asia/Taipei",
    currency: "TWD",
    maintenance: false,
    maintenanceMessage: "系統維護中，請稍後再試",
  },
  // 金流設定
  payment: {
    atmEnabled: true,
    creditCardEnabled: true,
    convenienceStoreEnabled: true,
    linePayEnabled: false,
    atmFee: 0,
    creditCardFee: 2.5,
    convenienceStoreFee: 25,
    linePayFee: 1.5,
  },
  // 簡訊設定
  sms: {
    enabled: true,
    provider: "twilio",
    orderNotification: true,
    paymentNotification: true,
    completionNotification: true,
  },
  // 通知設定
  notification: {
    emailEnabled: true,
    smsEnabled: true,
    lineEnabled: false,
    adminNewOrder: true,
    adminDailyReport: true,
    adminLowStock: true,
  },
  // 安全設定
  security: {
    twoFactorEnabled: false,
    loginAttempts: 5,
    sessionTimeout: 30,
    ipWhitelist: "",
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // 模擬保存
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const updateStoreSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      store: { ...prev.store, [key]: value }
    }))
  }

  const updatePaymentSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      payment: { ...prev.payment, [key]: value }
    }))
  }

  const updateSmsSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      sms: { ...prev.sms, [key]: value }
    }))
  }

  const updateNotificationSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      notification: { ...prev.notification, [key]: value }
    }))
  }

  const updateSecuritySetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [key]: value }
    }))
  }

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">系統設定</h1>
          <p className="text-slate-400 mt-1">管理商店、金流、通知等系統設定</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-cyan-500 hover:bg-cyan-600"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              保存設定
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="store" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <Store className="w-4 h-4 mr-2" />
            商店設定
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            金流設定
          </TabsTrigger>
          <TabsTrigger value="sms" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            簡訊設定
          </TabsTrigger>
          <TabsTrigger value="notification" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            通知設定
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            安全設定
          </TabsTrigger>
        </TabsList>

        {/* 商店設定 */}
        <TabsContent value="store" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">基本資訊</CardTitle>
              <CardDescription className="text-slate-400">
                設定商店名稱、聯絡方式等基本資訊
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-slate-300">商店名稱</Label>
                  <Input 
                    value={settings.store.name}
                    onChange={(e) => updateStoreSetting("name", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">聯絡 Email</Label>
                  <Input 
                    type="email"
                    value={settings.store.contactEmail}
                    onChange={(e) => updateStoreSetting("contactEmail", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">商店描述</Label>
                <Input 
                  value={settings.store.description}
                  onChange={(e) => updateStoreSetting("description", e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-slate-300">聯絡電話</Label>
                  <Input 
                    value={settings.store.contactPhone}
                    onChange={(e) => updateStoreSetting("contactPhone", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">時區</Label>
                  <Select 
                    value={settings.store.timezone}
                    onValueChange={(value) => updateStoreSetting("timezone", value)}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Asia/Taipei" className="text-white">台北 (Asia/Taipei)</SelectItem>
                      <SelectItem value="Asia/Tokyo" className="text-white">東京 (Asia/Tokyo)</SelectItem>
                      <SelectItem value="Asia/Hong_Kong" className="text-white">香港 (Asia/Hong_Kong)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">維護模式</CardTitle>
              <CardDescription className="text-slate-400">
                設定系統維護狀態，維護期間前台將顯示維護訊息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {settings.store.maintenance ? (
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  )}
                  <div>
                    <p className="font-medium text-white">維護模式</p>
                    <p className="text-sm text-slate-400">
                      {settings.store.maintenance ? "目前系統處於維護模式" : "系統正常運作中"}
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={settings.store.maintenance}
                  onCheckedChange={(checked) => updateStoreSetting("maintenance", checked)}
                />
              </div>
              {settings.store.maintenance && (
                <div className="space-y-2">
                  <Label className="text-slate-300">維護訊息</Label>
                  <Input 
                    value={settings.store.maintenanceMessage}
                    onChange={(e) => updateStoreSetting("maintenanceMessage", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 金流設定 */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">支付方式</CardTitle>
              <CardDescription className="text-slate-400">
                啟用或停用各種支付方式
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "atmEnabled", label: "ATM 轉帳", icon: Globe, fee: "atmFee" },
                { key: "creditCardEnabled", label: "信用卡", icon: CreditCard, fee: "creditCardFee" },
                { key: "convenienceStoreEnabled", label: "超商代碼", icon: Store, fee: "convenienceStoreFee" },
                { key: "linePayEnabled", label: "Line Pay", icon: Smartphone, fee: "linePayFee" },
              ].map((method) => (
                <div key={method.key} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <method.icon className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">{method.label}</p>
                      <p className="text-sm text-slate-400">
                        手續費: {settings.payment[method.fee as keyof typeof settings.payment]}%
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.payment[method.key as keyof typeof settings.payment] as boolean}
                    onCheckedChange={(checked) => updatePaymentSetting(method.key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">手續費設定</CardTitle>
              <CardDescription className="text-slate-400">
                設定各支付方式的手續費率 (%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { key: "atmFee", label: "ATM 轉帳手續費 (%)", disabled: !settings.payment.atmEnabled },
                  { key: "creditCardFee", label: "信用卡手續費 (%)", disabled: !settings.payment.creditCardEnabled },
                  { key: "convenienceStoreFee", label: "超商代碼手續費 (NT$)", disabled: !settings.payment.convenienceStoreEnabled },
                  { key: "linePayFee", label: "Line Pay 手續費 (%)", disabled: !settings.payment.linePayEnabled },
                ].map((fee) => (
                  <div key={fee.key} className="space-y-2">
                    <Label className={`${fee.disabled ? "text-slate-500" : "text-slate-300"}`}>
                      {fee.label}
                    </Label>
                    <Input 
                      type="number"
                      disabled={fee.disabled}
                      value={settings.payment[fee.key as keyof typeof settings.payment] as number}
                      onChange={(e) => updatePaymentSetting(fee.key, parseFloat(e.target.value))}
                      className="bg-slate-800 border-slate-700 text-white disabled:opacity-50"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 簡訊設定 */}
        <TabsContent value="sms" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">簡訊服務</CardTitle>
              <CardDescription className="text-slate-400">
                設定簡訊通知服務與發送時機
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-medium text-white">啟用簡訊通知</p>
                    <p className="text-sm text-slate-400">開啟後將發送簡訊通知給客戶</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.sms.enabled}
                  onCheckedChange={(checked) => updateSmsSetting("enabled", checked)}
                />
              </div>

              {settings.sms.enabled && (
                <>
                  <div className="space-y-2">
                    <Label className="text-slate-300">簡訊供應商</Label>
                    <Select 
                      value={settings.sms.provider}
                      onValueChange={(value) => updateSmsSetting("provider", value)}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="twilio" className="text-white">Twilio</SelectItem>
                        <SelectItem value="nexmo" className="text-white">Nexmo</SelectItem>
                        <SelectItem value="local" className="text-white">本地簡訊閘道</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-slate-800" />

                  <div className="space-y-3">
                    <Label className="text-slate-300">發送時機</Label>
                    {[
                      { key: "orderNotification", label: "訂單建立通知", desc: "客戶建立訂單時發送" },
                      { key: "paymentNotification", label: "付款確認通知", desc: "確認收到款項時發送" },
                      { key: "completionNotification", label: "充值完成通知", desc: "充值完成時發送" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                        <div>
                          <p className="text-white">{item.label}</p>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                        <Switch 
                          checked={settings.sms[item.key as keyof typeof settings.sms] as boolean}
                          onCheckedChange={(checked) => updateSmsSetting(item.key, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 通知設定 */}
        <TabsContent value="notification" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">管理員通知</CardTitle>
              <CardDescription className="text-slate-400">
                設定管理員接收的通知類型
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "adminNewOrder", label: "新訂單通知", desc: "有新訂單建立時通知", icon: Bell },
                { key: "adminDailyReport", label: "每日報表", desc: "每日發送營運報表", icon: Mail },
                { key: "adminLowStock", label: "庫存不足警告", desc: "商品庫存不足時通知", icon: AlertCircle },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.notification[item.key as keyof typeof settings.notification] as boolean}
                    onCheckedChange={(checked) => updateNotificationSetting(item.key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全設定 */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">登入安全</CardTitle>
              <CardDescription className="text-slate-400">
                設定登入安全相關選項
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="font-medium text-white">雙重驗證 (2FA)</p>
                    <p className="text-sm text-slate-400">登入時需要額外驗證碼</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.security.twoFactorEnabled}
                  onCheckedChange={(checked) => updateSecuritySetting("twoFactorEnabled", checked)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-slate-300">最大登入嘗試次數</Label>
                  <Input 
                    type="number"
                    value={settings.security.loginAttempts}
                    onChange={(e) => updateSecuritySetting("loginAttempts", parseInt(e.target.value))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Session 超時 (分鐘)</Label>
                  <Input 
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSecuritySetting("sessionTimeout", parseInt(e.target.value))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">IP 白名單 (選填，一行一個 IP)</Label>
                <textarea 
                  value={settings.security.ipWhitelist}
                  onChange={(e) => updateSecuritySetting("ipWhitelist", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  placeholder="例如：&#10;192.168.1.1&#10;10.0.0.1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
