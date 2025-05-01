
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Admission from "./pages/Admission";
import AdmissionApplication from "./pages/AdmissionApplication";
import NewsEvents from "./pages/NewsEvents";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Student Dashboard
import StudentDashboard from "./pages/student/Dashboard";
import StudentTimetable from "./pages/student/Timetable";
import StudentAssignments from "./pages/student/Assignments";
import StudentResources from "./pages/student/Resources";
import StudentExams from "./pages/student/Exams";
import StudentMessages from "./pages/student/Messages";
import StudentSettings from "./pages/student/Settings";

// Admin Dashboard
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminClasses from "./pages/admin/Classes";
import AdminFees from "./pages/admin/Fees";
import AdminEvents from "./pages/admin/Events";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Parent Dashboard
import ParentDashboard from "./pages/parent/Dashboard";
import ParentMessages from "./pages/parent/Messages";
import ParentPayments from "./pages/parent/Payments";
import ParentReports from "./pages/parent/Reports";
import ParentPerformance from "./pages/parent/Performance";
import ParentSettings from "./pages/parent/Settings";

// Teacher Dashboard
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherExams from "./pages/teacher/Exams";
import TeacherResources from "./pages/teacher/Resources";
import TeacherMessages from "./pages/teacher/Messages";
import TeacherSettings from "./pages/teacher/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/admission/apply" element={<AdmissionApplication />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/timetable" element={<StudentTimetable />} />
            <Route path="/student/assignments" element={<StudentAssignments />} />
            <Route path="/student/resources" element={<StudentResources />} />
            <Route path="/student/exams" element={<StudentExams />} />
            <Route path="/student/messages" element={<StudentMessages />} />
            <Route path="/student/messages/:id" element={<StudentMessages />} />
            <Route path="/student/settings" element={<StudentSettings />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/classes" element={<AdminClasses />} />
            <Route path="/admin/fees" element={<AdminFees />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* Parent Dashboard Routes */}
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/performance" element={<ParentPerformance />} />
            <Route path="/parent/payments" element={<ParentPayments />} />
            <Route path="/parent/reports" element={<ParentReports />} />
            <Route path="/parent/messages" element={<ParentMessages />} />
            <Route path="/parent/messages/:id" element={<ParentMessages />} />
            <Route path="/parent/settings" element={<ParentSettings />} />
            
            {/* Teacher Dashboard Routes */}
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/attendance" element={<TeacherAttendance />} />
            <Route path="/teacher/assignments" element={<TeacherAssignments />} />
            <Route path="/teacher/exams" element={<TeacherExams />} />
            <Route path="/teacher/resources" element={<TeacherResources />} />
            <Route path="/teacher/messages" element={<TeacherMessages />} />
            <Route path="/teacher/settings" element={<TeacherSettings />} />
            <Route path="/teacher/messages/:id" element={<TeacherMessages />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
