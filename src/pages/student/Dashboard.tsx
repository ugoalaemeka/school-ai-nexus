
import React, { useState } from "react";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart } from "@/components/ui/recharts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  FileText,
  GraduationCap,
  MessageSquare,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Bell,
  Upload,
  BookMarked,
  PieChart as PieChartIcon,
  CheckCircle
} from "lucide-react";

const StudentDashboard = () => {
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

  // Sample data
  const todayClasses = [
    { subject: "Mathematics", time: "08:30 - 09:30", teacher: "Mrs. Jenkins", room: "Room 101" },
    { subject: "Science", time: "10:00 - 11:00", teacher: "Mr. Phillips", room: "Lab 2" },
    { subject: "English", time: "11:30 - 12:30", teacher: "Ms. Rodriguez", room: "Room 105" },
    { subject: "History", time: "14:00 - 15:00", teacher: "Dr. Thompson", room: "Room 203" }
  ];
  
  const assignments = [
    { id: 1, subject: "Mathematics", title: "Algebra Assignment", due: "Today, 11:59 PM", progress: 75, status: "in-progress" },
    { id: 2, subject: "Science", title: "Chemistry Lab Report", due: "Tomorrow, 09:00 AM", progress: 30, status: "in-progress" },
    { id: 3, subject: "English", title: "Essay Submission", due: "April 15, 11:59 PM", progress: 100, status: "completed" }
  ];
  
  const pinnedResources = [
    { title: "Mathematics Formulas", type: "PDF", date: "April 5, 2025", size: "2.4 MB", pinned: true },
    { title: "Science Lab Guidelines", type: "PDF", date: "April 3, 2025", size: "1.8 MB", pinned: true },
    { title: "History Timeline Video", type: "Video", date: "April 1, 2025", size: "45 MB", pinned: true }
  ];

  const messages = [
    { sender: "Mrs. Jenkins", content: "Please complete your assignment by tomorrow", time: "1 hour ago", read: false },
    { sender: "Principal Davis", content: "Announcement: Parent-Teacher meeting next week", time: "Yesterday", read: true }
  ];

  const notifications = [
    { title: "Exam Schedule Released", description: "Final exams start May 15th", time: "2 hours ago", icon: Bell },
    { title: "New Resource Available", description: "Chemistry study guide uploaded", time: "Yesterday", icon: BookOpen }
  ];

  // Mock chart data for performance
  const performanceData = [
    { subject: "Math", score: 85 },
    { subject: "Science", score: 92 },
    { subject: "English", score: 78 },
    { subject: "History", score: 88 },
    { subject: "Art", score: 95 }
  ];

  // Mock attendance data
  const attendanceData = [
    { month: "Jan", attendance: 98 },
    { month: "Feb", attendance: 95 },
    { month: "Mar", attendance: 100 },
    { month: "Apr", attendance: 97 },
    { month: "May", attendance: 92 },
    { month: "Jun", attendance: 96 }
  ];

  return (
    <StudentSidebar>
      <div className="container py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariant}
          className="space-y-6"
        >
          {/* Header with Welcome and Quick Stats */}
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, James Smith</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Calendar className="h-4 w-4" />
                April 11, 2025
              </Button>
              <Link to="/student/assignments">
                <Button variant="default" size="sm" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Submit Assignment
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats Cards */}
          <motion.div variants={itemVariant}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Next: Science at 10:00 AM
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    1 due today, 1 due tomorrow
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.5%</div>
                  <p className="text-xs text-green-500 mt-1">
                    Excellent attendance rate
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">A-</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    88.4% overall performance
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <motion.div variants={itemVariant} className="lg:col-span-1 space-y-6">
              {/* Today's Schedule */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Today's Schedule</CardTitle>
                    <Link to="/student/timetable">
                      <Button variant="ghost" size="sm" className="gap-1">
                        View All <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Your classes for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todayClasses.map((cls, index) => (
                    <div key={index} className="flex flex-col p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{cls.subject}</div>
                        <Badge variant="outline" className="ml-auto">
                          {cls.time}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {cls.teacher} • {cls.room}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Current term grades</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <BarChart
                    data={performanceData}
                    index="subject"
                    categories={["score"]}
                    colors={["violet"]}
                    valueFormatter={(value) => `${value}%`}
                    className="h-64"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Middle Column */}
            <motion.div variants={itemVariant} className="lg:col-span-1 space-y-6">
              {/* Assignments */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pending Assignments</CardTitle>
                    <Link to="/student/assignments">
                      <Button variant="ghost" size="sm" className="gap-1">
                        View All <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Work due soon</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="font-normal">
                          {assignment.subject}
                        </Badge>
                        {assignment.status === "completed" ? (
                          <Badge className="bg-green-500">Completed</Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                            <Clock className="h-3 w-3 mr-1" />
                            Due {assignment.due}
                          </Badge>
                        )}
                      </div>
                      <div className="font-medium mt-2">{assignment.title}</div>
                      {assignment.status === "in-progress" && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{assignment.progress}%</span>
                          </div>
                          <Progress value={assignment.progress} className="h-1.5" />
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Link to="/student/assignments" className="w-full">
                          <Button size="sm" variant="default" className="w-full">
                            {assignment.status === "completed" ? "View Feedback" : "Continue"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Attendance Chart */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Attendance History</CardTitle>
                  <CardDescription>This academic year</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <LineChart
                    data={attendanceData}
                    index="month"
                    categories={["attendance"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `${value}%`}
                    className="h-64"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={itemVariant} className="lg:col-span-1 space-y-6">
              {/* Pinned Resources */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pinned Resources</CardTitle>
                    <Link to="/student/resources">
                      <Button variant="ghost" size="sm" className="gap-1">
                        Browse Library <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Your important study materials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pinnedResources.map((resource, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/40 rounded-lg transition-colors">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {resource.type === "PDF" ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{resource.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {resource.type} • {resource.size} • Added {resource.date}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Link to="/student/resources">
                    <Button variant="outline" className="w-full">
                      View All Resources
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Messages */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Messages</CardTitle>
                    <Link to="/student/messages">
                      <Button variant="ghost" size="sm" className="gap-1">
                        Inbox <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Communication from teachers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex gap-3 p-3 rounded-lg ${message.read ? "bg-muted/40" : "bg-primary/5 border border-primary/10"} hover:bg-muted/60 transition-colors`}>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {message.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{message.sender}</div>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm mt-1 line-clamp-2">{message.content}</p>
                      </div>
                      {!message.read && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      )}
                    </div>
                  ))}
                  <Link to="/student/messages">
                    <Button variant="outline" className="w-full">
                      View All Messages
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>System alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <notification.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{notification.title}</div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </StudentSidebar>
  );
};

export default StudentDashboard;
