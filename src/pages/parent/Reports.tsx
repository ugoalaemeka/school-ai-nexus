
import { useState } from "react";
import { ParentLayout } from "@/components/layout/parent-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  TrendingUp, 
  BarChart4, 
  Award,
  FileText,
  Calendar,
  BookOpen
} from "lucide-react";
import { PerformanceChart } from "@/components/parent/performance-chart";
import { motion } from "framer-motion";

export default function ParentReports() {
  const [activeTab, setActiveTab] = useState("current");
  
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

  const currentReports = reportCards.slice(0, 1);
  const pastReports = reportCards.slice(1);

  const subjectPerformance = [
    { subject: "Mathematics", grade: "A", score: 92, comment: "Excellent understanding of advanced concepts." },
    { subject: "Science", grade: "A", score: 94, comment: "Outstanding work in laboratory experiments." },
    { subject: "English", grade: "A-", score: 90, comment: "Strong writing skills, can improve critical analysis." },
    { subject: "History", grade: "B+", score: 87, comment: "Good understanding of key historical events." },
    { subject: "Art", grade: "A+", score: 98, comment: "Exceptional creativity and technical skills." },
    { subject: "Physical Education", grade: "A", score: 95, comment: "Great teamwork and athletic performance." },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return "bg-green-500/20 text-green-700 border-green-500";
    if (grade.startsWith('B')) return "bg-blue-500/20 text-blue-700 border-blue-500";
    if (grade.startsWith('C')) return "bg-yellow-500/20 text-yellow-700 border-yellow-500";
    if (grade.startsWith('D')) return "bg-orange-500/20 text-orange-700 border-orange-500";
    return "bg-red-500/20 text-red-700 border-red-500";
  };

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

        <motion.div variants={fadeIn} className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8/4.0</div>
              <p className="text-xs text-muted-foreground">
                Top 10% of class
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last term
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Subject</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Art (98%)</div>
              <p className="text-xs text-muted-foreground">
                Consistent A+ performance
              </p>
            </CardContent>
          </Card>
        </motion.div>

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
                  {currentReports.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No current term report cards available</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentReports.map((report) => (
                        <div key={report.id} className="rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <div>
                              <h3 className="text-lg font-bold">{report.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Issued: {report.dateIssued}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">Grade</div>
                                <div className={`text-lg font-bold py-1 px-3 rounded border ${getGradeColor(report.grade)}`}>
                                  {report.grade}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">Average</div>
                                <div className="text-lg font-bold">{report.percentage}</div>
                              </div>
                              <Button>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </Button>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <Card className="shadow-sm">
                              <CardHeader className="py-2">
                                <CardTitle className="text-sm">Strengths</CardTitle>
                              </CardHeader>
                              <CardContent className="py-2">
                                <ul className="text-sm space-y-1">
                                  <li>• Outstanding in Science experiments</li>
                                  <li>• Creative problem-solving in Math</li>
                                  <li>• Exceptional art portfolio work</li>
                                </ul>
                              </CardContent>
                            </Card>
                            <Card className="shadow-sm">
                              <CardHeader className="py-2">
                                <CardTitle className="text-sm">Areas for Growth</CardTitle>
                              </CardHeader>
                              <CardContent className="py-2">
                                <ul className="text-sm space-y-1">
                                  <li>• More consistent homework completion</li>
                                  <li>• Historical analysis needs improvement</li>
                                  <li>• Participate more in class discussions</li>
                                </ul>
                              </CardContent>
                            </Card>
                            <Card className="shadow-sm">
                              <CardHeader className="py-2">
                                <CardTitle className="text-sm">Teacher Comments</CardTitle>
                              </CardHeader>
                              <CardContent className="py-2">
                                <p className="text-sm">
                                  Sarah is a bright and motivated student who consistently 
                                  produces high-quality work. She excels in both analytical 
                                  and creative tasks. With continued focus on time management, 
                                  she can reach even greater achievements.
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past" className="space-y-4">
                  {pastReports.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No past report cards available</p>
                    </div>
                  ) : (
                    <div className="rounded-md border shadow-sm">
                      <div className="grid grid-cols-6 bg-muted/50 p-4 text-sm font-medium">
                        <div className="col-span-2">Report Card</div>
                        <div className="col-span-1 text-center">Term</div>
                        <div className="col-span-1 text-center">Issue Date</div>
                        <div className="col-span-1 text-center">Grade</div>
                        <div className="col-span-1 text-center">Action</div>
                      </div>
                      {pastReports.map((report) => (
                        <div key={report.id} className="grid grid-cols-6 p-4 text-sm border-t items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-2">
                            <div className="font-medium">{report.title}</div>
                            <div className="text-xs text-muted-foreground">{report.id}</div>
                          </div>
                          <div className="col-span-1 text-center">{report.term} {report.year}</div>
                          <div className="col-span-1 text-center">{report.dateIssued}</div>
                          <div className="col-span-1 text-center">
                            <Badge 
                              variant="outline"
                              className={getGradeColor(report.grade)}
                            >
                              {report.grade} ({report.percentage})
                            </Badge>
                          </div>
                          <div className="col-span-1 text-center">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="subjects" className="space-y-4">
                  <div className="rounded-md border shadow-sm">
                    <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-1">Subject</div>
                      <div className="col-span-1 text-center">Grade</div>
                      <div className="col-span-1 text-center">Score</div>
                      <div className="col-span-2">Teacher Comments</div>
                    </div>
                    {subjectPerformance.map((subject, index) => (
                      <div key={index} className="grid grid-cols-5 p-4 text-sm border-t items-center hover:bg-muted/20 transition-colors">
                        <div className="col-span-1 font-medium">{subject.subject}</div>
                        <div className="col-span-1 text-center">
                          <Badge 
                            variant="outline"
                            className={getGradeColor(subject.grade)}
                          >
                            {subject.grade}
                          </Badge>
                        </div>
                        <div className="col-span-1 text-center">{subject.score}%</div>
                        <div className="col-span-2">{subject.comment}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base">Subject Performance Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-full max-w-md">
                          {subjectPerformance.map((subject, index) => (
                            <div key={index} className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{subject.subject}</span>
                                <span className="font-medium">{subject.score}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2.5">
                                <div 
                                  className="h-2.5 rounded-full bg-primary" 
                                  style={{ width: `${subject.score}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ParentLayout>
  );
}
