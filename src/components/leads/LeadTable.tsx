
import React, { useState, useEffect } from "react";
import { Button } from "../shared/Button";
import { StatusBadge } from "../shared/StatusBadge";
import { Comment, formatDate, Lead } from "@/utils/mockData";
import { ChevronLeft, ChevronRight, Download, Filter, MessageCircle, Phone, Plus, Search } from "lucide-react";
import { LeadCard } from "./LeadCard";
import { fetchLeads } from "@/services/leadService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { NewLeadForm } from "./NewLeadForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const LeadTable = () => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();
  
  const itemsPerPage = 10;

  // Fetch leads from the database
  const loadLeads = async () => {
    if (user?.crm_type) {
      setIsLoading(true);
      try {
        const data = await fetchLeads(user.crm_type);
        setLeads(data);
      } catch (error) {
        console.error("Failed to load leads:", error);
        toast.error("Failed to load leads");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadLeads();
  }, [user]);
  
  // Handle adding a comment to a lead
  const handleAddComment = () => {
    if (!selectedLead || !newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      date: new Date().toISOString(),
      content: newComment.trim(),
      author: user?.first_name || "User"
    };

    // Update the local state with the new comment
    const updatedLeads = leads.map(lead => {
      if (lead.id === selectedLead.id) {
        const updatedLead = {
          ...lead,
          comments: [...(lead.comments || []), newCommentObj]
        };
        return updatedLead;
      }
      return lead;
    });

    setLeads(updatedLeads);
    setNewComment("");
    toast.success("Comment added successfully");
  };

  // Function to update a lead in the state (used by LeadCard component)
  const updateLead = (updatedLead: Lead) => {
    const updatedLeads = leads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    );
    setLeads(updatedLeads);
  };

  // Filter leads based on search query and active filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.phone.includes(searchQuery) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = activeFilters.length === 0 || 
                           activeFilters.includes(lead.status) || 
                           activeFilters.includes(lead.type);
    
    return matchesSearch && matchesFilters;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  const statusFilters = ["answered", "busy", "not-interested", "call-later", "pending", "converted"];
  const typeFilters = ["individual", "business", "referral"];
  
  return (
    <div className="space-y-4">
      {showNewLeadForm ? (
        <NewLeadForm 
          onClose={() => setShowNewLeadForm(false)} 
          onSuccess={() => {
            setShowNewLeadForm(false);
            loadLeads();
          }} 
        />
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when search changes
                }}
                className="w-full pl-9 py-2 pr-4 rounded-md border border-input"
              />
            </div>
            
            {/* Actions */}
            <div className="flex gap-2">
              <div className="relative">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                  {activeFilters.length > 0 && (
                    <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {activeFilters.length}
                    </span>
                  )}
                </Button>
                
                {/* Filter dropdown */}
                {/* Note: This would typically be a proper dropdown component */}
                {/* For brevity, I've simplified it here */}
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              
              <Button size="sm" onClick={() => setShowNewLeadForm(true)}>
                <Plus className="h-4 w-4 mr-1" />
                New Lead
              </Button>
            </div>
          </div>
          
          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center text-sm">
              <span className="text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="px-2 py-1 rounded-full bg-muted text-muted-foreground cursor-pointer hover:bg-muted/80"
                  onClick={() => toggleFilter(filter)}
                >
                  {filter.replace('-', ' ')}
                  <span className="ml-1">×</span>
                </span>
              ))}
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-muted-foreground"
                onClick={() => setActiveFilters([])}
              >
                Clear all
              </Button>
            </div>
          )}
          
          {/* View toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              Table View
            </Button>
            <Button
              variant={viewMode === "card" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("card")}
            >
              Card View
            </Button>
          </div>
          
          {filteredLeads.length === 0 ? (
            <div className="border rounded-md p-8 text-center">
              <p className="text-muted-foreground">No leads found.</p>
            </div>
          ) : viewMode === "table" ? (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Name</th>
                      <th className="px-4 py-3 text-left font-medium">Type</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Created</th>
                      <th className="px-4 py-3 text-left font-medium">Follow-up</th>
                      <th className="px-4 py-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLeads.map((lead) => (
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
                        <td className="px-4 py-3">{formatDate(lead.createdAt)}</td>
                        <td className="px-4 py-3">
                          {lead.followUp ? formatDate(lead.followUp) : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="h-3.5 w-3.5 mr-1" />
                              Call
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedLead(lead)}
                                >
                                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                                  Comments
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[625px]">
                                <DialogHeader>
                                  <DialogTitle>Lead Comments - {selectedLead?.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="max-h-[300px] overflow-y-auto space-y-4">
                                    {selectedLead?.comments && selectedLead.comments.length > 0 ? (
                                      selectedLead.comments.map((comment) => (
                                        <div key={comment.id} className="border rounded-md p-3">
                                          <div className="flex justify-between items-center mb-2">
                                            <div className="font-medium">{comment.author}</div>
                                            <div className="text-xs text-muted-foreground">
                                              {formatDate(comment.date)}
                                            </div>
                                          </div>
                                          <p className="text-sm">{comment.content}</p>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="text-center text-muted-foreground">
                                        No comments yet.
                                      </div>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <Textarea
                                      value={newComment}
                                      onChange={(e) => setNewComment(e.target.value)}
                                      placeholder="Add a new comment..."
                                      className="min-h-[100px]"
                                    />
                                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                                      Add Comment
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
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
              
              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredLeads.length)}</span> of <span className="font-medium">{filteredLeads.length}</span> leads
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedLeads.map((lead) => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead}
                  onUpdateLead={updateLead}
                />
              ))}
              
              {/* Pagination for card view */}
              <div className="col-span-full flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredLeads.length)}</span> of <span className="font-medium">{filteredLeads.length}</span> leads
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
          )}
        </>
      )}
    </div>
  );
};
