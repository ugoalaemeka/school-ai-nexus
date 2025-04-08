
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, Users } from "lucide-react";

interface ClassSnapshotCardProps {
  isLoading?: boolean;
}

export function ClassSnapshotCard({ isLoading = false }: ClassSnapshotCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[140px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 w-[160px]" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Class Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4 text-primary" />
              <span className="font-medium">Mathematics - Grade 10A</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>32 Students Enrolled</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Syllabus Progress</span>
              <span className="font-medium">70%</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
