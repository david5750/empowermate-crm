
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { fetchLeads } from "@/services/leadService";
import { useAuth } from "@/contexts/AuthContext";
import { Lead, formatDate } from "@/utils/mockData";
import { Button } from "@/components/shared/Button";
import { Phone, Mail, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// We'll reuse leads but only show the converted ones as clients
const Clients = () => {
  const [clients, setClients] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadClients = async () => {
      if (user?.crm_type) {
        setIsLoading(true);
        try {
          const data = await fetchLeads(user.crm_type);
          // Filter only converted leads - these are our clients
          const convertedLeads = data.filter(lead => lead.status === "converted");
          setClients(convertedLeads);
        } catch (error) {
          console.error("Failed to load clients:", error);
          toast.error("Failed to load clients");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadClients();
  }, [user]);

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
