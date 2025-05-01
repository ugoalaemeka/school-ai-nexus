
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, FileText, FileImage, AlertCircle } from "lucide-react";
import { format as formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ReviewStepProps {
  formData: any;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  const getGradeLabel = (value: string) => {
    const gradeMap: Record<string, string> = {
      "preschool": "Pre-School",
      "kindergarten": "Kindergarten",
      "grade1": "Grade 1",
      "grade2": "Grade 2",
      "grade3": "Grade 3",
      "grade4": "Grade 4",
      "grade5": "Grade 5",
      "grade6": "Grade 6",
      "grade7": "Grade 7",
      "grade8": "Grade 8",
      "grade9": "Grade 9",
      "grade10": "Grade 10",
      "grade11": "Grade 11",
      "grade12": "Grade 12",
    };
    
    return gradeMap[value] || value;
  };

  const getRelationshipLabel = (value: string) => {
    const relationshipMap: Record<string, string> = {
      "mother": "Mother",
      "father": "Father",
      "guardian": "Legal Guardian",
      "grandparent": "Grandparent",
      "other": "Other",
    };
    
    return relationshipMap[value] || value;
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Calculate tuition fee based on selected class
  const getTuitionFee = (grade: string) => {
    const tuitionMap: Record<string, number> = {
      "preschool": 3800,
      "kindergarten": 4200, 
      "grade1": 4500,
      "grade2": 4500,
      "grade3": 4800,
      "grade4": 4800,
      "grade5": 5200,
      "grade6": 5200,
      "grade7": 5500,
      "grade8": 5500,
      "grade9": 6000,
      "grade10": 6000,
      "grade11": 6500,
      "grade12": 6500,
    };
    
    return tuitionMap[grade] || 5000; // Default to $5000 if grade not found
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Review Your Application</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-muted-foreground mb-4">
          Please review all the information below carefully before proceeding to payment.
        </div>

        <Accordion type="single" collapsible className="w-full" defaultValue="student">
          <AccordionItem value="student">
            <AccordionTrigger className="font-semibold text-lg">
              Student Details
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 py-2">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">
                    {formData.dateOfBirth ? formatDate(new Date(formData.dateOfBirth), "MMMM d, yyyy") : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{capitalizeFirstLetter(formData.gender || '-')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Passport Photo</p>
                  <p className="font-medium flex items-center mt-1">
                    {formData.photo ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Not uploaded</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="parent">
            <AccordionTrigger className="font-semibold text-lg">
              Parent/Guardian Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 py-2">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{formData.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Relationship to Student</p>
                  <p className="font-medium">{getRelationshipLabel(formData.relationship || '-')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <p className="text-sm text-muted-foreground">Residential Address</p>
                  <p className="font-medium">{formData.address}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="academic">
            <AccordionTrigger className="font-semibold text-lg">
              Academic Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 py-2">
                <div>
                  <p className="text-sm text-muted-foreground">Desired Class/Grade</p>
                  <p className="font-medium">{getGradeLabel(formData.desiredClass || '-')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Previous School</p>
                  <p className="font-medium">{formData.previousSchool}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Start Date</p>
                  <p className="font-medium">
                    {formData.startDate ? formatDate(new Date(formData.startDate), "MMMM d, yyyy") : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Report Card</p>
                  <p className="font-medium flex items-center mt-1">
                    {formData.reportCard ? (
                      <>
                        <FileText className="h-4 w-4 text-blue-500 mr-2" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Not uploaded</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="documents">
            <AccordionTrigger className="font-semibold text-lg">
              Required Documents
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-y-4 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Birth Certificate</p>
                    <p className="text-sm text-muted-foreground">Required document</p>
                  </div>
                  <div className="flex items-center">
                    {formData.birthCertificate ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" /> Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">
                        <AlertCircle className="h-3 w-3 mr-1" /> Missing
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Immunization Record</p>
                    <p className="text-sm text-muted-foreground">Optional document</p>
                  </div>
                  <div className="flex items-center">
                    {formData.immunizationRecord ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" /> Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-500 hover:bg-gray-50 border-gray-200">
                        Not uploaded (optional)
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Other Supporting Documents</p>
                    <p className="text-sm text-muted-foreground">Optional document</p>
                  </div>
                  <div className="flex items-center">
                    {formData.otherDocuments ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" /> Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-500 hover:bg-gray-50 border-gray-200">
                        Not uploaded (optional)
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fees">
            <AccordionTrigger className="font-semibold text-lg">
              Fees Summary
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 py-2">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span>Annual Tuition Fee ({getGradeLabel(formData.desiredClass || '-')})</span>
                  <span className="font-medium">{formatCurrency(getTuitionFee(formData.desiredClass))}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span>Registration Fee (One-time)</span>
                  <span className="font-medium">{formatCurrency(500)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span>Books and Materials</span>
                  <span className="font-medium">{formatCurrency(350)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 font-medium text-lg">
                  <span>Total Amount Due</span>
                  <span className="text-primary font-bold">{formatCurrency(getTuitionFee(formData.desiredClass) + 500 + 350)}</span>
                </div>
                <div className="text-sm text-muted-foreground pt-2">
                  <p>* This amount is for the first semester only. The second semester payment will be due at a later date.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </>
  );
};
