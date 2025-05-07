
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AdminDashboard from "@/pages/admin/Dashboard";
import Users from "@/pages/admin/Users";
import TeachersPage from "@/pages/admin/Teachers";
import Applications from "@/pages/admin/Applications";
import Classes from "@/pages/admin/Classes";
import Fees from "@/pages/admin/Fees";
import Events from "@/pages/admin/Events";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Users />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/teachers",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <TeachersPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/applications",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Applications />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/classes",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Classes />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/fees",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Fees />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/events",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Events />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/reports",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Reports />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Settings />
      </ProtectedRoute>
    )
  }
];
