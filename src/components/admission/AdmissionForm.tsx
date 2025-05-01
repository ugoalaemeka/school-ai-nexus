
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { StudentDetailsStep } from "./steps/StudentDetailsStep";
import { ParentInfoStep } from "./steps/ParentInfoStep";
import { AcademicInfoStep } from "./steps/AcademicInfoStep";
import { DocumentUploadStep } from "./steps/DocumentUploadStep";
import { ReviewStep } from "./steps/ReviewStep";
import { PaymentStep } from "./steps/PaymentStep";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AdmissionFormProps {
  onSuccessfulPayment: (data: any) => void;
}

export const AdmissionForm = ({ onSuccessfulPayment }: AdmissionFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Student details
    fullName: "",
    dateOfBirth: "",
    gender: "",
    photo: null,
    
    // Parent/Guardian information
    parentName: "",
    relationship: "",
    email: "",
    phone: "",
    address: "",
    
    // Academic information
    desiredClass: "",
    previousSchool: "",
    reportCard: null,
    startDate: "",
    
    // Documents
    birthCertificate: null,
    immunizationRecord: null,
    otherDocuments: null,
  });

  // Generated after payment
  const [credentials, setCredentials] = useState({
    studentId: "",
    username: "",
    password: "",
  });

  // Define steps
  const steps = [
    { id: 1, name: "Student Details" },
    { id: 2, name: "Parent Info" },
    { id: 3, name: "Academic Info" },
    { id: 4, name: "Documents" },
    { id: 5, name: "Review" },
    { id: 6, name: "Payment" },
  ];

  const updateFormData = (stepData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...stepData });
  };

  const handleNext = () => {
    // Form validation based on current step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.dateOfBirth || !formData.gender) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.parentName || !formData.relationship || !formData.email || !formData.phone || !formData.address) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
      // Validate phone number (simple validation)
      if (formData.phone.length < 10) {
        toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid phone number.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.desiredClass || !formData.previousSchool || !formData.startDate) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.birthCertificate) {
        toast({
          title: "Missing Document",
          description: "Please upload the birth certificate before proceeding.",
          variant: "destructive",
        });
        return;
      }
    }

    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSuccess = () => {
    // Generate credentials based on form data
    const studentId = `S${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`;
    const username = formData.email;
    const password = Math.random().toString(36).slice(-8);

    const studentCredentials = {
      studentId,
      username,
      password,
    };

    setCredentials(studentCredentials);

    // Store application data and created credentials
    // This would normally be done through an API call to your backend
    // For now, we'll simulate a successful storage

    // In a real implementation, you would:
    // 1. Store the application data in your database
    // 2. Create a user account with the generated credentials
    // 3. Send an email to the parent with the login details
    
    const studentDataForSuccess = {
      ...formData,
      ...studentCredentials,
      paymentDate: new Date().toISOString(),
      paymentAmount: getFormattedAmount(formData.desiredClass),
    };
    
    // Notify parent about successful application
    toast({
      title: "Application Successful!",
      description: "Your application has been submitted and payment processed.",
    });

    // Pass the data to the parent component for displaying the success page
    onSuccessfulPayment(studentDataForSuccess);
  };

  const getFormattedAmount = (grade: string) => {
    // Map grade/class to tuition amount
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

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StudentDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ParentInfoStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <AcademicInfoStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <DocumentUploadStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <ReviewStep formData={formData} />;
      case 6:
        return (
          <PaymentStep 
            formData={formData} 
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="hidden md:block">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={cn(
                "flex flex-col items-center relative",
                currentStep >= step.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all",
                currentStep > step.id 
                  ? "bg-primary text-white" 
                  : currentStep === step.id 
                    ? "bg-primary/20 text-primary border-2 border-primary" 
                    : "bg-muted text-muted-foreground"
              )}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span className={cn(
                "text-sm font-medium",
                currentStep === step.id && "font-semibold"
              )}>
                {step.name}
              </span>

              {/* Connector line */}
              {step.id !== steps.length && (
                <div className={cn(
                  "absolute h-0.5 top-5 w-full left-1/2 -z-10",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {steps[currentStep - 1].name}
          </span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Card */}
      <Card className="overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep !== 6 && (
          <div className="px-6 py-4 bg-muted/20 flex justify-between">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevious}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button 
              type="button" 
              onClick={handleNext}
              className="gap-1"
            >
              {currentStep === 5 ? "Proceed to Payment" : "Next Step"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
