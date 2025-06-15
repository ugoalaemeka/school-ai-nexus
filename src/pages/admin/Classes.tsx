import React, { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  BookOpenCheck,
  PlusCircle,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Users,
  Clock,
  GraduationCap,
  School,
  FileText,
  Calendar,
  Check
} from "lucide-react";

const ClassesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("classes");
  
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

  // Sample class data reflecting Nigerian school structure
  const classes = [
    { id: 1, name: "Nursery 1", students: 20, teacher: "Mrs. Funke Adebayo", subjects: 5, schedule: "Mon-Fri, 8:30 AM - 1:00 PM" },
    { id: 2, name: "Primary 3", students: 28, teacher: "Mr. Chinedu Okafor", subjects: 9, schedule: "Mon-Fri, 8:00 AM - 2:30 PM" },
    { id: 3, name: "JSS 2", students: 35, teacher: "Sarah Johnson", subjects: 10, schedule: "Mon-Fri, 8:00 AM - 3:30 PM" },
    { id: 4, name: "SSS 1 (Science)", students: 30, teacher: "Robert Wilson", subjects: 9, schedule: "Mon-Fri, 8:00 AM - 4:00 PM" },
    { id: 5, name: "SSS 2 (Arts)", students: 25, teacher: "Emily Davis", subjects: 9, schedule: "Mon-Fri, 8:00 AM - 4:00 PM" },
    { id: 6, name: "SSS 3 (Commercial)", students: 22, teacher: "David Martinez", subjects: 9, schedule: "Mon-Fri, 8:00 AM - 4:00 PM" },
  ];

  // Sample subjects data reflecting Nigerian curriculum
  const subjects = [
    { id: 1, name: "Mathematics", code: "JSS-MTH", classes: ["JSS 1", "JSS 2", "JSS 3"], teacher: "Jennifer Taylor", schedule: "Mon, Wed, Fri" },
    { id: 2, name: "English Language", code: "JSS-ENG", classes: ["JSS 1", "JSS 2", "JSS 3"], teacher: "Sarah Johnson", schedule: "Mon, Tue, Wed" },
    { id: 3, name: "Basic Science", code: "JSS-BSC", classes: ["JSS 1", "JSS 2"], teacher: "David Martinez", schedule: "Tue, Thu, Fri" },
    { id: 4, name: "Physics", code: "SSS-PHY", classes: ["SSS 1", "SSS 2", "SSS 3"], teacher: "Robert Wilson", schedule: "Tue, Thu" },
    { id: 5, name: "Literature in English", code: "SSS-LIT", classes: ["SSS 1", "SSS 2", "SSS 3"], teacher: "Emily Davis", schedule: "Mon, Wed" },
    { id: 6, name: "Accounting", code: "SSS-ACC", classes: ["SSS 1", "SSS 2", "SSS 3"], teacher: "Michael Brown", schedule: "Wed, Thu" },
    { id: 7, name: "Civic Education", code: "JSS-CIV", classes: ["JSS 1-3"], teacher: "Amanda Rodriguez", schedule: "Mon, Fri" },
    { id: 8, name: "Yoruba Language", code: "GEN-YOR", classes: ["All Classes"], teacher: "Mrs. Adebayo", schedule: "Tue, Thu" },
  ];

  // Filter the data based on search query
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClass = () => {
    toast({
      title: "Class created",
      description: "New class has been added to the system.",
    });
  };

  const handleAddSubject = () => {
    toast({
      title: "Subject created",
      description: "New subject has been added to the system.",
    });
  };

  const handleDeleteItem = (type: string, id: number) => {
    toast({
      title: `${type} deleted`,
      description: `The ${type.toLowerCase()} has been removed from the system.`,
      variant: "destructive",
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
              <h1 className="text-3xl font-bold">Classes & Subjects</h1>
              <p className="text-muted-foreground">Manage school classes and academic subjects</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    {currentTab === "classes" ? "Add New Class" : "Add New Subject"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {currentTab === "classes" ? "Add New Class" : "Add New Subject"}
                    </DialogTitle>
                    <DialogDescription>
                      {currentTab === "classes" 
                        ? "Create a new class with assigned teacher and schedule." 
                        : "Create a new subject with teacher assignment and schedule."}
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    {currentTab === "classes" ? (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="level">School Level</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nursery">Nursery</SelectItem>
                              <SelectItem value="primary">Primary</SelectItem>
                              <SelectItem value="jss">Junior Secondary</SelectItem>
                              <SelectItem value="sss">Senior Secondary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="className">Class Name</Label>
                          <Input id="className" placeholder="e.g., JSS 1A or Primary 2" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="classTeacher">Class Teacher</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sarah">Sarah Johnson</SelectItem>
                              <SelectItem value="robert">Robert Wilson</SelectItem>
                              <SelectItem value="emily">Emily Davis</SelectItem>
                              <SelectItem value="david">David Martinez</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="schedule">Class Schedule</Label>
                          <Input id="schedule" placeholder="e.g., Mon-Fri, 8:00 AM - 3:30 PM" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="capacity">Maximum Students</Label>
                          <Input id="capacity" type="number" placeholder="e.g., 35" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="subjectName">Subject Name</Label>
                          <Input id="subjectName" placeholder="e.g., Mathematics" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="subjectCode">Subject Code</Label>
                          <Input id="subjectCode" placeholder="e.g., JSS-MTH" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="subjectTeacher">Subject Teacher</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jennifer">Jennifer Taylor</SelectItem>
                              <SelectItem value="robert">Robert Wilson</SelectItem>
                              <SelectItem value="emily">Emily Davis</SelectItem>
                              <SelectItem value="david">David Martinez</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="classAssignment">Assign to Classes</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select classes" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nursery">Nursery Classes</SelectItem>
                              <SelectItem value="primary">Primary Classes</SelectItem>
                              <SelectItem value="jss">JSS Classes</SelectItem>
                              <SelectItem value="sss-science">SSS Science</SelectItem>
                              <SelectItem value="sss-arts">SSS Arts</SelectItem>
                              <SelectItem value="sss-commercial">SSS Commercial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="schedule">Weekly Schedule</Label>
                          <Input id="schedule" placeholder="e.g., Mon, Wed, Fri" />
                        </div>
                      </>
                    )}
                  </form>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={currentTab === "classes" ? handleAddClass : handleAddSubject}
                    >
                      {currentTab === "classes" ? "Create Class" : "Create Subject"}
                    </Button>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <School className="h-6 w-6 text-blue-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                  <h3 className="text-2xl font-bold">{classes.length}</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <BookOpen className="h-6 w-6 text-purple-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Total Subjects</p>
                  <h3 className="text-2xl font-bold">{subjects.length}</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Users className="h-6 w-6 text-amber-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Students</p>
                  <h3 className="text-2xl font-bold">190</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-green-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Teachers</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Filter Area */}
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={currentTab === "classes" ? "Search classes..." : "Search subjects..."} 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="current">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Term</SelectItem>
                  <SelectItem value="previous">Previous Term</SelectItem>
                  <SelectItem value="next">Next Term</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </motion.div>

          {/* Tabs for Classes and Subjects */}
          <motion.div variants={itemVariant}>
            <Tabs 
              defaultValue="classes" 
              className="w-full"
              onValueChange={(value) => setCurrentTab(value)}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="classes">Classes</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="schedule">Master Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="classes" className="mt-0">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Name</TableHead>
                        <TableHead className="hidden md:table-cell">Class Teacher</TableHead>
                        <TableHead className="hidden md:table-cell">Students</TableHead>
                        <TableHead className="hidden md:table-cell">Subjects</TableHead>
                        <TableHead className="hidden md:table-cell">Schedule</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClasses.map((classItem) => (
                        <TableRow key={classItem.id}>
                          <TableCell>
                            <div className="font-medium">{classItem.name}</div>
                            <div className="text-sm text-muted-foreground md:hidden">
                              Teacher: {classItem.teacher}
                            </div>
                            <div className="text-sm text-muted-foreground md:hidden">
                              {classItem.students} students • {classItem.subjects} subjects
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{classItem.teacher}</TableCell>
                          <TableCell className="hidden md:table-cell">{classItem.students}</TableCell>
                          <TableCell className="hidden md:table-cell">{classItem.subjects}</TableCell>
                          <TableCell className="hidden md:table-cell">{classItem.schedule}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="Edit Class">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost" 
                                size="icon"
                                title="Delete Class" 
                                onClick={() => handleDeleteItem("Class", classItem.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              <TabsContent value="subjects" className="mt-0">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead className="hidden md:table-cell">Teacher</TableHead>
                        <TableHead className="hidden md:table-cell">Classes</TableHead>
                        <TableHead className="hidden md:table-cell">Schedule</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell>
                            <div className="font-medium">{subject.name}</div>
                            <div className="text-sm text-muted-foreground md:hidden">
                              Teacher: {subject.teacher}
                            </div>
                            <div className="text-sm text-muted-foreground md:hidden">
                              Classes: {subject.classes.join(", ")}
                            </div>
                          </TableCell>
                          <TableCell>{subject.code}</TableCell>
                          <TableCell className="hidden md:table-cell">{subject.teacher}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {subject.classes.map((cls, index) => (
                                <Badge key={index} variant="outline">{cls}</Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{subject.schedule}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="Edit Subject">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost" 
                                size="icon"
                                title="Delete Subject" 
                                onClick={() => handleDeleteItem("Subject", subject.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center p-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Master Schedule Builder</h3>
                      <p className="text-muted-foreground mb-4">
                        Build and manage the school's master schedule by assigning classes, teachers, and rooms.
                      </p>
                      <Button>Open Schedule Builder</Button>
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

export default ClassesPage;
