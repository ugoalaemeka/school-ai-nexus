
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};
