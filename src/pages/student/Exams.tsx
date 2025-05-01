
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, Download, Filter, Clock, Book, MapPin, Calendar as CalendarIcon, BookOpen } from "lucide-react";
import { format } from "date-fns";

// Sample exam data
const examData = [
  {
    id: 1,
    subject: "Mathematics",
    date: new Date(2025, 5, 10, 9, 0),
    duration: "3 hours",
    room: "Hall A",
    seat: "A12",
    resources: ["Calculus Textbook", "Formula Sheet"],
    color: "bg-blue-500"
  },
  {
    id: 2,
    subject: "Physics",
    date: new Date(2025, 5, 12, 13, 30),
    duration: "2 hours",
    room: "Lab 101",
    seat: "B05",
    resources: ["Physics Notes", "Calculator Guide"],
    color: "bg-green-500"
  },
  {
    id: 3,
    subject: "English Literature",
    date: new Date(2025, 5, 15, 10, 0),
    duration: "2.5 hours",
    room: "Main Hall",
    seat: "C22",
    resources: ["Shakespeare Anthology", "Literary Terms Glossary"],
    color: "bg-purple-500"
  },
  {
    id: 4,
    subject: "Computer Science",
    date: new Date(2025, 5, 8, 14, 0), // Today's exam
    duration: "2 hours",
    room: "Computer Lab 3",
    seat: "L08",
    resources: ["Algorithm Cheatsheet", "Pseudocode Reference"],
    color: "bg-red-500",
    isToday: true
  },
  {
    id: 5,
    subject: "Chemistry",
    date: new Date(2025, 5, 18, 9, 0),
    duration: "3 hours",
    room: "Chemistry Lab",
    seat: "D10",
    resources: ["Periodic Table", "Reaction Reference"],
    color: "bg-yellow-500"
  },
];

// Study tips data
const studyTips = [
  {
    id: "tip1",
    subject: "General",
    tips: [
      "Create a study schedule with regular breaks",
      "Use active recall techniques instead of passive reading",
      "Explain concepts to someone else to solidify understanding",
      "Stay hydrated and well-rested before exams"
    ]
  },
  {
    id: "tip2",
    subject: "Mathematics",
    tips: [
      "Practice with past papers and example problems",
      "Create formula flashcards for quick review",
      "Work through difficult problems step-by-step",
      "Form study groups to tackle challenging concepts"
    ]
  },
  {
    id: "tip3",
    subject: "Sciences",
    tips: [
      "Draw diagrams to visualize processes",
      "Create mnemonics for complex sequences",
      "Link theoretical concepts to practical applications",
      "Review lab notes and experiment outcomes"
    ]
  }
];

