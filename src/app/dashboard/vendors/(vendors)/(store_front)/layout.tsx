"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DimRedMarkIcon, GreenMarkIcon, PendingInfoIcon } from "@/assets";
import { useVendorBusinessStore } from "@/store/business.store";
import { ModifiedUser, useUserStore } from "@/store/user.store";
import { ArrowRight } from "lucide-react";
import { useStore } from "zustand";

import { Business } from "@/lib/app/vendors/services";
import cn, { generateChecklist } from "@/lib/utils";
import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";

import VendorStoreCard from "../_components/vendorStoreCard";

function VendorsStoreFrontLayout({ children }: { children: React.ReactNode }) {
  useGetLoggedInUser();

  const loc = usePathname();
  const isInnerPage = loc.split("/").length > 3;
  const user = useStore(useUserStore, (state) => state.user);
  const business = useStore(useVendorBusinessStore, (state) => state.business);
  const [show, setShow] = useState(true);
  const checkList = generateChecklist(
    user as ModifiedUser,
    business?.business as Business,
  );
  const userTasks: {
    title: string;
    status: "completed" | "none" | "pending";
    link: null | string;
  }[] = [
    {
      title: "Personal Information",
      status: "completed",
      link: null,
    },
    {
      title: "Business Information",
      status: "completed",
      link: null,
    },
    {
      title: "Security Check",
      status: "completed",
      link: null,
    },
    {
      title: "Upload a verification document",
      // @ts-expect-error
      status: checkList[0]?.status,
      link: "/dashboard/vendors/verify/docs",
    },
    {
      title: "Verify phone number",
      // @ts-expect-error
      status: checkList[1]?.status,
      link: "/dashboard/vendors/verify/phone",
    },

    {
      title: "Complete store settings",
      // @ts-expect-error
      status: checkList[2]?.status,
      link: "/dashboard/vendors/account/store_details",
    },
  ];

  const icons = {
    none: <DimRedMarkIcon />,
    completed: <GreenMarkIcon />,
    pending: <PendingInfoIcon />,
  };
  return (
    <div className=" flex w-full justify-between gap-8 py-6 mmd:-mt-6">
      <div className={cn(" w-full", isInnerPage ? "hidden lg:block" : "")}>
        {userTasks.some(
          (el) => el.status === "none" || el.status === "pending",
        ) && (
          <div className="mx-auto mb-4 w-[95%]  rounded-[20px] bg-[#D6EEDD66] p-[20px_20px] lg:hidden">
            <div className="relative">
              <h4 className=" mb-2 text-lg font-bold sm:text-2xl">
                Welcome to your store!
              </h4>
              <p className=" text-sm font-light text-[#302F2C]  ">
                You still have a few things left to complete before you can have
                full access to your store. Let’s get started, shall we?
              </p>
              <button
                className={cn(
                  "absolute right-[6px] top-[1px] transition-all duration-200 ease-in-out ",
                  !show ? " rotate-[180deg]" : "rotate-[0deg]",
                )}
                onClick={() => setShow(!show)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24"
                    height="24"
                    transform="matrix(-1 0 0 -1 24 24)"
                    fill="white"
                    fillOpacity="0.01"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.9996 12.9975C15.9996 13.2632 15.8948 13.5181 15.708 13.707C15.616 13.7998 15.5065 13.8735 15.3858 13.9238C15.2651 13.9741 15.1357 13.9999 15.005 13.9999C14.8743 13.9999 14.7449 13.9741 14.6242 13.9238C14.5035 13.8735 14.394 13.7998 14.302 13.707L11.995 11.38L9.697 13.697C9.60517 13.7902 9.49573 13.8642 9.37504 13.9147C9.25435 13.9652 9.12483 13.9912 8.994 13.9912C8.86317 13.9912 8.73365 13.9652 8.61296 13.9147C8.49227 13.8642 8.38283 13.7902 8.291 13.697C8.10443 13.508 7.99982 13.2531 7.99982 12.9875C7.99982 12.7219 8.10443 12.467 8.291 12.278L11.221 9.323C11.434 9.108 11.711 9.001 11.99 9.001C12.269 9.001 12.551 9.108 12.769 9.323L15.708 12.288C15.8948 12.4769 15.9996 12.7318 15.9996 12.9975Z"
                    fill="#34A853"
                  />
                </svg>
              </button>
            </div>
            <div className={cn("overflow-hidden", show ? "h-fit" : " h-0")}>
              <div className="mt-6">
                <ul className="flex flex-col gap-7">
                  {userTasks.map((item) => (
                    <li
                      className="flex w-full justify-between"
                      key={item.title}
                    >
                      {item.link !== null ? (
                        <Link
                          href={item.link}
                          className={"flex w-full justify-between"}
                        >
                          <div className=" flex w-full items-center gap-2">
                            <span>{icons[item.status]}</span>
                            <span className="text-sm font-medium text-[#302F2C] sm:text-base">
                              {item.title}
                            </span>
                          </div>

                          <span>
                            <ArrowRight />
                          </span>
                        </Link>
                      ) : (
                        <div className=" flex w-full items-center gap-2">
                          <span>{icons[item.status]}</span>
                          <span className="text-sm font-medium text-[#302F2C] sm:text-base">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <div
          className={cn(
            " hideScrollBar sticky left-0 h-screen w-full overflow-y-auto rounded-3xl sm:max-h-[850px] sm:min-h-[calc(100vh_-_100px)] sm:p-6  lg:top-[100px] lg:max-w-[582px] lg:customeBoxShadow ",
          )}
        >
          <VendorStoreCard />
        </div>
      </div>
      <div
        className={cn(
          " w-full sm:max-w-[380px] mmd:flex mmd:items-center ",
          isInnerPage ? "" : "!hidden lg:!block",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default VendorsStoreFrontLayout;
