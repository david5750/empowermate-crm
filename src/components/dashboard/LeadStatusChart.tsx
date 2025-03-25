
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface LeadStatusChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#10B981", "#FBBF24", "#EF4444", "#3B82F6", "#8B5CF6"];

export const LeadStatusChart = ({ data }: LeadStatusChartProps) => {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}`, "Leads"]}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
