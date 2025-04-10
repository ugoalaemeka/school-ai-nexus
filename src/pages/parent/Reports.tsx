
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
    { subject: "Science", grade: "A", score: 94, comment: "Outstanding work in laboratory experiments." },
    { subject: "English", grade: "A-", score: 90, comment: "Strong writing skills, can improve critical analysis." },
    { subject: "History", grade: "B+", score: 87, comment: "Good understanding of key historical events." },
    { subject: "Art", grade: "A+", score: 98, comment: "Exceptional creativity and technical skills." },
    { subject: "Physical Education", grade: "A", score: 95, comment: "Great teamwork and athletic performance." },
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
