
import { useState } from "react";
import { motion } from "framer-motion";
import { ParentLayout } from "@/components/layout/parent-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChildOverviewCard } from "@/components/parent/child-overview-card";
import { RecentPayments } from "@/components/parent/recent-payments";
import { RecentMessages } from "@/components/parent/recent-messages";
import { LineChart, BarChart } from "@/components/ui/recharts";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  BookOpen,
  DollarSign,
  User,
  MessageSquare,
  ChevronRight,
  Bell,
  FileText,
  CreditCard,
  Calendar as CalendarIcon,
  ArrowRight,
  Sparkles,
  BarChart2
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

  // Quick action buttons for mobile FAB
  const quickActions = [
    { label: "Pay Fees", icon: CreditCard, path: "/parent/payments" },
    { label: "Contact Teacher", icon: MessageSquare, path: "/parent/messages" },
    { label: "View Report Card", icon: FileText, path: "/parent/reports" }
  ];

  return (
    <ParentLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-6"
      >
        {/* Welcome Banner */}
        <motion.div variants={fadeIn} className="rounded-xl bg-gradient-to-r from-primary/80 to-primary p-6 text-primary-foreground">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome, Mrs. Thompson</h1>
              <p className="mt-1 text-primary-foreground/90">
                It's {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Pay Fees
              </Button>
              <Button size="sm" variant="secondary" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Message Teacher
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Child Selector Cards - Desktop & Tablet */}
        <motion.div variants={fadeIn} className="hidden sm:flex gap-4">
          {childrenData.map((child) => (
            <Card 
              key={child.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
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
        </motion.div>

        {/* Child Selector Dropdown - Mobile Only */}
        <motion.div variants={fadeIn} className="sm:hidden">
          <div className="bg-muted p-2 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedChild.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedChild.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedChild.grade}</p>
              </div>
            </div>
            <select 
              className="bg-transparent border-0 text-sm font-medium focus:outline-none focus:ring-0"
              value={selectedChild.id}
              onChange={(e) => {
                const childId = parseInt(e.target.value);
                const child = childrenData.find(c => c.id === childId);
                if (child) setSelectedChild(child);
              }}
            >
              {childrenData.map(child => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1 - Left */}
          <div className="space-y-6">
            {/* Child Overview Card */}
            <motion.div variants={fadeIn}>
              <ChildOverviewCard
                name={selectedChild.name}
                grade={selectedChild.grade}
                avatarSrc={selectedChild.avatar}
                attendance={selectedChild.attendance}
                recentGrade={selectedChild.recentGrade}
                nextExam={selectedChild.nextExam}
              />
            </motion.div>

            {/* Quick Actions - Desktop & Tablet Only */}
            <motion.div variants={fadeIn} className="hidden sm:block">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                  <CardDescription>Frequently used actions</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {quickActions.map((action, idx) => (
                    <Button key={idx} variant="outline" className="justify-start h-11 px-4" asChild>
                      <a href={action.path}>
                        <action.icon className="mr-2 h-4 w-4 text-primary" />
                        {action.label}
                        <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* School Announcements - Desktop & Tablet Only */}
            <motion.div variants={fadeIn} className="hidden sm:block">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">School Announcements</CardTitle>
                  <CardDescription>Latest updates from school</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/40 p-3 rounded-lg border border-border">
                    <div className="flex items-start gap-2">
                      <div className="bg-amber-500/20 p-1 rounded">
                        <Bell className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Science Fair Registration</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Registration deadline extended to April 20th. All students are encouraged to participate.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/40 p-3 rounded-lg border border-border">
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-500/20 p-1 rounded">
                        <CalendarIcon className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Summer Break Schedule</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Summer break begins on June 15th. Classes will resume on August 25th.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Column 2 - Middle */}
          <div className="space-y-6">
            {/* Academic Performance Chart */}
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Academic Performance</CardTitle>
                    <Badge variant="outline" className="gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      Term 2
                    </Badge>
                  </div>
                  <CardDescription>Subject performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <BarChart
                      data={academicProgress}
                      index="subject"
                      categories={["current", "previous"]}
                      colors={["purple", "blue"]}
                      valueFormatter={(value) => `${value}%`}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm">
                    <div className="flex flex-col items-center p-2 bg-muted/40 rounded-lg">
                      <span className="text-muted-foreground text-xs">Term Average</span>
                      <span className="text-lg font-bold text-primary">87.6%</span>
                      <div className="flex items-center">
                        <Sparkles className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-500">+3.2%</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-muted/40 rounded-lg">
                      <span className="text-muted-foreground text-xs">Class Rank</span>
                      <span className="text-lg font-bold text-primary">5th</span>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground">of 32 students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Attendance Chart */}
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Attendance Overview</CardTitle>
                    <Badge variant="outline" className="text-green-500 bg-green-50 dark:bg-green-500/10">
                      95% Overall
                    </Badge>
                  </div>
                  <CardDescription>Monthly attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <LineChart
                      data={attendanceData}
                      index="month"
                      categories={["attendance"]}
                      colors={["green"]}
                      valueFormatter={(value) => `${value}%`}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-muted/40 rounded-lg">
                      <p className="text-muted-foreground">Present</p>
                      <p className="font-bold text-sm mt-1">162 days</p>
                    </div>
                    <div className="p-2 bg-muted/40 rounded-lg">
                      <p className="text-muted-foreground">Absent</p>
                      <p className="font-bold text-sm mt-1">8 days</p>
                    </div>
                    <div className="p-2 bg-muted/40 rounded-lg">
                      <p className="text-muted-foreground">Late</p>
                      <p className="font-bold text-sm mt-1">5 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Payments - Mobile Only */}
            <motion.div variants={fadeIn} className="md:hidden">
              <RecentPayments isLoading={false} showAll={false} />
            </motion.div>
          </div>

          {/* Column 3 - Right */}
          <div className="space-y-6 lg:col-span-1 md:col-span-2">
            {/* Recent Messages */}
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">Recent Messages</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/parent/messages">View All <ChevronRight className="ml-1 h-4 w-4" /></a>
                  </Button>
                </CardHeader>
                <CardContent>
                  <RecentMessages isLoading={false} showAll={false} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">Upcoming Events</CardTitle>
                  <Button variant="ghost" size="sm">
                    View Calendar <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start p-3 bg-muted/40 rounded-lg">
                        <div className="w-12 h-12 flex flex-col items-center justify-center bg-primary/10 rounded-lg mr-3">
                          <span className="text-xs text-primary">Apr</span>
                          <span className="text-lg font-bold text-primary">{event.date.split(" ")[1].replace(",", "")}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{event.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">{event.time} • {event.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Payments - Desktop & Tablet Only */}
            <motion.div variants={fadeIn} className="hidden md:block">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">Recent Payments</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/parent/payments">View All <ChevronRight className="ml-1 h-4 w-4" /></a>
                  </Button>
                </CardHeader>
                <CardContent>
                  <RecentPayments isLoading={false} showAll={false} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Mobile FAB */}
        <div className="fixed bottom-6 right-6 z-50 sm:hidden">
          <div className="relative group">
            <Button 
              size="icon" 
              className="h-12 w-12 rounded-full shadow-lg"
              onClick={() => {
                const fabMenu = document.getElementById('fab-menu');
                if (fabMenu) {
                  fabMenu.classList.toggle('hidden');
                }
              }}
            >
              <Plus className="h-6 w-6" />
            </Button>
            <div 
              id="fab-menu" 
              className="hidden absolute bottom-16 right-0 flex flex-col gap-2 items-end"
            >
              {quickActions.map((action, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="bg-background shadow rounded-full py-1 px-3 text-sm">
                    {action.label}
                  </span>
                  <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full shadow-md" asChild>
                    <a href={action.path}>
                      <action.icon className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </ParentLayout>
  );
};

// Need to add the Plus icon since it's used in the Mobile FAB
const Plus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default ParentDashboard;
