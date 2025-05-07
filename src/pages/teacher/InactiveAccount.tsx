
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/main-layout";

const InactiveAccountPage = () => {
  const { user, profile, signOut } = useAuth();
  
  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto py-12">
        <Card className="border-warning/50">
          <CardHeader className="bg-warning/10 border-b border-warning/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-warning" />
              <CardTitle>Account Inactive</CardTitle>
            </div>
            <CardDescription className="text-warning/80">
              Your teacher account has not been activated yet
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-lg font-semibold mb-2">Account Pending Approval</h3>
              <p className="text-muted-foreground">
                Your teacher account is currently inactive. This could be because:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>Your account is still pending administrator approval</li>
                <li>Your account has been temporarily deactivated</li>
                <li>You need to complete additional steps to activate your account</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What should I do?</h3>
              <ul className="space-y-3 list-disc pl-5">
                <li>Contact the school administrator to check your account status</li>
                <li>Verify that all required documentation has been submitted</li>
                <li>Check your email for activation instructions</li>
                <li>If you've just registered, please allow up to 24-48 hours for account approval</li>
              </ul>
            </div>
            
            {profile && (
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-2">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span> {profile.first_name} {profile.last_name}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span> {user?.email}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/contact">Contact Administration</Link>
            </Button>
            <Button variant="ghost" onClick={signOut} className="w-full sm:w-auto">
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InactiveAccountPage;
