
import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { LineChart, BarChart } from "@/components/ui/recharts";
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  BellRing,
  Search,
  Send,
  User,
  MessageSquare,
  PlusCircle,
  BarChart4,
  ClipboardCheck,
  Upload,
  ArrowUpRight,
  Calendar as CalendarIcon,
  BookOpenCheck,
  BookmarkIcon,
  Brain,
  Download
} from "lucide-react";

// Type definitions
interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
  grade?: string;
}

interface TimetableClass {
  id: number;
  subject: string;
  time: string;
  room: string;
  teacher: string;
}

// Sample data
const assignmentData: Assignment[] = [
  { id: 1, title: "Mathematics Problem Set", subject: "Mathematics", dueDate: "Apr 12, 2025", status: "completed", grade: "A" },
  { id: 2, title: "Science Lab Report", subject: "Science", dueDate: "Apr 15, 2025", status: "pending" },
  { id: 3, title: "History Essay", subject: "History", dueDate: "Apr 18, 2025", status: "pending" },
  { id: 4, title: "Literature Book Review", subject: "English", dueDate: "Apr 8, 2025", status: "overdue" }
];

const timetableToday: TimetableClass[] = [
  { id: 1, subject: "Mathematics", time: "08:00 - 09:00", room: "Room 101", teacher: "Mr. Johnson" },
  { id: 2, subject: "Science", time: "09:15 - 10:15", room: "Lab 2", teacher: "Ms. Smith" },
  { id: 3, subject: "English", time: "10:30 - 11:30", room: "Room 105", teacher: "Mrs. Davis" },
  { id: 4, subject: "History", time: "12:30 - 13:30", room: "Room 208", teacher: "Dr. Wilson" },
  { id: 5, subject: "Physical Education", time: "14:00 - 15:00", room: "Gym", teacher: "Coach Brown" }
];

const gradesData = [
  { subject: "Math", grade: 92 },
  { subject: "Science", grade: 88 },
  { subject: "English", grade: 85 },
  { subject: "History", grade: 78 },
  { subject: "Art", grade: 95 },
];

const attendanceData = [
  { month: "Jan", attendance: 98 },
  { month: "Feb", attendance: 96 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 88 },
  { month: "May", attendance: 90 },
  { month: "Jun", attendance: 94 },
  { month: "Jul", attendance: 100 },
  { month: "Aug", attendance: 98 },
  { month: "Sep", attendance: 95 },
  { month: "Oct", attendance: 92 },
  { month: "Nov", attendance: 90 },
  { month: "Dec", attendance: 96 },
];

const upcomingExams = [
  { id: 1, subject: "Mathematics", date: "April 15, 2025", time: "10:00 AM", room: "Hall A" },
  { id: 2, subject: "Science", date: "April 18, 2025", time: "09:00 AM", room: "Lab 3" },
  { id: 3, subject: "English", date: "April 22, 2025", time: "11:00 AM", room: "Hall B" }
];

