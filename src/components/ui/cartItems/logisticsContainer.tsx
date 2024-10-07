"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DisabledIcon, InfoIndicatorIcon, logo } from "@/assets";
import { Item } from "@/store/checkout.store";
import { useUserStore } from "@/store/user.store";
import { filterUniqueCouriers, formatCurrency } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { Tooltip } from "react-tooltip";
import { useStore } from "zustand";

import {
  Courier,
  getDeliveryEstimatePerVendor,
  GetDeliveryEstimatePerVendorOrderRes,
  GetDeliveryEstimatePerVendorReq,
  Order,
} from "@/lib/app/orders/services";
import cn from "@/lib/utils";
import DotLoader from "@/components/loaders/dotLoader";
import { Typography } from "@/components/typography";
import { notify } from "@/app/(root)/_components/notifications/notify";
import ImageWrapper from "@/app/dashboard/vendors/(vendors)/_components/ImageWrapper";

import { Button } from "../button";

type Props = {
  data: {
    businessId: string;
    items: Item;
  }[];
  addressCode: string;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
};

function LogisticsContainer({ data, addressCode, orders, setOrders }: Props) {
  const user = useStore(useUserStore, (state) => state.user);
  const role = user?.role;
  return (
    <>
      <div className=" mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Typography variant={"body-5"}>
            <h3 className="flex items-center gap-1">
              Select delivery service
              <button
                type="button"
                id="tooltip-vendor-logistics-select"
                className=" h-6 w-6 cursor-pointer "
              >
                <InfoIndicatorIcon className=" text-green-600" />
              </button>
            </h3>
          </Typography>
          {/* Todo: go to user respective cart view */}
          <Link href={`/dashboard/${role}s/cart`}>
            {" "}
            <Typography className="underline">Edit Cart</Typography>
          </Link>
        </div>
        <div className="hideScrollBar  h-fit w-full cursor-move  gap-3 overflow-x-auto ">
          <div className=" flex w-max gap-2">
            {data?.map((vendor, index) => (
              <LogisticsForVendor
                key={index}
                vendor={vendor}
                addressCode={addressCode}
                orders={orders}
                setOrders={setOrders}
              />
            ))}
          </div>
        </div>
      </div>
      <Tooltip
        place="top"
        className={cn(
          "z-[50] !w-[250px] !rounded-sm border border-solid !bg-white !px-4 !py-6 !text-tertiary-pale-950 !opacity-100 !shadow-md",
        )}
        anchorSelect="#tooltip-vendor-logistics-select"
        clickable
      >
        Select a delivery service to use for each vendor you are purchasing
        from.
      </Tooltip>
    </>
  );
}

export default LogisticsContainer;

