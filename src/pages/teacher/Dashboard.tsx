
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BookOpen, 
  FileText, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  School,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { currentTeacher, teacherClasses, teacherAssignments, studentRecords } from "@/data/nigerianTeacherData";

export default function TeacherDashboard() {
  const todayClasses = teacherClasses.length;
  const activeAssignments = teacherAssignments.filter(a => a.status === 'active').length;
  const gradingPending = teacherAssignments.filter(a => a.status === 'grading').length;
  const totalStudents = currentTeacher.classes.reduce((acc, cls) => acc + 30, 0); // Approximate

  return (
    <div className="space-y-6 p-4">
      {/* Header with Nigerian Teacher Identity */}
      <div className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-800 p-6 rounded-lg text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <School className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {currentTeacher.name}</h1>
              <p className="text-blue-100 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {currentTeacher.subject} Teacher • {currentTeacher.experience} Experience
              </p>
              <p className="text-blue-100 flex items-center gap-1 text-sm">
                <Mail className="h-3 w-3" />
                {currentTeacher.email} • 
                <Phone className="h-3 w-3 ml-2" />
                {currentTeacher.phone}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Total Students</span>
              </div>
              <p className="font-semibold text-xl">{totalStudents}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Classes Today</span>
              </div>
              <p className="font-semibold text-xl">{todayClasses}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-sm">Active Assignments</span>
              </div>
              <p className="font-semibold text-xl">{activeAssignments}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5" />
                <span className="text-sm">Classes Assigned</span>
              </div>
              <p className="font-semibold text-xl">{currentTeacher.classes.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Attendance Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground">85 of 90 students present</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              Pending Grading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{gradingPending}</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Class Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">83.5%</div>
            <p className="text-xs text-muted-foreground">Mathematics overall</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-500" />
              Next Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600">10:20 AM</div>
            <p className="text-xs text-muted-foreground">Primary 4A - Mathematics</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Today's Classes
            </CardTitle>
            <CardDescription>Monday, January 20, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherClasses.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{session.className}</h4>
                      <Badge variant="outline">{session.subject}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{session.topic}</p>
                    <p className="text-xs text-muted-foreground mt-1">{session.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{session.attendance}/{session.totalStudents}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((session.attendance / session.totalStudents) * 100)}% attendance
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">View Weekly Schedule</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common teaching tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Take Attendance
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Upload Resource
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Enter Grades
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Plan Lesson
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Assignment Management
          </CardTitle>
          <CardDescription>Track assignment submissions and grading</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teacherAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">{assignment.subject} • {assignment.classes.join(', ')}</p>
                  <p className="text-xs text-muted-foreground mt-1">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right space-y-2">
                  <div>
                    <div className="text-sm font-medium">
                      {assignment.submittedCount}/{assignment.totalStudents} submitted
                    </div>
                    <Progress 
                      value={(assignment.submittedCount / assignment.totalStudents) * 100} 
                      className="w-24 h-2" 
                    />
                  </div>
                  <Badge 
                    variant={assignment.status === 'active' ? 'default' : assignment.status === 'grading' ? 'secondary' : 'outline'}
                    className={
                      assignment.status === 'active' ? 'bg-green-100 text-green-800' : 
                      assignment.status === 'grading' ? 'bg-orange-100 text-orange-800' : 
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {assignment.status === 'active' ? 'Active' : assignment.status === 'grading' ? 'Grading' : 'Closed'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Class Performance Overview
          </CardTitle>
          <CardDescription>Recent performance metrics for your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentTeacher.classes.map((className, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{className}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Grade:</span>
                    <span className="font-medium">
                      {82 + Math.floor(Math.random() * 10)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Attendance:</span>
                    <span className="font-medium">
                      {90 + Math.floor(Math.random() * 8)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Students:</span>
                    <span className="font-medium">
                      {28 + Math.floor(Math.random() * 5)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
