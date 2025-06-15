
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, UserIcon, School, BookOpenCheck, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, profile, loading } = useAuth();
  
  const [role, setRole] = useState<"admin" | "student" | "teacher" | "parent">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  // Only redirect if user is authenticated AND we have their profile
  if (!loading && user && profile) {
    let roleDashboard = '/';
    
    switch (profile.role) {
      case 'student':
        roleDashboard = '/student/dashboard';
        break;
      case 'teacher':
        roleDashboard = '/teacher/dashboard';
        break;
      case 'parent':
        roleDashboard = '/parent/dashboard';
        break;
      case 'admin':
        roleDashboard = '/admin/dashboard';
        break;
      default:
        roleDashboard = '/';
        break;
    }
    
    navigate(roleDashboard, { replace: true });
    return null;
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, firstName, lastName, role);
  };

  const roleLoginPages = [
    {
      role: 'admin',
      icon: <UserIcon className="h-5 w-5" />,
      title: 'Admin Login',
      description: 'School administration and management',
      path: '/admin/login',
      color: 'bg-amber-500'
    },
    {
      role: 'student',
      icon: <BookOpenCheck className="h-5 w-5" />,
      title: 'Student Login',
      description: 'Access your classes, assignments, and grades',
      path: '/student/login',
      color: 'bg-blue-500'
    },
    {
      role: 'teacher',
      icon: <School className="h-5 w-5" />,
      title: 'Teacher Login',
      description: 'Manage your classes and student progress',
      path: '/teacher/login',
      color: 'bg-green-500'
    },
    {
      role: 'parent',
      icon: <Users className="h-5 w-5" />,
      title: 'Parent Login',
      description: 'Monitor your child\'s academic progress',
      path: '/parent/login',
      color: 'bg-purple-500'
    }
  ];

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-md mx-auto">
          <div className="absolute top-4 right-4 lg:hidden">
            <ThemeToggle />
          </div>
          
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span>Eko Scholars Academy</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Portal Access</h1>
            <p className="text-muted-foreground">Select your portal, or log in/register below.</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Login to your Account</CardTitle>
                  <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
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
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4">
                  <Button variant="link" size="sm" asChild className="p-0 h-auto -mt-2 mb-2">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </Button>
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
              </Card>
            </TabsContent>
            <TabsContent value="register" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>Join our community. Fill in the details to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
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
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Registering...' : 'Register'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="mb-4">Or, choose a specific portal login:</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {roleLoginPages.map((item) => (
                <Link to={item.path} key={item.role}>
                  <Button variant="outline" className="w-full h-full flex flex-col items-center justify-center gap-2 py-3 px-1 text-xs sm:text-sm">
                    {item.icon}
                    <span>{item.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
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
            <h2 className="text-4xl font-bold">Welcome to Eko Scholars Academy</h2>
            <p className="text-lg max-w-prose text-primary-foreground/80">
              The premier institution for nurturing the next generation of leaders. Access your portal to begin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
