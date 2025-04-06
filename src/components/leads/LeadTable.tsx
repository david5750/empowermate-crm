
import React, { useState, useEffect } from "react";
import { Button } from "../shared/Button";
import { StatusBadge } from "../shared/StatusBadge";
import { Comment, formatDate, Lead } from "@/utils/mockData";
import { ChevronLeft, ChevronRight, Download, Filter, MessageCircle, Phone, Plus, Search, Eye, UserCheck } from "lucide-react";
import { LeadCard } from "./LeadCard";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { NewLeadForm } from "./NewLeadForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LeadDetail } from "./LeadDetail";
import { useNavigate } from "react-router-dom";
import { useGetLeadsQuery, useUpdateLeadMutation, useConvertLeadToClientMutation } from "@/store/apis/leadApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Status and Source Options
export const STATUS_OPTIONS = [
  "interested & add me",
  "drop an email only",
  "not interested",
  "busy/unreachable",
  "wrong/incorrect number",
  "did not pick",
  "disconnected the call",
  "out of station",
  "call later",
  "already taking from other",
  "not doing exim business",
  "small business",
  "leave a comment",
  "new lead",
  "in progress"
];

export const SOURCE_OPTIONS = [
  "calling",
  "referral",
  "sms",
  "email",
  "social media",
  "digital marketing",
  "other"
];

export const LeadTable = () => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const itemsPerPage = 10;

  // Use RTK Query hooks
  const { data: leads = [], isLoading, refetch } = useGetLeadsQuery({ 
    crm_type: user?.crm_type
  });

  const [updateLead] = useUpdateLeadMutation();
  const [convertToClient] = useConvertLeadToClientMutation();

  // Handle adding a comment to a lead
  const handleAddComment = async () => {
    if (!selectedLead || !newComment.trim()) return;

    try {
      await updateLead({
        id: selectedLead.id,
        data: {
          comments: [
            ...(selectedLead.comments || []),
            {
              id: `comment-${Date.now()}`,
              date: new Date().toISOString(),
              content: newComment.trim(),
              author: user?.first_name || "User"
            }
          ]
        }
      }).unwrap();
      
      setNewComment("");
      toast.success("Comment added successfully");
      refetch();
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment");
    }
  };

  // Function to handle lead conversion to client
  const handleConvertToClient = async (lead: Lead) => {
    try {
      await convertToClient(lead.id).unwrap();
      toast.success("Lead converted to client successfully");
      
      // Optionally navigate to the clients page
      setTimeout(() => {
        navigate("/clients");
      }, 1500);
      
      refetch();
    } catch (error) {
      console.error("Failed to convert lead:", error);
      toast.error("Failed to convert lead");
    }
  };

  // Function to update lead status
  const handleStatusChange = async (leadId: string, status: string) => {
    try {
      await updateLead({
        id: leadId,
        data: { status }
      }).unwrap();
      
      toast.success("Lead status updated successfully");
      refetch();
    } catch (error) {
      console.error("Failed to update lead status:", error);
      toast.error("Failed to update lead status");
    }
  };

  // Function to update lead source
  const handleSourceChange = async (leadId: string, source: string) => {
    try {
      await updateLead({
        id: leadId,
        data: { type: source }
      }).unwrap();
      
      toast.success("Lead source updated successfully");
      refetch();
    } catch (error) {
      console.error("Failed to update lead source:", error);
      toast.error("Failed to update lead source");
    }
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
                      <th className="px-4 py-3 text-left font-medium">Source</th>
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
                          <div className="font-medium">
                            <button 
                              onClick={() => {
                                setSelectedLead(lead);
                                setShowDetailSheet(true);
                              }}
                              className="hover:underline focus:outline-none text-left"
                            >
                              {lead.name}
                            </button>
                          </div>
                          <div className="text-xs text-muted-foreground">{lead.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={lead.type}
                            onValueChange={(value) => handleSourceChange(lead.id, value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              {SOURCE_OPTIONS.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={lead.status}
                            onValueChange={(value) => handleStatusChange(lead.id, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                            <div className="flex space-x-1">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setShowDetailSheet(true);
                                }}
                              >
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                Details
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleConvertToClient(lead)}
                              >
                                <UserCheck className="h-3.5 w-3.5 mr-1" />
                                Convert
                              </Button>
                            </div>
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
                  onConvertToClient={handleConvertToClient}
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

      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          open={showDetailSheet}
          onClose={() => setShowDetailSheet(false)}
          onUpdate={(updatedLead) => refetch()}
          onConvert={() => handleConvertToClient(selectedLead)}
        />
      )}
    </div>
  );
};
