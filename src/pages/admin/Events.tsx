
import React, { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  CalendarDays,
  PlusCircle,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  School,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Bell,
  Download,
  CheckSquare,
  Megaphone,
  Trophy,
  PartyPopper,
  GraduationCap,
  Flag
} from "lucide-react";

const EventsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  
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

  // Sample events data
  const events = [
    { id: 1, title: "Parent-Teacher Meeting", date: "2025-05-15", time: "15:00-18:00", location: "Main Hall", type: "meeting", organizer: "Sarah Johnson" },
    { id: 2, title: "Annual Sports Day", date: "2025-05-18", time: "09:00-16:00", location: "School Grounds", type: "sports", organizer: "David Martinez" },
    { id: 3, title: "Science Fair", date: "2025-05-22", time: "10:00-14:00", location: "Science Block", type: "academic", organizer: "Robert Wilson" },
    { id: 4, title: "Board Exam - Mathematics", date: "2025-05-25", time: "09:00-12:00", location: "Exam Hall", type: "exam", organizer: "Jennifer Taylor" },
    { id: 5, title: "Cultural Festival", date: "2025-05-28", time: "17:00-21:00", location: "Auditorium", type: "cultural", organizer: "Emily Davis" },
    { id: 6, title: "College Admissions Seminar", date: "2025-06-02", time: "14:00-16:00", location: "Lecture Hall", type: "seminar", organizer: "Michael Brown" },
  ];

  // Sample holidays
  const holidays = [
    { id: 1, title: "Summer Break", startDate: "2025-06-15", endDate: "2025-07-15", description: "Annual summer vacation" },
    { id: 2, title: "Independence Day", startDate: "2025-07-04", endDate: "2025-07-04", description: "National holiday" },
    { id: 3, title: "Teacher's Day", startDate: "2025-09-05", endDate: "2025-09-05", description: "Celebration of teachers" },
    { id: 4, title: "Winter Break", startDate: "2025-12-20", endDate: "2026-01-05", description: "Winter vacation" },
  ];

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'sports':
        return <Trophy className="h-4 w-4 text-green-500" />;
      case 'academic':
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      case 'exam':
        return <CheckSquare className="h-4 w-4 text-red-500" />;
      case 'cultural':
        return <PartyPopper className="h-4 w-4 text-amber-500" />;
      case 'seminar':
        return <Megaphone className="h-4 w-4 text-teal-500" />;
      default:
        return <CalendarDays className="h-4 w-4" />;
    }
  };

  const handleAddEvent = () => {
    toast({
      title: "Event added",
      description: "Your event has been scheduled successfully.",
    });
  };

  const handleDeleteEvent = (eventId: number) => {
    toast({
      title: "Event deleted",
      description: "The event has been removed from the calendar.",
      variant: "destructive",
    });
  };

  const handleAddHoliday = () => {
    toast({
      title: "Holiday scheduled",
      description: "Your holiday has been added to the academic calendar.",
    });
  };

  const handleSendNotification = () => {
    toast({
      title: "Notifications sent",
      description: "Event notifications have been sent to all participants.",
    });
  };

  // Time slots for day view
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

  return (
    <AdminSidebar>
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
              <h1 className="text-3xl font-bold">Events & Schedule</h1>
              <p className="text-muted-foreground">Manage school events, holidays and academic calendar</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                      Create a new event or activity in the school calendar.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="eventTitle">Event Title</Label>
                      <Input id="eventTitle" placeholder="e.g., Parent-Teacher Meeting" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="eventDate">Date</Label>
                        <Input id="eventDate" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="eventTime">Time</Label>
                        <Input id="eventTime" type="time" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="eventDuration">Duration</Label>
                        <Select defaultValue="60">
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="90">1.5 hours</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="180">3 hours</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                            <SelectItem value="allday">All day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select defaultValue="meeting">
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="seminar">Seminar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="eventLocation">Location</Label>
                      <Input id="eventLocation" placeholder="e.g., Main Hall" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="eventOrganizer">Organizer</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organizer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah">Sarah Johnson</SelectItem>
                          <SelectItem value="robert">Robert Wilson</SelectItem>
                          <SelectItem value="emily">Emily Davis</SelectItem>
                          <SelectItem value="david">David Martinez</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="eventDescription">Description</Label>
                      <Textarea id="eventDescription" placeholder="Event details and additional information" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="notification">Send Notification</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger>
                          <SelectValue placeholder="Send notification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, notify participants</SelectItem>
                          <SelectItem value="no">No, don't send notification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddEvent}>Create Event</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Flag className="h-4 w-4" />
                    Add Holiday
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Holiday</DialogTitle>
                    <DialogDescription>
                      Add a holiday or break to the academic calendar.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="holidayName">Holiday Name</Label>
                      <Input id="holidayName" placeholder="e.g., Summer Break" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="date" />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="holidayDescription">Description</Label>
                      <Textarea id="holidayDescription" placeholder="Brief description of the holiday" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="holidayType">Holiday Type</Label>
                      <Select defaultValue="academic">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic Break</SelectItem>
                          <SelectItem value="national">National Holiday</SelectItem>
                          <SelectItem value="religious">Religious Holiday</SelectItem>
                          <SelectItem value="local">Local Holiday</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddHoliday}>Add Holiday</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="gap-2" onClick={handleSendNotification}>
                <Bell className="h-4 w-4" />
                Notify
              </Button>
            </div>
          </motion.div>

          {/* Calendar Section */}
          <motion.div variants={itemVariant} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 overflow-hidden">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar 
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </Button>
                <p className="text-sm font-medium">May 2025</p>
                <Button variant="outline" size="sm" className="gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Events for {date ? date.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }) : "Today"}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 rounded-md bg-secondary p-1 text-secondary-foreground">
                    <Button
                      variant={viewMode === "month" ? "secondary" : "ghost"}
                      onClick={() => setViewMode("month")}
                      className="text-xs"
                      size="sm"
                    >
                      Month
                    </Button>
                    <Button
                      variant={viewMode === "week" ? "secondary" : "ghost"}
                      onClick={() => setViewMode("week")}
                      className="text-xs"
                      size="sm"
                    >
                      Week
                    </Button>
                    <Button
                      variant={viewMode === "day" ? "secondary" : "ghost"}
                      onClick={() => setViewMode("day")}
                      className="text-xs"
                      size="sm"
                    >
                      Day
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {viewMode === "day" ? (
                <CardContent className="p-0">
                  <div className="border-t">
                    {timeSlots.map((time) => (
                      <div key={time} className="flex border-b">
                        <div className="w-16 flex-shrink-0 text-center py-2 text-sm text-muted-foreground">
                          {time}:00
                        </div>
                        <div className="flex-grow border-l p-2 min-h-[60px]">
                          {/* Events would be placed here based on their time */}
                          {time === 10 && (
                            <div className="bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 p-2 rounded-r-md">
                              <div className="text-sm font-medium">Science Fair Planning</div>
                              <div className="text-xs text-muted-foreground">10:00 - 11:30</div>
                            </div>
                          )}
                          {time === 14 && (
                            <div className="bg-purple-100 dark:bg-purple-900/30 border-l-4 border-purple-500 p-2 rounded-r-md">
                              <div className="text-sm font-medium">Teacher's Meeting</div>
                              <div className="text-xs text-muted-foreground">14:00 - 15:00</div>
                            </div>
                          )}
                          {time === 16 && (
                            <div className="bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500 p-2 rounded-r-md">
                              <div className="text-sm font-medium">Sports Team Practice</div>
                              <div className="text-xs text-muted-foreground">16:00 - 18:00</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <div key={event.id} className="p-4 flex items-start hover:bg-muted/50">
                          <div className="mr-4 mt-1">
                            {getEventTypeIcon(event.type)}
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium">{event.title}</div>
                            <div className="flex flex-wrap text-sm text-muted-foreground gap-4 mt-1">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive" 
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No events found</h3>
                        <p className="text-muted-foreground">No events scheduled for the selected date.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
              
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredEvents.length} events
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Tabs for Different Views */}
          <motion.div variants={itemVariant}>
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="events">All Events</TabsTrigger>
                <TabsTrigger value="holidays">Holidays & Breaks</TabsTrigger>
                <TabsTrigger value="academic">Academic Calendar</TabsTrigger>
              </TabsList>
              
              {/* All Events Tab */}
              <TabsContent value="events" className="mt-0">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Search events..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Event Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="meeting">Meetings</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="exam">Exams</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="seminar">Seminars</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="upcoming">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Time Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="past">Past Events</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                        <TableHead className="hidden lg:table-cell">Location</TableHead>
                        <TableHead className="hidden md:table-cell">Organizer</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {getEventTypeIcon(event.type)}
                              <div>
                                <div>{event.title}</div>
                                <div className="text-xs text-muted-foreground md:hidden">
                                  {event.date} • {event.time}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div>{event.date}</div>
                            <div className="text-sm text-muted-foreground">{event.time}</div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{event.location}</TableCell>
                          <TableCell className="hidden md:table-cell">{event.organizer}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              {/* Holidays & Breaks Tab */}
              <TabsContent value="holidays" className="mt-0">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Holiday/Break</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {holidays.map((holiday) => (
                        <TableRow key={holiday.id}>
                          <TableCell className="font-medium">{holiday.title}</TableCell>
                          <TableCell>{holiday.startDate}</TableCell>
                          <TableCell>{holiday.endDate}</TableCell>
                          <TableCell className="hidden md:table-cell">{holiday.description}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              {/* Academic Calendar Tab */}
              <TabsContent value="academic" className="mt-0">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="py-12">
                      <School className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Academic Year Planning</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-4">
                        Plan and manage the academic year calendar, including terms, exam periods, and important dates.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Button className="gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Plan Academic Year
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export Calendar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </AdminSidebar>
  );
};

export default EventsPage;
