"use client";

import Link from "next/link";
import {
  ArrowRight,
  DimRedMarkIcon,
  GreenMarkIcon,
  PendingInfoIcon,
} from "@/assets";
import { useVendorBusinessStore } from "@/store/business.store";
import { ModifiedUser, useUserStore } from "@/store/user.store";

import { Business } from "@/lib/app/vendors/services";
import { generateChecklist } from "@/lib/utils";
import useStore from "@/hooks/useStateFromStore";

function DashboardHome() {
  const user = useStore(useUserStore, (state) => state, []);
  const business = useStore(useVendorBusinessStore, (state) => state);
  const isStatusVerified = user?.user?.vendorId?.status !== "VERIFIED";
  const checkList = generateChecklist(
    user?.user as ModifiedUser,
    business?.business?.business as Business,
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
  return userTasks.some(
    (el) => el.status === "none" || el.status === "pending",
  ) ? (
    <div className="w-[500px] max-w-[388px] rounded-[20px] bg-[#D6EEDD66] p-[20px_20px]">
      <div>
        <h4 className=" mb-2 text-2xl font-bold">Welcome to your Store!</h4>
        <p className=" text-sm font-light  text-[#302F2C]">
          You still have a few things left to complete before you can have full
          access to your store. Let’s get started, shall we?
        </p>
      </div>
      <div className="mt-6">
        <ul className="flex flex-col gap-7">
          {userTasks.map((item) => (
            <li className="flex w-full justify-between" key={item.title}>
              {item.link !== null ? (
                <Link
                  href={item.link}
                  className={"flex w-full justify-between"}
                >
                  <div className=" flex w-full items-center gap-2">
                    <span>{icons[item.status]}</span>
                    <span className=" text-base font-medium text-[#302F2C]">
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
                  <span className=" text-base font-medium text-[#302F2C]">
                    {item.title}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default DashboardHome;
