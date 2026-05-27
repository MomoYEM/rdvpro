"use client";

import React, { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopHeader } from "./TopHeader";
import { MobileBottomNav } from "./MobileBottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[#faf8ff] overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen overflow-hidden">
        <TopHeader title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-10 pb-20 md:pb-10">
          <div className="max-w-[1440px] mx-auto">{children}</div>
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}
