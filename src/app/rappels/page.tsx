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

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0045a9] mb-1">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Gestion Quotidienne</span>
            </div>
            <h2 className="text-2xl font-bold text-[#191b23]">Rappels et confirmations</h2>
            <p className="text-sm text-[#424654] mt-0.5">
              Gérez les rendez-vous nécessitant une action de votre part.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#f3f3fd] px-4 py-2 rounded-full border border-[#c3c6d6]/50 shadow-sm">
            <Calendar className="w-4 h-4 text-[#424654]" />
            <span className="text-sm font-semibold text-[#191b23] capitalize">{dateStr}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    className="bg-white rounded-xl p-4 sm:p-5 border border-[#c3c6d6]/50 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                        rem.status === "a-rappeler" ? "bg-[#0045a9]" : "bg-[#006a6a] opacity-50"
                      }`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Patient info */}
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${rem.colorClass}`}>
                          {rem.patientInitials}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#191b23]">{rem.patientName}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-xs text-[#424654]">{rem.time} ({rem.duration} min)</span>
                            <span className="text-xs bg-[#ededf7] text-[#424654] px-2 py-0.5 rounded">{rem.reason}</span>
                          </div>
                          {rem.lastContact && (
                            <p className="text-xs text-[#737785] mt-1">{rem.lastContact}</p>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex-shrink-0">
                        <AppointmentStatusBadge status={rem.status} />
                      </div>
                    </div>

                    {/* Actions */}
                    {rem.status !== "confirme" && rem.status !== "reporte" && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#c3c6d6]/30">
                        <button
                          onClick={() => handleConfirm(rem.id, rem.patientName)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0045a9] text-white rounded-lg text-xs font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Confirmer
                        </button>
                        <a
                          href={buildWhatsAppLink(rem.patientPhone, rem.patientName, rem.time)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setToast({ msg: `${rem.patientName} — Message WhatsApp ouvert`, type: "success" })}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-[#25d366] text-white rounded-lg text-xs font-semibold hover:bg-[#1ebe5d] transition-colors shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          WhatsApp
                        </a>
                        <a
                          href={`tel:${rem.patientPhone ?? `+${CABINET_PHONE}`}`}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#737785] text-[#191b23] rounded-lg text-xs font-semibold hover:bg-[#f3f3fd] transition-colors"
                          title="Appeler"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleNoAnswer(rem.id, rem.patientName)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-[#737785] text-[#191b23] rounded-lg text-xs font-semibold hover:bg-[#f3f3fd] transition-colors"
                        >
                          <PhoneMissed className="w-3.5 h-3.5" />
                          Ne répond pas
                        </button>
                        <button
                          onClick={() => handleReport(rem.id, rem.patientName)}
                          className="flex items-center justify-center p-2 text-[#424654] hover:bg-[#f3f3fd] rounded-lg transition-colors"
                          title="Reporter"
                        >
                          <CalendarOff className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {(rem.status === "confirme" || rem.status === "reporte") && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-[#006a6a] font-semibold">
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
