
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/tables/fees-column";
import { feesData } from "@/data/fees";
import { PieChart } from "@/components/ui/recharts";
import { Badge } from "@/components/ui/badge";

const AdminFees = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Fees Management</h1>
          <p className="text-muted-foreground">Manage and view student fee payments and reports.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeeCollection />
          <PaymentOverview />
          <OutstandingFees />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Fees Data</h2>
          <DataTable columns={columns} data={feesData} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminFees;

const paymentMethodData = [
  {
    name: "Credit Card",
    value: 45,
  },
  {
    name: "Bank Transfer",
    value: 25,
  },
  {
    name: "Cash",
    value: 15,
  },
  {
    name: "Scholarship",
    value: 15,
  },
];

// Modify in the component where the PieChart is used
const FeeCollection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Collection</CardTitle>
        <CardDescription>Overview of fee collection methods.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <PieChart
            data={paymentMethodData}
            category="value"
            valueFormatter={(value) => `${value}%`}
            colors={["#4285F4", "#34A853", "#FBBC05", "#EA4335"]}
            className="h-full mt-6"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Overview</CardTitle>
        <CardDescription>Summary of fee payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Total Fees Collected:</span>
            <span className="font-medium">₦5,200,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Fees Due:</span>
            <span className="font-medium">₦800,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Payment Success Rate:</span>
            <span className="font-medium">92%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const OutstandingFees = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outstanding Fees</CardTitle>
        <CardDescription>List of students with outstanding fees.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Student A</span>
            <span className="font-medium">₦50,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Student B</span>
            <span className="font-medium">₦30,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Student C</span>
            <span className="font-medium">₦20,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Student D</span>
            <span className="font-medium">₦10,000</span>
          </div>
        </div>
        <div className="mt-4">
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Paid
          </Badge>
          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100 ml-2">
            Unpaid
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
