
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrentTermReport } from "./current-term-report";
import { PastTermReports } from "./past-term-reports";
import { SubjectPerformance } from "./subject-performance";
import { motion } from "framer-motion";

interface ReportCardData {
  id: string;
  title: string;
  year: string;
  term: string;
  dateIssued: string;
  grade: string;
  percentage: string;
  status: string;
}

interface SubjectData {
  subject: string;
  grade: string;
  score: number;
  comment: string;
}

interface ReportTabsProps {
  reportCards: ReportCardData[];
  subjectPerformance: SubjectData[];
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function ReportTabs({ reportCards, subjectPerformance }: ReportTabsProps) {
  const [activeTab, setActiveTab] = useState("current");
  
  const currentReports = reportCards.slice(0, 1);
  const pastReports = reportCards.slice(1);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return "bg-green-500/20 text-green-700 border-green-500";
    if (grade.startsWith('B')) return "bg-blue-500/20 text-blue-700 border-blue-500";
    if (grade.startsWith('C')) return "bg-yellow-500/20 text-yellow-700 border-yellow-500";
    if (grade.startsWith('D')) return "bg-orange-500/20 text-orange-700 border-orange-500";
    return "bg-red-500/20 text-red-700 border-red-500";
  };

  return (
    <motion.div variants={fadeIn}>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Report Cards</CardTitle>
          <CardDescription>
            Access and download report cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="current">Current Term</TabsTrigger>
              <TabsTrigger value="past">Past Terms</TabsTrigger>
              <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-4">
              <CurrentTermReport 
                reportCards={currentReports} 
                getGradeColor={getGradeColor} 
              />
            </TabsContent>
            
            <TabsContent value="past" className="space-y-4">
              <PastTermReports 
                reportCards={pastReports} 
                getGradeColor={getGradeColor} 
              />
            </TabsContent>
            
            <TabsContent value="subjects" className="space-y-4">
              <SubjectPerformance 
                subjectPerformance={subjectPerformance} 
                getGradeColor={getGradeColor} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
