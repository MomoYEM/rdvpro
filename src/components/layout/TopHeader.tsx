"use client";

import React, { useState } from "react";
import { Search, Bell, HelpCircle, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface TopHeaderProps {
  title?: string;
}

export function TopHeader({ title }: TopHeaderProps) {
  const { role } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const userName = role === "dentiste" ? "Dr. Sarah" : "Nadia";
  const initials = role === "dentiste" ? "SJ" : "NC";

  return (
    <header className="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 bg-white shadow-[0_1px_3px_rgba(23,92,211,0.08)] border-b border-[#c3c6d6]/20">
      {/* Mobile: logo only */}
      <div className="flex items-center gap-3 md:hidden">
        <span className="text-lg font-bold text-[#0045a9]">RdvPro</span>
      </div>

      {/* Desktop: search */}
      <div className="hidden md:flex items-center relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737785]" />
        <input
          type="text"
          placeholder="Rechercher un patient..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-[#f3f3fd] border border-[#c3c6d6] rounded-full text-sm focus:outline-none focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] transition-colors text-[#191b23] placeholder:text-[#737785]"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="relative p-2 text-[#424654] rounded-full hover:bg-[#f3f3fd] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
        </button>
        <button className="p-2 text-[#424654] rounded-full hover:bg-[#f3f3fd] transition-colors hidden sm:block">
          <HelpCircle className="w-5 h-5" />
        </button>
        <Link
          href="/parametres"
          className="p-2 text-[#424654] rounded-full hover:bg-[#f3f3fd] transition-colors hidden sm:block"
        >
          <Settings className="w-5 h-5" />
        </Link>
        <div className="ml-1 w-9 h-9 rounded-full bg-[#175cd3] flex items-center justify-center text-white text-xs font-bold cursor-pointer border-2 border-white shadow-sm">
          {initials}
        </div>
      </div>
    </header>
  );
}
