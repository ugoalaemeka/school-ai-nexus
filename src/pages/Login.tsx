
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, School, BookOpenCheck, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { LoginRedirector } from "@/components/auth/LoginRedirector";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  
  const [role, setRole] = useState<"student" | "teacher" | "parent">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
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
      role: 'student',
      icon: <BookOpenCheck className="h-5 w-5 mr-2" />,
      title: 'Student Login',
      description: 'Access your classes, assignments, and grades',
      path: '/student/login',
      color: 'bg-blue-500'
    },
    {
      role: 'teacher',
      icon: <School className="h-5 w-5 mr-2" />,
      title: 'Teacher Login',
      description: 'Manage your classes and student progress',
      path: '/teacher/login',
      color: 'bg-green-500'
    },
    {
      role: 'parent',
      icon: <Users className="h-5 w-5 mr-2" />,
      title: 'Parent Login',
      description: 'Monitor your child\'s academic progress',
      path: '/parent/login',
      color: 'bg-purple-500'
    }
  ];

  // Include redirector for already logged in users
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/50">
      <LoginRedirector />
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl">
          <BookOpen className="h-8 w-8 text-primary" />
          <span>EduSync</span>
        </Link>
      </div>
      
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-2xl font-bold text-center mb-8">Choose Your Login Portal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roleLoginPages.map((item) => (
            <Link to={item.path} key={item.role}>
              <Card className="h-full hover:shadow-md transition-all hover:-translate-y-1">
                <CardHeader className={`${item.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center">
                    {item.icon}
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Login as {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-12">
          <Card>
            <Tabs defaultValue="login">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Quick Access</CardTitle>
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
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
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
                        onValueChange={(value) => setRole(value as "student" | "teacher" | "parent")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
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
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary hover:underline">
          Back to Home
        </Link>
      </p>
    </div>
  );
};

export default Login;
