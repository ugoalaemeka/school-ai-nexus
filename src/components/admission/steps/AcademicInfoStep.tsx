
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface AcademicInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const AcademicInfoStep: React.FC<AcademicInfoStepProps> = ({ 
  formData, 
  updateFormData 
}) => {
  const [reportCardName, setReportCardName] = React.useState<string>("");

  const handleReportCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ reportCard: file });
      setReportCardName(file.name);
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      updateFormData({ startDate: format(date, "yyyy-MM-dd") });
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Academic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="desiredClass">Desired Class/Grade</Label>
          <Select
            value={formData.desiredClass}
            onValueChange={(value) => updateFormData({ desiredClass: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class/grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="preschool">Pre-School</SelectItem>
              <SelectItem value="kindergarten">Kindergarten</SelectItem>
              <SelectItem value="grade1">Grade 1</SelectItem>
              <SelectItem value="grade2">Grade 2</SelectItem>
              <SelectItem value="grade3">Grade 3</SelectItem>
              <SelectItem value="grade4">Grade 4</SelectItem>
              <SelectItem value="grade5">Grade 5</SelectItem>
              <SelectItem value="grade6">Grade 6</SelectItem>
              <SelectItem value="grade7">Grade 7</SelectItem>
              <SelectItem value="grade8">Grade 8</SelectItem>
              <SelectItem value="grade9">Grade 9</SelectItem>
              <SelectItem value="grade10">Grade 10</SelectItem>
              <SelectItem value="grade11">Grade 11</SelectItem>
              <SelectItem value="grade12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="previousSchool">Previous School Name</Label>
          <Input
            id="previousSchool"
            placeholder="Enter previous school name"
            value={formData.previousSchool}
            onChange={(e) => updateFormData({ previousSchool: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Enter "None" for students entering Pre-School or Kindergarten with no previous schooling
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reportCard">Upload Last Report Card (PDF/Image)</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-muted-foreground flex-col">
                <label
                  htmlFor="reportCard"
                  className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="reportCard"
                    name="reportCard"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleReportCardChange}
                  />
                </label>
                {reportCardName && (
                  <span className="mt-2 text-sm text-muted-foreground">
                    Selected: {reportCardName}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                PDF, PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Preferred Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(new Date(formData.startDate), "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.startDate ? new Date(formData.startDate) : undefined}
                onSelect={handleStartDateSelect}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </>
  );
};
