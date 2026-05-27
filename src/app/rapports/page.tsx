"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Lock,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const PERIODS = [
  { value: "semaine", label: "Cette semaine" },
  { value: "mois", label: "Ce mois" },
  { value: "trimestre", label: "Ce trimestre" },
  { value: "annee", label: "Cette année" },
];

const statsData = {
  semaine: { rdv: 42, patients: 38, confirmes: 87, annules: 4, nouveaux: 5 },
  mois: { rdv: 168, patients: 142, confirmes: 89, annules: 12, nouveaux: 18 },
  trimestre: { rdv: 504, patients: 390, confirmes: 91, annules: 31, nouveaux: 47 },
  annee: { rdv: 1876, patients: 1240, confirmes: 88, annules: 98, nouveaux: 156 },
};

const appointmentTypes = [
  { label: "Contrôle annuel", count: 34, color: "#0045a9", pct: 34 },
  { label: "Détartrage", count: 28, color: "#175cd3", pct: 28 },
  { label: "Traitement de canal", count: 16, color: "#006a6a", pct: 16 },
  { label: "Extraction", count: 12, color: "#437bc4", pct: 12 },
  { label: "Urgence", count: 10, color: "#7393c5", pct: 10 },
];

const weeklyData = [
  { day: "Lun", rdv: 8, confirmes: 7 },
  { day: "Mar", rdv: 9, confirmes: 8 },
  { day: "Mer", rdv: 6, confirmes: 6 },
  { day: "Jeu", rdv: 10, confirmes: 9 },
  { day: "Ven", rdv: 7, confirmes: 6 },
  { day: "Sam", rdv: 4, confirmes: 4 },
];

const maxRdv = Math.max(...weeklyData.map((d) => d.rdv));

