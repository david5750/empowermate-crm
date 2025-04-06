
import React from "react";
import { Lead } from "@/utils/mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../shared/Button";
import { LeadCard } from "./LeadCard";

interface LeadCardViewProps {
  paginatedLeads: Lead[];
  handleUpdateLead: (id: string, data: Partial<Lead>) => Promise<void>;
  handleConvertToClient: (lead: Lead) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filteredLeadsCount: number;
  itemsPerPage: number;
}

export const LeadCardView = ({
  paginatedLeads,
  handleUpdateLead,
  handleConvertToClient,
  currentPage,
  totalPages,
  setCurrentPage,
  filteredLeadsCount,
  itemsPerPage
}: LeadCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedLeads.map((lead) => (
        <LeadCard 
          key={lead.id} 
          lead={lead}
          onUpdateLead={(updatedLead) => {
            handleUpdateLead(updatedLead.id, updatedLead);
          }}
          onConvertToClient={handleConvertToClient}
        />
      ))}
      
      {/* Pagination for card view */}
      <div className="col-span-full flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredLeadsCount)}</span> of <span className="font-medium">{filteredLeadsCount}</span> leads
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
