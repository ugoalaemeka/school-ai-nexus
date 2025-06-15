
import { BarChart3, Calendar, Globe, MessageSquare, Users, Award } from "lucide-react";
import { FeatureCard } from "../FeatureCard";

export const FeaturesSection = () => {
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
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Eko Scholars Academy?</h2>
          <p className="text-muted-foreground text-lg">
            We provide a world-class education powered by innovative technology to nurture the leaders of tomorrow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
