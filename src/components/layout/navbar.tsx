
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Menu, X, LogIn, BookOpen } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>EduNexus</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/news" className="font-medium hover:text-primary transition-colors">
            News & Events
          </Link>
          <Link to="/gallery" className="font-medium hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link to="/contact" className="font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login">
            <Button className="gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 space-y-4 animate-fade-in border-t bg-background">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/news" 
              className="font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              News & Events
            </Link>
            <Link 
              to="/gallery" 
              className="font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              to="/contact" 
              className="font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
