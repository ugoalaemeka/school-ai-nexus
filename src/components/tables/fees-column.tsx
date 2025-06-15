
import React from "react";

export const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Student Name",
    accessorKey: "studentName",
  },
  {
    header: "Fee Type",
    accessorKey: "feeType",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (row: any) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(row.amount),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row: any) => {
      const statusMap: Record<string, string> = {
        paid: "bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium",
        pending: "bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium",
        overdue: "bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium",
      };
      
      return (
        <span className={statusMap[row.status]}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      );
    },
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
  },
  {
    header: "Payment Method",
    accessorKey: "paymentMethod",
  },
];
