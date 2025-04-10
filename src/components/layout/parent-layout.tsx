
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { 
  LayoutDashboard, 
  User, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface ParentLayoutProps {
  children: React.ReactNode;
}

export function ParentLayout({ children }: ParentLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "dashboard-link active" : "dashboard-link";
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const NavItems = () => (
    <>
      <Link to="/parent/dashboard" className={isActive("/parent/dashboard")}>
        <LayoutDashboard className="h-5 w-5" />
        <span className="hidden md:inline">Dashboard</span>
      </Link>
      
      <Link to="/parent/performance" className={isActive("/parent/performance")}>
        <User className="h-5 w-5" />
        <span className="hidden md:inline">Child Performance</span>
      </Link>
      
      <Link to="/parent/payments" className={isActive("/parent/payments")}>
        <DollarSign className="h-5 w-5" />
        <span className="hidden md:inline">Fee Payment</span>
      </Link>
      
      <Link to="/parent/reports" className={isActive("/parent/reports")}>
        <FileText className="h-5 w-5" />
        <span className="hidden md:inline">Report Cards</span>
      </Link>
      
      <Link to="/parent/messages" className={isActive("/parent/messages")}>
        <MessageSquare className="h-5 w-5" />
        <span className="hidden md:inline">Messages</span>
        <Badge className="ml-auto" variant="secondary">3</Badge>
      </Link>
      
      <Link to="/parent/settings" className={isActive("/parent/settings")}>
        <Settings className="h-5 w-5" />
        <span className="hidden md:inline">Settings</span>
      </Link>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Desktop Sidebar - Glassmorphic effect */}
      <aside className="hidden lg:block lg:w-64 flex-shrink-0 h-screen sticky top-0 backdrop-blur-lg bg-white/5 border-r border-white/10 dark:bg-gray-900/50 transition-all">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <Link to="/" className="flex items-center">
            <h2 className="text-xl font-bold text-primary">EduSync</h2>
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
              <h2 className="text-xl font-bold text-primary">EduSync</h2>
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
        <header className={`sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}>
          <div className="container flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              {/* Mobile Menu Trigger */}
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              
              {/* Logo - always visible */}
              <Link to="/" className="font-bold text-lg">
                EduSync
              </Link>
            </div>

            {/* Search - adaptive based on screen size */}
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

            {/* Mobile Search Trigger */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Right side icons */}
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="p-4 border-b last:border-0 hover:bg-muted/50">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">Sarah's math report card has been published</p>
                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      View all notifications <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <ThemeToggle />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <span className="hidden md:block font-medium">David Brown</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="David Brown" />
                      <AvatarFallback className="bg-primary/10 text-primary">DB</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">DB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">David Brown</p>
                        <p className="text-xs text-muted-foreground">parent@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="grid grid-cols-1 gap-1">
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link to="/parent/settings">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Mobile Search - Expanded */}
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-2 border-t md:hidden"
            >
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-8 h-9 w-full" 
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </header>
          
        {/* Main Content */}
        <main className="flex-1 container py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