const notifications = [
  { id: 1, title: "New Assignment Added", message: "Science Lab Report due on April 15", time: "2 hours ago" },
  { id: 2, title: "Grade Posted", message: "You received an A in Mathematics Quiz", time: "Yesterday" },
  { id: 3, title: "Reminder", message: "History Essay due in 3 days", time: "Yesterday" },
  { id: 4, title: "Teacher Announcement", message: "Science class will be in Lab 3 tomorrow", time: "1 day ago" }
];

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "bot", message: "Hello! How can I help you with your studies today?" }
  ]);

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

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Send message to AI assistant
  const sendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages([
      ...chatMessages,
      { id: chatMessages.length + 1, sender: "user", message: chatInput }
    ]);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          sender: "bot", 
          message: `I can help you understand more about ${chatInput}. What specific questions do you have?` 
        }
      ]);
    }, 1000);
    
    setChatInput("");
  };

  // Handle key press for chat
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <DashboardLayout userRole="student">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-6"
      >
        {/* Header with welcome message */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Hello, John Doe</h1>
            <p className="text-muted-foreground">Welcome back to your dashboard</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Today's Schedule
            </Button>
            <Button size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>
        
        {/* Main dashboard content */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Daily Schedule */}
              <motion.div variants={fadeIn} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Today's Schedule</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        Full Timetable
                      </Button>
                    </div>
                    <CardDescription>Wednesday, April 9, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {timetableToday.map((classItem) => (
                        <motion.div 
                          key={classItem.id} 
                          variants={listItem}
                          className="flex items-center p-3 bg-muted/40 rounded-lg"
                        >
                          <div className="w-12 h-12 flex flex-col items-center justify-center bg-primary/10 rounded-lg mr-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{classItem.subject}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {classItem.time} • {classItem.room} • {classItem.teacher}
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {classItem.time.split(' - ')[0]}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Assignments Status */}
              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment Status</CardTitle>
                    <CardDescription>Your current workload</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Completed</span>
                          <span className="text-sm text-muted-foreground">1/4</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Pending</span>
                          <span className="text-sm text-muted-foreground">2/4</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Overdue</span>
                          <span className="text-sm text-muted-foreground">1/4</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">Upcoming Deadlines</h4>
                        <div className="space-y-2">
                          {assignmentData
                            .filter(a => a.status === "pending")
                            .slice(0, 2)
                            .map(assignment => (
                              <div key={assignment.id} className="flex justify-between items-center p-2 rounded-md bg-muted/30">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                                  <div className="text-sm">{assignment.title}</div>
                                </div>
                                <div className="text-xs text-muted-foreground">{assignment.dueDate}</div>
                              </div>
                            ))}
                        </div>
                        
                        <Button variant="ghost" size="sm" className="w-full mt-3">
                          View All Assignments
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Grades Chart */}
              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Grade Overview</CardTitle>
                      <Badge variant="outline">Term 2</Badge>
                    </div>
                    <CardDescription>Your current academic performance</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <BarChart
                      className="h-[280px]"
                      data={gradesData}
                      index="subject"
                      categories={["grade"]}
                      colors={["violet"]}
                      valueFormatter={(value) => `${value}%`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Attendance Chart */}
              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Attendance Records</CardTitle>
                      <Badge className="bg-green-500">95% Overall</Badge>
                    </div>
                    <CardDescription>Monthly attendance percentage</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <LineChart
                      className="h-[280px]"
                      data={attendanceData}
                      index="month"
                      categories={["attendance"]}
                      colors={["green"]}
                      valueFormatter={(value) => `${value}%`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Notifications and Exams */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Notifications */}
              <motion.div variants={fadeIn} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Notifications</CardTitle>
                      <Button variant="ghost" size="sm">
                        Mark All as Read
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                          <div className="mt-0.5">
                            <BellRing className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{notification.title}</div>
                            <div className="text-sm text-muted-foreground">{notification.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Notifications
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Upcoming Exams */}
              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Exams</CardTitle>
                    <CardDescription>Prepare for these exams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingExams.map((exam) => (
                        <div key={exam.id} className="flex flex-col p-3 rounded-lg bg-muted/40">
                          <div className="flex items-center">
                            <BookOpenCheck className="h-4 w-4 text-primary mr-2" />
                            <div className="font-medium">{exam.subject}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-1 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {exam.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {exam.time}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="ghost" size="sm" className="w-full">
                        View Exam Schedule
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          {/* Timetable Tab */}
          <TabsContent value="timetable">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Weekly Timetable</CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
                <CardDescription>Your class schedule for the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <div className="grid grid-cols-6 border-b">
                    <div className="p-4 font-medium text-center border-r">Time</div>
                    <div className="p-4 font-medium text-center border-r">Monday</div>
                    <div className="p-4 font-medium text-center border-r">Tuesday</div>
                    <div className="p-4 font-medium text-center border-r">Wednesday</div>
                    <div className="p-4 font-medium text-center border-r">Thursday</div>
                    <div className="p-4 font-medium text-center">Friday</div>
                  </div>
                  
                  {/* This would be generated dynamically based on the student's actual timetable */}
                  {/* Here's a simplified static example */}
                  {["08:00 - 09:00", "09:15 - 10:15", "10:30 - 11:30", "12:30 - 13:30", "14:00 - 15:00"].map((timeSlot, index) => (
                    <div key={index} className="grid grid-cols-6 border-b last:border-b-0">
                      <div className="p-2 text-sm text-center border-r">{timeSlot}</div>
                      <div className="p-2 text-sm border-r bg-blue-50 dark:bg-blue-950/20">{index === 0 ? "Math" : index === 1 ? "English" : index === 2 ? "History" : index === 3 ? "Art" : "P.E."}</div>
                      <div className="p-2 text-sm border-r bg-green-50 dark:bg-green-950/20">{index === 0 ? "Science" : index === 1 ? "Geography" : index === 2 ? "Math" : index === 3 ? "Music" : "ICT"}</div>
                      <div className="p-2 text-sm border-r bg-purple-50 dark:bg-purple-950/20">{index === 0 ? "Math" : index === 1 ? "Science" : index === 2 ? "English" : index === 3 ? "History" : "P.E."}</div>
                      <div className="p-2 text-sm border-r bg-amber-50 dark:bg-amber-950/20">{index === 0 ? "English" : index === 1 ? "Math" : index === 2 ? "Science" : index === 3 ? "P.E." : "Geography"}</div>
                      <div className="p-2 text-sm bg-pink-50 dark:bg-pink-950/20">{index === 0 ? "Science" : index === 1 ? "History" : index === 2 ? "Art" : index === 3 ? "Math" : "English"}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Assignments & Homework</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search assignments..."
                        className="w-[200px] pl-8 h-9"
                      />
                    </div>
                    <Button size="sm">
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      Submit Work
                    </Button>
                  </div>
                </div>
                <CardDescription>Track and manage your assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <div className="grid grid-cols-5 p-4 bg-muted/50">
                    <div className="font-medium">Assignment</div>
                    <div className="font-medium">Subject</div>
                    <div className="font-medium">Due Date</div>
                    <div className="font-medium">Status</div>
                    <div className="font-medium text-right">Actions</div>
                  </div>
                  
                  {assignmentData.map((assignment) => (
                    <div key={assignment.id} className="grid grid-cols-5 p-4 border-t">
                      <div className="font-medium">{assignment.title}</div>
                      <div>{assignment.subject}</div>
                      <div className="text-muted-foreground">{assignment.dueDate}</div>
                      <div>
                        <Badge 
                          variant={assignment.status === "completed" ? "default" : 
                                  assignment.status === "pending" ? "outline" : "destructive"}
                        >
                          {assignment.status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {assignment.status === "overdue" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          {assignment.grade && ` - ${assignment.grade}`}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8 px-2">
                          View
                        </Button>
                        {assignment.status !== "completed" && (
                          <Button size="sm" className="h-8 px-2">
                            <Upload className="h-3 w-3 mr-1" />
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Assignment Resources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {["Mathematics Handbook", "Science Lab Guidelines", "Essay Writing Guide"].map((resource, index) => (
                      <Card key={index} className="flex flex-col">
                        <CardContent className="flex items-center p-4">
                          <FileText className="h-10 w-10 text-primary mr-3" />
                          <div className="flex-1">
                            <h4 className="font-medium">{resource}</h4>
                            <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                          </div>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Upcoming Exams */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Exam Schedule</CardTitle>
                  <CardDescription>Your upcoming examinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-4 p-4 bg-muted/50">
                      <div className="font-medium">Subject</div>
                      <div className="font-medium">Date</div>
                      <div className="font-medium">Time</div>
                      <div className="font-medium">Location</div>
                    </div>
                    
                    {upcomingExams.map((exam) => (
                      <div key={exam.id} className="grid grid-cols-4 p-4 border-t hover:bg-muted/20">
                        <div className="font-medium">{exam.subject}</div>
                        <div>{exam.date}</div>
                        <div>{exam.time}</div>
                        <div>{exam.room}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Past Exam Results</h3>
                    <div className="space-y-3">
                      {[
                        { subject: "Mathematics Mid-Term", date: "Feb 15, 2025", grade: "A-" },
                        { subject: "Science Quiz 3", date: "Mar 10, 2025", grade: "B+" },
                        { subject: "English Literature Test", date: "Mar 28, 2025", grade: "A" }
                      ].map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                          <div>
                            <div className="font-medium">{result.subject}</div>
                            <div className="text-sm text-muted-foreground">{result.date}</div>
                          </div>
                          <Badge variant="outline" className="text-base font-bold">
                            {result.grade}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Exam Resources & Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Exam Resources</CardTitle>
                  <CardDescription>Study materials and tips</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { title: "Math Revision Guide", type: "PDF", size: "4.2 MB" },
                      { title: "Science Formula Sheet", type: "PDF", size: "1.8 MB" },
                      { title: "History Timeline Notes", type: "DOCX", size: "2.1 MB" }
                    ].map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-primary mr-2" />
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-xs text-muted-foreground">{resource.type} • {resource.size}</div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-xs gap-1">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Study Tips</h4>
                    <div className="space-y-2">
                      {[
                        "Create a study schedule and stick to it",
                        "Use past papers to practice exam questions",
                        "Take regular breaks to maintain focus",
                        "Form study groups with classmates"
                      ].map((tip, index) => (
                        <div key={index} className="flex items-start p-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs text-primary font-medium">{index + 1}</span>
                          </div>
                          <div className="text-sm">{tip}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <Button className="w-full gap-1">
                    <BookmarkIcon className="h-4 w-4" />
                    Access Study Portal
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Performance Analysis */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Performance Analysis</CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <BarChart4 className="h-4 w-4" />
                    View Full Analytics
                  </Button>
                </div>
                <CardDescription>Track your progress across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-4">Performance by Subject</h4>
                    <div className="space-y-4">
                      {gradesData.map((subject) => (
                        <div key={subject.subject} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{subject.subject}</span>
                            <span className="text-sm font-medium">{subject.grade}%</span>
                          </div>
                          <Progress value={subject.grade} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-4">Recommended Focus Areas</h4>
                    <div className="space-y-3">
                      {[
                        { area: "Improve History essay writing", resource: "Essay Structure Guide", link: "#" },
                        { area: "Practice algebra problems", resource: "Algebra Worksheet", link: "#" },
                        { area: "Review science lab techniques", resource: "Lab Manual", link: "#" }
                      ].map((item, index) => (
                        <div key={index} className="p-3 rounded-lg bg-muted/40">
                          <div className="font-medium">{item.area}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-muted-foreground">Resource: {item.resource}</span>
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs gap-1">
                              Access
                              <ArrowUpRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* AI Assistant Tab */}
          <TabsContent value="assistant" className="space-y-4">
            <Card className="h-[calc(100vh-250px)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI Learning Assistant</CardTitle>
                  <Badge variant="outline" className="gap-1">
                    <Brain className="h-3 w-3" />
                    EduAI v2.0
                  </Badge>
                </div>
                <CardDescription>Ask questions about your subjects, assignments, or study tips</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-[calc(100%-5rem)]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Ask any question about your studies..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-10"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full aspect-square"
                      onClick={sendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Quick Questions</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "How do I solve quadratic equations?",
                      "Help with my history essay",
                      "Explain photosynthesis",
                      "Tips for exam preparation"
                    ].map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setChatInput(question);
                          // Optional: Automatically send after a delay
                          setTimeout(sendMessage, 500);
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
