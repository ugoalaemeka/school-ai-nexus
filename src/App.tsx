
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

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
import ScheduleVisit from "@/pages/ScheduleVisit";
import UnpaidFeesPage from "./pages/student/UnpaidFees";

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

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="edunexus-theme">
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/schedule-visit" element={<ScheduleVisit />} />
              <Route path="/admission/apply" element={<AdmissionApplication />} />
              <Route path="/news-events" element={<NewsEvents />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unpaid-fees" element={<UnpaidFeesPage />} />
              
              {/* Student Dashboard Routes - Protected */}
              <Route path="/student/dashboard" element={
                <ProtectedRoute allowedRoles={['student']} requiresPaidFees={true}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/timetable" element={
                <ProtectedRoute allowedRoles={['student']} requiresPaidFees={true}>
                  <StudentTimetable />
                </ProtectedRoute>
              } />
              <Route path="/student/assignments" element={
                <ProtectedRoute allowedRoles={['student']} requiresPaidFees={true}>
                  <StudentAssignments />
                </ProtectedRoute>
              } />
              <Route path="/student/resources" element={
                <ProtectedRoute allowedRoles={['student']} requiresPaidFees={true}>
                  <StudentResources />
                </ProtectedRoute>
              } />
              <Route path="/student/exams" element={
                <ProtectedRoute allowedRoles={['student']} requiresPaidFees={true}>
                  <StudentExams />
                </ProtectedRoute>
              } />
              <Route path="/student/messages" element={
                <ProtectedRoute allowedRoles={['student']} requiresPaidFees={true}>
                  <StudentMessages />
                </ProtectedRoute>
              } />
              <Route path="/student/messages/:id" element={
                <ProtectedRoute allowedRoles={['student']} requiresPaidFees={true}>
                  <StudentMessages />
                </ProtectedRoute>
              } />
              <Route path="/student/settings" element={
                <ProtectedRoute allowedRoles={['student']} requiresPaidFees={true}>
                  <StudentSettings />
                </ProtectedRoute>
              } />
              
              {/* Admin Dashboard Routes - Protected */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/classes" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminClasses />
                </ProtectedRoute>
              } />
              <Route path="/admin/fees" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminFees />
                </ProtectedRoute>
              } />
              <Route path="/admin/events" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminEvents />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminReports />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              } />
              
              {/* Parent Dashboard Routes - Protected */}
              <Route path="/parent/dashboard" element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/parent/performance" element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentPerformance />
                </ProtectedRoute>
              } />
              <Route path="/parent/payments" element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentPayments />
                </ProtectedRoute>
              } />
              <Route path="/parent/reports" element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentReports />
                </ProtectedRoute>
              } />
              <Route path="/parent/messages" element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentMessages />
                </ProtectedRoute>
              } />
              <Route path="/parent/messages/:id" element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentMessages />
                </ProtectedRoute>
              } />
              <Route path="/parent/settings" element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentSettings />
                </ProtectedRoute>
              } />
              
              {/* Teacher Dashboard Routes - Protected */}
              <Route path="/teacher/dashboard" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } />
              <Route path="/teacher/attendance" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherAttendance />
                </ProtectedRoute>
              } />
              <Route path="/teacher/assignments" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherAssignments />
                </ProtectedRoute>
              } />
              <Route path="/teacher/exams" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherExams />
                </ProtectedRoute>
              } />
              <Route path="/teacher/resources" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherResources />
                </ProtectedRoute>
              } />
              <Route path="/teacher/messages" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherMessages />
                </ProtectedRoute>
              } />
              <Route path="/teacher/settings" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherSettings />
                </ProtectedRoute>
              } />
              <Route path="/teacher/messages/:id" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherMessages />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
