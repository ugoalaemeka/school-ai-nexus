
import React from "react";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    header: "Student ID",
    accessorKey: "studentId",
  },
  {
    header: "Student Name",
    accessorKey: "studentName",
  },
  {
    header: "Class/Level",
    accessorKey: "class",
    cell: (row: any) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.class}</span>
        <span className="text-xs text-muted-foreground capitalize">
          {row.level} Level
        </span>
      </div>
    ),
  },
  {
    header: "Fee Type",
    accessorKey: "feeType",
    cell: (row: any) => (
      <span className="text-sm">
        {row.feeType}
      </span>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (row: any) => (
      <div className="text-right">
        <div className="font-semibold">
          {new Intl.NumberFormat('en-NG', { 
            style: 'currency', 
            currency: 'NGN', 
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0 
          }).format(row.amount)}
        </div>
        {row.balanceOwed && (
          <div className="text-xs text-red-600">
            Balance: {new Intl.NumberFormat('en-NG', { 
              style: 'currency', 
              currency: 'NGN', 
              minimumFractionDigits: 0, 
              maximumFractionDigits: 0 
            }).format(row.balanceOwed)}
          </div>
        )}
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row: any) => {
      const statusConfig = {
        paid: { 
          className: "bg-green-100 text-green-800 hover:bg-green-100", 
          label: "Paid",
          icon: "✓"
        },
        pending: { 
          className: "bg-amber-100 text-amber-800 hover:bg-amber-100", 
          label: "Pending",
          icon: "⏳"
        },
        overdue: { 
          className: "bg-red-100 text-red-800 hover:bg-red-100", 
          label: "Overdue",
          icon: "⚠️"
        },
        partial: { 
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100", 
          label: "Partial",
          icon: "◐"
        },
      };
      
      const config = statusConfig[row.status as keyof typeof statusConfig];
      
      return (
        <Badge className={`${config.className} text-xs font-medium flex items-center gap-1`}>
          <span>{config.icon}</span>
          {config.label}
        </Badge>
      );
    },
  },
  {
    header: "Term/Session",
    accessorKey: "term",
    cell: (row: any) => (
      <div className="text-sm">
        <div className="font-medium">{row.term}</div>
        <div className="text-xs text-muted-foreground">{row.academicYear}</div>
      </div>
    ),
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
    cell: (row: any) => {
      const dueDate = new Date(row.dueDate);
      const today = new Date();
      const isOverdue = dueDate < today && row.status !== 'paid';
      
      return (
        <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
          {dueDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
          {isOverdue && <div className="text-xs">Overdue</div>}
        </div>
      );
    },
  },
  {
    header: "Payment Method",
    accessorKey: "paymentMethod",
    cell: (row: any) => (
      <span className={`text-xs px-2 py-1 rounded-full ${
        row.paymentMethod === 'Pending' 
          ? 'bg-gray-100 text-gray-600' 
          : 'bg-blue-50 text-blue-700'
      }`}>
        {row.paymentMethod}
      </span>
    ),
  },
];
