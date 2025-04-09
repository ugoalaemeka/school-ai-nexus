
import React from "react";
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
}

interface BarChartProps extends ChartProps {
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#4ade80", "#f59e0b", "#ef4444"],
  valueFormatter = (value: number) => value.toString(),
  className,
  ...props
}: BarChartProps) {
  return (
    <div className={cn("h-[200px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={index} />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => [
              valueFormatter(value),
              name,
            ]}
          />
          <Legend />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface LineChartProps extends ChartProps {
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#4ade80", "#f59e0b", "#ef4444"],
  valueFormatter = (value: number) => value.toString(),
  className,
  ...props
}: LineChartProps) {
  return (
    <div className={cn("h-[200px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={index} />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => [
              valueFormatter(value),
              name,
            ]}
          />
          <Legend />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PieChartProps extends ChartProps {
  category: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  nameKey?: string;
  dataKey?: string;
}

export function PieChart({
  data,
  category,
  nameKey = "name",
  dataKey = "value",
  colors = ["#2563eb", "#4ade80", "#f59e0b", "#ef4444", "#a855f7", "#ec4899"],
  valueFormatter = (value: number) => value.toString(),
  className,
  ...props
}: PieChartProps) {
  return (
    <div className={cn("h-[200px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey={dataKey}
            nameKey={nameKey}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [valueFormatter(value), category]} />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
