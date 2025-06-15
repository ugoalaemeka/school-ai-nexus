
import React, { forwardRef } from "react";
import { BookOpen } from "lucide-react";

interface AdmissionLetterProps {
  studentData: any;
}

const formatClassName = (className: string) => {
  if (!className) return "N/A";
  if (className.startsWith("grade")) {
    return `Grade ${className.substring(5)}`;
  }
  return className.charAt(0).toUpperCase() + className.slice(1);
};

export const AdmissionLetter = forwardRef<HTMLDivElement, AdmissionLetterProps>(({ studentData }, ref) => {
  return (
    <div ref={ref} className="p-10 bg-white text-black font-serif" style={{ width: '210mm', minHeight: '297mm' }}>
      <header className="flex items-center justify-between pb-4 border-b-2 border-gray-800">
        <div className="flex items-center gap-4">
          <BookOpen className="h-16 w-16 text-gray-800" />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Eko Scholars Academy</h1>
            <p className="text-sm text-gray-600">Fostering Excellence, Inspiring Futures</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">123 Education Lane, Knowledge City, 45678</p>
          <p className="text-sm">admissions@ekoscholars.edu | (555) 123-4567</p>
        </div>
      </header>

      <main className="mt-10">
        <p className="text-right mb-8">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="mb-8">
          <p className="font-bold">{studentData.fullName}</p>
          <p>{studentData.address || "Address not provided"}</p>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-400 pb-2">
          Subject: Offer of Provisional Admission
        </h2>
        
        <p className="mb-4 leading-relaxed">Dear {studentData.fullName},</p>
        
        <p className="mb-6 leading-relaxed">
          We are delighted to inform you that following your recent application and successful evaluation, the admissions committee of <strong>Eko Scholars Academy</strong> has offered you provisional admission for the upcoming academic session.
        </p>
        
        <p className="mb-6 leading-relaxed">
          Your commitment to academic excellence and personal growth has impressed us, and we believe you will be a valuable addition to our school community. We are excited to see you thrive in our supportive and challenging learning environment.
        </p>

        <div className="bg-gray-100 p-6 my-8 border border-gray-300 rounded-md">
          <h3 className="text-xl font-bold mb-4">Admission Details:</h3>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold">Student Name:</td>
                <td className="py-2">{studentData.fullName}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold">Student ID:</td>
                <td className="py-2 font-mono">{studentData.studentId}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold">Admitted to Class:</td>
                <td className="py-2">{formatClassName(studentData.desiredClass)}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">Academic Session Start Date:</td>
                <td className="py-2">{new Date(studentData.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold mb-4">Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-3 mb-8">
          <li><strong>Acceptance of Admission:</strong> This admission is provisional and will be confirmed upon logging into the student portal with the credentials provided.</li>
          <li><strong>Student Portal Login:</strong> Please use your generated credentials to log in to the student portal on our website. You will be required to change your temporary password upon first login.</li>
          <li><strong>Orientation Program:</strong> Details about the new student orientation program will be available in the portal and sent to your registered email address.</li>
        </ol>
        
        <p className="leading-relaxed">
          We congratulate you once again on your admission and look forward to welcoming you to Eko Scholars Academy.
        </p>
        
        <div className="mt-16 text-right">
          <p>Sincerely,</p>
          <p className="mt-8 font-bold">_________________________</p>
          <p className="font-bold">Dr. Evelyn Reed</p>
          <p className="text-sm">Head of School</p>
          <p className="text-sm">Eko Scholars Academy</p>
        </div>
      </main>
      
      <footer className="mt-12 pt-4 border-t border-gray-400 text-center text-xs text-gray-500">
        <p>This is a computer-generated document and does not require a physical signature.</p>
      </footer>
    </div>
  );
});

