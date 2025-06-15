
import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CreditCard, Check, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentStepProps {
  formData: any;
  onPaymentSuccess: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  formData,
  onPaymentSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const getTuitionFee = (grade: string) => {
    const tuitionMap: Record<string, number> = {
      "preschool": 380000,
      "kindergarten": 420000, 
      "grade1": 450000,
      "grade2": 450000,
      "grade3": 480000,
      "grade4": 480000,
      "grade5": 520000,
      "grade6": 520000,
      "grade7": 550000,
      "grade8": 550000,
      "grade9": 600000,
      "grade10": 600000,
      "grade11": 650000,
      "grade12": 650000,
    };
    
    return tuitionMap[grade] || 500000; // Default to ₦500,000
  };

  const handlePayment = () => {
    // Simulate payment process with stripe
    setLoading(true);
    
    // In a real implementation, you would:
    // 1. Make an API call to your backend to create a Stripe payment intent or checkout session
    // 2. Redirect the user to the Stripe checkout page
    // 3. Handle the success or failure callback
    
    // For this demo, we'll simulate a successful payment after a delay
    setTimeout(() => {
      setLoading(false);
      setPaymentComplete(true);
      
      // Delay a bit to show the success message
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalAmount = getTuitionFee(formData.desiredClass) + 50000 + 35000;

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Payment</CardTitle>
      </CardHeader>
      <CardContent>
        {!paymentComplete ? (
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-md mb-6">
              <h3 className="font-semibold mb-2">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tuition Fee:</span>
                  <span>{formatCurrency(getTuitionFee(formData.desiredClass))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration Fee:</span>
                  <span>{formatCurrency(50000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Books & Materials:</span>
                  <span>{formatCurrency(35000)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-primary">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Payment Method</Label>
                <RadioGroup defaultValue="card" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="Name on card" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="flex space-x-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handlePayment} className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay {formatCurrency(totalAmount)}
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  You will be redirected to a secure payment page
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-fade-in">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center animate-fade-in">Payment Successful!</h3>
            <p className="text-center text-muted-foreground mt-2 animate-fade-in">
              Your application has been submitted and payment has been processed
            </p>
          </div>
        )}
      </CardContent>
    </>
  );
};
