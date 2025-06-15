
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BadgeCheck, 
  Copy, 
  Download, 
  ArrowRight, 
  Check, 
  Loader2
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AdmissionLetter } from "./AdmissionLetter";

interface AdmissionSuccessProps {
  studentData: any;
}

export const AdmissionSuccess: React.FC<AdmissionSuccessProps> = ({ 
  studentData 
}) => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${label} copied to clipboard`,
    });
  };
  
  const handleDownload = () => {
    if (!letterRef.current) {
        toast({
            title: "Error",
            description: "Could not find letter template.",
            variant: "destructive"
        });
        return;
    }
    
    setGenerating(true);
    
    html2canvas(letterRef.current, {
      scale: 2, 
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Admission_Letter_${studentData.studentId}.pdf`);
      
      setGenerating(false);
      toast({
        title: "Download Complete",
        description: "Admission letter has been downloaded successfully.",
      });
    }).catch(err => {
      console.error("Error generating PDF:", err);
      setGenerating(false);
      toast({
        title: "Error",
        description: "Could not generate the admission letter. Please try again.",
        variant: "destructive"
      });
    });
  };

  return (
    <>
      <div className="absolute -left-[9999px] top-auto opacity-0" aria-hidden="true">
        <AdmissionLetter ref={letterRef} studentData={studentData} />
      </div>
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
            <BadgeCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Application Successful!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your application is complete and payment received. 
            Login credentials have been generated and sent to your email.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4 space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Student Name</Label>
                    <div className="font-medium">{studentData.fullName}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Student ID</Label>
                    <div className="flex items-center gap-2">
                      <div className="font-medium font-mono bg-muted/50 py-1 px-2 rounded">
                        {studentData.studentId}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleCopy(studentData.studentId, "Student ID")}
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Username (Email)</Label>
                    <div className="flex items-center gap-2">
                      <div className="font-medium font-mono bg-muted/50 py-1 px-2 rounded overflow-auto">
                        {studentData.username}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 shrink-0" 
                        onClick={() => handleCopy(studentData.username, "Username")}
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Temporary Password</Label>
                    <div className="flex items-center gap-2">
                      <div className="font-medium font-mono bg-muted/50 py-1 px-2 rounded">
                        {studentData.password}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleCopy(studentData.password, "Password")}
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      We've sent these login credentials to your email address ({studentData.email}).
                      If you don't receive the email within a few minutes, please check your spam folder.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Important Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-3">
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Download your admission letter</span>
                    <p className="mt-1 ml-6 text-sm">
                      Save a copy of your admission letter for your records.
                    </p>
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Login to your student portal</span>
                    <p className="mt-1 ml-6 text-sm">
                      Use the credentials above to access your student dashboard.
                    </p>
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Complete your student profile</span>
                    <p className="mt-1 ml-6 text-sm">
                      Log in to your portal and fill out any remaining information.
                    </p>
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Attend orientation</span>
                    <p className="mt-1 ml-6 text-sm">
                      Mark your calendar for our new student orientation on {new Date(studentData.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2"
          >
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Button onClick={handleDownload} className="w-full flex gap-2" disabled={generating}>
                      {generating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Download Admission Letter
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full flex gap-2" asChild>
                      <a href="/login">
                        <ArrowRight className="h-4 w-4" />
                        Go to Student Login
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700 mb-4">
                    <div className="flex gap-2">
                      <Check className="h-5 w-5 text-green-600 shrink-0" />
                      <div>
                        <p className="font-semibold">Payment Confirmed</p>
                        <p className="text-sm mt-1">
                          Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                        <p className="text-xs mt-2">
                          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Need Help?</h3>
                    <div className="text-muted-foreground text-sm space-y-2">
                      <p>If you have any questions or need assistance:</p>
                      <p>Call: (555) 123-4567</p>
                      <p>Email: admissions@school.edu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
