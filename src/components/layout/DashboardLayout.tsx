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
    <div className="min-h-screen bg-[#faf8ff]">
      <AppSidebar />
      <div className="flex flex-col min-h-screen md:ml-64">
        <TopHeader title={title} />
        <main className="flex-1 px-3 py-4 sm:p-6 md:p-10 pb-24 md:pb-10 w-full overflow-x-hidden">
          <div className="max-w-[1440px] mx-auto w-full">{children}</div>
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}
