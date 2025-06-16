
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Bell,
  School,
  MapPin,
  Phone,
  Mail,
  Award,
  Clock,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { currentParent, parentMessages, upcomingEvents } from "@/data/nigerianParentData";

export default function ParentDashboard() {
  const unreadMessages = parentMessages.filter(m => !m.isRead).length;
  const totalChildren = currentParent.children.length;
  const pendingFees = currentParent.children.reduce((acc, child) => 
    acc + child.fees.filter(fee => fee.status === 'pending').length, 0);
  const upcomingEventsCount = upcomingEvents.length;

  return (
    <div className="space-y-6 p-4">
      {/* Header with Nigerian Parent Identity */}
      <div className="bg-gradient-to-r from-green-600 via-white to-green-600 p-6 rounded-lg text-gray-800 relative overflow-hidden border">
        <div className="absolute right-0 top-0 opacity-10">
          <School className="h-32 w-32 text-green-600" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {currentParent.name}</h1>
              <p className="text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {currentParent.occupation} • {currentParent.lga} LGA, {currentParent.state} State
              </p>
              <p className="text-gray-600 flex items-center gap-1 text-sm">
                <Mail className="h-3 w-3" />
                {currentParent.email} • 
                <Phone className="h-3 w-3 ml-2" />
                {currentParent.phone}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-100 backdrop-blur-sm rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-700" />
                <span className="text-sm text-green-700">Children</span>
              </div>
              <p className="font-semibold text-xl text-green-800">{totalChildren}</p>
            </div>
            <div className="bg-blue-100 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-700" />
                <span className="text-sm text-blue-700">Unread Messages</span>
              </div>
              <p className="font-semibold text-xl text-blue-800">{unreadMessages}</p>
            </div>
            <div className="bg-orange-100 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-orange-700" />
                <span className="text-sm text-orange-700">Pending Fees</span>
              </div>
              <p className="font-semibold text-xl text-orange-800">{pendingFees}</p>
            </div>
            <div className="bg-purple-100 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-700" />
                <span className="text-sm text-purple-700">Upcoming Events</span>
              </div>
              <p className="font-semibold text-xl text-purple-800">{upcomingEventsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Children Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentParent.children.map((child) => (
          <Card key={child.id} className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{child.name}</CardTitle>
                  <CardDescription>{child.class} • Age {child.age} • ID: {child.studentId}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Grade {child.currentGrade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Overall Grade</span>
                  </div>
                  <div className="text-xl font-bold text-blue-600">{child.currentGrade}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Attendance</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">{child.attendance}%</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Recent Performance</span>
                    <span>Average: {Math.round(child.recentGrades.reduce((acc, g) => acc + g.score, 0) / child.recentGrades.length)}%</span>
                  </div>
                  <Progress 
                    value={child.recentGrades.reduce((acc, g) => acc + g.score, 0) / child.recentGrades.length} 
                    className="h-2" 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {child.subjects.length} subjects this term
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Recent Messages
            </CardTitle>
            <CardDescription>Communications from teachers and school administration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parentMessages.slice(0, 3).map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${!message.isRead ? 'border-blue-200 bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${!message.isRead ? 'text-blue-900' : ''}`}>
                        {message.subject}
                      </h4>
                      {!message.isRead && <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">New</Badge>}
                    </div>
                    <Badge 
                      variant="outline"
                      className={
                        message.priority === 'high' ? 'border-red-200 text-red-700' :
                        message.priority === 'medium' ? 'border-orange-200 text-orange-700' :
                        'border-gray-200 text-gray-700'
                      }
                    >
                      {message.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">From: {message.senderName}</p>
                  <p className="text-sm">{message.message.substring(0, 120)}...</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(message.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">View All Messages</Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Upcoming Events
            </CardTitle>
            <CardDescription>School events and important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">{event.venue}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3 text-purple-600" />
                    <span className="text-xs">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-purple-600" />
                    <span className="text-xs">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" size="sm">
              View School Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Fee Status and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Fee Status Overview
            </CardTitle>
            <CardDescription>Payment status for all children</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentParent.children.map((child) => (
                <div key={child.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{child.name}</h4>
                    <Badge variant="outline">{child.class}</Badge>
                  </div>
                  {child.fees.map((fee) => (
                    <div key={fee.id} className="flex justify-between items-center py-2">
                      <div>
                        <p className="text-sm font-medium">{fee.term} {fee.academicYear}</p>
                        <p className="text-xs text-muted-foreground">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">
                          ₦{fee.amount.toLocaleString()}
                        </p>
                        <Badge 
                          variant={fee.status === 'paid' ? 'default' : fee.status === 'pending' ? 'secondary' : 'destructive'}
                          className={
                            fee.status === 'paid' ? 'bg-green-100 text-green-800' :
                            fee.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">Make Payment</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common parent tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                View Report Cards
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Check Attendance
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Payment History
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Teachers
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Event Notifications
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <School className="h-4 w-4 mr-2" />
                School Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Children's Recent Grades Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Children's Academic Performance
          </CardTitle>
          <CardDescription>Recent grades and teacher comments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentParent.children.map((child) => (
              <div key={child.id}>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {child.name} - {child.class}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {child.recentGrades.map((grade, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-sm">{grade.subject}</h4>
                        <Badge 
                          variant="outline"
                          className={
                            grade.score >= 90 ? 'bg-green-100 text-green-800 border-green-300' :
                            grade.score >= 80 ? 'bg-blue-100 text-blue-800 border-blue-300' :
                            grade.score >= 70 ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                            'bg-orange-100 text-orange-800 border-orange-300'
                          }
                        >
                          {grade.grade} ({grade.score}%)
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground italic">"{grade.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