export default function RapportsPage() {
  const { role } = useAuth();
  const [period, setPeriod] = useState<keyof typeof statsData>("mois");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (role === "assistante") {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#ffdad6]/40 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#ba1a1a]" />
          </div>
          <h2 className="text-xl font-bold text-[#191b23] mb-2">Accès restreint</h2>
          <p className="text-sm text-[#424654]">
            Les rapports d&apos;activité sont réservés au praticien. Contactez le dentiste pour accéder à ces données.
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

  const stats = statsData[period];
  const periodLabel = PERIODS.find((p) => p.value === period)?.label ?? "";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0045a9] mb-1">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Activité</span>
            </div>
            <h2 className="text-2xl font-bold text-[#191b23]">Aperçu de l&apos;activité</h2>
            <p className="text-sm text-[#424654] mt-0.5">
              Statistiques et tendances du cabinet.
            </p>
          </div>

          {/* Period selector */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 bg-white border border-[#c3c6d6] rounded-lg px-4 py-2.5 text-sm font-semibold text-[#191b23] hover:bg-[#f3f3fd] transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#424654]" />
              {periodLabel}
              <ChevronDown className="w-4 h-4 text-[#737785]" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#c3c6d6] rounded-xl shadow-lg z-20 py-1 min-w-[160px]">
                {PERIODS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => { setPeriod(p.value as keyof typeof statsData); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      period === p.value
                        ? "bg-[#dae2ff] text-[#0045a9] font-semibold"
                        : "text-[#424654] hover:bg-[#f3f3fd]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#c3c6d6]/50">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-[#dae2ff] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#0045a9]" />
              </div>
              <span className="text-xs text-[#006a6a] font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +8%
              </span>
            </div>
            <div className="text-3xl font-bold text-[#191b23] mb-0.5">{stats.rdv}</div>
            <p className="text-xs text-[#424654] font-medium">Rendez-vous</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#c3c6d6]/50">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-[#ccece9] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#006a6a]" />
              </div>
              <span className="text-xs text-[#006a6a] font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +5%
              </span>
            </div>
            <div className="text-3xl font-bold text-[#191b23] mb-0.5">{stats.patients}</div>
            <p className="text-xs text-[#424654] font-medium">Patients reçus</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#c3c6d6]/50">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-[#dae2ff] flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#0045a9]" />
              </div>
              <span className="text-xs text-[#006a6a] font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +3%
              </span>
            </div>
            <div className="text-3xl font-bold text-[#191b23] mb-0.5">{stats.confirmes}%</div>
            <p className="text-xs text-[#424654] font-medium">Taux de confirmation</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#c3c6d6]/50">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-[#dae2ff] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#175cd3]" />
              </div>
              <span className="text-xs text-[#006a6a] font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <div className="text-3xl font-bold text-[#191b23] mb-0.5">{stats.nouveaux}</div>
            <p className="text-xs text-[#424654] font-medium">Nouveaux patients</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly bar chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-[#191b23]">RDV cette semaine</h3>
              <div className="flex items-center gap-4 text-xs text-[#424654]">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#0045a9] inline-block" />
                  Total
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#7cf2f3]/60 inline-block border border-[#006a6a]/30" />
                  Confirmés
                </span>
              </div>
            </div>

            <div className="flex items-end gap-3 h-40">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-1 justify-center" style={{ height: "120px" }}>
                    <div
                      className="flex-1 bg-[#0045a9] rounded-t-md opacity-90 transition-all"
                      style={{ height: `${(d.rdv / maxRdv) * 100}%` }}
                    />
                    <div
                      className="flex-1 bg-[#7cf2f3]/60 border border-[#006a6a]/20 rounded-t-md transition-all"
                      style={{ height: `${(d.confirmes / maxRdv) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#737785] font-medium">{d.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#c3c6d6]/30 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-[#0045a9]">44</p>
                <p className="text-xs text-[#737785]">Total RDV</p>
              </div>
              <div className="text-center border-x border-[#c3c6d6]/30">
                <p className="text-lg font-bold text-[#006a6a]">40</p>
                <p className="text-xs text-[#737785]">Confirmés</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#424654]">4</p>
                <p className="text-xs text-[#737785]">Annulés</p>
              </div>
            </div>
          </div>

          {/* Appointment types */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50">
            <h3 className="text-base font-semibold text-[#191b23] mb-5">Types de soins</h3>
            <div className="space-y-4">
              {appointmentTypes.map((t) => (
                <div key={t.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-[#424654]">{t.label}</span>
                    <span className="text-xs font-bold text-[#191b23]">{t.count}</span>
                  </div>
                  <div className="w-full bg-[#f3f3fd] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${t.pct}%`, backgroundColor: t.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#c3c6d6]/30">
              <p className="text-xs text-[#737785] mb-3">Répartition totale (ce mois)</p>
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                {appointmentTypes.map((t) => (
                  <div
                    key={t.label}
                    style={{ width: `${t.pct}%`, backgroundColor: t.color }}
                    title={`${t.label}: ${t.pct}%`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cancellations and upcoming */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d6]/50">
            <h3 className="text-base font-semibold text-[#191b23] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#737785]" />
              Durée moyenne par soin
            </h3>
            <dl className="space-y-3">
              {[
                { label: "Contrôle annuel", duration: "35 min" },
                { label: "Détartrage", duration: "45 min" },
                { label: "Extraction simple", duration: "40 min" },
                { label: "Traitement de canal", duration: "75 min" },
                { label: "Pose d'implant", duration: "90 min" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <dt className="text-sm text-[#424654]">{item.label}</dt>
                  <dd className="text-sm font-semibold text-[#191b23]">{item.duration}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-gradient-to-br from-[#0045a9] to-[#175cd3] rounded-2xl p-6 text-white shadow-sm relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2 relative z-10">
              <TrendingUp className="w-4 h-4" />
              Indicateurs clés
            </h3>
            <dl className="space-y-4 relative z-10">
              <div className="flex justify-between items-center">
                <dt className="text-sm opacity-80">Taux de présence</dt>
                <dd className="text-xl font-bold">94%</dd>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div className="bg-white h-1.5 rounded-full" style={{ width: "94%" }} />
              </div>
              <div className="flex justify-between items-center pt-1">
                <dt className="text-sm opacity-80">Fidélisation patients</dt>
                <dd className="text-xl font-bold">78%</dd>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div className="bg-white h-1.5 rounded-full" style={{ width: "78%" }} />
              </div>
              <div className="flex justify-between items-center pt-1">
                <dt className="text-sm opacity-80">Satisfaction (estimée)</dt>
                <dd className="text-xl font-bold">4.8/5</dd>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div className="bg-white h-1.5 rounded-full" style={{ width: "96%" }} />
              </div>
            </dl>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