const ExamTimetablePage = () => {
  const [filter, setFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [expandedExam, setExpandedExam] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("calendar");
  
  // Calculate days until exam
  const calculateDaysUntil = (examDate: Date) => {
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter exams based on selection
  const filteredExams = examData.filter(exam => {
    if (filter === "all") return true;
    if (filter === "upcoming" && calculateDaysUntil(exam.date) > 0) return true;
    if (filter === "today" && calculateDaysUntil(exam.date) === 0) return true;
    return filter === exam.subject.toLowerCase();
  });

  // Sort exams by date
  const sortedExams = [...filteredExams].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Toggling exam details
  const toggleExam = (id: number) => {
    setExpandedExam(expandedExam === id ? null : id);
  };

  return (
    <StudentSidebar>
      <div className="container py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Exam Timetable</h1>
              <p className="text-muted-foreground">Manage your upcoming exams and preparation</p>
            </div>
            <Button className="mt-4 md:mt-0" size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Full Schedule
            </Button>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Select defaultValue={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Exams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  <SelectItem value="upcoming">Upcoming Exams</SelectItem>
                  <SelectItem value="today">Today's Exams</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="english literature">English Literature</SelectItem>
                  <SelectItem value="computer science">Computer Science</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Input type="search" placeholder="Search by subject, room or date..." />
            </div>
          </div>

          {/* Tabs for switching between calendar and list views */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border shadow"
                        disabled={(date) => date < new Date("2025-05-01")}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="font-medium">Exams on {date ? format(date, 'PP') : 'selected date'}</h3>
                      </div>
                      <div className="space-y-2">
                        {sortedExams
                          .filter(exam => date && format(exam.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                          .map(exam => (
                            <motion.div
                              key={exam.id}
                              className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                              whileHover={{ scale: 1.01 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <div className="flex items-center">
                                <div className={`w-3 h-10 rounded ${exam.color} mr-3`}></div>
                                <div className="flex-1">
                                  <p className="font-medium">{exam.subject}</p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {format(exam.date, 'p')} ({exam.duration})
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {exam.room}, Seat {exam.seat}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        {date && 
                          sortedExams.filter(exam => 
                            format(exam.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                          ).length === 0 && (
                          <div className="text-center py-6 text-muted-foreground">
                            No exams scheduled for this date
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="list">
              <div className="space-y-4">
                {sortedExams.length > 0 ? (
                  sortedExams.map(exam => (
                    <motion.div
                      key={exam.id}
                      animate={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`border rounded-lg overflow-hidden ${exam.isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                      <div 
                        className={`flex justify-between items-center p-4 cursor-pointer ${exam.isToday ? 'bg-primary/5' : ''}`}
                        onClick={() => toggleExam(exam.id)}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-10 rounded ${exam.color} mr-3 sm:mr-4`}></div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{exam.subject}</h3>
                              {exam.isToday && (
                                <Badge variant="outline" className="ml-3 bg-primary/20 text-primary">Today</Badge>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                <span>{format(exam.date, 'PPP')}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{format(exam.date, 'p')} ({exam.duration})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="hidden sm:block text-right mr-4">
                            <p className="text-sm font-medium">
                              {calculateDaysUntil(exam.date) === 0 
                                ? 'Today'
                                : calculateDaysUntil(exam.date) === 1
                                  ? 'Tomorrow' 
                                  : `${calculateDaysUntil(exam.date)} days left`}
                            </p>
                            <p className="text-xs text-muted-foreground">{exam.room}, Seat {exam.seat}</p>
                          </div>
                          <ChevronDown 
                            className={`h-5 w-5 transition-transform ${expandedExam === exam.id ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>
                      
                      {expandedExam === exam.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4"
                        >
                          <div className="pt-2 border-t mt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" /> Location Details
                                </h4>
                                <div className="bg-muted/50 p-3 rounded-md text-sm">
                                  <p><span className="font-medium">Room:</span> {exam.room}</p>
                                  <p><span className="font-medium">Seat Number:</span> {exam.seat}</p>
                                  <p><span className="font-medium">Duration:</span> {exam.duration}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                  <BookOpen className="h-4 w-4 mr-1" /> Recommended Study Resources
                                </h4>
                                <div className="bg-muted/50 p-3 rounded-md">
                                  <ul className="text-sm list-disc list-inside">
                                    {exam.resources.map((resource, idx) => (
                                      <li key={idx}>{resource}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <p className="text-muted-foreground">No exams matching your filter criteria</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Study Tips Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Exam Preparation Guide</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Study Tips</CardTitle>
                  <CardDescription>Maximize your exam performance with these recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {studyTips.map(tip => (
                      <AccordionItem key={tip.id} value={tip.id}>
                        <AccordionTrigger>{tip.subject} Study Tips</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside space-y-1">
                            {tip.tips.map((item, idx) => (
                              <li key={idx} className="text-sm">{item}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Exam Preparation Checklist</CardTitle>
                  <CardDescription>Ensure you're fully prepared for your upcoming exams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      "Gather all necessary study materials",
                      "Review lecture notes and textbooks",
                      "Complete practice exams under timed conditions",
                      "Form or join study groups for collaborative review",
                      "Create summary sheets for key concepts",
                      "Schedule regular breaks during study sessions",
                      "Prepare supplies needed for exam day",
                      "Get adequate sleep the night before exams"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="h-5 w-5 rounded-sm border mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download Complete Checklist</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </StudentSidebar>
  );
};

export default ExamTimetablePage;
