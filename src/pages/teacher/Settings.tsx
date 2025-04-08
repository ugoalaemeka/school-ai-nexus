
import { TeacherLayout } from "@/components/layout/teacher-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  Clock, 
  History, 
  Laptop, 
  Lock, 
  Save, 
  User, 
  UserCheck 
} from "lucide-react";

const TeacherSettings = () => {
  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-background">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2 data-[state=active]:bg-background">
              <Lock className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-background">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2 data-[state=active]:bg-background">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar className="h-24 w-24">
                      <AvatarImage alt="Teacher Avatar" />
                      <AvatarFallback className="text-2xl">MJ</AvatarFallback>
                    </Avatar>
                    <Button size="sm">Change Photo</Button>
                  </div>
                  
                  <div className="flex-1 grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Mary" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Johnson" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="mary.johnson@school.edu" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subjects">Subjects Taught</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-primary">Mathematics</Badge>
                        <Badge className="bg-secondary">Algebra</Badge>
                        <Badge className="bg-accent">Geometry</Badge>
                        <Button variant="outline" size="sm" className="h-6">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Subject
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea 
                        id="bio" 
                        rows={4} 
                        defaultValue="Mathematics teacher with 10+ years of experience teaching Algebra, Geometry, and Advanced Math. M.Ed. from State University with specialization in STEM education."
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Teaching Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <UserCheck className="h-4 w-4" />
                        <span className="text-sm">Active Classes</span>
                      </div>
                      <p className="text-2xl font-bold">3</p>
                      <div className="text-sm text-muted-foreground">Grade 10-A, 10-B, 11</div>
                    </div>
                    
                    <div className="border rounded-md p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Subjects</span>
                      </div>
                      <p className="text-2xl font-bold">4</p>
                      <div className="text-sm text-muted-foreground">Math, Algebra, Geometry, Statistics</div>
                    </div>
                    
                    <div className="border rounded-md p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Weekly Hours</span>
                      </div>
                      <p className="text-2xl font-bold">28</p>
                      <div className="text-sm text-muted-foreground">Teaching hours per week</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue="mathematics">
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="humanities">Humanities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="teacher">
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="department-head">Department Head</SelectItem>
                        <SelectItem value="coordinator">Coordinator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="2fa">Two-Factor Authentication</Label>
                      <Switch id="2fa" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="session-timeout">Automatic Session Timeout</Label>
                      <Switch id="session-timeout" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after 30 minutes of inactivity for security.
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Login History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md divide-y">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="p-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${i === 0 ? 'bg-green-500/10' : 'bg-muted'}`}>
                            {i === 0 ? (
                              <Laptop className="h-4 w-4 text-green-500" />
                            ) : (
                              <History className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {i === 0 ? 'Current session' : `Login from ${i === 1 ? 'Chrome / Windows' : 'Mobile / iOS'}`}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {i === 0 ? 'April 8, 2025 at 10:30 AM' : `April ${7-i}, 2025 at ${9-i}:${15+i*10} AM`}
                            </div>
                          </div>
                        </div>
                        <Badge variant={i === 0 ? 'default' : 'outline'}>
                          {i === 0 ? 'Active Now' : 'Logged Out'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full">View Complete Login History</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    
                    <div className="space-y-2 border-b pb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="email-messages" className="font-medium">New Messages</Label>
                          <p className="text-sm text-muted-foreground">Receive emails when you get new messages</p>
                        </div>
                        <Switch id="email-messages" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2 border-b pb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="email-assignment" className="font-medium">Assignment Submissions</Label>
                          <p className="text-sm text-muted-foreground">Get notified when students submit assignments</p>
                        </div>
                        <Switch id="email-assignment" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2 border-b pb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="email-schedule" className="font-medium">Schedule Changes</Label>
                          <p className="text-sm text-muted-foreground">Get notified about timetable or schedule changes</p>
                        </div>
                        <Switch id="email-schedule" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="email-announcements" className="font-medium">School Announcements</Label>
                          <p className="text-sm text-muted-foreground">Receive general school announcements</p>
                        </div>
                        <Switch id="email-announcements" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="office-hours">Office Hours</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="monday">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monday">Monday</SelectItem>
                            <SelectItem value="tuesday">Tuesday</SelectItem>
                            <SelectItem value="wednesday">Wednesday</SelectItem>
                            <SelectItem value="thursday">Thursday</SelectItem>
                            <SelectItem value="friday">Friday</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="time" defaultValue="14:30" className="w-[140px]" />
                        <Input type="time" defaultValue="16:00" className="w-[140px]" />
                      </div>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Plus className="h-3 w-3 mr-1" />
                        Add More Hours
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferred-days">Preferred Teaching Days</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-primary">Monday</Badge>
                        <Badge className="bg-primary">Tuesday</Badge>
                        <Badge className="bg-muted/70 text-muted-foreground">Wednesday</Badge>
                        <Badge className="bg-primary">Thursday</Badge>
                        <Badge className="bg-primary">Friday</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Click to toggle preference</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Weekly Schedule</Label>
                    <div className="border rounded-md overflow-hidden">
                      <div className="grid grid-cols-6 divide-x bg-muted/50">
                        <div className="p-2 text-center text-sm font-medium">Time</div>
                        <div className="p-2 text-center text-sm font-medium">Monday</div>
                        <div className="p-2 text-center text-sm font-medium">Tuesday</div>
                        <div className="p-2 text-center text-sm font-medium">Wednesday</div>
                        <div className="p-2 text-center text-sm font-medium">Thursday</div>
                        <div className="p-2 text-center text-sm font-medium">Friday</div>
                      </div>
                      
                      {['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00'].map((time, i) => (
                        <div key={i} className="grid grid-cols-6 divide-x border-t">
                          <div className="p-2 text-center text-xs">{time}</div>
                          {[1, 2, 3, 4, 5].map((day) => (
                            <div 
                              key={day} 
                              className={`p-2 text-center text-xs ${
                                // Add some example classes
                                (day === 1 && (i === 1 || i === 2)) ? 'bg-primary/10 text-primary' :
                                (day === 2 && (i === 3 || i === 4)) ? 'bg-secondary/10 text-secondary' :
                                (day === 4 && (i === 0 || i === 1)) ? 'bg-accent/10 text-accent' :
                                (day === 5 && (i === 2 || i === 3)) ? 'bg-primary/10 text-primary' :
                                ''
                              }`}
                            >
                              {/* Sample classes */}
                              {(day === 1 && i === 1) ? '10-A Math' : ''}
                              {(day === 1 && i === 2) ? '10-A Math' : ''}
                              {(day === 2 && i === 3) ? '11 Algebra' : ''}
                              {(day === 2 && i === 4) ? '11 Algebra' : ''}
                              {(day === 4 && i === 0) ? '10-B Math' : ''}
                              {(day === 4 && i === 1) ? '10-B Math' : ''}
                              {(day === 5 && i === 2) ? '10-A Geom.' : ''}
                              {(day === 5 && i === 3) ? '10-A Geom.' : ''}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">This is a read-only view. Schedule changes must be requested through administration.</p>
                  </div>
                  
                  <div className="pt-2">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Schedule Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
};

export default TeacherSettings;
