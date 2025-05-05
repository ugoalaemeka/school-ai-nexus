
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'teacher' | 'student' | 'parent')[];
  requiresPaidFees?: boolean;
}

export const ProtectedRoute = ({ children, allowedRoles, requiresPaidFees = false }: ProtectedRouteProps) => {
  const { user, profile, loading, hasPaidFees } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check if allowedRoles is provided
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    console.log('User role:', profile.role, 'not in allowed roles:', allowedRoles);
    // Redirect to appropriate dashboard based on user's role
    return <Navigate to={`/${profile.role}/dashboard`} replace />;
  }

  // If student and requires paid fees check
  if (requiresPaidFees && profile?.role === 'student' && !hasPaidFees) {
    return <Navigate to="/unpaid-fees" replace />;
  }

  return <>{children}</>;
};
