import React from "react";
import { AppointmentStatus, FollowUpStatus } from "@/types";
import {
  getStatusLabel,
  getStatusClasses,
  getFollowUpStatusLabel,
  getFollowUpStatusClasses,
} from "@/lib/utils";

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusClasses(status)}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

interface FollowUpStatusBadgeProps {
  status: FollowUpStatus;
}

export function FollowUpStatusBadge({ status }: FollowUpStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getFollowUpStatusClasses(status)}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {getFollowUpStatusLabel(status)}
    </span>
  );
}
