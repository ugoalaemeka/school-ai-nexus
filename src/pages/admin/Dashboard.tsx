
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
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { profile } = useAuth();

  // Mock data for demonstration
  const dashboardStats = [
    {
      title: "Total Students",
      value: "245",
      change: "+12",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Teachers",
      value: "18",
      change: "+2",
      icon: School,
      color: "text-green-600"
    },
    {
      title: "Classes",
      value: "12",
      change: "0",
      icon: GraduationCap,
      color: "text-purple-600"
    },
    {
      title: "Events This Month",
      value: "8",
      change: "+3",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "application",
      message: "New student application from John Doe",
      time: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      type: "payment",
      message: "Payment received from Mary Smith",
      time: "4 hours ago",
      status: "completed"
    },
    {
      id: 3,
      type: "teacher",
      message: "Teacher profile updated: Sarah Johnson",
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 4,
      type: "event",
      message: "New event scheduled: Parent-Teacher Meeting",
      time: "2 days ago",
      status: "completed"
    }
  ];

  const quickActions = [
    {
      title: "Create New Class",
      description: "Set up a new class for the academic year",
      href: "/admin/classes",
      icon: GraduationCap
    },
    {
      title: "Add Teacher",
      description: "Invite a new teacher to join the school",
      href: "/admin/teachers",
      icon: School
    },
    {
      title: "View Applications",
      description: "Review pending student applications",
      href: "/admin/applications",
      icon: Users
    },
    {
      title: "Schedule Event",
      description: "Create a new school event or meeting",
      href: "/admin/events",
      icon: Calendar
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {profile?.first_name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening at your school today.
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            Admin Dashboard
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change !== "0" && (
                    <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                      {stat.change} from last month
                    </span>
                  )}
                  {stat.change === "0" && "No change from last month"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <action.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={action.href}>Go</a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>
                Latest updates and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-1">
                    {activity.status === "pending" ? (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
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
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system health and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Database: Online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Authentication: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">File Storage: Available</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
