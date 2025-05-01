
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { AdmissionForm } from "@/components/admission/AdmissionForm";
import { AdmissionSuccess } from "@/components/admission/AdmissionSuccess";

const AdmissionApplication = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);

  const handleSuccessfulPayment = (data: any) => {
    setStudentData(data);
    setIsSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {!isSubmitted ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Student Admission Application</h1>
              <p className="text-lg text-muted-foreground">
                Complete the form below to apply for admission to our school
              </p>
            </div>
            <AdmissionForm onSuccessfulPayment={handleSuccessfulPayment} />
          </div>
        ) : (
          <AdmissionSuccess studentData={studentData} />
        )}
      </div>
    </MainLayout>
  );
};

export default AdmissionApplication;
