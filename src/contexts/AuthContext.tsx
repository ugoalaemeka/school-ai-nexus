
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

interface UserProfile {
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPaidFees, setHasPaidFees] = useState(false);
  const [isTeacherActive, setIsTeacherActive] = useState(false);
  const navigate = useNavigate();

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
        } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && currentSession?.user) {
          // Defer profile fetching to avoid supabase deadlock
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession ? 'Logged in' : 'Not logged in');
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        console.log('Profile fetched:', data);
        setProfile(data as UserProfile);
        
        // If student, check payment status
        if (data.role === 'student') {
          checkPaymentStatus(userId);
        } 
        // If teacher, check active status
        else if (data.role === 'teacher') {
          checkTeacherActiveStatus(userId);
        }
      } else {
        console.log('No profile found for user:', userId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const checkPaymentStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('status')
        .eq('student_id', userId)
        .eq('status', 'paid')
        .maybeSingle();

      if (!error && data) {
        setHasPaidFees(true);
      } else {
        setHasPaidFees(false);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setHasPaidFees(false);
    }
  };

  const checkTeacherActiveStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('is_active')
        .eq('user_id', userId)
        .maybeSingle();

      if (!error && data && data.is_active) {
        setIsTeacherActive(true);
      } else {
        setIsTeacherActive(false);
      }
    } catch (error) {
      console.error('Error checking teacher active status:', error);
      setIsTeacherActive(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.user) {
        toast.success('Logged in successfully');
        // Profile fetching is handled by the onAuthStateChange listener
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during login');
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, role: UserRole) => {
    try {
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
          // Create student record
          await createStudentRecord(data.user.id);
        } else if (role === 'teacher') {
          // Create teacher record
          await createTeacherRecord(data.user.id);
        } else if (role === 'parent') {
          // Create parent record
          await createParentRecord(data.user.id);
        }
        
        toast.success('Signed up successfully! Check your email for confirmation.');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during signup');
    }
  };

  const createStudentRecord = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .insert({
          user_id: userId,
          grade: '10', // Default grade, can be updated later
        });

      if (error) {
        console.error('Error creating student record:', error);
      }
    } catch (error) {
      console.error('Error creating student record:', error);
    }
  };

  const createTeacherRecord = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('teachers')
        .insert({
          user_id: userId,
          subject: ['General'], // Default subject, can be updated later
        });

      if (error) {
        console.error('Error creating teacher record:', error);
      }
    } catch (error) {
      console.error('Error creating teacher record:', error);
    }
  };

  const createParentRecord = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('parents')
        .insert({
          user_id: userId,
        });

      if (error) {
        console.error('Error creating parent record:', error);
      }
    } catch (error) {
      console.error('Error creating parent record:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during logout');
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (error) {
        toast.error(error.message);
        return;
      }
      
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
