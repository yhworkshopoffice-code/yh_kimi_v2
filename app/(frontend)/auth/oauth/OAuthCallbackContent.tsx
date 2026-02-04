"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("正在處理登入...");

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setMessage(getErrorMessage(error));
      return;
    }

    if (!code) {
      setStatus("error");
      setMessage("授權碼缺失，請重新嘗試登入。");
      return;
    }

    const processCallback = async () => {
      try {
        const response = await fetch("/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, state }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "登入處理失敗");
        }

        setStatus("success");
        setMessage("登入成功！正在跳轉...");
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "登入處理時發生錯誤");
      }
    };

    processCallback();
  }, [searchParams, router]);

  const getErrorMessage = (error: string): string => {
    const errorMessages: Record<string, string> = {
      access_denied: "您取消了授權，請重新嘗試。",
      invalid_request: "無效的請求，請聯繫客服。",
      unauthorized_client: "未授權的客戶端，請聯繫客服。",
      server_error: "伺服器錯誤，請稍後再試。",
    };
    return errorMessages[error] || `登入失敗：${error}`;
  };

  const handleRetry = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === "loading" && (
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
            )}
            {status === "success" && (
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            )}
            {status === "error" && (
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            )}
          </div>
          <CardTitle className="text-xl font-bold text-white">
            {status === "loading" && "處理中"}
            {status === "success" && "登入成功"}
            {status === "error" && "登入失敗"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {message}
          </CardDescription>
        </CardHeader>
        {status === "error" && (
          <CardContent className="flex justify-center">
            <Button onClick={handleRetry} variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-700">
              返回登入頁面
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
