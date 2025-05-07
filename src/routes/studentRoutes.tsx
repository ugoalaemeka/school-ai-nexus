
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
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
        <StudentDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/student/timetable",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentTimetable />
      </ProtectedRoute>
    )
  },
  {
    path: "/student/assignments",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentAssignments />
      </ProtectedRoute>
    )
  },
  {
    path: "/student/resources",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentResources />
      </ProtectedRoute>
    )
  },
  {
    path: "/student/messages",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentMessages />
      </ProtectedRoute>
    )
  },
  {
    path: "/student/settings",
    element: (
      <ProtectedRoute allowedRoles={["student"]} requiresPaidFees>
        <StudentSettings />
      </ProtectedRoute>
    )
  }
];
