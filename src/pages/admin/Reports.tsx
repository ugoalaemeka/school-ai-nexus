
import React, { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, LineChart, PieChart } from "@/components/ui/recharts";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Download,
  Filter,
  BarChart as BarChartIcon,
  FileBarChart,
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  TrendingDown,
  School,
  BookOpen,
  CheckSquare,
  Calendar,
  ArrowUp,
  ArrowDown,
  Percent,
  Mail,
  Printer
} from "lucide-react";

const ReportsPage = () => {
  const { toast } = useToast();
  const [filterYear, setFilterYear] = useState("2025");
  const [filterTerm, setFilterTerm] = useState("all");
  
  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // Sample data for charts
  const attendanceData = [
    { month: "Jan", attendance: 92 },
    { month: "Feb", attendance: 94 },
    { month: "Mar", attendance: 91 },
    { month: "Apr", attendance: 95 },
    { month: "May", attendance: 93 },
    { month: "Jun", attendance: 88 },
  ];

  const performanceData = [
    { subject: "Math", average: 78, passing: 85 },
    { subject: "Science", average: 82, passing: 88 },
    { subject: "English", average: 75, passing: 90 },
    { subject: "History", average: 68, passing: 82 },
    { subject: "Computer", average: 90, passing: 95 },
  ];

  const feesData = [
    { month: "Jan", collected: 85000, target: 100000 },
    { month: "Feb", collected: 92000, target: 100000 },
    { month: "Mar", collected: 98000, target: 100000 },
    { month: "Apr", collected: 95000, target: 100000 },
    { month: "May", collected: 88000, target: 100000 },
    { month: "Jun", collected: 91000, target: 100000 },
  ];

  const genderDistribution = [
    { name: "Male", value: 52 },
    { name: "Female", value: 48 },
  ];

  // Sample report list
  const availableReports = [
    { id: 1, title: "Academic Performance Report", type: "Performance", format: "PDF", lastGenerated: "2025-04-28" },
    { id: 2, title: "Attendance Summary Report", type: "Attendance", format: "Excel", lastGenerated: "2025-04-25" },
    { id: 3, title: "Fee Collection Report", type: "Financial", format: "PDF/Excel", lastGenerated: "2025-04-30" },
    { id: 4, title: "Student Demographics", type: "Administrative", format: "PDF", lastGenerated: "2025-03-15" },
    { id: 5, title: "Teacher Performance Report", type: "HR", format: "PDF", lastGenerated: "2025-04-20" },
    { id: 6, title: "Exam Results Analysis", type: "Academic", format: "PDF/Excel", lastGenerated: "2025-04-15" },
    { id: 7, title: "Resource Utilization Report", type: "Administrative", format: "Excel", lastGenerated: "2025-04-10" },
  ];

  // Performance metrics
  const performanceMetrics = [
    { metric: "Overall Pass Rate", value: "82.5%", change: "+3.2%", trend: "up" },
    { metric: "Average GPA", value: "3.4", change: "+0.2", trend: "up" },
    { metric: "Top Performers", value: "68", change: "+12", trend: "up" },
    { metric: "Struggling Students", value: "24", change: "-8", trend: "down" },
    { metric: "Subjects Above Target", value: "7/10", change: "+2", trend: "up" },
  ];

  // Class performance comparison
  const classPerformance = [
    { class: "Class 9A", average: 85, attendance: 94, },
    { class: "Class 9B", average: 78, attendance: 91, },
    { class: "Class 10A", average: 82, attendance: 93, },
    { class: "Class 10B", average: 76, attendance: 89, },
    { class: "Class 11A", average: 80, attendance: 92, },
    { class: "Class 11B", average: 74, attendance: 88, },
    { class: "Class 12A", average: 88, attendance: 96, },
    { class: "Class 12B", average: 83, attendance: 94, },
  ];

  const handleGenerateReport = (reportTitle: string) => {
    toast({
      title: "Report generated",
      description: `${reportTitle} has been generated successfully.`,
    });
  };

  const handleEmailReport = (reportTitle: string) => {
    toast({
      title: "Report sent",
      description: `${reportTitle} has been emailed to administrators.`,
    });
  };

  return (
    <AdminSidebar>
      <div className="container py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariant}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Reports</h1>
              <p className="text-muted-foreground">Generate and analyze school performance reports</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterTerm} onValueChange={setFilterTerm}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Terms</SelectItem>
                  <SelectItem value="term1">Term 1</SelectItem>
                  <SelectItem value="term2">Term 2</SelectItem>
                  <SelectItem value="term3">Term 3</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </motion.div>

          {/* Key Performance Metrics */}
          <motion.div variants={itemVariant}>
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Overall school performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">{metric.metric}</div>
                      <div className="text-2xl font-bold mt-1">{metric.value}</div>
                      <div className={`flex items-center text-xs mt-1 ${
                        metric.trend === "up" 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {metric.trend === "up" ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariant} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
                <CardDescription>Monthly attendance percentage</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={attendanceData}
                  index="month"
                  categories={["attendance"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value}%`}
                  className="h-72"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average scores by subject</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={performanceData}
                  index="subject"
                  categories={["average", "passing"]}
                  colors={["blue", "green"]}
                  valueFormatter={(value) => `${value}%`}
                  className="h-72"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fee Collection</CardTitle>
                <CardDescription>Monthly collection vs target</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={feesData}
                  index="month"
                  categories={["collected", "target"]}
                  colors={["blue", "gray"]}
                  valueFormatter={(value) => `$${value}`}
                  className="h-72"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>Gender distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={genderDistribution}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                  colors={["#4f46e5", "#f43f5e"]}
                  className="h-72"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Reports Section */}
          <motion.div variants={itemVariant}>
            <Tabs defaultValue="academic" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="academic">Academic Reports</TabsTrigger>
                <TabsTrigger value="financial">Financial Reports</TabsTrigger>
                <TabsTrigger value="administrative">Administrative Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="academic" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Performance Comparison</CardTitle>
                    <CardDescription>Average scores and attendance by class</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Class</TableHead>
                          <TableHead>Average Score</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Performance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classPerformance.map((classData, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{classData.class}</TableCell>
                            <TableCell>{classData.average}%</TableCell>
                            <TableCell>{classData.attendance}%</TableCell>
                            <TableCell>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary rounded-full h-2" 
                                  style={{ width: `${classData.average}%` }}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                      Showing data for {filterTerm === "all" ? "All Terms" : filterTerm} - {filterYear}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                      <Button size="sm" className="gap-1">
                        <FileText className="h-4 w-4" />
                        Full Report
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="financial" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                    <CardDescription>Revenue and expense analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Total Revenue</p>
                                <p className="text-2xl font-bold">$854,200</p>
                              </div>
                              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>
                            <div className="flex items-center text-green-600 dark:text-green-400 text-xs mt-2">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              <span>+8.2% from last year</span>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Collection Rate</p>
                                <p className="text-2xl font-bold">92.5%</p>
                              </div>
                              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                <Percent className="h-6 w-6 text-green-600 dark:text-green-400" />
                              </div>
                            </div>
                            <div className="flex items-center text-green-600 dark:text-green-400 text-xs mt-2">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              <span>+1.8% from last term</span>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Pending Fees</p>
                                <p className="text-2xl font-bold">$42,800</p>
                              </div>
                              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                                <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                              </div>
                            </div>
                            <div className="flex items-center text-red-600 dark:text-red-400 text-xs mt-2">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              <span>-2.5% from last month</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Available Financial Reports</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <div className="font-medium">Monthly Fee Collection Report</div>
                              <div className="text-sm text-muted-foreground">Last generated: April 30, 2025</div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="gap-1">
                                <Download className="h-4 w-4" />
                                PDF
                              </Button>
                              <Button size="sm" variant="outline" className="gap-1">
                                <Download className="h-4 w-4" />
                                Excel
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b">
                            <div>
                              <div className="font-medium">Annual Financial Statement</div>
                              <div className="text-sm text-muted-foreground">Last generated: March 15, 2025</div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="gap-1">
                                <Download className="h-4 w-4" />
                                PDF
                              </Button>
                              <Button size="sm" variant="outline" className="gap-1">
                                <Download className="h-4 w-4" />
                                Excel
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <div className="font-medium">Outstanding Fees Report</div>
                              <div className="text-sm text-muted-foreground">Last generated: April 28, 2025</div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="gap-1">
                                <Download className="h-4 w-4" />
                                PDF
                              </Button>
                              <Button size="sm" variant="outline" className="gap-1">
                                <Download className="h-4 w-4" />
                                Excel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="administrative" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Reports</CardTitle>
                    <CardDescription>Generate or download administrative reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Report Title</TableHead>
                          <TableHead className="hidden md:table-cell">Type</TableHead>
                          <TableHead className="hidden md:table-cell">Format</TableHead>
                          <TableHead className="hidden md:table-cell">Last Generated</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {availableReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">
                              <div>{report.title}</div>
                              <div className="text-xs text-muted-foreground md:hidden">
                                {report.type} • {report.format} • {report.lastGenerated}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{report.type}</TableCell>
                            <TableCell className="hidden md:table-cell">{report.format}</TableCell>
                            <TableCell className="hidden md:table-cell">{report.lastGenerated}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleGenerateReport(report.title)}
                                >
                                  Generate
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEmailReport(report.title)}
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Printer className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </AdminSidebar>
  );
};

export default ReportsPage;
