
import { useState } from "react";
import { ParentLayout } from "@/components/layout/parent-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Smartphone,
  Globe,
  Moon,
  Sun,
  UserCheck,
  Shield,
  Users,
  Save,
  Camera,
  Trash2,
  LogOut
} from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState("");

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleSavePassword = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated.",
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <ParentLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.div variants={fadeIn}>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile, preferences, and account settings</p>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileImage} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">DB</AvatarFallback>
                      </Avatar>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Camera className="h-4 w-4" />
                          Change
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="David" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Brown" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="david.brown@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Home Address</Label>
                        <Input id="address" defaultValue="123 Main Street, Anytown, AN 12345" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Children Information</CardTitle>
                  <CardDescription>
                    Manage your children's accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">ET</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Emma Thompson</p>
                          <p className="text-sm text-muted-foreground">Grade 8-A • ID: 2404875</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">NT</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Noah Thompson</p>
                          <p className="text-sm text-muted-foreground">Grade 5-B • ID: 2404876</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Password Tab */}
            <TabsContent value="password" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password for enhanced security
                  </CardDescription>
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
                  
                  <div className="rounded-lg bg-muted p-4 mt-4">
                    <h4 className="font-medium mb-2">Password Requirements:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Minimum 8 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        At least one uppercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        At least one number
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSavePassword}>Update Password</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>
                    Manage your active login sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/40 rounded-lg">
                    <div>
                      <div className="font-medium">Current Device</div>
                      <div className="text-sm text-muted-foreground">Windows 11 • Chrome • New York, USA</div>
                      <div className="text-xs text-muted-foreground mt-1">Active now</div>
                    </div>
                    <div className="text-green-500 text-sm font-medium">Current Session</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-muted/40 rounded-lg">
                    <div>
                      <div className="font-medium">iPhone 13</div>
                      <div className="text-sm text-muted-foreground">iOS 16 • Safari • New York, USA</div>
                      <div className="text-xs text-muted-foreground mt-1">Last active: 2 hours ago</div>
                    </div>
                    <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out of All Devices
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="email">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-primary" />
                          <span>Email Notifications</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="emailGrades">Grades & Assessments</Label>
                              <p className="text-sm text-muted-foreground">Receive notifications when new grades are posted</p>
                            </div>
                            <Switch id="emailGrades" defaultChecked />
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="emailAttendance">Attendance Updates</Label>
                              <p className="text-sm text-muted-foreground">Get notified of absence or tardiness</p>
                            </div>
                            <Switch id="emailAttendance" defaultChecked />
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="emailEvents">School Events</Label>
                              <p className="text-sm text-muted-foreground">Updates about upcoming school events</p>
                            </div>
                            <Switch id="emailEvents" defaultChecked />
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="emailFees">Fee Payment Reminders</Label>
                              <p className="text-sm text-muted-foreground">Reminders about upcoming or overdue fees</p>
                            </div>
                            <Switch id="emailFees" defaultChecked />
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="emailMessages">New Messages</Label>
                              <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                            </div>
                            <Switch id="emailMessages" defaultChecked />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="sms">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <span>SMS Notifications</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="smsUrgent">Urgent Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive SMS for urgent school announcements</p>
                            </div>
                            <Switch id="smsUrgent" defaultChecked />
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="smsAttendance">Attendance Alerts</Label>
                              <p className="text-sm text-muted-foreground">Immediate notification when child is marked absent</p>
                            </div>
                            <Switch id="smsAttendance" defaultChecked />
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="smsEmergency">Emergency Alerts</Label>
                              <p className="text-sm text-muted-foreground">Emergency notifications from school</p>
                            </div>
                            <Switch id="smsEmergency" defaultChecked />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="inapp">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-primary" />
                          <span>In-App Notifications</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="appAll">All Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive all notifications in the app</p>
                            </div>
                            <Switch id="appAll" defaultChecked />
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="appSound">Notification Sounds</Label>
                              <p className="text-sm text-muted-foreground">Play sound for new notifications</p>
                            </div>
                            <Switch id="appSound" />
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="appBadge">Badge Counter</Label>
                              <p className="text-sm text-muted-foreground">Show notification count on app icon</p>
                            </div>
                            <Switch id="appBadge" defaultChecked />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Communication Frequency</CardTitle>
                  <CardDescription>
                    Control how often you receive communications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailFrequency">Email Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="emailFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time (As they happen)</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newsletterFrequency">School Newsletter</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="newsletterFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="none">Unsubscribe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Preferences</CardTitle>
                  <CardDescription>
                    Customize your app experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Theme Preference</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Sun className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Moon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Language</Label>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-[180px]" id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoLogin">Automatic Login</Label>
                      <p className="text-sm text-muted-foreground">Stay logged in between sessions</p>
                    </div>
                    <Switch id="autoLogin" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <p className="text-sm text-muted-foreground">Set your local timezone for accurate scheduling</p>
                    </div>
                    <Select defaultValue="america_new_york">
                      <SelectTrigger className="w-[220px]" id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america_new_york">America/New York (EDT)</SelectItem>
                        <SelectItem value="america_chicago">America/Chicago (CDT)</SelectItem>
                        <SelectItem value="america_denver">America/Denver (MDT)</SelectItem>
                        <SelectItem value="america_los_angeles">America/Los Angeles (PDT)</SelectItem>
                        <SelectItem value="europe_london">Europe/London (BST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage privacy and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="twoFactor" />
                      <Button variant="outline" size="sm" disabled>Setup</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dataSharing">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow anonymous usage data to improve the app</p>
                    </div>
                    <Switch id="dataSharing" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activityLog">Activity Log</Label>
                      <p className="text-sm text-muted-foreground">Track your login activity and system notifications</p>
                    </div>
                    <Button variant="outline" size="sm">View Log</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-500">Danger Zone</CardTitle>
                  <CardDescription>
                    Actions that can't be undone
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                    <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                      This will permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <div className="mt-4">
                      <Button variant="destructive" size="sm">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </ParentLayout>
  );
};

export default SettingsPage;
