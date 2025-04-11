import React from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { BarChart, LineChart, PieChart } from "@/components/ui/recharts";
import {
  Users,
  GraduationCap,
  DollarSign,
  Percent,
  Calendar,
  FileText,
  UserPlus,
  PlusCircle,
  Bell,
  School,
  ChevronRight,
  Download,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Clock,
  MoreHorizontal
} from "lucide-react";

const AdminDashboard = () => {
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
  const summaryStats = [
    { icon: Users, label: "Total Students", value: 1452, change: "+12%", trend: "up" },
    { icon: GraduationCap, label: "Teachers", value: 86, change: "+4%", trend: "up" },
    { icon: DollarSign, label: "Revenue", value: "$854,200", change: "-3%", trend: "down" },
    { icon: Percent, label: "Attendance", value: "92.3%", change: "+2.1%", trend: "up" }
  ];
  
  const upcomingEvents = [
    { title: "Parent-Teacher Meeting", date: "April 15", time: "3:00 PM", location: "Main Hall" },
    { title: "Sports Day", date: "April 18", time: "9:00 AM", location: "School Grounds" },
    { title: "Science Fair", date: "April 22", time: "10:00 AM", location: "Science Block" }
  ];

  const recentEnrollments = [
    { name: "Emily Thompson", grade: "Grade 10", date: "April 7, 2025", status: "pending" },
    { name: "Michael Johnson", grade: "Grade 8", date: "April 6, 2025", status: "approved" },
    { name: "Sophia Martinez", grade: "Grade 11", date: "April 5, 2025", status: "approved" }
  ];

  const recentActivities = [
    { action: "Added new student", user: "Admin Carter", time: "10 minutes ago" },
    { action: "Updated class schedule", user: "Ms. Johnson", time: "1 hour ago" },
    { action: "Processed payment", user: "Finance Office", time: "3 hours ago" }
  ];

  // Mock chart data
  const attendanceData = [
    { month: "Jan", attendance: 92 },
    { month: "Feb", attendance: 94 },
    { month: "Mar", attendance: 91 },
    { month: "Apr", attendance: 95 },
    { month: "May", attendance: 93 },
    { month: "Jun", attendance: 88 }
  ];
  
  const feeData = [
    { name: "Paid", value: 75 },
    { name: "Partial", value: 15 },
    { name: "Unpaid", value: 10 }
  ];

  const distributionData = [
    { name: "Students", value: 1452 },
    { name: "Teachers", value: 86 },
    { name: "Revenue", value: 854200 },
    { name: "Attendance", value: 9230 }
  ];

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
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Admin Carter</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Calendar className="h-4 w-4" />
                April 10, 2025
              </Button>
              <Button variant="default" size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                New Action
              </Button>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariant}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {summaryStats.map((stat, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                        {stat.change} from last month
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <motion.div variants={itemVariant} className="space-y-6">
              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used functions</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1">
                    <UserPlus className="h-5 w-5" />
                    <span>Add Student</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1">
                    <GraduationCap className="h-5 w-5" />
                    <span>Add Teacher</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1">
                    <Calendar className="h-5 w-5" />
                    <span>Schedule</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1">
                    <FileText className="h-5 w-5" />
                    <span>New Report</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Enrollments */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Enrollments</CardTitle>
                    <CardDescription>New students this week</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentEnrollments.map((student, index) => (
                    <div key={index} className="flex items-center p-2 rounded-lg bg-muted/40">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.grade} • {student.date}
                        </div>
                      </div>
                      <Badge variant={student.status === "pending" ? "outline" : "default"}>
                        {student.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Middle Column */}
            <motion.div variants={itemVariant} className="space-y-6 lg:col-span-1">
              {/* Fee Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Fee Summary</CardTitle>
                  <CardDescription>Current payment status</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <PieChart
                    data={distributionData}
                    category="Students"
                    nameKey="name"
                    dataKey="value"
                    colors={["#4f46e5", "#06b6d4", "#8b5cf6", "#f43f5e"]}
                    className="h-full"
                  />
                </CardContent>
              </Card>

              {/* Attendance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trend</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <LineChart
                    data={attendanceData}
                    index="month"
                    categories={["attendance"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `${value}%`}
                    className="h-full"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={itemVariant} className="space-y-6 lg:col-span-1">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>School calendar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-12 h-12 flex flex-col items-center justify-center bg-primary/10 rounded-md">
                        <span className="text-xs text-primary">Apr</span>
                        <span className="text-lg font-bold text-primary">{event.date.split(" ")[1]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.time} • {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    View Calendar
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest actions in the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative before:absolute before:inset-y-0 before:left-2 before:w-[1px] before:bg-muted">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3 relative">
                      <div className="w-4 h-4 rounded-full bg-primary mt-1 z-10"></div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.user} • {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>System alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-3">
                    <div className="flex items-start gap-3">
                      <Bell className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">System Maintenance</p>
                        <p className="text-sm text-muted-foreground">Scheduled for April 15, 2-4 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <School className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">New Feature Available</p>
                        <p className="text-sm text-muted-foreground">AI grading assistant is now live</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AdminSidebar>
  );
};

export default AdminDashboard;
