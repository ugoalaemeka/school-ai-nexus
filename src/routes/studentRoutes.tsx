
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { StudentLayout } from "@/components/layout/student-layout";
import StudentDashboard from "@/pages/student/Dashboard";
import StudentTimetable from "@/pages/student/Timetable";
import StudentAssignments from "@/pages/student/Assignments";
import StudentResources from "@/pages/student/Resources";
import StudentMessages from "@/pages/student/Messages";
import StudentSettings from "@/pages/student/Settings";

export const studentRoutes: RouteObject[] = [
  {
    path: "/student/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentLayout>
          <StudentDashboard />
        </StudentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/student/timetable",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentLayout>
          <StudentTimetable />
        </StudentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/student/assignments",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentLayout>
          <StudentAssignments />
        </StudentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/student/resources",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentLayout>
          <StudentResources />
        </StudentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/student/messages",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentLayout>
          <StudentMessages />
        </StudentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/student/settings",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentLayout>
          <StudentSettings />
        </StudentLayout>
      </ProtectedRoute>
    )
  }
];
