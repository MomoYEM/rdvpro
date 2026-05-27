"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppointmentStatusBadge } from "@/components/ui/StatusBadge";
import { Toast } from "@/components/ui/Toast";
import { mockReminders } from "@/data/mockReminders";
import { AppointmentStatus, Reminder } from "@/types";
import {
  CheckCircle,
  PhoneMissed,
  CalendarOff,
  Smartphone,
  MessageSquare,
  Calendar,
  Phone,
} from "lucide-react";

const CABINET_PHONE = "50938447045";

function buildWhatsAppLink(phone: string | undefined, name: string, time: string) {
  const number = (phone ?? CABINET_PHONE).replace(/[^0-9]/g, "");
  const msg = `Bonjour ${name}, nous vous rappelons votre rendez-vous au cabinet dentaire le mardi 27 mai à ${time}. Merci de confirmer votre présence.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

export default function RappelsPage() {
  const [toast, setToast] = useState<{ msg: string; type: "success" | "info" | "error" } | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);

  const today = new Date("2026-05-26");
  const dateStr = today.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  const handleConfirm = (id: string, name: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "confirme" as AppointmentStatus } : r))
    );
    setToast({ msg: `${name} — Rendez-vous confirmé`, type: "success" });
  };

  const handleNoAnswer = (id: string, name: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "a-rappeler" as AppointmentStatus } : r))
    );
    setToast({ msg: `${name} — Marqué "Ne répond pas"`, type: "info" });
  };

  const handleReport = (id: string, name: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "reporte" as AppointmentStatus } : r))
    );
    setToast({ msg: `${name} — Rendez-vous reporté`, type: "info" });
  };

  const urgent = reminders.filter((r) => r.status === "a-rappeler");
  const confirmed = reminders.filter((r) => r.status === "confirme");

  return (
    <DashboardLayout>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0045a9] mb-1">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Gestion Quotidienne</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#191b23]">Rappels et confirmations</h2>
            <p className="text-xs sm:text-sm text-[#424654] mt-0.5">
              Rendez-vous nécessitant une action.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#f3f3fd] px-3 sm:px-4 py-2 rounded-full border border-[#c3c6d6]/50 shadow-sm self-start sm:self-auto">
            <Calendar className="w-4 h-4 text-[#424654] flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-[#191b23] capitalize">{dateStr}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left: À confirmer */}
          <div className="lg:col-span-2 space-y-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-[#191b23] flex items-center gap-2">
                  À confirmer aujourd&apos;hui
                  {urgent.length > 0 && (
                    <span className="bg-[#ba1a1a] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {urgent.length} urgent{urgent.length > 1 ? "s" : ""}
                    </span>
                  )}
                </h3>
                <button className="text-sm text-[#175cd3] font-semibold hover:underline">Tout voir</button>
              </div>

              <div className="space-y-4">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="bg-white rounded-xl border border-[#c3c6d6]/50 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                        rem.status === "a-rappeler" ? "bg-[#0045a9]" : "bg-[#006a6a] opacity-50"
                      }`}
                    />

                    {/* Patient info */}
                    <div className="flex items-start justify-between gap-2 p-3 sm:p-5 pl-4 sm:pl-6">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${rem.colorClass}`}>
                          {rem.patientInitials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-[#191b23] truncate">{rem.patientName}</h4>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className="text-xs text-[#424654]">{rem.time} ({rem.duration}min)</span>
                            <span className="text-xs bg-[#ededf7] text-[#424654] px-2 py-0.5 rounded truncate max-w-[180px]">{rem.reason}</span>
                          </div>
                          {rem.lastContact && (
                            <p className="text-xs text-[#737785] mt-1 truncate">{rem.lastContact}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <AppointmentStatusBadge status={rem.status} />
                      </div>
                    </div>

                    {/* Actions */}
                    {rem.status !== "confirme" && rem.status !== "reporte" && (
                      <div className="px-3 pb-3 sm:px-5 sm:pb-4 pt-3 border-t border-[#c3c6d6]/30 space-y-2">
                        {/* Actions principales */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleConfirm(rem.id, rem.patientName)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#0045a9] text-white text-xs font-semibold rounded-lg hover:bg-[#003d96] transition-colors shadow-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Confirmer
                          </button>
                          <a
                            href={buildWhatsAppLink(rem.patientPhone, rem.patientName, rem.time)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setToast({ msg: `${rem.patientName} — Message WhatsApp ouvert`, type: "success" })}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#25d366] text-white text-xs font-semibold rounded-lg hover:bg-[#1ebe5d] transition-colors shadow-sm"
                          >
                            <MessageSquare className="w-4 h-4" />
                            WhatsApp
                          </a>
                        </div>
                        {/* Actions secondaires */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleNoAnswer(rem.id, rem.patientName)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-[#424654] text-xs font-semibold rounded-lg border border-[#c3c6d6] hover:bg-[#f3f3fd] transition-colors"
                          >
                            <PhoneMissed className="w-3.5 h-3.5" />
                            Pas de réponse
                          </button>
                          <button
                            onClick={() => handleReport(rem.id, rem.patientName)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-[#424654] text-xs font-semibold rounded-lg border border-[#c3c6d6] hover:bg-[#f3f3fd] transition-colors"
                          >
                            <CalendarOff className="w-3.5 h-3.5" />
                            Reporter
                          </button>
                        </div>
                      </div>
                    )}

                    {(rem.status === "confirme" || rem.status === "reporte") && (
                      <div className="px-4 pb-3 flex items-center gap-1.5 text-xs text-[#006a6a] font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {rem.status === "confirme" ? "Rendez-vous confirmé" : "Rendez-vous reporté"}
                      </div>
                    )}
                  </div>
                ))}

                {reminders.length === 0 && (
                  <div className="bg-white rounded-xl p-12 text-center border border-[#c3c6d6]/50">
                    <CheckCircle className="w-10 h-10 mx-auto text-[#006a6a] mb-3 opacity-40" />
                    <p className="text-sm font-medium text-[#737785]">
                      Tous les rappels sont traités !
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right: Automations à venir */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#175cd3] to-[#0957ce] rounded-xl p-5 text-white shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-3 relative z-10">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  À venir
                </h3>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">Automatisé</span>
              </div>
              <p className="text-xs opacity-90 mb-4 relative z-10">
                Rappels automatiques WhatsApp et SMS prévus pour les rendez-vous de demain.
              </p>
              <div className="space-y-3 relative z-10">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-semibold">WhatsApp</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-semibold">Bientôt</span>
                  </div>
                  <p className="text-xs opacity-80">Envoi automatique J-1</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-xs font-semibold">SMS</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-semibold">Bientôt</span>
                  </div>
                  <p className="text-xs opacity-80">Confirmation par SMS</p>
                </div>
              </div>
            </div>

            {/* Résumé */}
            <div className="bg-white rounded-xl p-4 border border-[#c3c6d6]/50 shadow-sm">
              <h4 className="text-sm font-semibold text-[#191b23] mb-3">Résumé du jour</h4>
              <dl className="space-y-2">
                <div className="flex justify-between text-sm">
                  <dt className="text-[#424654]">Confirmés</dt>
                  <dd className="font-bold text-[#006a6a]">{confirmed.length}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-[#424654]">En attente</dt>
                  <dd className="font-bold text-[#424654]">{urgent.length}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-[#424654]">Total rappels</dt>
                  <dd className="font-bold text-[#191b23]">{reminders.length}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
