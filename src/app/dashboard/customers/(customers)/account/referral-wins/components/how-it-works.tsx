"use client";

import React, { useState } from "react";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  CheckCircleIcon,
} from "@/assets";

import { HowItworks } from "../types";

function HowItWorks(Props: HowItworks) {
  const { data, subTitle, title } = Props;
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky right-0 top-0 flex h-[100vh,_300px] w-full max-w-md flex-col gap-4 rounded-[20px] bg-[#D6EEDD66] p-3">
      <div className="flex w-full items-center justify-between">
        <span className="font-bold">{title}</span>
        <div onClick={() => setOpen(!open)} className="cursor-pointer">
          {open ? <ArrowUpCircleIcon /> : <ArrowDownCircleIcon />}
        </div>
      </div>
      <span className="text-xs">{subTitle}</span>
      {open && (
        <div className="flex flex-col gap-4">
          {data?.map((text) => (
            <div key={Math.random()} className="flex items-center gap-2">
              <div>
                <CheckCircleIcon />
              </div>
              <span className="text-xs font-medium">{text.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HowItWorks;
