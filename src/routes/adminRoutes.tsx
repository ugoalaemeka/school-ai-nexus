
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminLayout } from "@/components/layout/admin-layout";
import AdminDashboard from "@/pages/admin/Dashboard";
import Analytics from "@/pages/admin/Analytics";
import Users from "@/pages/admin/Users";
import TeachersPage from "@/pages/admin/Teachers";
import Students from "@/pages/admin/Students";
import Applications from "@/pages/admin/Applications";
import Classes from "@/pages/admin/Classes";
import Subjects from "@/pages/admin/Subjects";
import Fees from "@/pages/admin/Fees";
import Events from "@/pages/admin/Events";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/analytics",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Analytics />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/students",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Students />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Users />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/teachers",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <TeachersPage />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/applications",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Applications />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/classes",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Classes />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/subjects",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Subjects />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/fees",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Fees />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/events",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Events />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/reports",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Reports />
        </AdminLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Settings />
        </AdminLayout>
      </ProtectedRoute>
    )
  }
];
