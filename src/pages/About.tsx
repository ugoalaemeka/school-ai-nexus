
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Users, Award, GraduationCap, Flag, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Users className="h-8 w-8 text-primary" />, value: "1200+", label: "Students" },
    { icon: <GraduationCap className="h-8 w-8 text-primary" />, value: "85+", label: "Expert Teachers" },
    { icon: <BookOpen className="h-8 w-8 text-primary" />, value: "50+", label: "Courses" },
    { icon: <Award className="h-8 w-8 text-primary" />, value: "97%", label: "Success Rate" },
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal",
      image: "/placeholder.svg",
      bio: "Ph.D. in Education with over 20 years of experience in school administration and education policy."
    },
    {
      name: "Prof. Michael Chang",
      role: "Vice Principal",
      image: "/placeholder.svg",
      bio: "Former Department Chair with expertise in curriculum development and student engagement strategies."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Technology",
      image: "/placeholder.svg",
      bio: "Computer Science Ph.D. leading the integration of AI and technology in educational practices."
    },
    {
      name: "James Wilson",
      role: "Head of Student Affairs",
      image: "/placeholder.svg",
      bio: "Dedicated educator focused on creating a supportive environment for student growth and development."
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EduNexus</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover our commitment to educational excellence through innovative technology and personalized learning experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
                <Flag className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide a comprehensive educational platform that harnesses the power of AI and technology to revolutionize how schools operate and how students learn. We aim to create an engaging, efficient, and personalized educational experience for all stakeholders.
              </p>
              <p className="text-muted-foreground">
                By streamlining administrative processes, enhancing communication, and delivering data-driven insights, we empower schools to focus on what matters most: fostering student growth and academic excellence.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground">
                To be the global leader in educational technology, creating intelligent systems that adapt to individual learning needs and administrative requirements. We envision a future where AI-enhanced education bridges gaps, breaks barriers, and unlocks the full potential of every student.
              </p>
              <p className="text-muted-foreground">
                Our vision extends beyond software to building a worldwide community of forward-thinking educational institutions collectively raising the standard of education through technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground">
              Since our founding, we've been dedicated to transforming education through innovation.
            </p>
          </div>
          
          <div className="relative border-l border-primary/30 pl-8 ml-4 space-y-12 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -left-12 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">2020 - Foundation</h3>
              <p className="text-muted-foreground mt-2">
                EduNexus was founded with a vision to transform traditional education systems through technology and AI integration. Our initial focus was on developing a user-friendly platform for school administration.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-12 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">2021 - First Platform Release</h3>
              <p className="text-muted-foreground mt-2">
                We launched our first comprehensive school management system, providing tools for attendance tracking, grade management, and basic communication features. Twenty schools joined as early adopters.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-12 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">2023 - AI Integration</h3>
              <p className="text-muted-foreground mt-2">
                A major milestone as we incorporated AI capabilities into our platform, enabling predictive analytics, personalized learning pathways, and automated administrative tasks. Our user base expanded to over 200 schools globally.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-12 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold">2025 - Present</h3>
              <p className="text-muted-foreground mt-2">
                Today, EduNexus serves educational institutions worldwide with our comprehensive platform. We continue to innovate, with recent developments in real-time analytics, enhanced communication tools, and expanded AI capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-muted-foreground">
              Meet the dedicated professionals guiding our mission to transform education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarFallback className="text-4xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
