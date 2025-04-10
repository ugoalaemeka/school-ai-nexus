
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceChart } from "@/components/parent/performance-chart";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function PerformanceChartSection() {
  return (
    <motion.div variants={fadeIn}>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Academic Performance Trends</CardTitle>
          <CardDescription>
            Track your child's performance across terms
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <PerformanceChart isLoading={false} showDetails />
        </CardContent>
      </Card>
    </motion.div>
  );
}
