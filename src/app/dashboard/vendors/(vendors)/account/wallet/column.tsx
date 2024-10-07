"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCardFilledIcon } from "@/assets";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { useAmount } from "@/lib/utils";

export const statusColors = {
  successful: "#34A853", // Green
  // "In Transit": "#3D809D", // Blue
  blocked: "#C3423F", // Red
  pending: "#786E13",
  failed: "#D44333",
};
export type IWalletTransactionItem = {
  transactionId: string;
  transactionCode: string;
  amount: string;
  remark: string;
  recipient: string;
  transactionType: string;
  createdAt: string;
  status: "successful" | "blocked" | "pending" | "failed";

  // status: "Successful" | "In Transit" | "Blocked";
};
export const columns: ColumnDef<IWalletTransactionItem>[] = [
  {
    accessorKey: "remark",
    header: "",
    cell: ({ row }) => {
      const remarkValue = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="isolate flex aspect-square h-[43px] w-[clamp(43px,_8vw,_43px)] items-center justify-center rounded-full bg-[#F3D9D9] ">
            <CreditCardFilledIcon />
          </div>
          <div>{remarkValue?.remark}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => {
      const createdDate = row.original.createdAt;
      return (
        <div className=" text-center text-sm  ">
          <span>{format(new Date(createdDate), "dd/MM/yyyy") || "--"}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "transactionType",
    header: () => <div className="text-center">Transaction Type</div>,
    cell: ({ row }) => {
      const transaction = row.original.transactionType;
      return (
        <div className="  text-center text-sm  ">
          <span>{transaction || "--"}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const { convertToAmountInNaira } = useAmount();
      const amount = parseFloat(row.getValue("amount"));
      const type = row.original.transactionType;

      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount);

      return (
        <div className="text-right">
          {type === "Debit"
            ? `-${convertToAmountInNaira(amount)}`
            : type === "Credit" && convertToAmountInNaira(amount)}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Time</div>,
    cell: ({ row }) => {
      const createdDate = row.original.createdAt;
      return (
        <div className=" text-center text-sm  ">
          <span>{format(new Date(createdDate), "hh:mm a") || "--"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const transaction = row.original;
      const { status } = transaction;
      const backgroundColor = statusColors[status];
      return (
        <div
          className={`rounded-lg p-1 text-center text-sm text-[#fff]`}
          style={{ backgroundColor }}
        >
          <span>{status}</span>
        </div>
      );
    },
  },
];
