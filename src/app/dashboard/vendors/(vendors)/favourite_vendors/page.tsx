"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, GreenLoveIcon, HeartIcon, SearchIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";
import { useGeolocated } from "react-geolocated";

import {
  getAllProducts,
  GetBusinesses,
  getFollowedVendors,
} from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import { Input } from "@/components/ui/input";
import PaginationButtons from "@/components/ui/pagination";
import GoBack from "@/components/goBack";
import PageLoader from "@/components/loaders/pageLoader";
import TabPannel from "@/components/shared/tabPannel/tabPannel";
import VendorCard from "@/app/(root)/marketplace/_components/vendorCard";

import VendorsEmptyState from "../../../customers/(customers)/_components/vendorsEmptyState";

function FavouriteVendors() {
  const router = useRouter();
  const [tabkey, setTabKey] = React.useState("0");
  const { tableParams, setTableParams } = useTableParams();
  const [searchText, setSearchText] = React.useState("");
  const [totalPages, setTotalPages] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: Infinity,
    },
    userDecisionTimeout: undefined,
    suppressLocationOnMount: false,
  });
  const tabLinkOption = [
    {
      value: "0",
      label: "Products",
      icon: "",
    },
    {
      value: "1",
      label: "Services",
      icon: "",
    },
  ];

  const queryClient = useQueryClient();
  const { data, isFetching, isError } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        {
          pages: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
          name: searchText,
          lat: coords?.latitude,
          long: coords?.longitude,
        },
      ],

      queryFn: async (params) =>
        getFollowedVendors({
          ...params,
        }),
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

  const favouritedVendors = data?.user?.vendors;
  const productServices = (favouritedVendors as GetBusinesses[])?.filter(
    (vendor) => vendor.business_type === "services",
  );
  const productVendors = (favouritedVendors as GetBusinesses[])?.filter(
    (v) => v.business_type === "products",
  );
  const isPagination = Number(data?.user?.metaData.pages as number) > 1;
  return (
    <div className=" w-full">
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <GoBack text=" Favourite vendors" noMargin />
          <span className=" mx-1 text-[#DE350B]">{`(${
            (favouritedVendors && favouritedVendors?.length) || 0
          })`}</span>
        </div>

        <div className="flex w-full flex-col items-center lg:my-6 ">
          <div className="flex w-full flex-col justify-center">
            <span className="mx-auto text-[10px] font-medium text-[#302F2C] sm:text-xs ">
              Reconnect and shop easily from vendors you have favourited
            </span>
            {/* <div className="my-3 hidden xlg:block"> */}
            <div
              // tabIndex={0}
              className="group mx-auto my-3 flex h-[53px] w-full items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)] px-[10px]  sm:w-[557px]"
            >
              <span className="">
                <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
              </span>
              <Input
                onChange={handleSearch}
                placeholder="Search for a fav vendor...."
                className="h-full border-none bg-transparent text-[10px] outline-none md:text-sm"
              />
            </div>
            <div className="flex items-center justify-center">
              <TabPannel
                activeTab={tabkey}
                options={tabLinkOption}
                width="w-fit items-center justify-center gap-4 p-2"
                isIcon={false}
                onChange={(values) => {
                  setTabKey(values as string);
                }}
                className=" "
              />
            </div>

            {/* </div> */}
          </div>
          {tabkey === "0" ? (
            isFetching ? (
              <PageLoader />
            ) : productVendors && !productVendors?.length ? (
              <div className="flex h-[50vh] items-center">
                <VendorsEmptyState
                  icon={<GreenLoveIcon />}
                  descriptionOne=" You don’t have any Favourite product vendor yet."
                  descriptionTwo=" Visit any vendor’s page to add them to your favourites"
                />
              </div>
            ) : (
              <>
                <div className=" mt-4 grid w-fit grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {productVendors?.map((item) => (
                    <VendorCard
                      varient="default"
                      key={Math.random() * Math.PI}
                      id={item._id}
                      address={item?.address}
                      business_profile_picture={item?.business_profile_picture}
                      categories={item?.categories}
                      description={item?.description}
                      location={item?.location}
                      name={item?.name}
                      total_ratings={item?.total_ratings}
                      total_reviews={item?.total_reviews}
                      minutes_away={item?.minutes_away}
                      vendorId={item?._id}
                    />
                  ))}
                </div>
                {isPagination && (
                  <div className="flex w-full justify-center">
                    <div className="flex  space-x-2 px-6 py-8 ">
                      <PaginationButtons
                        currentPage={currentPage}
                        totalPages={2}
                        setCurrentPage={(page) => null}
                      />
                    </div>
                  </div>
                )}
              </>
            )
          ) : isFetching ? (
            <PageLoader />
          ) : productServices && !productServices?.length ? (
            <div className="flex h-[50vh] items-center">
              <VendorsEmptyState
                icon={<GreenLoveIcon />}
                descriptionOne=" You don’t have any Favourite service vendor yet."
                descriptionTwo=" Visit any vendor’s page to add them to your favourites"
              />
            </div>
          ) : (
            <>
              <div className="mt-4 grid w-fit grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {productServices?.map((item) => (
                  <VendorCard
                    varient="default"
                    key={Math.random() * Math.PI}
                    id={item._id}
                    address={item?.address}
                    business_profile_picture={item?.business_profile_picture}
                    categories={item?.categories}
                    description={item?.description}
                    location={item?.location}
                    name={item?.name}
                    total_ratings={item?.total_ratings}
                    total_reviews={item?.total_reviews}
                    minutes_away={item?.minutes_away}
                    vendorId={item?._id}
                    businessType={item?.productType}
                  />
                ))}
              </div>
              {isPagination && (
                <div className="flex w-full justify-center">
                  <div className="flex  space-x-2 px-6 py-8 ">
                    <PaginationButtons
                      currentPage={currentPage}
                      totalPages={2}
                      setCurrentPage={(page) => null}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavouriteVendors;
