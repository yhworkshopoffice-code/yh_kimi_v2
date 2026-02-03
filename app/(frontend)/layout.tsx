import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "YH遊戲倉庫 - 最安心的遊戲代儲專家",
  description: "全台最安心的遊戲代儲專家，提供快速、安全、透明的遊戲儲值服務。特戰英豪、Apex英雄、原神、崩壞等熱門遊戲代儲。",
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="frontend-layout">
      {children}
    </div>
  );
}
