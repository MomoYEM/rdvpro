"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppointmentStatusBadge } from "@/components/ui/StatusBadge";
import { getTodayAppointments } from "@/data/mockAppointments";
import { mockPatients } from "@/data/mockPatients";
import {
  Calendar,
  CheckCircle,
  Clock,
  Bell,
  Plus,
  Stethoscope,
  UserPlus,
  ChevronRight,
  AlertTriangle,
  History,
} from "lucide-react";

export default function DentisteDashboard() {
  const todayAppointments = getTodayAppointments();
  const confirmed = todayAppointments.filter((a) => a.status === "confirme" || a.status === "patient-arrive").length;
  const followUps = 2;
  const reminders = 3;

  const nextPatient = mockPatients.find((p) => p.id === "pat-002");

  const today = new Date("2026-05-27");
  const dateStr = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#191b23] tracking-tight">
              Bonjour, Dr. Sarah 👋
            </h2>
            <p className="text-lg text-[#424654] mt-1 capitalize">{dateStr}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/patients"
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#191b23] border border-[#c3c6d6] rounded-lg text-sm font-semibold hover:bg-[#f3f3fd] transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              Nouveau Patient
            </Link>
            <Link
              href="/consultations/nouvelle"
              className="flex items-center gap-2 px-4 py-2 bg-[#0045a9] text-white rounded-lg text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
            >
              <Stethoscope className="w-4 h-4" />
              Enregistrer Consult.
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c3c6d6]/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calendar className="w-16 h-16 text-[#0045a9]" />
            </div>
            <p className="text-sm text-[#424654] mb-1">RDV Aujourd&apos;hui</p>
            <h3 className="text-5xl font-bold text-[#191b23]">
              {todayAppointments.length}
            </h3>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-[#006a6a] border border-[#c3c6d6]/50">
            <p className="text-sm text-[#424654] mb-1">Confirmés</p>
            <h3 className="text-3xl font-bold text-[#191b23]">{confirmed}</h3>
            <div className="mt-2 flex items-center gap-1 text-[#006a6a] text-xs font-semibold">
              <CheckCircle className="w-3 h-3" />
              Prêts
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-[#ac4100] border border-[#c3c6d6]/50">
            <p className="text-sm text-[#424654] mb-1">Suivis</p>
            <h3 className="text-3xl font-bold text-[#191b23]">{followUps}</h3>
            <div className="mt-2 flex items-center gap-1 text-[#853000] text-xs font-semibold">
              <Clock className="w-3 h-3" />
              Post-op
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-[#ba1a1a] border border-[#c3c6d6]/50">
            <p className="text-sm text-[#424654] mb-1">Rappels</p>
            <h3 className="text-3xl font-bold text-[#191b23]">{reminders}</h3>
            <div className="mt-2 flex items-center gap-1 text-[#ba1a1a] text-xs font-semibold">
              <AlertTriangle className="w-3 h-3" />
              À contacter
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prochain patient */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-[#191b23] flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#0045a9]" />
              Prochain Patient
            </h3>
            {nextPatient && (
              <div className="bg-[#0045a9] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-4 mb-5 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold border-2 border-white/30">
                    {nextPatient.initials}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{nextPatient.fullName}</h4>
                    <p className="text-sm text-[#b1c5ff]">
                      10:30 • Extraction Dent de Sagesse
                    </p>
                  </div>
                </div>
                <div className="space-y-2 relative z-10">
                  {nextPatient.alerts?.map((alert) => (
                    <div
                      key={alert}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-semibold">{alert}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <History className="w-4 h-4" />
                    <span className="text-xs font-semibold">
                      Dernière visite : 12/04/2026
                    </span>
                  </div>
                </div>
                <Link
                  href="/patients/jean-louis"
                  className="mt-5 w-full block text-center bg-white text-[#0045a9] py-2.5 rounded-lg text-sm font-bold hover:bg-[#f3f3fd] transition-colors relative z-10"
                >
                  Ouvrir le Dossier
                </Link>
              </div>
            )}

            {/* Tâches rapides */}
            <div className="bg-white rounded-xl p-4 border border-[#c3c6d6]/50 shadow-sm">
              <h4 className="text-sm font-semibold text-[#424654] mb-3">
                Tâches Rapides
              </h4>
              <div className="space-y-1">
                <Link
                  href="/rappels"
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f3f3fd] text-[#191b23] transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Bell className="w-4 h-4 text-[#737785]" />
                    Voir les rappels
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#737785]" />
                </Link>
                <Link
                  href="/suivis"
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f3f3fd] text-[#191b23] transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#737785]" />
                    Suivis en attente
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#737785]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Planning du jour */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#191b23] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#006a6a]" />
                Planning du Jour
              </h3>
              <Link
                href="/agenda"
                className="text-sm font-semibold text-[#175cd3] hover:underline"
              >
                Voir tout
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#c3c6d6]/50 overflow-hidden">
              <ul className="divide-y divide-[#c3c6d6]/30">
                {todayAppointments.map((apt) => (
                  <li
                    key={apt.id}
                    className={`flex items-center justify-between p-4 hover:bg-[#f3f3fd] transition-colors ${
                      apt.status === "termine" ? "opacity-60" : ""
                    } ${
                      apt.status === "patient-arrive"
                        ? "bg-[#dae2ff]/20 border-l-4 border-l-[#175cd3]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center w-14">
                        <div
                          className={`text-sm font-bold ${apt.status === "patient-arrive" ? "text-[#0045a9]" : "text-[#191b23]"}`}
                        >
                          {apt.time}
                        </div>
                        <div className="text-xs text-[#737785]">
                          {apt.duration} min
                        </div>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${apt.colorClass}`}
                      >
                        {apt.patientInitials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#191b23]">
                          {apt.patientName}
                        </div>
                        <div className="text-xs text-[#424654]">
                          {apt.reason}
                        </div>
                      </div>
                    </div>
                    <AppointmentStatusBadge status={apt.status} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions rapides */}
            <div className="flex gap-3">
              <Link
                href="/agenda/nouveau"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-[#c3c6d6] rounded-xl text-sm font-semibold text-[#191b23] hover:bg-[#f3f3fd] transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#0045a9]" />
                Nouveau RDV
              </Link>
              <Link
                href="/patients"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-[#c3c6d6] rounded-xl text-sm font-semibold text-[#191b23] hover:bg-[#f3f3fd] transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4 text-[#0045a9]" />
                Nouveau Patient
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
