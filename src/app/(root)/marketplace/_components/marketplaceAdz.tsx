import React from "react";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

import { getListAllAds } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";

import SeeAll from "../../_components/seeAll";
import AdzCard from "./adzCard";

function MarketplaceAdz() {
  const queryClient = useQueryClient();
  const { tableParams, setTableParams } = useTableParams();
  const { data, isFetching, isError } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.LIST_ADS,
        {
          page: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
        },
      ],

      queryFn: async (params) =>
        getListAllAds({
          ...params,
        }),
      enabled: true,
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },

    queryClient,
  );
  const user = useStore(useUserStore, (state) => state);
  const isVendor = user.user?.role === "vendor";

  return (data?.allAds?.allAds?.length as number) > 0 ? (
    <div className=" ml-6 flex flex-col items-start gap-3 pb-8 xlg:ml-0">
      <header className="container flex items-center gap-5">
        <h2 className="text-xs  font-semibold text-tertiary-pale-950  md:text-sm">
          Check out these Ads🔥😍
        </h2>{" "}
        <SeeAll path={`${isVendor ? "ads" : "allAds"}`} />
      </header>
      <div className="hideScrollBar w-full flex-col overflow-x-auto ">
        <div className=" flex w-fit cursor-move gap-4  pb-6  pt-3 xlg:ml-[calc(_(100vw_-_1200px)_/_2)]">
          {data?.allAds?.allAds?.map((_, index) => (
            <AdzCard
              varient={index % 2 === 0 ? "deep" : "light"}
              key={Math.random() * Math.PI}
              widthSize="w-fit"
              width="lg:w-[310px] mx-auto"
              imgHeight="h-[90px]"
              ad={_}
              imgWidth="w-[95px] my-auto rounded-none"
              businessName={_?.businessName}
              category={_?.categories}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default MarketplaceAdz;
