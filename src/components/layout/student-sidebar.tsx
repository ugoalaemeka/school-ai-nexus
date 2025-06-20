
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  LogOut,
  Upload,
  Clock,
  PlusCircle,
  Files
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface StudentSidebarProps {
  children: React.ReactNode;
}

export function StudentSidebar({ children }: StudentSidebarProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "dashboard-link active" : "dashboard-link";
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "Timetable", path: "/student/timetable" },
    { icon: FileText, label: "Assignments", path: "/student/assignments", badge: 2 },
    { icon: Files, label: "Resources", path: "/student/resources" },
    { icon: Clock, label: "Exam Timetable", path: "/student/exams" },
    { icon: MessageSquare, label: "Messages", path: "/student/messages", badge: 1 },
    { icon: Settings, label: "Settings", path: "/student/settings" },
  ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Desktop Sidebar - Glassmorphic effect */}
      <aside className="hidden lg:block lg:w-64 flex-shrink-0 h-screen sticky top-0 backdrop-blur-lg bg-white/5 border-r border-white/10 dark:bg-gray-900/50 transition-all z-30">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <Link to="/" className="flex items-center">
            <h2 className="text-xl font-bold text-primary">Eko Scholars Academy</h2>
          </Link>
        </div>

        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={isActive(item.path)}>
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile/Tablet Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="backdrop-blur-lg bg-white/5 border-r border-white/10 dark:bg-gray-900/50 p-0 w-64 z-50">
          <div className="p-4 flex items-center justify-between border-b border-white/10">
            <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <h2 className="text-xl font-bold text-primary">Eko Scholars Academy</h2>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={isActive(item.path)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b">
          <div className="container flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-2">
              {/* Mobile Menu Trigger */}
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              
              {/* Logo - always visible */}
              <Link to="/" className="font-bold text-lg">
                Eko Scholars Academy
              </Link>
            </div>

            {/* Search - collapsible on mobile */}
            <div className={`${isSearchOpen ? 'flex absolute left-0 right-0 top-0 bg-background/95 p-4 h-16 border-b' : 'hidden'} md:relative md:flex md:bg-transparent md:p-0 md:border-0 items-center transition-all duration-200 ease-in-out`}>
              {isSearchOpen && (
                <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search resources or assignments..." 
                  className="pl-8 pr-4 h-9 w-full" 
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-2">
              {!isSearchOpen && (
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
              )}
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>

              <ThemeToggle />

              <div className="hidden md:flex items-center gap-2 ml-2">
                <span className="font-medium">James Smith</span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>
          
        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* FAB for mobile */}
      <Button className="fixed right-4 bottom-4 shadow-lg lg:hidden flex items-center gap-2 z-10">
        <Upload className="h-4 w-4" />
        <span>Submit</span>
      </Button>
    </div>
  );
}
