
import { StudentLayout } from "@/components/layout/student-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Calendar, Clock, FileText, Award, ChevronRight } from "lucide-react";

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, James</h1>
          <p className="text-muted-foreground">Here's what's happening with your education today.</p>
        </div>
        
        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Classes</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Next 48 hours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Total earned</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Schedule</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                <Calendar className="h-4 w-4" /> View Full Timetable
              </Button>
            </div>
            <CardDescription>Tuesday, April 9, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "8:00 AM - 9:30 AM",
                  subject: "Mathematics",
                  teacher: "Mrs. Johnson",
                  room: "Room 201",
                  current: false
                },
                {
                  time: "9:45 AM - 11:15 AM",
                  subject: "English Language",
                  teacher: "Mr. Williams",
                  room: "Room 105",
                  current: true
                },
                {
                  time: "11:30 AM - 1:00 PM",
                  subject: "Physics",
                  teacher: "Dr. Martinez",
                  room: "Lab 3",
                  current: false
                },
                {
                  time: "2:00 PM - 3:30 PM",
                  subject: "History",
                  teacher: "Ms. Davis",
                  room: "Room 302",
                  current: false
                }
              ].map((period, index) => (
                <div key={index} className={`flex items-center p-3 rounded-lg ${period.current ? 'bg-primary/10 border border-primary/20' : 'bg-muted/40'}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${period.current ? 'text-primary' : ''}`}>{period.subject}</span>
                      {period.current && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Current</span>}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{period.teacher} • {period.room}</div>
                  </div>
                  <div className="text-sm text-right">
                    <div>{period.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Assignments</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  subject: "Mathematics",
                  title: "Calculus Problem Set",
                  dueDate: "Tomorrow, 11:59 PM",
                  status: "Not Started",
                  statusColor: "bg-red-500"
                },
                {
                  subject: "English Literature",
                  title: "Essay on Shakespearean Tragedy",
                  dueDate: "April 12, 2025",
                  status: "In Progress",
                  statusColor: "bg-yellow-500"
                },
                {
                  subject: "Physics",
                  title: "Lab Report: Newton's Laws",
                  dueDate: "April 15, 2025",
                  status: "In Progress",
                  statusColor: "bg-yellow-500"
                }
              ].map((assignment, index) => (
                <div key={index} className="flex items-center p-3 bg-muted/40 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">{assignment.subject}</div>
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">Due: {assignment.dueDate}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${assignment.statusColor}`}></div>
                      <span className="text-sm">{assignment.status}</span>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
