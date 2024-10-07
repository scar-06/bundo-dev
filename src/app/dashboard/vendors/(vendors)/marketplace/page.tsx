"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GreenLocationIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";
import { useGeolocated } from "react-geolocated";

import { getAllCategories } from "@/lib/app/category/services";
import { getAllProducts } from "@/lib/app/user/services";
import PaginationButtons from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DotLoader from "@/components/loaders/dotLoader";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

import RecommendedVandors from "./components/recommendedVendors";
import VendorSearch from "./components/vendorSearch";
import VendorsInMyArea from "./components/vendorsInMyArea";
import VirtualMarketPlace from "./components/virtualMarketPlace";

function MarketPlace() {
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

  const { data: categoriesData, isLoading } = useQuery(
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
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },

    queryClient,
  );

  const {
    data,
    isLoading: isFetchingData,
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
          categories: activeTab === "tab-my-area" && filters,
          keyword: activeTab === "tab-my-area" && searchText,
        },
      ],

      queryFn: async (params) =>
        getAllProducts({
          ...params,
        }),
      enabled: (coords?.latitude as number)?.toString()?.length > 0,
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

  useEffect(() => {
    if (filters.length) {
      const targetElement = document.getElementById("vendors-id-view");
      const targetPosition = targetElement?.offsetTop;
      window.scrollTo({ top: targetPosition, behavior: "auto" });
    }
  }, [filters.length]);

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
  if (isNotSearching && (isLoading || isFetchingData || isLoadingData)) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <DotLoader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => {
          router.replace(`?t=${value}`);
        }}
        className="mb-[90px] mt-[-20px] w-full md:mt-[20px] "
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

        <TabsContent value="tab-virtual">
          {/* {isNotSearching && ( */}
          <>
            {isFetching || isFetchingData ? (
              <div className="flex w-fit cursor-move gap-4 pb-8  pt-3">
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
          </>
          {/* )} */}
          <VendorSearch
            handleFilterButtonClick={handleFilterButtonClick}
            handleSearch={handleSearch}
            filters={filters}
            categoriesData={categoriesData}
            isLoading={isLoading}
          />
          <div id="vendors-id-view">
            {isReLoadingData ? (
              <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-4">
                {Array(16)
                  .fill(0)
                  .map((_) => (
                    <SkeletonLoader
                      key={Math.random()}
                      className="h-[350px] w-[250px] overflow-x-auto  rounded-[10px] bg-[#FCFBF8] p-5 shadow-xl  "
                    />
                  ))}
              </div>
            ) : businesses && !businesses?.length ? (
              <div className="my-10 flex flex-col items-center justify-center">
                <VendorsEmptyState
                  icon={<GreenLocationIcon />}
                  descriptionOne=" No Vendors to display for now. "
                  descriptionTwo="Don’t forget to check back soon"
                />
              </div>
            ) : (
              <div>
                <VirtualMarketPlace data={businesses || []} />
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
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-my-area">
          <VendorSearch
            handleFilterButtonClick={handleFilterButtonClick}
            handleSearch={handleSearch}
            filters={filters}
            categoriesData={categoriesData}
            isLoading={isLoading}
            text={"Discover vendors near you"}
          />
          {isFetchingData || isFetching ? (
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
                descriptionOne=" No Vendors near you to display for now. "
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
                  setCurrentPage={setPageNumber}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MarketPlace;
