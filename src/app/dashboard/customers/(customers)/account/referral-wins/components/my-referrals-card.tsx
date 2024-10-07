"use client";

import React from "react";
import { SmallVoucher } from "@/assets";

import { ReferalList } from "../types";

function MyReferrals(Props: ReferalList) {
  const { nameInitial, name, referralStatus, accountType } = Props;
  return (
    <div className="flex  flex-col gap-4">
      <div className="flex items-center justify-between" key={Math.random()}>
        <div className="flex items-center gap-4">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#34A853] px-2 py-1">
            <span className="text-[10px] font-bold text-white">
              {nameInitial}
            </span>
          </div>
          <div className="flex flex-col font-medium">
            <span className="text-[10px] font-medium">{name}</span>
            <span className="text-[8px] font-medium text-[#31302E52]">
              {accountType}
            </span>
          </div>
        </div>
        <div className="flex h-[31px] w-[84px] items-center justify-center rounded-full bg-[#D6EEDD] px-2 py-1">
          <span className="text-[10px] font-bold ">{referralStatus}</span>
        </div>
      </div>
    </div>
  );
}

export default MyReferrals;
