
import React, { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Button } from '@/components/shared/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate } from "@/utils/mockData";
import { Phone, MessageCircle, Search, Calendar, Clock, Filter } from 'lucide-react';

// Mock call data for demonstration
const mockCalls = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    type: 'lead', // lead or client
    callType: 'outgoing',
    status: 'completed',
    duration: '3:45',
    date: '2023-09-20T10:30:00Z',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1 (555) 234-5678',
    type: 'client',
    callType: 'incoming',
    status: 'missed',
    duration: '0:00',
    date: '2023-09-19T11:30:00Z',
  },
  {
    id: '3',
    name: 'Michael Brown',
    phone: '+1 (555) 345-6789',
    type: 'lead',
    callType: 'outgoing',
    status: 'completed',
    duration: '5:22',
    date: '2023-09-18T14:15:00Z',
  },
  {
    id: '4',
    name: 'Emily Davis',
    phone: '+1 (555) 456-7890',
    type: 'client',
    callType: 'outgoing',
    status: 'completed',
    duration: '2:15',
    date: '2023-09-17T09:45:00Z',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    phone: '+1 (555) 567-8901',
    type: 'lead',
    callType: 'incoming',
    status: 'missed',
    duration: '0:00',
    date: '2023-09-16T16:30:00Z',
  }
];

const Calls = () => {
  const [activeTab, setActiveTab] = useState<'lead' | 'client'>('lead');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter calls based on active tab and search query
  const filteredCalls = mockCalls.filter(call => {
    return call.type === activeTab && 
      (call.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       call.phone.includes(searchQuery));
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'missed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Call History</h1>
          <p className="text-muted-foreground">View and manage your call records</p>
        </div>

        {/* Tab buttons */}
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'lead' ? 'default' : 'outline'}
            onClick={() => setActiveTab('lead')}
          >
            Lead Calls
          </Button>
          <Button
            variant={activeTab === 'client' ? 'default' : 'outline'}
            onClick={() => setActiveTab('client')}
          >
            Client Calls
          </Button>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search calls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 py-2 pr-4 rounded-md border border-input"
          />
        </div>

        {/* Call history table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <div className="font-medium">{call.name}</div>
                    <div className="text-sm text-muted-foreground">{call.phone}</div>
                  </TableCell>
                  <TableCell>
                    <span 
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        call.callType === 'outgoing' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      }`}
                    >
                      {call.callType === 'outgoing' ? 'Outgoing' : 'Incoming'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span 
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(call.status)}`}
                    >
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span>{formatDate(call.date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-2" />
                      <span>{new Date(call.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        Call Back
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-3.5 w-3.5 mr-1" />
                        Message
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCalls.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No calls found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Calls;
