
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/main-layout";

const UnpaidFeesPage = () => {
  const { user, profile } = useAuth();
  
  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto py-12">
        <Card className="border-destructive/50">
          <CardHeader className="bg-destructive/10 border-b border-destructive/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <CardTitle>Access Restricted</CardTitle>
            </div>
            <CardDescription className="text-destructive/80">
              Your access to the student dashboard is currently limited
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-lg font-semibold mb-2">Unpaid School Fees</h3>
              <p className="text-muted-foreground">
                Our records indicate that your school fees for the current term have not been paid.
                Access to the student dashboard and learning resources are available only after 
                payment confirmation.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What should I do?</h3>
              <ul className="space-y-3 list-disc pl-5">
                <li>Contact the school finance office to make a payment</li>
                <li>If you've already made a payment, please allow 24-48 hours for processing</li>
                <li>Bring your payment receipt to the school administration for verification</li>
                <li>For payment plans or financial assistance, please contact the bursar's office</li>
              </ul>
            </div>
            
            {profile && (
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-2">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span> {profile.first_name} {profile.last_name}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Student ID:</span> {user?.id.slice(0, 8)}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/parent/payments">
                <DollarSign className="mr-2 h-4 w-4" />
                Make a Payment
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="ghost" asChild className="w-full sm:w-auto">
              <Link to="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UnpaidFeesPage;
