
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { FileText, FileVideo, Link as LinkIcon, Plus, Upload } from "lucide-react";

interface ResourceSharingCardProps {
  isLoading?: boolean;
}

export function ResourceSharingCard({ isLoading = false }: ResourceSharingCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[180px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const resources = [
    { id: 1, title: "Algebra Formulas", type: "pdf", date: "Apr 2, 2025", visibility: "all" },
    { id: 2, title: "Geometry Concepts Video", type: "video", date: "Mar 28, 2025", visibility: "students" },
    { id: 3, title: "Khan Academy - Trigonometry", type: "link", date: "Mar 25, 2025", visibility: "all" },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "video":
        return <FileVideo className="h-4 w-4 text-blue-500" />;
      case "link":
        return <LinkIcon className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getVisibilityBadge = (visibility: string) => {
    switch (visibility) {
      case "all":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">All</Badge>;
      case "students":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Students</Badge>;
      case "teachers":
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">Teachers</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Resource Sharing</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="resources">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
            <TabsTrigger value="upload" className="flex-1">Upload New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  {getResourceIcon(resource.type)}
                  <div>
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground">Added: {resource.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getVisibilityBadge(resource.visibility)}
                  <Button size="sm" variant="ghost">View</Button>
                </div>
              </div>
            ))}
            
            <Button className="w-full mt-2">
              <Plus className="mr-2 h-4 w-4" />
              View All Resources
            </Button>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Resource Title</Label>
                <Input id="title" placeholder="Enter resource title" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Resource Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="file">Upload File</SelectItem>
                    <SelectItem value="link">External Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="file">Upload File</Label>
                <div className="flex items-center gap-2">
                  <Input id="file" type="file" className="flex-1" />
                  <Button type="button" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algebra">Algebra</SelectItem>
                    <SelectItem value="geometry">Geometry</SelectItem>
                    <SelectItem value="trigonometry">Trigonometry</SelectItem>
                    <SelectItem value="statistics">Statistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="visibility" className="flex-1">Visibility</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="teachers">Teachers Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">Upload Resource</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
