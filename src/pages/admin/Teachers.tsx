
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Search,
  Mail,
  Check,
  X,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface Teacher {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  employment_status: string;
  class_assigned: string;
  class_name: string;
  created_at: string;
}

interface Class {
  id: string;
  name: string;
}

const TeachersPage = () => {
  const { user, profile } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Form state for adding new teacher
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherClassId, setNewTeacherClassId] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  // State for invite link modal
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteExpiry, setInviteExpiry] = useState("");
  
  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, [filter]);
  
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc(
        'get_teachers', 
        filter !== 'all' ? { status: filter } : {}
      );
      
      if (error) {
        throw error;
      }
      
      setTeachers(data || []);
    } catch (error: any) {
      toast.error(`Failed to load teachers: ${error.message}`);
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
        throw error;
      }
      
      setClasses(data || []);
    } catch (error: any) {
      toast.error(`Failed to load classes: ${error.message}`);
    }
  };
  
  const handleAddTeacher = async () => {
    if (!newTeacherName || !newTeacherEmail || !newTeacherClassId) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      const { data, error } = await supabase.rpc(
        'create_teacher_with_invite',
        {
          teacher_name: newTeacherName,
          teacher_email: newTeacherEmail,
          class_id: newTeacherClassId
        }
      );
      
      if (error) {
        throw error;
      }
      
      if (!data.success) {
        toast.error(data.message || "Failed to create teacher");
        return;
      }
      
      // Show the invite link dialog
      setInviteLink(`${window.location.origin}/activate?token=${data.token}`);
      setInviteExpiry(new Date(data.expires_at).toLocaleString());
      setShowInviteDialog(true);
      
      // Reset form
      setNewTeacherName("");
      setNewTeacherEmail("");
      setNewTeacherClassId("");
      setIsAddDialogOpen(false);
      
      // Refresh the list
      fetchTeachers();
      
      toast.success("Teacher created successfully");
    } catch (error: any) {
      toast.error(`Failed to create teacher: ${error.message}`);
    }
  };
  
  const handleResetPassword = async () => {
    if (!selectedTeacher) return;
    
    try {
      const { data, error } = await supabase.rpc(
        'reset_teacher_password',
        {
          teacher_email: selectedTeacher.email
        }
      );
      
      if (error) {
        throw error;
      }
      
      if (!data.success) {
        toast.error(data.message || "Failed to reset password");
        return;
      }
      
      // Show the invite link dialog
      setInviteLink(`${window.location.origin}/activate?token=${data.token}`);
      setInviteExpiry(new Date(data.expires_at).toLocaleString());
      setShowInviteDialog(true);
      
      setIsResetDialogOpen(false);
      setSelectedTeacher(null);
      
      toast.success("Password reset link created successfully");
    } catch (error: any) {
      toast.error(`Failed to reset password: ${error.message}`);
    }
  };
  
  const handleToggleStatus = async (teacher: Teacher) => {
    try {
      const { data, error } = await supabase.rpc(
        'toggle_teacher_status',
        {
          teacher_user_id: teacher.user_id,
          set_active: !teacher.is_active
        }
      );
      
      if (error) {
        throw error;
      }
      
      if (!data.success) {
        toast.error(data.message || "Failed to update teacher status");
        return;
      }
      
      // Refresh the list
      fetchTeachers();
      
      toast.success(`Teacher ${!teacher.is_active ? 'activated' : 'deactivated'} successfully`);
    } catch (error: any) {
      toast.error(`Failed to update teacher status: ${error.message}`);
    }
  };
  
  const handleAssignClass = async (teacherId: string, classId: string) => {
    try {
      const { data, error } = await supabase.rpc(
        'assign_teacher_to_class',
        {
          teacher_id: teacherId,
          class_id: classId
        }
      );
      
      if (error) {
        throw error;
      }
      
      if (!data.success) {
        toast.error(data.message || "Failed to assign class");
        return;
      }
      
      // Refresh the list
      fetchTeachers();
      
      toast.success("Class assigned successfully");
    } catch (error: any) {
      toast.error(`Failed to assign class: ${error.message}`);
    }
  };
  
  const filteredTeachers = teachers.filter(teacher => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      teacher.first_name?.toLowerCase().includes(query) || 
      teacher.last_name?.toLowerCase().includes(query) ||
      teacher.email?.toLowerCase().includes(query) ||
      teacher.class_name?.toLowerCase().includes(query)
    );
  });
  
  // Helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard");
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Teacher Management</h1>
            <p className="text-muted-foreground">
              Create, edit and manage teacher accounts
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Teacher
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teachers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Class</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No teachers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        {teacher.first_name} {teacher.last_name}
                      </TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>
                        <Badge variant={teacher.is_active ? "success" : "destructive"}>
                          {teacher.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={teacher.class_assigned || ""}
                          onValueChange={(value) => handleAssignClass(teacher.id, value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="No class assigned" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map(c => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {teacher.created_at ? format(new Date(teacher.created_at), 'MMM d, yyyy') : '-'}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setIsResetDialogOpen(true);
                          }}
                          title="Reset Password"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={teacher.is_active ? "destructive" : "default"} 
                          size="icon"
                          onClick={() => handleToggleStatus(teacher)}
                          title={teacher.is_active ? "Deactivate" : "Activate"}
                        >
                          {teacher.is_active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Teacher Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Create a new teacher account. An invitation email will be sent to the teacher to set up their account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="teacher@example.com"
                value={newTeacherEmail}
                onChange={(e) => setNewTeacherEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Assign Class</Label>
              <Select value={newTeacherClassId} onValueChange={setNewTeacherClassId}>
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
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTeacher}>
              Create Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reset Password Dialog */}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset the password for {selectedTeacher?.first_name} {selectedTeacher?.last_name}?
              A new activation link will be generated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword}>
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Link Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Teacher Invitation Link</DialogTitle>
            <DialogDescription>
              Share this activation link with the teacher.
              The link will expire on {inviteExpiry}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="inviteLink">Activation Link</Label>
              <div className="flex gap-2">
                <Input
                  id="inviteLink"
                  value={inviteLink}
                  readOnly
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(inviteLink)}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
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
