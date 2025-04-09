
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, DollarSign, Percent, Calendar, MoreHorizontal, ChevronRight } from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">School management overview and key metrics</p>
        </div>
        
        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 12%</span> from last term
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Faculty & Staff</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 4%</span> from last term
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$854,200</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-yellow-500">85%</span> of target
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">93.7%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Enrollments */}
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
              {[
                {
                  name: "Emily Thompson",
                  grade: "Grade 10",
                  date: "April 7, 2025",
                  status: "Pending",
                  statusColor: "bg-yellow-500"
                },
                {
                  name: "Michael Johnson",
                  grade: "Grade 8",
                  date: "April 6, 2025",
                  status: "Approved",
                  statusColor: "bg-green-500"
                },
                {
                  name: "Sophia Martinez",
                  grade: "Grade 11",
                  date: "April 5, 2025",
                  status: "Approved",
                  statusColor: "bg-green-500"
                },
                {
                  name: "Jacob Wilson",
                  grade: "Grade 7",
                  date: "April 4, 2025",
                  status: "Approved",
                  statusColor: "bg-green-500"
                }
              ].map((student, index) => (
                <div key={index} className="flex items-center p-3 bg-muted/40 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="font-medium text-primary">{student.name.charAt(0)}</span>
                  </div>
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
        
        {/* Upcoming Events */}
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
              {[
                {
                  title: "Parent-Teacher Meeting",
                  date: "April 15, 2025",
                  time: "3:00 PM - 6:00 PM",
                  location: "School Auditorium"
                },
                {
                  title: "Annual Sports Day",
                  date: "April 20, 2025",
                  time: "8:00 AM - 4:00 PM",
                  location: "School Ground"
                },
                {
                  title: "Science Fair",
                  date: "April 27, 2025",
                  time: "10:00 AM - 2:00 PM",
                  location: "Main Hall"
                }
              ].map((event, index) => (
                <div key={index} className="flex items-center p-3 bg-muted/40 rounded-lg">
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
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
