
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "answered" | "busy" | "not-interested" | "call-later" | "pending" | "converted";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  answered: {
    label: "Answered",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  busy: {
    label: "Busy",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  "not-interested": {
    label: "Not Interested",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  "call-later": {
    label: "Call Later",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  pending: {
    label: "Pending",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  converted: {
    label: "Converted",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "status-badge",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
