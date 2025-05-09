
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { TeacherLayout } from "@/components/layout/teacher-layout";
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
        <TeacherLayout>
          <TeacherDashboard />
        </TeacherLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/attendance",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherLayout>
          <Attendance />
        </TeacherLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/assignments",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherLayout>
          <TeacherAssignments />
        </TeacherLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/exams",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherLayout>
          <TeacherExams />
        </TeacherLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/resources",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherLayout>
          <TeacherResources />
        </TeacherLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/messages",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherLayout>
          <TeacherMessages />
        </TeacherLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/teacher/settings",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]} requiresActiveStatus>
        <TeacherLayout>
          <TeacherSettings />
        </TeacherLayout>
      </ProtectedRoute>
    )
  }
];
