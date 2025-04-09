
import { useState, useEffect, useRef } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronDown,
  Image,
  Video,
  Camera,
  BookOpen,
  Share2,
  Calendar,
  Trophy,
  ArrowUp,
  Upload,
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.3 }
  }
};

const GalleryPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dummy gallery data
  const galleryItems = [
    { id: 1, type: "photo", category: "events", src: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1000", title: "Robotics Club", date: "March 15, 2025" },
    { id: 2, type: "photo", category: "academics", src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000", title: "School Campus", date: "February 10, 2025" },
    { id: 3, type: "video", category: "academics", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000", title: "Student Project Presentation", date: "April 2, 2025" },
    { id: 4, type: "photo", category: "events", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000", title: "Graduation Ceremony", date: "May 5, 2025" },
    { id: 5, type: "photo", category: "academics", src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000", title: "School Library", date: "January 20, 2025" },
    { id: 6, type: "video", category: "arts", src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000", title: "Music Performance", date: "March 25, 2025" },
    { id: 7, type: "photo", category: "sports", src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000", title: "Annual Sports Day", date: "February 28, 2025" },
    { id: 8, type: "photo", category: "arts", src: "https://images.unsplash.com/photo-1460794418188-1dadae8a6401?q=80&w=1000", title: "Art Exhibition", date: "April 10, 2025" },
    { id: 9, type: "photo", category: "excursions", src: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000", title: "Field Trip to Museum", date: "March 5, 2025" },
    { id: 10, type: "photo", category: "competitions", src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000", title: "Science Fair Winners", date: "April 22, 2025" },
    { id: 11, type: "video", category: "sports", src: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?q=80&w=1000", title: "Basketball Tournament", date: "February 15, 2025" },
    { id: 12, type: "photo", category: "excursions", src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000", title: "Community Service Day", date: "March 18, 2025" },
  ];

  // Featured albums
  const featuredAlbums = [
    { id: 1, title: "Graduation Ceremony", image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1000", count: "24 photos" },
    { id: 2, title: "Science Fair", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1000", count: "18 photos" },
    { id: 3, title: "Teacher Appreciation Week", image: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1000", count: "12 photos" },
    { id: 4, title: "Cultural Day", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000", count: "30 photos" },
  ];

  // Filter gallery items
  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const handleSubmitPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Photo submitted!",
      description: "Thank you for sharing your moment with us.",
    });
  };

  return (
    <MainLayout>
      {/* Hero Section with Parallax */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-500">
          {/* Background animation */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Moments That Matter
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the spirit, joy, and excellence of EduNexus through our gallery
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              View Gallery
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

      {/* Dynamic Gallery Grid */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-950/20">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Gallery Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our visual journey through academics, events, sports, and more
            </p>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                onClick={() => setFilter("all")}
                className="rounded-full"
              >
                All
              </Button>
              <Button 
                variant={filter === "events" ? "default" : "outline"} 
                onClick={() => setFilter("events")}
                className="rounded-full"
              >
                Events
              </Button>
              <Button 
                variant={filter === "academics" ? "default" : "outline"} 
                onClick={() => setFilter("academics")}
                className="rounded-full"
              >
                Academics
              </Button>
              <Button 
                variant={filter === "sports" ? "default" : "outline"} 
                onClick={() => setFilter("sports")}
                className="rounded-full"
              >
                Sports
              </Button>
              <Button 
                variant={filter === "arts" ? "default" : "outline"} 
                onClick={() => setFilter("arts")}
                className="rounded-full"
              >
                Arts
              </Button>
              <Button 
                variant={filter === "excursions" ? "default" : "outline"} 
                onClick={() => setFilter("excursions")}
                className="rounded-full"
              >
                Excursions
              </Button>
              <Button 
                variant={filter === "competitions" ? "default" : "outline"} 
                onClick={() => setFilter("competitions")}
                className="rounded-full"
              >
                Competitions
              </Button>
            </div>
          </motion.div>

          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Image className="h-4 w-4" /> Photos
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" /> Videos
              </TabsTrigger>
              <TabsTrigger value="albums" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Albums
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {filteredItems.filter(item => item.type === "photo").map((item) => (
                  <motion.div 
                    key={item.id}
                    className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                    variants={fadeIn}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    variants={cardHover}
                  >
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {item.date}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="videos">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {filteredItems.filter(item => item.type === "video").map((item) => (
                  <motion.div 
                    key={item.id}
                    className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer"
                    variants={fadeIn}
                  >
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="rounded-full bg-white/20 p-5">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-medium">{item.title}</h3>
                      <p className="text-white/70 text-sm">{item.date}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="albums">
              <div className="mb-12">
                <Carousel>
                  <CarouselContent>
                    {featuredAlbums.map((album) => (
                      <CarouselItem key={album.id} className="md:basis-1/2 lg:basis-1/3">
                        <motion.div 
                          className="p-1"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <Card className="overflow-hidden">
                            <CardContent className="p-0 relative aspect-[4/3]">
                              <img 
                                src={album.image} 
                                alt={album.title} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 flex flex-col justify-end p-4">
                                <h3 className="text-white text-xl font-bold">{album.title}</h3>
                                <p className="text-white/80">{album.count}</p>
                                <Button variant="ghost" size="sm" className="mt-2 text-white bg-white/20 hover:bg-white/30 w-fit">
                                  View Album
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden md:flex">
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                  </div>
                </Carousel>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Gallery Highlights with Animated Stats */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { value: "5000+", label: "Moments Captured", icon: Camera },
              { value: "100+", label: "School Events", icon: Calendar },
              { value: "15+", label: "Active Clubs & Societies", icon: Trophy }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 shadow-sm"
                variants={fadeIn}
              >
                <stat.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <motion.h3 
                  className="text-3xl sm:text-4xl font-bold mb-2 text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Submit Your Moments */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-950/20">
        <div className="container mx-auto max-w-2xl">
          <motion.div 
            className="text-center mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Submit Your Moments</h2>
            <p className="text-muted-foreground">
              Share your favorite school memories with our community
            </p>
          </motion.div>
          
          <motion.div
            className="bg-card shadow-lg rounded-xl p-6 border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmitPhoto} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <Input placeholder="Enter your name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo Title</label>
                <Input placeholder="Give your photo a title" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md">
                  <option value="events">Events</option>
                  <option value="academics">Academics</option>
                  <option value="sports">Sports</option>
                  <option value="arts">Arts</option>
                  <option value="excursions">Excursions</option>
                  <option value="competitions">Competitions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload Photo</label>
                <div className="border-2 border-dashed border-input rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop your photo here, or click to browse</p>
                  <Button variant="outline" size="sm">Choose File</Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Submit Photo
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Back to top button */}
      {showBackToTop && (
        <motion.button
          className="fixed bottom-8 right-8 bg-primary text-white rounded-full p-3 shadow-lg z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </MainLayout>
  );
};

export default GalleryPage;

