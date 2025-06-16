
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Calendar,
  Award,
  DollarSign,
  BookOpen,
  Clock,
  Download,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  // Sample data for charts
  const enrollmentData = [
    { month: 'Jan', students: 450, target: 500 },
    { month: 'Feb', students: 478, target: 500 },
    { month: 'Mar', students: 502, target: 520 },
    { month: 'Apr', students: 485, target: 520 },
    { month: 'May', students: 520, target: 540 },
    { month: 'Jun', students: 535, target: 540 }
  ];

  const performanceData = [
    { class: 'Nursery', excellent: 65, good: 25, average: 10 },
    { class: 'Primary 1-3', excellent: 58, good: 32, average: 10 },
    { class: 'Primary 4-6', excellent: 62, good: 28, average: 10 },
    { class: 'JSS 1-3', excellent: 55, good: 35, average: 10 },
    { class: 'SSS 1-3', excellent: 48, good: 38, average: 14 }
  ];

  const attendanceData = [
    { name: 'Present', value: 92, color: '#22c55e' },
    { name: 'Late', value: 5, color: '#f59e0b' },
    { name: 'Absent', value: 3, color: '#ef4444' }
  ];

  const revenueData = [
    { month: 'Jan', fees: 18500000, expenses: 12000000 },
    { month: 'Feb', fees: 19200000, expenses: 11800000 },
    { month: 'Mar', fees: 20100000, expenses: 12500000 },
    { month: 'Apr', fees: 18800000, expenses: 12200000 },
    { month: 'May', fees: 21500000, expenses: 13000000 },
    { month: 'Jun', fees: 22000000, expenses: 12800000 }
  ];

  const topSubjects = [
    { subject: 'Mathematics', average: 85.2, trend: 'up' },
    { subject: 'English Language', average: 82.1, trend: 'up' },
    { subject: 'Basic Science', average: 78.9, trend: 'up' },
    { subject: 'Social Studies', average: 76.5, trend: 'down' },
    { subject: 'Yoruba Language', average: 74.3, trend: 'up' }
  ];

  const keyMetrics = [
    {
      title: 'Total Students',
      value: '535',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Average Attendance',
      value: '92%',
      change: '+2.1%',
      trend: 'up',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Fee Collection Rate',
      value: '94.5%',
      change: '+5.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Academic Performance',
      value: '78.2%',
      change: '-1.2%',
      trend: 'down',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">School Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter Data
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="transition-all hover:shadow-lg hover:scale-105 duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Student Enrollment Trends
            </CardTitle>
            <CardDescription>Monthly enrollment vs targets for 2024/2025 session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#22c55e" />
                  <Bar dataKey="target" fill="#e5e7eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Revenue Analysis (₦)
            </CardTitle>
            <CardDescription>Monthly fee collection vs operational expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, '']} />
                  <Line type="monotone" dataKey="fees" stroke="#22c55e" strokeWidth={3} />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Performance by Class */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Academic Performance by Class Level
            </CardTitle>
            <CardDescription>Percentage distribution of student performance grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="class" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="excellent" stackId="a" fill="#22c55e" />
                  <Bar dataKey="good" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="average" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Daily Attendance
            </CardTitle>
            <CardDescription>Today's attendance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {attendanceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Subjects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Top Performing Subjects
          </CardTitle>
          <CardDescription>Subject performance averages across all classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSubjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                    <p className="text-sm text-gray-600">Class Average</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">{subject.average}%</span>
                  {subject.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
