
import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Application, SupabaseJsonResponse } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Check, X, Eye, FileText, Mail } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState<Array<{ id: string, name: string }>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [processing, setProcessing] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let statusFilter = filterStatus === "all" ? null : filterStatus;
      
      const { data, error } = await supabase.rpc('get_applications', {
        status_filter: statusFilter
      });
      
      if (error) {
        toast.error(`Error fetching applications: ${error.message}`);
        return;
      }
      
      // Cast data to Application[] with type assertion
      setApplications(data as unknown as Application[]);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('id, name');
      
      if (error) {
        toast.error(`Error fetching classes: ${error.message}`);
        return;
      }
      
      setClasses(data || []);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchClasses();
  }, [filterStatus]);

  const handleApprove = async () => {
    if (!selectedApp || !classId) {
      toast.error("Please select a class");
      return;
    }
    
    setProcessing(true);
    
    try {
      // Admit the student and create accounts
      const { data, error } = await supabase.rpc('admit_student', {
        application_id: selectedApp.id,
        class_id: classId
      });
      
      if (error) {
        toast.error(`Error processing admission: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Application approved!");
        toast.info(`Activation links will be sent to student (${result.student_email}) and parent (${result.parent_email})`);
        fetchApplications(); // Refresh the list
        setConfirmModalOpen(false);
        setClassId("");
      } else {
        toast.error(result.message || "Failed to process admission");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };
  
  const handleUpdateStatus = async (applicationId: string, status: string) => {
    setProcessing(true);
    
    try {
      const { data, error } = await supabase.rpc('update_application_status', {
        application_id: applicationId,
        new_status: status
      });
      
      if (error) {
        toast.error(`Error updating application: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success(`Application ${status}!`);
        fetchApplications(); // Refresh the list
        setRejectModalOpen(false);
      } else {
        toast.error(result.message || "Failed to update application");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };
  
  const handleSetFeesPaid = async (applicationId: string) => {
    setProcessing(true);
    
    try {
      const { data, error } = await supabase.rpc('update_application_status', {
        application_id: applicationId,
        new_status: 'pending', // Keep current status
        set_fees_paid: true
      });
      
      if (error) {
        toast.error(`Error updating payment status: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Payment status updated!");
        fetchApplications(); // Refresh the list
      } else {
        toast.error(result.message || "Failed to update payment status");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "outline";
      case "approved":
        return "default";
      case "admitted":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "full_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Parent Email",
      accessorKey: "parent_email",
    },
    {
      header: "Class Requested",
      accessorKey: "class_requested",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: Application } }) => {
        return (
          <Badge variant={getBadgeVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        );
      }
    },
    {
      header: "Fees Paid",
      accessorKey: "fees_paid",
      cell: ({ row }: { row: { original: Application } }) => {
        const app = row.original;
        return app.fees_paid ? (
          <Badge variant="default" className="bg-green-500">Paid</Badge>
        ) : (
          <Badge variant="outline" className="border-red-500 text-red-500">Unpaid</Badge>
        );
      }
    },
    {
      header: "Application Date",
      accessorKey: "created_at",
      cell: ({ row }: { row: { original: Application } }) => {
        return new Date(row.original.created_at).toLocaleDateString();
      }
    },
    {
      header: "Actions",
      cell: ({ row }: { row: { original: Application } }) => {
        const app = row.original;
        
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedApp(app);
                setViewModalOpen(true);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            {app.status === "pending" && (
              <>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => {
                    setSelectedApp(app);
                    setConfirmModalOpen(true);
                  }}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    setSelectedApp(app);
                    setRejectModalOpen(true);
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                
                {!app.fees_paid && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSetFeesPaid(app.id)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Mark Paid
                  </Button>
                )}
              </>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admission Applications</h1>
          <div className="flex gap-2">
            <Select
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="admitted">Admitted</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email All
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>
              Manage student admission applications. You can review, approve, or reject applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DataTable 
              columns={columns} 
              data={applications.filter(app => 
                app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.parent_email.toLowerCase().includes(searchTerm.toLowerCase())
              )} 
            />
            
            {loading && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* View Application Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">{selectedApp.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={getBadgeVariant(selectedApp.status)}>
                    {selectedApp.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parent Email</p>
                  <p className="font-medium">{selectedApp.parent_email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Requested Class</p>
                  <p className="font-medium">{selectedApp.class_requested}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Application Date</p>
                  <p className="font-medium">{new Date(selectedApp.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fees Paid</p>
                  <p className="font-medium">{selectedApp.fees_paid ? "Yes" : "No"}</p>
                </div>
              </div>
              
              {selectedApp.status === "pending" && (
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      setViewModalOpen(false);
                      setRejectModalOpen(true);
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setViewModalOpen(false);
                      setConfirmModalOpen(true);
                    }}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Confirm Approval Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Application</DialogTitle>
            <DialogDescription>
              This will admit the student and create accounts for both student and parent.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedApp && (
              <div>
                <p className="font-medium">{selectedApp.full_name}</p>
                <p className="text-sm text-muted-foreground mb-4">{selectedApp.email}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Select Class to Assign</p>
                  <Select
                    value={classId}
                    onValueChange={setClassId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(c => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {!selectedApp.fees_paid && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-900/50">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Warning: Fees have not been marked as paid.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)} disabled={processing}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={processing || !classId}>
              {processing ? "Processing..." : "Admit Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reject Modal */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this application?
            </DialogDescription>
          </DialogHeader>
          
          {selectedApp && (
            <div>
              <p className="font-medium">{selectedApp.full_name}</p>
              <p className="text-sm text-muted-foreground">{selectedApp.email}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectModalOpen(false)} disabled={processing}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedApp && handleUpdateStatus(selectedApp.id, 'rejected')} 
              disabled={processing}
            >
              {processing ? "Processing..." : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Applications;
