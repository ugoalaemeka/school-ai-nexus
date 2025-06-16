
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Award, 
  TrendingUp, 
  Users, 
  MapPin,
  School,
  Bell,
  FileText,
  CheckCircle
} from "lucide-react";
import { currentStudent, studentAssignments, examSchedule } from "@/data/nigerianStudentData";

export default function StudentDashboard() {
  const pendingAssignments = studentAssignments.filter(a => a.status === 'pending').length;
  const completedAssignments = studentAssignments.filter(a => a.status === 'submitted').length;
  const upcomingExams = examSchedule.filter(e => new Date(e.date) > new Date()).length;

  return (
    <div className="space-y-6 p-4">
      {/* Header with Nigerian School Identity */}
      <div className="bg-gradient-to-r from-green-600 to-white p-6 rounded-lg text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <School className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <School className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {currentStudent.name}</h1>
              <p className="text-green-100 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {currentStudent.class} • {currentStudent.academicYear} • {currentStudent.currentTerm}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Class</span>
              </div>
              <p className="font-semibold">{currentStudent.class}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-small">Overall Grade</span>
              </div>
              <p className="font-semibold">85.5% (A)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Attendance</span>
              </div>
              <p className="font-semibold">96.7%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingAssignments}</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Completed Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedAssignments}</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{upcomingExams}</div>
            <p className="text-xs text-muted-foreground">Next 2 weeks</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{currentStudent.subjects.length}</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Assignments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Recent Assignments
            </CardTitle>
            <CardDescription>Your latest assignments and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentAssignments.slice(0, 3).map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={assignment.status === 'submitted' ? 'default' : assignment.status === 'graded' ? 'secondary' : 'outline'}
                      className={assignment.status === 'submitted' ? 'bg-green-100 text-green-800' : assignment.status === 'graded' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}
                    >
                      {assignment.status === 'pending' ? 'Pending' : assignment.status === 'submitted' ? 'Submitted' : 'Graded'}
                    </Badge>
                    {assignment.grade && (
                      <Badge variant="secondary">{assignment.grade}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">View All Assignments</Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Monday, January 20, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "8:40-9:20", subject: "Mathematics", teacher: "Mrs. Adeyemi" },
                { time: "9:20-10:00", subject: "English", teacher: "Mr. Okonkwo" },
                { time: "10:20-11:00", subject: "Basic Science", teacher: "Mr. Lawal" },
                { time: "11:00-11:40", subject: "Social Studies", teacher: "Mrs. Bello" },
              ].map((period, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <div className="text-xs font-mono text-gray-600 w-16">{period.time}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{period.subject}</div>
                    <div className="text-xs text-gray-600">{period.teacher}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Subject Performance
          </CardTitle>
          <CardDescription>Your grades across all subjects this term</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { subject: "Mathematics", grade: 88, color: "blue" },
              { subject: "English Language", grade: 92, color: "green" },
              { subject: "Basic Science", grade: 85, color: "purple" },
              { subject: "Social Studies", grade: 90, color: "orange" },
              { subject: "Computer Studies", grade: 94, color: "pink" },
              { subject: "Creative Arts", grade: 87, color: "yellow" },
            ].map((subject, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">{subject.subject}</h4>
                  <Badge variant="secondary">{subject.grade}%</Badge>
                </div>
                <Progress value={subject.grade} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {subject.grade >= 90 ? 'Excellent' : subject.grade >= 80 ? 'Very Good' : subject.grade >= 70 ? 'Good' : 'Fair'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Exams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-600" />
            Upcoming Examinations
          </CardTitle>
          <CardDescription>Mid-term examinations schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {examSchedule.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{exam.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(exam.date).toLocaleDateString()} at {exam.time} • {exam.venue}
                  </p>
                  <p className="text-xs text-muted-foreground">Duration: {exam.duration}</p>
                </div>
                <Badge 
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  {exam.examType.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
