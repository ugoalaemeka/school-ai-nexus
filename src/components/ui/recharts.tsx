
import { cn } from "@/lib/utils";
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { ChartTooltipContent } from "./chart";

// Common props for all chart types
interface ChartBaseProps {
  className?: string;
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

// BarChart component
interface BarChartProps extends ChartBaseProps {
  stack?: boolean;
  horizontal?: boolean;
}

export const BarChart = ({
  className,
  data,
  index,
  categories,
  colors = ["hsl(var(--primary))", "hsl(var(--secondary))"],
  valueFormatter = (value: number) => `${value}`,
  stack = false,
  horizontal = false,
}: BarChartProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          {horizontal ? (
            <>
              <XAxis type="number" />
              <YAxis dataKey={index} type="category" />
            </>
          ) : (
            <>
              <XAxis dataKey={index} />
              <YAxis />
            </>
          )}
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {entry.name}:
                          </span>
                          <span className="font-bold text-sm">
                            {valueFormatter(entry.value as number)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              stackId={stack ? "stack" : undefined}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

// LineChart component
interface LineChartProps extends ChartBaseProps {
  showDots?: boolean;
  curveType?: "linear" | "monotone" | "natural";
}

export const LineChart = ({
  className,
  data,
  index,
  categories,
  colors = ["hsl(var(--primary))", "hsl(var(--secondary))"],
  valueFormatter = (value: number) => `${value}`,
  showDots = true,
  curveType = "monotone",
}: LineChartProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={index} />
          <YAxis />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {entry.name}:
                          </span>
                          <span className="font-bold text-sm">
                            {valueFormatter(entry.value as number)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          {categories.map((category, index) => (
            <Line
              key={category}
              type={curveType}
              dataKey={category}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
              dot={showDots}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// PieChart component
interface PieChartProps {
  className?: string;
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  innerRadius?: number;
  outerRadius?: number;
}

export const PieChart = ({
  className,
  data,
  colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "#10b981",
    "#3b82f6",
    "#ef4444",
    "#f59e0b",
  ],
  valueFormatter = (value: number) => `${value}`,
  innerRadius = 0,
  outerRadius = 80,
}: PieChartProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0];
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {data.name}:
                      </span>
                      <span className="font-bold text-sm">
                        {valueFormatter(data.value as number)}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
