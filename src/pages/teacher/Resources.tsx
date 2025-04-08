
import { TeacherLayout } from "@/components/layout/teacher-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  FileText, 
  FilePdf, 
  FileVideo, 
  Link as LinkIcon, 
  Search, 
  Plus, 
  Upload, 
  ExternalLink,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const TeacherResources = () => {
  const resources = [
    { id: 1, title: "Algebra Formulas PDF", type: "pdf", date: "Apr 2, 2025", subject: "Mathematics", class: "Grade 10-A", visibility: "All" },
    { id: 2, title: "Geometry Concepts Video", type: "video", date: "Mar 28, 2025", subject: "Mathematics", class: "Grade 10-B", visibility: "Students" },
    { id: 3, title: "Khan Academy - Trigonometry", type: "link", date: "Mar 25, 2025", subject: "Mathematics", class: "Grade 11", visibility: "All" },
    { id: 4, title: "Statistics Study Guide", type: "pdf", date: "Mar 20, 2025", subject: "Mathematics", class: "Grade 10-A", visibility: "Students" },
    { id: 5, title: "Calculus Lesson Plan", type: "document", date: "Mar 15, 2025", subject: "Mathematics", class: "Grade 11", visibility: "Teachers" },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-4 w-4 text-red-500" />;
      case "video":
        return <FileVideo className="h-4 w-4 text-blue-500" />;
      case "link":
        return <LinkIcon className="h-4 w-4 text-green-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getVisibilityBadge = (visibility: string) => {
    switch (visibility) {
      case "All":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">{visibility}</Badge>;
      case "Students":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">{visibility}</Badge>;
      case "Teachers":
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">{visibility}</Badge>;
      default:
        return <Badge variant="outline">{visibility}</Badge>;
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Resource Management</h1>
            <p className="text-muted-foreground">Share and organize learning resources</p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Resource
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
              >
                All Resources
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="links"
                className="rounded-none border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
              >
                Links
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader className="py-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>All Resources</CardTitle>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search resources" className="pl-8 w-full md:w-[250px]" />
                    </div>
                    
                    <Select defaultValue="all-classes">
                      <SelectTrigger className="w-full md:w-[160px]">
                        <SelectValue placeholder="Filter by class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-classes">All Classes</SelectItem>
                        <SelectItem value="grade10a">Grade 10-A</SelectItem>
                        <SelectItem value="grade10b">Grade 10-B</SelectItem>
                        <SelectItem value="grade11">Grade 11</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            <span className="font-medium">{resource.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.type}</TableCell>
                        <TableCell>{resource.subject}</TableCell>
                        <TableCell>{resource.class}</TableCell>
                        <TableCell>{getVisibilityBadge(resource.visibility)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Add New Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resource-title">Resource Title</Label>
                      <Input id="resource-title" placeholder="Enter resource title" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="resource-type">Resource Type</Label>
                      <Select>
                        <SelectTrigger id="resource-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="link">External Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resource-class">Class</Label>
                      <Select>
                        <SelectTrigger id="resource-class">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grade10a">Grade 10-A</SelectItem>
                          <SelectItem value="grade10b">Grade 10-B</SelectItem>
                          <SelectItem value="grade11">Grade 11</SelectItem>
                          <SelectItem value="all">All Classes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="resource-subject">Subject</Label>
                      <Select>
                        <SelectTrigger id="resource-subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-url">URL or File</Label>
                    <div className="flex flex-col md:flex-row gap-2">
                      <Input id="resource-url" placeholder="Enter URL or upload file" className="flex-1" />
                      <Button type="button">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-description">Description</Label>
                    <Textarea id="resource-description" placeholder="Enter resource description" rows={3} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All (Students & Teachers)</SelectItem>
                            <SelectItem value="students">Students Only</SelectItem>
                            <SelectItem value="teachers">Teachers Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Add Resource</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            {/* Similar content for documents tab */}
            <Card>
              <CardHeader>
                <CardTitle>Document Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.filter(r => r.type === 'pdf' || r.type === 'document').map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            <span className="font-medium">{resource.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.type}</TableCell>
                        <TableCell>{resource.class}</TableCell>
                        <TableCell>{resource.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm">View</Button>
                            <Button size="sm" variant="outline">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-6">
            {/* Similar content for videos tab */}
            <Card>
              <CardHeader>
                <CardTitle>Video Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.filter(r => r.type === 'video').map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            <span className="font-medium">{resource.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{resource.class}</TableCell>
                        <TableCell>{resource.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm">View</Button>
                            <Button size="sm" variant="outline">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="links" className="space-y-6">
            {/* Similar content for links tab */}
            <Card>
              <CardHeader>
                <CardTitle>External Links</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.filter(r => r.type === 'link').map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            <span className="font-medium">{resource.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{resource.class}</TableCell>
                        <TableCell>{resource.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open Link
                            </Button>
                            <Button size="sm" variant="outline">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
};

export default TeacherResources;
