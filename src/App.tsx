
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
import NewsEvents from "./pages/NewsEvents";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Student Dashboard
import StudentDashboard from "./pages/student/Dashboard";

// Admin Dashboard
import AdminDashboard from "./pages/admin/Dashboard";

// Parent Dashboard
import ParentDashboard from "./pages/parent/Dashboard";
import ParentMessages from "./pages/parent/Messages";
import ParentPayments from "./pages/parent/Payments";
import ParentReports from "./pages/parent/Reports";

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
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Parent Dashboard Routes */}
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/messages" element={<ParentMessages />} />
            <Route path="/parent/payments" element={<ParentPayments />} />
            <Route path="/parent/reports" element={<ParentReports />} />
            <Route path="/parent/messages/:id" element={<ParentMessages />} />
            
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
