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
  { label: "Patient arrivé", value: "patient-arrive" },
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

export default function AgendaPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("jour");
  const [selectedDay, setSelectedDay] = useState("2026-05-27");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "tous">("tous");
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  const getFilteredApts = (date: string) => {
    return mockAppointments.filter(
      (a) =>
        a.date === date &&
        (statusFilter === "tous" || a.status === statusFilter)
    );
  };

  const dayApts = getFilteredApts(selectedDay);

  const colorByStatus: Record<string, string> = {
    termine: "bg-[#e1e2ec] border-l-[#737785]",
    confirme: "bg-[#dae2ff] border-l-[#175cd3]",
    "en-attente": "bg-[#ededf7] border-l-[#424654]",
    "patient-arrive": "bg-[#7cf2f3]/30 border-l-[#006a6a]",
    "a-rappeler": "bg-[#ffdad6]/40 border-l-[#ba1a1a]",
    annule: "bg-[#ffdad6]/20 border-l-[#ba1a1a]",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#191b23]">Agenda</h2>
            <p className="text-sm text-[#424654] mt-0.5">
              Semaine du 27 mai — 1 juin 2026
            </p>
          </div>
          <Link
            href="/agenda/nouveau"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0045a9] text-white rounded-lg text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nouveau rendez-vous
          </Link>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-[#c3c6d6] bg-white hover:bg-[#f3f3fd] transition-colors">
                <ChevronLeft className="w-4 h-4 text-[#424654]" />
              </button>
              <span className="text-sm font-semibold text-[#191b23] min-w-[90px] text-center">
                Mai 2026
              </span>
              <button className="p-2 rounded-lg border border-[#c3c6d6] bg-white hover:bg-[#f3f3fd] transition-colors">
                <ChevronRight className="w-4 h-4 text-[#424654]" />
              </button>
            </div>

            {/* View toggle — masqué sur mobile car vue semaine illisible */}
            <div className="hidden sm:flex bg-[#f3f3fd] rounded-lg p-1 border border-[#c3c6d6]/50">
              {(["jour", "semaine"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    viewMode === mode
                      ? "bg-white text-[#0045a9] shadow-sm"
                      : "text-[#424654] hover:text-[#191b23]"
                  }`}
                >
                  {mode === "jour" ? "Jour" : "Semaine"}
                </button>
              ))}
            </div>
          </div>

          {/* Status filter — scroll horizontal sur mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
                  statusFilter === f.value
                    ? "bg-[#0045a9] text-white"
                    : "bg-white text-[#424654] border border-[#c3c6d6] hover:bg-[#f3f3fd]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar grid - semaine */}
        {viewMode === "semaine" && (
          <div className="bg-white rounded-xl shadow-sm border border-[#c3c6d6]/50 overflow-hidden">
            {/* Days header */}
            <div className="grid grid-cols-7 border-b border-[#c3c6d6]/30">
              <div className="py-3 px-2 text-xs text-[#737785] border-r border-[#c3c6d6]/30" />
              {WEEK_DAYS.map((day, i) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(FULL_WEEK_DATES[i]);
                    setViewMode("jour");
                  }}
                  className={`py-3 text-center border-r border-[#c3c6d6]/30 last:border-r-0 hover:bg-[#f3f3fd] transition-colors ${
                    FULL_WEEK_DATES[i] === "2026-05-27"
                      ? "bg-[#0045a9]/5"
                      : ""
                  }`}
                >
                  <p className="text-xs text-[#737785]">{day}</p>
                  <p
                    className={`text-lg font-bold mt-0.5 ${
                      FULL_WEEK_DATES[i] === "2026-05-27"
                        ? "text-[#0045a9]"
                        : "text-[#191b23]"
                    }`}
                  >
                    {WEEK_DATES[i]}
                  </p>
                  <p className="text-xs text-[#737785] mt-0.5">
                    {getFilteredApts(FULL_WEEK_DATES[i]).length} RDV
                  </p>
                </button>
              ))}
            </div>

            {/* Appointments grid */}
            <div className="grid grid-cols-7 min-h-[400px]">
              <div className="border-r border-[#c3c6d6]/30 p-2 space-y-2">
                {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(
                  (t) => (
                    <div key={t} className="text-xs text-[#737785] py-4">
                      {t}
                    </div>
                  )
                )}
              </div>
              {FULL_WEEK_DATES.map((date, di) => (
                <div
                  key={date}
                  className={`border-r border-[#c3c6d6]/30 last:border-r-0 p-2 space-y-2 ${
                    date === "2026-05-27" ? "bg-[#0045a9]/3" : ""
                  }`}
                >
                  {getFilteredApts(date).map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => setSelectedApt(apt)}
                      className={`w-full text-left p-2 rounded-lg border-l-4 text-xs font-semibold hover:opacity-80 transition-opacity ${
                        colorByStatus[apt.status] ?? "bg-[#f3f3fd] border-l-[#737785]"
                      }`}
                    >
                      <div className="font-bold">{apt.time}</div>
                      <div className="truncate text-[#191b23]">{apt.patientName}</div>
                      <div className="text-[#424654] truncate">{apt.reason}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jour view */}
        {viewMode === "jour" && (
          <div className="space-y-4">
            {/* Day nav */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {FULL_WEEK_DATES.map((date, i) => (
                <button
                  key={date}
                  onClick={() => setSelectedDay(date)}
                  className={`flex flex-col items-center px-4 py-2 rounded-xl flex-shrink-0 transition-all ${
                    selectedDay === date
                      ? "bg-[#0045a9] text-white shadow-md"
                      : "bg-white border border-[#c3c6d6] text-[#424654] hover:bg-[#f3f3fd]"
                  }`}
                >
                  <span className="text-xs font-semibold">{WEEK_DAYS[i]}</span>
                  <span className="text-xl font-bold">{WEEK_DATES[i]}</span>
                  <span className={`text-xs ${selectedDay === date ? "text-[#b1c5ff]" : "text-[#737785]"}`}>
                    {getFilteredApts(date).length} RDV
                  </span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {dayApts.length === 0 ? (
                <div className="bg-white rounded-xl py-16 text-center border border-[#c3c6d6]/50">
                  <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#737785]" />
                  <p className="text-sm font-medium text-[#737785]">Aucun rendez-vous ce jour</p>
                </div>
              ) : (
                dayApts.map((apt) => (
                  <div
                    key={apt.id}
                    className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md ${
                      apt.status === "patient-arrive"
                        ? "border-l-4 border-l-[#175cd3] border-[#c3c6d6]/50"
                        : "border-[#c3c6d6]/50"
                    } ${apt.status === "termine" ? "opacity-60" : ""}`}
                  >
                    {/* Main row */}
                    <div
                      className="flex items-center gap-3 p-4 cursor-pointer"
                      onClick={() => setSelectedApt(apt)}
                    >
                      <div className="text-center w-12 flex-shrink-0">
                        <div className="text-sm font-bold text-[#191b23]">{apt.time}</div>
                        <div className="text-xs text-[#737785]">{apt.duration}min</div>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${apt.colorClass}`}>
                        {apt.patientInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#191b23] truncate">{apt.patientName}</div>
                        <div className="text-xs text-[#424654] truncate">{apt.reason}</div>
                      </div>
                      <AppointmentStatusBadge status={apt.status} />
                    </div>
                    {/* Action bar — toujours visible sur mobile */}
                    <div className="flex border-t border-[#c3c6d6]/30">
                      <a
                        href={`tel:${apt.phone}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#424654] hover:bg-[#f3f3fd] transition-colors border-r border-[#c3c6d6]/30"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Appeler
                      </a>
                      <Link
                        href={`/patients/${nameToSlug(apt.patientName)}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#0045a9] hover:bg-[#dae2ff]/30 transition-colors"
                      >
                        <User className="w-3.5 h-3.5" />
                        Dossier
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal détail RDV */}
      {selectedApt && (
        <Modal
          isOpen={!!selectedApt}
          onClose={() => setSelectedApt(null)}
          title="Détail du rendez-vous"
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-base font-bold ${selectedApt.colorClass}`}>
                {selectedApt.patientInitials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#191b23]">{selectedApt.patientName}</h3>
                <p className="text-sm text-[#424654]">{selectedApt.reason}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
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

            <div>
              <AppointmentStatusBadge status={selectedApt.status} />
            </div>

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
