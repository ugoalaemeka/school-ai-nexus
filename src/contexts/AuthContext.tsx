import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import * as UserService from '@/services/user.service';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface UserProfile {
  id: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  hasPaidFees: boolean;
  isTeacherActive: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  cleanupAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Clean up auth state helper
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPaidFees, setHasPaidFees] = useState(false);
  const [isTeacherActive, setIsTeacherActive] = useState(false);

  const fetchFullUserProfile = async (userId: string) => {
    const userProfile = await UserService.fetchUserProfile(userId);
    setProfile(userProfile);

    if (userProfile) {
      if (userProfile.role === 'student') {
        const hasPaid = await UserService.checkPaymentStatus(userId);
        setHasPaidFees(hasPaid);
      } else if (userProfile.role === 'teacher') {
        const isActive = await UserService.checkTeacherActiveStatus(userId);
        setIsTeacherActive(isActive);
      }
    } else {
      setHasPaidFees(false);
      setIsTeacherActive(false);
    }
    return userProfile;
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle events
        if (event === 'SIGNED_OUT') {
          setProfile(null);
          setHasPaidFees(false);
          setIsTeacherActive(false);
        } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') && currentSession?.user) {
          // Defer profile fetching to avoid supabase deadlock
          setTimeout(() => {
            fetchFullUserProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession ? 'Logged in' : 'Not logged in');
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await fetchFullUserProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with:', email);
      
      // Clean up any existing state before signing in
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      });
      
      if (error) {
        console.error('Sign in error:', error);
        toast.error(error.message);
        throw error;
      }

      if (data.user) {
        console.log('Sign in successful, user:', data.user.id);
        const userProfile = await fetchFullUserProfile(data.user.id);
          
        if (userProfile) {
          const redirectPath = `/${userProfile.role}/dashboard`;
          console.log('Redirecting with full page reload to:', redirectPath);
          toast.success(`Welcome back! Redirecting to ${userProfile.role} dashboard.`);
          // Use full page reload to ensure clean state
          window.location.href = redirectPath;
        } else {
          console.error('No profile found after sign in, logging out.');
          await supabase.auth.signOut({ scope: 'global' });
          throw new Error("Your user profile could not be loaded. Please contact an administrator.");
        }
      }
    } catch (error: any) {
      console.error('Sign in failed:', error);
      toast.error(error.message || 'An error occurred during login');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, role: UserRole) => {
    try {
      // Clean up existing auth state first
      cleanupAuthState();
      
      // First, create the auth user with role metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.user) {
        // The trigger will handle creating the profile record
        
        // For role-specific tables, we need to create the corresponding record
        if (role === 'student') {
          await UserService.createStudentRecord(data.user.id);
        } else if (role === 'teacher') {
          await UserService.createTeacherRecord(data.user.id);
        } else if (role === 'parent') {
          await UserService.createParentRecord(data.user.id);
        }
        
        toast.success('Signed up successfully! Check your email for confirmation.');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during signup');
    }
  };

  const signOut = async () => {
    const lastKnownRole = profile?.role; // Capture role before it's cleared by onAuthStateChange

    // Clean up local storage first to prevent limbo states
    cleanupAuthState();
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut({ scope: 'global' });

    if (error) {
      console.error("Sign out error:", error);
      toast.error(error.message || 'An error occurred during logout');
    } else {
      toast.success('Logged out successfully');
    }

    // `onAuthStateChange` would clear state, but we are doing a hard reload.
    // Navigate to the appropriate login page based on the role we captured.
    if (lastKnownRole) {
        const redirectPath = `/${lastKnownRole}/login`;
        console.log('Signing out with full page reload to:', redirectPath);
        window.location.href = redirectPath;
    } else {
        // Fallback to the main login gateway
        console.log('Signing out with full page reload to /login');
        window.location.href = '/login';
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      await UserService.updateUserProfileInDb(user.id, data);
      
      // Update the local state
      if (profile) {
        setProfile({
          ...profile,
          ...data
        });
      }
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while updating profile');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        hasPaidFees,
        isTeacherActive,
        signIn,
        signUp,
        signOut,
        updateProfile,
        cleanupAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
