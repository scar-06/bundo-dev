"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CirclePlusIcon, logo } from "@/assets";
import fallBackImage from "@/assets/images/1000287458.jpg";
import { useVendorBusinessStore } from "@/store/business.store";
import { ModifiedUser, useUserStore } from "@/store/user.store";
import { useStore } from "zustand";

import { Business, getBusiness, Product } from "@/lib/app/vendors/services";
import { generateChecklist } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import CreateAdz from "./createAdz";
import ImageWrapper from "./ImageWrapper";

type Props = {
  state: "create" | "service";
  product?: Product;
};

function VendorServiceGridItemCard({ state, product }: Props) {
  const user = useStore(useUserStore, (state) => state.user);
  const data = useStore(useVendorBusinessStore, (state) => state.business);
  const checkList = generateChecklist(
    user as ModifiedUser,
    data?.business as Business,
  );
  const isTaskCompleted =
    checkList.filter((check) => check.status !== "completed").length === 0;
  const [status, setShowStatus] = useState(false);
  return (
    <div className=" flex aspect-square h-[144px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#CFD4CE] msm:rounded-none">
      {state === "create" &&
        (isTaskCompleted ? (
          <Link href={"/dashboard/vendors/upload_service"}>
            <Button
              variant={"plain"}
              className=" transition-all  duration-300 ease-in-out hover:scale-[1.2]"
            >
              <CirclePlusIcon />
            </Button>
          </Link>
        ) : (
          <Button
            variant={"plain"}
            onClick={() => setShowStatus(true)}
            className=" transition-all  duration-300 ease-in-out hover:scale-[1.2]"
          >
            <CirclePlusIcon />
          </Button>
        ))}
      {state === "service" && (
        <div className="relative isolate h-full w-full  rounded-xl msm:rounded-none">
          <span className="absolute right-[8px] top-[8px]">
            <CreateAdz product={product as Product} />
          </span>
          <Link
            href={`/dashboard/vendors/uploaded_services/service/${product?._id}`}
            className="absolute z-[-1] h-full w-full  rounded-xl msm:rounded-none"
          >
            <ImageWrapper
              src={product?.pictures[0] ?? fallBackImage}
              fill
              alt={product?.name ?? " product name"}
              className="  rounded-xl object-cover msm:rounded-none"
              fallbackSrc={fallBackImage}
              unoptimized
            />
            <div className="absolute z-[4] flex h-full w-full items-center justify-center rounded-[inherit]  bg-black/60">
              <h3 className=" text-lg font-bold text-white">{product?.name}</h3>
            </div>
          </Link>
        </div>
      )}

      <Modal
        isOpen={status}
        showCloseIcon={false}
        closeModal={() => setShowStatus(false)}
      >
        <div
          className="hideScrollBar relative flex w-[95vw] max-w-[504px]  flex-col items-center justify-center gap-8 rounded-[40px]  bg-white px-[44px] py-[49px] sm:w-screen "
          style={{
            boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
          }}
        >
          <button
            onClick={() => setShowStatus(false)}
            className="absolute right-[20px] top-[-60px] z-[32] h-[50px] w-[50px]  rounded-3xl bg-white font-bold text-black/90 shadow-2xl"
          >
            &times;
          </button>
          <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full">
            <Image
              src={data?.business?.business_profile_picture ?? logo}
              alt="brand logo"
              fill
              priority
              className="rounded-full object-cover"
              unoptimized
            />
          </span>
          {checkList[0]?.status === "pending" &&
          checkList[1]?.status === "completed" &&
          checkList[2]?.status === "completed" ? (
            <h3 className="w-[90%] text-center text-sm">
              Hey <b>{data?.business?.name}</b>, {`Onboarding complete! We're `}
              <b>verifying</b>
              {` your info. It will be done `}
              <b>within 24 hours or less</b>
              {`. Almost there!`}
            </h3>
          ) : (
            <h3 className="w-[90%] text-center text-sm">
              Hey <b>{data?.business?.name}</b>, Complete your{" "}
              <b>onboarding tasks</b> to showcase your amazing products.
              {` Let’s ensure we’re all set for your big `}
              <b>launch!</b>
            </h3>
          )}

          <div className="flex w-full max-w-[300px] flex-col items-center justify-center gap-4">
            <Link href={"/dashboard/vendors/marketplace"} className="w-full">
              <Button size={"sm"} variant={"light-green"} className="w-full">
                {"Browse Marketplace"}
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default VendorServiceGridItemCard;
