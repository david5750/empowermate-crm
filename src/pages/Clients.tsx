
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Client, Comment, formatDate } from "@/utils/mockData";
import { Button } from "@/components/shared/Button";
import { Phone, Mail, ChevronRight, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { fetchClients, mockClients } from "@/services/clientService";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Converted Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.phone}</div>
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
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Clients;
