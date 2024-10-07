"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GreenLocationIcon,
  GreenLoveIcon,
  HeartIcon,
  SearchIcon,
} from "@/assets";

// eslint-disable-next-line import/no-unresolved
// import Slider from "react-slick";

import { Input } from "@/components/ui/input";
import Rating from "@/components/shared/ratings/rating";
import AdzCard from "@/app/(root)/marketplace/_components/adzCard";
import VendorCard from "@/app/(root)/marketplace/_components/vendorCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils/enums";
import { createSubArrays } from "@/utils/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";
import { LoaderIcon } from "lucide-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useGeolocated } from "react-geolocated";
import Slider from "react-slick";
import { useStore } from "zustand";

import { getAllCategories } from "@/lib/app/category/services";
import { getFollowedVendors, getListAllAds } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import cn from "@/lib/utils";
import EmptyCart from "@/components/ui/cartItems/emptyCart";
import Spinner from "@/components/loaders/buttonSpinner";
import PageLoader from "@/components/loaders/pageLoader";
import SkeletonLoader from "@/components/loaders/skeletonLoader";

import CustomersCategoryCard from "./_components/customersCategoryCard";
import VendorsEmptyState from "./_components/vendorsEmptyState";

// const CustomSlider = styled(Slider)`
// .slick-dots li {
//   width: auto !important; /* Override the width to auto */
// }
// `;

// function CustomDots(props: any) {
//   const { onClick, activeIndex } = props;
//   return (
//     <ul className="slick-dots">
//       {props.data.map((_: any, index: number) => (
//         // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
//         <li
//           key={Math.random()}
//           className={cn("dot", { active: index === activeIndex })}
//           onClick={() => onClick(index)}
//           style={{ width: "calc(100% / 10 - 20px)" }} // Adjust width here
//         >
//           <button>{index + 1}</button>
//         </li>
//       ))}
//     </ul>
//   );
// }

