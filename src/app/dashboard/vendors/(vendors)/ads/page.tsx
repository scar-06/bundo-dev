"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, GreenLocationIcon, SearchIcon } from "@/assets";
import { useVendorBusinessStore } from "@/store/business.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import _debounce from "lodash.debounce";
import { useStore } from "zustand";

import { getAllAds } from "@/lib/app/ads/services";
import { Input } from "@/components/ui/input";
import PaginationButtons from "@/components/ui/pagination";
import GoBack from "@/components/goBack";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import AdzCard from "@/app/(root)/marketplace/_components/adzCard";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

function AllAds() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const business = useStore(
    useVendorBusinessStore,
    (state) => state.business?.business,
  );
  const businessCategories = business?.categories;
  const businessName = business?.name;
  const queryClient = useQueryClient();

  const { data, isFetching: isLoadingData } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.ALL_ADS,
        {
          page: currentPage + 1,
          limit: 20,
          keyword: searchText,
        },
      ],
      queryFn: async (params) =>
        getAllAds({
          ...params,
        }),
      enabled: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },

    queryClient,
  );
  const handleSearch = _debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000,
  );
  const newData =
    data?.allAds.allAds.filter(
      (item) => item.vendorId === business?.vendorId,
    ) ?? [];
  return (
    <div className="mb-20 h-fit w-full pb-20">
      <div className="mx-auto max-w-screen-xlg">
        <GoBack text="All Ads" noMargin />
        <div className="flex w-full flex-col lg:mb-4 lg:items-center ">
          <div className="mt-6">
            <span className="text-[11px] font-medium sm:text-sm  ">
              Search Ads👇🏽🛍
            </span>

            <div className="group mb-4 mt-2 flex h-[53px] items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)] px-[10px]  lg:w-[511px]">
              <span className="">
                <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
              </span>
              <Input
                placeholder="Search for a ads...."
                className="h-full border-none bg-transparent text-[11px] outline-none sm:text-sm"
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className=" w-full">
            {isLoadingData ? (
              <div className="grid grid-cols-1 justify-center gap-8 pt-4 md:grid-cols-2 lg:grid-cols-3  xlg:grid-cols-3 ">
                {Array(8)
                  .fill(0)
                  .map((_) => (
                    <SkeletonLoader
                      key={Math.random()}
                      className="h-[200px] w-full overflow-x-auto rounded-[10px]  bg-[#FCFBF8] p-5 shadow-xl xsm:w-[350px]  "
                    />
                  ))}
              </div>
            ) : newData.length > 0 ? (
              <div className="grid grid-cols-1 justify-center gap-8 pt-4 md:grid-cols-2 lg:grid-cols-3  xlg:grid-cols-3 ">
                {newData?.map((_, index) => (
                  <AdzCard
                    varient={index % 2 === 0 ? "deep" : "light"}
                    key={Math.random() * Math.PI}
                    widthSize="w-fit"
                    width="lg:w-[310px] mx-auto"
                    imgHeight="h-[90px]"
                    imgWidth="w-[95px] my-auto rounded-none"
                    ad={_}
                    businessName={businessName as string}
                    category={businessCategories as string[]}
                  />
                ))}
              </div>
            ) : (
              <div className="mx-auto my-10 flex flex-col items-center justify-center">
                <VendorsEmptyState
                  icon={<GreenLocationIcon />}
                  descriptionOne=" No Ads to display now"
                  descriptionTwo={`Don’t forget to check back soon`}
                />
              </div>
            )}
          </div>
        </div>

        {(data?.allAds.metaData.pages as number) > 1 && (
          <div className="flex w-full justify-center">
            <div className="flex  space-x-2 px-6 py-8 ">
              <PaginationButtons
                currentPage={currentPage}
                totalPages={data?.allAds.metaData.pages as number}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllAds;
