
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

interface RoleLoginProps {
  role: 'admin' | 'teacher' | 'student' | 'parent';
  title: string;
  description: string;
  useAlternateLogin?: boolean;
  alternateLoginLabel?: string;
}

export function RoleLogin({ 
  role, 
  title, 
  description, 
  useAlternateLogin = false,
  alternateLoginLabel = 'Student ID'
}: RoleLoginProps) {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlternateLogin, setIsAlternateLogin] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [surname, setSurname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isAlternateLogin) {
        // Handle alternate login methods for students/parents
        // This is not implemented for admin role
        if (role === 'admin') {
          setError('Admin login requires email and password');
          setLoading(false);
          return;
        }
        
        // For now, just use regular email/password login
        toast.error('Alternate login method not yet implemented');
        setLoading(false);
        return;
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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/50">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl">
          <BookOpen className="h-8 w-8 text-primary" />
          <span>EduSync</span>
        </Link>
      </div>
      
      <Card className="w-full max-w-md">
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
            {isAlternateLogin && role !== 'admin' ? (
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
                  <Label htmlFor="surname">
                    {role === 'student' ? 'Surname' : 'Password'}
                  </Label>
                  <Input 
                    id="surname" 
                    type="password"
                    placeholder={role === 'student' ? "Enter your surname" : "Enter your password"}
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
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
                    Switch to email login
                  </Button>
                )}
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
        
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/forgot-password">Forgot password?</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Back to main login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
