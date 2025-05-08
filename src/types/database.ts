
// Add this interface if it doesn't exist
export interface SupabaseJsonResponse {
  success: boolean;
  message?: string;
  application_id?: string;
  id?: string;
  email?: string;
  student_email?: string;
  parent_email?: string;
  student_token?: string;
  parent_token?: string;
}

// Add these interfaces needed by our applications
export interface Application {
  id: string;
  full_name: string;
  email: string;
  parent_email: string;
  class_requested: string;
  status: string;
  fees_paid: boolean;
  created_at: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  employment_status: string;
  class_assigned?: string;
  class_name?: string;
  created_at: string;
}

// Add user role types
export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

// Add user profile interface
export interface UserProfile {
  id: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  created_at?: string;
  updated_at?: string;
}

// Add student interface
export interface Student {
  id: string;
  user_id: string;
  grade: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  date_of_birth?: string | null;
  address?: string | null;
  phone?: string | null;
  emergency_contact?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Add parent interface
export interface Parent {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  alternate_email?: string | null;
  phone?: string | null;
  address?: string | null;
  occupation?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Add class interface
export interface Class {
  id: string;
  name: string;
  grade: string;
  description?: string | null;
  academic_year: string;
  created_at?: string;
  updated_at?: string;
}
