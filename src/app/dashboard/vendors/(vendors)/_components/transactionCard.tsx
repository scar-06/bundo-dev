import React, { useState } from "react";
import Image from "next/image";

import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ITransactionItem, statusColors } from "../my_purchases/columns";

type Props = ITransactionItem & {
  onClose: () => void;
};

function ViewTransactionCard({
  id,
  orderItem,
  customerName,
  trackingNo,
  amount,
  date,
  time,
  status,
  onClose,
}: Props) {
  const color = statusColors[status] || "#000";
  return (
    <div className="hideScrollBar flex h-screen w-full items-center justify-center overflow-y-auto">
      <div className="isolate mx-[auto] flex h-fit  w-[90%] max-w-[489px] flex-col rounded-3xl bg-white px-6  py-[29px] font-tv2SansDisplay md:w-full">
        <h3 className="mx-auto  mb-[38px] w-[80%]  max-w-[280px] text-center text-lg font-semibold text-tertiary-deep-green-950">
          Order Information
        </h3>

        <div className="mx-auto mb-6 flex w-fit flex-wrap items-center gap-2">
          <div className="relative h-[72px] w-[72px]">
            {orderItem.image ? (
              <Image
                src={orderItem.image}
                alt={orderItem.name}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300">
                N/A
              </div>
            )}
          </div>
          <span className="text-sm text-[#302F2C]">{orderItem.name}</span>
        </div>

        <div className="mx-auto mb-[66px] flex w-max flex-col gap-6 ">
          <div className="flex w-full items-center justify-between gap-4">
            <b className="text-sm font-medium text-[#333]">Customer Name:</b>
            <span className="text-xs font-light text-[#333333]">
              {customerName}
            </span>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <b className="text-sm font-medium text-[#333]">Tracking Number:</b>
            <span className="text-xs font-light text-[#333333]">
              {trackingNo}
            </span>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <b className="text-sm font-medium text-[#333]">Amount:</b>
            <span className="text-xs font-light text-[#333333]">{amount}</span>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <b className="text-sm font-medium text-[#333]">Date:</b>
            <span className="text-xs font-light text-[#333333]">{date}</span>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <b className="text-sm font-medium text-[#333]">Time:</b>
            <span className="text-xs font-light text-[#333333]">{time}</span>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <b className="text-sm font-medium text-[#333]">Status of Order:</b>
            <span style={{ color }} className="text-xs font-medium">
              {status}
            </span>
          </div>
        </div>

        <Button
          variant={"plain"}
          size={"plain"}
          onClick={onClose}
          type="button"
          className={cn(
            "mb-6 h-[54px] w-full bg-primary-500 font-medium  text-white hover:bg-primary-700",
          )}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default ViewTransactionCard;
