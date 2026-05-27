"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppointmentStatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { mockAppointments } from "@/data/mockAppointments";
import { nameToSlug } from "@/lib/utils";
import { Appointment, AppointmentStatus } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Phone,
  Clock,
  User,
  Calendar,
} from "lucide-react";

type ViewMode = "jour" | "semaine";

const STATUS_FILTERS: { label: string; value: AppointmentStatus | "tous" }[] = [
  { label: "Tous", value: "tous" },
  { label: "Confirmés", value: "confirme" },
  { label: "En attente", value: "en-attente" },
  { label: "Arrivé", value: "patient-arrive" },
  { label: "À rappeler", value: "a-rappeler" },
  { label: "Terminés", value: "termine" },
];

const WEEK_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const WEEK_DATES = ["27", "28", "29", "30", "31", "01"];
const FULL_WEEK_DATES = [
  "2026-05-27",
  "2026-05-28",
  "2026-05-29",
  "2026-05-30",
  "2026-05-31",
  "2026-06-01",
];

const colorByStatus: Record<string, string> = {
  termine: "bg-[#e1e2ec] border-l-[#737785]",
  confirme: "bg-[#dae2ff] border-l-[#175cd3]",
  "en-attente": "bg-[#ededf7] border-l-[#424654]",
  "patient-arrive": "bg-[#7cf2f3]/30 border-l-[#006a6a]",
  "a-rappeler": "bg-[#ffdad6]/40 border-l-[#ba1a1a]",
  annule: "bg-[#ffdad6]/20 border-l-[#ba1a1a]",
};

