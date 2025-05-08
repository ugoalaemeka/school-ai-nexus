
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const LoginRedirector = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && profile) {
      // User is logged in, redirect to role-specific dashboard
      navigate(`/${profile.role}/dashboard`, { replace: true });
    }
  }, [user, profile, loading, navigate]);

  return null;
};
