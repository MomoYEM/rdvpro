export type UserRole = "dentiste" | "assistante";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

export type AppointmentStatus =
  | "confirme"
  | "en-attente"
  | "patient-arrive"
  | "termine"
  | "annule"
  | "reporte"
  | "a-rappeler"
  | "en-retard";

export type AppointmentReason =
  | "Consultation initiale"
  | "Contrôle dentaire"
  | "Nettoyage"
  | "Douleur dentaire"
  | "Extraction"
  | "Blanchiment"
  | "Urgence"
  | "Détartrage"
  | "Traitement de canal"
  | "Pose d'implant"
  | "Contrôle annuel";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  phone: string;
  date: string;
  time: string;
  duration: number;
  reason: string;
  status: AppointmentStatus;
  practitioner: string;
  administrativeNote?: string;
  reminderRequired: boolean;
  colorClass?: string;
}

export type FollowUpStatus = "a-contacter" | "programme" | "en-retard" | "termine";

export interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  colorClass: string;
  reason: string;
  status: FollowUpStatus;
  recommendedDate: string;
  lastContact?: string;
  lastAppointment?: string;
  notes?: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  date: string;
  reason: string;
  observations: string;
  treatment: string;
  recommendations: string;
  prescription?: string;
  followUpRequired: boolean;
  followUpDate?: string;
  confidentialNotes?: string;
  practitioner: string;
  status: "termine" | "planifie";
}

export interface Patient {
  id: string;
  fullName: string;
  initials: string;
  colorClass: string;
  phone: string;
  email?: string;
  birthDate: string;
  address?: string;
  insurance?: string;
  treatingDoctor?: string;
  lastConsultationDate?: string;
  nextAppointment?: string;
  nextAppointmentReason?: string;
  followUpStatus?: FollowUpStatus;
  appointments: Appointment[];
  consultations: Consultation[];
  followUps: FollowUp[];
  confidentialNotes?: string;
  alerts?: string[];
  balance?: number;
  medicalTags?: string[];
}

export interface Reminder {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  colorClass: string;
  patientPhone: string;
  time: string;
  duration: number;
  reason: string;
  status: AppointmentStatus;
  lastContact?: string;
  lastContactMethod?: string;
  notes?: string;
  priority?: "haute" | "normale" | "basse";
}

export interface Permission {
  id: string;
  label: string;
  dentiste: boolean;
  assistante: boolean;
  description?: string;
}