function CustomersOverview() {
  const [searchText, setSearchText] = useState("");
  const [rating, setRating] = React.useState(5);
  const { tableParams, setTableParams } = useTableParams();
  const [totalPages, setTotalPages] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [categoryName, setCategoryName] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  const router = useRouter();
  const { user } = useStore(useUserStore, (state) => state);
  // getPosition();

  const queryClient = useQueryClient();
  const { data, isFetching, isError } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        {
          pages: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
          categories: "",
          name: "",
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

  const { data: allAds, isFetching: isLoading } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.LIST_ADS,
        {
          pages: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
          categories: "",
          name: "",
        },
      ],

      queryFn: async (params) =>
        getListAllAds({
          ...params,
        }),
      enabled: true,

      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },

    queryClient,
  );

  const handleChangePage = (_: any, data: number) => {
    setCurrentPage(data);
  };

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
  const sliderRef = useRef<any>(null);

  // eslint-disable-next-line react/no-unstable-nested-components
  function CustomDots(props: any) {
    return (
      <ul className="slick-dots">
        {props.data.map((_: any, index: number) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            key={Math.random()}
            className={cn("dot", { active: index === activeSlide })}
            onClick={() => {
              setActiveSlide(index * 4);
              sliderRef.current.slickGoTo(index * 4);
              props.onClick(index * 4);
            }}
            style={{ width: "10px" }}
          >
            <button
              style={{
                backgroundColor: index * 4 === activeSlide ? "#34A853" : "",
                border:
                  index * 4 === activeSlide ? "1px solid #FDE74C" : "none",
                borderRadius: "100%",
              }}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    );
  }
  const categoriesLength = categoriesData?.categories?.length || 0;
  const itemsSubArray = createSubArrays(
    categoriesData?.categories || [],
    categoriesLength <= 10 ? 1 : 2,
  );

  // const sliderConfig = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 10,
  //   slidesToScroll: categoriesLength <= 10 ? 1 : 3,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   // dots: !!(categoriesLength > 10),
  //   afterChange: (current: number) => setActiveSlide(current), // Update active slide index
  //   beforeChange: (current: number) => setActiveSlide(current), // Update active slide index
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 9,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 800,
  //       settings: {
  //         slidesToShow: 5,
  //         slidesToScroll: 5,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 4,
  //       },
  //     },
  //   ],
  //   // eslint-disable-next-line react/no-unstable-nested-components
  //   appendDots: (dots: any) => (
  //     <CustomDots
  //       data={dots}
  //       activeIndex={activeSlide} // Pass active slide index to dots
  //       // onClick={(index: number) => setActiveSlide(index)} // Handle dot click
  //       onClick={(index: number) => {
  //         console.log("ame", index);
  //         setActiveSlide(index * 4);
  //         sliderRef.current.slickGoTo(index);
  //       }} // Handle dot click
  //     />
  //   ),
  // };

  const settings = {
    // eslint-disable-next-line react/no-unstable-nested-components
    appendDots: (dots: any) => {
      return <CustomDots data={dots} activeIndex={activeSlide} />;
    },
    beforeChange: (current: number, index: number) => setActiveSlide(index),
    dotsClass: "slick-dots slick-thumb",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: categoriesLength <= 10 ? 1 : 4,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 9,
          // slidesToScroll: 9,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };

  const handleSearch = _debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000,
  );

  const get4VendorsItems = data?.user?.vendors.slice(0, 4);
  return (
    <div className="flex w-full ">
      <div className="flex w-full flex-col pb-8 text-sm">
        <div className="mb-4 flex h-full items-center gap-2 px-5 md:hidden">
          <div className="isolate  flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853] ">
            <span className="font-bold text-[#fff]">
              {user?.firstName.slice(0, 1)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold">{`Hi ${
              user?.firstName ? user?.firstName : ""
            }!`}</span>
            <span className="text-[9px]">
              Start buying & discovering new vendors with ease💵🛍
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between px-5 md:justify-start lg:px-0 xlg:px-0">
            <span className="text-[10px] font-semibold md:text-sm">
              {user?.firstName}, Check out these cool Ads🔥😍
            </span>
            <Link href="/dashboard/customers/allAds">
              <button className="text-[10px] font-medium underline md:mx-3 md:text-sm">
                see all
              </button>{" "}
            </Link>
          </div>
          <div className="hideScrollBar w-full overflow-x-auto  ">
            {isLoading ? (
              <div className="flex w-fit cursor-move gap-4 pb-8  pt-3">
                {Array(5)
                  .fill(0)
                  .map((_) => (
                    <SkeletonLoader
                      key={Math.random()}
                      className="h-[219px] w-[260px] overflow-x-auto  rounded-[10px] bg-[#FCFBF8] shadow-xl"
                    />
                  ))}
              </div>
            ) : !allAds?.allAds?.allAds?.length ? (
              <div className="my-6 flex flex-col items-center justify-center">
                <VendorsEmptyState
                  icon={<GreenLocationIcon />}
                  descriptionOne="No Ads to display for now"
                  descriptionTwo="Don’t forget to check back soon"
                />
              </div>
            ) : (
              <div className=" flex w-fit cursor-move gap-4 px-4 pb-8 pt-3 md:px-0 ">
                {allAds?.allAds?.allAds?.map((item, index) => {
                  return (
                    <AdzCard
                      varient={index % 2 === 0 ? "deep" : "light"}
                      key={Math.random() * Math.PI}
                      ad={item}
                      businessName={item?.businessName}
                      category={item?.categories}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="w-full px-5  lg:px-0 xlg:px-0">
          <div className="flex items-center justify-between lg:pr-16 xlg:ml-0 xlg:pr-16 ">
            <header className="container flex w-full items-center justify-between lg:justify-start lg:gap-5  xlg:justify-start xlg:gap-5">
              <h2 className=" text-[10px] font-semibold text-tertiary-pale-950  md:text-sm">
                Browse through these Categories👇🏽🛍
              </h2>{" "}
              <Link
                href="/dashboard/customers/categories"
                className=" justify-end"
              >
                {" "}
                <button className=" flex w-full justify-end text-[10px] font-medium underline md:text-sm">
                  see all
                </button>
              </Link>
            </header>
            <div className="hidden xlg:block">
              <div
                // tabIndex={0}
                className="group  flex h-[53px] w-[332px] items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)]  px-[10px]"
              >
                <span className="">
                  <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
                </span>
                <Input
                  placeholder="Search for a category...."
                  className="h-full border-none bg-transparent text-sm outline-none"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          {isLoadingCategories ? (
            <div className=" my-3 grid w-full  grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-10 ">
              {Array(20)
                .fill(0)
                .map((_) => (
                  <SkeletonLoader
                    key={Math.random()}
                    className=" relative flex aspect-square w-[clamp(58.94px,_8vw,_58.94px)] items-center justify-center overflow-hidden  overflow-x-auto rounded-full md:w-[clamp(78.94px,_8vw,_78.94px)]"
                  />
                ))}
            </div>
          ) : !itemsSubArray.length ? (
            <div className="my-6 flex flex-col items-center justify-center">
              <VendorsEmptyState
                icon={<GreenLocationIcon />}
                descriptionOne="No Categories to display for now."
                descriptionTwo="Don’t forget to check back soon"
              />
            </div>
          ) : (
            //   <div

            <Slider
              ref={sliderRef}
              // dotsClass="slick-dots flex w-[0px] justify-center"
              {...settings}
              className=" "

              // eslint-disable-next-line react/no-unstable-nested-components
              // appendDots={(dots: any) => <CustomDots data={dots} />}
            >
              {itemsSubArray.map((_) => (
                <div
                  key={Math.random() * Math.PI}
                  className=" mt-8 flex w-full justify-center gap-3"
                >
                  {_?.filter((item) => {
                    return searchText.toLowerCase() === ""
                      ? item
                      : item?.category.toLowerCase().includes(searchText);
                  })?.map((prop) => (
                    <CustomersCategoryCard
                      image={prop?.categoryUrl}
                      productName={prop?.category}
                      key={Math.random() * Math.PI}
                      height="min-h-[150px] h-full cursor-pointer"
                      onClick={() => {
                        // setCategoryName(prop?.category);
                        router.push(
                          `/dashboard/customers/categories/selected-category?category=${prop?.category}`,
                        );
                      }}
                    />
                  ))}
                </div>
              ))}
            </Slider>
          )}

          {/* </Carousel> */}
          <div className="mt-16 lg:pr-16  xlg:pr-16">
            <div className=" flex w-full items-center justify-between lg:justify-start lg:gap-5  xlg:justify-start">
              <span className=" text-[10px] font-semibold   md:text-sm">
                Revisit Your Favourite Vendors💛🛍
              </span>
              <span className="">
                <Link href="/dashboard/customers/favourite_vendors">
                  {" "}
                  <button className="text-[10px] font-medium underline md:text-sm">
                    see all
                  </button>{" "}
                </Link>
              </span>
            </div>
            <div className="flex  justify-center ">
              {isFetching ? (
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
              ) : !get4VendorsItems?.length ? (
                <div className="my-10 flex flex-col items-center justify-center">
                  <VendorsEmptyState
                    icon={<GreenLoveIcon />}
                    descriptionOne=" You don’t have any Favourite vendor yet."
                    descriptionTwo="Visit any vendor’s page to add them to your favourites"
                  />
                </div>
              ) : (
                <div className=" mt-8 grid w-full grid-cols-2 gap-4 pb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-4 ">
                  {get4VendorsItems?.map((item) => (
                    <VendorCard
                      key={`card `}
                      loading
                      varient="default"
                      name={item.name}
                      description={item.description}
                      total_ratings={item.total_ratings}
                      total_reviews={item.total_reviews}
                      location={item.location}
                      address={item.address}
                      categories={item.categories}
                      business_profile_picture={item.business_profile_picture}
                      disabled
                      vendorId={item?._id}
                      minutes_away={item?.minutes_away}
                      id={item?._id}
                      hideLocation
                      type="customers"
                      businessType={item?.productType}

                      // filled={dataItems?.user?.vendors?.includes(item?._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomersOverview;
