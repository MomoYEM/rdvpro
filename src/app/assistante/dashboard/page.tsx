"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppointmentStatusBadge } from "@/components/ui/StatusBadge";
import { ConfidentialAccessNotice } from "@/components/ui/ConfidentialAccessNotice";
import { getTodayAppointments } from "@/data/mockAppointments";
import { mockReminders } from "@/data/mockReminders";
import { Toast } from "@/components/ui/Toast";
import {
  Calendar,
  CheckCircle,
  Phone,
  PhoneMissed,
  Clock,
  Plus,
  ChevronRight,
  Bell,
} from "lucide-react";
import { AppointmentStatus } from "@/types";

export default function AssistanteDashboard() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);
  const [appointmentStatuses, setAppointmentStatuses] = useState<Record<string, AppointmentStatus>>({});

  const todayApts = getTodayAppointments();
  const toConfirm = todayApts.filter((a) => a.status === "en-attente" || a.status === "a-rappeler");

  const today = new Date("2026-05-27");
  const dateStr = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleConfirm = (aptId: string, patientName: string) => {
    setAppointmentStatuses((prev) => ({ ...prev, [aptId]: "confirme" }));
    setToast({ message: `${patientName} — Rendez-vous confirmé`, type: "success" });
  };

  const handleNoAnswer = (aptId: string, patientName: string) => {
    setAppointmentStatuses((prev) => ({ ...prev, [aptId]: "a-rappeler" }));
    setToast({ message: `${patientName} — Marqué comme "Ne répond pas"`, type: "info" });
  };

  const getDisplayStatus = (aptId: string, defaultStatus: AppointmentStatus) => {
    return appointmentStatuses[aptId] ?? defaultStatus;
  };

  return (
    <DashboardLayout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="space-y-5 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 md:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#191b23] tracking-tight">
              Bonjour, Nadia 👋
            </h2>
            <p className="text-sm md:text-lg text-[#424654] mt-1 capitalize">{dateStr}</p>
          </div>
          <Link
            href="/agenda/nouveau"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0045a9] text-white rounded-lg text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nouveau RDV
          </Link>
        </div>

        {/* Notice accès limité */}
        <ConfidentialAccessNotice />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border border-[#c3c6d6]/50">
            <p className="text-xs sm:text-sm text-[#424654] mb-1">RDV du jour</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#191b23]">{todayApts.length}</h3>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border-l-4 border-l-[#006a6a] border border-[#c3c6d6]/50">
            <p className="text-xs sm:text-sm text-[#424654] mb-1">À confirmer</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#191b23]">{toConfirm.length}</h3>
            <div className="mt-1 text-xs font-semibold text-[#006a6a] flex items-center gap-1">
              <Bell className="w-3 h-3" />
              Urgent
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border-l-4 border-l-[#853000] border border-[#c3c6d6]/50">
            <p className="text-xs sm:text-sm text-[#424654] mb-1">Rappels</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#191b23]">{mockReminders.length}</h3>
            <div className="mt-1 text-xs font-semibold text-[#853000] flex items-center gap-1">
              <Phone className="w-3 h-3" />
              À contacter
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border-l-4 border-l-[#ba1a1a] border border-[#c3c6d6]/50">
            <p className="text-xs sm:text-sm text-[#424654] mb-1">Reports</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#191b23]">1</h3>
            <div className="mt-1 text-xs font-semibold text-[#ba1a1a] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Demandés
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Confirmations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#191b23] flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#006a6a]" />
                Confirmations du jour
              </h3>
              <Link href="/rappels" className="text-sm text-[#175cd3] font-semibold hover:underline flex items-center gap-1">
                Voir tout <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {toConfirm.slice(0, 4).map((apt) => {
                const displayStatus = getDisplayStatus(apt.id, apt.status);
                return (
                  <div
                    key={apt.id}
                    className="bg-white rounded-xl p-3 sm:p-4 border border-[#c3c6d6]/50 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0045a9] rounded-l-xl" />
                    <div className="flex items-start justify-between gap-2 pl-2">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${apt.colorClass}`}>
                          {apt.patientInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#191b23] truncate">{apt.patientName}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-xs text-[#424654]">{apt.time}</span>
                            <span className="text-xs bg-[#ededf7] text-[#424654] px-2 py-0.5 rounded truncate">{apt.reason}</span>
                          </div>
                          <p className="text-xs text-[#737785] mt-1 truncate">{apt.phone}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <AppointmentStatusBadge status={displayStatus} />
                      </div>
                    </div>
                    {displayStatus !== "confirme" && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-[#c3c6d6]/30">
                        <button
                          onClick={() => handleConfirm(apt.id, apt.patientName)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#0045a9] text-white rounded-lg text-xs font-semibold hover:bg-[#003d96] transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Confirmer
                        </button>
                        <button
                          onClick={() => handleNoAnswer(apt.id, apt.patientName)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#737785] text-[#191b23] rounded-lg text-xs font-semibold hover:bg-[#f3f3fd] transition-colors"
                        >
                          <PhoneMissed className="w-3.5 h-3.5" />
                          Ne répond pas
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Planning du jour */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#191b23] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#175cd3]" />
                Planning du Jour
              </h3>
              <Link href="/agenda" className="text-sm text-[#175cd3] font-semibold hover:underline flex items-center gap-1">
                Agenda <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#c3c6d6]/50 overflow-hidden">
              <ul className="divide-y divide-[#c3c6d6]/30">
                {todayApts.map((apt) => {
                  const displayStatus = getDisplayStatus(apt.id, apt.status);
                  return (
                    <li
                      key={apt.id}
                      className={`flex items-center justify-between gap-2 px-3 sm:px-4 py-3 hover:bg-[#f3f3fd] transition-colors ${apt.status === "termine" ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="text-center w-10 sm:w-12 flex-shrink-0">
                          <div className="text-xs font-bold text-[#191b23]">{apt.time}</div>
                          <div className="text-xs text-[#737785]">{apt.duration}m</div>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${apt.colorClass}`}>
                          {apt.patientInitials}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#191b23] truncate">{apt.patientName}</div>
                          <div className="text-xs text-[#424654] truncate">{apt.reason}</div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <AppointmentStatusBadge status={displayStatus} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
