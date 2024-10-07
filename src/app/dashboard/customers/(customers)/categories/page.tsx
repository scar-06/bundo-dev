"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ErrorAlertIcon, GreenLoveIcon, SearchIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";

import { getAllCategories } from "@/lib/app/category/services";
import queryClient from "@/lib/reactQuery/queryClient";
import { Input } from "@/components/ui/input";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import TabPannel from "@/components/shared/tabPannel/tabPannel";

import CustomersCategoryCard from "../_components/customersCategoryCard";
import VendorsEmptyState from "../_components/vendorsEmptyState";

function AllCategories() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const { data: categoriesData, isFetching: isLoadingCategories } = useQuery(
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

  const filterCategories = categoriesData?.categories?.filter((item) => {
    return searchText.toLowerCase() === ""
      ? item
      : item?.category.toLowerCase().includes(searchText);
  });

  return (
    <div className="">
      <div className="px-5 lg:px-0 lg:pl-16">
        <Link
          href="/dashboard/customers"
          className="flex items-center pb-4 text-[16px] font-medium"
        >
          <span>
            <ArrowLeft />
          </span>{" "}
          <span className="text-[14px] font-medium md:text-sm">
            {" "}
            All Categories
          </span>
        </Link>
        <div className="my-3 flex w-full flex-col lg:mb-4 lg:items-center ">
          <div>
            <span className="text-[11px] font-medium  md:text-xs">
              Browse All Categories👇🏽🛍
            </span>
            <div
              // tabIndex={0}
              className="group mb-4 mt-2 flex h-[53px] items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)] px-[10px]  lg:w-[450px]"
            >
              <span className="">
                <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
              </span>
              <Input
                placeholder="Search for a category...."
                className="h-full border-none bg-transparent text-[11px] outline-none md:text-xs"
                onChange={handleSearch}
              />
            </div>

            {/* <TabPannel
              activeTab={tabkey}
              options={tabLinkOption}
              width="flex gap-5"
              isIcon={false}
              onChange={(values) => {
                setTabKey(values as string);
              }}
              className="my-3 border-[1px] border-[#CFD4CE]"
            /> */}
          </div>
        </div>
        {
          // tabkey === "0" ? (
          isLoadingCategories ? (
            <div className=" grid w-full grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-10 ">
              {Array(40)
                .fill(0)
                .map((_) => (
                  <SkeletonLoader
                    key={Math.random()}
                    className=" relative flex aspect-square w-[clamp(58.94px,_8vw,_58.94px)] items-center justify-center overflow-hidden  overflow-x-auto rounded-full md:w-[clamp(78.94px,_8vw,_78.94px)]"
                  />
                ))}
            </div>
          ) : !filterCategories?.length ? (
            <div className="flex h-full min-h-[calc(100vh_-_300px)] flex-col items-center justify-center">
              <VendorsEmptyState
                icon2={<ErrorAlertIcon />}
                iconText="Oops!"
                descriptionOne="The category you searched for doesn’t exist on Bundo."
                descriptionTwo="Please go back and try again"
              />
            </div>
          ) : (
            <div
              className=" mb-10 grid w-full grid-cols-4 gap-4 md:grid-cols-8 lg:grid-cols-10"
              // className="grid h-fit w-full grid-cols-4 gap-6 overflow-x-auto pt-4 md:grid-cols-8 lg:grid-cols-10 lg:gap-7 lg:overflow-x-hidden xlg:gap-7"
            >
              {categoriesData?.categories
                ?.filter((item) => {
                  return searchText.toLowerCase() === ""
                    ? item
                    : item?.category.toLowerCase().includes(searchText);
                })
                ?.map((prop) => (
                  <div key={`card `}>
                    <CustomersCategoryCard
                      image={prop?.categoryUrl}
                      productName={prop?.category}
                      key={Math.random() * Math.PI}
                      height="cursor-pointer"
                      onClick={() => {
                        router.push(
                          `/dashboard/customers/categories/selected-category?category=${prop?.category}`,
                        );
                      }}
                    />
                  </div>
                ))}
            </div>
          )
          // ) : (
          //   tabkey === "2" && <div className="pb-20">Services</div>
          // )
        }
      </div>
    </div>
  );
}

export default AllCategories;
