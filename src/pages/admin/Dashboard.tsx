import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  DollarSign,
  Percent,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Download,
  Printer,
  Clock,
  AlertCircle,
  Bell,
  BookOpen,
  FileText,
  UserPlus,
  PlusCircle,
  School,
  Award
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSearch,
  TablePagination
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const recentEnrollments = [
  {
    id: 1,
    name: "Emily Thompson",
    grade: "Grade 10",
    date: "April 7, 2025",
    status: "Pending",
    statusColor: "bg-yellow-500",
    avatar: "" // Would be an actual URL in production
  },
  {
    id: 2,
    name: "Michael Johnson",
    grade: "Grade 8",
    date: "April 6, 2025",
    status: "Approved",
    statusColor: "bg-green-500",
    avatar: ""
  },
  {
    id: 3,
    name: "Sophia Martinez",
    grade: "Grade 11",
    date: "April 5, 2025",
    status: "Approved",
    statusColor: "bg-green-500",
    avatar: ""
  },
  {
    id: 4,
    name: "Jacob Wilson",
    grade: "Grade 7",
    date: "April 4, 2025",
    status: "Approved",
    statusColor: "bg-green-500",
    avatar: ""
  }
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
    title: "Annual Sports Day",
    date: "April 20, 2025",
    time: "8:00 AM - 4:00 PM",
    location: "School Ground"
  },
  {
    id: 3,
    title: "Science Fair",
    date: "April 27, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Main Hall"
  }
];

const userStatistics = [
  { name: "Students", count: 1245, icon: Users, change: 12, up: true },
  { name: "Faculty & Staff", count: 82, icon: GraduationCap, change: 4, up: true },
  { name: "Fee Collection", count: "$854,200", icon: DollarSign, change: 85, percent: true },
  { name: "Attendance Rate", count: "93.7%", icon: Percent, change: 2.1, up: true }
];

const recentActivities = [
  { id: 1, action: "Added new student", user: "Admin Carter", time: "10 minutes ago" },
  { id: 2, action: "Updated class schedule", user: "Ms. Johnson", time: "1 hour ago" },
  { id: 3, action: "Processed payment", user: "Finance Office", time: "3 hours ago" },
  { id: 4, action: "Created exam timetable", user: "Academic Dept", time: "Yesterday" }
];

const students = [
  { id: 1, name: "Alice Smith", grade: "Grade 9A", attendance: "95%", fees: "Paid", performance: "Excellent", status: "Active" },
  { id: 2, name: "Bob Johnson", grade: "Grade 10B", attendance: "88%", fees: "Partial", performance: "Good", status: "Active" },
  { id: 3, name: "Charlie Brown", grade: "Grade 8C", attendance: "92%", fees: "Paid", performance: "Very Good", status: "Active" },
  { id: 4, name: "Diana Prince", grade: "Grade 11A", attendance: "98%", fees: "Paid", performance: "Excellent", status: "Active" },
  { id: 5, name: "Edward Martin", grade: "Grade 9B", attendance: "85%", fees: "Overdue", performance: "Average", status: "Pending" },
];

const teachers = [
  { id: 1, name: "Mrs. Jenkins", subject: "Mathematics", classes: "4", students: "120" },
  { id: 2, name: "Mr. Phillips", subject: "Science", classes: "3", students: "95" },
  { id: 3, name: "Ms. Rodriguez", subject: "English", classes: "5", students: "150" },
  { id: 4, name: "Dr. Thompson", subject: "History", classes: "3", students: "85" },
];

const attendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 94 },
  { month: "Mar", attendance: 91 },
  { month: "Apr", attendance: 95 },
  { month: "May", attendance: 93 },
  { month: "Jun", attendance: 88 },
  { month: "Jul", attendance: 92 },
  { month: "Aug", attendance: 94 },
  { month: "Sep", attendance: 96 },
  { month: "Oct", attendance: 91 },
  { month: "Nov", attendance: 93 },
  { month: "Dec", attendance: 90 },
];

const performanceData = [
  { name: "A", students: 65 },
  { name: "B", students: 115 },
  { name: "C", students: 98 },
  { name: "D", students: 27 },
  { name: "F", students: 8 },
];

