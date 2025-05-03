
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  BookOpen, 
  CheckCircle, 
  ChevronRight, 
  Download, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Shield, 
  Star, 
  Users, 
  Video, 
  Award, 
  Monitor, 
  FileText, 
  Calendar, 
  CheckCheck,
  GraduationCap,
  School,
  Music,
  Code,
  Palette,
  Trophy,
  Puzzle,
  Book,
  Brain,
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

const Admission = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [activeProgramTab, setActiveProgramTab] = useState("early-years");
  const [selectedProgram, setSelectedProgram] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of Alex, Grade 5",
      quote: "The teachers are exceptional, and my son has flourished academically and socially. Best decision we've made for his education.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Parent of twins, Grade 3",
      quote: "We were drawn to the AI-driven curriculum, but it's the supportive community that truly sets this school apart.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      name: "Emily Chen",
      role: "Parent of Sophia, Grade 7",
      quote: "The personalized approach to learning has helped my daughter discover her strengths. She's excited to go to school every day!",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "What are the fees and payment options?",
      answer: "Our tuition fees vary by grade level. We offer flexible payment plans including termly, annual, and installment options. Financial aid and scholarships are available for qualifying families."
    },
    {
      question: "What's the typical class size?",
      answer: "We maintain small class sizes to ensure personalized attention. Typically, classes range from 15-20 students with a low student-to-teacher ratio."
    },
    {
      question: "What age requirements exist for different programs?",
      answer: "Preschool accepts children from 3-5 years. Primary school is for ages 6-11, and Secondary program serves students 12-18 years old. We assess each child individually for placement."
    },
    {
      question: "Is transportation available?",
      answer: "Yes, we offer bus services across major routes in the city. GPS tracking is available for parents to monitor their child's journey."
    },
    {
      question: "What extracurricular activities do you offer?",
      answer: "We provide a wide range of activities including sports, arts, music, coding, robotics, debate, and community service programs to ensure well-rounded development."
    },
  ];

  const admissionSteps = [
    {
      title: "Apply Online",
      description: "Complete our online application form with basic information about your child and family.",
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: "Submit Documents",
      description: "Upload required documents including birth certificate, previous academic records, and ID.",
      icon: <CheckCheck className="h-10 w-10 text-primary" />,
    },
    {
      title: "Assessment",
      description: "Schedule an age-appropriate assessment and family interview to determine placement.",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      title: "Admission Decision",
      description: "Receive an admission decision and welcome packet with next steps.",
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
    },
    {
      title: "Enrollment",
      description: "Complete enrollment by paying fees and attending orientation to begin your journey with us.",
      icon: <Calendar className="h-10 w-10 text-primary" />,
    },
  ];

  const programs = [
    {
      id: "early-years",
      title: "Early Years (Ages 3-5)",
      description: "A nurturing foundation for lifelong learning through play-based activities and early literacy development.",
      icon: <School className="h-16 w-16 text-primary" />,
      features: ["Play-based learning", "Early literacy", "Social skills development", "Introduction to technology"],
      curriculum: [
        {
          name: "Playful Learning",
          description: "Children learn fundamental concepts through guided play activities."
        },
        {
          name: "Early Literacy",
          description: "Introduction to phonics, storytelling, and print awareness."
        },
        {
          name: "Number Sense",
          description: "Basic counting, patterns, and spatial awareness through games."
        },
        {
          name: "Creative Expression",
          description: "Art, music, and movement activities to develop motor skills."
        }
      ],
      activities: ["Music & Movement", "Art Studio", "Nature Exploration", "Dramatic Play"],
      success: "Our Early Years program has been recognized for excellence in early childhood education, with 97% of parents reporting their children transition smoothly to primary school."
    },
    {
      id: "primary",
      title: "Primary School (Ages 6-11)",
      description: "A comprehensive curriculum focusing on core subjects while fostering creativity and critical thinking skills.",
      icon: <Book className="h-16 w-16 text-primary" />,
      features: ["Core academics", "Project-based learning", "Digital literacy", "Arts and physical education"],
      curriculum: [
        {
          name: "Core Subjects",
          description: "Strong foundation in literacy, mathematics, science, and social studies."
        },
        {
          name: "Project-Based Learning",
          description: "Interdisciplinary projects that develop research and collaboration skills."
        },
        {
          name: "Technology Integration",
          description: "Digital literacy and responsible technology use integrated across subjects."
        },
        {
          name: "Languages",
          description: "Second language instruction starting from Grade 1."
        }
      ],
      activities: ["Robotics Club", "Young Scientists", "Chess Club", "Sports Teams"],
      success: "Our Primary students consistently score in the top 15% nationally in standardized assessments, with exceptional growth in critical thinking skills."
    },
    {
      id: "secondary",
      title: "Secondary School (Ages 12-18)",
      description: "A rigorous academic program preparing students for university with specialized tracks available.",
      icon: <GraduationCap className="h-16 w-16 text-primary" />,
      features: ["Advanced academics", "Specialized tracks", "College preparation", "Leadership opportunities"],
      curriculum: [
        {
          name: "Advanced Placement",
          description: "College-level courses with potential for university credit."
        },
        {
          name: "STEM Excellence",
          description: "Advanced mathematics, computer science, and scientific research."
        },
        {
          name: "Humanities Pathway",
          description: "Literature, philosophy, history, and social sciences."
        },
        {
          name: "Career Preparation",
          description: "Internships, career exploration, and professional skill development."
        }
      ],
      activities: ["Debate Team", "Model UN", "Entrepreneurship Club", "Advanced Research"],
      success: "95% of our graduates are accepted to their first-choice universities, with over $3.2 million in scholarships awarded last year."
    },
  ];

  const programIcons = {
    "Music & Movement": <Music className="h-5 w-5" />,
    "Art Studio": <Palette className="h-5 w-5" />,
    "Nature Exploration": <School className="h-5 w-5" />,
    "Dramatic Play": <Puzzle className="h-5 w-5" />,
    "Robotics Club": <Code className="h-5 w-5" />,
    "Young Scientists": <Brain className="h-5 w-5" />,
    "Chess Club": <Puzzle className="h-5 w-5" />,
    "Sports Teams": <Trophy className="h-5 w-5" />,
    "Debate Team": <MessageSquare className="h-5 w-5" />,
    "Model UN": <Users className="h-5 w-5" />,
    "Entrepreneurship Club": <Trophy className="h-5 w-5" />,
    "Advanced Research": <Brain className="h-5 w-5" />,
  };

  const handleScheduleVisit = () => {
    navigate('/schedule-visit');
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-primary/80 to-secondary/80"></div>
          <img 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Happy students in classroom" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        <div className="container relative z-10 px-6 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Unlock Your Child's Future Today!
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in">
              Join our innovative learning community where every student receives personalized attention to excel academically and develop essential life skills for tomorrow's world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/admission/apply">Apply Now</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm text-white border-white text-lg px-8 py-6"
                onClick={handleScheduleVisit}
              >
                Schedule a Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a supportive environment where students thrive academically and develop essential life skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Top-tier Academics</h3>
                <p className="text-muted-foreground">
                  Rigorous curriculum designed to challenge students and prepare them for future success.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Certified Teachers</h3>
                <p className="text-muted-foreground">
                  Experienced educators dedicated to bringing out the best in every student.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Monitor className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Modern Facilities</h3>
                <p className="text-muted-foreground">
                  State-of-the-art classrooms, labs, and recreational spaces for comprehensive development.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Safe Environment</h3>
                <p className="text-muted-foreground">
                  Security measures and policies that ensure your child's safety at all times.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  Customized approach that adapts to each student's unique learning style and pace.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Video className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tech-Driven Education</h3>
                <p className="text-muted-foreground">
                  Integration of AI and cutting-edge technology to enhance the learning experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background/80 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
              Our Academic Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive educational programs designed to nurture intellectual curiosity, 
              develop character, and prepare students for future success in a rapidly changing world.
            </p>
          </div>

          <div className="mb-12 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              {programs.map((program, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setSelectedProgram(index);
                    setActiveProgramTab(program.id);
                  }}
                  className={cn(
                    "flex flex-col items-center transition-all duration-300 transform",
                    selectedProgram === index 
                      ? "scale-110 text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-full mb-2 transition-colors duration-300",
                    selectedProgram === index 
                      ? "bg-primary/10" 
                      : "bg-transparent"
                  )}>
                    {program.icon}
                  </div>
                  <span className="text-sm font-medium">{program.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
            <Slider 
              value={[selectedProgram]} 
              min={0} 
              max={programs.length - 1} 
              step={1}
              onValueChange={(value) => {
                setSelectedProgram(value[0]);
                setActiveProgramTab(programs[value[0]].id);
              }}
              className="mt-4"
            />
          </div>

          <div className="max-w-5xl mx-auto">
            <Tabs value={activeProgramTab} onValueChange={setActiveProgramTab} className="w-full">
              <TabsList className="hidden">
                {programs.map((program) => (
                  <TabsTrigger key={program.id} value={program.id}>
                    {program.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {programs.map((program) => (
                <TabsContent 
                  key={program.id} 
                  value={program.id}
                  className="mt-6 focus:outline-none"
                >
                  <Card className="overflow-hidden border-0 shadow-lg animate-fade-in">
                    <div className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">{program.title}</h3>
                      <p className="opacity-90 animate-fade-in">{program.description}</p>
                    </div>
                    
                    <CardContent className="p-6 md:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6 animate-fade-in">
                          <div>
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                              <BookOpen className="h-5 w-5 mr-2 text-primary" />
                              Curriculum Highlights
                            </h4>
                            <div className="space-y-4">
                              {program.curriculum.map((item, idx) => (
                                <div 
                                  key={idx} 
                                  className="p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                                  style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                  <h5 className="font-medium mb-1">{item.name}</h5>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                          <div>
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                              <Puzzle className="h-5 w-5 mr-2 text-primary" />
                              Co-Curricular Activities
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              {program.activities.map((activity, idx) => (
                                <div 
                                  key={idx}
                                  className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                                  style={{ animationDelay: `${idx * 100 + 300}ms` }}
                                >
                                  <div className="text-primary">
                                    {programIcons[activity]}
                                  </div>
                                  <span className="text-sm font-medium">{activity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                              <Trophy className="h-5 w-5 mr-2 text-primary" />
                              Student Success
                            </h4>
                            <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                              <p className="italic">{program.success}</p>
                            </div>
                          </div>
                          
                          <div className="pt-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
                            <Button className="w-full sm:w-auto group">
                              Learn More About {program.title.split(' ')[0]} Program
                              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Parents Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from the families who have entrusted their children's education to us.
            </p>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6 md:p-10">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg italic mb-6">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <cite className="not-italic">
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </cite>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center mt-6">
              <CarouselPrevious className="relative -left-0 right-auto mr-2" />
              <CarouselNext className="relative -right-0 left-auto ml-2" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Admission Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, straightforward process to join our school community.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 z-0 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12">
              {admissionSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold z-10">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 md:w-[calc(50%-3rem)]">
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
                        <div className="shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button size="lg" className="text-lg px-8">
                Start Your Application
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our admission process and programs.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-8 p-4 bg-muted rounded-lg flex gap-4 items-center">
              <div className="text-muted-foreground">
                Can't find what you're looking for?
              </div>
              <Button variant="link" className="text-primary">
                View Full FAQ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Every child deserves a great start. Enroll today and invest in their tomorrow.
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Don't miss the opportunity to give your child the education they deserve. Limited seats available for the upcoming academic year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary text-lg px-8" asChild>
              <Link to="/admission/apply">Start Application</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white text-lg px-8"
              onClick={handleScheduleVisit}
            >
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Admissions</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our admissions team is here to answer your questions and guide you through the enrollment process.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Visit Us</h3>
                    <p className="text-muted-foreground">123 Education Avenue, Learning City, LC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-muted-foreground">admissions@schooldomain.edu</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Admission Brochure
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" placeholder="Full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Email address" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="Phone number" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Your questions or comments" 
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg md:hidden z-50">
        <div className="grid grid-cols-2 gap-2">
          <Button className="w-full" asChild>
            <Link to="/admission/apply">Apply Now</Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={handleScheduleVisit}>
            Schedule Visit
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admission;
