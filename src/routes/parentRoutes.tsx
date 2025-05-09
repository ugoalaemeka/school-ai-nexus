
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ParentLayout } from "@/components/layout/parent-layout";
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
        <ParentLayout>
          <ParentDashboard />
        </ParentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/performance",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentLayout>
          <ParentPerformance />
        </ParentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/payments",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentLayout>
          <ParentPayments />
        </ParentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/reports",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentLayout>
          <ParentReports />
        </ParentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/messages",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentLayout>
          <ParentMessages />
        </ParentLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/parent/settings",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentLayout>
          <ParentSettings />
        </ParentLayout>
      </ProtectedRoute>
    )
  }
];
