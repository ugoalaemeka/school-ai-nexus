import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
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
  User,
  Menu,
  X,
  LogOut,
  School,
  MapPin,
  GraduationCap,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, profile } = useAuth();
  const userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Mrs. Adeyemi Bukola' : 'Mrs. Adeyemi Bukola';
  
  const isActive = (path: string) => {
    return location.pathname === path ? "dashboard-link active" : "dashboard-link";
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const NavItems = () => (
    <>
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
        <Badge className="ml-auto bg-orange-100 text-orange-800" variant="secondary">2</Badge>
      </Link>
      
      <Link to="/teacher/exams" className={isActive("/teacher/exams")}>
        <BookOpen className="h-5 w-5" />
        <span className="hidden md:inline">Examinations</span>
      </Link>
      
      <Link to="/teacher/resources" className={isActive("/teacher/resources")}>
        <Files className="h-5 w-5" />
        <span className="hidden md:inline">Resources</span>
      </Link>
      
      <Link to="/teacher/messages" className={isActive("/teacher/messages")}>
        <MessageSquare className="h-5 w-5" />
        <span className="hidden md:inline">Messages</span>
        <Badge className="ml-auto bg-blue-100 text-blue-800" variant="secondary">5</Badge>
      </Link>
      
      <Link to="/teacher/settings" className={isActive("/teacher/settings")}>
        <Settings className="h-5 w-5" />
        <span className="hidden md:inline">Settings</span>
      </Link>
      
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted dashboard-link"
      >
        <LogOut className="h-5 w-5" />
        <span className="hidden md:inline">Sign Out</span>
      </Button>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Desktop Sidebar - Nigerian Academic Theme */}
      <aside className="hidden lg:block lg:w-64 flex-shrink-0 h-screen sticky top-0 bg-gradient-to-b from-blue-50 via-white to-green-50 border-r border-blue-200 transition-all">
        <div className="p-4 flex items-center justify-between border-b border-blue-200 mb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Eko Scholars Academy</h2>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Teacher Portal
              </p>
            </div>
          </Link>
        </div>

        <div className="px-3 space-y-2">
          <NavItems />
        </div>

        {/* Teacher Info */}
        <div className="absolute bottom-0 w-full px-3 py-4 border-t border-blue-200 space-y-3">
          <div className="px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <p className="text-xs text-blue-600 font-medium">Mathematics Teacher</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">Primary Level • 8 Years Experience</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">120 Students</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-purple-600" />
                <span className="text-xs text-purple-600">4 Classes</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="bg-gradient-to-b from-blue-50 via-white to-green-50 border-r border-blue-200 p-0 w-64">
          <div className="p-4 flex items-center justify-between border-b border-blue-200 mb-4">
            <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm">Eko Scholars Academy</h2>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Teacher Portal
                </p>
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <NavItems />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b">
          <div className="container flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              
              <div className="hidden lg:flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Teacher Portal</h1>
              </div>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search students, assignments..." 
                  className="pl-8 h-9 w-full border-blue-200 focus:border-blue-400" 
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <span className="hidden md:block font-medium text-gray-900">{userName}</span>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </header>
          
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
