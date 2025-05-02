
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  Bell,
  BookOpen,
  Calendar,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
  FileText,
  BookOpenCheck,
  DollarSign
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: "admin" | "teacher" | "student" | "parent";
}

export function DashboardLayout({ children, userRole = "student" }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { signOut, profile } = useAuth();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const adminLinks = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "User Management", path: "/admin/users" },
    { icon: BookOpenCheck, label: "Classes & Subjects", path: "/admin/classes" },
    { icon: DollarSign, label: "Fee Management", path: "/admin/fees" },
    { icon: Calendar, label: "Events & Schedule", path: "/admin/events" },
    { icon: FileText, label: "Reports", path: "/admin/reports" },
    { icon: Settings, label: "Settings", path: "/admin/settings" }
  ];
  
  const teacherLinks = [
    { icon: Home, label: "Dashboard", path: "/teacher/dashboard" },
    { icon: Users, label: "Attendance", path: "/teacher/attendance" },
    { icon: BookOpenCheck, label: "Assignments & Exams", path: "/teacher/assignments" },
    { icon: FileText, label: "Resources", path: "/teacher/resources" },
    { icon: MessageSquare, label: "Communication", path: "/teacher/messages" },
    { icon: Settings, label: "Settings", path: "/teacher/settings" }
  ];
  
  const studentLinks = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "Timetable", path: "/student/timetable" },
    { icon: BookOpenCheck, label: "Assignments", path: "/student/assignments" },
    { icon: FileText, label: "Resources", path: "/student/resources" },
    { icon: MessageSquare, label: "Messages", path: "/student/messages" },
    { icon: Settings, label: "Settings", path: "/student/settings" }
  ];
  
  const parentLinks = [
    { icon: Home, label: "Dashboard", path: "/parent/dashboard" },
    { icon: User, label: "Child Performance", path: "/parent/performance" },
    { icon: DollarSign, label: "Fee Payment", path: "/parent/payments" },
    { icon: FileText, label: "Report Cards", path: "/parent/reports" },
    { icon: MessageSquare, label: "Messages", path: "/parent/messages" },
    { icon: Settings, label: "Settings", path: "/parent/settings" }
  ];
  
  const getLinks = () => {
    switch (userRole) {
      case "admin": return adminLinks;
      case "teacher": return teacherLinks;
      case "parent": return parentLinks;
      case "student": 
      default: 
        return studentLinks;
    }
  };
  
  const links = getLinks();
  const roleName = userRole.charAt(0).toUpperCase() + userRole.slice(1);
  
  // Get user's full name from profile
  const userName = profile ? `${profile.first_name} ${profile.last_name}` : 'User';
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-sidebar border-r transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } h-full flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between h-16">
          <Link to="/" className={`flex items-center gap-2 font-bold ${!isSidebarOpen && "justify-center"}`}>
            <BookOpen className="h-6 w-6 text-primary" />
            {isSidebarOpen && <span>EduNexus</span>}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:flex hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`dashboard-link ${
                  location.pathname === link.path ? "active" : ""
                } ${isSidebarOpen ? "" : "justify-center"}`}
              >
                <link.icon className="h-5 w-5" />
                {isSidebarOpen && <span>{link.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className={`w-full dashboard-link ${isSidebarOpen ? "" : "justify-center"}`}
            onClick={signOut}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">{roleName} Portal</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <div className="flex items-center gap-2 ml-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span className="hidden md:inline-block font-medium">{userName}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
