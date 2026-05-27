import React, { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  accentColor?: string;
  subtitle?: string;
  subtitleIcon?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  accentColor,
  subtitle,
  subtitleIcon,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-[#c3c6d6]/50 relative overflow-hidden group ${accentColor ? `border-l-4 ${accentColor}` : ""} ${className}`}
    >
      {icon && (
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="text-6xl text-[#0045a9]">{icon}</div>
        </div>
      )}
      <p className="text-sm text-[#424654] mb-1 relative">{label}</p>
      <h3 className="text-4xl font-bold text-[#191b23] relative">{value}</h3>
      {subtitle && (
        <div className="mt-2 flex items-center gap-1 text-xs font-semibold relative">
          {subtitleIcon}
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
}
