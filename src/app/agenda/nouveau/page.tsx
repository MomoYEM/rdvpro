"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Toast } from "@/components/ui/Toast";
import { mockPatients } from "@/data/mockPatients";
import {
  Search,
  X,
  User,
  Phone,
  Calendar,
  Clock,
  FileText,
  Bell,
  CheckCircle,
} from "lucide-react";

const REASONS = [
  "Consultation initiale",
  "Contrôle dentaire",
  "Nettoyage",
  "Douleur dentaire",
  "Extraction",
  "Blanchiment",
  "Urgence",
  "Détartrage",
  "Traitement de canal",
];

const DURATIONS = [15, 30, 45, 60, 90];

export default function NouveauRendezVousPage() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<(typeof mockPatients)[0] | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [form, setForm] = useState({
    date: "2026-05-28",
    time: "09:00",
    duration: 30,
    reason: "Contrôle dentaire",
    practitioner: "Dr. Sarah Joseph",
    notes: "",
    reminder: true,
  });

  const filteredPatients = mockPatients.filter((p) =>
    p.fullName.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.phone.includes(patientSearch)
  );

  const handleSelectPatient = (p: (typeof mockPatients)[0]) => {
    setSelectedPatient(p);
    setPatientSearch(p.fullName);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      setToast("Veuillez sélectionner un patient.");
      return;
    }
    setToast(`Rendez-vous enregistré pour ${selectedPatient.fullName} le ${form.date} à ${form.time}.`);
    setTimeout(() => router.push("/agenda"), 2000);
  };

  return (
    <DashboardLayout>
      {toast && (
        <Toast
          message={toast}
          type="success"
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#191b23]">Nouveau Rendez-vous</h2>
          <p className="text-xs sm:text-sm text-[#424654] mt-1">
            Remplissez les informations pour créer un rendez-vous.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Patient */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#c3c6d6]/50">
            <h3 className="text-sm font-semibold text-[#424654] mb-4 uppercase tracking-wide">
              Patient
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737785]" />
              <input
                type="text"
                placeholder="Rechercher un patient..."
                value={patientSearch}
                onChange={(e) => {
                  setPatientSearch(e.target.value);
                  setShowSuggestions(true);
                  if (!e.target.value) setSelectedPatient(null);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
              />
              {patientSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setPatientSearch("");
                    setSelectedPatient(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737785] hover:text-[#191b23]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {showSuggestions && patientSearch && filteredPatients.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#c3c6d6] rounded-xl shadow-lg z-20 overflow-hidden">
                  {filteredPatients.slice(0, 5).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPatient(p)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f3f3fd] transition-colors text-left"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${p.colorClass}`}>
                        {p.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#191b23]">{p.fullName}</p>
                        <p className="text-xs text-[#737785]">{p.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedPatient && (
              <div className="mt-4 flex items-center gap-3 p-3 bg-[#dae2ff]/20 rounded-lg border border-[#b1c5ff]/30">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${selectedPatient.colorClass}`}>
                  {selectedPatient.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#191b23]">{selectedPatient.fullName}</p>
                  <p className="text-xs text-[#424654]">{selectedPatient.phone}</p>
                </div>
                {selectedPatient.alerts && selectedPatient.alerts.length > 0 && (
                  <div className="ml-auto flex flex-wrap gap-1">
                    {selectedPatient.alerts.map((a) => (
                      <span key={a} className="text-xs bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-full font-semibold">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Détails RDV */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#c3c6d6]/50">
            <h3 className="text-sm font-semibold text-[#424654] mb-4 uppercase tracking-wide">
              Détails du rendez-vous
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">
                  <Calendar className="w-3.5 h-3.5 inline mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  Heure
                </label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">
                  Durée
                </label>
                <select
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
                >
                  {DURATIONS.map((d) => (
                    <option key={d} value={d}>{d} min</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">
                  Motif
                </label>
                <select
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
                >
                  {REASONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">
                  <User className="w-3.5 h-3.5 inline mr-1" />
                  Praticien
                </label>
                <input
                  type="text"
                  value={form.practitioner}
                  readOnly
                  className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm bg-[#f3f3fd] outline-none h-11 text-[#424654]"
                />
              </div>
            </div>
          </div>

          {/* Notes & rappel */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#c3c6d6]/50">
            <h3 className="text-sm font-semibold text-[#424654] mb-4 uppercase tracking-wide">
              Notes & Rappel
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">
                  <FileText className="w-3.5 h-3.5 inline mr-1" />
                  Note administrative
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder="Instructions pour l'assistante, remarques..."
                  className="w-full px-4 py-3 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none resize-none"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, reminder: !form.reminder })}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    form.reminder
                      ? "bg-[#175cd3] border-[#175cd3]"
                      : "border-[#c3c6d6]"
                  }`}
                >
                  {form.reminder && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-[#191b23] flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-[#737785]" />
                  Envoyer un rappel au patient avant le rendez-vous
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 border border-[#c3c6d6] text-[#191b23] rounded-xl text-sm font-semibold hover:bg-[#f3f3fd] transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#0045a9] text-white rounded-xl text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
            >
              Enregistrer le rendez-vous
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
