import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme/theme-provider';
import Index from './pages/Index';
import About from './pages/About';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NewsEvents from './pages/NewsEvents';
import ScheduleVisit from './pages/ScheduleVisit';
import Admission from './pages/Admission';
import AdmissionApplication from './pages/AdmissionApplication';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Classes from './pages/admin/Classes';
import Fees from './pages/admin/Fees';
import Events from './pages/admin/Events';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';
import TeacherDashboard from './pages/teacher/Dashboard';
import Attendance from './pages/teacher/Attendance';
import TeacherAssignments from './pages/teacher/Assignments';
import TeacherExams from './pages/teacher/Exams';
import TeacherResources from './pages/teacher/Resources';
import TeacherMessages from './pages/teacher/Messages';
import TeacherSettings from './pages/teacher/Settings';
import StudentDashboard from './pages/student/Dashboard';
import StudentTimetable from './pages/student/Timetable';
import StudentAssignments from './pages/student/Assignments';
import StudentResources from './pages/student/Resources';
import StudentMessages from './pages/student/Messages';
import StudentSettings from './pages/student/Settings';
import ParentDashboard from './pages/parent/Dashboard';
import ParentPerformance from './pages/parent/Performance';
import ParentPayments from './pages/parent/Payments';
import ParentReports from './pages/parent/Reports';
import ParentMessages from './pages/parent/Messages';
import ParentSettings from './pages/parent/Settings';
import { Toaster } from '@/components/ui/toaster';
import UnpaidFeesPage from './pages/student/UnpaidFees';

// Add these imports
import TeacherActivation from "./pages/TeacherActivation";
import TeachersPage from "./pages/admin/Teachers";
import InactiveAccountPage from "./pages/teacher/InactiveAccount";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/schedule-visit" element={<ScheduleVisit />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/admission/apply" element={<AdmissionApplication />} />
          <Route path="/unpaid-fees" element={<UnpaidFeesPage />} />
          
          {/* Teacher activation route */}
          <Route path="/activate" element={<TeacherActivation />} />
          <Route path="/inactive-account" element={<InactiveAccountPage />} />
          
          {/* Protected routes - Admin */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          } />
          <Route path="/admin/teachers" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <TeachersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/classes" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Classes />
            </ProtectedRoute>
          } />
          <Route path="/admin/fees" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Fees />
            </ProtectedRoute>
          } />
          <Route path="/admin/events" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Settings />
            </ProtectedRoute>
          } />
          
          {/* Protected routes - Teacher */}
          <Route path="/teacher/dashboard" element={
            <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/teacher/attendance" element={
            <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
              <Attendance />
            </ProtectedRoute>
          } />
          <Route path="/teacher/assignments" element={
            <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
              <TeacherAssignments />
            </ProtectedRoute>
          } />
          <Route path="/teacher/exams" element={
            <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
              <TeacherExams />
            </ProtectedRoute>
          } />
          <Route path="/teacher/resources" element={
            <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
              <TeacherResources />
            </ProtectedRoute>
          } />
          <Route path="/teacher/messages" element={
            <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
              <TeacherMessages />
            </ProtectedRoute>
          } />
          <Route path="/teacher/settings" element={
            <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
              <TeacherSettings />
            </ProtectedRoute>
          } />
          
          {/* Protected routes - Student */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student/timetable" element={
            <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
              <StudentTimetable />
            </ProtectedRoute>
          } />
          <Route path="/student/assignments" element={
            <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
              <StudentAssignments />
            </ProtectedRoute>
          } />
          <Route path="/student/resources" element={
            <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
              <StudentResources />
            </ProtectedRoute>
          } />
          <Route path="/student/messages" element={
            <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
              <StudentMessages />
            </ProtectedRoute>
          } />
          <Route path="/student/settings" element={
            <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
              <StudentSettings />
            </ProtectedRoute>
          } />
          
          {/* Protected routes - Parent */}
          <Route path="/parent/dashboard" element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/parent/performance" element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentPerformance />
            </ProtectedRoute>
          } />
          <Route path="/parent/payments" element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentPayments />
            </ProtectedRoute>
          } />
          <Route path="/parent/reports" element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentReports />
            </ProtectedRoute>
          } />
          <Route path="/parent/messages" element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentMessages />
            </ProtectedRoute>
          } />
          <Route path="/parent/settings" element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentSettings />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
