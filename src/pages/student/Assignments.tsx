
import React, { useState } from "react";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  PenSquare,
  ChevronRight,
  XCircle,
  Clock8,
  GraduationCap
} from "lucide-react";

// Sample assignment data
const assignmentData = [
  { 
    id: 1, 
    title: "Mathematical Problem Sets", 
    subject: "Mathematics", 
    dueDate: "2025-04-15", 
    status: "pending", 
    progress: 20,
    description: "Complete problems 1-20 in Chapter 5 of the textbook. Show all work clearly and submit as a single PDF file.",
    teacher: "Mrs. Jenkins",
    grade: null,
    feedback: null
  },
  { 
    id: 2, 
    title: "English Essay", 
    subject: "English", 
    dueDate: "2025-04-20", 
    status: "pending", 
    progress: 60,
    description: "Write a 1000-word analytical essay on the themes in 'To Kill a Mockingbird'. Use APA citation format.",
    teacher: "Mr. Rodriguez",
    grade: null,
    feedback: null
  },
  { 
    id: 3, 
    title: "Physics Lab Report", 
    subject: "Physics", 
    dueDate: "2025-04-12", 
    status: "submitted",
    progress: 100,
    description: "Document your findings from the pendulum experiment. Include all data tables, calculations and error analysis.",
    teacher: "Dr. Thompson",
    grade: "A-",
    feedback: "Excellent work on the error analysis section. Your graphs could use better labeling. Overall, a very thorough report."
  },
  { 
    id: 4, 
    title: "History Research Project", 
    subject: "History", 
    dueDate: "2025-04-10", 
    status: "graded",
    progress: 100,
    description: "Research and present on a significant historical event from the 20th century. Include primary and secondary sources.",
    teacher: "Mr. Anderson",
    grade: "B+",
    feedback: "Good research and analysis. Could have used more diverse sources. The presentation was well-structured."
  },
  { 
    id: 5, 
    title: "Programming Assignment", 
    subject: "Computer Science", 
    dueDate: "2025-04-18", 
    status: "pending",
    progress: 40,
    description: "Create a simple web application using HTML, CSS, and JavaScript. The app should fetch and display data from a provided API.",
    teacher: "Ms. Wilson",
    grade: null,
    feedback: null
  },
  { 
    id: 6, 
    title: "Biology Field Study", 
    subject: "Biology", 
    dueDate: "2025-04-25", 
    status: "pending",
    progress: 0,
    description: "Conduct a field study of local plant species. Document with photographs and identify at least 10 different species.",
    teacher: "Dr. Martinez",
    grade: null,
    feedback: null
  },
];

// Subject colors
const subjectColors: Record<string, string> = {
  "Mathematics": "bg-blue-500",
  "English": "bg-green-500",
  "Physics": "bg-purple-500",
  "History": "bg-amber-500",
  "Computer Science": "bg-indigo-500",
  "Biology": "bg-teal-500",
};

