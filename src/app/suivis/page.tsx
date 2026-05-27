"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FollowUpStatusBadge } from "@/components/ui/StatusBadge";
import { Toast } from "@/components/ui/Toast";
import { mockFollowUps } from "@/data/mockFollowUps";
import { FollowUp, FollowUpStatus } from "@/types";
import { getFollowUpStatusLabel } from "@/lib/utils";
import { formatDateShort } from "@/lib/utils";
import {
  PhoneCall,
  CalendarPlus,
  Filter,
  AlertTriangle,
  Clock,
} from "lucide-react";

export default function SuivisPage() {
  const [filter, setFilter] = useState<FollowUpStatus | "tous">("tous");
  const [toast, setToast] = useState<string | null>(null);
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps);

  const filtered = followUps.filter(
    (f) => filter === "tous" || f.status === filter
  );

  const enRetard = followUps.filter((f) => f.status === "en-retard").length;
  const aContacter = followUps.filter((f) => f.status === "a-contacter").length;

  const handleContact = (id: string, name: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "programme" as FollowUpStatus } : f))
    );
    setToast(`${name} — Marqué comme contacté`);
  };

  return (
    <DashboardLayout>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#191b23]">Suivis patients</h2>
          <p className="text-xs sm:text-sm text-[#424654] mt-0.5">
            Gérez les rappels, contrôles et suivis post-opératoires.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#c3c6d6]/50 relative overflow-hidden border-l-4 border-l-[#0045a9]">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#dae2ff] flex items-center justify-center">
                <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-[#0045a9]" />
              </div>
              <span className="hidden sm:flex bg-[#e1e2ec] text-[#424654] px-3 py-1 rounded-full text-xs font-semibold items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0045a9]" />
                Priorité haute
              </span>
            </div>
            <div className="text-3xl sm:text-5xl font-bold text-[#0045a9] mb-1">{aContacter}</div>
            <h3 className="text-xs sm:text-base font-semibold text-[#191b23]">À contacter</h3>
            <p className="text-xs text-[#424654] mt-1 hidden sm:block">
              Voir la liste prioritaire
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#c3c6d6]/50 border-l-4 border-l-[#ba1a1a] relative overflow-hidden">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ffdad6] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-[#ba1a1a]" />
              </div>
              <span className="hidden sm:flex bg-[#ffdad6]/40 text-[#ba1a1a] px-3 py-1 rounded-full text-xs font-semibold items-center gap-1">
                <Clock className="w-3 h-3" />
                Action requise
              </span>
            </div>
            <div className="text-3xl sm:text-5xl font-bold text-[#ba1a1a] mb-1">{enRetard}</div>
            <h3 className="text-xs sm:text-base font-semibold text-[#191b23]">En retard</h3>
            <p className="text-xs text-[#424654] mt-1 hidden sm:block">Traiter les retards</p>
          </div>
        </div>

        {/* Filter */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-semibold text-[#191b23]">
            Liste des suivis actifs
          </h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            {(["tous", "a-contacter", "en-retard", "programme", "termine"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors border ${
                  filter === f
                    ? "bg-[#0045a9] text-white border-[#0045a9]"
                    : "bg-white text-[#424654] border-[#c3c6d6] hover:bg-[#f3f3fd]"
                }`}
              >
                {f === "tous" ? "Tous" : getFollowUpStatusLabel(f)}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filtered.map((fu) => (
            <div
              key={fu.id}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
                fu.status === "en-retard"
                  ? "border-[#ba1a1a]/30"
                  : "border-[#c3c6d6]/50"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 ${fu.colorClass}`}>
                    {fu.patientInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-[#191b23] truncate">{fu.patientName}</h4>
                      <FollowUpStatusBadge status={fu.status} />
                    </div>
                    <p className="text-xs sm:text-sm text-[#424654]">{fu.reason}</p>
                    <p className="text-xs text-[#737785] mt-1 sm:hidden">
                      Recommandé : <span className="font-semibold text-[#191b23]">{formatDateShort(fu.recommendedDate)}</span>
                    </p>
                    {fu.notes && (
                      <p className="text-xs text-[#737785] mt-1 hidden sm:block">{fu.notes}</p>
                    )}
                  </div>
                </div>

                <div className="hidden md:block text-center px-4 lg:px-6 border-x border-[#c3c6d6]/30">
                  <p className="text-xs text-[#737785]">Recommandé</p>
                  <p className="text-sm font-semibold text-[#191b23] whitespace-nowrap">
                    {formatDateShort(fu.recommendedDate)}
                  </p>
                </div>

                {fu.lastAppointment && (
                  <div className="hidden lg:block text-center px-4">
                    <p className="text-xs text-[#737785]">Dernier RDV</p>
                    <p className="text-sm font-semibold text-[#191b23] whitespace-nowrap">{fu.lastAppointment}</p>
                  </div>
                )}
              </div>

              {/* Actions toujours en bas */}
              <div className="grid grid-cols-2 border-t border-[#c3c6d6]/30">
                <Link
                  href="/agenda/nouveau"
                  className="flex items-center justify-center gap-1.5 text-[#0045a9] hover:bg-[#f3f3fd] px-4 py-2.5 text-xs font-semibold transition-colors border-r border-[#c3c6d6]/30"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  Programmer
                </Link>
                <button
                  onClick={() => handleContact(fu.id, fu.patientName)}
                  className="flex items-center justify-center gap-1.5 bg-[#0045a9] text-white hover:bg-[#003d96] px-4 py-2.5 text-xs font-semibold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Contacter
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center border border-[#c3c6d6]/50">
              <p className="text-sm font-medium text-[#737785]">Aucun suivi pour ce filtre</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
