
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  CalendarClock, 
  CheckCircle, 
  Clock, 
  FileText, 
  GraduationCap, 
  BarChart2
} from "lucide-react";

const StudentDashboard = () => {
  // Demo data - in a real app this would come from API
  const upcomingClasses = [
    { id: 1, subject: "Mathematics", time: "09:00 AM - 10:30 AM", teacher: "Prof. Johnson", room: "Room 201" },
    { id: 2, subject: "Physics", time: "11:00 AM - 12:30 PM", teacher: "Dr. Smith", room: "Lab 103" },
    { id: 3, subject: "English Literature", time: "02:00 PM - 03:30 PM", teacher: "Mrs. Davis", room: "Room 105" },
  ];
  
  const pendingAssignments = [
    { id: 1, title: "Algebra Problems Set 3", subject: "Mathematics", dueDate: "Apr 10, 2025", status: "Pending" },
    { id: 2, title: "Physics Lab Report", subject: "Physics", dueDate: "Apr 12, 2025", status: "In Progress" },
    { id: 3, title: "Essay on Shakespeare", subject: "English Literature", dueDate: "Apr 15, 2025", status: "Not Started" },
  ];
  
  const subjects = [
    { id: 1, name: "Mathematics", progress: 78, grade: "A-" },
    { id: 2, name: "Physics", progress: 65, grade: "B+" },
    { id: 3, name: "Chemistry", progress: 82, grade: "A" },
    { id: 4, name: "English Literature", progress: 70, grade: "B+" },
    { id: 5, name: "History", progress: 90, grade: "A+" },
  ];
  
  const recentAnnouncements = [
    { 
      id: 1, 
      title: "Upcoming Science Fair", 
      content: "The annual science fair will be held on April 20. Get your projects ready!", 
      date: "Apr 5, 2025",
      author: "Principal Williams"
    },
    { 
      id: 2, 
      title: "Schedule Change", 
      content: "All afternoon classes will be shortened by 15 minutes next Monday due to a faculty meeting.", 
      date: "Apr 4, 2025",
      author: "Admin Office"
    },
  ];

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John! Here's what's happening today.</p>
          </div>
          <Card className="mt-4 md:mt-0 bg-primary/5 border-none w-full md:w-auto">
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <CalendarClock className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Today's Date</p>
                  <p className="text-2xl font-bold">April 4, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">Current Semester</p>
              <Progress value={95} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">GPA</CardTitle>
              <GraduationCap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8</div>
              <p className="text-xs text-muted-foreground">Current Semester</p>
              <Progress value={76} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24/30</div>
              <p className="text-xs text-muted-foreground">Current Semester</p>
              <Progress value={80} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <BarChart2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">Across All Subjects</p>
              <Progress value={78} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-4 md:grid-cols-7">
          {/* Left Column - Timetable & Assignments */}
          <div className="col-span-7 md:col-span-4 space-y-4">
            {/* Today's Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes for April 4, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{cls.subject}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{cls.time}</span>
                          </div>
                          <div className="hidden sm:block">•</div>
                          <span>{cls.teacher}</span>
                          <div className="hidden sm:block">•</div>
                          <span>{cls.room}</span>
                        </div>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Assignments */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Assignments</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{assignment.title}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                          <span>{assignment.subject}</span>
                          <div className="hidden sm:block">•</div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          assignment.status === "Pending" ? "default" : 
                          assignment.status === "In Progress" ? "secondary" : "outline"
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Progress & Announcements */}
          <div className="col-span-7 md:col-span-3 space-y-4">
            {/* Progress Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Your performance in different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="progress">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                  </TabsList>
                  <TabsContent value="progress" className="space-y-4">
                    {subjects.map((subject) => (
                      <div key={subject.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">{subject.name}</p>
                          <p className="text-sm text-muted-foreground">{subject.progress}%</p>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="grades">
                    <div className="space-y-2">
                      {subjects.map((subject) => (
                        <div key={subject.id} className="flex justify-between items-center p-2 border rounded">
                          <p className="font-medium">{subject.name}</p>
                          <Badge 
                            variant={
                              subject.grade.startsWith('A') ? 'default' : 
                              subject.grade.startsWith('B') ? 'secondary' : 'outline'
                            }
                          >
                            {subject.grade}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Important school-wide notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <Badge variant="outline">{announcement.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{announcement.content}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{announcement.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{announcement.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
