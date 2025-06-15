
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ArrowUp, Award, MessageSquare, Trophy, BookOpen } from "lucide-react";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsList } from "@/components/news/NewsList";
import { UpcomingEvents } from "@/components/news/UpcomingEvents";
import { NewsGallery } from "@/components/news/NewsGallery";
import { AchievementsSection } from "@/components/news/AchievementsSection";
import { Announcements } from "@/components/news/Announcements";
import { NewsletterSubscribe } from "@/components/news/NewsletterSubscribe";

const NewsEventsPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const galleryItems = [
    { id: 1, type: "photo", src: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1000", title: "Robotics Club" },
    { id: 2, type: "photo", src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000", title: "School Campus" },
    { id: 3, type: "video", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000", title: "Student Project Presentation" },
    { id: 4, type: "photo", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000", title: "Graduation Ceremony" },
    { id: 5, type: "photo", src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000", title: "School Library" },
    { id: 6, type: "video", src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000", title: "Music Performance" }
  ];

  const achievements = [
    { id: 1, title: "National Science Competition", subtitle: "First Place", icon: Trophy },
    { id: 2, title: "Art & Design Contest", subtitle: "Best Creative School", icon: Award },
    { id: 3, title: "Regional Debate Championship", subtitle: "Winner", icon: MessageSquare },
    { id: 4, title: "Sports Tournament", subtitle: "Basketball Champions", icon: Trophy }
  ];

  const announcements = [
    { id: "1", title: "School Closed for Spring Break", content: "School will be closed from April 10-17 for spring break. Classes resume on April 18.", isNew: true },
    { id: "2", title: "New Curriculum Implementation", content: "Starting next term, we'll be implementing an updated STEM curriculum with more hands-on projects.", isNew: true },
    { id: "3", title: "Cafeteria Menu Update", content: "Our school cafeteria has updated its menu to include more healthy options and vegetarian meals.", isNew: false },
    { id: "4", title: "End of Year Exam Schedule", content: "The end of year examination schedule has been posted. Please check your email for details.", isNew: false }
  ];

  return (
    <MainLayout>
      <NewsHero />
      <NewsList newsItems={newsItems} />
      <UpcomingEvents events={upcomingEvents} />
      <NewsGallery galleryItems={galleryItems} />
      <AchievementsSection achievements={achievements} />
      <Announcements announcements={announcements} />
      <NewsletterSubscribe onSubscribe={handleSubscribe} />
      
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
