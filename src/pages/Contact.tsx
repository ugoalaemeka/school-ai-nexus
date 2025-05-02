import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapWrapper } from "@/components/ui/map-wrapper";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle form submission here
    console.log("Form submitted");
  };

  // Define the Lagos office location
  const lagosLocation = { lat: 6.4550, lng: 3.3841 }; // Victoria Island, Lagos coordinates

  return (
    <MainLayout>
      {/* Hero Section with Enhanced Design */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624"
            alt="Modern office space" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-700/80"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <svg className="absolute left-0 h-full w-1/3 text-white/5" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <polygon points="0,0 100,0 50,100 0,100" />
          </svg>
          <svg className="absolute right-0 h-full w-1/3 text-white/5" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <polygon points="100,0 100,100 50,100" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 h-full mx-auto flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Have questions or feedback? We'd love to hear from you. Reach out using any of the methods below.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Our Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  123 Education Street<br />
                  Knowledge City, EduLand<br />
                  Postal Code: 12345
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Email Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-muted-foreground">General Inquiries:</p>
                <p>info@edunexus.edu</p>
                <p className="text-muted-foreground mt-2">Support:</p>
                <p>support@edunexus.edu</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Call Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Main Office:</p>
                <p>+1 (555) 123-4567</p>
                <p className="text-muted-foreground mt-2">Technical Support:</p>
                <p>+1 (555) 987-6543</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you as soon as possible. We value your feedback and are here to answer any questions you may have about our platform.
                </p>
              </div>
              
              <div className="p-6 bg-background rounded-lg mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-muted-foreground">We respond to inquiries during our working hours</p>
                  </div>
                </div>
                
                <div className="space-y-2 ml-12">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">How can I request a demo of the platform?</h4>
                    <p className="text-sm text-muted-foreground">
                      You can request a demo by filling out the contact form or emailing us directly at demo@edunexus.edu.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Is technical support included with all packages?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, all our packages include technical support. Premium packages include priority support with faster response times.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Can the system be customized for our school's specific needs?</h4>
                    <p className="text-sm text-muted-foreground">
                      Absolutely. We offer customization services to ensure the platform meets your specific requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  We'll respond to your inquiry as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please provide details about your inquiry..." 
                      className="min-h-[150px]" 
                      required 
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" onClick={handleSubmit}>
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section - Updated with the Leaflet Map */}
      <section className="py-20 relative overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us in Lagos, Nigeria</h2>
            <p className="text-muted-foreground">
              Visit our headquarters to learn more about our services
            </p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <MapWrapper location={lagosLocation} zoom={14} />
        </div>
        
        {/* Additional location details */}
        <div className="container mt-8">
          <div className="max-w-xl mx-auto bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Lagos Office</h3>
                <p className="text-muted-foreground">Victoria Island, Lagos, Nigeria</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pl-12 border-l-2 border-primary/20 ml-4">
              Our Lagos office serves as our main hub for West African operations. The modern facility houses our administrative team, learning resource center, and training facilities.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
