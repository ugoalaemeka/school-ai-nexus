
import { TeacherLayout } from "@/components/layout/teacher-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  MailPlus, 
  PaperclipIcon, 
  Search, 
  Send, 
  Users
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const TeacherMessages = () => {
  const { id } = useParams();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(id || null);
  
  const messages = [
    {
      id: "1",
      sender: "Emma Thompson",
      role: "Parent",
      subject: "About Emma's test results",
      preview: "Hi Mrs. Johnson, I'd like to discuss Emma's recent math test results...",
      date: "Today, 10:30 AM",
      unread: true,
      avatar: ""
    },
    {
      id: "2",
      sender: "Principal Williams",
      role: "Admin",
      subject: "Syllabus progress report",
      preview: "Please submit your syllabus progress report by Friday. We'll review it in next week's...",
      date: "Today, 8:15 AM",
      unread: false,
      avatar: ""
    },
    {
      id: "3",
      sender: "John Davis",
      role: "Student",
      subject: "Extension request",
      preview: "Mrs. Johnson, I need an extension for the algebra project due to a family emergency...",
      date: "Yesterday",
      unread: false,
      avatar: ""
    },
    {
      id: "4",
      sender: "Department Head",
      role: "Admin",
      subject: "Upcoming department meeting",
      preview: "This is a reminder about our mathematics department meeting scheduled for next Monday...",
      date: "Apr 5, 2025",
      unread: false,
      avatar: ""
    },
    {
      id: "5",
      sender: "Sarah Miller",
      role: "Parent",
      subject: "Tutoring request",
      preview: "Hello, I was wondering if you could recommend any tutoring options for my daughter Sarah...",
      date: "Apr 3, 2025",
      unread: false,
      avatar: ""
    }
  ];

  // Find the selected message details
  const selectedMessageDetails = messages.find(msg => msg.id === selectedMessage);

  // Conversation threads (example data)
  const conversations = [
    {
      id: "1",
      messages: [
        {
          from: "parent",
          sender: "Emma Thompson",
          content: "Hi Mrs. Johnson, I'd like to discuss Emma's recent math test results. When would be a good time to meet? I'm concerned about her struggles with algebra concepts.",
          time: "Today, 10:30 AM"
        },
        {
          from: "teacher",
          sender: "Mrs. Johnson",
          content: "Hello Mrs. Thompson, I'm available to meet tomorrow after school at 3:30 PM or Thursday morning before classes at 8:00 AM. Emma is doing well overall, but I agree that we should discuss some strategies to help her with algebra.",
          time: "Today, 11:15 AM"
        }
      ]
    },
    {
      id: "2",
      messages: [
        {
          from: "admin",
          sender: "Principal Williams",
          content: "Please submit your syllabus progress report by Friday. We'll review it in next week's department meeting.",
          time: "Today, 8:15 AM"
        }
      ]
    },
    {
      id: "3",
      messages: [
        {
          from: "student",
          sender: "John Davis",
          content: "Mrs. Johnson, I need an extension for the algebra project due to a family emergency. I'll be out of town until Wednesday. Could I submit it next Friday instead?",
          time: "Yesterday, 4:30 PM"
        },
        {
          from: "teacher",
          sender: "Mrs. Johnson",
          content: "Hello John, I'm sorry to hear about your family emergency. Yes, you can have an extension until next Friday. Please take care, and let me know if you need any additional support.",
          time: "Yesterday, 5:45 PM"
        },
        {
          from: "student",
          sender: "John Davis",
          content: "Thank you so much for understanding, Mrs. Johnson. I really appreciate it.",
          time: "Yesterday, 6:10 PM"
        }
      ]
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedMessage);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Communicate with students, parents, and staff</p>
          </div>
          
          <Button>
            <MailPlus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <Card className="lg:col-span-1">
            <CardHeader className="p-4 space-y-3">
              <CardTitle className="text-lg">Inbox</CardTitle>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search messages" className="pl-8" />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="parents">Parents</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <Tabs defaultValue="inbox">
                <TabsList className="w-full justify-between rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="inbox"
                    className="rounded-none flex-1 border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                  >
                    Inbox
                  </TabsTrigger>
                  <TabsTrigger
                    value="sent"
                    className="rounded-none flex-1 border-b-2 border-b-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                  >
                    Sent
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="inbox" className="m-0">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="divide-y">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-4 cursor-pointer hover:bg-muted/40 ${message.id === selectedMessage ? 'bg-muted/70' : ''} ${message.unread ? 'bg-primary/5' : ''}`}
                          onClick={() => setSelectedMessage(message.id)}
                        >
                          <div className="flex gap-3">
                            <Avatar>
                              <AvatarImage src={message.avatar} />
                              <AvatarFallback className="bg-primary/10 text-primary">{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                  <span className="font-medium truncate">{message.sender}</span>
                                  <Badge variant="outline" className="w-fit text-xs mt-0.5">
                                    {message.role}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                                  <Clock className="h-3 w-3" />
                                  <span>{message.date}</span>
                                </div>
                              </div>
                              <h4 className="text-sm font-medium mt-1 truncate">{message.subject}</h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message.preview}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="sent" className="m-0">
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-muted-foreground">
                    <Users className="h-10 w-10 mb-2" />
                    <h3 className="text-lg font-medium">Sent Messages</h3>
                    <p className="text-sm">Messages you've sent will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Message Content */}
          <Card className="lg:col-span-2">
            {selectedMessageDetails ? (
              <>
                <CardHeader className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage src={selectedMessageDetails.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">{selectedMessageDetails.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-semibold">{selectedMessageDetails.sender}</h2>
                          <Badge variant="outline">{selectedMessageDetails.role}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedMessageDetails.subject}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 flex flex-col h-[calc(100vh-320px)]">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-6">
                      {selectedConversation?.messages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.from === 'teacher' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.from === 'teacher' 
                                ? 'bg-primary text-primary-foreground' 
                                : msg.from === 'admin'
                                  ? 'bg-secondary text-secondary-foreground'
                                  : 'bg-muted'
                            }`}
                          >
                            {msg.from !== 'teacher' && (
                              <div className="font-medium text-sm mb-1">{msg.sender}</div>
                            )}
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            <div className={`text-xs mt-1 ${msg.from === 'teacher' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {msg.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="border-t p-4">
                    <div className="flex flex-col gap-4">
                      <Textarea 
                        placeholder="Type your message here..."
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <PaperclipIcon className="h-4 w-4 mr-2" />
                          Attach
                        </Button>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center p-4 text-muted-foreground">
                <MailPlus className="h-16 w-16 mb-4" />
                <h3 className="text-xl font-medium">No message selected</h3>
                <p className="max-w-md mt-2">Select a message from the list to view its contents, or start a new conversation.</p>
                <Button className="mt-4">
                  <MailPlus className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherMessages;
