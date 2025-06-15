
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
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

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mark your calendar for these exciting school events
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/30"></div>
          
          <div className="relative">
            {events.map((event, index) => (
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
                
                <div className="hidden md:block absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background" style={{ top: index * 160 + 24 }}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
