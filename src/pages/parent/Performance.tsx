
import { ParentLayout } from "@/components/layout/parent-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  BarChart2, 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileDown, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  User 
} from "lucide-react";

const childrenData = [
  {
    id: 1,
    name: "Emma Thompson",
    grade: "Grade 8",
    avatar: "",
  },
  {
    id: 2,
    name: "Noah Thompson",
    grade: "Grade 5",
    avatar: "",
  }
];

const termData = [
  { term: "Term 1", value: "term1" },
  { term: "Term 2", value: "term2" },
  { term: "Term 3", value: "term3" }
];

const subjectPerformance = [
  { subject: "Mathematics", score: 85, average: 75, max: 100 },
  { subject: "Science", score: 92, average: 78, max: 100 },
  { subject: "English", score: 78, average: 72, max: 100 },
  { subject: "History", score: 88, average: 76, max: 100 },
  { subject: "Art", score: 95, average: 82, max: 100 }
];

const attendanceData = [
  { month: "Jan", present: 18, absent: 2, late: 1 },
  { month: "Feb", present: 19, absent: 1, late: 0 },
  { month: "Mar", present: 17, absent: 2, late: 1 },
  { month: "Apr", present: 18, absent: 1, late: 1 }
];

const behaviourData = [
  { category: "Excellent", value: 65 },
  { category: "Good", value: 25 },
  { category: "Fair", value: 10 }
];

