
import { TeacherLayout } from "@/components/layout/teacher-layout";
import { ClassSnapshotCard } from "@/components/teacher/class-snapshot-card";
import { AttendanceTrackerCard } from "@/components/teacher/attendance-tracker-card";
import { AssignmentCard } from "@/components/teacher/assignment-card";
import { AIGradingCard } from "@/components/teacher/ai-grading-card";
import { ResourceSharingCard } from "@/components/teacher/resource-sharing-card";
import { RecentMessagesCard } from "@/components/teacher/recent-messages-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus, Share, UserCheck } from "lucide-react";

const TeacherDashboard = () => {
  return (
    <TeacherLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1: Class Overview + Quick Actions */}
          <div className="space-y-6">
            <ClassSnapshotCard />
            
            {/* Quick Actions Card */}
            <Card className="transition-all hover:shadow-md">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button className="w-full justify-start" size="lg">
                    <UserCheck className="mr-2 h-5 w-5" />
                    Mark Attendance
                  </Button>
                  <Button className="w-full justify-start" size="lg">
                    <FileText className="mr-2 h-5 w-5" />
                    Upload Assignment
                  </Button>
                  <Button className="w-full justify-start" size="lg">
                    <Share className="mr-2 h-5 w-5" />
                    Share Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Only visible on larger screens */}
            <div className="hidden lg:block">
              <ResourceSharingCard />
            </div>
          </div>
          
          {/* Column 2: Attendance, Assignments, and AI Tools */}
          <div className="space-y-6">
            <AttendanceTrackerCard />
            <AIGradingCard />
            
            {/* Only visible on tablet view (moves from col 3 on mobile) */}
            <div className="md:hidden lg:hidden">
              <RecentMessagesCard />
            </div>
          </div>
          
          {/* Column 3: Recent Messages & Assignments */}
          <div className="space-y-6">
            {/* Hide on tablet and show on full layout */}
            <div className="hidden lg:block">
              <AssignmentCard />
            </div>
            
            <RecentMessagesCard />
            
            {/* Resource sharing card moves here on tablet */}
            <div className="hidden md:block lg:hidden">
              <ResourceSharingCard />
            </div>
          </div>
        </div>
        
        {/* Tablet view - Assignments card in full width row */}
        <div className="hidden md:block lg:hidden mt-6">
          <AssignmentCard />
        </div>
        
        {/* Mobile view - Additional cards that were hidden/rearranged */}
        <div className="block md:hidden mt-6 space-y-6">
          <AssignmentCard />
          <ResourceSharingCard />
        </div>
        
        {/* Floating Action Button - Mobile Only */}
        <div className="md:hidden fixed bottom-4 right-4 z-10">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
