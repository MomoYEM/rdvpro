"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Toast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import {
  Settings,
  Building2,
  Users,
  Shield,
  Bell,
  CheckCircle,
  X,
  Lock,
  Save,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

type Tab = "cabinet" | "equipe" | "permissions" | "notifications";

const TABS: { value: Tab; label: string; icon: React.ReactNode }[] = [
  { value: "cabinet", label: "Cabinet", icon: <Building2 className="w-4 h-4" /> },
  { value: "equipe", label: "Équipe", icon: <Users className="w-4 h-4" /> },
  { value: "permissions", label: "Permissions", icon: <Shield className="w-4 h-4" /> },
  { value: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
];

const TEAM = [
  {
    id: "u1",
    name: "Dr. Sarah Joseph",
    role: "Dentiste",
    email: "sarah.joseph@sourireplus.fr",
    phone: "+596 696 12 34 56",
    initials: "SJ",
    colorClass: "bg-[#dae2ff] text-[#0045a9]",
    status: "active",
  },
  {
    id: "u2",
    name: "Nadia Charles",
    role: "Assistante",
    email: "nadia.charles@sourireplus.fr",
    phone: "+596 696 98 76 54",
    initials: "NC",
    colorClass: "bg-[#ccece9] text-[#006a6a]",
    status: "active",
  },
];

const PERMISSIONS: { feature: string; dentiste: boolean; assistante: boolean }[] = [
  { feature: "Voir l'agenda", dentiste: true, assistante: true },
  { feature: "Créer un rendez-vous", dentiste: true, assistante: true },
  { feature: "Modifier un rendez-vous", dentiste: true, assistante: true },
  { feature: "Annuler un rendez-vous", dentiste: true, assistante: true },
  { feature: "Voir la liste des patients", dentiste: true, assistante: true },
  { feature: "Gérer les rappels", dentiste: true, assistante: true },
  { feature: "Gérer les suivis", dentiste: true, assistante: true },
  { feature: "Enregistrer une consultation", dentiste: true, assistante: false },
  { feature: "Voir les consultations", dentiste: true, assistante: false },
  { feature: "Rédiger prescriptions", dentiste: true, assistante: false },
  { feature: "Notes confidentielles", dentiste: true, assistante: false },
  { feature: "Accéder aux rapports", dentiste: true, assistante: false },
  { feature: "Gérer les paramètres", dentiste: true, assistante: false },
];

export default function ParametresPage() {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("cabinet");
  const [toast, setToast] = useState<string | null>(null);

  const [cabinetForm, setCabinetForm] = useState({
    name: "Cabinet Dentaire Sourire Plus",
    address: "12 Rue Schoelcher, Fort-de-France, 97200",
    phone: "+596 596 63 42 10",
    email: "contact@sourireplus.fr",
    hours: "Lun–Ven 8h–18h, Sam 8h–13h",
    siret: "842 156 789 00015",
  });

  const [notifications, setNotifications] = useState({
    smsConfirmation: true,
    emailRappel: true,
    whatsappRappel: false,
    alertsRetard: true,
    resumeQuotidien: true,
    newsletterProduit: false,
  });

  const handleSaveCabinet = () => {
    setToast("Informations du cabinet enregistrées.");
  };

  const handleSaveNotifications = () => {
    setToast("Préférences de notifications enregistrées.");
  };

  const isReadOnly = role === "assistante";

  return (
    <DashboardLayout>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-[#0045a9] mb-1">
            <Settings className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Configuration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#191b23]">Paramètres</h2>
          <p className="text-xs sm:text-sm text-[#424654] mt-0.5">Gérez les préférences de votre cabinet.</p>
        </div>

        {/* Restricted notice for assistante */}
        {isReadOnly && (
          <div className="flex items-start gap-3 bg-[#fff8e1] border border-[#f59e0b]/30 rounded-xl p-4">
            <Lock className="w-5 h-5 text-[#b45309] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#92400e]">Accès en lecture seule</p>
              <p className="text-xs text-[#b45309] mt-0.5">
                Vous pouvez consulter les paramètres, mais seul le praticien peut les modifier.
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-[#f3f3fd] rounded-xl p-1 border border-[#c3c6d6]/50 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.value
                  ? "bg-white text-[#0045a9] shadow-sm"
                  : "text-[#424654] hover:text-[#191b23]"
              }`}
            >
              {tab.icon}
              <span className="hidden xs:inline sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab: Cabinet */}
        {activeTab === "cabinet" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d6]/50 overflow-hidden">
            <div className="p-6 border-b border-[#c3c6d6]/30">
              <h3 className="text-base font-semibold text-[#191b23] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#424654]" />
                Informations du cabinet
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-[#424654] mb-1.5">Nom du cabinet</label>
                  <input
                    type="text"
                    value={cabinetForm.name}
                    onChange={(e) => setCabinetForm({ ...cabinetForm, name: e.target.value })}
                    disabled={isReadOnly}
                    className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11 disabled:bg-[#f3f3fd] disabled:text-[#737785]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-[#424654] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Adresse
                  </label>
                  <input
                    type="text"
                    value={cabinetForm.address}
                    onChange={(e) => setCabinetForm({ ...cabinetForm, address: e.target.value })}
                    disabled={isReadOnly}
                    className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11 disabled:bg-[#f3f3fd] disabled:text-[#737785]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#424654] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Téléphone
                  </label>
                  <input
                    type="text"
                    value={cabinetForm.phone}
                    onChange={(e) => setCabinetForm({ ...cabinetForm, phone: e.target.value })}
                    disabled={isReadOnly}
                    className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11 disabled:bg-[#f3f3fd] disabled:text-[#737785]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#424654] mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </label>
                  <input
                    type="email"
                    value={cabinetForm.email}
                    onChange={(e) => setCabinetForm({ ...cabinetForm, email: e.target.value })}
                    disabled={isReadOnly}
                    className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11 disabled:bg-[#f3f3fd] disabled:text-[#737785]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#424654] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Horaires
                  </label>
                  <input
                    type="text"
                    value={cabinetForm.hours}
                    onChange={(e) => setCabinetForm({ ...cabinetForm, hours: e.target.value })}
                    disabled={isReadOnly}
                    className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11 disabled:bg-[#f3f3fd] disabled:text-[#737785]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#424654] mb-1.5">SIRET</label>
                  <input
                    type="text"
                    value={cabinetForm.siret}
                    onChange={(e) => setCabinetForm({ ...cabinetForm, siret: e.target.value })}
                    disabled={isReadOnly}
                    className="w-full px-4 py-2.5 border border-[#c3c6d6] rounded-lg text-sm focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none h-11 disabled:bg-[#f3f3fd] disabled:text-[#737785]"
                  />
                </div>
              </div>

              {!isReadOnly && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveCabinet}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0045a9] text-white rounded-xl text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Equipe */}
        {activeTab === "equipe" && (
          <div className="space-y-4">
            {TEAM.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-[#c3c6d6]/50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${member.colorClass}`}>
                      {member.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#191b23]">{member.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          member.role === "Dentiste"
                            ? "bg-[#dae2ff] text-[#0045a9]"
                            : "bg-[#ccece9] text-[#006a6a]"
                        }`}>
                          {member.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-[#737785]">
                          <Mail className="w-3 h-3" /> {member.email}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#737785]">
                          <Phone className="w-3 h-3" /> {member.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#006a6a]" />
                    <span className="text-xs text-[#006a6a] font-semibold">Actif</span>
                  </div>
                </div>
              </div>
            ))}

            {!isReadOnly && (
              <button className="w-full py-3 border-2 border-dashed border-[#c3c6d6] rounded-2xl text-sm font-semibold text-[#737785] hover:border-[#0045a9] hover:text-[#0045a9] transition-colors">
                + Inviter un membre
              </button>
            )}
          </div>
        )}

        {/* Tab: Permissions */}
        {activeTab === "permissions" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d6]/50 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[#c3c6d6]/30">
              <h3 className="text-base font-semibold text-[#191b23]">Matrice des permissions</h3>
              <p className="text-xs text-[#737785] mt-0.5">
                Définit les droits d&apos;accès par rôle.
              </p>
            </div>
            <div className="divide-y divide-[#c3c6d6]/20">
              <div className="bg-[#f3f3fd] grid grid-cols-[1fr_auto_auto] gap-3 px-3 sm:px-5 py-3">
                <span className="text-xs font-semibold text-[#424654] uppercase tracking-wide">Fonctionnalité</span>
                <span className="w-16 text-center text-xs font-semibold text-[#0045a9] uppercase tracking-wide">Dentiste</span>
                <span className="w-16 text-center text-xs font-semibold text-[#006a6a] uppercase tracking-wide">Assist.</span>
              </div>
              {PERMISSIONS.map((p) => (
                <div
                  key={p.feature}
                  className={`grid grid-cols-[1fr_auto_auto] gap-3 px-3 sm:px-5 py-3 items-center ${
                    !p.assistante ? "bg-[#fff8f6]" : ""
                  }`}
                >
                  <span className="text-xs sm:text-sm text-[#424654]">{p.feature}</span>
                  <span className="w-16 flex justify-center">
                    {p.dentiste
                      ? <CheckCircle className="w-4 h-4 text-[#006a6a]" />
                      : <X className="w-4 h-4 text-[#ba1a1a]/40" />}
                  </span>
                  <span className="w-16 flex justify-center">
                    {p.assistante
                      ? <CheckCircle className="w-4 h-4 text-[#006a6a]" />
                      : <Lock className="w-4 h-4 text-[#ba1a1a]/50" />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Notifications */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d6]/50 overflow-hidden">
            <div className="p-6 border-b border-[#c3c6d6]/30">
              <h3 className="text-base font-semibold text-[#191b23]">Préférences de notifications</h3>
            </div>
            <div className="divide-y divide-[#c3c6d6]/30">
              {[
                { key: "smsConfirmation", label: "SMS de confirmation de RDV", desc: "Envoyé automatiquement lors de la prise de RDV", tag: "SMS" },
                { key: "emailRappel", label: "Email de rappel J-2", desc: "Email envoyé 2 jours avant le rendez-vous", tag: "Email" },
                { key: "whatsappRappel", label: "WhatsApp de rappel J-1", desc: "Message WhatsApp la veille du rendez-vous (bientôt)", tag: "WhatsApp" },
                { key: "alertsRetard", label: "Alertes suivis en retard", desc: "Notification interne pour les suivis dépassés", tag: "Interne" },
                { key: "resumeQuotidien", label: "Résumé quotidien", desc: "Email récapitulatif chaque matin à 7h30", tag: "Email" },
                { key: "newsletterProduit", label: "Actualités RdvPro", desc: "Nouveautés et mises à jour du produit", tag: "Email" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-[#191b23]">{item.label}</p>
                      <span className="text-xs px-2 py-0.5 bg-[#ededf7] text-[#424654] rounded font-medium">{item.tag}</span>
                    </div>
                    <p className="text-xs text-[#737785]">{item.desc}</p>
                  </div>
                  <button
                    disabled={isReadOnly}
                    onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-[#0045a9]"
                        : "bg-[#c3c6d6]"
                    } disabled:opacity-60`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {!isReadOnly && (
              <div className="p-6 border-t border-[#c3c6d6]/30 flex justify-end">
                <button
                  onClick={handleSaveNotifications}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0045a9] text-white rounded-xl text-sm font-semibold hover:bg-[#003d96] transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
