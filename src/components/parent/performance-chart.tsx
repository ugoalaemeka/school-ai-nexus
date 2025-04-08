
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PerformanceChartProps {
  isLoading: boolean;
  showDetails?: boolean;
}

const subjectData = [
  { name: "Math", score: 85, average: 76 },
  { name: "Science", score: 92, average: 78 },
  { name: "English", score: 88, average: 80 },
  { name: "History", score: 79, average: 72 },
  { name: "Art", score: 95, average: 82 },
];

const monthlyData = [
  { month: "Jan", score: 82, average: 75 },
  { month: "Feb", score: 84, average: 76 },
  { month: "Mar", score: 88, average: 76 },
  { month: "Apr", score: 91, average: 78 },
  { month: "May", score: 89, average: 77 },
];

export function PerformanceChart({ isLoading, showDetails = false }: PerformanceChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[250px] w-full" />;
  }

  const data = showDetails ? subjectData : monthlyData;
  const dataKey = showDetails ? "name" : "month";

  return (
    <div className="h-[250px] w-full">
      <ChartContainer
        config={{
          score: {
            label: "Your Child",
            color: "hsl(var(--primary))",
          },
          average: {
            label: "Class Average",
            color: "hsl(var(--secondary))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={dataKey} />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="average" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      {showDetails && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-2xl font-bold">A</div>
              <div className="text-xs text-muted-foreground">Overall Grade</div>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-2xl font-bold">92%</div>
              <div className="text-xs text-muted-foreground">Highest Score</div>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-2xl font-bold">87.8%</div>
              <div className="text-xs text-muted-foreground">Average Score</div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Sarah has shown excellent progress in Science and Art this term. Her Math scores have improved consistently over the past months.</p>
          </div>
        </div>
      )}
    </div>
  );
}
