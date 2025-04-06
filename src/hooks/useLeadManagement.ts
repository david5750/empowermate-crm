
import { useState } from "react";
import { Lead } from "@/utils/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useGetLeadsQuery, useUpdateLeadMutation, useConvertLeadToClientMutation } from "@/store/apis/leadApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLeadManagement = () => {
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

  // Update any lead field
  const handleUpdateLead = async (id: string, data: Partial<Lead>) => {
    try {
      await updateLead({
        id,
        data
      }).unwrap();
      
      toast.success("Lead updated successfully");
      refetch();
    } catch (error) {
      console.error("Failed to update lead:", error);
      toast.error("Failed to update lead");
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

  const clearFilters = () => setActiveFilters([]);

  return {
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
    leads,
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
  };
};
