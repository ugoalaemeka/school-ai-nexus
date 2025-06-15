
import { supabase } from '@/integrations/supabase/client';
import type { UserProfile } from '@/contexts/AuthContext';

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data ? (data as UserProfile) : null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const checkPaymentStatus = async (studentId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('status')
      .eq('student_id', studentId)
      .eq('status', 'paid')
      .maybeSingle();

    return !error && !!data;
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
};

export const checkTeacherActiveStatus = async (teacherUserId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select('is_active')
      .eq('user_id', teacherUserId)
      .maybeSingle();

    return !error && !!data && data.is_active;
  } catch (error) {
    console.error('Error checking teacher active status:', error);
    return false;
  }
};

export const createStudentRecord = async (userId: string) => {
  const { error } = await supabase.from('students').insert({
    user_id: userId,
    grade: '10', // Default grade, can be updated later
  });

  if (error) {
    console.error('Error creating student record:', error);
    throw error;
  }
};

export const createTeacherRecord = async (userId: string) => {
  const { error } = await supabase.from('teachers').insert({
    user_id: userId,
    subject: ['General'], // Default subject, can be updated later
  });

  if (error) {
    console.error('Error creating teacher record:', error);
    throw error;
  }
};

export const createParentRecord = async (userId: string) => {
  const { error } = await supabase.from('parents').insert({
    user_id: userId,
  });

  if (error) {
    console.error('Error creating parent record:', error);
    throw error;
  }
};

export const updateUserProfileInDb = async (userId: string, data: Partial<UserProfile>) => {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId);

  if (error) {
    throw error;
  }
};
