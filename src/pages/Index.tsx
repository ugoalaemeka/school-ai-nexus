
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users, Calendar, ChevronRight, Award, BarChart3, MessageSquare, Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Multi-Role Portals",
      description: "Dedicated portals for students, teachers, parents, and administrators."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "AI-Powered Analytics",
      description: "Get real-time insights on student performance and attendance."
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Smart Scheduling",
      description: "Automated class scheduling and event management."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Seamless Communication",
      description: "Integrated messaging system between all stakeholders."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Comprehensive Assessment",
      description: "AI-assisted grading and performance tracking."
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Accessible Anywhere",
      description: "Access your school data anytime, anywhere, on any device."
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your School With 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> AI-Powered Technology</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                A comprehensive school management platform with dedicated portals for students, teachers, parents, and administrators.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/login")}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/about")}>
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Students using educational technology" 
                  className="object-cover w-full h-full" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Portals Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Portals for Everyone</h2>
            <p className="text-muted-foreground">
              Our platform provides tailored experiences for every stakeholder in the educational ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="space-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Admin Portal</CardTitle>
                <CardDescription>Comprehensive school management tools</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>User Management</li>
                  <li>Class & Subject Management</li>
                  <li>Fee Management</li>
                  <li>Role-Based Access Control</li>
                  <li>Analytics Dashboard</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                  Access Portal <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="space-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Teacher Portal</CardTitle>
                <CardDescription>Tools for effective teaching</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>Attendance Tracking</li>
                  <li>Assignment & Exam Management</li>
                  <li>Resource Sharing</li>
                  <li>Communication Tools</li>
                  <li>AI Grading Assistant</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                  Access Portal <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="space-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Student Portal</CardTitle>
                <CardDescription>Engage in your educational journey</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>Personalized Dashboard</li>
                  <li>Homework & Exam Submission</li>
                  <li>Attendance & Grades Tracking</li>
                  <li>Real-time Notifications</li>
                  <li>AI Chatbot Assistant</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                  Access Portal <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="space-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Parent Portal</CardTitle>
                <CardDescription>Stay involved in your child's education</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>Child Performance Monitoring</li>
                  <li>Fee Payment System</li>
                  <li>Report Card & Analytics</li>
                  <li>Direct Messaging</li>
                  <li>Event Notifications</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                  Access Portal <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground">
              Explore the innovative tools that make EduNexus the ultimate school management solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your School?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Join thousands of schools worldwide that are already using EduNexus to revolutionize their educational experience.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/login")}>
            Get Started Today
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
