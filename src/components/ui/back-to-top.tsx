
"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BackToTopProps {
  threshold?: number; // Scroll threshold in pixels
  position?: "bottom-right" | "bottom-left" | "bottom-center"; 
  className?: string;
}

export function BackToTop({ 
  threshold = 300,
  position = "bottom-right",
  className 
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Initialize visibility check
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  // Position classes based on the position prop
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleBackToTop}
          className={cn(
            "fixed z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg",
            positionClasses[position],
            className
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
