
import { TeacherLayout } from "@/components/layout/teacher-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronDown, Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

const TeacherExams = () => {
  const [date, setDate] = useState<Date>();
  
  const exams = [
    { id: 1, title: "Mid-Term Math Exam", subject: "Mathematics", class: "Grade 10-A", date: "May 10, 2025", time: "09:00 - 11:00", status: "Upcoming" },
    { id: 2, title: "Final Geometry Test", subject: "Mathematics", class: "Grade 10-B", date: "Jun 15, 2025", time: "10:00 - 12:00", status: "Upcoming" },
    { id: 3, title: "Monthly Quiz", subject: "Mathematics", class: "Grade 11", date: "Apr 20, 2025", time: "13:00 - 14:00", status: "Upcoming" },
    { id: 4, title: "Chapter 5 Assessment", subject: "Mathematics", class: "Grade 10-A", date: "Mar 25, 2025", time: "10:00 - 11:30", status: "Completed" },
    { id: 5, title: "Practice Test", subject: "Mathematics", class: "Grade 11", date: "Mar 15, 2025", time: "14:00 - 15:30", status: "Completed" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Exam Management</h1>
            <p className="text-muted-foreground">Schedule, create, and grade exams</p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule New Exam
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
              >
                All Exams
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
              >
                Completed
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader className="py-3">
                <div className="flex justify-between items-center">
                  <CardTitle>All Exams</CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Filter by class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="grade10a">Grade 10-A</SelectItem>
                        <SelectItem value="grade10b">Grade 10-B</SelectItem>
                        <SelectItem value="grade11">Grade 11</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Search exams" className="max-w-[200px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.title}</TableCell>
                        <TableCell>{exam.class}</TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.time}</TableCell>
                        <TableCell>{getStatusBadge(exam.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm">
                              {exam.status === "Upcoming" ? "Edit" : "View Results"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Schedule New Exam</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Exam Title</Label>
                      <Input id="title" placeholder="Exam title" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select>
                        <SelectTrigger id="class">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grade10a">Grade 10-A</SelectItem>
                          <SelectItem value="grade10b">Grade 10-B</SelectItem>
                          <SelectItem value="grade11">Grade 11</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Exam Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select exam date"}
                            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time Slot</Label>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Start time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9">09:00 AM</SelectItem>
                            <SelectItem value="10">10:00 AM</SelectItem>
                            <SelectItem value="11">11:00 AM</SelectItem>
                            <SelectItem value="12">12:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        <span>to</span>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="End time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="11">11:00 AM</SelectItem>
                            <SelectItem value="12">12:00 PM</SelectItem>
                            <SelectItem value="13">01:00 PM</SelectItem>
                            <SelectItem value="14">02:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea id="instructions" placeholder="Enter exam instructions and rules" rows={5} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="totalMarks">Total Marks</Label>
                        <Input id="totalMarks" type="number" placeholder="Enter total marks" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input id="duration" type="number" placeholder="Enter duration in minutes" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Schedule Exam</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-6">
            {/* Similar table for upcoming exams */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.filter(e => e.status === "Upcoming").map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.title}</TableCell>
                        <TableCell>{exam.class}</TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.time}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm">Edit</Button>
                            <Button size="sm" variant="outline">Cancel</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {/* Similar table for completed exams */}
            <Card>
              <CardHeader>
                <CardTitle>Completed Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.filter(e => e.status === "Completed").map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.title}</TableCell>
                        <TableCell>{exam.class}</TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.time}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm">View Results</Button>
                            <Button size="sm" variant="outline">Generate Report</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
};

export default TeacherExams;
