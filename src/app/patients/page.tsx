"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppointmentStatusBadge } from "@/components/ui/StatusBadge";
import { FollowUpStatusBadge } from "@/components/ui/StatusBadge";
import { mockPatients } from "@/data/mockPatients";
import { nameToSlug, formatDateShort } from "@/lib/utils";
import {
  Search,
  UserPlus,
  Phone,
  Calendar,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"tous" | "actif" | "suivi">("tous");

  const filtered = mockPatients.filter((p) => {
    const matchSearch =
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchFilter =
      filter === "tous" ||
      (filter === "suivi" && p.followUpStatus === "a-contacter") ||
      (filter === "actif" && p.nextAppointment);
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#191b23]">Patients</h2>
            <p className="text-sm text-[#424654] mt-0.5">
              {mockPatients.length} patients enregistrés
            </p>
          </div>
          <Link
            href="/agenda/nouveau"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0045a9] text-white rounded-lg text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Nouveau patient
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737785]" />
            <input
              type="text"
              placeholder="Rechercher par nom ou téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
            />
          </div>
          <div className="flex bg-[#f3f3fd] rounded-lg p-1 border border-[#c3c6d6]/50">
            {[
              { value: "tous", label: "Tous" },
              { value: "actif", label: "Avec RDV" },
              { value: "suivi", label: "À suivre" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as typeof filter)}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                  filter === f.value
                    ? "bg-white text-[#0045a9] shadow-sm"
                    : "text-[#424654] hover:text-[#191b23]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Patient list - Desktop table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-[#c3c6d6]/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#c3c6d6]/30 bg-[#f3f3fd]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#424654] uppercase tracking-wide">Patient</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#424654] uppercase tracking-wide">Téléphone</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#424654] uppercase tracking-wide">Dernière visite</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#424654] uppercase tracking-wide">Prochain RDV</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#424654] uppercase tracking-wide">Suivi</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d6]/30">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#f3f3fd] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${p.colorClass}`}>
                        {p.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#191b23]">{p.fullName}</p>
                        {p.alerts && p.alerts.length > 0 && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <AlertTriangle className="w-3 h-3 text-[#ba1a1a]" />
                            <span className="text-xs text-[#ba1a1a] font-medium">{p.alerts[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-sm text-[#424654]">
                      <Phone className="w-3.5 h-3.5 text-[#737785]" />
                      {p.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-sm text-[#424654]">
                    {p.lastConsultationDate
                      ? formatDateShort(p.lastConsultationDate)
                      : <span className="text-[#737785]">—</span>}
                  </td>
                  <td className="py-3.5 px-4">
                    {p.nextAppointment ? (
                      <div>
                        <p className="text-sm text-[#191b23] font-medium">{formatDateShort(p.nextAppointment)}</p>
                        <p className="text-xs text-[#424654]">{p.nextAppointmentReason}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-[#737785]">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {p.followUpStatus && (
                      <FollowUpStatusBadge status={p.followUpStatus} />
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/patients/${nameToSlug(p.fullName)}`}
                      className="flex items-center gap-1 text-sm text-[#175cd3] font-semibold hover:underline ml-auto"
                    >
                      Voir le dossier <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-[#737785]">
              <p className="text-sm font-medium">Aucun patient trouvé</p>
            </div>
          )}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#c3c6d6]/50">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${p.colorClass}`}>
                  {p.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#191b23]">{p.fullName}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#424654] mt-0.5">
                    <Phone className="w-3 h-3" />
                    {p.phone}
                  </div>
                </div>
                {p.followUpStatus && <FollowUpStatusBadge status={p.followUpStatus} />}
              </div>
              {p.nextAppointment && (
                <div className="flex items-center gap-1.5 text-xs text-[#424654] mb-3">
                  <Calendar className="w-3 h-3" />
                  Prochain RDV : {formatDateShort(p.nextAppointment)} — {p.nextAppointmentReason}
                </div>
              )}
              <Link
                href={`/patients/${nameToSlug(p.fullName)}`}
                className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#f3f3fd] border border-[#c3c6d6]/50 text-sm font-semibold text-[#0045a9] rounded-lg hover:bg-[#dae2ff]/30 transition-colors"
              >
                Voir le dossier <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
