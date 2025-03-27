export type Comment = {
  id: string;
  date: string;
  content: string;
  author: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: "individual" | "business" | "referral";
  status: "answered" | "busy" | "not-interested" | "call-later" | "pending" | "converted";
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  followUp: string | null;
  notes: string[];
  crm_type: string;
  comments?: Comment[];
};

export type Client = Lead & {
  company?: string;
  value: number;
  comments?: Comment[];
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  photo: string;
  assignedLeads: number;
  convertedLeads: number;
  performance: number; // Percentage
};

export interface Call {
  id: string;
  date: string;
  duration: number;
  status: "answered" | "missed" | "busy" | "completed";
  notes?: string[];
  leadId?: string;
  clientId?: string;
  employeeId: string;
}

export const leads: Lead[] = [
  {
    id: "L1001",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, New York, NY",
    type: "individual",
    status: "answered",
    assignedTo: "E1001",
    createdAt: "2023-09-15T10:30:00Z",
    lastContact: "2023-09-20T14:15:00Z",
    followUp: "2023-10-05T11:00:00Z",
    notes: ["Interested in premium package", "Requested brochure"],
    crm_type: "export-import",
    comments: [
      {
        id: "C1",
        date: "2023-09-15T10:35:00Z",
        content: "Initial call went well. Customer is interested in our premium packages.",
        author: "Alex Thompson"
      },
      {
        id: "C2",
        date: "2023-09-20T14:20:00Z",
        content: "Sent brochure as requested. Follow-up scheduled for Oct 5.",
        author: "Alex Thompson"
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
    createdAt: "2023-09-17T09:45:00Z",
    lastContact: "2023-09-22T16:30:00Z",
    followUp: "2023-10-01T10:00:00Z",
    notes: ["Referred by John Smith", "Call back next week"],
    crm_type: "gold-silver",
    comments: [
      {
        id: "C3",
        date: "2023-09-17T09:50:00Z",
        content: "Lead came through referral from John Smith. Seems promising.",
        author: "Jessica Williams"
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
    createdAt: "2023-09-18T11:00:00Z",
    lastContact: "2023-09-18T11:00:00Z",
    followUp: null,
    notes: ["Busy when called", "Try again in the afternoon"],
    crm_type: "real-estate",
    comments: []
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
    createdAt: "2023-09-19T13:15:00Z",
    lastContact: "2023-09-23T10:20:00Z",
    followUp: null,
    notes: ["Not interested at this time", "Check back in 3 months"],
    crm_type: "clock-stock",
    comments: [
      {
        id: "C4",
        date: "2023-09-23T10:25:00Z",
        content: "Customer is not interested right now. Will check back in 3 months when their current contract expires.",
        author: "Ryan Johnson"
      }
    ]
  },
  {
    id: "L1005",
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
    crm_type: "visiting-book",
    comments: [
      {
        id: "C5",
        date: "2023-09-25T15:50:00Z",
        content: "Successfully converted! Purchased our premium package. Great addition to our client base.",
        author: "Jessica Williams"
      }
    ]
  }
];

export const employees: Employee[] = [
  {
    id: "E1001",
    name: "Alex Thompson",
    email: "alex.thompson@company.com",
    phone: "+1 (555) 111-2222",
    role: "Sales Representative",
    photo: "",
    assignedLeads: 15,
    convertedLeads: 8,
    performance: 85,
  },
  {
    id: "E1002",
    name: "Jessica Williams",
    email: "jessica.williams@company.com",
    phone: "+1 (555) 222-3333",
    role: "Senior Sales Representative",
    photo: "",
    assignedLeads: 20,
    convertedLeads: 12,
    performance: 90,
  },
  {
    id: "E1003",
    name: "Ryan Johnson",
    email: "ryan.johnson@company.com",
    phone: "+1 (555) 333-4444",
    role: "Sales Representative",
    photo: "",
    assignedLeads: 12,
    convertedLeads: 5,
    performance: 75,
  },
];

export const calls: Call[] = [
  {
    id: "call1",
    date: "2023-09-25T09:15:00Z",
    duration: 125,
    status: "completed",
    notes: ["Discussed project requirements", "Will send proposal next week"],
    leadId: "L1001",
    employeeId: "E1001"
  },
  {
    id: "call2",
    date: "2023-09-24T14:30:00Z",
    duration: 0,
    status: "missed",
    leadId: "L1002",
    employeeId: "E1002"
  },
  {
    id: "call3",
    date: "2023-09-23T11:00:00Z",
    duration: 45,
    status: "completed",
    notes: ["Lead interested in premium package"],
    leadId: "L1003",
    employeeId: "E1003"
  },
  {
    id: "call4",
    date: "2023-09-22T16:45:00Z",
    duration: 0,
    status: "busy",
    leadId: "L1004",
    employeeId: "E1001"
  },
  {
    id: "call5",
    date: "2023-09-21T10:30:00Z",
    duration: 180,
    status: "completed",
    notes: ["Detailed discussion about requirements", "Will schedule follow-up meeting"],
    leadId: "L1005",
    employeeId: "E1002"
  },
  {
    id: "call6",
    date: "2023-09-20T13:15:00Z",
    duration: 210,
    status: "completed",
    notes: ["Regular check-in", "Client satisfied with progress"],
    clientId: "C1001",
    employeeId: "E1003"
  },
  {
    id: "call7",
    date: "2023-09-19T15:45:00Z",
    duration: 150,
    status: "completed",
    notes: ["Discussed renewal options", "Client considering upgrade"],
    clientId: "C1002",
    employeeId: "E1001"
  },
  {
    id: "call8",
    date: "2023-09-18T09:30:00Z",
    duration: 0,
    status: "missed",
    clientId: "C1003",
    employeeId: "E1002"
  },
  {
    id: "call9",
    date: "2023-09-17T16:00:00Z",
    duration: 90,
    status: "completed",
    notes: ["Addressed client concerns", "Scheduled on-site visit"],
    clientId: "C1004",
    employeeId: "E1003"
  },
  {
    id: "call10",
    date: "2023-09-16T11:30:00Z",
    duration: 120,
    status: "completed",
    notes: ["Quarterly review", "Client expanding contract"],
    clientId: "C1005",
    employeeId: "E1001"
  }
];

export const performanceData = [
  { name: "Mon", calls: 12, leads: 3, conversions: 1 },
  { name: "Tue", calls: 18, leads: 5, conversions: 2 },
  { name: "Wed", calls: 15, leads: 4, conversions: 1 },
  { name: "Thu", calls: 20, leads: 6, conversions: 3 },
  { name: "Fri", calls: 25, leads: 8, conversions: 4 },
  { name: "Sat", calls: 10, leads: 2, conversions: 1 },
  { name: "Sun", calls: 5, leads: 1, conversions: 0 },
];

export const leadSources = [
  { name: "Website", value: 35 },
  { name: "Referral", value: 25 },
  { name: "Social Media", value: 20 },
  { name: "Email", value: 15 },
  { name: "Other", value: 5 },
];

export const leadStatusDistribution = [
  { name: "Answered", value: 30 },
  { name: "Busy", value: 15 },
  { name: "Not Interested", value: 20 },
  { name: "Call Later", value: 25 },
  { name: "Converted", value: 10 },
];

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
