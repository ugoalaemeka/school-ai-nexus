
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'teacher' | 'student' | 'parent')[];
  requiresPaidFees?: boolean;
  requiresActiveStatus?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  requiresPaidFees = false,
  requiresActiveStatus = false
}: ProtectedRouteProps) => {
  const { user, profile, loading, hasPaidFees, isTeacherActive } = useAuth();
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
    // Save the location they were trying to access
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
    console.log('Student has not paid fees, redirecting to unpaid fees page');
    return <Navigate to="/unpaid-fees" replace />;
  }

  // If teacher and requires active status check
  if (requiresActiveStatus && profile?.role === 'teacher' && !isTeacherActive) {
    console.log('Teacher account is not active, redirecting to inactive account page');
    return <Navigate to="/inactive-account" replace />;
  }

  return <>{children}</>;
};
