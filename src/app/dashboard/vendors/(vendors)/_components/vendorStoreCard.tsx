"use client";

import React from "react";
import Image from "next/image";
import { brandLogo, ColoredLocation, LoveFilled, ShoppingIcon } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Share } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useStore } from "zustand";

import {
  getAllVendorProducts,
  getBusiness,
  GetBusinessRes,
} from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import StoreCardGridProductVendorLoader from "@/components/loaders/skeletonLoaderVarients/storeCardGridProductVendor";
import StoreCardHeaderLoader from "@/components/loaders/skeletonLoaderVarients/storeCardHeaderLoader";

import PlanStatusComponent from "./planStatusCard";
import ProductVendorTiles from "./productVendorTiles";
import ServiceVendorTiles from "./serviceVendorTiles";

function StoreCardHeader() {
  const queryClient = useQueryClient();

  const { data, isFetching, isError } = useQuery(
    {
      queryKey: [QUERY_KEYS.BUSINESS],
      queryFn: async () => getBusiness(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  if (isFetching) {
    return <StoreCardHeaderLoader />;
  }
  if (isError) {
    return <div>Error fetching a vendor</div>;
  }
  const business = data?.business;
  return (
    <div
      className={cn(
        " w-full rounded-[10px] px-5 pb-5 md:p-5 ",
        " bg-[#fff] sm:min-w-[unset]",
      )}
    >
      <div className="mb-1 flex w-full items-start justify-between">
        {business?.business_profile_picture ? (
          <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full">
            <Image
              src={business?.business_profile_picture}
              alt="brand logo"
              fill
              className="rounded-full  object-cover"
              unoptimized
            />
          </span>
        ) : (
          <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full bg-primary-500 text-3xl font-semibold text-white">
            {business?.name.split("")[0]}
          </span>
        )}
        <div className="flex items-center gap-2">
          <span role="button" id="tooltip-heart-info" className="flex">
            <small>{business?.noOfLikes}</small> <LoveFilled />
          </span>
          <PlanStatusComponent data={data as GetBusinessRes} showShareBtn />
        </div>
      </div>
      <div className="flex flex-col text-[12px]">
        <span className=" mb-1 text-base font-semibold md:text-lg">
          {business?.name}
        </span>
        <span>{business?.description}</span>
        <div className="mt-2 flex w-fit items-center gap-2 rounded-sm bg-[#F6F0E7] p-1 px-2 text-xs md:text-sm">
          <span>
            <ColoredLocation />
          </span>
          <span>{business?.address}</span>
        </div>{" "}
        <div className="mt-1 flex w-fit items-center gap-2 rounded-sm bg-[#F6F0E7] p-1 px-2">
          <span>
            <ShoppingIcon />
          </span>
          <span className="text-xs underline md:text-sm">
            {business?.categories
              ?.map(
                (value) => value.charAt(0).toLocaleUpperCase() + value.slice(1),
              )
              .join(" , ")}
          </span>
        </div>
      </div>

      <Tooltip
        // place="bottom"
        className={cn(
          " z-[50] w-fit !rounded-lg !bg-[#D9D9D9] !px-4 !py-6 !opacity-100 shadow-green-500",
        )}
        anchorSelect="#tooltip-heart-info"
        clickable
      >
        <div className=" flex max-w-[260px] flex-col gap-2 text-xs font-normal text-black/90">
          <span>
            <LoveFilled />
          </span>
          <p>
            This shows the number of people who have added you to their Favorite
            vendors list
          </p>
        </div>
      </Tooltip>
    </div>
  );
}
function StoreCardBody() {
  const user = useStore(useUserStore, (state) => state.user);
  const businessType = user?.vendorId?.business_type;
  const queryClient = useQueryClient();
  const { data, isFetching, isError } = useQuery(
    {
      queryKey: [QUERY_KEYS.VENDOR_PRODUCTS],
      queryFn: async () => getAllVendorProducts(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  if (isFetching) {
    return (
      <div>
        <StoreCardGridProductVendorLoader />
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching a vendor</div>;
  }

  return (
    <div className=" hideScrollBar h-screen max-h-[531px] w-full cursor-move overflow-y-auto">
      {businessType === "products" ? (
        <ProductVendorTiles {...data} />
      ) : (
        <ServiceVendorTiles {...data} />
      )}
    </div>
  );
}
function VendorStoreCard() {
  return (
    <div className="flex w-full flex-col py-4">
      <StoreCardHeader />
      <StoreCardBody />
    </div>
  );
}

export default VendorStoreCard;
