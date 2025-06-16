
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  School, 
  Calendar, 
  TrendingUp, 
  BookOpen,
  AlertCircle,
  CheckCircle,
  Award,
  Clock,
  FileText,
  BarChart3,
  MapPin,
  Phone
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { nigerianClasses, sampleNigerianTeachers, sampleNigerianStudents } from "@/data/nigerianEducationData";

const AdminDashboard = () => {
  const { profile } = useAuth();

  // Calculate statistics from Nigerian education data
  const stats = {
    totalStudents: sampleNigerianStudents.length * 35, // Estimate 35 per sample
    totalTeachers: sampleNigerianTeachers.length * 3, // Estimate 3x the samples
    totalClasses: nigerianClasses.length,
    nurseryClasses: nigerianClasses.filter(c => c.level === 'nursery').length,
    primaryClasses: nigerianClasses.filter(c => c.level === 'primary').length,
    jssClasses: nigerianClasses.filter(c => c.level === 'jss').length,
    sssClasses: nigerianClasses.filter(c => c.level === 'sss').length
  };

  const schoolInfo = {
    name: "Eko Scholars Academy",
    location: "Victoria Island, Lagos State",
    phone: "+234 801 234 5678",
    email: "info@ekoscholars.edu.ng",
    motto: "Excellence Through Knowledge",
    founded: "2010",
    currentSession: "2024/2025 Academic Session",
    currentTerm: "Second Term"
  };

  const quickStats = [
    {
      title: "Total Students",
      value: stats.totalStudents.toString(),
      change: "+45 this term",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Active enrolled students"
    },
    {
      title: "Teaching Staff",
      value: stats.totalTeachers.toString(),
      change: "+3 new hires",
      icon: School,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Qualified educators"
    },
    {
      title: "Academic Classes",
      value: stats.totalClasses.toString(),
      change: "All levels covered",
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Nursery to SSS 3"
    },
    {
      title: "Current Term",
      value: "2nd Term",
      change: "Week 8 of 13",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "2024/2025 Session"
    }
  ];

  const levelBreakdown = [
    { level: "Nursery", count: stats.nurseryClasses, students: 45, color: "bg-pink-100 text-pink-800" },
    { level: "Primary", count: stats.primaryClasses, students: 180, color: "bg-blue-100 text-blue-800" },
    { level: "JSS", count: stats.jssClasses, students: 120, color: "bg-green-100 text-green-800" },
    { level: "SSS", count: stats.sssClasses, students: 135, color: "bg-purple-100 text-purple-800" }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "admission",
      message: "New admission application from Adebayo Tunde for Primary 1",
      time: "2 hours ago",
      status: "pending",
      icon: FileText
    },
    {
      id: 2,
      type: "payment",
      message: "School fees payment received from Okoro Chioma (JSS 2)",
      time: "4 hours ago",
      status: "completed",
      icon: CheckCircle
    },
    {
      id: 3,
      type: "staff",
      message: "New teacher Mrs. Adeleke assigned to SSS 1 Chemistry",
      time: "1 day ago",
      status: "completed",
      icon: School
    },
    {
      id: 4,
      type: "exam",
      message: "First Term results uploaded for all JSS classes",
      time: "2 days ago",
      status: "completed",
      icon: Award
    },
    {
      id: 5,
      type: "event",
      message: "Inter-house sports competition scheduled for next week",
      time: "3 days ago",
      status: "scheduled",
      icon: Calendar
    }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Conference", date: "March 15, 2025", type: "meeting" },
    { title: "WAEC Registration Deadline", date: "March 20, 2025", type: "deadline" },
    { title: "Mid-term Break", date: "March 25 - April 1", type: "holiday" },
    { title: "Second Term Examinations", date: "April 15-26, 2025", type: "exam" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile?.first_name}!
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {schoolInfo.location} • {schoolInfo.currentSession}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Badge variant="secondary" className="text-sm justify-center">
              <Clock className="h-3 w-3 mr-1" />
              {schoolInfo.currentTerm}
            </Badge>
            <Badge variant="outline" className="text-sm justify-center">
              <Phone className="h-3 w-3 mr-1" />
              {schoolInfo.phone}
            </Badge>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="transition-all hover:shadow-lg hover:scale-105 duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                <p className="text-xs text-green-600 mt-2 font-medium">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* School Level Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Academic Levels Breakdown
            </CardTitle>
            <CardDescription>
              Distribution of classes and students across Nigerian education levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {levelBreakdown.map((level, index) => (
                <div key={index} className="text-center p-4 rounded-lg border bg-gray-50/50">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${level.color}`}>
                    {level.level}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{level.count}</div>
                  <div className="text-xs text-gray-500">Classes</div>
                  <div className="text-lg font-semibold text-gray-700 mt-1">{level.students}</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent School Activities
              </CardTitle>
              <CardDescription>
                Latest updates and notifications from around the school
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mt-1">
                    <activity.icon className={`h-4 w-4 ${
                      activity.status === "pending" ? "text-orange-500" : 
                      activity.status === "scheduled" ? "text-blue-500" : "text-green-500"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.status === "pending" ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming School Events
              </CardTitle>
              <CardDescription>
                Important dates and deadlines for this term
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      event.type === 'deadline' ? 'border-red-200 text-red-700' :
                      event.type === 'exam' ? 'border-purple-200 text-purple-700' :
                      event.type === 'holiday' ? 'border-green-200 text-green-700' :
                      'border-blue-200 text-blue-700'
                    }`}
                  >
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* School Information Footer */}
        <Card className="bg-gradient-to-r from-green-900 to-blue-900 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <h3 className="text-xl font-bold mb-2">{schoolInfo.name}</h3>
                <p className="text-green-100 text-sm">{schoolInfo.motto}</p>
                <p className="text-green-200 text-xs mt-1">Est. {schoolInfo.founded}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <p className="text-green-100 text-sm">{schoolInfo.location}</p>
                <p className="text-green-100 text-sm">{schoolInfo.phone}</p>
                <p className="text-green-100 text-sm">{schoolInfo.email}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Academic Session</h4>
                <p className="text-green-100 text-sm">{schoolInfo.currentSession}</p>
                <p className="text-green-100 text-sm">{schoolInfo.currentTerm}</p>
                <Button variant="secondary" size="sm" className="mt-2">
                  View Full Calendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
