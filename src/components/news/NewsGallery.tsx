
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video, BookOpen, Share2 } from "lucide-react";

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

interface GalleryItem {
  id: number;
  type: string;
  src: string;
  title: string;
}

interface NewsGalleryProps {
  galleryItems: GalleryItem[];
}

export const NewsGallery = ({ galleryItems }: NewsGalleryProps) => {
  return (
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
  );
};
