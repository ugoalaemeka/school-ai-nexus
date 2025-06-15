
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

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

interface NewsItem {
  id: number;
  title: string;
  snippet: string;
  category: string;
  image: string;
  date: string;
}

interface NewsListProps {
  newsItems: NewsItem[];
}

export const NewsList = ({ newsItems }: NewsListProps) => {
  const [filter, setFilter] = useState("all");

  const filteredNews = filter === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category === filter);

  return (
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
  );
};
