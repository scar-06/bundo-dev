"use client";

import { useState } from "react";
import { GreenLocationIcon, SearchIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";

import { getAllCategories } from "@/lib/app/category/services";
import { getListAllAds } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import cn from "@/lib/utils";
import { Input } from "@/components/ui/input";
import GoBack from "@/components/goBack";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import AdzCard from "@/app/(root)/marketplace/_components/adzCard";
import MarketplaceSort from "@/app/(root)/marketplace/_components/marketplaceSort";

import VendorsEmptyState from "../_components/vendorsEmptyState";

function AllAds() {
  const queryClient = useQueryClient();
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);

  const [searchText, setSearchText] = useState("");
  const { tableParams } = useTableParams();

  const { data, isFetching } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.LIST_ADS,
        {
          page: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,

          keyword: searchText,
          categories: selectedFilters,
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

  const { data: categoriesData } = useQuery(
    {
      queryKey: [QUERY_KEYS.CATEGORIES],
      queryFn: async () => getAllCategories(),
      enabled: true,
      refetchOnMount: false,
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

  const handleFilterButtonClick = (selectedCategory: string) => {
    if (selectedFilters?.includes(selectedCategory)) {
      const filters: string[] = selectedFilters?.filter(
        (ele) => ele !== selectedCategory,
      );
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };
  return (
    <div className="lg:pl-16">
      <div className="mx-5 lg:mx-0">
        <GoBack text="All Ads" noMargin />
      </div>
      <div className="mx-auto mt-6 max-w-screen-xlg ">
        <div className="flex w-full flex-col lg:mb-4 lg:items-center ">
          <div className="px-5 lg:px-0">
            <span className="text-[11px] font-medium md:text-xs ">
              Search Ads👇🏽🛍
            </span>

            <div className="group mb-4 mt-2 flex h-[53px] items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)] px-[10px]  lg:w-[380px]">
              <span className="">
                <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
              </span>
              <Input
                placeholder="Search...."
                className="h-full border-none bg-transparent text-[11px]  outline-none md:text-xs"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className=" m-auto w-full px-0">
            <div className="hideScrollBar w-full flex-col overflow-x-auto  ">
              <div className=" flex w-fit cursor-move gap-2 py-1">
                <MarketplaceSort
                  items={categoriesData?.categories || []}
                  filters={selectedFilters}
                  setFilters={handleFilterButtonClick}
                />
              </div>
            </div>
          </div>
          <div className=" w-full overflow-x-auto">
            {isFetching ? (
              <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-4">
                {Array(10)
                  .fill(0)
                  .map((_) => (
                    <SkeletonLoader
                      key={Math.random()}
                      className={cn(
                        `flex h-[243px] w-full flex-col ${"md:w-[243px]"} my-2  gap-3 rounded-[5px] px-[10px] py-[12px]`,
                        " bg-white shadow-[0px_20px_24px_0px_#1111110F]",
                      )}
                    />
                  ))}
              </div>
            ) : data?.allAds && data?.allAds?.allAds.length > 0 ? (
              <div className="grid w-full grid-cols-1 justify-center gap-8 px-4 pt-4 md:grid-cols-2 md:px-0 lg:grid-cols-3  xlg:grid-cols-3 ">
                {data?.allAds?.allAds?.map((item, index) => (
                  <AdzCard
                    varient={index % 2 === 0 ? "deep" : "light"}
                    key={Math.random() * Math.PI}
                    widthSize="w-fit"
                    width="lg:w-[310px] mx-auto w-full "
                    imgHeight="h-[90px]"
                    ad={item}
                    imgWidth="w-[95px] my-auto rounded-none"
                    businessName={item?.businessName}
                    category={item?.categories}
                  />
                ))}
              </div>
            ) : (
              <div className="my-20 flex w-full items-center justify-center">
                <VendorsEmptyState
                  icon={<GreenLocationIcon />}
                  descriptionOne=" No Ads to display now"
                  descriptionTwo={`Don’t forget to check back soon`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllAds;
