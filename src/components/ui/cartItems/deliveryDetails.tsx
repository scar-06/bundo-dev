"use client";

import React, { useEffect } from "react";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getDeliveryLocations,
  IDeliveryLocation,
} from "@/lib/app/orders/services";
import DotLoader from "@/components/loaders/dotLoader";
import { Typography } from "@/components/typography";

import AddressCard from "./addressCard";
import DropOffDetails from "./dropOffDetails";

type Props = {
  selectedDeleiveryAddressId: string;
  setSelectedDeleiveryAddressId: (id: string) => void;
  setDeliveryLoc: React.Dispatch<
    React.SetStateAction<IDeliveryLocation | null>
  >;
};

function DeliveryDetails({
  selectedDeleiveryAddressId,
  setSelectedDeleiveryAddressId,
  setDeliveryLoc,
}: Props) {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery(
    {
      queryKey: [QUERY_KEYS.DELIVERYLOCATION],
      queryFn: async () => getDeliveryLocations(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    queryClient,
  );

  useEffect(() => {
    if (
      (data?.data?.length as number) > 0 &&
      selectedDeleiveryAddressId.length < 1
    ) {
      setSelectedDeleiveryAddressId(data?.data[0]?.addressCode as string);
      setDeliveryLoc(data?.data[0] as IDeliveryLocation);
    }
  }, [isPending, data]);

  if (isPending) {
    return (
      <div className="flex h-[330px] w-full items-center justify-center ">
        <span>
          <DotLoader />
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant={"body-5"}>
          <h3>Delivery Details</h3>
        </Typography>
        {(data?.data?.length as number) > 0 && (
          <DropOffDetails addNewDropOffLocation={false} />
        )}
      </div>

      {(data?.data?.length as number) < 1 ? (
        <div className="flex w-full items-center  justify-center rounded-[6px] bg-white py-[33px]">
          <DropOffDetails addNewDropOffLocation />
        </div>
      ) : (
        <div className="hideScrollBar  h-full w-full cursor-move  gap-3 overflow-x-auto ">
          <div className=" flex w-max gap-2">
            {data?.data?.map((address) => (
              <AddressCard
                key={address.address}
                isActive={selectedDeleiveryAddressId === address.addressCode}
                address={address}
                setSelectedDeleiveryAddressId={(id) => {
                  setSelectedDeleiveryAddressId(id);
                  setDeliveryLoc(address);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryDetails;
