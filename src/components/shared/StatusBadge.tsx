
import React from "react";
import { cn } from "@/lib/utils";

export type StatusType = string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Original statuses
  "answered": {
    label: "Answered",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  "busy": {
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
  "pending": {
    label: "Pending",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  "converted": {
    label: "Converted",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  
  // New statuses
  "interested & add me": {
    label: "Interested & Add Me",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  "drop an email only": {
    label: "Drop an Email Only",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  "not interested": {
    label: "Not Interested",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  "busy/unreachable": {
    label: "Busy/Unreachable",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  "wrong/incorrect number": {
    label: "Wrong Number",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  "did not pick": {
    label: "Did Not Pick",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  "disconnected the call": {
    label: "Disconnected Call",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  "out of station": {
    label: "Out of Station",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  "call later": {
    label: "Call Later",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  "already taking from other": {
    label: "Already Taking From Other",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  "not doing exim business": {
    label: "Not Doing EXIM Business",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  "small business": {
    label: "Small Business",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  "leave a comment": {
    label: "Leave a Comment",
    className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  "new lead": {
    label: "New Lead",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  },
  "in progress": {
    label: "In Progress",
    className: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  },
  
  // New source options
  "calling": {
    label: "Calling",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  "referral": {
    label: "Referral",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  "sms": {
    label: "SMS",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  "email": {
    label: "Email",
    className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  "social media": {
    label: "Social Media",
    className: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  },
  "digital marketing": {
    label: "Digital Marketing",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  },
  "other": {
    label: "Other",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  
  // Default for any other status
  "default": {
    label: "Unknown",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status.toLowerCase()] || statusConfig.default;
  
  return (
    <span
      className={cn(
        "status-badge inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
