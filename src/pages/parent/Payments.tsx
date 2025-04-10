
import { useState } from "react";
import { ParentLayout } from "@/components/layout/parent-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Download, 
  Search, 
  CreditCard, 
  Filter, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertCircle
} from "lucide-react";

export default function ParentPayments() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const paymentHistory = [
    {
      id: "INV-001",
      description: "Tuition Fee (Term 2)",
      amount: "$1,250.00",
      date: "April 2, 2025",
      status: "paid",
      dueDate: "April 1, 2025",
      method: "Credit Card (Visa **** 1234)",
    },
    {
      id: "INV-002",
      description: "Technology Fee",
      amount: "$150.00",
      date: "March 15, 2025",
      status: "paid",
      dueDate: "March 15, 2025",
      method: "Credit Card (Mastercard **** 5678)",
    },
    {
      id: "INV-003",
      description: "School Trip (Washington DC)",
      amount: "$350.00",
      date: "-",
      status: "pending",
      dueDate: "April 30, 2025",
      method: "-",
    },
    {
      id: "INV-004",
      description: "Extra-curricular Activities",
      amount: "$200.00",
      date: "-",
      status: "pending",
      dueDate: "May 15, 2025",
      method: "-",
    },
    {
      id: "INV-005",
      description: "Library Fee",
      amount: "$75.00",
      date: "February 10, 2025",
      status: "paid",
      dueDate: "February 15, 2025",
      method: "Bank Transfer",
    },
  ];

  const upcomingPayments = paymentHistory.filter(payment => payment.status === "pending");
  const paidPayments = paymentHistory.filter(payment => payment.status === "paid");
  
  const filteredPayments = paymentHistory.filter(payment => 
    payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ParentLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
            <p className="text-muted-foreground">
              View and manage school fee payments
            </p>
          </div>
          <Button>
            <DollarSign className="mr-2 h-4 w-4" />
            Make Payment
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Due</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$550.00</div>
              <p className="text-xs text-muted-foreground">
                2 pending invoices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid This Term</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,475.00</div>
              <p className="text-xs text-muted-foreground">
                3 completed payments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">April 30, 2025</div>
              <p className="text-xs text-muted-foreground">
                School Trip Payment
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              View and manage all payment transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {filteredPayments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No payments found</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-3">Description</div>
                      <div className="col-span-1 text-center">Amount</div>
                      <div className="col-span-1 text-center">Due Date</div>
                      <div className="col-span-1 text-center">Status</div>
                      <div className="col-span-1 text-center">Action</div>
                    </div>
                    {filteredPayments.map((payment) => (
                      <div key={payment.id} className="grid grid-cols-7 p-4 text-sm border-t items-center">
                        <div className="col-span-3">
                          <div className="font-medium">{payment.description}</div>
                          <div className="text-xs text-muted-foreground">{payment.id}</div>
                        </div>
                        <div className="col-span-1 text-center font-medium">{payment.amount}</div>
                        <div className="col-span-1 text-center text-xs">{payment.dueDate}</div>
                        <div className="col-span-1 text-center">
                          <Badge 
                            variant={payment.status === "paid" ? "outline" : "default"}
                            className={payment.status === "paid" 
                              ? "bg-green-500/10 text-green-700 hover:bg-green-500/20" 
                              : "bg-yellow-500 hover:bg-yellow-600"}
                          >
                            {payment.status === "paid" ? "Paid" : "Pending"}
                          </Badge>
                        </div>
                        <div className="col-span-1 text-center">
                          {payment.status === "paid" ? (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          ) : (
                            <Button size="sm">
                              <DollarSign className="h-4 w-4" />
                              <span className="sr-only">Pay</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4">
                {upcomingPayments.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-2" />
                    <p>No pending payments</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-3">Description</div>
                      <div className="col-span-1 text-center">Amount</div>
                      <div className="col-span-1 text-center">Due Date</div>
                      <div className="col-span-1 text-center">Status</div>
                      <div className="col-span-1 text-center">Action</div>
                    </div>
                    {upcomingPayments.map((payment) => (
                      <div key={payment.id} className="grid grid-cols-7 p-4 text-sm border-t items-center">
                        <div className="col-span-3">
                          <div className="font-medium">{payment.description}</div>
                          <div className="text-xs text-muted-foreground">{payment.id}</div>
                        </div>
                        <div className="col-span-1 text-center font-medium">{payment.amount}</div>
                        <div className="col-span-1 text-center text-xs">{payment.dueDate}</div>
                        <div className="col-span-1 text-center">
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">
                            Pending
                          </Badge>
                        </div>
                        <div className="col-span-1 text-center">
                          <Button size="sm">
                            <DollarSign className="h-4 w-4" />
                            <span className="sr-only">Pay</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="paid" className="space-y-4">
                {paidPayments.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p>No payment history found</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-2">Description</div>
                      <div className="col-span-1 text-center">Amount</div>
                      <div className="col-span-1 text-center">Payment Date</div>
                      <div className="col-span-2 text-center">Payment Method</div>
                      <div className="col-span-1 text-center">Receipt</div>
                    </div>
                    {paidPayments.map((payment) => (
                      <div key={payment.id} className="grid grid-cols-7 p-4 text-sm border-t items-center">
                        <div className="col-span-2">
                          <div className="font-medium">{payment.description}</div>
                          <div className="text-xs text-muted-foreground">{payment.id}</div>
                        </div>
                        <div className="col-span-1 text-center font-medium">{payment.amount}</div>
                        <div className="col-span-1 text-center text-xs">{payment.date}</div>
                        <div className="col-span-2 text-center text-xs">{payment.method}</div>
                        <div className="col-span-1 text-center">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Manage your payment methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-14 rounded bg-muted flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Visa ending in 1234</div>
                  <div className="text-xs text-muted-foreground">Expires 04/28</div>
                </div>
              </div>
              <Badge variant="outline">Default</Badge>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-14 rounded bg-muted flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Mastercard ending in 5678</div>
                  <div className="text-xs text-muted-foreground">Expires 08/26</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Set as default
              </Button>
            </div>
            
            <Button variant="outline" className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
