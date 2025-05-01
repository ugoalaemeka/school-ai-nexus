
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "@/components/ui/recharts";

const AttendanceChart = () => {
  const attendanceData = [
    {
      name: "Present",
      value: 85,
    },
    {
      name: "Absent",
      value: 10,
    },
    {
      name: "Late",
      value: 5,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>Current class attendance statistics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <PieChart
            data={attendanceData}
            category="value"
            valueFormatter={(value) => `${value}%`}
            colors={["#4285F4", "#34A853", "#FBBC05"]}
            className="h-full mt-6"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const StudentPerformance = () => {
  const performanceData = [
    {
      name: "Excellent",
      value: 60,
    },
    {
      name: "Good",
      value: 30,
    },
    {
      name: "Average",
      value: 10,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance</CardTitle>
        <CardDescription>Overall student performance metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <PieChart
            data={performanceData}
            category="value"
            valueFormatter={(value) => `${value}%`}
            colors={["#4285F4", "#34A853", "#FBBC05"]}
            className="h-full mt-6"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const Reports = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold mb-4">Reports Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AttendanceChart />
          <StudentPerformance />
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
