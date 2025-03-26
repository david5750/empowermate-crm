
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/utils/mockData";

// Fetch clients for the current user's CRM type
export const fetchClients = async (crmType: string): Promise<Client[]> => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("crm_type", crmType);
    
    if (error) {
      console.error("Error fetching clients:", error);
      throw error;
    }
    
    // Transform the database clients to match the Client type
    const transformedClients: Client[] = data.map(client => ({
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: client.email,
      address: client.address,
      type: client.type as "individual" | "business" | "referral",
      status: "converted",
      assignedTo: client.assigned_to,
      createdAt: client.created_at,
      lastContact: client.last_contact,
      followUp: client.follow_up,
      notes: client.notes,
      crm_type: client.crm_type,
      company: client.company,
      value: client.value
    }));
    
    return transformedClients;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    // Return static client data as fallback
    return mockClients.filter(client => client.crm_type === crmType);
  }
};

// Static mock clients data
export const mockClients: Client[] = [
  {
    id: "C1001",
    name: "Robert Wilson",
    phone: "+1 (555) 567-8901",
    email: "robert.wilson@example.com",
    address: "654 Maple Dr, Austin, TX",
    type: "business",
    status: "converted",
    assignedTo: "E1002",
    createdAt: "2023-09-16T14:30:00Z",
    lastContact: "2023-09-25T15:45:00Z",
    followUp: null,
    notes: ["Successfully converted to client", "Purchased premium package"],
    crm_type: "export-import",
    company: "Wilson Enterprises",
    value: 15000
  },
  {
    id: "C1002",
    name: "Amanda Taylor",
    phone: "+1 (555) 012-3456",
    email: "amanda.taylor@example.com",
    address: "852 Pine Dr, Atlanta, GA",
    type: "referral",
    status: "converted",
    assignedTo: "E1003",
    createdAt: "2023-08-22T09:15:00Z",
    lastContact: "2023-09-15T11:30:00Z",
    followUp: null,
    notes: ["Converted after demo", "Very satisfied with service"],
    crm_type: "gold-silver",
    company: "Taylor Solutions",
    value: 12000
  },
  {
    id: "C1003",
    name: "Thomas Rodriguez",
    phone: "+1 (555) 234-5678",
    email: "thomas.r@example.com",
    address: "123 Oak St, Los Angeles, CA",
    type: "business",
    status: "converted",
    assignedTo: "E1001",
    createdAt: "2023-07-12T10:00:00Z",
    lastContact: "2023-09-10T14:15:00Z",
    followUp: null,
    notes: ["Premium subscription", "Has recommended us to others"],
    crm_type: "clock-stock",
    company: "Rodriguez Consulting",
    value: 25000
  },
  {
    id: "C1004",
    name: "Sophia Chen",
    phone: "+1 (555) 345-6789",
    email: "sophia.chen@example.com",
    address: "456 Elm Ave, San Diego, CA",
    type: "individual",
    status: "converted",
    assignedTo: "E1002",
    createdAt: "2023-08-05T11:30:00Z",
    lastContact: "2023-09-20T10:45:00Z",
    followUp: null,
    notes: ["Purchased full package", "Looking to expand services"],
    crm_type: "visiting-book",
    company: null,
    value: 8500
  },
  {
    id: "C1005",
    name: "Marcus Johnson",
    phone: "+1 (555) 456-7890",
    email: "marcus.j@example.com",
    address: "789 Pine Rd, Chicago, IL",
    type: "referral",
    status: "converted",
    assignedTo: "E1003",
    createdAt: "2023-09-01T13:00:00Z",
    lastContact: "2023-09-18T15:30:00Z",
    followUp: null,
    notes: ["Converted from referral", "High-value client"],
    crm_type: "export-import",
    company: "Johnson Industries",
    value: 30000
  }
];
