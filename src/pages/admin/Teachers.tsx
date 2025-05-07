
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MoreHorizontal, Plus, RefreshCw, UserPlus } from "lucide-react";
import { Teacher, SupabaseJsonResponse } from "@/types/database";
import { format } from "date-fns";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // New teacher form
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherClass, setNewTeacherClass] = useState("");
  const [addingTeacher, setAddingTeacher] = useState(false);
  
  // Reset password dialog
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [resettingPassword, setResettingPassword] = useState(false);
  
  // Invite link dialog
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteExpiry, setInviteExpiry] = useState("");
  
  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, [activeTab]);
  
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      
      // Use the stored function to get teachers based on status
      const status = activeTab === "active" ? "active" : 
                     activeTab === "inactive" ? "inactive" : null;
      
      const { data, error } = await supabase.rpc(
        'get_teachers',
        { status }
      );
      
      if (error) {
        toast.error("Failed to fetch teachers: " + error.message);
        return;
      }
      
      setTeachers(data as Teacher[]);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("An error occurred while fetching teachers");
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
        toast.error("Failed to fetch classes");
        return;
      }
      
      setClasses(data || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  
  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTeacherName.trim() || !newTeacherEmail.trim() || !newTeacherClass) {
      toast.error("Please complete all fields");
      return;
    }
    
    try {
      setAddingTeacher(true);
      
      const { data, error } = await supabase.rpc(
        'create_teacher_with_invite',
        {
          teacher_name: newTeacherName,
          teacher_email: newTeacherEmail,
          class_id: newTeacherClass
        }
      );
      
      if (error) {
        toast.error("Failed to create teacher: " + error.message);
        return;
      }
      
      const result = data as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Teacher created successfully!");
        // Reset form
        setNewTeacherName("");
        setNewTeacherEmail("");
        setNewTeacherClass("");
        setShowAddDialog(false);
        
        // Show invite link
        setInviteLink(`${window.location.origin}/activate?token=${result.token}`);
        setInviteExpiry(result.expires_at || '');
        setShowInviteDialog(true);
        
        // Refresh teacher list
        fetchTeachers();
      } else {
        toast.error(result.message || "Failed to create teacher");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setAddingTeacher(false);
    }
  };
  
  const handleResetPassword = async () => {
    if (!selectedTeacher) return;
    
    try {
      setResettingPassword(true);
      
      const { data, error } = await supabase.rpc(
        'reset_teacher_password',
        { teacher_email: selectedTeacher.email }
      );
      
      if (error) {
        toast.error("Failed to reset password: " + error.message);
        return;
      }
      
      const result = data as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Password reset link generated");
        setShowResetDialog(false);
        
        // Show invite link
        setInviteLink(`${window.location.origin}/activate?token=${result.token}`);
        setInviteExpiry(result.expires_at || '');
        setShowInviteDialog(true);
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setResettingPassword(false);
    }
  };
  
  const handleToggleActive = async (teacher: Teacher) => {
    if (!teacher.user_id) {
      toast.error("Cannot toggle status for pending teacher");
      return;
    }
    
    try {
      const { data, error } = await supabase.rpc(
        'toggle_teacher_status',
        { 
          teacher_user_id: teacher.user_id,
          set_active: !teacher.is_active
        }
      );
      
      if (error) {
        toast.error("Failed to update status: " + error.message);
        return;
      }
      
      const result = data as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success(result.message || "Status updated successfully");
        fetchTeachers();
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };
  
  const handleAssignClass = async (teacher: Teacher, classId: string) => {
    try {
      const { data, error } = await supabase.rpc(
        'assign_teacher_to_class',
        { 
          teacher_id: teacher.id,
          class_id: classId
        }
      );
      
      if (error) {
        toast.error("Failed to assign class: " + error.message);
        return;
      }
      
      const result = data as SupabaseJsonResponse;
      
      if (result.success) {
        toast.success("Class assigned successfully");
        fetchTeachers();
      } else {
        toast.error(result.message || "Failed to assign class");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };
  
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard");
  };
  
  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Teachers Management</h1>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={fetchTeachers}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>
                    Create a new teacher account and send an invitation.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleCreateTeacher} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacherName">Full Name</Label>
                    <Input 
                      id="teacherName"
                      placeholder="John Smith"
                      value={newTeacherName}
                      onChange={(e) => setNewTeacherName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="teacherEmail">Email Address</Label>
                    <Input 
                      id="teacherEmail"
                      type="email"
                      placeholder="john.smith@example.com"
                      value={newTeacherEmail}
                      onChange={(e) => setNewTeacherEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="teacherClass">Assign to Class</Label>
                    <Select 
                      value={newTeacherClass} 
                      onValueChange={setNewTeacherClass}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={addingTeacher}>
                      {addingTeacher ? "Creating..." : "Create & Invite"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Teachers</CardTitle>
                <CardDescription>
                  Manage teacher accounts, invitations, and permissions.
                </CardDescription>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : teachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      No teachers found
                    </TableCell>
                  </TableRow>
                ) : (
                  teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">
                        {teacher.first_name} {teacher.last_name}
                      </TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>
                        <Select 
                          value={teacher.class_assigned || ""}
                          onValueChange={(classId) => handleAssignClass(teacher, classId)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Not assigned" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {!teacher.user_id ? (
                          <Badge variant="warning">Pending</Badge>
                        ) : teacher.is_active ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {teacher.created_at ? (
                          format(new Date(teacher.created_at), 'PP')
                        ) : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {teacher.user_id && (
                              <DropdownMenuItem 
                                onClick={() => handleToggleActive(teacher)}
                              >
                                {teacher.is_active ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                            )}
                            
                            {teacher.user_id && (
                              <>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedTeacher(teacher);
                                  setShowResetDialog(true);
                                }}>
                                  Reset Password
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            )}
                            
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Reset Password Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              This will generate a new password reset link for {selectedTeacher?.first_name} {selectedTeacher?.last_name}.
              The link will be valid for 48 hours.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleResetPassword}
              disabled={resettingPassword}
            >
              {resettingPassword ? "Generating Link..." : "Reset Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Link Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Teacher Invitation</DialogTitle>
            <DialogDescription>
              Share this activation link with the teacher. The link will expire in 48 hours.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Activation Link</Label>
              <div className="flex items-center">
                <Input 
                  value={inviteLink} 
                  readOnly 
                  className="flex-1 mr-2"
                />
                <Button variant="outline" onClick={copyInviteLink} type="button">
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Expires: {inviteExpiry ? format(new Date(inviteExpiry), 'PPp') : '-'}
              </p>
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm">
                <span className="font-semibold">Note:</span> You should send this link to the teacher 
                via email or other secure means. The teacher will use this link to create their password
                and activate their account.
              </p>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button onClick={() => setShowInviteDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TeachersPage;
