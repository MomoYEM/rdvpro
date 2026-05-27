"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Bell,
  Plus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { role } = useAuth();

  const dashHref =
    role === "dentiste" ? "/dentiste/dashboard" : "/assistante/dashboard";

  const items = [
    { href: dashHref, icon: <LayoutDashboard className="w-5 h-5" />, label: "Accueil" },
    { href: "/agenda", icon: <Calendar className="w-5 h-5" />, label: "Agenda" },
    { href: "/agenda/nouveau", icon: <Plus className="w-5 h-5" />, label: "Nouveau", special: true },
    { href: "/patients", icon: <Users className="w-5 h-5" />, label: "Patients" },
    { href: "/rappels", icon: <Bell className="w-5 h-5" />, label: "Rappels" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#c3c6d6]/40 shadow-lg">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== dashHref && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                item.special
                  ? "relative"
                  : isActive
                  ? "text-[#0045a9]"
                  : "text-[#424654]"
              }`}
            >
              {item.special ? (
                <div className="w-12 h-12 rounded-full bg-[#0045a9] flex items-center justify-center text-white shadow-md -mt-4 border-4 border-white">
                  {item.icon}
                </div>
              ) : (
                <>
                  <div className={isActive ? "text-[#0045a9]" : "text-[#737785]"}>
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-semibold ${isActive ? "text-[#0045a9]" : "text-[#737785]"}`}>
                    {item.label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