const PerformancePage = () => {
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
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-6"
      >
        {/* Header with child selector and term selector */}
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Child Performance</h1>
            <p className="text-muted-foreground">Track academic progress and activities</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Select defaultValue="1">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Child" />
              </SelectTrigger>
              <SelectContent>
                {childrenData.map(child => (
                  <SelectItem key={child.id} value={child.id.toString()}>
                    {child.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select defaultValue="term2">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Term" />
              </SelectTrigger>
              <SelectContent>
                {termData.map(term => (
                  <SelectItem key={term.value} value={term.value}>
                    {term.term}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Performance Overview Card */}
        <motion.div variants={fadeIn}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance Overview</CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
              <CardDescription>
                Academic summary for Emma Thompson, Term 2
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 text-center">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">ET</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 font-bold text-lg">Emma Thompson</h3>
                  <p className="text-sm text-muted-foreground">Grade 8-A</p>
                  <Badge className="mt-2" variant="outline">ID: 2404875</Badge>
                </div>
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
                    <div className="text-primary/80 font-bold text-3xl">A-</div>
                    <div className="text-sm font-medium mt-1">Overall Grade</div>
                    <div className="flex items-center mt-2 text-green-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span className="text-xs">Improved from B+</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
                    <div className="text-primary/80 font-bold text-3xl">92%</div>
                    <div className="text-sm font-medium mt-1">Attendance</div>
                    <div className="flex items-center mt-2 text-amber-500">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      <span className="text-xs">Down 3% from last term</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
                    <div className="text-primary/80 font-bold text-3xl">5th</div>
                    <div className="text-sm font-medium mt-1">Class Rank</div>
                    <div className="flex items-center mt-2 text-green-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span className="text-xs">Up from 7th position</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Detail Tabs */}
        <motion.div variants={fadeIn}>
          <Tabs defaultValue="academic">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                  Previous Term
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next Term
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="academic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Subject Performance</CardTitle>
                  <CardDescription>Performance compared to class average</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <BarChart
                      data={subjectPerformance}
                      index="subject"
                      categories={["score", "average"]}
                      colors={["violet", "blue"]}
                      valueFormatter={(value) => `${value}%`}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Academic Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </div>
                          <span>Science</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Excellent
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </div>
                          <span>Art</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Excellent
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </div>
                          <span>History</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Good
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3">
                            <TrendingDown className="h-4 w-4 text-amber-500" />
                          </div>
                          <span>English</span>
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                          Needs Work
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3">
                            <TrendingDown className="h-4 w-4 text-amber-500" />
                          </div>
                          <span>Mathematics</span>
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                          Needs Support
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted rounded-lg border">
                      <p className="text-sm font-medium">Teacher Recommendation</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Emma would benefit from extra practice in English grammar and Mathematics problem-solving. Consider enrolling in after-school tutoring.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="attendance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Attendance Tracking</CardTitle>
                  <CardDescription>Monthly attendance record</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <BarChart
                      data={attendanceData}
                      index="month"
                      categories={["present", "absent", "late"]}
                      colors={["green", "red", "amber"]}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Present Days</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-500">72</div>
                    <p className="text-sm text-muted-foreground">Out of 80 school days</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <p className="text-sm mt-1">90% attendance rate</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Absent Days</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-500">6</div>
                    <p className="text-sm text-muted-foreground">Out of 80 school days</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "7.5%" }}></div>
                    </div>
                    <p className="text-sm mt-1">7.5% absence rate</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Late Arrivals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-500">2</div>
                    <p className="text-sm text-muted-foreground">Out of 80 school days</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "2.5%" }}></div>
                    </div>
                    <p className="text-sm mt-1">2.5% tardiness rate</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Absence Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full responsive-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Reason</th>
                        <th>Excused</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="Date">Feb 15, 2025</td>
                        <td data-label="Type">Absent</td>
                        <td data-label="Reason">Illness - Flu</td>
                        <td data-label="Excused">
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                            Yes
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td data-label="Date">Mar 3, 2025</td>
                        <td data-label="Type">Late</td>
                        <td data-label="Reason">Traffic delay</td>
                        <td data-label="Excused">
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                            Yes
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td data-label="Date">Mar 21, 2025</td>
                        <td data-label="Type">Absent</td>
                        <td data-label="Reason">Family emergency</td>
                        <td data-label="Excused">
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                            Yes
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td data-label="Date">Apr 7, 2025</td>
                        <td data-label="Type">Absent</td>
                        <td data-label="Reason">Not specified</td>
                        <td data-label="Excused">
                          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300">
                            No
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="behavior" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Behavior Assessment</CardTitle>
                    <CardDescription>Teacher observations and ratings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Classroom Participation</span>
                            <span className="text-sm">Excellent</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Homework Completion</span>
                            <span className="text-sm">Good</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Behavior in Class</span>
                            <span className="text-sm">Excellent</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Group Work</span>
                            <span className="text-sm">Good</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Organization Skills</span>
                            <span className="text-sm">Fair</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Respecting Others</span>
                            <span className="text-sm">Excellent</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted rounded-lg border">
                      <p className="text-sm font-medium">Teacher Comments</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Emma is a pleasure to have in class. She actively participates in discussions and shows respect to her peers and teachers. She could benefit from improving her organizational skills to keep track of assignments better.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Behavior Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <PieChart
                        data={behaviourData}
                        category="Behavior Ratings"
                      />
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-violet-500 mr-2"></div>
                        <span className="text-sm">Excellent: 65%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Good: 25%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-sm">Fair: 10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Recognition & Awards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-600">
                          <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" />
                          <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" />
                          <path d="M4 22h16" />
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Science Fair - Second Place</div>
                        <div className="text-sm text-muted-foreground mt-1">March 15, 2025</div>
                        <div className="text-sm mt-2">Awarded for outstanding project on renewable energy sources.</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-600">
                          <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4Z" />
                          <path d="M12 2v2" />
                          <path d="M12 20v2" />
                          <path d="m4.9 4.9 1.4 1.4" />
                          <path d="m17.7 17.7 1.4 1.4" />
                          <path d="M2 12h2" />
                          <path d="M20 12h2" />
                          <path d="m6.3 17.7-1.4 1.4" />
                          <path d="m19.1 4.9-1.4 1.4" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Student of the Month</div>
                        <div className="text-sm text-muted-foreground mt-1">February 2025</div>
                        <div className="text-sm mt-2">Recognized for academic excellence and positive attitude in the classroom.</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Document Downloads */}
        <motion.div variants={fadeIn}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Reports</CardTitle>
              <CardDescription>Download detailed reports and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg border flex flex-col items-center">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Term 2 Report Card</p>
                  <p className="text-xs text-muted-foreground mt-1">Published: April 1, 2025</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-1">
                    <FileDown className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg border flex flex-col items-center">
                  <BarChart2 className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Progress Assessment</p>
                  <p className="text-xs text-muted-foreground mt-1">Published: March 20, 2025</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-1">
                    <FileDown className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg border flex flex-col items-center">
                  <CalendarDays className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Attendance Record</p>
                  <p className="text-xs text-muted-foreground mt-1">Updated: April 10, 2025</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-1">
                    <FileDown className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ParentLayout>
  );
};

export default PerformancePage;
