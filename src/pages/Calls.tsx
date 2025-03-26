
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/shared/Button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { calls, formatDate, formatTime, formatDuration, employees, leads } from "@/utils/mockData";
import { Phone, Clock, Pencil, Calendar } from "lucide-react";

const Calls = () => {
  // Combine call data with lead and employee information
  const callsWithDetails = calls.map(call => {
    const lead = leads.find(lead => lead.id === call.leadId);
    const employee = employees.find(emp => emp.id === call.employeeId);
    
    return {
      ...call,
      leadName: lead?.name || "Unknown Lead",
      employeeName: employee?.name || "Unknown Employee"
    };
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
            <Button variant="outline" size="sm">
              All Calls
            </Button>
            <Button variant="outline" size="sm">
              Incoming
            </Button>
            <Button variant="outline" size="sm">
              Outgoing
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
                <TableHead>Lead</TableHead>
                <TableHead>Representative</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callsWithDetails.map((call) => (
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
                  <TableCell>{call.leadName}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Calls;
