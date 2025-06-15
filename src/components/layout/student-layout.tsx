import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Calendar, 
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
  LogOut
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, profile } = useAuth();
  const userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Student' : 'Student';
  
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
      <Link to="/student/dashboard" className={isActive("/student/dashboard")}>
        <LayoutDashboard className="h-5 w-5" />
        <span className="hidden md:inline">Dashboard</span>
      </Link>
      
      <Link to="/student/timetable" className={isActive("/student/timetable")}>
        <Calendar className="h-5 w-5" />
        <span className="hidden md:inline">Timetable</span>
      </Link>
      
      <Link to="/student/assignments" className={isActive("/student/assignments")}>
        <FileText className="h-5 w-5" />
        <span className="hidden md:inline">Assignments</span>
        <Badge className="ml-auto" variant="secondary">2</Badge>
      </Link>
      
      <Link to="/student/resources" className={isActive("/student/resources")}>
        <Files className="h-5 w-5" />
        <span className="hidden md:inline">Resources</span>
      </Link>
      
      <Link to="/student/messages" className={isActive("/student/messages")}>
        <MessageSquare className="h-5 w-5" />
        <span className="hidden md:inline">Messages</span>
        <Badge className="ml-auto" variant="secondary">1</Badge>
      </Link>
      
      <Link to="/student/settings" className={isActive("/student/settings")}>
        <Settings className="h-5 w-5" />
        <span className="hidden md:inline">Settings</span>
      </Link>
      
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted dashboard-link"
      >
        <LogOut className="h-5 w-5" />
        <span className="hidden md:inline">Logout</span>
      </Button>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Desktop Sidebar - Glassmorphic effect */}
      <aside className="hidden lg:block lg:w-64 flex-shrink-0 h-screen sticky top-0 backdrop-blur-lg bg-white/5 border-r border-white/10 dark:bg-gray-900/50 transition-all">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <Link to="/" className="flex items-center">
            <h2 className="text-xl font-bold text-primary">Eko Scholars Academy</h2>
          </Link>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            <NavItems />
          </div>
        </div>
      </aside>

      {/* Mobile/Tablet Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="backdrop-blur-lg bg-white/5 border-r border-white/10 dark:bg-gray-900/50 p-0 w-64">
          <div className="p-4 flex items-center justify-between border-b border-white/10">
            <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <h2 className="text-xl font-bold text-primary">Eko Scholars Academy</h2>
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
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
          <div className="container flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              {/* Mobile Menu Trigger */}
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              
              <div className="hidden lg:flex items-center">
                <h1 className="text-xl font-semibold">Student Dashboard</h1>
              </div>
            </div>

            {/* Search - hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-8 h-9 w-full" 
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <span className="hidden md:block font-medium">{userName}</span>
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
