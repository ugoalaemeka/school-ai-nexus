
import { useState, useEffect, useRef } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  ChevronDown,
  MapPin,
  Award,
  Bell,
  Mail,
  ArrowRight,
  Image,
  Video,
  MessageSquare,
  Share2,
  BookOpen,
  Trophy,
  Megaphone,
  ArrowUp
} from "lucide-react";

// Animations variants for Framer Motion
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
  rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: { 
    scale: 1.03, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const NewsEventsPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filter, setFilter] = useState("all");
  const timelineRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dummy news data
  const newsItems = [
    {
      id: 1,
      title: "School Wins National Science Competition",
      snippet: "Our students took first place in the National Science Bowl, showcasing exceptional knowledge and teamwork.",
      category: "achievements",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1000",
      date: "April 2, 2025"
    },
    {
      id: 2,
      title: "New STEM Lab Opening Ceremony",
      snippet: "We're excited to announce the grand opening of our state-of-the-art STEM laboratory next month.",
      category: "news",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000",
      date: "April 15, 2025"
    },
    {
      id: 3,
      title: "Annual Sports Day Coming Up",
      snippet: "Get ready for a day of athleticism and school spirit at our annual sports competition.",
      category: "events",
      image: "https://images.unsplash.com/photo-1526676037777-05a232554d77?q=80&w=1000",
      date: "May 10, 2025"
    },
    {
      id: 4,
      title: "Cultural Exchange Program with Japan",
      snippet: "Selected students will participate in a two-week cultural exchange visit to our sister school in Tokyo.",
      category: "news",
      image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000",
      date: "June 5, 2025"
    },
    {
      id: 5,
      title: "Student Art Exhibition",
      snippet: "Come see the incredible artwork created by our talented students at the annual art showcase.",
      category: "events",
      image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=1000",
      date: "April 22, 2025"
    },
    {
      id: 6,
      title: "Teachers Win Excellence in Education Award",
      snippet: "Three of our faculty members were recognized for their outstanding contribution to education.",
      category: "achievements",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
      date: "March 28, 2025"
    }
  ];

  // Dummy upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      date: "April 20, 2025",
      time: "3:00 PM - 6:00 PM",
      location: "School Auditorium",
      description: "Discuss your child's academic progress with our faculty."
    },
    {
      id: 2,
      title: "Science Fair",
      date: "May 5, 2025",
      time: "9:00 AM - 2:00 PM",
      location: "School Gymnasium",
      description: "Students showcase their innovative science projects."
    },
    {
      id: 3,
      title: "Career Day",
      date: "May 15, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "Main Hall",
      description: "Professionals from various fields share insights about careers."
    },
    {
      id: 4,
      title: "Annual Sports Day",
      date: "June 2, 2025",
      time: "8:00 AM - 4:00 PM",
      location: "School Sports Ground",
      description: "A day of athletic competitions and team spirit."
    }
  ];

  // Dummy photo gallery items
  const galleryItems = [
    { id: 1, type: "photo", src: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1000", title: "Robotics Club" },
    { id: 2, type: "photo", src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000", title: "School Campus" },
    { id: 3, type: "video", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000", title: "Student Project Presentation" },
    { id: 4, type: "photo", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000", title: "Graduation Ceremony" },
    { id: 5, type: "photo", src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000", title: "School Library" },
    { id: 6, type: "video", src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000", title: "Music Performance" }
  ];

  // Dummy achievements
  const achievements = [
    { id: 1, title: "National Science Competition", subtitle: "First Place", icon: Trophy },
    { id: 2, title: "Art & Design Contest", subtitle: "Best Creative School", icon: Award },
    { id: 3, title: "Regional Debate Championship", subtitle: "Winner", icon: MessageSquare },
    { id: 4, title: "Sports Tournament", subtitle: "Basketball Champions", icon: Trophy }
  ];

  // Dummy announcements
  const announcements = [
    { id: "1", title: "School Closed for Spring Break", content: "School will be closed from April 10-17 for spring break. Classes resume on April 18.", isNew: true },
    { id: "2", title: "New Curriculum Implementation", content: "Starting next term, we'll be implementing an updated STEM curriculum with more hands-on projects.", isNew: true },
    { id: "3", title: "Cafeteria Menu Update", content: "Our school cafeteria has updated its menu to include more healthy options and vegetarian meals.", isNew: false },
    { id: "4", title: "End of Year Exam Schedule", content: "The end of year examination schedule has been posted. Please check your email for details.", isNew: false }
  ];

  // Filter news items
  const filteredNews = filter === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category === filter);

  return (
    <MainLayout>
      {/* Hero Section with Parallax */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-500">
          {/* Background particles animation */}
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
            What's New at EduNexus
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl mb-8 max-w-2xl"
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
            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
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

      {/* News Highlights Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-purple-50 dark:from-background dark:to-purple-950/20">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Latest News & Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay up to date with everything happening in our school community
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
                variant={filter === "news" ? "default" : "outline"} 
                onClick={() => setFilter("news")}
                className="rounded-full"
              >
                News
              </Button>
              <Button 
                variant={filter === "events" ? "default" : "outline"} 
                onClick={() => setFilter("events")}
                className="rounded-full"
              >
                Events
              </Button>
              <Button 
                variant={filter === "achievements" ? "default" : "outline"} 
                onClick={() => setFilter("achievements")}
                className="rounded-full"
              >
                Achievements
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredNews.map((item) => (
              <motion.div key={item.id} variants={fadeIn}>
                <motion.div 
                  className="h-full bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:border-primary/50 transition-all duration-300"
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline" className="capitalize">
                        {item.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {item.snippet}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="group w-full justify-between">
                      Read More 
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Timeline */}
      <section className="py-16 px-4 bg-background" ref={timelineRef}>
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mark your calendar for these exciting school events
            </p>
          </motion.div>

          {/* Timeline view */}
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/30"></div>
            
            <div className="relative">
              {upcomingEvents.map((event, index) => (
                <motion.div 
                  key={event.id}
                  className={`mb-12 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                >
                  <div className="w-full md:w-1/2 md:px-10 mb-8 md:mb-0">
                    <motion.div 
                      className="bg-card p-6 rounded-xl shadow-lg border border-border hover:border-primary/50 transition-all duration-300"
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                    >
                      <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                      <div className="flex items-center mb-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center mb-2 text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center mb-4 text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <p className="mb-4 text-muted-foreground">{event.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm">Add to Calendar</Button>
                        <Button size="sm" variant="outline">RSVP</Button>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background" style={{ top: index * 160 + 24 }}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Photo & Video Gallery */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-950/20">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into our vibrant school life through photos and videos
            </p>
          </motion.div>

          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Image className="h-4 w-4" /> Photos
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" /> Videos
              </TabsTrigger>
              <TabsTrigger value="live" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Memories
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {galleryItems.filter(item => item.type === "photo").map((item) => (
                  <motion.div 
                    key={item.id}
                    className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                    variants={fadeIn}
                  >
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
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
                {galleryItems.filter(item => item.type === "video").map((item) => (
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
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="live">
              <div className="text-center p-12 bg-muted/50 rounded-xl">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Our live memories feature is currently under development. Check back soon!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Achievements & Spotlights */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Achievements & Spotlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Celebrating the outstanding accomplishments of our school community
            </p>
          </motion.div>

          <div className="mb-16">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {achievements.map((achievement) => (
                  <CarouselItem key={achievement.id} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div 
                      className="h-full p-1"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Card className="h-full border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
                        <CardHeader className="pb-2">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <achievement.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle>{achievement.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xl font-bold text-primary mb-2">
                            {achievement.subtitle}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Trophy className="h-4 w-4" /> View Details
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

          {/* Animated stats counter */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { value: "250+", label: "Awards Won", icon: Trophy },
              { value: "95%", label: "Pass Rate", icon: Award },
              { value: "50+", label: "Events Yearly", icon: Calendar },
              { value: "30+", label: "Faculty Honors", icon: BookOpen }
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
      
      {/* Announcements & Alerts */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-purple-50 dark:from-background dark:to-purple-950/20">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full mb-4">
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">Important Updates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Announcements & Alerts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed about important school notices and announcements
            </p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {announcements.map((announcement) => (
                <motion.div key={announcement.id} variants={fadeIn}>
                  <AccordionItem value={announcement.id} className="border-b border-border">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-3 text-left">
                        <Megaphone className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{announcement.title}</span>
                        {announcement.isNew && (
                          <Badge variant="default" className="ml-2 bg-red-500">New</Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {announcement.content}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Subscribe to SMS Alerts
            </Button>
          </div>
        </div>
      </section>
      
      {/* Subscribe to Newsletter */}
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
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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

export default NewsEventsPage;
