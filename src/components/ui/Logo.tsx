import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export function Logo({ size = "md", variant = "full" }: LogoProps) {
  const iconSizes = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-16 h-16" };
  const titleSizes = {
    sm: "text-base font-bold",
    md: "text-xl font-bold",
    lg: "text-2xl font-bold",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${iconSizes[size]} rounded-lg bg-[#175cd3] flex items-center justify-center shadow-sm flex-shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={size === "lg" ? "w-9 h-9" : size === "md" ? "w-6 h-6" : "w-5 h-5"}
        >
          <path
            d="M12 2C8.5 2 7 4.5 7 7c0 1.5.5 3 1.5 4L7 20a1 1 0 001 1h1.5l1-5h3l1 5H15a1 1 0 001-1l-1.5-9C15.5 10 16 8.5 16 7c0-2.5-1.5-5-4-5z"
            fill="white"
            opacity="0.9"
          />
          <circle cx="12" cy="7" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>
      {variant === "full" && (
        <div>
          <h1
            className={`${titleSizes[size]} text-[#0045a9] leading-none tracking-tight`}
          >
            RdvPro
          </h1>
          {size !== "sm" && (
            <p className="text-xs text-[#424654] leading-tight">
              Dental Management
            </p>
          )}
        </div>
      )}
    </div>
  );
}
