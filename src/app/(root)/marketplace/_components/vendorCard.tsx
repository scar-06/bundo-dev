"use client";

import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { locationMarker, LoveFilled, LoveIcon, mapIcon, tag } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { formatTime } from "@/utils/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useStore } from "zustand";

import {
  getLoggedUser,
  updateFollowVendors,
  updateUnFollowVendors,
} from "@/lib/app/user/services";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { notify } from "../../_components/notifications/notify";
import StarRating from "./starRating";

export type Props = {
  varient: "white" | "default";
  onAction?: () => void;
  loading?: boolean;
  id?: string;
  name?: string;
  description?: string;
  address?: string;
  categories?: string[];
  disabled?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  location?: {
    coordinates: number[];
  };
  business_profile_picture?: string | StaticImport;
  total_ratings?: number;
  total_reviews?: number;
  average_rating?: number;
  minutes_away?: string;
  vendorId?: string;
  hideLocation?: boolean;
  type?: "vendors" | "customers";
  path?: string;
  className?: string;
  messageType?: string;
  businessType?: string;
};

function VendorCard({
  varient = "default",
  onAction,
  loading,
  name,
  description,
  business_profile_picture,
  address,
  total_ratings,
  total_reviews,
  categories,
  minutes_away,
  average_rating,
  vendorId,
  id,
  hideLocation,
  disabled,
  type = "vendors",
  path,
  className,
  messageType,
  businessType,
}: Props) {
  const queryClient = useQueryClient();
  const user = useStore(useUserStore, (state) => state.user);
  const isLoggedIn = !!user?.role;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => await updateFollowVendors({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER],
        });
      }
    },
    onError: async (err) => {
      if (messageType === "public") {
        notify.error({
          message: "Sign in to like your Favorite vendor",
          subtitle: err?.message,
        });
      } else {
        notify.error({
          message: "Error while updating user information",
          subtitle: err?.message,
        });
      }
    },
  });

  const { mutate: mutateUnfollowVendor, isPending: isUnFollowing } =
    useMutation({
      mutationFn: async (data: any) => await updateUnFollowVendors({ ...data }),
      onSuccess: async (data) => {
        if (data?.status === "success") {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.USER],
          });
        }
      },
      onError: async (err) =>
        notify.error({
          message: "Error while updating user information",
          subtitle: err?.message,
        }),
    });

  const { isFetching, data: dataItems } = useQuery(
    {
      queryKey: [QUERY_KEYS.USER],
      queryFn: async () => getLoggedUser(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
    queryClient,
  );

  const handleFollowVendors = (id: string, vendorId: string) => {
    if (dataItems?.user?.vendors?.includes(id)) {
      mutateUnfollowVendor({ businessId: vendorId });
    } else {
      mutate({ businessId: id });
    }
  };

  const filled = dataItems?.user?.vendors?.includes(vendorId as string);
  const get2Categories = categories?.slice(0, 2);

  return (
    <div
      className={cn(
        "h-fit w-full max-w-[250px] overflow-x-auto rounded-[10px] p-3 shadow-sm hover:shadow-xl sm:p-5  ",
        varient === "white"
          ? " min-w-[280px] bg-[#fff] sm:min-w-[unset]"
          : ` bg-[#FCFBF8] ${className}`,
      )}
    >
      <div className="mb-3 flex w-full items-start justify-between ">
        {business_profile_picture ? (
          <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full">
            <Image
              src={business_profile_picture}
              alt="brand logo"
              fill
              className="rounded-full  object-cover"
              priority
            />
          </span>
        ) : (
          <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full bg-primary-500 text-3xl font-semibold text-white">
            {(name as string).split("")[0]}
          </span>
        )}
        <button
          type="button"
          disabled={isPending || isUnFollowing}
          onClick={
            isLoggedIn
              ? () => handleFollowVendors(id as string, vendorId as string)
              : () =>
                  notify.error({
                    message: "Sign in to follow your favorite vendor",
                  })
          }
        >
          {isPending || isUnFollowing ? (
            <span className=" animate-spin duration-200">
              <LoaderIcon />
            </span>
          ) : filled ? (
            <LoveFilled />
          ) : (
            <LoveIcon />
          )}
        </button>
      </div>
      <div className="h-full w-full">
        <div className=" mb-3 flex w-full flex-col gap-1">
          <h3 className=" mb-1 line-clamp-1 text-sm font-semibold text-tertiary-deep-green-950">
            {name || "  Beauty Hair"}
          </h3>
          {!hideLocation && (
            <div className=" flex items-center gap-2">
              <div className="relative h-[clamp(30px,_5vw,_35px)] w-[clamp(27px,_5vw,_32px)] overflow-hidden">
                <Image src={locationMarker} alt="location marker" />
              </div>
              <span className="text-[7px] font-normal md:text-[8px]">
                {`${formatTime(Number(minutes_away as string))}  from you` ||
                  "5 minutes away from you"}
              </span>
            </div>
          )}
          <div className="h-full  min-h-[30px]">
            <p className=" m-0 line-clamp-2 h-full p-0 text-[9px] font-normal leading-[169%] text-[#504E49]  md:text-[10px] ">
              {description ||
                "Affordable and mouth watering food for all kinds of occasion. Fried rice, plantain ..."}
            </p>
          </div>
        </div>

        <div className="mb-6  flex flex-col">
          <div
            className={cn(
              "flex w-full items-center gap-2 text-xs font-semibold",
              varient === "white" ? " " : "",
              // flex-wrap items-start sm:flex-row
            )}
          >
            <div
              className={cn(
                "relative flex h-[clamp(13px,_5vw,_20px)] w-[clamp(13px,_5vw,_20px)] items-center  justify-center overflow-hidden rounded-full md:text-[10px]",
                varient === "white" ? "bg-[#fff]" : " bg-primary-100",
              )}
            >
              <Image
                src={mapIcon}
                alt="map icon"
                className=" aspect-square w-4/5 object-contain "
              />
            </div>
            <div className="line-clamp-1 flex w-full flex-wrap">
              <span className=" my-auto line-clamp-1 text-[9px] font-normal md:text-[10px] ">
                {address}
              </span>
            </div>
          </div>
          <div
            className={cn(
              " line-clamp-1 flex h-full min-h-[45px]  flex-nowrap items-center gap-2 text-xs font-semibold",
              varient === "white" ? "my-2  " : "my-2  flex-row items-start",
            )}
          >
            <div
              className={cn(
                "relative flex h-[clamp(13px,_5vw,_20px)] w-[clamp(13px,_5vw,_20px)]  items-center justify-center overflow-hidden rounded-full",
                varient === "white" ? " " : " bg-primary-100 sm:mb-0",
              )}
            >
              <Image
                src={tag}
                alt="tag"
                className="  aspect-square w-4/5 object-contain "
              />
            </div>
            <div className="mt-1 line-clamp-2 flex flex-wrap items-center gap-2">
              {/* <div className="hidden sm:block">
                {categories?.map((_) => (
                  <p
                    key={_}
                    className=" line-clamp-2 cursor-pointer  text-[9px] font-normal text-primary-500 underline md:text-[10px] "
                  >
                    {_}
                  </p>
                ))}
              </div> */}
              {categories?.length
                ? categories.length < 2
                  ? categories?.map((_) => (
                      <p
                        key={_}
                        className="line-clamp-2 cursor-pointer  text-[9px] font-normal text-primary-500 underline md:text-[10px] "
                      >
                        {_}
                      </p>
                    ))
                  : get2Categories?.map((_, index) => (
                      <span
                        key={_}
                        className="flex flex-nowrap items-center gap-1 whitespace-nowrap "
                      >
                        <p className=" line-clamp-2 cursor-pointer  text-[9px] font-normal text-primary-500 underline md:text-[10px] ">
                          {_}
                        </p>
                        <span className=" cursor-pointer text-[8px] font-normal text-primary-500 ">
                          {" "}
                          {index === get2Categories.length - 1 &&
                            `+${categories.length - 2}`}
                        </span>
                      </span>
                    ))
                : ["Cakes", "Catering", "Food"]?.map((_) => (
                    <p
                      key={_}
                      className="line-clamp-2  cursor-pointer text-[9px] font-normal text-primary-500 underline  md:text-[10px] "
                    >
                      {_}
                    </p>
                  ))}
            </div>
          </div>

          <div
            className={cn(
              "line-clamp-1 flex h-full items-center gap-2 whitespace-nowrap text-xs font-semibold text-tertiary-deep-green-950",
              varient === "white" ? "" : "items-start sm:flex-row",
            )}
          >
            <StarRating rating={average_rating || 0} />
            <span className=" text-normal line-clamp-1 whitespace-nowrap text-[9px] ">
              {average_rating?.toFixed(1)}
              {`(${total_reviews ?? 0} reviews)`}
            </span>
          </div>
        </div>
      </div>
      {/* 
        
    
      
      */}
      <div className="flex h-full w-full flex-col justify-end ">
        <Link
          href={path || `/dashboard/${type}/marketplace/vendor/${id}/products`}
        >
          <Button
            variant="default"
            size="sm"
            className="w-full text-[10px] font-semibold"
            onClick={() => {
              if (loading) return;
              if (onAction) onAction();
            }}
          >
            View Page
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default VendorCard;
