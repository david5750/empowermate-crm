
import React from "react";
import { leads, formatDate } from "@/utils/mockData";
import { StatusBadge } from "../shared/StatusBadge";
import { ChevronRight, Phone } from "lucide-react";
import { Button } from "../shared/Button";

export const RecentLeads = () => {
  // Sort leads by creation date (most recent first)
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="overflow-hidden">
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Created</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.phone}</div>
                  </td>
                  <td className="px-4 py-3 capitalize">{lead.type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        Call
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
