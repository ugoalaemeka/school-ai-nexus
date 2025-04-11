
import React, { useState } from "react";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  FileVideo, 
  FileImage, 
  FilePlus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreVertical, 
  Clock, 
  Upload, 
  FileUp,
  FileType,
  Check,
  User
} from "lucide-react";

const ResourcesPage = () => {
  // State for search query and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isUploading, setIsUploading] = useState(false);

  // Simulated resource categories
  const resourceCategories = [
    { id: "all", name: "All Resources" },
    { id: "notes", name: "Notes" },
    { id: "documents", name: "Documents" },
    { id: "videos", name: "Videos" },
    { id: "presentations", name: "Presentations" },
    { id: "pinned", name: "Pinned" },
  ];

  // Simulated subjects for filtering
  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "math", name: "Mathematics" },
    { id: "science", name: "Science" },
    { id: "english", name: "English" },
    { id: "history", name: "History" },
    { id: "art", name: "Art" },
  ];

  // Simulated resource types for filtering
  const resourceTypes = [
    { id: "all", name: "All Types" },
    { id: "pdf", name: "PDF" },
    { id: "video", name: "Video" },
    { id: "doc", name: "Document" },
    { id: "ppt", name: "Presentation" },
  ];

  // Simulated teachers for filtering
  const teachers = [
    { id: "all", name: "All Teachers" },
    { id: "jenkins", name: "Mrs. Jenkins" },
    { id: "phillips", name: "Mr. Phillips" },
    { id: "rodriguez", name: "Ms. Rodriguez" },
    { id: "thompson", name: "Dr. Thompson" },
  ];

  // Sample resource data with different types
  const resourcesData = [
    { 
      id: 1, 
      title: "Mathematics Formulas and Equations", 
      type: "pdf", 
      subject: "math", 
      teacher: "jenkins",
      teacherName: "Mrs. Jenkins",
      uploadDate: "2025-04-08T10:30:00", 
      size: "2.4 MB",
      pinned: true,
      description: "Complete compilation of all formulas covered this term",
      downloadCount: 45
    },
    { 
      id: 2, 
      title: "Science Lab Safety Guidelines", 
      type: "pdf", 
      subject: "science", 
      teacher: "phillips",
      teacherName: "Mr. Phillips",
      uploadDate: "2025-04-05T14:15:00", 
      size: "1.8 MB",
      pinned: true,
      description: "Important safety protocols for all lab sessions",
      downloadCount: 32
    },
    { 
      id: 3, 
      title: "World History Timeline Video", 
      type: "video", 
      subject: "history", 
      teacher: "thompson",
      teacherName: "Dr. Thompson",
      uploadDate: "2025-04-01T09:45:00", 
      size: "45 MB",
      pinned: false,
      description: "Visual overview of major historical events",
      downloadCount: 28
    },
    { 
      id: 4, 
      title: "English Literature Essay Structure", 
      type: "doc", 
      subject: "english", 
      teacher: "rodriguez",
      teacherName: "Ms. Rodriguez",
      uploadDate: "2025-04-10T11:20:00", 
      size: "850 KB",
      pinned: false,
      description: "Guide to writing effective literary essays",
      downloadCount: 19
    },
    { 
      id: 5, 
      title: "Art History Presentation", 
      type: "ppt", 
      subject: "art", 
      teacher: "thompson",
      teacherName: "Dr. Thompson",
      uploadDate: "2025-04-09T15:40:00", 
      size: "4.2 MB",
      pinned: false,
      description: "Overview of major art movements and influential artists",
      downloadCount: 15
    },
    { 
      id: 6, 
      title: "Algebra Practice Problems", 
      type: "pdf", 
      subject: "math", 
      teacher: "jenkins",
      teacherName: "Mrs. Jenkins",
      uploadDate: "2025-04-07T13:10:00", 
      size: "1.2 MB",
      pinned: false,
      description: "Additional practice problems for exam preparation",
      downloadCount: 37
    },
    { 
      id: 7, 
      title: "Chemistry Lab Demo Video", 
      type: "video", 
      subject: "science", 
      teacher: "phillips",
      teacherName: "Mr. Phillips",
      uploadDate: "2025-04-06T10:00:00", 
      size: "38 MB",
      pinned: false,
      description: "Visual demonstration of lab procedures",
      downloadCount: 24
    },
    { 
      id: 8, 
      title: "Essay Writing Workshop Recording", 
      type: "video", 
      subject: "english", 
      teacher: "rodriguez",
      teacherName: "Ms. Rodriguez",
      uploadDate: "2025-04-11T09:30:00", 
      size: "52 MB",
      pinned: false,
      description: "Recording of the writing workshop session",
      downloadCount: 8
    },
  ];

  // Filter resources based on search query and selected filters
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = subjectFilter === "all" || resource.subject === subjectFilter;
    const matchesType = typeFilter === "all" || resource.type === typeFilter;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  // Get recently added resources (last 3 days)
  const recentResources = resourcesData.filter(resource => {
    const uploadDate = new Date(resource.uploadDate);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return uploadDate >= threeDaysAgo;
  });

  // Sort by newest first
  const sortedRecentResources = [...recentResources].sort((a, b) => 
    new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  );

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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

  // Handle file upload
  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload Successful",
        description: "Your resource has been uploaded and is now available.",
        variant: "default",
      });
    }, 2000);
  };

  // Handle resource download
  const handleDownload = (resourceId: number, resourceTitle: string) => {
    toast({
      title: "Download Started",
      description: `${resourceTitle} is being downloaded.`,
      variant: "default",
    });
  };

  // Get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "video":
        return <FileVideo className="h-6 w-6 text-blue-500" />;
      case "doc":
        return <FileText className="h-6 w-6 text-blue-600" />;
      case "ppt":
        return <FileImage className="h-6 w-6 text-orange-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  // Format date to relative time (today, yesterday, or date)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <StudentSidebar>
      <div className="container py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariant}
          className="space-y-6"
        >
          {/* Header with Title and Upload Button */}
          <motion.div variants={itemVariant} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Resources</h1>
              <p className="text-muted-foreground">Access study materials and resources</p>
            </div>
            <Button onClick={() => handleUpload()} disabled={isUploading} className="gap-2">
              {isUploading ? (
                <>Uploading... <Upload className="h-4 w-4 animate-pulse" /></>
              ) : (
                <>Upload Resource <FileUp className="h-4 w-4" /></>
              )}
            </Button>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariant} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search resources..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select onValueChange={setSubjectFilter} defaultValue={subjectFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setTypeFilter} defaultValue={typeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Recently Added Section */}
          {sortedRecentResources.length > 0 && (
            <motion.div variants={itemVariant}>
              <h2 className="text-xl font-semibold mb-4">Recently Added</h2>
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 min-w-full">
                  {sortedRecentResources.map(resource => (
                    <Card key={resource.id} className="min-w-[280px] max-w-xs hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant={resource.type === "pdf" ? "destructive" : 
                                        resource.type === "video" ? "default" : 
                                        resource.type === "doc" ? "secondary" : "outline"}>
                            {resource.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="font-normal">
                            <Clock className="h-3 w-3 mr-1" /> New
                          </Badge>
                        </div>
                        <CardTitle className="text-base line-clamp-1">{resource.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-3 w-3 mr-1" /> {resource.teacherName}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" /> {formatDate(resource.uploadDate)}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDownload(resource.id, resource.title)}
                          className="gap-1"
                        >
                          <Download className="h-4 w-4" /> Download
                        </Button>
                        <Button size="sm" variant="ghost" className="px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Resources Tab Interface */}
          <motion.div variants={itemVariant}>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full sm:w-auto overflow-x-auto flex-nowrap sm:justify-start justify-between mb-6">
                {resourceCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {resourceCategories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Filter resources based on selected tab */}
                    {filteredResources
                      .filter(resource => 
                        category.id === "all" || 
                        (category.id === "pinned" && resource.pinned) ||
                        (category.id === "notes" && resource.type === "doc") ||
                        (category.id === "documents" && resource.type === "pdf") ||
                        (category.id === "videos" && resource.type === "video") ||
                        (category.id === "presentations" && resource.type === "ppt")
                      )
                      .map(resource => (
                        <motion.div
                          key={resource.id}
                          variants={itemVariant}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className="h-full"
                        >
                          <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2 flex-row gap-4 items-start">
                              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                                {getResourceIcon(resource.type)}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="mb-1">
                                    {subjects.find(s => s.id === resource.subject)?.name}
                                  </Badge>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" /> View
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDownload(resource.id, resource.title)}>
                                        <Download className="h-4 w-4 mr-2" /> Download
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        {resource.pinned ? (
                                          <><Check className="h-4 w-4 mr-2" /> Pinned</>
                                        ) : (
                                          <><BookOpen className="h-4 w-4 mr-2" /> Pin Resource</>
                                        )}
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <CardTitle className="text-base line-clamp-1">{resource.title}</CardTitle>
                                <CardDescription className="line-clamp-2 mt-1">{resource.description}</CardDescription>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2 pt-0 flex-grow">
                              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                <span className="flex items-center">
                                  <User className="h-3 w-3 mr-1" /> {resource.teacherName}
                                </span>
                                <span>{resource.size}</span>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" /> {formatDate(resource.uploadDate)}
                                </span>
                                <span>{resource.downloadCount} downloads</span>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-2 mt-auto">
                              <div className="flex gap-2 w-full">
                                <Button 
                                  size="sm" 
                                  variant="default" 
                                  className="flex-1"
                                  onClick={() => handleDownload(resource.id, resource.title)}
                                >
                                  <Download className="h-4 w-4 mr-2" /> Download
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="flex-1"
                                >
                                  <Eye className="h-4 w-4 mr-2" /> View
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                  </div>

                  {/* Empty state when no resources match the filters */}
                  {filteredResources.filter(resource => 
                    category.id === "all" || 
                    (category.id === "pinned" && resource.pinned) ||
                    (category.id === "notes" && resource.type === "doc") ||
                    (category.id === "documents" && resource.type === "pdf") ||
                    (category.id === "videos" && resource.type === "video") ||
                    (category.id === "presentations" && resource.type === "ppt")
                  ).length === 0 && (
                    <div className="text-center py-10">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No resources found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search or filters" : "No resources available in this category"}
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </StudentSidebar>
  );
};

export default ResourcesPage;
