"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { GetAllOrders } from "@/lib/app/user/services";
import { useAmount } from "@/lib/utils";

import ViewTransactionCard from "../_components/transactionCard";

export const statusColors = {
  Delivered: "#34A853", // Green
  "In Transit": "#3D809D", // Blue
  Blocked: "#C3423F", // Red
};
export type ITransactionItem = {
  id: string;
  orderItem: {
    name: string;
    image: string;
  };
  customerName: string;
  trackingNo: string;
  orderId: string;
  amount: number;
  date: string;
  time: string;
  status: "Delivered" | "In Transit" | "Blocked";
};

export const columns: ColumnDef<GetAllOrders>[] = [
  {
    accessorKey: "businessName",
    header: "Order Item",
    cell: ({ row }: { row: any }) => {
      const transaction = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="relative h-[50px] w-[50px]">
            {transaction?.productPicture ? (
              <Image
                src={transaction?.productPicture}
                alt={"image"}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300">
                N/A
              </div>
            )}
          </div>
          <div>{transaction?.orderItem}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
  },

  {
    accessorKey: "cost",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      const { convertToAmountInNaira } = useAmount();

      return <div className="text-right">{convertToAmountInNaira(amount)}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
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
    accessorKey: "businessName",
    header: "Vendor",
  },
  {
    accessorKey: "status",
    header: "Status of Order",
    cell: ({ row }: { row: any }) => {
      const transaction = row.original;
      const { status }: { status: string } = transaction;
      // @ts-ignore
      const color = statusColors[status] || "#000";
      return (
        <div
          style={{
            color,
          }}
          className=" flex w-full items-center justify-center text-center text-sm font-semibold"
        >
          <span>{status}</span>
        </div>
      );
    },
  },
];
