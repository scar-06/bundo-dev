// @ts-nocheck

"use client";

import { useState } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { GetAllOrders, IGetPurchases } from "@/lib/app/user/services";
import { useAmount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Drawer from "@/components/drawer/drawer";
import ViewTransactionCard from "@/app/dashboard/vendors/(vendors)/_components/transactionCard";

export const statusColors = {
  Delivered: "#34A853",
  "In Transit": "#3D809D",
  Blocked: "#C3423F",
};
export type ITransactionItem = {
  _id: string;
  businessName: string;
  productId: string;
  userId: string;
  orderId: string;
  cost: string;
  quantity: string;
  trackingId: string;
  createdAt: string;
  status: string;
};
export const columns: ColumnDef<GetAllOrders>[] = [
  {
    accessorKey: "productPicture",
    header: () => <span className="text-xs md:text-sm"> Order Item</span>,
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="relative h-[50px] w-[50px]">
            {transaction.productPicture ? (
              <Image
                src={transaction.productPicture}
                alt={"Product Picture"}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300">
                N/A
              </div>
            )}
          </div>
          <div>{transaction.orderItem}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <span className="text-xs md:text-sm">Quantity </span>,
  },
  {
    accessorKey: "orderId",
    header: () => <span className="text-xs md:text-sm"> Order ID</span>,
  },

  {
    accessorKey: "cost",
    header: () => <div className="text-right text-xs md:text-sm">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      const { convertToAmountInNaira } = useAmount();

      return <div className="text-right">{convertToAmountInNaira(amount)}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right text-xs md:text-sm"> Date</div>,
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
    header: () => <div className="text-right text-xs md:text-sm"> Vendor</div>,
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="text-right text-xs md:text-sm"> Status of Order</div>
    ),
    cell: ({ row }) => {
      const transaction = row.original;
      const { status }: { status: string } = transaction;
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const [showModal, setShowModal] = useState(false);
  //     const transaction = row.original;

  //     return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="plain" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               className=" cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-primary-50"
  //               onClick={() =>
  //                 navigator.clipboard.writeText(transaction.trackingNo)
  //               }
  //             >
  //               Copy transaction ID
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               className=" cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-primary-50"
  //               onClick={() => navigator.clipboard.writeText(transaction.id)}
  //             >
  //               Copy transaction ID
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />

  //             <DropdownMenuItem
  //               className=" cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-primary-50"
  //               onClick={() => setShowModal(!showModal)}
  //             >
  //               View Transaction detail
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //         <Drawer
  //           open={showModal}
  //           onClose={() => setShowModal(!showModal)}
  //           title=""
  //           selector="bundo-app-portal"
  //           anchor="center"
  //           z="z-50"
  //           h="h-fit"
  //           bg="bg-transparent"
  //           borderRadius="rounded-lg"
  //           widthStyles="w-[500px] md:w-[500px]"
  //           isFooter={false}
  //           containerClassName={"grid-rows-[auto_1fr]"}
  //         >
  //           <ViewTransactionCard
  //             {...transaction}
  //             onClose={() => setShowModal(!showModal)}
  //           />
  //         </Drawer>
  //       </>
  //     );
  //   },
  // },
];
