
import { useState } from "react";
import { motion } from "framer-motion";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, Search, Phone, Video } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Sample data for messages
const messageThreads = [
  {
    id: 1,
    type: "teacher",
    sender: {
      name: "Prof. Sarah Johnson",
      avatar: "",
      subject: "Mathematics",
      initials: "SJ",
    },
    unread: 2,
    lastMessage: {
      text: "I've uploaded some sample questions for the upcoming quiz on quadratic equations.",
      time: new Date(2025, 4, 25, 14, 30)
    },
    messages: [
      {
        id: 101,
        sender: "Prof. Sarah Johnson",
        isMe: false,
        text: "Hello James, I wanted to discuss your recent assignment submission.",
        time: new Date(2025, 4, 24, 10, 15),
        read: true
      },
      {
        id: 102,
        sender: "Me",
        isMe: true,
        text: "Hi Professor, thank you for reaching out. Is there a problem with my submission?",
        time: new Date(2025, 4, 24, 10, 30),
        read: true
      },
      {
        id: 103,
        sender: "Prof. Sarah Johnson",
        isMe: false,
        text: "Not at all! Your solution to problem #3 was particularly creative. I'd like to discuss it further in class if you're comfortable.",
        time: new Date(2025, 4, 24, 11, 45),
        read: true
      },
      {
        id: 104,
        sender: "Me",
        isMe: true,
        text: "That would be great! I'd be happy to discuss it.",
        time: new Date(2025, 4, 25, 9, 20),
        read: true
      },
      {
        id: 105,
        sender: "Prof. Sarah Johnson",
        isMe: false,
        text: "I've uploaded some sample questions for the upcoming quiz on quadratic equations.",
        time: new Date(2025, 4, 25, 14, 30),
        read: false
      },
      {
        id: 106,
        sender: "Prof. Sarah Johnson",
        isMe: false,
        text: "Please try to work through them and let me know if you have any questions.",
        time: new Date(2025, 4, 25, 14, 32),
        read: false,
        attachment: {
          name: "quadratic_practice.pdf",
          type: "pdf",
          size: "1.2 MB"
        }
      }
    ]
  },
  {
    id: 2,
    type: "teacher",
    sender: {
      name: "Dr. Michael Chen",
      avatar: "",
      subject: "Physics",
      initials: "MC",
    },
    unread: 0,
    lastMessage: {
      text: "The lab report format has been updated. Please check the new template.",
      time: new Date(2025, 4, 24, 16, 15)
    },
    messages: [
      {
        id: 201,
        sender: "Dr. Michael Chen",
        isMe: false,
        text: "The lab report format has been updated. Please check the new template.",
        time: new Date(2025, 4, 24, 16, 15),
        read: true,
        attachment: {
          name: "lab_report_template.docx",
          type: "doc",
          size: "524 KB"
        }
      }
    ]
  },
  {
    id: 3,
    type: "teacher",
    sender: {
      name: "Ms. Emily Rodriguez",
      avatar: "",
      subject: "Literature",
      initials: "ER",
    },
    unread: 1,
    lastMessage: {
      text: "Your analysis of 'To Kill a Mockingbird' showed excellent critical thinking.",
      time: new Date(2025, 4, 25, 11, 20)
    },
    messages: [
      {
        id: 301,
        sender: "Ms. Emily Rodriguez",
        isMe: false,
        text: "Your analysis of 'To Kill a Mockingbird' showed excellent critical thinking.",
        time: new Date(2025, 4, 25, 11, 20),
        read: false
      }
    ]
  },
  {
    id: 4,
    type: "classmate",
    sender: {
      name: "Alex Wong",
      avatar: "",
      subject: "",
      initials: "AW",
    },
    unread: 0,
    lastMessage: {
      text: "Are we still meeting at the library at 4pm to study for the history test?",
      time: new Date(2025, 4, 23, 13, 45)
    },
    messages: [
      {
        id: 401,
        sender: "Alex Wong",
        isMe: false,
        text: "Hey James, do you have notes from yesterday's biology class? I was out sick.",
        time: new Date(2025, 4, 22, 17, 30),
        read: true
      },
      {
        id: 402,
        sender: "Me",
        isMe: true,
        text: "Yes I do! I'll send them to you. We covered photosynthesis and cellular respiration.",
        time: new Date(2025, 4, 22, 18, 05),
        read: true
      },
      {
        id: 403,
        sender: "Alex Wong",
        isMe: false,
        text: "Thanks so much! Are we still meeting at the library at 4pm to study for the history test?",
        time: new Date(2025, 4, 23, 13, 45),
        read: true
      }
    ]
  },
  {
    id: 5,
    type: "admin",
    sender: {
      name: "School Admin",
      avatar: "",
      subject: "Administrative",
      initials: "SA",
    },
    unread: 0,
    lastMessage: {
      text: "Reminder: Career Day is scheduled for next Friday. Please register for sessions by Wednesday.",
      time: new Date(2025, 4, 20, 9, 0)
    },
    messages: [
      {
        id: 501,
        sender: "School Admin",
        isMe: false,
        text: "Reminder: Career Day is scheduled for next Friday. Please register for sessions by Wednesday.",
        time: new Date(2025, 4, 20, 9, 0),
        read: true
      }
    ]
  }
];

