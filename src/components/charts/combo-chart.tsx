"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ComboChartProps {
  dailyAdds: number[];
  startTotal?: number;
  height?: number;
  endLabel?: string;
}

export function ComboChart({
  dailyAdds,
  startTotal = 8218,
  height = 170,
}: ComboChartProps) {
  let cum = startTotal;
  const chartData = dailyAdds.map((add, i) => {
    cum += add;
    return { day: i + 1, adds: add, cumulative: cum };
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={chartData} margin={{ top: 14, right: 48, left: 14, bottom: 14 }}>
        <CartesianGrid strokeDasharray="0" stroke="#E3E8EE" vertical={false} />
        <XAxis dataKey="day" hide />
        <YAxis yAxisId="left" hide />
        <YAxis yAxisId="right" orientation="right" hide />
        <Tooltip
          contentStyle={{
            background: "#F8F9FC",
            border: "1px solid #D5DCE6",
            borderRadius: 9,
            fontSize: 11.5,
          }}
        />
        <Bar
          yAxisId="left"
          dataKey="adds"
          fill="#635BFF"
          opacity={0.4}
          radius={[2.5, 2.5, 0, 0]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cumulative"
          stroke="#00B8AC"
          strokeWidth={2.6}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
