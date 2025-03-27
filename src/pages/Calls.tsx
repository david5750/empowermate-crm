
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/shared/Button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { calls, formatDate, formatTime, formatDuration, employees, leads, mockClients } from "@/utils/mockData";
import { Phone, Clock, Pencil, Calendar, User, Users } from "lucide-react";

const Calls = () => {
  // State for toggling between lead and client calls
  const [callType, setCallType] = useState<"lead" | "client">("lead");
  
  // Combine call data with lead/client and employee information
  const callsWithDetails = calls.map(call => {
    const lead = leads.find(lead => lead.id === call.leadId);
    const client = mockClients.find(client => client.id === call.clientId);
    const employee = employees.find(emp => emp.id === call.employeeId);
    
    return {
      ...call,
      contactName: callType === "lead" ? lead?.name : client?.name,
      employeeName: employee?.name || "Unknown Employee"
    };
  }).filter(call => {
    // Filter calls based on the selected call type
    if (callType === "lead") {
      return call.leadId; // Only show lead calls
    } else {
      return call.clientId; // Only show client calls
    }
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Call Log</h1>
          <p className="text-muted-foreground">View and manage all call activities</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Button 
              variant={callType === "lead" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCallType("lead")}
            >
              <User className="h-4 w-4 mr-1" />
              Lead Calls
            </Button>
            <Button 
              variant={callType === "client" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCallType("client")}
            >
              <Users className="h-4 w-4 mr-1" />
              Client Calls
            </Button>
          </div>
          
          <Button size="sm">
            <Phone className="h-4 w-4 mr-1" />
            New Call
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>{callType === "lead" ? "Lead" : "Client"}</TableHead>
                <TableHead>Representative</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callsWithDetails.length > 0 ? (
                callsWithDetails.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {formatDate(call.date)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(call.date)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{call.contactName || "Unknown Contact"}</TableCell>
                    <TableCell>{call.employeeName}</TableCell>
                    <TableCell>
                      <StatusBadge status={call.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {formatDuration(call.duration)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Notes
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-3.5 w-3.5 mr-1" />
                          Call Back
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">No {callType} calls found.</p>
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
