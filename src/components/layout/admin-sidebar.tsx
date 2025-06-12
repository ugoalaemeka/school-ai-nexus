
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Users,
  GraduationCap,
  BookOpen,
  Receipt,
  CalendarDays,
  FileBarChart,
  Settings,
  School,
  ClipboardList,
  LogOut
} from 'lucide-react';

interface AdminSidebarProps {
  // Add any props you might need in the future
}

export function AdminSidebar({}: AdminSidebarProps) {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const links = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Teachers', href: '/admin/teachers', icon: School },
    { name: 'Applications', href: '/admin/applications', icon: ClipboardList },
    { name: 'Classes', href: '/admin/classes', icon: GraduationCap },
    { name: 'Subjects', href: '/admin/subjects', icon: BookOpen },
    { name: 'Fee Management', href: '/admin/fees', icon: Receipt },
    { name: 'Events & Schedule', href: '/admin/events', icon: CalendarDays },
    { name: 'Reports', href: '/admin/reports', icon: FileBarChart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full">
      <div className="px-4 py-2 flex-1">
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted hover:text-foreground",
                isActive(link.href) ? "bg-muted text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Logout Button at the bottom */}
      <div className="px-4 py-2 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
