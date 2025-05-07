
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import ParentDashboard from "@/pages/parent/Dashboard";
import ParentPerformance from "@/pages/parent/Performance";
import ParentPayments from "@/pages/parent/Payments";
import ParentReports from "@/pages/parent/Reports";
import ParentMessages from "@/pages/parent/Messages";
import ParentSettings from "@/pages/parent/Settings";

export const parentRoutes: RouteObject[] = [
  {
    path: "/parent/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/performance",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentPerformance />
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/payments",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentPayments />
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/reports",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentReports />
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/messages",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentMessages />
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/settings",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentSettings />
      </ProtectedRoute>
    )
  }
];
