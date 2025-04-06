
import { Client, Comment } from "@/utils/mockData";

// Export mock clients data for use in other files
export const mockClients: Client[] = [
  {
    id: "C1001",
    name: "Robert Wilson",
    phone: "+1 (555) 567-8901",
    email: "robert.wilson@example.com",
    address: "654 Maple Dr, Austin, TX",
    type: "calling",
    status: "converted",
    assignedTo: "E1002",
    createdAt: "2023-09-16T14:30:00Z",
    lastContact: "2023-09-25T15:45:00Z",
    followUp: null,
    notes: ["Successfully converted to client", "Purchased premium package"],
    crm_type: "export-import",
    company: "Wilson Enterprises",
    value: 15000,
    comments: [
      {
        id: "comment-1001",
        date: "2023-09-18T10:30:00Z",
        content: "Initial meeting went well. Client is interested in our premium package.",
        author: "Alex Export"
      },
      {
        id: "comment-1002",
        date: "2023-09-22T14:15:00Z",
        content: "Follow-up call completed. Client confirmed interest in proceeding.",
        author: "Sarah Manager"
      }
    ]
  },
  {
    id: "C1002",
    name: "Amanda Taylor",
    phone: "+1 (555) 012-3456",
    email: "amanda.taylor@example.com",
    address: "852 Pine Dr, Atlanta, GA",
    type: "referral",
    status: "interested & add me",
    assignedTo: "E1003",
    createdAt: "2023-08-22T09:15:00Z",
    lastContact: "2023-09-15T11:30:00Z",
    followUp: null,
    notes: ["Converted after demo", "Very satisfied with service"],
    crm_type: "gold-silver",
    company: "Taylor Solutions",
    value: 12000,
    comments: [
      {
        id: "comment-2001",
        date: "2023-08-25T09:00:00Z",
        content: "Client requested more information about our gold-tier services.",
        author: "John Gold"
      }
    ]
  },
  {
    id: "C1003",
    name: "Thomas Rodriguez",
    phone: "+1 (555) 234-5678",
    email: "thomas.r@example.com",
    address: "123 Oak St, Los Angeles, CA",
    type: "digital marketing",
    status: "call later",
    assignedTo: "E1001",
    createdAt: "2023-07-12T10:00:00Z",
    lastContact: "2023-09-10T14:15:00Z",
    followUp: null,
    notes: ["Premium subscription", "Has recommended us to others"],
    crm_type: "clock-stock",
    company: "Rodriguez Consulting",
    value: 25000,
    comments: [
      {
        id: "comment-3001",
        date: "2023-07-15T11:30:00Z",
        content: "Client has extensive needs. We should prepare a comprehensive proposal.",
        author: "Chris Time"
      },
      {
        id: "comment-3002",
        date: "2023-08-05T10:15:00Z",
        content: "Proposal accepted with minor modifications. Contract sent for signature.",
        author: "Chris Time"
      },
      {
        id: "comment-3003",
        date: "2023-09-01T14:45:00Z",
        content: "Contract signed. Implementation phase beginning next week.",
        author: "Chris Time"
      }
    ]
  },
  {
    id: "C1004",
    name: "Sophia Chen",
    phone: "+1 (555) 345-6789",
    email: "sophia.chen@example.com",
    address: "456 Elm Ave, San Diego, CA",
    type: "email",
    status: "not interested",
    assignedTo: "E1002",
    createdAt: "2023-08-05T11:30:00Z",
    lastContact: "2023-09-20T10:45:00Z",
    followUp: null,
    notes: ["Purchased full package", "Looking to expand services"],
    crm_type: "visiting-book",
    company: null,
    value: 8500,
    comments: [
      {
        id: "comment-4001",
        date: "2023-08-10T09:30:00Z",
        content: "Client is very detail-oriented. Ensure all documentation is thorough.",
        author: "Visitor Rep"
      }
    ]
  },
  {
    id: "C1005",
    name: "Marcus Johnson",
    phone: "+1 (555) 456-7890",
    email: "marcus.j@example.com",
    address: "789 Pine Rd, Chicago, IL",
    type: "social media",
    status: "busy/unreachable",
    assignedTo: "E1003",
    createdAt: "2023-09-01T13:00:00Z",
    lastContact: "2023-09-18T15:30:00Z",
    followUp: null,
    notes: ["Converted from referral", "High-value client"],
    crm_type: "export-import",
    company: "Johnson Industries",
    value: 30000,
    comments: [
      {
        id: "comment-5001",
        date: "2023-09-05T14:00:00Z",
        content: "Client has international shipping needs. Ensure compliance with all regulations.",
        author: "Alex Export"
      },
      {
        id: "comment-5002",
        date: "2023-09-15T11:45:00Z",
        content: "All documentation approved. First shipment scheduled for next month.",
        author: "Alex Export"
      }
    ]
  }
];

// Fetch clients for the current user's CRM type
export const fetchClients = async (crmType: string): Promise<Client[]> => {
  // Filter clients by CRM type from our static data
  return mockClients.filter(client => client.crm_type === crmType);
};

// Get a single client by ID
export const fetchClientById = async (id: string): Promise<Client | null> => {
  const client = mockClients.find(client => client.id === id);
  return client || null;
};

// Update an existing client
export const updateClient = async (id: string, client: Partial<Client>): Promise<Client | null> => {
  // In a real app, this would update the database
  const existingClientIndex = mockClients.findIndex(c => c.id === id);
  if (existingClientIndex === -1) return null;
  
  const updatedClient = {
    ...mockClients[existingClientIndex],
    ...client
  };
  
  // For demo purposes, we return the updated client
  return updatedClient;
};
