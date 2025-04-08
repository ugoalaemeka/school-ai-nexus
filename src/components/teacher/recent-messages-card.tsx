
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Reply } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentMessagesCardProps {
  isLoading?: boolean;
}

export function RecentMessagesCard({ isLoading = false }: RecentMessagesCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[180px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const messages = [
    {
      id: 1,
      sender: "Emma Thompson",
      role: "Parent",
      message: "Hi Mrs. Johnson, I'd like to discuss Emma's recent math test results. When would be a good time to meet?",
      time: "1 hour ago",
      unread: true,
      avatar: ""
    },
    {
      id: 2,
      sender: "Principal Williams",
      role: "Admin",
      message: "Please submit your syllabus progress report by Friday. We'll review it in next week's meeting.",
      time: "3 hours ago",
      unread: false,
      avatar: ""
    },
    {
      id: 3,
      sender: "John Davis",
      role: "Student",
      message: "Mrs. Johnson, I need an extension for the algebra project due to a family emergency.",
      time: "Yesterday",
      unread: false,
      avatar: ""
    }
  ];

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Recent Messages</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">3 New</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`p-3 rounded-lg ${message.unread ? 'bg-primary/5 border border-primary/10' : 'hover:bg-muted/20'}`}>
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">{message.sender.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <div>
                      <span className="font-medium">{message.sender}</span>
                      <Badge variant="outline" className="ml-2 text-xs">{message.role}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-sm line-clamp-2">{message.message}</p>
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="ghost">
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Link to="/teacher/messages">
            <Button className="w-full" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              View All Messages
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
