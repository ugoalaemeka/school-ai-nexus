
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface ChildOverviewCardProps {
  isLoading?: boolean;
  childName?: string;
  grade?: string;
  avatarSrc?: string;
  attendance?: string;
  recentGrade?: string;
  nextExam?: string;
}

export function ChildOverviewCard({ 
  isLoading, 
  childName = "Sarah Johnson", 
  grade = "Grade 6-A", 
  avatarSrc = "", 
  attendance = "95%", 
  recentGrade = "A", 
  nextExam = "Math - April 15"
}: ChildOverviewCardProps) {
  if (isLoading) {
    return (
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[140px]" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-6 w-[70px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Student Information</CardTitle>
        <User className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            {avatarSrc ? (
              <img src={avatarSrc} alt={childName} className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div>
            <div className="font-bold">{childName}</div>
            <div className="text-sm text-muted-foreground">{grade}</div>
            <div className="mt-1">
              <Badge className="bg-secondary hover:bg-secondary/90">ID: 2404875</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
