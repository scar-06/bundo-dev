// @ts-nocheck
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { bakerImage, PriceStroke } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { formatCurrency } from "@/utils/helpers";
import { useStore } from "zustand";

import { AllAd } from "@/lib/app/ads/services";
import { GetAllAds, IGetAllAds } from "@/lib/app/user/services";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  varient: "deep" | "light";
  width?: string;
  widthSize?: string;
  imgHeight?: string;
  imgWidth?: string;
  ad: AllAd;
  businessName?: string;
  category?: string[];
};

function AdzCard({
  varient,
  width,
  widthSize,
  imgHeight,
  imgWidth,
  ad,
  category = [],
  businessName = "",
}: Props) {
  const user = useStore(useUserStore, (state) => state.user);
  const routeRole = user?.role === "customer" ? "customers" : "vendors";
  const get2Categories = category.slice(0, 2);
  return (
    <div
      className={cn(
        `flex h-full min-h-[219px] flex-col ${width} my-2 min-w-[260px] gap-3 rounded-[5px] px-[10px] pb-5 pt-[12px]`,
        "bg-white shadow-[0px_20px_24px_0px_#1111110F]",
      )}
    >
      <div
        className={`relative h-1/2 min-h-[112px] w-full overflow-hidden rounded-[5px]`}
      >
        <Image
          src={
            ad?.pictures?.length > 0
              ? ad?.pictures[0] === "some link"
                ? ""
                : ad?.pictures[0]
              : ""
          }
          alt={ad?.name as string}
          fill
          className="w-full object-contain"
        />
        <div className="absolute bottom-0 left-0 flex items-center  text-[8px] font-semibold md:text-[9px]">
          <div className="flex w-full items-center gap-2 rounded-full bg-[#D6EEDD] px-2">
            <div
              className={cn(
                "  relative my-[5px] flex h-[clamp(15px,_5vw,_19px)] w-[clamp(15px,_5vw,_19px)] items-center justify-center rounded-full  bg-white ",
              )}
            >
              <Image
                src={
                  ad?.pictures?.length > 0
                    ? ad?.pictures[0] === "some link"
                      ? ""
                      : ad?.pictures[0]
                    : ""
                }
                alt={ad?.name as string}
                fill
                className=" relative aspect-auto  h-[clamp(15px,_5vw,_19px)] w-[clamp(15px,_5vw,_19px)] rounded-full object-contain "
              />
            </div>

            <span
              className=" text-[8px] font-semibold md:text-[9px]"
              key={Math.random() * 21}
            >
              {businessName}
            </span>
          </div>
        </div>
      </div>
      <div className={`flex w-full flex-1 flex-col justify-between`}>
        <div className="mb-1 flex flex-col gap-2">
          <h3
            className={cn(
              "line-clamp-1 text-xs font-semibold capitalize leading-5 sm:text-sm",
              "text-tertiary-deep-green-950",
            )}
          >
            {ad?.name}
          </h3>
          {/* flex-col-reverse */}
          <div className="mx-auto flex w-full flex-col-reverse  justify-between gap-2 text-base">
            <span className="line-clamp-1 text-sm font-semibold sm:text-base">
              {formatCurrency(ad?.cost ?? 5000)}
            </span>
            <div className="flex gap-2">
              {category.length <= 2
                ? category?.map((tag) => (
                    <span
                      className="line-clamp-1 whitespace-nowrap rounded-full bg-tertiary-pale-100 px-[10px] text-[8px] font-semibold md:text-[9px]"
                      key={Math.random() * 21}
                    >
                      {tag}
                    </span>
                  ))
                : get2Categories?.map((tag, index) => {
                    return (
                      <div
                        key={Math.random() * 21}
                        className="mt-1 flex items-center"
                      >
                        <span className="line-clamp-1 whitespace-nowrap rounded-full bg-tertiary-pale-100 px-[10px] text-[8px] font-semibold md:text-[9px]">
                          {tag}
                        </span>
                        {index === get2Categories.length - 1 && (
                          <span className="mx-2 line-clamp-1 whitespace-nowrap rounded-full bg-tertiary-pale-100 px-[10px] text-[8px] font-semibold md:text-[9px]">
                            ...more
                          </span>
                        )}
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>

        <Link
          // @ts-expect-error
          href={`/dashboard/${routeRole}/marketplace/vendor/${ad.businessId}/products?id=${ad?.productId}`}
        >
          <Button
            variant="default"
            size="sm"
            className="mt-2 w-full text-[9px] font-semibold md:text-[10px]"
          >
            Check out this product
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AdzCard;
