
import React from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Settings,
  User,
  Lock,
  Bell,
  Mail,
  Cloud,
  Database,
  Palette,
  Globe,
  Shield,
  Clock,
  School,
  FileText,
  Save,
  CheckCircle,
  AlertCircle,
  Upload,
  Calendar,
  Building,
  Phone,
  HelpCircle
} from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();
  
  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleBackupDatabase = () => {
    toast({
      title: "Database backup initiated",
      description: "Your database is being backed up. You will be notified when complete.",
    });
  };

  return (
    <AdminSidebar>
      <div className="container py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariant}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Configure your system preferences</p>
            </div>
          </motion.div>

          {/* Settings Tabs */}
          <motion.div variants={itemVariant}>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4">
                <TabsTrigger value="profile" className="flex gap-2 items-center">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex gap-2 items-center">
                  <Lock className="h-4 w-4" />
                  <span className="hidden md:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex gap-2 items-center">
                  <Bell className="h-4 w-4" />
                  <span className="hidden md:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="school" className="flex gap-2 items-center">
                  <School className="h-4 w-4" />
                  <span className="hidden md:inline">School Info</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex gap-2 items-center">
                  <Palette className="h-4 w-4" />
                  <span className="hidden md:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="flex gap-2 items-center">
                  <Database className="h-4 w-4" />
                  <span className="hidden md:inline">System</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Settings */}
              <TabsContent value="profile" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center space-y-2">
                        <Avatar className="w-24 h-24">
                          <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Change</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue="Admin Carter" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="admin@example.com" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" defaultValue="Administrator" disabled />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            placeholder="Write a short bio..." 
                            defaultValue="School administrator with over 10 years of experience in education management. Responsible for overseeing the daily operations of the school."
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t p-4">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Security Settings */}
              <TabsContent value="security" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t p-4">
                    <Button onClick={handlePasswordChange}>Update Password</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Enable Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Secure your account with two-factor authentication
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Login Activity</h4>
                        <p className="text-sm text-muted-foreground">
                          Track and monitor your login history
                        </p>
                      </div>
                      <Button variant="outline">View Activity</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notification Settings */}
              <TabsContent value="notifications" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Configure how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailSystem" className="font-medium">System Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about system updates and maintenance
                            </p>
                          </div>
                          <Switch id="emailSystem" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailUsers" className="font-medium">User Activities</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new user registrations and account changes
                            </p>
                          </div>
                          <Switch id="emailUsers" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailEvents" className="font-medium">Events & Calendar</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about upcoming events and schedule changes
                            </p>
                          </div>
                          <Switch id="emailEvents" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailReports" className="font-medium">Reports & Performance</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails when new reports are generated
                            </p>
                          </div>
                          <Switch id="emailReports" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">In-App Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="inAppMessages" className="font-medium">Messages</Label>
                            <p className="text-sm text-muted-foreground">
                              Show notifications for new messages
                            </p>
                          </div>
                          <Switch id="inAppMessages" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="inAppTasks" className="font-medium">Tasks & Reminders</Label>
                            <p className="text-sm text-muted-foreground">
                              Show notifications for tasks and reminders
                            </p>
                          </div>
                          <Switch id="inAppTasks" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="inAppAlerts" className="font-medium">System Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                              Show notifications for system alerts and warnings
                            </p>
                          </div>
                          <Switch id="inAppAlerts" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t p-4">
                    <Button onClick={handleSaveSettings}>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* School Information */}
              <TabsContent value="school" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>School Information</CardTitle>
                    <CardDescription>Update your school details and branding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-32 h-32 rounded-lg border flex items-center justify-center bg-muted">
                          <School className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <Button variant="outline" size="sm">Change Logo</Button>
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="schoolName">School Name</Label>
                            <Input id="schoolName" defaultValue="EduSync Academy" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="schoolType">School Type</Label>
                            <Select defaultValue="highschool">
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="primary">Primary School</SelectItem>
                                <SelectItem value="middle">Middle School</SelectItem>
                                <SelectItem value="highschool">High School</SelectItem>
                                <SelectItem value="college">College/University</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="schoolEmail">Email</Label>
                            <Input id="schoolEmail" type="email" defaultValue="info@edusync.example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="schoolPhone">Phone</Label>
                            <Input id="schoolPhone" type="tel" defaultValue="+1 (555) 987-6543" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="schoolAddress">Address</Label>
                          <Textarea 
                            id="schoolAddress" 
                            defaultValue="123 Education Lane, Learning City, ED 12345"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="academicYear">Current Academic Year</Label>
                            <Select defaultValue="2025">
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2024">2024-2025</SelectItem>
                                <SelectItem value="2025">2025-2026</SelectItem>
                                <SelectItem value="2026">2026-2027</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="currentTerm">Current Term</Label>
                            <Select defaultValue="term2">
                              <SelectTrigger>
                                <SelectValue placeholder="Select term" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="term1">Term 1</SelectItem>
                                <SelectItem value="term2">Term 2</SelectItem>
                                <SelectItem value="term3">Term 3</SelectItem>
                                <SelectItem value="summer">Summer Term</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t p-4">
                    <Button onClick={handleSaveSettings}>Save School Info</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Appearance Settings */}
              <TabsContent value="appearance" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how the system looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Theme</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-16 bg-background rounded-md border"></div>
                          <span className="text-sm font-medium">Light</span>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-16 bg-zinc-800 rounded-md border border-zinc-700"></div>
                          <span className="text-sm font-medium">Dark</span>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-16 bg-gradient-to-r from-background to-zinc-800 rounded-md border"></div>
                          <span className="text-sm font-medium">System</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Accent Color</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                        <div className="border rounded-lg p-2 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-8 bg-blue-600 rounded-md"></div>
                          <span className="text-xs font-medium">Blue</span>
                        </div>
                        <div className="border rounded-lg p-2 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-8 bg-purple-600 rounded-md"></div>
                          <span className="text-xs font-medium">Purple</span>
                        </div>
                        <div className="border rounded-lg p-2 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-8 bg-green-600 rounded-md"></div>
                          <span className="text-xs font-medium">Green</span>
                        </div>
                        <div className="border rounded-lg p-2 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-8 bg-amber-600 rounded-md"></div>
                          <span className="text-xs font-medium">Orange</span>
                        </div>
                        <div className="border rounded-lg p-2 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-8 bg-red-600 rounded-md"></div>
                          <span className="text-xs font-medium">Red</span>
                        </div>
                        <div className="border rounded-lg p-2 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-8 bg-gray-600 rounded-md"></div>
                          <span className="text-xs font-medium">Gray</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Layout</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="compactMode" className="font-medium">Compact Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Use a more compact layout to fit more content on screen
                            </p>
                          </div>
                          <Switch id="compactMode" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="animations" className="font-medium">Interface Animations</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable animations for a smoother experience
                            </p>
                          </div>
                          <Switch id="animations" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="roundedCorners" className="font-medium">Rounded Corners</Label>
                            <p className="text-sm text-muted-foreground">
                              Adjust the roundness of UI elements
                            </p>
                          </div>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t p-4">
                    <Button onClick={handleSaveSettings}>Save Appearance</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* System Settings */}
              <TabsContent value="system" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure system-wide settings and maintenance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-medium">Database Backup</h4>
                            <p className="text-sm text-muted-foreground">
                              Last backup: April 28, 2025, 10:42 PM
                            </p>
                          </div>
                          <Button variant="outline" onClick={handleBackupDatabase} className="gap-2">
                            <Cloud className="h-4 w-4" />
                            Backup Now
                          </Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-medium">Automatic Backups</h4>
                            <p className="text-sm text-muted-foreground">
                              Schedule regular database backups
                            </p>
                          </div>
                          <Select defaultValue="daily">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="off">Disabled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-medium">Data Retention</h4>
                            <p className="text-sm text-muted-foreground">
                              Set how long to keep old data
                            </p>
                          </div>
                          <Select defaultValue="2years">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6months">6 Months</SelectItem>
                              <SelectItem value="1year">1 Year</SelectItem>
                              <SelectItem value="2years">2 Years</SelectItem>
                              <SelectItem value="5years">5 Years</SelectItem>
                              <SelectItem value="forever">Forever</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">System Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="timezone" className="font-medium">Timezone</Label>
                            <p className="text-sm text-muted-foreground">
                              Set the system default timezone
                            </p>
                          </div>
                          <Select defaultValue="utc-5">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                              <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                              <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                              <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                              <SelectItem value="utc+0">UTC</SelectItem>
                              <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="dateFormat" className="font-medium">Date Format</Label>
                            <p className="text-sm text-muted-foreground">
                              Set the system default date format
                            </p>
                          </div>
                          <Select defaultValue="mdy">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="language" className="font-medium">System Language</Label>
                            <p className="text-sm text-muted-foreground">
                              Set the default system language
                            </p>
                          </div>
                          <Select defaultValue="en">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="zh">Chinese</SelectItem>
                              <SelectItem value="ar">Arabic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Maintenance</h3>
                      <div className="space-y-4">
                        <div className="border rounded-md p-4 bg-blue-50 dark:bg-blue-950">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1.5">
                              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">System Information</h4>
                              <div className="text-sm space-y-1 mt-1">
                                <p>Version: 3.5.2</p>
                                <p>Last Updated: April 15, 2025</p>
                                <p>Server Status: Operational</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Check for Updates
                          </Button>
                          <Button variant="outline" className="gap-2 text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            Purge Cache
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <HelpCircle className="h-4 w-4" />
                            System Diagnostics
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t p-4">
                    <Button onClick={handleSaveSettings}>Save System Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </AdminSidebar>
  );
};

export default SettingsPage;
