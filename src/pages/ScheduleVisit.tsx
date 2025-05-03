
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker, TimePicker } from '@/components/schedule-visit/DateTimePicker';
import { Map } from '@/components/ui/map';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, Clock, Calendar, MapPin, Phone, Mail, User, School, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Form schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  childName: z.string().min(1, { message: "Child's name is required" }),
  childClass: z.string().min(1, { message: "Current class is required" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, { message: "Please select a time" }),
  message: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

// Define the table type for visit_bookings since it might not be in the auto-generated types yet
interface VisitBooking {
  full_name: string;
  email: string;
  phone: string;
  child_name: string;
  child_class: string;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: string;
}

const ScheduleVisit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      childName: "",
      childClass: "",
      time: "",
      message: ""
    }
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Use a generic insert with the table name as a string
      const { error } = await supabase.from('visit_bookings').insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        child_name: data.childName,
        child_class: data.childClass,
        preferred_date: data.date.toISOString(),
        preferred_time: data.time,
        message: data.message || null,
        status: 'pending'
      } as VisitBooking);

      if (error) throw error;

      // Success state
      setIsSuccess(true);
      toast({
        title: "Visit scheduled!",
        description: "Your school visit has been scheduled successfully.",
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error scheduling visit:", error);
      toast({
        title: "Something went wrong",
        description: "There was a problem scheduling your visit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-primary/90 to-secondary/90"></div>
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="School campus" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        <div className="container relative z-10 px-6 py-16 md:py-24">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Schedule Your School Visit
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90 animate-fade-in" style={{ animationDelay: '100ms' }}>
              We invite you to experience our campus firsthand. Meet our teachers, explore our facilities, and discover how our innovative approach to education can benefit your child.
            </p>
            <Button 
              onClick={() => {
                const formElement = document.getElementById('visit-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              size="lg" 
              className="animate-fade-in" 
              style={{ animationDelay: '200ms' }}
            >
              Book Your Visit Now
            </Button>
          </div>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form Column */}
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border/20" id="visit-form">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Book Your Visit</h2>
                <p className="text-muted-foreground">
                  Fill out the form below to schedule a personalized tour of our campus.
                </p>
              </div>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Visit Scheduled!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Thank you for scheduling a visit! We've sent a confirmation to your email with all the details.
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Return to Home
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="fullName" className="block text-sm font-medium">
                            Full Name
                          </label>
                          <Input 
                            id="fullName"
                            placeholder="Your full name"
                            {...form.register("fullName")}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          {form.formState.errors.fullName && (
                            <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="email"
                              type="email"
                              placeholder="Your email address"
                              {...form.register("email")}
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          {form.formState.errors.email && (
                            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="phone"
                            type="tel"
                            placeholder="Your phone number"
                            {...form.register("phone")}
                            className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        {form.formState.errors.phone && (
                          <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Child Information */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <School className="h-5 w-5" />
                        Child Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="childName" className="block text-sm font-medium">
                            Child's Name
                          </label>
                          <Input 
                            id="childName"
                            placeholder="Your child's name"
                            {...form.register("childName")}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          {form.formState.errors.childName && (
                            <p className="text-sm text-destructive">{form.formState.errors.childName.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="childClass" className="block text-sm font-medium">
                            Current Class/Grade
                          </label>
                          <Input 
                            id="childClass"
                            placeholder="e.g., Grade 5 or Preschool"
                            {...form.register("childClass")}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          {form.formState.errors.childClass && (
                            <p className="text-sm text-destructive">{form.formState.errors.childClass.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Visit Details */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Visit Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DatePicker 
                          date={form.getValues("date")}
                          onDateChange={(date) => form.setValue("date", date as Date, { shouldValidate: true })}
                          label="Preferred Date"
                        />
                        
                        <TimePicker 
                          value={form.getValues("time")}
                          onValueChange={(time) => form.setValue("time", time, { shouldValidate: true })}
                          label="Preferred Time"
                        />
                      </div>
                      {form.formState.errors.date && (
                        <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
                      )}
                      {form.formState.errors.time && (
                        <p className="text-sm text-destructive">{form.formState.errors.time.message}</p>
                      )}
                    </div>
                    
                    {/* Additional Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Additional Message (Optional)
                      </label>
                      <Textarea 
                        id="message"
                        placeholder="Any specific requests or questions?"
                        {...form.register("message")}
                        className="min-h-[100px] transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    
                    {/* Submit Button */}
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 text-lg relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Schedule Visit
                          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
            
            {/* Map and Info Column */}
            <div className="space-y-8">
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Visit Our Campus
                </h3>
                <Map className="mb-6" />
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">EduNexus Main Campus</p>
                      <p className="text-muted-foreground">123 Education Avenue, Learning City, LC 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">School Hours</p>
                      <p className="text-muted-foreground">Monday to Friday: 8:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground">Weekend Tours: By appointment only</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-muted-foreground">(555) 123-4567</p>
                      <p className="text-muted-foreground">admissions@edunexus.edu</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Visit Information */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border/20">
                <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
                <div className="space-y-3">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="flex h-6 w-6 items-center justify-center text-primary font-medium rounded-full">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Welcome & Introduction</h4>
                      <p className="text-muted-foreground text-sm">Meet our admissions team and learn about our educational philosophy.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="flex h-6 w-6 items-center justify-center text-primary font-medium rounded-full">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Campus Tour</h4>
                      <p className="text-muted-foreground text-sm">Explore our state-of-the-art facilities and learning spaces.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="flex h-6 w-6 items-center justify-center text-primary font-medium rounded-full">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Q&A Session</h4>
                      <p className="text-muted-foreground text-sm">Get answers to all your questions about curriculum, activities, and policies.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="flex h-6 w-6 items-center justify-center text-primary font-medium rounded-full">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Next Steps</h4>
                      <p className="text-muted-foreground text-sm">Learn about the application process and available openings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Common questions about school visits</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="font-semibold mb-2">How long do visits typically last?</h4>
              <p className="text-muted-foreground">Most school visits last about 60-90 minutes, depending on your questions and needs.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="font-semibold mb-2">Should my child attend the visit?</h4>
              <p className="text-muted-foreground">We encourage children to attend as it helps them feel comfortable with the environment.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="font-semibold mb-2">What should we bring to the visit?</h4>
              <p className="text-muted-foreground">Just bring your questions! No documents are required for the initial visit.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="font-semibold mb-2">Can we reschedule if needed?</h4>
              <p className="text-muted-foreground">Yes, you can reschedule your visit by contacting our admissions office at least 24 hours in advance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to see our school in action?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Schedule your visit today and discover why EduNexus is the perfect place for your child to learn and grow.
          </p>
          <Button 
            onClick={() => {
              const formElement = document.getElementById('visit-form');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            size="lg" 
            variant="secondary"
            className="text-primary"
          >
            Book Your Visit Now
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default ScheduleVisit;
