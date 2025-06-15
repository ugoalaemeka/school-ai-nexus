import React, { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  GraduationCap,
  School,
  UserCog,
  UserX,
  Download,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle
} from "lucide-react";

const UsersPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
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

  // Sample user data with Nigerian names and classes
  const users = [
    { id: 1, name: "Mrs. Funke Adebayo", email: "fadebayo@example.com", role: "teacher", status: "active", lastLogin: "2025-04-29", class: "Nursery 1", avatar: null },
    { id: 2, name: "Bola Tinubu", email: "bola.t@example.com", role: "student", status: "active", lastLogin: "2025-04-28", class: "JSS 2", avatar: null },
    { id: 3, name: "Mrs. Davis", email: "edavis@example.com", role: "parent", status: "active", lastLogin: "2025-04-25", class: "Parent of Alex", avatar: null },
    { id: 4, name: "Admin User", email: "admin@example.com", role: "admin", status: "active", lastLogin: "2025-04-30", class: "Administration", avatar: null },
    { id: 5, name: "Mr. Chinedu Okafor", email: "cokafor@example.com", role: "teacher", status: "active", lastLogin: "2025-04-10", class: "Primary 3", avatar: null },
    { id: 6, name: "Ngozi Okoro", email: "nokoro@example.com", role: "student", status: "active", lastLogin: "2025-04-28", class: "SSS 1 (Science)", avatar: null },
    { id: 7, name: "Alhaji Musa", email: "amusa@example.com", role: "parent", status: "pending", lastLogin: "N/A", class: "Parent of Ngozi", avatar: null },
    { id: 8, name: "Dayo Kuti", email: "dkuti@example.com", role: "student", status: "suspended", lastLogin: "2025-04-15", class: "Primary 6", avatar: null },
  ];

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const userCounts = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    students: users.filter(u => u.role === 'student').length,
    parents: users.filter(u => u.role === 'parent').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  const handleAddUser = (data: any) => {
    toast({
      title: "User created",
      description: `New ${data.role} account has been created.`,
    });
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `User status has been changed to ${newStatus}.`,
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
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground">Manage all users in the system</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account. They'll receive an email to set their password.
                  </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="student">
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="class">Class/Department</Label>
                    <Input id="class" placeholder="e.g., Class 10A or Mathematics" />
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit" onClick={() => handleAddUser({role: 'student'})}>Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* User Statistics */}
          <motion.div variants={itemVariant}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="bg-primary-50">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <h3 className="text-2xl font-bold">{userCounts.total}</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Active
                  </Badge>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-blue-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Students</p>
                  <h3 className="text-2xl font-bold">{userCounts.students}</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <School className="h-6 w-6 text-purple-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Teachers</p>
                  <h3 className="text-2xl font-bold">{userCounts.teachers}</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Users className="h-6 w-6 text-amber-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Parents</p>
                  <h3 className="text-2xl font-bold">{userCounts.parents}</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <UserCog className="h-6 w-6 text-red-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Admins</p>
                  <h3 className="text-2xl font-bold">{userCounts.admins}</h3>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* User Filter Area */}
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search by name or email..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                  <SelectItem value="parent">Parents</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2" onClick={toggleSortDirection}>
                Sort
                {sortDirection === "asc" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* User List */}
          <motion.div variants={itemVariant}>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
                <TabsTrigger value="admins">Administrators</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <Card>
                  <CardHeader className="px-6 py-4">
                    <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                      <div className="col-span-4 md:col-span-3">Name</div>
                      <div className="col-span-3 hidden md:block">Email</div>
                      <div className="col-span-3 md:col-span-2">Role</div>
                      <div className="col-span-3 md:col-span-2">Status</div>
                      <div className="col-span-2 hidden md:block">Last Login</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {filteredUsers.map((user) => (
                        <div 
                          key={user.id} 
                          className="grid grid-cols-12 px-6 py-3 items-center hover:bg-muted/50 transition-colors"
                        >
                          <div className="col-span-4 md:col-span-3 flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium truncate">{user.name}</span>
                              <span className="text-xs text-muted-foreground md:hidden truncate">{user.email}</span>
                            </div>
                          </div>
                          <div className="col-span-3 hidden md:block text-sm truncate">{user.email}</div>
                          <div className="col-span-3 md:col-span-2">
                            <Badge variant={
                              user.role === "admin" ? "default" :
                              user.role === "teacher" ? "outline" :
                              user.role === "student" ? "secondary" : 
                              "destructive"
                            } className="capitalize">
                              {user.role}
                            </Badge>
                          </div>
                          <div className="col-span-3 md:col-span-2">
                            <Badge variant={
                              user.status === "active" ? "default" :
                              user.status === "pending" ? "outline" :
                              user.status === "suspended" ? "destructive" : 
                              "outline"
                            } className="capitalize">
                              {user.status}
                            </Badge>
                          </div>
                          <div className="col-span-2 hidden md:block text-sm">{user.lastLogin}</div>
                          <div className="col-span-2 text-right flex justify-end">
                            <Select onValueChange={(value) => handleStatusChange(user.id, value)}>
                              <SelectTrigger className="w-[42px] h-9 px-2">
                                <SelectValue>
                                  <MoreHorizontal className="h-4 w-4" />
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent align="end">
                                <SelectItem value="view">View Details</SelectItem>
                                <SelectItem value="edit">Edit User</SelectItem>
                                <SelectItem value="active">Set Active</SelectItem>
                                <SelectItem value="inactive">Set Inactive</SelectItem>
                                <SelectItem value="suspended">Suspend User</SelectItem>
                                <SelectItem value="delete" className="text-destructive">Delete User</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between px-6 py-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="students" className="mt-0">
                {/* Content similar to All tab but filtered for students */}
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Select the "All Users" tab and use the Role filter to view students.
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="teachers" className="mt-0">
                {/* Content similar to All tab but filtered for teachers */}
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Select the "All Users" tab and use the Role filter to view teachers.
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="parents" className="mt-0">
                {/* Content similar to All tab but filtered for parents */}
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Select the "All Users" tab and use the Role filter to view parents.
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="admins" className="mt-0">
                {/* Content similar to All tab but filtered for admins */}
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Select the "All Users" tab and use the Role filter to view administrators.
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

export default UsersPage;
