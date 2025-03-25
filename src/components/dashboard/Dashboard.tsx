
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shared/Card";
import { Button } from "../shared/Button";
import { Clock, Phone, Users, UserRound, BarChart2, CheckCircle } from "lucide-react";
import { leadStatusDistribution, leads, performanceData } from "@/utils/mockData";
import { LeadStatusChart } from "./LeadStatusChart";
import { PerformanceChart } from "./PerformanceChart";
import { RecentLeads } from "./RecentLeads";

export const Dashboard = () => {
  // Calculate summary statistics
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => 
    new Date(lead.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  const followUps = leads.filter(lead => lead.followUp).length;
  const conversions = leads.filter(lead => lead.status === "converted").length;
  
  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex!</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            New Lead
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-fade-in" style={{animationDelay: "0ms"}}>
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              +{newLeads} new leads this week
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{animationDelay: "100ms"}}>
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {Math.round((conversions / totalLeads) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {conversions} leads converted
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{animationDelay: "200ms"}}>
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{followUps}</div>
            <p className="text-xs text-muted-foreground">
              {followUps} scheduled follow-ups
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{animationDelay: "300ms"}}>
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Today's Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 calls scheduled for today
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-slide-up" style={{animationDelay: "200ms"}}>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Your call and conversion activity this week</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <PerformanceChart data={performanceData} />
          </CardContent>
        </Card>
        
        <Card className="animate-slide-up" style={{animationDelay: "400ms"}}>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
            <CardDescription>Current status of all leads</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <LeadStatusChart data={leadStatusDistribution} />
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Leads */}
      <Card className="animate-slide-up" style={{animationDelay: "500ms"}}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Your most recent lead activity</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All Leads
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <RecentLeads />
        </CardContent>
      </Card>
    </div>
  );
};
