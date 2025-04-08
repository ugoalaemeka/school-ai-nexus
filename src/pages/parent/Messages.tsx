
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Search, Plus, Send, PaperclipIcon } from "lucide-react";

export default function ParentMessages() {
  const [activeConversation, setActiveConversation] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: "1",
      name: "Ellen Smith",
      role: "Math Teacher",
      lastMessage: "Sarah did exceptionally well on her latest algebra test.",
      time: "2h ago",
      unread: false,
      messages: [
        { id: "m1", sender: "Ellen Smith", text: "Hello Mr. Johnson, I wanted to share some great news about Sarah.", time: "Yesterday, 2:30 PM" },
        { id: "m2", sender: "Ellen Smith", text: "Sarah did exceptionally well on her latest algebra test. I'm very impressed with her progress.", time: "Yesterday, 2:32 PM" },
        { id: "m3", sender: "You", text: "That's wonderful to hear! We've been working on her math skills at home as well.", time: "Yesterday, 4:15 PM" },
        { id: "m4", sender: "Ellen Smith", text: "It definitely shows. If she maintains this level of performance, she'll be well-prepared for advanced math next year.", time: "Today, 9:45 AM" },
      ]
    },
    {
      id: "2",
      name: "James Wilson",
      role: "Principal",
      lastMessage: "Please note that next Tuesday will be a teacher development day.",
      time: "Yesterday",
      unread: false,
      messages: [
        { id: "m1", sender: "James Wilson", text: "Dear Parents, Please note that next Tuesday will be a teacher development day. Students will be dismissed at 12pm.", time: "Yesterday, 10:15 AM" },
      ]
    },
    {
      id: "3",
      name: "Patricia Lee",
      role: "Science Teacher",
      lastMessage: "Just a reminder about the science project due next week.",
      time: "2d ago",
      unread: true,
      messages: [
        { id: "m1", sender: "Patricia Lee", text: "Hello Mr. Johnson, just a reminder about the science project due next week. Sarah needs to bring her materials tomorrow.", time: "2 days ago, 3:20 PM" },
      ]
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "Physical Education",
      lastMessage: "Sarah has been selected for the school volleyball team!",
      time: "3d ago",
      unread: true,
      messages: [
        { id: "m1", sender: "Michael Brown", text: "Good news! Sarah has been selected for the school volleyball team! Practice starts next Monday after school.", time: "3 days ago, 1:45 PM" },
      ]
    },
  ];
  
  const activeConvo = conversations.find(c => c.id === activeConversation);

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;
    // In a real app, you would send this message to your backend
    setMessageInput("");
  };

  return (
    <DashboardLayout userRole="parent">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with your child's teachers and school administration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
          {/* Conversation List */}
          <Card className="md:col-span-1">
            <CardHeader className="space-y-1 p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Conversations</CardTitle>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all">
                <TabsList className="mx-4 mb-2 w-[calc(100%-2rem)]">
                  <TabsTrigger className="flex-1" value="all">All</TabsTrigger>
                  <TabsTrigger className="flex-1" value="unread">Unread</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="m-0">
                  <div className="max-h-[calc(100vh-350px)] overflow-y-auto">
                    {conversations.map((conversation) => (
                      <div 
                        key={conversation.id}
                        className={`flex gap-3 p-4 cursor-pointer hover:bg-muted/50 ${activeConversation === conversation.id ? 'bg-muted/50' : ''}`}
                        onClick={() => setActiveConversation(conversation.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <User className="h-6 w-6" />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <div className="font-medium flex items-center">
                              {conversation.name}
                              {conversation.unread && (
                                <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.time}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{conversation.role}</div>
                          <p className="text-sm truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="unread" className="m-0">
                  <div className="max-h-[calc(100vh-350px)] overflow-y-auto">
                    {conversations.filter(c => c.unread).map((conversation) => (
                      <div 
                        key={conversation.id}
                        className={`flex gap-3 p-4 cursor-pointer hover:bg-muted/50 ${activeConversation === conversation.id ? 'bg-muted/50' : ''}`}
                        onClick={() => setActiveConversation(conversation.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <User className="h-6 w-6" />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <div className="font-medium flex items-center">
                              {conversation.name}
                              <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.time}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{conversation.role}</div>
                          <p className="text-sm truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Message Content */}
          <Card className="md:col-span-2 flex flex-col">
            {activeConvo ? (
              <>
                <CardHeader className="p-4 border-b flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <User className="h-6 w-6" />
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{activeConvo.name}</CardTitle>
                      <CardDescription>{activeConvo.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {activeConvo.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex gap-3 ${message.sender === 'You' ? 'justify-end' : ''}`}
                      >
                        {message.sender !== 'You' && (
                          <Avatar className="h-8 w-8 mt-1">
                            <User className="h-5 w-5" />
                          </Avatar>
                        )}
                        <div className={`max-w-[70%] ${message.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                          <div className="flex justify-between items-center gap-4 mb-1">
                            <span className="font-medium text-sm">{message.sender}</span>
                            <span className="text-xs opacity-70">{message.time}</span>
                          </div>
                          <p className="text-sm">{message.text}</p>
                        </div>
                        {message.sender === 'You' && (
                          <Avatar className="h-8 w-8 mt-1">
                            <User className="h-5 w-5" />
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <PaperclipIcon className="h-4 w-4" />
                      </Button>
                      <Input 
                        placeholder="Type your message..." 
                        className="flex-1"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} size="icon" className="rounded-full">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground mb-4">Choose a conversation from the list or start a new one</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Conversation
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
