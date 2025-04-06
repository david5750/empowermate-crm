
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Comment, formatDate } from "@/utils/mockData";
import { Button } from "@/components/shared/Button";
import { Phone, Mail, MessageCircle, Download, Filter, Search, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_OPTIONS, SOURCE_OPTIONS } from "@/components/leads/LeadTable";
import { useGetDemoClientsQuery, useUpdateDemoClientMutation, useAddDemoClientCommentMutation } from "@/store/apis/demoClientApi";

const DemoClients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const { user } = useAuth();
  
  const itemsPerPage = 10;

  // Use RTK Query hooks
  const { data: clients = [], isLoading } = useGetDemoClientsQuery({ 
    crm_type: user?.crm_type
  });
  
  const [updateClient] = useUpdateDemoClientMutation();
  const [addComment] = useAddDemoClientCommentMutation();

  const handleAddComment = async () => {
    if (!selectedClient || !newComment.trim()) return;

    try {
      await addComment({
        id: selectedClient.id,
        comment: newComment
      }).unwrap();
      
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment");
    }
  };

  // Function to update client status
  const handleStatusChange = async (clientId: string, status: string) => {
    try {
      await updateClient({
        id: clientId,
        data: { status }
      }).unwrap();
      
      toast.success("Client status updated successfully");
    } catch (error) {
      console.error("Failed to update client status:", error);
      toast.error("Failed to update client status");
    }
  };

  // Function to update client source
  const handleSourceChange = async (clientId: string, type: string) => {
    try {
      await updateClient({
        id: clientId,
        data: { type }
      }).unwrap();
      
      toast.success("Client source updated successfully");
    } catch (error) {
      console.error("Failed to update client source:", error);
      toast.error("Failed to update client source");
    }
  };

  // Filter clients based on search query and active filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.includes(searchQuery) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = activeFilters.length === 0 || 
                         activeFilters.includes(client.status) || 
                         activeFilters.includes(client.type);
    
    return matchesSearch && matchesFilters;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
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
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Demo Client Management</h1>
          <p className="text-muted-foreground">View and manage your demo clients</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : clients.length === 0 ? (
          <div className="border rounded-md p-8 text-center">
            <p className="text-muted-foreground">No demo clients found.</p>
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
                  placeholder="Search demo clients..."
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
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Client Since</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="font-medium">
                          <button 
                            onClick={() => {
                              setSelectedClient(client);
                              setShowDetailSheet(true);
                            }}
                            className="hover:underline focus:outline-none text-left"
                          >
                            {client.name}
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {client.company || "Individual Client"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={client.type}
                          onValueChange={(value) => handleSourceChange(client.id, value)}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                          <SelectContent>
                            {SOURCE_OPTIONS.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={client.status}
                          onValueChange={(value) => handleStatusChange(client.id, value)}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-xs">
                            <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                            {client.phone}
                          </div>
                          <div className="flex items-center text-xs">
                            <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                            {client.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm truncate max-w-[200px]">
                          {client.address}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(client.createdAt)}</TableCell>
                      <TableCell>
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
                                onClick={() => setSelectedClient(client)}
                              >
                                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                                Comments
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[625px]">
                              <DialogHeader>
                                <DialogTitle>Client Comments - {selectedClient?.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="max-h-[300px] overflow-y-auto space-y-4">
                                  {selectedClient?.comments && selectedClient.comments.length > 0 ? (
                                    selectedClient.comments.map((comment: Comment) => (
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedClient(client);
                              setShowDetailSheet(true);
                            }}
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {filteredClients.length > itemsPerPage && (
                <div className="flex items-center justify-between px-4 py-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredClients.length)}</span> of <span className="font-medium">{filteredClients.length}</span> demo clients
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DemoClients;
