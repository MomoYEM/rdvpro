import { AppointmentStatus, FollowUpStatus } from "@/types";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatBirthDate(dateStr: string): string {
  const date = new Date(dateStr);
  const age = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
  return `${date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })} (${age} ans)`;
}

export function getStatusLabel(status: AppointmentStatus): string {
  const labels: Record<AppointmentStatus, string> = {
    confirme: "Confirmé",
    "en-attente": "En attente",
    "patient-arrive": "Patient arrivé",
    termine: "Terminé",
    annule: "Annulé",
    reporte: "Reporté",
    "a-rappeler": "À rappeler",
    "en-retard": "En retard",
  };
  return labels[status] ?? status;
}

export function getStatusClasses(status: AppointmentStatus): string {
  const classes: Record<AppointmentStatus, string> = {
    confirme:
      "border border-[#737785] text-[#424654] bg-transparent",
    "en-attente":
      "bg-[#e1e2ec] text-[#191b23]",
    "patient-arrive":
      "bg-[#7cf2f3] text-[#006e6f]",
    termine:
      "bg-[#e1e2ec] text-[#424654]",
    annule:
      "bg-[#ffdad6] text-[#93000a]",
    reporte:
      "bg-[#ffdbcd] text-[#360f00]",
    "a-rappeler":
      "bg-[#ffdad6] text-[#93000a]",
    "en-retard":
      "bg-[#ffdad6] text-[#93000a]",
  };
  return classes[status] ?? "bg-[#e1e2ec] text-[#424654]";
}

export function getFollowUpStatusLabel(status: FollowUpStatus): string {
  const labels: Record<FollowUpStatus, string> = {
    "a-contacter": "À contacter",
    programme: "Programmé",
    "en-retard": "En retard",
    termine: "Terminé",
  };
  return labels[status] ?? status;
}

export function getFollowUpStatusClasses(status: FollowUpStatus): string {
  const classes: Record<FollowUpStatus, string> = {
    "a-contacter": "bg-[#dae2ff] text-[#0045a9]",
    programme: "bg-[#7cf2f3] text-[#006e6f]",
    "en-retard": "bg-[#ffdad6] text-[#93000a]",
    termine: "bg-[#e1e2ec] text-[#424654]",
  };
  return classes[status] ?? "bg-[#e1e2ec] text-[#424654]";
}

export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-");
}
