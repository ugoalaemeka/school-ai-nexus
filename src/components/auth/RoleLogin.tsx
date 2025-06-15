import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { supabase } from "@/integrations/supabase/client";

interface RoleLoginProps {
  role: 'admin' | 'teacher' | 'student' | 'parent';
  title: string;
  description: string;
  useAlternateLogin?: boolean;
  alternateLoginLabel?: string;
}

const roleDetails = {
  admin: {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
    welcomeTitle: "Administration Portal",
    quote: "Orchestrating the future of education with precision and care.",
  },
  teacher: {
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=2070",
    welcomeTitle: "Teacher's Portal",
    quote: "Inspiring the minds that will shape tomorrow.",
  },
  student: {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070",
    welcomeTitle: "Student's Portal",
    quote: "Your journey to knowledge and discovery starts here.",
  },
  parent: {
    image: "https://images.unsplash.com/photo-1596495577886-d927f858f0ca?q=80&w=2070",
    welcomeTitle: "Parent's Portal",
    quote: "Partnering with you in your child's educational journey.",
  }
};


export function RoleLogin({ 
  role, 
  title, 
  description, 
  useAlternateLogin = false,
  alternateLoginLabel = 'Student ID'
}: RoleLoginProps) {
  const navigate = useNavigate();
  const { signIn, user, profile, loading: authLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlternateLogin, setIsAlternateLogin] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!authLoading && user && profile) {
    navigate(`/${profile.role}/dashboard`, { replace: true });
    return null;
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isAlternateLogin) {
        if (role === 'student') {
          // For student login, we find their email via their student ID (uniqueId)
          // This requires a 'profiles' table with 'student_id' and a denormalized 'email' column.
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('email')
            .eq('student_id', uniqueId.trim())
            .single();

          if (profileError || !profile || !profile.email) {
            console.error('Error fetching profile or profile not found:', profileError);
            const message = "Invalid Student ID. Please check and try again.";
            toast.error(message);
            setError(message);
            setLoading(false);
            return;
          }
          
          const studentEmail = profile.email;
          console.log(`Attempting student login for Student ID ${uniqueId} (email: ${studentEmail})`);
          await signIn(studentEmail, password);
          toast.success(`Welcome back! Login successful.`);

        } else if (role === 'parent') {
          // For now, parent alternate login uses email. Phone login can be added later.
          console.log(`Attempting parent login with:`, uniqueId);
          await signIn(uniqueId.trim(), password);
          toast.success(`Parent login successful!`);
        
        } else {
            toast.error('Alternate login method not available for this role.');
            setLoading(false);
            return;
        }

      } else {
        // Regular email/password login
        console.log(`Attempting ${role} login with:`, email);
        await signIn(email.trim(), password);
        toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`);
      }
      
      // Redirect happens in AuthContext after successful login
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || `An error occurred during ${role} login`;
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginMethod = () => {
    setIsAlternateLogin(!isAlternateLogin);
    setError(null);
  };

  const currentRoleDetails = roleDetails[role];

  return (
    <AuthLayout
      imageSrc={currentRoleDetails.image}
      imageAlt={`${currentRoleDetails.welcomeTitle} background`}
      welcomeTitle={currentRoleDetails.welcomeTitle}
      quote={currentRoleDetails.quote}
    >
      <div className="absolute top-4 left-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Portal Gateway
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
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              {isAlternateLogin && useAlternateLogin && role !== 'admin' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="unique-id">{alternateLoginLabel}</Label>
                    <Input 
                      id="unique-id" 
                      placeholder={`Enter your ${alternateLoginLabel.toLowerCase()}`}
                      value={uniqueId}
                      onChange={(e) => setUniqueId(e.target.value)}
                      required 
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-alt">Password</Label>
                    <Input 
                      id="password-alt" 
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      disabled={loading}
                    />
                  </div>
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={toggleLoginMethod} 
                      className="p-0 h-auto text-xs"
                      disabled={loading}
                    >
                      Switch to email login
                    </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      placeholder="youremail@example.com" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      disabled={loading}
                    />
                  </div>
                  {useAlternateLogin && role !== 'admin' && (
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={toggleLoginMethod} 
                      className="p-0 h-auto text-xs"
                      disabled={loading}
                    >
                      Login with {alternateLoginLabel}
                    </Button>
                  )}
                </>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex-col gap-4 items-start text-sm">
            <Button variant="link" size="sm" asChild className="p-0 h-auto">
              <Link to="/forgot-password">Forgot password?</Link>
            </Button>
            <Button variant="link" size="sm" asChild className="p-0 h-auto">
              <Link to="/login">Not a {role}? Choose another portal</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
}
