// Renamed from mockData.tsx to mockData.ts since it's not a React component file
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: string;
  status: string;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  followUp: string | null;
  notes: string[];
  crm_type: string;
  comments?: Comment[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: string;
  status: string;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  followUp: string | null;
  notes: string[];
  crm_type: string;
  company: string | null;
  value: number;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  date: string;
  content: string;
  author: string;
}

// Mock data for leads
export const leads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    phone: "555-123-4567",
    email: "john@example.com",
    address: "123 Main St, City, Country",
    type: "email",
    status: "new lead",
    assignedTo: "Sarah Johnson",
    createdAt: "2023-04-15T10:30:00Z",
    lastContact: "2023-04-15T10:30:00Z",
    followUp: "2023-04-20T14:00:00Z",
    notes: ["Initial contact via website", "Interested in gold products"],
    crm_type: "gold-silver"
  },
  {
    id: "2",
    name: "Alice Johnson",
    phone: "555-987-6543",
    email: "alice@example.com",
    address: "456 Oak Ave, Town, Country",
    type: "calling",
    status: "interested & add me",
    assignedTo: "Mike Wilson",
    createdAt: "2023-04-14T15:45:00Z",
    lastContact: "2023-04-16T09:15:00Z",
    followUp: "2023-04-21T11:30:00Z",
    notes: ["Referred by existing client", "Looking for investment options"],
    crm_type: "gold-silver"
  },
  {
    id: "3",
    name: "Robert Brown",
    phone: "555-456-7890",
    email: "robert@example.com",
    address: "789 Pine Rd, Village, Country",
    type: "referral",
    status: "call later",
    assignedTo: "Emily Davis",
    createdAt: "2023-04-13T08:20:00Z",
    lastContact: "2023-04-17T13:40:00Z",
    followUp: "2023-04-22T16:00:00Z",
    notes: ["Has previous experience with silver investments", "Needs more information on current rates"],
    crm_type: "gold-silver"
  },
  {
    id: "4",
    name: "Emma Wilson",
    phone: "555-789-0123",
    email: "emma@example.com",
    address: "321 Elm Blvd, City, Country",
    type: "sms",
    status: "not interested",
    assignedTo: "David Clark",
    createdAt: "2023-04-12T11:10:00Z",
    lastContact: "2023-04-18T10:25:00Z",
    followUp: null,
    notes: ["Initially showed interest but budget constraints", "May reconsider in the future"],
    crm_type: "jewellery"
  },
  {
    id: "5",
    name: "Michael Taylor",
    phone: "555-234-5678",
    email: "michael@example.com",
    address: "654 Maple Dr, Town, Country",
    type: "digital marketing",
    status: "busy/unreachable",
    assignedTo: "Sarah Johnson",
    createdAt: "2023-04-11T16:30:00Z",
    lastContact: "2023-04-14T17:50:00Z",
    followUp: "2023-04-23T09:15:00Z",
    notes: ["Found through LinkedIn campaign", "Interested in bulk purchase for business"],
    crm_type: "jewellery"
  },
  {
    id: "6",
    name: "Sophia Martinez",
    phone: "555-345-6789",
    email: "sophia@example.com",
    address: "987 Cedar Ln, Village, Country",
    type: "social media",
    status: "wrong/incorrect number",
    assignedTo: "Mike Wilson",
    createdAt: "2023-04-10T13:45:00Z",
    lastContact: "2023-04-19T14:30:00Z",
    followUp: "2023-04-24T15:45:00Z",
    notes: ["Requested product catalog", "Has specific interest in gold coins"],
    crm_type: "gold-silver"
  }
];

