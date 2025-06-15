
import { ParentLayout } from "@/components/layout/parent-layout";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { ReportStatsCards } from "@/components/parent/report-stats-cards";
import { PerformanceChartSection } from "@/components/parent/performance-chart-section";
import { ReportTabs } from "@/components/parent/report-tabs";

export default function ParentReports() {
  const reportCards = [
    {
      id: "RC-2025-T1",
      title: "Term 1 Report Card",
      year: "2025",
      term: "Term 1",
      dateIssued: "December 15, 2024",
      grade: "A",
      percentage: "92%",
      status: "available",
    },
    {
      id: "RC-2024-T3",
      title: "Term 3 Report Card",
      year: "2024",
      term: "Term 3",
      dateIssued: "August 5, 2024",
      grade: "A-",
      percentage: "90%",
      status: "available",
    },
    {
      id: "RC-2024-T2",
      title: "Term 2 Report Card",
      year: "2024",
      term: "Term 2",
      dateIssued: "April 10, 2024",
      grade: "B+",
      percentage: "88%",
      status: "available",
    },
    {
      id: "RC-2024-T1",
      title: "Term 1 Report Card",
      year: "2024",
      term: "Term 1",
      dateIssued: "December 12, 2023",
      grade: "B",
      percentage: "85%",
      status: "available",
    },
  ];

  const subjectPerformance = [
    { subject: "Mathematics", grade: "A", score: 92, comment: "Excellent understanding of advanced concepts." },
    { subject: "English Language", grade: "A", score: 94, comment: "Outstanding work in comprehension and grammar." },
    { subject: "Basic Science & Technology", grade: "A-", score: 90, comment: "Strong practical skills, can improve on theory." },
    { subject: "National Values Education", grade: "B+", score: 87, comment: "Good understanding of Nigerian history and culture. (Contains Social Studies, Civic Education, Security Education)" },
    { subject: "Pre-vocational Studies", grade: "A", score: 95, comment: "Excellent grasp of concepts. (Contains Home Economics and Agricultural Science)" },
    { subject: "Yoruba Language", grade: "B", score: 85, comment: "Good progress in vocabulary and fluency." },
    { subject: "Business Studies", grade: "A-", score: 89, comment: "Shows great potential in entrepreneurial skills." },
    { subject: "Creative Arts", grade: "B+", score: 88, comment: "Very creative and expressive in practical sessions." },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <ParentLayout>
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Report Cards & Analytics</h1>
            <p className="text-muted-foreground">
              View and download your child's academic reports
            </p>
          </div>
        </motion.div>

        <ReportStatsCards />
        <PerformanceChartSection />
        <ReportTabs reportCards={reportCards} subjectPerformance={subjectPerformance} />
      </motion.div>
    </ParentLayout>
  );
}
