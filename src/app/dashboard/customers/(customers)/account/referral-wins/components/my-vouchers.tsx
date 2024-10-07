"use client";

import React from "react";

import { VoucherList } from "../types";

function MyVouchersCard(Props: VoucherList) {
  const { description, icon, status, onAction } = Props;
  return (
    <div
      className="flex  cursor-pointer flex-col gap-4"
      onClick={() => onAction!()}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="line-clamp-1 text-[11px]">{description}</span>
        </div>
        <div className="flex h-[31px] w-[63px] items-center justify-center rounded-full bg-[#34A853] px-2 py-1">
          <span className="text-[7px] font-bold text-white">{status}</span>
        </div>
      </div>
    </div>
  );
}

export default MyVouchersCard;
