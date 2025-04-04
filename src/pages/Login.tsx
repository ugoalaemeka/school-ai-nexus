
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, redirect to corresponding dashboard based on role
    navigate(`/${role}/dashboard`);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, show success message in a real app
    navigate("/login");
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
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="youremail@example.com" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Login As</Label>
                  <Select defaultValue={role} onValueChange={setRole}>
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
                <div className="text-right">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input id="reg-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" placeholder="youremail@example.com" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input id="reg-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-role">Register As</Label>
                  <Select defaultValue="student">
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
      
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary hover:underline">
          Back to Home
        </a>
      </p>
    </div>
  );
};

export default Login;