// Mock data for clients
export const mockClients: Client[] = [
  {
    id: "1",
    name: "Global Investments Inc.",
    phone: "555-111-2222",
    email: "contact@globalinvestments.com",
    address: "100 Finance St, Metropolis, Country",
    type: "email",
    status: "active",
    assignedTo: "Sarah Johnson",
    createdAt: "2022-10-15T10:30:00Z",
    lastContact: "2023-04-10T14:30:00Z",
    followUp: "2023-04-25T13:00:00Z",
    notes: ["Regular buyer of gold bars", "Interested in expanding to silver"],
    crm_type: "gold-silver",
    company: "Global Investments Inc.",
    value: 250000
  },
  {
    id: "2",
    name: "Luxury Jewelers Ltd.",
    phone: "555-333-4444",
    email: "info@luxuryjewelers.com",
    address: "200 Diamond Ave, Gemtown, Country",
    type: "referral",
    status: "active",
    assignedTo: "Mike Wilson",
    createdAt: "2022-11-20T09:15:00Z",
    lastContact: "2023-04-05T11:45:00Z",
    followUp: "2023-04-27T10:30:00Z",
    notes: ["Specializes in high-end jewelry", "Looking for consistent gold supply"],
    crm_type: "jewellery",
    company: "Luxury Jewelers Ltd.",
    value: 180000
  },
  {
    id: "3",
    name: "Personal Wealth Management",
    phone: "555-555-6666",
    email: "wealth@pwm.com",
    address: "300 Portfolio Rd, Richville, Country",
    type: "calling",
    status: "inactive",
    assignedTo: "Emily Davis",
    createdAt: "2022-12-05T16:20:00Z",
    lastContact: "2023-03-28T15:10:00Z",
    followUp: "2023-04-28T14:15:00Z",
    notes: ["Manages investments for high net worth clients", "Regular purchaser of investment-grade metals"],
    crm_type: "gold-silver",
    company: "Personal Wealth Management",
    value: 320000
  },
  {
    id: "4",
    name: "Elite Accessories Inc.",
    phone: "555-777-8888",
    email: "sales@eliteaccessories.com",
    address: "400 Fashion Blvd, Styletown, Country",
    type: "social media",
    status: "active",
    assignedTo: "David Clark",
    createdAt: "2023-01-15T13:40:00Z",
    lastContact: "2023-04-12T09:30:00Z",
    followUp: "2023-04-29T11:00:00Z",
    notes: ["Designs custom jewelry pieces", "Interested in unique gold designs"],
    crm_type: "jewellery",
    company: "Elite Accessories Inc.",
    value: 150000
  },
  {
    id: "5",
    name: "David Williams",
    phone: "555-999-0000",
    email: "david.williams@example.com",
    address: "500 Private Cir, Hometown, Country",
    type: "email",
    status: "active",
    assignedTo: "Sarah Johnson",
    createdAt: "2023-02-10T10:30:00Z",
    lastContact: "2023-04-08T16:45:00Z",
    followUp: "2023-04-30T15:30:00Z",
    notes: ["Individual investor", "Regularly purchases gold coins for collection"],
    crm_type: "gold-silver",
    company: null,
    value: 75000
  }
];

// Mock data for demo clients
export const mockDemoClients: Client[] = [
  {
    id: "d1",
    name: "Demo Corp",
    phone: "555-DEMO-111",
    email: "contact@democorp.com",
    address: "100 Demo St, Test City, Demo Country",
    type: "email",
    status: "active",
    assignedTo: "Demo Agent 1",
    createdAt: "2023-03-15T10:30:00Z",
    lastContact: "2023-04-10T14:30:00Z",
    followUp: "2023-04-25T13:00:00Z",
    notes: ["Demo notes 1", "Demo notes 2"],
    crm_type: "gold-silver",
    company: "Demo Corp",
    value: 100000
  },
  {
    id: "d2",
    name: "Test Jewelers",
    phone: "555-DEMO-222",
    email: "info@testjewelers.com",
    address: "200 Test Ave, Sample Town, Demo Country",
    type: "referral",
    status: "active",
    assignedTo: "Demo Agent 2",
    createdAt: "2023-03-20T09:15:00Z",
    lastContact: "2023-04-05T11:45:00Z",
    followUp: "2023-04-27T10:30:00Z",
    notes: ["Demo jewelry supplier", "Looking for test materials"],
    crm_type: "jewellery",
    company: "Test Jewelers",
    value: 80000
  },
  {
    id: "d3",
    name: "Sample Investments",
    phone: "555-DEMO-333",
    email: "wealth@sampleinvest.com",
    address: "300 Sample Rd, Test City, Demo Country",
    type: "calling",
    status: "inactive",
    assignedTo: "Demo Agent 1",
    createdAt: "2023-03-25T16:20:00Z",
    lastContact: "2023-03-28T15:10:00Z",
    followUp: "2023-04-28T14:15:00Z",
    notes: ["Demo investment firm", "Testing portfolio options"],
    crm_type: "gold-silver",
    company: "Sample Investments",
    value: 120000
  }
];

// Sample data for charts
export const leadStatusDistribution = [
  { name: "New Lead", value: 30 },
  { name: "Interested", value: 45 },
  { name: "Not Interested", value: 15 },
  { name: "Call Later", value: 25 },
  { name: "Unreachable", value: 10 }
];

export const performanceData = [
  { name: "Jan", calls: 45, leads: 25, conversions: 10 },
  { name: "Feb", calls: 52, leads: 30, conversions: 12 },
  { name: "Mar", calls: 48, leads: 28, conversions: 14 },
  { name: "Apr", calls: 60, leads: 35, conversions: 18 },
  { name: "May", calls: 58, leads: 33, conversions: 15 },
  { name: "Jun", calls: 65, leads: 40, conversions: 20 }
];

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
