
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Client, Comment, formatDate } from "@/utils/mockData";
import { Button } from "@/components/shared/Button";
import { Phone, Mail, ChevronRight, MessageCircle, Download, Filter, Plus, Search, Eye } from "lucide-react";
import { toast } from "sonner";
import { fetchClients, mockClients } from "@/services/clientService";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClientDetail } from "@/components/clients/ClientDetail";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { user } = useAuth();
  
  const itemsPerPage = 10;

  useEffect(() => {
    const loadClients = async () => {
      if (user?.crm_type) {
        setIsLoading(true);
        try {
          const data = await fetchClients(user.crm_type);
          setClients(data);
        } catch (error) {
          console.error("Failed to load clients:", error);
          toast.error("Failed to load clients");
          // Fallback to mock data
          const filteredClients = mockClients.filter(client => client.crm_type === user.crm_type);
          setClients(filteredClients);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadClients();
  }, [user]);

  const handleAddComment = () => {
    if (!selectedClient || !newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      date: new Date().toISOString(),
      content: newComment.trim(),
      author: user?.first_name || "User"
    };

    // Update the local state with the new comment
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        const updatedClient = {
          ...client,
          comments: [...(client.comments || []), newCommentObj]
        };
        return updatedClient;
      }
      return client;
    });

    setClients(updatedClients);
    setNewComment("");
    toast.success("Comment added successfully");
  };

  // Function to update a client in the state
  const updateClient = (updatedClient: Client) => {
    const updatedClients = clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    );
    setClients(updatedClients);
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
  
  const typeFilters = ["individual", "business", "referral"];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">View and manage your converted clients</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : clients.length === 0 ? (
          <div className="border rounded-md p-8 text-center">
            <p className="text-muted-foreground">No clients found. Convert leads to see them here.</p>
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
                  placeholder="Search clients..."
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
                    <TableHead>Type</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Client Since</TableHead>
                    <TableHead>Value</TableHead>
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
                      <TableCell className="capitalize">{client.type}</TableCell>
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
                      <TableCell>${client.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-3.5 w-3.5 mr-1" />
                            Contact
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
                                    selectedClient.comments.map((comment) => (
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
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredClients.length)}</span> of <span className="font-medium">{filteredClients.length}</span> clients
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
        
        {selectedClient && (
          <ClientDetail
            client={selectedClient}
            open={showDetailSheet}
            onClose={() => setShowDetailSheet(false)}
            onUpdate={updateClient}
          />
        )}
      </div>
    </Layout>
  );
};

export default Clients;
