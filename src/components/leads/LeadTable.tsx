
import React from "react";
import { LeadDetail } from "./LeadDetail";
import { NewLeadForm } from "./NewLeadForm";
import { LeadSearch } from "./LeadSearch";
import { ViewToggle } from "./ViewToggle";
import { LeadTableView } from "./LeadTableView";
import { LeadCardView } from "./LeadCardView";
import { useLeadManagement } from "@/hooks/useLeadManagement";

export const LeadTable = () => {
  const {
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    activeFilters,
    toggleFilter,
    clearFilters,
    showNewLeadForm,
    setShowNewLeadForm,
    selectedLead,
    setSelectedLead,
    newComment,
    setNewComment,
    showDetailSheet,
    setShowDetailSheet,
    isLoading,
    filteredLeads,
    paginatedLeads,
    totalPages,
    itemsPerPage,
    handleAddComment,
    handleConvertToClient,
    handleStatusChange,
    handleSourceChange,
    handleUpdateLead,
    refetch
  } = useLeadManagement();
  
  return (
    <div className="space-y-4">
      {showNewLeadForm ? (
        <NewLeadForm 
          onClose={() => setShowNewLeadForm(false)} 
          onSuccess={() => {
            setShowNewLeadForm(false);
            refetch();
          }} 
        />
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <LeadSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilters={activeFilters}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            onNewLeadClick={() => setShowNewLeadForm(true)}
          />
          
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          
          {filteredLeads.length === 0 ? (
            <div className="border rounded-md p-8 text-center">
              <p className="text-muted-foreground">No leads found.</p>
            </div>
          ) : viewMode === "table" ? (
            <LeadTableView
              paginatedLeads={paginatedLeads}
              selectedLead={selectedLead}
              setSelectedLead={setSelectedLead}
              newComment={newComment}
              setNewComment={setNewComment}
              handleAddComment={handleAddComment}
              handleSourceChange={handleSourceChange}
              handleStatusChange={handleStatusChange}
              handleConvertToClient={handleConvertToClient}
              setShowDetailSheet={setShowDetailSheet}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              filteredLeadsCount={filteredLeads.length}
              itemsPerPage={itemsPerPage}
            />
          ) : (
            <LeadCardView
              paginatedLeads={paginatedLeads}
              handleUpdateLead={handleUpdateLead}
              handleConvertToClient={handleConvertToClient}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              filteredLeadsCount={filteredLeads.length}
              itemsPerPage={itemsPerPage}
            />
          )}
        </>
      )}

      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          open={showDetailSheet}
          onClose={() => setShowDetailSheet(false)}
          onUpdate={() => refetch()}
          onConvert={() => handleConvertToClient(selectedLead)}
        />
      )}
    </div>
  );
};
