
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
              Welcome to 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> Eko Scholars Academy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Nurturing minds, building futures. A center of excellence for nursery, primary, and secondary education in Lagos, Nigeria.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate("/admission")}>
                Apply Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/about")}>
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070" 
                alt="Happy students in a classroom" 
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
