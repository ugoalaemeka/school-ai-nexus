
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, FileText, UserCheck, UserX } from "lucide-react";
import { cn } from "@/lib/utils";

import { format } from "date-fns";

interface AttendanceTrackerCardProps {
  isLoading?: boolean;
}

export function AttendanceTrackerCard({ isLoading = false }: AttendanceTrackerCardProps) {
  const [date, setDate] = useState<Date>(new Date());
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[180px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-8 w-[140px]" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-8 w-[160px]" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const students = [
    { id: 1, name: "John Doe", status: "present" },
    { id: 2, name: "Jane Smith", status: "absent" },
    { id: 3, name: "Robert Johnson", status: "present" },
    { id: 4, name: "Emily Williams", status: "late" },
    { id: 5, name: "Michael Brown", status: "present" },
  ];

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Attendance Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <span>{date ? format(date, "PPP") : "Pick a date"}</span>
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
            {students.map((student) => (
              <div key={student.id} className="flex justify-between items-center">
                <Label htmlFor={`student-${student.id}`} className="text-sm">
                  {student.name}
                </Label>
                <div className="flex space-x-2">
                  <Toggle
                    id={`student-${student.id}-present`}
                    pressed={student.status === "present"}
                    className="data-[state=on]:bg-green-500 data-[state=on]:text-white"
                  >
                    <UserCheck className="mr-1 h-4 w-4" /> Present
                  </Toggle>
                  <Toggle
                    id={`student-${student.id}-absent`}
                    pressed={student.status === "absent"}
                    className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
                  >
                    <UserX className="mr-1 h-4 w-4" /> Absent
                  </Toggle>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="mt-4">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
