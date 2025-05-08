
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { StudentDetailsStep } from "@/components/admission/steps/StudentDetailsStep";
import { ParentInfoStep } from "@/components/admission/steps/ParentInfoStep";
import { AcademicInfoStep } from "@/components/admission/steps/AcademicInfoStep";
import { DocumentUploadStep } from "@/components/admission/steps/DocumentUploadStep";
import { ReviewStep } from "@/components/admission/steps/ReviewStep";
import { PaymentStep } from "@/components/admission/steps/PaymentStep";
import { AdmissionSuccess } from "@/components/admission/AdmissionSuccess";
import { motion } from "framer-motion";

const AdmissionApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Student details
    fullName: "",
    dateOfBirth: "",
    gender: "",
    photo: null,
    
    // Parent info
    parentName: "",
    relationship: "",
    email: "",
    phone: "",
    address: "",
    
    // Academic info
    desiredClass: "",
    previousSchool: "",
    reportCard: null,
    startDate: "",
    
    // Documents
    birthCertificate: null,
    immunizationRecord: null,
    otherDocuments: null,
    
    // Generated after submission
    studentId: "STU" + Math.floor(100000 + Math.random() * 900000),
    username: "",
    password: "Temp" + Math.floor(1000 + Math.random() * 9000) + "!",
  });
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };
  
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handlePaymentSuccess = () => {
    // Set username from email
    updateFormData({
      username: formData.email
    });
    setIsCompleted(true);
  };
  
  const steps = [
    { id: 1, name: "Student Details" },
    { id: 2, name: "Parent Info" },
    { id: 3, name: "Academic" },
    { id: 4, name: "Documents" },
    { id: 5, name: "Review" },
    { id: 6, name: "Payment" },
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {!isCompleted ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Student Admission Application</h1>
              <p className="text-lg text-muted-foreground">
                Complete the form below to apply for admission to our school
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step) => (
                  <div 
                    key={step.id} 
                    className="flex-1 relative flex flex-col items-center"
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-white font-medium z-10 transition-colors ${
                        currentStep === step.id
                          ? "bg-primary ring-4 ring-primary/20"
                          : currentStep > step.id
                          ? "bg-green-500"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                    </div>
                    
                    <span className={`text-xs font-medium hidden sm:block ${
                      currentStep === step.id
                        ? "text-primary"
                        : currentStep > step.id
                        ? "text-green-500"
                        : "text-muted-foreground"
                    }`}>
                      {step.name}
                    </span>
                    
                    {step.id < steps.length && (
                      <div 
                        className={`absolute top-5 left-1/2 w-full h-[2px] ${
                          currentStep > step.id ? "bg-green-500" : "bg-muted"
                        }`} 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg">
                {currentStep === 1 && (
                  <StudentDetailsStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 2 && (
                  <ParentInfoStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 3 && (
                  <AcademicInfoStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 4 && (
                  <DocumentUploadStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 5 && (
                  <ReviewStep formData={formData} />
                )}
                {currentStep === 6 && (
                  <PaymentStep formData={formData} onPaymentSuccess={handlePaymentSuccess} />
                )}
                
                <div className="p-6 flex justify-between border-t">
                  {currentStep > 1 && currentStep < 6 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  )}
                  {currentStep === 1 && (
                    <div></div> // Empty div to maintain flex spacing
                  )}
                  
                  {currentStep < 5 && (
                    <Button
                      onClick={handleNext}
                      className="flex items-center gap-1 ml-auto"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  {currentStep === 5 && (
                    <Button
                      onClick={handleNext}
                      className="flex items-center gap-1 ml-auto"
                    >
                      Proceed to Payment
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          <AdmissionSuccess studentData={formData} />
        )}
      </div>
    </MainLayout>
  );
};

export default AdmissionApplication;