const MessagePage = () => {
  const [activeThread, setActiveThread] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  // Get the active thread data
  const thread = activeThread 
    ? messageThreads.find(thread => thread.id === activeThread) 
    : null;

  // Filter threads based on search and tabs
  const filteredThreads = messageThreads.filter(thread => {
    const matchesSearch = thread.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "unread" && thread.unread > 0) ||
      (activeTab === "teachers" && thread.type === "teacher") ||
      (activeTab === "classmates" && thread.type === "classmate") ||
      (activeTab === "admin" && thread.type === "admin");
    
    return matchesSearch && matchesTab;
  });

  // Handle sending a message
  const sendMessage = () => {
    if (!messageText.trim() || !thread) return;

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${thread.sender.name}.`
    });
    
    setMessageText("");
  };

  // Format time for display
  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      return format(date, 'p'); // e.g. '3:30 PM'
    } else if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d'); // e.g. 'May 25'
    }
  };

  return (
    <StudentSidebar>
      <div className="container h-[calc(100vh-4rem)] py-6 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Messages</h1>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="hidden md:flex">
                Compose New
              </Button>
              <Button size="sm" variant="ghost" className="md:hidden">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
            {/* Left sidebar - message threads */}
            <motion.div 
              className={`md:w-1/3 lg:w-1/4 bg-background border rounded-lg overflow-hidden flex flex-col ${activeThread ? 'hidden md:flex' : 'flex'}`}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-3 border-b">
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="teachers">Teachers</TabsTrigger>
                    <TabsTrigger value="classmates">Peers</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <ScrollArea className="flex-1">
                {filteredThreads.length > 0 ? (
                  filteredThreads.map(thread => (
                    <motion.div
                      key={thread.id}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.025)" }}
                      className={`p-3 border-b cursor-pointer ${activeThread === thread.id ? 'bg-muted/50' : ''} ${thread.unread > 0 ? 'bg-primary/5' : ''}`}
                      onClick={() => setActiveThread(thread.id)}
                    >
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={thread.sender.avatar} />
                          <AvatarFallback>{thread.sender.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate">{thread.sender.name}</div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatMessageTime(thread.lastMessage.time)}
                            </div>
                          </div>
                          {thread.sender.subject && (
                            <div className="text-xs text-muted-foreground">{thread.sender.subject}</div>
                          )}
                          <div className="text-sm truncate mt-1">{thread.lastMessage.text}</div>
                          {thread.unread > 0 && (
                            <div className="flex justify-between items-center mt-1">
                              <Badge variant="default" className="text-[10px] h-5">{thread.unread} new</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    No messages found
                  </div>
                )}
              </ScrollArea>
            </motion.div>

            {/* Right side - message content */}
            {activeThread ? (
              <motion.div 
                className="flex-1 flex flex-col border rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {thread && (
                  <>
                    {/* Thread Header */}
                    <div className="p-4 border-b flex justify-between items-center bg-background">
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="md:hidden"
                          onClick={() => setActiveThread(null)}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </Button>
                        <Avatar>
                          <AvatarImage src={thread.sender.avatar} />
                          <AvatarFallback>{thread.sender.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{thread.sender.name}</div>
                          {thread.sender.subject && (
                            <div className="text-xs text-muted-foreground">{thread.sender.subject}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {thread.messages.map((message) => (
                          <motion.div
                            key={message.id}
                            className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <div className={`max-w-[80%] ${message.isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                              {!message.isMe && (
                                <div className="font-medium text-xs mb-1">{message.sender}</div>
                              )}
                              <p className="text-sm">{message.text}</p>
                              
                              {message.attachment && (
                                <div className="mt-2 p-2 bg-background/20 rounded flex items-center text-xs">
                                  <Paperclip className="h-3 w-3 mr-2" />
                                  <span>{message.attachment.name}</span>
                                  <span className="ml-2 opacity-70">({message.attachment.size})</span>
                                </div>
                              )}
                              
                              <div className="text-xs mt-1 opacity-70 text-right">
                                {format(message.time, 'p')}
                                {!message.read && message.isMe && <span className="ml-1">✓</span>}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    {/* Message Input */}
                    <div className="p-3 border-t bg-background">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Textarea 
                          placeholder="Type a message..." 
                          className="min-h-[2.5rem] max-h-32"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={sendMessage}
                          disabled={!messageText.trim()}
                          size="icon" 
                          className="shrink-0"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center border rounded-lg">
                <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle className="text-center">Select a conversation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    <p>Choose a message thread from the left to start chatting</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </StudentSidebar>
  );
};

export default MessagePage;
