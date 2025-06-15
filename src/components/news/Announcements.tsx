
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Bell, Megaphone } from "lucide-react";

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

interface Announcement {
  id: string;
  title: string;
  content: string;
  isNew: boolean;
}

interface AnnouncementsProps {
  announcements: Announcement[];
}

export const Announcements = ({ announcements }: AnnouncementsProps) => {
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
  );
};
