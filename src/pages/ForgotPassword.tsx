
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
       redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent! Please check your email.");
      setMessage("If an account with this email exists, a password reset link has been sent.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12 relative">
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/login">
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </div>
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
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {message ? (
                <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-3 rounded-md text-sm">
                  {message}
                </div>
              ) : (
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="youremail@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              )}
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
            <h2 className="text-4xl font-bold">Secure Your Account</h2>
            <p className="text-lg max-w-prose text-primary-foreground/80">
              Regain access to your portal quickly and securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
