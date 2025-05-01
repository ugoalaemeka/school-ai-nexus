
import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FileText, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DocumentUploadStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  formData,
  updateFormData,
}) => {
  const [birthCertName, setBirthCertName] = useState<string>("");
  const [immunizationName, setImmunizationName] = useState<string>("");
  const [otherDocName, setOtherDocName] = useState<string>("");

  const handleBirthCertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ birthCertificate: file });
      setBirthCertName(file.name);
    }
  };

  const handleImmunizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ immunizationRecord: file });
      setImmunizationName(file.name);
    }
  };

  const handleOtherDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ otherDocuments: file });
      setOtherDocName(file.name);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Document Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            Please ensure all documents are clear, legible scans or high-quality photos.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="birthCertificate" className="flex items-center">
            Birth Certificate
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-muted-foreground flex-col">
                <label
                  htmlFor="birthCertificate"
                  className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none"
                >
                  <span>Upload birth certificate</span>
                  <input
                    id="birthCertificate"
                    name="birthCertificate"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleBirthCertChange}
                  />
                </label>
                {birthCertName && (
                  <span className="mt-2 text-sm text-muted-foreground">
                    Selected: {birthCertName}
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
          <Label htmlFor="immunizationRecord" className="flex items-center">
            Immunization Record
            <span className="text-gray-500 text-sm ml-1">(optional)</span>
          </Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-muted-foreground flex-col">
                <label
                  htmlFor="immunizationRecord"
                  className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none"
                >
                  <span>Upload immunization record</span>
                  <input
                    id="immunizationRecord"
                    name="immunizationRecord"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleImmunizationChange}
                  />
                </label>
                {immunizationName && (
                  <span className="mt-2 text-sm text-muted-foreground">
                    Selected: {immunizationName}
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
          <Label htmlFor="otherDocuments" className="flex items-center">
            Other Supporting Documents
            <span className="text-gray-500 text-sm ml-1">(optional)</span>
          </Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-muted-foreground flex-col">
                <label
                  htmlFor="otherDocuments"
                  className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none"
                >
                  <span>Upload other documents</span>
                  <input
                    id="otherDocuments"
                    name="otherDocuments"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleOtherDocChange}
                  />
                </label>
                {otherDocName && (
                  <span className="mt-2 text-sm text-muted-foreground">
                    Selected: {otherDocName}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                PDF, PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};
