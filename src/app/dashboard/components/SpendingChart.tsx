"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

interface ChartProps {
  chartData: { name: string; spent: number }[];
  dailySafeLimit: number;
}

export default function SpendingChart({
  chartData,
  dailySafeLimit,
}: ChartProps) {
  return (
    <div style={{ width: "100%", height: 250, marginTop: "20px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis hide domain={[0, dailySafeLimit * 1.5]} />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
          <ReferenceLine
            y={dailySafeLimit}
            stroke="#cbd5e1"
            strokeDasharray="5 5"
          />
          <Bar dataKey="spent" radius={[6, 6, 0, 0]} barSize={40}>
            {chartData.map((entry, index) => {
              // 1. Define the threshold (e.g., 90% of the limit)
              const warningThreshold = dailySafeLimit * 0.8;

              // 2. Determine the color
              // If spent is higher than the threshold, use the dark blue (#1B263B)
              // Otherwise, use a soft gray (#cbd5e1)
              const barColor =
                entry.spent >= warningThreshold ? "#1B263B" : "#cbd5e1";

              return (
                <Cell
                  key={`cell-${index}`}
                  fill={barColor}
                  style={{ transition: "fill 0.3s ease" }}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
