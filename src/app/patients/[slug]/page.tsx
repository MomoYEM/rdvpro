"use client";

import React, { useState } from "react";
import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppointmentStatusBadge } from "@/components/ui/StatusBadge";
import { ConfidentialAccessNotice } from "@/components/ui/ConfidentialAccessNotice";
import { getPatientBySlug, mockPatients } from "@/data/mockPatients";
import { mockAppointments } from "@/data/mockAppointments";
import { useAuth } from "@/context/AuthContext";
import { formatBirthDate, formatDateShort } from "@/lib/utils";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Shield,
  Calendar,
  Plus,
  Stethoscope,
  AlertTriangle,
  FileText,
  Lock,
  Eye,
  EyeOff,
  History,
} from "lucide-react";

type Tab = "resume" | "consultations" | "rendez-vous" | "documents" | "notes";

export default function PatientFichePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const patient = getPatientBySlug(slug);
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("resume");

  if (!patient) return notFound();

  const patientAppointments = mockAppointments.filter(
    (a) => a.patientId === patient.id
  );

  const tabs: { key: Tab; label: string; dentisteOnly?: boolean }[] = [
    { key: "resume", label: "Résumé" },
    { key: "consultations", label: "Consultations" },
    { key: "rendez-vous", label: "Rendez-vous" },
    { key: "documents", label: "Documents" },
    { key: "notes", label: "Notes confidentielles", dentisteOnly: true },
  ];

  const visibleTabs = tabs.filter((t) => !t.dentisteOnly || role === "dentiste");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Link
          href="/patients"
          className="inline-flex items-center gap-1.5 text-sm text-[#175cd3] font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux patients
        </Link>

        {/* Patient header card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#175cd3]" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 ${patient.colorClass}`}>
                {patient.initials}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#191b23]">{patient.fullName}</h2>
                <p className="text-sm text-[#424654] mt-1">
                  {patient.birthDate && formatBirthDate(patient.birthDate)}
                </p>

                <div className="flex flex-wrap gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-[#424654]">
                    <Phone className="w-4 h-4 text-[#737785]" />
                    {patient.phone}
                  </div>
                  {patient.email && (
                    <div className="flex items-center gap-1.5 text-sm text-[#424654]">
                      <Mail className="w-4 h-4 text-[#737785]" />
                      {patient.email}
                    </div>
                  )}
                  {patient.address && (
                    <div className="flex items-center gap-1.5 text-sm text-[#424654]">
                      <MapPin className="w-4 h-4 text-[#737785]" />
                      {patient.address}
                    </div>
                  )}
                </div>

                {patient.alerts && patient.alerts.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {patient.alerts.map((alert) => (
                      <span
                        key={alert}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdad6] text-[#93000a] rounded-full text-xs font-bold"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {alert}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/consultations/nouvelle?patient=${slug}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#0045a9] text-white rounded-xl text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
              >
                <Stethoscope className="w-4 h-4" />
                Nouvelle consultation
              </Link>
              <Link
                href="/agenda/nouveau"
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#c3c6d6] text-[#191b23] rounded-xl text-sm font-semibold hover:bg-[#f3f3fd] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nouveau RDV
              </Link>
            </div>
          </div>
        </div>

        {/* Mode assistante: notice */}
        {role === "assistante" && <ConfidentialAccessNotice />}

        {/* Tabs */}
        <div className="border-b border-[#c3c6d6]/50 overflow-x-auto">
          <nav className="flex gap-1 min-w-max">
            {visibleTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-[#175cd3] text-[#175cd3]"
                    : "border-transparent text-[#424654] hover:text-[#191b23] hover:border-[#737785]"
                } ${tab.dentisteOnly ? "flex items-center gap-1.5" : ""}`}
              >
                {tab.dentisteOnly && <Lock className="w-3.5 h-3.5" />}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* RÉSUMÉ */}
            {activeTab === "resume" && (
              <div className="space-y-6">
                {/* Timeline consultations */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-semibold text-[#191b23] flex items-center gap-2">
                      <History className="w-5 h-5 text-[#0045a9]" />
                      Historique des Consultations
                    </h3>
                    <button className="text-sm text-[#175cd3] font-semibold hover:underline">
                      Voir tout
                    </button>
                  </div>
                  {patient.consultations.length === 0 ? (
                    <p className="text-sm text-[#737785] text-center py-8">
                      Aucune consultation enregistrée
                    </p>
                  ) : (
                    <div className="relative border-l-2 border-[#e1e2ec] ml-4 space-y-8 pb-4">
                      {patient.consultations.map((c) => (
                        <div key={c.id} className="relative pl-6">
                          <div
                            className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                              c.status === "planifie"
                                ? "bg-white border-[#175cd3]"
                                : "bg-[#175cd3] border-[#175cd3]"
                            }`}
                          />
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-[#191b23]">
                              {formatDateShort(c.date)}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7cf2f3]/30 text-[#006e6f]">
                              {c.reason}
                            </span>
                            {c.status === "termine" && (
                              <span className="inline-flex items-center gap-1 text-xs text-[#0045a9] bg-[#dae2ff] px-2 py-0.5 rounded-md ml-auto font-semibold">
                                Terminé
                              </span>
                            )}
                          </div>
                          <div className="bg-[#f3f3fd] rounded-lg p-4 border border-[#c3c6d6]/30">
                            <p className="text-sm text-[#424654]">{c.observations}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes confidentielles (onglet résumé, dentiste seulement) */}
                {role === "dentiste" && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Lock className="w-16 h-16 text-[#737785]" />
                    </div>
                    <h3 className="text-base font-semibold text-[#191b23] mb-3 relative z-10">
                      Notes confidentielles
                    </h3>
                    <div className="bg-[#ffdad6]/30 border border-[#ffdad6] rounded-lg p-3 mb-4 flex items-start gap-2 relative z-10">
                      <EyeOff className="w-4 h-4 text-[#ba1a1a] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-[#93000a]">
                          Visible uniquement par le dentiste
                        </p>
                        <p className="text-xs text-[#424654] mt-0.5">
                          Ces notes ne sont pas partagées avec le personnel administratif.
                        </p>
                      </div>
                    </div>
                    <textarea
                      className="w-full h-28 p-4 rounded-lg bg-[#faf8ff] border border-[#c3c6d6] text-sm text-[#191b23] focus:ring-2 focus:ring-[#175cd3] focus:border-[#175cd3] resize-none outline-none relative z-10"
                      defaultValue={patient.confidentialNotes ?? ""}
                      placeholder="Ajouter une note confidentielle..."
                    />
                    <div className="flex justify-end mt-2 relative z-10">
                      <button className="text-sm font-semibold text-[#424654] px-4 py-1.5 bg-[#e1e2ec] rounded-lg hover:bg-[#d9d9e3] transition-colors">
                        Enregistrer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CONSULTATIONS */}
            {activeTab === "consultations" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#191b23]">
                    Consultations ({patient.consultations.length})
                  </h3>
                  {role === "dentiste" && (
                    <Link
                      href={`/consultations/nouvelle?patient=${slug}`}
                      className="text-sm text-[#175cd3] font-semibold hover:underline"
                    >
                      + Nouvelle consultation
                    </Link>
                  )}
                </div>
                {patient.consultations.length === 0 ? (
                  <p className="text-sm text-[#737785] text-center py-8">
                    Aucune consultation enregistrée
                  </p>
                ) : (
                  <div className="space-y-4">
                    {patient.consultations.map((c) => (
                      <div
                        key={c.id}
                        className="border border-[#c3c6d6]/50 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-[#191b23]">
                            {formatDateShort(c.date)}
                          </span>
                          <span className="text-xs bg-[#7cf2f3]/30 text-[#006e6f] px-2.5 py-0.5 rounded-full font-semibold">
                            {c.reason}
                          </span>
                        </div>
                        <p className="text-sm text-[#424654] mb-2">{c.observations}</p>
                        {role === "dentiste" && c.treatment && (
                          <p className="text-xs text-[#737785]">
                            Traitement : {c.treatment}
                          </p>
                        )}
                        {role === "assistante" && (
                          <p className="text-xs text-[#737785] italic">
                            Informations médicales détaillées masquées (accès administratif)
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* RENDEZ-VOUS */}
            {activeTab === "rendez-vous" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#191b23]">
                    Rendez-vous
                  </h3>
                  <Link
                    href="/agenda/nouveau"
                    className="text-sm text-[#175cd3] font-semibold hover:underline"
                  >
                    + Nouveau RDV
                  </Link>
                </div>
                {patientAppointments.length === 0 ? (
                  <p className="text-sm text-[#737785] text-center py-8">
                    Aucun rendez-vous enregistré
                  </p>
                ) : (
                  <ul className="divide-y divide-[#c3c6d6]/30">
                    {patientAppointments.map((apt) => (
                      <li key={apt.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-[#737785]" />
                          <div>
                            <p className="text-sm font-semibold text-[#191b23]">
                              {formatDateShort(apt.date)} à {apt.time}
                            </p>
                            <p className="text-xs text-[#424654]">{apt.reason}</p>
                          </div>
                        </div>
                        <AppointmentStatusBadge status={apt.status} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* DOCUMENTS */}
            {activeTab === "documents" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50">
                <h3 className="text-base font-semibold text-[#191b23] mb-4">Documents</h3>
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-[#c3c6d6] mb-3" />
                  <p className="text-sm font-semibold text-[#424654]">
                    Fonctionnalité disponible prochainement
                  </p>
                  <p className="text-xs text-[#737785] mt-1">
                    L&apos;upload de documents sera intégré avec le backend Supabase.
                  </p>
                </div>
              </div>
            )}

            {/* NOTES CONFIDENTIELLES (tab) */}
            {activeTab === "notes" && role === "dentiste" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Lock className="w-20 h-20" />
                </div>
                <h3 className="text-base font-semibold text-[#191b23] mb-3">
                  Notes confidentielles
                </h3>
                <div className="bg-[#ffdad6]/30 border border-[#ffdad6] rounded-lg p-3 mb-4 flex items-start gap-2">
                  <EyeOff className="w-4 h-4 text-[#ba1a1a] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#93000a]">
                      Visible uniquement par le dentiste
                    </p>
                    <p className="text-xs text-[#424654] mt-0.5">
                      Ces notes ne sont jamais partagées avec le patient ni le personnel non autorisé.
                    </p>
                  </div>
                </div>
                <textarea
                  className="w-full h-40 p-4 rounded-lg bg-[#faf8ff] border border-[#c3c6d6] text-sm focus:ring-2 focus:ring-[#175cd3] focus:border-[#175cd3] resize-none outline-none"
                  defaultValue={patient.confidentialNotes ?? ""}
                  placeholder="Ajouter une note confidentielle..."
                />
                <div className="flex justify-end mt-3">
                  <button className="px-6 py-2 bg-[#0045a9] text-white text-sm font-semibold rounded-lg hover:bg-[#003d96] transition-colors">
                    Enregistrer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Tags médicaux */}
            {patient.medicalTags && patient.medicalTags.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#c3c6d6]/50">
                <h3 className="text-sm font-semibold text-[#191b23] mb-3">Suivi Médical</h3>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f3f3fd] text-[#191b23] border border-[#c3c6d6]/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Informations administratives */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#c3c6d6]/50">
              <h3 className="text-sm font-semibold text-[#191b23] mb-4">Informations</h3>
              <dl className="space-y-3">
                {patient.insurance && (
                  <div>
                    <dt className="text-xs font-semibold text-[#737785] mb-0.5">Mutuelle</dt>
                    <dd className="text-sm text-[#191b23] flex items-center justify-between">
                      {patient.insurance}
                      <span className="text-xs bg-[#7cf2f3]/20 text-[#006a6a] px-2 py-0.5 rounded font-semibold">À jour</span>
                    </dd>
                  </div>
                )}
                {patient.treatingDoctor && (
                  <div className="pt-3 border-t border-[#c3c6d6]/30">
                    <dt className="text-xs font-semibold text-[#737785] mb-0.5">Médecin traitant</dt>
                    <dd className="text-sm text-[#191b23]">{patient.treatingDoctor}</dd>
                  </div>
                )}
                {patient.balance !== undefined && (
                  <div className="pt-3 border-t border-[#c3c6d6]/30">
                    <dt className="text-xs font-semibold text-[#737785] mb-0.5">Solde compte</dt>
                    <dd className="text-base font-bold text-[#191b23]">{patient.balance.toLocaleString("fr-HT")} HTG</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
