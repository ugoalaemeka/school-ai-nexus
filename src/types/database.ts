
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
