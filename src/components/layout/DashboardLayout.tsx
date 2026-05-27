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
    <div className="flex min-h-screen bg-[#faf8ff]">
      <AppSidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <TopHeader title={title} />
        <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10">
          <div className="max-w-[1440px] mx-auto">{children}</div>
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}
