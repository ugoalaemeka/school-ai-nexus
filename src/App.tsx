
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Student Dashboard
import StudentDashboard from "./pages/student/Dashboard";

// Admin Dashboard
import AdminDashboard from "./pages/admin/Dashboard";

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Teacher Dashboard Routes - Future Implementation */}
            {/* <Route path="/teacher/dashboard" element={<TeacherDashboard />} /> */}
            
            {/* Parent Dashboard Routes - Future Implementation */}
            {/* <Route path="/parent/dashboard" element={<ParentDashboard />} /> */}
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
