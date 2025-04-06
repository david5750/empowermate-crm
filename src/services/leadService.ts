
import { Lead, Client, Comment } from "@/utils/mockData";

// Static mock leads data with comments
export const mockLeads: Lead[] = [
  {
    id: "L1001",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, New York, NY",
    type: "individual",
    status: "answered",
    assignedTo: "E1001",
    createdAt: "2023-09-20T10:30:00Z",
    lastContact: "2023-09-21T15:45:00Z",
    followUp: "2023-09-28T14:00:00Z",
    notes: ["Interested in premium package", "Requested brochure"],
    crm_type: "export-import",
    comments: [
      {
        id: "comment-1001",
        date: "2023-09-21T15:45:00Z",
        content: "Client is interested in our international shipping services. Should follow up next week.",
        author: "Alex Export"
      }
    ]
  },
  {
    id: "L1002",
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah.j@example.com",
    address: "456 Park Ave, Boston, MA",
    type: "referral",
    status: "call-later",
    assignedTo: "E1002",
    createdAt: "2023-09-18T09:15:00Z",
    lastContact: "2023-09-19T11:30:00Z",
    followUp: "2023-09-26T10:00:00Z",
    notes: ["Referred by John Smith", "Call back next week"],
    crm_type: "export-import",
    comments: [
      {
        id: "comment-2001",
        date: "2023-09-19T11:30:00Z",
        content: "Lead was busy when called. Asked to call back next week. Seems promising.",
        author: "Alex Export"
      }
    ]
  },
  {
    id: "L1003",
    name: "Michael Brown",
    phone: "+1 (555) 345-6789",
    email: "michael.brown@example.com",
    address: "789 Oak Rd, Chicago, IL",
    type: "business",
    status: "busy",
    assignedTo: "E1001",
    createdAt: "2023-09-15T10:00:00Z",
    lastContact: "2023-09-16T14:15:00Z",
    followUp: "2023-09-23T15:30:00Z",
    notes: ["Busy when called", "Try again in the afternoon"],
    crm_type: "gold-silver",
    comments: [
      {
        id: "comment-3001",
        date: "2023-09-16T14:15:00Z",
        content: "Customer was in a meeting. Secretary said afternoon would be better.",
        author: "John Gold"
      }
    ]
  },
  {
    id: "L1004",
    name: "Emily Davis",
    phone: "+1 (555) 456-7890",
    email: "emily.davis@example.com",
    address: "321 Pine St, San Francisco, CA",
    type: "individual",
    status: "not-interested",
    assignedTo: "E1003",
    createdAt: "2023-09-10T11:30:00Z",
    lastContact: "2023-09-12T10:45:00Z",
    followUp: null,
    notes: ["Not interested at this time", "Check back in 3 months"],
    crm_type: "gold-silver",
    comments: [
      {
        id: "comment-4001",
        date: "2023-09-12T10:45:00Z",
        content: "Lead explicitly stated they have no current needs. Mark for follow-up in Q1 next year.",
        author: "John Gold"
      }
    ]
  },
  {
    id: "L1005",
    name: "Jennifer Lee",
    phone: "+1 (555) 678-9012",
    email: "jennifer.lee@example.com",
    address: "987 Cedar Ln, Seattle, WA",
    type: "individual",
    status: "pending",
    assignedTo: "E1001",
    createdAt: "2023-09-05T13:00:00Z",
    lastContact: "2023-09-07T15:30:00Z",
    followUp: "2023-09-21T14:00:00Z",
    notes: ["Initial contact made", "Scheduled follow-up call"],
    crm_type: "clock-stock",
    comments: [
      {
        id: "comment-5001",
        date: "2023-09-07T15:30:00Z",
        content: "Initial meeting scheduled for next week. Prepare product demonstrations.",
        author: "Chris Time"
      }
    ]
  }
];

// Fetch leads for the current user's CRM type
export const fetchLeads = async (crmType: string): Promise<Lead[]> => {
  // Filter leads by CRM type from our static data
  return mockLeads.filter(lead => lead.crm_type === crmType);
};

// Get a single lead by ID
export const fetchLeadById = async (id: string): Promise<Lead | null> => {
  const lead = mockLeads.find(lead => lead.id === id);
  return lead || null;
};

// Create a new lead
export const createLead = async (lead: Omit<Lead, "id" | "createdAt">): Promise<Lead | null> => {
  // In a real app, this would insert into the database
  const newLead: Lead = {
    ...lead,
    id: `L${Date.now()}`,
    createdAt: new Date().toISOString(),
    comments: []
  };
  
  // For demo purposes, we return the new lead
  return newLead;
};

// Update an existing lead
export const updateLead = async (id: string, lead: Partial<Lead>): Promise<Lead | null> => {
  // In a real app, this would update the database
  const existingLeadIndex = mockLeads.findIndex(l => l.id === id);
  if (existingLeadIndex === -1) return null;
  
  const updatedLead = {
    ...mockLeads[existingLeadIndex],
    ...lead
  };
  
  // For demo purposes, we return the updated lead
  return updatedLead;
};

// Convert lead to client
export const convertLeadToClient = async (lead: Lead): Promise<Client | null> => {
  // In a real app, this would update the lead status and create a new client
  const client: Client = {
    id: `C${Date.now()}`,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    address: lead.address,
    type: lead.type,
    status: "converted",
    assignedTo: lead.assignedTo,
    createdAt: new Date().toISOString(),
    lastContact: lead.lastContact,
    followUp: null,
    notes: lead.notes,
    crm_type: lead.crm_type,
    company: null,
    value: 0,
    comments: lead.comments || []
  };
  
  // In a production app, you would also update the lead status to "converted"
  // and save both changes to the database
  
  // For demo purposes, we return the new client
  return client;
};

// Delete a lead
export const deleteLead = async (id: string): Promise<boolean> => {
  // In a real app, this would delete from the database
  // For demo purposes, always return success
  return true;
};
