
import { useState } from "react";
import { motion } from "framer-motion";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Bell, Lock, User, Shield, LogOut, UserCog, Mail, Clock, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  
  // Student profile data (mock)
  const [profile, setProfile] = useState({
    id: "ST20231045",
    name: "James Smith",
    email: "james.smith@example.com",
    phone: "+1 (555) 123-4567",
    grade: "10th Grade",
    section: "A",
    avatar: ""
  });
  
  // Notification settings (mock)
  const [notifications, setNotifications] = useState({
    emailAssignments: true,
    emailMessages: false,
    pushAssignments: true,
    pushMessages: true,
    pushExams: true,
    pushGrades: true,
    dailyDigest: false,
    reminders: true,
  });
  
  // Academic info (mock)
  const academicInfo = {
    studentId: "ST20231045",
    academicYear: "2024-2025",
    gradeLevel: "10th Grade",
    homeroom: "Room 203",
    enrollmentDate: "August 15, 2023",
    program: "Science Track",
    counselor: "Mrs. Patricia Johnson",
    parentContact: "Robert & Mary Smith"
  };
  
  // Handler for saving profile changes
  const saveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    });
  };
  
  // Handler for saving notification settings
  const saveNotificationSettings = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been updated."
    });
  };
  
  // Handler for changing password
  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully."
    });
  };
  
  // Update notification preferences
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  return (
    <StudentSidebar>
      <div className="container py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[600px]">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4 hidden md:inline" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4 hidden md:inline" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4 hidden md:inline" />
                <span>Password</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <UserCog className="h-4 w-4 hidden md:inline" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center gap-2">
                <Shield className="h-4 w-4 hidden md:inline" />
                <span>Academic</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your personal information and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="text-2xl">
                          {profile.name.split(' ').map(name => name[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={profile.name} 
                            onChange={(e) => setProfile({...profile, name: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID</Label>
                          <Input id="studentId" value={profile.id} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={profile.email} 
                            onChange={(e) => setProfile({...profile, email: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            value={profile.phone} 
                            onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="grade">Grade</Label>
                          <Input id="grade" value={profile.grade} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="section">Section</Label>
                          <Input id="section" value={profile.section} disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium flex items-center mb-4">
                      <Mail className="h-4 w-4 mr-2" /> Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-assignments">Assignment Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new and graded assignments
                          </p>
                        </div>
                        <Switch
                          id="email-assignments"
                          checked={notifications.emailAssignments}
                          onCheckedChange={() => toggleNotification('emailAssignments')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-messages">Message Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get emails when you receive new messages
                          </p>
                        </div>
                        <Switch
                          id="email-messages"
                          checked={notifications.emailMessages}
                          onCheckedChange={() => toggleNotification('emailMessages')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium flex items-center mb-4">
                      <Bell className="h-4 w-4 mr-2" /> Push Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-assignments">Assignment Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications for assignment deadlines
                          </p>
                        </div>
                        <Switch
                          id="push-assignments"
                          checked={notifications.pushAssignments}
                          onCheckedChange={() => toggleNotification('pushAssignments')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-messages">Messages</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified of new messages immediately
                          </p>
                        </div>
                        <Switch
                          id="push-messages"
                          checked={notifications.pushMessages}
                          onCheckedChange={() => toggleNotification('pushMessages')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-exams">Exam Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get alerts about upcoming exams
                          </p>
                        </div>
                        <Switch
                          id="push-exams"
                          checked={notifications.pushExams}
                          onCheckedChange={() => toggleNotification('pushExams')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-grades">Grade Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications when new grades are posted
                          </p>
                        </div>
                        <Switch
                          id="push-grades"
                          checked={notifications.pushGrades}
                          onCheckedChange={() => toggleNotification('pushGrades')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium flex items-center mb-4">
                      <Clock className="h-4 w-4 mr-2" /> Schedule & Frequency
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="daily-digest">Daily Digest</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a daily summary instead of individual notifications
                          </p>
                        </div>
                        <Switch
                          id="daily-digest"
                          checked={notifications.dailyDigest}
                          onCheckedChange={() => toggleNotification('dailyDigest')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reminders">Class Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notifications 15 minutes before each class
                          </p>
                        </div>
                        <Switch
                          id="reminders"
                          checked={notifications.reminders}
                          onCheckedChange={() => toggleNotification('reminders')}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveNotificationSettings}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>Update your password and security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={changePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" required />
                    </div>
                    <div className="pt-4">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </form>
                  
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Account Security</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recovery-email">Recovery Email</Label>
                        <Input id="recovery-email" type="email" defaultValue={profile.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="security-question">Security Question</Label>
                        <Input id="security-question" value="What was your first pet's name?" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="security-answer">Security Answer</Label>
                        <Input id="security-answer" type="password" value="************" disabled />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Appearance Tab */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize how the app looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Theme</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Choose your preferred color theme for the application
                      </p>
                      <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <span className="text-sm">Toggle light/dark mode</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Accessibility</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="larger-text">Larger Text</Label>
                          <p className="text-sm text-muted-foreground">
                            Increase text size throughout the application
                          </p>
                        </div>
                        <Switch id="larger-text" defaultChecked={false} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reduce-motion">Reduce Motion</Label>
                          <p className="text-sm text-muted-foreground">
                            Minimize animations and transitions
                          </p>
                        </div>
                        <Switch id="reduce-motion" defaultChecked={false} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="high-contrast">High Contrast</Label>
                          <p className="text-sm text-muted-foreground">
                            Enhance text visibility with higher contrast
                          </p>
                        </div>
                        <Switch id="high-contrast" defaultChecked={false} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Academic Tab */}
            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>View your academic details and enrollment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {Object.entries(academicInfo).map(([key, value]) => (
                      <div key={key} className="pb-2 border-b">
                        <dt className="text-sm font-medium text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </dt>
                        <dd className="mt-1 text-base">{value}</dd>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Additional Actions</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Request Transcript
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Update Parent Information
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-red-500">Account Management</CardTitle>
                  <CardDescription>Manage your account status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Sign out from this device
                      </p>
                      <Button variant="outline" className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
                      </Button>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground mb-4">
                        Log out from all devices
                      </p>
                      <Button variant="destructive" className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>Log Out All Devices</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </StudentSidebar>
  );
};

export default SettingsPage;
