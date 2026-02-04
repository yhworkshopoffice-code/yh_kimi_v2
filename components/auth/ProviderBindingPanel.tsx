"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Link2, Unlink, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProviderStatus = "linked" | "not_linked" | "action_pending";

interface Provider {
  id: "line" | "google";
  name: string;
  icon: React.ReactNode;
  status: ProviderStatus;
  linkedEmail?: string;
}

export function ProviderBindingPanel() {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "line",
      name: "LINE",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .345-.285.63-.631.63s-.63-.285-.63-.63V8.108c0-.345.283-.63.63-.63.346 0 .63.285.63.63v4.771zm-1.995.63c-.345 0-.63-.285-.63-.63V8.108c0-.345.285-.63.63-.63.346 0 .629.285.629.63v4.155h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.384zm-3.33-3.016c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H8.323v1.125h1.842c.349 0 .63.283.63.63 0 .344-.281.629-.63.629H7.369c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.796c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H8.323v1.125h1.842zm-3.855 3.016c0 .345-.285.63-.631.63s-.63-.285-.63-.63V8.108c0-.345.283-.63.63-.63.346 0 .63.285.63.63v4.771z"/>
        </svg>
      ),
      status: "not_linked",
    },
    {
      id: "google",
      name: "Google",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      status: "not_linked",
    },
  ]);

  const [pendingAction, setPendingAction] = useState<{ provider: Provider; action: "bind" | "unbind" } | null>(null);
  const [showLastMethodWarning, setShowLastMethodWarning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const linkedCount = providers.filter((p) => p.status === "linked").length;

  const handleBind = async (provider: Provider) => {
    setIsProcessing(true);
    setPendingAction({ provider, action: "bind" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setProviders((prev) =>
        prev.map((p) =>
          p.id === provider.id
            ? { ...p, status: "linked", linkedEmail: "user@example.com" }
            : p
        )
      );
    } catch (error) {
      console.error("Bind failed:", error);
    } finally {
      setIsProcessing(false);
      setPendingAction(null);
    }
  };

  const handleUnbind = async (provider: Provider) => {
    if (linkedCount === 1 && !hasPasswordSet()) {
      setShowLastMethodWarning(true);
      return;
    }

    setIsProcessing(true);
    setPendingAction({ provider, action: "unbind" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setProviders((prev) =>
        prev.map((p) =>
          p.id === provider.id ? { ...p, status: "not_linked", linkedEmail: undefined } : p
        )
      );
    } catch (error) {
      console.error("Unbind failed:", error);
    } finally {
      setIsProcessing(false);
      setPendingAction(null);
    }
  };

  const hasPasswordSet = () => {
    return true;
  };

  const getStatusBadge = (status: ProviderStatus) => {
    switch (status) {
      case "linked":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-0">已綁定</Badge>;
      case "not_linked":
        return <Badge className="bg-slate-500/10 text-slate-400 border-0">未綁定</Badge>;
      case "action_pending":
        return <Badge className="bg-amber-500/10 text-amber-400 border-0">處理中</Badge>;
    }
  };

  return (
    <>
      <div className="space-y-4">
        {providers.map((provider) => (
          <Card key={provider.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                    {provider.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                      {getStatusBadge(provider.status)}
                    </div>
                    {provider.linkedEmail && (
                      <p className="text-sm text-slate-400">{provider.linkedEmail}</p>
                    )}
                  </div>
                </div>

                <div>
                  {provider.status === "not_linked" ? (
                    <Button
                      onClick={() => handleBind(provider)}
                      disabled={isProcessing}
                      className="bg-cyan-500 hover:bg-cyan-600"
                    >
                      {isProcessing && pendingAction?.provider.id === provider.id ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Link2 className="w-4 h-4 mr-2" />
                      )}
                      綁定
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUnbind(provider)}
                      disabled={isProcessing}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-red-400"
                    >
                      {isProcessing && pendingAction?.provider.id === provider.id ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Unlink className="w-4 h-4 mr-2" />
                      )}
                      解除綁定
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showLastMethodWarning} onOpenChange={setShowLastMethodWarning}>
        <DialogContent className="bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              無法解除綁定
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              這是您目前唯一的登入方式。為了確保您能持續存取帳號，請先設定密碼或綁定其他登入方式後再解除綁定。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowLastMethodWarning(false)} className="bg-cyan-500 hover:bg-cyan-600">
              了解
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
