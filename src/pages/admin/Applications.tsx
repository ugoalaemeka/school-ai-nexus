
import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Application, SupabaseJsonResponse } from "@/types/database";
import { PlusCircle, Check, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [admittingStudent, setAdmittingStudent] = useState<Application | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [classes, setClasses] = useState<Array<{ id: string, name: string }>>([]);
  const [isAdmitting, setIsAdmitting] = useState(false);
  
  // Fetch applications and classes
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_applications');
      
      if (error) {
        toast.error(`Error fetching applications: ${error.message}`);
        return;
      }
      
      // Proper type casting
      setApplications((data as unknown) as Application[] || []);
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
  }, []);
  
  // Handle student admission
  const handleAdmitStudent = async () => {
    if (!admittingStudent || !selectedClass) {
      toast.error("Please select a class");
      return;
    }
    
    setIsAdmitting(true);
    
    try {
      const { data, error } = await supabase
        .rpc('admit_student', {
          application_id: admittingStudent.id,
          class_id: selectedClass
        });
      
      if (error) {
        toast.error(`Error admitting student: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Student admitted successfully!");
        // Show activation info
        toast.info(`Activation emails sent to student (${result.student_email}) and parent (${result.parent_email})`);
        fetchApplications(); // Refresh the list
        setAdmittingStudent(null);
      } else {
        toast.error(result.message || "Failed to admit student");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsAdmitting(false);
    }
  };
  
  const handleMarkFeesPaid = async (application: Application) => {
    try {
      const { data, error } = await supabase
        .rpc('update_application_status', {
          application_id: application.id,
          new_status: application.status,
          set_fees_paid: true
        });
      
      if (error) {
        toast.error(`Error updating fees status: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Fees marked as paid!");
        fetchApplications(); // Refresh the list
      } else {
        toast.error(result.message || "Failed to update fees status");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };
  
  const handleUpdateStatus = async (application: Application, newStatus: string) => {
    try {
      const { data, error } = await supabase
        .rpc('update_application_status', {
          application_id: application.id,
          new_status: newStatus
        });
      
      if (error) {
        toast.error(`Error updating application status: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success(`Application marked as ${newStatus}!`);
        fetchApplications(); // Refresh the list
      } else {
        toast.error(result.message || "Failed to update application status");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };
  
  // Table columns definition
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
        const status = row.original.status;
        return (
          <Badge 
            className={
              status === "pending" ? "bg-yellow-500" : 
              status === "admitted" ? "bg-green-500" :
              status === "rejected" ? "bg-red-500" : "bg-gray-500"
            }
          >
            {status}
          </Badge>
        );
      }
    },
    {
      header: "Fees Paid",
      accessorKey: "fees_paid",
      cell: ({ row }: { row: { original: Application } }) => {
        return row.original.fees_paid ? 
          <Check className="h-5 w-5 text-green-500" /> : 
          <XCircle className="h-5 w-5 text-red-500" />;
      }
    },
    {
      header: "Date Applied",
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
            {!app.fees_paid && app.status === "pending" && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleMarkFeesPaid(app)}
              >
                Mark Fees Paid
              </Button>
            )}
            
            {app.status === "pending" && app.fees_paid && (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setAdmittingStudent(app)}
              >
                Admit Student
              </Button>
            )}
            
            {app.status === "pending" && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleUpdateStatus(app, "rejected")}
              >
                Reject
              </Button>
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
          <h1 className="text-3xl font-bold">Student Applications</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
            <CardDescription>
              Manage all student applications. Mark fees as paid, admit students, or reject applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={applications} 
            />
            
            {loading && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
            
            {!loading && applications.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-xl">No Applications Found</h3>
                <p className="text-muted-foreground mt-2">
                  There are no student applications in the system yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Admit Student Dialog */}
      <Dialog open={!!admittingStudent} onOpenChange={() => setAdmittingStudent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admit Student</DialogTitle>
            <DialogDescription>
              {admittingStudent && (
                <>
                  Select a class to assign <strong>{admittingStudent.full_name}</strong> to.
                  This will create accounts for both the student and parent.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="class">Assign to Class</label>
              <Select
                value={selectedClass}
                onValueChange={setSelectedClass}
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
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdmittingStudent(null)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAdmitStudent} 
              disabled={isAdmitting || !selectedClass}
            >
              {isAdmitting ? "Admitting..." : "Admit Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Applications;
