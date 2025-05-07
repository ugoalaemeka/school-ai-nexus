
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import TeacherDashboard from "@/pages/teacher/Dashboard";
import Attendance from "@/pages/teacher/Attendance";
import TeacherAssignments from "@/pages/teacher/Assignments";
import TeacherExams from "@/pages/teacher/Exams";
import TeacherResources from "@/pages/teacher/Resources";
import TeacherMessages from "@/pages/teacher/Messages";
import TeacherSettings from "@/pages/teacher/Settings";

export const teacherRoutes: RouteObject[] = [
  {
    path: "/teacher/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/attendance",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <Attendance />
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/assignments",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherAssignments />
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/exams",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherExams />
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/resources",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherResources />
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/messages",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherMessages />
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/settings",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherSettings />
      </ProtectedRoute>
    )
  }
];
