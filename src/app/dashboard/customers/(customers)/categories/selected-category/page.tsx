"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GreenLocationIcon, SearchIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";
import { useGeolocated } from "react-geolocated";

import { getAllCategories } from "@/lib/app/category/services";
import { getAllProducts, updateFollowVendors } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import { Input } from "@/components/ui/input";
import PaginationButtons from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoBack from "@/components/goBack";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import { SelectOptionBtn } from "@/app/(root)/marketplace/_components/marketplaceSort";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

import RecommendedVandors from "../../marketplace/components/recommendedVendors";
import VendorsInMyArea from "../../marketplace/components/vendorsInMyArea";
import VirtualMarketPlace from "../../marketplace/components/virtualMarketPlace";

function SelectedCategory() {
  const searchparams = useSearchParams();
  const category = searchparams.get("category");
  const { tableParams, setTableParams } = useTableParams();
  const [selectedFilters, setSelectedFilters] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const queryClient = useQueryClient();

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: Infinity,
    },
    userDecisionTimeout: undefined,
    suppressLocationOnMount: false,
  });

  const { data: marketPlaceData, isFetching: isLoadingData } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        {
          page: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
          categories: category,
        },
      ],

      queryFn: async (params) =>
        getAllProducts({
          ...params,
        }),
      enabled: !!category,
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },

    queryClient,
  );

  const businesses = marketPlaceData?.products?.businesses;

  const isPagination = Number(marketPlaceData?.products.page as number) > 1;

  return (
    <div className="mx-3 md:mx-0 lg:pl-12 ">
      <div className="mx-1 mb-8">
        <GoBack text={`${category} Category`} noMargin />
      </div>

      <Tabs
        defaultValue="tab-virtual"
        className="mb-[90px] w-full overflow-x-hidden"
      >
        <div className="flex w-full flex-col items-center text-sm font-semibold">
          <div className="w-full ">
            <TabsContent value="tab-virtual">
              {isLoadingData ? (
                <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-4">
                  {Array(16)
                    .fill(0)
                    .map((_) => (
                      <SkeletonLoader
                        key={Math.random()}
                        className="h-[350px] w-full overflow-x-auto rounded-[10px]  bg-[#FCFBF8] p-5 shadow-xl md:w-[250px]  "
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
                <div className="w-full">
                  <VirtualMarketPlace data={businesses || []} />
                  {isPagination && (
                    <div className="flex w-full justify-center">
                      <div className="flex  space-x-2 px-6 py-8 ">
                        <PaginationButtons
                          currentPage={tableParams.pagination.pageNumber}
                          totalPages={tableParams.pagination.totalPage!}
                          setCurrentPage={setCurrentPage}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default SelectedCategory;
