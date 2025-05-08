
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { CountrySelect } from "@/components/admission/CountrySelect";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SupabaseJsonResponse } from "@/types/database";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  dateOfBirth: z.date({
    required_error: "Please select your date of birth.",
  }),
  gradeLevel: z.string().min(1, {
    message: "Please select a grade level.",
  }),
  country: z.string().min(1, {
    message: "Please select a country.",
  }),
  parentFirstName: z.string().min(2, {
    message: "Parent's first name must be at least 2 characters.",
  }),
  parentLastName: z.string().min(2, {
    message: "Parent's last name must be at least 2 characters.",
  }),
  parentEmail: z.string().email({
    message: "Please enter a valid parent email address.",
  }),
  emailConsent: z.boolean().refine((value) => value === true, {
    message: "You must consent to receive emails.",
  }),
});

export const AdmissionForm = ({ onSuccessfulPayment }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: new Date(),
      gradeLevel: "",
      country: "",
      parentFirstName: "",
      parentLastName: "",
      emailConsent: false,
      parentEmail: "",
    },
  });
  
  const studentData = form.watch();
  const parentData = {
    firstName: studentData.parentFirstName,
    lastName: studentData.parentLastName,
    email: studentData.parentEmail,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please correct the errors below.");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Call the create_application function
      const { data, error } = await supabase.rpc('create_application', {
        full_name: `${studentData.firstName} ${studentData.lastName}`,
        email: studentData.email,
        parent_email: studentData.parentEmail,
        class_requested: studentData.gradeLevel
      });
      
      if (error) {
        toast.error(`Error: ${error.message}`);
        setIsSubmitting(false);
        return;
      }
      
      // Cast the result properly 
      const result = data as unknown as SupabaseJsonResponse;
      
      if (!result.success) {
        toast.error(result.message || "Failed to submit application");
        setIsSubmitting(false);
        return;
      }
      
      toast.success("Application submitted successfully!");
      
      // Simulate payment processing
      // In a real app, this would integrate with a payment gateway
      setTimeout(() => {
        setIsSubmitting(false);
        onSuccessfulPayment({
          ...studentData,
          ...parentData,
          applicationId: result.application_id  // Using the correct property
        });
      }, 2000);
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Enter the student's personal details</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gradeLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1st Grade">1st Grade</SelectItem>
                        <SelectItem value="2nd Grade">2nd Grade</SelectItem>
                        <SelectItem value="3rd Grade">3rd Grade</SelectItem>
                        <SelectItem value="4th Grade">4th Grade</SelectItem>
                        <SelectItem value="5th Grade">5th Grade</SelectItem>
                        <SelectItem value="6th Grade">6th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountrySelect value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Parent/Guardian Information</CardTitle>
            <CardDescription>Enter the parent or guardian's details</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parentFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parentLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="parentEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jane.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I consent to receiving emails from EduNexus.
                    </FormLabel>
                    <FormDescription>
                      You can unsubscribe at any time.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  );
};
