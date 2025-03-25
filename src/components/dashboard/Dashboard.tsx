
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Calendar, Phone, UserRound, Users } from "lucide-react";
import { RecentLeads } from "./RecentLeads";
import { LeadStatusChart } from "./LeadStatusChart";
import { PerformanceChart } from "./PerformanceChart";
import { leadStatusDistribution, performanceData } from "@/utils/mockData";

export const Dashboard = () => {
  // Stats data
  const statsData = [
    {
      title: "Total Leads",
      value: "245",
      change: "+12.5%",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Conversion Rate",
      value: "18.2%",
      change: "+3.1%",
      icon: <ArrowUpRight className="h-4 w-4" />,
    },
    {
      title: "Follow-ups Today",
      value: "12",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Calls Today",
      value: "32",
      change: "+8",
      icon: <Phone className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Lead Performance</CardTitle>
            <CardDescription>
              Number of leads and conversion rates over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <PerformanceChart data={performanceData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Lead Status</CardTitle>
            <CardDescription>
              Current status distribution of leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadStatusChart data={leadStatusDistribution} />
          </CardContent>
        </Card>
      </div>

      {/* Recent leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>
            Your most recently added leads and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentLeads />
        </CardContent>
      </Card>
    </div>
  );
};
