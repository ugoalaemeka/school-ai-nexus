
// Type definitions for Supabase JSON responses
export interface SupabaseJsonResponse {
  success: boolean;
  message?: string;
  token?: string;
  email?: string;
  name?: string;
  class_name?: string;
  class_id?: string;
  expires_at?: string;
  user_id?: string;
  teacher_id?: string;
  student_id?: string;
  parent_id?: string;
  student_token?: string;
  student_email?: string;
  parent_token?: string;
  parent_email?: string;
  application_id?: string;
  status?: string;
  error?: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  employment_status: string;
  class_assigned: string | null;
  class_name: string | null;
  created_at: string;
}

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

export interface Student {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  grade: string;
  class_name: string;
  parent_id: string;
}

export interface Parent {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  children: Student[];
}
