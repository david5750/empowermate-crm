
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

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
