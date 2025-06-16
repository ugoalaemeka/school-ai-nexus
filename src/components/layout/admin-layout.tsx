
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { 
  Bell, 
  Search, 
  User,
  Menu,
  X,
  School,
  MapPin
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile } = useAuth();
  const userName = profile ? `${profile.first_name} ${profile.last_name}`.trim() || 'Admin' : 'School Administrator';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Mobile/Tablet Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-80 bg-white border-r-2 border-green-200">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Eko Scholars Academy</h2>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Lagos, Nigeria
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 bg-white border-r-2 border-green-200 shadow-xl">
          <div className="p-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <School className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Eko Scholars Academy</h2>
                <p className="text-sm text-white/80 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Lagos, Nigeria
                </p>
              </div>
            </Link>
          </div>
          <AdminSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="bg-white border-b-2 border-green-100 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Trigger */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setIsMobileMenuOpen(true)} 
                  className="lg:hidden border-green-200 hover:bg-green-50"
                >
                  <Menu className="h-5 w-5 text-green-600" />
                </Button>
                
                <div className="hidden lg:block">
                  <h1 className="text-2xl font-bold text-gray-800">School Administration Portal</h1>
                  <p className="text-sm text-gray-500">2024/2025 Academic Session</p>
                </div>
              </div>

              {/* Search Bar - hidden on mobile */}
              <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="search" 
                    placeholder="Search students, teachers, classes..." 
                    className="pl-10 h-10 w-full border-green-200 focus:border-green-400 focus:ring-green-200" 
                  />
                </div>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="relative border-green-200 hover:bg-green-50">
                  <Bell className="h-5 w-5 text-green-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                </Button>
                <ThemeToggle />
                <div className="flex items-center gap-3 pl-3 border-l border-green-200">
                  <div className="hidden md:block text-right">
                    <p className="font-medium text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500">School Administrator</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 p-6 space-y-6 bg-gradient-to-br from-green-50/30 via-blue-50/30 to-purple-50/30 min-h-0">
            <div className="max-w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