const feeData = [
  { name: "Paid", value: 75 },
  { name: "Partial", value: 15 },
  { name: "Unpaid", value: 10 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

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
        delayChildren: 0.2
      }
    }
  };

  return (
    <AdminLayout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">School management overview and key metrics</p>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Stats cards */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {userStatistics.map((stat, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.count}</div>
                      <p className="text-xs text-muted-foreground flex items-center">
                        {stat.up ? (
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={stat.up ? "text-green-500" : "text-red-500"}>
                          {stat.percent ? "" : "↑ "}{stat.change}{stat.percent ? "%" : "%"}
                        </span>
                        {stat.percent ? " of target" : " from last term"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col gap-1">
                      <UserPlus className="h-5 w-5" />
                      <span>Add Student</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-1">
                      <GraduationCap className="h-5 w-5" />
                      <span>Add Teacher</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-1">
                      <PlusCircle className="h-5 w-5" />
                      <span>Create Class</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-1">
                      <Calendar className="h-5 w-5" />
                      <span>Schedule Event</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Recent Enrollments */}
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Enrollments</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1">
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>New students enrolled this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEnrollments.map((student) => (
                      <div key={student.id} className="flex items-center p-3 bg-muted/40 rounded-lg">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.grade} • Enrolled: {student.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${student.statusColor}`}></div>
                            <span className="text-sm">{student.status}</span>
                          </div>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Upcoming Events */}
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming School Events</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" /> View Calendar
                    </Button>
                  </div>
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
          </TabsContent>
          
          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View, search and manage all students</CardDescription>
              </CardHeader>
              <CardContent>
                <TableSearch>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search students..."
                        className="w-[250px] sm:w-[300px] pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Grades</SelectItem>
                        <SelectItem value="grade9">Grade 9</SelectItem>
                        <SelectItem value="grade10">Grade 10</SelectItem>
                        <SelectItem value="grade11">Grade 11</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </TableSearch>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Fees Status</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <TableEmpty>No students found</TableEmpty>
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="font-medium">{student.name}</div>
                          </TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.attendance}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="default" 
                              className={student.status === "Active" ? "bg-green-500" : student.status === "Pending" ? "bg-yellow-500" : "bg-destructive"}
                            >
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.performance}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                
                <TablePagination>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>1-5</strong> of <strong>100</strong> students
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TablePagination>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Teachers Tab */}
          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Management</CardTitle>
                <CardDescription>View and manage teaching staff</CardDescription>
              </CardHeader>
              <CardContent>
                <TableSearch>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search teachers..."
                        className="w-[250px] sm:w-[300px] pl-8"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Teacher
                  </Button>
                </TableSearch>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Classes</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <div className="font-medium">{teacher.name}</div>
                        </TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>{teacher.classes}</TableCell>
                        <TableCell>{teacher.students}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <TablePagination>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>1-4</strong> of <strong>20</strong> teachers
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TablePagination>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Attendance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                  <CardDescription>Monthly attendance rate</CardDescription>
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
              
              {/* Performance Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>Student performance by grade</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <BarChart
                    data={performanceData}
                    index="name"
                    categories={["students"]}
                    colors={["violet"]}
                    valueFormatter={(value) => `${value} students`}
                    className="h-72"
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Fee Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Payment Status</CardTitle>
                <CardDescription>Distribution of payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="h-64">
                    <PieChart
                      data={feeData}
                      colors={["green", "amber", "red"]}
                      valueFormatter={(value) => `${value}%`}
                      className="h-64"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-2">Financial Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Expected</span>
                          <span className="font-medium">$1,250,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Collected</span>
                          <span className="font-medium">$854,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pending</span>
                          <span className="font-medium">$395,800</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export Report
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Print Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Activities Tab */}
          <TabsContent value="activities">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recent Activities */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest actions in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-6 before:w-[1px] before:bg-muted">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex gap-3 relative">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 relative z-10">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">
                            By {activity.user} • {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* System Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>System Notifications</CardTitle>
                  <CardDescription>Important alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-700 dark:text-yellow-400">System Maintenance</h4>
                          <p className="text-sm text-muted-foreground">Scheduled maintenance on April 15, from 2:00 AM to 4:00 AM.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-700 dark:text-blue-400">New Feature Released</h4>
                          <p className="text-sm text-muted-foreground">The attendance tracking system has been updated with new features.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-700 dark:text-green-400">School Ranking Update</h4>
                          <p className="text-sm text-muted-foreground">Our school has climbed to #3 in the district rankings!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
