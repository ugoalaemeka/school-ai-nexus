
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useRoleLogin } from "./useRoleLogin";
import { LoginForm } from "./LoginForm";

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
  const { user, profile, loading: authLoading } = useAuth();
  
  const {
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
  } = useRoleLogin(role);

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
            <LoginForm
              role={role}
              useAlternateLogin={useAlternateLogin}
              alternateLoginLabel={alternateLoginLabel}
              isAlternateLogin={isAlternateLogin}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              uniqueId={uniqueId}
              setUniqueId={setUniqueId}
              loading={loading}
              error={error}
              handleLogin={handleLogin}
              toggleLoginMethod={toggleLoginMethod}
            />
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
