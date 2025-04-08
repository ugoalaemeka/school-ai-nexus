
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { User, Reply } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentMessagesProps {
  isLoading: boolean;
  showAll?: boolean;
}

const messageData = [
  {
    id: "msg-001",
    sender: "Mrs. Ellen Smith",
    role: "Math Teacher",
    message: "Sarah did exceptionally well on her latest algebra test. I'm very impressed with her progress.",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "msg-002",
    sender: "Mr. James Wilson",
    role: "Principal",
    message: "Please note that next Tuesday will be a teacher development day. Students will be dismissed at 12pm.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "msg-003",
    sender: "Ms. Patricia Lee",
    role: "Science Teacher",
    message: "Just a reminder about the science project due next week. Sarah needs to bring her materials tomorrow.",
    time: "2 days ago",
    read: false,
  },
  {
    id: "msg-004",
    sender: "Coach Michael Brown",
    role: "Physical Education",
    message: "Sarah has been selected for the school volleyball team! Practice starts next Monday after school.",
    time: "3 days ago",
    read: false,
  },
];

export function RecentMessages({ isLoading, showAll = false }: RecentMessagesProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayData = showAll ? messageData : messageData.slice(0, 3);

  return (
    <div className="space-y-6">
      {displayData.map((message) => (
        <div key={message.id} className="flex gap-4">
          <Avatar className="h-10 w-10">
            <User className="h-6 w-6" />
          </Avatar>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <div className="font-medium flex items-center gap-2">
                {message.sender}
                {!message.read && (
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{message.time}</span>
            </div>
            <div className="text-xs text-muted-foreground">{message.role}</div>
            <p className="text-sm line-clamp-2">{message.message}</p>
            <div className="pt-1">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/parent/messages/${message.id}`}>
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {showAll && messageData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <User className="h-6 w-6" />
          </div>
          <p>No messages yet</p>
          <Button variant="outline" className="mt-4" size="sm">
            Start a Conversation
          </Button>
        </div>
      )}
    </div>
  );
}
