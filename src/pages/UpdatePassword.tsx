
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";

const UpdatePassword = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Supabase redirects with a hash fragment. If the user lands here without a session
    // (e.g. direct navigation, or expired token), we redirect to login.
    // The `onAuthStateChange` in AuthHandler should have set a session if the token was valid.
    if (!session) {
      navigate('/login');
      toast.error("Invalid or expired password reset link.");
    }
  }, [session, navigate]);


  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
    }
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Password updated successfully! You can now log in with your new password.");
      // sign out to clear the recovery session and force a new login
      await supabase.auth.signOut();
      navigate("/login");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12 relative">
        <div className="absolute top-4 right-4 lg:hidden">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
           <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span>Eko Scholars Academy</span>
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Update Your Password</CardTitle>
              <CardDescription>
                Enter and confirm your new password below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
       <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070"
          alt="Eko Scholars Academy Students"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">A Fresh Start</h2>
            <p className="text-lg max-w-prose text-primary-foreground/80">
              Create a new, secure password to protect your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
