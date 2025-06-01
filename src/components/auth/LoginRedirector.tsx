
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const LoginRedirector = () => {
  const { user, profile, loading, hasPaidFees } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && profile) {
      // Admin role is no longer supported - redirect to home
      if (profile.role === 'admin') {
        toast.error("Admin role is no longer supported in this application.");
        navigate("/", { replace: true });
        return;
      }
      
      // User is logged in, redirect to role-specific dashboard
      const roleDashboard = `/${profile.role}/dashboard`;
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
