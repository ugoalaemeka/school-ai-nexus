
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AuthHandlerProps {
  children: React.ReactNode;
}

export const AuthHandler = ({ children }: AuthHandlerProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // This handles the redirect from the password recovery email.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "PASSWORD_RECOVERY") {
          // The user is now in a special session to update their password.
          // Let's redirect them to the update password page.
          navigate("/update-password");
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return <>{children}</>;
};
