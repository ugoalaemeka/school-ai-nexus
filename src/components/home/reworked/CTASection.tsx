
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section 
      className="relative py-20 text-white bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071')" }}
    >
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative container text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Eko Scholars Family?</h2>
        <p className="text-white/80 mb-8 text-lg">
          Experience the future of education. Apply for admission, schedule a visit, or get in touch with our team today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" onClick={() => navigate("/admission")}>
            Apply Now
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};
