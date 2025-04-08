
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FileUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { useState } from "react";

interface AssignmentCardProps {
  isLoading?: boolean;
}

export function AssignmentCard({ isLoading = false }: AssignmentCardProps) {
  const [date, setDate] = useState<Date>();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[180px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const assignments = [
    { id: 1, title: "Algebra Quiz", dueDate: "Apr 15, 2025", status: "pending" },
    { id: 2, title: "Geometry Project", dueDate: "Apr 10, 2025", status: "submitted" },
    { id: 3, title: "Statistics Essay", dueDate: "Apr 5, 2025", status: "graded" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case "submitted":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Submitted</Badge>;
      case "graded":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Graded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Assignment Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="list" className="flex-1">Assignments</TabsTrigger>
            <TabsTrigger value="create" className="flex-1">Create New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                </div>
                {getStatusBadge(assignment.status)}
              </div>
            ))}
            
            <Button className="w-full mt-2">
              <Plus className="mr-2 h-4 w-4" />
              View All Assignments
            </Button>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input id="title" placeholder="Enter assignment title" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea id="instructions" placeholder="Enter detailed instructions" className="min-h-[100px]" />
              </div>
              
              <div className="grid gap-2">
                <Label>Due Date</Label>
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
                      {date ? format(date, "PPP") : "Select due date"}
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
              
              <div className="grid gap-2">
                <Label htmlFor="file">Upload File (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input id="file" type="file" className="flex-1" />
                  <Button type="button" size="icon">
                    <FileUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button className="w-full">Create Assignment</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