function LogisticsForVendor({
  vendor,
  addressCode,
  orders,
  setOrders,
}: {
  vendor: {
    businessId: string;
    items: Item;
  };
  addressCode: string;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
  const [refetch, setRefetch] = useState(false);
  const [active, setActive] = React.useState<number>(0);
  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: async (data: GetDeliveryEstimatePerVendorReq) =>
      await getDeliveryEstimatePerVendor(data),
    onSuccess: async (newData) => {
      // @ts-expect-error
      const _ = newData?.data?.fastest_courier;
      setOrders([
        ...orders.filter((order) => order?.businessId !== vendor?.businessId),
        {
          businessId: vendor?.businessId,
          businessName: vendor?.items[0].businessName,
          deliveryEstimate: _?.total,
          // @ts-expect-error
          request_token: newData?.data?.request_token,
          service_code: _?.service_code,
          courier_id: _?.courier_id,
          pickup_eta_time: _?.pickup_eta_time,
          delivery_eta_time: _?.delivery_eta_time,
          orders: vendor?.items?.map((item) => ({
            productName: item.productName,
            productId: item.productId,
            description: item?.description,
            unit_weight: item?.unit_weight,
            cost: item?.cost,
            picture: item?.picture,
            quantity: item?.quantity,
          })),
        },
      ]);
    },
    onError: (error) => {
      notify.error({
        message: "Failed to fetch delivery estimate",
        subtitle: error.message,
      });
    },
  });

  React.useEffect(() => {
    if (addressCode?.length < 1 && vendor?.items.length < 1) {
      notify.error({ message: "Please select an address" });
      return;
    }
    mutate({
      businessAddressCode: vendor.items[0].businessAddressCode,
      customerAddressCode: Number(addressCode),
      pickupDate: vendor.items[0].pickupDate,
      categoryId: vendor.items[0].categoryId,
      orders: vendor.items.map((item) => ({
        name: item.productName,
        description: item?.description,
        unit_weight: item?.unit_weight,
        unit_amount: item?.cost,
        quantity: item?.quantity.toString(),
      })),
    });
  }, [mutate, addressCode, refetch]);

  // console.log(isError, error, "Error fetching");

  // @ts-expect-error
  const newData = data as GetDeliveryEstimatePerVendorOrderRes;
  return (
    <div className=" flex h-[350px] w-[260px] flex-col gap-2 rounded-[7px] bg-white  py-[11px] xsm:w-[310px]">
      <header className="flex w-full flex-col items-center justify-center gap-2 ">
        <Typography variant="body-7">Select a delivery option:</Typography>
        <div className="inline-flex items-center justify-center gap-2">
          <div className="relative isolate aspect-square w-[41px] rounded-full">
            <span className="absolute right-[-3px] top-0 z-[1] rounded-full bg-[#FF4D4F] px-[6px] py-[2px] text-[10px] text-white">
              {vendor?.items?.length}
            </span>
            <ImageWrapper
              src={vendor?.items[0]?.business_profile_picture}
              fallbackSrc={logo}
              alt="random food"
              className="  rounded-full object-cover"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 25vw"
            />
          </div>
          <Typography
            variant={"body-5"}
            className="flex w-full items-center  justify-center gap-2"
          >
            <span className="mx-auto">{vendor?.items[0].businessName}</span>
          </Typography>
        </div>
      </header>
      <div className=" hideScrollBar w-full  flex-1 overflow-auto px-[21px]   ">
        {isPending ? (
          <div className="m-auto flex h-full w-full items-center justify-center">
            <span>
              {" "}
              <DotLoader />
            </span>
          </div>
        ) : isError ? (
          <div
            className={
              "flex h-full flex-col items-center justify-center gap-4 px-2"
            }
          >
            <Typography className="text-center">
              There are no delivery options available for this vendor now.
            </Typography>
            <Button size={"sm"} onClick={() => setRefetch(!refetch)}>
              Try again
            </Button>
          </div>
        ) : (
          newData?.data?.fastest_courier && (
            <div className="grid grid-cols-1 gap-4  pb-3 pt-3 tabular-nums xxsm:grid-cols-2">
              <>
                {[
                  newData?.data?.fastest_courier,
                  newData?.data?.cheapest_courier,
                  ...filterUniqueCouriers(newData),
                ]?.map((_, index) => (
                  <LogisticServiceCard
                    key={_?.courier_id}
                    active={active === index}
                    setActive={() => {
                      setActive(index);
                      setOrders([
                        ...orders?.filter(
                          (order) => order?.businessId !== vendor?.businessId,
                        ),
                        {
                          businessId: vendor?.businessId,
                          businessName: vendor?.items[0].businessName,
                          deliveryEstimate: _?.total,
                          request_token: newData?.data?.request_token,
                          service_code: _?.service_code,
                          courier_id: _?.courier_id,
                          pickup_eta_time: _?.pickup_eta_time,
                          delivery_eta_time: _?.delivery_eta_time,
                          orders: vendor?.items.map((item) => ({
                            productName: item.productName,
                            productId: item.productId,
                            description: item?.description,
                            unit_weight: item?.unit_weight,
                            cost: item?.cost,
                            picture: item?.picture,
                            quantity: item?.quantity,
                          })),
                        },
                      ]);
                    }}
                    text={
                      index === 0
                        ? "Fastest option"
                        : index === 1
                          ? "cheapest option"
                          : undefined
                    }
                    courier={_}
                  />
                ))}
              </>
            </div>
          )
        )}
      </div>
    </div>
  );
}

interface LogisticServiceCardProps {
  active?: boolean;
  setActive: () => void;
  text?: string;
  courier: Courier;
}

function LogisticServiceCard({
  active,
  setActive,
  text,
  courier,
}: LogisticServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative isolate flex w-full cursor-pointer flex-col rounded-[10px] border border-solid px-1 py-4 pb-2",
        active ? "border-green-600" : "border-gray-400",
      )}
      onClick={setActive}
    >
      <Typography className="absolute top-[-10px] z-[1] rounded-3xl bg-green-950 px-2 py-1 !text-[10px] font-normal text-white group-odd:-left-4 group-even:right-[-10px]">
        {formatCurrency(courier.total)}
      </Typography>
      <div className="mb-2 flex items-center gap-1">
        <div className="relative isolate  aspect-square !w-[25px]">
          <ImageWrapper
            src={courier.courier_image}
            fallbackSrc={logo}
            alt="random food"
            className="object-cover"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 25vw"
          />
        </div>
        {text && (
          <Typography
            variant="caption-s"
            className=" whitespace-nowrap rounded-2xl bg-primary-200 p-[2px_4px] !text-[9px] font-semibold capitalize"
            fontWeight={"semi-bold"}
          >
            {text}
          </Typography>
        )}
      </div>
      <div>
        <Typography
          variant="body-7"
          className=" mb-auto text-[10.5px] text-[#79756E]"
          fontWeight={"semi-bold"}
        >
          {courier.courier_name}
        </Typography>
      </div>
      <div className="mt-auto flex w-full items-center justify-between">
        <Typography variant="body-9" fontWeight={"semi-bold"}>
          Est.1-2days
        </Typography>
        <span
          className={cn(
            "scale-[0.80]",
            active ? "text-green-600" : "text-gray-400",
          )}
        >
          <DisabledIcon />
        </span>
      </div>
    </div>
  );
}
