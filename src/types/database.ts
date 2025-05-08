
// Add this interface if it doesn't exist
export interface SupabaseJsonResponse {
  success: boolean;
  message?: string;
  application_id?: string;
  id?: string;
  email?: string;
  student_email?: string;
  parent_email?: string;
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
