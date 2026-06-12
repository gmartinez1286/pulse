"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatChartDate } from "@/lib/utils/dates";
import { subDays } from "date-fns";

interface AreaChartProps {
  data: number[];
  prevPeriodData?: number[];
  height?: number;
  color?: string;
  endDate?: Date;
}

export function AreaChart({
  data,
  prevPeriodData,
  height = 210,
  color = "#635BFF",
  endDate = new Date(2026, 5, 11),
}: AreaChartProps) {
  const chartData = data.map((value, i) => {
    const date = subDays(endDate, data.length - 1 - i);
    return {
      date: formatChartDate(date),
      value,
      prev: prevPeriodData?.[i],
    };
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={chartData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" stroke="#E3E8EE" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "#697386" }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#697386" }}
          axisLine={false}
          tickLine={false}
          width={38}
        />
        <Tooltip
          contentStyle={{
            background: "#F8F9FC",
            border: "1px solid #D5DCE6",
            borderRadius: 9,
            fontSize: 11.5,
            boxShadow: "0 1px 2px rgba(26,31,54,.06), 0 6px 20px rgba(26,31,54,.06)",
          }}
          formatter={(value: number, name: string) => [
            value,
            name === "value" ? "Current" : "Previous",
          ]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2.6}
          fill="url(#areaFill)"
          dot={false}
          activeDot={{ r: 4.5, fill: color, stroke: "#fff", strokeWidth: 2 }}
        />
        {prevPeriodData && (
          <Line
            type="monotone"
            dataKey="prev"
            stroke="#697386"
            strokeWidth={1.5}
            strokeDasharray="3 5"
            dot={false}
            opacity={0.65}
          />
        )}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
