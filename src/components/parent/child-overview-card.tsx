
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface ChildOverviewCardProps {
  isLoading?: boolean;
  name?: string;
  grade?: string;
  avatarSrc?: string;
  attendance?: string;
  recentGrade?: string;
  nextExam?: string;
}

export function ChildOverviewCard({ 
  isLoading, 
  name = "Sarah Johnson", 
  grade = "Grade 6-A", 
  avatarSrc = "", 
  attendance = "95%", 
  recentGrade = "A", 
  nextExam = "Math - April 15"
}: ChildOverviewCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Student Information</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              {avatarSrc ? (
                <img src={avatarSrc} alt={name} className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <div className="font-bold">{name}</div>
              <div className="text-sm text-muted-foreground">{grade}</div>
              <div className="mt-1">
                <Badge className="bg-secondary hover:bg-secondary/90">ID: 2404875</Badge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
            <div className="flex items-center p-2 bg-muted/40 rounded-lg">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Attendance</div>
                <div>{attendance}</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-muted/40 rounded-lg">
              <BookOpen className="h-4 w-4 mr-2 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Recent Grade</div>
                <div>{recentGrade}</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-muted/40 rounded-lg">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Next Exam</div>
                <div>{nextExam}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
