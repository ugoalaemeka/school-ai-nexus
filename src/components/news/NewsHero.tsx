
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export const NewsHero = () => {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
          alt="School event" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80"></div>
      </div>

      {/* Floating News Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 shadow-xl"
            style={{
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 80 + 60}px`,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `float ${Math.random() * 20 + 20}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What's New at Eko Scholars Academy
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stay informed with the latest news, events, and celebrations from our vibrant school community
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 text-lg px-8 py-6">
            Explore Updates <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </div>
    </section>
  );
};
