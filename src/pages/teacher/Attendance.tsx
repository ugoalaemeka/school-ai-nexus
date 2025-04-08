
import { TeacherLayout } from "@/components/layout/teacher-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Calendar as CalendarIcon, 
  ChevronDown, 
  Download, 
  FileText, 
  Search, 
  UserCheck, 
  UserX 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

const TeacherAttendance = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  // Example student data
  const students = [
    { id: 1, name: "John Doe", rollNumber: "A001", status: "present" },
    { id: 2, name: "Jane Smith", rollNumber: "A002", status: "absent" },
    { id: 3, name: "Robert Johnson", rollNumber: "A003", status: "present" },
    { id: 4, name: "Emily Williams", rollNumber: "A004", status: "late" },
    { id: 5, name: "Michael Brown", rollNumber: "A005", status: "present" },
    { id: 6, name: "Sarah Miller", rollNumber: "A006", status: "present" },
    { id: 7, name: "David Jones", rollNumber: "A007", status: "absent" },
    { id: 8, name: "Jennifer Garcia", rollNumber: "A008", status: "present" },
    { id: 9, name: "Richard Taylor", rollNumber: "A009", status: "present" },
    { id: 10, name: "Lisa Rodriguez", rollNumber: "A010", status: "late" },
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Attendance Management</h1>
            <p className="text-muted-foreground">Track and manage student attendance records</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Data
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Attendance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date</Label>
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
                      {date ? format(date, "PPP") : "Pick a date"}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>Class</Label>
                <Select defaultValue="grade10a">
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade10a">Grade 10-A</SelectItem>
                    <SelectItem value="grade10b">Grade 10-B</SelectItem>
                    <SelectItem value="grade11">Grade 11</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select defaultValue="math">
                  <SelectTrigger>
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
                <Label>Search Student</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Search by name or ID" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">Save Attendance</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Class Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.rollNumber}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Toggle
                            pressed={student.status === "present"}
                            className="data-[state=on]:bg-green-500 data-[state=on]:text-white"
                          >
                            <UserCheck className="mr-1 h-4 w-4" /> Present
                          </Toggle>
                          <Toggle
                            pressed={student.status === "absent"}
                            className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
                          >
                            <UserX className="mr-1 h-4 w-4" /> Absent
                          </Toggle>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherAttendance;
