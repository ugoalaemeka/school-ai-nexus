
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useRoleLogin(role: 'admin' | 'teacher' | 'student' | 'parent') {
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlternateLogin, setIsAlternateLogin] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isAlternateLogin) {
        if (role === 'student') {
          // For student login, we find their email via their student ID from the 'students' table.
          const { data: student, error: studentError } = await supabase
            .from('students')
            .select('email')
            .eq('student_id', uniqueId.trim())
            .single();

          if (studentError || !student || !student.email) {
            console.error('Error fetching student or student not found:', studentError);
            const message = "Invalid Student ID. Please check and try again.";
            toast.error(message);
            setError(message);
            setLoading(false);
            return;
          }
          
          const studentEmail = student.email;
          console.log(`Attempting student login for Student ID ${uniqueId} (email: ${studentEmail})`);
          await signIn(studentEmail, password);

        } else if (role === 'parent') {
          // For now, parent alternate login uses email. Phone login can be added later.
          console.log(`Attempting parent login with:`, uniqueId);
          await signIn(uniqueId.trim(), password);
        
        } else {
            toast.error('Alternate login method not available for this role.');
            setLoading(false);
            return;
        }

      } else {
        // Regular email/password login
        console.log(`Attempting ${role} login with:`, email);
        await signIn(email.trim(), password);
      }
      
      // Redirect and success toast happen in AuthContext after successful login
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || `An error occurred during ${role} login`;
      // The signIn function from AuthContext already shows a toast on error.
      // We just set the local error state to display it in the form.
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginMethod = () => {
    setIsAlternateLogin(!isAlternateLogin);
    setError(null);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    uniqueId,
    setUniqueId,
    isAlternateLogin,
    loading,
    error,
    handleLogin,
    toggleLoginMethod,
  };
}
