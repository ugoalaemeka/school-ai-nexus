
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface UserPortalCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export const UserPortalCard = ({ icon, title, description, features }: UserPortalCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="space-y-1">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
          Access Portal <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
