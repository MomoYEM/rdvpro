"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Stethoscope, UserCog, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole("dentiste");
    router.push("/dentiste/dashboard");
  };

  const enterAsDentiste = () => {
    setRole("dentiste");
    router.push("/dentiste/dashboard");
  };

  const enterAsAssistante = () => {
    setRole("assistante");
    router.push("/assistante/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#faf8ff] relative overflow-hidden px-4"
      style={{
        backgroundImage: "radial-gradient(#c3c6d6 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Orbs décoratifs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#0045a9]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#006a6a]/5 rounded-full blur-3xl pointer-events-none" />

      <main className="w-full max-w-[440px] z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-[#c3c6d6]/30 p-8 relative overflow-hidden">
          {/* Ligne d'accentuation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#175cd3] rounded-t-2xl" />

          {/* Logo & titre */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-[#175cd3] flex items-center justify-center mb-4 shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="w-11 h-11">
                <path
                  d="M12 2C8.5 2 7 4.5 7 7c0 1.5.5 3 1.5 4L7 20a1 1 0 001 1h1.5l1-5h3l1 5H15a1 1 0 001-1l-1.5-9C15.5 10 16 8.5 16 7c0-2.5-1.5-5-4-5z"
                  fill="white"
                  opacity="0.9"
                />
                <circle cx="12" cy="7" r="2" fill="white" opacity="0.6" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#0045a9] mb-1">RdvPro</h1>
            <p className="text-sm text-[#424654]">
              Votre cabinet, organisé simplement.
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-5 mb-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#424654] mb-1.5"
              >
                Adresse Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737785]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="docteur@cabinet.fr"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#c3c6d6] bg-[#faf8ff] focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none transition-colors text-sm text-[#191b23] h-11"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#424654] mb-1.5"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737785]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#c3c6d6] bg-[#faf8ff] focus:border-[#175cd3] focus:ring-1 focus:ring-[#175cd3] outline-none transition-colors text-sm text-[#191b23] h-11"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-[#c3c6d6] text-[#175cd3] focus:ring-[#175cd3]"
                />
                <span className="text-sm text-[#424654]">Se souvenir de moi</span>
              </label>
              <a
                href="#"
                className="text-xs font-semibold text-[#175cd3] hover:text-[#0045a9] transition-colors"
              >
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#175cd3] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#0045a9] transition-colors shadow-sm active:scale-[0.98]"
            >
              Se connecter
              <LogIn className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mb-6">
            <p className="flex items-center justify-center gap-1.5 text-xs text-[#737785]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Accès sécurisé réservé au personnel autorisé
            </p>
          </div>

          {/* Zone démo */}
          <div className="pt-5 border-t border-[#c3c6d6]/30">
            <p className="text-xs font-semibold text-[#424654] text-center uppercase tracking-widest mb-3">
              Zone de Démo
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={enterAsDentiste}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#7cf2f3]/50 bg-[#7cf2f3]/10 text-[#006e6f] hover:bg-[#7cf2f3]/20 transition-colors text-sm font-semibold"
              >
                <span className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  Voir comme Dentiste
                </span>
                <span className="text-xs opacity-75 font-normal">(Dr. Sarah)</span>
              </button>
              <button
                onClick={enterAsAssistante}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#c3c6d6] bg-[#faf8ff] text-[#191b23] hover:bg-[#f3f3fd] transition-colors text-sm font-semibold"
              >
                <span className="flex items-center gap-2">
                  <UserCog className="w-4 h-4" />
                  Voir comme Assistante
                </span>
                <span className="text-xs opacity-75 font-normal">(Nadia)</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
