"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { GreenLocationIcon, SearchIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";
import { useGeolocated } from "react-geolocated";

import { getAllCategories } from "@/lib/app/category/services";
import { getAllProducts } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import { Input } from "@/components/ui/input";
import PaginationButtons from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import MarketplaceSort from "@/app/(root)/marketplace/_components/marketplaceSort";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

import RecommendedVandors from "./components/recommendedVendors";
import VendorsInMyArea from "./components/vendorsInMyArea";
import VirtualMarketPlace from "./components/virtualMarketPlace";

function MarketPlace() {
  const [selectedFilters, setSelectedFilters] = React.useState<any[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const queryClient = useQueryClient();

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: Infinity,
    },
    userDecisionTimeout: undefined,
    suppressLocationOnMount: false,
  });

  const { data: categoriesData, isFetching: isLoading } = useQuery(
    {
      queryKey: [QUERY_KEYS.CATEGORIES],
      queryFn: async () => getAllCategories(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );
  const { data: marketPlaceData, isFetching: isLoadingData } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        {
          page: currentPage,
          limit: 100,
          categories: selectedFilters,
          keyword: searchText,
        },
      ],

      queryFn: async (params) =>
        getAllProducts({
          ...params,
        }),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
    },

    queryClient,
  );

  const { data, isFetching } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        {
          page: currentPage,
          limit: 100,
          lat: coords?.latitude,
          long: coords?.longitude,
          keyword: searchText,

          categories: selectedFilters,
        },
      ],

      queryFn: async (params) =>
        getAllProducts({
          ...params,
        }),
      enabled: !!(coords?.latitude && coords?.longitude),
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },

    queryClient,
  );

  const businesses = marketPlaceData?.products?.businesses;
  const businessesInMyArea = data?.products?.businesses;
  const isPagination =
    Number(marketPlaceData?.products.totalPages as number) > 1 ??
    data?.products?.totalPages;
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
    <div className="">
      <Tabs
        defaultValue="tab-virtual"
        className="mb-[90px] mt-[20px] w-full overflow-x-hidden"
      >
        <TabsList className=" z-[50] mx-auto mb-[60px] mt-8 flex h-fit w-fit gap-[30px] rounded-lg px-[clamp(15px,3vw,20px)] py-[clamp(8px,3vw,12px)] shadow-[0px_0px_1px_0px_rgba(9,_30,_66,_0.31),_0px_18px_28px_0px_rgba(9,_30,_66,_0.15)] lg:gap-[60px] mxxss:gap-[15px] mxxssw:scale-[0.9]">
          <TabsTrigger
            value="tab-virtual"
            className="w-fit rounded-sm bg-transparent font-normal text-tertiary-pale-950 data-[state=active]:bg-[#1E404E] data-[state=active]:p-[clamp(12px,_3vw,_14px)_clamp(_26px,_3vw,_34px)] data-[state=active]:font-semibold data-[state=active]:text-white"
          >
            <span className="m-auto whitespace-nowrap text-center text-xs ">
              Virtual Marketplace
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="tab-my-area"
            className="w-fit rounded-sm bg-transparent font-normal text-tertiary-pale-950 data-[state=active]:bg-[#1E404E] data-[state=active]:p-[clamp(12px,_3vw,_14px)_clamp(_26px,_3vw,_34px)] data-[state=active]:font-semibold data-[state=active]:text-white"
          >
            {" "}
            <span className="m-auto   whitespace-nowrap text-center text-xs ">
              Vendors in my Area
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-virtual" className="m-0 p-0">
          {isFetching ? (
            <div className="mx-5 flex w-fit cursor-move gap-4 pb-8  pt-3">
              {Array(8)
                .fill(0)
                .map((_) => (
                  <SkeletonLoader
                    key={Math.random()}
                    className=" h-[350px] w-[230px] overflow-x-auto rounded-[10px]  bg-[#FCFBF8] shadow-xl "
                  />
                ))}
            </div>
          ) : businessesInMyArea && businessesInMyArea?.length > 0 ? (
            <RecommendedVandors
              data={businessesInMyArea || []}
              classContainer=" w-[230px] md:w-fit "
            />
          ) : (
            <div className="my-20 flex flex-col items-center justify-center">
              <VendorsEmptyState
                icon={<GreenLocationIcon />}
                descriptionOne=" No Recommended Vendors to display for now."
                descriptionTwo="Don’t forget to check back soon"
              />
            </div>
          )}
        </TabsContent>
        <div className="flex w-full flex-col items-center text-sm font-semibold md:px-0">
          <div className="flex w-full flex-col items-center px-4">
            {/* Discover vendors near you 🛍🛒 */}
            <TabsContent value="tab-my-area">
              <span className=" text-[12px] md:text-sm">
                Discover vendors near you 🛍🛒{" "}
              </span>
            </TabsContent>
            <TabsContent value="tab-virtual">
              <span className="text-[12px] font-semibold md:text-sm ">
                Find <span className="hidden md:inline-flex">new</span> vendors
                in our virtual marketplace 🛍🛒
              </span>
            </TabsContent>
            <div
              // tabIndex={0}
              className="group mb-4 mt-2 flex h-[53px] w-full max-w-sm items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)]  px-[10px] lg:w-full xlg:w-full"
            >
              <span className="">
                <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
              </span>
              <Input
                onChange={handleSearch}
                placeholder="Search for vendors and products....."
                className="h-full border-none bg-transparent text-xs font-normal outline-none"
              />
            </div>
          </div>
          <div className="hideScrollBar mb-4 w-full flex-col overflow-x-auto">
            <div className="w-full [&>div>div>div]:xlg:!ml-[unset]">
              {isLoading ? (
                <div className="flex w-full cursor-move items-center gap-4  px-0 py-1 ">
                  {Array(15)
                    .fill(0)
                    .map((_) => (
                      <SkeletonLoader
                        key={Math.random()}
                        className="whitespace-nowrap rounded-full border border-primary-500  p-[18px_50px] text-sm outline-none transition-all ease-in-out remove-tap-highlight"
                      />
                    ))}
                </div>
              ) : (
                <MarketplaceSort
                  items={categoriesData?.categories || []}
                  filters={selectedFilters}
                  setFilters={handleFilterButtonClick}
                />
              )}
            </div>
          </div>
          <div className="w-full px-4 lg:pr-16">
            <TabsContent value="tab-virtual">
              {isLoadingData ? (
                <div className="grid w-full grid-cols-2 gap-x-2 gap-y-4 px-4 sm:gap-x-4  md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-4">
                  {Array(16)
                    .fill(0)
                    .map((_) => (
                      <SkeletonLoader
                        key={Math.random()}
                        className="h-[350px] w-full overflow-x-auto  rounded-[10px] bg-[#FCFBF8] p-5 shadow-xl  "
                      />
                    ))}
                </div>
              ) : !businesses?.length ? (
                <div className="my-10 flex flex-col items-center justify-center">
                  <VendorsEmptyState
                    icon={<GreenLocationIcon />}
                    descriptionOne=" No Vendors to display for now. "
                    descriptionTwo="Don’t forget to check back soon"
                  />
                </div>
              ) : (
                <>
                  <VirtualMarketPlace data={businesses || []} />
                  {isPagination && (
                    <div className="flex w-full justify-center">
                      <div className="flex  space-x-2 px-6 py-8 ">
                        <PaginationButtons
                          currentPage={marketPlaceData?.products.page ?? 1}
                          totalPages={marketPlaceData?.products.totalPages ?? 1}
                          setCurrentPage={(page) => setCurrentPage(page + 1)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            <TabsContent value="tab-my-area">
              {isFetching ? (
                <div className="flex w-fit cursor-move gap-4 pb-8  pt-3">
                  {Array(5)
                    .fill(0)
                    .map((_) => (
                      <SkeletonLoader
                        key={Math.random()}
                        className="h-[350px] w-[250px] overflow-x-auto  rounded-[10px] bg-[#FCFBF8] p-5 shadow-xl  "
                      />
                    ))}
                </div>
              ) : !businessesInMyArea?.length ? (
                <div className="my-10 flex flex-col items-center justify-center">
                  <VendorsEmptyState
                    icon={<GreenLocationIcon />}
                    descriptionOne=" No Vendors to display for now. "
                    descriptionTwo="Don’t forget to check back soon"
                  />
                </div>
              ) : (
                <VendorsInMyArea data={businessesInMyArea || []} />
              )}
              {isPagination && (
                <div className="flex w-full justify-center">
                  <div className="flex  space-x-2 px-6 py-8 ">
                    <PaginationButtons
                      currentPage={data?.products.page ?? 1}
                      totalPages={data?.products.totalPages ?? 1}
                      setCurrentPage={(page) => setCurrentPage(page + 1)}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default MarketPlace;
