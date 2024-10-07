"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { GetAllOrders } from "@/lib/app/user/services";
import { useAmount } from "@/lib/utils";

export const statusColors = {
  Delivered: "#34A853", // Green
  "In Transit": "#3D809D", // Blue
  Blocked: "#C3423F", // Red
  Placed: "#FFBF00",
};
export type ITransactionItem = {
  id: string;
  orderItem: {
    name: string;
    image: string;
  };
  customerName: string;
  trackingNo: string;
  amount: number;
  orderId: string;
  date: string;
  time: string;
  status: "Delivered" | "In Transit" | "Blocked";
  productImage: string;
};
export const columns: ColumnDef<GetAllOrders>[] = [
  {
    accessorKey: "producPicture",
    header: () => (
      <div className="text-right text-xs sm:text-sm">Order Item</div>
    ),
    cell: ({ row }: { row: any }) => {
      const transaction = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="relative h-[50px] w-[50px]">
            {transaction?.productPicture ? (
              <Image
                src={transaction?.productPicture}
                alt="Productut Picture"
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
    accessorKey: "customerName",
    header: () => (
      <div className="text-right text-xs sm:text-sm">Customer Name</div>
    ),
  },
  {
    accessorKey: "orderId",
    header: () => <div className="text-right text-xs sm:text-sm">Order id</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right text-xs sm:text-sm">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.original.cost);
      const { convertToAmountInNaira } = useAmount();

      return <div className="text-right">{convertToAmountInNaira(amount)}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right text-xs sm:text-sm">Date</div>,
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
    accessorKey: "time",
    header: () => <div className="text-right text-xs sm:text-sm">Time</div>,
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
    header: () => (
      <div className="text-right text-xs sm:text-sm">Status of Order</div>
    ),
    cell: ({ row }) => {
      const transaction = row.original;
      const { status } = transaction;
      // @ts-ignore
      const color = statusColors[status] || "#000";
      return (
        <div
          style={{
            color,
          }}
          className=" flex w-full items-center justify-center text-center text-sm font-semibold"
        >
          <span style={{ color }}>{status}</span>
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
