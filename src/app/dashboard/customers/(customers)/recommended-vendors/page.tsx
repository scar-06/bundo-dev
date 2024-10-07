"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, GreenLocationIcon, SearchIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";
import { LoaderIcon } from "lucide-react";
import { useGeolocated } from "react-geolocated";

import { getAllProducts, GetBusinesses } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import { Input } from "@/components/ui/input";
import GoBack from "@/components/goBack";
import DotLoader from "@/components/loaders/dotLoader";
import TabPannel from "@/components/shared/tabPannel/tabPannel";
import VendorCard from "@/app/(root)/marketplace/_components/vendorCard";

import VendorsEmptyState from "../_components/vendorsEmptyState";

function RecommendeVendors() {
  const router = useRouter();
  const [tabkey, setTabKey] = React.useState("0");
  const { tableParams, setTableParams } = useTableParams();
  const [selectCategory, setSelectCategory] = React.useState<string>("");
  const [searchText, setSearchText] = React.useState("");
  const queryClient = useQueryClient();

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
      timeout: Infinity,
    },
    // userDecisionTimeout: 5000,
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

  const { data, isFetching, isError } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        {
          page: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
          lat: coords?.latitude,
          long: coords?.longitude,
          categories: selectCategory,
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

  const handleSearch = _debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000,
  );

  const recomendedVendors = data?.products?.businesses;
  const productServices = (recomendedVendors as GetBusinesses[])?.filter(
    (vendor) => vendor.business_type === "services",
  );
  const productVendors = (recomendedVendors as GetBusinesses[])?.filter(
    (v) => v.business_type === "products",
  );

  return (
    <div className="w-full px-5 lg:px-16">
      <div className="flex items-center gap-2 pb-4 ">
        <GoBack text="Recommended vendors" noMargin />
        {/* <span className=" text-[#DE350B]">
          {isFetching ? <LoaderIcon /> : `(${recomendedVendors?.length ?? 0})`}
        </span> */}
      </div>

      <div className="mt-3 flex w-full flex-col items-center lg:my-6 ">
        <div className="flex w-full flex-col items-center">
          {/* <span className="mx-auto text-[11px] font-medium text-[#302F2C] md:text-xs  ">
            Reconnect and shop easily from vendors that have been recommended
          </span> */}
          {/* <div className="my-3 hidden xlg:block"> */}
          <div
            // tabIndex={0}
            className="group my-3 flex h-[53px] w-full items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)] px-[10px]  sm:w-[480px]"
          >
            <span className="">
              <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
            </span>
            <Input
              placeholder="Search for a vendor...."
              className="h-full border-none bg-transparent text-[11px] outline-none md:text-sm"
              onChange={handleSearch}
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
              className=""
            />
          </div>

          {/* </div> */}
        </div>
        <>
          {isFetching ? (
            <div className="flex h-[clamp(80vh,_6vw,_300px)]  items-center justify-center">
              <DotLoader />
            </div>
          ) : tabkey === "0" ? (
            productVendors?.length < 1 ? (
              <div className="my-20 flex flex-col items-center justify-center">
                <VendorsEmptyState
                  icon={<GreenLocationIcon />}
                  descriptionOne=" No Recommended product vendors to display for now."
                  descriptionTwo="Don’t forget to check back soon"
                />
              </div>
            ) : (
              <div className="mt-4 grid w-fit grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {productVendors?.map((element) => (
                  <VendorCard
                    varient="default"
                    key={element?._id || Math.random() * Math.PI}
                    address={element?.address}
                    business_profile_picture={element?.business_profile_picture}
                    categories={element?.categories}
                    description={element?.description}
                    location={element?.location}
                    name={element?.name}
                    total_ratings={element?.total_ratings}
                    total_reviews={element?.total_reviews}
                    minutes_away={element?.minutes_away}
                    id={element?._id}
                    vendorId={element?._id}
                    type={"customers"}
                  />
                ))}
              </div>
            )
          ) : (
            tabkey === "2" &&
            (productServices?.length < 1 ? (
              <div className="my-20 flex flex-col items-center justify-center">
                <VendorsEmptyState
                  icon={<GreenLocationIcon />}
                  descriptionOne=" No Recommended service vendors to display for now."
                  descriptionTwo="Don’t forget to check back soon"
                />
              </div>
            ) : (
              <div className="mt-4 grid w-fit grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {productServices?.map((element) => (
                  <VendorCard
                    varient="default"
                    key={element?._id || Math.random() * Math.PI}
                    address={element?.address}
                    business_profile_picture={element?.business_profile_picture}
                    categories={element?.categories}
                    description={element?.description}
                    location={element?.location}
                    name={element?.name}
                    total_ratings={element?.total_ratings}
                    total_reviews={element?.total_reviews}
                    minutes_away={element?.minutes_away}
                    id={element?._id}
                    vendorId={element?.vendorId}
                    type={"customers"}
                    businessType={element?.productType}
                  />
                ))}
              </div>
            ))
          )}
        </>
      </div>
    </div>
  );
}

export default RecommendeVendors;
