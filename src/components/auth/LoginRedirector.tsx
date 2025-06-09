
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const LoginRedirector = () => {
  const { user, profile, loading, hasPaidFees } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && profile) {
      // User is logged in, redirect to role-specific dashboard
      let roleDashboard = '/';
      
      switch (profile.role) {
        case 'student':
          roleDashboard = '/student/dashboard';
          break;
        case 'teacher':
          roleDashboard = '/teacher/dashboard';
          break;
        case 'parent':
          roleDashboard = '/parent/dashboard';
          break;
        case 'admin':
          // Redirect admin users to home page since admin panel is removed
          roleDashboard = '/';
          toast.warning("Admin panel is currently unavailable. You've been redirected to the home page.");
          break;
        default:
          roleDashboard = '/';
          break;
      }
      
      console.log(`Redirecting to: ${roleDashboard}`);
      
      // Special conditions for students
      if (profile.role === 'student' && !hasPaidFees) {
        toast.warning("Your fees have not been paid. Some features may be limited.");
        navigate("/unpaid-fees", { replace: true });
        return;
      }
      
      navigate(roleDashboard, { replace: true });
    }
  }, [user, profile, loading, navigate, hasPaidFees]);

  return null;
};
