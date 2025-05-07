
import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Teacher, SupabaseJsonResponse } from "@/types/database";
import { Check, X, Mail, UserPlus } from "lucide-react";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Array<{ id: string, name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>("");
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    teacherName: "",
    teacherEmail: "",
    classId: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [assignClassOpen, setAssignClassOpen] = useState(false);
  const [teacherForClassAssign, setTeacherForClassAssign] = useState<Teacher | null>(null);
  
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_teachers');
      
      if (error) {
        toast.error(`Error fetching teachers: ${error.message}`);
        return;
      }
      
      // Cast data to Teacher[] with type assertion
      setTeachers(data as unknown as Teacher[]);
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
    fetchTeachers();
    fetchClasses();
  }, []);
  
  const handleToggleStatus = async (teacherId: string, isCurrentlyActive: boolean) => {
    try {
      const { data, error } = await supabase.rpc('toggle_teacher_status', {
        teacher_user_id: teacherId,
        set_active: !isCurrentlyActive
      });
      
      if (error) {
        toast.error(`Error updating teacher status: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success(result.message || "Teacher status updated!");
        fetchTeachers(); // Refresh the list
      } else {
        toast.error(result.message || "Failed to update teacher status");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };
  
  const handleInviteTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.rpc('create_teacher_with_invite', {
        teacher_name: inviteData.teacherName,
        teacher_email: inviteData.teacherEmail,
        class_id: inviteData.classId
      });
      
      if (error) {
        toast.error(`Error inviting teacher: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Teacher invited successfully!");
        // Show activation link
        toast.info(`Activation link will be sent to: ${result.email}`);
        fetchTeachers(); // Refresh the list
        setFormOpen(false);
        setInviteData({ teacherName: "", teacherEmail: "", classId: "" });
      } else {
        toast.error(result.message || "Failed to invite teacher");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleResetPassword = async () => {
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.rpc('reset_teacher_password', {
        teacher_email: resetPasswordEmail
      });
      
      if (error) {
        toast.error(`Error resetting password: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Password reset successful!");
        toast.info(`Reset link will be sent to: ${result.email}`);
        setResetPasswordOpen(false);
        setResetPasswordEmail("");
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleAssignClass = async () => {
    if (!teacherForClassAssign || !selectedClass) {
      toast.error("Missing required information");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.rpc('assign_teacher_to_class', {
        teacher_id: teacherForClassAssign.id,
        class_id: selectedClass
      });
      
      if (error) {
        toast.error(`Error assigning class: ${error.message}`);
        return;
      }
      
      const result = data as unknown as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Teacher assigned to class successfully!");
        fetchTeachers(); // Refresh the list
        setAssignClassOpen(false);
        setTeacherForClassAssign(null);
        setSelectedClass("");
      } else {
        toast.error(result.message || "Failed to assign class");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const columns = [
    {
      header: "Name",
      accessorFn: (row: Teacher) => `${row.first_name} ${row.last_name}`,
      cell: ({ row }: { row: { original: Teacher } }) => {
        return (
          <div>
            {row.original.first_name} {row.original.last_name}
          </div>
        );
      }
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Class",
      accessorKey: "class_name",
      cell: ({ row }: { row: { original: Teacher } }) => {
        return row.original.class_name || "Unassigned";
      }
    },
    {
      header: "Status",
      accessorKey: "is_active",
      cell: ({ row }: { row: { original: Teacher } }) => {
        return row.original.is_active ? 
          <Badge className="bg-green-500">Active</Badge> : 
          <Badge className="bg-red-500">Inactive</Badge>;
      }
    },
    {
      header: "Actions",
      cell: ({ row }: { row: { original: Teacher } }) => {
        const teacher = row.original;
        
        return (
          <div className="flex gap-2">
            <Button 
              variant={teacher.is_active ? "destructive" : "default"} 
              size="sm"
              onClick={() => handleToggleStatus(teacher.user_id, teacher.is_active)}
            >
              {teacher.is_active ? <X className="h-4 w-4 mr-1" /> : <Check className="h-4 w-4 mr-1" />}
              {teacher.is_active ? "Disable" : "Enable"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTeacherForClassAssign(teacher);
                setAssignClassOpen(true);
                setSelectedClass(teacher.class_assigned || "");
              }}
            >
              Assign Class
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Teachers Management</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setResetPasswordOpen(true)}
            >
              <Mail className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
            
            <Button onClick={() => setFormOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Teacher
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Teachers</CardTitle>
            <CardDescription>
              Manage all teachers in the system. You can enable/disable accounts and assign classes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={teachers} 
            />
            
            {loading && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Invite New Teacher Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New Teacher</DialogTitle>
            <DialogDescription>
              Fill out the form to invite a new teacher to the platform.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleInviteTeacher}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="teacherName">Teacher Name</Label>
                <Input
                  id="teacherName"
                  placeholder="Full Name"
                  value={inviteData.teacherName}
                  onChange={(e) => setInviteData({...inviteData, teacherName: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teacherEmail">Email</Label>
                <Input
                  id="teacherEmail"
                  type="email"
                  placeholder="teacher@example.com"
                  value={inviteData.teacherEmail}
                  onChange={(e) => setInviteData({...inviteData, teacherEmail: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="classId">Assign to Class</Label>
                <Select
                  value={inviteData.classId}
                  onValueChange={(value) => setInviteData({...inviteData, classId: value})}
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
              <Button variant="outline" onClick={() => setFormOpen(false)} disabled={isProcessing}>
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? "Inviting..." : "Send Invite"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Reset Password Dialog */}
      <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Teacher Password</DialogTitle>
            <DialogDescription>
              Enter the teacher's email to send them a password reset link.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resetEmail">Teacher Email</Label>
              <Input
                id="resetEmail"
                type="email"
                placeholder="teacher@example.com"
                value={resetPasswordEmail}
                onChange={(e) => setResetPasswordEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetPasswordOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword} disabled={isProcessing || !resetPasswordEmail}>
              {isProcessing ? "Processing..." : "Reset Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Assign Class Dialog */}
      <Dialog open={assignClassOpen} onOpenChange={setAssignClassOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Class to Teacher</DialogTitle>
            <DialogDescription>
              {teacherForClassAssign && (
                <>Select a class to assign to {teacherForClassAssign.first_name} {teacherForClassAssign.last_name}.</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="classSelect">Class</Label>
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
            <Button variant="outline" onClick={() => setAssignClassOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleAssignClass} disabled={isProcessing || !selectedClass}>
              {isProcessing ? "Assigning..." : "Assign Class"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TeachersPage;
