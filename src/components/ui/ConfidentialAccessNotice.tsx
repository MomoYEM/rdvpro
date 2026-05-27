import React from "react";
import { ShieldOff } from "lucide-react";

export function ConfidentialAccessNotice() {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#dae2ff]/30 border border-[#b1c5ff]/50 rounded-xl">
      <ShieldOff className="w-5 h-5 text-[#0045a9] flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-[#0045a9]">
          Accès administratif
        </p>
        <p className="text-xs text-[#424654] mt-0.5">
          Les informations médicales confidentielles sont masquées. Seul le praticien autorisé peut y accéder.
        </p>
      </div>
    </div>
  );
}
