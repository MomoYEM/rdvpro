"use client";

import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-[#191b23]/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-[#c3c6d6]/30 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#c3c6d6]/30 sticky top-0 bg-white z-10">
          <h2 className="text-base sm:text-lg font-semibold text-[#191b23]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#737785] hover:text-[#191b23] p-1 rounded-lg hover:bg-[#f3f3fd] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
