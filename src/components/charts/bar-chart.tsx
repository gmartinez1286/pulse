"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: number[];
  labels: string[];
  height?: number;
  formatValue?: (v: number) => string;
}

export function BarChart({
  data,
  labels,
  height = 150,
  formatValue = (v) => `$${v.toFixed(2)}`,
}: BarChartProps) {
  const chartData = data.map((value, i) => ({
    label: labels[i],
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="0" stroke="#E3E8EE" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: "#697386" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip
          formatter={(value: number) => [formatValue(value), "CPR"]}
          contentStyle={{
            background: "#F8F9FC",
            border: "1px solid #D5DCE6",
            borderRadius: 9,
            fontSize: 11.5,
          }}
        />
        <Bar
          dataKey="value"
          fill="#635BFF"
          radius={[5, 5, 0, 0]}
          opacity={0.85}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
