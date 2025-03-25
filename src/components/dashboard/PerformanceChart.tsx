
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PerformanceChartProps {
  data: { 
    name: string; 
    calls: number; 
    leads: number;
    conversions: number; 
  }[];
}

export const PerformanceChart = ({ data = [] }: PerformanceChartProps) => {
  // Ensure we have data to display
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">No performance data available</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ 
              borderRadius: "8px", 
              border: "none", 
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
            }} 
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            iconType="circle"
            iconSize={8}
          />
          <Bar name="Calls" dataKey="calls" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={8} />
          <Bar name="Leads" dataKey="leads" fill="#10B981" radius={[4, 4, 0, 0]} barSize={8} />
          <Bar name="Conversions" dataKey="conversions" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
