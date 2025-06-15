import React, { useState } from "react";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  List,
  CalendarDays,
  Download,
  Bell,
  PlusCircle,
  ChevronRight,
  User,
  Users,
  MapPin,
  BookOpen,
  GraduationCap,
  Bookmark
} from "lucide-react";

// Subject colors for visual distinction
const subjectColors: Record<string, string> = {
  "Mathematics": "bg-blue-500",
  "English Language": "bg-green-500",
  "Basic Science": "bg-purple-500",
  "Social Studies": "bg-amber-500",
  "Civic Education": "bg-emerald-500",
  "Computer Studies": "bg-indigo-500",
  "Creative Arts": "bg-rose-500",
  "Yoruba Language": "bg-cyan-500",
  "P.H.E": "bg-teal-500",
};

// Subject icons
const subjectIcons: Record<string, React.ReactNode> = {
  "Mathematics": <div className="p-2 rounded-full bg-blue-100 text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>,
  "English Language": <div className="p-2 rounded-full bg-green-100 text-green-500"><BookOpen size={16} /></div>,
  "Basic Science": <div className="p-2 rounded-full bg-purple-100 text-purple-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"></path><path d="M14 9.3V1.99"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.58 16.5h12.85"></path></svg></div>,
  "Social Studies": <div className="p-2 rounded-full bg-amber-100 text-amber-500"><Users size={16} /></div>,
  "Civic Education": <div className="p-2 rounded-full bg-emerald-100 text-emerald-500"><GraduationCap size={16} /></div>,
  "Computer Studies": <div className="p-2 rounded-full bg-indigo-100 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div>,
  "Creative Arts": <div className="p-2 rounded-full bg-rose-100 text-rose-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="10.5" r="2.5"></circle><circle cx="8.5" cy="7.5" r="2.5"></circle><circle cx="6.5" cy="12.5" r="2.5"></circle><path d="M12 15.5a4 4 0 1 0 4 4"></path></svg></div>,
  "Yoruba Language": <div className="p-2 rounded-full bg-cyan-100 text-cyan-500"><BookOpen size={16} /></div>,
  "P.H.E": <div className="p-2 rounded-full bg-teal-100 text-teal-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.7 8c-.4-1-1.2-1.9-2.3-2.4-.6-.3-1.4-.6-2.5-.6-.9 0-1.8.1-2.6.5-.8.3-1.6.9-2.2 1.8-.6 1-1 2.3-1 4.1 0 2.1.5 3.6 1.4 4.7.9 1.1 2.1 1.6 3.6 1.6 1.6 0 3-1 4.1-2.9"></path><path d="M13.6 16.6c-1.1 1.3-2.4 2.4-3.9 3.5-1.5-.9-2.9-2-4.1-3.5-.7-.9-1.2-1.9-1.6-3"></path><path d="M16.9 15.3c1.1-1.5 2-3.1 2.7-4.8"></path><path d="M12 4.5c1.9.4 3.6 1 5.1 2"></path><path d="M12 4.5C9.6 5 7.5 5.7 5.5 6.5"></path><path d="M5.5 13.5c-2-1.2-3.4-2.4-4-3.8"></path><path d="M20.5 9.7c2 1.2 3.4 2.5 4 3.8"></path></svg></div>,
};

// Sample timetable data
const weeklyTimetable = {
  "Monday": [
    { id: 1, subject: "Mathematics", time: "08:30 - 09:30", room: "Room 101", teacher: "Mrs. Jenkins" },
    { id: 2, subject: "English Language", time: "09:45 - 10:45", room: "Room 203", teacher: "Mr. Rodriguez" },
    { id: 3, subject: "Computer Studies", time: "11:00 - 12:00", room: "Lab 02", teacher: "Ms. Wilson" },
    { id: 4, subject: "Basic Science", time: "13:00 - 14:00", room: "Lab 03", teacher: "Dr. Thompson" },
  ],
  "Tuesday": [
    { id: 5, subject: "Yoruba Language", time: "08:30 - 09:30", room: "Room 102", teacher: "Mrs. Adebayo" },
    { id: 6, subject: "Social Studies", time: "09:45 - 10:45", room: "Room 105", teacher: "Mr. Anderson" },
    { id: 7, subject: "Civic Education", time: "11:00 - 12:00", room: "Hall A", teacher: "Mrs. Taylor" },
    { id: 8, subject: "Creative Arts", time: "13:00 - 14:00", room: "Art Studio", teacher: "Ms. Lopez" },
  ],
  "Wednesday": [
    { id: 9, subject: "Mathematics", time: "08:30 - 09:30", room: "Room 101", teacher: "Mrs. Jenkins" },
    { id: 10, subject: "Basic Science", time: "09:45 - 10:45", room: "Lab 03", teacher: "Dr. Thompson" },
    { id: 11, subject: "English Language", time: "11:00 - 12:00", room: "Room 203", teacher: "Mr. Rodriguez" },
    { id: 12, subject: "P.H.E", time: "13:00 - 14:00", room: "Sports Hall", teacher: "Coach Johnson" },
  ],
  "Thursday": [
    { id: 13, subject: "Social Studies", time: "08:30 - 09:30", room: "Room 105", teacher: "Mr. Anderson" },
    { id: 14, subject: "Computer Studies", time: "09:45 - 10:45", room: "Lab 02", teacher: "Ms. Wilson" },
    { id: 15, subject: "Mathematics", time: "11:00 - 12:00", room: "Room 101", teacher: "Mrs. Jenkins" },
    { id: 16, subject: "Yoruba Language", time: "13:00 - 14:00", room: "Room 102", teacher: "Mrs. Adebayo" },
  ],
  "Friday": [
    { id: 17, subject: "English Language", time: "08:30 - 09:30", room: "Room 203", teacher: "Mr. Rodriguez" },
    { id: 18, subject: "Basic Science", time: "09:45 - 10:45", room: "Lab 03", teacher: "Dr. Thompson" },
    { id: 19, subject: "Civic Education", time: "11:00 - 12:00", room: "Hall A", teacher: "Mrs. Taylor" },
    { id: 20, subject: "Creative Arts", time: "13:00 - 14:00", room: "Art Studio", teacher: "Ms. Lopez" },
  ],
};

