
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { 
  LayoutDashboard, 
  UserCheck, 
  FileText, 
  BookOpen, 
  Files, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search, 
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "dashboard-link active" : "dashboard-link";
  };

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      {/* Sidebar - Glassmorphic effect */}
      <aside className="lg:w-64 bg-sidebar flex-shrink-0 overflow-y-auto lg:h-screen sticky top-0 backdrop-blur-lg bg-white/5 border-r border-white/10 dark:bg-gray-900/50">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <Link to="/" className="flex items-center">
            <h2 className="text-xl font-bold text-primary">EduSync</h2>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <User className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="space-y-1">
            <Link to="/teacher/dashboard" className={isActive("/teacher/dashboard")}>
              <LayoutDashboard className="h-5 w-5" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            
            <Link to="/teacher/attendance" className={isActive("/teacher/attendance")}>
              <UserCheck className="h-5 w-5" />
              <span className="hidden md:inline">Attendance</span>
            </Link>
            
            <Link to="/teacher/assignments" className={isActive("/teacher/assignments")}>
              <FileText className="h-5 w-5" />
              <span className="hidden md:inline">Assignments</span>
            </Link>
            
            <Link to="/teacher/exams" className={isActive("/teacher/exams")}>
              <BookOpen className="h-5 w-5" />
              <span className="hidden md:inline">Exams</span>
            </Link>
            
            <Link to="/teacher/resources" className={isActive("/teacher/resources")}>
              <Files className="h-5 w-5" />
              <span className="hidden md:inline">Resources</span>
            </Link>
            
            <Link to="/teacher/messages" className={isActive("/teacher/messages")}>
              <MessageSquare className="h-5 w-5" />
              <span className="hidden md:inline">Messages</span>
              <Badge className="ml-auto" variant="secondary">3</Badge>
            </Link>
            
            <Link to="/teacher/settings" className={isActive("/teacher/settings")}>
              <Settings className="h-5 w-5" />
              <span className="hidden md:inline">Settings</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
          <div className="container flex items-center justify-between p-4">
            <div className="flex items-center md:w-1/3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-8 h-9 md:w-[250px] lg:w-[300px]" 
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 md:w-1/3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <span className="hidden md:block font-medium">Mrs. Johnson</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>
          
        {/* Main Content */}
        <main className="flex-1 container py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
