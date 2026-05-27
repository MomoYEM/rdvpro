"use client";

import React, { useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const config = {
    success: {
      bg: "bg-white border-l-4 border-[#006a6a]",
      icon: <CheckCircle className="w-5 h-5 text-[#006a6a]" />,
    },
    error: {
      bg: "bg-white border-l-4 border-[#ba1a1a]",
      icon: <XCircle className="w-5 h-5 text-[#ba1a1a]" />,
    },
    info: {
      bg: "bg-white border-l-4 border-[#175cd3]",
      icon: <Info className="w-5 h-5 text-[#175cd3]" />,
    },
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${config[type].bg} min-w-[280px] max-w-sm animate-in`}
    >
      {config[type].icon}
      <p className="text-sm font-medium text-[#191b23] flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-[#737785] hover:text-[#191b23] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
