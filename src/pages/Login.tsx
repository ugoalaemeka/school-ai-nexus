
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, UserIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user, profile } = useAuth();
  
  const [role, setRole] = useState<"admin" | "student" | "teacher" | "parent">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  // For student login with unique_id
  const [uniqueId, setUniqueId] = useState("");
  const [surname, setSurname] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(false);
  
  // Redirect logged in users to their dashboard
  useEffect(() => {
    if (user && profile) {
      const from = location.state?.from?.pathname || `/${profile.role}/dashboard`;
      navigate(from);
    }
  }, [user, profile, navigate, location]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isStudentLogin) {
      // Handle student login with unique_id
      try {
        // First, find the student's email using their unique_id
        const { data, error } = await supabase
          .from('students')
          .select('user_id, address') // address column stores the unique_id
          .eq('address', uniqueId) // using address temporarily for unique_id until schema updated
          .maybeSingle();
        
        if (error || !data) {
          toast.error("Student ID not found");
          return;
        }
        
        // Now we need to verify the surname matches
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('id, last_name')
          .eq('id', data.user_id)
          .maybeSingle();
        
        if (userError || !userData) {
          toast.error("Student profile not found");
          return;
        }
        
        // Check if surname matches
        if (userData.last_name?.toLowerCase() !== surname.toLowerCase()) {
          toast.error("Invalid surname");
          return;
        }
        
        // Get the email for this user to login
        const { data: authData, error: authError } = await supabase
          .auth.admin.getUserById(data.user_id);
        
        if (authError || !authData?.user?.email) {
          toast.error("Could not retrieve student email");
          return;
        }
        
        // Login with the retrieved email and surname as password
        await signIn(authData.user.email, surname);
      } catch (error: any) {
        toast.error(error.message || "An error occurred during student login");
      }
    } else {
      // Regular email/password login
      await signIn(email, password);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, firstName, lastName, role);
  };

  const toggleLoginMethod = () => {
    setIsStudentLogin(!isStudentLogin);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/50">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8 text-center">
        <a href="/" className="inline-flex items-center gap-2 font-bold text-2xl">
          <BookOpen className="h-8 w-8 text-primary" />
          <span>EduNexus</span>
        </a>
      </div>
      
      <Card className="w-full max-w-md">
        <Tabs defaultValue="login">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Welcome Back</CardTitle>
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <TabsContent value="login">
              {isStudentLogin ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="unique-id">Student ID</Label>
                    <Input 
                      id="unique-id" 
                      placeholder="Enter your student ID" 
                      value={uniqueId}
                      onChange={(e) => setUniqueId(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Surname</Label>
                    <Input 
                      id="surname" 
                      type="password"
                      placeholder="Enter your surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required 
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="link" 
                    onClick={toggleLoginMethod} 
                    className="p-0 h-auto text-xs"
                  >
                    Switch to email login
                  </Button>
                  <Button type="submit" className="w-full">
                    Login as Student
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      placeholder="youremail@example.com" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
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
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={toggleLoginMethod} 
                      className="flex items-center gap-1 text-xs"
                    >
                      <UserIcon className="h-3 w-3" />
                      Student Login
                    </Button>
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              )}
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-firstName">First Name</Label>
                  <Input 
                    id="reg-firstName" 
                    placeholder="John" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-lastName">Last Name</Label>
                  <Input 
                    id="reg-lastName" 
                    placeholder="Doe" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input 
                    id="reg-email" 
                    placeholder="youremail@example.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input 
                    id="reg-password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-role">Register As</Label>
                  <Select 
                    value={role} 
                    onValueChange={(value) => setRole(value as "student" | "teacher" | "parent" | "admin")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" type="button">
                Google
              </Button>
              <Button variant="outline" type="button">
                Microsoft
              </Button>
            </div>
          </CardFooter>
        </Tabs>
      </Card>
      
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary hover:underline">
          Back to Home
        </a>
      </p>
    </div>
  );
};

export default Login;
