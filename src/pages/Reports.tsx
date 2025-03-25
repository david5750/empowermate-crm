
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { BarChart, BarChart2, Calendar, Download, LineChart, PieChart, Users } from "lucide-react";
import { leadStatusDistribution, performanceData } from "@/utils/mockData";
import { LeadStatusChart } from "@/components/dashboard/LeadStatusChart";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">
              View performance and lead analytics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              This Month
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Performance Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Lead Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pb-6">
              <div className="text-3xl font-bold">24.5%</div>
              <p className="text-xs text-green-600 mt-1">
                +2.1% from last month
              </p>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "24.5%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Average Response Time
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pb-6">
              <div className="text-3xl font-bold">4.2 hours</div>
              <p className="text-xs text-red-600 mt-1">
                +0.5 hours from last month
              </p>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Lead to Client Ratio
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pb-6">
              <div className="text-3xl font-bold">1:4.5</div>
              <p className="text-xs text-green-600 mt-1">
                Better than target (1:5)
              </p>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>
                Call, lead, and conversion metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <PerformanceChart data={performanceData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Status Distribution</CardTitle>
              <CardDescription>Current status breakdown</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <LeadStatusChart data={leadStatusDistribution} />
            </CardContent>
          </Card>
        </div>

        {/* Employee Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Performance</CardTitle>
            <CardDescription>
              Comparative analysis of employee metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">
                      Employee
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Assigned Leads
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Converted Leads
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Conversion Rate
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">Alex Thompson</td>
                    <td className="px-4 py-3">45</td>
                    <td className="px-4 py-3">12</td>
                    <td className="px-4 py-3">26.7%</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">85%</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">Jessica Williams</td>
                    <td className="px-4 py-3">52</td>
                    <td className="px-4 py-3">18</td>
                    <td className="px-4 py-3">34.6%</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">90%</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">Ryan Johnson</td>
                    <td className="px-4 py-3">38</td>
                    <td className="px-4 py-3">7</td>
                    <td className="px-4 py-3">18.4%</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">75%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