export default function AgendaPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("jour");
  const [selectedDay, setSelectedDay] = useState("2026-05-27");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "tous">("tous");
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  const getFilteredApts = (date: string) =>
    mockAppointments.filter(
      (a) => a.date === date && (statusFilter === "tous" || a.status === statusFilter)
    );

  const dayApts = getFilteredApts(selectedDay);

  return (
    <DashboardLayout>
      <div className="space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#191b23]">Agenda</h2>
            <p className="text-xs text-[#424654]">Sem. 27 mai — 1 juin 2026</p>
          </div>
          <Link
            href="/agenda/nouveau"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0045a9] text-white rounded-lg text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nouveau</span>
            <span className="sm:hidden">+</span>
          </Link>
        </div>

        {/* Nav mois + toggle vue (desktop uniquement) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-[#c3c6d6] bg-white hover:bg-[#f3f3fd] transition-colors">
              <ChevronLeft className="w-4 h-4 text-[#424654]" />
            </button>
            <span className="text-sm font-semibold text-[#191b23] px-2">Mai 2026</span>
            <button className="p-1.5 rounded-lg border border-[#c3c6d6] bg-white hover:bg-[#f3f3fd] transition-colors">
              <ChevronRight className="w-4 h-4 text-[#424654]" />
            </button>
          </div>
          <div className="hidden sm:flex bg-[#f3f3fd] rounded-lg p-1 border border-[#c3c6d6]/50 ml-auto">
            {(["jour", "semaine"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-sm font-semibold transition-all ${
                  viewMode === mode ? "bg-white text-[#0045a9] shadow-sm" : "text-[#424654]"
                }`}
              >
                {mode === "jour" ? "Jour" : "Semaine"}
              </button>
            ))}
          </div>
        </div>

        {/* Filtres statuts — scroll horizontal sans débordement */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors border ${
                statusFilter === f.value
                  ? "bg-[#0045a9] text-white border-[#0045a9]"
                  : "bg-white text-[#424654] border-[#c3c6d6] hover:bg-[#f3f3fd]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Vue semaine — desktop seulement */}
        {viewMode === "semaine" && (
          <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-[#c3c6d6]/50 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-[#c3c6d6]/30">
              <div className="py-3 px-2 border-r border-[#c3c6d6]/30" />
              {WEEK_DAYS.map((day, i) => (
                <button
                  key={day}
                  onClick={() => { setSelectedDay(FULL_WEEK_DATES[i]); setViewMode("jour"); }}
                  className={`py-3 text-center border-r border-[#c3c6d6]/30 last:border-r-0 hover:bg-[#f3f3fd] transition-colors ${
                    FULL_WEEK_DATES[i] === "2026-05-27" ? "bg-[#0045a9]/5" : ""
                  }`}
                >
                  <p className="text-xs text-[#737785]">{day}</p>
                  <p className={`text-lg font-bold mt-0.5 ${FULL_WEEK_DATES[i] === "2026-05-27" ? "text-[#0045a9]" : "text-[#191b23]"}`}>
                    {WEEK_DATES[i]}
                  </p>
                  <p className="text-xs text-[#737785] mt-0.5">{getFilteredApts(FULL_WEEK_DATES[i]).length} RDV</p>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-7 min-h-[300px]">
              <div className="border-r border-[#c3c6d6]/30 p-2">
                {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((t) => (
                  <div key={t} className="text-xs text-[#737785] py-4">{t}</div>
                ))}
              </div>
              {FULL_WEEK_DATES.map((date) => (
                <div key={date} className="border-r border-[#c3c6d6]/30 last:border-r-0 p-1.5 space-y-1.5">
                  {getFilteredApts(date).map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => setSelectedApt(apt)}
                      className={`w-full text-left p-1.5 rounded border-l-4 text-xs hover:opacity-80 transition-opacity ${
                        colorByStatus[apt.status] ?? "bg-[#f3f3fd] border-l-[#737785]"
                      }`}
                    >
                      <div className="font-bold">{apt.time}</div>
                      <div className="truncate">{apt.patientName}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vue jour — visible sur tous les écrans */}
        {(viewMode === "jour" || true) && viewMode === "jour" && (
          <div className="space-y-3">
            {/* Sélecteur de jours — grid fixe, pas de flex overflow */}
            <div className="grid grid-cols-6 gap-1.5">
              {FULL_WEEK_DATES.map((date, i) => (
                <button
                  key={date}
                  onClick={() => setSelectedDay(date)}
                  className={`flex flex-col items-center py-2 rounded-xl transition-all ${
                    selectedDay === date
                      ? "bg-[#0045a9] text-white shadow-md"
                      : "bg-white border border-[#c3c6d6] text-[#424654] hover:bg-[#f3f3fd]"
                  }`}
                >
                  <span className="text-[10px] font-semibold">{WEEK_DAYS[i]}</span>
                  <span className="text-base font-bold leading-tight">{WEEK_DATES[i]}</span>
                  <span className={`text-[9px] font-medium ${selectedDay === date ? "text-[#b1c5ff]" : "text-[#737785]"}`}>
                    {getFilteredApts(date).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Liste des RDV */}
            {dayApts.length === 0 ? (
              <div className="bg-white rounded-xl py-12 text-center border border-[#c3c6d6]/50">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#737785]" />
                <p className="text-sm font-medium text-[#737785]">Aucun rendez-vous ce jour</p>
              </div>
            ) : (
              dayApts.map((apt) => (
                <div
                  key={apt.id}
                  className={`bg-white rounded-xl border border-[#c3c6d6]/50 shadow-sm overflow-hidden ${
                    apt.status === "termine" ? "opacity-60" : ""
                  }`}
                >
                  <div
                    className="flex items-center gap-3 p-3 cursor-pointer"
                    onClick={() => setSelectedApt(apt)}
                  >
                    {/* Heure */}
                    <div className="text-center w-10 flex-shrink-0">
                      <div className="text-xs font-bold text-[#191b23]">{apt.time}</div>
                      <div className="text-[10px] text-[#737785]">{apt.duration}m</div>
                    </div>
                    {/* Barre couleur statut */}
                    <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${
                      apt.status === "confirme" ? "bg-[#175cd3]" :
                      apt.status === "patient-arrive" ? "bg-[#006a6a]" :
                      apt.status === "a-rappeler" ? "bg-[#ba1a1a]" :
                      apt.status === "termine" ? "bg-[#737785]" :
                      "bg-[#c3c6d6]"
                    }`} />
                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${apt.colorClass}`}>
                      {apt.patientInitials}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[#191b23] truncate">{apt.patientName}</div>
                      <div className="text-xs text-[#424654] truncate">{apt.reason}</div>
                    </div>
                    <AppointmentStatusBadge status={apt.status} />
                  </div>
                  {/* Actions */}
                  <div className="grid grid-cols-2 border-t border-[#c3c6d6]/30">
                    <a
                      href={`tel:${apt.phone}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#424654] hover:bg-[#f3f3fd] transition-colors border-r border-[#c3c6d6]/30"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Appeler
                    </a>
                    <Link
                      href={`/patients/${nameToSlug(apt.patientName)}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#0045a9] hover:bg-[#dae2ff]/30 transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      Dossier
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedApt && (
        <Modal isOpen onClose={() => setSelectedApt(null)} title="Détail du rendez-vous" size="md">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold ${selectedApt.colorClass}`}>
                {selectedApt.patientInitials}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#191b23]">{selectedApt.patientName}</h3>
                <p className="text-sm text-[#424654]">{selectedApt.reason}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#424654]">
                <Clock className="w-4 h-4 text-[#737785]" />
                <span>{selectedApt.time} — {selectedApt.duration} min</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#424654]">
                <Phone className="w-4 h-4 text-[#737785]" />
                <span>{selectedApt.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#424654]">
                <User className="w-4 h-4 text-[#737785]" />
                <span>{selectedApt.practitioner}</span>
              </div>
            </div>
            <AppointmentStatusBadge status={selectedApt.status} />
            <div className="flex gap-3 pt-2">
              <Link
                href={`/patients/${nameToSlug(selectedApt.patientName)}`}
                className="flex-1 py-2.5 text-center bg-[#0045a9] text-white rounded-lg text-sm font-semibold hover:bg-[#003d96] transition-colors"
              >
                Voir le dossier
              </Link>
              <button
                onClick={() => setSelectedApt(null)}
                className="flex-1 py-2.5 border border-[#c3c6d6] text-[#191b23] rounded-lg text-sm font-semibold hover:bg-[#f3f3fd] transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
