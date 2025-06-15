
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface NewsletterSubscribeProps {
  onSubscribe: (e: React.FormEvent) => void;
}

export const NewsletterSubscribe = ({ onSubscribe }: NewsletterSubscribeProps) => {
  return (
    <section className="py-16 px-4 bg-primary text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 10 + 20}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Never Miss an Update</h2>
          <p className="mb-8 text-white/80">
            Subscribe to our newsletter to receive the latest news and event updates directly in your inbox.
          </p>
          
          <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="bg-white/20 border-white/30 placeholder:text-white/50 text-white"
            />
            <Button type="submit" className="bg-white text-primary hover:bg-white/90" size="lg">
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-sm text-white/70">
            By subscribing, you agree to receive school updates via email. You can unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
