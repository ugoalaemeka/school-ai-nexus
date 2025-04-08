
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, UploadCloud } from "lucide-react";

interface AIGradingCardProps {
  isLoading?: boolean;
}

export function AIGradingCard({ isLoading = false }: AIGradingCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[220px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          AI Grading Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="upload" className="flex-1">Upload Responses</TabsTrigger>
            <TabsTrigger value="results" className="flex-1">View Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted/20">
              <UploadCloud className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-1">Upload Student Responses</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop files or click to browse
              </p>
              <div className="flex flex-col items-center gap-2">
                <Input type="file" className="max-w-xs" />
                <Button className="w-full max-w-xs">Upload & Analyze</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">Algebra Quiz - April 3</h4>
                    <p className="text-sm text-muted-foreground">32 submissions analyzed</p>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="border rounded-md p-2">
                    <div className="text-lg font-medium">78%</div>
                    <div className="text-xs text-muted-foreground">Avg. Score</div>
                  </div>
                  <div className="border rounded-md p-2">
                    <div className="text-lg font-medium">3</div>
                    <div className="text-xs text-muted-foreground">Potential Plagiarism</div>
                  </div>
                  <div className="border rounded-md p-2">
                    <div className="text-lg font-medium">12</div>
                    <div className="text-xs text-muted-foreground">Need Review</div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="feedback">Send Bulk Feedback</Label>
                <Button>Send Feedback to Students</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
