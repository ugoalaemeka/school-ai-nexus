
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { CalendarCheck, Download, FileText, TrendingUp, User, DollarSign, Clock } from "lucide-react";
import { PerformanceChart } from "@/components/parent/performance-chart";
import { AttendanceCalendar } from "@/components/parent/attendance-calendar";
import { RecentPayments } from "@/components/parent/recent-payments";
import { RecentMessages } from "@/components/parent/recent-messages";
import { ChildOverviewCard } from "@/components/parent/child-overview-card";

export default function ParentDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout userRole="parent">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your child's academic progress and school activities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button size="sm">
              <DollarSign className="mr-2 h-4 w-4" />
              Pay Fees
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ChildOverviewCard isLoading={isLoading} />
              
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Academic Standing</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Excellent</div>
                  <div className="text-xs text-muted-foreground">
                    Average Grade: A (92%)
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-green-500 hover:bg-green-600">Top 5%</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance Record</CardTitle>
                  <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96%</div>
                  <div className="text-xs text-muted-foreground">
                    Present: 48 days | Absent: 2 days
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-primary hover:bg-primary/90">Excellent</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Parent-Teacher Meeting</div>
                        <div className="text-xs text-muted-foreground">April 15, 2025</div>
                      </div>
                      <Badge variant="outline">5 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">End of Term Exam</div>
                        <div className="text-xs text-muted-foreground">April 28, 2025</div>
                      </div>
                      <Badge variant="outline">18 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>
                    Academic performance over the last term
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart isLoading={isLoading} />
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Attendance History</CardTitle>
                  <CardDescription>
                    Daily attendance record for current term
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceCalendar isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Recent Fee Payments</CardTitle>
                    <CardDescription>
                      Payment history and pending invoices
                    </CardDescription>
                  </div>
                  <Link to="/parent/payments">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <RecentPayments isLoading={isLoading} />
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>
                      Communication with teachers and school staff
                    </CardDescription>
                  </div>
                  <Link to="/parent/messages">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <RecentMessages isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
                <CardDescription>
                  Detailed view of your child's academic performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report Card
                  </Button>
                </div>
                <PerformanceChart isLoading={isLoading} showDetails />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fee Management</CardTitle>
                <CardDescription>
                  View and manage school fee payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPayments isLoading={isLoading} showAll />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="communication" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Communication with teachers and school administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentMessages isLoading={isLoading} showAll />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
