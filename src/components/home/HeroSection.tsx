
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};
