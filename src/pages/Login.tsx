
import { Link, useNavigate } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  UserIcon, 
  School, 
  BookOpenCheck, 
  Users,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  
  if (!loading && user && profile) {
    navigate(`/${profile.role}/dashboard`, { replace: true });
    return null;
  }
  
  const portalLinks = [
    {
      role: 'student',
      icon: <BookOpenCheck className="h-8 w-8 text-blue-500" />,
      title: 'Student Portal',
      description: 'Access your classes, assignments, and grades.',
      path: '/student/login',
    },
    {
      role: 'parent',
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: 'Parent Portal',
      description: "Monitor your child's academic progress.",
      path: '/parent/login',
    },
    {
      role: 'teacher',
      icon: <School className="h-8 w-8 text-green-500" />,
      title: 'Teacher Portal',
      description: 'Manage your classes and student progress.',
      path: '/teacher/login',
    },
    {
      role: 'admin',
      icon: <UserIcon className="h-8 w-8 text-amber-500" />,
      title: 'Admin Portal',
      description: 'School administration and management.',
      path: '/admin/login',
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthLayout
      imageSrc="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070"
      imageAlt="Eko Scholars Academy Students"
      welcomeTitle="Welcome to Eko Scholars Academy"
      quote="The premier institution for nurturing the next generation of leaders. Access your portal to begin."
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-3xl mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span>Eko Scholars Academy</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-primary">Portal Gateway</h1>
            <p className="text-muted-foreground">Please select your portal to continue.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portalLinks.map((portal, index) => (
            <motion.div
              key={portal.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={portal.path} className="h-full block">
                <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300 group p-2">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      {portal.icon}
                      <div>
                        <CardTitle className="text-lg">{portal.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">{portal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <div className="px-6 pb-4">
                    <div className="flex justify-end items-center text-sm font-semibold text-primary">
                      <span>Login</span>
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account? Admissions are now open for new students.
          </p>
          <Link to="/admission" className="font-semibold text-primary hover:underline">
            Apply for Admission &rarr;
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
