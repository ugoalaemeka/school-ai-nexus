
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  BookOpenCheck,
  Bell,
  FileText
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header and welcome section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin! Here's your school at a glance.</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              New User
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              View Calendar
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <div className="flex items-center pt-1 text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>4.3% increase</span>
                <span className="text-muted-foreground ml-1">from last semester</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <div className="flex items-center pt-1 text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>2.1% increase</span>
                <span className="text-muted-foreground ml-1">from last semester</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <span>Across 12 grade levels</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$247,560</div>
              <div className="flex items-center pt-1 text-xs text-red-500">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span>3.2% pending</span>
                <span className="text-muted-foreground ml-1">collection this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid gap-4 md:grid-cols-7">
          {/* Left column - visualizations and stats */}
          <div className="col-span-7 md:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>School Performance</CardTitle>
                <CardDescription>Academic and operational metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="academic">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                  </TabsList>
                  <TabsContent value="academic" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Average GPA</span>
                          <span className="text-sm font-medium">3.4 / 4.0</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Pass Rate</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Honor Roll Students</span>
                          <span className="text-sm font-medium">37%</span>
                        </div>
                        <Progress value={37} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">College Acceptance</span>
                          <span className="text-sm font-medium">89%</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="attendance" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Overall Attendance</span>
                          <span className="text-sm font-medium">94.3%</span>
                        </div>
                        <Progress value={94.3} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Teacher Attendance</span>
                          <span className="text-sm font-medium">98.7%</span>
                        </div>
                        <Progress value={98.7} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Elementary School</span>
                          <span className="text-sm font-medium">95.8%</span>
                        </div>
                        <Progress value={95.8} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">High School</span>
                          <span className="text-sm font-medium">91.2%</span>
                        </div>
                        <Progress value={91.2} className="h-2" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="financial" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Budget Utilization</span>
                          <span className="text-sm font-medium">76.5%</span>
                        </div>
                        <Progress value={76.5} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Fee Collection Rate</span>
                          <span className="text-sm font-medium">96.8%</span>
                        </div>
                        <Progress value={96.8} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Scholarship Fund</span>
                          <span className="text-sm font-medium">42.3%</span>
                        </div>
                        <Progress value={42.3} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Infrastructure Investment</span>
                          <span className="text-sm font-medium">68.9%</span>
                        </div>
                        <Progress value={68.9} className="h-2" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">School Board Meeting</p>
                      <p className="text-sm text-muted-foreground">April 10, 2025 • 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Science Fair</p>
                      <p className="text-sm text-muted-foreground">April 20, 2025 • All Day</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Parent-Teacher Conference</p>
                      <p className="text-sm text-muted-foreground">April 25, 2025 • 4:00 PM</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full">View All Events</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">New Student Enrolled</p>
                      <p className="text-sm text-muted-foreground">Sarah Johnson • Grade 9 • 1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Exam Results Published</p>
                      <p className="text-sm text-muted-foreground">Mid-term exams • 3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Fee Payment Received</p>
                      <p className="text-sm text-muted-foreground">Monthly fees • 5 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full">View Activity Log</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right column - tiles and actions */}
          <div className="col-span-7 md:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Manage Users</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-center gap-2">
                  <BookOpenCheck className="h-6 w-6 text-primary" />
                  <span>Manage Classes</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-center gap-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <span>Fee Collection</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-center gap-2">
                  <Bell className="h-6 w-6 text-primary" />
                  <span>Announcements</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <span>Generate Reports</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span>Schedule Events</span>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Health of school systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Server Status</span>
                    <span className="text-sm font-medium text-green-500">Healthy</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Database Status</span>
                    <span className="text-sm font-medium text-green-500">Operational</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Storage Space</span>
                    <span className="text-sm font-medium">67% Used</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Last Backup</span>
                    <span className="text-sm font-medium text-green-500">2 hours ago</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>AI-powered suggestions based on school data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="font-medium">Attendance Patterns</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Grade 10 has shown a 5% decrease in attendance on Mondays. Consider investigating the cause.
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="font-medium">Resource Optimization</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Computer Lab 2 is underutilized by 40%. Consider rescheduling classes for better resource allocation.
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="font-medium">Academic Performance</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Physics scores have improved by 12% after implementing the new teaching methodology.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
