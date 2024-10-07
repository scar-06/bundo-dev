"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowBackIcon,
  Close,
  CloseContactsIcon,
  GreenCallIcon,
  SmallGreenCloseIcon,
  SmallRedCloseIcon,
} from "@/assets";

import { Button } from "@/components/ui/button";
import EmptyCart from "@/components/ui/cartItems/emptyCart";

import NotificationAlert from "../_components/notificationAlert";
import SuccessNotificationModal from "../_components/successNotificationModal";

function page() {
  const [isRead, setIsRead] = useState("unread");
  return (
    <div className=" h-full w-full cursor-pointer pt-10 lg:px-16">
      {" "}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/customers">
          <div className="flex cursor-pointer items-center">
            {" "}
            <ArrowBackIcon />
            <span className=" font-medium">Notifications</span>
          </div>
        </Link>
        <div className="flex gap-3 overflow-auto">
          <button
            onClick={() => setIsRead("unread")}
            className={` flex items-center gap-2 rounded-xl border-[1px] border-s border-[#CFD4CE] px-3 text-xs font-medium ${
              isRead === "unread"
                ? "bg-[#F3D9D9] text-[#C3423F]"
                : "text-[#34A853]"
            }`}
          >
            <span>Unread{" (5)"}</span>

            {/* {isRead === "unread" && <SmallRedCloseIcon />} */}
          </button>
          <button
            onClick={() => setIsRead("read")}
            className={`flex gap-2 rounded-xl border-[1px] ${
              isRead === "read" ? "bg-[#D6EEDD]" : ""
            } border-s border-[#CFD4CE] px-4 py-3  text-xs font-medium text-[#34A853]`}
          >
            <span>Read{" (4)"}</span>

            {/* {isRead === "read" && <SmallGreenCloseIcon />} */}
          </button>
        </div>
      </div>
      <SuccessNotificationModal>
        <div className="w-ful flex">
          {Array(0).length ? (
            <EmptyCart />
          ) : (
            <div className={` mb-10 mt-6  w-full`}>
              {Array(29)
                .fill(0)
                .map((_) => (
                  <div
                    key={_}
                    className={` my-3 ${
                      isRead === "unread" ? " rounded-md bg-[#DE350B08]" : ""
                    }`}
                  >
                    <NotificationAlert />
                  </div>
                ))}
            </div>
          )}
        </div>
      </SuccessNotificationModal>
    </div>
  );
}

export default page;
