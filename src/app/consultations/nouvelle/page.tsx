"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Toast } from "@/components/ui/Toast";
import { getPatientById } from "@/data/mockPatients";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  Lock,
  AlertTriangle,
  CalendarPlus,
  Save,
} from "lucide-react";
import Link from "next/link";

const MOTIFS = [
  "Contrôle annuel",
  "Douleur dentaire",
  "Détartrage",
  "Urgence",
  "Consultation initiale",
  "Traitement de canal",
  "Extraction",
];

const SOINS = [
  "Détartrage complet",
  "Extraction simple",
  "Obturation",
  "Traitement de canal",
  "Blanchiment",
  "Pose d'implant",
  "Radiographie",
];

export default function NouvelleConsultationPage() {
  const router = useRouter();
  const { role } = useAuth();
  const patient = getPatientById("pat-001");
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    date: "2026-05-27",
    motif: "Douleur dentaire",
    observations: "",
    soin: "Détartrage complet",
    recommandations: "",
    prescription: "",
    suiviRequis: "non" as "oui" | "non",
    dateSuivi: "",
    notesConfidentielles: "",
  });

  if (role === "assistante") {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#ffdad6]/40 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#ba1a1a]" />
          </div>
          <h2 className="text-xl font-bold text-[#191b23] mb-2">Accès restreint</h2>
          <p className="text-sm text-[#424654]">
            Cette page est réservée au praticien autorisé. L&apos;enregistrement des consultations n&apos;est pas accessible en mode assistante.
          </p>
          <Link
            href="/agenda"
            className="mt-6 inline-block px-6 py-2.5 bg-[#0045a9] text-white rounded-lg text-sm font-semibold hover:bg-[#003d96] transition-colors"
          >
            Retour à l&apos;agenda
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleSave = (e: React.FormEvent, redirect = "/patients/marie-pierre") => {
    e.preventDefault();
    setToast("Consultation enregistrée avec succès.");
    setTimeout(() => router.push(redirect), 2000);
  };

  return (
    <DashboardLayout>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Link
          href="/patients/marie-pierre"
          className="inline-flex items-center gap-1.5 text-sm text-[#175cd3] font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au dossier
        </Link>

        <h2 className="text-2xl font-bold text-[#191b23]">Nouvelle Consultation</h2>

        {/* Patient banner */}
        {patient && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c3c6d6]/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-base font-bold ${patient.colorClass}`}>
                {patient.initials}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#191b23]">{patient.fullName}</h3>
                <p className="text-xs text-[#424654]">
                  Dossier #4829 • Née le 14/05/1985
                </p>
              </div>
            </div>
            {patient.alerts && patient.alerts.length > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdad6] text-[#93000a] rounded-full text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                {patient.alerts[0]}
              </span>
            )}
          </div>
        )}

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d6]/50 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0045a9]" />
          <div className="p-6 space-y-8">
            {/* Header form */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#c3c6d6]/30">
              <h4 className="text-lg font-bold text-[#191b23]">Détails de la consultation</h4>
              <div className="flex items-center gap-2 bg-[#7cf2f3]/15 px-3 py-1.5 rounded-lg">
                <Lock className="w-3.5 h-3.5 text-[#006a6a]" />
                <span className="text-xs font-semibold text-[#006a6a]">Informations confidentielles</span>
              </div>
            </div>

            <form className="space-y-8">
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#424654] mb-1.5">
                    Date de consultation
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#424654] mb-1.5">Motif</label>
                  <select
                    value={form.motif}
                    onChange={(e) => setForm({ ...form, motif: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
                  >
                    {MOTIFS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">Observations cliniques</label>
                <textarea
                  value={form.observations}
                  onChange={(e) => setForm({ ...form, observations: e.target.value })}
                  rows={3}
                  placeholder="Décrire les observations cliniques..."
                  className="w-full px-4 py-3 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">Soin effectué</label>
                <select
                  value={form.soin}
                  onChange={(e) => setForm({ ...form, soin: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11"
                >
                  {SOINS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">Recommandations</label>
                <textarea
                  value={form.recommandations}
                  onChange={(e) => setForm({ ...form, recommandations: e.target.value })}
                  rows={2}
                  placeholder="Conseils post-opératoires, hygiène..."
                  className="w-full px-4 py-3 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-1.5">Traitement / Prescription</label>
                <textarea
                  value={form.prescription}
                  onChange={(e) => setForm({ ...form, prescription: e.target.value })}
                  rows={2}
                  placeholder="Médicaments prescrits, posologie..."
                  className="w-full px-4 py-3 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none resize-none"
                />
              </div>

              {/* Suivi */}
              <div>
                <label className="block text-sm font-semibold text-[#424654] mb-2">
                  Suivi nécessaire ?
                </label>
                <div className="flex gap-3">
                  {(["oui", "non"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setForm({ ...form, suiviRequis: v })}
                      className={`px-6 py-2 rounded-lg text-sm font-semibold border transition-all capitalize ${
                        form.suiviRequis === v
                          ? v === "oui"
                            ? "bg-[#0045a9] text-white border-[#0045a9]"
                            : "bg-[#191b23] text-white border-[#191b23]"
                          : "border-[#c3c6d6] text-[#424654] hover:bg-[#f3f3fd]"
                      }`}
                    >
                      {v === "oui" ? "Oui" : "Non"}
                    </button>
                  ))}
                </div>
                {form.suiviRequis === "oui" && (
                  <div className="mt-3">
                    <label className="block text-sm font-semibold text-[#424654] mb-1.5">
                      Date recommandée pour le suivi
                    </label>
                    <input
                      type="date"
                      value={form.dateSuivi}
                      onChange={(e) => setForm({ ...form, dateSuivi: e.target.value })}
                      className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11 max-w-xs"
                    />
                  </div>
                )}
              </div>

              {/* Notes confidentielles */}
              <div className="bg-[#faf8ff] border border-[#c3c6d6]/50 rounded-xl p-5">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#191b23] mb-2">
                  <Lock className="w-4 h-4 text-[#737785]" />
                  Notes confidentielles
                </label>
                <p className="text-xs text-[#737785] mb-2">
                  Visible uniquement par le praticien. Non partagé avec le patient ni l&apos;assistante.
                </p>
                <textarea
                  value={form.notesConfidentielles}
                  onChange={(e) => setForm({ ...form, notesConfidentielles: e.target.value })}
                  rows={3}
                  placeholder="Notes personnelles, observations sensibles..."
                  className="w-full px-4 py-3 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none resize-none bg-white"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 py-3 border border-[#c3c6d6] text-[#191b23] rounded-xl text-sm font-semibold hover:bg-[#f3f3fd] transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSave(e, "/agenda/nouveau")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#0045a9] text-[#0045a9] rounded-xl text-sm font-semibold hover:bg-[#dae2ff]/30 transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Enregistrer et programmer RDV
                </button>
                <button
                  type="submit"
                  onClick={(e) => handleSave(e)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0045a9] text-white rounded-xl text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
