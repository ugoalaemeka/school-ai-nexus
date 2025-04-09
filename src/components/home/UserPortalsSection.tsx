
import { BookOpen, GraduationCap, Users } from "lucide-react";
import { UserPortalCard } from "./UserPortalCard";

export const UserPortalsSection = () => {
  const portalData = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Admin Portal",
      description: "Comprehensive school management tools",
      features: [
        "User Management",
        "Class & Subject Management",
        "Fee Management",
        "Role-Based Access Control",
        "Analytics Dashboard"
      ]
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: "Teacher Portal",
      description: "Tools for effective teaching",
      features: [
        "Attendance Tracking",
        "Assignment & Exam Management",
        "Resource Sharing",
        "Communication Tools",
        "AI Grading Assistant"
      ]
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Student Portal",
      description: "Engage in your educational journey",
      features: [
        "Personalized Dashboard",
        "Homework & Exam Submission",
        "Attendance & Grades Tracking",
        "Real-time Notifications",
        "AI Chatbot Assistant"
      ]
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Parent Portal",
      description: "Stay involved in your child's education",
      features: [
        "Child Performance Monitoring",
        "Fee Payment System",
        "Report Card & Analytics",
        "Direct Messaging",
        "Event Notifications"
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Portals for Everyone</h2>
          <p className="text-muted-foreground">
            Our platform provides tailored experiences for every stakeholder in the educational ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portalData.map((portal, index) => (
            <UserPortalCard 
              key={index}
              icon={portal.icon}
              title={portal.title}
              description={portal.description}
              features={portal.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
