
import { TeacherLayout } from "@/components/layout/teacher-layout";
import { ClassSnapshotCard } from "@/components/teacher/class-snapshot-card";
import { AttendanceTrackerCard } from "@/components/teacher/attendance-tracker-card";
import { AssignmentCard } from "@/components/teacher/assignment-card";
import { AIGradingCard } from "@/components/teacher/ai-grading-card";
import { ResourceSharingCard } from "@/components/teacher/resource-sharing-card";
import { RecentMessagesCard } from "@/components/teacher/recent-messages-card";

const TeacherDashboard = () => {
  return (
    <TeacherLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1: Class Overview + Quick Links */}
          <div className="space-y-6">
            <ClassSnapshotCard />
            <ResourceSharingCard />
          </div>
          
          {/* Column 2: Attendance, Assignments, and AI Tools */}
          <div className="space-y-6">
            <AttendanceTrackerCard />
            <AIGradingCard />
          </div>
          
          {/* Column 3: Recent Messages & Assignments */}
          <div className="space-y-6">
            <AssignmentCard />
            <RecentMessagesCard />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
