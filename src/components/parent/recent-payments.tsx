
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard } from "lucide-react";

interface RecentPaymentsProps {
  isLoading: boolean;
  showAll?: boolean;
}

const paymentData = [
  {
    id: "INV-001",
    description: "Tuition Fee (Term 2)",
    amount: "$1,250.00",
    date: "April 2, 2025",
    status: "paid",
    dueDate: "April 1, 2025",
  },
  {
    id: "INV-002",
    description: "Technology Fee",
    amount: "$150.00",
    date: "March 15, 2025",
    status: "paid",
    dueDate: "March 15, 2025",
  },
  {
    id: "INV-003",
    description: "School Trip (Washington DC)",
    amount: "$350.00",
    date: "-",
    status: "pending",
    dueDate: "April 30, 2025",
  },
  {
    id: "INV-004",
    description: "Extra-curricular Activities",
    amount: "$200.00",
    date: "-",
    status: "pending",
    dueDate: "May 15, 2025",
  },
];

export function RecentPayments({ isLoading, showAll = false }: RecentPaymentsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between space-x-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
            <Skeleton className="h-8 w-[80px]" />
          </div>
        ))}
      </div>
    );
  }

  const displayData = showAll ? paymentData : paymentData.slice(0, 3);

  return (
    <div className="space-y-6">
      {displayData.map((payment) => (
        <div key={payment.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{payment.description}</span>
              <Badge 
                variant={payment.status === "paid" ? "outline" : "default"}
                className={payment.status === "paid" 
                  ? "bg-green-500/10 text-green-700 hover:bg-green-500/20" 
                  : "bg-yellow-500 hover:bg-yellow-600"}
              >
                {payment.status === "paid" ? "Paid" : "Pending"}
              </Badge>
            </div>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <span>{payment.id}</span>
              {payment.status === "paid" ? (
                <span>Paid: {payment.date}</span>
              ) : (
                <span>Due: {payment.dueDate}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {payment.status === "paid" ? (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Receipt
              </Button>
            ) : (
              <Button size="sm">
                <CreditCard className="h-4 w-4 mr-1" />
                Pay {payment.amount}
              </Button>
            )}
          </div>
        </div>
      ))}
      
      {showAll && (
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Total Due</div>
              <div className="text-2xl font-bold">$550.00</div>
            </div>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay All Outstanding
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