const TimetablePage = () => {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const { toast } = useToast();

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleReminderToggle = (enabled: boolean) => {
    setRemindersEnabled(enabled);
    toast({
      title: enabled ? "Reminders enabled" : "Reminders disabled",
      description: enabled 
        ? "You will receive notifications for upcoming classes" 
        : "You will not receive notifications for classes",
    });
  }

  const handleDownloadTimetable = () => {
    toast({
      title: "Timetable downloaded",
      description: "Your timetable has been downloaded successfully",
    });
  }

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <StudentSidebar>
      <div className="container py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariant}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Class Timetable</h1>
              <p className="text-muted-foreground">View your weekly schedule and classes</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={handleDownloadTimetable}>
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="reminders" 
                  checked={remindersEnabled}
                  onCheckedChange={handleReminderToggle}
                />
                <Label htmlFor="reminders" className="text-sm">Class Reminders</Label>
              </div>
            </div>
          </motion.div>

          {/* View Toggle and Filters */}
          <motion.div variants={itemVariant} className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-2">
              <Tabs defaultValue="list" className="w-[240px]" onValueChange={(value) => setViewMode(value as "list" | "calendar")}>
                <TabsList>
                  <TabsTrigger value="list" className="flex gap-1">
                    <List className="h-4 w-4" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex gap-1">
                    <CalendarDays className="h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex gap-2">
              <Select defaultValue={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                  {weekdays.map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search subject..." 
                  className="pl-8 h-9 w-full sm:w-[180px]" 
                />
              </div>
            </div>
          </motion.div>

          {/* List View */}
          {viewMode === "list" && (
            <motion.div variants={itemVariant} className="space-y-4">
              {weeklyTimetable[selectedDay as keyof typeof weeklyTimetable].map((classItem) => (
                <Card key={classItem.id} className="overflow-hidden">
                  <div className={`w-1 h-full absolute left-0 ${subjectColors[classItem.subject] || 'bg-gray-500'}`}></div>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        {subjectIcons[classItem.subject] || 
                          <div className="p-2 rounded-full bg-gray-100 text-gray-500">
                            <BookOpen size={16} />
                          </div>
                        }
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{classItem.subject}</h3>
                            <div className="flex items-center text-sm text-muted-foreground gap-1">
                              <User className="h-3 w-3" />
                              <span>{classItem.teacher}</span>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {classItem.time}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              <span>{classItem.room}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto flex-shrink-0">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Calendar View */}
          {viewMode === "calendar" && (
            <motion.div variants={itemVariant} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weekdays.map((day) => (
                <Card key={day} className={`overflow-hidden ${day === selectedDay ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader className="p-3">
                    <CardTitle className="text-lg">{day}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2 pb-3 space-y-2">
                    {weeklyTimetable[day as keyof typeof weeklyTimetable].map((classItem) => (
                      <div 
                        key={classItem.id} 
                        className={`p-2 rounded border-l-4 ${subjectColors[classItem.subject] || 'border-gray-500'} bg-background hover:bg-muted/50 transition-colors cursor-pointer text-sm`}
                      >
                        <div className="font-medium">{classItem.subject}</div>
                        <div className="text-xs text-muted-foreground mt-1">{classItem.time}</div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1 mt-1">
                          <MapPin className="h-2 w-2" />
                          <span>{classItem.room}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Today's Reminders */}
          <motion.div variants={itemVariant}>
            <Card>
              <CardHeader>
                <CardTitle>Today's Classes</CardTitle>
                <CardDescription>Your upcoming classes for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weeklyTimetable["Monday"].slice(0, 2).map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-2 rounded bg-muted/40">
                      <div className="flex items-center gap-2">
                        {subjectIcons[classItem.subject] || 
                          <div className="p-2 rounded-full bg-gray-100 text-gray-500">
                            <BookOpen size={16} />
                          </div>
                        }
                        <div>
                          <div className="font-medium">{classItem.subject}</div>
                          <div className="text-sm text-muted-foreground">{classItem.time}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-auto">Starts in 30m</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </StudentSidebar>
  );
};

export default TimetablePage;
