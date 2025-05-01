
import React, { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, PieChart } from "@/components/ui/recharts";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  DollarSign,
  PlusCircle,
  Search,
  Download,
  FilePen,
  CheckCircle,
  AlertCircle,
  Clock,
  ClipboardCheck,
  CircleEllipsis,
  CreditCard,
  Calendar,
  Receipt,
  Users,
  Filter
} from "lucide-react";

const FeesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // Sample fee data
  const feeTypes = [
    { id: 1, name: "Tuition Fee", frequency: "Monthly", amount: 1200 },
    { id: 2, name: "Admission Fee", frequency: "One Time", amount: 5000 },
    { id: 3, name: "Examination Fee", frequency: "Term", amount: 1500 },
    { id: 4, name: "Transportation Fee", frequency: "Monthly", amount: 800 },
    { id: 5, name: "Laboratory Fee", frequency: "Term", amount: 1000 },
    { id: 6, name: "Library Fee", frequency: "Annual", amount: 500 },
    { id: 7, name: "Sports Fee", frequency: "Annual", amount: 1200 },
  ];

  // Sample payment records
  const payments = [
    { id: 1, student: "Michael Brown", class: "Class 10B", type: "Tuition Fee", amount: 1200, date: "2025-04-10", status: "paid", method: "Credit Card" },
    { id: 2, student: "Emily Thompson", class: "Class 9A", type: "Transportation Fee", amount: 800, date: "2025-04-12", status: "paid", method: "Bank Transfer" },
    { id: 3, student: "David Johnson", class: "Class 11C", type: "Tuition Fee", amount: 1200, date: "2025-04-15", status: "paid", method: "Cash" },
    { id: 4, student: "Sophia Martinez", class: "Class 12A", type: "Examination Fee", amount: 1500, date: "2025-04-18", status: "pending", method: "" },
    { id: 5, student: "James Wilson", class: "Class 10B", type: "Tuition Fee", amount: 1200, date: "2025-04-20", status: "overdue", method: "" },
    { id: 6, student: "Olivia Davis", class: "Class 9A", type: "Laboratory Fee", amount: 1000, date: "2025-04-22", status: "paid", method: "Credit Card" },
  ];

  // Filter payments based on search query
  const filteredPayments = payments.filter(p => 
    p.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock data for charts
  const collectionData = [
    { name: "Jan", amount: 45000 },
    { name: "Feb", amount: 52000 },
    { name: "Mar", amount: 48000 },
    { name: "Apr", amount: 61000 },
    { name: "May", amount: 42000 },
    { name: "Jun", amount: 55000 },
  ];
  
  const statusData = [
    { name: "Paid", value: 75 },
    { name: "Pending", value: 15 },
    { name: "Overdue", value: 10 },
  ];

  const handleAddFeeType = () => {
    toast({
      title: "Fee type added",
      description: "New fee type has been created successfully.",
    });
  };

  const handleInvoiceGeneration = () => {
    toast({
      title: "Invoices generated",
      description: "Monthly invoices have been generated and sent to parents.",
    });
  };

  const handlePaymentRecorded = () => {
    toast({
      title: "Payment recorded",
      description: "The payment has been recorded successfully.",
    });
  };

  return (
    <AdminSidebar>
      <div className="container py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariant}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Fee Management</h1>
              <p className="text-muted-foreground">Manage school fees, payments, and invoices</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Fee Type
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Fee Type</DialogTitle>
                    <DialogDescription>
                      Create a new fee type that can be assigned to students or classes.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="feeName">Fee Name</Label>
                      <Input id="feeName" placeholder="e.g., Activity Fee" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="feeAmount">Amount</Label>
                      <Input id="feeAmount" type="number" placeholder="e.g., 1000" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="feeFrequency">Payment Frequency</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onetime">One Time</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="termly">Per Term</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="feeDescription">Description</Label>
                      <Input id="feeDescription" placeholder="Brief description of the fee" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="feeAssignment">Assign To</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Assign to" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Students</SelectItem>
                          <SelectItem value="class9">Class 9</SelectItem>
                          <SelectItem value="class10">Class 10</SelectItem>
                          <SelectItem value="class11">Class 11</SelectItem>
                          <SelectItem value="class12">Class 12</SelectItem>
                          <SelectItem value="custom">Custom Selection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddFeeType}>Create Fee Type</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Receipt className="h-4 w-4" />
                    Generate Invoices
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Generate Fee Invoices</DialogTitle>
                    <DialogDescription>
                      Generate invoices for monthly, term, or annual fees.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="invoiceType">Invoice Type</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly Fees</SelectItem>
                          <SelectItem value="term">Term Fees</SelectItem>
                          <SelectItem value="annual">Annual Fees</SelectItem>
                          <SelectItem value="custom">Custom Selection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="month">For Period</Label>
                      <Select defaultValue="may">
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="may">May 2025</SelectItem>
                          <SelectItem value="june">June 2025</SelectItem>
                          <SelectItem value="july">July 2025</SelectItem>
                          <SelectItem value="custom">Custom Date Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" defaultValue="2025-05-10" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sendEmail">Notification</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger>
                          <SelectValue placeholder="Send email notification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Send email to parents</SelectItem>
                          <SelectItem value="no">Don't send email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit" onClick={handleInvoiceGeneration}>Generate & Send</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariant}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Total Collected</p>
                  <h3 className="text-2xl font-bold">$253,200</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Payments Received</p>
                  <h3 className="text-2xl font-bold">750</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-amber-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold">$42,800</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Clock className="h-6 w-6 text-red-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <h3 className="text-2xl font-bold">$18,500</h3>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Fee Charts */}
          <motion.div variants={itemVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Collection</CardTitle>
                <CardDescription>Last 6 months fee collection</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={collectionData}
                  index="name"
                  categories={["amount"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `$${value}`}
                  className="h-72"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Current payment status distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={statusData}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                  colors={["#10b981", "#f59e0b", "#ef4444"]}
                  className="h-72"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Fee Management Tabs */}
          <motion.div variants={itemVariant}>
            <Tabs defaultValue="payments" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="payments">Payment History</TabsTrigger>
                <TabsTrigger value="fee-types">Fee Types</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
              </TabsList>
              
              {/* Payment History Tab */}
              <TabsContent value="payments" className="mt-0">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Search payments..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Fee Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="tuition">Tuition Fee</SelectItem>
                        <SelectItem value="transport">Transport Fee</SelectItem>
                        <SelectItem value="exam">Exam Fee</SelectItem>
                        <SelectItem value="library">Library Fee</SelectItem>
                      </SelectContent>
                    </Select>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default" className="gap-2">
                          <PlusCircle className="h-4 w-4" />
                          Record Payment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Record New Payment</DialogTitle>
                          <DialogDescription>
                            Record a payment made by a student/parent.
                          </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="student">Student</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select student" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="student1">Michael Brown</SelectItem>
                                <SelectItem value="student2">Emily Thompson</SelectItem>
                                <SelectItem value="student3">David Johnson</SelectItem>
                                <SelectItem value="student4">Sophia Martinez</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="feeType">Fee Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fee type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tuition">Tuition Fee</SelectItem>
                                <SelectItem value="transport">Transportation Fee</SelectItem>
                                <SelectItem value="exam">Examination Fee</SelectItem>
                                <SelectItem value="lab">Laboratory Fee</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" type="number" placeholder="e.g., 1200" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="paymentDate">Payment Date</Label>
                            <Input id="paymentDate" type="date" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="paymentMethod">Payment Method</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="creditcard">Credit Card</SelectItem>
                                <SelectItem value="banktransfer">Bank Transfer</SelectItem>
                                <SelectItem value="online">Online Payment</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="reference">Reference/Receipt No.</Label>
                            <Input id="reference" placeholder="e.g., REF123456" />
                          </div>
                        </form>
                        <DialogFooter>
                          <Button type="submit" onClick={handlePaymentRecorded}>Record Payment</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead className="hidden md:table-cell">Class</TableHead>
                        <TableHead>Fee Type</TableHead>
                        <TableHead className="hidden md:table-cell">Amount</TableHead>
                        <TableHead className="hidden lg:table-cell">Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div className="font-medium">{payment.student}</div>
                            <div className="text-xs text-muted-foreground md:hidden">{payment.class}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{payment.class}</TableCell>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell className="hidden md:table-cell">${payment.amount}</TableCell>
                          <TableCell className="hidden lg:table-cell">{payment.date}</TableCell>
                          <TableCell>
                            <Badge variant={
                              payment.status === "paid" ? "success" :
                              payment.status === "pending" ? "warning" :
                              "destructive"
                            } className="capitalize">
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <CircleEllipsis className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              {/* Fee Types Tab */}
              <TabsContent value="fee-types" className="mt-0">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fee Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeTypes.map((fee) => (
                        <TableRow key={fee.id}>
                          <TableCell>
                            <div className="font-medium">{fee.name}</div>
                          </TableCell>
                          <TableCell>${fee.amount}</TableCell>
                          <TableCell>{fee.frequency}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <FilePen className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              {/* Invoices Tab */}
              <TabsContent value="invoices" className="mt-0">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="py-12">
                      <Receipt className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Invoice Management</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-4">
                        Generate, manage and track invoices for all fee types. Send automatic reminders for pending payments.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Button className="gap-2">
                          <PlusCircle className="h-4 w-4" />
                          Create Invoice
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Users className="h-4 w-4" />
                          Bulk Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </AdminSidebar>
  );
};

export default FeesPage;
