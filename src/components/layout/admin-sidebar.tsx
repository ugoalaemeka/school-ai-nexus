
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  LogOut,
  Award,
  MessageSquare,
  Bell,
  Shield,
  UserCheck,
  Building,
  TrendingUp
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

  const navigationSections = [
    {
      title: "School Overview",
      links: [
        { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3, badge: null },
        { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp, badge: null },
      ]
    },
    {
      title: "Academic Management",
      links: [
        { name: 'Classes & Levels', href: '/admin/classes', icon: GraduationCap, badge: null },
        { name: 'Subjects', href: '/admin/subjects', icon: BookOpen, badge: null },
        { name: 'Academic Calendar', href: '/admin/calendar', icon: CalendarDays, badge: null },
        { name: 'Examinations', href: '/admin/exams', icon: Award, badge: 'New' },
      ]
    },
    {
      title: "People Management",
      links: [
        { name: 'Students', href: '/admin/students', icon: Users, badge: null },
        { name: 'Teachers & Staff', href: '/admin/teachers', icon: School, badge: null },
        { name: 'Parents', href: '/admin/parents', icon: UserCheck, badge: null },
        { name: 'User Accounts', href: '/admin/users', icon: Shield, badge: null },
      ]
    },
    {
      title: "Operations",
      links: [
        { name: 'Admissions', href: '/admin/applications', icon: ClipboardList, badge: '5' },
        { name: 'Fee Management', href: '/admin/fees', icon: Receipt, badge: null },
        { name: 'School Events', href: '/admin/events', icon: CalendarDays, badge: null },
        { name: 'Communications', href: '/admin/messages', icon: MessageSquare, badge: '12' },
        { name: 'Announcements', href: '/admin/announcements', icon: Bell, badge: null },
      ]
    },
    {
      title: "Reports & Settings",
      links: [
        { name: 'Academic Reports', href: '/admin/reports', icon: FileBarChart, badge: null },
        { name: 'School Settings', href: '/admin/settings', icon: Settings, badge: null },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="px-3 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:shadow-md",
                    isActive(link.href) 
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg transform scale-105" 
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-700"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <link.icon className={cn(
                      "h-5 w-5",
                      isActive(link.href) ? "text-white" : "text-green-600"
                    )} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <Badge 
                      variant={isActive(link.href) ? "secondary" : "default"}
                      className={cn(
                        "text-xs h-6 px-2 font-medium",
                        isActive(link.href) 
                          ? "bg-white/20 text-white" 
                          : "bg-green-100 text-green-700"
                      )}
                    >
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* User Info & Logout */}
      <div className="p-4 border-t border-green-100 space-y-4">
        <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
          <p className="text-xs font-medium text-gray-500 mb-1">Current Session</p>
          <p className="text-sm font-bold text-gray-800">2024/2025 Academic Year</p>
          <p className="text-xs text-gray-600">Second Term Active</p>
        </div>
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors rounded-xl py-3"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