const AssignmentsPage = () => {
  const [filter, setFilter] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<null | typeof assignmentData[0]>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { toast } = useToast();

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

  // Filter assignments based on user selection
  const filteredAssignments = assignmentData
    .filter(assignment => {
      if (filter !== "all" && assignment.status !== filter) return false;
      if (selectedSubject !== "all" && assignment.subject !== selectedSubject) return false;
      if (searchQuery !== "" && !assignment.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  // Get unique subjects from the assignment data
  const subjects = [...new Set(assignmentData.map(item => item.subject))];

  // Calculate days left until the due date
  const getDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle assignment submission
  const handleSubmitAssignment = () => {
    toast({
      title: "Assignment Submitted!",
      description: "Your assignment has been successfully submitted.",
    });
    setUploadDialogOpen(false);
  };

  return (
    <StudentSidebar>
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
              <h1 className="text-3xl font-bold">Assignments</h1>
              <p className="text-muted-foreground">Track and submit your homework and projects</p>
            </div>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Submit New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Submit Assignment</DialogTitle>
                  <DialogDescription>
                    Upload your completed assignment here. Supported formats: PDF, DOCX, ZIP.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Select defaultValue="Select Assignment">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Assignment" />
                      </SelectTrigger>
                      <SelectContent>
                        {assignmentData
                          .filter(a => a.status === "pending")
                          .map(assignment => (
                            <SelectItem key={assignment.id} value={assignment.id.toString()}>
                              {assignment.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Input id="file" type="file" />
                    </div>
                    <div className="space-y-2">
                      <Select defaultValue="draft">
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Save as Draft</SelectItem>
                          <SelectItem value="final">Final Submission</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Textarea placeholder="Add a comment for your teacher (optional)" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSubmitAssignment}>Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariant} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-1 gap-2 w-full sm:w-auto">
              <Select defaultValue="all" onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search assignments..." 
                  className="pl-8 h-9 w-full" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {/* Assignment Cards */}
          {filteredAssignments.length > 0 ? (
            <motion.div 
              variants={itemVariant}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredAssignments.map((assignment) => {
                const daysLeft = getDaysLeft(assignment.dueDate);
                
                return (
                  <Card key={assignment.id} className="overflow-hidden">
                    <div className={`w-full h-1 ${subjectColors[assignment.subject] || 'bg-gray-500'}`}></div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${assignment.subject === "Mathematics" ? "bg-blue-100 text-blue-800" : ""}`}
                        >
                          {assignment.subject}
                        </Badge>
                        {assignment.status === "pending" && (
                          <Badge 
                            variant={daysLeft <= 2 ? "destructive" : "outline"} 
                            className="ml-auto"
                          >
                            {daysLeft <= 0 ? "Overdue" : daysLeft === 1 ? "Due tomorrow" : `Due in ${daysLeft} days`}
                          </Badge>
                        )}
                        {assignment.status === "submitted" && (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 ml-auto">
                            Submitted
                          </Badge>
                        )}
                        {assignment.status === "graded" && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 ml-auto">
                            {assignment.grade}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{assignment.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">
                        {assignment.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {assignment.teacher}
                        </span>
                      </div>
                      
                      {assignment.status === "pending" && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{assignment.progress}%</span>
                          </div>
                          <Progress value={assignment.progress} className="h-1.5" />
                        </div>
                      )}
                      
                      {assignment.status === "graded" && assignment.feedback && (
                        <div className="mt-2 text-sm p-2 bg-muted rounded-sm">
                          <p className="font-medium text-xs">Feedback:</p>
                          <p className="line-clamp-2">{assignment.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full" 
                            onClick={() => setSelectedAssignment(assignment)}
                          >
                            {assignment.status === "pending" ? (
                              assignment.progress > 0 ? "Continue" : "Start"
                            ) : assignment.status === "submitted" ? (
                              "View Submission"
                            ) : (
                              "View Feedback"
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>{assignment?.title}</DialogTitle>
                            <DialogDescription>
                              {assignment?.subject} • {assignment?.teacher}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <h4 className="font-medium mb-2">Assignment Details</h4>
                            <p className="text-sm mb-4">{assignment?.description}</p>
                            
                            <div className="flex justify-between text-sm text-muted-foreground mb-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due: {assignment?.dueDate && new Date(assignment.dueDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Status: {assignment?.status.charAt(0).toUpperCase() + assignment?.status.slice(1)}
                              </span>
                            </div>
                            
                            {assignment?.status === "graded" && (
                              <div className="mb-4">
                                <div className="flex items-center mb-2">
                                  <h4 className="font-medium">Grade: </h4>
                                  <Badge className="ml-2">{assignment.grade}</Badge>
                                </div>
                                <h4 className="font-medium mb-1">Feedback:</h4>
                                <div className="bg-muted p-3 rounded text-sm">{assignment.feedback}</div>
                              </div>
                            )}
                            
                            {assignment?.status === "pending" && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Your Progress</h4>
                                  <Progress value={assignment.progress} className="h-2" />
                                </div>
                                
                                <div className="pt-4 border-t">
                                  <h4 className="font-medium mb-2">Upload Your Work</h4>
                                  <Input type="file" className="mb-2" />
                                  <Textarea placeholder="Add a comment (optional)" className="mb-2" />
                                </div>
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            {assignment?.status === "pending" && (
                              <>
                                <Button variant="outline">Save Draft</Button>
                                <Button onClick={handleSubmitAssignment}>Submit Assignment</Button>
                              </>
                            )}
                            {assignment?.status !== "pending" && (
                              <Button variant="outline" className="ml-auto">Close</Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                );
              })}
            </motion.div>
          ) : (
            <motion.div variants={itemVariant} className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No assignments found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </motion.div>
          )}

          {/* Assignment Summary */}
          <motion.div variants={itemVariant}>
            <Card>
              <CardHeader>
                <CardTitle>Assignment Summary</CardTitle>
                <CardDescription>Overview of your current workload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/40 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <Clock8 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-2xl font-bold">
                          {assignmentData.filter(a => a.status === "pending").length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="text-2xl font-bold">
                          {assignmentData.filter(a => a.status === "submitted").length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Graded</p>
                        <p className="text-2xl font-bold">
                          {assignmentData.filter(a => a.status === "graded").length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </StudentSidebar>
  );
};

export default AssignmentsPage;
