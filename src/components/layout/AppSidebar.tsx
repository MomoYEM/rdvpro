"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  ClipboardList,
  Bell,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    href: "/dentiste/dashboard",
    label: "Tableau de bord",
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ["dentiste"],
  },
  {
    href: "/assistante/dashboard",
    label: "Tableau de bord",
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ["assistante"],
  },
  {
    href: "/agenda",
    label: "Agenda",
    icon: <Calendar className="w-5 h-5" />,
    roles: ["dentiste", "assistante"],
  },
  {
    href: "/patients",
    label: "Patients",
    icon: <Users className="w-5 h-5" />,
    roles: ["dentiste", "assistante"],
  },
  {
    href: "/consultations/nouvelle",
    label: "Consultations",
    icon: <Stethoscope className="w-5 h-5" />,
    roles: ["dentiste"],
  },
  {
    href: "/suivis",
    label: "Suivis",
    icon: <ClipboardList className="w-5 h-5" />,
    roles: ["dentiste", "assistante"],
  },
  {
    href: "/rappels",
    label: "Rappels",
    icon: <Bell className="w-5 h-5" />,
    roles: ["dentiste", "assistante"],
  },
  {
    href: "/rapports",
    label: "Rapports",
    icon: <BarChart2 className="w-5 h-5" />,
    roles: ["dentiste"],
  },
  {
    href: "/parametres",
    label: "Paramètres",
    icon: <Settings className="w-5 h-5" />,
    roles: ["dentiste"],
  },
];

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className = "" }: AppSidebarProps) {
  const pathname = usePathname();
  const { role, logout } = useAuth();

  const visibleItems = navItems.filter(
    (item) => role && item.roles.includes(role)
  );

  const isActive = (href: string) => {
    if (href === "/dentiste/dashboard" || href === "/assistante/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href) && href !== "/";
  };

  return (
    <aside
      className={`hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#f3f3fd] border-r border-[#c3c6d6]/40 py-4 z-40 ${className}`}
    >
      {/* Header */}
      <div className="px-6 pb-4 mb-2">
        <Logo size="md" />
      </div>

      {/* CTA */}
      <div className="px-4 mb-4">
        <Link
          href="/agenda/nouveau"
          className="w-full flex items-center justify-center gap-2 bg-[#0045a9] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#003d96] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nouveau rendez-vous
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 mx-1 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive(item.href)
                ? "bg-[#175cd3] text-white shadow-sm"
                : "text-[#424654] hover:bg-[#e7e7f2] hover:text-[#191b23]"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 pt-4 border-t border-[#c3c6d6]/40 space-y-1">
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 mx-1 rounded-lg text-sm font-semibold text-[#424654] hover:bg-[#e7e7f2] hover:text-[#191b23] transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Support</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 mx-1 rounded-lg text-sm font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}
