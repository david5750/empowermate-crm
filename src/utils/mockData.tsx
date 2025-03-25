
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
};

export type Client = Lead & {
  company?: string;
  value: number;
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

export type Call = {
  id: string;
  leadId: string;
  employeeId: string;
  date: string;
  duration: number; // in seconds
  status: "answered" | "busy" | "not-interested" | "call-later";
  notes: string;
};

// Generate mock leads
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
  },
  {
    id: "L1006",
    name: "Jennifer Lee",
    phone: "+1 (555) 678-9012",
    email: "jennifer.lee@example.com",
    address: "987 Cedar Ln, Seattle, WA",
    type: "individual",
    status: "pending",
    assignedTo: "E1001",
    createdAt: "2023-09-20T16:45:00Z",
    lastContact: "2023-09-20T16:45:00Z",
    followUp: "2023-10-02T13:30:00Z",
    notes: ["Initial contact made", "Scheduled follow-up call"],
  },
  {
    id: "L1007",
    name: "David Clark",
    phone: "+1 (555) 789-0123",
    email: "david.clark@example.com",
    address: "246 Elm St, Denver, CO",
    type: "referral",
    status: "answered",
    assignedTo: "E1003",
    createdAt: "2023-09-21T10:00:00Z",
    lastContact: "2023-09-24T11:30:00Z",
    followUp: "2023-10-10T14:00:00Z",
    notes: ["Very interested in our services", "Requested a demo"],
  },
  {
    id: "L1008",
    name: "Lisa Martinez",
    phone: "+1 (555) 890-1234",
    email: "lisa.martinez@example.com",
    address: "753 Birch Ave, Miami, FL",
    type: "business",
    status: "call-later",
    assignedTo: "E1002",
    createdAt: "2023-09-22T09:15:00Z",
    lastContact: "2023-09-26T13:45:00Z",
    followUp: "2023-10-03T15:15:00Z",
    notes: ["Discussed business needs", "Needs time to think about options"],
  },
];

// Generate mock employees
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

// Generate mock calls
export const calls: Call[] = [
  {
    id: "C1001",
    leadId: "L1001",
    employeeId: "E1001",
    date: "2023-09-20T14:15:00Z",
    duration: 325, // 5:25 minutes
    status: "answered",
    notes: "Client expressed interest in our premium package. Scheduled follow-up.",
  },
  {
    id: "C1002",
    leadId: "L1002",
    employeeId: "E1002",
    date: "2023-09-22T16:30:00Z",
    duration: 180, // 3:00 minutes
    status: "call-later",
    notes: "Client was in a meeting. Asked to call back next week.",
  },
  {
    id: "C1003",
    leadId: "L1003",
    employeeId: "E1001",
    date: "2023-09-18T11:00:00Z",
    duration: 15, // 0:15 seconds
    status: "busy",
    notes: "Line was busy. Will try again later.",
  },
  {
    id: "C1004",
    leadId: "L1004",
    employeeId: "E1003",
    date: "2023-09-23T10:20:00Z",
    duration: 210, // 3:30 minutes
    status: "not-interested",
    notes: "Client is not interested at this time. Check back in 3 months.",
  },
  {
    id: "C1005",
    leadId: "L1005",
    employeeId: "E1002",
    date: "2023-09-25T15:45:00Z",
    duration: 540, // 9:00 minutes
    status: "answered",
    notes: "Successfully converted to client. Purchased premium package.",
  },
];

// Performance metrics
export const performanceData = [
  { name: "Mon", calls: 12, leads: 3, conversions: 1 },
  { name: "Tue", calls: 18, leads: 5, conversions: 2 },
  { name: "Wed", calls: 15, leads: 4, conversions: 1 },
  { name: "Thu", calls: 20, leads: 6, conversions: 3 },
  { name: "Fri", calls: 25, leads: 8, conversions: 4 },
  { name: "Sat", calls: 10, leads: 2, conversions: 1 },
  { name: "Sun", calls: 5, leads: 1, conversions: 0 },
];

// Lead sources
export const leadSources = [
  { name: "Website", value: 35 },
  { name: "Referral", value: 25 },
  { name: "Social Media", value: 20 },
  { name: "Email", value: 15 },
  { name: "Other", value: 5 },
];

// Lead status distribution
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
