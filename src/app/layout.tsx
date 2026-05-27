import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "RdvPro — Gestion Cabinet Dentaire",
  description: "Application de gestion des rendez-vous et suivi patients — Cabinet Dentaire Sourire Plus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} h-full`}>
      <body className="font-sans antialiased min-h-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
