"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GreenLocationIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import _debounce from "lodash.debounce";
import { useGeolocated } from "react-geolocated";

import {
  categoriesResponseItem,
  getAllCategories,
} from "@/lib/app/category/services";
import { getAllProducts } from "@/lib/app/user/services";
import PaginationButtons from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DotLoader from "@/components/loaders/dotLoader";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

import ExploreVendors from "./_components/exploreVendors";
import MarketplaceAdz from "./_components/marketplaceAdz";
import MarketplaceSearch from "./_components/marketplaceSearch";
import MarketplaceSort from "./_components/marketplaceSort";
import RecommendedVandors from "./_components/recommendedVandors";

function Marketplace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("t") || "tab-virtual";
  const filters = searchParams.get("f")?.split("+") ?? [];
  const searchText = searchParams.get("searchText") ?? "";
  const page = searchParams.get("page") ?? 1;

  const queryClient = useQueryClient();

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: Infinity,
    },
    userDecisionTimeout: undefined,
    suppressLocationOnMount: false,
  });

  const {
    data: categoriesData,
    isLoading: isFirstLoading,
    isFetching: isLoadingCategories,
  } = useQuery(
    {
      queryKey: [QUERY_KEYS.CATEGORIES],
      queryFn: async () => getAllCategories(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );
  const {
    data: marketPlaceData,
    isLoading: isLoadingData,
    isFetching: isReLoadingData,
  } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        {
          page: page,
          limit: 100,
          categories: filters,
          keyword: searchText,
        },
      ],

      queryFn: async (params) =>
        getAllProducts({
          ...params,
        }),
      enabled: true,
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },

    queryClient,
  );

  const {
    data,
    isLoading: isFirstFetching,
    isFetching,
  } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        {
          page: page,
          limit: 100,
          lat: coords?.latitude,
          long: coords?.longitude,
          categories: filters,
          keyword: searchText,
        },
      ],

      queryFn: async (params) =>
        getAllProducts({
          ...params,
        }),
      enabled: !!coords?.latitude && !!coords?.longitude,
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
      router.push(`
        ?t=${activeTab}${
          filters.length > 0
            ? `&f=${encodeURIComponent(filters.join("+"))}`
            : ""
        }${`&searchText=${encodeURIComponent(event.target.value)}`}
      `);
    },
    500,
  );

  const handleFilterButtonClick = (selectedCategory: string) => {
    if (filters?.includes(selectedCategory)) {
      const filtered: string[] = filters?.filter(
        (ele) => ele !== selectedCategory,
      );
      router.push(
        `?t=${activeTab}${
          filtered.length > 0
            ? `&f=${encodeURIComponent(filtered.join("+"))}`
            : ""
        }${
          searchText.length > 0
            ? `&searchText=${encodeURIComponent(searchText)}`
            : ""
        }`,
      );
    } else {
      router.push(
        `?t=${activeTab}${
          [...filters, selectedCategory].length > 0
            ? `&f=${encodeURIComponent(
                [...filters, selectedCategory].join("+"),
              )}`
            : ""
        }${
          searchText.length > 0
            ? `&searchText=${encodeURIComponent(searchText)}`
            : ""
        }`,
      );
    }
  };
  const isNotSearching = searchText.length === 0 && filters.length < 1;

  const setPageNumber = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", (page + 1).toString());
    router.push(`?${newSearchParams.toString()}`, {
      scroll: true,
    });
  };
  return (
    <div className=" flex min-h-[50vh]  w-full flex-col gap-8 overflow-x-hidden  ">
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => {
          router.replace(`?t=${value}`);
        }}
        className="mb-[90px] mt-[20px] w-full"
      >
        <TabsList className=" z-[50] mx-auto mb-[40px] flex h-fit w-fit gap-[30px] rounded-lg px-[clamp(15px,3vw,20px)] py-[clamp(8px,3vw,12px)] shadow-[0px_0px_1px_0px_rgba(9,_30,_66,_0.31),_0px_18px_28px_0px_rgba(9,_30,_66,_0.15)] md:mb-[60px] lg:gap-[60px] mxxss:gap-[15px] mxxssw:scale-[0.9]">
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
        <TabsContent value="tab-virtual">
          {isLoadingData && isNotSearching ? (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <DotLoader />
            </div>
          ) : (
            <>
              <div className="mb-12 flex w-full flex-col gap-3">
                <MarketplaceSearch
                  text={"marketplace"}
                  handleSearch={handleSearch}
                />
                {isLoadingCategories ? (
                  <div className="flex w-full items-center gap-4">
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
                    items={
                      categoriesData?.categories as categoriesResponseItem[]
                    }
                    filters={filters}
                    setFilters={handleFilterButtonClick}
                  />
                )}
              </div>
              {isNotSearching ? (
                <>
                  <MarketplaceAdz />
                  {isFetching ? (
                    <div className=" container grid w-full grid-cols-1 gap-4 gap-x-4  gap-y-4 pb-8 pt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xlg:grid-cols-5">
                      {Array(5)
                        .fill(0)
                        .map((_) => (
                          <SkeletonLoader
                            key={Math.random()}
                            className="h-[350px] w-[250px] overflow-x-auto  rounded-[10px] bg-[#FCFBF8] shadow-xl"
                          />
                        ))}
                    </div>
                  ) : businessesInMyArea && businessesInMyArea?.length < 1 ? (
                    <div className="my-20 flex flex-col items-center justify-center">
                      <VendorsEmptyState
                        icon={<GreenLocationIcon />}
                        descriptionOne=" No Vendors to display for now."
                        descriptionTwo="Don’t forget to check back soon"
                      />
                    </div>
                  ) : (
                    <RecommendedVandors data={businessesInMyArea || []} />
                  )}
                  {isReLoadingData ? (
                    <div className="container mx-auto grid w-full grid-cols-1 gap-4  gap-x-4 gap-y-4 pb-8 pt-3 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xlg:grid-cols-5">
                      {Array(5)
                        .fill(0)
                        .map((_) => (
                          <SkeletonLoader
                            key={Math.random()}
                            className="h-[350px] w-[250px] overflow-x-auto  rounded-[10px] bg-[#FCFBF8] shadow-xl"
                          />
                        ))}
                    </div>
                  ) : // @ts-expect-error
                  businesses?.length < 1 ? (
                    <div className="my-20 flex flex-col items-center justify-center">
                      <VendorsEmptyState
                        icon={<GreenLocationIcon />}
                        descriptionOne=" No Vendors to display for now."
                        descriptionTwo="Don’t forget to check back soon"
                      />
                    </div>
                  ) : (
                    <ExploreVendors data={businesses || []} />
                  )}
                  {isPagination && (
                    <div className="flex w-full justify-center">
                      <div className="flex  space-x-2 px-6 py-8 ">
                        <PaginationButtons
                          currentPage={marketPlaceData?.products.page ?? 1}
                          totalPages={marketPlaceData?.products.totalPages ?? 1}
                          setCurrentPage={setPageNumber}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isReLoadingData ? (
                    <div className="container mx-auto grid w-full grid-cols-1 gap-x-4 gap-y-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
                      {Array(5)
                        .fill(0)
                        .map((_) => (
                          <SkeletonLoader
                            key={Math.random()}
                            className="h-[350px] w-[250px] overflow-x-auto  rounded-[10px] bg-[#FCFBF8] shadow-xl"
                          />
                        ))}
                    </div>
                  ) : // @ts-expect-error
                  businesses?.length < 1 ? (
                    <div className="my-20 flex flex-col items-center justify-center">
                      <VendorsEmptyState
                        icon={<GreenLocationIcon />}
                        descriptionOne=" No Vendors to display for now."
                        descriptionTwo="Don’t forget to check back soon"
                      />
                    </div>
                  ) : (
                    <ExploreVendors data={businesses || []} />
                  )}
                  {isPagination && (
                    <div className="flex w-full justify-center">
                      <div className="flex  space-x-2 px-6 py-8 ">
                        <PaginationButtons
                          currentPage={marketPlaceData?.products.page ?? 1}
                          totalPages={marketPlaceData?.products.totalPages ?? 1}
                          setCurrentPage={setPageNumber}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="tab-my-area">
          {isFirstFetching && isNotSearching ? (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <DotLoader />
            </div>
          ) : (
            <>
              <div className="mb-12 flex w-full flex-col gap-3">
                <MarketplaceSearch handleSearch={handleSearch} />
                {isLoadingCategories ? (
                  <div className="flex w-full items-center gap-4">
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
                    items={
                      categoriesData?.categories as categoriesResponseItem[]
                    }
                    filters={filters}
                    setFilters={handleFilterButtonClick}
                  />
                )}
              </div>
              {isFetching ? (
                <div className="container mx-auto grid w-full grid-cols-1 gap-4  gap-x-4 gap-y-4 pb-8 pt-3 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
                  {Array(5)
                    .fill(0)
                    .map((_) => (
                      <SkeletonLoader
                        key={Math.random()}
                        className="h-[350px] w-[250px] overflow-x-auto  rounded-[10px] bg-[#FCFBF8] shadow-xl"
                      />
                    ))}
                </div>
              ) : businessesInMyArea && businessesInMyArea?.length < 1 ? (
                <div className="my-20 flex flex-col items-center justify-center">
                  <VendorsEmptyState
                    icon={<GreenLocationIcon />}
                    descriptionOne=" No Vendors to display for now."
                    descriptionTwo="Don’t forget to check back soon"
                  />
                </div>
              ) : (
                <ExploreVendors data={businessesInMyArea || []} />
              )}
              {isPagination && (
                <div className="flex w-full justify-center">
                  <div className="flex  space-x-2 px-6 py-8 ">
                    <PaginationButtons
                      currentPage={data?.products.page ?? 1}
                      totalPages={data?.products.totalPages ?? 1}
                      setCurrentPage={setPageNumber}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Marketplace;
