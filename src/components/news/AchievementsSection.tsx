
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Award, BookOpen, Calendar, MessageSquare, Trophy } from "lucide-react";

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

interface Achievement {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  return (
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
  );
};
