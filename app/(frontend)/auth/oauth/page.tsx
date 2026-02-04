"use client";

import { Suspense } from "react";
import { OAuthCallbackContent } from "./OAuthCallbackContent";

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
          <div className="text-white">載入中...</div>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
