
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { CalendarIcon, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface StudentDetailsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const StudentDetailsStep: React.FC<StudentDetailsStepProps> = ({ 
  formData, 
  updateFormData 
}) => {
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ photo: file });
      // Create a preview URL for the selected photo
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      updateFormData({ dateOfBirth: format(date, "yyyy-MM-dd") });
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Student Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter student's full name"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? format(new Date(formData.dateOfBirth), "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined}
                onSelect={handleDateSelect}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={1990}
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => updateFormData({ gender: value })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo">Passport Photograph</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                <div className="space-y-1 text-center">
                  <FileImage className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="photo"
                      className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none"
                    >
                      <span>Upload a photo</span>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="sr-only"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>
            {photoPreview && (
              <div className="flex flex-col items-center justify-center">
                <img 
                  src={photoPreview} 
                  alt="Photo preview" 
                  className="h-32 w-32 object-cover rounded-md" 
                />
                <p className="text-sm text-muted-foreground mt-2">Photo Preview</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </>
  );
};
