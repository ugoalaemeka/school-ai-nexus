import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LineChart, BarChart } from "@/components/ui/recharts";
import { Badge } from "@/components/ui/badge";
import { PerformanceChart } from "@/components/parent/performance-chart";
import { AttendanceCalendar } from "@/components/parent/attendance-calendar";
import { RecentPayments } from "@/components/parent/recent-payments";
import { RecentMessages } from "@/components/parent/recent-messages";
import { ChildOverviewCard } from "@/components/parent/child-overview-card";
import {
  Calendar,
  Clock,
  Download,
  FileText,
  BookOpen,
  DollarSign,
  User,
  Users,
  MessageSquare,
  ChevronRight,
  Bell,
  Backpack
} from "lucide-react";

const childrenData = [
  {
    id: 1,
    name: "Emma Thompson",
    grade: "Grade 8",
    avatar: "",
    attendance: "95%",
    recentGrade: "A",
    nextExam: "Math - April 15"
  },
  {
    id: 2,
    name: "Noah Thompson",
    grade: "Grade 5",
    avatar: "",
    attendance: "92%",
    recentGrade: "B+",
    nextExam: "Science - April 18"
  }
];

const attendanceData = [
  { month: "Jan", attendance: 98 },
  { month: "Feb", attendance: 95 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 95 },
  { month: "May", attendance: 100 },
  { month: "Jun", attendance: 98 },
  { month: "Jul", attendance: 95 },
  { month: "Aug", attendance: 92 },
  { month: "Sep", attendance: 90 },
  { month: "Oct", attendance: 94 },
  { month: "Nov", attendance: 96 },
  { month: "Dec", attendance: 98 },
];

const academicProgress = [
  { subject: "Math", current: 85, previous: 78 },
  { subject: "Science", current: 92, previous: 88 },
  { subject: "English", current: 78, previous: 75 },
  { subject: "History", current: 88, previous: 80 },
  { subject: "Art", current: 95, previous: 90 },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "April 15, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "School Auditorium"
  },
  {
    id: 2,
    title: "Math Quiz",
    date: "April 18, 2025",
    time: "10:00 AM",
    location: "Room 205"
  },
  {
    id: 3,
    title: "Science Fair",
    date: "April 27, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "School Hall"
  }
];

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(childrenData[0]);
  const [activeTab, setActiveTab] = useState("overview");

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
    <DashboardLayout userRole="parent">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-6"
      >
        {/* Header with welcome message */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Hello, Mrs. Thompson</h1>
            <p className="text-muted-foreground">Welcome to your Parent Dashboard</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button size="sm" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Teacher
            </Button>
          </div>
        </div>

        {/* Child selector cards */}
        <motion.div variants={fadeIn}>
          <div className="flex flex-wrap gap-4">
            {childrenData.map((child) => (
              <Card 
                key={child.id} 
                className={`w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)] cursor-pointer transition-all hover:shadow-md ${
                  selectedChild.id === child.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedChild(child)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {child.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">{child.grade}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {selectedChild.id === child.id ? 'Selected' : 'Select'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
       
        {/* Main dashboard content */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <motion.div variants={fadeIn}>
              <ChildOverviewCard 
                childName={selectedChild.name}
                grade={selectedChild.grade}
                avatarSrc={selectedChild.avatar}
                attendance={selectedChild.attendance}
                recentGrade={selectedChild.recentGrade}
                nextExam={selectedChild.nextExam}
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recent Performance */}
              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Academic Performance</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <FileText className="h-4 w-4" />
                        Full Report
                      </Button>
                    </div>
                    <CardDescription>Latest grades and academic progress</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <PerformanceChart isLoading={false} />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Attendance Overview */}
              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Attendance Overview</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Calendar className="h-4 w-4" />
                        Calendar
                      </Button>
                    </div>
                    <CardDescription>Monthly attendance summary</CardDescription>
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
            
            {/* Upcoming Events and Payments Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Upcoming Events */}
              <motion.div variants={fadeIn}>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Scheduled events and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-center p-3 bg-muted/40 rounded-lg">
                          <div className="w-12 h-12 flex flex-col items-center justify-center bg-primary/10 rounded-lg mr-3">
                            <span className="text-xs text-primary">Apr</span>
                            <span className="text-lg font-bold text-primary">{event.date.split(" ")[1].replace(",", "")}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">{event.time} • {event.location}</div>
                          </div>
                          <Button size="sm" variant="outline">Details</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Recent Payments */}
              <motion.div variants={fadeIn}>
                <RecentPayments isLoading={false} showAll={true} />
              </motion.div>
            </div>
            
            {/* Recent Messages */}
            <motion.div variants={fadeIn}>
              <RecentMessages isLoading={false} showAll={true} />
            </motion.div>
          </TabsContent>
          
          {/* Academics Tab */}
          <TabsContent value="academics" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Academic Progress</CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export Report
                  </Button>
                </div>
                <CardDescription>Subject-wise performance compared to previous term</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <BarChart
                  className="h-[380px]"
                  data={academicProgress}
                  index="subject"
                  categories={["current", "previous"]}
                  colors={["violet", "blue"]}
                  valueFormatter={(value) => `${value}%`}
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Assignment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Completed</span>
                      </div>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">In Progress</span>
                      </div>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span className="text-sm">Overdue</span>
                      </div>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Latest Grades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Math Quiz</span>
                      <Badge>A-</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Science Project</span>
                      <Badge>B+</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">English Essay</span>
                      <Badge>A</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">History Test</span>
                      <Badge>B</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Upcoming Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {[
                      { subject: "Mathematics", date: "April 15" },
                      { subject: "Science", date: "April 18" },
                      { subject: "English", date: "April 22" },
                      { subject: "Social Studies", date: "April 25" }
                    ].map((exam, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{exam.subject}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{exam.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4">
                    View All Exams
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <AttendanceCalendar isLoading={false} />
          </TabsContent>
          
          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Fee Management</CardTitle>
                  <Button>Make a Payment</Button>
                </div>
                <CardDescription>Manage and track payments for your children</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-muted/40">
                    <CardContent className="p-6">
                      <DollarSign className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-xl font-bold">$1,850</h3>
                      <p className="text-sm text-muted-foreground">Total Paid (2025)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/40">
                    <CardContent className="p-6">
                      <DollarSign className="h-8 w-8 text-yellow-500 mb-2" />
                      <h3 className="text-xl font-bold">$450</h3>
                      <p className="text-sm text-muted-foreground">Due Next Month</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/40">
                    <CardContent className="p-6">
                      <FileText className="h-8 w-8 text-green-500 mb-2" />
                      <h3 className="text-xl font-bold">12</h3>
                      <p className="text-sm text-muted-foreground">Payment Receipts</p>
                    </CardContent>
                  </Card>
                </div>
                
                <RecentPayments isLoading={false} showAll={true} />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Communications Tab */}
          <TabsContent value="communications">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle>School Contacts</CardTitle>
                    <CardDescription>Key people you may need to reach</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Mrs. Jenkins", role: "Class Teacher", avatar: "" },
                        { name: "Mr. Phillips", role: "Science Teacher", avatar: "" },
                        { name: "Ms. Rodriguez", role: "Principal", avatar: "" },
                        { name: "Mr. Carter", role: "Admin Officer", avatar: "" }
                      ].map((contact, index) => (
                        <div key={index} className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {contact.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">{contact.role}</div>
                          </div>
                          <Button size="icon" variant="ghost" className="ml-auto">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-8">
                <RecentMessages isLoading={false} showAll={true} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
